/**
 * Generates an array by running a function n times
 * @param n The number of times to run the function
 * @param fn The function to generate each element
 * @returns An array containing the results
 */
export function times<T>(n: number, f: (idx: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => f(i));
}
