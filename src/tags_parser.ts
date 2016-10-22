import { BadDate, ExifDate, ExifDateTime, ExifTime } from './datetime'
import { Tags } from './exiftool'
import { Parser } from './parser'
import * as _path from 'path'

export class TagsParser implements Parser<Tags> {
  readonly filename: string
  private errors: string[] = []

  constructor(filename: string) {
    this.filename = _path.resolve(filename)
  }

  parse(value: string): Tags {
    if (input.trim().length === 0) {
      return { SourceFile: this.filename, errors: this.errors } as Tags
    }
    const value = this.parseTags(JSON.parse(input)[0])
    const srcFile = _path.resolve(value.SourceFile)
    // Sanity check that the result is for the file we want:
    if (srcFile !== this.filename) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(`Internal error: unexpected SourceFile of ${value.SourceFile} for file ${this.filename}`)
    }
    if (this.errors.length > 0) {
      value['errors'] = this.errors
    }
    return value
  }

  onError(message: string) {
    this.errors.push(message)
  }

  parseTags(t: any): Tags {
    const parsedTags: any = {}
    let tzoffset: number | undefined
    if (t.GPSDateTime && t.DateTimeOriginal) {
      const gps = new ExifDateTime(t.GPSDateTime)
      const local = new ExifDateTime(t.DateTimeOriginal)
      tzoffset = gps.utcToLocalOffsetMinutes(local)
    }
    Object.keys(t).forEach(key => {
      parsedTags[key] = this.parseTag(t, key, t[key], tzoffset)
    })
    return parsedTags as Tags
  }

  parseTag(rawTags: any, tagName: string, value: any, tzoffset: number | undefined): any {
    try {
      if (tagName.endsWith('DateStampMode') || tagName.endsWith('Sharpness')
        || tagName.endsWith('Firmware') || tagName.endsWith('DateDisplayFormat')) {
        return value.toString() // force to string
      } else if (tagName.endsWith('BitsPerSample')) {
        return value.toString().split(' ').map((i: string) => parseInt(i, 10))
      } else if (tagName.endsWith('FlashFired')) {
        const s = value.toString().toLowerCase()
        return (s === 'yes' || s === '1' || s === 'true')
      } else if (tagName.endsWith('DateTimeUTC')) {
        return new ExifDateTime(value.toString(), 0)
      } else if (tagName.endsWith('GPSDateStamp')) {
        return new ExifDate(value.toString(), 0)
      } else if (tagName.endsWith('GPSTimeStamp')) {
        return new ExifTime(value.toString(), 0)
      } else if (tagName.includes('DateStamp')) {
        return new ExifDate(value.toString(), tzoffset)
      } else if (tagName.includes('TimeStamp')) {
        return new ExifTime(value.toString(), tzoffset)
      } else if (tagName.includes('Date')) {
        return new ExifDateTime(value.toString(), tzoffset)
      } else if (tagName.endsWith('GPSLatitude') || tagName.endsWith('GPSLongitude')) {
        const ref = (rawTags[tagName + 'Ref'] || value.toString().split(' ')[1])
        if (ref === undefined) {
          return value // give up
        } else {
          const sorw = ref.trim().toLowerCase().startsWith('w') || ref.startsWith('s')
          return parseFloat(value) * (sorw ? -1 : 1)
        }
      } else {
        return value
      }
    } catch (e) {
      if (e instanceof BadDate) {
        return undefined
      } else {
        console.log(`Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`)
        return value
      }
    }
  }
}
