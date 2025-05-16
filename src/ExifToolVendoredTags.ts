import { ErrorsAndWarnings } from "./ErrorsAndWarnings";
import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";

/**
 * This tags are added to {@link Tags} from this library.
 */
export interface ExifToolVendoredTags extends ErrorsAndWarnings {
  /**
   * Either an offset, like `UTC-7`, or an actual IANA timezone, like
   * `America/Los_Angeles`.
   *
   * This will be missing if we can't intuit a timezone from the metadata.
   * @deprecated use `zone` instead
   */
  tz?: string;

  /**
   * The IANA timezone, like `America/Los_Angeles`, or a IANA-rendered static offset, like `UTC-7`.
   *
   * This will be missing if we can't intuit a timezone from the metadata.
   */
  zone?: string;

  /**
   * Description of where and how `tz` was extracted
   * @deprecated use `zoneSource` instead
   */
  tzSource?: string;

  /**
   * Description of where and how `zone` was extracted
   */
  zoneSource?: string;
}

export const ExifToolVendoredTagNames = strEnum(
  "tz",
  "zone",
  "tzSource",
  "zoneSource",
  "errors",
  "warnings",
) satisfies StrEnum<keyof ExifToolVendoredTags>;

export type ExifToolVendoredTagName = StrEnumKeys<
  typeof ExifToolVendoredTagNames
>;

export function isExifToolVendoredTag(
  name: string,
): name is keyof ExifToolVendoredTags {
  return ExifToolVendoredTagNames.includes(name);
}
