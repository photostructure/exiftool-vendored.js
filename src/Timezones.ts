import { FixedOffsetZone, Info, Zone } from "luxon";
import { leastBy } from "./Array";
import { BinaryField } from "./BinaryField";
import { CapturedAtTagNames } from "./CapturedAtTagNames";
import { defaultAdjustTimeZoneIfDaylightSavings } from "./DefaultExifToolOptions";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import { ExifToolOptions } from "./ExifToolOptions";
import { lazy } from "./Lazy";
import { Maybe, first, map, map2 } from "./Maybe";
import { isNumber, toInt } from "./Number";
import { isObject } from "./Object";
import { pick } from "./Pick";
import { Settings } from "./Settings";
import { blank, isString, pad2 } from "./String";
import { Tags } from "./Tags";

// When should we use "tz" vs "zone"?
// 1. "tz" refers to the entire database/system - the "tz database" (also called
//    tzdata or zoneinfo)
// 2. "zone" refers to a specific time zone entry within that database

// So... we really should be using "zone" everywhere, not "tz".

// Unique values from
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones, excluding those
// that have not been used for at least 50 years.

/**
 * Archaic timezone offsets that have not been in use since 1982 or earlier
 */
export const ArchaicTimezoneOffsets = [
  "-10:30", // used by Hawaii 1896-1947
  "-04:30", // used by Venezuela 1912-1965 and 2007-2016
  "-00:44", // used by Liberia until 1972
  "-00:25:21", // Ireland 1880-1916 https://en.wikipedia.org/wiki/UTC%E2%88%9200:25:21
  "+00:20", // used by Netherlands until 1940
  "+00:30", // used by Switzerland until 1936
  "+01:24", // used by Warsaw until 1915
  "+01:30", // used by some southern African countries until 1903
  "+02:30", // archaic Moscow time
  "+04:51", // used by Bombay until 1955 https://en.wikipedia.org/wiki/UTC%2B04:51
  "+05:40", // used by Nepal until 1920
  "+07:20", // used by Singapore and Malaysia until 1941
  "+07:30", // used by Malaysia until 1982
] as const;

/**
 * Valid timezone offsets that are currently in use, or used after 1982
 */
export const ValidTimezoneOffsets = [
  // The UTC-12:00 timezone offset is used for uninhabited U.S. territories:
  //  - Baker Island (uninhabited)
  //  - Howland Island (uninhabited)
  // "-12:00", // not used for any populated land!
  "-11:00",
  "-10:00",
  "-09:30",
  "-09:00",
  "-08:30",
  "-08:00",
  "-07:00",
  "-06:00",
  "-05:00",
  "-04:00",
  "-03:30",
  "-03:00",
  "-02:30",
  "-02:00",
  "-01:00",
  "+00:00",
  "+01:00",
  "+02:00",
  "+03:00",
  "+03:30",
  "+04:00",
  "+04:30",
  "+05:00",
  "+05:30",
  "+05:45", // Nepal
  "+06:00",
  "+06:30",
  "+07:00",
  "+08:00",
  "+08:30", // used by North Korea until 2018
  "+08:45", // used by Western Australia, but not in tz database
  "+09:00",
  "+09:30",
  "+09:45", // used by Western Australia, but not in tz database
  "+10:00",
  "+10:30",
  "+11:00",
  "+12:00",
  "+12:45", // New Zealand islands
  "+13:00", // New Zealand and Antarctica
  "+13:45", // New Zealand islands
  "+14:00",
] as const;

export type TimezoneOffset = (
  | typeof ValidTimezoneOffsets
  | typeof ArchaicTimezoneOffsets
)[number];

/**
 * Get all valid timezone offset minutes based on current settings.
 * Used by both validOffsetMinutes (Set) and likelyOffsetMinutes (Array).
 */
function getValidOffsetMinutes(): number[] {
  const offsets: string[] = [...ValidTimezoneOffsets];
  if (Settings.allowArchaicTimezoneOffsets.value) {
    offsets.push(...ArchaicTimezoneOffsets);
  }
  if (Settings.allowBakerIslandTime.value) {
    offsets.push("-12:00");
  }
  return offsets.map(parseTimezoneOffsetToMinutes).filter(isNumber);
}

const validOffsetMinutes = lazy<Set<number>>(
  () => new Set(getValidOffsetMinutes()),
);

// Used for fuzzy matching in inferLikelyOffsetMinutes
const likelyOffsetMinutes = lazy<number[]>(() => getValidOffsetMinutes());

// Invalidate both caches when relevant settings change
function clearOffsetCaches() {
  validOffsetMinutes.clear();
  likelyOffsetMinutes.clear();
}

Settings.allowArchaicTimezoneOffsets.onChange(clearOffsetCaches);
Settings.allowBakerIslandTime.onChange(clearOffsetCaches);

/**
 * Zone instances with this offset are a placeholder for being "unset".
 */
export const UnsetZoneOffsetMinutes = -1;

/**
 * This is a placeholder for dates where the zone is unknown/unset, because
 * Luxon doesn't officially support "unset" zones.
 */
export const UnsetZone = Info.normalizeZone(UnsetZoneOffsetMinutes);

/**
 * Zone instances with this name are a placeholder for being "unset".
 */
export const UnsetZoneName = UnsetZone.name;

const Zulus = [
  FixedOffsetZone.utcInstance,
  0,
  -0,
  "0", // String zero - some systems output this for numeric offsets
  "UTC",
  "GMT",
  "Z",
  "Etc/UTC", // Valid IANA timezone name for UTC
  "+0",
  "+00",
  "-00",
  "+00:00",
  "-00:00",
  "UTC+0",
  "GMT+0",
  "UTC+00:00",
  "GMT+00:00",
];

