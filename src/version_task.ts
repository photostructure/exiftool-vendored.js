import { Task } from "./task"

export class VersionTask extends Task<string> {
  private static readonly versionRegex = /^\d{1,3}\.\d{1,3}(\.\d{1,3}})?$/

  constructor() {
    super(["-ver"])
  }

  parse(input: string): string {
    const value = input.trim()
    if (VersionTask.versionRegex.test(value)) {
      return value
    } else {
      throw new Error(`Unexpected version ${value}`)
    }
  }
}
