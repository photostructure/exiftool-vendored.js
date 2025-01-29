import * as _path from "node:path";
import { compact } from "./Array";
import { ExifToolTask, ExifToolTaskOptions } from "./ExifToolTask";
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs";

export class RewriteAllTagsTask extends ExifToolTask<void> {
  private constructor(args: string[], options: ExifToolTaskOptions) {
    super(args, options);
  }

  static for(
    imgSrc: string,
    imgDest: string,
    opts: { allowMakerNoteRepair?: boolean } & ExifToolTaskOptions,
  ): RewriteAllTagsTask {
    // -all= -tagsfromfile @ -all:all -unsafe -icc_profile bad.jpg

    const args = compact([
      ...Utf8FilenameCharsetArgs,
      "-all=",
      "-tagsfromfile",
      "@",
      "-all:all",
      "-unsafe",
      "-icc_profile",
      opts.allowMakerNoteRepair ? "-F" : undefined,
      "-out",
      _path.resolve(imgDest),
      _path.resolve(imgSrc),
    ]);
    return new RewriteAllTagsTask(args, opts);
  }

  parse(data: string, error?: Error): void {
    if (error != null) {
      const str = String(error);
      // Ignore warnings:
      if (str.match(/\berror\b/i) != null && !str.match(/\bwarning\b/i)) {
        throw error;
      }
    }
    if (null == data.match(/^\s*1 image files creat/i)) {
      throw (
        error ??
        new Error(
          data.trim().split("\n")[0] ?? "Missing expected status message",
        )
      );
    }
  }
}
