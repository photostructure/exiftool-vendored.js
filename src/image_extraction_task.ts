import { Task } from "./task"
import * as _path from "path"

export type ImageTag = "ThumbnailImage" | "PreviewImage" | "JpgFromRaw"

export class ImageExtractionTask extends Task<void> {
  private constructor(args: string[]) {
    super(args)
  }

  static for(
    tagname: ImageTag,
    imgSrc: string,
    imgDest: string
  ): ImageExtractionTask {
    const args = [
      "-b",
      "-" + tagname,
      _path.resolve(imgSrc),
      "-w",
      "%0f" + _path.resolve(imgDest)
    ]
    return new ImageExtractionTask(args)
  }

  parse(data: string): void {
    if (data.trim() !== "1 output files created") {
      throw new Error(data.trim().split("\n")[0] || "Missing expected status message")
    }
  }
}
