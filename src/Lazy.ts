import { toError } from "./ErrorsAndWarnings"

export function lazy<T>(thunk: () => T): () => T {
  let invoked = false
  let result: T
  let error: Error
  return () => {
    if (!invoked) {
      try {
        invoked = true
        result = thunk()
      } catch (e: unknown) {
        error = toError(e)
        throw e
      }
    }
    if (error != null) throw error
    return result
  }
}
