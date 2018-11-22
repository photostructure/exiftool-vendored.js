import { logger } from "batch-cluster"
import * as _path from "path"

import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifToolTask } from "./ExifToolTask"
import { first } from "./Maybe"
import { toF } from "./Number"
import { toS } from "./String"
import { Tags } from "./Tags"
import {
  extractTzOffsetFromTags,
  offsetMinutesToZoneName,
  reasonableTzOffsetMinutes,
  MaxTzOffsetHours
} from "./Timezones"
import { MinuteMs, HourMs, diffMs } from "./DateTime"

const tzlookup = require("tz-lookup")

/**
 * tag names we don't need to muck with:
 */
const PassthroughTags = [
  "ExifToolVersion",
  "DateStampMode",
  "Sharpness",
  "Firmware",
  "DateDisplayFormat"
]

export class ReadTask extends ExifToolTask<Tags> {
  private readonly degroup: boolean
  /** May have keys that are group-prefixed */
  private _raw: any = {}
  /** Always has non-group-prefixed keys */
  private _tags: any = {}
  private readonly tags: Tags
  private lat?: number
  private lon?: number
  private invalidLatLon = false
  private tz?: string

  private constructor(readonly sourceFile: string, readonly args: string[]) {
    super(args)
    this.degroup = this.args.indexOf("-G") != -1
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
      ...optionalArgs,
      "-coordFormat",
      "%.8f" // Just a float, please, not the default of "22 deg 20' 7.58\" N"
    ]
    // IMPORTANT: "-all" must be after numeric tag references (first reference
    // in wins)
    args.push(...numericTags.map(ea => "-" + ea + "#"))
    args.push("-all", "-charset", "filename=utf8", sourceFile)
    return new ReadTask(sourceFile, args)
  }

  toString(): string {
    return "ReadTask" + this.sourceFile + ")"
  }

  protected parse(data: string, err?: Error): Tags {
    try {
      this._raw = JSON.parse(data)[0]
    } catch (jsonError) {
      logger().error("ExifTool.ReadTask(): Invalid JSON", { data })
      throw err || jsonError
    }
    // ExifTool does humorous things to paths, like flip slashes. resolve() undoes that.
    const SourceFile = _path.resolve(this._raw.SourceFile)
    // Sanity check that the result is for the file we want:
    if (SourceFile !== this.sourceFile) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(
        `Internal error: unexpected SourceFile of ${
          this._raw.SourceFile
        } for file ${this.sourceFile}`
      )
    }
    if (this.degroup) {
      Object.keys(this._raw).forEach(keyWithGroup => {
        this._tags[this.tagName(keyWithGroup)] = this._raw[keyWithGroup]
      })
    } else {
      this._tags = this._raw
    }

    return this.parseTags()
  }

  private tagName(k: string): string {
    return this.degroup ? k.split(":")[1] || k : k
  }

  private parseTags(): Tags {
    this.extractTzOffset()
    Object.keys(this._raw).forEach(key => {
      ;(this.tags as any)[key] = this.parseTag(key, this._raw[key])
    })
    if (this.errors.length > 0) this.tags.errors = this.errors
    return this.tags as Tags
  }

  private latlon(
    tagName: "GPSLatitude" | "GPSLongitude",
    negateRef: "S" | "W",
    maxValid: 90 | 180
  ): number | undefined {
    const tagValue = this._tags[tagName]
    const r = toF(tagValue)
    if (r == null) return
    if (Math.abs(r) > maxValid) {
      this.errors.push(`Invalid ${tagName}, ${JSON.stringify(tagValue)}`)
      this.invalidLatLon = true
      return
    }
    const ref = toS(this._tags[tagName + "Ref"]).toUpperCase()
    if (ref.startsWith(negateRef)) {
      return Math.abs(r) * -1
    } else {
      return r
    }
  }

  private extractLatLon(): void {
    if (!this.invalidLatLon && this.lat == null) {
      this.lat = this.latlon("GPSLatitude", "S", 90)
    }
    if (!this.invalidLatLon && this.lon == null) {
      this.lon = this.latlon("GPSLongitude", "W", 180)
    }
  }

  private extractTzOffset() {
    {
      this.tz = extractTzOffsetFromTags(this._tags)
      if (this.tz != null) {
        return
      }
    }
    {
      this.extractLatLon()
      if (!this.invalidLatLon && this.lat != null && this.lon != null) {
        try {
          this.tz = tzlookup(this.lat, this.lon)
          if (this.tz != null) {
            return
          }
        } catch (err) {}
      }
    }
    if (this._tags.GPSDateTime != null && this._tags.DateTimeOriginal != null) {
      const gps = ExifDateTime.fromEXIF(this._tags.GPSDateTime, "utc")
      const local = first(
        [
          this._tags.DateTimeOriginal,
          this._tags.CreateDate,
          this._tags.MediaCreateDate
        ],
        text => ExifDateTime.fromEXIF(text, "utc")
      )
      if (
        gps &&
        gps.toDate &&
        local &&
        local.toDate &&
        Math.abs(diffMs(local.toDate(), gps.toDate())) <=
          MaxTzOffsetHours * HourMs
      ) {
        // timezone offsets always on the hour or half hour:
        const gpsToHalfHour = gps.toDate().getTime() / (30 * MinuteMs)
        const localToHalfHour = local.toDate().getTime() / (30 * MinuteMs)
        const tzoffsetMinutes = 30 * Math.round(localToHalfHour - gpsToHalfHour)
        if (reasonableTzOffsetMinutes(tzoffsetMinutes)) {
          this.tz = offsetMinutesToZoneName(tzoffsetMinutes)
        }
      }
    }
  }

  private parseTag(tagNameWithGroup: string, value: any): any {
    if (value == null || value == "undef" || value == "null") return undefined

    const tagName = this.tagName(tagNameWithGroup)
    try {
      if (PassthroughTags.indexOf(tagName) >= 0) {
        return value
      }
      if (tagName == "GPSLatitude") {
        return this.lat
      }
      if (tagName == "GPSLongitude") {
        return this.lon
      }
      if (typeof value === "string" && tagName.includes("Date")) {
        const dt =
          ExifDateTime.fromEXIF(value, this.tz) || ExifDate.fromEXIF(value)
        if (dt != null) {
          return dt
        }
      }
      if (typeof value === "string" && tagName.includes("Time")) {
        const t = ExifTime.fromEXIF(value)
        if (t != null) return t
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
