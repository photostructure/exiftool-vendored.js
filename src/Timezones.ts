import { FixedOffsetZone, Info, Zone } from "luxon"
import { BinaryField } from "./BinaryField"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolOptions } from "./ExifToolOptions"
import { lazy } from "./Lazy"
import { Maybe, first, map, map2 } from "./Maybe"
import { isNumber } from "./Number"
import { pick } from "./Pick"
import { blank, pad2 } from "./String"
import { Tags } from "./Tags"

// Unique values from
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones, excluding those
// that have not been used for at least 50 years.
const ValidTimezoneOffsets = [
  // "-12:00", // not used for any populated land
  "-11:00",
  // "-10:30", // used by Hawaii 1896-1947
  "-10:00",
  "-09:30",
  "-09:00",
  "-08:30",
  "-08:00",
  "-07:00",
  "-06:00",
  "-05:00",
  "-04:30", // used by Venezuela 1912-1965 and 2007-2016
  "-04:00",
  "-03:30",
  "-03:00",
  "-02:30",
  "-02:00",
  "-01:00",
  // "-00:44", // used by Liberia until 1972
  // "-00:25:21", // Ireland 1880-1916 https://en.wikipedia.org/wiki/UTC%E2%88%9200:25:21
  "+00:00",
  // "+00:20", // used by Netherlands until 1940

  // "+00:30", // used by Switzerland until 1936
  "+01:00",
  // "+01:24", // used by Warsaw until 1915
  // "+01:30", // used by some southern African countries until 1903
  "+02:00",
  // "+02:30", // archaic Moscow time
  "+03:00",
  "+03:30",
  "+04:00",
  "+04:30",
  // "+04:51", // used by Bombay until 1955 https://en.wikipedia.org/wiki/UTC%2B04:51
  "+05:00",
  "+05:30",
  // "+05:40", // used by Nepal until 1920
  "+05:45",
  "+06:00",
  "+06:30",
  "+07:00",
  // "+07:20", // used by Singapore and Malaya until 1941
  "+07:30", // used by Mayasia until 1982
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
  "+13:45", // New Zealand islands
  "+14:00",
] as const

export type TimezoneOffset = (typeof ValidTimezoneOffsets)[number]

function offsetToMinutes(offset: TimezoneOffset): number {
  const [h, m] = offset.split(":").map(Number) as [number, number]
  // we can't just return `h * 60 + m`: that doesn't work with negative
  // offsets (minutes will be positive but hours will be negative)
  const sign = h < 0 ? -1 : 1
  return h * 60 + sign * m
}

const ValidOffsetMinutes = lazy(
  () => new Set(ValidTimezoneOffsets.map(offsetToMinutes))
)

/**
 * Zone instances with this offset are a placeholder for being "unset".
 */
export const UnsetZoneOffsetMinutes = -1

/**
 * This is a placeholder for dates where the zone is unknown/unset, because
 * Luxon doesn't officially support "unset" zones.
 */
export const UnsetZone = Info.normalizeZone(UnsetZoneOffsetMinutes)

/**
 * Zone instances with this name are a placeholder for being "unset".
 */
export const UnsetZoneName = UnsetZone.name

const Zulus = [
  FixedOffsetZone.utcInstance,
  0,
  -0,
  "UTC",
  "GMT",
  "Z",
  "+0",
  "+00:00",
  "UTC+0",
  "GMT+0",
  "UTC+00:00",
  // ...sigh, so much for "normalizeZone"...
]

export function isUTC(zone: Maybe<Zone | string | number>) {
  const z = zone as any
  return (
    zone != null && (Zulus.includes(z) || Zulus.includes(z.zoneName ?? z.fixed))
  )
}

export function isZoneValid(zone: Maybe<Zone>): zone is Zone {
  return (
    zone != null && zone.isValid && Math.abs(zone.offset(Date.now())) < 14 * 60
  )
}

/**
 * If `tzSource` matches this value, the tags are from a video, and we had to
 * resort to assuming time fields are in UTC.
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/113
 */
