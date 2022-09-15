import { DateTime } from "luxon"

import { HourMs, validDateTime } from "./DateTime"
import { first, firstDefinedThunk, map, Maybe } from "./Maybe"
import { blank, pad2, toS } from "./String"

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  static fromISO(text: string): Maybe<ExifDate> {
    return this.fromDateTime(DateTime.fromISO(text), text)
  }

  private static fromPatterns(text: string, fmts: string[]) {
    if (blank(text)) return
    text = toS(text).trim()
    return first(fmts, (fmt) =>
      map(DateTime.fromFormat(text, fmt), (dt) => this.fromDateTime(dt, text))
    )
  }

  // These are all formats I've seen in the wild from exiftool's output.

  // More iterations might make sense, like "d MMM, y" or "MMM d, y", but I
  // want to be constrained in what I consider a valid date to lessen the
  // chance of misinterpreting a given value.

  static fromExifStrict(text: string): Maybe<ExifDate> {
    return this.fromPatterns(text, ["y:MM:dd", "y-MM-dd", "y:M:d"])
  }

  static fromExifLoose(text: string): Maybe<ExifDate> {
    return this.fromPatterns(text, ["MMM d y", "MMMM d y"])
  }

  static fromEXIF(text: string): Maybe<ExifDate> {
    return firstDefinedThunk([
      () => this.fromExifStrict(text),
      () => this.fromExifLoose(text),
    ])
  }

  static fromDateTime(dt: DateTime, rawValue?: string): Maybe<ExifDate> {
    return validDateTime(dt)
      ? new ExifDate(dt.year, dt.month, dt.day, rawValue)
      : undefined
  }

  constructor(
    readonly year: number, // full year (probably 2019-ish, but maybe Japanese 30-ish). See https://ericasadun.com/2018/12/25/iso-8601-yyyy-yyyy-and-why-your-year-may-be-wrong/
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number, // 1-31
    readonly rawValue?: string
  ) {}

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day)
  }

  /**
   * @return the epoch milliseconds for this day in UTC, plus `deltaMs` milliseconds.
   */
  toMillis(deltaMs = 12 * HourMs) {
    return this.toDate().getTime() + deltaMs
  }

  toISOString(): string {
    return this.toString("-")
  }

  toExifString(): string {
    return this.toString(":")
  }

  toString(sep = "-"): string {
    return `${this.year}${sep}${pad2(this.month, this.day).join(sep)}`
  }

  toJSON() {
    return {
      _ctor: "ExifDate",
      year: this.year,
      month: this.month,
      day: this.day,
      rawValue: this.rawValue,
    }
  }

  static fromJSON(json: ReturnType<ExifDate["toJSON"]>): ExifDate {
    return new ExifDate(json.year, json.month, json.day, json.rawValue)
  }
}
