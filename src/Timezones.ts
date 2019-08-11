import { Info } from "luxon"

import { compact } from "./Array"
import { MinuteMs } from "./DateTime"
import { ExifDateTime } from "./ExifDateTime"
import { first, firstDefinedThunk, map, Maybe, orElse } from "./Maybe"
import { isNumber } from "./Number"
import { blank, isString, pad2 } from "./String"

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>
): Maybe<string> {
  if (offsetMinutes == null || !isNumber(offsetMinutes)) return undefined
  if (offsetMinutes === 0) return "UTC"
  const sign = offsetMinutes < 0 ? "-" : "+"
  const absMinutes = Math.abs(offsetMinutes)
  if (absMinutes > MaxTzOffsetHours * 60) return undefined
  const hours = Math.floor(absMinutes / 60)
  const minutes = Math.abs(absMinutes % 60)
  return (
    `UTC${sign}` +
    (minutes === 0 ? `${hours}` : `${pad2(hours)}:${pad2(minutes)}`)
  )
}

// Pacific/Kiritimati is +14:00 TIL
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export const MaxTzOffsetHours = 14

export function reasonableTzOffsetMinutes(
  tzOffsetMinutes: Maybe<number>
): boolean {
  return (
    isNumber(tzOffsetMinutes) &&
    Math.abs(tzOffsetMinutes) < MaxTzOffsetHours * 60
  )
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
  return map(tzRe.exec(tz), m =>
    map(
      offsetMinutesToZoneName(
        (m[1] === "-" ? -1 : 1) *
          (parseInt(m[2]) * 60 + parseInt(orElse(m[3], "0")))
      ),
      ea => ({ tz: ea, src: "offsetMinutesToZoneName" })
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
   * @see https://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/EXIF.html
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
          "TimeZoneOffset"
        ],
        tagName =>
          map(extractOffset((t as any)[tagName]), ea => ({
            tz: ea.tz,
            src: ea.src + " from " + tagName
          }))
      ),
    () =>
      map(t.TimeZoneOffset, value =>
        map(tzHourToOffset(Array.isArray(value) ? value[0] : value), tz => ({
          tz,
          src: "TimeZoneOffset"
        }))
      )
  ])
}

function firstUtcMs(
  tags: any,
  tagNames: string[]
): Maybe<{ tagName: string; utcMs: number }> {
  return first(tagNames, tagName =>
    map(utcToMs(tags[tagName]), utcMs => ({ tagName, utcMs }))
  )
}

// timezone offsets may be on a 15 minute boundary, but if GPS acquisition is
// old, this can be spurious. We get less mistakes with a larger multiple, so
// we're using 30 minutes instead of 15. See
// https://www.timeanddate.com/time/time-zones-interesting.html

const TzBoundaryMinutes = 30

export function inferLikelyOffsetMinutes(deltaMs: number): number {
  return TzBoundaryMinutes * Math.floor(deltaMs / MinuteMs / TzBoundaryMinutes)
}

export function extractTzOffsetFromUTCOffset(t: {
  DateTimeUTC?: string
  GPSDateTime?: string
  GPSDateStamp?: string
  GPSTimeStamp?: string
  SubSecDateTimeOriginal?: string
  DateTimeOriginal?: string
  SubSecCreateDate?: string
  CreateDate?: string
  SubSecMediaCreateDate?: string
  MediaCreateDate?: string
  DateTimeCreated?: string
}): Maybe<TzSrc> {
  const gpsStamps = compact([t.GPSDateStamp, t.GPSTimeStamp])
  const GPSDateTimeStamp =
    gpsStamps.length === 2 ? gpsStamps.join(" ") : undefined
  const utc = firstUtcMs({ ...t, GPSDateTimeStamp }, [
    "GPSDateTime",
    "DateTimeUTC",
    "GPSDateTimeStamp"
  ])
  const dt = firstUtcMs(t, [
    "SubSecDateTimeOriginal",
    "DateTimeOriginal",
    "SubSecCreateDate",
    "CreateDate",
    "SubSecMediaCreateDate",
    "MediaCreateDate",
    "DateTimeCreated"
  ])
  if (utc == null || dt == null) return
  // By flooring
  const offsetMinutes = inferLikelyOffsetMinutes(dt.utcMs - utc.utcMs)
  return map(offsetMinutesToZoneName(offsetMinutes), tz => ({
    tz,
    src: `offset between ${dt.tagName} and ${utc.tagName}`
  }))
}

function utcToMs(s: Maybe<string>): Maybe<number> {
  return dtToMs(s, "UTC")
}

function dtToMs(s: Maybe<string>, defaultZone?: string): Maybe<number> {
  return map(ExifDateTime.fromExifStrict(s!, defaultZone), dt =>
    dt.toDate().getTime()
  )
}

function tzHourToOffset(n: any): Maybe<string> {
  return isNumber(n) && reasonableTzOffsetMinutes(n * 60)
    ? offsetMinutesToZoneName(n * 60)
    : undefined
}
