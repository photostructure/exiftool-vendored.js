import { DateTime } from "luxon"

import { first, map, Maybe } from "./Maybe"
import { blank, pad2, toS } from "./String"

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  static fromEXIF(text: string): Maybe<ExifTime> {
    if (blank(text)) return
    text = toS(text).trim()
    return first(["HH:mm:ss.u", "HH:mm:ss"], fmt =>
      map(DateTime.fromFormat(text, fmt), dt => this.fromDateTime(dt))
    )
  }

  static fromDateTime(dt: DateTime): Maybe<ExifTime> {
    return dt == null || !dt.isValid
      ? undefined
      : new ExifTime(dt.hour, dt.minute, dt.second, dt.millisecond)
  }

  constructor(
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number
  ) {}

  get millis() {
    return this.millisecond
  }

  toISOString(): string {
    const fracpart =
      this.millisecond == null || this.millisecond === 0
        ? ""
        : (Math.round(this.millisecond) / 1000).toFixed(3).substring(1)

    return pad2(this.hour, this.minute, this.second).join(":") + fracpart
  }

  toString() {
    return this.toISOString()
  }
}
