import { BinaryField } from "./BinaryField";
import { ContainerDirectoryItem } from "./ContainerDirectoryItem";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import {
  ExifToolVendoredTagNames,
  ExifToolVendoredTags,
} from "./ExifToolVendoredTags";
import { GeolocationTagNames, GeolocationTags } from "./GeolocationTags";
import { ICCProfileTagNames, ICCProfileTags } from "./ICCProfileTags";
import { ImageDataHashTag, ImageDataHashTagNames } from "./ImageDataHashTag";
import {
  IPTCApplicationRecordTagNames,
  IPTCApplicationRecordTags,
} from "./IPTCApplicationRecordTags";
import {
  MWGCollectionsTagNames,
  MWGCollectionsTags,
  MWGKeywordTagNames,
  MWGKeywordTags,
} from "./MWGTags";
import { ResourceEvent } from "./ResourceEvent";
import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";
import { Struct } from "./Struct";
import { Version } from "./Version";

/**
 * These tags are added by `exiftool`.
 */
export interface ExifToolTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups ExifTool
   * @example "File is empty"
   */
  Error?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups ExifTool
   * @example 13.38
   */
  ExifToolVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups ExifTool
   * @example "path/to/file.jpg"
   */
  SourceFile?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups ExifTool
   * @example "Unrecognized IPTC record 0 (ignored)"
   */
  Warning?: string;
}

export const ExifToolTagsNames = strEnum(
  "Error",
  "ExifToolVersion",
  "SourceFile",
  "Warning",
) satisfies StrEnum<keyof ExifToolTags>;

export type ExifToolTag = StrEnumKeys<typeof ExifToolTagsNames>;

/**
 * These tags are not metadata fields, but are intrinsic to the content of a
 * given file. ExifTool can't write to many of these tags.
 */
export interface FileTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File, MakerNotes, QuickTime
   * @example 8
   */
  BitDepth?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example "Windows V3"
   */
  BMPVersion?: string;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, File
   * @example 3
   */
  ColorComponents?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups File, XMP
   * @example "This is a comment."
   */
  Comment?: string;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, File, MakerNotes, XMP
   * @example "Unknown (1536)"
   */
  Compression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups File
   * @example "ff5cfd18caabb797e0a7a4bb378cde2f"
   */
  CurrentIPTCDigest?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "/home/username/pictures"
   */
  Directory?: string;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups File
   * @example "Progressive DCT, Huffman coding"
   */
  EncodingProcess?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups File
   * @example "Little-endian (Intel, II)"
   */
  ExifByteOrder?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "2025:09:30 18:49:48Z"
   */
  FileAccessDate?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups File
   * @example
   */
  FileCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "2025:09:27 03:22:18Z"
   */
  FileInodeChangeDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "2025:07:28 20:25:01Z"
   */
  FileModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "zv_e10m2.jpg"
   */
  FileName?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "-rwxrwxr-x"
   */
  FilePermissions?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "990 bytes"
   */
  FileSize?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "RW2"
   */
  FileType?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "rw2"
   */
  FileTypeExtension?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups File
   * @example
   */
  ImageDataMD5?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File, XMP
   * @example 4048
   */
  ImageLength?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups File
   * @example "video/x-msvideo"
   */
  MIMEType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example "Use BitDepth"
   */
  NumColors?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example "All"
   */
  NumImportantColors?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example 0
   */
  PixelsPerMeterX?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example 0
   */
  PixelsPerMeterY?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File
   * @example 1
   */
  Planes?: number;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, File
   * @example "YCbCr4:4:4 (1 1)"
   */
  YCbCrSubSampling?: string;
}

export const FileTagsNames = strEnum(
  "BitDepth",
  "BitsPerSample",
  "BMPVersion",
  "ColorComponents",
  "Comment",
  "Compression",
  "CurrentIPTCDigest",
  "Directory",
  "EncodingProcess",
  "ExifByteOrder",
  "FileAccessDate",
  "FileCreateDate",
  "FileInodeChangeDate",
  "FileModifyDate",
  "FileName",
  "FilePermissions",
  "FileSize",
  "FileType",
  "FileTypeExtension",
  "ImageDataMD5",
  "ImageHeight",
  "ImageLength",
  "ImageWidth",
  "MIMEType",
  "NumColors",
  "NumImportantColors",
  "PixelsPerMeterX",
  "PixelsPerMeterY",
  "Planes",
  "PreviewImage",
  "YCbCrSubSampling",
) satisfies StrEnum<keyof FileTags>;

export type FileTag = StrEnumKeys<typeof FileTagsNames>;

/**
 * These are tags are derived from the values of one or more other tags.
 * Only a few are writable directly.
 * @see https://exiftool.org/TagNames/Composite.html
 */
export interface CompositeTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite
   * @example "Unknown (49 5)"
   */
  AdvancedSceneMode?: string;
  /**
   * @frequency 🔥 ★★★★ (85%)
   * @groups APP, Composite, MakerNotes
   * @example 90
   */
  Aperture?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite
   * @example "On"
   */
  AutoFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite
   * @example "8.82 Mbps"
   */
  AvgBitrate?: number | string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups Composite, MakerNotes
   * @example 46
   */
  BlueBalance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite, EXIF
   * @example "[Red,Green][Green,Blue]"
   */
  CFAPattern?: string;
  /**
   * @frequency 🔥 ★★★★ (54%)
   * @groups Composite
   * @example "1.030 mm"
   */
  CircleOfConfusion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite
   * @example 0
   */
  ConditionalFEC?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite
   * @example "On"
   */
  ContrastDetectAF?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, IPTC, XMP
   * @example "2025:06:11"
   */
  DateCreated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, IPTC
   * @example "2025:06:11 11:07:41-08:00"
   */
  DateTimeCreated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite
   * @example "2025:02:19 17:21:26+00:00"
   */
  DigitalCreationDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★☆ (25%)
   * @groups APP, Composite, MakerNotes
   * @example "undef.0"
   */
  DigitalZoom?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups Composite
   * @example "inf (9.66 m - inf)"
   */
  DOF?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups Composite, MakerNotes
   * @example "Video; n/a; Shutter Button; Video"
   */
  DriveMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, MakerNotes, QuickTime, XMP
   * @example 9.5095
   */
  Duration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite, MakerNotes
   * @example "Not attached"
   */
  ExtenderStatus?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups Composite, MakerNotes
   * @example "986-8698"
   */
  FileNumber?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, MakerNotes
   * @example "Optional,TTL"
   */
  FlashType?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups APP, Composite, MakerNotes, XMP
   * @example "inf"
   */
  FocusDistance?: string;
  /**
   * @frequency 🔥 ★★★★ (54%)
   * @groups Composite
   * @example "97.7 deg"
   */
  FOV?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups APP, Composite, EXIF, XMP
   * @example 99.8
   */
  GPSAltitude?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite, EXIF, XMP
   * @example "Unknown (Sea level reference)"
   */
  GPSAltitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, XMP
   * @example "2025:06:24 22:24:43Z"
   */
  GPSDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, EXIF
   * @example "43 deg 37' 59.61" N"
   */
  GPSDestLatitude?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, EXIF
   * @example "80 deg 23' 16.31" W"
   */
  GPSDestLongitude?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 48.857748
   */
  GPSLatitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF
   * @example "Unknown ()"
   */
  GPSLatitudeRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 2.2918888
   */
  GPSLongitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF, XMP
   * @example "West"
   */
  GPSLongitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite
   * @example "7.196465 134.376806666667"
   */
  GPSPosition?: string;
  /**
   * @frequency 🔥 ★★★★ (54%)
   * @groups Composite
   * @example "Inf m"
   */
  HyperfocalDistance?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, Composite
   * @example "9728x6656"
   */
  ImageSize?: number | string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (91%)
   * @groups Composite, EXIF, MakerNotes, XMP
   * @example 993
   */
  ISO?: number;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  Lens?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups Composite
   * @example "9.2 - 92.0 mm (35 mm equivalent: 24.9 - 248.8 mm)"
   */
  Lens35efl?: string;
  /**
   * @frequency 🔥 ★★★☆ (22%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups Composite, MakerNotes
   * @example "Unknown (00 0 0 0 0 00)"
   */
  LensSpec?: string;
  /**
   * @frequency 🔥 ★★☆☆ (19%)
   * @groups Composite, MakerNotes
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensType?: string;
  /**
   * @frequency 🔥 ★★★★ (68%)
   * @groups Composite
   * @example 9.9
   */
  LightValue?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups Composite
   * @example 9.5
   */
  Megapixels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite
   * @example "(Binary data 512 bytes, use -b option to extract)"
   */
  OriginalDecisionData?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups Composite
   * @example "9.9 um"
   */
  PeakSpectralSensitivity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite, MakerNotes
   * @example "On (73-point)"
   */
  PhaseDetectAF?: string;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups Composite, MakerNotes
   * @example 38.625
   */
  RedBalance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, MakerNotes
   * @example "On"
   */
  RedEyeReduction?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Composite
   * @example 11.2
   */
  RicohPitch?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Composite
   * @example 1.59
   */
  RicohRoll?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, MakerNotes
   * @example "Unknown (0)"
   */
  Rotation?: number;
  /**
   * @frequency 🔥 ★★★★ (54%)
   * @groups Composite
   * @example 9.9
   */
  ScaleFactor35efl?: number;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups Composite, MakerNotes, XMP
   * @example "Unknown (83)"
   */
  ShootingMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite
   * @example "1st-curtain sync"
   */
  ShutterCurtainHack?: string;
  /**
   * @frequency 🔥 ★★★★ (87%)
   * @groups Composite, MakerNotes
   * @example "inf"
   */
  ShutterSpeed?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups Composite
   * @example "2025:06:24 15:24:45.409-07:00"
   */
  SubSecCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups Composite
   * @example "2025:06:24 15:24:45.409-07:00"
   */
  SubSecDateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Composite
   * @example
   */
  SubSecMediaCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups Composite
   * @example "2025:06:24 15:24:45-07:00"
   */
  SubSecModifyDate?: ExifDateTime | string;
}

export const CompositeTagsNames = strEnum(
  "AdvancedSceneMode",
  "Aperture",
  "AutoFocus",
  "AvgBitrate",
  "BlueBalance",
  "CFAPattern",
  "CircleOfConfusion",
  "ConditionalFEC",
  "ContrastDetectAF",
  "DateCreated",
  "DateTimeCreated",
  "DateTimeOriginal",
  "DigitalCreationDateTime",
  "DigitalZoom",
  "DOF",
  "DriveMode",
  "Duration",
  "ExtenderStatus",
  "FileNumber",
  "FlashType",
  "FocusDistance",
  "FOV",
  "GPSAltitude",
  "GPSAltitudeRef",
  "GPSDateTime",
  "GPSDestLatitude",
  "GPSDestLongitude",
  "GPSLatitude",
  "GPSLatitudeRef",
  "GPSLongitude",
  "GPSLongitudeRef",
  "GPSPosition",
  "HyperfocalDistance",
  "ImageHeight",
  "ImageSize",
  "ImageWidth",
  "ISO",
  "Lens",
  "Lens35efl",
  "LensID",
  "LensSpec",
  "LensType",
  "LightValue",
  "Megapixels",
  "OriginalDecisionData",
  "PeakSpectralSensitivity",
  "PhaseDetectAF",
  "PreviewImage",
  "RedBalance",
  "RedEyeReduction",
  "RicohPitch",
  "RicohRoll",
  "Rotation",
  "ScaleFactor35efl",
  "ShootingMode",
  "ShutterCurtainHack",
  "ShutterSpeed",
  "SubSecCreateDate",
  "SubSecDateTimeOriginal",
  "SubSecMediaCreateDate",
  "SubSecModifyDate",
) satisfies StrEnum<keyof CompositeTags>;

export type CompositeTag = StrEnumKeys<typeof CompositeTagsNames>;

export interface APPTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "59 128 128"
   */
  AboveColor?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 388
   */
  Again?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, MakerNotes
   * @example "40 C"
   */
  AmbientTemperature?: string;
  /**
   * @frequency 🔥 ★★★★ (85%)
   * @groups APP, Composite, MakerNotes
   * @example 90
   */
  Aperture?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "5.0 C"
   */
  AtmosphericTemperature?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 800
   */
  AutoISOMax?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 3200
   */
  AutoISOMin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "Up"
   */
  AutoRotation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 3383
   */
  B5100?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, QuickTime
   * @example 0
   */
  Balance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example "R0000148"
   */
  Barcode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "60 128 128"
   */
  BelowColor?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2438
   */
  Bgain?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 255
   */
  BHighLight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 216
   */
  BHL?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 33
   */
  Blk0?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 32
   */
  Blk1?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 86
   */
  BMean?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 6
   */
  Boff?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  BSd?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 3
   */
  BSD?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1908
   */
  BStrobe?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes
   * @example "Z-CAMERA"
   */
  CameraModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "_______________"
   */
  CameraPartNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, XMP
   * @example 91702442
   */
  CameraSerialNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "https://PhotoStructure.com/"
   */
  CameraSoftware?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups APP, MakerNotes
   * @example "uD800,S800"
   */
  CameraType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2
   */
  Case?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, IPTC, MakerNotes
   * @example "Other"
   */
  Category?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2
   */
  CBal?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  Color?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 42926626
   */
  COLOR1?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 32321478
   */
  COLOR2?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 22701368
   */
  COLOR3?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 5
   */
  COLOR4?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, File
   * @example 3
   */
  ColorComponents?: number;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups APP, MakerNotes, XMP
   * @example "n/a"
   */
  ColorMode?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "sRGB"
   */
  ColorSpace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "YCbCr"
   */
  ColorTransform?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 45
   */
  Compass?: string;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, File, MakerNotes, XMP
   * @example "Unknown (1536)"
   */
  Compression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 0
   */
  ContTake?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "https://PhotoStructure.com/"
   */
  CreatorSoftware?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "2013:03:12 16:31:26"
   */
  DateTimeGenerated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 100
   */
  DCTEncodeVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "Photo Global Settings"
   */
  DeviceName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 148.34216
   */
  DiagonalFieldOfView?: number;
  /**
   * @frequency 🔥 ★★★☆ (25%)
   * @groups APP, Composite, MakerNotes
   * @example "undef.0"
   */
  DigitalZoom?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example "Yes"
   */
  DigitalZoomOn?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "(Binary data 275008 bytes, use -b option to extract)"
   */
  EmbeddedImage?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 960
   */
  EmbeddedImageHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "PNG"
   */
  EmbeddedImageType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 640
   */
  EmbeddedImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes
   * @example 1
   */
  Emissivity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 8501
   */
  EXP1?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 59
   */
  EXP2?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 237
   */
  EXP3?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 0.97
   */
  ExposRatio?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP, XMP
   * @example 3687
   */
  Exposure?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 1
   */
  ExposureCompensation?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "inf"
   */
  ExposureTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "AUTO"
   */
  ExposureType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "46.1 deg"
   */
  FieldOfView?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "NOF"
   */
  FilterModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example ""
   */
  FilterPartNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "00000000"
   */
  FilterSerialNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  FinalRatio?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 640
   */
  FlashTime?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 192
   */
  FMean?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 90
   */
  FNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "F2.8"
   */
  Fnumber?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups APP, Composite, MakerNotes, XMP
   * @example "inf"
   */
  FocusDistance?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups APP, MakerNotes
   * @example "Unknown (860272)"
   */
  FocusMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 136
   */
  FocusPos?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups APP, MakerNotes, PanasonicRaw
   * @example 98
   */
  FocusStepCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes, RIFF
   * @example 9
   */
  FrameRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, QuickTime
   * @example 3.0585938
   */
  Gamma?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2152
   */
  GBgain?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 8
   */
  GBoff?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 255
   */
  GHighLight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 255
   */
  GHL?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 52
   */
  GMean?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups APP, Composite, EXIF, XMP
   * @example 99.8
   */
  GPSAltitude?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example 94.800416
   */
  GPSImgDirection?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "Unknown ()"
   */
  GPSImgDirectionRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 48.857748
   */
  GPSLatitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF
   * @example "Unknown ()"
   */
  GPSLatitudeRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 2.2918888
   */
  GPSLongitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF, XMP
   * @example "West"
   */
  GPSLongitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "WGS84"
   */
  GPSMapDatum?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, EXIF
   * @example 88.01
   */
  GPSTrack?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, EXIF
   * @example "True North"
   */
  GPSTrackRef?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example true
   */
  GPSValid?: boolean;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups APP, EXIF, XMP
   * @example "50.51.48.48"
   */
  GPSVersionID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2152
   */
  GRgain?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 8
   */
  GRoff?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  GSd?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 4
   */
  GSD?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "(Binary data 1458 bytes, use -b option to extract)"
   */
  HDRGainCurve?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 755
   */
  HDRGainCurveSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, MakerNotes
   * @example "On (Manual)"
   */
  HDRSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "PDR-M60"
   */
  ID?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, Composite
   * @example "9728x6656"
   */
  ImageSize?: number | string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "7.4 C"
   */
  IRWindowTemperature?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 1
   */
  IRWindowTransmission?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "99 128 128"
   */
  Isotherm1Color?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "92 115 209"
   */
  Isotherm2Color?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 696880
   */
  JPEG1?: number;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "T199104"
   */
  LensPartNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "GPRO"
   */
  LensProjection?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "xB?"
   */
  LensSerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 0
   */
  LightS?: number;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, MakerNotes
   * @example "Unknown (3)"
   */
  Macro?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example " 10.6"
   */
  Mean?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  Meas1Label?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "80 60"
   */
  Meas1Params?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "Spot"
   */
  Meas1Type?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "Sp1"
   */
  Meas2Label?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "213 160 213 160"
   */
  Meas2Params?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "Spot"
   */
  Meas2Type?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "859830e2f50cb3397a6216f09553fce800000000000000000000000000000000"
   */
  MediaUniqueID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "7.6.4"
   */
  MetadataVersion?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "x530"
   */
  Model?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 26
   */
  MotorPos?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 4
   */
  Offset?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "+98"
   */
  OffsetX?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "+51"
   */
  OffsetY?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "67 216 98"
   */
  OverflowColor?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "(Binary data 672 bytes, use -b option to extract)"
   */
  Palette?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 224
   */
  PaletteColors?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "iron.pal"
   */
  PaletteFileName?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 0
   */
  PaletteMethod?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example "iron"
   */
  PaletteName?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 3
   */
  PaletteStretch?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example ".basicImgData.objectParams.emissivity"
   */
  Param0?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "12MP_W"
   */
  PhotoResolution?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 87648
   */
  PicLen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 976
   */
  PreviewImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 816
   */
  PreviewImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 95
   */
  PreviewQuality?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 0
   */
  Protect?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "On"
   */
  Protune?: string;
  /**
   * @frequency 🔥 ★★★☆ (37%)
   * @groups APP, Ducky, MakerNotes, RIFF
   * @example "n/a"
   */
  Quality?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 6929
   */
  R5100?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "4_1SEC"
   */
  Rate?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "(Binary data 614604 bytes, use -b option to extract)"
   */
  RawThermalImage?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 90
   */
  RawThermalImageHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "TIFF"
   */
  RawThermalImageType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 80
   */
  RawThermalImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 9392
   */
  RawValueMedian?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 993
   */
  RawValueRange?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 65535
   */
  RawValueRangeMax?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example 8628
   */
  RawValueRangeMin?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2.2125397
   */
  Real2IR?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "26.7 C"
   */
  ReflectedApparentTemperature?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "80.0 %"
   */
  RelativeHumidity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups APP, MakerNotes
   * @example 6
   */
  Resolution?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, XMP
   * @example "inches"
   */
  ResolutionUnit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "DCPT"
   */
  REV?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1887
   */
  Rgain?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 255
   */
  RHighLight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 247
   */
  RHL?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 32
   */
  RMean?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 9
   */
  Roff?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 1
   */
  RSd?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 4
   */
  RSD?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 5896
   */
  RStrobe?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "8259,0,14bfe,a184,11987,1e4f1,0,7c0000,40b60000,56a05e6,6…0038,d7"
   */
  S0?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, EXIF, MakerNotes, Meta, XMP
   * @example "sw02028104 "
   */
  SerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "No"
   */
  SpotMeter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 0
   */
  StrobeTime?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "bd1,1,5,2beec,b5,ec15"
   */
  T0?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 357
   */
  TagB?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 92
   */
  TagQ?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 243
   */
  TagR?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example "v"
   */
  TagS?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example 4016
   */
  ThmLen?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP
   * @example "41 110 240"
   */
  UnderflowColor?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "White Preset"
   */
  WhiteBalance?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 4054
   */
  YLevel?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 2209
   */
  YTarget?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP
   * @example
   */
  Zoom?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP
   * @example 9
   */
  ZoomPos?: number;
}

export const APPTagsNames = strEnum(
  "AboveColor",
  "Again",
  "AmbientTemperature",
  "Aperture",
  "AtmosphericTemperature",
  "AutoISOMax",
  "AutoISOMin",
  "AutoRotation",
  "B5100",
  "Balance",
  "Barcode",
  "BelowColor",
  "Bgain",
  "BHighLight",
  "BHL",
  "BitsPerSample",
  "Blk0",
  "Blk1",
  "BMean",
  "Boff",
  "BSd",
  "BSD",
  "BStrobe",
  "CameraModel",
  "CameraPartNumber",
  "CameraSerialNumber",
  "CameraSoftware",
  "CameraType",
  "Case",
  "Category",
  "CBal",
  "Color",
  "COLOR1",
  "COLOR2",
  "COLOR3",
  "COLOR4",
  "ColorComponents",
  "ColorMode",
  "ColorSpace",
  "ColorTransform",
  "Compass",
  "Compression",
  "ContTake",
  "CreatorSoftware",
  "DateTimeGenerated",
  "DateTimeOriginal",
  "DCTEncodeVersion",
  "DeviceName",
  "DiagonalFieldOfView",
  "DigitalZoom",
  "DigitalZoomOn",
  "EmbeddedImage",
  "EmbeddedImageHeight",
  "EmbeddedImageType",
  "EmbeddedImageWidth",
  "Emissivity",
  "EXP1",
  "EXP2",
  "EXP3",
  "ExposRatio",
  "Exposure",
  "ExposureCompensation",
  "ExposureTime",
  "ExposureType",
  "FieldOfView",
  "FilterModel",
  "FilterPartNumber",
  "FilterSerialNumber",
  "FinalRatio",
  "FlashTime",
  "FMean",
  "FNumber",
  "Fnumber",
  "FocusDistance",
  "FocusMode",
  "FocusPos",
  "FocusStepCount",
  "FrameRate",
  "Gamma",
  "GBgain",
  "GBoff",
  "GHighLight",
  "GHL",
  "GMean",
  "GPSAltitude",
  "GPSImgDirection",
  "GPSImgDirectionRef",
  "GPSLatitude",
  "GPSLatitudeRef",
  "GPSLongitude",
  "GPSLongitudeRef",
  "GPSMapDatum",
  "GPSTrack",
  "GPSTrackRef",
  "GPSValid",
  "GPSVersionID",
  "GRgain",
  "GRoff",
  "GSd",
  "GSD",
  "HDRGainCurve",
  "HDRGainCurveSize",
  "HDRSetting",
  "ID",
  "ImageHeight",
  "ImageSize",
  "ImageWidth",
  "IRWindowTemperature",
  "IRWindowTransmission",
  "Isotherm1Color",
  "Isotherm2Color",
  "JPEG1",
  "LensModel",
  "LensPartNumber",
  "LensProjection",
  "LensSerialNumber",
  "LightS",
  "Macro",
  "Mean",
  "Meas1Label",
  "Meas1Params",
  "Meas1Type",
  "Meas2Label",
  "Meas2Params",
  "Meas2Type",
  "MediaUniqueID",
  "MetadataVersion",
  "Model",
  "MotorPos",
  "Offset",
  "OffsetX",
  "OffsetY",
  "OverflowColor",
  "Palette",
  "PaletteColors",
  "PaletteFileName",
  "PaletteMethod",
  "PaletteName",
  "PaletteStretch",
  "Param0",
  "PhotoResolution",
  "PicLen",
  "PreviewImageHeight",
  "PreviewImageWidth",
  "PreviewQuality",
  "Protect",
  "Protune",
  "Quality",
  "R5100",
  "Rate",
  "RawThermalImage",
  "RawThermalImageHeight",
  "RawThermalImageType",
  "RawThermalImageWidth",
  "RawValueMedian",
  "RawValueRange",
  "RawValueRangeMax",
  "RawValueRangeMin",
  "Real2IR",
  "ReflectedApparentTemperature",
  "RelativeHumidity",
  "Resolution",
  "ResolutionUnit",
  "REV",
  "Rgain",
  "RHighLight",
  "RHL",
  "RMean",
  "Roff",
  "RSd",
  "RSD",
  "RStrobe",
  "S0",
  "SerialNumber",
  "SpotMeter",
  "StrobeTime",
  "T0",
  "TagB",
  "TagQ",
  "TagR",
  "TagS",
  "ThmLen",
  "UnderflowColor",
  "WhiteBalance",
  "XResolution",
  "YLevel",
  "YResolution",
  "YTarget",
  "Zoom",
  "ZoomPos",
) satisfies StrEnum<keyof APPTags>;

export type APPTag = StrEnumKeys<typeof APPTagsNames>;

export interface DuckyTags {
  /**
   * @frequency 🔥 ★★★☆ (37%)
   * @groups APP, Ducky, MakerNotes, RIFF
   * @example "n/a"
   */
  Quality?: string;
}

export const DuckyTagsNames = strEnum("Quality") satisfies StrEnum<
  keyof DuckyTags
>;

export type DuckyTag = StrEnumKeys<typeof DuckyTagsNames>;

/**
 * @see https://exiftool.org/TagNames/FlashPix.html
 */
export interface FlashPixTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups FlashPix
   * @example "(Binary data 18 bytes, use -b option to extract)"
   */
  AudioStream?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "Unicode UTF-16, little endian"
   */
  CodePage?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "Picoss"
   */
  CreatingApplication?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "30020010-C06F-D011-BD01-00609719A180"
   */
  ExtensionClassID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "2003:03:29 17:47:50"
   */
  ExtensionCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "Presized image for LCD display"
   */
  ExtensionDescription?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "2003:03:29 17:47:50"
   */
  ExtensionModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "Screen nail"
   */
  ExtensionName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "Invalidated By Modification"
   */
  ExtensionPersistence?: string;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 976
   */
  PreviewImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 816
   */
  PreviewImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example "(Binary data 57881 bytes, use -b option to extract)"
   */
  ScreenNail?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups FlashPix
   * @example 1
   */
  UsedExtensionNumbers?: number;
}

export const FlashPixTagsNames = strEnum(
  "AudioStream",
  "CodePage",
  "CreatingApplication",
  "ExtensionClassID",
  "ExtensionCreateDate",
  "ExtensionDescription",
  "ExtensionModifyDate",
  "ExtensionName",
  "ExtensionPersistence",
  "PreviewImage",
  "PreviewImageHeight",
  "PreviewImageWidth",
  "ScreenNail",
  "UsedExtensionNumbers",
) satisfies StrEnum<keyof FlashPixTags>;

export type FlashPixTag = StrEnumKeys<typeof FlashPixTagsNames>;

export interface JSONTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example 0
   */
  AIScene?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example 66048
   */
  FilterId?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example "off"
   */
  Hdr?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example false
   */
  Mirror?: boolean;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example 36864
   */
  OpMode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JSON, MakerNotes
   * @example "rear"
   */
  SensorType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups JSON
   * @example 1
   */
  ZoomMultiple?: number;
}

export const JSONTagsNames = strEnum(
  "AIScene",
  "FilterId",
  "Hdr",
  "Mirror",
  "OpMode",
  "SensorType",
  "ZoomMultiple",
) satisfies StrEnum<keyof JSONTags>;

export type JSONTag = StrEnumKeys<typeof JSONTagsNames>;

/**
 * @see https://exiftool.org/TagNames/EXIF.html
 */
