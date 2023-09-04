export interface ImageDataHashTag {
  /**
   * This is calculated by ExifTool to be the SHA256 hash of the image data
   * (ignoring metadata). This tag is only included if the default
   * `ExifToolOptions.imageHashType` value is overridden with a valid string
   * value.
   *
   * @see ExifToolOptions.imageHashType
   */
  ImageDataHash?: string
}
