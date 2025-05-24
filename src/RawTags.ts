import { ErrorsAndWarnings } from "./ErrorsAndWarnings";
import { Json } from "./JSON";

/**
 * Loosely typed raw result from ExifTool
 *
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/138
 */
export type RawTags = Record<string, Json> & ErrorsAndWarnings;
