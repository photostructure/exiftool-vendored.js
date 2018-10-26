import { DateTime } from "luxon"

import { first, map, Maybe } from "./Maybe"
import { pad2, toS, blank } from "./String"
import { validDateTime } from "./DateTime"

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  static fromISO(text: string): Maybe<ExifDate> {
    return this.fromDateTime(DateTime.fromISO(text))
  }

  static fromEXIF(text: string): Maybe<ExifDate> {
    if (blank(text)) return
    text = toS(text).trim()
    return first(
      ["yyyy:MM:dd", "yyyy-MM-dd", "y:M:d", "MMM d y", "MMMM d y"],
      fmt => map(DateTime.fromFormat(text, fmt), dt => this.fromDateTime(dt))
    )
  }

  static fromDateTime(dt: DateTime): Maybe<ExifDate> {
    return validDateTime(dt)
      ? new ExifDate(dt.year, dt.month, dt.day)
      : undefined
  }

  constructor(
    readonly year: number, // four-digit year
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number // 1-31
  ) {}

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day)
  }

  toISOString(): string {
    return `${this.year}-${pad2(this.month)}-${pad2(this.day)}`
  }

  toString() {
    return this.toISOString()
  }
}
