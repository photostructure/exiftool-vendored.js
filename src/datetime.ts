
function pad2(i: number) {
  return `${i >= 10 ? '' : '0'}${i}`
}

function parse(re: RegExp, input: string): number[] {
  const match = re.exec(input)
  if (match == null) {
    throw new Error(`Invalid input: ${input}`)
  } else {
    return match.slice(1).map(i => parseInt(i, 10))
  }
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
  private static regex = /(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/

  readonly year: number
  readonly month: number // 1-12, no crazy 0-11 nonsense
  readonly day: number // 1-31
  readonly hour: number // 1-23
  readonly minute: number // 0-59
  readonly second: number // 0-59
  readonly tzoffsetMinutes?: number

  constructor(exifDateTime: string, readonly tzoffset?: number) {
    [this.year, this.month, this.day, this.hour, this.minute, this.second] = parse(ExifDateTime.regex, exifDateTime)
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
