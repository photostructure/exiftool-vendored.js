import * as bc from "batch-cluster"
import { notBlank, stripPrefix } from "./String"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []

  constructor(readonly args: string[]) {
    super(ExifToolTask.renderCommand(args), (stdout, stderr, passed) => {
      let err
      if (notBlank(stderr) || !passed) {
        this.errors.push(stderr ?? "failed")
        err = new Error(stripPrefix((stderr ?? stdout).trim(), "error: "))
      }
      return this.parse(stdout, err)
    })
  }

  protected abstract parse(input: string, error?: Error): T

  addError(err: string) {
    this.errors.push(err)
  }
}
