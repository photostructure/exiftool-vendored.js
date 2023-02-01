import { logger } from "batch-cluster"
import * as _path from "path"
import { BinaryField } from "./BinaryField"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolOptions } from "./ExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { firstDateTime } from "./FirstDateTime"
import { lazy } from "./Lazy"
import { firstDefinedThunk, map } from "./Maybe"
import { toFloat } from "./Number"
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

export type ReadTaskOptions = { optionalArgs: string[] } & Pick<
  ExifToolOptions,
  "numericTags" | "defaultVideosToUTC" | "geoTz"
>

export class ReadTask extends ExifToolTask<Tags> {
  private readonly degroup: boolean
  /** May have keys that are group-prefixed */
  private _raw: any = {}
  /** Always has non-group-prefixed keys */
  private _tags: any = {}
  private readonly tags: Tags
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
    this.degroup = this.args.indexOf("-G") !== -1
    this.tags = { SourceFile: sourceFile } as Tags
    this.tags.errors = this.errors
  }

  static for(filename: string, options: ReadTaskOptions): ReadTask {
    const sourceFile = _path.resolve(filename)
    const args = [
      ...Utf8FilenameCharsetArgs,
      "-json",
      "-struct", // Return struct tags https://exiftool.org/struct.html
      ...(options.optionalArgs ?? []),
    ]
    // IMPORTANT: "-all" must be after numeric tag references (first reference
    // in wins)
    args.push(...(options.numericTags ?? []).map((ea) => "-" + ea + "#"))
    // TODO: Do you need -xmp:all, -all, or -all:all?
    args.push("-all", sourceFile)

    // console.log("new ReadTask()", { sourceFile, args })
    return new ReadTask(sourceFile, args, options)
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
      Object.keys(this._raw).forEach((keyWithGroup) => {
        this._tags[this.#tagName(keyWithGroup)] = this._raw[keyWithGroup]
      })
    } else {
      this._tags = this._raw
    }

    return this.#parseTags()
  }

  #tagName(k: string): string {
    return this.degroup ? k.split(":")[1] ?? k : k
  }

  #parseTags(): Tags {
    this.#extractLatLon()
    this.#extractTzOffset()
    map(this.tz, (ea) => (this.tags.tz = ea))
    map(this.tzSource, (ea) => (this.tags.tzSource = ea))
    const t: any = this.tags // tsc hack :(
    for (const key of Object.keys(this._raw)) {
      t[key] = this.#parseTag(this.#tagName(key), this._raw[key])
    }
    if (this.errors.length > 0) this.tags.errors = this.errors
    return this.tags as Tags
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
    const tagValue = this._tags[tagName]
    const ref = this._tags[tagName + "Ref"]
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
          const tz = extractTzOffsetFromTags(this._tags)
          // If this tz offset matches the GPS zone, use the GPS zone name (like "America/Los_Angeles") instead of the offset.
          const z = normalizeZone(tz?.tz)
          if (tz != null && z != null) {
            const geoTz = this.#geoTz()
            if (geoTz != null) {
              const edt = firstDateTime(this._raw)
              if (edt != null) {
                const ts = edt.toMillis()
                const zOffset = z.offset(ts)
                const geoTzOffset = geoTz.offset(ts)
                if (zOffset === geoTzOffset) {
                  return {
                    tz: geoTz.name,
                    src: tz.src + " & Lat/Lon",
                  }
                }
              }
            }
          }
          return tz
        },

        // See https://github.com/photostructure/exiftool-vendored.js/issues/113

        // Videos are frequently encoded in UTC, but don't include the timezone offset in their datetime stamps.

        // This must be before the tz_lookup/geoTz strategy, as smartphone videos
        // will contain GPS, but still encode timestamps in UTC without an
        // explicit offset. HURRAY
        () =>
          this._tags?.MIMEType?.startsWith("video/") &&
          this.options.defaultVideosToUTC === true
            ? // If there is a TimeZone tag, defer to that before defaulting to UTC:
              extractTzOffsetFromTags(this._tags) ?? {
                tz: "UTC",
                src: "defaultVideosToUTC",
              }
            : // not applicable:
              undefined,

        // If lat/lon is valid, use the tzlookup library, as it will be a proper
        // Zone name (like "America/New_York"), rather than just an hour offset.
        () =>
          map(this.#geoTz(), (ea) => ({ tz: ea.name, src: "from Lat/Lon" })),

        // This is a last-ditch estimation heuristic:
        () => extractTzOffsetFromUTCOffset(this._tags),
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

        const tz = isUtcTagName(tagName) ? "UTC" : this.tz
        if (
          tagName === "When" ||
          tagName.includes("DateTime") ||
          tagName.includes("SubSec") ||
          tagName.toLowerCase().includes("timestamp")
        ) {
          const d =
            ExifDateTime.fromExifStrict(value, tz) ??
            ExifDateTime.fromISO(value, tz)
          if (d != null) return d
        }
        if (tagName === "When" || tagName.includes("Date")) {
          const d =
            // Some tags, like CreationDate, actually include time resolution.
            ExifDateTime.fromExifStrict(value, tz) ??
            ExifDateTime.fromISO(value, tz) ??
            ExifDateTime.fromExifLoose(value, tz) ??
            ExifDate.fromExifStrict(value) ??
            ExifDate.fromISO(value) ??
            ExifDate.fromExifLoose(value)

          if (d != null) {
            return d
          }
        }
        if (tagName.includes("Time")) {
          const t = ExifTime.fromEXIF(value)
          if (t != null) return t
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
