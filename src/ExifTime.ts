import { DateTime } from "luxon"
import { validDateTime } from "./DateTime"
import { Maybe } from "./Maybe"
import { blank, pad2, pad3, toS } from "./String"

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  static fromEXIF(text: string): Maybe<ExifTime> {
    text = toS(text).trim()
    if (blank(text)) return
    for (const fmt of [
      "HH:mm:ss.uZZ",
      "HH:mm:ssZZ",
      "HH:mm:ss.u",
      "HH:mm:ss",
    ]) {
      const result = this.fromDateTime(DateTime.fromFormat(text, fmt), text)
      if (result != null) return result
    }
    return
  }

  static fromDateTime(dt: DateTime, rawValue?: string): Maybe<ExifTime> {
    return validDateTime(dt)
      ? new ExifTime(dt.hour, dt.minute, dt.second, dt.millisecond, rawValue)
      : undefined
  }

  constructor(
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number,
    readonly rawValue?: string
  ) {}

  get millis() {
    return this.millisecond
  }

  private subsec() {
    return this.millisecond == null || this.millisecond === 0
      ? ""
      : "." + pad3(this.millisecond)
  }

  toString() {
    return pad2(this.hour, this.minute, this.second).join(":") + this.subsec()
  }

  toISOString() {
    return this.toString()
  }

  toExifString() {
    return this.toString()
  }

  toJSON() {
    return {
      _ctor: "ExifTime",
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
      rawValue: this.rawValue,
    }
  }

  static fromJSON(json: ReturnType<ExifTime["toJSON"]>): ExifTime {
    return new ExifTime(
      json.hour,
      json.minute,
      json.second,
      json.millisecond,
      json.rawValue
    )
  }
}
