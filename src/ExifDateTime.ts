import { DateTime, ISOTimeOptions } from "luxon"

import { dateTimeToExif } from "./DateTime"
import { first, firstDefinedThunk, map, Maybe, orElse } from "./Maybe"
import { blank, notBlank, toS } from "./String"
import { offsetMinutesToZoneName } from "./Timezones"

// Not in typings:
const { FixedOffsetZone } = require("luxon")
const unsetZoneOffsetMinutes = -24 * 60
const unsetZone = new FixedOffsetZone(unsetZoneOffsetMinutes)

/**
 * Encodes an ExifDateTime with an optional tz offset in minutes.
 */
export class ExifDateTime {
  static fromISO(
    iso: string,
    defaultZone?: Maybe<string>,
    rawValue?: string
  ): Maybe<ExifDateTime> {
    if (blank(iso)) return undefined
    return this.fromDateTime(
      DateTime.fromISO(iso, {
        setZone: true,
        zone: orElse(defaultZone, unsetZone)
      }),
      orElse(rawValue, iso)
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
      () => this.fromExifLoose(text, defaultZone)
    ])
  }

  private static fromPatterns(
    text: string,
    fmts: { fmt: string; zone?: string }[]
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

    return first(inputs, input =>
      first(fmts, ({ fmt, zone: fmtZone }) =>
        map(
          DateTime.fromFormat(input, fmt, { setZone: true, zone: fmtZone }),
          dt => this.fromDateTime(dt, s)
        )
      )
    )
  }

  static fromExifStrict(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    const zone = notBlank(defaultZone) ? defaultZone : unsetZone
    return this.fromPatterns(text, [
      // if it specifies a zone, use it:
      { fmt: "y:M:d H:m:s.uZZ" },
      { fmt: "y:M:d H:m:sZZ" },
      // if it specifies UTC, use it:
      { fmt: "y:M:d H:m:s.u'Z'", zone: "utc" },
      { fmt: "y:M:d H:m:s'Z'", zone: "utc" },
      // Otherwise use the default zone:
      { fmt: "y:M:d H:m:s.u", zone },
      { fmt: "y:M:d H:m:s", zone }
    ])
  }

  static fromExifLoose(
    text: Maybe<string>,
    defaultZone?: Maybe<string>
  ): Maybe<ExifDateTime> {
    if (blank(text)) return undefined
    const zone = notBlank(defaultZone) ? defaultZone : unsetZone
    return this.fromPatterns(text, [
      // FWIW, the following are from actual datestamps seen in the wild:
      { fmt: "MMM d y H:m:sZZZ" },
      { fmt: "MMM d y H:m:s", zone },
      { fmt: "MMM d y, H:m:sZZZ" },
      { fmt: "MMM d y, H:m:s", zone },
      // Thu Oct 13 00:12:27 2016:
      { fmt: "ccc MMM d H:m:s yZZ" },
      { fmt: "ccc MMM d H:m:s y", zone }
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
      dt.offset === unsetZoneOffsetMinutes ? undefined : dt.offset,
      rawValue
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
    readonly rawValue?: string
  ) {}

  get millis() {
    return this.millisecond
  }

  get hasZone() {
    return (
      this.tzoffsetMinutes != null &&
      this.tzoffsetMinutes !== unsetZoneOffsetMinutes
    )
  }

  get zone() {
    return this.hasZone
      ? offsetMinutesToZoneName(this.tzoffsetMinutes)
      : undefined
  }

  toDateTime(): DateTime {
    const o: any = {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    }
    map(this.millisecond, ea => (o.millisecond = ea))
    if (this.hasZone) {
      map(this.tzoffsetMinutes, ea => (o.zone = offsetMinutesToZoneName(ea)))
    }
    return DateTime.fromObject(o)
  }

  toDate(): Date {
    return this.toDateTime().toJSDate()
  }

  toISOString(options: ISOTimeOptions = {}): string {
    return this.toDateTime().toISO({
      suppressMilliseconds: orElse(
        options.suppressMilliseconds,
        () => this.millisecond == null
      ),
      includeOffset: this.hasZone && options.includeOffset !== false
    })
  }

  toExifString() {
    return dateTimeToExif(this.toDateTime())
  }

  toString() {
    return this.toISOString()
  }
}
