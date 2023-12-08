import * as bc from "batch-cluster"
import { isIgnorableWarning } from "./IgnorableError"
import { Maybe } from "./Maybe"
import { notBlank, splitLines } from "./String"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []
  #isIgnorableError = isIgnorableWarning

  constructor(readonly args: string[]) {
    super(ExifToolTask.renderCommand(args), (stdout, stderr, passed) =>
      this.#parser(stdout, stderr, passed)
    )
  }

  #parser(stdout: string, stderr: string | undefined, passed: boolean): T {
    let error: Maybe<Error>
    if (notBlank(stderr) || !passed) {
      for (const line of splitLines(stderr ?? stdout)) {
        if (!this.#isIgnorableError(line)) {
          this.errors.push(line)
          // new Error() will add a "Error: " prefix:
          error ??= new Error(line.replace(/^error: /i, ""))
        }
      }
    }
    return this.parse(stdout, error)
  }

  set isIgnorableError(fn: typeof isIgnorableWarning) {
    this.#isIgnorableError = fn
  }

  protected abstract parse(input: string, error?: Error): T

  addError(err: string) {
    this.errors.push(err)
  }
}
