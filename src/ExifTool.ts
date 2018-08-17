import { retryOnReject } from "./AsyncRetry"
import * as bc from "batch-cluster"
import * as _child_process from "child_process"
import * as _fs from "fs"
import * as _os from "os"
import * as _path from "path"
import * as _process from "process"

import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { ExifToolTask } from "./ExifToolTask"
import { ReadTask } from "./ReadTask"
import { RewriteAllTagsTask } from "./RewriteAllTagsTask"
import { Tags } from "./Tags"
import { VersionTask } from "./VersionTask"
import { WriteTask } from "./WriteTask"

export { Tags } from "./Tags"
export {
  ExifDate,
  ExifTime,
  ExifDateTime,
  ExifTimeZoneOffset
} from "./DateTime"

function findExiftool(): string {
  const isWin32 = _process.platform === "win32"
  const path: string = require(`exiftool-vendored.${isWin32 ? "exe" : "pl"}`)
  // This s/app.asar/app.asar.unpacked/ path switch adds support for Electron
  // apps that are ASAR-packed.

  // Note that we can't check for electron because child processes that are
  // spawned by the main process will most likely need the ELECTRON_RUN_AS_NODE
  // environment variable set, which will unset the process.versions.electron
  // field.
  const fixedPath = path
    .split(_path.sep)
    .map(ea => (ea === "app.asar" ? "app.asar.unpacked" : ea))
    .join(_path.sep)

  // Note also, that we must check for the fixedPath first, because Electron's
  // ASAR shenanigans will make existsSync return true even for asar-packed
  // resources.
  if (_fs.existsSync(fixedPath)) {
    return fixedPath
  }
  if (_fs.existsSync(path)) {
    return path
  }
  throw new Error(`Vendored ExifTool does not exist at ${path}`)
}

export const DefaultExifToolPath = findExiftool()

export const DefaultExiftoolArgs = ["-stay_open", "True", "-@", "-"]

/**
 * @see https://sno.phy.queensu.ca/~phil/exiftool/TagNames/Shortcuts.html
 */
export interface ShortcutTags {
  /**
   * Shortcut for writing the "common EXIF date/time tags": `DateTimeOriginal`,
   * `CreateDate`, and `ModifyDate` tags. Only used by `write`--not returned by
   * `read`.
   */
  AllDates?: string
}

export type WriteTags = { [K in keyof (Tags & ShortcutTags)]: string | number }

export const DefaultMaxProcs = Math.max(1, Math.floor(_os.cpus().length / 4))