/**
 * Check if a timezone value represents UTC.
 *
 * Handles multiple UTC representations including Zone instances, strings, and
 * numeric offsets. Recognizes common UTC aliases like "GMT", "Z", "Zulu",
 * "+0", "+00:00", etc.
 *
 * @param zone - Timezone to check (Zone, string, or number)
 * @returns true if the zone represents UTC/GMT/Zulu
 *
 * @example
 * ```typescript
 * isUTC("UTC")              // true
 * isUTC("GMT")              // true
 * isUTC("Z")                // true
 * isUTC("Zulu")             // true
 * isUTC(0)                  // true
 * isUTC("+00:00")           // true
 * isUTC("UTC+0")            // true
 * isUTC("America/New_York") // false
 * isUTC("+08:00")           // false
 * ```
 */
export function isUTC(zone: unknown): boolean {
  if (zone == null) {
    return false;
  }
  if (typeof zone === "string" || typeof zone === "number") {
    return Zulus.includes(zone as string | number);
  }
  if (isZone(zone)) {
    return zone.isUniversal && zone.offset(Date.now()) === 0;
  }
  return false;
}

/**
 * Check if a Zone is the library's sentinel "unset" value.
 *
 * The library uses a special Zone instance to represent unknown/unset
 * timezones since Luxon doesn't officially support unset zones.
 *
 * @param zone - Zone instance to check
 * @returns true if the zone is the UnsetZone sentinel value
 *
 * @see {@link UnsetZone}
 * @see {@link UnsetZoneName}
 * @see {@link UnsetZoneOffsetMinutes}
 *
 * @example
 * ```typescript
 * isZoneUnset(UnsetZone)                    // true
 * isZoneUnset(Info.normalizeZone("UTC"))    // false
 * isZoneUnset(Info.normalizeZone("UTC+8"))  // false
 * ```
 */
export function isZoneUnset(zone: unknown): boolean {
  return (
    isZone(zone) &&
    zone.isUniversal &&
    zone.offset(0) === UnsetZoneOffsetMinutes
  );
}

/**
 * Type guard to check if a Zone is valid and usable.
 *
 * A zone is considered valid if it:
 * - Is not null/undefined
 * - Has `isValid === true` (Luxon requirement)
 * - Is not the library's UnsetZone sentinel
 * - Has an offset within ±14 hours (the valid range for real-world timezones)
 *
 * This is the canonical validation check used throughout the library.
 *
 * @param zone - Zone to validate
 * @returns true if the zone is valid and usable (type guard)
 *
 * @example
 * ```typescript
 * const zone = Info.normalizeZone("America/Los_Angeles")
 * if (isZoneValid(zone)) {
 *   // TypeScript knows zone is Zone (not Zone | undefined)
 *   console.log(zone.name)
 * }
 *
 * isZoneValid(Info.normalizeZone("invalid"))  // false
 * isZoneValid(Info.normalizeZone("UTC+8"))    // true
 * isZoneValid(UnsetZone)                      // false
 * isZoneValid(Info.normalizeZone("UTC+20"))   // false (beyond ±14 hours)
 * ```
 */
export function isZoneValid(zone: Maybe<Zone>): zone is Zone {
  // Note: isZone() already verifies zone.isValid
  if (!isZone(zone) || isZoneUnset(zone)) {
    return false;
  }
  // For fixed offset zones, verify the offset is in our valid set
  if (zone.isUniversal) {
    return validTzOffsetMinutes(zone.offset(Date.now()));
  }
  // For IANA zones, we trust that Luxon has validated them
  return true;
}

/**
 * Type guard to check if a value is a Luxon Zone instance.
 *
 * Checks both `instanceof Zone` and constructor name to handle cross-module
 * Zone instances that may not pass instanceof checks.
 *
 * @param zone - Value to check
 * @returns true if the value is a Zone instance (type guard)
 *
 * @example
 * ```typescript
 * import { Info } from "luxon"
 *
 * const zone = Info.normalizeZone("UTC+8")
 * if (isZone(zone)) {
 *   // TypeScript knows zone is Zone (not unknown)
 *   console.log(zone.offset(Date.now()))
 * }
 *
 * isZone(Info.normalizeZone("UTC"))  // true
 * isZone("UTC")                      // false
 * isZone(480)                        // false
 * isZone(null)                       // false
 * ```
 */
export function isZone(zone: unknown): zone is Zone<true> {
  return (
    isObject(zone) &&
    (zone instanceof Zone || zone.constructor.name === "Zone") &&
    (zone as Zone).isValid
  );
}

/**
 * If `tzSource` matches this value, the tags are from a video, and we had to
 * resort to assuming time fields are in UTC.
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/113
 */
export const defaultVideosToUTC = "defaultVideosToUTC";

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones -- note that
// "WET" and "W-SU" are full TZs (!!!), and "America/Indiana/Indianapolis" is
// also a thing.
const IanaFormatRE = /^\w{2,15}(?:\/\w{3,15}){0,2}$/;

const OffsetStringRE =
  /^(?:UTC|GMT)?(?<sign>[+−-])(?<hours>\d{1,2})(?::(?<minutes>\d{2})(?::(?<seconds>\d{2}))?)?$/;

const MinusRE = /[−-]/;

/**
 * Composable regex pattern for matching timezone offsets.
 *
 * Designed for embedding in larger patterns (no ^ or $ anchors).
 * Matches UTC/GMT/Z or signed offsets like +08:00, -05:30.
 *
 * Named capture groups:
 * - `tz_utc`: Matches "Z", "UTC", or "GMT"
 * - `tz_sign`: The sign character (+, -, or Unicode minus −)
 * - `tz_hours`: Hour offset (1-2 digits)
 * - `tz_minutes`: Optional minute offset (2 digits)
 *
 * @example
 * ```typescript
 * // Concatenate with other patterns
 * const dateTimeRE = new RegExp(
 *   `(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})${TimezoneOffsetRE.source}`
 * )
 *
 * // Use standalone
 * const match = TimezoneOffsetRE.exec("2023-01-15T10:30:00-08:00")
 * if (match?.groups) {
 *   const { tz_sign, tz_hours, tz_minutes } = match.groups
 *   // tz_sign = "-", tz_hours = "08", tz_minutes = "00"
 * }
 * ```
 */
export const TimezoneOffsetRE =
  /(?:(?<tz_utc>Z|UTC|GMT)|(?<tz_sign>[+−-])(?<tz_hours>[01]?\d)(?::(?<tz_minutes>\d\d))?)/;

