import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { ExifToolTask } from "./ExifToolTask"
import { Tags } from "./Tags"
import { TagsTask } from "./TagsTask"
import { VersionTask } from "./VersionTask"
import { BatchCluster } from "batch-cluster"
import * as _child_process from "child_process"
import * as _fs from "fs"
import * as _process from "process"

export { Tags } from "./Tags"
export { ExifDate, ExifTime, ExifDateTime, ExifTimeZoneOffset } from "./DateTime"

const isWin32 = _process.platform === "win32"
const exiftoolPath = require(`exiftool-vendored.${isWin32 ? "exe" : "pl"}`)

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instances should be shared: consider using the exported singleton instance of this class, `exiftool`.
 */
export class ExifTool {
  private readonly batchCluster: BatchCluster

  /**
   * @param maxProcs the maximum number of ExifTool child processes to spawn
   * when load merits
   * @param maxReuses the maximum number of requests a given ExifTool process will service
   * before being retired
   */
  constructor(
    readonly maxProcs: number = 1,
    readonly maxTasksPerProcess: number = 100,
    readonly spawnTimeoutMillis: number = 10000, // it can't take longer than 5 seconds to spin up. 10s should be conservative.
    readonly taskTimeoutMillis: number = 5000,
    readonly onIdleIntervalMillis: number = 2000,
    readonly taskRetries: number = 2
  ) {
    this.batchCluster = new BatchCluster({
      processFactory: () => _child_process.execFile(
        exiftoolPath,
        ["-stay_open", "True", "-@", "-"],
        {
          encoding: "utf8",
          timeout: 0,
          env: { LANG: "C" }
        }
      ),
      versionCommand: new VersionTask().command,
      pass: "{ready}",
      fail: "{ready}",
      exitCommand: "\n-stay_open\nFalse\n",
      maxProcs,
      onIdleIntervalMillis,
      spawnTimeoutMillis,
      taskTimeoutMillis,
      maxTasksPerProcess,
      taskRetries
    })
  }

  /**
   * @return a promise holding the version number of the vendored ExifTool
   */
  version(): Promise<string> {
    return this.enqueueTask(new VersionTask())
  }

  /**
   * @return a Promise holding the metadata tags found in `file`.
   */
  read(file: string, args?: string[]): Promise<Tags> {
    return this.enqueueTask(TagsTask.for(file, args))
  }

  /**
   * Extract the low-resolution thumbnail in `path/to/image.jpg`
   * and write it to `path/to/thumbnail.jpg`.
   *
   * Note that these images can be less than .1 megapixels in size.
   *
   * @return a `Promise<void>`. An `Error` is raised if
   * the file could not be read or the output not written.
   */
  extractThumbnail(imageFile: string, thumbnailFile: string): Promise<void> {
    return this.extractBinaryTag("ThumbnailImage", imageFile, thumbnailFile)
  }

  /**
   * Extract the "preview" image in `path/to/image.jpg`
   * and write it to `path/to/preview.jpg`.
   *
   * The size of these images varies widely, and is present in dSLR images.
   * Canon, Fuji, Olympus, and Sony use this tag.
   *
   * @return a `Promise<void>`. An `Error` is raised if
   * the file could not be read or the output not written.
   */
  extractPreview(imageFile: string, previewFile: string): Promise<void> {
    return this.extractBinaryTag("PreviewImage", imageFile, previewFile)
  }

  /**
   * Extract the "JpgFromRaw" image in `path/to/image.jpg`
   * and write it to `path/to/fromRaw.jpg`.
   *
   * This size of these images varies widely, and is not present in all RAW images.
   * Nikon and Panasonic use this tag.
   *
   * @return a `Promise<void>`. An `Error` is raised if
   * the file could not be read or the output not written.
   */
  extractJpgFromRaw(imageFile: string, outputFile: string): Promise<void> {
    return this.extractBinaryTag("JpgFromRaw", imageFile, outputFile)
  }

  /**
   * Extract a given binary value from "tagname" tag associated to `path/to/image.jpg`
   * and write it to `dest` (which cannot exist and whose directory must already exist).
   *
   * @return a `Promise<void>`. An `Error` is raised if
   * the binary output not be written to `dest`.
   */
  extractBinaryTag(tagname: string, src: string, dest: string): Promise<void> {
    return this.enqueueTask(BinaryExtractionTask.for(tagname, src, dest))
  }

  /**
   * Request graceful shut down of any running ExifTool child processes.
   *
   * This may need to be called in `after` or `finally` clauses in tests
   * or scripts for them to exit cleanly.
   */
  end(): Promise<void> {
    return this.batchCluster.end()
  }

  /**
   * `enqueueTask` is not for normal consumption. External code
   * can extend `Task` to add functionality.
   */
  enqueueTask<T>(task: ExifToolTask<T>, append: boolean = true): Promise<T> {
    return this.batchCluster.enqueueTask(task, append)
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances
 * in order to leverage a single running ExifTool process.
 *
 * Note that this instance will only use 1 CPU.
 */
export const exiftool = new ExifTool()
