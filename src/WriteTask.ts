import { Tags, WriteTags } from "./ExifTool"
import { ExifToolTask } from "./ExifToolTask"
import * as _path from "path"

const successRE = /1 image files? updated/
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
    let args = Object.keys(tags)
      .filter(k => typeof k === "string" && tags.propertyIsEnumerable(k))
      .map((key: keyof Tags) => `-${key}=${tags[key]}`)
    optionalArgs.forEach(ea => args.push(ea))
    args = args.concat(["-charset", "filename=utf8", "-codedcharacterset=utf8"])
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
