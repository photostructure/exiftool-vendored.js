import * as bc from "batch-cluster"
import * as _cp from "child_process"
import * as _fs from "fs"
import * as _os from "os"
import * as _path from "path"
import process from "process"
import { ApplicationRecordTags } from "./ApplicationRecordTags"
import { retryOnReject } from "./AsyncRetry"
import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { BinaryToBufferTask } from "./BinaryToBufferTask"
import { DeleteAllTagsArgs } from "./DeleteAllTagsArgs"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifToolTask } from "./ExifToolTask"
import { geoTz } from "./GeoTz"
import { ICCProfileTags } from "./ICCProfileTags"
import { lazy } from "./Lazy"
import { Maybe } from "./Maybe"
import { PreviewTag } from "./PreviewTag"
import { ReadRawTask } from "./ReadRawTask"
import { ReadTask } from "./ReadTask"
import { ResourceEvent } from "./ResourceEvent"
import { RewriteAllTagsTask } from "./RewriteAllTagsTask"
import { blank, notBlank } from "./String"
import { Struct } from "./Struct"
import {
  APP12Tags,
  APP14Tags,
  APP1Tags,
  APP4Tags,
  APP5Tags,
  APP6Tags,
  CompositeTags,
  EXIFTags,
  ExifToolTags,
  FileTags,
  FlashPixTags,
  IPTCTags,
  JFIFTags,
  MakerNotesTags,
  MetaTags,
  MPFTags,
  PanasonicRawTags,
  PhotoshopTags,
  PrintIMTags,
  QuickTimeTags,
  RAFTags,
  RIFFTags,
  Tags,
  XMPTags,
} from "./Tags"
import { Version } from "./Version"
import { VersionTask } from "./VersionTask"
import { WriteTask } from "./WriteTask"

export { BinaryField } from "./BinaryField"
export { ExifDate } from "./ExifDate"
export { ExifDateTime } from "./ExifDateTime"
export { ExifTime } from "./ExifTime"
export { ExifToolTask } from "./ExifToolTask"
export { parseJSON } from "./JSON"
export {
  defaultVideosToUTC,
  offsetMinutesToZoneName,
  UnsetZone,
  UnsetZoneName,
  UnsetZoneOffsetMinutes,
} from "./Timezones"
export type {
  AdditionalWriteTags,
  APP12Tags,
  APP14Tags,
  APP1Tags,
  APP4Tags,
  APP5Tags,
  APP6Tags,
  ApplicationRecordTags,
  CompositeTags,
  EXIFTags,
  ExifToolTags,
  ExpandedDateTags,
  FileTags,
  FlashPixTags,
  ICCProfileTags,
  IPTCTags,
  JFIFTags,
  MakerNotesTags,
  Maybe,
  MetaTags,
  MPFTags,
  Omit,
  PanasonicRawTags,
  PhotoshopTags,
  PrintIMTags,
  QuickTimeTags,
  RAFTags,
  ResourceEvent,
  RIFFTags,
  Struct,
  Tags,
  Version,
  XMPTags,
}

const isWin32 = lazy(() => _os.platform() === "win32")