export const defaultVideosToUTC = "defaultVideosToUTC"

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones -- not that
// "WET" and "W-SU" are full TZs
const IanaFormatRE = /^\w{2,15}(?:\/\w{3,15})?$/
// Luxon requires fixed-offset zones to look like "UTC+H", "UTC-H",
// "UTC+H:mm", "UTC-H:mm":
const FixedFormatRE = /^UTC[+-]\d{1,2}(?::\d\d)?$/
/**
 * @param input must be either a number, which is the offset in minutes, or a
 * string in the format "UTC+H" or "UTC+HH:mm"
 */
export function normalizeZone(
  input: Maybe<string | number | Zone>
): Maybe<Zone> {
  // wrapped in a try/catch as Luxon.settings.throwOnInvalid may be true:
  try {
    // Info.normalizeZone returns the system zone if the input is null or
    // blank (!!!), but we want to return undefined instead:
    // Info.normalizeZone(null) returns the system zone, which isn't what we
    // (ever!) want.
    if (input == null) return
    if (input instanceof Zone) {
      return isZoneValid(input) ? input : undefined
    }
    let z = input
    if (typeof z === "string") {
      z = z.replace(/^(?:Zulu|Z|GMT)(?:\b|$)/, "UTC")
      // Info.normalizeZone("") returns the system zone, which we never want.
      // We also don't need to tease Info.normalizeZone with obviously
      // non-offset inputs:
      if (blank(z) || (!IanaFormatRE.test(z) && !FixedFormatRE.test(z))) {
        return
      }
    }
    const result = Info.normalizeZone(z)
    return isZoneValid(result) && result.name !== UnsetZoneName
      ? result
      : undefined
  } catch {
    return
  }
}

/**
 * @param ts must be provided if the zone is not a fixed offset
 * @return the zone offset (in "±HH:MM" format) for the given zone, or "" if
 * the zone is invalid
 */
export function zoneToShortOffset(
  zone: Maybe<string | number | Zone>,
  ts?: number
): string {
  return normalizeZone(zone)?.formatOffset(ts ?? Date.now(), "short") ?? ""
}

export function validTzOffsetMinutes(
  tzOffsetMinutes: Maybe<number>
): tzOffsetMinutes is number {
  return (
    tzOffsetMinutes != null &&
    isNumber(tzOffsetMinutes) &&
    tzOffsetMinutes !== UnsetZoneOffsetMinutes &&
    ValidOffsetMinutes().has(tzOffsetMinutes as any)
  )
}

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>
): Maybe<string> {
  if (!validTzOffsetMinutes(offsetMinutes)) {
    return undefined
  }
  if (offsetMinutes === 0) return "UTC"
  const sign = offsetMinutes < 0 ? "-" : "+"
  const absMinutes = Math.abs(offsetMinutes)
  const hours = Math.floor(absMinutes / 60)
  const minutes = Math.abs(absMinutes % 60)
  // luxon now renders simple hour offsets without padding:
  return `UTC${sign}` + hours + (minutes === 0 ? "" : `:${pad2(minutes)}`)
}

function tzHourToOffset(n: any): Maybe<string> {
  return isNumber(n) && validTzOffsetMinutes(n * 60)
    ? offsetMinutesToZoneName(n * 60)
    : undefined
}

// Accept "Z", "UTC+2", "UTC+02", "UTC+2:00", "UTC+02:00", "+2", "+02", and
// "+02:00". Require the sign (+ or -) and a ":" separator if there are
// minutes.
const tzRe =
  /(?<Z>Z)|((UTC)?(?<sign>[+-])(?<hours>\d\d?)(?::(?<minutes>\d\d))?)$/

export interface TzSrc {
  tz: string
  /**
   * If given a string, this is the remaining string left after extracting the
   * timezone
   */
  leftovers?: string
  src: string
}

function extractOffsetFromHours(
  hourOffset: Maybe<number | number[]>
): Maybe<TzSrc> {
  return isNumber(hourOffset)
    ? map(tzHourToOffset(hourOffset), (tz) => ({
        tz,
        src: "hourOffset",
      }))
    : Array.isArray(hourOffset)
      ? extractOffsetFromHours(hourOffset[0])
      : undefined
}

