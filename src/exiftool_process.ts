import * as _child_process from 'child_process'
import * as _fs from 'fs'
import * as _process from 'process'
import { Deferred } from './deferred'
import { Task } from './task'
import * as debug from "debug"

const dbg = debug("exiftool-vendored:process")
const isWin32 = _process.platform === 'win32'
const exiftoolPath = require(`exiftool-vendored.${isWin32 ? 'exe' : 'pl'}`)

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

export interface TaskProvider {
  (): Task<any> | undefined
}

export function ellipsize(str: string, max: number) {
  str = '' + str
  return (str.length < max) ? str : str.substring(0, max - 1) + '…'
}

/**
 * Manages a child process. Callers need to restart if ended.
 */
export class ExifToolProcess {
  private static readonly ready = '{ready}'
  private _ended = false
  private _closedDeferred = new Deferred<void>()
  private readonly proc: _child_process.ChildProcess
  private buff = ''
  private currentTask: Task<any> | undefined

  constructor(private readonly taskProvider: TaskProvider) {
    this.proc = _child_process.spawn(
      exiftoolPath,
      ['-stay_open', 'True', '-@', '-']
    )
    this.proc.unref() // don't let node count ExifTool as a reason to stay alive
    this.proc.stdout.on('data', d => this.onData(d))
    this.proc.stderr.on('data', d => this.onError(d))
    this.proc.on('close', () => {
      this._ended = true
      this._closedDeferred.resolve()
    })
    _process.on('beforeExit', () => this.end())
    this.workIfIdle()
  }

  end(): void {
    if (!this._ended) {
      this._ended = true
      this.proc.stdin.write('\n-stay_open\nFalse\n')
      this.proc.stdin.end()
    }
  }

  /**
   * @return true if `end()` was called, or the child process has closed
   */
  get ended(): boolean {
    return this._ended
  }

  /**
   * @return true if the child process has closed
   */
  get closed(): boolean {
    return this._closedDeferred.fulfilled
  }

  get closedPromise(): Promise<void> {
    return this._closedDeferred.promise
  }

  get idle(): boolean {
    return this.currentTask === undefined
  }

  workIfIdle(): void {
    if (this.idle) {
      this.currentTask = this.taskProvider()
      if (this.currentTask) {
        dbg("Running " + this.currentTask.args)
        const cmd = [
          ...this.currentTask.args,
          '-ignoreMinorErrors',
          '-execute',
          '' // Need to end -execute with a newline
        ].join('\n')
        this.proc.stdin.write(cmd)
      }
    }
  }

  private onError(error: string | Buffer) {
    const errStr = error.toString()
    if (this.currentTask) {
      this.currentTask.reject(errStr)
      this.currentTask = undefined
    } else {
      dbg(`Error from ExifTool: ${errStr}`)
    }
    this.workIfIdle()
  }

  private onData(data: string | Buffer) {
    this.buff = (this.buff + data.toString()).trim()
    const done = this.buff.endsWith(ExifToolProcess.ready)
    if (done) {
      const buff = this.buff.slice(0, -ExifToolProcess.ready.length).trim()
      const task = this.currentTask
      this.buff = ''
      this.currentTask = undefined
      if (task === undefined) {
        if (buff.length > 0) {
          dbg('Internal error: stdin got data, with no current task')
          dbg(`Ignoring output >>>${buff}<<<`)
        }
      } else {
        task.onData(buff)
      }
      this.workIfIdle()
    }
  }
}
