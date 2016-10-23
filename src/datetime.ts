
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
  static regex = /(\d{2}):(\d{2}):(\d{2})/
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
  static regex = /(\d{4}):(\d{2}):(\d{2})/
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
 * Encodes an ExifDateTime (which may not have a timezone offset)
 */
export class ExifDateTime extends Base {
  static regex = /(\d{4})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})(?:([-+])(\d{2}):(\d{2}))?/

  readonly tzoffsetMinutes?: number

  constructor(
    readonly year: number,
    readonly month: number,  // 1-12, no crazy 0-11 nonsense
    readonly day: number,    // 1-31
    readonly hour: number,   // 1-23
    readonly minute: number, // 0-59
    readonly second: number, // 0-59
    offsetSign: number,
    hourOffset: number,
    minuteOffset: number,
    tzoffsetMinutes?: number
  ) {
    super()
    const offsets = [tzoffsetMinutes]
    if (isDefined(offsetSign, hourOffset, minuteOffset)) {
      offsets.unshift(offsetSign * (hourOffset * 60 + minuteOffset))
    }
    this.tzoffsetMinutes = compact(offsets).shift() // first one wins
    console.log(`ExifDateTime ${this.toISOString()}: tzoffsetMinutes: ${tzoffsetMinutes}`)
  }

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

function parseIntOrSign(s: string): number {
  if (s === undefined) {
    return s
  } else if (s === '+') {
    return 1
  } else if (s === '-') {
    return -1
  } else {
    return parseInt(s, 10)
  }
}

function _new<T>(re: RegExp, ctor: (args: number[]) => T): ((input: string, tzoffset?: number) => T | undefined) {
  return (input: string, tzoffset?: number) => {
    const match = re.exec(input)
    if (match) {
      const args = match.slice(1).map(i => parseIntOrSign(i))
      if (tzoffset !== undefined) {
        args.push(tzoffset)
      }
      console.log(`args is now ${args}`)
      return ctor(args)
    } else {
      return undefined
    }
  }
}

// workaround for the fact that the spread operator doesn't work for constructors (!!?):

const newDateTime = _new(ExifDateTime.regex, (a: number[]) => {
  return new ExifDateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9])
})

const newDate = _new(ExifDate.regex, (a: number[]) => {
  return new ExifDate(a[0], a[1], a[2], a[3])
})

const newTime = _new(ExifTime.regex, (a: number[]) => {
  return new ExifTime(a[0], a[1], a[2], a[3])
})

const emptyRe = /^[\s:]*$/ // Some empty datetimes come back as "  :  :  "

export function parse(tagName: string, rawTagValue: string): ExifDate | ExifTime | ExifDateTime | undefined {
  if (rawTagValue === undefined || emptyRe.exec(rawTagValue)) {
    return undefined
  }

  // These tzoffset hints aren't handled by the regexes, so we do them beforehand.
  const tzoffset = (tagName.includes('UTC') || tagName.includes('GPS') || rawTagValue.endsWith('Z'))
    ? 0 : undefined

  console.log(`parse(${tagName}, ${rawTagValue}): tzoffset: ${tzoffset}`)

  const tagValue = rawTagValue.endsWith('Z') ? rawTagValue.slice(0, -1) : rawTagValue

  return newDateTime(tagValue, tzoffset)
    || newDate(tagValue, tzoffset)
    || newTime(tagValue, tzoffset)
}
