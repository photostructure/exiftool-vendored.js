/* eslint-disable @typescript-eslint/no-explicit-any */

import { keysOf } from "./Object"
import { ExifToolTags } from "./Tags"

export const ExifToolTagNames = keysOf<ExifToolTags>({
  ExifToolVersion: true,
  SourceFile: true,
  Error: true,
  Warning: true,
})

/**
 * Is the given tag name intrinsic to the content of a given file? In other
 * words, is it not an artifact of a metadata field?
 */
export function isExifToolTag(name: string): name is keyof ExifToolTags {
  return ExifToolTagNames.includes(name as any)
}
