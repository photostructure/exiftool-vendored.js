export function pick<T, K extends keyof T>(
  obj: T,
  ...keyNames: K[]
): Pick<T, K> {
  if (obj == null) return obj
  const result = {} as any
  for (const key of keyNames) {
    const v = obj[key]
    if (v !== undefined) result[key] = obj[key]
  }
  return result
}
