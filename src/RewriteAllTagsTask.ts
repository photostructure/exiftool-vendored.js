import * as _path from "path"

import { compact } from "./Array"
import { ExifToolTask } from "./ExifToolTask"
import { orElse } from "./Maybe"

export class RewriteAllTagsTask extends ExifToolTask<void> {
  private constructor(args: string[]) {
    super(args)
  }

  static for(
    imgSrc: string,
    imgDest: string,
    allowMakerNoteRepair: boolean
  ): RewriteAllTagsTask {
    // -all= -tagsfromfile @ -all:all -unsafe -icc_profile bad.jpg

    const args = compact([
      "-all=",
      "-tagsfromfile",
      "@",
      "-all:all",
      "-unsafe",
      "-icc_profile",
      allowMakerNoteRepair ? "-F" : undefined,
      _path.resolve(imgSrc),
      "-out",
      _path.resolve(imgDest),
    ])
    return new RewriteAllTagsTask(args)
  }

  parse(data: string, error?: Error): void {
    if (error != null && String(error).startsWith("Warning: ")) {
      throw error
    }
    if (data.trim() !== "1 image files created") {
      throw orElse(
        error,
        () =>
          new Error(
            orElse(
              data.trim().split("\n")[0],
              "Missing expected status message"
            )
          )
      )
    }
  }
}
