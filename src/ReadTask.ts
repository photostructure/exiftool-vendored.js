import { logger } from "batch-cluster"
import * as _path from "node:path"
import { toA } from "./Array"
import { BinaryField } from "./BinaryField"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { handleDeprecatedOptions } from "./ExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { lazy } from "./Lazy"
import { firstDefinedThunk, map } from "./Maybe"
import { toFloat } from "./Number"
import { OnlyZerosRE } from "./OnlyZerosRE"
import { pick } from "./Pick"
import { blank, isString, toS } from "./String"
import { Tags } from "./Tags"
import {
  extractTzOffsetFromDatestamps,
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset,
  normalizeZone,
} from "./Timezones"

/**
 * tag names we don't need to muck with:
 */
const PassthroughTags = [
  "ExifToolVersion",
  "DateStampMode",
  "Sharpness",
  "Firmware",
  "DateDisplayFormat",
]

export const ReadTaskOptionFields = [
  "backfillTimezones",
  "defaultVideosToUTC",
  "geoTz",
  "ignoreZeroZeroLatLon",
  "imageHashType",
  "includeImageDataMD5",
  "inferTimezoneFromDatestamps",
  "inferTimezoneFromDatestampTags",
  "numericTags",
  "useMWG",
] as const

const NullIsh = ["undef", "null", "undefined"]

export function nullish(s: string | undefined): s is undefined {
  return s == null || (isString(s) && NullIsh.includes(s.trim()))
}

export const DefaultReadTaskOptions = {
  optionalArgs: [] as string[],
  ...pick(DefaultExifToolOptions, ...ReadTaskOptionFields),
} as const

export type ReadTaskOptions = typeof DefaultReadTaskOptions

const MaybeDateOrTimeRe = /when|date|time|subsec|creat|modif/i

export class ReadTask extends ExifToolTask<Tags> {
  private readonly degroup: boolean
  private _raw: any = {}
  private _rawDegrouped: any = {}
  private readonly tags: Tags = {}
  private lat: number | undefined
  private lon: number | undefined
  private invalidLatLon = false
  private tz: string | undefined
  private tzSource?: string

