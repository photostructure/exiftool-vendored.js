import { DefinedOrNullValued } from "./Defined";
import { ErrorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ResourceEvent } from "./ResourceEvent";
import { ShortcutTags } from "./ShortcutTags";
import { ExifToolTags, FileTags, Tags } from "./Tags";
import { Version } from "./Version";

export interface StructAppendTags {
  /**
   * Use this to **append** to existing History records.
   */
  "History+"?: ResourceEvent | ResourceEvent[];
  /**
   * Use this to **append** to existing Version records.
   */
  "Versions+"?: Version | Version[];
}

export type AdditionalWriteTags = {
  "Orientation#"?: number;
};

/**
 * Tags, minus the ExifToolTags, FileTags, and ErrorsAndWarnings, all of which
 * aren't writable.
 *
 * Note that this contains (many!) additional non-mutable fields--please check
 * the ExifTool documentation to see which fields from which groups are
 * writable for your given file type.
 */
export type MutableTags = Omit<
  Tags,
  keyof (ExifToolTags & FileTags & ErrorsAndWarnings)
>;

// exiftool expects numeric tags to be numbers, but everything else is a string:
export type ExpandedDateTags = {
  [K in keyof MutableTags]:
    | (MutableTags[K] extends ExifDateTime
        ? ExifDate | ExifDateTime
        : MutableTags[K])
    | string;
};

// ExifTool allows these to be numeric, and then it figures out the correct
// "east", "west", "north", "south" values:
export type WritableGPSRefs = {
  GPSAltitudeRef?: string | number | null;
  GPSLatitudeRef?: string | number | null;
  GPSLongitudeRef?: string | number | null;
};

export type WriteTags = Omit<
  DefinedOrNullValued<
    ShortcutTags & AdditionalWriteTags & ExpandedDateTags & StructAppendTags
  >,
  keyof WritableGPSRefs
> &
  WritableGPSRefs;
