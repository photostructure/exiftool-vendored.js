import { Parser } from './parser'

export const ExifToolVersionParser: Parser<string> = new class implements Parser<string> {
  private const versionRegex = /\d{1,3}\.\d{1,3}(\.\d{1,3}})?/

  parse(input: string): string {
    const value = input.trim()
    if (this.versionRegex.test(value)) {
      return value
    } else {
      throw new Error(`Unexpected version $value`)
    }
  }

  onError(message: string) {
    console.error(message)
  }
}()
