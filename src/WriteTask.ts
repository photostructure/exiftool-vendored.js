import { encode } from "he"
import * as _path from "node:path"
import { isDateOrTime, toExifString } from "./DateTime"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { errorsAndWarnings } from "./ErrorsAndWarnings"
import { ExifToolOptions } from "./ExifToolOptions"
import { ExifToolTask, ExifToolTaskOptions } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { Maybe } from "./Maybe"
import { isNumber, toInt } from "./Number"
import { keys } from "./Object"
import { pick } from "./Pick"
import { isString, splitLines } from "./String"
import { isStruct } from "./Struct"
import { WriteTags } from "./WriteTags"

const sep = String.fromCharCode(31) // < unit separator

// this is private because it's very special-purpose for just encoding ExifTool
// WriteTask args:
export function htmlEncode(s: string): string {
  return (
    // allowUnsafeSymbols is true because ExifTool doesn't care about &, <, >, ", ', * and `
    encode(s, { decimal: true, allowUnsafeSymbols: true })
      // `he` doesn't encode whitespaces (like newlines), but we need that:
      .replace(/\s/g, (m) => (m === " " ? " " : `&#${m.charCodeAt(0)};`))
  )
}

function enc(o: any, structValue = false): Maybe<string> {
  if (o == null) {
    return ""
  } else if (isNumber(o)) {
    return String(o)
  } else if (isString(o)) {
    // Structs need their own escaping here.
    // See https://exiftool.org/struct.html#Serialize
    return htmlEncode(
      structValue ? o.replace(/[,[\]{}|]/g, (ea) => "|" + ea) : o
    )
    // const s = htmlEncode(String(o))
  } else if (isDateOrTime(o)) {
    return toExifString(o)
  } else if (Array.isArray(o)) {
    const primitiveArray = o.every((ea) => isString(ea) || isNumber(ea))
    return primitiveArray
      ? `${o.map((ea) => enc(ea)).join(sep)}`
      : `[${o.map((ea) => enc(ea)).join(",")}]`
  } else if (isStruct(o)) {
    // See https://exiftool.org/struct.html#Serialize
    return `{${keys(o)
      .map((k) => enc(k, true) + "=" + enc(o[k], true))
      .join(",")}}`
  } else {
    throw new Error("cannot encode " + JSON.stringify(o))
  }
}

export const WriteTaskOptionFields = [
  "useMWG",
  "struct",
  "ignoreMinorErrors",
  "writeArgs",
] as const satisfies (keyof ExifToolOptions)[]

export const DefaultWriteTaskOptions = {
  ...pick(DefaultExifToolOptions, ...WriteTaskOptionFields),
} as const satisfies Partial<ExifToolOptions>

export type WriteTaskOptions = Partial<typeof DefaultWriteTaskOptions>

export interface WriteTaskResult {
  /**
   * Number of files created by ExifTool
   */
  created: number
  /**
   * Number of files updated by ExifTool. Note that this does not mean any
   * field values were _changed_ from prior values.
   */
  updated: number
  /**
   * Number of files that ExifTool knew it did not need change. Note that
   * ExifTool (at least as of v12.70) only realizes it doesn't need to change
   * a file if you are clearing an already empty value.
   */
  unchanged: number
  /**
   * Non-exceptional warnings from ExifTool, like "Error: Nothing to write",
   * or "Nothing to do."
   *
   * Any invalid tag names or values will cause {@link Error}s to be thrown.
   */
  warnings?: string[]
}

export class WriteTask extends ExifToolTask<WriteTaskResult> {
  private constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    override readonly options: ExifToolTaskOptions
  ) {
    super(args, options)
  }

  static for(
    filename: string,
    tags: WriteTags,
    options: Partial<WriteTaskOptions> & Required<ExifToolTaskOptions>
  ): WriteTask {
    const sourceFile = _path.resolve(filename)

    const args: string[] = [
      ...Utf8FilenameCharsetArgs,
      `-sep`,
      `${sep}`,
      "-E", // < html encoding https://exiftool.org/faq.html#Q10
    ]

    // "undef" doesn't work: but undef works the same as 2
    args.push(
      "-api",
      "struct=" + (isNumber(options?.struct) ? options.struct : "2")
    )

    if (options?.useMWG ?? DefaultWriteTaskOptions.useMWG) {
      args.push("-use", "MWG")
    }

    // Special handling for GPSLatitude and GPSLongitude (due to differences
    // in EXIF, XMP, and MIE encodings). See
    // https://exiftool.org/forum/index.php?topic=14488.0 and
    // https://github.com/photostructure/exiftool-vendored.js/issues/131
    if (isNumber(tags.GPSLatitude)) {
      tags.GPSLatitudeRef ??= tags.GPSLatitude >= 0 ? "N" : "S"
    }
    if (isNumber(tags.GPSLongitude)) {
      tags.GPSLongitudeRef ??= tags.GPSLongitude >= 0 ? "E" : "W"
    }

    for (const key of keys(tags)) {
      const val = tags[key]
      args.push(`-${key}=${enc(val)}`)
    }

    if (options.writeArgs != null) args.push(...options.writeArgs)
    args.push(sourceFile)
    return new WriteTask(sourceFile, args, options)
  }

  override toString(): string {
    return "WriteTask(" + this.sourceFile + ")"
  }

  // we're handling the stderr output ourselves, so we tell ExifToolTask that all stderr output is not ignorable so we can capture the warnings
  protected parse(data: string, error?: Error): WriteTaskResult {
    if (error != null) throw error

    let created = 0
    let updated = 0
    let unchanged = 0

    for (const line of splitLines(data)) {
      const m_created = CreatedRE.exec(line)
      if (m_created != null) {
        created += toInt(m_created[1]) ?? 0
        continue
      }

      // careful! we need to apply UnchangedRE before UpdateRE, as both match
      // "updated"

      const m_unchanged = UnchangedRE.exec(line)
      if (m_unchanged != null) {
        unchanged += toInt(m_unchanged[1]) ?? 0
        continue
      }

      const m_updated = UpdatedRE.exec(line)
      if (m_updated != null) {
        updated += toInt(m_updated[1]) ?? 0
        continue
      }

      // if we get here, we didn't match any of the expected patterns.
      this.warnings.push("Unexpected output from ExifTool: " + line)
    }

    const w = errorsAndWarnings(this).warnings ?? []

    return {
      created,
      updated,
      unchanged,
      ...(w.length === 0 ? {} : { warnings: w }),
    }
  }
}

// "0 files created" | "0 file created"
// "1 image files created"
const CreatedRE = /(\d{1,5})\D{1,6}\bcreated\b/i

const UnchangedRE = /(\d{1,5})\D{1,6}\b(?:weren't updated|unchanged)\b/i

const UpdatedRE = /(\d{1,5})\D{1,6}\bupdated\b/i
