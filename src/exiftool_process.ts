import * as _cp from 'child_process'
import * as _fs from 'fs'
import * as _path from 'path'
import * as _process from 'process'
import { DeferredParser } from './deferred_parser'
import { Tags } from './exiftool'
import { ExifToolVersionParser } from './exiftool_version_parser'
import { TagsParser } from './tags_parser'

const isWin32 = process.platform === 'win32'
const exiftoolPath = require(`exiftool-vendored.${isWin32 ? 'exe' : 'pl'}`)

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

/**
 * Manages a child process. Callers need to restart if ended.
 */
export class ExifToolProcess {
  private static readonly ready = '{ready}'
  private static readonly versionKey = '__VERSION__'
  private _ended = false
  private readonly proc: _cp.ChildProcess
  private buff = ''
  private parsers: DeferredParser<any>[] = []
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
      for (const parser of this.parsers) { parser.reject('ExifTool closed') }
      this._ended = true
    })
    this.versionPromise = this.execute(new DeferredParser(ExifToolProcess.versionKey, new ExifToolVersionParser()), '-ver')
    _process.on('beforeExit', () => this.end())
  }

  get version(): Promise<string> {
    return this.versionPromise
  }

  read(file: string): Promise<Tags> {
    const parser = new TagsParser(file)
    return this.execute(
      new DeferredParser(parser.filename, parser),
      '-json',
      '-coordFormat', '%.8f',
      '-fast',
      parser.filename
    )
  }

  readGrouped(file: string): Promise<Tags> {
    const parser = new TagsParser(file)
    return this.execute(
      new DeferredParser(parser.filename, parser),
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
    this.parsers.push(deferredReader)
    this.proc.stdin.write([...cmds,
      '-execute',
      '' // Need to end -execute with a newline
    ].join('\n'))
    return deferredReader.promise
  }

  private onError(error: string | Buffer) {
    // Hope that theq first reader can handle the error
    if (this.parsers.length === 0) {
      console.error(`Error from ExifTool without any readers: ${error}`)
    } else {
      this.parsers[0].onError(error.toString())
    }
  }

  private popParser(key: string): DeferredParser<any> {
    const idx = this.parsers.findIndex(p => p.key === key)
    if (idx >= 0) {
      return this.parsers.splice(idx, 1)[0]
    } else {
      throw new Error(`No pending parsers for ${key} (pending: ${this.parsers.map(p => p.key)})`)
    }
  }

  private handleVersionResult(buff: string): boolean {
    if (ExifToolVersionParser.looksVersionish(buff)) {
      this.popParser(ExifToolProcess.versionKey).parse(buff)
      return true
    } else {
      return false
    }
  }

  private handleExifResult(buff: string): void {
    JSON.parse(buff).forEach((result: any) => {
      const sourceFile = result["SourceFile"]
      const absPath = _path.resolve(sourceFile)
      this.popParser(absPath).parse(result)
    })
  }

  private onData(data: string | Buffer) {
    this.buff = (this.buff + data.toString()).trim()
    const done = this.buff.endsWith(ExifToolProcess.ready)
    if (done) {
      const buff = this.buff.slice(0, -ExifToolProcess.ready.length).trim()
      this.buff = ''
      this.handleVersionResult(buff) || this.handleExifResult(buff)
    }
  }
}
