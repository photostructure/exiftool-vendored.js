import * as bc from "batch-cluster";
import { toError } from "./ErrorsAndWarnings";
import { ExifToolOptions } from "./ExifToolOptions";
import { isWarning } from "./IsWarning";
import { Maybe } from "./Maybe";
import { blank, notBlank, splitLines } from "./String";

const BadPerlInstallationRE = /Can't locate \S+ in @INC/i;

/**
 * Lines ExifTool prints to stderr with the `ImageHashProgress` API option.
 * That option comes from a patch that exiftool-vendored.pl and
 * exiftool-vendored.exe apply to ExifTool; other ExifTool builds ignore it.
 */
const ProgressLineRE = /^\{progress:(\d+)\}\r?(?:\n|$)/gm;

/**
 * Asks ExifTool to report image data hashing progress once a second. Each
 * report restarts `taskTimeoutMillis`, so this interval must be shorter than
 * any timeout a caller would set.
 */
export const ImageHashProgressArgs = ["-api", "imagehashprogress=1"];

export type ExifToolTaskOptions = Pick<ExifToolOptions, "ignoreMinorErrors">;

export interface ExifToolTaskProgressOptions {
  /**
   * Called with the bytes of image data ExifTool has hashed for this file,
   * each time that count grows. Only reads that compute `ImageDataHash` (see
   * `imageHashType`) report progress, and only with the ExifTool that
   * exiftool-vendored.pl and exiftool-vendored.exe ship.
   *
   * If this throws, ExifTool finishes reading the file without further calls,
   * and the read then fails with that error. As with any failed read,
   * `ExifToolOptions.taskRetries` may retry it, which calls this again.
   */
  onProgress?: (bytesHashed: number) => void;
}

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[], options?: ExifToolTaskOptions): string {
    const result = args.filter((ea) => !blank(ea));
    // Defense-in-depth: exiftool is launched with `-stay_open True -@ -` so
    // args are separated by newlines. Any \r \n or NUL inside an arg would
    // split one arg into several — an argument-injection primitive. Per-site
    // validators (see TagNameValidation) should prevent this upstream; this
    // assertion catches regressions from any new interpolation site that
    // forgets to validate.
    for (const a of result) {
      if (/[\r\n\0]/.test(a)) {
        throw new Error(
          "Internal error: argument contains control character: " +
            JSON.stringify(a),
        );
      }
    }
    if (options?.ignoreMinorErrors === true) {
      result.push("-ignoreMinorErrors");
    }
    result.push("-execute");
    return result.join("\n") + "\n";
  }

  /**
   * Splits ExifTool's `{progress:BYTES}` lines from the rest of `stderr`.
   */
  static withoutProgressLines(stderr: string): {
    bytes: number[];
    rest: string;
  } {
    const bytes: number[] = [];
    const rest = stderr.replace(ProgressLineRE, (_line, n: string) => {
      bytes.push(Number(n));
      return "";
    });
    return { bytes, rest };
  }

  readonly errors: string[] = [];
  readonly warnings: string[] = [];

  /** @see ExifToolTaskProgressOptions.onProgress */
  onProgress: ((bytesHashed: number) => void) | undefined;
  #hashedBytes = -1;
  #onProgressError: Maybe<Error>;

  constructor(
    readonly args: string[],
    readonly options?: ExifToolTaskOptions,
  ) {
    super(ExifToolTask.renderCommand(args, options), (stdout, stderr, passed) =>
      this.#parser(stdout, stderr, passed),
    );
  }

  override onStderr(buf: string | Buffer): void {
    const s = buf.toString();
    if (BadPerlInstallationRE.test(s)) {
      // This isn't an error we can recover from: there's a Perl module that
      // needs to be installed. See
      // https://github.com/photostructure/exiftool-vendored.js/issues/168 for
      // details.
      throw new Error(s);
    }
    // A progress line split across two chunks isn't reassembled, and neither
    // fragment counts as progress. That's OK: ExifTool writes each line with
    // one small unbuffered write, and in a stress test all 32,770 lines
    // arrived whole. A split would lose only that report (the next one still
    // restarts the timeout), and #parser ignores the fragments, as they
    // contain neither "error" nor "warning".
    const { bytes, rest } = ExifToolTask.withoutProgressLines(s);
    for (const ea of bytes) this.#onHashProgress(ea);
    super.onStderr(rest);
  }

  #onHashProgress(bytes: number): void {
    if (bytes <= this.#hashedBytes) return;
    this.#hashedBytes = bytes;
    // ExifTool is still reading the file: restart taskTimeoutMillis rather
    // than cut off a large file on slow storage.
    this.resetTimeout();
    if (this.#onProgressError != null) return;
    try {
      this.onProgress?.(bytes);
    } catch (err) {
      // Rethrowing would make this an uncaughtException in batch-cluster's
      // stderr handler, and rejecting now would free this worker while
      // ExifTool is still busy with this command: #parser rejects instead.
      this.#onProgressError = toError(err);
    }
  }

  #parser(stdout: string, stderr: string | undefined, passed: boolean): T {
    if (this.#onProgressError != null) throw this.#onProgressError;
    let error: Maybe<Error>;
    if (notBlank(stderr) || !passed) {
      for (const line of splitLines(stderr ?? "")) {
        if (isWarning(line)) {
          this.warnings.push(line);
        } else if (/error|warning/i.test(line)) {
          this.errors.push(line);
          // new Error() will add a "Error: " prefix:
          error ??= new Error(line.replace(/^error: /i, ""));
        }
      }
    }
    return this.parse(stdout, error);
  }

  protected abstract parse(input: string, error?: Error): T;
}
