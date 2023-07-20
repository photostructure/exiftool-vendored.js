export function times<T>(n: number, f: (idx: number) => T): T[] {
  return Array(n)
    .fill(undefined)
    .map((_, i) => f(i))
}
