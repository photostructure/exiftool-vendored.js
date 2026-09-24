import { logger } from "batch-cluster";
import * as _path from "node:path";
import { DefaultExifToolOptions } from "./DefaultExifToolOptions";
import { errorsAndWarnings, RawErrorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifToolOptions } from "./ExifToolOptions";
import {
  ExifToolTask,
  ExifToolTaskProgressOptions,
  ImageHashProgressArgs,
} from "./ExifToolTask";
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs";
import { unwrapInvalidUtf8Tags } from "./InvalidUtf8Bytes";
import { pick } from "./Pick";
import { RawTags } from "./RawTags";
import { hasBuiltInUtf8Filter, utf8JsonFilterArgs } from "./Utf8JsonFilter";

export const ReadRawTaskOptionFields = [
  "readArgs",
  "ignoreMinorErrors",
  "useMWG",
] as const satisfies (keyof ExifToolOptions)[];

export const DefaultReadRawTaskOptions = {
  ...pick(DefaultExifToolOptions, ...ReadRawTaskOptionFields),
} as const satisfies Partial<ExifToolOptions>;

export type ReadRawTaskOptions = Partial<typeof DefaultReadRawTaskOptions> &
  ExifToolTaskProgressOptions;

export class ReadRawTask extends ExifToolTask<RawTags> {
  readonly #unwrapInvalidUtf8: boolean;

  static for(filename: string, options?: ReadRawTaskOptions): ReadRawTask {
    const { onProgress, ...readOptions } = options ?? {};
    const opts = { ...DefaultReadRawTaskOptions, ...readOptions };
    const readArgs = readOptions.readArgs ?? [];
    const args: string[] = [
      ...Utf8FilenameCharsetArgs,
      // Before readArgs, so a caller's own ImageHashProgress wins:
      ...ImageHashProgressArgs,
      ...readArgs,
      ...utf8JsonFilterArgs(readArgs),
    ];
    if (!args.includes("-json")) args.push("-json");
    if (opts.useMWG) {
      args.push("-use", "MWG");
    }

    const sourceFile = _path.resolve(filename);
    args.push(sourceFile);
    const task = new ReadRawTask(sourceFile, args, opts);
    task.onProgress = onProgress;
    return task;
  }

  private constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    options: Required<Omit<ReadRawTaskOptions, "onProgress">>,
  ) {
    super(args, options);
    this.#unwrapInvalidUtf8 = hasBuiltInUtf8Filter(args);
  }

  override toString(): string {
    return "ReadRawTask(" + this.sourceFile + ")";
  }

  protected parse(data: string, err?: Error): RawTags {
    try {
      const parsed = JSON.parse(data)[0] as Record<string, unknown>;
      const decoded = this.#unwrapInvalidUtf8
        ? unwrapInvalidUtf8Tags(parsed)
        : { tags: parsed };
      const tags = decoded.tags as RawTags;
      const { errors, warnings } = errorsAndWarnings(
        this,
        decoded.tags as RawErrorsAndWarnings,
      );
      tags.errors = errors;
      tags.warnings = warnings;
      if (decoded.invalidUtf8Bytes != null) {
        tags.invalidUtf8Bytes = decoded.invalidUtf8Bytes;
      }
      return tags;
    } catch (jsonError) {
      logger().error("ExifTool.ReadRawTask(): Invalid JSON", { data });
      throw err ?? jsonError;
    }
  }
}
