import { DateTime, ToISOTimeOptions, Zone } from "luxon"
import { dateTimeToExif } from "./DateTime"
import { denull, first, firstDefinedThunk, map, Maybe } from "./Maybe"
import { blank, notBlank, toS } from "./String"
import {
  offsetMinutesToZoneName,
  UnsetZone,
  UnsetZoneOffsetMinutes,
} from "./Timezones"

/**
 * Encodes an ExifDateTime with an optional tz offset in minutes.
 */
export class ExifDateTime {
  static fromISO(
    iso: string,
    zone?: Maybe<string>,
    rawValue?: string
  ): Maybe<ExifDateTime> {
    if (blank(iso) || null != iso.match(/^\d+$/)) return undefined
    return this.fromDateTime(
      DateTime.fromISO(iso, {
        setZone: true,
        zone: zone ?? UnsetZone,
      }),
      rawValue ?? iso
    )
  }

  /**
   * Try to parse a date-time string from EXIF. If there is not both a date and
   * a time component, returns `undefined`.
   *
   * @param text from EXIF metadata
   * @param defaultZone a "zone name" which may be IANA, like
   * "America/Los_Angeles", or an offset, like "UTC-3". See
   * `offsetMinutesToZoneName`.
   */
  static fromEXIF(
    text: string,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    return firstDefinedThunk([
      () => this.fromExifStrict(text, defaultZone),
      () => this.fromISO(text, defaultZone),
      () => this.fromExifLoose(text, defaultZone),
    ])
  }

  private static fromPatterns(
    text: string,
    fmts: { fmt: string; zone?: string | Zone | undefined }[]
  ) {
    const s = toS(text).trim()
    const inputs = [s]

    // Some EXIF datetime will "over-specify" and include both the utc offset
    // *and* the "time zone abbreviation", like PST or PDT.
    // TZAs are between 2 (AT) and 5 (WEST) characters.

    // Unfortunately, luxon doesn't support regex.

    // We only want to strip off the TZA if it isn't "UTC" or "Z"
    if (null == s.match(/[.\d\s](utc|z)$/i)) {
      const noTza = s.replace(/ [a-z]{2,5}$/i, "")
      if (noTza !== s) inputs.push(noTza)
    }

    return first(inputs, (input) =>
      first(fmts, ({ fmt, zone }) =>
        map(
          DateTime.fromFormat(input, fmt, {
            setZone: true,
            zone: zone ?? UnsetZone,
          }),
          (dt) => this.fromDateTime(dt, s)
        )
      )
    )
  }

  static fromExifStrict(
    text: Maybe<string>,
    zone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    return this.fromPatterns(text, [
      // if it specifies a zone, use it:
      { fmt: "y:M:d H:m:s.uZZ" },
      { fmt: "y:M:d H:m:sZZ" },

      // if it specifies UTC, use it:
      { fmt: "y:M:d H:m:s.u'Z'", zone: "utc" },
      { fmt: "y:M:d H:m:s'Z'", zone: "utc" },

      // Otherwise use the default zone:
      { fmt: "y:M:d H:m:s.u", zone },
      { fmt: "y:M:d H:m:s", zone },

      // Not found yet? Maybe it's in ISO format? See https://github.com/photostructure/exiftool-vendored.js/issues/71

      // if it specifies a zone, use it:
      { fmt: "y-M-d'T'H:m:s.uZZ" },
      { fmt: "y-M-d'T'H:m:sZZ" },

      // if it specifies UTC, use it:
      { fmt: "y-M-d'T'H:m:s.u'Z'", zone: "utc" },
      { fmt: "y-M-d'T'H:m:s'Z'", zone: "utc" },

      // Otherwise use the default zone:
      { fmt: "y-M-d'T'H:m:s.u", zone },
      { fmt: "y-M-d'T'H:m:s", zone },
    ])
  }

  static fromExifLoose(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    const zone = notBlank(defaultZone) ? defaultZone : UnsetZone
    return this.fromPatterns(text, [
      // FWIW, the following are from actual datestamps seen in the wild:
      { fmt: "MMM d y H:m:sZZZ" },
      { fmt: "MMM d y H:m:s", zone },
      { fmt: "MMM d y, H:m:sZZZ" },
      { fmt: "MMM d y, H:m:s", zone },
      // Thu Oct 13 00:12:27 2016:
      { fmt: "ccc MMM d H:m:s yZZ" },
      { fmt: "ccc MMM d H:m:s y", zone },
    ])
  }

  static fromDateTime(dt: DateTime, rawValue?: string): Maybe<ExifDateTime> {
    if (
      dt == null ||
      !dt.isValid ||
      dt.toMillis() === 0 ||
      dt.year === 0 ||
      dt.year === 1
    ) {
      return undefined
    }
    return new ExifDateTime(
      dt.year,
      dt.month,
      dt.day,
      dt.hour,
      dt.minute,
      dt.second,
      dt.millisecond,
      dt.offset === UnsetZoneOffsetMinutes ? undefined : dt.offset,
      rawValue,
      dt.zone?.name === UnsetZone.name ? undefined : dt.zoneName
    )
  }

  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number,
    readonly tzoffsetMinutes?: number,
    readonly rawValue?: string,
    readonly zoneName?: string
  ) {}

  get millis() {
    return this.millisecond
  }

  get hasZone() {
    return notBlank(this.zone)
  }

  get zone() {
    return this.zoneName ?? offsetMinutesToZoneName(this.tzoffsetMinutes)
  }

  toDateTime() {
    return DateTime.fromObject(
      {
        year: this.year,
        month: this.month,
        day: this.day,
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        millisecond: this.millisecond,
      },
      {
        zone: this.zone,
      }
    )
  }

  toDate(): Date {
    return this.toDateTime().toJSDate()
  }

  toISOString(options: ToISOTimeOptions = {}): Maybe<string> {
    return denull(
      this.toDateTime().toISO({
        suppressMilliseconds:
          options.suppressMilliseconds ?? this.millisecond == null,
        includeOffset: this.hasZone && options.includeOffset !== false,
      })
    )
  }

  toExifString() {
    return dateTimeToExif(this.toDateTime())
  }

  toString() {
    return this.toISOString()
  }

  get isValid() {
    return this.toDateTime().isValid
  }

  toJSON() {
    return {
      _ctor: "ExifDateTime",
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
      tzoffsetMinutes: this.tzoffsetMinutes,
      rawValue: this.rawValue,
      zoneName: this.zoneName,
    }
  }

  static fromJSON(json: ReturnType<ExifDateTime["toJSON"]>): ExifDateTime {
    return new ExifDateTime(
      json.year,
      json.month,
      json.day,
      json.hour,
      json.minute,
      json.second,
      json.millisecond,
      json.tzoffsetMinutes,
      json.rawValue,
      json.zoneName
    )
  }
}
