import { DateTime } from "luxon"

import { HourMs, validDateTime } from "./DateTime"
import { Maybe, firstDefinedThunk } from "./Maybe"
import { blank, pad2, toS } from "./String"

const StrictExifRE = /^\d+:\d+:\d+|\d+-\d+-\d+$/
const LooseExifRE = /^\S+\s+\S+\s+\S+$/

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  static from(exifOrIso: string): Maybe<ExifDate> {
    return (
      // in order of strictness:
      this.fromExifStrict(exifOrIso) ??
      this.fromISO(exifOrIso) ??
      this.fromExifLoose(exifOrIso)
    )
  }
  static fromISO(text: string): Maybe<ExifDate> {
    return StrictExifRE.test(toS(text).trim())
      ? this.fromDateTime(DateTime.fromISO(text), text)
      : undefined
  }

  private static fromPatterns(text: string, fmts: string[]) {
    if (blank(text)) return
    text = toS(text).trim()
    for (const fmt of fmts) {
      const dt = DateTime.fromFormat(text, fmt)
      if (validDateTime(dt)) {
        return this.fromDateTime(dt, text)
      }
    }
    return
  }

  // These are all formats I've seen in the wild from exiftool's output.

  // More iterations might make sense, like "d MMM, y" or "MMM d, y", but I
  // want to be constrained in what I consider a valid date to lessen the
  // chance of misinterpreting a given value.

  static fromExifStrict(text: string): Maybe<ExifDate> {
    return StrictExifRE.test(toS(text).trim())
      ? this.fromPatterns(text, ["y:MM:dd", "y-MM-dd", "y:M:d"])
      : undefined
  }

  static fromExifLoose(text: string): Maybe<ExifDate> {
    // Unfortunately, Luxon parses "00" and "01" as _today_. So if we don't
    // three non-blank strings parts, reject.
    return LooseExifRE.test(toS(text).trim())
      ? this.fromPatterns(text, ["MMM d y", "MMMM d y"])
      : undefined
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
   * @param deltaMs defaults to 12 hours, so toMillis() is in the middle of the day.
   *
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
