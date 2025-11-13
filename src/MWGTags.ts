import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";

// ---- Keywords ----

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

export const MWGKeywordTagNames = strEnum(
  "KeywordInfo",
  "HierarchicalKeywords",
) satisfies StrEnum<keyof MWGKeywordTags>;
export type MWGKeywordTagName = StrEnumKeys<typeof MWGKeywordTagNames>;

// Assert that the tag names enum exactly matches the keys of the interface:
declare const _: Expect<Equal<MWGKeywordTagName, keyof MWGKeywordTags>>;

// ---- Collections ----

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

export const MWGCollectionsTagNames = strEnum("Collections") satisfies StrEnum<
  keyof MWGCollectionsTags
>;
export type MWGCollectionsTagName = StrEnumKeys<typeof MWGCollectionsTagNames>;

// Assert that the tag names enum exactly matches the keys of the interface:
declare const __: Expect<
  Equal<MWGCollectionsTagName, keyof MWGCollectionsTags>
>;
