import { TagsTask } from './tags_task'
import { VersionTask } from './version_task'
import { ExifToolProcess } from './exiftool_process'
import { Tags } from './tags'
import { Task } from './task'
export { Tags } from './tags'
export { ExifDate, ExifTime, ExifDateTime, ExifTimeZoneOffset } from './datetime'

export interface ExifToolAPI {
  /**
   * @return a promise holding the version number of the vendored ExifTool
   */
  version(): Promise<string>
  /**
   * @return a Promise holding the metadata tags found in `file`.
   */
  read(file: string): Promise<Tags>
}

export interface Logger {
  info(msg: string): void
  warn(msg: string): void
  error(msg: string): void
}

/**
 * Assign your custom logger to this instance. 
 */
export let logger = console

/**
 * This is the version of the `exiftool-vendored` npm module.
 * The package.json value is made to match this value by `npm run update`. 
 */
export const ExifToolVendoredVersion = '0.2.0'

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instantiation is expensive: use the exported singleton instance of this class, `exiftool`.
 */
export class ExifTool implements ExifToolAPI {
  private _proc: ExifToolProcess
  private _tasks: Task<any>[] = []

  /**
   * @return a Promise to the vendored ExifTool's version 
   */
  version(): Promise<string> {
    return this.enqueueTask(new VersionTask()).promise
  }

  read(file: string): Promise<Tags> {
    return this.enqueueTask(TagsTask.for(file)).promise
  }

  enqueueTask<T>(task: Task<T>): Task<T> {
    this._tasks.push(task)
    this.proc().workIfIdle()
    return task
  }

  dequeueTask(): Task<any> | undefined {
    return this._tasks.shift()
  }

  end() {
    this._proc.end()
  }

  private proc(): ExifToolProcess {
    if (this._proc === undefined || this._proc.ended) {
      this._proc = new ExifToolProcess(() => this.dequeueTask())
      return this.proc()
    } else {
      return this._proc
    }
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances
 * in order to leverage a single running ExifTool process.
 */
export const exiftool: ExifToolAPI = new ExifTool()
