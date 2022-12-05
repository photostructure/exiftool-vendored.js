import { DateTime } from "luxon"

import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { Maybe } from "./Maybe"

export function validDateTime(dt: DateTime): boolean {
  return dt != null && dt.isValid
}

export const MinuteMs = 60 * 1000
export const HourMs = 60 * MinuteMs
export const DayMs = 24 * HourMs

export type DateOrTime = ExifDateTime | ExifDate | ExifTime | DateTime

export function isDateOrTime(o: any): o is DateOrTime {
  return (
    o instanceof ExifDateTime ||
    o instanceof ExifDate ||
    o instanceof ExifTime ||
    o instanceof DateTime
  )
}

export function dateTimeToExif(d: DateTime): string {
  return d.toFormat("y:MM:dd HH:mm:ss.u")
}

export function toExifString(d: DateOrTime): Maybe<string> {
  if (d instanceof DateTime) {
    return dateTimeToExif(d)
  } else {
    return d.toExifString()
  }
}
