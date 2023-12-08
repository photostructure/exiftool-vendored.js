import * as bc from "batch-cluster"
import { isWarning } from "./IsWarning"
import { Maybe } from "./Maybe"
import { notBlank, splitLines } from "./String"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []
  readonly warnings: string[] = []

  constructor(readonly args: string[]) {
    super(ExifToolTask.renderCommand(args), (stdout, stderr, passed) =>
      this.#parser(stdout, stderr, passed)
    )
  }

  #parser(stdout: string, stderr: string | undefined, passed: boolean): T {
    let error: Maybe<Error>
    if (notBlank(stderr) || !passed) {
      for (const line of splitLines(stderr ?? "")) {
        if (isWarning(line)) {
          this.warnings.push(line)
        } else if (/error|warning/i.test(line)) {
          this.errors.push(line)
          // new Error() will add a "Error: " prefix:
          error ??= new Error(line.replace(/^error: /i, ""))
        }
      }
    }
    return this.parse(stdout, error)
  }

  protected abstract parse(input: string, error?: Error): T
}
