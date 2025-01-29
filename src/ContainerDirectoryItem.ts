/**
 * Found in newer Android Motion Photos
 *
 * @see https://github.com/photostructure/exiftool-vendored.js/pull/189
 */
export interface ContainerDirectoryItem {
  Item: {
    Length?: number;
    Mime?: string;
    Padding?: number;
    Semantic?: string;
  };
}
