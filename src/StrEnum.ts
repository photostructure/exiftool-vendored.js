import { Maybe, Nullable } from "./Maybe";
import { fromEntries } from "./Object";

// See https://basarat.gitbooks.io/typescript/content/docs/types/literal-types.html

export type StrEnumType<T extends string> = {
  [K in T]: K;
};

export type StrEnumHelpers<T extends string> = {
  values: T[];
  length: number;
  /** synonym for includes */
  has(s: Nullable<string>): s is T;
  includes(s: Nullable<string>): s is T;
  getCI(s: Nullable<string>): Maybe<T>;
  pick<O extends T>(...t: O[]): Extract<T, O>[];
  omit<O extends T>(...t: O[]): Exclude<T, O>[];
  indexOf(s: Nullable<string>): Maybe<number>;
  ordinal(s: Nullable<string>): number;
  /** synonym for getCI */
  toValid(s: Nullable<string>): Maybe<T>;
  /** @return the first value in arr that getCI returns a non-null value for */
  firstValid(...arr: Nullable<string>[]): Maybe<T>;
  mapValid<R>(s: Nullable<string>, f: (t: T) => R): Maybe<R>;
  cmp(a: Nullable<string>, b: Nullable<string>): Maybe<number>;
  lt(a: T, b: T): boolean;
  next(s: Nullable<string>): Maybe<T>;
  /**
   * @return a new StrEnum with the values in reverse order.
   *
   * (This follows the new "toReversed" ES2023 naming convention for methods that return a new object)
   */
  toReversed(): StrEnum<T>;
};

export type StrEnum<T extends string> = StrEnumType<T> & StrEnumHelpers<T>;

export type StrEnumKeys<Type> = Type extends StrEnum<infer X> ? X : never;

function lessThan(a: Maybe<number>, b: Maybe<number>) {
  return a == null || b == null ? false : a < b;
}

export function strEnum<T extends string>(...o: T[]): StrEnum<T> {
  const values = Object.freeze(o) as T[];
  // toLowerCase() is safe because we know all strEnum values are latin ASCII:
  const lcToValue = new Map<string, T>(
    values.map((ea) => [ea.toLowerCase(), ea]),
  );
  const valueToIndex = fromEntries(
    values.map((ea, idx) => [ea as string, idx]),
  );

  const dict: StrEnumType<T> = {} as any;
  for (const ea of values) {
    dict[ea] = ea;
  }

  // toLowerCase() is safe because we know all strEnum values are latin ASCII:
  const getCI = (s: Nullable<string>) =>
    s == null ? undefined : lcToValue.get(s?.toLowerCase());

  const indexOf = (s: Nullable<string>) =>
    s != null ? valueToIndex[s] : undefined;

  const ordinal = (s: Nullable<string>) => indexOf(s) ?? values.length;

  const includes = (s: Nullable<string>): s is T => indexOf(s) != null;

  const pick = (...t: T[]) => values.filter((ea) => t.includes(ea)) as any;

  const omit = (...t: T[]) => values.filter((ea) => !t.includes(ea)) as any;

  const toValid = (s: Nullable<string>): Maybe<T> =>
    s == null ? undefined : includes(s) ? s : getCI(s);

  const firstValid = (...s: Nullable<string>[]): Maybe<T> => {
    for (const ea of s) {
      const v = toValid(ea);
      if (v != null) return v;
    }
    return;
  };

  const mapValid = <R>(s: Nullable<string>, f: (t: T) => R) =>
    includes(s) ? f(s as T) : undefined;

  const cmp = (a: Nullable<string>, b: Nullable<string>) => {
    const a_ = indexOf(a);
    const b_ = indexOf(b);
    return a_ == null || b_ == null
      ? undefined
      : a_ > b_
        ? 1
        : a_ < b_
          ? -1
          : 0;
  };

  const lt = (a: T, b: T) => lessThan(indexOf(a), indexOf(b));

  const next = (s: Nullable<string>) => {
    const i = indexOf(s);
    return i == null ? undefined : values[i];
  };

  const toReversed = () => strEnum(...[...values].reverse());

  return {
    ...dict,
    values,
    length: values.length,
    has: includes, // alias for includes
    includes,
    getCI,
    pick,
    omit,
    indexOf,
    ordinal,
    toValid,
    firstValid,
    mapValid,
    cmp,
    lt,
    next,
    toReversed,
  };
}

// Example usage:

export const Directions = strEnum("North", "South", "East", "West");
export type Direction = StrEnumKeys<typeof Directions>;