/**
 * Result of parsing a timezone offset regex match.
 */
export interface TimezoneOffsetMatch {
  /** Offset in minutes (e.g., 480 for UTC+8, -300 for UTC-5) */
  offsetMinutes: number;
  /** Whether this was a UTC/GMT/Z match */
  isUtc: boolean;
}

/**
 * Parse timezone offset from a regex match result.
 *
 * Use with {@link TimezoneOffsetRE} to extract offset minutes from a match.
 *
 * @param match - RegExp exec result from TimezoneOffsetRE
 * @returns Parsed offset info, or undefined if match is invalid
 *
 * @example
 * ```typescript
 * const match = TimezoneOffsetRE.exec("2023-01-15T10:30:00-08:00")
 * const result = parseTimezoneOffsetMatch(match)
 * // { offsetMinutes: -480, isUtc: false }
 * ```
 */
export function parseTimezoneOffsetMatch(
  match: RegExpExecArray | null,
): Maybe<TimezoneOffsetMatch> {
  if (match?.groups == null) return;
  const { tz_utc, tz_sign, tz_hours, tz_minutes } = match.groups;

  if (tz_utc != null) {
    return { offsetMinutes: 0, isUtc: true };
  }

  if (tz_sign == null || tz_hours == null) return;

  const h = toInt(tz_hours);
  const m = toInt(tz_minutes) ?? 0;
  if (h == null || h < 0 || h > 14 || m < 0 || m >= 60) return;

  const signValue = MinusRE.test(tz_sign) ? -1 : 1;
  return {
    offsetMinutes: signValue * (h * 60 + m),
    isUtc: false,
  };
}

/**
 * Parse a timezone offset string to offset minutes.
 *
 * Accepts multiple formats:
 * - ISO 8601: "+08:00", "-05:30", "Z"
 * - Luxon format: "UTC+8", "GMT-5"
 * - UTC variants: "UTC", "GMT", "Zulu"
 *
 * Supports seconds for archaic offsets like "-00:25:21" (Ireland 1880-1916).
 *
 * **Note:** Does NOT validate that the offset is a real-world timezone offset.
 * Use {@link validTzOffsetMinutes} for validation.
 *
 * @param str - Timezone offset string
 * @returns Offset in minutes, or undefined if invalid
 *
 * @example
 * ```typescript
 * parseTimezoneOffsetToMinutes("+08:00")     // 480
 * parseTimezoneOffsetToMinutes("UTC-5")      // -300
 * parseTimezoneOffsetToMinutes("Z")          // 0
 * parseTimezoneOffsetToMinutes("-00:25:21")  // -25.35 (archaic Ireland)
 * parseTimezoneOffsetToMinutes("invalid")   // undefined
 * ```
 */
export function parseTimezoneOffsetToMinutes(str: string): Maybe<number> {
  if (isUTC(str)) return 0;

  const match = OffsetStringRE.exec(str);
  if (match?.groups == null) return;

  const { hours, minutes, seconds, sign } = match.groups;
  if (hours == null || sign == null) return;

  const h = toInt(hours);
  const m = toInt(minutes) ?? 0;
  const s = toInt(seconds) ?? 0;
  if (h == null || h < 0 || h > 14 || m < 0 || m >= 60 || s < 0 || s >= 60)
    return;

  // Handle both ASCII minus (-) and Unicode minus (−, U+2212)
  const signValue = MinusRE.test(sign) ? -1 : 1;
  return signValue * (h * 60 + m + s / 60);
}

/**
 * Normalize a timezone input to a valid Luxon Zone.
 *
 * Accepts multiple input formats and returns a validated Zone instance, or
 * undefined if the input cannot be normalized to a valid timezone.
 *
 * Supported input formats:
 * - **Numbers**: Timezone offset in minutes (e.g., 480 = UTC+8, -300 = UTC-5)
 * - **Strings**: ISO offsets ("+08:00", "-05:00"), IANA zones
 *   ("America/Los_Angeles"), UTC variants ("UTC", "GMT", "Z", "Zulu")
 * - **Zone instances**: Validated and returned if valid
 *
 * The function respects Settings:
 * - {@link Settings.allowArchaicTimezoneOffsets} for pre-1982 offsets
 * - {@link Settings.allowBakerIslandTime} for UTC-12:00
 *
 * @param input - Timezone in various formats
 * @returns Valid Zone instance, or undefined if invalid
 *
 * @example
 * ```typescript
 * // Numbers (offset in minutes)
 * normalizeZone(480)?.name     // "UTC+8"
 * normalizeZone(-300)?.name    // "UTC-5"
 * normalizeZone(0)?.name       // "UTC"
 *
 * // ISO offset strings
 * normalizeZone("+08:00")?.name      // "UTC+8"
 * normalizeZone("-05:30")?.name      // "UTC-5:30"
 * normalizeZone("UTC+7")?.name       // "UTC+7"
 *
 * // IANA timezone names
 * normalizeZone("America/Los_Angeles")?.name  // "America/Los_Angeles"
 * normalizeZone("Asia/Tokyo")?.name           // "Asia/Tokyo"
 *
 * // UTC aliases
 * normalizeZone("UTC")?.name   // "UTC"
 * normalizeZone("GMT")?.name   // "UTC"
 * normalizeZone("Z")?.name     // "UTC"
 * normalizeZone("Zulu")?.name  // "UTC"
 *
 * // Invalid inputs return undefined
 * normalizeZone("invalid")     // undefined
 * normalizeZone("+25:00")      // undefined (beyond ±14 hours)
 * normalizeZone(1200)          // undefined (20 hours, beyond ±14 hours)
 * normalizeZone(100)           // undefined (not a valid timezone offset)
 * normalizeZone(-1)            // undefined (UnsetZone sentinel)
 * normalizeZone(null)          // undefined
 * ```
 */
