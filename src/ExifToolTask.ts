import * as bc from "batch-cluster"

import { notBlank, stripPrefix } from "./String"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []

  constructor(readonly args: string[]) {
    super(ExifToolTask.renderCommand(args), (data, stderr) => {
      let err
      if (notBlank(stderr)) {
        this.errors.push(stderr)
        err = new Error(stripPrefix((stderr || data).trim(), "error: "))
      }
      return this.parse(data, err)
    })
  }

  protected abstract parse(input: string, error?: Error): T

  addError(err: string) {
    this.errors.push(err)
  }
}