  private constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    readonly options: ReadTaskOptions
  ) {
    super(args)
    // See https://github.com/photostructure/exiftool-vendored.js/issues/147#issuecomment-1642580118
    this.degroup = this.args.includes("-G")
    this.tags = { SourceFile: sourceFile } as Tags
    this.tags.errors = this.errors
  }

  static for(filename: string, options: Partial<ReadTaskOptions>): ReadTask {
    const opts: ReadTaskOptions = handleDeprecatedOptions({
      ...DefaultReadTaskOptions,
      ...options,
    })
    const sourceFile = _path.resolve(filename)
    const args = [
      ...Utf8FilenameCharsetArgs,
      "-json",
      "-struct", // Return struct tags https://exiftool.org/struct.html
      ...toA(opts.optionalArgs),
    ]
    if (opts.useMWG) {
      args.push("-use", "MWG")
    }
    if (opts.imageHashType != null && opts.imageHashType !== false) {
      // See https://exiftool.org/forum/index.php?topic=14706.msg79218#msg79218
      args.push("-api", "requesttags=imagedatahash")
      args.push("-api", "imagehashtype=" + opts.imageHashType)
    }
    // IMPORTANT: "-all" must be after numeric tag references, as the first
    // reference in wins
    args.push(...opts.numericTags.map((ea) => "-" + ea + "#"))
    // We have to add a -all or else we'll only get the numericTags. sad.

    // TODO: Do you need -xmp:all, -all, or -all:all? Is -* better?
    args.push("-all", sourceFile)

    return new ReadTask(sourceFile, args, opts)
  }

  override toString(): string {
    return "ReadTask" + this.sourceFile + ")"
  }

  // only exposed for tests
  parse(data: string, err?: Error): Tags {
    try {
      this._raw = JSON.parse(data)[0]
    } catch (jsonError) {
      // TODO: should restart exiftool?
      logger().warn("ExifTool.ReadTask(): Invalid JSON", {
        data,
        err,
        jsonError,
      })
      throw err ?? jsonError
    }
    // ExifTool does "humorous" things to paths, like flip path separators. resolve() undoes that.
    const SourceFile = _path.resolve(this._raw.SourceFile)
    // Sanity check that the result is for the file we want:
    if (SourceFile !== this.sourceFile) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(
        `Internal error: unexpected SourceFile of ${this._raw.SourceFile} for file ${this.sourceFile}`
      )
    }
    if (this.degroup) {
      this._rawDegrouped = {}
      for (const [key, value] of Object.entries(this._raw)) {
        const k = this.#tagName(key)
        this._rawDegrouped[k] = value
      }
    } else {
      this._rawDegrouped = this._raw
    }
    return this.#parseTags()
  }

  #isVideo(): boolean {
    return String(this._rawDegrouped?.MIMEType).startsWith("video/")
  }

  #defaultToUTC(): boolean {
    return this.#isVideo() && this.options.defaultVideosToUTC
  }

  #tagName(k: string): string {
    return this.degroup ? k.split(":")[1] ?? k : k
  }

  #parseTags(): Tags {
    this.#extractLatLon()
    this.#extractTzOffset()
    map(this.tz, (ea) => (this.tags.tz = ea))
    map(this.tzSource, (ea) => (this.tags.tzSource = ea))
    // avoid casting `this.tags as any` everywhere:
    const tags = this.tags as any

    for (const [key, value] of Object.entries(this._raw)) {
      const k = this.#tagName(key)
      const v = this.#parseTag(k, value)
      // Note that we set `key` (which may include a group prefix):
      tags[key] = v
    }

    if (this.errors.length > 0) this.tags.errors = this.errors
    return tags
  }

  #extractLatLon = lazy(() => {
    this.lat ??= this.#latlon("GPSLatitude", "S", 90)
    this.lon ??= this.#latlon("GPSLongitude", "W", 180)
    if (this.options.ignoreZeroZeroLatLon && this.lat === 0 && this.lon === 0) {
      this.invalidLatLon = true
    }
    if (this.invalidLatLon) {
      this.lat = this.lon = undefined
    }
  })

  #latlon(
    tagName: "GPSLatitude" | "GPSLongitude",
    negateRef: "S" | "W",
    maxValid: 90 | 180
  ): number | undefined {
    const tagValue = this._rawDegrouped[tagName]
    const ref = this._rawDegrouped[tagName + "Ref"]
    const result = toFloat(tagValue)
    if (result == null) {
      return
    } else if (Math.abs(result) > maxValid) {
      this.errors.push(`Invalid ${tagName}: ${JSON.stringify(tagValue)}`)
      this.invalidLatLon = true
      return
    } else if (blank(ref)) {
      // Videos may not have a GPSLatitudeRef or GPSLongitudeRef: if this is the case, assume the given sign is correct.
      return result
    } else {
      // Versions of ExifTool pre-12 returned properly-negated lat/lon. ExifTool
      // 12+ always returns positive values (!!). Also: if '-GPS*#' is set,
      // we'll see "S" instead of "South", hence the .startsWith() instead of
      // ===:
      const negative = toS(ref).toUpperCase().startsWith(negateRef)
      return (negative ? -1 : 1) * Math.abs(result)
    }
  }

  #geoTz = lazy(() => {
    this.#extractLatLon()
    if (this.invalidLatLon || this.lat == null || this.lon == null) return
    try {
      const geoTz = this.options.geoTz(this.lat, this.lon)
      return normalizeZone(geoTz)
    } catch {
      this.invalidLatLon = true
      return
    }
  })

  #extractTzOffset() {
    map(
      firstDefinedThunk([
        // If there is an explicit TimeZone tag (which is rare), defer to that
        // before defaulting to UTC for videos:
        () => extractTzOffsetFromTags(this._rawDegrouped),

        () =>
          map(this.#geoTz(), (ea) => ({
            tz: ea.name,
            src: "GPSLatitude/GPSLongitude",
          })),

        () => extractTzOffsetFromDatestamps(this._rawDegrouped, this.options),

        // See https://github.com/photostructure/exiftool-vendored.js/issues/113
        // and https://github.com/photostructure/exiftool-vendored.js/issues/156

        // Videos are frequently encoded in UTC, but don't include the
        // timezone offset in their datetime stamps.
        () =>
          this.#defaultToUTC()
            ? {
                tz: "UTC",
                src: "defaultVideosToUTC",
              }
            : // not applicable:
              undefined,

        // This is a last-ditch estimation heuristic:
        () => extractTzOffsetFromUTCOffset(this._rawDegrouped),
      ]),
      (ea) => ({ tz: this.tz, src: this.tzSource } = ea)
    )
  }

  #parseTag(tagName: string, value: any): any {
    if (nullish(value)) return undefined

    try {
      if (PassthroughTags.indexOf(tagName) >= 0) {
        return value
      }
      if (tagName === "GPSLatitude") {
        return this.lat
      }
      if (tagName === "GPSLongitude") {
        return this.lon
      }
      if (Array.isArray(value)) {
        return value.map((ea) => this.#parseTag(tagName, ea))
      }
      if (typeof value === "object") {
        const result: any = {}
        for (const [k, v] of Object.entries(value)) {
          result[k] = this.#parseTag(tagName + "." + k, v)
        }
        return result
      }
      if (typeof value === "string") {
        const b = BinaryField.fromRawValue(value)
        if (b != null) return b

        if (
          MaybeDateOrTimeRe.test(tagName) &&
          // Reject date/time keys that are "0" or "00" (found in Canon
          // SubSecTime values)
          !OnlyZerosRE.test(value)
        ) {
          // if #defaultToUTC() is true, _we actually think zoneless
          // datestamps are all in UTC_, rather than being in `this.tz` (which
          // may be from GPS or other heuristics). See issue #153.
          const tz =
            isUtcTagName(tagName) || this.#defaultToUTC()
              ? "UTC"
              : this.options.backfillTimezones
                ? this.tz
                : undefined

          // Time-only tags have "time" but not "date" in their name:
          const keyIncludesTime = /subsec|time/i.test(tagName)
          const keyIncludesDate = /date/i.test(tagName)
          const keyIncludesWhen = /when/i.test(tagName) // < ResourceEvent.When
          const result =
            (keyIncludesTime || keyIncludesDate || keyIncludesWhen
              ? ExifDateTime.from(value, tz)
              : undefined) ??
            (keyIncludesTime || keyIncludesWhen
              ? ExifTime.fromEXIF(value, tz)
              : undefined) ??
            (keyIncludesDate || keyIncludesWhen
              ? ExifDate.from(value)
              : undefined) ??
            value
          if (
            this.options.backfillTimezones &&
            result != null &&
            this.tz != null &&
            result instanceof ExifDateTime &&
            this.#defaultToUTC() &&
            !isUtcTagName(tagName) &&
            true === result.inferredZone
          ) {
            return result.setZone(this.tz)
          }
          return result
        }
      }
      // Trust that ExifTool rendered the value with the correct type in JSON:
      return value
    } catch (e) {
      this.addError(
        `Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`
      )
      return value
    }
  }
}

function isUtcTagName(tagName: string): boolean {
  return tagName.includes("UTC") || tagName.startsWith("GPS")
}
