import { FixedOffsetZone, Info, Zone } from "luxon"
import { compact } from "./Array"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolOptions } from "./ExifToolOptions"
import { lazy } from "./Lazy"
import { Maybe, first, map } from "./Maybe"
import { isNumber } from "./Number"
import { blank, pad2, toS } from "./String"
import { Tags } from "./Tags"

// Unique values from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
const ValidTimezoneOffsets = [
  "-12:00",
  "-11:00",
  "-10:30",
  "-10:00",
  "-09:30",
  "-09:00",
  "-08:30",
  "-08:00",
  "-07:30",
  "-07:00",
  "-06:00",
  "-05:00",
  "-04:30",
  "-04:00",
  "-03:30",
  "-03:00",
  "-02:30",
  "-02:00",
  "-01:00",
  "-00:44",
  "-00:25:21", // LOL https://en.wikipedia.org/wiki/UTC%E2%88%9200:25:21
  "+00:00",
  "+00:20",
  "+00:30",
  "+01:00",
  "+01:24",
  "+01:30",
  "+02:00",
  "+02:30",
  "+03:00",
  "+03:30",
  "+04:00",
  "+04:30",
  "+04:51", // LOL https://en.wikipedia.org/wiki/UTC%2B04:51
  "+05:00",
  "+05:30",
  "+05:40",
  "+05:45",
  "+06:00",
  "+06:30",
  "+07:00",
  "+07:20",
  "+07:30",
  "+08:00",
  "+08:30",
  "+08:45",
  "+09:00",
  "+09:30",
  "+09:45",
  "+10:00",
  "+10:30",
  "+11:00",
  "+11:30",
  "+12:00",
  "+12:45",
  "+13:00",
  "+13:45",
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

// export const localTzOffsetMinutes = lazy(() => DateTime.local().offset, hourMs)

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

/**
 * If `tzSource` matches this value, the tags are from a video, and we had to
 * resort to assuming time fields are in UTC.
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/113
 */
export const defaultVideosToUTC = "defaultVideosToUTC"

export function normalizeZone(z: Maybe<string | number | Zone>): Maybe<Zone> {
  try {
    // Info.normalizeZone returns the system zone if the input is null or
    // blank (!!!), but we want to return undefined instead--we don't want to introduce the system zone by accident!
    if (z == null || blank(String(z))) return
    const zone = Info.normalizeZone(z)
    return zone != null && zone.isValid && zone.name !== UnsetZoneName
      ? zone
      : undefined
  } catch {
    return
  }
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
  value: Maybe<string | number | number[] | ExifDateTime | ExifTime>,
  opts?: { stripTZA?: boolean }
): Maybe<TzSrc> {
  if (value instanceof ExifDateTime || value instanceof ExifTime) {
    return value.zone == null
      ? undefined
      : { tz: value.zone, src: value.constructor.name + ".zone" }
  }
  if (isNumber(value) || Array.isArray(value)) {
    return extractOffsetFromHours(value)
  }
  let str = (value as any).rawValue ?? toS(value)
  {
    if (blank(str)) return
    const z = normalizeZone(str)
    if (z != null) {
      return { tz: z.name, src: "normalizeZone" }
    }
  }

  // Some EXIF datetime will "over-specify" and include both the utc offset
  // *and* the "time zone abbreviation"/TZA, like "PST" or "PDT". TZAs are
  // between 2 (AT) and 5 (WEST) characters.
  if (
    opts?.stripTZA !== false &&
    // We only want to strip off the TZA if the input _doesn't_ end with "UTC"
    // or "Z"
    !/[.\d\s](UTC|Z)$/.test(str)
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
  const m = tzRe.exec(str)
  const g = m?.groups

  if (m != null && g != null) {
    const leftovers = str.slice(0, m.index)
    if (g.Z === "Z")
      return {
        tz: FixedOffsetZone.utcInstance.name,
        src: "Z",
        leftovers,
      }
    const offsetMinutes =
      (g.sign === "-" ? -1 : 1) *
      (parseInt(g.hours ?? "0") * 60 + parseInt(g.minutes ?? "0"))
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
] as const satisfies readonly (keyof Tags)[]

// The following are a hail-mary to try to get the offset from a
// created-at tag, and only examined if `inferTimezoneFromDatestamps` is
// true.
const CreateDateTagnames = [
  "SubSecCreateDate",
  "CreateDate",
  "SubSecDateTimeOriginal",
  "DateTimeOriginal",
  "SubSecMediaCreateDate",
  "MediaCreateDate",
  "CreationDate", // < from quicktime videos, sometimes has offset!
  "TimeCreated", // < IPTC tag
] as const satisfies readonly (keyof Tags)[]

export function extractTzOffsetFromTags(
  t: Pick<
    Tags,
    | (typeof TimezoneOffsetTagnames)[number]
    | (typeof CreateDateTagnames)[number]
  >,
  opts?: Partial<Pick<ExifToolOptions, "inferTimezoneFromDatestamps">>
): Maybe<TzSrc> {
  for (const tagName of [
    ...TimezoneOffsetTagnames,
    ...(opts?.inferTimezoneFromDatestamps ?? false ? CreateDateTagnames : []),
  ] as const) {
    // don't adopt FileCreateDate or FileModifyDate offsets--those are just
    // the system timezone:
    if (t[tagName] != null && !tagName.startsWith("File")) {
      const offset = extractZone(t[tagName])
      if (offset != null) {
        return { tz: offset.tz, src: tagName }
      }
    }
  }

  if (t.TimeZoneOffset != null) {
    const tz = tzHourToOffset(
      Array.isArray(t.TimeZoneOffset) ? t.TimeZoneOffset[0] : t.TimeZoneOffset
    )
    if (tz != null)
      return {
        tz,
        src: "TimeZoneOffset",
      }
  }
  return
}

// timezone offsets may be on a 15 minute boundary, but if GPS acquisition is
// old, this can be spurious. We get less mistakes with a larger multiple, so
// we're using 30 minutes instead of 15. See
// https://www.timeanddate.com/time/time-zones-interesting.html

const TzBoundaryMinutes = 30

export function inferLikelyOffsetMinutes(deltaMinutes: number): number {
  return TzBoundaryMinutes * Math.floor(deltaMinutes / TzBoundaryMinutes)
}

export function extractTzOffsetFromUTCOffset(t: {
  DateTimeUTC?: string
  GPSDateTime?: string
  GPSDateStamp?: string
  GPSTimeStamp?: string
  GPSDateTimeStamp?: string
  SubSecDateTimeOriginal?: string
  DateTimeOriginal?: string
  SubSecCreateDate?: string
  CreateDate?: string
  SubSecMediaCreateDate?: string
  MediaCreateDate?: string
  DateTimeCreated?: string
}): Maybe<TzSrc> {
  const gpsStamps = compact([t.GPSDateStamp, t.GPSTimeStamp])
  if (gpsStamps.length === 2) {
    t.GPSDateTimeStamp ??= gpsStamps.join(" ")
  }

  // We can always assume these are in UTC:
  const utc = first(
    ["GPSDateTime", "DateTimeUTC", "GPSDateTimeStamp"],
    (tagName) => {
      const edt = ExifDateTime.fromExifStrict((t as any)[tagName])
      const s =
        edt != null && (edt.zone == null || edt.zone === "UTC")
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
