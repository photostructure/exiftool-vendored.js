import { mkdirSync } from "node:fs";
import path from "node:path";
import { ExifToolOptions } from "./ExifToolOptions";
import { ExifToolTask } from "./ExifToolTask";
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs";
import { Maybe } from "./Maybe";
import { toS } from "./String";

export type BinaryExtractionTaskOptions = Pick<
  ExifToolOptions,
  "ignoreMinorErrors"
> &
  Partial<Pick<ExifToolOptions, "forceWrite">>;

const StdoutRe = /\b(\d+) output files? created/i;

/**
 * Task that returns an error string (to prevent retries), or undefined if
 * everything seems to have worked.
 */
export class BinaryExtractionTask extends ExifToolTask<Maybe<string>> {
  private constructor(args: string[], options?: BinaryExtractionTaskOptions) {
    super(args, options);
  }

  static for(
    tagname: string,
    imgSrc: string,
    imgDest: string,
    options?: BinaryExtractionTaskOptions,
  ): BinaryExtractionTask {
    // Ensure the destination directory exists:
    mkdirSync(path.dirname(imgDest), { recursive: true });

    const forceWrite = options?.forceWrite ?? false;

    const args = [
      ...Utf8FilenameCharsetArgs,
      "-b", // -binary
      "-" + tagname,
      // capital W allows destination files to not have a pattern:
      forceWrite ? "-W!" : "-W",
      path.resolve(imgDest),
      path.resolve(imgSrc),
    ];
    return new BinaryExtractionTask(args, options);
  }

  parse(stdout: string, err?: Error): Maybe<string> {
    const s = toS(stdout).trim();
    const m = StdoutRe.exec(s);
    if (err != null) {
      throw err;
    } else if (m == null) {
      throw new Error("Missing expected status message (got " + stdout + ")");
    } else if (m[1] === "1") {
      return;
    } else {
      // Don't retry: the binary payload is missing, and retrying won't fix that.
      return s;
    }
  }
}
