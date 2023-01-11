import { logger } from "batch-cluster"
import * as _path from "path"
import { ExifToolTask } from "./ExifToolTask"
import { Tags } from "./Tags"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"

export class ReadRawTask extends ExifToolTask<Tags> {
  static for(filename: string, exiftoolArgs: string[] = []): ReadRawTask {
    const args: string[] = [...Utf8FilenameCharsetArgs, ...exiftoolArgs]
    if (!args.includes("-json")) args.push("-json")
    const sourceFile = _path.resolve(filename)
    args.push(sourceFile)
    return new ReadRawTask(sourceFile, args)
  }

  private constructor(
    readonly sourceFile: string,
    override readonly args: string[]
  ) {
    super(args)
  }

  override toString(): string {
    return "ReadRawTask" + this.sourceFile + ")"
  }

  protected parse(data: string, err?: Error): Tags {
    try {
      return JSON.parse(data)[0]
    } catch (jsonError) {
      logger().error("ExifTool.ReadRawTask(): Invalid JSON", { data })
      throw err ?? jsonError
    }
  }
}