export interface EXIFTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 988517
   */
  Acceleration?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "8 12 1968 2628"
   */
  ActiveArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, MakerNotes
   * @example "40 C"
   */
  AmbientTemperature?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "2.499755859 1 1.763427734"
   */
  AnalogBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  AntiAliasStrength?: number;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example 9016997700
   */
  ApertureValue?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups EXIF, MakerNotes
   * @example "Arturo DeImage"
   */
  Artist?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "1 1 1"
   */
  AsShotNeutral?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "0.346428 0.359709"
   */
  AsShotWhiteXY?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 3.0050511
   */
  BaselineExposure?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  BaselineNoise?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1.5
   */
  BaselineSharpness?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 500
   */
  BayerGreenSplit?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  BestQualityScale?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, RAF
   * @example "94 95 93 93"
   */
  BlackLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 512
   */
  BlackLevelBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 512
   */
  BlackLevelGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 512
   */
  BlackLevelRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "2 2"
   */
  BlackLevelRepeatDim?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9.9919505
   */
  BrightnessValue?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 6.1
   */
  CameraElevationAngle?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, XMP
   * @example 91702442
   */
  CameraSerialNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Rectangular"
   */
  CFALayout?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite, EXIF
   * @example "[Red,Green][Green,Blue]"
   */
  CFAPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Red,Green,Blue"
   */
  CFAPlaneColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF, MakerNotes
   * @example "On"
   */
  ChromaticAberrationCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "9758 13871 16956 16964 14142 9776 30 9502 13101 15416 151…1 15949"
   */
  ChromaticAberrationCorrParams?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "sRGB"
   */
  ColorSpace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "Unknown"
   */
  CompositeImage?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "8 0"
   */
  CompositeImageCount?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "1/161 1/161 1/161 1/161 1/161 0 0 1 1 undef undef undef u…f undef"
   */
  CompositeImageExposureTimes?: string;
  /**
   * @frequency 🔥 ★★★★ (56%)
   * @groups EXIF, XMP
   * @example 90
   */
  CompressedBitsPerPixel?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, File, MakerNotes, XMP
   * @example "Unknown (1536)"
   */
  Compression?: string;
  /**
   * @frequency 🔥 ★★★★ (60%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Contrast?: string;
  /**
   * @frequency 🔥 ★★★☆ (21%)
   * @groups EXIF, MakerNotes
   * @example "© Chuckles McSnortypants, Inc."
   */
  Copyright?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "2218:09:22 02:32:14"
   */
  CreateDate?: ExifDateTime | ExifDate | string | number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 5428
   */
  CropBottom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropLeft?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 8148
   */
  CropRight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropTop?: number;
  /**
   * @frequency 🔥 ★★★★ (64%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Custom process)"
   */
  CustomRendered?: string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "8 8"
   */
  DefaultCropOrigin?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "9504 6336"
   */
  DefaultCropSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "1 1"
   */
  DefaultScale?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "0 0 1 1"
   */
  DefaultUserCrop?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example "(Binary data 0 bytes, use -b option to extract)"
   */
  DeviceSettingDescription?: BinaryField | string;
  /**
   * @frequency 🔥 ★★★☆ (49%)
   * @groups EXIF, MakerNotes, XMP
   * @example 8.1319764
   */
  DigitalZoomRatio?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups EXIF, MakerNotes, PanasonicRaw
   * @example "Unknown (60)"
   */
  DistortionCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "88 0 -136 -288 -480 -696 -944 -1200 -1480 -1752 -2040 0 0 0 0 0"
   */
  DistortionCorrParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "1.4.0.0"
   */
  DNGBackwardVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "1.7.0.0"
   */
  DNGVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example ""
   */
  DocumentName?: string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups EXIF, XMP
   * @example 990
   */
  ExifImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups EXIF, XMP
   * @example 999
   */
  ExifImageWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups EXIF, XMP
   * @example "Version 2.2"
   */
  ExifVersion?: string;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 1
   */
  ExposureCompensation?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups EXIF
   * @example 83
   */
  ExposureIndex?: number;
  /**
   * @frequency 🔥 ★★★★ (69%)
   * @groups EXIF, MakerNotes, XMP
   * @example "iAuto+"
   */
  ExposureProgram?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "inf"
   */
  ExposureTime?: string;
  /**
   * @frequency 🔥 ★★★★ (63%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (DSC)"
   */
  FileSource?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 54
   */
  FlashEnergy?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 90
   */
  FNumber?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups EXIF, MakerNotes, XMP
   * @example "99.7 mm"
   */
  FocalLength?: string;
  /**
   * @frequency 🔥 ★★★☆ (31%)
   * @groups EXIF, PanasonicRaw, QuickTime, XMP
   * @example "9920 mm"
   */
  FocalLengthIn35mmFormat?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example "um"
   */
  FocalPlaneResolutionUnit?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example 9941.7476
   */
  FocalPlaneXResolution?: number;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example 9846.1538
   */
  FocalPlaneYResolution?: number;
  /**
   * @frequency 🔥 ★★★☆ (22%)
   * @groups EXIF, XMP
   * @example "Unknown (8176)"
   */
  GainControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, QuickTime
   * @example 3.0585938
   */
  Gamma?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups APP, Composite, EXIF, XMP
   * @example 99.8
   */
  GPSAltitude?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite, EXIF, XMP
   * @example "Unknown (Sea level reference)"
   */
  GPSAltitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "府中市郷土の森博物館"
   */
  GPSAreaInformation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "2025:06:24"
   */
  GPSDateStamp?: ExifDate | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 86.180049
   */
  GPSDestBearing?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "Unknown ()"
   */
  GPSDestBearingRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 0.030120052
   */
  GPSDestDistance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Kilometers"
   */
  GPSDestDistanceRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, EXIF
   * @example "43 deg 37' 59.61" N"
   */
  GPSDestLatitude?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "North"
   */
  GPSDestLatitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, EXIF
   * @example "80 deg 23' 16.31" W"
   */
  GPSDestLongitude?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "West"
   */
  GPSDestLongitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "No Correction"
   */
  GPSDifferential?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "8.937059922 m"
   */
  GPSHPositioningError?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example 94.800416
   */
  GPSImgDirection?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "Unknown ()"
   */
  GPSImgDirectionRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 48.857748
   */
  GPSLatitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF
   * @example "Unknown ()"
   */
  GPSLatitudeRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 2.2918888
   */
  GPSLongitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF, XMP
   * @example "West"
   */
  GPSLongitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "WGS84"
   */
  GPSMapDatum?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "Unknown ()"
   */
  GPSMeasureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, XMP
   * @example "gps"
   */
  GPSProcessingMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "??B??"
   */
  GPSSatellites?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "Unknown ()"
   */
  GPSStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF
   * @example "23:59:41.001"
   */
  GPSTimeStamp?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, EXIF
   * @example 88.01
   */
  GPSTrack?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, EXIF
   * @example "True North"
   */
  GPSTrackRef?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups APP, EXIF, XMP
   * @example "50.51.48.48"
   */
  GPSVersionID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  HighISOMultiplierBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  HighISOMultiplierGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  HighISOMultiplierRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "iPhone 15 Pro Max"
   */
  HostComputer?: string;
  /**
   * @frequency 🔥 ★★★☆ (42%)
   * @groups EXIF
   * @example "untitled"
   */
  ImageDescription?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9956
   */
  ImageNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 0
   */
  ImageTitle?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (91%)
   * @groups Composite, EXIF, MakerNotes, XMP
   * @example 993
   */
  ISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 80
   */
  ISOSpeed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, QuickTime
   * @example "(Binary data 532480 bytes, use -b option to extract)"
   */
  JpgFromRaw?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example 845574
   */
  JpgFromRawLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example 978944
   */
  JpgFromRawStart?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, MakerNotes, XMP
   * @example "?mm f/?"
   */
  LensInfo?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "ZEISS"
   */
  LensMake?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensModel?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "xB?"
   */
  LensSerialNumber?: string;
  /**
   * @frequency 🔥 ★★★★ (59%)
   * @groups EXIF, MakerNotes, XMP
   * @example "White Fluorescent"
   */
  LightSource?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 65535
   */
  LinearityLimitBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 65535
   */
  LinearityLimitGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 65535
   */
  LinearityLimitRed?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 5438 bytes, use -b option to extract)"
   */
  LinearizationTable?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  LinearResponseLimit?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "samsung"
   */
  Make?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Unsafe"
   */
  MakerNoteSafety?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 3072 bytes, use -b option to extract)"
   */
  MakerNoteSamsung1a?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 66 bytes, use -b option to extract)"
   */
  MakerNoteUnknownBinary?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "}:-"
   */
  MakerNoteUnknownText?: string;
  /**
   * @frequency 🔥 ★★★★ (66%)
   * @groups EXIF, XMP
   * @example 9.1
   */
  MaxApertureValue?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Center-weighted average)"
   */
  MeteringMode?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "x530"
   */
  Model?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "K520C-01044"
   */
  Model2?: string;
  /**
   * @frequency 🔥 ★★★★ (90%)
   * @groups EXIF, QuickTime, XMP
   * @example "2216:02:28 03:49:50"
   */
  ModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 6
   */
  Noise?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "9.94492365862243e-05 2.63463221017446e-07 8.6474654381163…652e-07"
   */
  NoiseProfile?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 0.94999999
   */
  NoiseReductionApplied?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "5 100 4 4 4 200 8 8 8 400 16 16 16 800 32 32 32 1600 64 64 64"
   */
  NoiseReductionParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example 58
   */
  OffsetSchema?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF
   * @example "-09:00"
   */
  OffsetTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF
   * @example "-09:00"
   */
  OffsetTimeDigitized?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF
   * @example "-09:00"
   */
  OffsetTimeOriginal?: string;
  /**
   * @frequency 🔥 ★★★★ (92%)
   * @groups EXIF, PanasonicRaw, XMP
   * @example 8
   */
  Orientation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 4798 bytes, use -b option to extract)"
   */
  OtherImage?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example 998114
   */
  OtherImageLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example 755
   */
  OtherImageStart?: number;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups EXIF, MakerNotes
   * @example "Itsa Myowna"
   */
  OwnerName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, XMP
   * @example "(Binary data 2060 bytes, use -b option to extract)"
   */
  Padding?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Reflective"
   */
  PageName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "0500"
   */
  PanasonicRawVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 0
   */
  Photographer?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "YCbCr"
   */
  PhotometricInterpretation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example "Chunky"
   */
  PlanarConfiguration?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1022
   */
  Pressure?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "sRGB"
   */
  PreviewColorSpace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "2015:06:02 09:56:01"
   */
  PreviewDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups EXIF, MakerNotes
   * @example 9983
   */
  PreviewImageLength?: number;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups EXIF, MakerNotes
   * @example 9996
   */
  PreviewImageStart?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 4665816 bytes, use -b option to extract)"
   */
  PreviewTIFF?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "0.64 0.33 0.3 0.6 0.15 0.06"
   */
  PrimaryChromaticities?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "https://PhotoStructure.com/"
   */
  ProcessingSoftware?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "LEICA M10-R            "
   */
  ProfileName?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups EXIF, MakerNotes, XMP
   * @example 5
   */
  Rating?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 928768
   */
  RawDataOffset?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "D400182B000F01E107690C5000000000"
   */
  RawDataUniqueID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 8
   */
  RawFormat?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "3 1440 1440"
   */
  RawImageSegmentation?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups EXIF, XMP
   * @example 800
   */
  RecommendedExposureIndex?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example "0 255 128 255 128 255"
   */
  ReferenceBlackWhite?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "JPEG Exif Ver 2.2"
   */
  RelatedImageFileFormat?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups EXIF
   * @example 960
   */
  RelatedImageHeight?: number;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups EXIF
   * @example 800
   */
  RelatedImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF
   * @example "xxx.avi"
   */
  RelatedSoundFile?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, XMP
   * @example "inches"
   */
  ResolutionUnit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example 964
   */
  RowsPerStrip?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example 3
   */
  SamplesPerPixel?: number;
  /**
   * @frequency 🔥 ★★★★ (66%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Saturation?: string;
  /**
   * @frequency 🔥 ★★★★ (73%)
   * @groups EXIF, XMP
   * @example "Unknown (Standard)"
   */
  SceneCaptureType?: string;
  /**
   * @frequency 🔥 ★★★★ (51%)
   * @groups EXIF, XMP
   * @example "Unknown (Directly photographed)"
   */
  SceneType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "urn:com:apple:photo:2020:aux:semanticskymatte"
   */
  SemanticName?: string;
  /**
   * @frequency 🔥 ★★★☆ (35%)
   * @groups EXIF, XMP
   * @example "Unknown (One-chip color area sensor)"
   */
  SensingMethod?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups EXIF, XMP
   * @example "Unknown"
   */
  SensitivityType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 5893
   */
  SensorBottomBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, MakerNotes
   * @example 5920
   */
  SensorHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 88
   */
  SensorLeftBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 8883
   */
  SensorRightBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 96
   */
  SensorTopBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, MakerNotes
   * @example 8896
   */
  SensorWidth?: number;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, EXIF, MakerNotes, Meta, XMP
   * @example "sw02028104 "
   */
  SerialNumber?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example "1/999963365"
   */
  ShutterSpeedValue?: string;
  /**
   * @frequency 🔥 ★★★★ (61%)
   * @groups EXIF, MakerNotes, QuickTime, RIFF, XMP
   * @example "https://PhotoStructure.com/"
   */
  Software?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "9504 6336"
   */
  SonyCropSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "32 20"
   */
  SonyCropTopLeft?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Sony Uncompressed 14-bit RAW"
   */
  SonyRawFileType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "9568 6376"
   */
  SonyRawImageSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "8000 10400 12900 14100"
   */
  SonyToneCurve?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 668058300
   */
  SpatialFrequencyResponse?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 4
   */
  SRawType?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, RAF
   * @example 9600
   */
  StripByteCounts?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, RAF
   * @example 986
   */
  StripOffsets?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF
   * @example "Semantic Mask"
   */
  SubfileType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF
   * @example "967 967 1425 851"
   */
  SubjectArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, XMP
   * @example "99.99 m"
   */
  SubjectDistance?: string;
  /**
   * @frequency 🔥 ★★★☆ (24%)
   * @groups EXIF, XMP
   * @example "Unknown (Macro)"
   */
  SubjectDistanceRange?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups EXIF
   * @example 996
   */
  SubSecTime?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, XMP
   * @example 996
   */
  SubSecTimeDigitized?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, XMP
   * @example 999
   */
  SubSecTimeOriginal?: number;
  /**
   * @frequency 🔥 ★★★★ (89%)
   * @groups EXIF, JFIF, MakerNotes
   * @example "(Binary data 10202 bytes, use -b option to extract)"
   */
  ThumbnailImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, JFIF
   * @example "(Binary data 57816 bytes, use -b option to extract)"
   */
  ThumbnailTIFF?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 447 bytes, use -b option to extract)"
   */
  TileByteCounts?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 80
   */
  TileLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 507 bytes, use -b option to extract)"
   */
  TileOffsets?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 6080
   */
  TileWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 1
   */
  TimeZoneOffset?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "(Binary data 3636 bytes, use -b option to extract)"
   */
  TransferFunction?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "motorola XT1254"
   */
  UniqueCameraModel?: string;
  /**
   * @frequency 🔥 ★★★☆ (38%)
   * @groups EXIF, XMP
   * @example "This is a comment."
   */
  UserComment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "n/a"
   */
  VignettingCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "96 240 384 544 704 896 1088 1280 1488 1696 1904 2128 2352…4 15232"
   */
  VignettingCorrParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example 0.1
   */
  WaterDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 9235
   */
  WBBlueLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 60416
   */
  WBGreenLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 834
   */
  WBRedLevel?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "White Preset"
   */
  WhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes
   * @example 65535
   */
  WhiteLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "9696 8192 8192 7136"
   */
  WhitePoint?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Redmi 9T"
   */
  XiaomiModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "Norm De Plume"
   */
  XPAuthor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "This is a comment."
   */
  XPComment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "v01.40.0002;0.0.1;v1.0.0"
   */
  XPKeywords?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "image thermique, thermal image"
   */
  XPSubject?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF
   * @example "楆慮⁬敤琠牡敤攠⁭汉慨䈠汥Ⅱ"
   */
  XPTitle?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes
   * @example "0.299 0.587 0.114"
   */
  YCbCrCoefficients?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (512)"
   */
  YCbCrPositioning?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, File
   * @example "YCbCr4:4:4 (1 1)"
   */
  YCbCrSubSampling?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
}

export const EXIFTagsNames = strEnum(
  "Acceleration",
  "ActiveArea",
  "AmbientTemperature",
  "AnalogBalance",
  "AntiAliasStrength",
  "ApertureValue",
  "Artist",
  "AsShotNeutral",
  "AsShotWhiteXY",
  "BaselineExposure",
  "BaselineNoise",
  "BaselineSharpness",
  "BayerGreenSplit",
  "BestQualityScale",
  "BitsPerSample",
  "BlackLevel",
  "BlackLevelBlue",
  "BlackLevelGreen",
  "BlackLevelRed",
  "BlackLevelRepeatDim",
  "BrightnessValue",
  "CameraElevationAngle",
  "CameraSerialNumber",
  "CFALayout",
  "CFAPattern",
  "CFAPlaneColor",
  "ChromaticAberrationCorrection",
  "ChromaticAberrationCorrParams",
  "ColorSpace",
  "CompositeImage",
  "CompositeImageCount",
  "CompositeImageExposureTimes",
  "CompressedBitsPerPixel",
  "Compression",
  "Contrast",
  "Copyright",
  "CreateDate",
  "CropBottom",
  "CropLeft",
  "CropRight",
  "CropTop",
  "CustomRendered",
  "DateTimeOriginal",
  "DefaultCropOrigin",
  "DefaultCropSize",
  "DefaultScale",
  "DefaultUserCrop",
  "DeviceSettingDescription",
  "DigitalZoomRatio",
  "DistortionCorrection",
  "DistortionCorrParams",
  "DNGBackwardVersion",
  "DNGVersion",
  "DocumentName",
  "ExifImageHeight",
  "ExifImageWidth",
  "ExifVersion",
  "ExposureCompensation",
  "ExposureIndex",
  "ExposureProgram",
  "ExposureTime",
  "FileSource",
  "FlashEnergy",
  "FNumber",
  "FocalLength",
  "FocalLengthIn35mmFormat",
  "FocalPlaneResolutionUnit",
  "FocalPlaneXResolution",
  "FocalPlaneYResolution",
  "GainControl",
  "Gamma",
  "GPSAltitude",
  "GPSAltitudeRef",
  "GPSAreaInformation",
  "GPSDateStamp",
  "GPSDestBearing",
  "GPSDestBearingRef",
  "GPSDestDistance",
  "GPSDestDistanceRef",
  "GPSDestLatitude",
  "GPSDestLatitudeRef",
  "GPSDestLongitude",
  "GPSDestLongitudeRef",
  "GPSDifferential",
  "GPSHPositioningError",
  "GPSImgDirection",
  "GPSImgDirectionRef",
  "GPSLatitude",
  "GPSLatitudeRef",
  "GPSLongitude",
  "GPSLongitudeRef",
  "GPSMapDatum",
  "GPSMeasureMode",
  "GPSProcessingMethod",
  "GPSSatellites",
  "GPSStatus",
  "GPSTimeStamp",
  "GPSTrack",
  "GPSTrackRef",
  "GPSVersionID",
  "HighISOMultiplierBlue",
  "HighISOMultiplierGreen",
  "HighISOMultiplierRed",
  "HostComputer",
  "ImageDescription",
  "ImageHeight",
  "ImageNumber",
  "ImageTitle",
  "ImageWidth",
  "ISO",
  "ISOSpeed",
  "JpgFromRaw",
  "JpgFromRawLength",
  "JpgFromRawStart",
  "LensInfo",
  "LensMake",
  "LensModel",
  "LensSerialNumber",
  "LightSource",
  "LinearityLimitBlue",
  "LinearityLimitGreen",
  "LinearityLimitRed",
  "LinearizationTable",
  "LinearResponseLimit",
  "Make",
  "MakerNoteSafety",
  "MakerNoteSamsung1a",
  "MakerNoteUnknownBinary",
  "MakerNoteUnknownText",
  "MaxApertureValue",
  "MeteringMode",
  "Model",
  "Model2",
  "ModifyDate",
  "Noise",
  "NoiseProfile",
  "NoiseReductionApplied",
  "NoiseReductionParams",
  "OffsetSchema",
  "OffsetTime",
  "OffsetTimeDigitized",
  "OffsetTimeOriginal",
  "Orientation",
  "OtherImage",
  "OtherImageLength",
  "OtherImageStart",
  "OwnerName",
  "Padding",
  "PageName",
  "PanasonicRawVersion",
  "Photographer",
  "PhotometricInterpretation",
  "PlanarConfiguration",
  "Pressure",
  "PreviewColorSpace",
  "PreviewDateTime",
  "PreviewImage",
  "PreviewImageLength",
  "PreviewImageStart",
  "PreviewTIFF",
  "PrimaryChromaticities",
  "ProcessingSoftware",
  "ProfileName",
  "Rating",
  "RawDataOffset",
  "RawDataUniqueID",
  "RawFormat",
  "RawImageSegmentation",
  "RecommendedExposureIndex",
  "ReferenceBlackWhite",
  "RelatedImageFileFormat",
  "RelatedImageHeight",
  "RelatedImageWidth",
  "RelatedSoundFile",
  "ResolutionUnit",
  "RowsPerStrip",
  "SamplesPerPixel",
  "Saturation",
  "SceneCaptureType",
  "SceneType",
  "SemanticName",
  "SensingMethod",
  "SensitivityType",
  "SensorBottomBorder",
  "SensorHeight",
  "SensorLeftBorder",
  "SensorRightBorder",
  "SensorTopBorder",
  "SensorWidth",
  "SerialNumber",
  "ShutterSpeedValue",
  "Software",
  "SonyCropSize",
  "SonyCropTopLeft",
  "SonyRawFileType",
  "SonyRawImageSize",
  "SonyToneCurve",
  "SpatialFrequencyResponse",
  "SRawType",
  "StripByteCounts",
  "StripOffsets",
  "SubfileType",
  "SubjectArea",
  "SubjectDistance",
  "SubjectDistanceRange",
  "SubSecTime",
  "SubSecTimeDigitized",
  "SubSecTimeOriginal",
  "ThumbnailImage",
  "ThumbnailTIFF",
  "TileByteCounts",
  "TileLength",
  "TileOffsets",
  "TileWidth",
  "TimeZoneOffset",
  "TransferFunction",
  "UniqueCameraModel",
  "UserComment",
  "VignettingCorrection",
  "VignettingCorrParams",
  "WaterDepth",
  "WBBlueLevel",
  "WBGreenLevel",
  "WBRedLevel",
  "WhiteBalance",
  "WhiteLevel",
  "WhitePoint",
  "XiaomiModel",
  "XPAuthor",
  "XPComment",
  "XPKeywords",
  "XPSubject",
  "XPTitle",
  "XResolution",
  "YCbCrCoefficients",
  "YCbCrPositioning",
  "YCbCrSubSampling",
  "YResolution",
) satisfies StrEnum<keyof EXIFTags>;

export type EXIFTag = StrEnumKeys<typeof EXIFTagsNames>;

export interface MPFTags {
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example 9697
   */
  DependentImage1EntryNumber?: number;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example 960
   */
  DependentImage2EntryNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MPF
   * @example "(Binary data 66 bytes, use -b option to extract)"
   */
  ImageUIDList?: BinaryField | string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example "0100"
   */
  MPFVersion?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example "Representative image, Dependent parent image"
   */
  MPImageFlags?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example "Unknown (4)"
   */
  MPImageFormat?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example 999325
   */
  MPImageLength?: number;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example 9999872
   */
  MPImageStart?: number;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example "Undefined"
   */
  MPImageType?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MPF
   * @example 3
   */
  NumberOfImages?: number;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MPF
   * @example 1
   */
  TotalFrames?: number;
}

export const MPFTagsNames = strEnum(
  "DependentImage1EntryNumber",
  "DependentImage2EntryNumber",
  "ImageUIDList",
  "MPFVersion",
  "MPImageFlags",
  "MPImageFormat",
  "MPImageLength",
  "MPImageStart",
  "MPImageType",
  "NumberOfImages",
  "PreviewImage",
  "TotalFrames",
) satisfies StrEnum<keyof MPFTags>;

export type MPFTag = StrEnumKeys<typeof MPFTagsNames>;

export interface MetaTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 1
   */
  BorderID?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 0
   */
  BorderLocation?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "None"
   */
  BorderName?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "1 0 0 0"
   */
  BordersVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 0
   */
  BorderType?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "KODAK DC5000 ZOOM DIGITAL CAMERA"
   */
  CameraOwner?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 1
   */
  CaptureConditionsPAR?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "None"
   */
  DigitalEffectsName?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 0
   */
  DigitalEffectsType?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "1 0 0 0"
   */
  DigitalEffectsVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 1
   */
  EditTagArray?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 2
   */
  FilmGencode?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 43
   */
  FilmProductCode?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 1
   */
  FilmSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, Meta
   * @example 849
   */
  FrameNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 6
   */
  ImageSourceEK?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "0110"
   */
  MetadataNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example "Version 9"
   */
  ModelAndVersion?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, EXIF, MakerNotes, Meta, XMP
   * @example "sw02028104 "
   */
  SerialNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups Meta
   * @example 3
   */
  WatermarkType?: number;
}

export const MetaTagsNames = strEnum(
  "BorderID",
  "BorderLocation",
  "BorderName",
  "BordersVersion",
  "BorderType",
  "CameraOwner",
  "CaptureConditionsPAR",
  "DigitalEffectsName",
  "DigitalEffectsType",
  "DigitalEffectsVersion",
  "EditTagArray",
  "FilmGencode",
  "FilmProductCode",
  "FilmSize",
  "FrameNumber",
  "ImageSourceEK",
  "MetadataNumber",
  "ModelAndVersion",
  "SerialNumber",
  "WatermarkType",
) satisfies StrEnum<keyof MetaTags>;

export type MetaTag = StrEnumKeys<typeof MetaTagsNames>;

export interface PanasonicRawTags {
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example 9016997700
   */
  ApertureValue?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups EXIF, MakerNotes, PanasonicRaw
   * @example "Unknown (60)"
   */
  DistortionCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups PanasonicRaw
   * @example 1.0141438
   */
  DistortionScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, PanasonicRaw
   * @example "Yes"
   */
  FlashFired?: string;
  /**
   * @frequency 🔥 ★★★☆ (31%)
   * @groups EXIF, PanasonicRaw, QuickTime, XMP
   * @example "9920 mm"
   */
  FocalLengthIn35mmFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups APP, MakerNotes, PanasonicRaw
   * @example 98
   */
  FocusStepCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, PanasonicRaw
   * @example 9804
   */
  FocusStepNear?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example 2
   */
  LensTypeMake?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example "41 10"
   */
  LensTypeModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups PanasonicRaw
   * @example 7
   */
  NumWBEntries?: number;
  /**
   * @frequency 🔥 ★★★★ (92%)
   * @groups EXIF, PanasonicRaw, XMP
   * @example 8
   */
  Orientation?: number;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example "1/999963365"
   */
  ShutterSpeedValue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example "Tungsten"
   */
  WhiteBalanceSet?: string;
}

export const PanasonicRawTagsNames = strEnum(
  "ApertureValue",
  "DistortionCorrection",
  "DistortionScale",
  "FlashFired",
  "FocalLengthIn35mmFormat",
  "FocusStepCount",
  "FocusStepNear",
  "LensTypeMake",
  "LensTypeModel",
  "NumWBEntries",
  "Orientation",
  "ShutterSpeedValue",
  "WhiteBalanceSet",
) satisfies StrEnum<keyof PanasonicRawTags>;

export type PanasonicRawTag = StrEnumKeys<typeof PanasonicRawTagsNames>;

/**
 * @see https://exiftool.org/TagNames/Photoshop.html
 */
export interface PhotoshopTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example 30
   */
  GlobalAltitude?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example 90
   */
  GlobalAngle?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "Yes"
   */
  HasRealMergedData?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Photoshop
   * @example "fd826cdf97ac15335b426a20d23c1041"
   */
  IPTCDigest?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example 1
   */
  NumSlices?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "Standard"
   */
  PhotoshopFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example 9
   */
  PhotoshopQuality?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "(Binary data 5768 bytes, use -b option to extract)"
   */
  PhotoshopThumbnail?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, Photoshop, QuickTime
   * @example 1
   */
  PixelAspectRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "0 0"
   */
  PrintPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example 1
   */
  PrintScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "Centered"
   */
  PrintStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "Adobe Photoshop CS5"
   */
  ReaderName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "panasonic_lumix_dmc_lx15_02"
   */
  SlicesGroupName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Photoshop
   * @example "Adobe Photoshop"
   */
  WriterName?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
}

export const PhotoshopTagsNames = strEnum(
  "GlobalAltitude",
  "GlobalAngle",
  "HasRealMergedData",
  "IPTCDigest",
  "NumSlices",
  "PhotoshopFormat",
  "PhotoshopQuality",
  "PhotoshopThumbnail",
  "PixelAspectRatio",
  "PrintPosition",
  "PrintScale",
  "PrintStyle",
  "ReaderName",
  "SlicesGroupName",
  "WriterName",
  "XResolution",
  "YResolution",
) satisfies StrEnum<keyof PhotoshopTags>;

export type PhotoshopTag = StrEnumKeys<typeof PhotoshopTagsNames>;

export interface PrintIMTags {
  /**
   * @frequency 🔥 ★★★☆ (28%)
   * @groups PrintIM
   * @example "0300"
   */
  PrintIMVersion?: string;
}

export const PrintIMTagsNames = strEnum("PrintIMVersion") satisfies StrEnum<
  keyof PrintIMTags
>;

export type PrintIMTag = StrEnumKeys<typeof PrintIMTagsNames>;

