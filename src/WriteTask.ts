import * as _path from "path"

import { Tags, WriteTags } from "./ExifTool"
import { ExifToolTask } from "./ExifToolTask"
import { htmlEncode } from "./String"
import { isString } from "util"

const successRE = /1 image files? updated/

// See https://sno.phy.queensu.ca/%7Ephil/exiftool/faq.html#Q10
// (`-charset utf8` is set by default)
const utfCharsetArgs = [
  "-charset",
  "filename=utf8",
  "-codedcharacterset=utf8",
  "-E"
]

function enc(value: any): string {
  return typeof value == "number" ? value.toString() : htmlEncode(String(value))
}

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

    const args: string[] = [...utfCharsetArgs]

    Object.keys(tags)
      .filter(k => typeof k === "string" && tags.propertyIsEnumerable(k))
      .forEach((key: keyof Tags) => {
        const value = tags[key]
        if (Array.isArray(value)) {
          if ((value as any[]).every(entry => isString(entry))) {
            // Its a simple array type
            ;(value as any[]).forEach(ea => args.push(`-${key}=${enc(ea)}`))
          }

          if ((value as any[]).every(entry => typeof entry === "object")) {
            // Its a struct type

            // Ultimately this would have to be a recursive function as in theory structs can be
            // nested in one another, and even inlucde arrays etc. However in this basic implementation
            // just support simple strings as values
            const structs = (value as { [key: string]: string }[])
              .map(struct => {
                const structKeyValuePairs = Object.keys(struct).map(
                  structKey => {
                    const structValue: string = struct[structKey]
                    return `${structKey}=${enc(structValue)}`
                  }
                )

                return `{${structKeyValuePairs}}`
              })
              .join(", ")

            // EG. ArtworkOrObject: [{ AOCreator=badger, AOTitle=a title }, { AOTitle=another one }]
            args.push(`-${key}=[${structs}]`)
          }
        } else {
          // Its a string type
          args.push(`-${key}=${enc(value)}`)
        }
      })

    optionalArgs.forEach(ea => args.push(ea))
    args.push(sourceFile)
    return new WriteTask(sourceFile, args)
  }

  toString(): string {
    return "WriteTask(" + this.sourceFile + ")"
  }

  protected parse(data: string, err: Error): void {
    if (err) throw err
    if (this.errors.length > 0) throw new Error(this.errors.join(";"))
    data = data.trim()
    if (successRE.exec(data) != null) {
      return
    } else {
      throw new Error("No success message: " + data)
    }
  }
}
