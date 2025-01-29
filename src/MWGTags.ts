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