/**
 * Parse a timezone offset and return the offset minutes
 */
export function extractZone(
  value: any,
  opts?: { stripTZA?: boolean }
): Maybe<TzSrc> {
  if (
    value == null ||
    typeof value === "boolean" ||
    value instanceof BinaryField ||
    value instanceof ExifDate
  ) {
    return
  }

  if (Array.isArray(value)) {
    // we only ever care about the first non-null value
    return extractZone(value.find((ea) => ea != null))
  }

  if (value instanceof ExifDateTime || value instanceof ExifTime) {
    return value.zone == null
      ? undefined
      : { tz: value.zone, src: value.constructor.name + ".zone" }
  }

  if (isNumber(value)) {
    return extractOffsetFromHours(value)
  }

  if (typeof value !== "string" || blank(value)) {
    // don't accept ExifDate, boolean, BinaryField, ResourceEvent, Struct, or
    // Version instances:
    return
  }

  {
    // If value is a proper timezone name, this may be easy!
    const z = normalizeZone(value)
    if (z != null) {
      return { tz: z.name, src: "normalizeZone" }
    }
  }

  let str = value.trim()

  // Some EXIF datetime will "over-specify" and include both the utc offset
  // *and* the "time zone abbreviation"/TZA, like "PST" or "PDT". TZAs are
  // between 2 (AT) and 5 (WEST) characters.
  if (
    opts?.stripTZA !== false &&
    // We only want to strip off the TZA if the input _doesn't_ end with "UTC"
    // or "Z"
    !/[.\d\s](?:UTC|Z)$/.test(str)
  ) {
    str = str.replace(/\s[a-z]{2,5}$/i, "")
  }
  {
    if (blank(str)) return
    const z = normalizeZone(str)
    if (z != null) {
      return { tz: z.name, src: "normalizeZone" }
    }
  }

  const match = tzRe.exec(str)
  const capturedGroups = match?.groups

  if (match != null && capturedGroups != null) {
    const leftovers = str.slice(0, match.index)
    if (capturedGroups.Z === "Z")
      return {
        tz: "UTC",
        src: "Z",
        leftovers,
      }
    const offsetMinutes =
      (capturedGroups.sign === "-" ? -1 : 1) *
      (parseInt(capturedGroups.hours ?? "0") * 60 +
        parseInt(capturedGroups.minutes ?? "0"))
    const tz = offsetMinutesToZoneName(offsetMinutes)
    if (tz != null) {
      return { tz, src: "offsetMinutesToZoneName", leftovers }
    }
  }
  return
}

const TimezoneOffsetTagnames = [
  "TimeZone",
  "OffsetTime",

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
  "GeolocationTimeZone",
] as const satisfies readonly (keyof Tags)[]

export function extractTzOffsetFromTags(t: Tags): Maybe<TzSrc> {
  // We have to iterate twice: if it's from a timezone offset tag, we can
  // trust it, even if it's UTC.
  for (const tagName of TimezoneOffsetTagnames) {
    if (t[tagName] != null) {
      const offset = extractZone(t[tagName])
      if (offset != null) {
        return { tz: offset.tz, src: tagName }
      }
    }
  }
  return
}

export function extractTzOffsetFromDatestamps(
  t: Tags,
  opts: Partial<
    Pick<
      ExifToolOptions,
      "inferTimezoneFromDatestamps" | "inferTimezoneFromDatestampTags"
    >
  >
): Maybe<TzSrc> {
  if (opts?.inferTimezoneFromDatestamps === true) {
    for (const tagName of opts.inferTimezoneFromDatestampTags ?? []) {
      if (t[tagName] != null) {
        const offset = extractZone(t[tagName])
        // Some applications (looking at you, Google Takeout) will add a
        // spurious "+00:00" timezone offset to random datestamp tags, so
        // ignore UTC offsets here.
        if (offset != null && !isUTC(offset.tz)) {
          return { tz: offset.tz, src: tagName }
        }
      }
    }
  }
  return
}

