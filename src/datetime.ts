
export function compact<T>(array: T[]): T[] {
  return array.filter((elem) => elem !== undefined && elem !== null)
}

export function pad2(...numbers: number[]): string[] {
  return numbers.map(i => {
    const s = i.toString(10)
    return (s.length >= 2) ? s : '0' + s
  })
}

export function pad3(...numbers: number[]): string[] {
  return numbers.map(i => {
    if (i < 0) {
      const s = Math.abs(i).toString(10)
      return '-' + ((s.length >= 2) ? s : '0' + s)
    } else {
      return `000${i}`.slice(Math.min(-3, -(Math.ceil(Math.log10(i)))))
    }
  })
}

export abstract class Base {
  protected tz(tzoffsetMinutes: number | undefined): string {
    if (tzoffsetMinutes === undefined) {
      return ''
    } else if (tzoffsetMinutes === 0) {
      return 'Z'
    } else {
      const sign = (tzoffsetMinutes >= 0) ? '+' : '-'
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
  static regex = /^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?$/

  readonly millis: number

  constructor(
    readonly hour: number,   // 1-23
    readonly minute: number, // 0-59
    readonly second: number, // 0-59
    secondFraction?: number, // 0-999
    readonly tzoffsetMinutes?: number
  ) {
    this.millis = (secondFraction !== undefined) ? parseFloat(`0.${secondFraction}`) * 1000 : 0
  }

  toString(): string {
    return pad2(this.hour, this.minute, this.second).join(':')
  }
}

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  static regex = /^(\d{4}):(\d{2}):(\d{2})$/
  constructor(
    readonly year: number,  // four-digit year
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number   // 1-31
  ) { } // tslint:disable-line

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
  static regex = /^(\d{4})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})(?:\.(\d{1,6}))?$/

  /**
   * Note that this may have fractional precision (123.456ms)
   */
  readonly millis: number

  constructor(
    readonly year: number,
    readonly month: number,  // 1-12, no crazy 0-11 nonsense
    readonly day: number,    // 1-31
    readonly hour: number,   // 1-23
    readonly minute: number, // 0-59
    readonly second: number, // 0-59
    secondFraction?: number, // 0-999
    readonly tzoffsetMinutes?: number
  ) {
    super()
    this.millis = (secondFraction !== undefined) ? parseFloat(`0.${secondFraction}`) * 1000 : 0
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
    return `${this.year}-${mo}-${da}T${ho}:${mi}:${se}.${pad3(this.millis)}${this.tz(this.tzoffsetMinutes)}`
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

export class ExifTimeZoneOffset extends Base {
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
      const match = ExifTimeZoneOffset.regex.exec(input)
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

// workaround for the fact that the spread operator doesn't work for constructors (!!?):

const newDateTime = _new(ExifDateTime.regex, (a: number[]) => {
  return new ExifDateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7])
})

const newDate = _new(ExifDate.regex, (a: number[]) => {
  return new ExifDate(a[0], a[1], a[2])
})

const newTime = _new(ExifTime.regex, (a: number[]) => {
  return new ExifTime(a[0], a[1], a[2], a[3], a[4])
})

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
  if (tz.tzOffsetMinutes !== undefined && emptyRe.exec(tz.inputWithoutTimezone)) {
    return tz
  }
  const tzoffset = compact([tz.tzOffsetMinutes, globalTzOffset])[0]
  const tagValue = tz.inputWithoutTimezone

  return newDateTime(tagValue, tzoffset)
    || newDate(tagValue, tzoffset)
    || newTime(tagValue, tzoffset)
    || rawTagValue
}
