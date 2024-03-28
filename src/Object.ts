import { Maybe } from "./Maybe"

// eslint-disable-next-line @typescript-eslint/ban-types
export function keys<T extends object, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}).propertyIsEnumerable.call(o, ea)
      ) as K[])
}

export function isFunction(obj: any): obj is () => any {
  return typeof obj === "function"
}

export function fromEntries(
  arr: Maybe<[Maybe<string>, any]>[],
  obj?: any
): any {
  if (arr == null || arr.length === 0) return obj
  // don't use Object.create(null), json stringify will break!
  for (const ea of arr.filter((ea) => ea != null)) {
    if (ea != null && Array.isArray(ea)) {
      const [k, v] = ea
      // allow NULL fields:
      if (k != null && v !== undefined) {
        if (typeof obj !== "object") obj = {}
        obj[k] = v
      }
    }
  }
  return obj
}

export type Unpick<T, U> = { [P in keyof T]: P extends U ? never : T[P] }

export function omit<T extends Record<string, any>, S extends string>(
  t: T,
  ...keysToOmit: S[]
): Unpick<T, S> {
  if (t == null) return {} as any
  const result = { ...t }
  for (const ea of keysToOmit) {
    delete result[ea]
  }
  return result
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
  return Object.keys(t) as any
}
