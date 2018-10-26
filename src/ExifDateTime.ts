import { DateTime, ISOTimeOptions } from "luxon"

import { Maybe } from "./Maybe"
import { offsetMinutesToZoneName } from "./Timezones"

/**
 * Encodes an ExifDateTime.
 */
export class ExifDateTime {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number,
    readonly tzoffsetMinutes?: number
  ) {}

  static for(iso: string, tzOffsetMinutes?: Maybe<number>) {
    const dt = DateTime.fromISO(iso, {
      setZone: true,
      zone: offsetMinutesToZoneName(tzOffsetMinutes)
    })
    return dt.isValid ? this.fromDateTime(dt, tzOffsetMinutes) : undefined
  }

  static fromDateTime(
    dt: DateTime,
    tzOffsetMinutes: Maybe<number>
  ): Maybe<ExifDateTime> {
    if (dt.toMillis() === 0 || dt.year == 0 || dt.year == 1) return undefined
    return new ExifDateTime(
      dt.year,
      dt.month,
      dt.day,
      dt.hour,
      dt.minute,
      dt.second,
      dt.millisecond,
      tzOffsetMinutes
    )
  }

  get millis() {
    return this.millisecond
  }

  get zone() {
    return offsetMinutesToZoneName(this.tzoffsetMinutes)
  }

  toDateTime(): DateTime {
    return DateTime.fromObject(this)
  }

  toDate(): Date {
    return this.toDateTime().toJSDate()
  }

  toISOString(options: ISOTimeOptions = {}): string {
    return this.toDateTime().toISO({
      ...options,
      includeOffset: this.tzoffsetMinutes != null
    })
  }

  toString() {
    return this.toISOString()
  }
}
