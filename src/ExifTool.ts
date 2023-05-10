import * as bc from "batch-cluster"
import * as _cp from "child_process"
import * as _fs from "fs"
import process from "process"
import { ApplicationRecordTags } from "./ApplicationRecordTags"
import { retryOnReject } from "./AsyncRetry"
import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { BinaryToBufferTask } from "./BinaryToBufferTask"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { DeleteAllTagsArgs } from "./DeleteAllTagsArgs"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifToolOptions } from "./ExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { ICCProfileTags } from "./ICCProfileTags"
import { IgnorableError } from "./IgnorableError"
import { isWin32 } from "./IsWin32"
import { lazy } from "./Lazy"
import { Maybe } from "./Maybe"
import { Omit } from "./Omit"
import { pick } from "./Pick"
import { PreviewTag } from "./PreviewTag"
import { Json, Literal, RawTags } from "./RawTags"
import { ReadRawTask } from "./ReadRawTask"
import { ReadTask, ReadTaskOptions } from "./ReadTask"
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
import { WriteTags } from "./WriteTags"
import { WriteTask, WriteTaskOptions } from "./WriteTask"

export { BinaryField } from "./BinaryField"
export { DefaultExiftoolArgs } from "./DefaultExiftoolArgs"
export { DefaultExifToolOptions } from "./DefaultExifToolOptions"
export { DefaultMaxProcs } from "./DefaultMaxProcs"
export { ExifDate } from "./ExifDate"
export { ExifDateTime } from "./ExifDateTime"
export { ExifTime } from "./ExifTime"
export { ExifToolTask } from "./ExifToolTask"
export { isIgnorableWarning } from "./IgnorableError"
export { parseJSON } from "./JSON"
export { DefaultReadTaskOptions } from "./ReadTask"
export {
  defaultVideosToUTC,
  offsetMinutesToZoneName,
  UnsetZone,
  UnsetZoneName,
  UnsetZoneOffsetMinutes,
} from "./Timezones"
export { DefaultWriteTaskOptions } from "./WriteTask"
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
  ExifToolOptions,
  ExifToolTags,
  ExpandedDateTags,
  FileTags,
  FlashPixTags,
  ICCProfileTags,
  IgnorableError,
  IPTCTags,
  JFIFTags,
  Json,
  Literal,
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
  RawTags,
  ReadTaskOptions,
  ResourceEvent,
  RIFFTags,
  Struct,
  Tags,
  Version,
  WriteTags,
  WriteTaskOptions,
  XMPTags,
}

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
   *
   * @param {string[]} [optionalArgs] any additional ExifTool arguments, like
   * "-fast" or "-fast2". **Most other arguments will require you to use
   * `readRaw`.** Note that the default is "-fast", so if you want ExifTool to
   * read the entire file for metadata, you should pass an empty array as the
   * second parameter. See https://exiftool.org/#performance for more
   * information about `-fast` and `-fast2`.
   *
   * @returns {Promise<Tags>} A resolved Tags promise. If there are errors
   * during reading, the `.errors` field will be present.
   */
  read<T extends Tags = Tags>(
    file: string,
    optionalArgs: string[] = ["-fast"],
    options?: ReadTaskOptions
  ): Promise<T> {
    return this.enqueueTask(() =>
      ReadTask.for(file, {
        optionalArgs,
        ...pick(
          this.options,
          "numericTags",
          "useMWG",
          "includeImageDataMD5",
          "defaultVideosToUTC",
          "geoTz"
        ),
        ...options,
      })
    ) as any // < no way to know at compile time if we're going to get back a T!
  }

  /**
   * Read the tags from `file`, without any post-processing of ExifTool
   * values.
   *
   * **You probably want `read`, not this method. READ THE REST OF THIS
   * COMMENT CAREFULLY.**
   *
   * If you want to extract specific tag values from a file, you may want to
   * use this, but all data validation and inference heuristics provided by
   * `read` will be skipped.
   *
   * Note that performance will be very similar to `read`, and will actually
   * be worse if you don't include `-fast` or `-fast2` (as the most expensive
   * bit is the perl interpreter and scanning the file on disk).
   *
   * @param args any additional arguments other than the file path. Note that
   * "-json", and the Windows unicode filename handler flags, "-charset
   * filename=utf8", will be added automatically.
   *
   * @return Note that the return value will be similar to `Tags`, but with no
   * date, time, or other rich type parsing that you get from `.read()`. The
   * field values will be `string | number | string[]`.
   *
   * @see https://github.com/photostructure/exiftool-vendored.js/issues/44 for
   * typing details.
   */
  readRaw(file: string, args: string[] = []): Promise<RawTags> {
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
  write(
    file: string,
    tags: WriteTags,
    args?: string[],
    options?: WriteTaskOptions
  ): Promise<void> {
    const retriable = false
    return this.enqueueTask(
      () =>
        WriteTask.for(file, tags, args, {
          ...pick(this.options, "useMWG"),
          ...options,
        }),
      retriable
    )
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
    task: () => ExifToolTask<T> | Promise<ExifToolTask<T>>,
    retriable = true
  ): Promise<T> {
    const f = async () => {
      const t = await task()
      // if we have to add more options for every task, rethink this approach:
      t.isIgnorableError = this.options.isIgnorableError
      return this.batchCluster.enqueueTask(t)
    }
    return retriable ? retryOnReject(f, this.options.taskRetries) : f()
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
