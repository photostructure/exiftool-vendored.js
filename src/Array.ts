import { Maybe, Nullable } from "./Maybe";
import { isString } from "./String";

/**
 * Type guard to check if a value is iterable.
 * @param obj - value to check
 * @returns true if the value is iterable
 */
export function isIterable(obj: unknown): obj is Iterable<unknown> {
  return obj != null && typeof obj === "object" && Symbol.iterator in obj;
}

/**
 * Returns the input if it's an array, otherwise undefined.
 * @param arr - value to check
 * @returns the array if input is an array, otherwise undefined
 */
export function ifArray<T = unknown>(arr: T[] | unknown): Maybe<T[]> {
  return Array.isArray(arr) ? arr : undefined;
}

/**
 * Converts various input types to an array.
 * @param arr - value to convert (array, iterable, single value, or nullish)
 * @returns an array containing the input elements
 */
export function toArray<T>(arr: undefined | null | T[] | T | Iterable<T>): T[] {
  return Array.isArray(arr) // < strings are not arrays
    ? (arr as T[])
    : arr == null
      ? []
      : isString(arr) // < don't rely on isIterable rejecting Strings
        ? [arr as T]
        : isIterable(arr)
          ? Array.from(arr)
          : [arr as T];
}

/**
 * Removes null and undefined values from an array.
 * @param array - array potentially containing nullish values
 * @returns a new array with nullish values removed
 */
export function compact<T>(array: Nullable<T>[]): T[] {
  return array.filter((elem) => elem != null) as T[];
}

/**
 * Remove all elements from the given array that return false from the given
 * predicate `filter`. Mutates the original array.
 * @param arr - the array to filter in place
 * @param filter - predicate function returning true for elements to keep
 * @returns the same array with non-matching elements removed
 */
export function filterInPlace<T>(arr: T[], filter: (t: T) => boolean): T[] {
  let j = 0;
  arr.forEach((ea, i) => {
    if (filter(ea)) {
      if (i !== j) arr[j] = ea;
      j++;
    }
  });
  arr.length = j;
  return arr;
}

/**
 * Returns a new array with duplicate values removed (preserves first occurrence).
 * @param arr - the array to deduplicate
 * @returns a new array with unique values
 */
export function uniq<T>(arr: T[]): T[] {
  return arr.reduce((acc, ea) => {
    if (acc.indexOf(ea) === -1) acc.push(ea);
    return acc;
  }, [] as T[]);
}

/**
 * Compares two arrays for shallow equality (same length and === elements).
 * @param a - first array
 * @param b - second array
 * @returns true if arrays have same length and identical elements by reference
 */
export function shallowArrayEql(a: unknown[], b: unknown[]): boolean {
  return a?.length === b?.length && a.every((ea, idx) => ea === b[idx]);
}

type Comparable = number | string | boolean;

/**
 * Returns a copy of arr, stable sorted by the given constraint. Note that false
 * < true, and that `f` may return an array for sort priorities, or undefined if
 * the item should be skipped from the returned result.
 *
 * Note: localeSort() thinks lower case should come before upper case (!!)
 */
export function sortBy<T>(
  arr: Iterable<Maybe<T>> | Maybe<T>[],
  f: (t: T) => Maybe<Comparable>,
): T[] {
  return (toArray(arr).filter((ea) => ea != null) as T[])
    .map((item) => ({
      item,
      cmp: f(item),
    }))
    .filter((ea) => ea.cmp != null)
    .sort((a, b) => cmp(a.cmp as Comparable, b.cmp as Comparable))
    .map((ea) => ea.item);
}

function cmp(a: Maybe<Comparable>, b: Maybe<Comparable>): number {
  // undefined == undefined:
  if (a == null && b == null) return 0;

  // undefined should be < defined. We can't use typeof here because typeof null
  // is "object" and typeof undefined = "undefined".
  if (a == null) return -1;
  if (b == null) return 1;

  const aType = typeof a;
  const bType = typeof b;

  if (
    (aType === "string" || aType === "symbol") &&
    (bType === "string" || bType === "symbol")
  ) {
    // in German, ä sorts before z, in Swedish, ä sorts after z
    return String(a).localeCompare(String(b));
  }
  return a > b ? 1 : a < b ? -1 : 0;
}

/**
 * Returns the element with the minimum comparable value.
 * @param haystack - the array to search
 * @param f - function to extract a comparable value from each element
 * @returns the element with the minimum value, or undefined if array is empty
 */
export function leastBy<T>(
  haystack: T[],
  f: (t: T) => Maybe<Comparable>,
): Maybe<T> {
  let min: Maybe<Comparable>;
  let result: Maybe<T>;
  for (const ea of haystack) {
    const val = f(ea);
    if (val != null && (min == null || val < min)) {
      min = val;
      result = ea;
    }
  }
  return result;
}
