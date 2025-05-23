import { Nullable } from "./Maybe";

export function isObject(obj: unknown): obj is object {
  return typeof obj === "object" && obj !== null;
}

export function keys<T extends object, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}).propertyIsEnumerable.call(o, ea),
      ) as K[]);
}

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
  if (pairs == null || pairs.length === 0) return base ?? {};

  for (const pair of pairs) {
    if (pair != null && pair[0] != null && pair[1] !== undefined) {
      base[pair[0] as K] = pair[1] as V;
    }
  }
  return base;
}

export type Unpick<T, U> = { [P in keyof T]: P extends U ? never : T[P] };

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