export function normalizeZone(input: unknown): Maybe<Zone> {
  if (
    input == null ||
    blank(input) ||
    (!isNumber(input) && !isString(input) && !isZone(input)) ||
    input === UnsetZone ||
    input === UnsetZoneOffsetMinutes ||
    isZoneUnset(input)
  ) {
    return;
  }

  // wrapped in a try/catch as Luxon.settings.throwOnInvalid may be true:
  try {
    // This test and short-circuit may not be necessary, but it's cheap and
    // explicit:
    if (isUTC(input)) {
      return FixedOffsetZone.utcInstance;
    }

    // TypeScript-friendly: after line 386's type check, we know input is one of these
    let z: string | number | Zone = input;

    if (isNumber(z) && !validTzOffsetMinutes(z)) {
      return;
    }

    if (isString(z)) {
      let s: string = z;
      z = s = s.replace(/^(?:Zulu|Z|GMT)(?:\b|$)/i, "UTC");

      // We also don't need to tease Info.normalizeZone with obviously
      // non-offset inputs:

      if (blank(s)) return;

      const fixed = parseTimezoneOffsetToMinutes(s);
      if (fixed != null && validTzOffsetMinutes(fixed)) {
        return Info.normalizeZone(fixed);
      }

      if (!IanaFormatRE.test(s)) {
        return;
      }
    }
    const result = Info.normalizeZone(z);
    return isZoneValid(result) && result.name !== UnsetZoneName
      ? result
      : undefined;
  } catch {
    return;
  }
}

/**
 * Convert a timezone to its short offset format (e.g., "+08:00", "-05:00").
 *
 * Useful for displaying timezone offsets in a standardized format. For IANA
 * zones with daylight saving time, provide a timestamp to get the correct
 * offset for that moment.
 *
 * @param zone - Timezone as Zone, string, or offset in minutes
 * @param ts - Optional timestamp (milliseconds) for IANA zone offset calculation.
 *             Defaults to current time if not provided.
 * @returns Zone offset in "+HH:MM" format, or "" if zone is invalid
 *
 * @example
 * ```typescript
 * // Fixed offsets
 * zoneToShortOffset("UTC+8")      // "+08:00"
 * zoneToShortOffset(480)          // "+08:00"
 * zoneToShortOffset("UTC-5:30")   // "-05:30"
 *
 * // IANA zones (offset depends on DST)
 * const winter = new Date("2023-01-15").getTime()
 * const summer = new Date("2023-07-15").getTime()
 * zoneToShortOffset("America/Los_Angeles", winter)  // "-08:00" (PST)
 * zoneToShortOffset("America/Los_Angeles", summer)  // "-07:00" (PDT)
 *
 * // Invalid zones return empty string
 * zoneToShortOffset("invalid")  // ""
 * zoneToShortOffset(null)       // ""
 * ```
 */
export function zoneToShortOffset(
  zone: Maybe<string | number | Zone>,
  ts?: number,
): string {
  return normalizeZone(zone)?.formatOffset(ts ?? Date.now(), "short") ?? "";
}

/**
 * Type guard to check if a numeric offset (in minutes) represents a valid timezone.
 *
 * Validates that the offset:
 * - Is a number (not null/undefined)
 * - Is not the UnsetZone sentinel value (-1)
 * - Matches a real-world timezone offset (respects Settings for archaic offsets)
 *
 * Use this for exact validation without rounding. For error-tolerant rounding to
 * the nearest valid offset, use {@link inferLikelyOffsetMinutes} instead.
 *
 * @param tzOffsetMinutes - Offset in minutes to validate (e.g., 480 for UTC+8)
 * @returns true if the offset is exactly valid (type guard)
 *
 * @see {@link inferLikelyOffsetMinutes} for error-tolerant rounding
 *
 * @example
 * ```typescript
 * validTzOffsetMinutes(480)    // true (UTC+8)
 * validTzOffsetMinutes(-300)   // true (UTC-5)
 * validTzOffsetMinutes(330)    // true (UTC+5:30, India)
 * validTzOffsetMinutes(345)    // true (UTC+5:45, Nepal)
 *
 * validTzOffsetMinutes(481)    // false (not a valid timezone)
 * validTzOffsetMinutes(-1)     // false (UnsetZone sentinel)
 * validTzOffsetMinutes(null)   // false
 *
 * // Archaic offsets require Settings
 * Settings.allowArchaicTimezoneOffsets.value = false
 * validTzOffsetMinutes(-630)   // false (Hawaii -10:30, archaic)
 *
 * Settings.allowArchaicTimezoneOffsets.value = true
 * validTzOffsetMinutes(-630)   // true (Hawaii -10:30, archaic)
 * ```
 */
export function validTzOffsetMinutes(
  tzOffsetMinutes: Maybe<number>,
): tzOffsetMinutes is number {
  return (
    tzOffsetMinutes != null &&
    isNumber(tzOffsetMinutes) &&
    tzOffsetMinutes !== UnsetZoneOffsetMinutes &&
    validOffsetMinutes().has(tzOffsetMinutes)
  );
}

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>,
): Maybe<string> {
  if (!validTzOffsetMinutes(offsetMinutes)) {
    return undefined;
  }
  if (offsetMinutes === 0) return "UTC";
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absMinutes / 60);
  const minutes = Math.abs(absMinutes % 60);
  // luxon now renders simple hour offsets without padding:
  return `UTC${sign}` + hours + (minutes === 0 ? "" : `:${pad2(minutes)}`);
}

function tzHourToOffset(n: unknown): Maybe<string> {
  return isNumber(n) && validTzOffsetMinutes(n * 60)
    ? offsetMinutesToZoneName(n * 60)
    : undefined;
}

// Accept "Z", "UTC+2", "UTC+02", "UTC+2:00", "UTC+02:00", "+2", "+02", and
// "+02:00". Also accepts seconds like "-00:25:21" for archaic offsets.
// Handles Unicode minus (−, U+2212)
// Require the sign (+ or -) and a ":" separator if there are minutes.
const tzRe =
  /(?<Z>Z)|((UTC)?(?<sign>[+−-])(?<hours>\d\d?)(?::(?<minutes>\d\d)(?::(?<seconds>\d\d))?)?)$/;

