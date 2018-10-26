import { DateTime, DateTimeOptions } from "luxon"

import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { map, Maybe } from "./Maybe"

const { FixedOffsetZone } = require("luxon")
const unsetZoneOffset = -24 * 60
const unsetZone = new FixedOffsetZone(unsetZoneOffset)

function first<T>(
  text: string,
  f: (dt: DateTime, offsetMinutes?: number) => T,
  arr: {
    fmt: string
    opts?: DateTimeOptions
  }[]
) {
  for (const { fmt, opts } of arr) {
    const dt = DateTime.fromFormat(text.trim(), fmt, {
      setZone: true,
      ...(opts || {})
    })
    if (dt != null && dt.isValid) {
      return f(dt, dt.offset == unsetZoneOffset ? undefined : dt.offset)
    }
  }
  return undefined
}

export function parseExifDateTime(
  text: string,
  defaultZone?: Maybe<string>
): Maybe<ExifDateTime> {
  const zone = defaultZone != null ? defaultZone : unsetZone
  const f = (dt: DateTime, offsetMinutes?: number) =>
    ExifDateTime.fromDateTime(dt, offsetMinutes)
  return (
    first(
      text,
      f,
      [
        {
          fmt: "y:M:d H:m:s.uZZ"
        },
        {
          fmt: "y:M:d H:m:sZZ"
        },
        {
          fmt: "y:M:d H:m:s.u'Z'",
          opts: { zone: "utc" }
        },
        {
          fmt: "y:M:d H:m:s'Z'",
          opts: { zone: "utc" }
        },
        {
          fmt: "y:M:d H:m:s.u",
          opts: { zone }
        },
        {
          fmt: "y:M:d H:m:s",
          opts: { zone }
        },
        // FWIW, the following are from actual datestamps seen in the wild:
        {
          fmt: "MMM d yyyy H:m:sZZZ"
        },
        {
          fmt: "MMM d yyyy H:m:s",
          opts: { zone }
        },
        {
          fmt: "MMM d yyyy, H:m:sZZZ"
        },
        {
          fmt: "MMM d yyyy, H:m:s",
          opts: { zone }
        },
        {
          fmt: "ccc MMM d H:m:s yyyyZZ" // Thu Oct 13 00:12:27 2016
        },
        {
          fmt: "ccc MMM d H:m:s yyyy",
          opts: { zone }
        }
      ]
    ) ||
    map(
      DateTime.fromISO(text, { setZone: true, zone }),
      dt =>
        dt.isValid
          ? ExifDateTime.fromDateTime(
              dt,
              dt.offset == unsetZoneOffset ? undefined : dt.offset
            )
          : undefined
    )
  )
}

export function parseExifDate(text: string): Maybe<ExifDate> {
  const f = (dt: DateTime) => new ExifDate(dt.year, dt.month, dt.day)
  return first(text, f, [
    { fmt: "yyyy:MM:dd" },
    { fmt: "yyyy-MM-dd" },
    { fmt: "y:M:d" },
    { fmt: "MMM d y" },
    { fmt: "MMMM d y" }
  ])
}

export function parseExifTime(text: string): Maybe<ExifTime> {
  const f = (dt: DateTime) =>
    new ExifTime(dt.hour, dt.minute, dt.second, dt.millisecond)
  return first(text, f, [{ fmt: "HH:mm:ss.u" }, { fmt: "HH:mm:ss" }])
}

/**
 * Given a time value in milliseconds, return a decimal in seconds units,
 * rounded to the given precision, without zero right or left padding.
 * @export
 * @param {number} millis [0,1000)
 * @param {number} [precision=6] how many decimal fraction digits to retain
 * @returns {string} the decimal fraction of the second (to maximally
 * microsecond precision)
 */
export function millisToFractionalPart(millis: Maybe<number>): string {
  return millis == null
    ? ""
    : (Math.round(millis) / 1000).toFixed(3).substring(1)
}
