export function lazy<T>(thunk: () => T): () => T {
  let invoked = false
  let result: T
  return () => {
    if (!invoked) {
      try {
        invoked = true
        result = thunk()
      } catch (_) {}
    }
    return result
  }
}
