import { uniq } from "./Array";
import { Maybe, Nullable } from "./Maybe";
import { fromEntries } from "./Object";

// See https://basarat.gitbooks.io/typescript/content/docs/types/literal-types.html

export type StrEnumType<T extends string> = {
  [K in T]: K;
};

/**
 * Helper methods and properties for string enum types created with {@link strEnum}.
 *
 * Provides type-safe utilities for working with predefined string literal types,
 * including validation, comparison, and transformation operations.
 *
 * @template T - The union of string literals that make up this enum
 */
export type StrEnumHelpers<T extends string> = {
  /** Array of all valid enum values in declaration order */
  values: T[];

  /** Number of enum values */
  length: number;

  /**
   * Synonym for {@link includes}. Checks if a string is a valid enum value.
   * @param s - String to check (can be null/undefined)
   * @returns Type predicate indicating if s is a valid enum value
   */
  has(s: Nullable<string>): s is T;

  /**
   * Type-safe check if a string is a valid enum value (case-sensitive).
   * @param s - String to check (can be null/undefined)
   * @returns Type predicate indicating if s is a valid enum value
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.includes("red") // true
   * Colors.includes("RED") // false
   */
  includes(s: Nullable<string>): s is T;

  /**
   * Get enum value with case-insensitive matching.
   * @param s - String to match (can be null/undefined)
   * @returns Matching enum value or undefined if no match
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.getCI("RED") // "red"
   * Colors.getCI("purple") // undefined
   */
  getCI(s: Nullable<string>): Maybe<T>;

  /**
   * Create a new array containing only the specified enum values.
   * @param t - Enum values to include
   * @returns Array of specified enum values
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.pick("red", "blue") // ["red", "blue"]
   */
  pick<O extends T>(...t: O[]): Extract<T, O>[];

  /**
   * Create a new array containing all enum values except the specified ones.
   * @param t - Enum values to exclude
   * @returns Array of remaining enum values
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.omit("green") // ["red", "blue"]
   */
  omit<O extends T>(...t: O[]): Exclude<T, O>[];

  /**
   * Get the zero-based index of an enum value.
   * @param s - Enum value to find (can be null/undefined)
   * @returns Index of the value or undefined if not found
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.indexOf("green") // 1
   * Colors.indexOf("purple") // undefined
   */
  indexOf(s: Nullable<string>): Maybe<number>;

  /**
   * Get the ordinal position of an enum value, or length if not found.
   * Useful for sorting where invalid values should sort last.
   * @param s - Enum value to find (can be null/undefined)
   * @returns Index of the value, or enum length if not found
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.ordinal("green") // 1
   * Colors.ordinal("purple") // 3 (length)
   */
  ordinal(s: Nullable<string>): number;

  /**
   * Synonym for {@link getCI}. Get enum value with case-insensitive matching.
   * @param s - String to validate (can be null/undefined)
   * @returns Valid enum value or undefined if no match
   */
  toValid(s: Nullable<string>): Maybe<T>;

  /**
   * Find the first valid enum value from a list of candidates.
   * @param arr - Array of potential enum values to check
   * @returns First valid enum value found, or undefined if none match
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.firstValid("purple", "GREEN", "red") // "green" (case-insensitive match)
   */
  firstValid(...arr: Nullable<string>[]): Maybe<T>;

  /**
   * Apply a function to a string if it's a valid enum value.
   * @param s - String to check and potentially transform
   * @param f - Function to apply if s is a valid enum value
   * @returns Result of function application, or undefined if s is invalid
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.mapValid("red", color => color.toUpperCase()) // "RED"
   * Colors.mapValid("purple", color => color.toUpperCase()) // undefined
   */
  mapValid<R>(s: Nullable<string>, f: (t: T) => R): Maybe<R>;

  /**
   * Compare two strings based on their enum order.
   * @param a - First string to compare
   * @param b - Second string to compare
   * @returns -1 if a < b, 0 if a === b, 1 if a > b, undefined if either is invalid
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.cmp("red", "green") // -1 (red comes before green)
   * Colors.cmp("blue", "red") // 1 (blue comes after red)
   */
  cmp(a: Nullable<string>, b: Nullable<string>): Maybe<number>;

  /**
   * Check if first enum value comes before second in declaration order.
   * @param a - First enum value
   * @param b - Second enum value
   * @returns True if a comes before b in the enum declaration
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.lt("red", "green") // true
   * Colors.lt("green", "red") // false
   */
  lt(a: T, b: T): boolean;

  /**
   * Get the next enum value in declaration order.
   * @param s - Current enum value
   * @returns Next enum value, or undefined if s is the last value or invalid
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Colors.next("red") // "green"
   * Colors.next("blue") // undefined (no next value)
   */
  next(s: Nullable<string>): Maybe<T>;

  /**
   * Create a new StrEnum with the values in reverse order.
   *
   * (This follows the new "toReversed" ES2023 naming convention for methods that return a new object)
   * @returns New StrEnum with values in reverse declaration order
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * const Reversed = Colors.toReversed();
   * Reversed.values // ["blue", "green", "red"]
   */
  toReversed(): StrEnum<T>;

  /**
   * Makes the StrEnum iterable, allowing use in for...of loops and array destructuring.
   * @returns Iterator that yields enum values in declaration order
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * for (const color of Colors) {
   *   console.log(color); // "red", "green", "blue"
   * }
   * const [first, second] = Colors; // first="red", second="green"
   */
  [Symbol.iterator](): IterableIterator<T>;

  /**
   * String tag used by Object.prototype.toString() for better debugging.
   * @example
   * const Colors = strEnum("red", "green", "blue");
   * Object.prototype.toString.call(Colors) // "[object StrEnum]"
   */
  [Symbol.toStringTag]: "StrEnum";
};

export type StrEnum<T extends string> = StrEnumType<T> & StrEnumHelpers<T>;

export type StrEnumKeys<Type> = Type extends StrEnum<infer X> ? X : never;

function lessThan(a: Maybe<number>, b: Maybe<number>) {
  return a == null || b == null ? false : a < b;
}

export function strEnum<T extends string>(...o: T[]): StrEnum<T> {
  const values = Object.freeze(uniq(o)) as T[];
  // toLowerCase() is safe because we know all strEnum values are latin ASCII:
  const lcToValue = new Map<string, T>(
    values.map((ea) => [ea.toLowerCase(), ea]),
  );
  const valueToIndex = fromEntries(
    values.map((ea, idx) => [ea as string, idx]),
  );

  const dict: StrEnumType<T> = {} as StrEnumType<T>;
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

  const pick = <O extends T>(...t: O[]): Extract<T, O>[] =>
    values.filter((ea): ea is Extract<T, O> => t.includes(ea as O));

  const omit = <O extends T>(...t: O[]): Exclude<T, O>[] =>
    values.filter((ea): ea is Exclude<T, O> => !t.includes(ea as O));

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
    [Symbol.iterator]: () => values[Symbol.iterator](),
    [Symbol.toStringTag]: "StrEnum",
  };
}

// Example usage:

export const Directions = strEnum("North", "South", "East", "West");
export type Direction = StrEnumKeys<typeof Directions>;
