import { MaybeNull } from "./Maybe"

export function compact<T>(array: MaybeNull<T>[]): T[] {
  return array.filter((elem) => elem != null) as T[]
}

export function times<T>(n: number, f: (idx: number) => T): T[] {
  return Array(n)
    .fill(undefined)
    .map((_, i) => f(i))
}

/**
 * Remove all elements from the given array that return false from the given
 * predicate `filter`.
 */
export function filterInPlace<T>(arr: T[], filter: (t: T) => boolean): T[] {
  let j = 0
  arr.forEach((ea, i) => {
    if (filter(ea)) {
      if (i !== j) arr[j] = ea
      j++
    }
  })
  arr.length = j
  return arr
}

export function uniq<T>(arr: T[]): T[] {
  return arr.reduce((acc, ea) => {
    if (acc.indexOf(ea) === -1) acc.push(ea)
    return acc
  }, [] as T[])
}
