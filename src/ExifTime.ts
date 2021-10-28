import { DateTime } from "luxon"
import { first, map, Maybe } from "./Maybe"
import { blank, pad2, pad3, toS } from "./String"

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  static fromEXIF(text: string): Maybe<ExifTime> {
    if (blank(text)) return
    text = toS(text).trim()
    return first(
      ["HH:mm:ss.uZZ", "HH:mm:ssZZ", "HH:mm:ss.u", "HH:mm:ss"],
      (fmt) =>
        map(DateTime.fromFormat(text, fmt), (dt) => this.fromDateTime(dt))
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
    }
  }

  static fromJSON(json: ReturnType<ExifTime["toJSON"]>): ExifTime {
    return new ExifTime(json.hour, json.minute, json.second, json.millisecond)
  }
}