export interface QuickTimeTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 60
   */
  AndroidCaptureFPS?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 7.1
   */
  AndroidVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "(Binary data 4 bytes, use -b option to extract)"
   */
  AndroidVideoTemporalLayersCount?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 8
   */
  AudioBitsPerSample?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example 3
   */
  AudioChannels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "sowt"
   */
  AudioFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example 8000
   */
  AudioSampleRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Panasonic"
   */
  AudioVendorID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Norm De Plume"
   */
  Author?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "65535 65535 65535"
   */
  BackgroundColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, QuickTime
   * @example 0
   */
  Balance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File, MakerNotes, QuickTime
   * @example 8
   */
  BitDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  ChapterListTrackID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "3840x2160"
   */
  CleanApertureDimensions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example ["qt  ","CAEP"]
   */
  CompatibleBrands?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "jpeg"
   */
  CompressorID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Photo - JPEG"
   */
  CompressorName?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example "CanonCR3_001/01.11.00/00.00.00"
   */
  CompressorVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Track 1"
   */
  ContentDescribes?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example "FFCBAC24-E547-4BBC-AF47-38B1A3D845E3"
   */
  ContentIdentifier?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "2218:09:22 02:32:14"
   */
  CreateDate?: ExifDateTime | ExifDate | string | number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "2025:06:24 15:24:45-07:00"
   */
  CreationDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 s"
   */
  CurrentTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, MakerNotes, QuickTime, XMP
   * @example 9.5095
   */
  Duration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "3840x2160"
   */
  EncodedPixelsDimensions?: string;
  /**
   * @frequency 🔥 ★★★☆ (31%)
   * @groups EXIF, PanasonicRaw, QuickTime, XMP
   * @example "9920 mm"
   */
  FocalLengthIn35mmFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Helvetica"
   */
  FontName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups QuickTime, XMP
   * @example "image/jpg"
   */
  Format?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, QuickTime
   * @example 3.0585938
   */
  Gamma?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  GenBalance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 0 0"
   */
  GenFlags?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "ditherCopy"
   */
  GenGraphicsMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  GenMediaVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "32768 32768 32768"
   */
  GenOpColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "51 deg 6' 13.32" N, 0 deg 52' 23.52" W, 99.22 m Above Sea Level"
   */
  GPSCoordinates?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "srcCopy"
   */
  GraphicsMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Media Handler"
   */
  HandlerClass?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "VideoHandle"
   */
  HandlerDescription?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Video Track"
   */
  HandlerType?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, QuickTime
   * @example "(Binary data 532480 bytes, use -b option to extract)"
   */
  JpgFromRaw?: BinaryField;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Stereo"
   */
  LayoutFlags?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensModel?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "xB?"
   */
  LensSerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 5.700385
   */
  LocationAccuracyHorizontal?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "MP4 v2 [ISO 14496-14]"
   */
  MajorBrand?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "samsung"
   */
  Make?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "1 0 0 0 1 0 0 0 1"
   */
  MatrixStructure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "2025:06:24 22:24:45"
   */
  MediaCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 98312
   */
  MediaDataOffset?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 9790496
   */
  MediaDataSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 9.52
   */
  MediaDuration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  MediaHeaderVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "und"
   */
  MediaLanguageCode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "2025:06:24 22:24:47"
   */
  MediaModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 90000
   */
  MediaTimeScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "583d47d07afe1fbcfa0894d17e66051f07e1230a0000072550c3000000000000"
   */
  MediaUID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "mett"
   */
  MetaFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime, XMP
   * @example "2011.7.0"
   */
  MinorVersion?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "x530"
   */
  Model?: string;
  /**
   * @frequency 🔥 ★★★★ (90%)
   * @groups EXIF, QuickTime, XMP
   * @example "2216:02:28 03:49:50"
   */
  ModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  MovieHeaderVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 6
   */
  NextTrackID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "32768 32768 32768"
   */
  OpColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "tmcd"
   */
  OtherFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, Photoshop, QuickTime
   * @example 1
   */
  PixelAspectRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 59.94006
   */
  PlaybackFrameRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "SEQ_PLAY"
   */
  PlayMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 s"
   */
  PosterTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 1
   */
  PreferredRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "99.61%"
   */
  PreferredVolume?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  PreviewDuration?: number;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 s"
   */
  PreviewTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "3840x2160"
   */
  ProductionApertureDimensions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "mp4a"
   */
  PurchaseFileFormat?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 1
   */
  SampleDuration?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 s"
   */
  SampleTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  SelectionDuration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 s"
   */
  SelectionTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "43333139313032343731363032300000"
   */
  SerialNumberHash?: string;
  /**
   * @frequency 🔥 ★★★★ (61%)
   * @groups EXIF, MakerNotes, QuickTime, RIFF, XMP
   * @example "https://PhotoStructure.com/"
   */
  Software?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 720
   */
  SourceImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 8192
   */
  SourceImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "0 0 0"
   */
  TextColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Plain"
   */
  TextFace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Unknown (21)"
   */
  TextFont?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 12
   */
  TextSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 3
   */
  TimecodeTrack?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 90000
   */
  TimeScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "2025:06:24 22:24:45"
   */
  TrackCreateDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 9.5095
   */
  TrackDuration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  TrackHeaderVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 1
   */
  TrackID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example 0
   */
  TrackLayer?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "2025:06:24 22:24:47"
   */
  TrackModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "100.00%"
   */
  TrackVolume?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Panasonic"
   */
  VendorID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example "n/a"
   */
  VideoFrameRate?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime
   * @example "Limited"
   */
  VideoFullRangeFlag?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
}

export const QuickTimeTagsNames = strEnum(
  "AndroidCaptureFPS",
  "AndroidVersion",
  "AndroidVideoTemporalLayersCount",
  "AudioBitsPerSample",
  "AudioChannels",
  "AudioFormat",
  "AudioSampleRate",
  "AudioVendorID",
  "Author",
  "BackgroundColor",
  "Balance",
  "BitDepth",
  "ChapterListTrackID",
  "CleanApertureDimensions",
  "CompatibleBrands",
  "CompressorID",
  "CompressorName",
  "CompressorVersion",
  "ContentDescribes",
  "ContentIdentifier",
  "CreateDate",
  "CreationDate",
  "CurrentTime",
  "Duration",
  "EncodedPixelsDimensions",
  "FocalLengthIn35mmFormat",
  "FontName",
  "Format",
  "Gamma",
  "GenBalance",
  "GenFlags",
  "GenGraphicsMode",
  "GenMediaVersion",
  "GenOpColor",
  "GPSCoordinates",
  "GraphicsMode",
  "HandlerClass",
  "HandlerDescription",
  "HandlerType",
  "ImageHeight",
  "ImageWidth",
  "JpgFromRaw",
  "LayoutFlags",
  "LensModel",
  "LensSerialNumber",
  "LocationAccuracyHorizontal",
  "MajorBrand",
  "Make",
  "MatrixStructure",
  "MediaCreateDate",
  "MediaDataOffset",
  "MediaDataSize",
  "MediaDuration",
  "MediaHeaderVersion",
  "MediaLanguageCode",
  "MediaModifyDate",
  "MediaTimeScale",
  "MediaUID",
  "MetaFormat",
  "MinorVersion",
  "Model",
  "ModifyDate",
  "MovieHeaderVersion",
  "NextTrackID",
  "OpColor",
  "OtherFormat",
  "PixelAspectRatio",
  "PlaybackFrameRate",
  "PlayMode",
  "PosterTime",
  "PreferredRate",
  "PreferredVolume",
  "PreviewDuration",
  "PreviewImage",
  "PreviewTime",
  "ProductionApertureDimensions",
  "PurchaseFileFormat",
  "SampleDuration",
  "SampleTime",
  "SelectionDuration",
  "SelectionTime",
  "SerialNumberHash",
  "Software",
  "SourceImageHeight",
  "SourceImageWidth",
  "TextColor",
  "TextFace",
  "TextFont",
  "TextSize",
  "TimecodeTrack",
  "TimeScale",
  "TrackCreateDate",
  "TrackDuration",
  "TrackHeaderVersion",
  "TrackID",
  "TrackLayer",
  "TrackModifyDate",
  "TrackVolume",
  "VendorID",
  "VideoFrameRate",
  "VideoFullRangeFlag",
  "XResolution",
  "YResolution",
) satisfies StrEnum<keyof QuickTimeTags>;

export type QuickTimeTag = StrEnumKeys<typeof QuickTimeTagsNames>;

export interface RAFTags {
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, RAF
   * @example "94 95 93 93"
   */
  BlackLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…8888889"
   */
  ChromaticAberrationParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "12 12 12 12"
   */
  FujiLayout?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…9809875"
   */
  GeometricDistortionParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "Uncompressed"
   */
  RAFCompression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example -1.7
   */
  RawExposureBias?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "4:3"
   */
  RawImageAspectRatio?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "7728x5152"
   */
  RawImageCroppedSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "7 8"
   */
  RawImageCropTopLeft?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example 8754
   */
  RawImageFullHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "7872x5196"
   */
  RawImageFullSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example 7872
   */
  RawImageFullWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "No"
   */
  RawZoomActive?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "7728x5152"
   */
  RawZoomSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "0x0"
   */
  RawZoomTopLeft?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, RAF
   * @example 9600
   */
  StripByteCounts?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, RAF
   * @example 986
   */
  StripOffsets?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…3652344"
   */
  VignettingParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RAF
   * @example "GRBGBR BGGRGG RGGBGG GBRGRB RGGBGG BGGRGG"
   */
  XTransLayout?: string;
}

export const RAFTagsNames = strEnum(
  "BitsPerSample",
  "BlackLevel",
  "ChromaticAberrationParams",
  "FujiLayout",
  "GeometricDistortionParams",
  "RAFCompression",
  "RawExposureBias",
  "RawImageAspectRatio",
  "RawImageCroppedSize",
  "RawImageCropTopLeft",
  "RawImageFullHeight",
  "RawImageFullSize",
  "RawImageFullWidth",
  "RawZoomActive",
  "RawZoomSize",
  "RawZoomTopLeft",
  "StripByteCounts",
  "StripOffsets",
  "VignettingParams",
  "XTransLayout",
) satisfies StrEnum<keyof RAFTags>;

export type RAFTag = StrEnumKeys<typeof RAFTagsNames>;

export interface RIFFTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example ""
   */
  AudioCodec?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 800000
   */
  AudioSampleCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example 8000
   */
  AudioSampleRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 64000
   */
  AvgBytesPerSec?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example "Microsoft PCM"
   */
  Encoding?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, RIFF
   * @example 9
   */
  FrameCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes, RIFF
   * @example 9
   */
  FrameRate?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example "478.6 kB/s"
   */
  MaxDataRate?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 1
   */
  NumChannels?: number;
  /**
   * @frequency 🔥 ★★★☆ (37%)
   * @groups APP, Ducky, MakerNotes, RIFF
   * @example "n/a"
   */
  Quality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 32000
   */
  SampleRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example "Variable"
   */
  SampleSize?: string;
  /**
   * @frequency 🔥 ★★★★ (61%)
   * @groups EXIF, MakerNotes, QuickTime, RIFF, XMP
   * @example "https://PhotoStructure.com/"
   */
  Software?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 2
   */
  StreamCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF, XMP
   * @example 3
   */
  StreamType?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, RIFF
   * @example "mjpg"
   */
  VideoCodec?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF
   * @example 600
   */
  VideoFrameCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example "n/a"
   */
  VideoFrameRate?: string;
}

export const RIFFTagsNames = strEnum(
  "AudioCodec",
  "AudioSampleCount",
  "AudioSampleRate",
  "AvgBytesPerSec",
  "BitsPerSample",
  "DateTimeOriginal",
  "Encoding",
  "FrameCount",
  "FrameRate",
  "ImageHeight",
  "ImageWidth",
  "MaxDataRate",
  "NumChannels",
  "Quality",
  "SampleRate",
  "SampleSize",
  "Software",
  "StreamCount",
  "StreamType",
  "VideoCodec",
  "VideoFrameCount",
  "VideoFrameRate",
) satisfies StrEnum<keyof RIFFTags>;

export type RIFFTag = StrEnumKeys<typeof RIFFTagsNames>;

/**
 * @see https://exiftool.org/TagNames/IPTC.html
 */
export interface IPTCTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups IPTC
   * @example 4
   */
  ApplicationRecordVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example
   */
  "Caption-Abstract"?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, IPTC, MakerNotes
   * @example "Other"
   */
  Category?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups IPTC, MakerNotes, XMP
   * @example "TEDDINGTON"
   */
  City?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups IPTC
   * @example "UTF8"
   */
  CodedCharacterSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "Donna Ringmanumba"
   */
  Contact?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "Creative Commons Attribution 4.0 International"
   */
  CopyrightNotice?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, IPTC, XMP
   * @example "2025:06:11"
   */
  DateCreated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  DateSent?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, IPTC
   * @example "2025:06:11 11:07:41-08:00"
   */
  DateTimeCreated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  Destination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "2025:02:19"
   */
  DigitalCreationDate?: ExifDate | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "20:25:15"
   */
  DigitalCreationTime?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  EnvelopeNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "5 (normal urgency)"
   */
  EnvelopePriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example 4
   */
  EnvelopeRecordVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups IPTC, MakerNotes
   * @example "X3F"
   */
  FileFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example 2
   */
  FileVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  Headline?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ["red","car"]
   */
  Keywords?: string | string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "Artist deep into to wine and flower"
   */
  ObjectName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  OriginalTransmissionReference?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "digiKam"
   */
  OriginatingProgram?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups IPTC, XMP
   * @example "Tagged:1, ColorClass:5, Rating:0, FrameNum:000505"
   */
  Prefs?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example "4.13.0"
   */
  ProgramVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  ServiceIdentifier?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC, XMP
   * @example "Shutterfly McShutterface"
   */
  Source?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  SpecialInstructions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  SupplementalCategories?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups IPTC, MakerNotes
   * @example "23:59:46.92"
   */
  TimeCreated?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC
   * @example ""
   */
  TimeSent?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC, XMP
   * @example "1 (most urgent)"
   */
  Urgency?: string;
}

export const IPTCTagsNames = strEnum(
  "ApplicationRecordVersion",
  "Caption-Abstract",
  "Category",
  "City",
  "CodedCharacterSet",
  "Contact",
  "CopyrightNotice",
  "DateCreated",
  "DateSent",
  "DateTimeCreated",
  "Destination",
  "DigitalCreationDate",
  "DigitalCreationTime",
  "EnvelopeNumber",
  "EnvelopePriority",
  "EnvelopeRecordVersion",
  "FileFormat",
  "FileVersion",
  "Headline",
  "Keywords",
  "ObjectName",
  "OriginalTransmissionReference",
  "OriginatingProgram",
  "Prefs",
  "ProgramVersion",
  "ServiceIdentifier",
  "Source",
  "SpecialInstructions",
  "SupplementalCategories",
  "TimeCreated",
  "TimeSent",
  "Urgency",
) satisfies StrEnum<keyof IPTCTags>;

export type IPTCTag = StrEnumKeys<typeof IPTCTagsNames>;

export interface JFIFTags {
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups JFIF
   * @example 1.02
   */
  JFIFVersion?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, XMP
   * @example "inches"
   */
  ResolutionUnit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JFIF, MakerNotes
   * @example 120
   */
  ThumbnailHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (89%)
   * @groups EXIF, JFIF, MakerNotes
   * @example "(Binary data 10202 bytes, use -b option to extract)"
   */
  ThumbnailImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, JFIF
   * @example "(Binary data 57816 bytes, use -b option to extract)"
   */
  ThumbnailTIFF?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JFIF, MakerNotes
   * @example 160
   */
  ThumbnailWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
}

export const JFIFTagsNames = strEnum(
  "JFIFVersion",
  "ResolutionUnit",
  "ThumbnailHeight",
  "ThumbnailImage",
  "ThumbnailTIFF",
  "ThumbnailWidth",
  "XResolution",
  "YResolution",
) satisfies StrEnum<keyof JFIFTags>;

export type JFIFTag = StrEnumKeys<typeof JFIFTagsNames>;

