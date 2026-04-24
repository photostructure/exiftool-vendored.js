/**
 * Tag name grammar accepted by ExifTool.
 *
 * Legitimate references include:
 *   Artist
 *   XMP-dc:Title
 *   IPTC:By-line
 *   QuickTime:Keys:DateTimeOriginal
 *   *Duration*        (glob, see numericTags defaults)
 *   ?mm               (glob)
 *   Orientation#      (force numeric on write)
 *   History+          (list append)
 *   Versions+         (list append)
 *
 * Allowed characters: letters, digits, `:`, `-`, `_`, `*`, `?`, `+`, `#`.
 * First character may not be `-` — that would be ambiguous with an exiftool
 * flag (the interpolation site prefixes its own `-`).
 *
 * See https://exiftool.org/TagNames/ and https://exiftool.org/exiftool_pod.html
 */
const ValidTagNameRE = /^[A-Za-z0-9_:*?+#][A-Za-z0-9_:\-*?+#]*$/;

/**
 * Throw if `name` is not a safe ExifTool tag reference.
 *
 * Because exiftool is launched with `-stay_open True -@ -` and commands are
 * delimited by newlines, any `\n`, `\r`, `\0`, whitespace, or shell/exiftool
 * metacharacter inside a tag name would let a caller inject arbitrary
 * arguments into the exiftool process (e.g. `-o ../exploit`, `-p /etc/passwd`).
 *
 * This validator is applied at every site where a caller-supplied tag name is
 * interpolated into an exiftool argument.
 */
export function validateTagName(name: string, context = "tag name"): void {
  if (typeof name !== "string" || !ValidTagNameRE.test(name)) {
    throw new Error(
      `Invalid ${context}: ${JSON.stringify(name)}. ` +
        `Tag names must match ${ValidTagNameRE}.`,
    );
  }
}
