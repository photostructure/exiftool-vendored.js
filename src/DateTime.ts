import { DateTime } from "luxon"

export function validDateTime(dt: DateTime) {
  return dt != null && dt.isValid
}

export function diffMs(a: Date, b: Date) {
  return a.getTime() - b.getTime()
}

export const MinuteMs = 60 * 1000
export const HourMs = 60 * MinuteMs
export const DayMs = 24 * HourMs
