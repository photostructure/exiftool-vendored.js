import { Info, Zone } from "luxon"
import { compact } from "./Array"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { ExifDateTime } from "./ExifDateTime"
import { first, firstDefinedThunk, map, Maybe } from "./Maybe"
import { isNumber } from "./Number"
import { blank, isString, pad2 } from "./String"

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

const tzRe = /(?:UTC)?([+-]?)(\d\d?)(?::(\d\d))?/

export interface TzSrc {
  tz: string
  src: string
}

/**
 * Parse a timezone offset and return the offset minutes
 */
export function extractOffset(tz: Maybe<string>): Maybe<TzSrc> {
  if (tz == null || blank(tz)) {
    return undefined
  }
  if (isString(tz) && Info.isValidIANAZone(tz)) {
    return { tz, src: "validIANAZone" }
  }
  return map(tzRe.exec(tz), (m) =>
    map(
      offsetMinutesToZoneName(
        (m[1] === "-" ? -1 : 1) *
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (parseInt(m[2]!) * 60 + parseInt(m[3] ?? "0"))
      ),
      (ea) => ({ tz: ea, src: "offsetMinutesToZoneName" })
    )
  )
}

export function extractTzOffsetFromTags(t: {
  TimeZone?: string
  OffsetTime?: string
  /** time zone for DateTimeOriginal, "-08:00" */
  OffsetTimeOriginal?: string
  /** time zone for CreateDate, "-08:00" */
  OffsetTimeDigitized?: string
  /**
   * 1 or 2 values: 1. The time zone offset of DateTimeOriginal from GMT in
   * hours, 2. If present, the time zone offset of ModifyDate (which we ignore)
   * @see https://www.exiftool.org/TagNames/EXIF.html
   */
  TimeZoneOffset?: number | number[] | string
}): Maybe<TzSrc> {
  return firstDefinedThunk([
    () =>
      first(
        [
          "TimeZone",
          "OffsetTime",
          "OffsetTimeOriginal",
          "OffsetTimeDigitized",
          "TimeZoneOffset",
        ],
        (tagName) =>
          map(extractOffset((t as any)[tagName]), (ea) => ({
            tz: ea.tz,
            src: ea.src + " from " + tagName,
          }))
      ),
    () =>
      map(t.TimeZoneOffset, (value) =>
        map(tzHourToOffset(Array.isArray(value) ? value[0] : value), (tz) => ({
          tz,
          src: "TimeZoneOffset",
        }))
      ),
  ])
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
      return edt != null && (edt.zone == null || edt.zone === "UTC")
        ? {
            tagName,
            s: edt.setZone("UTC", { keepLocalTime: true }).toEpochSeconds(),
          }
        : undefined
    }
  )
  if (utc == null) return

  // If we can find any of these without a zone, the timezone should be the
  // offset between this time and the GPS time.
  const dt = first(CapturedAtTagNames, (tagName) => {
    const edt = ExifDateTime.fromExifStrict((t as any)[tagName])
    return edt != null && edt.zone == null
      ? {
          tagName,
          s: edt.setZone("UTC", { keepLocalTime: true }).toEpochSeconds(),
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
