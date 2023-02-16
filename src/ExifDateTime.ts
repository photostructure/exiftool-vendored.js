import {
  DateTime,
  DateTimeJSOptions,
  DurationLike,
  ToISOTimeOptions,
  Zone,
  ZoneOptions,
} from "luxon"
import { dateTimeToExif } from "./DateTime"
import { denull, Maybe } from "./Maybe"
import { omit } from "./Object"
import { blank, notBlank, toS } from "./String"
import {
  offsetMinutesToZoneName,
  UnsetZone,
  UnsetZoneOffsetMinutes,
} from "./Timezones"

const TimeFmts = [
  { fmt: "HH:mm:ss.u", unsetMilliseconds: false },
  { fmt: "HH:mm:ss", unsetMilliseconds: true },
  { fmt: "HH:mm", unsetMilliseconds: true },
] as const

/**
 * Encodes an ExifDateTime with an optional tz offset in minutes.
 */
export class ExifDateTime {
  #dt?: DateTime

  static fromISO(
    iso: string,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(iso) || null != iso.match(/^\d+$/)) return undefined
    // Unfortunately, DateTime.fromISO() is happy to parse a date with no time,
    // so we have to do this ourselves:
    const patterns = []
    for (const z of [
      { fmt: "ZZ", zone: undefined },
      { fmt: "'Z'", zone: "UTC" },
      { fmt: "", zone: defaultZone },
    ]) {
      for (const sep of ["'T'", " "]) {
        for (const timeFmt of TimeFmts) {
          patterns.push({
            fmt: `y-M-d${sep}${timeFmt.fmt}${z.fmt}`,
            zone: z.zone,
            unsetMilliseconds: timeFmt.unsetMilliseconds,
          })
        }
      }
    }
    return this.fromPatterns(iso, patterns)
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

  private static fromPatterns(
    text: string,
    fmts: {
      fmt: string
      zone?: string | Zone | undefined
      unsetMilliseconds?: boolean
    }[]
  ): Maybe<ExifDateTime> {
    const s = toS(text).trim()
    const inputs = [s]

    // Some EXIF datetime will "over-specify" and include both the utc offset
    // *and* the "time zone abbreviation", like PST or PDT.
    // TZAs are between 2 (AT) and 5 (WEST) characters.

    // Unfortunately, luxon doesn't support regex.

    // We only want to strip off the TZA if it isn't "UTC" or "Z"
    if (null == s.match(/[.\d\s](UTC|Z)$/)) {
      const noTza = s.replace(/ [a-z]{2,5}$/i, "")
      if (noTza !== s) inputs.push(noTza)
    }
    // PERF: unroll first() to avoid creating closures
    for (const input of inputs) {
      for (const { fmt, zone, unsetMilliseconds } of fmts) {
        const dt = DateTime.fromFormat(input, fmt, {
          setZone: true,
          zone: zone ?? UnsetZone,
        })
        const edt = ExifDateTime.fromDateTime(dt, {
          rawValue: s,
          unsetMilliseconds: unsetMilliseconds ?? false,
        })
        if (edt != null) return edt
      }
    }
    return
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
    const patterns = []

    for (const z of [
      { fmt: "ZZ", zone: undefined },
      { fmt: "'Z'", zone: "UTC" },
      { fmt: "", zone: defaultZone },
    ]) {
      for (const timeFmt of TimeFmts) {
        patterns.push({
          fmt: `y:M:d ${timeFmt.fmt}${z.fmt}`,
          zone: z.zone,
          unsetMilliseconds: timeFmt.unsetMilliseconds,
        })
      }
    }

    return (
      this.fromPatterns(text, patterns) ??
      // Not found yet? Maybe it's in ISO format? See
      // https://github.com/photostructure/exiftool-vendored.js/issues/71
      this.fromISO(text, defaultZone)
    )
  }

  static fromExifLoose(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    const zone = notBlank(defaultZone) ? defaultZone : UnsetZone
    // The following are from actual datestamps seen in the wild:
    const formats = [
      "MMM d y H:m:s",
      "MMM d y, H:m:s",
      // Thu Oct 13 00:12:27 2016:
      "ccc MMM d H:m:s y",
    ]
    return this.fromPatterns(text, [
      ...formats.map((fmt) => ({ fmt: fmt + "ZZ" })),
      // And the same formats, without offsets with default zone:
      ...formats.map((fmt) => ({ fmt, zone })),
    ])
  }

  static fromDateTime(
    dt: Maybe<DateTime>,
    opts?: { rawValue?: Maybe<string>; unsetMilliseconds?: boolean }
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
      dt.zone?.name === UnsetZone.name ? undefined : dt.zoneName
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

  get hasZone(): boolean {
    return notBlank(this.zone)
  }

  get zone(): Maybe<string> {
    return this.zoneName ?? offsetMinutesToZoneName(this.tzoffsetMinutes)
  }

  setZone(zone?: string | Zone, opts?: ZoneOptions): Maybe<ExifDateTime> {
    // This is a bit tricky... We want to keep the local time and just _say_ it was in the zone of the image **if we don't already have a zone.**

    // If we _do_ have a zone, assume it was already converted by ExifTool into (probably the system) timezone, which means _don't_ keepLocalTime.
    const dt = this.toDateTime().setZone(zone, {
      keepLocalTime: !this.hasZone,
      ...opts,
    })
    const result = ExifDateTime.fromDateTime(dt, {
      rawValue: this.rawValue,
      unsetMilliseconds: this.millisecond == null,
    })

    // We know this will be defined: this is valid, so changing the zone will
    // also be valid.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result
  }

  /**
   * CAUTION: This instance will inherit the system timezone if this instance
   * has an unset zone
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
      json.zoneName
    )
  }

  plus(duration: DurationLike) {
    let dt = this.toDateTime().plus(duration)
    if (!this.hasZone) {
      dt = dt.setZone(UnsetZone, { keepLocalTime: true })
    }
    return ExifDateTime.fromDateTime(dt)
  }
}
