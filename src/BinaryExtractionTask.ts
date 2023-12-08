import path from "node:path"
import { ExifToolTask } from "./ExifToolTask"
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs"
import { Maybe } from "./Maybe"
import { toS } from "./String"

const StdoutRe = /\b(\d+) output files? created/i

/**
 * Task that returns an error string (to prevent retries), or undefined if
 * everything seems to have worked.
 */
export class BinaryExtractionTask extends ExifToolTask<Maybe<string>> {
  private constructor(args: string[]) {
    super(args)
  }

  static for(
    tagname: string,
    imgSrc: string,
    imgDest: string
  ): BinaryExtractionTask {
    const args = [
      ...Utf8FilenameCharsetArgs,
      "-b",
      "-" + tagname,
      "-w",
      // The %0f prevents shell escaping. See
      // https://exiftool.org/exiftool_pod.html#w-EXT-or-FMT--textOut
      "%0f" + path.resolve(imgDest),
      path.resolve(imgSrc),
    ]
    return new BinaryExtractionTask(args)
  }

  parse(stdout: string, err?: Error): Maybe<string> {
    const s = toS(stdout).trim()
    const m = StdoutRe.exec(s)
    if (err != null) {
      throw err
    } else if (m == null) {
      throw new Error("Missing expected status message (got " + stdout + ")")
    } else if (m[1] === "1") {
      return
    } else {
      // Don't retry: the binary payload is missing, and retrying won't fix that.
      return s
    }
  }
}
