import { map, Maybe } from "./Maybe"
import { toS } from "./String"

export function isNumber(n: any): n is number {
  return typeof n === "number" && isFinite(n)
}

export function toI(n: any): Maybe<number> {
  return map(toF(n), f => Math.round(f))
}

export function toF(n: any): Maybe<number> {
  if (n == null) return undefined
  if (isNumber(n)) return n
  try {
    return parseFloat(
      toS(n)
        .split(" ")[0]
        .trim()
    )
  } catch {
    return undefined
  }
}
