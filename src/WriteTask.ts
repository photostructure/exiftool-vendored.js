import { encode } from "he"
import * as _path from "path"
import { shallowArrayEql } from "./Array"
import { isDateOrTime, toExifString } from "./DateTime"
import { DefaultExifToolOptions } from "./DefaultExifToolOptions"
import { DeleteAllTagsArgs } from "./DeleteAllTagsArgs"
import { ExifToolTask } from "./ExifToolTask"
import { isFileEmpty } from "./File"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { Maybe } from "./Maybe"
import { isNumber } from "./Number"
import { keys } from "./Object"
import { pick } from "./Pick"
import { isString } from "./String"
import { isStruct } from "./Struct"
import { VersionTask } from "./VersionTask"
import { WriteTags } from "./WriteTags"

const successRE = /1 image files? (?:created|updated)/i
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

export class WriteTask extends ExifToolTask<void> {
  private constructor(
    readonly sourceFile: string,
    override readonly args: string[]
  ) {
    super(args)
  }

  static async for(
    filename: string,
    tags: WriteTags,
    extraArgs: string[] = [],
    options?: Partial<WriteTaskOptions>
  ): Promise<WriteTask | ExifToolTask<void>> {
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

    // ExifTool complains "Nothing to write" if the task will only remove values
    // and the file is missing.

    if (
      (extraArgs.length === 0 ||
        shallowArrayEql(extraArgs, DeleteAllTagsArgs)) &&
      Object.values(tags).every((ea) => ea == null) &&
      (await isFileEmpty(filename))
    ) {
      // no-op!
      return new VersionTask() as any
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
    // console.log("new WriteTask()", { sourceFile, args, tags })
    return new WriteTask(sourceFile, args)
  }

  override toString(): string {
    return "WriteTask(" + this.sourceFile + ")"
  }

  protected parse(data: string, error: Error): void {
    // console.log(this.toString() + ".parse()", { data, error })
    if (error != null) throw error
    if (this.errors.length > 0) throw new Error(this.errors.join(";"))
    data = data.trim()
    if (successRE.exec(data) != null) {
      return
    } else {
      throw new Error("No success message: " + data)
    }
  }
}
