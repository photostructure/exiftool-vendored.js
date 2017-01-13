import { ExifToolProcess } from "./exiftool_process"
import { ImageExtractionTask } from "./image_extraction_task"
import { Tags } from "./tags"
import { TagsTask } from "./tags_task"
import { Task } from "./task"
import { VersionTask } from "./version_task"
import * as _process from "process"

export { Tags } from "./tags"
export { ExifDate, ExifTime, ExifDateTime, ExifTimeZoneOffset } from "./datetime"

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instances should be shared: consider using the exported singleton instance of this class, `exiftool`.
 */
export class ExifTool {
  private _procs: ExifToolProcess[] = []
  private _tasks: Task<any>[] = []

  /**
   * @param maxProcs the maximum number of ExifTool child processes to spawn when load merits
   */
  constructor(
    readonly maxProcs: number = 1
  ) {
    _process.on("exit", () => this.end())
  }

  /**
   * @return a promise holding the version number of the vendored ExifTool
   */
  version(): Promise<string> {
    return this.enqueueTask(new VersionTask()).promise
  }

  /**
   * @return a Promise holding the metadata tags found in `file`.
   */
  read(file: string): Promise<Tags> {
    return this.enqueueTask(TagsTask.for(file)).promise
  }

  /**
   * Extract the low-resolution thumbnail in `path/to/image.jpg`
   * and write it to `path/to/thumbnail.jpg`.
   *
   * Note that these images are less than .1 megapixels in size.
   * @return a `Promise<void>`. An `Error` is raised if
   * the file could not be read or the output not written.
   */
  extractThumbnail(imageFile: string, thumbnailFile: string): Promise<void> {
    return this.enqueueTask(
      ImageExtractionTask.for("ThumbnailImage", imageFile, thumbnailFile)
    ).promise
  }

  /**
   * Extract the "preview" image in `path/to/image.jpg`
   * and write it to `path/to/thumbnail.jpg`.
   * @return a `Promise<void>`. An `Error` is raised if
   * the file could not be read or the output not written.
   */
  extractPreview(imageFile: string, previewFile: string): Promise<void> {
    return this.enqueueTask(
      ImageExtractionTask.for("PreviewImage", imageFile, previewFile)
    ).promise
  }

  /**
   * Request graceful shut down of any running ExifTool child processes.
   *
   * This may need to be called in `after` or `finally` clauses in tests
   * or scripts for them to exit cleanly.
   */
  end(): Promise<any> {
    this._procs.forEach(p => p.end())
    return Promise.all(this._procs.map(p => p.closedPromise))
  }

  /**
   * `enqueueTask` is not for normal consumption. External code
   * can extend `Task` to add functionality.
   */
  enqueueTask<T>(task: Task<T>): Task<T> {
    this._tasks.push(task)
    this.workIfIdle()
    return task
  }

  private dequeueTask(): Task<any> | undefined {
    return this._tasks.shift()
  }

  private procs(): ExifToolProcess[] {
    return this._procs = this._procs.filter(p => !p.ended)
  }

  private workIfIdle(): void {
    const idle = this._procs.find(p => !p.ended && p.idle)
    if (idle) {
      idle.workIfIdle()
    } else if (this.procs().length < this.maxProcs) {
      this._procs.push(new ExifToolProcess(() => this.dequeueTask()))
    }
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances
 * in order to leverage a single running ExifTool process.
 *
 * Note that this instance will only use 1 CPU.
 */
export const exiftool = new ExifTool()
