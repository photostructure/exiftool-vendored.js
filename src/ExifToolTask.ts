import * as bc from "batch-cluster"

export abstract class ExifToolTask<T> extends bc.Task<T> {
  static renderCommand(args: string[]): string {
    return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
  }

  readonly errors: string[] = []

  constructor(args: string[]) {
    super(ExifToolTask.renderCommand(args), data => this.parse(data))
  }

  protected abstract parse(input: string): T

  addError(err: string) {
    this.errors.push(err)
  }
}
