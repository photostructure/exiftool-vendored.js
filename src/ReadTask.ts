import { logger } from "batch-cluster"
import { Zone } from "luxon"
import * as _path from "node:path"
import { toA } from "./Array"
import { BinaryField } from "./BinaryField"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { errorsAndWarnings } from "./ErrorsAndWarnings"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolOptions, handleDeprecatedOptions } from "./ExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { lazy } from "./Lazy"
import { map, Maybe } from "./Maybe"
import { isNumber, toFloat } from "./Number"
import { OnlyZerosRE } from "./OnlyZerosRE"
import { pick } from "./Pick"
import { blank, isString } from "./String"
import { Tags } from "./Tags"
import {
  extractTzOffsetFromDatestamps,
  extractTzOffsetFromTags,
  extractTzOffsetFromTimeStamp,
  extractTzOffsetFromUTCOffset,
  normalizeZone,
  TzSrc,
} from "./Timezones"

/**
 * tag names we don't need to muck with, but name conventions (like including
 * "date") suggest they might be date/time tags
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
  "geolocation",
  "geoTz",
  "ignoreMinorErrors",
  "ignoreZeroZeroLatLon",
  "imageHashType",
  "includeImageDataMD5",
  "inferTimezoneFromDatestamps",
  "inferTimezoneFromDatestampTags",
  "inferTimezoneFromTimeStamp",
  "numericTags",
  "useMWG",
  "struct",
  "readArgs",
  "adjustTimeZoneIfDaylightSavings",
] as const satisfies (keyof ExifToolOptions)[]

const NullIsh = ["undef", "null", "undefined"]

export function nullish(s: string | undefined): s is undefined {
  return s == null || (isString(s) && NullIsh.includes(s.trim()))
}

export const DefaultReadTaskOptions = {
  ...pick(DefaultExifToolOptions, ...ReadTaskOptionFields),
} as const satisfies Partial<ExifToolOptions>

export type ReadTaskOptions = Partial<typeof DefaultReadTaskOptions>

const MaybeDateOrTimeRe = /when|date|time|subsec|creat|modif/i

export class ReadTask extends ExifToolTask<Tags> {
  private readonly degroup: boolean
  #raw: any = {}
  #rawDegrouped: any = {}
  readonly #tags: Tags = {}

  /**
   * @param sourceFile the file to read
   * @param args the full arguments to pass to exiftool that take into account
   * the flags in `options`
   */
  constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    override options: Required<ReadTaskOptions>
  ) {
    super(args, options)
    // See https://github.com/photostructure/exiftool-vendored.js/issues/147#issuecomment-1642580118
    this.degroup = this.args.includes("-G")
    this.#tags = { SourceFile: sourceFile } as Tags
    this.#tags.errors = this.errors
  }

  static for(filename: string, options: ReadTaskOptions): ReadTask {
    const opts: Required<ReadTaskOptions> = handleDeprecatedOptions({
      ...DefaultReadTaskOptions,
      ...options,
    })
    const sourceFile = _path.resolve(filename)
    const args = [...Utf8FilenameCharsetArgs, "-json", ...toA(opts.readArgs)]
    // "-api struct=undef" doesn't work: but it's the same as struct=0:
    args.push("-api", "struct=" + (isNumber(opts.struct) ? opts.struct : "0"))
    if (opts.useMWG) {
      args.push("-use", "MWG")
    }
    if (opts.imageHashType != null && opts.imageHashType !== false) {
      // See https://exiftool.org/forum/index.php?topic=14706.msg79218#msg79218
      args.push("-api", "requesttags=imagedatahash")
      args.push("-api", "imagehashtype=" + opts.imageHashType)
    }
    if (opts.geolocation ?? false) {
      args.push("-api", "geolocation")
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
      this.#raw = JSON.parse(data)[0]
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
    const SourceFile = _path.resolve(this.#raw.SourceFile)
    // Sanity check that the result is for the file we want:
    if (SourceFile !== this.sourceFile) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(
        `Internal error: unexpected SourceFile of ${this.#raw.SourceFile} for file ${this.sourceFile}`
      )
    }

    return this.#parseTags()
  }

  #isVideo(): boolean {
    return String(this.#rawDegrouped?.MIMEType).startsWith("video/")
  }

  #defaultToUTC(): boolean {
    return this.#isVideo() && this.options.defaultVideosToUTC
  }

  #tagName(k: string): string {
    return this.degroup ? (k.split(":")[1] ?? k) : k
  }

  #parseTags(): Tags {
    if (this.degroup) {
      this.#rawDegrouped = {}
      for (const [key, value] of Object.entries(this.#raw)) {
        const k = this.#tagName(key)
        this.#rawDegrouped[k] = value
      }
    } else {
      this.#rawDegrouped = this.#raw
    }

    // avoid casting `this.tags as any` for the rest of the function:
    const tags = this.#tags as any

    const tzSrc = this.#extractTzOffset()
    if (tzSrc) {
      tags.tz = tzSrc.tz
      tags.tzSource = tzSrc.src
    }

    for (const [key, value] of Object.entries(this.#raw)) {
      const k = this.#tagName(key)
      const v = this.#parseTag(k, value)
      // Note that we set `key` (which may include a group prefix):
      tags[key] = v
    }

    // we could `return {...tags, ...errorsAndWarnings(this, tags)}` but tags is
    // a chonky monster, and we don't want to double the work for the poor
    // garbage collector.
    const { errors, warnings } = errorsAndWarnings(this, tags)
    tags.errors = errors
    tags.warnings = warnings

    return tags
  }

  #lat = lazy(() => this.#extractGpsMetadata()?.lat)
  #lon = lazy(() => this.#extractGpsMetadata()?.lon)
  #tzFromGps = lazy(() => this.#extractGpsMetadata()?.tzFromGps)

  #extractGpsMetadata = lazy(() => {
    const lat = this.#parseLocation({
      tagName: "GPSLatitude",
      positiveRef: "N",
      negativeRef: "S",
      maxValid: 90,
    })
    const lon = this.#parseLocation({
      tagName: "GPSLongitude",
      positiveRef: "E",
      negativeRef: "W",
      maxValid: 180,
    })
    let invalid =
      lat == null ||
      lon == null ||
      (this.options.ignoreZeroZeroLatLon && lat === 0 && lon === 0)
    if (this.options.geolocation && invalid) {
      this.warnings.push(
        "Invalid GPSLatitude or GPSLongitude. Deleting geolocation tags."
      )
      for (const key of Object.keys(this.#raw)) {
        const k = this.#tagName(key)
        if (k.startsWith("Geolocation")) {
          delete this.#raw[key]
          delete this.#rawDegrouped[k]
        }
      }
    }

    let tzFromGps: Maybe<Zone>

    if (!invalid && lat != null && lon != null) {
      try {
        const geoTz = this.options.geoTz(lat, lon)
        tzFromGps = normalizeZone(geoTz)
      } catch {
        invalid = true
      }
    }

    return {
      lat: invalid ? undefined : lat,
      lon: invalid ? undefined : lon,
      invalid,
      tzFromGps,
    }
  })

  #parseLocation({
    tagName,
    positiveRef,
    negativeRef,
    maxValid,
  }: {
    tagName: "GPSLatitude" | "GPSLongitude"
    positiveRef: "N" | "E"
    negativeRef: "S" | "W"
    maxValid: 90 | 180
  }): Maybe<number> {
    const tagValue = this.#rawDegrouped[tagName]
    const refKey = tagName + "Ref"
    const ref = this.#rawDegrouped[refKey]
    const result = toFloat(tagValue)
    if (result == null) {
      return undefined
    } else if (Math.abs(result) > maxValid) {
      this.warnings.push(`Invalid ${tagName}: ${JSON.stringify(tagValue)}`)
      return undefined
    } else if (blank(ref)) {
      // Videos may not have a GPSLatitudeRef or GPSLongitudeRef: if this is the case, assume the given sign is correct.
      return result
    } else {
      // See https://github.com/photostructure/exiftool-vendored.js/issues/165
      // and https://www.exiftool.org/TagNames/GPS.html
      const expectedPositive =
        ref.toUpperCase().startsWith(positiveRef) || (isNumber(ref) && ref >= 0)
      const expectedNegative =
        ref.toUpperCase().startsWith(negativeRef) || (isNumber(ref) && ref < 0)
      if (expectedPositive && result < 0) {
        this.warnings.push(
          `Invalid ${tagName} or ${refKey}: expected ${ref} ${tagName} > 0 but got ${result}`
        )
      } else if (expectedNegative && result > 0) {
        this.warnings.push(
          `Invalid ${tagName} or ${refKey}: expected ${ref} ${tagName} < 0 but got ${result}`
        )
      }
      return result
    }
  }

  #tz = lazy(() => this.#extractTzOffset()?.tz)

  #extractTzOffset = lazy<Maybe<TzSrc>>(
    () =>
      // If there is an explicit TimeZone tag (which is rare), defer to that
      // before defaulting to UTC for videos:
      extractTzOffsetFromTags(this.#rawDegrouped, this.options) ??
      map(this.#tzFromGps(), (ea) => ({
        tz: ea.name,
        src: "GPSLatitude/GPSLongitude",
      })) ??
      extractTzOffsetFromDatestamps(this.#rawDegrouped, this.options) ??
      // See https://github.com/photostructure/exiftool-vendored.js/issues/113
      // and https://github.com/photostructure/exiftool-vendored.js/issues/156

      // Videos are frequently encoded in UTC, but don't include the
      // timezone offset in their datetime stamps.

      (this.#defaultToUTC()
        ? {
            tz: "UTC",
            src: "defaultVideosToUTC",
          }
        : // not applicable:
          undefined) ??
      // This is a last-ditch estimation heuristic:
      extractTzOffsetFromUTCOffset(this.#rawDegrouped) ??
      // No, really, this is the even worse than UTC offset heuristics:
      extractTzOffsetFromTimeStamp(this.#rawDegrouped, this.options)
  )

  #parseTag(tagName: string, value: any): any {
    if (nullish(value)) return undefined

    try {
      if (PassthroughTags.indexOf(tagName) >= 0) {
        return value
      }
      if (tagName === "GPSLatitude") {
        return this.#lat()
      }
      if (tagName === "GPSLongitude") {
        return this.#lon()
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
                ? this.#tz()
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

          const defaultTz = this.#tz()
          if (
            this.options.backfillTimezones &&
            result != null &&
            defaultTz != null &&
            result instanceof ExifDateTime &&
            this.#defaultToUTC() &&
            !isUtcTagName(tagName) &&
            true === result.inferredZone
          ) {
            return result.setZone(defaultTz)
          }
          return result
        }
      }
      // Trust that ExifTool rendered the value with the correct type in JSON:
      return value
    } catch (e) {
      this.warnings.push(
        `Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`
      )
      return value
    }
  }
}

function isUtcTagName(tagName: string): boolean {
  return tagName.includes("UTC") || tagName.startsWith("GPS")
}