export interface TzSrc {
  /**
   * The timezone name, e.g. "America/New_York", "UTC+2", or "Z"
   * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  zone: string;
  /**
   * The timezone name, e.g. "America/New_York", "UTC+2", or "Z"
   * @deprecated use `zone` instead
   * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  tz: string;
  /**
   * If given a string, this is the remaining string left after extracting the
   * timezone
   */
  leftovers?: string;
  src: string;
}

function extractOffsetFromHours(
  hourOffset: Maybe<number | number[]>,
): Maybe<TzSrc> {
  return isNumber(hourOffset)
    ? map(tzHourToOffset(hourOffset), (zone) => ({
        zone,
        tz: zone,
        src: "hourOffset",
      }))
    : Array.isArray(hourOffset)
      ? extractOffsetFromHours(hourOffset[0])
      : undefined;
}

/**
 * Extract timezone information from various value types.
 *
 * Handles multiple input formats and performs intelligent parsing:
 * - **Strings**: ISO offsets ("+08:00"), IANA zones, UTC variants, timestamps
 *   with embedded timezones ("2023:01:15 10:30:00-08:00")
 * - **Numbers**: Hour offsets (e.g., -8 for UTC-8)
 * - **Arrays**: Uses first non-null value
 * - **ExifDateTime/ExifTime instances**: Extracts their zone property
 *
 * By default, strips timezone abbreviations (PST, PDT, etc.) as they are
 * ambiguous. Returns provenance information indicating which parsing method
 * succeeded.
 *
 * Supports Unicode minus signs (−, U+2212) and plus-minus signs (±, U+00B1)
 * in addition to ASCII +/-.
 *
 * @param value - Value to extract timezone from
 * @param opts.stripTZA - Whether to strip timezone abbreviations (default: true).
 *                        TZAs like "PST" are ambiguous and usually stripped.
 * @returns TzSrc with zone name and provenance, or undefined if no timezone found
 *
 * @example
 * ```typescript
 * // ISO offset strings
 * extractZone("+08:00")
 * // { zone: "UTC+8", tz: "UTC+8", src: "offsetMinutesToZoneName" }
 *
 * extractZone("UTC-5:30")
 * // { zone: "UTC-5:30", tz: "UTC-5:30", src: "normalizeZone" }
 *
 * // IANA zone names
 * extractZone("America/Los_Angeles")
 * // { zone: "America/Los_Angeles", tz: "America/Los_Angeles", src: "normalizeZone" }
 *
 * // Timestamps with embedded timezones
 * extractZone("2023:01:15 10:30:00-08:00")
 * // { zone: "UTC-8", tz: "UTC-8", src: "offsetMinutesToZoneName",
 * //   leftovers: "2023:01:15 10:30:00" }
 *
 * // Unicode minus signs
 * extractZone("−08:00")  // Unicode minus (U+2212)
 * // { zone: "UTC-8", tz: "UTC-8", src: "offsetMinutesToZoneName" }
 *
 * // Numeric hour offsets
 * extractZone(-8)
 * // { zone: "UTC-8", tz: "UTC-8", src: "hourOffset" }
 *
 * // Arrays (uses first non-null)
 * extractZone([null, "+05:30", undefined])
 * // { zone: "UTC+5:30", tz: "UTC+5:30", src: "offsetMinutesToZoneName" }
 *
 * // Strips timezone abbreviations by default
 * extractZone("2023:01:15 10:30:00-08:00 PST")
 * // { zone: "UTC-8", tz: "UTC-8", src: "offsetMinutesToZoneName",
 * //   leftovers: "2023:01:15 10:30:00" }
 *
 * // Invalid inputs return undefined
 * extractZone("invalid")  // undefined
 * extractZone(null)       // undefined
 * ```
 */
export function extractZone(
  value: unknown,
  opts?: { stripTZA?: boolean },
): Maybe<TzSrc> {
  if (
    value == null ||
    typeof value === "boolean" ||
    value instanceof BinaryField ||
    value instanceof ExifDate
  ) {
    return;
  }

  if (Array.isArray(value)) {
    // we only ever care about the first non-null value
    return extractZone(value.find((ea) => ea != null));
  }

  if (value instanceof ExifDateTime || value instanceof ExifTime) {
    return value.zone == null
      ? undefined
      : {
          zone: value.zone,
          tz: value.zone,
          src: value.constructor.name + ".zone",
        };
  }

  if (isNumber(value)) {
    return extractOffsetFromHours(value);
  }

  if (typeof value !== "string" || blank(value)) {
    // don't accept ExifDate, boolean, BinaryField, ResourceEvent, Struct, or
    // Version instances:
    return;
  }

  {
    // If value is a proper timezone name, this may be easy!
    const z = normalizeZone(value);
    if (z != null) {
      return { zone: z.name, tz: z.name, src: "normalizeZone" };
    }
  }

  let str = value.trim();

  // Some EXIF datetime will "over-specify" and include both the utc offset
  // *and* the "time zone abbreviation"/TZA, like "PST" or "PDT". TZAs are
  // between 2 (AT) and 5 (WEST) characters.
  if (
    opts?.stripTZA !== false &&
    // We only want to strip off the TZA if the input _doesn't_ end with "UTC"
    // or "Z"
    !/[.\d\s](?:UTC|Z)$/.test(str)
  ) {
    str = str.replace(/\s[a-z]{2,5}$/i, "");
  }
  {
    if (blank(str)) return;
    const z = normalizeZone(str);
    if (z != null) {
      return { zone: z.name, tz: z.name, src: "normalizeZone" };
    }
  }

  const match = tzRe.exec(str);
  const capturedGroups = match?.groups;

  if (match != null && capturedGroups != null) {
    const leftovers = str.slice(0, match.index);
    if (capturedGroups.Z === "Z")
      return {
        zone: "UTC",
        tz: "UTC",
        src: "Z",
        ...(blank(leftovers) ? {} : { leftovers }),
      };
    const hours = parseInt(capturedGroups.hours ?? "0");
    const minutes = parseInt(capturedGroups.minutes ?? "0");
    const seconds = parseInt(capturedGroups.seconds ?? "0");
    // Handle both ASCII minus (-) and Unicode minus (−, U+2212)
    const sign = MinusRE.test(capturedGroups.sign ?? "") ? -1 : 1;
    const offsetMinutes = sign * (hours * 60 + minutes + seconds / 60);
    const zone = offsetMinutesToZoneName(offsetMinutes);
    if (zone != null) {
      return {
        zone,
        tz: zone,
        src: "offsetMinutesToZoneName",
        ...(blank(leftovers) ? {} : { leftovers }),
      };
    }
  }
  return;
}

