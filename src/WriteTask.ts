import * as _path from "path"

import { Tags, WriteTags } from "./ExifTool"
import { ExifToolTask } from "./ExifToolTask"

const successRE = /1 image files? updated/

// See https://sno.phy.queensu.ca/%7Ephil/exiftool/faq.html#Q10
// (`-charset utf8` is set by default)
const utfCharsetArgs = ["-charset", "filename=utf8", "-codedcharacterset=utf8"]

export class WriteTask extends ExifToolTask<void> {
  private constructor(readonly sourceFile: string, readonly args: string[]) {
    super(args)
  }

  static for(
    filename: string,
    tags: WriteTags,
    optionalArgs: string[] = []
  ): WriteTask {
    const sourceFile = _path.resolve(filename)

    const args: string[] = []

    Object.keys(tags)
      .filter(k => typeof k === "string" && tags.propertyIsEnumerable(k))
      .forEach((key: keyof Tags) => {
        const value = tags[key]
        if (Array.isArray(value)) {
          value.forEach(ea => args.push(`-${key}=${ea}`))
        } else {
          args.push(`-${key}=${value}`)
        }
      })

    optionalArgs.forEach(ea => args.push(ea))
    utfCharsetArgs.forEach(ea => args.push(ea))
    args.push(sourceFile)
    return new WriteTask(sourceFile, args)
  }

  toString(): string {
    return "WriteTask(" + this.sourceFile + ")"
  }

  protected parse(data: string): void {
    data = data.trim()
    if (successRE.exec(data) != null) {
      return
    } else {
      throw new Error(data)
    }
  }
}
