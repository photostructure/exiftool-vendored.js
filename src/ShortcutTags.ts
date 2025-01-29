/**
 * @see https://exiftool.org/TagNames/Shortcuts.html
 */

export interface ShortcutTags {
  /**
   * Shortcut for writing the "common EXIF date/time tags": `DateTimeOriginal`,
   * `CreateDate`, and `ModifyDate` tags.
   *
   * Only used by `write`. This tag is not returned by `read`.
   */
  AllDates?: string;
}
