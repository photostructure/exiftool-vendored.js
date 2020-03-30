import { map, Maybe } from "./Maybe"

export function isNumber(n: any): n is number {
  return typeof n === "number" && isFinite(n)
}

export function toF(n: any): Maybe<number> {
  if (n == null) return
  if (isNumber(n)) return n
  try {
    return parseFloat(String(n))
  } catch {
    return undefined
  }
}

export function toI(n: any): Maybe<number> {
  return map(toF(n), (f) => Math.round(f))
}
