import {
  DateTime,
  DateTimeJSOptions,
  DurationLike,
  ToISOTimeOptions,
  Zone,
  ZoneOptions,
} from "luxon"
import { MinuteMs, dateTimeToExif } from "./DateTime"
import { Maybe, denull } from "./Maybe"
import { omit } from "./Object"
import { blank, notBlank } from "./String"
import {
  TimeFormatMeta,
  parseDateTime,
  setZone,
  timeFormats,
} from "./TimeParsing"
import {
  UnsetZone,
  UnsetZoneName,
  UnsetZoneOffsetMinutes,
  getZoneName,
} from "./Timezones"

/**
 * Encodes an ExifDateTime with an optional tz offset in minutes.
 */
export class ExifDateTime {
  static from(
    exifOrIso: string,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    return (
      // in order of strictness:
      this.fromExifStrict(exifOrIso, defaultZone) ??
      this.fromISO(exifOrIso, defaultZone) ??
      this.fromExifLoose(exifOrIso, defaultZone)
    )
  }

  static fromISO(
    iso: string,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(iso) || null != iso.match(/^\d+$/)) return undefined
    // Unfortunately, DateTime.fromISO() is happy to parse a date with no time,
    // so we have to do this ourselves:
    return this.#fromPatterns(
      iso,
      timeFormats({
        formatPrefixes: ["y-MM-dd'T'", "y-MM-dd ", "y-M-d "],
        defaultZone,
      })
    )
  }

  /**
   * Try to parse a date-time string from EXIF. If there is not both a date
   * and a time component, returns `undefined`.
   *
   * @param text from EXIF metadata
   * @param defaultZone a "zone name" to use as a backstop, or default, if
   * `text` doesn't specify a zone. This may be IANA-formatted, like
   * "America/Los_Angeles", or an offset, like "UTC-3". See
   * `offsetMinutesToZoneName`.
   */
  static fromEXIF(
    text: string,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    return (
      // .fromExifStrict() uses .fromISO() as a backstop
      this.fromExifStrict(text, defaultZone) ??
      this.fromExifLoose(text, defaultZone)
    )
  }

  static #fromPatterns(
    text: string,
    fmts: Iterable<TimeFormatMeta>
  ): Maybe<ExifDateTime> {
    const result = parseDateTime(text, fmts)
    return result == null
      ? undefined
      : ExifDateTime.fromDateTime(result.dt, {
          rawValue: text,
          unsetMilliseconds: result.unsetMilliseconds,
          inferredZone: result.inferredZone,
        })
  }

  /**
   * Parse the given date-time string, EXIF-formatted.
   *
   * @param text from EXIF metadata, in `y:M:d H:m:s` format (with optional
   * sub-seconds and/or timezone)

   * @param defaultZone a "zone name" to use as a backstop, or default, if
   * `text` doesn't specify a zone. This may be IANA-formatted, like
   * "America/Los_Angeles", or an offset, like "UTC-3". See
   * `offsetMinutesToZoneName`.
   */
  static fromExifStrict(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    return (
      this.#fromPatterns(
        text,
        timeFormats({ formatPrefixes: ["y:MM:dd ", "y:M:d "], defaultZone })
      ) ??
      // Not found yet? Maybe it's in ISO format? See
      // https://github.com/photostructure/exiftool-vendored.js/issues/71
      this.fromISO(text, defaultZone)
    )
  }

  static *#looseExifFormats(defaultZone?: Maybe<string>) {
    // The following are from actual datestamps seen in the wild (!!)
    const formats = [
      "MMM d y HH:mm:ss",
      "MMM d y, HH:mm:ss",
      // Thu Oct 13 00:12:27 2016:
      "ccc MMM d HH:mm:ss y",
    ]
    const zone = notBlank(defaultZone) ? defaultZone : UnsetZone
    for (const fmt of formats) {
      yield { fmt: fmt, zone, inferredZone: true }
    }
  }

  static fromExifLoose(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    return blank(text)
      ? undefined
      : this.#fromPatterns(text, this.#looseExifFormats(defaultZone))
  }

  static fromDateTime(
    dt: Maybe<DateTime>,
    opts?: {
      rawValue?: Maybe<string>
      unsetMilliseconds?: boolean
      inferredZone?: Maybe<boolean>
    }
  ): Maybe<ExifDateTime> {
    if (dt == null || !dt.isValid || dt.year === 0 || dt.year === 1) {
      return undefined
    }
    return new ExifDateTime(
      dt.year,
      dt.month,
      dt.day,
      dt.hour,
      dt.minute,
      dt.second,
      dt.millisecond === 0 && true === opts?.unsetMilliseconds
        ? undefined
        : dt.millisecond,
      dt.offset === UnsetZoneOffsetMinutes ? undefined : dt.offset,
      opts?.rawValue,
      dt.zoneName == null || dt.zone?.name === UnsetZone.name
        ? undefined
        : dt.zoneName,
      opts?.inferredZone
    )
  }

  /**
   * Create an ExifDateTime from a number of milliseconds since the epoch
   * (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   *
   * @param millis - a number of milliseconds since 1970 UTC
   *
   * @param options.rawValue - the original parsed string input
   * @param options.zone - the zone to place the DateTime into. Defaults to 'local'.
   * @param options.locale - a locale to set on the resulting DateTime instance
   * @param options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param options.numberingSystem - the numbering system to set on the resulting DateTime instance
   */
  static fromMillis(
    millis: number,
    options: DateTimeJSOptions & { rawValue?: string } = {}
  ) {
    if (
      options.zone == null ||
      [UnsetZoneName, UnsetZone].includes(options.zone)
    ) {
      delete options.zone
    }
    let dt = DateTime.fromMillis(millis, {
      ...omit(options, "rawValue"),
    })
    if (options.zone == null) {
      dt = dt.setZone(UnsetZone, { keepLocalTime: true })
    }
    // TODO: is there a way to provide an invalid millisecond value?
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.fromDateTime(dt, { rawValue: options.rawValue })!
  }

  static now(
    opts: DateTimeJSOptions & { rawValue?: string } = {}
  ): ExifDateTime {
    return this.fromMillis(Date.now(), opts)
  }

  #dt?: DateTime
  readonly zone: Maybe<string>

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
    readonly zoneName?: string,
    readonly inferredZone?: boolean
  ) {
    this.zone = getZoneName({ zoneName, tzoffsetMinutes })
  }

  get millis() {
    return this.millisecond
  }

  get hasZone(): boolean {
    return this.zone != null
  }

  get unsetMilliseconds(): boolean {
    return this.millisecond == null
  }

  setZone(
    zone: string | Zone,
    opts?: ZoneOptions & { inferredZone?: boolean }
  ): Maybe<ExifDateTime> {
    const dt = setZone({
      zone,
      src: this.toDateTime(),
      srcHasZone: this.hasZone,
      opts,
    })
    return ExifDateTime.fromDateTime(dt, {
      rawValue: this.rawValue,
      unsetMilliseconds: this.millisecond == null,
      inferredZone: opts?.inferredZone ?? true,
    })
  }

  /**
   * CAUTION: This instance will inherit the system timezone if this instance
   * has an unset zone (as Luxon doesn't support "unset" timezones)
   */
  toDateTime(): DateTime {
    return (this.#dt ??= DateTime.fromObject(
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
    ))
  }

  toEpochSeconds() {
    return this.toDateTime().toUnixInteger()
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
    return dateTimeToExif(this.toDateTime(), {
      includeOffset: this.hasZone,
      includeMilliseconds: this.millisecond != null,
    })
  }

  toString() {
    return this.toISOString()
  }

  /**
   * @return the epoch milliseconds of this
   */
  toMillis() {
    return this.toDateTime().toMillis()
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
      inferredZone: this.inferredZone,
    }
  }

  /**
   * @return a new ExifDateTime from the given JSON. Note that this instance **may not be valid**.
   */
  static fromJSON(
    json: Omit<ReturnType<ExifDateTime["toJSON"]>, "_ctor">
  ): ExifDateTime {
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
      json.zoneName,
      json.inferredZone
    )
  }

  maybeMatchZone(
    target: ExifDateTime,
    maxDeltaMs = 14 * MinuteMs
  ): Maybe<ExifDateTime> {
    const targetZone = target.zone
    if (targetZone == null || !target.hasZone) return
    return (
      this.setZone(targetZone, { keepLocalTime: false })?.ifClose(
        target,
        maxDeltaMs
      ) ??
      this.setZone(targetZone, { keepLocalTime: true })?.ifClose(
        target,
        maxDeltaMs
      )
    )
  }

  private ifClose(
    target: ExifDateTime,
    maxDeltaMs = 14 * MinuteMs
  ): Maybe<ExifDateTime> {
    const ts = this.toMillis()
    const targetTs = target.toMillis()
    return Math.abs(ts - targetTs) <= maxDeltaMs ? this : undefined
  }

  plus(duration: DurationLike) {
    let dt = this.toDateTime().plus(duration)
    if (!this.hasZone) {
      dt = dt.setZone(UnsetZone, { keepLocalTime: true })
    }
    return ExifDateTime.fromDateTime(dt, this)
  }
}