export interface MakerNotesTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2
   */
  AccelerationTracking?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0.9421226483 0.0351725654 -0.3452420701"
   */
  AccelerationVector?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "358.3 11.2"
   */
  Accelerometer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9
   */
  AccelerometerX?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 80
   */
  AccelerometerY?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 56
   */
  AccelerometerZ?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus Priority"
   */
  ActionInAFCCont?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ActionPriority?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.0"
   */
  ActualCompensation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Disable"
   */
  AddIPTCInformation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  AddOriginalDecisionData?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  ADJDebugInfo?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "X3F Setting Mode"
   */
  AdjustmentMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ADLBracketingStep?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ADLBracketingType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 9
   */
  AdvancedSceneType?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9.9
   */
  AEAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  AEApertureSteps?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  AEBAutoCancel?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 0
   */
  AEBBracketValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE Bracketing Disabled"
   */
  AEBracketingSteps?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0,-,+"
   */
  AEBSequence?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0,-,+/Enabled"
   */
  AEBSequenceAutoCancel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "7 shots"
   */
  AEBShotCount?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.5
   */
  AEBXv?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 256 bytes, use -b option to extract)"
   */
  AEDebugInfo?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/965"
   */
  AEExposureTime?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 4096 bytes, use -b option to extract)"
   */
  AEHistogramInfo?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Hold"
   */
  AELButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Indicated"
   */
  AELExposureIndicator?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 4096 bytes, use -b option to extract)"
   */
  AELiveViewHistogramInfo?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 2048 bytes, use -b option to extract)"
   */
  AELiveViewLocalHistogram?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 2048 bytes, use -b option to extract)"
   */
  AELocalHistogram?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "On"
   */
  AELock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF Lock Only"
   */
  AELockButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AELockButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Evaluative"
   */
  AELockMeterModeAfterFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5.7
   */
  AEMaxAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "[2], Spot"
   */
  AEMeteringMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9.8 9.4 7.9 8.6 9.2 8.5 9.4 8.9 8.1 8.6 8.0 10.4 8.5 10.6…9.5 9.5"
   */
  AEMeteringSegments?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable; 0; 8; 0"
   */
  AEMicroadjustment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 38
   */
  AEMinAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/7723"
   */
  AEMinExposureTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sv or Green Mode"
   */
  AEProgramMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Daylight Fluorescent"
   */
  AEWhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  AEXv?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  AFAdjustment?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Metering start"
   */
  AFAndMeteringButtons?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 5.8
   */
  AFAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 840
   */
  AFAreaHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  AFAreaIllumination?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups MakerNotes
   * @example "Zone AF"
   */
  AFAreaMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Wide"
   */
  AFAreaModeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  AFAreaPointSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "none"
   */
  AFAreas?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "AF area selection button"
   */
  AFAreaSelectMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  AFAreaSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 996
   */
  AFAreaWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 5382
   */
  AFAreaXPosition?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example "999 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  AFAreaXPositions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 744
   */
  AFAreaYPosition?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example "950 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  AFAreaYPositions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  AFAreaZoneSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Only ext. flash emits/Fires"
   */
  AFAssist?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (4)"
   */
  AFAssistBeam?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (5)"
   */
  AFAssistLamp?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  AFButtonPressed?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  AFCHold?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  AFConfidence?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes"
   */
  AFCoordinatesAvailable?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Type 1"
   */
  AFCPointTracking?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  AFCSensitivity?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 256 bytes, use -b option to extract)"
   */
  AFDebugInfo?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9
   */
  AFDefocus?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Phase Detect"
   */
  AFDetectionMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Quick mode"
   */
  AFDuringLiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "On (2)"
   */
  AFFineTune?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 0
   */
  AFFineTuneAdj?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  AFFineTuneAdjTele?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  AFFineTuneIndex?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "297 224 47 33"
   */
  AFFocusArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "720x480"
   */
  AFFrameSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  AFIlluminator?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example 88
   */
  AFImageHeight?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example 8688
   */
  AFImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0402"
   */
  AFInfo2Version?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "90 ms"
   */
  AFIntegrationTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 96
   */
  AFMeasuredDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  AFMicroAdj?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown (3)"
   */
  AFMicroAdjMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2
   */
  AFMicroAdjRegisteredLenses?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable; 0; 0; 0; 84"
   */
  AFMicroadjustment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  AFMicroAdjValue?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "Zone"
   */
  AFMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  AFModeRestrictions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  AFOnAELockButtonSwitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF-On"
   */
  AFOnButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "98 1 31"
   */
  AFPerformance?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups MakerNotes
   * @example "Upper-right"
   */
  AFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  AFPointActivationArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  AFPointAreaExpansion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Left (vertical)"
   */
  AFPointAtShutterRelease?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Control-direct:disable/Main:enable"
   */
  AFPointAutoSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  AFPointBrightness?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 897
   */
  AFPointDetails?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Selected (pre-AF, focused)"
   */
  AFPointDisplayDuringFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On in Continuous Shooting and Manual Focusing"
   */
  AFPointIllumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Left (vertical)"
   */
  AFPointInFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "[2]"
   */
  AFPointMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "none"
   */
  AFPointPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Center"
   */
  AFPointRegistration?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Center"
   */
  AFPoints?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Use Half"
   */
  AFPointSel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example "n/a"
   */
  AFPointSelected?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "H=AF+Main/V=AF+Command"
   */
  AFPointSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (1046 1046)"
   */
  AFPointSelectionMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Lower-right"
   */
  AFPointSetting?: string;
  /**
   * @frequency 🔥 ★★☆☆ (17%)
   * @groups MakerNotes
   * @example "Upper-right, Top"
   */
  AFPointsInFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "C6 (C6)"
   */
  AFPointsInFocus1D?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Center"
   */
  AFPointsInFocus5D?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9/Active AF point"
   */
  AFPointSpotMetering?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 9
   */
  AFPointsSelected?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 7
   */
  AFPointsSpecial?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Top"
   */
  AFPointsUsed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 903
   */
  AFPredictor?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  AFTracking?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "79-point"
   */
  AFType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  AFWithShutter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (2)"
   */
  AIServoFirstImagePriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1: AF, 2: Tracking"
   */
  AIServoImagePriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (2)"
   */
  AIServoSecondImagePriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Main focus point priority"
   */
  AIServoTrackingMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  AIServoTrackingSensitivity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  AISubjectTrackingMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Standard"
   */
  AmbienceSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, MakerNotes
   * @example "40 C"
   */
  AmbientTemperature?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "95 F"
   */
  AmbientTemperatureFahrenheit?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "google/comet/comet:14/AD1A.240530.047/12143574:user/release-keys"
   */
  AndroidRelease?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  AntiFlicker?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 2000
   */
  AntiShockWaitingTime?: number;
  /**
   * @frequency 🔥 ★★★★ (85%)
   * @groups APP, Composite, MakerNotes
   * @example 90
   */
  Aperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  ApertureLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Prohibited"
   */
  ApertureRingUse?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9.1
   */
  ApertureSetting?: number;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example 9016997700
   */
  ApertureValue?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "com.google.android.GoogleCamera"
   */
  Application?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ApplySettingsToLiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable; 1; 2; 1; 128; 48; 0; 1"
   */
  ApplyShootingMeteringMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  ApproximateFNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9.5.118.667383577.24"
   */
  AppVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Soft Focus; 1280; 0; 0"
   */
  ArtFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off; 0; 0; Partial Color 0; No Effect; 0; No Color Filter…0; 0; 0"
   */
  ArtFilterEffect?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups EXIF, MakerNotes
   * @example "Arturo DeImage"
   */
  Artist?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (8305)"
   */
  ArtMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  ArtModeParameters?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0 192 4607 3263"
   */
  AspectFrame?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto Bracketing"
   */
  AssignBktButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "LCD brightness"
   */
  AssignFuncButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignMovieFunc1ButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignMovieFunc2Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignMoviePreviewButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Shutter/Aperture Lock"
   */
  AssignMovieRecordButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignMovieRecordButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE/AF Lock"
   */
  AssignMovieSubselector?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignMovieSubselectorPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AssignRemoteFnButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Select Home Position"
   */
  AssistButtonFunction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "No"
   */
  Audio?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example 3
   */
  AudioChannels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  AudioCompression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example 8000
   */
  AudioSampleRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On-Shot AF only"
   */
  AutoAFPointColorTracking?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Enable"
   */
  AutoAFPointSelEOSiTRAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  AutoAperture?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  AutoBracket?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Flash/Speed"
   */
  AutoBracketingMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE Only"
   */
  AutoBracketingSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Flash/Speed"
   */
  AutoBracketModeM?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0,-,+"
   */
  AutoBracketOrder?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Exposure"
   */
  AutoBracketSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  AutoDistortionControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "400%"
   */
  AutoDynamicRange?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "On"
   */
  AutoExposureBracketing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Subject and Background"
   */
  AutoFlashISOSensitivity?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No Limit"
   */
  AutoFocusModeRestrictions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  AutoFP?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 96
   */
  AutoISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 800
   */
  AutoISOMax?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/30 s"
   */
  AutoISOMinShutterSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Standard"
   */
  AutoLightingOptimizer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "No"
   */
  AutoPortraitFramed?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @groups MakerNotes
   * @example "Rotate 90 CW"
   */
  AutoRotate?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  AuxiliaryLens?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 6.7
   */
  AvApertureSetting?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "513 513 513 513"
   */
  AverageBlackLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9.875
   */
  AverageLV?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable"
   */
  AvSettingWithoutLens?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "99:99:99 00:00:00"
   */
  BabyAge?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example ""
   */
  BabyName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example "R0000148"
   */
  Barcode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  BaseExposureCompensation?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 800
   */
  BaseISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example "n/a"
   */
  BatteryLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "MB-D12 First"
   */
  BatteryOrder?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sufficient Power Remaining"
   */
  BatteryState?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "50.6 C"
   */
  BatteryTemperature?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "NB-13L"
   */
  BatteryType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "8.52 V"
   */
  BatteryVoltage?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  BayerPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  Beep?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  BeepPitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  BeepVolume?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sports CS"
   */
  BestShotMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File, MakerNotes, QuickTime
   * @example 8
   */
  BitDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, RAF
   * @example "94 95 93 93"
   */
  BlackLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "131 128 131 128"
   */
  BlackLevels?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 2209
   */
  BlackMaskBottomBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 14
   */
  BlackMaskLeftBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 55
   */
  BlackMaskRightBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 162
   */
  BlackMaskTopBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "7 104 106 6"
   */
  BlackPoint?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  BleachBypassToning?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups Composite, MakerNotes
   * @example 46
   */
  BlueBalance?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off; 0; 0; 0"
   */
  BlurControl?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "None"
   */
  BlurWarning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "28 C"
   */
  BoardTemperature?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 165
   */
  BodyBatteryADLoad?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 199
   */
  BodyBatteryADNoLoad?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 80
   */
  BodyBatteryPercent?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Running Low"
   */
  BodyBatteryState?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7.77 V"
   */
  BodyBatteryVoltage?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "RS1 :V01500000 "
   */
  BodyFirmware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 81
   */
  BodyFirmwareVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "SID:14101105   "
   */
  BodySerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  BracketIncrement?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable"
   */
  BracketingBurstOptions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  BracketMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disabled"
   */
  BracketProgram?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0"
   */
  BracketSequence?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE/Flash"
   */
  BracketSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "No Bracket"
   */
  BracketSettings?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 0
   */
  BracketShotNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (429458713)"
   */
  BracketStep?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 12
   */
  BracketValue?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes, XMP
   * @example 9.25
   */
  Brightness?: number;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9.9919505
   */
  BrightnessValue?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "SU6-7"
   */
  BuildNumber?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 0
   */
  BulbDuration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  BurstGroupID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Unlimited"
   */
  BurstMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9
   */
  BurstSpeed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "460727F2-20CF-4031-957B-7E04D567DF1F"
   */
  BurstUUID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal (enable)"
   */
  ButtonFunctionControlOff?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  BWFilter?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "On"
   */
  BWMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "666 500 4668 3000"
   */
  CAFArea?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7x7"
   */
  CAFGridSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(none)"
   */
  CAFPointsInFocus?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9,10,11,12,13,16,17,18,19,20,23,24,25,26,27"
   */
  CAFPointsSelected?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Starting calibration file for SD14F13_Rev3; S/N C75_00001…8:16:34"
   */
  Calibration?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2216/02/28 03:49:48"
   */
  CameraDateTime?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "h Company Ltd."
   */
  CameraID?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example "n/a"
   */
  CameraISO?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes
   * @example "Z-CAMERA"
   */
  CameraModel?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example "Unknown (155)"
   */
  CameraOrientation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "User Defined 3"
   */
  CameraPictureStyle?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example -90
   */
  CameraPitch?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.00"
   */
  CameraRoll?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "0100"
   */
  CameraSettingsVersion?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups APP, MakerNotes
   * @example "uD800,S800"
   */
  CameraType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+90.80"
   */
  CameraYaw?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "Unknown (-1)"
   */
  CanonExposureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Full automatic mode"
   */
  CanonFileDescription?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3794598
   */
  CanonFileLength?: number;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example "Firmware version 1.00"
   */
  CanonFirmwareVersion?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "n/a"
   */
  CanonFlashMode?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example 768
   */
  CanonImageHeight?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "n/a"
   */
  CanonImageSize?: string;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups MakerNotes
   * @example "PIC:DC50 JPEG"
   */
  CanonImageType?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example 8688
   */
  CanonImageWidth?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "XH A1S"
   */
  CanonModelID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  CardShutterLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  CaseAutoSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes, XMP
   * @example "People"
   */
  Categories?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, IPTC, MakerNotes
   * @example "Other"
   */
  Category?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2
   */
  CCDBoardVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Interlaced"
   */
  CCDScanMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CCDSensitivity?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CCDVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal Zone"
   */
  CenterAFArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal Zone"
   */
  CenterFocusPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9 fps"
   */
  CHModeShootingSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  ChromaticAberrationCorr?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF, MakerNotes
   * @example "On"
   */
  ChromaticAberrationCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "9758 13871 16956 16964 14142 9776 30 9502 13101 15416 151…1 15949"
   */
  ChromaticAberrationCorrParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  ChromaticAberrationSetting?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.500"
   */
  ChrominanceNoiseReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups IPTC, MakerNotes, XMP
   * @example "TEDDINGTON"
   */
  City?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "San Francisco"
   */
  City2?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 4
   */
  Clarity?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ClarityControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  ClearRetouch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sub-command Dial"
   */
  CmdDialsApertureSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Autofocus Off, Exposure Off"
   */
  CmdDialsChangeMainSub?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On (Image Review Excluded)"
   */
  CmdDialsMenuAndPlayback?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "No"
   */
  CmdDialsReverseRotation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CmdDialsReverseRotExposureComp?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  ColorAdjustment?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ColorAdjustmentMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 256
   */
  ColorBalanceBlue?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 65792
   */
  ColorBalanceGreen?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2.4960938
   */
  ColorBalanceRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "R01,"
   */
  ColorBalanceVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 24
   */
  ColorBitDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 257
   */
  ColorBW?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  ColorChromeEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ColorChromeFXBlue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8
   */
  ColorCompensationFilter?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ColorCompensationFilterCustom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ColorCompensationFilterSet?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "96 4096 3072 4096 16 256"
   */
  ColorControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Color 0; 0; 29; Strength 0; -4; 3"
   */
  ColorCreatorEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (65)"
   */
  ColorDataVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Warm"
   */
  ColorEffect?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ColorFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0.00 0.00 0.00"
   */
  ColorGain?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Mode3a"
   */
  ColorHue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "953 -8 79 188 970 -134 105 -19 938"
   */
  ColorMatrix?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1.66016 -0.66016 0.00000 -0.20703 1.52734 -0.32031 -0.132…1.42969"
   */
  ColorMatrixA?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1.12793 -0.03674 -0.09119 -0.20703 1.52734 -0.32031 -0.13…1.35791"
   */
  ColorMatrixB?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 4
   */
  ColorMatrixNumber?: number;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups APP, MakerNotes, XMP
   * @example "n/a"
   */
  ColorMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Min -5; Max 5; Yellow 0; Orange 0; Orange-red 0; Red 0; M…green 0"
   */
  ColorProfileSettings?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "sRGB"
   */
  ColorSpace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8059
   */
  ColorTempAsShot?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 7397
   */
  ColorTempAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 7103
   */
  ColorTempCloudy?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5210
   */
  ColorTempCustom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 6071
   */
  ColorTempDaylight?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes, XMP
   * @example 9900
   */
  ColorTemperature?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 7820
   */
  ColorTemperatureAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "6300 K"
   */
  ColorTemperatureCustom?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7200 K"
   */
  ColorTemperatureSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Temperature"
   */
  ColorTemperatureSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 9826
   */
  ColorTempFlash?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 5892
   */
  ColorTempFluorescent?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 8001
   */
  ColorTempKelvin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 7397
   */
  ColorTempMeasured?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 7830
   */
  ColorTempShade?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 5892
   */
  ColorTempTungsten?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  ColorTint?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Normal"
   */
  ColorTone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ColorToneAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ColorToneFaithful?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 11
   */
  ColorToneLandscape?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ColorToneNeutral?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ColorTonePortrait?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 15663191
   */
  ColorToneStandard?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard (Main Shutter, Sub Aperture)"
   */
  CommandDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sub-command Dial"
   */
  CommandDialsApertureSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  CommandDialsChangeMainSub?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On (Image Review Excluded)"
   */
  CommandDialsMenuAndPlayback?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  CommandDialsReverseRotation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3
   */
  CommanderChannel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Full"
   */
  CommanderGroupAManualOutput?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "TTL"
   */
  CommanderGroupAMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Full"
   */
  CommanderGroupBManualOutput?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "TTL"
   */
  CommanderGroupBMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "TTL"
   */
  CommanderInternalFlash?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Full"
   */
  CommanderInternalManualOutput?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example -3
   */
  CommanderInternalTTLCompBuiltin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example -3
   */
  CommanderInternalTTLCompGroupA?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example -3
   */
  CommanderInternalTTLCompGroupB?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 45
   */
  Compass?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  ComponentBitDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Component version 1.00"
   */
  ComponentVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Panorama"
   */
  CompositeImageMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  CompositionAdjust?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  CompositionAdjustRotation?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 4
   */
  CompositionAdjustX?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  CompositionAdjustY?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 98047
   */
  CompressedImageSize?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, File, MakerNotes, XMP
   * @example "Unknown (1536)"
   */
  Compression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 8
   */
  CompressionFactor?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8
   */
  CompressionRatio?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example "CanonCR3_001/01.11.00/00.00.00"
   */
  CompressorVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, QuickTime
   * @example "FFCBAC24-E547-4BBC-AF47-38B1A3D845E3"
   */
  ContentIdentifier?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Low"
   */
  ContinuousBracketing?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "Unknown (11)"
   */
  ContinuousDrive?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  ContinuousModeDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ContinuousModeLiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Hi 15000; Cont 15000; Lo 5000; Soft 8000; Soft LS 3000"
   */
  ContinuousShootingSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable; 99 shots"
   */
  ContinuousShotLimit?: string;
  /**
   * @frequency 🔥 ★★★★ (60%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Contrast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ContrastAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "(Binary data 578 bytes, use -b option to extract)"
   */
  ContrastCurve?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "496 184 48 48"
   */
  ContrastDetectAFArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  ContrastDetectAFInFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6553600
   */
  ContrastFaithful?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ContrastHighlight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ContrastHighlightShadowAdj?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6553600
   */
  ContrastLandscape?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (19)"
   */
  ContrastMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 524288
   */
  ContrastMonochrome?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ContrastNeutral?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9699328
   */
  ContrastPortrait?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "1 (min -5, max 5)"
   */
  ContrastSetting?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ContrastShadow?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 12058626
   */
  ContrastStandard?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Shutter Speed"
   */
  ControlDialSet?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ControllerBoardVersion?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ControlMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "High"
   */
  ControlRingResponse?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  ControlRingRotation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  ConversionLens?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  Converter?: number;
  /**
   * @frequency 🔥 ★★★☆ (21%)
   * @groups EXIF, MakerNotes
   * @example "© Chuckles McSnortypants, Inc."
   */
  Copyright?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 6807
   */
  CorrelatedColorTemp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "United States"
   */
  Country?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "ir"
   */
  CountryCode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1.02.00.06"
   */
  CPUFirmwareVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "d, 2009:09:04 03:19:07"
   */
  CPUVersions?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "2218:09:22 02:32:14"
   */
  CreateDate?: ExifDateTime | ExifDate | string | number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  CreativeStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  CreativeStyleSetting?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "8 8 6048 4024"
   */
  CropArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 48
   */
  CropBottomMargin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example 7776
   */
  CropHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off (7424x4924 cropped to 7424x4924 at pixel 0,0)"
   */
  CropHiSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropLeft?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8240
   */
  CropLeftMargin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  CropMode?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example 5792
   */
  CroppedImageHeight?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example 3153968
   */
  CroppedImageLeft?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example 0
   */
  CroppedImageTop?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example 8688
   */
  CroppedImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8240
   */
  CropRightMargin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropTop?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8240
   */
  CropTopMargin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example 5184
   */
  CropWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  CrossProcess?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "20 0 19 2 0 65535 65535 65535 2 2 0 65535 65535 65535 18 … 4 5 31"
   */
  CustomControls?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 1 30 31 0 0 0 0 0 0 2 30 31 0 0 0 0 0 0 5 30 31 0 0 0…1 1 1 0"
   */
  CustomizeDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "P-STUDIO"
   */
  CustomPictureStyleFileName?: string;
  /**
   * @frequency 🔥 ★★★★ (64%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Custom process)"
   */
  CustomRendered?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "CS3 (min CS0, max CS4)"
   */
  CustomSaturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  CustomSettingsAllDefault?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "B"
   */
  CustomSettingsBank?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CustomWBBlueLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "OK"
   */
  CustomWBError?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CustomWBGreenLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  CustomWBRedLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Setup"
   */
  CustomWBSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Yes"
   */
  DarkFocusEnvironment?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example "(Binary data 280 bytes, use -b option to extract)"
   */
  DataDump?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 8289
   */
  DataScaling?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "2021:08:22"
   */
  Date?: ExifDate | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Y/M/D"
   */
  DateDisplayFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DateImprint?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example "Off"
   */
  DateStampMode?: string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DateTimeStamp?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "2023:10:17 14:59:23"
   */
  DateTimeUTC?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "Yes"
   */
  DaylightSavings?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (27471)"
   */
  DECPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3
   */
  DeletedImageCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Warsaw"
   */
  DestinationCity?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "    "
   */
  DestinationCityCode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes"
   */
  DestinationDST?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 200
   */
  DevelopmentDynamicRange?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "comet"
   */
  DeviceCodename?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "MP1.0"
   */
  DeviceHardwareRevision?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Google"
   */
  DeviceMake?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Pixel 9 Pro Fold"
   */
  DeviceModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "SMX Video Camera"
   */
  DeviceType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Normal"
   */
  DialDirectionTvAv?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  DiffractionCompensation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  DigitalFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 0
   */
  DigitalGain?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DigitalICE?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Standard"
   */
  DigitalLensOptimizer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  DigitalLensOptimizerSetting?: string;
  /**
   * @frequency 🔥 ★★★☆ (25%)
   * @groups APP, Composite, MakerNotes
   * @example "undef.0"
   */
  DigitalZoom?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example "Yes"
   */
  DigitalZoomOn?: string;
  /**
   * @frequency 🔥 ★★★☆ (49%)
   * @groups EXIF, MakerNotes, XMP
   * @example 8.1319764
   */
  DigitalZoomRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 897
   */
  DirectoryIndex?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 999
   */
  DirectoryNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "DISP - Cycle Information Display (shooting)"
   */
  DispButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  DisplayAllAFPoints?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9.5
   */
  DisplayAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DistortionControl?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups EXIF, MakerNotes, PanasonicRaw
   * @example "Unknown (60)"
   */
  DistortionCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "n/a"
   */
  DistortionCorrectionSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 100
   */
  DistortionCorrectionValue?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0100"
   */
  DistortionCorrectionVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "88 0 -136 -288 -480 -696 -944 -1200 -1480 -1752 -2040 0 0 0 0 0"
   */
  DistortionCorrParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes"
   */
  DistortionCorrParamsPresent?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups Composite, MakerNotes
   * @example "Video; n/a; Shutter Button; Video"
   */
  DriveMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Single Frame"
   */
  DriveModeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  DriveSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "100.00.00.00"
   */
  DSPFirmwareVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  DualPixelRaw?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, MakerNotes, QuickTime, XMP
   * @example 9.5095
   */
  Duration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  DustRemovalData?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DXCropAlert?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9 Points"
   */
  DynamicAFArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  DynamicAreaAFAssist?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  DynamicAreaAFDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Wide"
   */
  DynamicRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DynamicRangeBoost?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On; Enabled; 0; 0"
   */
  DynamicRangeExpansion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Standard"
   */
  DynamicRangeOptimizer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  DynamicRangeOptimizerBracket?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  DynamicRangeOptimizerLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  DynamicRangeOptimizerMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  DynamicRangeOptimizerSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Manual"
   */
  DynamicRangeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  EasyExposureComp?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "Unknown (83)"
   */
  EasyMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 5.7
   */
  EffectiveMaxAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  ElectronicFrontCurtainShutter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes
   * @example 1
   */
  Emissivity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  EnergySavingMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  Enhancement?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 960
   */
  Enhancer?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 480
   */
  EpsonImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 640
   */
  EpsonImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "https://PhotoStructure.com/"
   */
  EpsonSoftware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "0100"
   */
  EquipmentVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Evaluative"
   */
  ETTLII?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 89
   */
  EventNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/3 EV Steps"
   */
  EVSteps?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "97.5 mm"
   */
  ExitPupilPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Indicated"
   */
  ExposureBracketingIndicatorLast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureBracketShotNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.5
   */
  ExposureBracketStepSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureBracketValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  ExposureCompAutoCancel?: string;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 1
   */
  ExposureCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Ambient and Flash"
   */
  ExposureCompensationMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureCompensationSet?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureCompensationSetting?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/3 EV"
   */
  ExposureCompStepSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/3 EV"
   */
  ExposureControlStep?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example 1
   */
  ExposureCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureDifference?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureIndicator?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "1/3-stop set, 1/3-stop comp."
   */
  ExposureLevelIncrements?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Spot metering"
   */
  ExposureModeInManual?: string;
  /**
   * @frequency 🔥 ★★★★ (69%)
   * @groups EXIF, MakerNotes, XMP
   * @example "iAuto+"
   */
  ExposureProgram?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureShift?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "inf"
   */
  ExposureTime?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 32
   */
  ExposureTimeMax?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.000084738001
   */
  ExposureTimeMin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  ExposureTuning?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "Good"
   */
  ExposureWarning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Manual"
   */
  EXRAuto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "HR (High Resolution)"
   */
  EXRMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ExtendedMenuBanks?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ExtendedShutterSpeeds?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  ExtendedWBDetect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "None"
   */
  Extender?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  ExtenderFirmwareVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example ""
   */
  ExtenderModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example ""
   */
  ExtenderSerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite, MakerNotes
   * @example "Not attached"
   */
  ExtenderStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  ExternalFlash?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ExternalFlashBounce?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExternalFlashCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  ExternalFlashExposureComp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ExternalFlashFirmware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "(none)"
   */
  ExternalFlashFlags?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ExternalFlashGuideNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ExternalFlashGValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  ExternalFlashMode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ExternalFlashReadyState?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Flash Not Attached"
   */
  ExternalFlashStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 54
   */
  ExternalFlashZoom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "No"
   */
  ExternalFlashZoomOverride?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9.14
   */
  ExternalSensorBrightnessValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0.2.0.0"
   */
  ExtraInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  EyeDetection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  EyeStartAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (II*)"
   */
  FaceDetect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "(Binary data 383 bytes, use -b option to extract)"
   */
  FaceDetectArea?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 26 640 428 0 26 640 428 0 0 0 0"
   */
  FaceDetectFrameCrop?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "720 480"
   */
  FaceDetectFrameSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  FaceDetection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "918 1058 1959 2101"
   */
  FaceElementPositions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "892 917 2131 2135"
   */
  FaceElementSelected?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (4096)"
   */
  FaceElementTypes?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "6000 4000"
   */
  FaceImageSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 9
   */
  FaceInfoLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 94
   */
  FaceInfoOffset?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example ""
   */
  FaceName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "918 1058 1959 2101"
   */
  FacePositions?: string;
  /**
   * @frequency 🔥 ★★★☆ (21%)
   * @groups MakerNotes
   * @example 65535
   */
  FacesDetected?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  FacesDetectedA?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  FacesDetectedB?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 12336
   */
  FacesRecognized?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 35
   */
  FaceWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  Fade?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable; 0; 8; 0"
   */
  FEMicroadjustment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups IPTC, MakerNotes
   * @example "X3F"
   */
  FileFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9984
   */
  FileIndex?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0100"
   */
  FileInfoVersion?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups Composite, MakerNotes
   * @example "986-8698"
   */
  FileNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (65537)"
   */
  FileNumberMemory?: string;
  /**
   * @frequency 🔥 ★★★★ (63%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (DSC)"
   */
  FileSource?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  FillFlashAutoReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FilmGrainEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FilmMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "NEGATIVE(MONO) "
   */
  FilmType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FilterEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FilterEffectAuto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (0x10000)"
   */
  FilterEffectMonochrome?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  FinderDisplayDuringExposure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On; Normal"
   */
  FineSharpness?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  FineTuneOptHighlightWeighted?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 9236 bytes, use -b option to extract)"
   */
  FinishedImage?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "u77"
   */
  Firmware?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2015:11:09 08:38"
   */
  FirmwareDate?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 21870002
   */
  FirmwareID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "NX1_000000"
   */
  FirmwareName?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "Rev01500000"
   */
  FirmwareRevision?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus Priority"
   */
  FirstFrameActionInAFC?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  FisheyeFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Fired"
   */
  FlashAction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Did not fire"
   */
  FlashActionExternal?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 255
   */
  FlashActivity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FlashBatteryLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 0
   */
  FlashBias?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "Manual, External"
   */
  FlashBits?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Exposure"
   */
  FlashBurstPriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Raise built-in flash"
   */
  FlashButtonFunction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  FlashChargeLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "None"
   */
  FlashColorFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashCommanderMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, XMP
   * @example 0
   */
  FlashCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Pre-flash TTL"
   */
  FlashControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "iTTL-BL"
   */
  FlashControlMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FlashCurtain?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Fill Flash"
   */
  FlashDefault?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (0 0)"
   */
  FlashDevice?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 53
   */
  FlashDistance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0.3
   */
  FlashExposureBracketValue?: number;
  /**
   * @frequency 🔥 ★★★☆ (27%)
   * @groups MakerNotes
   * @example 10
   */
  FlashExposureComp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Entire frame"
   */
  FlashExposureCompArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  FlashExposureCompSet?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Indicated"
   */
  FlashExposureIndicator?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Indicated"
   */
  FlashExposureIndicatorLast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Indicated"
   */
  FlashExposureIndicatorNext?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashExposureLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, PanasonicRaw
   * @example "Yes"
   */
  FlashFired?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Fires"
   */
  FlashFiring?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 1.005
   */
  FlashFirmwareVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "12 mm"
   */
  FlashFocalLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No flash"
   */
  FlashFunction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  FlashGNDistance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  FlashGroupACompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashGroupAControlMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  FlashGroupBCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashGroupBControlMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  FlashGroupCCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashGroupCControlMode?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example 9
   */
  FlashGuideNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  FlashIlluminationPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "0301"
   */
  FlashInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a (x4)"
   */
  FlashIntensity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FlashLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "TTL"
   */
  FlashMasterControlMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (65797)"
   */
  FlashMetering?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashMeteringMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "18.0 18.5 20.0 20.0 20.0 20.0 20.0 20.0 20.0 18.6 18.0 18….2 19.0"
   */
  FlashMeteringSegments?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "Unknown (c2)"
   */
  FlashMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "None"
   */
  FlashModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Red-eye reduction"
   */
  FlashOptions?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example 94
   */
  FlashOutput?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashRemoteControl?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "01114671"
   */
  FlashSerialNumber?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "Uw-Normal"
   */
  FlashSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "None"
   */
  FlashSource?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlashStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  FlashStatusExternal?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Front curtain"
   */
  FlashSyncMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Auto"
   */
  FlashSyncSpeedAv?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8.5
   */
  FlashThreshold?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, MakerNotes
   * @example "Optional,TTL"
   */
  FlashType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes (flash required but disabled)"
   */
  FlashWarning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "410 180"
   */
  FlexibleSpotPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Left to Right"
   */
  FlickAdvanceDirection?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  FlickerReduce?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off (0x3223)"
   */
  FlickerReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlickerReductionIndicator?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  FlickerReductionShooting?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1321,81,37"
   */
  FlightDegree?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9,0,0"
   */
  FlightSpeed?: string;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 90
   */
  FNumber?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups EXIF, MakerNotes, XMP
   * @example "99.7 mm"
   */
  FocalLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "70.0 mm"
   */
  FocalLengthTeleZoom?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "640 428"
   */
  FocalPlaneAFPointArea?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "9.45 mm"
   */
  FocalPlaneDiagonal?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "9.02 mm"
   */
  FocalPlaneXSize?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "8.10 mm"
   */
  FocalPlaneYSize?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "32/mm"
   */
  FocalUnits?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Wide Focus (normal)"
   */
  FocusArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No Wrap"
   */
  FocusAreaSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  FocusBracket?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  FocusBracketStepSize?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example "Single"
   */
  FocusContinuous?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  FocusDisplayAIServoAndMF?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups APP, Composite, MakerNotes, XMP
   * @example "inf"
   */
  FocusDistance?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example "inf"
   */
  FocusDistanceLower?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7.68 - 36.90 m"
   */
  FocusDistanceRange?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example "inf"
   */
  FocusDistanceUpper?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  FocusFrameSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus Hold"
   */
  FocusHoldButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0100"
   */
  FocusInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Eh-A"
   */
  FocusingScreen?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "9504 6336 6088 2389"
   */
  FocusLocation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  FocusLocked?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups APP, MakerNotes
   * @example "Unknown (860272)"
   */
  FocusMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Manual"
   */
  FocusModeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF"
   */
  FocusModeSwitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Red"
   */
  FocusPeakingHighlightColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FocusPeakingLevel?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "972 1296"
   */
  FocusPixel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  FocusPointBrightness?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  FocusPointPersistence?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  FocusPointSchema?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  FocusPointSelectionSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Wrap"
   */
  FocusPointWrap?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 999
   */
  FocusPosition?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "C"
   */
  FocusPositionHorizontal?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "C"
   */
  FocusPositionVertical?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "AF Used; 96"
   */
  FocusProcess?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MakerNotes
   * @example "Unknown (2)"
   */
  FocusRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7 (very far)"
   */
  FocusRangeIndex?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus"
   */
  FocusResult?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  FocusRingRotation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "M"
   */
  FocusSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  FocusShiftExposureLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "3 Seconds"
   */
  FocusShiftInterval?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  FocusShiftNumberShots?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FocusShiftShooting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  FocusShiftStepWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not confirmed, Tracking"
   */
  FocusStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups APP, MakerNotes, PanasonicRaw
   * @example 98
   */
  FocusStepCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 9713
   */
  FocusStepInfinity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, PanasonicRaw
   * @example 9804
   */
  FocusStepNear?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FocusTrackingLockOn?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "Out of focus"
   */
  FocusWarning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 373
   */
  FolderNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, RIFF
   * @example 9
   */
  FrameCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, Meta
   * @example 849
   */
  FrameNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, MakerNotes, RIFF
   * @example 9
   */
  FrameRate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  FramingGridDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 12 bytes, use -b option to extract)"
   */
  FreeBytes?: BinaryField | string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "Red-eye reduction"
   */
  FujiFlashMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "X100V_0100"
   */
  FujiModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "9504x6336"
   */
  FullImageSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  FullPressSnap?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Zoom (High)"
   */
  Func1Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  Func1ButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Virtual Horizon"
   */
  Func2Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Voice Memo"
   */
  Func3Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Virtual Horizon"
   */
  FuncButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  FuncButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "ISO Display"
   */
  FunctionButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 256
   */
  GainBase?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4320x3240"
   */
  GEImageSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "GEDSC DIGITAL CAMERA           "
   */
  GEMake?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "J1470S"
   */
  GEModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1279,-900,0"
   */
  GimbalDegree?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a; User-Selected"
   */
  Gradation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  GrainEffectRoughness?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  GrainEffectSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  GrainyBWFilter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2E"
   */
  GreenGain?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  GridDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 157
   */
  GripBatteryADLoad?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  GripBatteryADNoLoad?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  GripBatteryPercent?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "5.90 V"
   */
  GripBatteryVoltage?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Squares"
   */
  GroupAreaAFIllumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (5)"
   */
  HDMIBitDepth?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  HDMIExternalRecorder?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  HDMIOutputRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  HDMIOutputResolution?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Natural"
   */
  HDREffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1.7904162
   */
  HDRGain?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1.568873
   */
  HDRHeadroom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0200"
   */
  HDRInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  HDRLevel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "https://PhotoStructure.com/"
   */
  HDRPSoftware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, MakerNotes
   * @example "On (Manual)"
   */
  HDRSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  HDRSmoothing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 53248
   */
  HiddenDataLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 7995392
   */
  HiddenDataOffset?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  HighFrameRate?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.1
   */
  Highlight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  Highlights?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 (normal)"
   */
  HighlightTone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  HighlightTonePriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Yes"
   */
  HighlightWarning?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 4
   */
  HighLowKeyAdj?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  HighSpeedSync?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  Histogram?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "ndon"
   */
  HometownCity?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "NYC "
   */
  HometownCityCode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes"
   */
  HometownDST?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2
   */
  HostSoftwareExportVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (4 4)"
   */
  HostSoftwareRendering?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  Hue?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  HueAdjust?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  HueAdjustment?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 8 bytes, use -b option to extract)"
   */
  HyperlapsDebugInfo?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  Illumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Normal"
   */
  ImageAdjustment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "FX (36x24)"
   */
  ImageArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ImageAuthentication?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0 0 8256 5504"
   */
  ImageBoundary?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (9)"
   */
  ImageCaptureType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 994
   */
  ImageCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 9236 bytes, use -b option to extract)"
   */
  ImageData?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 9927271
   */
  ImageDataSize?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 1
   */
  ImageEditCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Red-eye Correction"
   */
  ImageEditing?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  ImageEffects?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Re-developed from RAW"
   */
  ImageGeneration?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 912
   */
  ImageIDNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Finished image"
   */
  ImageName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9956
   */
  ImageNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  ImageOptimization?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Red Eye Ruduction ;"
   */
  ImageProcessing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "0112"
   */
  ImageProcessingVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Very High"
   */
  ImageQuality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ImageReview?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4 s"
   */
  ImageReviewTime?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  ImageRotated?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Small"
   */
  ImageSizeRAW?: string;
  /**
   * @frequency 🔥 ★★★☆ (21%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ImageStabilization?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ImageStabilizationSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "StyleBox2"
   */
  ImageStyle?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 94
   */
  ImageTemperatureMax?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 86
   */
  ImageTemperatureMin?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Vibrant"
   */
  ImageTone?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Displays shooting functions"
   */
  InfoButtonWhenShooting?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  InfraredIlluminator?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Manual AF point"
   */
  InitialAFPointAIServoAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Initial AF Point Selected"
   */
  InitialAFPointInServo?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Low Magnification"
   */
  InitialZoomLiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Medium Magnification"
   */
  InitialZoomSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 876 bytes, use -b option to extract)"
   */
  InitParamsText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Image Only"
   */
  InstantPlaybackSetup?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "5 s"
   */
  InstantPlaybackTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "On"
   */
  IntelligentAuto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "n/a"
   */
  IntelligentContrast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Standard"
   */
  IntelligentExposure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Standard"
   */
  IntelligentResolution?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "TTL"
   */
  InternalFlash?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Did not fire, Red-eye reduction"
   */
  InternalFlashMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 63
   */
  InternalFlashStrength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 95
   */
  InternalFlashTable?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  InternalNDFilter?: number;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups MakerNotes
   * @example "fdfec409"
   */
  InternalSerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  IntervalDurationHours?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  IntervalDurationMinutes?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  IntervalDurationSeconds?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  IntervalExposureSmoothing?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 65542
   */
  IntervalLength?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Still Image"
   */
  IntervalMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 65797
   */
  IntervalNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  IntervalPriority?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  Intervals?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  IntervalShooting?: string;
  /**
   * @frequency 🔥 ★★★★ (91%)
   * @groups Composite, EXIF, MakerNotes, XMP
   * @example 993
   */
  ISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 800
   */
  ISO2?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ISOAuto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Same As Without Flash"
   */
  ISOAutoFlashLimit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (0x6)"
   */
  ISOAutoHiLimit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 800
   */
  ISOAutoMax?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 80
   */
  ISOAutoMin?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Shutter Speed Control; 1/32"
   */
  ISOAutoMinSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Auto (Fastest)"
   */
  ISOAutoShutterTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Show Frame Count"
   */
  ISODisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "On"
   */
  ISOExpansion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 800
   */
  ISOFloor?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9846.1543
   */
  ISOMax?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 49.615387
   */
  ISOMin?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  ISOSelected?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Manual"
   */
  ISOSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/3 EV"
   */
  ISOSensitivityStep?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 90
   */
  ISOSetting?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  ISOSpeedExpansion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "1/3 Stop"
   */
  ISOSpeedIncrements?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable; Max 3200; Min 1"
   */
  ISOSpeedRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "1/3 EV"
   */
  ISOStepSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 79.44
   */
  ISOValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "n/a (Movie)"
   */
  JPEGQuality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Size Priority"
   */
  JPGCompression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "10 MP"
   */
  JpgRecordedPixels?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  KeepExposure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  KeystoneCompensation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Vertical"
   */
  KeystoneDirection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  KeystoneValue?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "SKodakCommonInfo Jaguar7"
   */
  KodakInfoType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Kodak                           "
   */
  KodakMake?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "PENTAX"
   */
  KodakMaker?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Z760    "
   */
  KodakModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1.0.0.0"
   */
  KodakVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "UNICORN THEATRE FOR CHILDREN"
   */
  Landmark?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "English"
   */
  Language?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 92
   */
  LastFileNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  LateralChromaticAberration?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Retain power off status"
   */
  LCDDisplayAtPowerOn?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "With Shutter Button only"
   */
  LCDDisplayReturnToShoot?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  LCDIllumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  LCDIlluminationDuringBulb?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Remain. shots/File no."
   */
  LCDPanels?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  Lens?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4.0 to 22"
   */
  LensApertureRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None (Disabled)"
   */
  LensControlRing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0802"
   */
  LensDataVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "97 154 172 70 104 114"
   */
  LensDistortionParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus search on"
   */
  LensDriveNoAF?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "RL8 :V01390000 "
   */
  LensFirmware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Ver.04.000"
   */
  LensFirmwareVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "70.0 mm"
   */
  LensFocalLength?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "50 to 50"
   */
  LensFocalRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF Lock Only"
   */
  LensFocusFunctionButtons?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown (72)"
   */
  LensFormat?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8.67
   */
  LensFStops?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE/AF Lock"
   */
  LensFunc1Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF-On"
   */
  LensFunc2Button?: string;
  /**
   * @frequency 🔥 ★★★☆ (22%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 93
   */
  LensIDNumber?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, MakerNotes, XMP
   * @example "?mm f/?"
   */
  LensInfo?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4 to 4"
   */
  LensMaxApertureRange?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown (74)"
   */
  LensMount?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Z-mount"
   */
  LensMountType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 91
   */
  LensPositionAbsolute?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0xe253"
   */
  LensProperties?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "xB?"
   */
  LensSerialNumber?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Xcenter=1456 Ycenter=1068  GainMax=16"
   */
  LensShading?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  LensShutterLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups Composite, MakerNotes
   * @example "Unknown (00 0 0 0 0 00)"
   */
  LensSpec?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "ZA SSM II"
   */
  LensSpecFeatures?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 35
   */
  LensTemperature?: number;
  /**
   * @frequency 🔥 ★★☆☆ (19%)
   * @groups Composite, MakerNotes
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example
   */
  LensType2?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example
   */
  LensType3?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example 2
   */
  LensTypeMake?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example "41 10"
   */
  LensTypeModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "98%"
   */
  LensZoomPosition?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  LevelOrientation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  LightCondition?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Shadow Enhance Low"
   */
  LightingMode?: string;
  /**
   * @frequency 🔥 ★★★★ (59%)
   * @groups EXIF, MakerNotes, XMP
   * @example "White Fluorescent"
   */
  LightSource?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (512)"
   */
  LightSourceSpecial?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "LCD Backlight and Shooting Information"
   */
  LightSwitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8.546875
   */
  LightValueCenter?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 7.796875
   */
  LightValuePeriphery?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No Restrictions"
   */
  LimitAFAreaModeSelection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 181
   */
  LinearityUpperMargin?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  LinkAEToAFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8595224600
   */
  LivePhotoVideoIndex?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  LiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Wide Area"
   */
  LiveViewAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Face-Priority"
   */
  LiveViewAFAreaMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Phase-detect AF"
   */
  LiveViewAFMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF-C"
   */
  LiveViewAFMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  LiveViewButtonOptions?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable (simulates exposure)"
   */
  LiveViewExposureSimulation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Manual"
   */
  LiveViewFocusMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "40 Segment"
   */
  LiveViewMetering?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "3 min"
   */
  LiveViewMonitorOffTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "On"
   */
  LiveViewShooting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example ""
   */
  LocalLocationName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example ":99:99 00:00:00"
   */
  Location?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0100"
   */
  LocationInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example ""
   */
  LocationName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Protect (hold:record memo); 31"
   */
  LockMicrophoneButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1754 bytes, use -b option to extract)"
   */
  LoggingMetadataText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  LongExposureNRUsed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  LowLightAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.014752804
   */
  LuminanceNoiseAmplitude?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.500"
   */
  LuminanceNoiseReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Masked"
   */
  LVShootingAreaDisplay?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  M16CVersion?: number;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, MakerNotes
   * @example "Unknown (3)"
   */
  Macro?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  MacroLED?: string;
  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @groups MakerNotes
   * @example "Unknown (852023)"
   */
  MacroMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Soft Focus 2; 1280; 0; 0"
   */
  MagicFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Image playback only"
   */
  MagnifiedView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  MainDialExposureComp?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "samsung"
   */
  Make?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 916
   */
  MakerNoteOffset?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Rdc"
   */
  MakerNoteType?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups MakerNotes
   * @example "mlt0"
   */
  MakerNoteVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "98 kPa"
   */
  ManometerPressure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "400 m, 1320 ft"
   */
  ManometerReading?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Stops at AF area edges"
   */
  ManualAFPointSelectPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On (1/64 strength)"
   */
  ManualFlash?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ManualFlashOutput?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a (x4)"
   */
  ManualFlashStrength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "inf"
   */
  ManualFocusDistance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On During Focus Point Selection Only"
   */
  ManualFocusPointIllumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  ManualFocusRingInAFMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Tv=Main/Av=Control"
   */
  ManualTv?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  MasterGain?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Face Detection On"
   */
  MatrixMetering?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 615.38464
   */
  MaxAnalogISO?: number;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MakerNotes
   * @example 7.3
   */
  MaxAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 6.7
   */
  MaxApertureAtMaxFocal?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 5.7
   */
  MaxApertureAtMinFocal?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "8 8 8"
   */
  MaxFaces?: string;
  /**
   * @frequency 🔥 ★★☆☆ (17%)
   * @groups MakerNotes
   * @example "96.2 mm"
   */
  MaxFocalLength?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 25
   */
  MaxNumAFPoints?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "United Kingdom (234)"
   */
  MCCData?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 99
   */
  MCUVersion?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 9.97
   */
  MeasuredEV?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 9.375
   */
  MeasuredLV?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "988 1024 1024 636"
   */
  MeasuredRGGB?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "6653 9252 9606 4468"
   */
  MeasuredRGGBData?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 89
   */
  MechanicalShutterCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "SD card in use, MemoryStick slot empty"
   */
  MemoryCardConfiguration?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 1
   */
  MemoryCardNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Previous (top if power off)"
   */
  MenuButtonDisplayPosition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Top"
   */
  MenuButtonReturn?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1748 bytes, use -b option to extract)"
   */
  MergedImage?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 5
   */
  MergedImages?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "THm211000000000"
   */
  MetaVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Matrix"
   */
  Metering?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Metering"
   */
  MeteringButton?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Center-weighted average)"
   */
  MeteringMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Within Range"
   */
  MeteringOffScaleIndicator?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "8 s"
   */
  MeteringTime?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Matrix metering"
   */
  MeterMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  MidRangeSharpness?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example 9.8
   */
  MinAperture?: number;
  /**
   * @frequency 🔥 ★★☆☆ (17%)
   * @groups MakerNotes
   * @example "90.0 mm"
   */
  MinFocalLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2.0 m"
   */
  MinFocusDistance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  MiniatureFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (-1)"
   */
  MiniatureFilterOrientation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  MiniatureFilterParameter?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  MiniatureFilterPosition?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 80
   */
  MinimumISO?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2004:07:05"
   */
  MinoltaDate?: ExifDate | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (768)"
   */
  MinoltaImageSize?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "DiMAGE S404"
   */
  MinoltaModelID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  MinoltaQuality?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "20:16:39"
   */
  MinoltaTime?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Enable"
   */
  MirrorLockup?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Manual"
   */
  ModeDialPosition?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "x530"
   */
  Model?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 2018
   */
  ModelReleaseYear?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedColorTemp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedDigitalGain?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedParamFlag?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  ModifiedPictureStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  ModifiedSaturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedSensorBlueLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedSensorRedLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedSharpness?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ModifiedSharpnessFreq?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Standard"
   */
  ModifiedToneCurve?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  ModifiedWhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedWhiteBalanceBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ModifiedWhiteBalanceRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  MonitorBrightness?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Automatic"
   */
  MonitorDisplayOff?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "8 s"
   */
  MonitorOffTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(none)"
   */
  MonochromeColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  MonochromeFilterEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  MonochromeGrainEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No Filter; 0; 8; Strength 2; 0; 3"
   */
  MonochromeProfileSettings?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "None"
   */
  MonochromeToning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  MonochromeVignetting?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "12:19"
   */
  MonthDayCreated?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Old Crescent"
   */
  MoonPhase?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 100
   */
  MotionSensitivity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Wide (S)"
   */
  MovieAFAreaMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4 (Normal)"
   */
  MovieAFTrackingSensitivity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  MovieFlickerReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Zoom (Low)"
   */
  MovieFunc1Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Zoom (1:1)"
   */
  MovieFunc2Button?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MovieFunc3Button?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MovieFunctionButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MovieFunctionButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  MovieHighlightDisplayPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 248
   */
  MovieHighlightDisplayThreshold?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  MovieISOAutoControlManualMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "ISO 6400"
   */
  MovieISOAutoHiLimit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Power Aperture"
   */
  MovieLensControlRing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Center Focus Point"
   */
  MovieMultiSelector?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MoviePreviewButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MoviePreviewButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Take Photo"
   */
  MovieShutterButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AE/AF Lock"
   */
  MovieSubSelectorAssignment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  MovieSubSelectorAssignmentPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  MovieWhiteBalanceSameAsPhoto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  MultiControllerWhileMetering?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  MultiExposure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  MultiExposureAutoGain?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Off"
   */
  MultiExposureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Add"
   */
  MultiExposureOverlayMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 1
   */
  MultiExposureShots?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0103"
   */
  MultiExposureVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  MultiFrameNoiseReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Normal"
   */
  MultiFrameNREffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (66)"
   */
  MultiFunctionLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On (2 frames); 1"
   */
  MultipleExposureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (15)"
   */
  MultipleExposureSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Reset Meter-off Delay"
   */
  MultiSelector?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Start Movie Recording"
   */
  MultiSelectorLiveView?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Zoom On/Off"
   */
  MultiSelectorPlaybackMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Select Center Focus Point (Reset)"
   */
  MultiSelectorShootMode?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  MyColorMode?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example "n/a"
   */
  NDFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Uncompressed (reduced to 12 bit)"
   */
  NEFCompression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 624 bytes, use -b option to extract)"
   */
  NEFLinearizationTable?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off (Auto)"
   */
  NeutralDensityFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Large (10.0 M)"
   */
  NikonImageSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Matrix"
   */
  NikonMeteringMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  NoiseFilter?: string;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups MakerNotes
   * @example "[4]"
   */
  NoiseReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  NoiseReductionStrength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Release Locked"
   */
  NoMemoryCard?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5.7
   */
  NominalMaxAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 7
   */
  NominalMinAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 16383
   */
  NormalWhiteLevel?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example 9
   */
  NumAFPoints?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 32
   */
  NumberOffsets?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 49
   */
  NumCAFPoints?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 5
   */
  NumFaceElements?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 65535
   */
  NumFacePositions?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  OISMode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Select Center Focus Point"
   */
  OKButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 960
   */
  OlympusImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3648
   */
  OlympusImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown ()"
   */
  OneTouchWB?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  OpticalVR?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3
   */
  OpticalZoom?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 94
   */
  OpticalZoomCode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  OpticalZoomMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  OpticalZoomOn?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 668058300
   */
  OrderNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Same for vertical and horizontal"
   */
  OrientationLinkedAFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 3318
   */
  OriginalDecisionDataOffset?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "/home/username/pictures"
   */
  OriginalDirectory?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "L9997698.JPG"
   */
  OriginalFileName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 4000
   */
  OriginalImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6000
   */
  OriginalImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example ["Sensor Upgraded","PREPRODUCTION CAMERA"]
   */
  OtherInfo?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 864 bytes, use -b option to extract)"
   */
  OutputLUT?: BinaryField | string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups EXIF, MakerNotes
   * @example "Itsa Myowna"
   */
  OwnerName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  PaintingFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2023:01:19 22:32:42.04"
   */
  PanasonicDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "0425"
   */
  PanasonicExifVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 5584
   */
  PanasonicImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 8368
   */
  PanasonicImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 360
   */
  PanoramaAngle?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1080
   */
  PanoramaCropBottom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaCropLeft?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 11520
   */
  PanoramaCropRight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaCropTop?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Right or Down"
   */
  PanoramaDirection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaFrameHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaFrameWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1080
   */
  PanoramaFullHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 11520
   */
  PanoramaFullWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Off"
   */
  PanoramaMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PanoramaSize3D?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaSourceHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PanoramaSourceWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 15278 bytes, use -b option to extract)"
   */
  PayloadMetadataText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (6)"
   */
  PentaxImageSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "X90"
   */
  PentaxModelID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 6
   */
  PentaxModelType?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "513 513 513 513"
   */
  PerChannelBlackLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Unknown (3)"
   */
  PeripheralIlluminationCorr?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  PeripheralLighting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "On"
   */
  PeripheralLightingSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 70
   */
  PeripheralLightingValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups Composite, MakerNotes
   * @example "On (73-point)"
   */
  PhaseDetectAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  PhotoEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "F7248739-9D7D-45ED-8B0C-63530491EEA8"
   */
  PhotoIdentifier?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Info Up-down, Playback Left-right"
   */
  PhotoInfoPlayback?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  PhotosAppFeatureFlags?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "A"
   */
  PhotoShootingMenuBank?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "FX (36x24)"
   */
  PhotoShootingMenuBankImageArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  PhotoStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Quick Adjust"
   */
  PictureControlAdjust?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  PictureControlBase?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Vivid"
   */
  PictureControlName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PictureControlQuickAdjust?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0310"
   */
  PictureControlVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  PictureEffect?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Natural"
   */
  PictureFinish?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example "i-Enhance; 2"
   */
  PictureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PictureModeBWFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "1 (min -2, max 2)"
   */
  PictureModeContrast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PictureModeEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 (min -2, max 2)"
   */
  PictureModeSaturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "2 (min -2, max 2)"
   */
  PictureModeSharpness?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PictureModeStrength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PictureModeTone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown (2)"
   */
  PictureProfile?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "User Def. 3"
   */
  PictureStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a; n/a; n/a"
   */
  PictureStylePC?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Standard; Standard; Standard"
   */
  PictureStyleUserDef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "Low"
   */
  Pitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8.3
   */
  PitchAngle?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, Photoshop, QuickTime
   * @example 1
   */
  PixelAspectRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  PixelShiftID?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  PixelShiftInfo?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  PixelShiftResolution?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  PlaybackFlickDown?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  PlaybackFlickUp?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "5 min"
   */
  PlaybackMenusTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Use Separate Zoom Buttons"
   */
  PlaybackZoom?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto Rotate"
   */
  PlayDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3
   */
  POILevel?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  PopupFlash?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  PortraitImpressionBalance?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  PortraitRefiner?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Post Focus Auto Merging or None"
   */
  PostFocusMerging?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Max"
   */
  PostReleaseBurstLength?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Body Battery"
   */
  PowerAvailable?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "External Power Supply"
   */
  PowerSource?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "2024:09:23 17:07:09"
   */
  PowerUpTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  PreAF?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 3.2996109
   */
  PreCaptureFrames?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  PreReleaseBurstLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Daylight"
   */
  PresetWhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Preview"
   */
  PreviewButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  PreviewButtonPlusDials?: string;
  /**
   * @frequency 🔥 ★★★☆ (33%)
   * @groups Composite, EXIF, File, FlashPix, MPF, MakerNotes, QuickTime
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   */
  PreviewImage?: BinaryField;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "28 28 0 0"
   */
  PreviewImageBorders?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 976
   */
  PreviewImageHeight?: number;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups EXIF, MakerNotes
   * @example 9983
   */
  PreviewImageLength?: number;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups EXIF, MakerNotes
   * @example 9996
   */
  PreviewImageStart?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example true
   */
  PreviewImageValid?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups APP, FlashPix, MakerNotes
   * @example 816
   */
  PreviewImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups APP, MakerNotes
   * @example 95
   */
  PreviewQuality?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF"
   */
  PrioritySetupShutterRelease?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ProgramISO?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  ProgramLine?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "Unknown (160)"
   */
  ProgramMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  ProgramShift?: number;
  /**
   * @frequency 🔥 ★★★☆ (37%)
   * @groups APP, Ducky, MakerNotes, RIFF
   * @example "n/a"
   */
  Quality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Exposure comp/Aperture"
   */
  QuickControlDialInMeter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  QuickShot?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Single"
   */
  QuietShutterShootingSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  RangeFinder?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups EXIF, MakerNotes, XMP
   * @example 5
   */
  Rating?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "RAW+Small/Normal"
   */
  RawAndJpgRecording?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  RawBurstImageCount?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  RawBurstImageNum?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Little-endian (Intel, II)"
   */
  RawDataByteOrder?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unchanged"
   */
  RawDataCFAPattern?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  RawDataLength?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 16
   */
  RawDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off; 0; 0; 0"
   */
  RawDevArtFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  RawDevAutoGradation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "sRGB"
   */
  RawDevColorSpace?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  RawDevContrastValue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Original"
   */
  RawDevEditStatus?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9 (Q)"
   */
  RawDevelopmentProcess?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (2)"
   */
  RawDevEngine?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  RawDevExposureBiasValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  RawDevGradation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  RawDevGrayPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  RawDevMemoryColorEmphasis?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Noise Filter"
   */
  RawDevNoiseReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Natural"
   */
  RawDevPictureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 -2 2"
   */
  RawDevPMContrast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2 0 -2 1"
   */
  RawDevPMNoiseFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  RawDevPMPictureTone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 -2 2"
   */
  RawDevPMSaturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 -2 2"
   */
  RawDevPMSharpness?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  RawDevSaturationEmphasis?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "(none)"
   */
  RawDevSettings?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 0 0"
   */
  RawDevSharpnessValue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0100"
   */
  RawDevVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  RawDevWBFineAdjustment?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (3)"
   */
  RawDevWhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  RawDevWhiteBalanceValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4144 2760"
   */
  RawImageCenter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 8750
   */
  RawImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 7752
   */
  RawImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "RAW"
   */
  RawJpgQuality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Large"
   */
  RawJpgSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "95215 190283 189698 116484"
   */
  RawMeasuredRGGB?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Release Mode"
   */
  RearControPanelDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "ISO"
   */
  RearDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto Rotate"
   */
  RecordDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 58
   */
  RecordID?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "JPEG"
   */
  RecordingFormat?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Auto"
   */
  RecordingMode?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups MakerNotes
   * @example "TIF+JPEG"
   */
  RecordMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Record while down"
   */
  RecordShutterRelease?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 576 bytes, use -b option to extract)"
   */
  RectifaceText?: BinaryField | string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups Composite, MakerNotes
   * @example 38.625
   */
  RedBalance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, MakerNotes
   * @example "On"
   */
  RedEyeReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  RedEyeRemoval?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Yes"
   */
  ReleaseButtonToUseDial?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example "Unknown (7)"
   */
  ReleaseMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  RemoteOnDuration?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 10
   */
  RepeatingFlashCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/32"
   */
  RepeatingFlashOutput?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  RepeatingFlashOutputExternal?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "10 Hz"
   */
  RepeatingFlashRate?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  Resaved?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups APP, MakerNotes
   * @example 6
   */
  Resolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "MED"
   */
  ResolutionMode?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, XMP
   * @example "inches"
   */
  ResolutionUnit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Flags 0x77"
   */
  RestrictDriveModes?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "Unknown ()"
   */
  RetouchHistory?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0200"
   */
  RetouchInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "On"
   */
  RetouchNEFProcessing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Enable"
   */
  RetractLensOnPowerOff?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  ReverseExposureCompDial?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Reversed"
   */
  ReverseFocusRing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "- 0 +"
   */
  ReverseIndicators?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  ReverseShutterSpeedAperture?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Varies With Rotation Speed"
   */
  RFLensMFFocusRingSensitivity?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2012:03:29 18:17:52"
   */
  RicohDate?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 960
   */
  RicohImageHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 640
   */
  RicohImageWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "XG-1Pentax"
   */
  RicohMake?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "RICOH WG-M1"
   */
  RicohModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 150.43
   */
  Roll?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 90.5
   */
  RollAngle?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "USA"
   */
  ROMOperationMode?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, MakerNotes
   * @example "Unknown (0)"
   */
  Rotation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 987823130000000
   */
  RunTimeValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Enable (Tv/Av)"
   */
  SafetyShift?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  SafetyShiftInAvOrTv?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Disable"
   */
  SameExposureForNewAperture?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "WP10 / VLUU WP10 / AQ100"
   */
  SamsungModelID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (0x211)"
   */
  SanyoQuality?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 10313 bytes, use -b option to extract)"
   */
  SanyoThumbnail?: BinaryField | string;
  /**
   * @frequency 🔥 ★★★★ (66%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Saturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 1
   */
  SaturationAdj?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  SaturationAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 655360
   */
  SaturationFaithful?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 8650752
   */
  SaturationLandscape?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6619136
   */
  SaturationNeutral?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6553609
   */
  SaturationPortrait?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  SaturationSetting?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 3
   */
  SaturationStandard?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  SaveFocus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ScanImageEnhancer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Two-Shot"
   */
  SceneAssist?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 9
   */
  SceneDetect?: number;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups MakerNotes
   * @example "n/a"
   */
  SceneMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (9)"
   */
  SceneModeUsed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unrecognized"
   */
  SceneRecognition?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "User 1"
   */
  SceneSelect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ScreenTips?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (1)"
   */
  SecondarySlotFunction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "45 points"
   */
  SelectableAFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (87)"
   */
  SelectAFAreaSelectMode?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups MakerNotes
   * @example "Self-timer 5 or 10 s"
   */
  SelfTimer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0.5 s"
   */
  SelfTimerInterval?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "5 s"
   */
  SelfTimerTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example {"_0":1,"_1":0,"_2":0,"_3":0}
   */
  SemanticStyle?: Struct;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example true
   */
  SemanticStylePreset?: boolean;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example true
   */
  SemanticStyleRenderingVer?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  SensitivityAdjust?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "As EV Steps"
   */
  SensitivitySteps?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "front-main-mot_s5k5e9"
   */
  Sensor?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 14
   */
  SensorBitDepth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 4214
   */
  SensorBlueLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 5893
   */
  SensorBottomBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "4095 646"
   */
  SensorCalibration?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable"
   */
  SensorCleaning?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2472
   */
  SensorFullHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3288
   */
  SensorFullWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, MakerNotes
   * @example 5920
   */
  SensorHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "53HQK1V0M100UV"
   */
  SensorID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 88
   */
  SensorLeftBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "9.4 x 9.4 um"
   */
  SensorPixelSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 4370
   */
  SensorRedLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 8883
   */
  SensorRightBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7.576 x 5.682 mm"
   */
  SensorSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "80.9 C"
   */
  SensorTemperature?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 96
   */
  SensorTopBorder?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JSON, MakerNotes
   * @example "rear"
   */
  SensorType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, MakerNotes
   * @example 8896
   */
  SensorWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "5 of 5"
   */
  Sequence?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 4
   */
  SequenceFileNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 4
   */
  SequenceImageNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Continuous"
   */
  SequenceLength?: string;
  /**
   * @frequency 🔥 ★★★☆ (27%)
   * @groups MakerNotes
   * @example 6
   */
  SequenceNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "5 frames/s"
   */
  SequenceShotInterval?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (28928)"
   */
  SequentialShot?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, EXIF, MakerNotes, Meta, XMP
   * @example "sw02028104 "
   */
  SerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Case Manual"
   */
  ServoAFCharacteristics?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Set: Picture Style"
   */
  SetButtonCrossKeysFunc?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Unknown (37 0)"
   */
  SetButtonWhenShooting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "On"
   */
  ShadingCompensation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  Shadow?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  ShadowCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 0
   */
  Shadows?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "0 (normal)"
   */
  ShadowTone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On but Disabled"
   */
  ShakeReduction?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal"
   */
  Sharpening?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 3
   */
  SharpnessAuto?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 768
   */
  SharpnessFactor?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  SharpnessFaithful?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  SharpnessFreqTable?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  SharpnessFrequency?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 4
   */
  SharpnessLandscape?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 3
   */
  SharpnessMonochrome?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  SharpnessNeutral?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 2752758
   */
  SharpnessPortrait?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+3"
   */
  SharpnessRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "3 (min -3, max 5)"
   */
  SharpnessSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 4
   */
  SharpnessStandard?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  SharpnessTable?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  ShootingInfoDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "4 s"
   */
  ShootingInfoMonitorOffTime?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups Composite, MakerNotes, XMP
   * @example "Unknown (83)"
   */
  ShootingMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Continuous"
   */
  ShootingModeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Itsa Myowna"
   */
  ShortOwnerName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  ShortReleaseTimeLag?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0811"
   */
  ShotInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1116 bytes, use -b option to extract)"
   */
  ShotLogDataText?: BinaryField | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  ShotNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 9
   */
  ShotNumberSincePowerUp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1493 bytes, use -b option to extract)"
   */
  ShotParamsText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  ShotsPerInterval?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Silent / Electronic (0 0 0)"
   */
  Shutter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "AF/AE lock stop"
   */
  ShutterAELButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example 998
   */
  ShutterCount?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example
   */
  ShutterCount2?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example
   */
  ShutterCount3?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "2nd-curtain sync"
   */
  ShutterCurtainSync?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Unknown (4)"
   */
  ShutterMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Single Shot"
   */
  ShutterReleaseMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  ShutterReleaseNoCFCard?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Priority on focus"
   */
  ShutterReleaseTiming?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Enable"
   */
  ShutterReleaseWithoutLens?: string;
  /**
   * @frequency 🔥 ★★★★ (87%)
   * @groups Composite, MakerNotes
   * @example "inf"
   */
  ShutterSpeed?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  ShutterSpeedLock?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Manual: Hi 1/8123; Lo 31.9; Auto: Hi 1/8123; Lo 31.9"
   */
  ShutterSpeedRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "1/91"
   */
  ShutterSpeedSetting?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example "1/999963365"
   */
  ShutterSpeedValue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, XMP
   * @example "Normal"
   */
  ShutterType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 63.176895
   */
  SignalToNoiseRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On"
   */
  SilentPhotography?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1
   */
  SingleFrame?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Low"
   */
  SingleFrameBracketing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  SlaveFlashMeteringSegments?: string;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example "n/a"
   */
  SlowShutter?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes
   * @example "On"
   */
  SlowSync?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "n/a"
   */
  SmartAlbumColor?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  SmileShutter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Slight Smile"
   */
  SmileShutterMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  SoftFocusFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  SoftSkinEffect?: string;
  /**
   * @frequency 🔥 ★★★★ (61%)
   * @groups EXIF, MakerNotes, QuickTime, RIFF, XMP
   * @example "https://PhotoStructure.com/"
   */
  Software?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2024:07:26 03:49:54.000Z"
   */
  SoftwareDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "2024:06:12 18:00:20"
   */
  SonyDateTime?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example
   */
  SonyDateTime2?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "1/82"
   */
  SonyExposureTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 8.8
   */
  SonyFNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 65535
   */
  SonyImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6376
   */
  SonyImageHeightMax?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Small (3:2)"
   */
  SonyImageSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 9504
   */
  SonyImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 9568
   */
  SonyImageWidthMax?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 926
   */
  SonyISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5.5
   */
  SonyMaxAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 6.5
   */
  SonyMaxApertureValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 34
   */
  SonyMinAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "ZV-E10M2"
   */
  SonyModelID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Fine"
   */
  SonyQuality?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 100
   */
  SourceDirectoryIndex?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 60
   */
  SourceFileIndex?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 24576
   */
  SpecialEffectLevel?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  SpecialEffectMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (15)"
   */
  SpecialEffectSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 9966
   */
  SpecularWhiteLevel?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.10"
   */
  SpeedX?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+6.10"
   */
  SpeedY?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "+0.00"
   */
  SpeedZ?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Soccer"
   */
  SportEvents?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 1632
   */
  SpotFocusPointX?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 960
   */
  SpotFocusPointY?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable (use active AF point)"
   */
  SpotMeterLinkToAFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Yes"
   */
  SRActive?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "sRAW2 (sRAW)"
   */
  SRAWQuality?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "97 mm"
   */
  SRFocalLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "4.25 s or longer"
   */
  SRHalfPressTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Stabilized, [1], [2], [3], [4]"
   */
  SRResult?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Tripod high resolution"
   */
  StackedImage?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "6 s"
   */
  StandbyMonitorOffTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "6 s"
   */
  StandbyTimer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Default (from LV)"
   */
  StartMovieShooting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "Washington"
   */
  State?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1321 bytes, use -b option to extract)"
   */
  StaticMetadataText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 8
   */
  StopsAboveBaseISO?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Padded"
   */
  StorageMethod?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  StoreByOrientation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "10 Frames"
   */
  SubDialFrameAdvance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0"
   */
  SubjectDetectArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0"
   */
  SubjectDetectDetail?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "640 480"
   */
  SubjectDetectFrameSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "People"
   */
  SubjectDetection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No Subject or Face Detected"
   */
  SubjectDetectStatus?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Steady"
   */
  SubjectMotion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  SubjectProgram?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  SubjectRecognition?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "On Subject"
   */
  SubjectSwitching?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "People"
   */
  SubjectToDetect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus Point Selection"
   */
  SubSelector?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Focus Point Selection"
   */
  SubSelectorAssignment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Virtual Horizon"
   */
  SubSelectorCenter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  SubSelectorPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1214 bytes, use -b option to extract)"
   */
  SummaryText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  SuperimposedDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  SuperMacro?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 100
   */
  SvISOSetting?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Right"
   */
  SweepPanoramaDirection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  SweepPanoramaFieldOfView?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Wide"
   */
  SweepPanoramaSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable"
   */
  SwitchToRegisteredAFPoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Sync"
   */
  SyncReleaseMode?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups MakerNotes
   * @example 9
   */
  TargetAperture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 4
   */
  TargetCompressionRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "476 mm"
   */
  TargetDistanceSetting?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example "1/813"
   */
  TargetExposureTime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Real-world Subject"
   */
  TargetImageType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "None"
   */
  Teleconverter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  TextEncoding?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  TextStamp?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "THM_0043.JPG"
   */
  ThumbnailFileName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JFIF, MakerNotes
   * @example 120
   */
  ThumbnailHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (89%)
   * @groups EXIF, JFIF, MakerNotes
   * @example "(Binary data 10202 bytes, use -b option to extract)"
   */
  ThumbnailImage?: BinaryField;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups MakerNotes
   * @example "0 159 7 112"
   */
  ThumbnailImageValidArea?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups JFIF, MakerNotes
   * @example 160
   */
  ThumbnailWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "(Binary data 7404 bytes, use -b option to extract)"
   */
  TiffMeteringImage?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 30
   */
  TiffMeteringImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 44
   */
  TiffMeteringImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "23:50:41"
   */
  Time?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups IPTC, MakerNotes
   * @example "23:59:46.92"
   */
  TimeCreated?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 50336257
   */
  TimeLapseShotNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 5032 bytes, use -b option to extract)"
   */
  TimeLogText?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable; 6 s: 6; 16 s: 16; After release: 2"
   */
  TimerLength?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "01:48:53.63"
   */
  TimeSincePowerOn?: ExifTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "2025:06:11 11:07:41.57"
   */
  TimeStamp?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups MakerNotes
   * @example "-09:00"
   */
  TimeZone?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "n/a"
   */
  TimeZoneCity?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  TimeZoneCode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  TimeZoneInfo?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, XMP
   * @example "Very Blank"
   */
  Title?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, XMP
   * @example "Standard"
   */
  ToneCurve?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 95 bytes, use -b option to extract)"
   */
  ToneCurveMatching?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 1679 bytes, use -b option to extract)"
   */
  ToneCurveTable?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Highlights; 0; -7; 7; Shadows; 0; -7; 7; Midtones; 0; -7;…0; 0; 0"
   */
  ToneLevel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ToningEffect?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ToningEffectAuto?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "None"
   */
  ToningEffectMonochrome?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  ToningSaturation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 5
   */
  TotalZoom?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  ToyCameraFilter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  Transform?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Normal (set center AF point)"
   */
  TrashButtonFunction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "n/a"
   */
  TravelDay?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Motion Detection"
   */
  TriggerMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "1/64"
   */
  TvExposureTimeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "7860345b882000641403450101000000170d0f1d0f11827ca3111430d3000000"
   */
  UniqueID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "ZME151000007"
   */
  UnknownNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 4
   */
  UnsharpMaskFineness?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 4
   */
  UnsharpMaskThreshold?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 9191 bytes, use -b option to extract)"
   */
  UnusedLoggingMetadata?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Flags 0xf0"
   */
  UsableMeteringModes?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Flags 0x3f"
   */
  UsableShootingModes?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Enable"
   */
  USBPowerDelivery?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (4)"
   */
  UserDef1PictureStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  UserDef2PictureStyle?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (4)"
   */
  UserDef3PictureStyle?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "PC900 COVERT PRO"
   */
  UserLabel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "dpreview  "
   */
  UserProfile?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (3)"
   */
  USMLensElectronicMF?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @groups MakerNotes
   * @example 99
   */
  ValidAFPoints?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "12 0"
   */
  ValidBits?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Scene Auto"
   */
  VariProgram?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Same as AF-On Button"
   */
  VerticalAFOnButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Exposure Compensation"
   */
  VerticalFuncButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  VerticalFuncButtonPlusDials?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Same as AF-On"
   */
  VerticalMovieAFOnButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "None"
   */
  VerticalMovieFuncButton?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Same as MultiSelector"
   */
  VerticalMultiSelector?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Enable"
   */
  VFDisplayIllumination?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "n/a"
   */
  VibrationReduction?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  VideoBurstMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (0)"
   */
  VideoBurstResolution?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, RIFF
   * @example "mjpg"
   */
  VideoCodec?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, QuickTime, RIFF
   * @example "n/a"
   */
  VideoFrameRate?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "No"
   */
  VideoPreburst?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Frame Count"
   */
  ViewfinderDisplay?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  ViewfinderWarning?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Monochrome, WB corrected, One-touch image quality, Noise …on, HDR"
   */
  ViewfinderWarnings?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Disable"
   */
  ViewInfoDuringExposure?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "ViewFinder"
   */
  ViewingMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  Vignette?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  VignetteControl?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0100"
   */
  VignetteCorrectionVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  Vignetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "n/a"
   */
  VignettingCorrection?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "96 240 384 544 704 896 1088 1280 1488 1696 1904 2128 2352…4 15232"
   */
  VignettingCorrParams?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 97
   */
  VignettingCorrVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  VoiceMemo?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "0200"
   */
  VRInfoVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Sport"
   */
  VRMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Unknown (1)"
   */
  VRType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Off"
   */
  WatercolorFilter?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 735
   */
  WBBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 9235
   */
  WBBlueLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "WB Bracketing Disabled"
   */
  WBBracketingSteps?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "Off"
   */
  WBBracketMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  WBBracketShotNumber?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 0
   */
  WBBracketValueAB?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 0
   */
  WBBracketValueGM?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Select To Send (PC)"
   */
  WBButtonPlaybackMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 302
   */
  WBGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 60416
   */
  WBGreenLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Rear LCD panel"
   */
  WBMediaImageSizeSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (1 1)"
   */
  WBMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 640
   */
  WBRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, MakerNotes
   * @example 834
   */
  WBRedLevel?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "2 2 2 2"
   */
  WBScale?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example 7
   */
  WBShiftAB?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  WBShiftCreativeControl?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes
   * @example 0
   */
  WBShiftGM?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example 0
   */
  WBShiftIntelligentAuto?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "White Preset"
   */
  WhiteBalance?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  WhiteBalanceAutoAdjustment?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example 0
   */
  WhiteBalanceBias?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 796
   */
  WhiteBalanceBlue?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes
   * @example "0 0"
   */
  WhiteBalanceBracket?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  WhiteBalanceBracketing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  WhiteBalanceMatching?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "User-Selected"
   */
  WhiteBalanceMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 642
   */
  WhiteBalanceRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, PanasonicRaw
   * @example "Tungsten"
   */
  WhiteBalanceSet?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes
   * @example "Custom 1"
   */
  WhiteBalanceSetting?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 2217 bytes, use -b option to extract)"
   */
  WhiteBalanceTable?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example "Auto"
   */
  WhiteBalanceTemperature?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes
   * @example 0
   */
  WhiteBoard?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes
   * @example 65535
   */
  WhiteLevel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes
   * @example "9696 8192 8192 7136"
   */
  WhitePoint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "On"
   */
  WholeAreaTracking?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Not Attached"
   */
  WideAdapter?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (9)"
   */
  WideFocusZone?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  WideRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups MakerNotes
   * @example "Hometown"
   */
  WorldTimeLocation?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0.2
   */
  X3FillLight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 512 bytes, use -b option to extract)"
   */
  Xidiri?: BinaryField | string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 0.83734368
   */
  Yaw?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes
   * @example "0.299 0.587 0.114"
   */
  YCbCrCoefficients?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (512)"
   */
  YCbCrPositioning?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 2006
   */
  YearCreated?: number;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example "ISO Setting Used"
   */
  ZoneMatching?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Off"
   */
  ZoneMatchingMode?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "Unknown (7040)"
   */
  ZoneMatchingOn?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 0
   */
  ZoneMatchingValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "(Binary data 64581 bytes, use -b option to extract)"
   */
  ZoomedPreviewImage?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 92592
   */
  ZoomedPreviewLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example "736 544"
   */
  ZoomedPreviewSize?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes
   * @example 4184638
   */
  ZoomedPreviewStart?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 768
   */
  ZoomSourceWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes
   * @example 8
   */
  ZoomStepCount?: number;
  /**
   * @frequency 🔥 ★★☆☆ (12%)
   * @groups MakerNotes
   * @example 6000
   */
  ZoomTargetWidth?: number;
}

