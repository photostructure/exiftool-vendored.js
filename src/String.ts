import { Maybe } from "./Maybe"
import { isNumber } from "./Number"
import { times } from "./Times"

export function isString(o: unknown): o is string {
  return typeof o === "string"
}

const spaces = times(10, (i) => times(i, () => " ").join(""))
const zeroes = times(10, (i) => times(i, () => "0").join(""))

export function blank(s: unknown): s is undefined {
  return s == null || String(s).trim().length === 0
}

export function notBlank(s: unknown): s is string {
  return !blank(s)
}

/**
 * @return true iff `s` is a string with at least one non-whitespace character.
 */
export function notBlankString(s: unknown): s is string {
  return isString(s) && s.trim().length > 0
}

export function toNotBlank(s: Maybe<string>): Maybe<string> {
  if (s == null) return
  s = String(s).trim()
  return s.length === 0 ? undefined : s
}

export function compactBlanks(arr: Maybe<string>[]): string[] {
  return arr.filter(notBlank)
}

function padding(padChar: "0" | " ", count: number): string {
  if (count <= 0) return ""
  return (padChar === "0" ? zeroes : spaces)[Math.floor(count)]!
}

export function toS(s: Maybe<unknown>): string {
  return s == null ? "" : String(s)
}

export function leftPad(
  i: Maybe<number | string>,
  minLen: number,
  padChar: "0" | " "
): string {
  if (i == null || (isNumber(i) && isNaN(i))) i = 0
  const s = String(i)
  if (isNumber(i) && i < 0 && padChar === "0") {
    // avoid "000-1":
    return "-" + padding(padChar, minLen - s.length) + Math.abs(i)
  } else {
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
 * NOT FOR GENERAL USE, as this is latin-case-insensitive
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

/**
 * @return `arr` with all empty strings removed and all non-empty strings trimmed.
 */
export function splitLines(...arr: string[]): string[] {
  return arr
    .join("\n")
    .split(/\r?\n/)
    .map((ea) => ea.trim())
    .filter((ea) => ea.length > 0)
}
