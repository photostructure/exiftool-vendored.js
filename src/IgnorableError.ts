import { Maybe } from "./Maybe"
import { blank, toS } from "./String"

export interface IgnorableError {
  (err: Maybe<Error | string>): boolean
}

// Warning: Duplicate MakerNoteUnknown tag in ExifIFD
// Warning: ICC_Profile deleted. Image colors may be affected

const WarningRE = /^Warning: (?:Duplicate|ICC_Profile deleted)/i
/**
 * This is the default implementation of IgnorableError, and ignores null,
 * undefined, errors without a message, warnings about duplicate tags, and
 * ICC_Profile deletions.
 */
export function isIgnorableWarning(err: Maybe<Error | string>): boolean {
  const msg = (err instanceof Error ? err.message : toS(err)).trim()
  return blank(msg) || null != WarningRE.exec(msg)
}
