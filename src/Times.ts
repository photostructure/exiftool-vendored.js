export function times<T>(n: number, f: (idx: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => f(i))
}
