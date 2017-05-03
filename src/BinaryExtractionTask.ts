import { ExifToolTask } from "./ExifToolTask"
import * as _path from "path"

export class BinaryExtractionTask extends ExifToolTask<void> {
  private constructor(args: string[]) {
    super(args)
  }

  static for(
    tagname: string,
    imgSrc: string,
    imgDest: string
  ): BinaryExtractionTask {
    const args = [
      "-b",
      "-" + tagname,
      _path.resolve(imgSrc),
      "-w",
      "%0f" + _path.resolve(imgDest)
    ]
    return new BinaryExtractionTask(args)
  }

  parse(data: string): void {
    if (data.trim() !== "1 output files created") {
      throw new Error(data.trim().split("\n")[0] || "Missing expected status message")
    }
  }
}