export const TimezoneOffsetTagnames = [
  "TimeZone",

  // We **don't** look at "OffsetTime", as that is the offset for `ModifyDate`,
  // which is the _file_ modification time. See
  // https://github.com/photostructure/exiftool-vendored.js/issues/220 for
  // details.

  // time zone for DateTimeOriginal, "-08:00"
  "OffsetTimeOriginal",

  // time zone for CreateDate, "-08:00"
  "OffsetTimeDigitized",

  // srsly who came up with these wholly inconsistent tag names? _why not just
  // prefix tag names with "Offset"?!11_ SADNESS AND WOE

  // 1 or 2 values: 1. The time zone offset of DateTimeOriginal from GMT in
  // hours, 2. If present, the time zone offset of ModifyDate (which we
  // ignore) @see https://www.exiftool.org/TagNames/EXIF.html
  "TimeZoneOffset", // number | number[] | string

  // We DON'T use "GeolocationTimezone" here, as at this layer in the glue
  // factory we don't have access to the ExifTool option "ignoreZeroZeroLatLon"
] as const satisfies readonly (keyof Tags)[];

export function incrementZone(
  z: string | Zone | number,
  minutes: number,
): Maybe<Zone> {
  const norm = normalizeZone(z);
  if (true !== norm?.isUniversal) return;
  const fixed = norm.offset(Date.now()); // < arg doesn't matter, it's universal
  return isNumber(fixed)
    ? FixedOffsetZone.instance(fixed + minutes)
    : undefined;
}

/**
 * Extract timezone offset from standard EXIF timezone tags.
 *
 * Checks timezone tags in priority order:
 * 1. TimeZone
 * 2. OffsetTimeOriginal (for DateTimeOriginal)
 * 3. OffsetTimeDigitized (for CreateDate)
 * 4. TimeZoneOffset
 *
 * Handles camera-specific quirks like Nikon's DaylightSavings tag, which
 * requires adjusting the TimeZone offset forward by one hour during DST.
 *
 * @param t - EXIF tags object
 * @param opts.adjustTimeZoneIfDaylightSavings - Optional function to adjust
 *        timezone for DST. Defaults to handling Nikon's DaylightSavings quirk.
 * @returns TzSrc with zone and provenance, or undefined if no timezone found
 *
 * @see {@link TimezoneOffsetTagnames} for the list of tags checked
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/215
 *
 * @example
 * ```typescript
 * const tags = await exiftool.read("photo.jpg")
 *
 * const tzSrc = extractTzOffsetFromTags(tags)
 * if (tzSrc) {
 *   console.log(`Timezone: ${tzSrc.zone}`)
 *   console.log(`Source: ${tzSrc.src}`)  // e.g., "OffsetTimeOriginal"
 * }
 *
 * // Nikon DST handling
 * const nikonTags = {
 *   TimeZone: "-08:00",
 *   DaylightSavings: "Yes",
 *   Make: "NIKON CORPORATION"
 * }
 * extractTzOffsetFromTags(nikonTags)
 * // { zone: "UTC-7", tz: "UTC-7",
 * //   src: "TimeZone (adjusted for DaylightSavings)" }
 * ```
 */
export function extractTzOffsetFromTags(
  t: Tags,
  opts?: Pick<ExifToolOptions, "adjustTimeZoneIfDaylightSavings">,
): Maybe<TzSrc> {
  const adjustFn =
    opts?.adjustTimeZoneIfDaylightSavings ??
    defaultAdjustTimeZoneIfDaylightSavings;
  for (const tagName of TimezoneOffsetTagnames) {
    const offset = extractZone(t[tagName]);
    if (offset == null) continue;

    // UGH. See https://github.com/photostructure/exiftool-vendored.js/issues/215
    const minutes = adjustFn(t, offset.tz);
    if (minutes != null) {
      const adjustedZone = incrementZone(offset.tz, minutes);
      if (adjustedZone != null)
        return {
          zone: adjustedZone.name,
          tz: adjustedZone.name,
          src: tagName + " (adjusted for DaylightSavings)",
        };
    }

    // No fancy adjustments needed, just return the extracted zone:
    return { ...offset, src: tagName };
  }
  return;
}

export function extractTzOffsetFromDatestamps(
  t: Tags,
  opts: Partial<
    Pick<
      ExifToolOptions,
      "inferTimezoneFromDatestamps" | "inferTimezoneFromDatestampTags"
    >
  >,
): Maybe<TzSrc> {
  if (opts?.inferTimezoneFromDatestamps === true) {
    for (const tagName of opts.inferTimezoneFromDatestampTags ?? []) {
      if (t[tagName] != null) {
        const offset = extractZone(t[tagName]);
        // Some applications (looking at you, Google Takeout) will add a
        // spurious "+00:00" timezone offset to random datestamp tags, so
        // ignore UTC offsets here.
        if (offset != null && !isUTC(offset.tz)) {
          return { ...offset, src: tagName };
        }
      }
    }
  }
  return;
}

