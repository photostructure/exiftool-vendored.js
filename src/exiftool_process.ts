import { Deferred } from "./deferred"
import { Task } from "./task"
import { VersionTask } from "./version_task"
import * as _child_process from "child_process"
import * as debug from "debug"
import * as _fs from "fs"
import * as _process from "process"

const dbg = debug("exiftool-vendored:process")
const isWin32 = _process.platform === "win32"
const exiftoolPath = require(`exiftool-vendored.${isWin32 ? "exe" : "pl"}`)

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

export interface ExifToolProcessObserver {
  onIdle(): void
  onEnd(): void
}

export function ellipsize(str: string, max: number) {
  str = "" + str
  return (str.length < max) ? str : str.substring(0, max - 1) + "…"
}

/**
 * Manages a child process. Callers need to restart if ended.
 */
export class ExifToolProcess {
  private static readonly ready = "{ready}"
  private _ended = false
  private _closed = new Deferred<void>()
  private readonly proc: _child_process.ChildProcess
  private buff = ""
  private currentTask: Task<any> | undefined

  constructor(private readonly observer: ExifToolProcessObserver) {
    this.proc = _child_process.execFile(
      exiftoolPath,
      ["-stay_open", "True", "-@", "-"],
      {
        encoding: "utf8",
        timeout: 0,
        env: { LANG: "C" }
      }
    )
    this.proc.unref() // don't let node count ExifTool as a reason to stay alive

    this.proc.on("error", err => this.onError(err, true))
    this.proc.stderr.on("error", err => this.onError(err, true))
    this.proc.stderr.on("data", err => this.onError(err))

    this.proc.stdout.on("error", err => this.onError(err, true))
    this.proc.stdout.on("data", d => this.onData(d))

    this.proc.on("close", () => {
      this._ended = true
      this._closed.resolve()
      this.observer.onEnd()
    })
    _process.on("beforeExit", () => this.end())

    // only accept commands if we know all is well. This task "primes the pump":
    this.execTask(new VersionTask())
  }

  execTask(task: Task<any>): boolean {
    if (this.ended || !this.idle) {
      return false
    }
    dbg("Running " + task.args)
    this.currentTask = task
    const cmd = [
      ...task.args,
      "-ignoreMinorErrors",
      "-execute",
      "" // Need to end -execute with a newline
    ].join("\n")
    this.proc.stdin.write(cmd)
    return true
  }

  async end(): Promise<void> {
    if (!this.ended) {
      this._ended = true
      this.proc.stdin.write("\n-stay_open\nFalse\n")
      this.proc.stdin.end()
    }
  }

  kill(signal?: string): void {
    this.proc.kill(signal)
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
    return this._closed.fulfilled
  }

  get closedPromise(): Promise<void> {
    return this._closed.promise
  }

  get idle(): boolean {
    return this.currentTask === undefined
  }

  private onError(error: any, end: boolean = false) {
    const err = Buffer.isBuffer(error) ? error.toString() : error
    if (this.currentTask) {
      this.currentTask.reject(err)
      this.currentTask = undefined
    } else {
      dbg(`Error from ExifTool: ${err}`)
    }
    if (end) {
      this.end()
    } else {
      this.observer.onIdle()
    }
  }

  private onData(data: string | Buffer) {
    this.buff = (this.buff + data.toString()).trim()
    const done = this.buff.endsWith(ExifToolProcess.ready)
    if (done) {
      const buff = this.buff.slice(0, -ExifToolProcess.ready.length).trim()
      const task = this.currentTask
      this.buff = ""
      this.currentTask = undefined
      if (task === undefined) {
        if (buff.length > 0) {
          dbg("Internal error: stdin got data, with no current task")
          dbg(`Ignoring output >>>${buff}<<<`)
        }
      } else {
        task.onData(buff)
      }
      this.observer.onIdle()
    }
  }
}
