export function lazy<T>(thunk: () => T): () => T {
  let invoked = false
  let result: T
  let error: Error
  return () => {
    if (!invoked) {
      try {
        invoked = true
        result = thunk()
      } catch (e: any) {
        error = e
        throw e
      }
    }
    if (error != null) throw error
    return result
  }
}