export function extractTzOffsetFromTimeStamp(
  t: Tags,
  opts: Partial<
    Pick<
      ExifToolOptions,
      "inferTimezoneFromTimeStamp" | "inferTimezoneFromDatestampTags"
    >
  >,
): Maybe<TzSrc> {
  if (opts?.inferTimezoneFromTimeStamp !== true) return;
  const ts = ExifDateTime.from(t.TimeStamp);
  if (ts == null) return;
  for (const tagName of opts.inferTimezoneFromDatestampTags ?? []) {
    const v = t[tagName];
    if (!isString(v) && !(v instanceof ExifDateTime)) continue;
    const ea = ExifDateTime.from(v);
    if (ea == null) continue;
    if (ea.zone != null) {
      return { zone: ea.zone, tz: ea.zone, src: tagName };
    }
    const deltaMinutes = Math.floor(
      (ea.toEpochSeconds("UTC") - ts.toEpochSeconds()) / 60,
    );
    const likelyOffsetZone = inferLikelyOffsetMinutes(deltaMinutes);
    const zone = offsetMinutesToZoneName(likelyOffsetZone);
    if (zone != null) {
      return {
        zone,
        tz: zone,
        src: "offset between " + tagName + " and TimeStamp",
      };
    }
  }
  return;
}

/**
 * Round an arbitrary offset to the nearest valid timezone offset.
 *
 * This is error-tolerant timezone inference, useful for:
 * - GPS-based timezone calculation (where GPS time drift may cause errors)
 * - Handling clock drift in timestamp comparisons
 * - Fuzzy timezone matching
 *
 * By default, uses {@link Settings.maxValidOffsetMinutes} (30 minutes) as the
 * maximum distance from a valid timezone. This threshold handles GPS acquisition
 * lag and clock drift while preventing false matches.
 *
 * Respects Settings for archaic offsets, Baker Island time, and max offset tolerance.
 *
 * @param deltaMinutes - Offset in minutes to round (can be fractional)
 * @param maxValidOffsetMinutes - Maximum distance (in minutes) from a valid
 *        timezone to accept. Defaults to {@link Settings.maxValidOffsetMinutes}.
 * @returns Nearest valid offset in minutes, or undefined if too far from any
 *          valid timezone
 *
 * @see {@link validTzOffsetMinutes} for exact validation without rounding
 * @see {@link Settings.maxValidOffsetMinutes} to configure the default threshold
 *
 * @example
 * ```typescript
 * // Exact matches
 * inferLikelyOffsetMinutes(480)      // 480 (UTC+8, exact)
 * inferLikelyOffsetMinutes(-300)     // -300 (UTC-5, exact)
 *
 * // Rounding within default threshold (30 minutes)
 * inferLikelyOffsetMinutes(485)      // 480 (UTC+8, rounded from 485)
 * inferLikelyOffsetMinutes(-295)     // -300 (UTC-5, rounded from -295)
 * inferLikelyOffsetMinutes(330.5)    // 330 (UTC+5:30, rounded)
 *
 * // GPS-based inference with clock drift (within 30 min default)
 * const gpsTime = "2023:01:15 19:30:45"  // UTC
 * const localTime = "2023:01:15 11:32:12"  // Local with 1.5min drift
 * const deltaMinutes = 480 + 1.5  // ~481.5 minutes
 * inferLikelyOffsetMinutes(deltaMinutes)  // 480 (UTC+8)
 *
 * // GPS lag up to 23 minutes still works (within 30 min threshold)
 * inferLikelyOffsetMinutes(443)      // 420 (UTC-7, ~23 min from actual)
 *
 * // Beyond threshold returns undefined
 * inferLikelyOffsetMinutes(100)      // undefined (not near any valid offset)
 *
 * // Custom threshold
 * inferLikelyOffsetMinutes(495, 30)  // 480 (UTC+8 with 30min threshold)
 * inferLikelyOffsetMinutes(495, 15)  // undefined (beyond 15min threshold)
 *
 * // Adjust global default
 * Settings.maxValidOffsetMinutes.value = 15  // Stricter matching
 * inferLikelyOffsetMinutes(443)      // undefined (beyond 15min threshold)
 * ```
 */
export function inferLikelyOffsetMinutes(
  deltaMinutes: Maybe<number>,
  maxValidOffsetMinutes = Settings.maxValidOffsetMinutes.value,
): Maybe<number> {
  return deltaMinutes == null
    ? undefined
    : leastBy(likelyOffsetMinutes(), (ea) => {
        const diff = Math.abs(ea - deltaMinutes);
        // Reject timezone offsets more than maxValidOffsetMinutes minutes away:
        return diff > maxValidOffsetMinutes ? undefined : diff;
      });
}

/**
 * Convert blank strings to undefined.
 */
function toNotBlank<T>(x: Maybe<T>): Maybe<T> {
  return x == null || (typeof x === "string" && blank(x)) ? undefined : x;
}

/**
 * Infer timezone offset by comparing local time with GPS/UTC time.
 *
 * Calculates the timezone by finding the difference between:
 * - A "captured at" timestamp (DateTimeOriginal, CreateDate, etc.) assumed to
 *   be in local time
 * - A UTC timestamp (GPSDateTime, DateTimeUTC, or combined GPSDateStamp +
 *   GPSTimeStamp)
 *
 * Uses {@link inferLikelyOffsetMinutes} to handle minor clock drift and round
 * to the nearest valid timezone offset.
 *
 * This is a fallback when explicit timezone tags are not available.
 *
 * @param t - Tags object with timestamp fields
 * @returns TzSrc with inferred timezone and provenance, or undefined if
 *          inference is not possible
 *
 * @see {@link extractTzOffsetFromTags} to check explicit timezone tags first
 *
 * @example
 * ```typescript
 * // GPS-based inference
 * const tags = {
 *   DateTimeOriginal: "2023:01:15 11:30:00",  // Local time (PST)
 *   GPSDateTime: "2023:01:15 19:30:00"        // UTC
 * }
 * extractTzOffsetFromUTCOffset(tags)
 * // { zone: "UTC-8", tz: "UTC-8",
 * //   src: "offset between DateTimeOriginal and GPSDateTime" }
 *
 * // DateTimeUTC-based inference
 * const tags2 = {
 *   CreateDate: "2023:07:20 14:15:30",  // Local time (JST)
 *   DateTimeUTC: "2023:07:20 05:15:30"  // UTC
 * }
 * extractTzOffsetFromUTCOffset(tags2)
 * // { zone: "UTC+9", tz: "UTC+9",
 * //   src: "offset between CreateDate and DateTimeUTC" }
 *
 * // Handles clock drift
 * const tags3 = {
 *   DateTimeOriginal: "2023:01:15 11:30:45",  // Local with drift
 *   GPSDateTime: "2023:01:15 19:29:58"        // UTC (old GPS fix)
 * }
 * extractTzOffsetFromUTCOffset(tags3)
 * // Still infers UTC-8 despite ~1 minute drift
 *
 * // No UTC timestamp available
 * const tags4 = {
 *   DateTimeOriginal: "2023:01:15 11:30:00"
 *   // No GPS or UTC timestamp
 * }
 * extractTzOffsetFromUTCOffset(tags4)  // undefined
 * ```
 */
