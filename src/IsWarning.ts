import { Maybe } from "./Maybe"
import { blank, toS } from "./String"

export interface IgnorableError {
  (err: Maybe<Error | string>): boolean
}

// This is quite lax by design: it's up to the user to check .warnings!

const WarningRE = /\bwarning: |\bnothing to (?:write|do)\b/i

/**
 * This is the default implementation of IgnorableError, and ignores null,
 * undefined, errors without a message, warnings about duplicate tags, and
 * ICC_Profile deletions.
 */
export function isWarning(err: Maybe<Error | string>): boolean {
  if (err == null) return true
  const msg = (err instanceof Error ? err.message : toS(err)).trim()
  return blank(msg) || WarningRE.test(msg)
}
