import { ExifToolTask } from "./ExifToolTask"
import { Tags } from "./Tags"
import * as _path from "path"

const successRE = /1 image files? updated/
export class WriteTask extends ExifToolTask<void> {
  private constructor(readonly sourceFile: string, readonly args: string[]) {
    super(args)
  }

  static for(
    filename: string,
    tags: Tags,
    optionalArgs: string[] = []
  ): WriteTask {
    const sourceFile = _path.resolve(filename)
    const t = tags as any
    const args = Object.keys(t)
      .filter(k => typeof k === "string" && tags.propertyIsEnumerable(k))
      .map(key => `-${key}=${t[key]}`)
    optionalArgs.forEach(ea => args.push(ea))
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
