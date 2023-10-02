import { DateTime, Zone, ZoneOptions } from "luxon"
import { validDateTime } from "./DateTime"
import { Maybe } from "./Maybe"
import { pad2, pad3, toS } from "./String"
import { parseDateTime, setZone, timeFormats } from "./TimeParsing"
import { getZoneName, zoneToShortOffset } from "./Timezones"

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  static fromEXIF(text: string, defaultZone?: Maybe<string>): Maybe<ExifTime> {
    const s = toS(text).trim()
    if (s.length === 0) return
    const result = parseDateTime(text, timeFormats({ defaultZone }))
    if (result != null) {
      return this.fromDateTime(
        result.dt,
        text,
        result.unsetZone ? undefined : getZoneName({ zone: result.dt.zone }),
        result.inferredZone,
        result.unsetMilliseconds
      )
    }
    return
  }

  static fromDateTime(
    dt: Maybe<DateTime>,
    rawValue?: string,
    zone?: string,
    inferredZone?: boolean,
    unsetMilliseconds?: boolean
  ): Maybe<ExifTime> {
    return !validDateTime(dt)
      ? undefined
      : new ExifTime(
          dt.hour,
          dt.minute,
          dt.second,
          unsetMilliseconds ? undefined : dt.millisecond,
          rawValue,
          zone,
          inferredZone
        )
  }

  #dt?: DateTime
  #z?: Maybe<string>
  readonly zone: Maybe<string>

  constructor(
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number,
    readonly rawValue?: string,
    zoneName?: Maybe<string>,
    readonly inferredZone?: boolean
  ) {
    this.zone = getZoneName({ zoneName })
  }

  toDateTime(): DateTime {
    return (this.#dt ??= DateTime.fromObject(
      {
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        millisecond: this.millisecond,
      },
      {
        zone: this.zone,
      }
    ))
  }

  /**
   * Alias for `.millisecond`
   */
  get millis() {
    return this.millisecond
  }

  get hasZone(): boolean {
    return this.zone != null
  }

  #subsec() {
    return this.millisecond == null ? "" : "." + pad3(this.millisecond)
  }

  #shortZone() {
    return (this.#z ??= zoneToShortOffset(this.zone))
  }

  toString() {
    return (
      pad2(this.hour, this.minute, this.second).join(":") +
      this.#subsec() +
      this.#shortZone()
    )
  }

  toISOString() {
    return this.toString()
  }

  toExifString() {
    return this.toString()
  }

  setZone(zone: string | Zone, opts?: ZoneOptions): Maybe<ExifTime> {
    const dt = setZone({
      zone,
      src: this.toDateTime(),
      srcHasZone: this.hasZone,
      opts,
    })
    return ExifTime.fromDateTime(
      dt,
      this.rawValue,
      this.zone,
      this.inferredZone,
      this.millisecond == null
    )
  }

  toJSON() {
    return {
      _ctor: "ExifTime",
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
      rawValue: this.rawValue,
      zone: this.zone,
      inferredZone: this.inferredZone,
    }
  }

  static fromJSON(json: ReturnType<ExifTime["toJSON"]>): ExifTime {
    return new ExifTime(
      json.hour,
      json.minute,
      json.second,
      json.millisecond,
      json.rawValue,
      json.zone,
      json.inferredZone
    )
  }
}
