import { Maybe } from "./Maybe"
import { isNumber } from "./Number"
import { pad2 } from "./String"

/**
 * Returns a "zone name" (used by `luxon`) that encodes the given offset.
 */
export function offsetMinutesToZoneName(
  offsetMinutes: Maybe<number>
): Maybe<string> {
  if (offsetMinutes == null) return undefined
  if (offsetMinutes == 0) return "UTC"
  const sign = offsetMinutes < 0 ? "-" : "+"
  const abs = Math.abs(offsetMinutes)
  const hours = Math.floor(abs / 60)
  const minutes = Math.abs(abs % 60)
  return `UTC${sign}${pad2(hours)}` + (minutes == 0 ? "" : ":" + pad2(minutes))
}

export function reasonableTzOffsetMinutes(
  tzOffsetMinutes: Maybe<number>
): boolean {
  // Pacific/Kiritimati is +14:00 TIL
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  return isNumber(tzOffsetMinutes) && Math.abs(tzOffsetMinutes) < 14 * 60
}