// timezone offsets may be on a 15 minute boundary, but if GPS acquisition is
// old, this can be spurious. We get less mistakes with a larger multiple, so
// we're using 30 minutes instead of 15. See
// https://www.timeanddate.com/time/time-zones-interesting.html
const LikelyOffsetMinutes = ValidTimezoneOffsets
    .filter((offset) => offset.endsWith(":00") || offset.endsWith(":30"))
    .map(offsetToMinutes)

export function inferLikelyOffsetMinutes(deltaMinutes: number): number {
  // More then a day away? nothing is likely
  if (Math.abs(deltaMinutes) > (24 * 60)) return deltaMinutes

  return LikelyOffsetMinutes
    .reduce((prev, curr) =>
      Math.abs(curr - deltaMinutes) < Math.abs(prev - deltaMinutes)
      ? curr
      : prev
    )
}

/**
 * Convert blank strings to undefined.
 */
function blankToNull<T>(x: Maybe<T>): Maybe<T> {
  return x == null || (typeof x === "string" && blank(x)) ? undefined : x
}

export function extractTzOffsetFromUTCOffset(
  t: Pick<
    Tags,
    | (typeof CapturedAtTagNames)[number]
    | "GPSDateTime"
    | "DateTimeUTC"
    | "GPSDateStamp"
    | "GPSTimeStamp"
    | "SonyDateTime2"
  >
): Maybe<TzSrc> {
  const utcSources = {
    ...pick(t, "GPSDateTime", "DateTimeUTC", "SonyDateTime2"),
    GPSDateTimeStamp: map2(
      blankToNull(t.GPSDateStamp), // Example: "2022:04:13"
      blankToNull(t.GPSTimeStamp), // Example: "23:59:41.001"
      (a, b) => a + " " + b
    ),
  }

  // We can always assume these are in UTC:
  const utc = first(
    [
      "GPSDateTime",
      "DateTimeUTC",
      "GPSDateTimeStamp",
      "SonyDateTime2",
    ] as const,
    (tagName) => {
      const v = utcSources[tagName]
      const edt = v instanceof ExifDateTime ? v : ExifDateTime.fromExifStrict(v)
      const s =
        edt != null && (edt.zone == null || isUTC(edt.zone))
          ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds()
          : undefined
      return s != null
        ? {
            tagName,
            s,
          }
        : undefined
    }
  )
  if (utc == null) return

  // If we can find any of these without a zone, the timezone should be the
  // offset between this time and the GPS time.
  const dt = first(CapturedAtTagNames, (tagName) => {
    const edt = ExifDateTime.fromExifStrict((t as any)[tagName])
    const s =
      edt != null && edt.zone == null
        ? edt.setZone("UTC", { keepLocalTime: true })?.toEpochSeconds()
        : undefined
    return s != null
      ? {
          tagName,
          s,
        }
      : undefined
  })

  if (dt == null) return
  const diffSeconds = dt.s - utc.s
  const offsetMinutes = inferLikelyOffsetMinutes(diffSeconds / 60)
  return map(offsetMinutesToZoneName(offsetMinutes), (tz) => ({
    tz,
    src: `offset between ${dt.tagName} and ${utc.tagName}`,
  }))
}

export function equivalentZones(
  a: Maybe<string | number | Zone>,
  b: Maybe<string | number | Zone>
): boolean {
  const az = normalizeZone(a)
  const bz = normalizeZone(b)
  return (
    az != null &&
    bz != null &&
    (az.equals(bz) || az.offset(Date.now()) === bz.offset(Date.now()))
  )
}

export function getZoneName(
  args: {
    zone?: Zone
    zoneName?: Maybe<string>
    tzoffsetMinutes?: Maybe<number>
  } = {}
): Maybe<string> {
  const result =
    normalizeZone(args.zone)?.name ??
    normalizeZone(args.zoneName)?.name ??
    offsetMinutesToZoneName(args.tzoffsetMinutes)
  return blank(result) || result === UnsetZoneName ? undefined : result
}
