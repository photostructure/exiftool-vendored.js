import * as bc from "batch-cluster"

export function cmd(args: string[]): string {
  return [...args, "-ignoreMinorErrors", "-execute", ""].join("\n")
}

export abstract class ExifToolTask<T> extends bc.Task<T> {
  protected constructor(args: string[]) {
    super(cmd(args), data => this.parse(data))
  }

  protected abstract parse(input: string): T
}
