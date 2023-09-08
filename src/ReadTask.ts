import { logger } from "batch-cluster"
import * as _path from "path"
import { sortBy, toA } from "./Array"
import { BinaryField } from "./BinaryField"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { handleDeprecatedOptions } from "./ExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { firstDateTime } from "./FirstDateTime"
import { lazy } from "./Lazy"
import { Maybe, firstDefinedThunk, map } from "./Maybe"
import { toFloat } from "./Number"
import { OnlyZerosRE } from "./OnlyZerosRE"
import { pick } from "./Pick"
import { blank, isString, toS } from "./String"
import { Tags } from "./Tags"
import {
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

const NullIsh = ["undef", "null", "undefined"]

export function nullish(s: string | undefined): s is undefined {
  return s == null || (isString(s) && NullIsh.includes(s.trim()))
}

export const DefaultReadTaskOptions = {
  optionalArgs: [] as string[],
  ...pick(
    DefaultExifToolOptions,
    "numericTags",
    "useMWG",
    "includeImageDataMD5",
    "imageHashType",
    "defaultVideosToUTC",
    "backfillTimezones",
    "inferTimezoneFromDatestamps",
    "geoTz"
  ),
} as const

export type ReadTaskOptions = typeof DefaultReadTaskOptions

const MaybeDateOrTimeRe = /when|date|time|subsec|creat|modif/i
const TimeRe = /time/i

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

  #maybeSetZone(
    edt: ExifDateTime,
    candidates: ExifDateTime[]
  ): Maybe<ExifDateTime> {
    if (edt.hasZone && edt.zone === this.tz) return edt
    for (const src of candidates) {
      const result = edt.maybeMatchZone(src)
      if (result != null) {
        return result
      }
    }
    return
  }

  #parseTags(): Tags {
    this.#extractLatLon()
    this.#extractTzOffset()
    map(this.tz, (ea) => (this.tags.tz = ea))
    map(this.tzSource, (ea) => (this.tags.tzSource = ea))
    // avoid casting `this.tags as any` everywhere:
    const tags = this.tags as any
    const datesWithTz: ExifDateTime[] = []

    // two passes: one to parse dates, and the next to possibly set timezones.
    for (const [key, value] of Object.entries(this._raw)) {
      const k = this.#tagName(key)
      const v = this.#parseTag(k, value)
      if (v instanceof ExifDateTime && v.hasZone && !isUtcTagName(key)) {
        // don't incorrectly infer UTC dates if this is a UTC tag.
        datesWithTz.push(v)
      }
      // Note that we set `key` (which may include a group prefix):
      tags[key] = v
    }

    if (this.options.backfillTimezones === true) {
      // prefer non-UTC offsets (which may be incorrect):
      const candidates = sortBy(
        datesWithTz,
        (ea) => -Math.abs(ea.tzoffsetMinutes ?? 0)
      )
      for (const [key, value] of Object.entries(tags)) {
        if (value instanceof ExifDateTime && !isUtcTagName(key)) {
          tags[key] = this.#maybeSetZone(value, candidates) ?? value
        }
      }
    }
    if (this.errors.length > 0) this.tags.errors = this.errors
    return tags
  }

  #extractLatLon = lazy(() => {
    this.lat ??= this.#latlon("GPSLatitude", "S", 90)
    this.lon ??= this.#latlon("GPSLongitude", "W", 180)
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
        () => {
          const tz = extractTzOffsetFromTags(this._rawDegrouped, this.options)
          // If this tz offset matches the GPS zone, use the GPS zone name (like "America/Los_Angeles") instead of the offset.
          const z = normalizeZone(tz?.tz)
          if (tz != null && z != null) {
            const geoTz = this.#geoTz()
            if (geoTz != null) {
              const edt = firstDateTime(this._rawDegrouped)
              if (edt != null) {
                const ts = edt.toMillis()
                const zOffset = z.offset(ts)
                const geoTzOffset = geoTz.offset(ts)
                if (zOffset === geoTzOffset) {
                  return {
                    tz: geoTz.name,
                    src: tz.src + " & GPSLatitude/GPSLongitude",
                  }
                }
              }
            }
          }
          // nope, no GPS, just use the minutes-offset zone format:
          return tz
        },

        // See https://github.com/photostructure/exiftool-vendored.js/issues/113

        // Videos are frequently encoded in UTC, but don't include the
        // timezone offset in their datetime stamps.

        // This must be BEFORE the tz_lookup/geoTz strategy, as smartphone
        // videos will contain GPS, but still encode timestamps in UTC without
        // an explicit offset. HURRAY
        () =>
          this.#defaultToUTC()
            ? {
                tz: "UTC",
                src: "defaultVideosToUTC",
              }
            : // not applicable:
              undefined,

        // If lat/lon is valid, use the tzlookup library, as it will be a proper
        // Zone name (like "America/New_York"), rather than just an hour offset.
        () =>
          map(this.#geoTz(), (ea) => ({
            tz: ea.name,
            src: "GPSLatitude/GPSLongitude",
          })),

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
      if (Array.isArray(value)) {
        return value.map((ea) => this.#parseTag(tagName, ea))
      }
      if (typeof value === "object") {
        const result: any = {}
        for (const [k, v] of Object.entries(value)) {
          result[k] = this.#parseTag(k, v)
        }
        return result
      }
      if (tagName === "GPSLatitude") {
        return this.lat
      }
      if (tagName === "GPSLongitude") {
        return this.lon
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
          const utc_tz_override = isUtcTagName(tagName) || this.#defaultToUTC()
          const tz = utc_tz_override ? "UTC" : this.tz

          return (
            ExifDateTime.from(value, tz) ??
            (TimeRe.test(tagName) ? ExifTime.fromEXIF(value) : undefined) ??
            ExifDate.from(value) ??
            value
          )
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
