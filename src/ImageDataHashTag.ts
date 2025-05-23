import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";

export interface ImageDataHashTag {
  /**
   * This is calculated by ExifTool to be the MD5, SHA256, or SHA512 hash of
   * just the image data, excluding metadata.
   *
   * This tag is only included if the default `ExifToolOptions.imageHashType`
   * value is overridden with a valid string value.
   *
   * @see ExifToolOptions.imageHashType
   * @see https://exiftool.org/ExifTool.html#ImageHashType
   */
  ImageDataHash?: string;
}

export const ImageDataHashTagNames = strEnum("ImageDataHash") satisfies StrEnum<
  keyof ImageDataHashTag
>;

export type ImageDataHashTagName = StrEnumKeys<typeof ImageDataHashTagNames>;
