import { Maybe } from "./Maybe"
import { blank, toS } from "./String"

export interface IgnorableError {
  (err: Maybe<Error | string>): boolean
}

// These are ignorable:
// Warning: Duplicate MakerNoteUnknown tag in ExifIFD

// These are not:
// Warning: Tag 'INVALID_TAG_NAME' is not defined

const WarningRE =
  /^warning: duplicate \w+ tag|^error: nothing to write|^nothing to do|^warning: icc_profile deleted/i
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
