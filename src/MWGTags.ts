import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";

export interface KeywordInfoStruct {
  Hierarchy?: KeywordStruct[];
}

export interface KeywordStruct {
  Children?: KeywordStruct[];
  Keyword: string;
}

/**
 * Note: this is a partial interface: ExifTool extracts more fields from this
 * group type (but I haven't seen those in the wild).
 *
 * @see https://exiftool.org/TagNames/MWG.html#Keywords
 */
export interface MWGKeywordTags {
  KeywordInfo?: KeywordInfoStruct[];
  HierarchicalKeywords?: KeywordStruct[];
}

export interface CollectionInfo {
  CollectionName: string;
  CollectionURI: string;
}

/**
 * @see https://exiftool.org/TagNames/MWG.html#Collections
 */
export interface MWGCollectionsTags {
  Collections?: CollectionInfo[];
}

export const MWGKeywordTagNames = strEnum(
  "KeywordInfo",
  "HierarchicalKeywords",
) satisfies StrEnum<keyof MWGKeywordTags>;

export type MWGKeywordTagName = StrEnumKeys<typeof MWGKeywordTagNames>;

/**
 * Is the given tag name an MWG keyword tag?
 */
export function isMWGKeywordTag(name: string): name is keyof MWGKeywordTags {
  return MWGKeywordTagNames.includes(name);
}

export const MWGCollectionsTagNames = strEnum("Collections") satisfies StrEnum<
  keyof MWGCollectionsTags
>;

export type MWGCollectionsTagName = StrEnumKeys<typeof MWGCollectionsTagNames>;

/**
 * Is the given tag name an MWG collections tag?
 */
export function isMWGCollectionsTag(
  name: string,
): name is keyof MWGCollectionsTags {
  return MWGCollectionsTagNames.includes(name);
}
