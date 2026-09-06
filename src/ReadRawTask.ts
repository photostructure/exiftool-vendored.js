import { logger } from "batch-cluster";
import * as _path from "node:path";
import { DefaultExifToolOptions } from "./DefaultExifToolOptions";
import { errorsAndWarnings, RawErrorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifToolOptions } from "./ExifToolOptions";
import { ExifToolTask } from "./ExifToolTask";
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

export type ReadRawTaskOptions = Partial<typeof DefaultReadRawTaskOptions>;

export class ReadRawTask extends ExifToolTask<RawTags> {
  readonly #unwrapInvalidUtf8: boolean;

  static for(filename: string, options?: ReadRawTaskOptions): ReadRawTask {
    const readArgs = options?.readArgs ?? [];
    const args: string[] = [
      ...Utf8FilenameCharsetArgs,
      ...readArgs,
      ...utf8JsonFilterArgs(readArgs),
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
