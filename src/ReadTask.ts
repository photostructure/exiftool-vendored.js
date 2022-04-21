import { logger } from "batch-cluster"
import * as _path from "path"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolTask } from "./ExifToolTask"
import { firstDefinedThunk, map, Maybe } from "./Maybe"
import { toF } from "./Number"
import { blank, isString, toS } from "./String"
import { Tags } from "./Tags"
import {
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset,
} from "./Timezones"
const tzlookup = require("tz-lookup")

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

const nullishes = ["undef", "null", "undefined"]

export function nullish(s: string | undefined): s is undefined {
  return s == null || (isString(s) && nullishes.includes(s.trim()))
}

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
    override readonly args: string[]
  ) {
    super(args)
    this.degroup = this.args.indexOf("-G") !== -1
    this.tags = { SourceFile: sourceFile } as Tags
    this.tags.errors = this.errors
  }

  static for(
    filename: string,
    numericTags: string[],
    optionalArgs: string[] = []
  ): ReadTask {
    const sourceFile = _path.resolve(filename)
    const args = [
      "-json",
      "-struct", // Return struct tags https://exiftool.org/struct.html
      ...optionalArgs,
    ]
    // IMPORTANT: "-all" must be after numeric tag references (first reference
    // in wins)
    args.push(...numericTags.map((ea) => "-" + ea + "#"))
    // TODO: Do you need -xmp:all, -all, or -all:all?
    args.push("-all", "-charset", "filename=utf8", sourceFile)

    // console.log("new ReadTask()", { sourceFile, args })
    return new ReadTask(sourceFile, args)
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

  #extractLatLon() {
    this.lat ??= this.#latlon("GPSLatitude", "S", 90)
    this.lon ??= this.#latlon("GPSLongitude", "W", 180)
    if (this.invalidLatLon) {
      this.lat = this.lon = undefined
    }
  }

  #latlon(
    tagName: "GPSLatitude" | "GPSLongitude",
    negateRef: "S" | "W",
    maxValid: 90 | 180
  ): number | undefined {
    const tagValue = this._tags[tagName]
    const ref = this._tags[tagName + "Ref"]
    const result = toF(tagValue)
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

  #extractTzOffset() {
    // tzlookup will be the "best" tz, as it will be a proper Zone name (like
    // "America/New_York"), rather than just an hour offset.
    map(
      firstDefinedThunk([
        () => {
          if (!this.invalidLatLon && this.lat != null && this.lon != null) {
            try {
              return map(tzlookup(this.lat, this.lon), (tz) => ({
                tz,
                src: "from Lat/Lon",
              }))
            } catch (err) {
              /* */
            }
          }
          return
        },
        () => extractTzOffsetFromTags(this._tags),
        () => extractTzOffsetFromUTCOffset(this._tags),
      ]),
      (ea) => ({ tz: this.tz, src: this.tzSource } = ea)
    )
  }

  #normalizeDateTime(tagName: string, value: Maybe<ExifDateTime | ExifDate>) {
    if (
      tagName.startsWith("File") ||
      !(value instanceof ExifDateTime) ||
      utcTagName(tagName) ||
      this.tz == null
    ) {
      return value
    }
    // ExifTool may have put this in the current system time, instead of the timezone of the file.
    return value.zone !== this.tz ? value.setZone(this.tz) : value
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
        const tz = utcTagName(tagName) ? "UTC" : undefined
        if (
          tagName === "When" ||
          tagName.includes("DateTime") ||
          tagName.toLowerCase().includes("timestamp")
        ) {
          const d =
            ExifDateTime.fromExifStrict(value, tz) ??
            ExifDateTime.fromISO(value, tz)
          if (d != null) return this.#normalizeDateTime(tagName, d)
        }
        if (tagName === "When" || tagName.includes("Date")) {
          const d =
            ExifDateTime.fromExifStrict(value, tz) ??
            ExifDateTime.fromISO(value, tz) ??
            ExifDateTime.fromExifLoose(value, tz) ??
            ExifDate.fromExifStrict(value) ??
            ExifDate.fromISO(value) ??
            ExifDate.fromExifLoose(value)

          if (d != null) {
            return this.#normalizeDateTime(tagName, d)
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

function utcTagName(tagName: string): boolean {
  return tagName.includes("UTC") || tagName.startsWith("GPS")
}
