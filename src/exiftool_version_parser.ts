import { Parser } from './parser'

export class ExifToolVersionParser implements Parser<string> {
  private static readonly versionRegex = /\d{1,3}\.\d{1,3}(\.\d{1,3}})?/

  static looksVersionish(s: string) {
    return ExifToolVersionParser.versionRegex.test(s)
  }

  parse(input: string): string {
    const value = input.trim()
    if (ExifToolVersionParser.looksVersionish(value)) {
      return value
    } else {
      throw new Error(`Unexpected version $value`)
    }
  }

  onError(message: string) {
    console.error(message)
  }
}
