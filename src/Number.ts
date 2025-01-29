import { Maybe } from "./Maybe";

export function isNumber(n: unknown): n is number {
  return typeof n === "number" && isFinite(n);
}

export function isInteger(n: unknown): n is number {
  return isNumber(n) && Number.isInteger(n);
}

export function isFloat(n: unknown): n is number {
  return isNumber(n) && !Number.isInteger(n);
}

export function toFloat(n: unknown): Maybe<number> {
  if (n == null) return;
  if (isNumber(n)) return n;
  try {
    const f = parseFloat(String(n).trim());
    return isNumber(f) ? f : undefined;
  } catch {
    return undefined;
  }
}

export function toInt(n: unknown): Maybe<number> {
  if (n == null) return;
  if (isNumber(n)) {
    // we don't round here, because parsing floats also doesn't round.
    return Math.floor(n);
  }
  try {
    return parseInt(String(n).trim());
  } catch {
    return undefined;
  }
}

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to round
 * @param precision - The number of decimal places to retain
 * @returns The rounded number with specified precision
 *
 * @example
 * roundToDecimalPlaces(3.14159, 2) // Returns 3.14
 * roundToDecimalPlaces(123.456789, 3) // Returns 123.457
 * roundToDecimalPlaces(0.0001234, 4) // Returns 0.0001
 */
export function roundToDecimalPlaces(value: number, precision: number): number {
  // Handle edge cases
  if (!isNumber(value)) throw new Error("Value must be a number");
  if (precision < 0) throw new Error("Precision must be non-negative");
  if (value === 0) return 0;

  const multiplier = Math.pow(10, precision);

  return Math.abs(value) < Number.EPSILON
    ? 0
    : Math.round(value * multiplier) / multiplier;
}