export const MakerNotesTagsNames = strEnum(
  "AccelerationTracking",
  "AccelerationVector",
  "Accelerometer",
  "AccelerometerX",
  "AccelerometerY",
  "AccelerometerZ",
  "ActionInAFCCont",
  "ActionPriority",
  "ActualCompensation",
  "AddIPTCInformation",
  "AddOriginalDecisionData",
  "ADJDebugInfo",
  "AdjustmentMode",
  "ADLBracketingStep",
  "ADLBracketingType",
  "AdvancedSceneType",
  "AEAperture",
  "AEApertureSteps",
  "AEBAutoCancel",
  "AEBBracketValue",
  "AEBracketingSteps",
  "AEBSequence",
  "AEBSequenceAutoCancel",
  "AEBShotCount",
  "AEBXv",
  "AEDebugInfo",
  "AEExposureTime",
  "AEHistogramInfo",
  "AELButton",
  "AELExposureIndicator",
  "AELiveViewHistogramInfo",
  "AELiveViewLocalHistogram",
  "AELocalHistogram",
  "AELock",
  "AELockButton",
  "AELockButtonPlusDials",
  "AELockMeterModeAfterFocus",
  "AEMaxAperture",
  "AEMeteringMode",
  "AEMeteringSegments",
  "AEMicroadjustment",
  "AEMinAperture",
  "AEMinExposureTime",
  "AEProgramMode",
  "AEWhiteBalance",
  "AEXv",
  "AFAdjustment",
  "AFAndMeteringButtons",
  "AFAperture",
  "AFAreaHeight",
  "AFAreaIllumination",
  "AFAreaMode",
  "AFAreaModeSetting",
  "AFAreaPointSize",
  "AFAreas",
  "AFAreaSelectMethod",
  "AFAreaSize",
  "AFAreaWidth",
  "AFAreaXPosition",
  "AFAreaXPositions",
  "AFAreaYPosition",
  "AFAreaYPositions",
  "AFAreaZoneSize",
  "AFAssist",
  "AFAssistBeam",
  "AFAssistLamp",
  "AFButtonPressed",
  "AFCHold",
  "AFConfidence",
  "AFCoordinatesAvailable",
  "AFCPointTracking",
  "AFCSensitivity",
  "AFDebugInfo",
  "AFDefocus",
  "AFDetectionMethod",
  "AFDuringLiveView",
  "AFFineTune",
  "AFFineTuneAdj",
  "AFFineTuneAdjTele",
  "AFFineTuneIndex",
  "AFFocusArea",
  "AFFrameSize",
  "AFIlluminator",
  "AFImageHeight",
  "AFImageWidth",
  "AFInfo2Version",
  "AFIntegrationTime",
  "AFMeasuredDepth",
  "AFMicroAdj",
  "AFMicroAdjMode",
  "AFMicroAdjRegisteredLenses",
  "AFMicroadjustment",
  "AFMicroAdjValue",
  "AFMode",
  "AFModeRestrictions",
  "AFOnAELockButtonSwitch",
  "AFOnButton",
  "AFPerformance",
  "AFPoint",
  "AFPointActivationArea",
  "AFPointAreaExpansion",
  "AFPointAtShutterRelease",
  "AFPointAutoSelection",
  "AFPointBrightness",
  "AFPointDetails",
  "AFPointDisplayDuringFocus",
  "AFPointIllumination",
  "AFPointInFocus",
  "AFPointMode",
  "AFPointPosition",
  "AFPointRegistration",
  "AFPoints",
  "AFPointSel",
  "AFPointSelected",
  "AFPointSelection",
  "AFPointSelectionMethod",
  "AFPointSetting",
  "AFPointsInFocus",
  "AFPointsInFocus1D",
  "AFPointsInFocus5D",
  "AFPointSpotMetering",
  "AFPointsSelected",
  "AFPointsSpecial",
  "AFPointsUsed",
  "AFPredictor",
  "AFTracking",
  "AFType",
  "AFWithShutter",
  "AIServoFirstImagePriority",
  "AIServoImagePriority",
  "AIServoSecondImagePriority",
  "AIServoTrackingMethod",
  "AIServoTrackingSensitivity",
  "AISubjectTrackingMode",
  "AmbienceSelection",
  "AmbientTemperature",
  "AmbientTemperatureFahrenheit",
  "AndroidRelease",
  "AntiFlicker",
  "AntiShockWaitingTime",
  "Aperture",
  "ApertureLock",
  "ApertureRingUse",
  "ApertureSetting",
  "ApertureValue",
  "Application",
  "ApplySettingsToLiveView",
  "ApplyShootingMeteringMode",
  "ApproximateFNumber",
  "AppVersion",
  "ArtFilter",
  "ArtFilterEffect",
  "Artist",
  "ArtMode",
  "ArtModeParameters",
  "AspectFrame",
  "AssignBktButton",
  "AssignFuncButton",
  "AssignMovieFunc1ButtonPlusDials",
  "AssignMovieFunc2Button",
  "AssignMoviePreviewButtonPlusDials",
  "AssignMovieRecordButton",
  "AssignMovieRecordButtonPlusDials",
  "AssignMovieSubselector",
  "AssignMovieSubselectorPlusDials",
  "AssignRemoteFnButton",
  "AssistButtonFunction",
  "Audio",
  "AudioChannels",
  "AudioCompression",
  "AudioSampleRate",
  "AutoAFPointColorTracking",
  "AutoAFPointSelEOSiTRAF",
  "AutoAperture",
  "AutoBracket",
  "AutoBracketingMode",
  "AutoBracketingSet",
  "AutoBracketModeM",
  "AutoBracketOrder",
  "AutoBracketSet",
  "AutoDistortionControl",
  "AutoDynamicRange",
  "AutoExposureBracketing",
  "AutoFlashISOSensitivity",
  "AutoFocusModeRestrictions",
  "AutoFP",
  "AutoISO",
  "AutoISOMax",
  "AutoISOMinShutterSpeed",
  "AutoLightingOptimizer",
  "AutoPortraitFramed",
  "AutoRotate",
  "AuxiliaryLens",
  "AvApertureSetting",
  "AverageBlackLevel",
  "AverageLV",
  "AvSettingWithoutLens",
  "BabyAge",
  "BabyName",
  "Barcode",
  "BaseExposureCompensation",
  "BaseISO",
  "BatteryLevel",
  "BatteryOrder",
  "BatteryState",
  "BatteryTemperature",
  "BatteryType",
  "BatteryVoltage",
  "BayerPattern",
  "Beep",
  "BeepPitch",
  "BeepVolume",
  "BestShotMode",
  "BitDepth",
  "BlackLevel",
  "BlackLevels",
  "BlackMaskBottomBorder",
  "BlackMaskLeftBorder",
  "BlackMaskRightBorder",
  "BlackMaskTopBorder",
  "BlackPoint",
  "BleachBypassToning",
  "BlueBalance",
  "BlurControl",
  "BlurWarning",
  "BoardTemperature",
  "BodyBatteryADLoad",
  "BodyBatteryADNoLoad",
  "BodyBatteryPercent",
  "BodyBatteryState",
  "BodyBatteryVoltage",
  "BodyFirmware",
  "BodyFirmwareVersion",
  "BodySerialNumber",
  "BracketIncrement",
  "BracketingBurstOptions",
  "BracketMode",
  "BracketProgram",
  "BracketSequence",
  "BracketSet",
  "BracketSettings",
  "BracketShotNumber",
  "BracketStep",
  "BracketValue",
  "Brightness",
  "BrightnessValue",
  "BuildNumber",
  "BulbDuration",
  "BurstGroupID",
  "BurstMode",
  "BurstSpeed",
  "BurstUUID",
  "ButtonFunctionControlOff",
  "BWFilter",
  "BWMode",
  "CAFArea",
  "CAFGridSize",
  "CAFPointsInFocus",
  "CAFPointsSelected",
  "Calibration",
  "CameraDateTime",
  "CameraID",
  "CameraISO",
  "CameraModel",
  "CameraOrientation",
  "CameraPictureStyle",
  "CameraPitch",
  "CameraRoll",
  "CameraSettingsVersion",
  "CameraType",
  "CameraYaw",
  "CanonExposureMode",
  "CanonFileDescription",
  "CanonFileLength",
  "CanonFirmwareVersion",
  "CanonFlashMode",
  "CanonImageHeight",
  "CanonImageSize",
  "CanonImageType",
  "CanonImageWidth",
  "CanonModelID",
  "CardShutterLock",
  "CaseAutoSetting",
  "Categories",
  "Category",
  "CCDBoardVersion",
  "CCDScanMode",
  "CCDSensitivity",
  "CCDVersion",
  "CenterAFArea",
  "CenterFocusPoint",
  "CHModeShootingSpeed",
  "ChromaticAberrationCorr",
  "ChromaticAberrationCorrection",
  "ChromaticAberrationCorrParams",
  "ChromaticAberrationSetting",
  "ChrominanceNoiseReduction",
  "City",
  "City2",
  "Clarity",
  "ClarityControl",
  "ClearRetouch",
  "CmdDialsApertureSetting",
  "CmdDialsChangeMainSub",
  "CmdDialsMenuAndPlayback",
  "CmdDialsReverseRotation",
  "CmdDialsReverseRotExposureComp",
  "ColorAdjustment",
  "ColorAdjustmentMode",
  "ColorBalanceBlue",
  "ColorBalanceGreen",
  "ColorBalanceRed",
  "ColorBalanceVersion",
  "ColorBitDepth",
  "ColorBW",
  "ColorChromeEffect",
  "ColorChromeFXBlue",
  "ColorCompensationFilter",
  "ColorCompensationFilterCustom",
  "ColorCompensationFilterSet",
  "ColorControl",
  "ColorCreatorEffect",
  "ColorDataVersion",
  "ColorEffect",
  "ColorFilter",
  "ColorGain",
  "ColorHue",
  "ColorMatrix",
  "ColorMatrixA",
  "ColorMatrixB",
  "ColorMatrixNumber",
  "ColorMode",
  "ColorProfileSettings",
  "ColorSpace",
  "ColorTempAsShot",
  "ColorTempAuto",
  "ColorTempCloudy",
  "ColorTempCustom",
  "ColorTempDaylight",
  "ColorTemperature",
  "ColorTemperatureAuto",
  "ColorTemperatureCustom",
  "ColorTemperatureSet",
  "ColorTemperatureSetting",
  "ColorTempFlash",
  "ColorTempFluorescent",
  "ColorTempKelvin",
  "ColorTempMeasured",
  "ColorTempShade",
  "ColorTempTungsten",
  "ColorTint",
  "ColorTone",
  "ColorToneAuto",
  "ColorToneFaithful",
  "ColorToneLandscape",
  "ColorToneNeutral",
  "ColorTonePortrait",
  "ColorToneStandard",
  "CommandDials",
  "CommandDialsApertureSetting",
  "CommandDialsChangeMainSub",
  "CommandDialsMenuAndPlayback",
  "CommandDialsReverseRotation",
  "CommanderChannel",
  "CommanderGroupAManualOutput",
  "CommanderGroupAMode",
  "CommanderGroupBManualOutput",
  "CommanderGroupBMode",
  "CommanderInternalFlash",
  "CommanderInternalManualOutput",
  "CommanderInternalTTLCompBuiltin",
  "CommanderInternalTTLCompGroupA",
  "CommanderInternalTTLCompGroupB",
  "Compass",
  "ComponentBitDepth",
  "ComponentVersion",
  "CompositeImageMode",
  "CompositionAdjust",
  "CompositionAdjustRotation",
  "CompositionAdjustX",
  "CompositionAdjustY",
  "CompressedImageSize",
  "Compression",
  "CompressionFactor",
  "CompressionRatio",
  "CompressorVersion",
  "ContentIdentifier",
  "ContinuousBracketing",
  "ContinuousDrive",
  "ContinuousModeDisplay",
  "ContinuousModeLiveView",
  "ContinuousShootingSpeed",
  "ContinuousShotLimit",
  "Contrast",
  "ContrastAuto",
  "ContrastCurve",
  "ContrastDetectAFArea",
  "ContrastDetectAFInFocus",
  "ContrastFaithful",
  "ContrastHighlight",
  "ContrastHighlightShadowAdj",
  "ContrastLandscape",
  "ContrastMode",
  "ContrastMonochrome",
  "ContrastNeutral",
  "ContrastPortrait",
  "ContrastSetting",
  "ContrastShadow",
  "ContrastStandard",
  "ControlDialSet",
  "ControllerBoardVersion",
  "ControlMode",
  "ControlRingResponse",
  "ControlRingRotation",
  "ConversionLens",
  "Converter",
  "Copyright",
  "CorrelatedColorTemp",
  "Country",
  "CountryCode",
  "CPUFirmwareVersion",
  "CPUVersions",
  "CreateDate",
  "CreativeStyle",
  "CreativeStyleSetting",
  "CropArea",
  "CropBottomMargin",
  "CropHeight",
  "CropHiSpeed",
  "CropLeft",
  "CropLeftMargin",
  "CropMode",
  "CroppedImageHeight",
  "CroppedImageLeft",
  "CroppedImageTop",
  "CroppedImageWidth",
  "CropRightMargin",
  "CropTop",
  "CropTopMargin",
  "CropWidth",
  "CrossProcess",
  "CustomControls",
  "CustomizeDials",
  "CustomPictureStyleFileName",
  "CustomRendered",
  "CustomSaturation",
  "CustomSettingsAllDefault",
  "CustomSettingsBank",
  "CustomWBBlueLevel",
  "CustomWBError",
  "CustomWBGreenLevel",
  "CustomWBRedLevel",
  "CustomWBSetting",
  "DarkFocusEnvironment",
  "DataDump",
  "DataScaling",
  "Date",
  "DateDisplayFormat",
  "DateImprint",
  "DateStampMode",
  "DateTimeOriginal",
  "DateTimeStamp",
  "DateTimeUTC",
  "DaylightSavings",
  "DECPosition",
  "DeletedImageCount",
  "DestinationCity",
  "DestinationCityCode",
  "DestinationDST",
  "DevelopmentDynamicRange",
  "DeviceCodename",
  "DeviceHardwareRevision",
  "DeviceMake",
  "DeviceModel",
  "DeviceType",
  "DialDirectionTvAv",
  "DiffractionCompensation",
  "DigitalFilter",
  "DigitalGain",
  "DigitalICE",
  "DigitalLensOptimizer",
  "DigitalLensOptimizerSetting",
  "DigitalZoom",
  "DigitalZoomOn",
  "DigitalZoomRatio",
  "DirectoryIndex",
  "DirectoryNumber",
  "DispButton",
  "DisplayAllAFPoints",
  "DisplayAperture",
  "DistortionControl",
  "DistortionCorrection",
  "DistortionCorrectionSetting",
  "DistortionCorrectionValue",
  "DistortionCorrectionVersion",
  "DistortionCorrParams",
  "DistortionCorrParamsPresent",
  "DriveMode",
  "DriveModeSetting",
  "DriveSpeed",
  "DSPFirmwareVersion",
  "DualPixelRaw",
  "Duration",
  "DustRemovalData",
  "DXCropAlert",
  "DynamicAFArea",
  "DynamicAreaAFAssist",
  "DynamicAreaAFDisplay",
  "DynamicRange",
  "DynamicRangeBoost",
  "DynamicRangeExpansion",
  "DynamicRangeOptimizer",
  "DynamicRangeOptimizerBracket",
  "DynamicRangeOptimizerLevel",
  "DynamicRangeOptimizerMode",
  "DynamicRangeOptimizerSetting",
  "DynamicRangeSetting",
  "EasyExposureComp",
  "EasyMode",
  "EffectiveMaxAperture",
  "ElectronicFrontCurtainShutter",
  "Emissivity",
  "EnergySavingMode",
  "Enhancement",
  "Enhancer",
  "EpsonImageHeight",
  "EpsonImageWidth",
  "EpsonSoftware",
  "EquipmentVersion",
  "ETTLII",
  "EventNumber",
  "EVSteps",
  "ExitPupilPosition",
  "ExposureBracketingIndicatorLast",
  "ExposureBracketShotNumber",
  "ExposureBracketStepSize",
  "ExposureBracketValue",
  "ExposureCompAutoCancel",
  "ExposureCompensation",
  "ExposureCompensationMode",
  "ExposureCompensationSet",
  "ExposureCompensationSetting",
  "ExposureCompStepSize",
  "ExposureControlStep",
  "ExposureCount",
  "ExposureDifference",
  "ExposureIndicator",
  "ExposureLevelIncrements",
  "ExposureModeInManual",
  "ExposureProgram",
  "ExposureShift",
  "ExposureTime",
  "ExposureTimeMax",
  "ExposureTimeMin",
  "ExposureTuning",
  "ExposureWarning",
  "EXRAuto",
  "EXRMode",
  "ExtendedMenuBanks",
  "ExtendedShutterSpeeds",
  "ExtendedWBDetect",
  "Extender",
  "ExtenderFirmwareVersion",
  "ExtenderModel",
  "ExtenderSerialNumber",
  "ExtenderStatus",
  "ExternalFlash",
  "ExternalFlashBounce",
  "ExternalFlashCompensation",
  "ExternalFlashExposureComp",
  "ExternalFlashFirmware",
  "ExternalFlashFlags",
  "ExternalFlashGuideNumber",
  "ExternalFlashGValue",
  "ExternalFlashMode",
  "ExternalFlashReadyState",
  "ExternalFlashStatus",
  "ExternalFlashZoom",
  "ExternalFlashZoomOverride",
  "ExternalSensorBrightnessValue",
  "ExtraInfoVersion",
  "EyeDetection",
  "EyeStartAF",
  "FaceDetect",
  "FaceDetectArea",
  "FaceDetectFrameCrop",
  "FaceDetectFrameSize",
  "FaceDetection",
  "FaceElementPositions",
  "FaceElementSelected",
  "FaceElementTypes",
  "FaceImageSize",
  "FaceInfoLength",
  "FaceInfoOffset",
  "FaceName",
  "FacePositions",
  "FacesDetected",
  "FacesDetectedA",
  "FacesDetectedB",
  "FacesRecognized",
  "FaceWidth",
  "Fade",
  "FEMicroadjustment",
  "FileFormat",
  "FileIndex",
  "FileInfoVersion",
  "FileNumber",
  "FileNumberMemory",
  "FileSource",
  "FillFlashAutoReduction",
  "FilmGrainEffect",
  "FilmMode",
  "FilmType",
  "FilterEffect",
  "FilterEffectAuto",
  "FilterEffectMonochrome",
  "FinderDisplayDuringExposure",
  "FineSharpness",
  "FineTuneOptHighlightWeighted",
  "FinishedImage",
  "Firmware",
  "FirmwareDate",
  "FirmwareID",
  "FirmwareName",
  "FirmwareRevision",
  "FirstFrameActionInAFC",
  "FisheyeFilter",
  "FlashAction",
  "FlashActionExternal",
  "FlashActivity",
  "FlashBatteryLevel",
  "FlashBias",
  "FlashBits",
  "FlashBurstPriority",
  "FlashButtonFunction",
  "FlashChargeLevel",
  "FlashColorFilter",
  "FlashCommanderMode",
  "FlashCompensation",
  "FlashControl",
  "FlashControlMode",
  "FlashCurtain",
  "FlashDefault",
  "FlashDevice",
  "FlashDistance",
  "FlashExposureBracketValue",
  "FlashExposureComp",
  "FlashExposureCompArea",
  "FlashExposureCompSet",
  "FlashExposureIndicator",
  "FlashExposureIndicatorLast",
  "FlashExposureIndicatorNext",
  "FlashExposureLock",
  "FlashFired",
  "FlashFiring",
  "FlashFirmwareVersion",
  "FlashFocalLength",
  "FlashFunction",
  "FlashGNDistance",
  "FlashGroupACompensation",
  "FlashGroupAControlMode",
  "FlashGroupBCompensation",
  "FlashGroupBControlMode",
  "FlashGroupCCompensation",
  "FlashGroupCControlMode",
  "FlashGuideNumber",
  "FlashIlluminationPattern",
  "FlashInfoVersion",
  "FlashIntensity",
  "FlashLevel",
  "FlashMasterControlMode",
  "FlashMetering",
  "FlashMeteringMode",
  "FlashMeteringSegments",
  "FlashMode",
  "FlashModel",
  "FlashOptions",
  "FlashOutput",
  "FlashRemoteControl",
  "FlashSerialNumber",
  "FlashSetting",
  "FlashSource",
  "FlashStatus",
  "FlashStatusExternal",
  "FlashSyncMode",
  "FlashSyncSpeedAv",
  "FlashThreshold",
  "FlashType",
  "FlashWarning",
  "FlexibleSpotPosition",
  "FlickAdvanceDirection",
  "FlickerReduce",
  "FlickerReduction",
  "FlickerReductionIndicator",
  "FlickerReductionShooting",
  "FlightDegree",
  "FlightSpeed",
  "FNumber",
  "FocalLength",
  "FocalLengthTeleZoom",
  "FocalPlaneAFPointArea",
  "FocalPlaneDiagonal",
  "FocalPlaneXSize",
  "FocalPlaneYSize",
  "FocalUnits",
  "FocusArea",
  "FocusAreaSelection",
  "FocusBracket",
  "FocusBracketStepSize",
  "FocusContinuous",
  "FocusDisplayAIServoAndMF",
  "FocusDistance",
  "FocusDistanceLower",
  "FocusDistanceRange",
  "FocusDistanceUpper",
  "FocusFrameSize",
  "FocusHoldButton",
  "FocusInfoVersion",
  "FocusingScreen",
  "FocusLocation",
  "FocusLocked",
  "FocusMode",
  "FocusModeSetting",
  "FocusModeSwitch",
  "FocusPeakingHighlightColor",
  "FocusPeakingLevel",
  "FocusPixel",
  "FocusPointBrightness",
  "FocusPointPersistence",
  "FocusPointSchema",
  "FocusPointSelectionSpeed",
  "FocusPointWrap",
  "FocusPosition",
  "FocusPositionHorizontal",
  "FocusPositionVertical",
  "FocusProcess",
  "FocusRange",
  "FocusRangeIndex",
  "FocusResult",
  "FocusRingRotation",
  "FocusSetting",
  "FocusShiftExposureLock",
  "FocusShiftInterval",
  "FocusShiftNumberShots",
  "FocusShiftShooting",
  "FocusShiftStepWidth",
  "FocusStatus",
  "FocusStepCount",
  "FocusStepInfinity",
  "FocusStepNear",
  "FocusTrackingLockOn",
  "FocusWarning",
  "FolderNumber",
  "FrameCount",
  "FrameNumber",
  "FrameRate",
  "FramingGridDisplay",
  "FreeBytes",
  "FujiFlashMode",
  "FujiModel",
  "FullImageSize",
  "FullPressSnap",
  "Func1Button",
  "Func1ButtonPlusDials",
  "Func2Button",
  "Func3Button",
  "FuncButton",
  "FuncButtonPlusDials",
  "FunctionButton",
  "GainBase",
  "GEImageSize",
  "GEMake",
  "GEModel",
  "GimbalDegree",
  "Gradation",
  "GrainEffectRoughness",
  "GrainEffectSize",
  "GrainyBWFilter",
  "GreenGain",
  "GridDisplay",
  "GripBatteryADLoad",
  "GripBatteryADNoLoad",
  "GripBatteryPercent",
  "GripBatteryVoltage",
  "GroupAreaAFIllumination",
  "HDMIBitDepth",
  "HDMIExternalRecorder",
  "HDMIOutputRange",
  "HDMIOutputResolution",
  "HDREffect",
  "HDRGain",
  "HDRHeadroom",
  "HDRInfoVersion",
  "HDRLevel",
  "HDRPSoftware",
  "HDRSetting",
  "HDRSmoothing",
  "HiddenDataLength",
  "HiddenDataOffset",
  "HighFrameRate",
  "Highlight",
  "Highlights",
  "HighlightTone",
  "HighlightTonePriority",
  "HighlightWarning",
  "HighLowKeyAdj",
  "HighSpeedSync",
  "Histogram",
  "HometownCity",
  "HometownCityCode",
  "HometownDST",
  "HostSoftwareExportVersion",
  "HostSoftwareRendering",
  "Hue",
  "HueAdjust",
  "HueAdjustment",
  "HyperlapsDebugInfo",
  "Illumination",
  "ImageAdjustment",
  "ImageArea",
  "ImageAuthentication",
  "ImageBoundary",
  "ImageCaptureType",
  "ImageCount",
  "ImageData",
  "ImageDataSize",
  "ImageEditCount",
  "ImageEditing",
  "ImageEffects",
  "ImageGeneration",
  "ImageHeight",
  "ImageIDNumber",
  "ImageName",
  "ImageNumber",
  "ImageOptimization",
  "ImageProcessing",
  "ImageProcessingVersion",
  "ImageQuality",
  "ImageReview",
  "ImageReviewTime",
  "ImageRotated",
  "ImageSizeRAW",
  "ImageStabilization",
  "ImageStabilizationSetting",
  "ImageStyle",
  "ImageTemperatureMax",
  "ImageTemperatureMin",
  "ImageTone",
  "ImageWidth",
  "InfoButtonWhenShooting",
  "InfraredIlluminator",
  "InitialAFPointAIServoAF",
  "InitialAFPointInServo",
  "InitialZoomLiveView",
  "InitialZoomSetting",
  "InitParamsText",
  "InstantPlaybackSetup",
  "InstantPlaybackTime",
  "IntelligentAuto",
  "IntelligentContrast",
  "IntelligentExposure",
  "IntelligentResolution",
  "InternalFlash",
  "InternalFlashMode",
  "InternalFlashStrength",
  "InternalFlashTable",
  "InternalNDFilter",
  "InternalSerialNumber",
  "IntervalDurationHours",
  "IntervalDurationMinutes",
  "IntervalDurationSeconds",
  "IntervalExposureSmoothing",
  "IntervalLength",
  "IntervalMode",
  "IntervalNumber",
  "IntervalPriority",
  "Intervals",
  "IntervalShooting",
  "ISO",
  "ISO2",
  "ISOAuto",
  "ISOAutoFlashLimit",
  "ISOAutoHiLimit",
  "ISOAutoMax",
  "ISOAutoMin",
  "ISOAutoMinSpeed",
  "ISOAutoShutterTime",
  "ISODisplay",
  "ISOExpansion",
  "ISOFloor",
  "ISOMax",
  "ISOMin",
  "ISOSelected",
  "ISOSelection",
  "ISOSensitivityStep",
  "ISOSetting",
  "ISOSpeedExpansion",
  "ISOSpeedIncrements",
  "ISOSpeedRange",
  "ISOStepSize",
  "ISOValue",
  "JPEGQuality",
  "JPGCompression",
  "JpgRecordedPixels",
  "KeepExposure",
  "KeystoneCompensation",
  "KeystoneDirection",
  "KeystoneValue",
  "KodakInfoType",
  "KodakMake",
  "KodakMaker",
  "KodakModel",
  "KodakVersion",
  "Landmark",
  "Language",
  "LastFileNumber",
  "LateralChromaticAberration",
  "LCDDisplayAtPowerOn",
  "LCDDisplayReturnToShoot",
  "LCDIllumination",
  "LCDIlluminationDuringBulb",
  "LCDPanels",
  "Lens",
  "LensApertureRange",
  "LensControlRing",
  "LensDataVersion",
  "LensDistortionParams",
  "LensDriveNoAF",
  "LensFirmware",
  "LensFirmwareVersion",
  "LensFocalLength",
  "LensFocalRange",
  "LensFocusFunctionButtons",
  "LensFormat",
  "LensFStops",
  "LensFunc1Button",
  "LensFunc2Button",
  "LensID",
  "LensIDNumber",
  "LensInfo",
  "LensMaxApertureRange",
  "LensModel",
  "LensMount",
  "LensMountType",
  "LensPositionAbsolute",
  "LensProperties",
  "LensSerialNumber",
  "LensShading",
  "LensShutterLock",
  "LensSpec",
  "LensSpecFeatures",
  "LensTemperature",
  "LensType",
  "LensType2",
  "LensType3",
  "LensTypeMake",
  "LensTypeModel",
  "LensZoomPosition",
  "LevelOrientation",
  "LightCondition",
  "LightingMode",
  "LightSource",
  "LightSourceSpecial",
  "LightSwitch",
  "LightValueCenter",
  "LightValuePeriphery",
  "LimitAFAreaModeSelection",
  "LinearityUpperMargin",
  "LinkAEToAFPoint",
  "LivePhotoVideoIndex",
  "LiveView",
  "LiveViewAF",
  "LiveViewAFAreaMode",
  "LiveViewAFMethod",
  "LiveViewAFMode",
  "LiveViewButtonOptions",
  "LiveViewExposureSimulation",
  "LiveViewFocusMode",
  "LiveViewMetering",
  "LiveViewMonitorOffTime",
  "LiveViewShooting",
  "LocalLocationName",
  "Location",
  "LocationInfoVersion",
  "LocationName",
  "LockMicrophoneButton",
  "LoggingMetadataText",
  "LongExposureNRUsed",
  "LowLightAF",
  "LuminanceNoiseAmplitude",
  "LuminanceNoiseReduction",
  "LVShootingAreaDisplay",
  "M16CVersion",
  "Macro",
  "MacroLED",
  "MacroMode",
  "MagicFilter",
  "MagnifiedView",
  "MainDialExposureComp",
  "Make",
  "MakerNoteOffset",
  "MakerNoteType",
  "MakerNoteVersion",
  "ManometerPressure",
  "ManometerReading",
  "ManualAFPointSelectPattern",
  "ManualFlash",
  "ManualFlashOutput",
  "ManualFlashStrength",
  "ManualFocusDistance",
  "ManualFocusPointIllumination",
  "ManualFocusRingInAFMode",
  "ManualTv",
  "MasterGain",
  "MatrixMetering",
  "MaxAnalogISO",
  "MaxAperture",
  "MaxApertureAtMaxFocal",
  "MaxApertureAtMinFocal",
  "MaxFaces",
  "MaxFocalLength",
  "MaxNumAFPoints",
  "MCCData",
  "MCUVersion",
  "MeasuredEV",
  "MeasuredLV",
  "MeasuredRGGB",
  "MeasuredRGGBData",
  "MechanicalShutterCount",
  "MemoryCardConfiguration",
  "MemoryCardNumber",
  "MenuButtonDisplayPosition",
  "MenuButtonReturn",
  "MergedImage",
  "MergedImages",
  "MetaVersion",
  "Metering",
  "MeteringButton",
  "MeteringMode",
  "MeteringOffScaleIndicator",
  "MeteringTime",
  "MeterMode",
  "MidRangeSharpness",
  "MinAperture",
  "MinFocalLength",
  "MinFocusDistance",
  "MiniatureFilter",
  "MiniatureFilterOrientation",
  "MiniatureFilterParameter",
  "MiniatureFilterPosition",
  "MinimumISO",
  "MinoltaDate",
  "MinoltaImageSize",
  "MinoltaModelID",
  "MinoltaQuality",
  "MinoltaTime",
  "MirrorLockup",
  "ModeDialPosition",
  "Model",
  "ModelReleaseYear",
  "ModifiedColorTemp",
  "ModifiedDigitalGain",
  "ModifiedParamFlag",
  "ModifiedPictureStyle",
  "ModifiedSaturation",
  "ModifiedSensorBlueLevel",
  "ModifiedSensorRedLevel",
  "ModifiedSharpness",
  "ModifiedSharpnessFreq",
  "ModifiedToneCurve",
  "ModifiedWhiteBalance",
  "ModifiedWhiteBalanceBlue",
  "ModifiedWhiteBalanceRed",
  "MonitorBrightness",
  "MonitorDisplayOff",
  "MonitorOffTime",
  "MonochromeColor",
  "MonochromeFilterEffect",
  "MonochromeGrainEffect",
  "MonochromeProfileSettings",
  "MonochromeToning",
  "MonochromeVignetting",
  "MonthDayCreated",
  "MoonPhase",
  "MotionSensitivity",
  "MovieAFAreaMode",
  "MovieAFTrackingSensitivity",
  "MovieFlickerReduction",
  "MovieFunc1Button",
  "MovieFunc2Button",
  "MovieFunc3Button",
  "MovieFunctionButton",
  "MovieFunctionButtonPlusDials",
  "MovieHighlightDisplayPattern",
  "MovieHighlightDisplayThreshold",
  "MovieISOAutoControlManualMode",
  "MovieISOAutoHiLimit",
  "MovieLensControlRing",
  "MovieMultiSelector",
  "MoviePreviewButton",
  "MoviePreviewButtonPlusDials",
  "MovieShutterButton",
  "MovieSubSelectorAssignment",
  "MovieSubSelectorAssignmentPlusDials",
  "MovieWhiteBalanceSameAsPhoto",
  "MultiControllerWhileMetering",
  "MultiExposure",
  "MultiExposureAutoGain",
  "MultiExposureMode",
  "MultiExposureOverlayMode",
  "MultiExposureShots",
  "MultiExposureVersion",
  "MultiFrameNoiseReduction",
  "MultiFrameNREffect",
  "MultiFunctionLock",
  "MultipleExposureMode",
  "MultipleExposureSet",
  "MultiSelector",
  "MultiSelectorLiveView",
  "MultiSelectorPlaybackMode",
  "MultiSelectorShootMode",
  "MyColorMode",
  "NDFilter",
  "NEFCompression",
  "NEFLinearizationTable",
  "NeutralDensityFilter",
  "NikonImageSize",
  "NikonMeteringMode",
  "NoiseFilter",
  "NoiseReduction",
  "NoiseReductionStrength",
  "NoMemoryCard",
  "NominalMaxAperture",
  "NominalMinAperture",
  "NormalWhiteLevel",
  "NumAFPoints",
  "NumberOffsets",
  "NumCAFPoints",
  "NumFaceElements",
  "NumFacePositions",
  "OISMode",
  "OKButton",
  "OlympusImageHeight",
  "OlympusImageWidth",
  "OneTouchWB",
  "OpticalVR",
  "OpticalZoom",
  "OpticalZoomCode",
  "OpticalZoomMode",
  "OpticalZoomOn",
  "OrderNumber",
  "OrientationLinkedAFPoint",
  "OriginalDecisionDataOffset",
  "OriginalDirectory",
  "OriginalFileName",
  "OriginalImageHeight",
  "OriginalImageWidth",
  "OtherInfo",
  "OutputLUT",
  "OwnerName",
  "PaintingFilter",
  "PanasonicDateTime",
  "PanasonicExifVersion",
  "PanasonicImageHeight",
  "PanasonicImageWidth",
  "PanoramaAngle",
  "PanoramaCropBottom",
  "PanoramaCropLeft",
  "PanoramaCropRight",
  "PanoramaCropTop",
  "PanoramaDirection",
  "PanoramaFrameHeight",
  "PanoramaFrameWidth",
  "PanoramaFullHeight",
  "PanoramaFullWidth",
  "PanoramaMode",
  "PanoramaSize3D",
  "PanoramaSourceHeight",
  "PanoramaSourceWidth",
  "PayloadMetadataText",
  "PentaxImageSize",
  "PentaxModelID",
  "PentaxModelType",
  "PerChannelBlackLevel",
  "PeripheralIlluminationCorr",
  "PeripheralLighting",
  "PeripheralLightingSetting",
  "PeripheralLightingValue",
  "PhaseDetectAF",
  "PhotoEffect",
  "PhotoIdentifier",
  "PhotoInfoPlayback",
  "PhotosAppFeatureFlags",
  "PhotoShootingMenuBank",
  "PhotoShootingMenuBankImageArea",
  "PhotoStyle",
  "PictureControlAdjust",
  "PictureControlBase",
  "PictureControlName",
  "PictureControlQuickAdjust",
  "PictureControlVersion",
  "PictureEffect",
  "PictureFinish",
  "PictureMode",
  "PictureModeBWFilter",
  "PictureModeContrast",
  "PictureModeEffect",
  "PictureModeSaturation",
  "PictureModeSharpness",
  "PictureModeStrength",
  "PictureModeTone",
  "PictureProfile",
  "PictureStyle",
  "PictureStylePC",
  "PictureStyleUserDef",
  "Pitch",
  "PitchAngle",
  "PixelAspectRatio",
  "PixelShiftID",
  "PixelShiftInfo",
  "PixelShiftResolution",
  "PlaybackFlickDown",
  "PlaybackFlickUp",
  "PlaybackMenusTime",
  "PlaybackZoom",
  "PlayDisplay",
  "POILevel",
  "PopupFlash",
  "PortraitImpressionBalance",
  "PortraitRefiner",
  "PostFocusMerging",
  "PostReleaseBurstLength",
  "PowerAvailable",
  "PowerSource",
  "PowerUpTime",
  "PreAF",
  "PreCaptureFrames",
  "PreReleaseBurstLength",
  "PresetWhiteBalance",
  "PreviewButton",
  "PreviewButtonPlusDials",
  "PreviewImage",
  "PreviewImageBorders",
  "PreviewImageHeight",
  "PreviewImageLength",
  "PreviewImageStart",
  "PreviewImageValid",
  "PreviewImageWidth",
  "PreviewQuality",
  "PrioritySetupShutterRelease",
  "ProgramISO",
  "ProgramLine",
  "ProgramMode",
  "ProgramShift",
  "Quality",
  "QuickControlDialInMeter",
  "QuickShot",
  "QuietShutterShootingSpeed",
  "RangeFinder",
  "Rating",
  "RawAndJpgRecording",
  "RawBurstImageCount",
  "RawBurstImageNum",
  "RawDataByteOrder",
  "RawDataCFAPattern",
  "RawDataLength",
  "RawDepth",
  "RawDevArtFilter",
  "RawDevAutoGradation",
  "RawDevColorSpace",
  "RawDevContrastValue",
  "RawDevEditStatus",
  "RawDevelopmentProcess",
  "RawDevEngine",
  "RawDevExposureBiasValue",
  "RawDevGradation",
  "RawDevGrayPoint",
  "RawDevMemoryColorEmphasis",
  "RawDevNoiseReduction",
  "RawDevPictureMode",
  "RawDevPMContrast",
  "RawDevPMNoiseFilter",
  "RawDevPMPictureTone",
  "RawDevPMSaturation",
  "RawDevPMSharpness",
  "RawDevSaturationEmphasis",
  "RawDevSettings",
  "RawDevSharpnessValue",
  "RawDevVersion",
  "RawDevWBFineAdjustment",
  "RawDevWhiteBalance",
  "RawDevWhiteBalanceValue",
  "RawImageCenter",
  "RawImageHeight",
  "RawImageWidth",
  "RawJpgQuality",
  "RawJpgSize",
  "RawMeasuredRGGB",
  "RearControPanelDisplay",
  "RearDisplay",
  "RecordDisplay",
  "RecordID",
  "RecordingFormat",
  "RecordingMode",
  "RecordMode",
  "RecordShutterRelease",
  "RectifaceText",
  "RedBalance",
  "RedEyeReduction",
  "RedEyeRemoval",
  "ReleaseButtonToUseDial",
  "ReleaseMode",
  "RemoteOnDuration",
  "RepeatingFlashCount",
  "RepeatingFlashOutput",
  "RepeatingFlashOutputExternal",
  "RepeatingFlashRate",
  "Resaved",
  "Resolution",
  "ResolutionMode",
  "ResolutionUnit",
  "RestrictDriveModes",
  "RetouchHistory",
  "RetouchInfoVersion",
  "RetouchNEFProcessing",
  "RetractLensOnPowerOff",
  "ReverseExposureCompDial",
  "ReverseFocusRing",
  "ReverseIndicators",
  "ReverseShutterSpeedAperture",
  "RFLensMFFocusRingSensitivity",
  "RicohDate",
  "RicohImageHeight",
  "RicohImageWidth",
  "RicohMake",
  "RicohModel",
  "Roll",
  "RollAngle",
  "ROMOperationMode",
  "Rotation",
  "RunTimeValue",
  "SafetyShift",
  "SafetyShiftInAvOrTv",
  "SameExposureForNewAperture",
  "SamsungModelID",
  "SanyoQuality",
  "SanyoThumbnail",
  "Saturation",
  "SaturationAdj",
  "SaturationAuto",
  "SaturationFaithful",
  "SaturationLandscape",
  "SaturationNeutral",
  "SaturationPortrait",
  "SaturationSetting",
  "SaturationStandard",
  "SaveFocus",
  "ScanImageEnhancer",
  "SceneAssist",
  "SceneDetect",
  "SceneMode",
  "SceneModeUsed",
  "SceneRecognition",
  "SceneSelect",
  "ScreenTips",
  "SecondarySlotFunction",
  "SelectableAFPoint",
  "SelectAFAreaSelectMode",
  "SelfTimer",
  "SelfTimerInterval",
  "SelfTimerTime",
  "SemanticStyle",
  "SemanticStylePreset",
  "SemanticStyleRenderingVer",
  "SensitivityAdjust",
  "SensitivitySteps",
  "Sensor",
  "SensorBitDepth",
  "SensorBlueLevel",
  "SensorBottomBorder",
  "SensorCalibration",
  "SensorCleaning",
  "SensorFullHeight",
  "SensorFullWidth",
  "SensorHeight",
  "SensorID",
  "SensorLeftBorder",
  "SensorPixelSize",
  "SensorRedLevel",
  "SensorRightBorder",
  "SensorSize",
  "SensorTemperature",
  "SensorTopBorder",
  "SensorType",
  "SensorWidth",
  "Sequence",
  "SequenceFileNumber",
  "SequenceImageNumber",
  "SequenceLength",
  "SequenceNumber",
  "SequenceShotInterval",
  "SequentialShot",
  "SerialNumber",
  "ServoAFCharacteristics",
  "SetButtonCrossKeysFunc",
  "SetButtonWhenShooting",
  "ShadingCompensation",
  "Shadow",
  "ShadowCorrection",
  "Shadows",
  "ShadowTone",
  "ShakeReduction",
  "Sharpening",
  "SharpnessAuto",
  "SharpnessFactor",
  "SharpnessFaithful",
  "SharpnessFreqTable",
  "SharpnessFrequency",
  "SharpnessLandscape",
  "SharpnessMonochrome",
  "SharpnessNeutral",
  "SharpnessPortrait",
  "SharpnessRange",
  "SharpnessSetting",
  "SharpnessStandard",
  "SharpnessTable",
  "ShootingInfoDisplay",
  "ShootingInfoMonitorOffTime",
  "ShootingMode",
  "ShootingModeSetting",
  "ShortOwnerName",
  "ShortReleaseTimeLag",
  "ShotInfoVersion",
  "ShotLogDataText",
  "ShotNumber",
  "ShotNumberSincePowerUp",
  "ShotParamsText",
  "ShotsPerInterval",
  "Shutter",
  "ShutterAELButton",
  "ShutterCount",
  "ShutterCount2",
  "ShutterCount3",
  "ShutterCurtainSync",
  "ShutterMode",
  "ShutterReleaseMethod",
  "ShutterReleaseNoCFCard",
  "ShutterReleaseTiming",
  "ShutterReleaseWithoutLens",
  "ShutterSpeed",
  "ShutterSpeedLock",
  "ShutterSpeedRange",
  "ShutterSpeedSetting",
  "ShutterSpeedValue",
  "ShutterType",
  "SignalToNoiseRatio",
  "SilentPhotography",
  "SingleFrame",
  "SingleFrameBracketing",
  "SlaveFlashMeteringSegments",
  "SlowShutter",
  "SlowSync",
  "SmartAlbumColor",
  "SmileShutter",
  "SmileShutterMode",
  "SoftFocusFilter",
  "SoftSkinEffect",
  "Software",
  "SoftwareDate",
  "SonyDateTime",
  "SonyDateTime2",
  "SonyExposureTime",
  "SonyFNumber",
  "SonyImageHeight",
  "SonyImageHeightMax",
  "SonyImageSize",
  "SonyImageWidth",
  "SonyImageWidthMax",
  "SonyISO",
  "SonyMaxAperture",
  "SonyMaxApertureValue",
  "SonyMinAperture",
  "SonyModelID",
  "SonyQuality",
  "SourceDirectoryIndex",
  "SourceFileIndex",
  "SpecialEffectLevel",
  "SpecialEffectMode",
  "SpecialEffectSetting",
  "SpecularWhiteLevel",
  "SpeedX",
  "SpeedY",
  "SpeedZ",
  "SportEvents",
  "SpotFocusPointX",
  "SpotFocusPointY",
  "SpotMeterLinkToAFPoint",
  "SRActive",
  "SRAWQuality",
  "SRFocalLength",
  "SRHalfPressTime",
  "SRResult",
  "StackedImage",
  "StandbyMonitorOffTime",
  "StandbyTimer",
  "StartMovieShooting",
  "State",
  "StaticMetadataText",
  "StopsAboveBaseISO",
  "StorageMethod",
  "StoreByOrientation",
  "SubDialFrameAdvance",
  "SubjectDetectArea",
  "SubjectDetectDetail",
  "SubjectDetectFrameSize",
  "SubjectDetection",
  "SubjectDetectStatus",
  "SubjectMotion",
  "SubjectProgram",
  "SubjectRecognition",
  "SubjectSwitching",
  "SubjectToDetect",
  "SubSelector",
  "SubSelectorAssignment",
  "SubSelectorCenter",
  "SubSelectorPlusDials",
  "SummaryText",
  "SuperimposedDisplay",
  "SuperMacro",
  "SvISOSetting",
  "SweepPanoramaDirection",
  "SweepPanoramaFieldOfView",
  "SweepPanoramaSize",
  "SwitchToRegisteredAFPoint",
  "SyncReleaseMode",
  "TargetAperture",
  "TargetCompressionRatio",
  "TargetDistanceSetting",
  "TargetExposureTime",
  "TargetImageType",
  "Teleconverter",
  "TextEncoding",
  "TextStamp",
  "ThumbnailFileName",
  "ThumbnailHeight",
  "ThumbnailImage",
  "ThumbnailImageValidArea",
  "ThumbnailWidth",
  "TiffMeteringImage",
  "TiffMeteringImageHeight",
  "TiffMeteringImageWidth",
  "Time",
  "TimeCreated",
  "TimeLapseShotNumber",
  "TimeLogText",
  "TimerLength",
  "TimeSincePowerOn",
  "TimeStamp",
  "TimeZone",
  "TimeZoneCity",
  "TimeZoneCode",
  "TimeZoneInfo",
  "Title",
  "ToneCurve",
  "ToneCurveMatching",
  "ToneCurveTable",
  "ToneLevel",
  "ToningEffect",
  "ToningEffectAuto",
  "ToningEffectMonochrome",
  "ToningSaturation",
  "TotalZoom",
  "ToyCameraFilter",
  "Transform",
  "TrashButtonFunction",
  "TravelDay",
  "TriggerMode",
  "TvExposureTimeSetting",
  "UniqueID",
  "UnknownNumber",
  "UnsharpMaskFineness",
  "UnsharpMaskThreshold",
  "UnusedLoggingMetadata",
  "UsableMeteringModes",
  "UsableShootingModes",
  "USBPowerDelivery",
  "UserDef1PictureStyle",
  "UserDef2PictureStyle",
  "UserDef3PictureStyle",
  "UserLabel",
  "UserProfile",
  "USMLensElectronicMF",
  "ValidAFPoints",
  "ValidBits",
  "VariProgram",
  "VerticalAFOnButton",
  "VerticalFuncButton",
  "VerticalFuncButtonPlusDials",
  "VerticalMovieAFOnButton",
  "VerticalMovieFuncButton",
  "VerticalMultiSelector",
  "VFDisplayIllumination",
  "VibrationReduction",
  "VideoBurstMode",
  "VideoBurstResolution",
  "VideoCodec",
  "VideoFrameRate",
  "VideoPreburst",
  "ViewfinderDisplay",
  "ViewfinderWarning",
  "ViewfinderWarnings",
  "ViewInfoDuringExposure",
  "ViewingMode",
  "Vignette",
  "VignetteControl",
  "VignetteCorrectionVersion",
  "Vignetting",
  "VignettingCorrection",
  "VignettingCorrParams",
  "VignettingCorrVersion",
  "VoiceMemo",
  "VRInfoVersion",
  "VRMode",
  "VRType",
  "WatercolorFilter",
  "WBBlue",
  "WBBlueLevel",
  "WBBracketingSteps",
  "WBBracketMode",
  "WBBracketShotNumber",
  "WBBracketValueAB",
  "WBBracketValueGM",
  "WBButtonPlaybackMode",
  "WBGreen",
  "WBGreenLevel",
  "WBMediaImageSizeSetting",
  "WBMode",
  "WBRed",
  "WBRedLevel",
  "WBScale",
  "WBShiftAB",
  "WBShiftCreativeControl",
  "WBShiftGM",
  "WBShiftIntelligentAuto",
  "WhiteBalance",
  "WhiteBalanceAutoAdjustment",
  "WhiteBalanceBias",
  "WhiteBalanceBlue",
  "WhiteBalanceBracket",
  "WhiteBalanceBracketing",
  "WhiteBalanceMatching",
  "WhiteBalanceMode",
  "WhiteBalanceRed",
  "WhiteBalanceSet",
  "WhiteBalanceSetting",
  "WhiteBalanceTable",
  "WhiteBalanceTemperature",
  "WhiteBoard",
  "WhiteLevel",
  "WhitePoint",
  "WholeAreaTracking",
  "WideAdapter",
  "WideFocusZone",
  "WideRange",
  "WorldTimeLocation",
  "X3FillLight",
  "Xidiri",
  "XResolution",
  "Yaw",
  "YCbCrCoefficients",
  "YCbCrPositioning",
  "YearCreated",
  "YResolution",
  "ZoneMatching",
  "ZoneMatchingMode",
  "ZoneMatchingOn",
  "ZoneMatchingValue",
  "ZoomedPreviewImage",
  "ZoomedPreviewLength",
  "ZoomedPreviewSize",
  "ZoomedPreviewStart",
  "ZoomSourceWidth",
  "ZoomStepCount",
  "ZoomTargetWidth",
) satisfies StrEnum<keyof MakerNotesTags>;