export interface ExifToolOptions
  extends bc.BatchClusterOptions,
    bc.BatchProcessOptions,
    bc.ChildProcessFactory {
  /**
   * The maximum number of ExifTool child processes to spawn when load merits.
   *
   * Defaults to 1/4 the number of CPUs, minimally 1.
   */
  maxProcs: number

  /**
   * The maximum number of requests a given ExifTool process will service before
   * being retired.
   *
   * Defaults to 500, to balance performance with memory usage.
   */
  maxTasksPerProcess: number

  /**
   * Spawning new ExifTool processes must not take longer than
   * `spawnTimeoutMillis` millis before it times out and a new attempt is made.
   * Be pessimistic here--windows can regularly take several seconds to spin up
   * a process, thanks to antivirus shenanigans. This can't be set to a value
   * less than 100ms.
   *
   * Defaults to 30 seconds, to accomodate slow Windows machines.
   */
  spawnTimeoutMillis: number

  /**
   * If requests to ExifTool take longer than this,
   * presume the underlying process is dead and we should restart the task. This
   * can't be set to a value less than 10ms, and really should be set to at more
   * than a second unless `taskRetries` is sufficiently large or all writes will
   * be to a fast local disk. Defaults to 10 seconds.
   */
  taskTimeoutMillis: number

  /**
   * An interval timer is scheduled to do periodic maintenance of underlying
   * child processes with this periodicity.
   *
   * Defaults to 2 seconds.
   */
  onIdleIntervalMillis: number

  /**
   * The number of times a task can error or timeout and be retried.
   *
   * Defaults to 1 (every task gets 2 chances).
   */
  taskRetries: number

  /**
   * Allows for non-standard paths to ExifTool. Defaults to the perl or windows
   * binaries provided by `exiftool-vendored.pl` or `exiftool-vendored.exe`.
   */
  exiftoolPath: string

  /**
   * Args passed to exiftool on launch.
   */
  exiftoolArgs: string[]
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

/**
 * Default values for `ExifToolOptions`, except for `processFactory` (which is
 * created by the ExifTool constructor)
 */
export const DefaultExifToolOptions: Omit<
  ExifToolOptions,
  "processFactory"
> = Object.freeze({
  ...new bc.BatchClusterOptions(),
  maxProcs: DefaultMaxProcs,
  maxTasksPerProcess: 500,
  spawnTimeoutMillis: 30000,
  taskTimeoutMillis: 10000,
  onIdleIntervalMillis: 2000,
  taskRetries: 1,
  exiftoolPath: DefaultExifToolPath,
  exiftoolArgs: DefaultExiftoolArgs,
  pass: "{ready.*}",
  fail: "{ready.*}",
  exitCommand: "-stay_open\nFalse\n",
  versionCommand: new VersionTask().command,
  rejectTaskOnError: (task: any, error: string | Error): boolean => {
    if (task != null && typeof task.addError === "function")
      task.addError(error)
    return (
      String(error)
        .toLowerCase()
        .indexOf("warning:") == -1
    )
  }
})

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instances should be shared: consider using the exported singleton
 * instance of this class, `exiftool`.
 */
export class ExifTool {
  readonly options: ExifToolOptions
  private readonly batchCluster: bc.BatchCluster

  constructor(options: Partial<ExifToolOptions> = {}) {
    if (options != null && typeof options !== "object") {
      throw new Error(
        "Please update caller to the new ExifTool constructor API"
      )
    }
    const o = {
      ...DefaultExifToolOptions,
      ...options
    }
    this.options = {
      ...o,
      processFactory: () =>
        _child_process.spawn(o.exiftoolPath, o.exiftoolArgs, {
          stdio: "pipe",
          shell: false,
          detached: false,
          env: { LANG: "C" }
        }),
      exitCommand: o.exitCommand,
      versionCommand: o.versionCommand
    }
    this.batchCluster = new bc.BatchCluster(this.options)
  }

  /**
   * Register lifecycle event listeners. Delegates to BatchProcess.
   */
  // SITS: crazy TS to pull in BatchCluster's .on signature:
  readonly on: bc.BatchCluster["on"] = (event: any, listener: any) =>
    this.batchCluster.on(event, listener)

  /**
   * @return a promise holding the version number of the vendored ExifTool
   */
  version(): Promise<string> {
    return this.enqueueTask(() => new VersionTask())
  }

  /**
   * Read the tags in `file`.
   *
   * @param {string} file the file to extract metadata tags from
   * @param {string[]} [args] any additional ExifTool arguments, like "-n",
   * "-fast", or "-fast2". Note that the default is "-fast", so if you want
   * ExifTool to read the entire file for metadata, you should pass an empty
   * array as the second parameter. See
   * https://sno.phy.queensu.ca/~phil/exiftool/#performance for more information
   * about `-fast` and `-fast2`.
   * @returns {Promise<Tags>} A resolved Tags promise. If there are errors
   * during reading, the `.errors` field will be present.
   * @memberof ExifTool
   */
  read(file: string, args: string[] = ["-fast"]): Promise<Tags> {
    return this.enqueueTask(() => ReadTask.for(file, args))
  }

  /**
   * Write the given `tags` to `file`.
   *
   * @param {string} file an existing file to write `tags` to.
   * @param {Tags} tags the tags to write to `file`.
   * @param {string[]} [args] any additional ExifTool arguments, like "-n".
   * Most consumers won't probably need this.
   * @returns {Promise<void>} Either the promise will be resolved if the
   * tags are written to successfully, or the promise will be rejected if
   * there are errors or warnings.
   * @memberof ExifTool
   */
  write(file: string, tags: WriteTags, args?: string[]): Promise<void> {
    return this.enqueueTask(() => WriteTask.for(file, tags, args))
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
    return this.enqueueTask(() => BinaryExtractionTask.for(tagname, src, dest))
  }

  /**
   * Attempt to fix metadata problems in JPEG images by deleting all metadata
   * and rebuilding from scratch. After repairing an image you should be able to
   * write to it without errors, but some metadata from the original image may
   * be lost in the process.
   *
   * This should only be applied as a last resort to images whose metadata is
   * not readable via {@link .read()}.
   *
   * @see http://owl.phy.queensu.ca/~phil/exiftool/faq.html#Q20
   *
   * @param {string} inputFile the path to the problematic image
   * @param {string} outputFile the path to write the repaired image
   * @param {boolean} allowMakerNoteRepair if there are problems with MakerNote
   * tags, allow ExifTool to apply heuristics to recover corrupt tags. See
   * exiftool's `-F` flag.
   * @return {Promise<void>} resolved when outputFile has been written.
   */
  rewriteAllTags(
    inputFile: string,
    outputFile: string,
    allowMakerNoteRepair: boolean = false
  ): Promise<void> {
    return this.enqueueTask(() =>
      RewriteAllTagsTask.for(inputFile, outputFile, allowMakerNoteRepair)
    )
  }

  /**
   * Shut down running ExifTool child processes. No subsequent requests will be
   * accepted.
   *
   * This may need to be called in `after` or `finally` clauses in tests or
   * scripts for them to exit cleanly.
   */
  end(gracefully: boolean = true): Promise<void> {
    return this.batchCluster.end(gracefully)
  }

  /**
   * @return true if `.end()` has been invoked
   */
  get ended() {
    return this.batchCluster.ended
  }

  /**
   * `enqueueTask` is not for normal consumption. External code
   * can extend `Task` to add functionality.
   */
  enqueueTask<T>(task: () => ExifToolTask<T>): Promise<T> {
    return retryOnReject(
      () => this.batchCluster.enqueueTask(task()),
      this.options.taskRetries
    )
  }

  /**
   * @return the currently running ExifTool processes. Note that on Windows,
   * these are only the process IDs of the directly-spawned ExifTool wrapper,
   * and not the actual perl vm. This should only really be relevant for
   * integration tests that verify processes are cleaned up properly.
   */
  get pids(): Promise<number[]> {
    return this.batchCluster.pids()
  }

  /**
   * @return the number of pending (not currently worked on) tasks
   */
  get pendingTasks(): number {
    return this.batchCluster.pendingTasks
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances in order
 * to leverage a single running ExifTool process. As of v3.0, its `maxProcs` is
 * set to the number of CPUs on the current system; no more than `maxProcs`
 * instances of `exiftool` will be spawned. You may want to experiment with
 * smaller or larger values for `maxProcs`, depending on CPU and disk speed of
 * your system and performance tradeoffs.
 *
 * Note that each child process consumes between 10 and 50 MB of RAM. If you
 * have limited system resources you may want to use a smaller `maxProcs` value.
 */
export const exiftool = new ExifTool()
