function pad2(i: number) {
  return `${i >= 10 ? '' : '0'}${i}`
}

function parseIntOrSign(s: string): number {
  if (s === '+') {
    return 1
  } else if (s === '-') {
    return -1
  } else {
    return parseInt(s, 10)
  }
}

export class BadDate extends Error {
  // yeah, http://indianajones.wikia.com/wiki/Date
}

function parse(re: RegExp, input: string): number[] {
  const match = re.exec(input)
  if (match == null) {
    throw new BadDate('Invalid input')
  } else {
    return match.slice(1).map(i => parseIntOrSign(i))
  }
}

/**
 * @return 
 */
function isDefined<T>(...array: T[]): boolean {
  return array.findIndex((elem) => elem !== undefined) === -1
}

function compactuniq<T>(array: T[]): T[] {
  return array.filter((elem, idx, arr) => elem !== undefined && arr.indexOf(elem) >= idx)
}

export class ExifTime {
  private static regex = /(\d{2}):(\d{2}):(\d{2})/
  readonly hour: number // 1-23
  readonly minute: number // 0-59
  readonly second: number // 0-59

  constructor(exifTime: string, readonly tzoffset?: number) {
    [this.hour, this.minute, this.second] = parse(ExifTime.regex, exifTime)
  }

  toString(): string {
    return `${pad2(this.hour)}:${pad2(this.minute)}:${this.second}`
  }
}

export class ExifDate {
  private static regex = /(\d{4}):(\d{2}):(\d{2})/
  readonly year: number
  readonly month: number // 1-12, no crazy 0-11 nonsense
  readonly day: number // 1-31

  constructor(exifDate: string, readonly tzoffset?: number) {
    [this.year, this.month, this.day] = parse(ExifDate.regex, exifDate)
  }

  toString(): string {
    return `${this.year}-${pad2(this.month)}-${pad2(this.day)}`
  }
}

/**
 * Encodes an ExifDate (which most likely has no timezone offset)
 */
export class ExifDateTime {
  private static regex = /(\d{4})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})[ :]+(\d{2})(?:([-+])(\d{2}):(\d{2}))?/

  readonly year: number
  readonly month: number // 1-12, no crazy 0-11 nonsense
  readonly day: number // 1-31
  readonly hour: number // 1-23
  readonly minute: number // 0-59
  readonly second: number // 0-59
  readonly tzoffsetMinutes?: number

  constructor(exifDateTime: string, tzoffsetMinutes?: number) {
    let offsetSign: number
    let hourOffset: number
    let minuteOffset: number
    const offsets = [tzoffsetMinutes]

    if (exifDateTime.endsWith('Z') ) {
      offsets.push(0)
      exifDateTime = exifDateTime.slice(0, -1)
    }

    [this.year, this.month, this.day, this.hour, this.minute, this.second, offsetSign, hourOffset, minuteOffset]
      = parse(ExifDateTime.regex, exifDateTime)
    // Parse offsetSign separately so sub-hour offsets can still be negative
    if (isDefined(offsetSign, hourOffset, minuteOffset)) {
      offsets.push(offsetSign * (hourOffset * 60 + minuteOffset))
    }
    const definedOffsets = compactuniq(offsets)
    if (definedOffsets.length > 1) {
      throw new Error('Cannot specify inequal exifDateTime tz offset and tzoffsetMinutes')
    } else {
      this.tzoffsetMinutes = definedOffsets[0]
    }
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
    return `${this.year}-${pad2(this.month)}-${pad2(this.day)}`
      + `T${pad2(this.hour)}:${pad2(this.minute)}:${this.second}${this.tz()}`
  }

  private tz(): string {
    if (this.tzoffsetMinutes === undefined) {
      return ''
    } else if (this.tzoffsetMinutes === 0) {
      return 'Z'
    } else {
      const sign = (this.tzoffsetMinutes > 0) ? '+' : '-'
      const tzoff = Math.abs(this.tzoffsetMinutes)
      const hours = Math.floor(tzoff / 60)
      const mins = tzoff - (hours * 60)
      return `${sign}${pad2(hours)}:${pad2(mins)}`
    }
  }
}
