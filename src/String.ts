import { encode } from "he"
import { times } from "./Array"
import { Maybe } from "./Maybe"

export function isString(o: any): o is string {
  return typeof o === "string"
}

const spaces = times(10, (i) => times(i, () => " ").join(""))
const zeroes = times(10, (i) => times(i, () => "0").join(""))

export function blank(s: Maybe<string>): s is undefined {
  return s == null || String(s).trim().length === 0
}

export function notBlank(s: Maybe<string>): s is string {
  return !blank(s)
}

function padding(padChar: "0" | " ", count: number): string {
  if (count <= 0) return ""
  return (padChar === "0" ? zeroes : spaces)[Math.floor(count)]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toS(s: Maybe<any>): string {
  return s == null ? "" : String(s)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function leftPad(
  i: Maybe<any>,
  minLen: number,
  padChar: "0" | " "
): string {
  if (i == null || isNaN(i)) i = 0
  if (i < 0) {
    return "-" + leftPad(-i, minLen - 1, padChar)
  } else {
    const s = String(i)
    return padding(padChar, minLen - s.length) + s
  }
}

export function pad2(...numbers: number[]): string[] {
  return numbers.map((i) => leftPad(i, 2, "0"))
}

export function pad3(...numbers: number[]): string[] {
  return numbers.map((i) => leftPad(i, 3, "0"))
}

/**
 * NOTE: case insensitive
 */
export function stripPrefix(s: string, prefix: string): string {
  return toS(s).toLowerCase().startsWith(prefix.toLowerCase())
    ? s.slice(prefix.length)
    : s
}

export function stripSuffix(s: string, suffix: string): string {
  const str = toS(s)
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

export function htmlEncode(s: string): string {
  // `he` doesn't encode whitespaces (like newlines), but we need that:
  return encode(s, { decimal: true }).replace(/\s/g, (m) =>
    m[0] === " " ? " " : `&#${m[0].charCodeAt(0)};`
  )
}
