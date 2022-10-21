import { Maybe } from "./Maybe"

export function isNumber(n: any): n is number {
  return typeof n === "number" && isFinite(n)
}

export function toFloat(n: any): Maybe<number> {
  if (n == null) return
  if (isNumber(n)) return n
  try {
    return parseFloat(String(n).trim())
  } catch {
    return undefined
  }
}

export function toInt(n: any): Maybe<number> {
  if (n == null) return
  if (isNumber(n)) {
    // we don't round here, because parsing floats also doesn't round.
    return Math.floor(n)
  }
  try {
    return parseInt(String(n).trim())
  } catch {
    return undefined
  }
}
