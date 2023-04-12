import {
  AdditionalWriteTags,
  DefinedOrNullValued,
  ExpandedDateTags,
  ShortcutTags,
  StructAppendTags,
} from "./ExifTool"

export type WriteTags = DefinedOrNullValued<
  ShortcutTags & AdditionalWriteTags & ExpandedDateTags & StructAppendTags
>
