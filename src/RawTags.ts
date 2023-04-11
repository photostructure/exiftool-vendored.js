type Literal = string | number | boolean

type Json = Literal | { [key: string]: Json } | Json[]

/**
 * Loosely typed raw result from ExifTool
 *
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/138
 */
export type RawTags = Record<string, Json>
