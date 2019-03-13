import { Info } from "luxon"

import { map, Maybe, orElse } from "./Maybe"
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

const tzRe = /([+-]?)(\d\d?)(?::(\d\d))?/

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
   * hours, 2. If present, the time zone offset of ModifyDate
   */
  TimeZoneOffset?: number | number[] | string
}): Maybe<string> {
  const arr = [
    t.TimeZone,
    t.OffsetTime,
    t.OffsetTimeOriginal,
    t.OffsetTimeDigitized,
    t.TimeZoneOffset
  ]
    .map(ea => extractOffset(toS(ea)))
    .filter(ea => ea != null)
  if (arr.length > 0) return arr[0]!

  const tzo = t.TimeZoneOffset
  return orElse(tzHourToOffset(tzo), () =>
    Array.isArray(tzo) ? tzHourToOffset(tzo[0]) : undefined
  )
}

function tzHourToOffset(n: any): Maybe<string> {
  return isNumber(n) && reasonableTzOffsetMinutes(n * 60)
    ? offsetMinutesToZoneName(n * 60)
    : undefined
}
