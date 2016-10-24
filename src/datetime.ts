
function isDefined<T>(...array: T[]): boolean {
  return array.findIndex(elem => elem === undefined) === -1
}

export function compact<T>(array: T[]): T[] {
  return array.filter((elem) => elem !== undefined && elem !== null)
}

export abstract class Base {
  /**
   * numbers are expected to be > 0.
   * wth node.sprintf, srsly
   */
  protected pad2(...numbers: number[]): string[] {
    return numbers.map(i => `${i >= 10 ? '' : '0'}${i}`)
  }

  protected tz(tzoffsetMinutes: number | undefined): string {
    if (tzoffsetMinutes === undefined) {
      return ''
    } else if (tzoffsetMinutes === 0) {
      return 'Z'
    } else {
      const sign = (tzoffsetMinutes > 0) ? '+' : '-'
      const tzoff = Math.abs(tzoffsetMinutes)
      const hours = Math.floor(tzoff / 60)
      const mins = tzoff - (hours * 60)
      return `${sign}${this.pad2(hours, mins).join(':')}`
    }
  }
}

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime extends Base {
  static regex = /^(\d{2}):(\d{2}):(\d{2})$/
  constructor(
    readonly hour: number,   // 1-23
    readonly minute: number, // 0-59
    readonly second: number, // 0-59
    readonly tzoffsetMinutes?: number
  ) { super() }

  toString(): string {
    return this.pad2(this.hour, this.minute, this.second).join(':')
  }
}

/**
 * Encodes an ExifDate (which may not have a timezone offset)
 */
export class ExifDate extends Base {
  static regex = /^(\d{4}):(\d{2}):(\d{2})$/
  constructor(
    readonly year: number,  // four-digit year
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number,   // 1-31
    readonly tzoffsetMinutes?: number
  ) { super() }

  toString(): string {
    return `${this.year}-${this.pad2(this.month, this.day).join('-')}`
  }
}

/**
 * Encodes an ExifDateTime. 
 */
export class ExifDateTime extends Base {
  // The timezone offset will be extricated prior to this regex:
  static regex = /^(\d{4})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})$/

  constructor(
    readonly year: number,
    readonly month: number,  // 1-12, no crazy 0-11 nonsense
    readonly day: number,    // 1-31
    readonly hour: number,   // 1-23
    readonly minute: number, // 0-59
    readonly second: number, // 0-59
    readonly tzoffsetMinutes?: number
  ) { super() }

  /**
   * Note that this is most likely incorrect if the timezone offset is not set. See the README for details.
   */
  toDate(): Date {
    if (this.tzoffsetMinutes === undefined) {
      const d = new Date()
      d.setFullYear(this.year, this.month - 1, this.day)
      d.setHours(this.hour, this.minute, this.second)
      return d
    } else {
      return new Date(this.toISOString())
    }
  }

  utcToLocalOffsetMinutes(datetime: ExifDateTime): number {
    return (this.toDate().getTime() - datetime.toDate().getTime()) / (1000 * 60)
  }

  toISOString(): string {
    const [mo, da, ho, mi, se] = this.pad2(this.month, this.day, this.hour, this.minute, this.second)
    return `${this.year}-${mo}-${da}T${ho}:${mi}:${se}${this.tz(this.tzoffsetMinutes)}`
  }
}

function _new<T>(re: RegExp, ctor: (args: number[]) => T): ((input: string, tzoffset?: number) => T | undefined) {
  return (input: string, tzoffset?: number) => {
    const match = re.exec(input)
    if (match !== null) {
      const args = match.slice(1).map(s => parseInt(s, 10))
      if (tzoffset !== undefined) {
        args.push(tzoffset)
      }
      return ctor(args)
    } else {
      return undefined
    }
  }
}

// workaround for the fact that the spread operator doesn't work for constructors (!!?):

const newDateTime = _new(ExifDateTime.regex, (a: number[]) => {
  return new ExifDateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6])
})

const newDate = _new(ExifDate.regex, (a: number[]) => {
  return new ExifDate(a[0], a[1], a[2], a[3])
})

const newTime = _new(ExifTime.regex, (a: number[]) => {
  return new ExifTime(a[0], a[1], a[2], a[3])
})

const emptyRe = /^[\s:]*$/ // Some empty datetimes come back as "  :  :  "

export function parse(
  tagName: string,
  rawTagValue: string,
  globalTzOffset?: number
): ExifDate | ExifTime | ExifDateTime | string {
  if (rawTagValue === undefined || emptyRe.exec(rawTagValue)) {
    return rawTagValue
  }

  const tz = new TimeZone(tagName, rawTagValue)
  const tzoffset = compact([tz.tzOffsetMinutes, globalTzOffset])[0]
  const tagValue = tz.inputWithoutTimezone

  return newDateTime(tagValue, tzoffset)
    || newDate(tagValue, tzoffset)
    || newTime(tagValue, tzoffset)
    || rawTagValue
}

export class TimeZone extends Base {
  static regex = /([-+])(\d{2}):(\d{2})$/
  readonly tzOffsetMinutes?: number
  readonly inputWithoutTimezone: string

  constructor(readonly tagName: string, readonly input: string) {
    super()
    if (input === undefined) {
      this.tzOffsetMinutes = undefined
      this.inputWithoutTimezone = input
    } else if (tagName.includes('UTC') || tagName.includes('GPS') || input.toString().endsWith('Z')) {
      this.tzOffsetMinutes = 0
      this.inputWithoutTimezone = input.endsWith('Z') ? input.slice(0, -1) : input
    } else {
      const match = TimeZone.regex.exec(input)
      if (match) {
        const [wholeMatch, offsetSignS, hourOffsetS, minuteOffsetS] = match
        const offsetSign = offsetSignS === '-' ? -1 : 1
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
