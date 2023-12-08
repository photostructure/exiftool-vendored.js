import { encode } from "he"
import * as _path from "node:path"
import { isDateOrTime, toExifString } from "./DateTime"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { isIgnorableWarning } from "./IgnorableError"
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

export const DefaultWriteTaskOptions = {
  ...pick(DefaultExifToolOptions, "useMWG"),
} as const

export type WriteTaskOptions = typeof DefaultWriteTaskOptions

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
   *
   * @see {@link isIgnorableWarning}
   */
  warnings?: string[]
}

export class WriteTask extends ExifToolTask<WriteTaskResult> {
  private constructor(
    readonly sourceFile: string,
    override readonly args: string[]
  ) {
    super(args)
    // we're not going to ignore any stderr output, so we can shove it into
    // the warnings array in WriteTaskResult:
    this.isIgnorableError = () => false
  }

  static for(
    filename: string,
    tags: WriteTags,
    extraArgs: string[] = [],
    options?: Partial<WriteTaskOptions>
  ): WriteTask {
    const sourceFile = _path.resolve(filename)

    const args: string[] = [
      ...Utf8FilenameCharsetArgs,
      `-sep`,
      `${sep}`,
      "-E", // < html encoding https://exiftool.org/faq.html#Q10
    ]

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

    args.push(...extraArgs)
    args.push(sourceFile)
    return new WriteTask(sourceFile, args)
  }

  override toString(): string {
    return "WriteTask(" + this.sourceFile + ")"
  }

  protected parse(data: string): WriteTaskResult {
    let created = 0
    let updated = 0
    let unchanged = 0
    const errors: string[] = []
    const warnings: string[] = []

    for (const ea of splitLines(...this.errors)) {
      if (WarningRE.test(ea) || isIgnorableWarning(ea)) {
        warnings.push(ea)
      } else {
        errors.push(ea.replace(/^error: /i, ""))
      }
    }

    if (errors.length > 0) throw new Error(errors.join(";"))

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
      warnings.push("Unexpected output from ExifTool: " + line)
    }

    return {
      created,
      updated,
      unchanged,
      ...(warnings.length === 0 ? {} : { warnings }),
    }
  }
}

// stderr lines that match this are warnings, not errors:
const WarningRE =
  /^error: nothing to write|^nothing to do|^warning: icc_profile deleted/i

const CreatedRE = /(\d+) .*?\bcreated\b/i

const UnchangedRE = /(\d+) .*?(?:\bweren't updated|unchanged\b)/i

const UpdatedRE = /(\d+) .*?\bupdated\b/i
