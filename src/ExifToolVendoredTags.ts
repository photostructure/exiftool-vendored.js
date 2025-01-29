import { ErrorsAndWarnings } from "./ErrorsAndWarnings"
import { keysOf } from "./Object"

/**
 * This tags are added to {@link Tags} from this library.
 */
export interface ExifToolVendoredTags extends ErrorsAndWarnings {
  /**
   * Either an offset, like `UTC-7`, or an actual IANA timezone, like
   * `America/Los_Angeles`.
   *
   * This will be missing if we can't intuit a timezone from the metadata.
   */
  tz?: string

  /**
   * Description of where and how `tz` was extracted
   */
  tzSource?: string
}

export const ExifToolVendoredTagNames = keysOf<ExifToolVendoredTags>({
  tz: true,
  tzSource: true,
  errors: true,
  warnings: true,
})

/**
 * Is the given tag name intrinsic to the content of a given file? In other
 * words, is it not an artifact of a metadata field?
 */
export function isExifToolVendoredTag(
  name: string
): name is keyof ExifToolVendoredTags {
  return ExifToolVendoredTagNames.includes(name as keyof ExifToolVendoredTags)
}
