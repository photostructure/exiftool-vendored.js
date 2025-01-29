import { isWin32 } from "./IsWin32";

/**
 * Tells ExifTool to handle UTF-8-encoded filenames on Windows.
 *
 * Without this setting, non-latin filename characters on Windows won't be
 * encoded correctly, and the file will be erroneously reported as not
 * existing.
 *
 * This setting isn't necessary on non-Windows platforms, nor on Windows
 * machines that have been configured to use UTF-8, but it doesn't hurt
 * anything to include this option.
 *
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/124
 * @see https://exiftool.org/exiftool_pod.html#WINDOWS-UNICODE-FILE-NAMES
 * @see https://exiftool.org/faq.html#Q10
 */
export const Utf8FilenameCharsetArgs = isWin32()
  ? ["-charset", "filename=utf8"]
  : [];
