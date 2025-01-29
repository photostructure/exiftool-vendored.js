import { Maybe } from "./Maybe"

export function isObject(obj: unknown): obj is object {
  return typeof obj === "object" && obj !== null
}

export function keys<T extends object, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}).propertyIsEnumerable.call(o, ea)
      ) as K[])
}

export function isFunction(
  obj: unknown
): obj is (...args: unknown[]) => unknown {
  return typeof obj === "function"
}

export function fromEntries(
  arr: Maybe<[Maybe<string>, unknown]>[],
  obj?: Record<string, unknown>
): Record<string, unknown> {
  if (arr == null || arr.length === 0) return obj ?? {}
  // don't use Object.create(null), json stringify will break!
  for (const ea of arr.filter((ea) => ea != null)) {
    if (ea != null && Array.isArray(ea)) {
      const [k, v] = ea
      // allow NULL fields:
      if (k != null && v !== undefined) {
        if (!isObject(obj)) obj = {}
        obj[k] = v
      }
    }
  }
  return obj ?? {}
}

export type Unpick<T, U> = { [P in keyof T]: P extends U ? never : T[P] }

export function omit<T extends object, S extends string>(
  t: T,
  ...keysToOmit: S[]
): Unpick<T, S> {
  const result = {} as T
  for (const k of keys(t).filter(
    (ea) => !(keysToOmit as string[]).includes(ea)
  ) as (keyof T)[]) {
    result[k] = t[k]
  }
  return result as Unpick<T, S>
}

/**
 * Provides a type-safe exhaustive array of keys for a given interface.
 *
 * Unfortunately, `satisfies (keyof T)[]` doesn't ensure all keys are present,
 * and doesn't guard against duplicates. This function does.
 *
 * @param t - The interface to extract keys from. This is a Record of keys to
 * `true`, which ensures the returned key array is unique.
 */
export function keysOf<T>(t: Required<Record<keyof T, true>>): (keyof T)[] {
  return Object.keys(t) as (keyof T)[]
}

// This also doesn't enforce that all keys are present:

// type RequiredKeys<T> = { [K in keyof Required<T>]: K } extends { [K: string]: infer U } ? U[] : never;
