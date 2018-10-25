import { logger } from "batch-cluster"
import { Info } from "luxon"
import * as _path from "path"

import { parseExifDate, parseExifDateTime, parseExifTime } from "./DateTime"
import { ExifToolTask } from "./ExifToolTask"
import { toF } from "./Number"
import { blank, toS } from "./String"
import { Tags } from "./Tags"
import { offsetMinutesToZoneName, reasonableTzOffsetMinutes } from "./Timezones"

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
  // May have keys that are group-prefixed:
  private _raw: any = {}
  // Always has non-group-prefixed keys:
  private _tags: any = {}
  private readonly tags: Tags
  private lat?: number
  private lon?: number
  private invalidLatLon = false
  private tz?: string
  private modifyDateTz?: string

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
      "-coordFormat",
      "%.8f" // Just a float, please, not the default of "22 deg 20' 7.58\" N"
    ]
    args.push(...numericTags.map(ea => "-" + ea + "#"))
    args.push("-all", "-charset", "filename=utf8", ...optionalArgs, sourceFile)
    return new ReadTask(sourceFile, args)
  }

  toString(): string {
    return "ReadTask" + this.sourceFile + ")"
  }

  protected parse(data: string): Tags {
    try {
      this._raw = JSON.parse(data)[0]
    } catch (err) {
      logger().error("ExifTool.ReadTask(): Invalid JSON", { data })
      throw err
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

  private extractLatLon(): void {
    if (this.invalidLatLon) return
    if (this.lat == null) {
      this.lat = toF(this._tags.GPSLatitude)
      if (
        this.lat != null &&
        toS(this._tags.GPSLatitudeRef)
          .toLowerCase()
          .startsWith("s")
      ) {
        this.lat = this.lat! * -1
      }
      if (this.lat != null && Math.abs(this.lat) > 90) {
        this.errors.push(`Invalid GPSLatitude, "${this._tags.GPSLatitude}"`)
        this.invalidLatLon = true
      }
    }

    if (this.lon == null) {
      this.lon = toF(this._tags.GPSLongitude)
      if (
        this.lon != null &&
        toS(this._tags.GPSLongitudeRef)
          .toLowerCase()
          .startsWith("w")
      ) {
        this.lon = this.lon! * -1
      }
      if (this.lon != null && Math.abs(this.lon) > 180) {
        this.errors.push(`Invalid GPSLongitude, "${this._tags.GPSLongitude}"`)
        this.invalidLatLon = true
      }
    }
  }

  private extractTzOffset() {
    {
      const tzo = this._tags.TimeZoneOffset
      ;[this.tz, this.modifyDateTz] = (Array.isArray(tzo)
        ? tzo
        : toS(tzo).split(" ")
      )
        .map(toF)
        .filter(ea => ea != null)
        .map(ea => Math.round(ea! * 60))
        .filter(reasonableTzOffsetMinutes)
        .map(offsetMinutesToZoneName)
      if (this.tz != null) return
    }
    {
      const tz = toS(this._tags.TimeZone)
      if (!blank(tz) && Info.isValidIANAZone(tz)) {
        this.tz = tz
        return
      }
    }
    this.extractLatLon()
    if (!this.invalidLatLon && this.lat != null && this.lon != null) {
      try {
        this.tz = tzlookup(this.lat, this.lon)
        return
      } catch (err) {}
    }
    if (this._tags.GPSDateTime != null && this._tags.DateTimeOriginal != null) {
      const gps = parseExifDateTime(this._tags.GPSDateTime, "utc")
      const local = parseExifDateTime(this._tags.DateTimeOriginal, "utc")
      if (gps && local && gps.toDate && local.toDate) {
        // timezone offsets always on the hour or half hour:
        const gpsToHalfHour = gps.toDate().getTime() / (30 * 60 * 1000)
        const localToHalfHour = local.toDate().getTime() / (30 * 60 * 1000)
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
        const tz = tagName.endsWith("ModifyDate")
          ? this.modifyDateTz || this.tz
          : this.tz
        const dt = parseExifDateTime(value, tz) || parseExifDate(value)
        if (dt != null) {
          // console.log("parseTag", { tagName, value, dt, tz })
          return dt
        }
      }
      if (typeof value === "string" && tagName.includes("Time")) {
        const t = parseExifTime(value)
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
