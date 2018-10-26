import { map, Maybe } from "./Maybe"

export function isNumber(n: any): n is number {
  return typeof n === "number" && isFinite(n)
}

export function toI(n: any): Maybe<number> {
  return map(toF(n), f => Math.round(f))
}

const numRe = /([+-]?[0-9]+(?:\.(?:[0-9]*))?)/

export function toF(n: any): Maybe<number> {
  if (n == null) return
  if (isNumber(n)) return n
  const m = numRe.exec(n)
  if (m == null) return
  try {
    return parseFloat(m[1])
  } catch {
    return undefined
  }
}