export type MakerNotesTag = StrEnumKeys<typeof MakerNotesTagsNames>;

/**
 * @see https://exiftool.org/TagNames/XMP.html
 */
export interface XMPTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example "uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b"
   */
  About?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "+823.75"
   */
  AbsoluteAltitude?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Twilight Dreams"
   */
  Album?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  AlreadyApplied?: boolean;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "RtkAlt"
   */
  AltitudeType?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example 9016997700
   */
  ApertureValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 6.06
   */
  ApproximateFocusDistance?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  AsrClimaxDuration?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "None"
   */
  AsrClimaxScene?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  AsrIsMacroRange?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Stable"
   */
  AsrSceneCondition?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "NightPortrait"
   */
  AsrSceneMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  AutoLateralCA?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "urn:com:apple:photo:2020:aux:semanticskymatte"
   */
  AuxiliaryImageType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["LWIR"]
   */
  BandName?: string[];
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, File, RAF, RIFF, XMP
   * @example 8
   */
  BitsPerSample?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  BlueHue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  BlueSaturation?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups MakerNotes, XMP
   * @example 9.25
   */
  Brightness?: number;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9.9919505
   */
  BrightnessValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89"
   */
  BurstID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  BurstPrimary?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89"
   */
  CameraBurstID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Front"
   */
  CameraFacing?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Embedded"
   */
  CameraProfile?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "FA401BB3ADB9630D5AF577E3A7BD8680"
   */
  CameraProfileDigest?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups APP, EXIF, XMP
   * @example 91702442
   */
  CameraSerialNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Rear"
   */
  CameraUnit?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  CamReverse?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Photo"
   */
  CaptureMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "https://PhotoStructure.com/"
   */
  CaptureSoftware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["Subjekt|Natur|Pflanzen","Ort|Deutschland|Rangsdorf"]
   */
  CatalogSets?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @groups MakerNotes, XMP
   * @example "People"
   */
  Categories?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "240-8-330-901211"
   */
  CellGlobalID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 5
   */
  CellR?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 901211
   */
  CellTowerID?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 45
   */
  CentralTemperature?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example [10000]
   */
  CentralWavelength?: number[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["tag,2011-07-26T05:44:01Z,0,c"]
   */
  Changes?: string[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ChromaticAberrationB?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ChromaticAberrationR?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example [{"CorrectionActive":true,"CorrectionAmount":1,"Correctio…tion"}]
   */
  CircularGradientBasedCorrections?: Struct[];
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups IPTC, MakerNotes, XMP
   * @example "TEDDINGTON"
   */
  City?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups XMP
   * @example "5 (Typical)"
   */
  ColorClass?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ColorLabel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ""
   */
  Colorlabels?: string;
  /**
   * @frequency 🔥 ★★☆☆ (14%)
   * @groups APP, MakerNotes, XMP
   * @example "n/a"
   */
  ColorMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 25
   */
  ColorNoiseReduction?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 50
   */
  ColorNoiseReductionDetail?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 50
   */
  ColorNoiseReductionSmoothness?: number;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "sRGB"
   */
  ColorSpace?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups MakerNotes, XMP
   * @example 9900
   */
  ColorTemperature?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups File, XMP
   * @example "This is a comment."
   */
  Comment?: string;
  /**
   * @frequency 🔥 ★★★★ (56%)
   * @groups EXIF, XMP
   * @example 90
   */
  CompressedBitsPerPixel?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, File, MakerNotes, XMP
   * @example "Unknown (1536)"
   */
  Compression?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example {"Directory":[{"DataURI":"primary_image","Length":0,"Mime…peg"}]}
   */
  Container?: Struct;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "/home/username/pictures"
   */
  ContainerDirectory?: ContainerDirectoryItem[] | Struct[];
  /**
   * @frequency 🔥 ★★★★ (60%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Contrast?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "United States"
   */
  Country?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "ir"
   */
  CountryCode?: string;
  /**
   * @frequency 🔥 ★★★★ (99%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "2218:09:22 02:32:14"
   */
  CreateDate?: ExifDateTime | ExifDate | string | number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example
   */
  CreationTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["daniel@woss.io"]
   */
  Creator?: string[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "{2d7e7fd6-2942-4d77-9842-389c3f62b14d}"
   */
  CreatorAppID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example {"CiAdrCity":"Amsterdam","CiAdrCtry":"Netherlands","CiAdr…73 CH"}
   */
  CreatorContactInfo?: Struct;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  CreatorOpenWithUIOptions?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Version Ver 1.04 "
   */
  Creatortool?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups XMP
   * @example "picnik.com"
   */
  CreatorTool?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  CropAngle?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 5428
   */
  CropBottom?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  CropConstrainToWarp?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example 7776
   */
  CropHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropLeft?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 3872
   */
  CroppedAreaImageHeightPixels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 7744
   */
  CroppedAreaImageWidthPixels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  CroppedAreaLeftPixels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  CroppedAreaTopPixels?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 8148
   */
  CropRight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, MakerNotes, XMP
   * @example "8 0"
   */
  CropTop?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example 5184
   */
  CropWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (64%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Custom process)"
   */
  CustomRendered?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "2014:05:11 13:08:25.659"
   */
  DateAcquired?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups Composite, IPTC, XMP
   * @example "2025:06:11"
   */
  DateCreated?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "2017:08:13 12:38:30"
   */
  DateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "2017:08:13 12:38:30"
   */
  DateTimeDigitized?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups APP, Composite, EXIF, MakerNotes, RIFF, XMP
   * @example "2218:09:22 02:32:14"
   */
  DateTimeOriginal?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "2015:06:02 09:56:01"
   */
  DateUTC?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  DefringeGreenAmount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 60
   */
  DefringeGreenHueHi?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 40
   */
  DefringeGreenHueLo?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  DefringePurpleAmount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 70
   */
  DefringePurpleHueHi?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 30
   */
  DefringePurpleHueLo?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  Dehaze?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example {"DocumentID":"xmp.did:dc336491-3ad3-d14d-b6d5-09674661b1…D6D09"}
   */
  DerivedFrom?: Struct;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "nfd"
   */
  Description?: string;
  /**
   * @frequency 🔥 ★★★☆ (49%)
   * @groups EXIF, MakerNotes, XMP
   * @example 8.1319764
   */
  DigitalZoomRatio?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["Animation","Collage"]
   */
  DisableAutoCreation?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example "xmp.did:fec7af37-2965-48d8-bb7e-3e95ee085681"
   */
  DocumentID?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ""
   */
  DroneModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ""
   */
  DroneSerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups Composite, MakerNotes, QuickTime, XMP
   * @example 9.5095
   */
  Duration?: number;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups EXIF, XMP
   * @example 990
   */
  ExifImageHeight?: number;
  /**
   * @frequency 🔥 ★★★★ (97%)
   * @groups EXIF, XMP
   * @example 999
   */
  ExifImageWidth?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups EXIF, XMP
   * @example "Version 2.2"
   */
  ExifVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups APP, XMP
   * @example 3687
   */
  Exposure?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 1
   */
  ExposureCompensation?: number;
  /**
   * @frequency 🔥 ★★★★ (69%)
   * @groups EXIF, MakerNotes, XMP
   * @example "iAuto+"
   */
  ExposureProgram?: string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "inf"
   */
  ExposureTime?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example [{"FaceAnglePitch":0.009265,"FaceAngleRoll":-0.021281,"Fa…re":4}]
   */
  Face?: Struct[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  FaceNum?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  FaceSelectedIndex?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 8
   */
  Far?: number;
  /**
   * @frequency 🔥 ★★★★ (63%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (DSC)"
   */
  FileSource?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example
   */
  Filters?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "u77"
   */
  Firmware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, XMP
   * @example 0
   */
  FlashCompensation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Example flash make"
   */
  FlashManufacturer?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "None"
   */
  FlashModel?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "FlashPix Version 1.0"
   */
  FlashPixVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 3.8
   */
  FlightPitchDegree?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 4.5
   */
  FlightRollDegree?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  FlightXSpeed?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 88.699997
   */
  FlightYawDegree?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  FlightYSpeed?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  FlightZSpeed?: number;
  /**
   * @frequency 🔥 ★★★★ (98%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example 90
   */
  FNumber?: number;
  /**
   * @frequency 🔥 ★★★★ (96%)
   * @groups EXIF, MakerNotes, XMP
   * @example "99.7 mm"
   */
  FocalLength?: string;
  /**
   * @frequency 🔥 ★★★☆ (31%)
   * @groups EXIF, PanasonicRaw, QuickTime, XMP
   * @example "9920 mm"
   */
  FocalLengthIn35mmFormat?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example "um"
   */
  FocalPlaneResolutionUnit?: string;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example 9941.7476
   */
  FocalPlaneXResolution?: number;
  /**
   * @frequency 🔥 ★★★☆ (23%)
   * @groups EXIF, XMP
   * @example 9846.1538
   */
  FocalPlaneYResolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 6553500
   */
  FocusAreaHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  FocusAreaNum?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 6553500
   */
  FocusAreaWidth?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups APP, Composite, MakerNotes, XMP
   * @example "inf"
   */
  FocusDistance?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  FocusIsLensMoving?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 3372647
   */
  FocusPosX?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 936214
   */
  FocusPosY?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "NotFocusedLocked"
   */
  FocusState?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups QuickTime, XMP
   * @example "image/jpg"
   */
  Format?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 3872
   */
  FullPanoHeightPixels?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 7744
   */
  FullPanoWidthPixels?: number;
  /**
   * @frequency 🔥 ★★★☆ (22%)
   * @groups EXIF, XMP
   * @example "Unknown (8176)"
   */
  GainControl?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example -90
   */
  GimbalPitchDegree?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  GimbalReverse?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "+0.00"
   */
  GimbalRollDegree?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 84.400002
   */
  GimbalYawDegree?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @groups APP, Composite, EXIF, XMP
   * @example 99.8
   */
  GPSAltitude?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups Composite, EXIF, XMP
   * @example "Unknown (Sea level reference)"
   */
  GPSAltitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "2025:06:24"
   */
  GPSDateStamp?: ExifDate | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups Composite, XMP
   * @example "2025:06:24 22:24:43Z"
   */
  GPSDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example 94.800416
   */
  GPSImgDirection?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "Unknown ()"
   */
  GPSImgDirectionRef?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 48.857748
   */
  GPSLatitude?: number | string;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, Composite, EXIF, XMP
   * @example 2.2918888
   */
  GPSLongitude?: number | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups APP, Composite, EXIF, XMP
   * @example "West"
   */
  GPSLongitudeRef?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups APP, EXIF, XMP
   * @example "WGS84"
   */
  GPSMapDatum?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, XMP
   * @example "gps"
   */
  GPSProcessingMethod?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Invalid"
   */
  GpsStatus?: string;
  /**
   * @frequency 🔥 ★★☆☆ (11%)
   * @groups APP, EXIF, XMP
   * @example "50.51.48.48"
   */
  GPSVersionID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  GrainAmount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  GreenHue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  GreenSaturation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  HasCrop?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "F995C3239BC6E6FC1997814864CD2CA2"
   */
  HasExtendedXMP?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  HasSettings?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "(Binary data 31184 bytes, use -b option to extract)"
   */
  HDRPlusMakerNote?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["点像F11"]
   */
  HierarchicalSubject?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example [{"Action":"converted","Parameters":"from image/x-canon-c…alse}}]
   */
  History?: ResourceEvent[] | ResourceEvent | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentAqua?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentMagenta?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentOrange?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentPurple?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  HueAdjustmentYellow?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "sRGB IEC61966-2.1"
   */
  ICCProfileName?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 960
   */
  ImageHeight?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups File, XMP
   * @example 4048
   */
  ImageLength?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups EXIF, MakerNotes, XMP
   * @example 9956
   */
  ImageNumber?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "DefaultCamera"
   */
  ImageSource?: string;
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, Composite, EXIF, File, MakerNotes, QuickTime, RIFF, XMP
   * @example 9728
   */
  ImageWidth?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 180
   */
  InitialViewHeadingDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  InitialViewPitchDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  InitialViewRollDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example "xmp.iid:fec7af37-2965-48d8-bb7e-3e95ee085681"
   */
  InstanceID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "N"
   */
  InteroperabilityIndex?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "18, 25, 24.96"
   */
  InteroperabilityVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  IsBokehActive?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  IsHDRActive?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example false
   */
  IsNightModeActive?: boolean;
  /**
   * @frequency 🔥 ★★★★ (91%)
   * @groups Composite, EXIF, MakerNotes, XMP
   * @example 993
   */
  ISO?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups EXIF, XMP
   * @example 80
   */
  ISOSpeed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["red fish","bluefish"]
   */
  LastKeywordXMP?: string[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  LateralChromaticAberrationCorrectionAlreadyApplied?: boolean;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  Lens?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Back"
   */
  LensFacing?: string;
  /**
   * @frequency 🔥 ★★★☆ (22%)
   * @groups Composite, MakerNotes, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensID?: string;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, MakerNotes, XMP
   * @example "?mm f/?"
   */
  LensInfo?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "ZEISS"
   */
  LensMake?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LensManualDistortionAmount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Example lens make"
   */
  LensManufacturer?: string;
  /**
   * @frequency 🔥 ★★☆☆ (13%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  LensModel?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "8F12B291B497C65672E0AA61A6160502"
   */
  LensProfileDigest?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 100
   */
  LensProfileDistortionScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  LensProfileEnable?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "LensDefaults"
   */
  LensProfileSetup?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 100
   */
  LensProfileVignettingScale?: number;
  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "xB?"
   */
  LensSerialNumber?: string;
  /**
   * @frequency 🔥 ★★★★ (59%)
   * @groups EXIF, MakerNotes, XMP
   * @example "White Fluorescent"
   */
  LightSource?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 37087
   */
  LocationAreaCode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentAqua?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentMagenta?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentOrange?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentPurple?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceAdjustmentYellow?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  LuminanceNoiseReductionContrast?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 75
   */
  LuminanceNoiseReductionDetail?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 5
   */
  LuminanceSmoothing?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, QuickTime, XMP
   * @example "samsung"
   */
  Make?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "4577 bytes undefined data"
   */
  MakerNote?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  Marked?: boolean;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ""
   */
  Mask?: string;
  /**
   * @frequency 🔥 ★★★★ (66%)
   * @groups EXIF, XMP
   * @example 9.1
   */
  MaxApertureValue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example "2024:10:02 15:51:50-07:00"
   */
  MetadataDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (Center-weighted average)"
   */
  MeteringMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  MicroVideo?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 2448784
   */
  MicroVideoOffset?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 366563
   */
  MicroVideoPresentationTimestampUs?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  MicroVideoVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "image/jpeg"
   */
  Mime?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups QuickTime, XMP
   * @example "2011.7.0"
   */
  MinorVersion?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 240
   */
  MobileCountryCode?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 8
   */
  MobileNetworkCode?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups APP, EXIF, MakerNotes, QuickTime, XMP
   * @example "x530"
   */
  Model?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "2015:06:02 09:56:01"
   */
  ModificationDate?: ExifDateTime | string;
  /**
   * @frequency 🔥 ★★★★ (90%)
   * @groups EXIF, QuickTime, XMP
   * @example "2216:02:28 03:49:50"
   */
  ModifyDate?: ExifDateTime | string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  MotionPhoto?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 717986
   */
  MotionPhotoPresentationTimestampUs?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  MotionPhotoVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "36864,40960,40961,37121,37122,40962,40963,37510,40964,368…B0A1251"
   */
  NativeDigest?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 115.4
   */
  Near?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Album description"
   */
  Notes?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 561
   */
  ObjectAreaHeight?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 884
   */
  ObjectAreaWidth?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1
   */
  ObjectNum?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1890
   */
  ObjectPosX?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1796
   */
  ObjectPosY?: number;
  /**
   * @frequency 🔥 ★★★★ (92%)
   * @groups EXIF, PanasonicRaw, XMP
   * @example 8
   */
  Orientation?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example
   */
  OriginalCreateDateTime?: ExifDateTime | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups XMP
   * @example "xmp.did:CA75A78ACAC4DF11B8A4EF512D9BE2EA"
   */
  OriginalDocumentID?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups EXIF, XMP
   * @example "(Binary data 2060 bytes, use -b option to extract)"
   */
  Padding?: BinaryField | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ParametricDarks?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ParametricHighlights?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 75
   */
  ParametricHighlightSplit?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ParametricLights?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 50
   */
  ParametricMidtoneSplit?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ParametricShadows?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 25
   */
  ParametricShadowSplit?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["John Doe"]
   */
  PersonInImage?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveAspect?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveHorizontal?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveRotate?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 100
   */
  PerspectiveScale?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Off"
   */
  PerspectiveUpright?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveVertical?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveX?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PerspectiveY?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups XMP
   * @example 80
   */
  PhotographicSensitivity?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example "YCbCr"
   */
  PhotometricInterpretation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PickLabel?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "Low"
   */
  Pitch?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups XMP
   * @example "PM6"
   */
  PMVersion?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PortraitVersion?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 22.5
   */
  PoseHeadingDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 11.2
   */
  PosePitchDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 1.6
   */
  PoseRollDegrees?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  PostCropVignetteAmount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups IPTC, XMP
   * @example "Tagged:1, ColorClass:5, Rating:0, FrameNum:000505"
   */
  Prefs?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "DSC_0065.NEF"
   */
  PreservedFileName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 6.7
   */
  ProcessVersion?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example "Unknown (160)"
   */
  ProgramMode?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "equirectangular"
   */
  ProjectionType?: string;
  /**
   * @frequency 🔥 ★★☆☆ (16%)
   * @groups EXIF, MakerNotes, XMP
   * @example 5
   */
  Rating?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "VI7H4042.CR2"
   */
  RawFileName?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @groups EXIF, XMP
   * @example 800
   */
  RecommendedExposureIndex?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  RedHue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  RedSaturation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example {"AppliedToDimensions":{"H":3552,"W":2000},"RegionList":[…ace"}]}
   */
  RegionInfo?: Struct;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example {"Regions":""}
   */
  RegionInfoMP?: Struct;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example [{"RegItemId":"Number1","RegOrgId":"TestName1"},{"RegItem…ame3"}]
   */
  RegistryID?: Struct[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "+99.600"
   */
  RelativeAltitude?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, XMP
   * @example "inches"
   */
  ResolutionUnit?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Kawp E. Reite Houldre"
   */
  Rights?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 150.43
   */
  Roll?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups EXIF, XMP
   * @example 3
   */
  SamplesPerPixel?: number;
  /**
   * @frequency 🔥 ★★★★ (66%)
   * @groups EXIF, MakerNotes, XMP
   * @example "n/a"
   */
  Saturation?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentAqua?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentBlue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentGreen?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentMagenta?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentOrange?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentPurple?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentRed?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SaturationAdjustmentYellow?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "AutoHDR"
   */
  Scene?: string;
  /**
   * @frequency 🔥 ★★★★ (73%)
   * @groups EXIF, XMP
   * @example "Unknown (Standard)"
   */
  SceneCaptureType?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "[0.997883, 0.92984027]"
   */
  SceneDetectResultConfidences?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "[901, 60, 0]"
   */
  SceneDetectResultIds?: string;
  /**
   * @frequency 🔥 ★★★★ (51%)
   * @groups EXIF, XMP
   * @example "Unknown (Directly photographed)"
   */
  SceneType?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Undefined"
   */
  SelfData?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 65536
   */
  SemanticSegmentationMatteVersion?: number;
  /**
   * @frequency 🔥 ★★★☆ (35%)
   * @groups EXIF, XMP
   * @example "Unknown (One-chip color area sensor)"
   */
  SensingMethod?: string;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups EXIF, XMP
   * @example "Unknown"
   */
  SensitivityType?: string;
  /**
   * @frequency 🔥 ★★☆☆ (15%)
   * @groups APP, EXIF, MakerNotes, Meta, XMP
   * @example "sw02028104 "
   */
  SerialNumber?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 0
   */
  Shadows?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  ShadowTint?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 25
   */
  SharpenDetail?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SharpenEdgeMasking?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 2
   */
  SharpenRadius?: number;
  /**
   * @frequency 🔥 ★★☆☆ (18%)
   * @groups Composite, MakerNotes, XMP
   * @example "Unknown (83)"
   */
  ShootingMode?: string;
  /**
   * @frequency 🔥 ★★★☆ (39%)
   * @groups EXIF, MakerNotes, PanasonicRaw, XMP
   * @example "1/999963365"
   */
  ShutterSpeedValue?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, XMP
   * @example "Normal"
   */
  ShutterType?: string;
  /**
   * @frequency 🔥 ★★★★ (61%)
   * @groups EXIF, MakerNotes, QuickTime, RIFF, XMP
   * @example "https://PhotoStructure.com/"
   */
  Software?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC, XMP
   * @example "Shutterfly McShutterface"
   */
  Source?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 2
   */
  SourcePhotosCount?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["com.google.android.apps.camera.gallery.specialtype.Spec…TRAIT"]
   */
  SpecialTypeID?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SplitToningBalance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SplitToningHighlightHue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SplitToningHighlightSaturation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SplitToningShadowHue?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SplitToningShadowSaturation?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups MakerNotes, XMP
   * @example "Washington"
   */
  State?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "https://PhotoStructure.com/"
   */
  StitchingSoftware?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups RIFF, XMP
   * @example 3
   */
  StreamType?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["点像F11"]
   */
  Subject?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @groups EXIF, XMP
   * @example "99.99 m"
   */
  SubjectDistance?: string;
  /**
   * @frequency 🔥 ★★★☆ (24%)
   * @groups EXIF, XMP
   * @example "Unknown (Macro)"
   */
  SubjectDistanceRange?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 296185
   */
  SubsecTime?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, XMP
   * @example 996
   */
  SubSecTimeDigitized?: number;
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @groups EXIF, XMP
   * @example 999
   */
  SubSecTimeOriginal?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  SurveyingMode?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @groups XMP
   * @example "Yes"
   */
  Tagged?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["Subjekt/Natur/Pflanzen","Ort/Deutschland/Rangsdorf"]
   */
  TagsList?: string[];
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 9
   */
  Texture?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "+9"
   */
  Tint?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @groups MakerNotes, XMP
   * @example "Very Blank"
   */
  Title?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  TlinearGain?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @groups MakerNotes, XMP
   * @example "Standard"
   */
  ToneCurve?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "Medium Contrast"
   */
  ToneCurveName?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["0, 0","255, 255"]
   */
  ToneCurvePV2012Blue?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["0, 0","255, 255"]
   */
  ToneCurvePV2012Green?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ["0, 0","255, 255"]
   */
  ToneCurvePV2012Red?: string[];
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups IPTC, XMP
   * @example "1 (most urgent)"
   */
  Urgency?: string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example true
   */
  UsePanoramaViewer?: boolean;
  /**
   * @frequency 🔥 ★★★☆ (38%)
   * @groups EXIF, XMP
   * @example "This is a comment."
   */
  UserComment?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example ""
   */
  UTCAtExposure?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example
   */
  Versions?: Version[] | Version | string;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  Vibrance?: number;
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @groups XMP
   * @example 0
   */
  VignetteAmount?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example [4500]
   */
  WavelengthFWHM?: number[];
  /**
   * @frequency 🔥 ★★★★ (110%)
   * @groups APP, EXIF, MakerNotes, XMP
   * @example "White Preset"
   */
  WhiteBalance?: string;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups XMP
   * @example "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><…="0" />"
   */
  XMPMeta?: string;
  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @groups XMP
   * @example "XMP toolkit 3.0-28, framework 1.6"
   */
  XMPToolkit?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  XResolution?: number;
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @groups MakerNotes, XMP
   * @example 0.83734368
   */
  Yaw?: number;
  /**
   * @frequency 🔥 ★★★★ (100%)
   * @groups EXIF, MakerNotes, XMP
   * @example "Unknown (512)"
   */
  YCbCrPositioning?: string;
  /**
   * @frequency 🔥 ★★★★ (130%)
   * @groups APP, EXIF, JFIF, MakerNotes, Photoshop, QuickTime, XMP
   * @example 99
   */
  YResolution?: number;
}

export const XMPTagsNames = strEnum(
  "About",
  "AbsoluteAltitude",
  "Album",
  "AlreadyApplied",
  "AltitudeType",
  "ApertureValue",
  "ApproximateFocusDistance",
  "AsrClimaxDuration",
  "AsrClimaxScene",
  "AsrIsMacroRange",
  "AsrSceneCondition",
  "AsrSceneMode",
  "AutoLateralCA",
  "AuxiliaryImageType",
  "BandName",
  "BitsPerSample",
  "BlueHue",
  "BlueSaturation",
  "Brightness",
  "BrightnessValue",
  "BurstID",
  "BurstPrimary",
  "CameraBurstID",
  "CameraFacing",
  "CameraProfile",
  "CameraProfileDigest",
  "CameraSerialNumber",
  "CameraUnit",
  "CamReverse",
  "CaptureMode",
  "CaptureSoftware",
  "CatalogSets",
  "Categories",
  "CellGlobalID",
  "CellR",
  "CellTowerID",
  "CentralTemperature",
  "CentralWavelength",
  "Changes",
  "ChromaticAberrationB",
  "ChromaticAberrationR",
  "CircularGradientBasedCorrections",
  "City",
  "ColorClass",
  "ColorLabel",
  "Colorlabels",
  "ColorMode",
  "ColorNoiseReduction",
  "ColorNoiseReductionDetail",
  "ColorNoiseReductionSmoothness",
  "ColorSpace",
  "ColorTemperature",
  "Comment",
  "CompressedBitsPerPixel",
  "Compression",
  "Container",
  "ContainerDirectory",
  "Contrast",
  "Country",
  "CountryCode",
  "CreateDate",
  "CreationTime",
  "Creator",
  "CreatorAppID",
  "CreatorContactInfo",
  "CreatorOpenWithUIOptions",
  "Creatortool",
  "CreatorTool",
  "CropAngle",
  "CropBottom",
  "CropConstrainToWarp",
  "CropHeight",
  "CropLeft",
  "CroppedAreaImageHeightPixels",
  "CroppedAreaImageWidthPixels",
  "CroppedAreaLeftPixels",
  "CroppedAreaTopPixels",
  "CropRight",
  "CropTop",
  "CropWidth",
  "CustomRendered",
  "DateAcquired",
  "DateCreated",
  "DateTime",
  "DateTimeDigitized",
  "DateTimeOriginal",
  "DateUTC",
  "DefringeGreenAmount",
  "DefringeGreenHueHi",
  "DefringeGreenHueLo",
  "DefringePurpleAmount",
  "DefringePurpleHueHi",
  "DefringePurpleHueLo",
  "Dehaze",
  "DerivedFrom",
  "Description",
  "DigitalZoomRatio",
  "DisableAutoCreation",
  "DocumentID",
  "DroneModel",
  "DroneSerialNumber",
  "Duration",
  "ExifImageHeight",
  "ExifImageWidth",
  "ExifVersion",
  "Exposure",
  "ExposureCompensation",
  "ExposureProgram",
  "ExposureTime",
  "Face",
  "FaceNum",
  "FaceSelectedIndex",
  "Far",
  "FileSource",
  "Filters",
  "Firmware",
  "FlashCompensation",
  "FlashManufacturer",
  "FlashModel",
  "FlashPixVersion",
  "FlightPitchDegree",
  "FlightRollDegree",
  "FlightXSpeed",
  "FlightYawDegree",
  "FlightYSpeed",
  "FlightZSpeed",
  "FNumber",
  "FocalLength",
  "FocalLengthIn35mmFormat",
  "FocalPlaneResolutionUnit",
  "FocalPlaneXResolution",
  "FocalPlaneYResolution",
  "FocusAreaHeight",
  "FocusAreaNum",
  "FocusAreaWidth",
  "FocusDistance",
  "FocusIsLensMoving",
  "FocusPosX",
  "FocusPosY",
  "FocusState",
  "Format",
  "FullPanoHeightPixels",
  "FullPanoWidthPixels",
  "GainControl",
  "GimbalPitchDegree",
  "GimbalReverse",
  "GimbalRollDegree",
  "GimbalYawDegree",
  "GPSAltitude",
  "GPSAltitudeRef",
  "GPSDateStamp",
  "GPSDateTime",
  "GPSImgDirection",
  "GPSImgDirectionRef",
  "GPSLatitude",
  "GPSLongitude",
  "GPSLongitudeRef",
  "GPSMapDatum",
  "GPSProcessingMethod",
  "GpsStatus",
  "GPSVersionID",
  "GrainAmount",
  "GreenHue",
  "GreenSaturation",
  "HasCrop",
  "HasExtendedXMP",
  "HasSettings",
  "HDRPlusMakerNote",
  "HierarchicalSubject",
  "History",
  "HueAdjustmentAqua",
  "HueAdjustmentBlue",
  "HueAdjustmentGreen",
  "HueAdjustmentMagenta",
  "HueAdjustmentOrange",
  "HueAdjustmentPurple",
  "HueAdjustmentRed",
  "HueAdjustmentYellow",
  "ICCProfileName",
  "ImageHeight",
  "ImageLength",
  "ImageNumber",
  "ImageSource",
  "ImageWidth",
  "InitialViewHeadingDegrees",
  "InitialViewPitchDegrees",
  "InitialViewRollDegrees",
  "InstanceID",
  "InteroperabilityIndex",
  "InteroperabilityVersion",
  "IsBokehActive",
  "IsHDRActive",
  "IsNightModeActive",
  "ISO",
  "ISOSpeed",
  "LastKeywordXMP",
  "LateralChromaticAberrationCorrectionAlreadyApplied",
  "Lens",
  "LensFacing",
  "LensID",
  "LensInfo",
  "LensMake",
  "LensManualDistortionAmount",
  "LensManufacturer",
  "LensModel",
  "LensProfileDigest",
  "LensProfileDistortionScale",
  "LensProfileEnable",
  "LensProfileSetup",
  "LensProfileVignettingScale",
  "LensSerialNumber",
  "LightSource",
  "LocationAreaCode",
  "LuminanceAdjustmentAqua",
  "LuminanceAdjustmentBlue",
  "LuminanceAdjustmentGreen",
  "LuminanceAdjustmentMagenta",
  "LuminanceAdjustmentOrange",
  "LuminanceAdjustmentPurple",
  "LuminanceAdjustmentRed",
  "LuminanceAdjustmentYellow",
  "LuminanceNoiseReductionContrast",
  "LuminanceNoiseReductionDetail",
  "LuminanceSmoothing",
  "Make",
  "MakerNote",
  "Marked",
  "Mask",
  "MaxApertureValue",
  "MetadataDate",
  "MeteringMode",
  "MicroVideo",
  "MicroVideoOffset",
  "MicroVideoPresentationTimestampUs",
  "MicroVideoVersion",
  "Mime",
  "MinorVersion",
  "MobileCountryCode",
  "MobileNetworkCode",
  "Model",
  "ModificationDate",
  "ModifyDate",
  "MotionPhoto",
  "MotionPhotoPresentationTimestampUs",
  "MotionPhotoVersion",
  "NativeDigest",
  "Near",
  "Notes",
  "ObjectAreaHeight",
  "ObjectAreaWidth",
  "ObjectNum",
  "ObjectPosX",
  "ObjectPosY",
  "Orientation",
  "OriginalCreateDateTime",
  "OriginalDocumentID",
  "Padding",
  "ParametricDarks",
  "ParametricHighlights",
  "ParametricHighlightSplit",
  "ParametricLights",
  "ParametricMidtoneSplit",
  "ParametricShadows",
  "ParametricShadowSplit",
  "PersonInImage",
  "PerspectiveAspect",
  "PerspectiveHorizontal",
  "PerspectiveRotate",
  "PerspectiveScale",
  "PerspectiveUpright",
  "PerspectiveVertical",
  "PerspectiveX",
  "PerspectiveY",
  "PhotographicSensitivity",
  "PhotometricInterpretation",
  "PickLabel",
  "Pitch",
  "PMVersion",
  "PortraitVersion",
  "PoseHeadingDegrees",
  "PosePitchDegrees",
  "PoseRollDegrees",
  "PostCropVignetteAmount",
  "Prefs",
  "PreservedFileName",
  "ProcessVersion",
  "ProgramMode",
  "ProjectionType",
  "Rating",
  "RawFileName",
  "RecommendedExposureIndex",
  "RedHue",
  "RedSaturation",
  "RegionInfo",
  "RegionInfoMP",
  "RegistryID",
  "RelativeAltitude",
  "ResolutionUnit",
  "Rights",
  "Roll",
  "SamplesPerPixel",
  "Saturation",
  "SaturationAdjustmentAqua",
  "SaturationAdjustmentBlue",
  "SaturationAdjustmentGreen",
  "SaturationAdjustmentMagenta",
  "SaturationAdjustmentOrange",
  "SaturationAdjustmentPurple",
  "SaturationAdjustmentRed",
  "SaturationAdjustmentYellow",
  "Scene",
  "SceneCaptureType",
  "SceneDetectResultConfidences",
  "SceneDetectResultIds",
  "SceneType",
  "SelfData",
  "SemanticSegmentationMatteVersion",
  "SensingMethod",
  "SensitivityType",
  "SerialNumber",
  "Shadows",
  "ShadowTint",
  "SharpenDetail",
  "SharpenEdgeMasking",
  "SharpenRadius",
  "ShootingMode",
  "ShutterSpeedValue",
  "ShutterType",
  "Software",
  "Source",
  "SourcePhotosCount",
  "SpecialTypeID",
  "SplitToningBalance",
  "SplitToningHighlightHue",
  "SplitToningHighlightSaturation",
  "SplitToningShadowHue",
  "SplitToningShadowSaturation",
  "State",
  "StitchingSoftware",
  "StreamType",
  "Subject",
  "SubjectDistance",
  "SubjectDistanceRange",
  "SubsecTime",
  "SubSecTimeDigitized",
  "SubSecTimeOriginal",
  "SurveyingMode",
  "Tagged",
  "TagsList",
  "Texture",
  "Tint",
  "Title",
  "TlinearGain",
  "ToneCurve",
  "ToneCurveName",
  "ToneCurvePV2012Blue",
  "ToneCurvePV2012Green",
  "ToneCurvePV2012Red",
  "Urgency",
  "UsePanoramaViewer",
  "UserComment",
  "UTCAtExposure",
  "Versions",
  "Vibrance",
  "VignetteAmount",
  "WavelengthFWHM",
  "WhiteBalance",
  "XMPMeta",
  "XMPToolkit",
  "XResolution",
  "Yaw",
  "YCbCrPositioning",
  "YResolution",
) satisfies StrEnum<keyof XMPTags>;

export type XMPTag = StrEnumKeys<typeof XMPTagsNames>;

/**
 * This is a partial list of fields returned by {@link ExifTool.read}.
 *
 * This interface is **not** comprehensive: we only include the most popular
 * ~2 thousand fields so as to avoid TypeScript error TS2590: (Expression
 * produces a union type that is too complex to represent).
 *
 * If this interface is missing a field you need, you should handle that
 * typecasting safely in your own code.
 *
 * JSDoc annotations for each tag include:
 * - @frequency: device type emoji (🔥 = mainstream consumer devices, 🧊 = specialized/professional), star rating (★★★★ is found in >50% of samples, ☆☆☆☆ is rare), and exact percentage in parentheses
 * - @groups: comma-separated list of metadata groups where this tag appears (e.g., "EXIF, MakerNotes")
 * - @example: representative value for the tag
 *
 * Autogenerated by "npm run mktags" by ExifTool 13.38 on Tue Sep 30 2025.
 * 2901 unique tags were found in 10459 photo and video files.
 *
 * @see https://exiftool.org/TagNames/
 */
export interface Tags
  extends APPTags,
    CompositeTags,
    DuckyTags,
    EXIFTags,
    ExifToolTags,
    ExifToolVendoredTags,
    FileTags,
    FlashPixTags,
    GeolocationTags,
    ICCProfileTags,
    IPTCApplicationRecordTags,
    IPTCTags,
    ImageDataHashTag,
    JFIFTags,
    JSONTags,
    MPFTags,
    MWGCollectionsTags,
    MWGKeywordTags,
    MakerNotesTags,
    MetaTags,
    PanasonicRawTags,
    PhotoshopTags,
    PrintIMTags,
    QuickTimeTags,
    RAFTags,
    RIFFTags,
    XMPTags {}

/**
 * All tag names combined from all interfaces
 */
export const TagNames = strEnum(
  ...ExifToolTagsNames.values,
  ...FileTagsNames.values,
  ...CompositeTagsNames.values,
  ...APPTagsNames.values,
  ...DuckyTagsNames.values,
  ...FlashPixTagsNames.values,
  ...JSONTagsNames.values,
  ...EXIFTagsNames.values,
  ...MPFTagsNames.values,
  ...MetaTagsNames.values,
  ...PanasonicRawTagsNames.values,
  ...PhotoshopTagsNames.values,
  ...PrintIMTagsNames.values,
  ...QuickTimeTagsNames.values,
  ...RAFTagsNames.values,
  ...RIFFTagsNames.values,
  ...IPTCTagsNames.values,
  ...JFIFTagsNames.values,
  ...MakerNotesTagsNames.values,
  ...XMPTagsNames.values,
  ...ExifToolVendoredTagNames.values,
  ...GeolocationTagNames.values,
  ...ImageDataHashTagNames.values,
  ...ICCProfileTagNames.values,
  ...IPTCApplicationRecordTagNames.values,
  ...MWGCollectionsTagNames.values,
  ...MWGKeywordTagNames.values,
) satisfies StrEnum<keyof Tags>;

export type TagName = StrEnumKeys<typeof TagNames>;
