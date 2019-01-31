import { times } from "./Array"
import { Maybe } from "./Maybe"

export function isString(o: any): o is string {
  return typeof o == "string"
}

const spaces = times(10, i => times(i, () => " ").join(""))
const zeroes = times(10, i => times(i, () => "0").join(""))

export function blank(s: Maybe<string>): boolean {
  return s == null || String(s).trim().length == 0
}

export function notBlank(s: Maybe<string>): s is string {
  return !blank(s)
}

function padding(padChar: "0" | " ", count: number): string {
  if (count <= 0) return ""
  return (padChar === "0" ? zeroes : spaces)[Math.floor(count)]
}

export function toS(s: Maybe<any>): string {
  return s == null ? "" : String(s)
}

export function leftPad(i: any, minLen: number, padChar: "0" | " "): string {
  if (i == null || isNaN(i)) i = 0
  if (i < 0) {
    return "-" + leftPad(-i, minLen - 1, padChar)
  } else {
    const s = String(i)
    return padding(padChar, minLen - s.length) + s
  }
}

export function pad2(...numbers: number[]): string[] {
  return numbers.map(i => leftPad(i, 2, "0"))
}

export function pad3(...numbers: number[]): string[] {
  return numbers.map(i => leftPad(i, 3, "0"))
}

export function stripPrefix(s: string, prefix: string): string {
  return toS(s)
    .toLowerCase()
    .startsWith(prefix.toLowerCase())
    ? s.slice(prefix.length)
    : s
}

const safeChars = /[a-z0-9 :\/+\.-]/i

/**
 * This is a basic HTML entities encoder (so we don't have to pull in another
 * npm dependency). No named entries are used, only decimal char values.
 */
export function htmlEncode(s: string): string {
  return s
    .split("")
    .map(ea => (safeChars.exec(ea) == null ? `&#${ea.charCodeAt(0)};` : ea))
    .join("")
}
