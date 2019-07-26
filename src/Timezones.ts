import { Info } from "luxon"

import { ExifDateTime } from "./ExifDateTime"
import { first, firstDefinedThunk, map, Maybe, orElse } from "./Maybe"
import { isNumber } from "./Number"
import { blank, pad2, toS } from "./String"

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>
): Maybe<string> {
  if (offsetMinutes == null) return undefined
  if (offsetMinutes === 0) return "UTC"
  const sign = offsetMinutes < 0 ? "-" : "+"
  const abs = Math.abs(offsetMinutes)
  const hours = Math.floor(abs / 60)
  const minutes = Math.abs(abs % 60)
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

/**
 * Parse a timezone offset and return the offset minutes
 */
export function extractOffset(tz: Maybe<string>): Maybe<string> {
  return tz == null || blank(tz)
    ? undefined
    : orElse(
        map(tzRe.exec(tz), m =>
          offsetMinutesToZoneName(
            (m[1] === "-" ? -1 : 1) *
              (parseInt(m[2]) * 60 + parseInt(orElse(m[3], "0")))
          )
        ),
        () => (Info.isValidIANAZone(tz) ? tz : undefined)
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
}): Maybe<string> {
  return firstDefinedThunk([
    () =>
      first(
        [
          t.TimeZone,
          t.OffsetTime,
          t.OffsetTimeOriginal,
          t.OffsetTimeDigitized,
          t.TimeZoneOffset
        ],
        ea => extractOffset(toS(ea))
      ),
    () =>
      map(t.TimeZoneOffset, ea =>
        tzHourToOffset(Array.isArray(ea) ? ea[0] : ea)
      )
  ])
}

export function extractTzOffsetFromUTCOffset(t: {
  DateTimeUTC?: string
  GPSDateTime?: string
  SubSecDateTimeOriginal?: string
  DateTimeOriginal?: string
  SubSecCreateDate?: string
  CreateDate?: string
  SubSecMediaCreateDate?: string
  MediaCreateDate?: string
  DateTimeCreated?: string
}): Maybe<string> {
  return map(first([t.GPSDateTime, t.DateTimeUTC], utcToMs), utcMs =>
    map(
      first(
        [
          t.SubSecDateTimeOriginal,
          t.DateTimeOriginal,
          t.SubSecCreateDate,
          t.CreateDate,
          t.SubSecMediaCreateDate,
          t.MediaCreateDate,
          t.DateTimeCreated
        ],
        utcToMs
      ),
      tMs => {
        const offsetMinutes =
          (TzBoundaryMs *
            (Math.round(tMs / TzBoundaryMs) -
              Math.round(utcMs / TzBoundaryMs))) /
          (60 * 1000)
        return reasonableTzOffsetMinutes(offsetMinutes)
          ? offsetMinutesToZoneName(offsetMinutes)
          : undefined
      }
    )
  )
}

// timezone offsets may be on a 15 minute boundary. See
// https://www.timeanddate.com/time/time-zones-interesting.html

const TzBoundaryMs = 15 * 60 * 1000

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
