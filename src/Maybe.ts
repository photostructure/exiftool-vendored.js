export type Maybe<T> = T | undefined;
export type Nullable<T> = T | undefined | null;
export type MaybeNull<T> = Nullable<T>; // for backwards compatibility

export function map<T, U>(maybeT: Nullable<T>, f: (t: T) => U): Maybe<U> {
  return maybeT == null ? undefined : f(maybeT);
}

export function map2<A, B, U>(
  a: Nullable<A>,
  b: Nullable<B>,
  f: (a: A, b: B) => U,
): Maybe<U> {
  return a == null || b == null ? undefined : f(a, b);
}

export function first<T, U>(
  iter: Iterable<Maybe<T>>,
  f: (t: T) => Maybe<U>,
): Maybe<U> {
  for (const t of iter) {
    if (t != null) {
      const v = f(t);
      if (v != null) return v;
    }
  }
  return;
}

export function firstDefinedThunk<T>(iter: Iterable<() => Maybe<T>>): Maybe<T> {
  for (const f of iter) {
    const result = f();
    if (result != null) return result;
  }
  return;
}

/**
 * Convert functions that return `type | null` to `type | undefined`
 */
export function denull<T>(t: T | null): Maybe<T> {
  return t == null ? undefined : t;
}
