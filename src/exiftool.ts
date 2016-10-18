import * as fs from 'fs'
import * as cp from 'child_process'

const exiftoolPath: string = (process.platform === 'win32')
  ? require('exiftool-vendored.exe')
  : require('exiftool-vendored.pl')

if (!fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

export type MetadataValue = number | string | Date
export type Metadata = Map<string, MetadataValue>

export interface ExifToolAPI {
  read(file: string): Promise<Metadata>
}

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instantiation is expensive: use a singleton instance of this class.
 */
export class ExifTool implements ExifToolAPI {
  static readonly VERSION = '0.1.0'
  // static restartTimes: number[] = []

  // private _restarts = 0
  private _proc = new ExifToolProcess()

  // private static countRestart() {
  //   const now = Date.now()
  //   ExifTool.restartTimes.push(now)
  //   ExifTool.restartTimes = ExifTool.restartTimes.filter(time => (time > now - 60000))
  //   if (ExifTool.restartTimes.length > 10) {
  //     throw new Error('ExifTool is restarting too often')
  //   }
  // }
  // get restarts(): number {
  //   return this._restarts
  // }

  private get proc(): ExifToolProcess {
    if (this._proc.ended) {
      // ExifTool.countRestart()
      this._proc = new ExifToolProcess()
      return this.proc
    } else {
      return this._proc
    }
  }

  read(file: string): Promise<Metadata> {
    return this.proc.read(file)
  }
}

/**
 * Deferred resolution of a promise
 */
class Deferred<T> {
  readonly promise: Promise<T>
  private _resolve: (value?: T) => void
  private _reject: (reason?: any) => void

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }
  resolve(value?: T) {
    this._resolve(value)
  }

  reject(reason?: any) {
    this._reject(reason)
  }
}

/**
 * Manages a child process. Callers need to restart if ended.
 */
class ExifToolProcess {
  private static readonly ready = '{ready}'
  private _ended = false
  private readonly proc: cp.ChildProcess
  /**
   * Data that hasn't been handled yet.
   * Presumably first N bytes of a JSON structure.
   */
  private buff = ''
  private pendingFiles: Map<string, Deferred<Metadata>> = new Map()

  constructor() {
    this.proc = cp.spawn(
      exiftoolPath,
      ['-stay_open', 'True', '-@', '-']
    )
    this.proc.stdout.on('data', d => this.onData(d))
    this.proc.stderr.on('data', d => {
      console.log(`ExifTool error: ${d}`)
    })
    this.proc.on('close', (code: any) => {
      console.log(`ExifTool exited with code ${code}`)
      // TODO: Cancel all pending promises?
      this._ended = true
    })
  }

  get ended(): boolean {
    return this._ended
  }

  read(file: string): Promise<Metadata> {
    const d = new Deferred<Metadata>()
    this.pendingFiles.set(file, d)
    this.proc.stdin.write([
      '-json',
      '-fast',
      '-G',
      file,
      '-execute',
      '' // Need to end -execute with a newline
    ].join('\n'))
    return d.promise
  }

  private onData(data: string | Buffer) {
    const trim = data.toString().trim()
    const done = trim.endsWith(ExifToolProcess.ready)
    this.buff += done ? trim.slice(0, -ExifToolProcess.ready.length) : trim
    try {
      const exif = JSON.parse(this.buff)
      const src = exif['SourceFile']
      const d = this.pendingFiles.get(src)
      if (d) {
        d.resolve(exif)
        this.pendingFiles.delete(src)
      } else {
        console.error(`Broken promise: unknown SourceFile ${src}!`)
        console.error(`Current files: ${JSON.stringify(this.pendingFiles.keys())}`)
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        // We aren't done getting data (hopefully)
      } else {
        throw e
      }
    }
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances
 * in order to leverage a single running ExifTool process.
 */
export const exiftool: ExifToolAPI = new ExifTool()
