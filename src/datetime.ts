export function compact<T>(array: (T | undefined | null)[]): T[] {
  return array.filter((elem) => elem != null) as T[]
}

export function pad2(...numbers: number[]): string[] {
  return numbers.map(i => {
    const s = i.toString(10)
    return (s.length >= 2) ? s : "0" + s
  })
}

export function pad3(...numbers: number[]): string[] {
  return numbers.map(i => {
    if (i < 0) {
      const s = Math.abs(i).toString(10)
      return "-" + ((s.length >= 2) ? s : "0" + s)
    } else {
      return `000${i}`.slice(Math.min(-3, -(Math.ceil(Math.log10(i)))))
    }
  })
}

/**
 *
 * @param millis [0-1000)
 * @return the decimal fraction of the second (to maximally microsecond precision)
 */
export function millisToFractionalPart(millis: number): string {
  const frac = (millis / 1000).toPrecision(6).split("").slice(1) // pop off the "0." bit
  // strip off microsecond zero padding:
  while (frac.length > 4 && frac[frac.length - 1] === "0") {
    frac.pop()
  }
  return frac.join("")
}

function maybeNew<T>(input: string, tzoffsetMinutes: number | undefined, re: RegExp, ctor: (args: number[]) => T): T | undefined {
  const match = re.exec(input)
  if (match !== null) {
    const args = match.slice(1).map(ea => parseNum((ea || "").trim()))
    if (tzoffsetMinutes != null) {
      args.push(tzoffsetMinutes)
    }
    return ctor(args)
  } else {
    return
  }
}

export abstract class Base {
  protected tz(tzoffsetMinutes: number | undefined): string {
    if (tzoffsetMinutes === undefined) {
      return ""
    } else if (tzoffsetMinutes === 0) {
      return "Z"
    } else {
      const sign = (tzoffsetMinutes >= 0) ? "+" : "-"
      const tzoff = Math.abs(tzoffsetMinutes)
      const hours = Math.floor(tzoff / 60)
      const mins = tzoff - (hours * 60)
      return `${sign}${pad2(hours)}:${pad2(mins)}`
    }
  }
}

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  private static regex = /^(\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?$/

  readonly millis: number

  /**
   * @param hour [1-23]
   * @param minute [0, 59]
   * @param second [0, 59]
   * @param secondFraction [0,1)
   * @param tzoffsetMinutes [-24 * 60, 24 * 60]
   */
  private constructor(
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    secondFraction?: number,
    readonly tzoffsetMinutes?: number
  ) {
    this.millis = (secondFraction != null) ? secondFraction * 1000 : 0
  }

  static for(input: string, tzoffsetMinutes?: number): ExifTime | undefined {
    return maybeNew(input, tzoffsetMinutes, this.regex, (a: number[]) => {
      return new this(a[0], a[1], a[2], a[3], a[4])
    })
  }

  toString(): string {
    return pad2(this.hour, this.minute, this.second).join(":") + millisToFractionalPart(this.millis)
  }
}

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  private static regex = /^(\d{4}):(\d{2}):(\d{2})$/
  constructor(
    readonly year: number,  // four-digit year
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number   // 1-31
  ) { }

  static for(input: string, tzoffsetMinutes?: number): ExifDate | undefined {
    return maybeNew(input, tzoffsetMinutes, this.regex, (a: number[]) => {
      return new this(a[0], a[1], a[2])
    })
  }

  toString(): string {
    return `${this.year}-${pad2(this.month)}-${pad2(this.day)}`
  }

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day)
  }
}

/**
 * Encodes an ExifDateTime.
 */