export function extractTzOffsetFromUTCOffset(
  t: Pick<
    Tags,
    | (typeof CapturedAtTagNames)[number]
    | "GPSDateTime"
    | "DateTimeUTC"
    | "GPSDateStamp"
    | "GPSTimeStamp"
    | "SonyDateTime2"
  >,
): Maybe<TzSrc> {
  const utcSources = {
    ...pick(t, "GPSDateTime", "DateTimeUTC", "SonyDateTime2"),
    GPSDateTimeStamp: map2(
      toNotBlank(t.GPSDateStamp), // Example: "2022:04:13"
      toNotBlank(t.GPSTimeStamp), // Example: "23:59:41.001"
      (a, b) => a + " " + b,
    ),
  };

  // We can always assume these are in UTC:
  const utc = first(
    [
      "GPSDateTime",
      "DateTimeUTC",
      "GPSDateTimeStamp",
      "SonyDateTime2",
    ] as const,
    (tagName) => {
      const v = utcSources[tagName];
      const edt =
        v instanceof ExifDateTime ? v : ExifDateTime.fromExifStrict(v);
      const s =
        edt != null && (edt.zone == null || isUTC(edt.zone))
          ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds()
          : undefined;
      return s != null
        ? {
            tagName,
            s,
          }
        : undefined;
    },
  );
  if (utc == null) return;

  // If we can find any of these without a zone, the timezone should be the
  // offset between this time and the GPS time.
  const dt = first(CapturedAtTagNames, (tagName) => {
    const edt = ExifDateTime.fromExifStrict(t[tagName]);
    const s =
      edt != null && edt.zone == null
        ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds()
        : undefined;
    return s != null
      ? {
          tagName,
          s,
        }
      : undefined;
  });

  if (dt == null) return;
  const diffSeconds = dt.s - utc.s;
  const offsetMinutes = inferLikelyOffsetMinutes(diffSeconds / 60);
  return map(offsetMinutesToZoneName(offsetMinutes), (zone) => ({
    zone,
    tz: zone,
    src: `offset between ${dt.tagName} and ${utc.tagName}`,
  }));
}

/**
 * Check if two timezone values are equivalent at a specific point in time.
 *
 * Two zones are considered equivalent if they:
 * - Are the same zone (via Luxon's Zone.equals()), OR
 * - Have the same offset at the specified timestamp
 *
 * This is useful for:
 * - De-duplicating timezone records
 * - Comparing zones in different formats ("UTC+5" vs "UTC+05:00")
 * - Matching IANA zones to their offset at a specific time
 *
 * For IANA zones with DST, you can specify a timestamp to evaluate equivalence
 * at that moment. This is important when comparing historical records or future
 * events where DST transitions matter.
 *
 * @param a - First timezone (Zone, string, or offset in minutes)
 * @param b - Second timezone (Zone, string, or offset in minutes)
 * @param at - Timestamp in milliseconds to evaluate zone offsets.
 *             Defaults to current time (Date.now()).
 * @returns true if zones are equivalent at the specified time
 *
 * @example
 * ```typescript
 * // Same zone, different formats
 * equivalentZones("UTC+5", "UTC+05:00")     // true
 * equivalentZones("UTC-8", -480)            // true (480 minutes = 8 hours)
 * equivalentZones("GMT", "UTC")             // true
 * equivalentZones("Z", 0)                   // true
 *
 * // IANA zones matched by current offset (default behavior)
 * equivalentZones("America/New_York", "UTC-5")  // true in winter (EST)
 * equivalentZones("America/New_York", "UTC-4")  // true in summer (EDT)
 *
 * // IANA zones at specific times
 * const winter = new Date("2023-01-15").getTime()
 * const summer = new Date("2023-07-15").getTime()
 * equivalentZones("America/New_York", "UTC-5", winter)  // true (EST)
 * equivalentZones("America/New_York", "UTC-4", winter)  // false (not EDT in winter)
 * equivalentZones("America/New_York", "UTC-4", summer)  // true (EDT)
 * equivalentZones("America/New_York", "UTC-5", summer)  // false (not EST in summer)
 *
 * // Compare two IANA zones at a specific time
 * equivalentZones("America/New_York", "America/Toronto", winter)  // true (both EST)
 * equivalentZones("America/New_York", "America/Los_Angeles", winter)  // false (EST vs PST)
 *
 * // Different zones
 * equivalentZones("UTC+8", "UTC+9")         // false
 *
 * // Invalid zones return false
 * equivalentZones("invalid", "UTC")         // false
 * equivalentZones(null, "UTC")              // false
 * ```
 */
export function equivalentZones(
  a: Maybe<string | number | Zone>,
  b: Maybe<string | number | Zone>,
  at: number = Date.now(),
): boolean {
  const az = normalizeZone(a);
  const bz = normalizeZone(b);
  return (
    az != null &&
    bz != null &&
    (az.equals(bz) || az.offset(at) === bz.offset(at))
  );
}

export function getZoneName(
  args: {
    zone?: Zone;
    zoneName?: Maybe<string>;
    tzoffsetMinutes?: Maybe<number>;
  } = {},
): Maybe<string> {
  const result =
    normalizeZone(args.zone)?.name ??
    normalizeZone(args.zoneName)?.name ??
    offsetMinutesToZoneName(args.tzoffsetMinutes);
  return blank(result) || result === UnsetZoneName ? undefined : result;
}
