import { keysOf } from "./Object"
import { FileTags } from "./Tags"

const FileTagNames = keysOf<FileTags>({
  BMPVersion: true,
  BitsPerSample: true,
  ColorComponents: true,
  CurrentIPTCDigest: true,
  Directory: true,
  EncodingProcess: true,
  ExifByteOrder: true,
  FileAccessDate: true,
  FileCreateDate: true,
  FileInodeChangeDate: true,
  FileModifyDate: true,
  FileName: true,
  FilePermissions: true,
  FileSize: true,
  FileType: true,
  FileTypeExtension: true,
  ImageDataMD5: true,
  ImageHeight: true,
  ImageWidth: true,
  MIMEType: true,
  NumColors: true,
  NumImportantColors: true,
  PixelsPerMeterX: true,
  PixelsPerMeterY: true,
  Planes: true,
  YCbCrSubSampling: true,
})

/**
 * Is the given tag name intrinsic to the content of a given file? In other
 * words, is it not an artifact of a metadata field?
 */
export function isFileTag(name: string): name is keyof FileTags {
  return FileTagNames.includes(name as any)
}
