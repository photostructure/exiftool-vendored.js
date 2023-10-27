import { ExifToolTask } from "./ExifToolTask"

export class VersionTask extends ExifToolTask<string> {
  private static readonly versionRegex = /^\d{1,3}\.\d{1,3}(?:\.\d{1,3})?$/

  constructor() {
    super(["-ver"])
  }

  protected parse(input: string): string {
    const value = input.trim()
    if (VersionTask.versionRegex.test(value)) {
      return value
    } else {
      throw new Error(`Unexpected version ${value}`)
    }
  }
}
