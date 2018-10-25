export type Maybe<T> = T | undefined
export type MaybeNull<T> = Maybe<T> | null

export function map<T, U>(maybeT: Maybe<T>, f: (t: T) => U): Maybe<U> {
  return maybeT == null ? undefined : f(maybeT)
}
