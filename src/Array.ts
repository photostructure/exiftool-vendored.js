import { Maybe, MaybeNull } from "./Maybe"
import { isString } from "./String"

export function isIterable(obj: any): obj is Iterable<any> {
  return (
    obj != null &&
    typeof obj !== "string" &&
    typeof obj[Symbol.iterator] === "function"
  )
}

export function ifArr(arr: unknown): Maybe<any[]> {
  return Array.isArray(arr) ? arr : undefined
}

export function toA<T>(arr: undefined | null | T[] | T | Iterable<T>): T[] {
  return Array.isArray(arr) // < strings are not arrays
    ? (arr as T[])
    : arr == null
      ? []
      : isString(arr) // < don't rely on isIterable rejecting Strings
        ? [arr as T]
        : isIterable(arr)
          ? Array.from(arr)
          : [arr as T]
}

export function compact<T>(array: MaybeNull<T>[]): T[] {
  return array.filter((elem) => elem != null) as T[]
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

// terrible implementation only for internal use
export function shallowArrayEql(a: any[], b: any[]): boolean {
  return (
    a != null &&
    b != null &&
    a.length === b.length &&
    a.every((ea, idx) => ea === b[idx])
  )
}

type Comparable = number | string | boolean

/**
 * Returns a copy of arr, stable sorted by the given constraint. Note that false
 * < true, and that `f` may return an array for sort priorities, or undefined if
 * the item should be skipped from the returned result.
 *
 * Note: localeSort() thinks lower case should come before upper case (!!)
 */
export function sortBy<T>(
  arr: Iterable<Maybe<T>> | Maybe<T>[],
  f: (t: T) => Maybe<Comparable>
): T[] {
  return (
    (toA(arr).filter((ea) => ea != null) as T[])
      .map((item) => ({
        item,
        cmp: f(item),
      }))
      .filter((ea) => ea.cmp != null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .sort((a, b) => cmp(a.cmp!, b.cmp!))
      .map((ea) => ea.item)
  )
}

function cmp(a: Maybe<Comparable>, b: Maybe<Comparable>): number {
  // undefined == undefined:
  if (a == null && b == null) return 0

  // undefined should be < defined. We can't use typeof here because typeof null
  // is "object" and typeof undefined = "undefined".
  if (a == null) return -1
  if (b == null) return 1

  const aType = typeof a
  const bType = typeof b

  if (
    (aType === "string" || aType === "symbol") &&
    (bType === "string" || bType === "symbol")
  ) {
    // in German, ä sorts before z, in Swedish, ä sorts after z
    return String(a).localeCompare(String(b))
  }
  return a > b ? 1 : a < b ? -1 : 0
}