function findExiftool(): string {
  const path: string = require(`exiftool-vendored.${isWin32() ? "exe" : "pl"}`)
  // This s/app.asar/app.asar.unpacked/ path switch adds support for Electron
  // apps that are ASAR-packed.

  // Note that we can't check for electron because child processes that are
  // spawned by the main process will most likely need the ELECTRON_RUN_AS_NODE
  // environment variable set, which will unset the process.versions.electron
  // field.
  const fixedPath = path
    .split(_path.sep)
    .map((ea) => (ea === "app.asar" ? "app.asar.unpacked" : ea))
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

const _ignoreShebang = lazy(
  () => !isWin32() && !_fs.existsSync("/usr/bin/perl")
)

/**
 * @see https://exiftool.org/TagNames/Shortcuts.html
 */
export interface ShortcutTags {
  /**
   * Shortcut for writing the "common EXIF date/time tags": `DateTimeOriginal`,
   * `CreateDate`, and `ModifyDate` tags.
   *
   * Only used by `write`. This tag is not returned by `read`.
   */
  AllDates?: string
}

type AdditionalWriteTags = {
  "Orientation#"?: number
}

// exiftool expects numeric tags to be numbers, but everything else is a string:
type ExpandedDateTags = {
  [K in keyof Tags]:
    | (Tags[K] extends number
        ? number
        : Tags[K] extends ExifDateTime
        ? ExifDate | ExifDateTime
        : Tags[K])
    | string
}

export type Defined<T> = T extends undefined ? never : T

export type DefinedOrNullValued<T> = {
  [P in keyof T]: Defined<T[P]> | null
}

export interface StructAppendTags {
  /**
   * Use this to **append** to existing History records.
   */
  "History+"?: ResourceEvent | ResourceEvent[]
  /**
   * Use this to **append** to existing Version records.
   */
  "Versions+"?: Version | Version[]
}

export type WriteTags = DefinedOrNullValued<
  ShortcutTags & AdditionalWriteTags & ExpandedDateTags & StructAppendTags
>

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
   * Defaults to 30 seconds, to accommodate slow Windows machines.
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

  /**
   * Environment variables passed to ExifTool (besides `EXIFTOOL_HOME`)
   */
  exiftoolEnv: NodeJS.ProcessEnv

  /**
   * Tag names (which can have '*' glob matchers) which you want numeric values,
   * rather than ExifTool's "Print Conversion."
   *
   * If the tag value is only for human consumption, you may want to leave this
   * blank. The default is `["*Duration*"]`, but you may want to include
   * "Orientation" as well.
   */
  numericTags: string[]

  /**
   * Video file dates are assumed to be in UTC, rather than using timezone
   * inference used in images. To disable this default, set this to false.
   *
   * @see <https://github.com/photostructure/exiftool-vendored.js/issues/113>
   */
  defaultVideosToUTC: boolean

  /**
   * `ExifTool` has a shebang line that assumes a valid `perl` is installed at
   * `/usr/bin/perl`.
   *
   * Some environments may not include a valid `/usr/bin/perl` (like AWS
   * Lambda), but `perl` may be available in your `PATH` some place else (like
   * `/opt/bin/perl`), if you pull in a perl layer.
   *
   * This will default to `true` in those environments as a workaround in these
   * situations. Note also that `perl` will be spawned in a sub-shell.
   */
  ignoreShebang: boolean

  /**
   * Override the default geo-to-timezone lookup service.
   *
   * This defaults to `@photostructure/tz-lookup`, but if you have the
   * resources, consider using `geo-tz` for more accurate results.
   * 
   * Here's a snippet of how to use `geo-tz` instead of `tz-lookup`:
   * 
```js
const geotz = require("geo-tz")
const { ExifTool } = require("exiftool-vendored")
const exiftool = new ExifTool({ geoTz: (lat, lon) => geotz.find(lat, lon)[0] })
```
   *
   * @see https://github.com/photostructure/tz-lookup
   * @see https://github.com/evansiroky/node-geo-tz/
   */
  geoTz: typeof geoTz
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

/**
 * Default values for `ExifToolOptions`, except for `processFactory` (which is
 * created by the ExifTool constructor)
 */
export const DefaultExifToolOptions: Omit<
  ExifToolOptions,
  "processFactory" | "ignoreShebang"
> = Object.freeze({
  ...new bc.BatchClusterOptions(),
  maxProcs: DefaultMaxProcs,
  maxTasksPerProcess: 500,
  spawnTimeoutMillis: 30_000,
  // see https://github.com/photostructure/exiftool-vendored.js/issues/34 :
  taskTimeoutMillis: 20_000,
  onIdleIntervalMillis: 2_000,
  taskRetries: 1,
  exiftoolPath: DefaultExifToolPath,
  exiftoolArgs: DefaultExiftoolArgs,
  exiftoolEnv: {},
  pass: "{ready}",
  fail: "{ready}", // < not used
  exitCommand: "-stay_open\nFalse\n",
  versionCommand: new VersionTask().command,
  healthCheckIntervalMillis: 30_000,
  healthCheckCommand: "-ver\n-execute\n",
  numericTags: [
    "*Duration*",
    "GPSAltitude",
    "GPSLatitude",
    "GPSLongitude",
    "GPSPosition",
    "Orientation",
  ],
  defaultVideosToUTC: true,
  geoTz,
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
      ...options,
    }
    const ignoreShebang = o.ignoreShebang ?? _ignoreShebang()

    const env: NodeJS.ProcessEnv = { ...o.exiftoolEnv, LANG: "C" }
    if (notBlank(process.env.EXIFTOOL_HOME) && blank(env.EXIFTOOL_HOME)) {
      env.EXIFTOOL_HOME = process.env.EXIFTOOL_HOME
    }
    const spawnOpts: _cp.SpawnOptions = {
      stdio: "pipe",
      shell: ignoreShebang, // we need to spawn a shell if we ignore the shebang.
      detached: false, // < no orphaned exiftool procs, please
      env,
    }
    const processFactory = () =>
      ignoreShebang
        ? _cp.spawn("perl", [o.exiftoolPath, ...o.exiftoolArgs], spawnOpts)
        : _cp.spawn(o.exiftoolPath, o.exiftoolArgs, spawnOpts)
    this.options = {
      ...o,
      ignoreShebang,
      processFactory,
      exitCommand: o.exitCommand,
      versionCommand: o.versionCommand,
      // User options win:
      ...options,
    }
    this.batchCluster = new bc.BatchCluster(this.options)
  }

  /**
   * Register life cycle event listeners. Delegates to BatchProcess.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   * @param {string[]} [optionalArgs] any additional ExifTool arguments, like "-fast" or
   * "-fast2". **Most other arguments will require you to use `readRaw`.**
   * Note that the default is "-fast", so if you want ExifTool to read the
   * entire file for metadata, you should pass an empty array as the second
   * parameter. See https://exiftool.org/#performance for
   * more information about `-fast` and `-fast2`.
   * @returns {Promise<Tags>} A resolved Tags promise. If there are errors
   * during reading, the `.errors` field will be present.
   * @memberof ExifTool
   */
  read<T extends Tags = Tags>(
    file: string,
    optionalArgs: string[] = ["-fast"]
  ): Promise<T> {
    return this.enqueueTask(() =>
      ReadTask.for(file, {
        optionalArgs,
        numericTags: this.options.numericTags,
        defaultVideosToUTC: this.options.defaultVideosToUTC,
        geoTz: this.options.geoTz,
      })
    ) as any // < no way to know at compile time if we're going to get back a T!
  }

  /**
   * Read the tags from `file`, without any post-processing of ExifTool values.
   *
   * **You probably want `read`, not this method. READ THE REST OF THIS COMMENT
   * CAREFULLY.**
   *
   * If you want to extract specific tag values from a file, you may want to use
   * this, but all data validation and inference heuristics provided by `read`
   * will be skipped.
   *
   * Note that performance will be very similar to `read`, and will actually be
   * worse if you don't include `-fast` or `-fast2` (as the most expensive bit
   * is the perl interpreter and scanning the file on disk).
   *
   * @param args **all ExifTool arguments**, except for the file path. If
   * `-charset` or `filename=utf8` are missing, and you have non-ascii tag
   * values, you're going to have a bad day. The resolved pathname will be
   * appended to the args array for you, and if `-json` is missing from `args`,
   * that will be prepended, as it's a prerequisite to parsing the result.
   *
   * @return Note that the return value will be similar to `Tags`, but with no
   * date, time, or other rich type parsing that you get from `.read()`, the
   * return value is wholly untyped.
   *
   * @see https://github.com/photostructure/exiftool-vendored.js/issues/44
   */
  readRaw(file: string, args: string[]) {
    return this.enqueueTask(() => ReadRawTask.for(file, args))
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
  write<T extends WriteTags = WriteTags>(
    file: string,
    tags: T,
    args?: string[]
  ): Promise<void> {
    return this.enqueueTask(() => WriteTask.for(file, tags, args))
  }

  /**
   * This will strip `file` of all metadata tags. The original file (with the
   * name `${FILENAME}_original`) will be retained. Note that some tags, like
   * stat information and image dimensions, are intrinsic to the file and will
   * continue to exist if you re-`read` the file.
   */
  deleteAllTags(file: string): Promise<void> {
    return this.write(file, {}, DeleteAllTagsArgs)
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
   * Extract the "JpgFromRaw" image in `path/to/image.jpg` and write it to
   * `path/to/fromRaw.jpg`.
   *
   * This size of these images varies widely, and is not present in all RAW
   * images. Nikon and Panasonic use this tag.
   *
   * @return a `Promise<void>`. The promise will be rejected if the file could
   * not be read or the output not written.
   */
  extractJpgFromRaw(imageFile: string, outputFile: string): Promise<void> {
    return this.extractBinaryTag("JpgFromRaw", imageFile, outputFile)
  }

  /**
   * Extract a given binary value from "tagname" tag associated to
   * `path/to/image.jpg` and write it to `dest` (which cannot exist and whose
   * directory must already exist).
   *
   * @return a `Promise<void>`. The promise will be rejected if the binary
   * output not be written to `dest`.
   */
  async extractBinaryTag(
    tagname: string,
    src: string,
    dest: string
  ): Promise<void> {
    // BinaryExtractionTask returns a stringified error if the output indicates
    // the task should not be retried.
    const maybeError = await this.enqueueTask(() =>
      BinaryExtractionTask.for(tagname, src, dest)
    )
    if (maybeError != null) {
      throw new Error(maybeError)
    }
  }

  /**
   * Extract a given binary value from "tagname" tag associated to
   * `path/to/image.jpg` as a `Buffer`. This has the advantage of not writing to
   * a file, but if the payload associated to `tagname` is large, this can cause
   * out-of-memory errors.
   *
   * @return a `Promise<Buffer>`. The promise will be rejected if the file or
   * tag is missing.
   */
  async extractBinaryTagToBuffer(
    tagname: PreviewTag,
    imageFile: string
  ): Promise<Buffer> {
    const result = await this.enqueueTask(() =>
      BinaryToBufferTask.for(tagname, imageFile)
    )
    if (Buffer.isBuffer(result)) {
      return result
    } else if (result instanceof Error) {
      throw result
    } else {
      throw new Error(
        "Unexpected result from BinaryToBufferTask: " + JSON.stringify(result)
      )
    }
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
   * @see https://exiftool.org/faq.html#Q20
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
    allowMakerNoteRepair = false
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
  end(gracefully = true): Promise<void> {
    return this.batchCluster.end(gracefully).promise
  }

  /**
   * @return true if `.end()` has been invoked
   */
  get ended() {
    return this.batchCluster.ended
  }

  /**
   * Most users will not need to use `enqueueTask` directly. This method
   * supports submitting custom `BatchCluster` tasks.
   *
   * @see BinaryExtractionTask for an example task implementation
   */
  enqueueTask<T>(
    task: () => ExifToolTask<T> | Promise<ExifToolTask<T>>
  ): Promise<T> {
    return retryOnReject(
      async () => this.batchCluster.enqueueTask(await task()),
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
    return this.batchCluster.pendingTaskCount
  }

  /**
   * @return the total number of child processes created by this instance
   */
  get spawnedProcs(): number {
    return this.batchCluster.spawnedProcCount
  }

  /**
   * @return the current number of child processes currently servicing tasks
   */
  get busyProcs(): number {
    return this.batchCluster.busyProcCount
  }

  /**
   * @return report why child processes were recycled
   */
  childEndCounts() {
    return this.batchCluster.childEndCounts
  }

  /**
   * Shut down any currently-running child processes. New child processes will
   * be started automatically to handle new tasks.
   */
  closeChildProcesses(gracefully = true) {
    return this.batchCluster.closeChildProcesses(gracefully)
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
