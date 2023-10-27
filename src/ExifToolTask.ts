import * as bc from "batch-cluster"
import { isIgnorableWarning } from "./IgnorableError"
import { Maybe } from "./Maybe"
import { notBlank } from "./String"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  isIgnorableError = isIgnorableWarning

  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []

  constructor(readonly args: string[]) {
    super(ExifToolTask.renderCommand(args), (stdout, stderr, passed) => {
      let error: Maybe<Error>
      if (notBlank(stderr) || !passed) {
        const errMsg = (stderr ?? stdout)
          .trim()
          .replace(/error(?::\s*|\b)/i, "")
        if (!this.isIgnorableError(errMsg)) {
          this.errors.push(errMsg)
          error = new Error(errMsg)
        }
      }
      return this.parse(stdout, error)
    })
  }

  protected abstract parse(input: string, error?: Error): T

  addError(err: string) {
    this.errors.push(err)
  }
}
