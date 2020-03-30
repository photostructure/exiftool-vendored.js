import * as _path from "path"

import { ExifToolTask } from "./ExifToolTask"
import { notBlank } from "./String"

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
      // The %0f prevents shell escaping. See
      // https://exiftool.org/exiftool_pod.html#w-EXT-or-FMT--textOut
      "%0f" + _path.resolve(imgDest),
    ]
    return new BinaryExtractionTask(args)
  }

  parse(stdout: string, err?: Error): void {
    if (err != null && err.message.match(/^warning: /i) == null) throw err
    if (null == /1 output files? created/.exec(stdout)) {
      throw new Error(
        notBlank(stdout) ? stdout : "Missing expected status message"
      )
    }
  }
}