export class ExifDateTime extends Base {
  // The timezone offset will be extricated prior to this regex:
  private static regex = /^(\d{4})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})(\.\d{1,9})?$/

  /**
   * Note that this may have fractional precision (123.456ms)
   */
  readonly millis: number

  /**
   * @param year full 4-digit value
   * @param month 1-12, no crazy 0-11 nonsense
   * @param day 1-31
   * @param hour 1-23
   * @param minute 0-59
   * @param second 0-59
   * @param secondFraction `[0-1)`
   * @param tzoffsetMinutes
   */
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    secondFraction?: number,
    readonly tzoffsetMinutes?: number
  ) {
    super()
    this.millis = (secondFraction != null) ? secondFraction * 1000 : 0
  }

  static for(input: string, tzoffsetMinutes?: number): ExifDateTime | undefined {
    return maybeNew(input, tzoffsetMinutes, this.regex, (a: number[]) => {
      return new ExifDateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7])
    })
  }

  /**
   * Note that this is most likely incorrect if the timezone offset is not set.
   *
   * See the README for details.
   */
  toDate(): Date {
    if (this.tzoffsetMinutes === undefined) {
      const d = new Date()
      d.setFullYear(this.year, this.month - 1, this.day)
      d.setHours(this.hour, this.minute, this.second)
      return d
    } else if (this.tzoffsetMinutes === 0) {
      // Don't leave it up to string parsing
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millis))
    } else {
      return new Date(this.toISOString())
    }
  }

  toString(): string {
    return this.toISOString()
  }

  toISOString(): string {
    const [mo, da, ho, mi, se] = pad2(this.month, this.day, this.hour, this.minute, this.second)
    return `${this.year}-${mo}-${da}T${ho}:${mi}:${se}${millisToFractionalPart(this.millis)}${this.tz(this.tzoffsetMinutes)}`
  }
}

function parseNum(s: string): number {
  if (s.indexOf(".") !== -1) {
    return parseFloat("0" + s)
  } else {
    return parseInt("0" + s, 10)
  }
}


export class ExifTimeZoneOffset extends Base {
  static regex = /([-+])(\d{2}):(\d{2})$/
  readonly tzOffsetMinutes?: number
  readonly inputWithoutTimezone: string

  constructor(readonly tagName: string, readonly input: string) {
    super()
    if (input === undefined) {
      this.tzOffsetMinutes = undefined
      this.inputWithoutTimezone = input
    } else if (tagName.includes("UTC") || tagName.includes("GPS") || input.toString().endsWith("Z")) {
      this.tzOffsetMinutes = 0
      this.inputWithoutTimezone = input.endsWith("Z") ? input.slice(0, -1) : input
    } else {
      const match = ExifTimeZoneOffset.regex.exec(input)
      if (match) {
        const [wholeMatch, offsetSignS, hourOffsetS, minuteOffsetS] = match
        const offsetSign = offsetSignS === "-" ? -1 : 1
        const hourOffset = parseInt(hourOffsetS, 10)
        const minuteOffset = parseInt(minuteOffsetS, 10)
        this.tzOffsetMinutes = offsetSign * (hourOffset * 60 + minuteOffset)
        this.inputWithoutTimezone = input.slice(0, -1 * wholeMatch.length)
      } else {
        this.tzOffsetMinutes = undefined
        this.inputWithoutTimezone = input
      }
    }
  }

  toString(): string {
    return this.tz(this.tzOffsetMinutes)
  }
}

const emptyRe = /^[\s:0]*$/ // Some empty datetimes come back as "  :  :  "

export function parse(
  tagName: string,
  rawTagValue: string,
  globalTzOffset?: number
): ExifDate | ExifTime | ExifDateTime | ExifTimeZoneOffset | string {
  if (rawTagValue === undefined || emptyRe.exec(rawTagValue)) {
    return rawTagValue
  }

  const tz = new ExifTimeZoneOffset(tagName, rawTagValue)
  // If it's just a timezone:
  if (tz.tzOffsetMinutes != null && emptyRe.exec(tz.inputWithoutTimezone)) {
    return tz
  }
  const tzoffset = compact([tz.tzOffsetMinutes, globalTzOffset])[0]
  const tagValue = tz.inputWithoutTimezone

  return ExifDateTime.for(tagValue, tzoffset)
    || ExifDate.for(tagValue, tzoffset)
    || ExifTime.for(tagValue, tzoffset)
    || rawTagValue
}
