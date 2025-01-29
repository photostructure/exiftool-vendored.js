import * as bc from "batch-cluster";
import { ExifToolOptions } from "./ExifToolOptions";
import { isWarning } from "./IsWarning";
import { Maybe } from "./Maybe";
import { blank, notBlank, splitLines } from "./String";

const BadPerlInstallationRE = /Can't locate \S+ in @INC/i;

export type ExifToolTaskOptions = Pick<ExifToolOptions, "ignoreMinorErrors">;

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[], options?: ExifToolTaskOptions): string {
    const result = args.filter((ea) => !blank(ea));
    if (options?.ignoreMinorErrors === true) {
      result.push("-ignoreMinorErrors");
    }
    result.push("-execute");
    return result.join("\n") + "\n";
  }

  readonly errors: string[] = [];
  readonly warnings: string[] = [];

  constructor(
    readonly args: string[],
    readonly options?: ExifToolTaskOptions,
  ) {
    super(ExifToolTask.renderCommand(args, options), (stdout, stderr, passed) =>
      this.#parser(stdout, stderr, passed),
    );
  }

  override onStderr(buf: string | Buffer): void {
    if (BadPerlInstallationRE.test(buf.toString())) {
      // This isn't an error we can recover from: there's a Perl module that
      // needs to be installed. See
      // https://github.com/photostructure/exiftool-vendored.js/issues/168 for
      // details.
      throw new Error(buf.toString());
    }
    super.onStderr(buf);
  }

  #parser(stdout: string, stderr: string | undefined, passed: boolean): T {
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
