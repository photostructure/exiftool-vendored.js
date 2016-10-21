import { BadDate, ExifDate, ExifDateTime, ExifTime } from './datetime'
import * as _fs from 'fs'
import * as _cp from 'child_process'
import * as _process from 'process'
import * as _path from 'path'
import { Tags } from './exiftool'

const isWin32 = process.platform === 'win32'
const exiftoolPath = require(`exiftool-vendored.${isWin32 ? 'exe' : 'pl'}`)

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

export interface Parser<T> {
  parse(input: string): T
  onError(message: string): void
}

export const VersionParser: Parser<string> = new class implements Parser<string> {
  private const versionRegex = /\d{1,3}\.\d{1,3}(\.\d{1,3}})?/

  parse(input: string): string {
    const value = input.trim()
    if (this.versionRegex.test(value)) {
      return value
    } else {
      throw new Error(`Unexpected version $value`)
    }
  }

  onError(message: string) {
    console.dir(message)
  }
}()

export class TagsParser implements Parser<Tags> {
  readonly filename: string
  private warnings: string[] = []

  constructor(filename: string) {
    this.filename = _path.resolve(filename)
  }

  parse(input: string): Tags {
    const value = this.parseTags(JSON.parse(input)[0])
    const srcFile = _path.resolve(value.SourceFile)
    if (srcFile !== this.filename) {
      throw new Error(`unexpected source file result ${srcFile} for file ${this.filename}`)
    }
    if (this.warnings.length > 0) {
      value['warnings'] = this.warnings
    }
    return value
  }

  onError(message: string) {
    this.warnings.push(message)
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
      parsedTags[key] = this.parseTag(key, t[key], tzoffset)
    })
    return parsedTags as Tags
  }

  parseTag(tagName: string, value: any, tzoffset: number | undefined): any {
    try {
      if (tagName.endsWith('DateStampMode') || tagName.endsWith('Sharpness')
        || tagName.endsWith('Firmware') || tagName.endsWith('DateDisplayFormat')) {
        return value.toString() // force to string
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
      } else if (tagName === 'GPSLatitude' && (value.contains('N') || value.contains('S'))) {
        const lat = parseFloat(value.split(' ')[0])
        return (value.contains('S') ? -1 : 1) * lat
      } else if (tagName === 'GPSLongitude' && (value.contains('E') || value.contains('W'))) {
        const lon = parseFloat(value.split(' ')[0])
        return (value.contains('W') ? -1 : 1) * lon
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

class DeferredParser<T> {
  readonly promise: Promise<T>
  private _resolve: (value?: T) => void
  private _reject: (reason?: any) => void

  constructor(readonly reader: Parser<T>) {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  reject(reason?: any) { this._reject(reason) }

  onError(message: string) { this.reader.onError(message) }

  parse(input: string) {
    try {
      this._resolve(this.reader.parse(input))
    } catch (e) {
      this._reject(e)
    }
  }
}

/**
 * Manages a child process. Callers need to restart if ended.
 */
export class ExifToolProcess {
  private static readonly ready = '{ready}'
  private _ended = false
  private readonly proc: _cp.ChildProcess
  private buff = ''
  private readers: DeferredParser<any>[] = []
  private readonly versionPromise: Promise<string>

  constructor() {
    this.proc = _cp.spawn(
      exiftoolPath,
      ['-stay_open', 'True', '-@', '-']
    )
    this.proc.stdout.on('data', d => this.onData(d))
    this.proc.stderr.on('data', d => this.onError(d))
    this.proc.on('close', (code: any) => {
      console.log(`ExifTool exited with code ${code}`)
      for (const reader of this.readers) { reader.reject('ExifTool closed') }
      // TODO: Cancel all pending promises?
      this._ended = true
    })
    this.versionPromise = this.execute(new DeferredParser(VersionParser), '-ver')
    _process.on('beforeExit', () => this.end())
  }

  get version(): Promise<string> {
    return this.versionPromise
  }

  read(file: string): Promise<Tags> {
    const parser = new TagsParser(file)
    return this.execute(
      new DeferredParser(parser),
      '-json',
      '-coordFormat', '%.8f',
      '-fast',
      parser.filename
    )
  }

  readGrouped(file: string): Promise<Tags> {
    const parser = new TagsParser(file)
    return this.execute(
      new DeferredParser(parser),
      '-json',
      '-G',
      '-coordFormat', '%.8f',
      '-fast',
      parser.filename
    )
  }

  end(): void {
    if (!this._ended) {
      this._ended = true
      this.proc.stdin.write('\n-stay_open\nFalse\n')
      this.proc.stdin.end()
    }
  }

  get ended(): boolean {
    return this._ended
  }

  private execute<T>(deferredReader: DeferredParser<T>, ...cmds: string[]): Promise<T> {
    this.readers.push(deferredReader)
    this.proc.stdin.write([...cmds,
      '-execute',
      '' // Need to end -execute with a newline
    ].join('\n'))
    return deferredReader.promise
  }

  private onError(error: string | Buffer) {
    if (this.readers.length === 0) {
      console.error(`Error from ExifTool without any readers: ${error}`)
    } else {
      this.readers[0].onError(error.toString())
    }
  }

  private onData(data: string | Buffer) {
    this.buff = (this.buff + data.toString()).trim()
    const done = this.buff.endsWith(ExifToolProcess.ready)
    if (done) {
      const buff = this.buff.slice(0, -ExifToolProcess.ready.length)
      this.buff = ''
      const reader = this.readers.shift()
      if (reader) {
        reader.parse(buff)
      } else {
        console.error(`No reader for payload ${buff}`)
      }
    }
  }
}
