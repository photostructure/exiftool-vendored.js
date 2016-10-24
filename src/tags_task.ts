import * as _dt from './datetime'
import { Tags } from './tags'
import { Task } from './task'
import * as _path from 'path'

export class TagsTask extends Task<Tags> {
  private rawTags: any
  private readonly tags: Tags
  private tzoffset: number | undefined

  private constructor(readonly SourceFile: string, args: string[]) {
    super(args)
    const errors: string[] = []
    this.tags = { SourceFile, errors } as Tags
  }

  static for(filename: string, optionalArgs: string[] = []): TagsTask {
    const sourceFile = _path.resolve(filename)
    const args = [
      '-json',
      '-coordFormat', '%.8f',
      '-fast',
      ...optionalArgs,
      sourceFile
    ]
    return new TagsTask(sourceFile, args)
  }

  protected parse(data: string): Tags {
    this.rawTags = JSON.parse(data)[0]
    // ExifTool does humorous things to paths, like flip slashes. resolve() undoes that.
    const SourceFile = _path.resolve(this.rawTags.SourceFile)
    // Sanity check that the result is for the file we want:
    if (SourceFile !== this.SourceFile) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(`Internal error: unexpected SourceFile of ${this.rawTags.SourceFile} for file ${this.SourceFile}`)
    }
    return this.parseTags()
  }

  private addError(msg: string): void {
    this.tags.errors.push(msg)
  }

  private extractTzoffset(): void {
    // TimeZone just wins if we're just handed it, then use it:
    const tze = new _dt.TimeZone('TimeZone', this.rawTags.TimeZone)
    if (tze.tzOffsetMinutes !== undefined) {
      this.tzoffset = tze.tzOffsetMinutes
    } else {
      const gps = _dt.parse('GPSDateTime', this.rawTags.GPSDateTime, undefined) as _dt.ExifDateTime
      const local = _dt.parse('DateTimeOriginal', this.rawTags.DateTimeOriginal, undefined) as _dt.ExifDateTime
      if (gps && local) {
        this.tzoffset = gps.utcToLocalOffsetMinutes(local)
      }
    }
  }

  private parseTags(): Tags {
    this.extractTzoffset()
    Object.keys(this.rawTags).forEach(key => {
      (this.tags as any)[key] = this.parseTag(key, this.rawTags[key])
    })
    return this.tags as Tags
  }

  private parseTag(tagName: string, value: any): any {
    try {
      if (tagName.endsWith('DateStampMode') || tagName.endsWith('Sharpness')
        || tagName.endsWith('Firmware') || tagName.endsWith('DateDisplayFormat')) {
        return value.toString() // force to string
      } else if (tagName.endsWith('BitsPerSample')) {
        return value.toString().split(' ').map((i: string) => parseInt(i, 10))
      } else if (tagName.endsWith('FlashFired')) {
        const s = value.toString().toLowerCase()
        return (s === 'yes' || s === '1' || s === 'true')
      } else if (typeof value === 'string' && tagName.includes('Date') || tagName.includes('Time')) {
        return _dt.parse(tagName, value, this.tzoffset)
      } else if (tagName.endsWith('GPSLatitude') || tagName.endsWith('GPSLongitude')) {
        const ref = (this.rawTags[tagName + 'Ref'] || value.toString().split(' ')[1])
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
      this.addError(`Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`)
      return value
    }
  }
}
