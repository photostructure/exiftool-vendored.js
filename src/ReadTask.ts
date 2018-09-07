import { logger } from "batch-cluster"
import * as _path from "path"

import * as _dt from "./DateTime"
import { ExifToolTask } from "./ExifToolTask"
import { Tags } from "./Tags"

export class ReadTask extends ExifToolTask<Tags> {
  private rawTags: any
  private readonly tags: Tags
  private tzoffsetMinutes: number | undefined

  private constructor(readonly sourceFile: string, args: string[]) {
    super(args)
    this.tags = { SourceFile: sourceFile } as Tags
    this.tags.errors = this.errors
  }

  static for(filename: string, optionalArgs: string[] = []): ReadTask {
    const sourceFile = _path.resolve(filename)
    const args = [
      "-json",
      "-coordFormat",
      "%.8f", // Just a float, please, not the default of "22 deg 20' 7.58\" N"
      "-charset",
      "filename=utf8",
      ...optionalArgs,
      sourceFile
    ]
    return new ReadTask(sourceFile, args)
  }

  toString(): string {
    return "ReadTask" + this.sourceFile + ")"
  }

  protected parse(data: string): Tags {
    try {
      this.rawTags = JSON.parse(data)[0]
    } catch (err) {
      logger().error("ExifTool.ReadTask(): Invalid JSON", { data })
      throw err
    }
    // ExifTool does humorous things to paths, like flip slashes. resolve() undoes that.
    const SourceFile = _path.resolve(this.rawTags.SourceFile)
    // Sanity check that the result is for the file we want:
    if (SourceFile !== this.sourceFile) {
      // Throw an error rather than add an errors string because this is *really* bad:
      throw new Error(
        `Internal error: unexpected SourceFile of ${
          this.rawTags.SourceFile
        } for file ${this.sourceFile}`
      )
    }
    return this.parseTags()
  }

  private extractTzoffset(): void {
    // TimeZone wins if we've got it:
    const tze = new _dt.ExifTimeZoneOffset("TimeZone", this.rawTags.TimeZone)
    if (tze.tzOffsetMinutes !== undefined) {
      this.tzoffsetMinutes = tze.tzOffsetMinutes
    } else if (
      this.rawTags.GPSDateTime != null &&
      this.rawTags.DateTimeOriginal != null
    ) {
      const gps = _dt.parse(
        "GPSDateTime",
        this.rawTags.GPSDateTime,
        0
      ) as _dt.ExifDateTime
      const local = _dt.parse(
        "DateTimeOriginal",
        this.rawTags.DateTimeOriginal,
        0
      ) as _dt.ExifDateTime
      if (gps && local && gps.toDate && local.toDate) {
        // timezone offsets are never less than 30 minutes.
        const gpsToHalfHour = gps.toDate().getTime() / (30 * 60 * 1000)
        const localToHalfHour = local.toDate().getTime() / (30 * 60 * 1000)
        const tzoffsetMinutes = 30 * Math.round(localToHalfHour - gpsToHalfHour)
        if (reasonableTzOffsetMinutes(tzoffsetMinutes)) {
          this.tzoffsetMinutes = tzoffsetMinutes
        }
      }
    }
    logger().debug(
      "ReadTask(" +
        this.sourceFile +
        ").tzoffsetMinutes = " +
        this.tzoffsetMinutes
    )
  }

  private parseTags(): Tags {
    this.extractTzoffset()
    Object.keys(this.rawTags).forEach(key => {
      ;(this.tags as any)[key] = this.parseTag(key, this.rawTags[key])
    })
    return this.tags as Tags
  }

  private parseTag(tagName: string, value: any): any {
    try {
      if (
        tagName.endsWith("ExifToolVersion") ||
        tagName.endsWith("DateStampMode") ||
        tagName.endsWith("Sharpness") ||
        tagName.endsWith("Firmware") ||
        tagName.endsWith("DateDisplayFormat")
      ) {
        return value.toString() // force to string
      } else if (tagName.endsWith("BitsPerSample")) {
        return value
          .toString()
          .split(" ")
          .map((i: string) => parseInt(i, 10))
      } else if (tagName.endsWith("FlashFired")) {
        // TODO: are there other boolean tags we need to fix? As of 20180907, I
        // couldn't find any others in the latest Tags.ts, but there may be more later.
        const s = value.toString().toLowerCase()
        return s === "yes" || s === "1" || s === "true"
      } else if (
        (typeof value === "string" && tagName.includes("Date")) ||
        tagName.includes("Time")
      ) {
        return _dt.parse(tagName, value, this.tzoffsetMinutes)
      } else if (
        tagName.endsWith("GPSLatitude") ||
        tagName.endsWith("GPSLongitude")
      ) {
        const ref =
          this.rawTags[tagName + "Ref"] || value.toString().split(" ")[1]
        if (ref === undefined) {
          return value // give up
        } else {
          const direction = ref.trim().toLowerCase()
          const sorw = direction.startsWith("w") || direction.startsWith("s")
          return parseFloat(value) * (sorw ? -1 : 1)
        }
      } else {
        // Trust that ExifTool rendered the value with the correct type in JSON:
        return value
      }
    } catch (e) {
      this.addError(
        `Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`
      )
      return value
    }
  }
}

function reasonableTzOffsetMinutes(tzOffsetMinutes: number): boolean {
  // Pacific/Kiritimati is +14:00 TIL
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  return Math.abs(tzOffsetMinutes) <= 14 * 60
}
