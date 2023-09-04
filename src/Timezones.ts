import { Info, Zone } from "luxon"
import { compact } from "./Array"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolOptions } from "./ExifToolOptions"
import { Maybe, first, map } from "./Maybe"
import { isNumber } from "./Number"
import { blank, isString, pad2, toS } from "./String"
import { Tags } from "./Tags"

// Pacific/Kiritimati is +14:00 TIL
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const MaxTzOffsetHours = 14

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
    if (z == null || blank(String(z))) return
    const zone = Info.normalizeZone(z)
    return zone?.isValid === true ? zone : undefined
  } catch {
    return
  }
}

export function reasonableTzOffsetMinutes(
  tzOffsetMinutes: Maybe<number>
): boolean {
  return (
    isNumber(tzOffsetMinutes) &&
    tzOffsetMinutes !== UnsetZoneOffsetMinutes &&
    Math.abs(tzOffsetMinutes) < MaxTzOffsetHours * 60
  )
}

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>
): Maybe<string> {
  if (
    offsetMinutes == null ||
    !isNumber(offsetMinutes) ||
    offsetMinutes === UnsetZoneOffsetMinutes
  ) {
    return undefined
  }
  if (offsetMinutes === 0) return "UTC"
  const sign = offsetMinutes < 0 ? "-" : "+"
  const absMinutes = Math.abs(offsetMinutes)
  if (absMinutes > MaxTzOffsetHours * 60) return undefined
  const hours = Math.floor(absMinutes / 60)
  const minutes = Math.abs(absMinutes % 60)
  // luxon now renders simple hour offsets without padding:
  return `UTC${sign}` + hours + (minutes === 0 ? "" : `:${pad2(minutes)}`)
}

function tzHourToOffset(n: any): Maybe<string> {
  return isNumber(n) && reasonableTzOffsetMinutes(n * 60)
    ? offsetMinutesToZoneName(n * 60)
    : undefined
}

const utcTzRe = /(?:UTC)?(?<sign>[+-]?)(?<hours>\d\d?)(?::(?<minutes>\d\d))?/
const timestampTzRe = /(?<sign>[+-])(?<hours>\d\d?):(?<minutes>\d\d)$/

export interface TzSrc {
  tz: string
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
export function extractOffset(
  value: Maybe<string | number | number[] | ExifDateTime | ExifTime>
): Maybe<TzSrc> {
  if (value instanceof ExifDateTime) {
    return map(value.zone, (tz) => ({ tz, src: "ExifDateTime" }))
  }
  if (isNumber(value) || Array.isArray(value)) {
    return extractOffsetFromHours(value)
  }
  if (isString(value) && Info.isValidIANAZone(value)) {
    return { tz: value, src: "validIANAZone" }
  }
  // ExifTime will have a rawValue, but doesn't support zone extraction:
  const str = (value as any).rawValue ?? toS(value)
  if (blank(str)) return

  for (const g of compact([
    utcTzRe.exec(str)?.groups,
    timestampTzRe.exec(str)?.groups,
  ])) {
    const tz = offsetMinutesToZoneName(
      (g.sign === "-" ? -1 : 1) *
        (parseInt(g.hours ?? "0") * 60 + parseInt(g.minutes ?? "0"))
    )
    if (tz != null) return { tz, src: "offsetMinutesToZoneName" }
  }
  return
}

const TimezoneOffsetTagnames = [
  "TimeZone",
  "OffsetTime",
  /** time zone for DateTimeOriginal, "-08:00" */
  "OffsetTimeOriginal",
  /** time zone for CreateDate, "-08:00" */
  "OffsetTimeDigitized",
  /**
   * 1 or 2 values: 1. The time zone offset of DateTimeOriginal from GMT in
   * hours, 2. If present, the time zone offset of ModifyDate (which we ignore)
   * @see https://www.exiftool.org/TagNames/EXIF.html
   */

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
    if (t[tagName] != null) {
      const offset = extractOffset(t[tagName])
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
