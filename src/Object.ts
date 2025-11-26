import { Nullable } from "./Maybe";
/**
 * Type guard that checks if a value is a non-null, non-array object.
 *
 * @param obj - The value to check
 * @returns `true` if `obj` is a plain object (not null, not an array)
 */
export function isObject(obj: unknown): obj is object {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}

/**
 * Returns an array of own enumerable string keys from an object.
 *
 * Unlike `Object.keys`, this filters to only own enumerable properties and
 * returns an empty array for null/undefined inputs.
 *
 * @param o - The object to extract keys from
 * @returns Array of own enumerable string keys, or empty array if `o` is nullish
 */
export function keys<T extends object, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}).propertyIsEnumerable.call(o, ea),
      ) as K[]);
}

/**
 * Type guard that checks if a value is a function.
 *
 * @param obj - The value to check
 * @returns `true` if `obj` is a function
 */
export function isFunction(
  obj: unknown,
): obj is (...args: unknown[]) => unknown {
  return typeof obj === "function";
}

/**
 * Turns an array of `[key, value]` pairs into an object.
 *
 *  - Pairs whose key is `null | undefined` **or** value is `undefined` are skipped.
 *  - If `base` is provided it is mutated and returned (handy for “extend” use‑cases).
 */
export function fromEntries<K extends PropertyKey, V = unknown>(
  pairs: Nullable<Nullable<[Nullable<K>, V]>[]>,
  base: Record<K, V> = {} as Record<K, V>,
): Record<K, V> {
  // don't use Object.create(null), json stringify will break!
  if (pairs == null || pairs.length === 0) return base ?? ({} as Record<K, V>);

  for (const pair of pairs) {
    if (pair?.[0] != null && pair[1] !== undefined) {
      base[pair[0] as K] = pair[1] as V;
    }
  }
  return base;
}

/**
 * Utility type that removes specified keys from a type by setting their values to `never`.
 *
 * @typeParam T - The source object type
 * @typeParam U - The keys to exclude
 */
export type Unpick<T, U> = { [P in keyof T]: P extends U ? never : T[P] };

/**
 * Returns a shallow copy of an object with the specified keys omitted.
 *
 * @param t - The source object
 * @param keysToOmit - Keys to exclude from the result
 * @returns A new object without the specified keys
 */
export function omit<T extends object, S extends string>(
  t: T,
  ...keysToOmit: S[]
): Unpick<T, S> {
  const result = {} as T;
  for (const k of keys(t).filter(
    (ea) => !(keysToOmit as string[]).includes(ea),
  ) as (keyof T)[]) {
    result[k] = t[k];
  }
  return result as Unpick<T, S>;
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
  return Object.keys(t) as (keyof T)[];
}

// This also doesn't enforce that all keys are present:

// type RequiredKeys<T> = { [K in keyof Required<T>]: K } extends { [K: string]: infer U } ? U[] : never;
