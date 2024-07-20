export interface ImageDataHashTag {
  /**
   * This is calculated by ExifTool to be the MD5, SHA256, or SHA512 hash of
   * just the image data, excluding metadata. 
   *
   * This tag is only included if the default `ExifToolOptions.imageHashType`
   * value is overridden with a valid string value.
   *
   * @see ExifToolOptions.imageHashType
   */
  ImageDataHash?: string
}
