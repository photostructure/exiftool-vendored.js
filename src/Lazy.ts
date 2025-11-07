import { toError } from "./ErrorsAndWarnings";

export type Lazy<T> = (() => T) & { clear: () => void };

export function lazy<T>(thunk: () => T): Lazy<T> {
  let invoked = false;
  let result: T;
  let error: Error;
  const f = () => {
    if (!invoked) {
      try {
        invoked = true;
        result = thunk();
      } catch (e: unknown) {
        error = toError(e);
        throw e;
      }
    }
    if (error != null) throw error;
    return result;
  };
  f.clear = () => {
    invoked = false;
    result = undefined as unknown as T;
    error = undefined as unknown as Error;
  };
  return f as Lazy<T>;
}
