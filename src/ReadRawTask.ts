import { logger } from "batch-cluster";
import * as _path from "node:path";
import { DefaultExifToolOptions } from "./DefaultExifToolOptions";
import { errorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifToolOptions } from "./ExifToolOptions";
import { ExifToolTask } from "./ExifToolTask";
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs";
import { pick } from "./Pick";
import { RawTags } from "./RawTags";

export const ReadRawTaskOptionFields = [
  "readArgs",
  "ignoreMinorErrors",
  "useMWG",
] as const satisfies (keyof ExifToolOptions)[];

export const DefaultReadRawTaskOptions = {
  ...pick(DefaultExifToolOptions, ...ReadRawTaskOptionFields),
} as const satisfies Partial<ExifToolOptions>;

export type ReadRawTaskOptions = Partial<typeof DefaultReadRawTaskOptions>;

export class ReadRawTask extends ExifToolTask<RawTags> {
  static for(filename: string, options?: ReadRawTaskOptions): ReadRawTask {
    const args: string[] = [
      ...Utf8FilenameCharsetArgs,
      ...(options?.readArgs ?? []),
    ];
    const opts = { ...DefaultReadRawTaskOptions, ...options };
    if (!args.includes("-json")) args.push("-json");
    if (opts.useMWG) {
      args.push("-use", "MWG");
    }

    const sourceFile = _path.resolve(filename);
    args.push(sourceFile);
    return new ReadRawTask(sourceFile, args, opts);
  }

  private constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    options: Required<ReadRawTaskOptions>,
  ) {
    super(args, options);
  }

  override toString(): string {
    return "ReadRawTask(" + this.sourceFile + ")";
  }

  protected parse(data: string, err?: Error): RawTags {
    try {
      const tags = JSON.parse(data)[0];
      const { errors, warnings } = errorsAndWarnings(this, tags);
      tags.errors = errors;
      tags.warnings = warnings;
      return tags;
    } catch (jsonError) {
      logger().error("ExifTool.ReadRawTask(): Invalid JSON", { data });
      throw err ?? jsonError;
    }
  }
}
