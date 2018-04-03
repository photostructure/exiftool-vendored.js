import * as bc from "batch-cluster"
import * as _child_process from "child_process"
import * as _fs from "fs"
import * as _os from "os"
import { sep } from "path"
import * as _process from "process"

import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { ExifToolTask } from "./ExifToolTask"
import { ReadTask } from "./ReadTask"
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

const isWin32 = _process.platform === "win32"

const isElectron = "electron" in _process.versions

const fixPath = (path: string) =>
  isElectron
    ? path
        .split(sep)
        .map(ea => (ea === "app.asar" ? "app.asar.unpacked" : ea))
        .join(sep)
    : path

const unfixedPath = require(`exiftool-vendored.${isWin32 ? "exe" : "pl"}`)
const exiftoolPath = fixPath(unfixedPath)

console.dir({
  isWin32,
  isElectron,
  unfixedPath,
  exiftoolPath
})

if (!_fs.existsSync(exiftoolPath)) {
  throw new Error(`Vendored ExifTool does not exist at ${exiftoolPath}`)
}

const exiftoolArgs = ["-stay_open", "True", "-@", "-"]

export type WriteTags = { [K in keyof Tags]: string | number }

export const DefaultMaxProcs = Math.max(1, Math.floor(_os.cpus().length / 4))

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instances should be shared: consider using the exported singleton
 * instance of this class, `exiftool`.
 */
export class ExifTool {
  private readonly batchCluster: bc.BatchCluster

  /**
   * @param maxProcs The maximum number of ExifTool child processes to
   * spawn when load merits. Defaults to 1.
   * @param maxTasksPerProcess The maximum number of requests a given
   * ExifTool process will service before being retired. Defaults to 250,
   * to balance performance with memory usage.
   * @param spawnTimeoutMillis Spawning new ExifTool processes must not
   * take longer than `spawnTimeoutMillis` millis before it times out and a
   * new attempt is made. Be pessimistic here--windows can regularly take
   * several seconds to spin up a process, thanks to antivirus shenanigans.
   * This can't be set to a value less than 100ms. Defaults to 20 seconds,
   * to accomodate slow Windows machines.
   * @param taskTimeoutMillis If requests to ExifTool take longer than
   * this, presume the underlying process is dead and we should restart the
   * task. This can't be set to a value less than 10ms, and really should
   * be set to at more than a second unless `taskRetries` is sufficiently
   * large or all writes will be to a fast local disk. Defaults to 5
   * seconds.
   * @param onIdleIntervalMillis An interval timer is scheduled to do
   * periodic maintenance of underlying child processes with this
   * periodicity. Defaults to 2 seconds.
   * @param taskRetries The number of times a task can error or timeout and
   * be retried. Defaults to 2.
   * @param batchClusterOpts Allows for overriding any configuration used
   * by the underlying `batch-cluster` module.
   */
  constructor(
    readonly maxProcs: number = DefaultMaxProcs,
    readonly maxTasksPerProcess: number = 500,
    readonly spawnTimeoutMillis: number = 20000,
    readonly taskTimeoutMillis: number = 5000,
    readonly onIdleIntervalMillis: number = 2000,
    readonly taskRetries: number = 2,
    readonly batchClusterOpts: Partial<
      bc.BatchClusterOptions & bc.BatchProcessOptions
    > = {}
  ) {
    const opts = {
      processFactory: () =>
        _child_process.spawn(exiftoolPath, exiftoolArgs, {
          stdio: "pipe",
          shell: false,
          detached: false,
          env: { LANG: "C" }
        }),
      maxProcs,
      onIdleIntervalMillis,
      spawnTimeoutMillis,
      taskTimeoutMillis,
      maxTasksPerProcess,
      taskRetries,
      retryTasksAfterTimeout: true,
      maxProcAgeMillis: 10 * 60 * 1000, // 10 minutes
      ...batchClusterOpts,
      pass: batchClusterOpts.pass || "{ready.*}",
      fail: batchClusterOpts.fail || "{ready.*}",
      exitCommand: "-stay_open\nFalse\n",
      versionCommand:
        batchClusterOpts.versionCommand || new VersionTask().command
    }
    this.batchCluster = new bc.BatchCluster(opts)
  }

  /**
   * @return a promise holding the version number of the vendored ExifTool
   */
  version(): Promise<string> {
    return this.enqueueTask(new VersionTask())
  }

  /**
   * Read the tags in `file`.
   *
   * @param {string} file the file to extract metadata tags from
   * @param {string[]} [args] any additional ExifTool arguments, like "-n".
   * Most consumers won't probably need this.
   * @returns {Promise<Tags>} A resolved Tags promise. If there are errors
   * during reading, the `.errors` field will be present.
   * @memberof ExifTool
   */
  read(file: string, args?: string[]): Promise<Tags> {
    return this.enqueueTask(ReadTask.for(file, args))
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
    return this.enqueueTask(WriteTask.for(file, tags, args))
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
  enqueueTask<T>(task: ExifToolTask<T>): Promise<T> {
    return this.batchCluster.enqueueTask(task)
  }

  /**
   * @return the currently running ExifTool processes. Note that on Windows,
   * these are only the process IDs of the directly-spawned ExifTool wrapper,
   * and not the actual perl vm. This should only really be relevant for
   * integration tests that verify processes are cleaned up properly.
   */
  get pids(): number[] {
    return this.batchCluster.pids
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
export const exiftool = new ExifTool(DefaultMaxProcs)
