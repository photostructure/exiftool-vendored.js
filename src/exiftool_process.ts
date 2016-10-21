import * as _fs from 'fs'
import * as _cp from 'child_process'
import * as _process from 'process'
import { Tags } from './exiftool'
import { DeferredParser } from './deferred_parser'
import { TagsParser } from './tags_parser'
import { ExifToolVersionParser } from './exiftool_version_parser'

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
    this.versionPromise = this.execute(new DeferredParser(ExifToolVersionParser), '-ver')
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
