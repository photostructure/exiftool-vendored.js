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
  /** ☆☆☆☆ ✔ Example: "File is empty" */
  Error?: string;
  /** ★★★★ ✔ Example: 13.26 */
  ExifToolVersion?: number;
  /** ☆☆☆☆   Example: "path/to/file.jpg" */
  SourceFile?: string;
  /** ☆☆☆☆ ✔ Example: "Unrecognized IPTC record 0 (ignored)" */
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
  /** ★★★★ ✔ Example: 8 */
  BitsPerSample?: number;
  /** ☆☆☆☆ ✔ Example: "Windows V3" */
  BMPVersion?: string;
  /** ★★★★ ✔ Example: 3 */
  ColorComponents?: number;
  /** ☆☆☆☆ ✔ Example: "ff5978eb5c164fa308177d41e817e08f" */
  CurrentIPTCDigest?: string;
  /** ★★★★ ✔ Example: "/home/username/pictures" */
  Directory?: string;
  /** ★★★★ ✔ Example: "Progressive DCT, Huffman coding" */
  EncodingProcess?: string;
  /** ★★★★ ✔ Example: "Little-endian (Intel, II)" */
  ExifByteOrder?: string;
  /** ★★★★ ✔ Example: "2025:05:16 19:28:36Z" */
  FileAccessDate?: ExifDateTime | string;
  /** ☆☆☆☆   Example:  */
  FileCreateDate?: ExifDateTime | string;
  /** ★★★★ ✔ Example: "2025:05:07 18:18:39Z" */
  FileInodeChangeDate?: ExifDateTime | string;
  /** ★★★★ ✔ Example: "2025:05:07 18:18:39Z" */
  FileModifyDate?: ExifDateTime | string;
  /** ★★★★ ✔ Example: "utc+8_oly.jpg" */
  FileName?: string;
  /** ★★★★ ✔ Example: "-rwxrwxr-x" */
  FilePermissions?: string;
  /** ★★★★ ✔ Example: "990 bytes" */
  FileSize?: string;
  /** ★★★★ ✔ Example: "RW2" */
  FileType?: string;
  /** ★★★★ ✔ Example: "rw2" */
  FileTypeExtension?: string;
  /** ☆☆☆☆   Example:  */
  ImageDataMD5?: string;
  /** ★★★★ ✔ Example: 960 */
  ImageHeight?: number;
  /** ★★★★ ✔ Example: 96 */
  ImageWidth?: number;
  /** ★★★★ ✔ Example: "video/x-msvideo" */
  MIMEType?: string;
  /** ☆☆☆☆ ✔ Example: "Use BitDepth" */
  NumColors?: string;
  /** ☆☆☆☆ ✔ Example: "All" */
  NumImportantColors?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PixelsPerMeterX?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PixelsPerMeterY?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  Planes?: number;
  /** ★★★★ ✔ Example: "YCbCr4:4:4 (1 1)" */
  YCbCrSubSampling?: string;
}

export const FileTagsNames = strEnum(
  "BitsPerSample",
  "BMPVersion",
  "ColorComponents",
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
  "ImageWidth",
  "MIMEType",
  "NumColors",
  "NumImportantColors",
  "PixelsPerMeterX",
  "PixelsPerMeterY",
  "Planes",
  "YCbCrSubSampling",
) satisfies StrEnum<keyof FileTags>;

export type FileTag = StrEnumKeys<typeof FileTagsNames>;

/**
 * These are tags are derived from the values of one or more other tags.
 * Only a few are writable directly.
 * @see https://exiftool.org/TagNames/Composite.html
 */
export interface CompositeTags {
  /** ☆☆☆☆ ✔ Example: "Unknown (49 5)" */
  AdvancedSceneMode?: string;
  /** ★★★★ ✔ Example: 90 */
  Aperture?: number;
  /** ★☆☆☆ ✔ Example: "On" */
  AutoFocus?: string;
  /** ☆☆☆☆ ✔ Example: "8.7 Mbps" */
  AvgBitrate?: string;
  /** ★★☆☆ ✔ Example: 46 */
  BlueBalance?: number;
  /** ☆☆☆☆ ✔ Example: "[Red,Green][Green,Blue]" */
  CFAPattern?: string;
  /** ★★★★ ✔ Example: "1.030 mm" */
  CircleOfConfusion?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ConditionalFEC?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  ContrastDetectAF?: string;
  /** ☆☆☆☆ ✔ Example: "2021:03:16 18:14:25" */
  DigitalCreationDateTime?: ExifDateTime | string;
  /** ★★☆☆ ✔ Example: "inf (9.66 m - inf)" */
  DOF?: string;
  /** ★★☆☆ ✔ Example: "Unknown (3152)" */
  DriveMode?: string;
  /** ☆☆☆☆ ✔ Example: "Not attached" */
  ExtenderStatus?: string;
  /** ☆☆☆☆ ✔ Example: "Optional,TTL" */
  FlashType?: string;
  /** ★★★★ ✔ Example: "99.7 mm (35 mm equivalent: 554.0 mm)" */
  FocalLength35efl?: string;
  /** ★★★★ ✔ Example: "97.7 deg" */
  FOV?: string;
  /** ☆☆☆☆ ✔ Example: "2024:04:21 04:09:51Z" */
  GPSDateTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "7.196465 134.376806666667" */
  GPSPosition?: string;
  /** ★★★★ ✔ Example: "Inf m" */
  HyperfocalDistance?: string;
  /** ★★★★ ✔ Example: "8x8" */
  ImageSize?: string;
  /** ★★☆☆ ✔ Example: "smc PENTAX-D FA 50mm F2.8 Macro" */
  Lens?: string;
  /** ★★☆☆ ✔ Example: "9.2 - 92.0 mm (35 mm equivalent: 24.9 - 248.8 mm)" */
  Lens35efl?: string;
  /** ★★☆☆ ✔ Example: "smc PENTAX-FA 28-105mm F3.2-4.5 AL[IF]" */
  LensID?: string;
  /** ★★★★ ✔ Example: 9.9 */
  LightValue?: number;
  /** ★★★★ ✔ Example: 9.5 */
  Megapixels?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 512 bytes, use -b option to extract)" */
  OriginalDecisionData?: BinaryField | string;
  /** ☆☆☆☆   Example: "9.9 um" */
  PeakSpectralSensitivity?: string;
  /** ☆☆☆☆ ✔ Example: "On (73-point)" */
  PhaseDetectAF?: string;
  /** ★★★☆ ✔ Example: "(Binary data 37244 bytes, use -b option to extract)" */
  PreviewImage?: BinaryField;
  /** ★★☆☆ ✔ Example: 38.625 */
  RedBalance?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  RedEyeReduction?: string;
  /** ☆☆☆☆   Example: 11.2 */
  RicohPitch?: number;
  /** ☆☆☆☆   Example: 1.59 */
  RicohRoll?: number;
  /** ★☆☆☆ ✔ Example: "Unknown (0)" */
  Rotation?: number;
  /** ☆☆☆☆ ✔ Example: "9:30:01" */
  RunTimeSincePowerUp?: string;
  /** ★★★★ ✔ Example: 9.9 */
  ScaleFactor35efl?: number;
  /** ★★☆☆ ✔ Example: "Unknown (83)" */
  ShootingMode?: string;
  /** ☆☆☆☆ ✔ Example: "1st-curtain sync" */
  ShutterCurtainHack?: string;
  /** ★★★★ ✔ Example: "inf" */
  ShutterSpeed?: string;
  /** ★☆☆☆ ✔ Example: "2025:04:28 16:06:17.88+01:00" */
  SubSecCreateDate?: ExifDateTime | string;
  /** ★☆☆☆ ✔ Example: "2025:04:28 16:06:17.88+01:00" */
  SubSecDateTimeOriginal?: ExifDateTime | string;
  /** ☆☆☆☆   Example:  */
  SubSecMediaCreateDate?: ExifDateTime | string;
  /** ★☆☆☆ ✔ Example: "2025:04:28 16:06:17.88+01:00" */
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
  "DigitalCreationDateTime",
  "DOF",
  "DriveMode",
  "ExtenderStatus",
  "FlashType",
  "FocalLength35efl",
  "FOV",
  "GPSDateTime",
  "GPSPosition",
  "HyperfocalDistance",
  "ImageSize",
  "Lens",
  "Lens35efl",
  "LensID",
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
  "RunTimeSincePowerUp",
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
  /** ☆☆☆☆   Example: "59 128 128" */
  AboveColor?: string;
  /** ☆☆☆☆   Example: 388 */
  Again?: number;
  /** ☆☆☆☆   Example: "5.0 C" */
  AtmosphericTemperature?: string;
  /** ☆☆☆☆ ✔ Example: 800 */
  AutoISOMax?: number;
  /** ☆☆☆☆ ✔ Example: 3200 */
  AutoISOMin?: number;
  /** ☆☆☆☆ ✔ Example: "Up" */
  AutoRotation?: string;
  /** ☆☆☆☆   Example: 3383 */
  B5100?: number;
  /** ☆☆☆☆   Example: "60 128 128" */
  BelowColor?: string;
  /** ☆☆☆☆   Example: 2438 */
  Bgain?: number;
  /** ☆☆☆☆   Example: 255 */
  BHighLight?: number;
  /** ☆☆☆☆   Example: 216 */
  BHL?: number;
  /** ☆☆☆☆   Example: 33 */
  Blk0?: number;
  /** ☆☆☆☆   Example: 32 */
  Blk1?: number;
  /** ☆☆☆☆   Example: 86 */
  BMean?: number;
  /** ☆☆☆☆   Example: 6 */
  Boff?: number;
  /** ☆☆☆☆   Example: 1 */
  BSd?: number;
  /** ☆☆☆☆   Example: 3 */
  BSD?: number;
  /** ☆☆☆☆   Example: 1908 */
  BStrobe?: number;
  /** ☆☆☆☆   Example: "Z-CAMERA" */
  CameraModel?: string;
  /** ☆☆☆☆   Example: "_______________" */
  CameraPartNumber?: string;
  /** ☆☆☆☆ ✔ Example: 8340330 */
  CameraSerialNumber?: number;
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  CameraSoftware?: string;
  /** ☆☆☆☆   Example: 2 */
  Case?: number;
  /** ☆☆☆☆   Example: 2 */
  CBal?: number;
  /** ☆☆☆☆   Example: 1 */
  Color?: number;
  /** ☆☆☆☆ ✔ Example: 42926626 */
  COLOR1?: number;
  /** ☆☆☆☆ ✔ Example: 32321478 */
  COLOR2?: number;
  /** ☆☆☆☆ ✔ Example: 22701368 */
  COLOR3?: number;
  /** ☆☆☆☆ ✔ Example: 5 */
  COLOR4?: number;
  /** ☆☆☆☆ ✔ Example: "YCbCr" */
  ColorTransform?: string;
  /** ☆☆☆☆   Example: 45 */
  Compass?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ContTake?: number;
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  CreatorSoftware?: string;
  /** ☆☆☆☆   Example: "2013:03:12 16:31:26" */
  DateTimeGenerated?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 100 */
  DCTEncodeVersion?: number;
  /** ☆☆☆☆ ✔ Example: "Photo Global Settings" */
  DeviceName?: string;
  /** ☆☆☆☆ ✔ Example: 148.34216 */
  DiagonalFieldOfView?: number;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DigitalZoomOn?: string;
  /** ☆☆☆☆   Example: "(Binary data 1011393 bytes, use -b option to extract)" */
  EmbeddedImage?: BinaryField | string;
  /** ☆☆☆☆   Example: 960 */
  EmbeddedImageHeight?: number;
  /** ☆☆☆☆   Example: "PNG" */
  EmbeddedImageType?: string;
  /** ☆☆☆☆   Example: 640 */
  EmbeddedImageWidth?: number;
  /** ☆☆☆☆   Example: 1 */
  Emissivity?: number;
  /** ☆☆☆☆ ✔ Example: 8501 */
  EXP1?: number;
  /** ☆☆☆☆ ✔ Example: 59 */
  EXP2?: number;
  /** ☆☆☆☆ ✔ Example: 237 */
  EXP3?: number;
  /** ☆☆☆☆   Example: 0.97 */
  ExposRatio?: number;
  /** ☆☆☆☆   Example: 3687 */
  Exposure?: number;
  /** ☆☆☆☆ ✔ Example: "AUTO" */
  ExposureType?: string;
  /** ☆☆☆☆   Example: "46.1 deg" */
  FieldOfView?: string;
  /** ☆☆☆☆   Example: "NOF" */
  FilterModel?: string;
  /** ☆☆☆☆   Example: "" */
  FilterPartNumber?: string;
  /** ☆☆☆☆   Example: "00000000" */
  FilterSerialNumber?: string;
  /** ☆☆☆☆   Example: 1 */
  FinalRatio?: number;
  /** ☆☆☆☆   Example: 640 */
  FlashTime?: number;
  /** ☆☆☆☆   Example: 192 */
  FMean?: number;
  /** ☆☆☆☆ ✔ Example: "F2.8" */
  Fnumber?: string;
  /** ☆☆☆☆ ✔ Example: "inf" */
  FocusDistance?: string;
  /** ☆☆☆☆   Example: 136 */
  FocusPos?: number;
  /** ☆☆☆☆ ✔ Example: 98 */
  FocusStepCount?: number;
  /** ☆☆☆☆ ✔ Example: 9 */
  FrameRate?: number;
  /** ☆☆☆☆   Example: 85 */
  Gain?: number;
  /** ☆☆☆☆   Example: 2152 */
  GBgain?: number;
  /** ☆☆☆☆   Example: 8 */
  GBoff?: number;
  /** ☆☆☆☆   Example: 255 */
  GHighLight?: number;
  /** ☆☆☆☆   Example: 255 */
  GHL?: number;
  /** ☆☆☆☆   Example: 52 */
  GMean?: number;
  /** ☆☆☆☆ ✔ Example: 88.01 */
  GPSTrack?: number;
  /** ☆☆☆☆ ✔ Example: "True North" */
  GPSTrackRef?: string;
  /** ☆☆☆☆   Example: true */
  GPSValid?: boolean;
  /** ☆☆☆☆   Example: 2152 */
  GRgain?: number;
  /** ☆☆☆☆   Example: 8 */
  GRoff?: number;
  /** ☆☆☆☆   Example: 1 */
  GSd?: number;
  /** ☆☆☆☆   Example: 4 */
  GSD?: number;
  /** ☆☆☆☆ ✔ Example: "PDR-M60" */
  ID?: string;
  /** ☆☆☆☆   Example: "7.4 C" */
  IRWindowTemperature?: string;
  /** ☆☆☆☆   Example: 1 */
  IRWindowTransmission?: number;
  /** ☆☆☆☆   Example: "99 128 128" */
  Isotherm1Color?: string;
  /** ☆☆☆☆   Example: "92 115 209" */
  Isotherm2Color?: string;
  /** ☆☆☆☆ ✔ Example: 696880 */
  JPEG1?: number;
  /** ☆☆☆☆   Example: "T199104" */
  LensPartNumber?: string;
  /** ☆☆☆☆ ✔ Example: "GPRO" */
  LensProjection?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  LightS?: number;
  /** ☆☆☆☆   Example: " 10.6" */
  Mean?: string;
  /** ☆☆☆☆   Example: 1 */
  Meas1Label?: number;
  /** ☆☆☆☆   Example: "80 60" */
  Meas1Params?: string;
  /** ☆☆☆☆   Example: "Spot" */
  Meas1Type?: string;
  /** ☆☆☆☆   Example: "Sp1" */
  Meas2Label?: string;
  /** ☆☆☆☆   Example: "213 160 213 160" */
  Meas2Params?: string;
  /** ☆☆☆☆   Example: "Spot" */
  Meas2Type?: string;
  /** ☆☆☆☆ ✔ Example: "859830e2f50cb3397a6216f09553fce800000000000000000000000000000000" */
  MediaUniqueID?: string;
  /** ☆☆☆☆ ✔ Example: "7.6.4" */
  MetadataVersion?: string;
  /** ☆☆☆☆   Example: 26 */
  MotorPos?: number;
  /** ☆☆☆☆   Example: 4 */
  Offset?: number;
  /** ☆☆☆☆   Example: "+98" */
  OffsetX?: string;
  /** ☆☆☆☆   Example: "+51" */
  OffsetY?: string;
  /** ☆☆☆☆   Example: "67 216 98" */
  OverflowColor?: string;
  /** ☆☆☆☆   Example: "(Binary data 672 bytes, use -b option to extract)" */
  Palette?: BinaryField | string;
  /** ☆☆☆☆   Example: 224 */
  PaletteColors?: number;
  /** ☆☆☆☆   Example: "iron.pal" */
  PaletteFileName?: string;
  /** ☆☆☆☆   Example: 0 */
  PaletteMethod?: number;
  /** ☆☆☆☆   Example: "iron" */
  PaletteName?: string;
  /** ☆☆☆☆   Example: 3 */
  PaletteStretch?: number;
  /** ☆☆☆☆   Example: ".basicImgData.objectParams.emissivity" */
  Param0?: string;
  /** ☆☆☆☆ ✔ Example: "12MP_W" */
  PhotoResolution?: string;
  /** ☆☆☆☆ ✔ Example: 87648 */
  PicLen?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  Protect?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  Protune?: string;
  /** ☆☆☆☆   Example: 6929 */
  R5100?: number;
  /** ☆☆☆☆ ✔ Example: "4_1SEC" */
  Rate?: string;
  /** ☆☆☆☆   Example: "(Binary data 614604 bytes, use -b option to extract)" */
  RawThermalImage?: BinaryField | string;
  /** ☆☆☆☆   Example: 90 */
  RawThermalImageHeight?: number;
  /** ☆☆☆☆   Example: "TIFF" */
  RawThermalImageType?: string;
  /** ☆☆☆☆   Example: 80 */
  RawThermalImageWidth?: number;
  /** ☆☆☆☆   Example: 9392 */
  RawValueMedian?: number;
  /** ☆☆☆☆   Example: 993 */
  RawValueRange?: number;
  /** ☆☆☆☆   Example: 65535 */
  RawValueRangeMax?: number;
  /** ☆☆☆☆   Example: 8628 */
  RawValueRangeMin?: number;
  /** ☆☆☆☆   Example: 2.2125397 */
  Real2IR?: number;
  /** ☆☆☆☆   Example: "26.7 C" */
  ReflectedApparentTemperature?: string;
  /** ☆☆☆☆   Example: "80.0 %" */
  RelativeHumidity?: string;
  /** ☆☆☆☆ ✔ Example: 6 */
  Resolution?: number;
  /** ☆☆☆☆ ✔ Example: "DCPT" */
  REV?: string;
  /** ☆☆☆☆   Example: 1887 */
  Rgain?: number;
  /** ☆☆☆☆   Example: 255 */
  RHighLight?: number;
  /** ☆☆☆☆   Example: 247 */
  RHL?: number;
  /** ☆☆☆☆   Example: 32 */
  RMean?: number;
  /** ☆☆☆☆   Example: 9 */
  Roff?: number;
  /** ☆☆☆☆   Example: 1 */
  RSd?: number;
  /** ☆☆☆☆   Example: 4 */
  RSD?: number;
  /** ☆☆☆☆   Example: 5896 */
  RStrobe?: number;
  /** ☆☆☆☆ ✔ Example: "8259,0,14bfe,a184,11987,1e4f1,0,7c0000,40b60000,56a05e6,6…0038,d7" */
  S0?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  SpotMeter?: string;
  /** ☆☆☆☆   Example: 0 */
  StrobeTime?: number;
  /** ☆☆☆☆ ✔ Example: "bd1,1,5,2beec,b5,ec15" */
  T0?: string;
  /** ☆☆☆☆ ✔ Example: 357 */
  TagB?: number;
  /** ☆☆☆☆ ✔ Example: 92 */
  TagQ?: number;
  /** ☆☆☆☆ ✔ Example: 243 */
  TagR?: number;
  /** ☆☆☆☆ ✔ Example: "v" */
  TagS?: string;
  /** ☆☆☆☆ ✔ Example: 4016 */
  ThmLen?: number;
  /** ☆☆☆☆   Example: "41 110 240" */
  UnderflowColor?: string;
  /** ★☆☆☆ ✔ Example: "vf0-3c" */
  Version?: string;
  /** ☆☆☆☆   Example: 4054 */
  YLevel?: number;
  /** ☆☆☆☆   Example: 2209 */
  YTarget?: number;
  /** ☆☆☆☆ ✔ Example:  */
  Zoom?: string;
  /** ☆☆☆☆   Example: 9 */
  ZoomPos?: number;
}

export const APPTagsNames = strEnum(
  "AboveColor",
  "Again",
  "AtmosphericTemperature",
  "AutoISOMax",
  "AutoISOMin",
  "AutoRotation",
  "B5100",
  "BelowColor",
  "Bgain",
  "BHighLight",
  "BHL",
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
  "Case",
  "CBal",
  "Color",
  "COLOR1",
  "COLOR2",
  "COLOR3",
  "COLOR4",
  "ColorTransform",
  "Compass",
  "ContTake",
  "CreatorSoftware",
  "DateTimeGenerated",
  "DCTEncodeVersion",
  "DeviceName",
  "DiagonalFieldOfView",
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
  "ExposureType",
  "FieldOfView",
  "FilterModel",
  "FilterPartNumber",
  "FilterSerialNumber",
  "FinalRatio",
  "FlashTime",
  "FMean",
  "Fnumber",
  "FocusDistance",
  "FocusPos",
  "FocusStepCount",
  "FrameRate",
  "Gain",
  "GBgain",
  "GBoff",
  "GHighLight",
  "GHL",
  "GMean",
  "GPSTrack",
  "GPSTrackRef",
  "GPSValid",
  "GRgain",
  "GRoff",
  "GSd",
  "GSD",
  "ID",
  "IRWindowTemperature",
  "IRWindowTransmission",
  "Isotherm1Color",
  "Isotherm2Color",
  "JPEG1",
  "LensPartNumber",
  "LensProjection",
  "LightS",
  "Mean",
  "Meas1Label",
  "Meas1Params",
  "Meas1Type",
  "Meas2Label",
  "Meas2Params",
  "Meas2Type",
  "MediaUniqueID",
  "MetadataVersion",
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
  "Protect",
  "Protune",
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
  "SpotMeter",
  "StrobeTime",
  "T0",
  "TagB",
  "TagQ",
  "TagR",
  "TagS",
  "ThmLen",
  "UnderflowColor",
  "Version",
  "YLevel",
  "YTarget",
  "Zoom",
  "ZoomPos",
) satisfies StrEnum<keyof APPTags>;

export type APPTag = StrEnumKeys<typeof APPTagsNames>;

/**
 * @see https://exiftool.org/TagNames/FlashPix.html
 */
export interface FlashPixTags {
  /** ☆☆☆☆   Example: "(Binary data 18 bytes, use -b option to extract)" */
  AudioStream?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Unicode UTF-16, little endian" */
  CodePage?: string;
  /** ☆☆☆☆ ✔ Example: "Picoss" */
  CreatingApplication?: string;
  /** ☆☆☆☆ ✔ Example: "30020010-C06F-D011-BD01-00609719A180" */
  ExtensionClassID?: string;
  /** ☆☆☆☆ ✔ Example: "2003:03:29 17:47:50" */
  ExtensionCreateDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "Presized image for LCD display" */
  ExtensionDescription?: string;
  /** ☆☆☆☆ ✔ Example: "2003:03:29 17:47:50" */
  ExtensionModifyDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "Screen nail" */
  ExtensionName?: string;
  /** ☆☆☆☆ ✔ Example: "Invalidated By Modification" */
  ExtensionPersistence?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 46285 bytes, use -b option to extract)" */
  ScreenNail?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 1 */
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
  "ScreenNail",
  "UsedExtensionNumbers",
) satisfies StrEnum<keyof FlashPixTags>;

export type FlashPixTag = StrEnumKeys<typeof FlashPixTagsNames>;

export interface JPEGTags {
  /** ☆☆☆☆ ✔ Example: "(Binary data 1417 bytes, use -b option to extract)" */
  HDRGainCurve?: BinaryField | string;
}

export const JPEGTagsNames = strEnum("HDRGainCurve") satisfies StrEnum<
  keyof JPEGTags
>;

export type JPEGTag = StrEnumKeys<typeof JPEGTagsNames>;

export interface JSONTags {
  /** ☆☆☆☆   Example: 0 */
  AIScene?: number;
  /** ☆☆☆☆   Example: 66048 */
  FilterId?: number;
  /** ☆☆☆☆   Example: "off" */
  Hdr?: string;
  /** ☆☆☆☆   Example: false */
  Mirror?: boolean;
  /** ☆☆☆☆   Example: 36864 */
  OpMode?: number;
  /** ☆☆☆☆   Example: 1 */
  ZoomMultiple?: number;
}

export const JSONTagsNames = strEnum(
  "AIScene",
  "FilterId",
  "Hdr",
  "Mirror",
  "OpMode",
  "ZoomMultiple",
) satisfies StrEnum<keyof JSONTags>;

export type JSONTag = StrEnumKeys<typeof JSONTagsNames>;

/**
 * @see https://exiftool.org/TagNames/EXIF.html
 */
export interface EXIFTags {
  /** ☆☆☆☆ ✔ Example: 988517 */
  Acceleration?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  AntiAliasStrength?: number;
  /** ★★★☆ ✔ Example: 9016997700 */
  ApertureValue?: number;
  /** ★☆☆☆ ✔ Example: "Arturo DeImage" */
  Artist?: string;
  /** ☆☆☆☆ ✔ Example: "0.8326394671 1.012145749 0.3512469266" */
  AsShotNeutral?: string;
  /** ☆☆☆☆ ✔ Example: -0.6566481 */
  BaselineExposure?: number;
  /** ☆☆☆☆ ✔ Example: "94 95 93 93" */
  BlackLevel?: string;
  /** ☆☆☆☆ ✔ Example: 130 */
  BlackLevelBlue?: number;
  /** ☆☆☆☆ ✔ Example: 130 */
  BlackLevelGreen?: number;
  /** ☆☆☆☆ ✔ Example: 130 */
  BlackLevelRed?: number;
  /** ☆☆☆☆ ✔ Example: "1 1" */
  BlackLevelRepeatDim?: string;
  /** ★★★☆ ✔ Example: 9.9919505 */
  BrightnessValue?: number;
  /** ☆☆☆☆   Example: 6.1 */
  CameraElevationAngle?: number;
  /** ☆☆☆☆ ✔ Example: "Red,Green,Blue" */
  CFAPlaneColor?: string;
  /** ☆☆☆☆ ✔ Example: "2 2" */
  CFARepeatPatternDim?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ChromaticAberrationCorrection?: string;
  /** ★★★★ ✔ Example: "sRGB" */
  ColorSpace?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown" */
  CompositeImage?: string;
  /** ★★★★ ✔ Example: 90 */
  CompressedBitsPerPixel?: number;
  /** ★★★★ ✔ Example: "n/a" */
  Contrast?: string;
  /** ★★★☆ ✔ Example: "© Chuckles McSnortypants, Inc." */
  Copyright?: string;
  /** ★★★★ ✔ Example: "2218:09:22 02:32:14" */
  CreateDate?: ExifDateTime | string;
  /** ★★★★ ✔ Example: "Unknown (Custom process)" */
  CustomRendered?: string;
  /** ★★★★ ✔ Example: "2218:09:22 02:32:14" */
  DateTimeOriginal?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "8 8" */
  DefaultCropOrigin?: string;
  /** ☆☆☆☆ ✔ Example: "8272 6200" */
  DefaultCropSize?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 0 bytes, use -b option to extract)" */
  DeviceSettingDescription?: BinaryField | string;
  /** ★★★☆ ✔ Example: 8.1319764 */
  DigitalZoomRatio?: number;
  /** ☆☆☆☆ ✔ Example: "1.3.0.0" */
  DNGBackwardVersion?: string;
  /** ☆☆☆☆ ✔ Example: "1.4.0.0" */
  DNGVersion?: string;
  /** ☆☆☆☆   Example: "" */
  DocumentName?: string;
  /** ★★★★ ✔ Example: 990 */
  ExifImageHeight?: number;
  /** ★★★★ ✔ Example: 999 */
  ExifImageWidth?: number;
  /** ★☆☆☆ ✔ Example: 83 */
  ExposureIndex?: number;
  /** ★★★★ ✔ Example: "Unknown (Auto exposure)" */
  ExposureMode?: string;
  /** ★★★★ ✔ Example: "iAuto+" */
  ExposureProgram?: string;
  /** ★★★★ ✔ Example: "inf" */
  ExposureTime?: string;
  /** ★★★★ ✔ Example: "Unknown (DSC)" */
  FileSource?: string;
  /** ★★★★ ✔ Example: "Unknown (0xffff)" */
  Flash?: string;
  /** ☆☆☆☆ ✔ Example: 54 */
  FlashEnergy?: number;
  /** ★★★★ ✔ Example: 90 */
  FNumber?: number;
  /** ★★★★ ✔ Example: "99.7 mm" */
  FocalLength?: string;
  /** ★★★☆ ✔ Example: "9920 mm" */
  FocalLengthIn35mmFormat?: string;
  /** ★★★☆ ✔ Example: "um" */
  FocalPlaneResolutionUnit?: string;
  /** ★★★☆ ✔ Example: 9941.7476 */
  FocalPlaneXResolution?: number;
  /** ★★★☆ ✔ Example: 9846.1538 */
  FocalPlaneYResolution?: number;
  /** ★★★☆ ✔ Example: "Unknown (8176)" */
  GainControl?: string;
  /** ☆☆☆☆ ✔ Example: 2.4921875 */
  Gamma?: number;
  /** ★☆☆☆ ✔ Example: 99.8 */
  GPSAltitude?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (Sea level reference)" */
  GPSAltitudeRef?: string;
  /** ☆☆☆☆ ✔ Example: "府中市郷土の森博物館" */
  GPSAreaInformation?: string;
  /** ☆☆☆☆ ✔ Example: "2024:04:21" */
  GPSDateStamp?: ExifDate | string;
  /** ☆☆☆☆ ✔ Example: 86.180049 */
  GPSDestBearing?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSDestBearingRef?: string;
  /** ☆☆☆☆ ✔ Example: 0.030120052 */
  GPSDestDistance?: number;
  /** ☆☆☆☆ ✔ Example: "Kilometers" */
  GPSDestDistanceRef?: string;
  /** ☆☆☆☆ ✔ Example: "43 deg 37' 59.61" N" */
  GPSDestLatitude?: string;
  /** ☆☆☆☆ ✔ Example: "North" */
  GPSDestLatitudeRef?: string;
  /** ☆☆☆☆ ✔ Example: "80 deg 23' 16.31" W" */
  GPSDestLongitude?: string;
  /** ☆☆☆☆ ✔ Example: "West" */
  GPSDestLongitudeRef?: string;
  /** ☆☆☆☆ ✔ Example: "No Correction" */
  GPSDifferential?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  GPSDOP?: number;
  /** ☆☆☆☆ ✔ Example: "8.937059922 m" */
  GPSHPositioningError?: string;
  /** ☆☆☆☆ ✔ Example: 94.800416 */
  GPSImgDirection?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSImgDirectionRef?: string;
  /** ★☆☆☆ ✔ Example: 48.857748 */
  GPSLatitude?: number | string;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSLatitudeRef?: string;
  /** ★☆☆☆ ✔ Example: 2.2918888 */
  GPSLongitude?: number | string;
  /** ☆☆☆☆ ✔ Example: "West" */
  GPSLongitudeRef?: string;
  /** ☆☆☆☆ ✔ Example: "WGS84" */
  GPSMapDatum?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSMeasureMode?: string;
  /** ☆☆☆☆ ✔ Example: "gps" */
  GPSProcessingMethod?: string;
  /** ☆☆☆☆ ✔ Example: "??B??" */
  GPSSatellites?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  GPSSpeed?: number;
  /** ☆☆☆☆ ✔ Example: "knots" */
  GPSSpeedRef?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSStatus?: string;
  /** ☆☆☆☆ ✔ Example: "23:59:41.001" */
  GPSTimeStamp?: ExifTime | string;
  /** ★☆☆☆ ✔ Example: "50.51.48.48" */
  GPSVersionID?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierBlue?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierGreen?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierRed?: number;
  /** ☆☆☆☆ ✔ Example: "iPhone 15 Plus" */
  HostComputer?: string;
  /** ★★★☆ ✔ Example: "untitled" */
  ImageDescription?: string;
  /** ☆☆☆☆   Example: 0 */
  ImageTitle?: number;
  /** ★★★★ ✔ Example: "Unknown ([None])" */
  InteropIndex?: string;
  /** ★★★★ ✔ Example: "undef undef undef" */
  InteropVersion?: string;
  /** ★★★★ ✔ Example: 993 */
  ISO?: number;
  /** ☆☆☆☆ ✔ Example: 80 */
  ISOSpeed?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 453632 bytes, use -b option to extract)" */
  JpgFromRaw?: BinaryField;
  /** ☆☆☆☆ ✔ Example: 845574 */
  JpgFromRawLength?: number;
  /** ☆☆☆☆ ✔ Example: 978944 */
  JpgFromRawStart?: number;
  /** ★☆☆☆ ✔ Example: "?mm f/?" */
  LensInfo?: string;
  /** ☆☆☆☆ ✔ Example: "ZEISS" */
  LensMake?: string;
  /** ★★☆☆ ✔ Example: "smc PENTAX-D FA 50mm F2.8 Macro" */
  LensModel?: string;
  /** ★☆☆☆ ✔ Example: "xB?" */
  LensSerialNumber?: string;
  /** ★★★★ ✔ Example: "White Fluorescent" */
  LightSource?: string;
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitBlue?: number;
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitGreen?: number;
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitRed?: number;
  /** ★★★★ ✔ Example: "samsung" */
  Make?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 3072 bytes, use -b option to extract)" */
  MakerNoteSamsung1a?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 66 bytes, use -b option to extract)" */
  MakerNoteUnknownBinary?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "}:-" */
  MakerNoteUnknownText?: string;
  /** ★★★★ ✔ Example: 9.1 */
  MaxApertureValue?: number;
  /** ★★★★ ✔ Example: "Unknown (Center-weighted average)" */
  MeteringMode?: string;
  /** ★★★★ ✔ Example: "x530" */
  Model?: string;
  /** ☆☆☆☆ ✔ Example: "K520C-01044" */
  Model2?: string;
  /** ★★★★ ✔ Example: "2216:02:28 03:49:50" */
  ModifyDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 6 */
  Noise?: number;
  /** ☆☆☆☆ ✔ Example: "0.00627371 0.0011865" */
  NoiseProfile?: string;
  /** ☆☆☆☆ ✔ Example: "5 100 4 4 4 200 8 8 8 400 16 16 16 800 32 32 32 1600 64 64 64" */
  NoiseReductionParams?: string;
  /** ☆☆☆☆ ✔ Example: 58 */
  OffsetSchema?: number;
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTime?: string;
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTimeDigitized?: string;
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTimeOriginal?: string;
  /** ★★★★ ✔ Example: 8 */
  Orientation?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 4798 bytes, use -b option to extract)" */
  OtherImage?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 941265 */
  OtherImageLength?: number;
  /** ☆☆☆☆ ✔ Example: 755 */
  OtherImageStart?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 2060 bytes, use -b option to extract)" */
  Padding?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Reflective" */
  PageName?: string;
  /** ☆☆☆☆ ✔ Example: "0350" */
  PanasonicRawVersion?: string;
  /** ☆☆☆☆   Example: 0 */
  Photographer?: number;
  /** ☆☆☆☆ ✔ Example: "YCbCr" */
  PhotometricInterpretation?: string;
  /** ☆☆☆☆ ✔ Example: "Chunky" */
  PlanarConfiguration?: string;
  /** ☆☆☆☆ ✔ Example: 1022 */
  Pressure?: number;
  /** ☆☆☆☆ ✔ Example: "2015:06:02 09:56:01" */
  PreviewDateTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 4665816 bytes, use -b option to extract)" */
  PreviewTIFF?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "0.64 0.33 0.3 0.6 0.15 0.06" */
  PrimaryChromaticities?: string;
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  ProcessingSoftware?: string;
  /** ☆☆☆☆ ✔ Example: 928768 */
  RawDataOffset?: number;
  /** ☆☆☆☆ ✔ Example: "30353330394431333030303032383242" */
  RawDataUniqueID?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  RawFormat?: number;
  /** ☆☆☆☆ ✔ Example: "3 1440 1440" */
  RawImageSegmentation?: string;
  /** ☆☆☆☆ ✔ Example: 800 */
  RecommendedExposureIndex?: number;
  /** ☆☆☆☆ ✔ Example: "0 255 128 255 128 255" */
  ReferenceBlackWhite?: string;
  /** ☆☆☆☆   Example: "JPEG Exif Ver 2.2" */
  RelatedImageFileFormat?: string;
  /** ★★☆☆ ✔ Example: 960 */
  RelatedImageHeight?: number;
  /** ★★☆☆ ✔ Example: 800 */
  RelatedImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: "xxx.avi" */
  RelatedSoundFile?: string;
  /** ★★★★ ✔ Example: "inches" */
  ResolutionUnit?: string;
  /** ☆☆☆☆ ✔ Example: 96 */
  RowsPerStrip?: number;
  /** ☆☆☆☆ ✔ Example: 3 */
  SamplesPerPixel?: number;
  /** ★★★★ ✔ Example: "n/a" */
  Saturation?: string;
  /** ★★★★ ✔ Example: "Unknown (Standard)" */
  SceneCaptureType?: string;
  /** ★★★★ ✔ Example: "Unknown (Directly photographed)" */
  SceneType?: string;
  /** ★★★☆ ✔ Example: "Unknown (One-chip color area sensor)" */
  SensingMethod?: string;
  /** ★★☆☆ ✔ Example: "Unknown" */
  SensitivityType?: string;
  /** ★★★★ ✔ Example: "n/a" */
  Sharpness?: string;
  /** ★★★☆ ✔ Example: "1/999963365" */
  ShutterSpeedValue?: string;
  /** ★★★★ ✔ Example: "https://PhotoStructure.com/" */
  Software?: string;
  /** ☆☆☆☆ ✔ Example: "Sony Uncompressed 12-bit RAW" */
  SonyRawFileType?: string;
  /** ☆☆☆☆ ✔ Example: "8000 10400 12900 14100" */
  SonyToneCurve?: string;
  /** ☆☆☆☆ ✔ Example: 668058300 */
  SpatialFrequencyResponse?: number;
  /** ☆☆☆☆ ✔ Example: 4 */
  SRawType?: number;
  /** ☆☆☆☆ ✔ Example: 800 */
  StandardOutputSensitivity?: number;
  /** ☆☆☆☆ ✔ Example: 9600 */
  StripByteCounts?: number;
  /** ☆☆☆☆ ✔ Example: 986 */
  StripOffsets?: number;
  /** ☆☆☆☆ ✔ Example: "Reduced-resolution image" */
  SubfileType?: string;
  /** ☆☆☆☆ ✔ Example: "967 967 1425 851" */
  SubjectArea?: string;
  /** ☆☆☆☆ ✔ Example: "99.99 m" */
  SubjectDistance?: string;
  /** ★★★☆ ✔ Example: "Unknown (Macro)" */
  SubjectDistanceRange?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  SubjectLocation?: number;
  /** ★☆☆☆ ✔ Example: 996 */
  SubSecTime?: number;
  /** ★☆☆☆ ✔ Example: 996 */
  SubSecTimeDigitized?: number;
  /** ★☆☆☆ ✔ Example: 999 */
  SubSecTimeOriginal?: number;
  /** ★★★★ ✔ Example: "(Binary data 39781 bytes, use -b option to extract)" */
  ThumbnailImage?: BinaryField;
  /** ★★★★ ✔ Example: 9998 */
  ThumbnailLength?: number;
  /** ★★★★ ✔ Example: 998 */
  ThumbnailOffset?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 57816 bytes, use -b option to extract)" */
  ThumbnailTIFF?: BinaryField;
  /** ☆☆☆☆ ✔ Example: "(Binary data 447 bytes, use -b option to extract)" */
  TileByteCounts?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 512 */
  TileLength?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 507 bytes, use -b option to extract)" */
  TileOffsets?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 512 */
  TileWidth?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  TimeZoneOffset?: number | string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 3636 bytes, use -b option to extract)" */
  TransferFunction?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "motorola XT1254" */
  UniqueCameraModel?: string;
  /** ★★★☆ ✔ Example: "This is a comment." */
  UserComment?: string;
  /** ☆☆☆☆ ✔ Example: 0.1 */
  WaterDepth?: number;
  /** ★★★★ ✔ Example: "White Preset" */
  WhiteBalance?: string;
  /** ☆☆☆☆ ✔ Example: 65535 */
  WhiteLevel?: number;
  /** ☆☆☆☆ ✔ Example: "9696 8192 8192 7136" */
  WhitePoint?: string;
  /** ☆☆☆☆   Example: "Redmi 9T" */
  XiaomiModel?: string;
  /** ☆☆☆☆ ✔ Example: "Norm De Plume" */
  XPAuthor?: string;
  /** ☆☆☆☆ ✔ Example: "This is a comment." */
  XPComment?: string;
  /** ☆☆☆☆ ✔ Example: "v01.40.0002;0.0.1;v1.0.0" */
  XPKeywords?: string;
  /** ☆☆☆☆ ✔ Example: "image thermique, thermal image" */
  XPSubject?: string;
  /** ☆☆☆☆ ✔ Example: "楆慮⁬敤琠牡敤攠⁭汉慨䈠汥Ⅱ" */
  XPTitle?: string;
  /** ★★★★ ✔ Example: 99 */
  XResolution?: number;
  /** ☆☆☆☆ ✔ Example: "0.299 0.587 0.114" */
  YCbCrCoefficients?: string;
  /** ★★★★ ✔ Example: "Unknown (512)" */
  YCbCrPositioning?: string;
  /** ★★★★ ✔ Example: 99 */
  YResolution?: number;
}

export const EXIFTagsNames = strEnum(
  "Acceleration",
  "AntiAliasStrength",
  "ApertureValue",
  "Artist",
  "AsShotNeutral",
  "BaselineExposure",
  "BlackLevel",
  "BlackLevelBlue",
  "BlackLevelGreen",
  "BlackLevelRed",
  "BlackLevelRepeatDim",
  "BrightnessValue",
  "CameraElevationAngle",
  "CFAPlaneColor",
  "CFARepeatPatternDim",
  "ChromaticAberrationCorrection",
  "ColorSpace",
  "CompositeImage",
  "CompressedBitsPerPixel",
  "Contrast",
  "Copyright",
  "CreateDate",
  "CustomRendered",
  "DateTimeOriginal",
  "DefaultCropOrigin",
  "DefaultCropSize",
  "DeviceSettingDescription",
  "DigitalZoomRatio",
  "DNGBackwardVersion",
  "DNGVersion",
  "DocumentName",
  "ExifImageHeight",
  "ExifImageWidth",
  "ExposureIndex",
  "ExposureMode",
  "ExposureProgram",
  "ExposureTime",
  "FileSource",
  "Flash",
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
  "GPSDOP",
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
  "GPSSpeed",
  "GPSSpeedRef",
  "GPSStatus",
  "GPSTimeStamp",
  "GPSVersionID",
  "HighISOMultiplierBlue",
  "HighISOMultiplierGreen",
  "HighISOMultiplierRed",
  "HostComputer",
  "ImageDescription",
  "ImageTitle",
  "InteropIndex",
  "InteropVersion",
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
  "Make",
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
  "NoiseReductionParams",
  "OffsetSchema",
  "OffsetTime",
  "OffsetTimeDigitized",
  "OffsetTimeOriginal",
  "Orientation",
  "OtherImage",
  "OtherImageLength",
  "OtherImageStart",
  "Padding",
  "PageName",
  "PanasonicRawVersion",
  "Photographer",
  "PhotometricInterpretation",
  "PlanarConfiguration",
  "Pressure",
  "PreviewDateTime",
  "PreviewTIFF",
  "PrimaryChromaticities",
  "ProcessingSoftware",
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
  "SensingMethod",
  "SensitivityType",
  "Sharpness",
  "ShutterSpeedValue",
  "Software",
  "SonyRawFileType",
  "SonyToneCurve",
  "SpatialFrequencyResponse",
  "SRawType",
  "StandardOutputSensitivity",
  "StripByteCounts",
  "StripOffsets",
  "SubfileType",
  "SubjectArea",
  "SubjectDistance",
  "SubjectDistanceRange",
  "SubjectLocation",
  "SubSecTime",
  "SubSecTimeDigitized",
  "SubSecTimeOriginal",
  "ThumbnailImage",
  "ThumbnailLength",
  "ThumbnailOffset",
  "ThumbnailTIFF",
  "TileByteCounts",
  "TileLength",
  "TileOffsets",
  "TileWidth",
  "TimeZoneOffset",
  "TransferFunction",
  "UniqueCameraModel",
  "UserComment",
  "WaterDepth",
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
  "YResolution",
) satisfies StrEnum<keyof EXIFTags>;

export type EXIFTag = StrEnumKeys<typeof EXIFTagsNames>;

export interface MPFTags {
  /** ★★☆☆ ✔ Example: 9697 */
  DependentImage1EntryNumber?: number;
  /** ★★☆☆ ✔ Example: 960 */
  DependentImage2EntryNumber?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 66 bytes, use -b option to extract)" */
  ImageUIDList?: BinaryField | string;
  /** ★★☆☆ ✔ Example: "0100" */
  MPFVersion?: string;
  /** ★★☆☆ ✔ Example: "Representative image, Dependent parent image" */
  MPImageFlags?: string;
  /** ★★☆☆ ✔ Example: "Unknown (4)" */
  MPImageFormat?: string;
  /** ★★☆☆ ✔ Example: 999325 */
  MPImageLength?: number;
  /** ★★☆☆ ✔ Example: 9999872 */
  MPImageStart?: number;
  /** ★★☆☆ ✔ Example: "Undefined" */
  MPImageType?: string;
  /** ★★☆☆ ✔ Example: 3 */
  NumberOfImages?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
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
  "TotalFrames",
) satisfies StrEnum<keyof MPFTags>;

export type MPFTag = StrEnumKeys<typeof MPFTagsNames>;

export interface MetaTags {
  /** ☆☆☆☆   Example: 1 */
  BorderID?: number;
  /** ☆☆☆☆   Example: 0 */
  BorderLocation?: number;
  /** ☆☆☆☆   Example: "None" */
  BorderName?: string;
  /** ☆☆☆☆   Example: "1 0 0 0" */
  BordersVersion?: string;
  /** ☆☆☆☆   Example: 0 */
  BorderType?: number;
  /** ☆☆☆☆   Example: "KODAK DC5000 ZOOM DIGITAL CAMERA" */
  CameraOwner?: string;
  /** ☆☆☆☆   Example: 1 */
  CaptureConditionsPAR?: number;
  /** ☆☆☆☆   Example: "None" */
  DigitalEffectsName?: string;
  /** ☆☆☆☆   Example: 0 */
  DigitalEffectsType?: number;
  /** ☆☆☆☆   Example: "1 0 0 0" */
  DigitalEffectsVersion?: string;
  /** ☆☆☆☆   Example: 1 */
  EditTagArray?: number;
  /** ☆☆☆☆   Example: 2 */
  FilmGencode?: number;
  /** ☆☆☆☆   Example: 43 */
  FilmProductCode?: number;
  /** ☆☆☆☆   Example: 1 */
  FilmSize?: number;
  /** ☆☆☆☆   Example: 6 */
  ImageSourceEK?: number;
  /** ☆☆☆☆ ✔ Example: "0110" */
  MetadataNumber?: string;
  /** ☆☆☆☆   Example: "Version 9" */
  ModelAndVersion?: string;
  /** ☆☆☆☆   Example: 3 */
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
  "ImageSourceEK",
  "MetadataNumber",
  "ModelAndVersion",
  "WatermarkType",
) satisfies StrEnum<keyof MetaTags>;

export type MetaTag = StrEnumKeys<typeof MetaTagsNames>;

export interface PanasonicRawTags {
  /** ☆☆☆☆ ✔ Example: 1 */
  DistortionScale?: number;
  /** ☆☆☆☆ ✔ Example: 7 */
  NumWBEntries?: number;
}

export const PanasonicRawTagsNames = strEnum(
  "DistortionScale",
  "NumWBEntries",
) satisfies StrEnum<keyof PanasonicRawTags>;

export type PanasonicRawTag = StrEnumKeys<typeof PanasonicRawTagsNames>;

/**
 * @see https://exiftool.org/TagNames/Photoshop.html
 */
export interface PhotoshopTags {
  /** ☆☆☆☆ ✔ Example: true */
  CopyrightFlag?: boolean;
  /** ☆☆☆☆ ✔ Example: "inches" */
  DisplayedUnitsX?: string;
  /** ☆☆☆☆ ✔ Example: "inches" */
  DisplayedUnitsY?: string;
  /** ☆☆☆☆ ✔ Example: 30 */
  GlobalAltitude?: number;
  /** ☆☆☆☆ ✔ Example: 90 */
  GlobalAngle?: number;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HasRealMergedData?: string;
  /** ☆☆☆☆ ✔ Example: "fd826cdf97ac15335b426a20d23c1041" */
  IPTCDigest?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  NumSlices?: number;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  PhotoshopFormat?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  PhotoshopQuality?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 5768 bytes, use -b option to extract)" */
  PhotoshopThumbnail?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "0 0" */
  PrintPosition?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  PrintScale?: number;
  /** ☆☆☆☆ ✔ Example: "Centered" */
  PrintStyle?: string;
  /** ☆☆☆☆ ✔ Example: "Adobe Photoshop CS" */
  ReaderName?: string;
  /** ☆☆☆☆ ✔ Example: "panasonic_lumix_dmc_lx15_02" */
  SlicesGroupName?: string;
  /** ☆☆☆☆ ✔ Example: "Adobe Photoshop" */
  WriterName?: string;
}

export const PhotoshopTagsNames = strEnum(
  "CopyrightFlag",
  "DisplayedUnitsX",
  "DisplayedUnitsY",
  "GlobalAltitude",
  "GlobalAngle",
  "HasRealMergedData",
  "IPTCDigest",
  "NumSlices",
  "PhotoshopFormat",
  "PhotoshopQuality",
  "PhotoshopThumbnail",
  "PrintPosition",
  "PrintScale",
  "PrintStyle",
  "ReaderName",
  "SlicesGroupName",
  "WriterName",
) satisfies StrEnum<keyof PhotoshopTags>;

export type PhotoshopTag = StrEnumKeys<typeof PhotoshopTagsNames>;

export interface PrintIMTags {
  /** ★★★☆ ✔ Example: "0300" */
  PrintIMVersion?: string;
}

export const PrintIMTagsNames = strEnum("PrintIMVersion") satisfies StrEnum<
  keyof PrintIMTags
>;

export type PrintIMTag = StrEnumKeys<typeof PrintIMTagsNames>;

export interface QuickTimeTags {
  /** ☆☆☆☆ ✔ Example: 60 */
  AndroidCaptureFPS?: number;
  /** ☆☆☆☆ ✔ Example: 7.1 */
  AndroidVersion?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 4 bytes, use -b option to extract)" */
  AndroidVideoTemporalLayersCount?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 8 */
  AudioBitsPerSample?: number;
  /** ☆☆☆☆ ✔ Example: 3 */
  AudioChannels?: number;
  /** ☆☆☆☆ ✔ Example: "sowt" */
  AudioFormat?: string;
  /** ☆☆☆☆ ✔ Example: 8000 */
  AudioSampleRate?: number;
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  AudioVendorID?: string;
  /** ☆☆☆☆ ✔ Example: "Norm De Plume" */
  Author?: string;
  /** ☆☆☆☆ ✔ Example: "65535 65535 65535" */
  BackgroundColor?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  Balance?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  BitDepth?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ChapterListTrackID?: number;
  /** ☆☆☆☆ ✔ Example: "3840x2160" */
  CleanApertureDimensions?: string;
  /** ☆☆☆☆ ✔ Example: "BT.709" */
  ColorPrimaries?: string;
  /** ☆☆☆☆ ✔ Example: "nclx" */
  ColorProfiles?: string;
  /** ☆☆☆☆ ✔ Example: ["qt  "] */
  CompatibleBrands?: string[];
  /** ☆☆☆☆ ✔ Example: "jpeg" */
  CompressorID?: string;
  /** ☆☆☆☆ ✔ Example: "Photo - JPEG" */
  CompressorName?: string;
  /** ☆☆☆☆ ✔ Example: "Track 1" */
  ContentDescribes?: string;
  /** ☆☆☆☆ ✔ Example: "2023:06:11 14:30:35+01:00" */
  CreationDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "0 s" */
  CurrentTime?: string;
  /** ☆☆☆☆ ✔ Example: 9.5095 */
  Duration?: number;
  /** ☆☆☆☆ ✔ Example: "3840x2160" */
  EncodedPixelsDimensions?: string;
  /** ☆☆☆☆ ✔ Example: "Helvetica" */
  FontName?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  GenBalance?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  GenFlags?: string;
  /** ☆☆☆☆ ✔ Example: "ditherCopy" */
  GenGraphicsMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  GenMediaVersion?: number;
  /** ☆☆☆☆ ✔ Example: "32768 32768 32768" */
  GenOpColor?: string;
  /** ☆☆☆☆ ✔ Example: "51 deg 6' 13.32" N, 0 deg 52' 23.52" W, 99.22 m Above Sea Level" */
  GPSCoordinates?: string;
  /** ☆☆☆☆ ✔ Example: "srcCopy" */
  GraphicsMode?: string;
  /** ☆☆☆☆ ✔ Example: "Data Handler" */
  HandlerClass?: string;
  /** ☆☆☆☆ ✔ Example: "SoundHandle" */
  HandlerDescription?: string;
  /** ☆☆☆☆ ✔ Example: "Metadata Tags" */
  HandlerType?: string;
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  HandlerVendorID?: string;
  /** ☆☆☆☆ ✔ Example: 4.798027 */
  LocationAccuracyHorizontal?: number;
  /** ☆☆☆☆ ✔ Example: "MP4 v2 [ISO 14496-14]" */
  MajorBrand?: string;
  /** ☆☆☆☆ ✔ Example: "BT.709" */
  MatrixCoefficients?: string;
  /** ☆☆☆☆ ✔ Example: "1 0 0 0 1 0 0 0 1" */
  MatrixStructure?: string;
  /** ☆☆☆☆ ✔ Example: "2023:06:11 13:30:35" */
  MediaCreateDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 98304 */
  MediaDataOffset?: number;
  /** ☆☆☆☆ ✔ Example: 9790496 */
  MediaDataSize?: number;
  /** ☆☆☆☆ ✔ Example: 9.52 */
  MediaDuration?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  MediaHeaderVersion?: number;
  /** ☆☆☆☆ ✔ Example: "und" */
  MediaLanguageCode?: string;
  /** ☆☆☆☆ ✔ Example: "2023:06:11 13:30:46" */
  MediaModifyDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 8000 */
  MediaTimeScale?: number;
  /** ☆☆☆☆ ✔ Example: "583d47d07afe1fbcfa0894d17e66051f07e1230a0000072550c3000000000000" */
  MediaUID?: string;
  /** ☆☆☆☆ ✔ Example: "mebx" */
  MetaFormat?: string;
  /** ☆☆☆☆ ✔ Example: "2011.7.0" */
  MinorVersion?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  MovieHeaderVersion?: number;
  /** ☆☆☆☆ ✔ Example: 6 */
  NextTrackID?: number;
  /** ☆☆☆☆ ✔ Example: "32768 32768 32768" */
  OpColor?: string;
  /** ☆☆☆☆ ✔ Example: "tmcd" */
  OtherFormat?: string;
  /** ☆☆☆☆ ✔ Example: 59.94006 */
  PlaybackFrameRate?: number;
  /** ☆☆☆☆ ✔ Example: "SEQ_PLAY" */
  PlayMode?: string;
  /** ☆☆☆☆ ✔ Example: "0 s" */
  PosterTime?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  PreferredRate?: number;
  /** ☆☆☆☆ ✔ Example: "99.61%" */
  PreferredVolume?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PreviewDuration?: number;
  /** ☆☆☆☆ ✔ Example: "0 s" */
  PreviewTime?: string;
  /** ☆☆☆☆ ✔ Example: "3840x2160" */
  ProductionApertureDimensions?: string;
  /** ☆☆☆☆ ✔ Example: "mp4a" */
  PurchaseFileFormat?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  SelectionDuration?: number;
  /** ☆☆☆☆ ✔ Example: "0 s" */
  SelectionTime?: string;
  /** ☆☆☆☆ ✔ Example: "43333139313032343731363032300000" */
  SerialNumberHash?: string;
  /** ☆☆☆☆ ✔ Example: 720 */
  SourceImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 640 */
  SourceImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  TextColor?: string;
  /** ☆☆☆☆ ✔ Example: "Plain" */
  TextFace?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (21)" */
  TextFont?: string;
  /** ☆☆☆☆ ✔ Example: 10 */
  TextSize?: number;
  /** ☆☆☆☆ ✔ Example: 3 */
  TimecodeTrack?: number;
  /** ☆☆☆☆ ✔ Example: 90000 */
  TimeScale?: number;
  /** ☆☆☆☆ ✔ Example: "2023:06:11 13:30:35" */
  TrackCreateDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 9.5095 */
  TrackDuration?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  TrackHeaderVersion?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  TrackID?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  TrackLayer?: number;
  /** ☆☆☆☆ ✔ Example: "2023:06:11 13:30:46" */
  TrackModifyDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "0.00%" */
  TrackVolume?: string;
  /** ☆☆☆☆ ✔ Example: "BT.709" */
  TransferCharacteristics?: string;
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  VendorID?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VideoFrameRate?: string;
  /** ☆☆☆☆ ✔ Example: "Limited" */
  VideoFullRangeFlag?: string;
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
  "ColorPrimaries",
  "ColorProfiles",
  "CompatibleBrands",
  "CompressorID",
  "CompressorName",
  "ContentDescribes",
  "CreationDate",
  "CurrentTime",
  "Duration",
  "EncodedPixelsDimensions",
  "FontName",
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
  "HandlerVendorID",
  "LocationAccuracyHorizontal",
  "MajorBrand",
  "MatrixCoefficients",
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
  "MovieHeaderVersion",
  "NextTrackID",
  "OpColor",
  "OtherFormat",
  "PlaybackFrameRate",
  "PlayMode",
  "PosterTime",
  "PreferredRate",
  "PreferredVolume",
  "PreviewDuration",
  "PreviewTime",
  "ProductionApertureDimensions",
  "PurchaseFileFormat",
  "SelectionDuration",
  "SelectionTime",
  "SerialNumberHash",
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
  "TransferCharacteristics",
  "VendorID",
  "VideoFrameRate",
  "VideoFullRangeFlag",
) satisfies StrEnum<keyof QuickTimeTags>;

export type QuickTimeTag = StrEnumKeys<typeof QuickTimeTagsNames>;

export interface RAFTags {
  /** ☆☆☆☆ ✔ Example: "294.2 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 6.8e-05 0.000….001464" */
  ChromaticAberrationParams?: string;
  /** ☆☆☆☆ ✔ Example: "12 12 12 12" */
  FujiLayout?: string;
  /** ☆☆☆☆ ✔ Example: "267.4545455 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 0 0 0…5 0.488" */
  GeometricDistortionParams?: string;
  /** ☆☆☆☆ ✔ Example: "Uncompressed" */
  RAFCompression?: string;
  /** ☆☆☆☆ ✔ Example: -1.7 */
  RawExposureBias?: number;
  /** ☆☆☆☆ ✔ Example: "4896x3264" */
  RawImageCroppedSize?: string;
  /** ☆☆☆☆ ✔ Example: "6 16" */
  RawImageCropTopLeft?: string;
  /** ☆☆☆☆ ✔ Example: 3296 */
  RawImageFullHeight?: number;
  /** ☆☆☆☆ ✔ Example: "5120x3288" */
  RawImageFullSize?: string;
  /** ☆☆☆☆ ✔ Example: 5120 */
  RawImageFullWidth?: number;
  /** ☆☆☆☆ ✔ Example: "267.4545455 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 100 9…3 94.11" */
  VignettingParams?: string;
  /** ☆☆☆☆ ✔ Example: "GRBGBR BGGRGG RGGBGG GBRGRB RGGBGG BGGRGG" */
  XTransLayout?: string;
}

export const RAFTagsNames = strEnum(
  "ChromaticAberrationParams",
  "FujiLayout",
  "GeometricDistortionParams",
  "RAFCompression",
  "RawExposureBias",
  "RawImageCroppedSize",
  "RawImageCropTopLeft",
  "RawImageFullHeight",
  "RawImageFullSize",
  "RawImageFullWidth",
  "VignettingParams",
  "XTransLayout",
) satisfies StrEnum<keyof RAFTags>;

export type RAFTag = StrEnumKeys<typeof RAFTagsNames>;

export interface RIFFTags {
  /** ☆☆☆☆ ✔ Example: "" */
  AudioCodec?: string;
  /** ☆☆☆☆ ✔ Example: 285154 */
  AudioSampleCount?: number;
  /** ☆☆☆☆ ✔ Example: 11024 */
  AvgBytesPerSec?: number;
  /** ☆☆☆☆ ✔ Example: "Microsoft PCM" */
  Encoding?: string;
  /** ☆☆☆☆ ✔ Example: 388 */
  FrameCount?: number;
  /** ☆☆☆☆ ✔ Example: "478.6 kB/s" */
  MaxDataRate?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  NumChannels?: number;
  /** ☆☆☆☆ ✔ Example: 11024 */
  SampleRate?: number;
  /** ☆☆☆☆ ✔ Example: "Variable" */
  SampleSize?: string;
  /** ☆☆☆☆ ✔ Example: 2 */
  StreamCount?: number;
  /** ☆☆☆☆ ✔ Example: "mjpg" */
  VideoCodec?: string;
  /** ☆☆☆☆ ✔ Example: 388 */
  VideoFrameCount?: number;
}

export const RIFFTagsNames = strEnum(
  "AudioCodec",
  "AudioSampleCount",
  "AvgBytesPerSec",
  "Encoding",
  "FrameCount",
  "MaxDataRate",
  "NumChannels",
  "SampleRate",
  "SampleSize",
  "StreamCount",
  "VideoCodec",
  "VideoFrameCount",
) satisfies StrEnum<keyof RIFFTags>;

export type RIFFTag = StrEnumKeys<typeof RIFFTagsNames>;

/**
 * @see https://exiftool.org/TagNames/IPTC.html
 */
export interface IPTCTags {
  /** ☆☆☆☆ ✔ Example: 4 */
  ApplicationRecordVersion?: number;
  /** ☆☆☆☆   Example:  */
  "Caption-Abstract"?: string;
  /** ☆☆☆☆ ✔ Example: "Other" */
  Category?: string;
  /** ☆☆☆☆ ✔ Example: "TEDDINGTON" */
  City?: string;
  /** ☆☆☆☆ ✔ Example: "UTF8" */
  CodedCharacterSet?: string;
  /** ☆☆☆☆ ✔ Example: "Donna Ringmanumba" */
  Contact?: string;
  /** ☆☆☆☆ ✔ Example: "Creative Commons Attribution 4.0 International" */
  CopyrightNotice?: string;
  /** ☆☆☆☆ ✔ Example: "photo by Jenny Snapsalot" */
  Credit?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  DateSent?: string;
  /** ☆☆☆☆ ✔ Example: "2023:11:07 14:10:21-05:00" */
  DateTimeCreated?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "" */
  Destination?: string;
  /** ☆☆☆☆ ✔ Example: "2021:03:16" */
  DigitalCreationDate?: ExifDate | string;
  /** ☆☆☆☆ ✔ Example: "20:25:15" */
  DigitalCreationTime?: ExifTime | string;
  /** ☆☆☆☆ ✔ Example: "" */
  EnvelopeNumber?: string;
  /** ☆☆☆☆ ✔ Example: "5 (normal urgency)" */
  EnvelopePriority?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  EnvelopeRecordVersion?: number;
  /** ☆☆☆☆ ✔ Example: 2 */
  FileVersion?: number;
  /** ☆☆☆☆ ✔ Example: "" */
  Headline?: string;
  /** ☆☆☆☆ ✔ Example: ["red","car"] */
  Keywords?: string | string[];
  /** ☆☆☆☆ ✔ Example: "Artist deep into to wine and flower" */
  ObjectName?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  OriginalTransmissionReference?: string;
  /** ☆☆☆☆ ✔ Example: "digiKam" */
  OriginatingProgram?: string;
  /** ☆☆☆☆ ✔ Example: "Tagged:1, ColorClass:2, Rating:0, FrameNum:000940" */
  Prefs?: string;
  /** ☆☆☆☆ ✔ Example: "4.13.0" */
  ProgramVersion?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  ServiceIdentifier?: string;
  /** ☆☆☆☆ ✔ Example: "Shutterfly McShutterface" */
  Source?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  SpecialInstructions?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  SupplementalCategories?: string;
  /** ☆☆☆☆ ✔ Example: "23:59:46.92" */
  TimeCreated?: ExifTime | string;
  /** ☆☆☆☆ ✔ Example: "" */
  TimeSent?: string;
  /** ☆☆☆☆ ✔ Example: "1 (most urgent)" */
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
  "Credit",
  "DateSent",
  "DateTimeCreated",
  "Destination",
  "DigitalCreationDate",
  "DigitalCreationTime",
  "EnvelopeNumber",
  "EnvelopePriority",
  "EnvelopeRecordVersion",
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
  /** ★★★☆ ✔ Example: 1.02 */
  JFIFVersion?: number;
}

export const JFIFTagsNames = strEnum("JFIFVersion") satisfies StrEnum<
  keyof JFIFTags
>;

export type JFIFTag = StrEnumKeys<typeof JFIFTagsNames>;

export interface MakerNotesTags {
  /** ☆☆☆☆ ✔ Example: 2 */
  AccelerationTracking?: number;
  /** ☆☆☆☆ ✔ Example: "0.9421226483 0.0351725654 -0.3452420701" */
  AccelerationVector?: string;
  /** ☆☆☆☆   Example: "358.3 11.2" */
  Accelerometer?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  AccelerometerX?: number;
  /** ☆☆☆☆ ✔ Example: 80 */
  AccelerometerY?: number;
  /** ☆☆☆☆ ✔ Example: 56 */
  AccelerometerZ?: number;
  /** ☆☆☆☆ ✔ Example: "00:00" */
  AccessorySerialNumber?: string;
  /** ☆☆☆☆ ✔ Example: "NO-ACCESSORY" */
  AccessoryType?: string;
  /** ☆☆☆☆   Example: "+0.0" */
  ActualCompensation?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AddAspectRatioInfo?: string;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  AddIPTCInformation?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AddOriginalDecisionData?: string;
  /** ☆☆☆☆   Example: "(Binary data 1024 bytes, use -b option to extract)" */
  ADJDebugInfo?: BinaryField | string;
  /** ☆☆☆☆   Example: "X3F Setting Mode" */
  AdjustmentMode?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ADLBracketingStep?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ADLBracketingType?: string;
  /** ☆☆☆☆ ✔ Example: "Toy Camera" */
  AdvancedFilter?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  AdvancedSceneType?: number;
  /** ☆☆☆☆ ✔ Example: 9.9 */
  AEAperture?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  AEApertureSteps?: number;
  /** ☆☆☆☆ ✔ Example: 90 */
  AEAverage?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  AEBAutoCancel?: string;
  /** ★★☆☆ ✔ Example: 0 */
  AEBBracketValue?: number;
  /** ☆☆☆☆ ✔ Example: "AE Bracketing Disabled" */
  AEBracketingSteps?: string;
  /** ☆☆☆☆ ✔ Example: "0,-,+" */
  AEBSequence?: string;
  /** ☆☆☆☆ ✔ Example: "0,-,+/Enabled" */
  AEBSequenceAutoCancel?: string;
  /** ☆☆☆☆ ✔ Example: "7 shots" */
  AEBShotCount?: string;
  /** ☆☆☆☆ ✔ Example: 0.5 */
  AEBXv?: number;
  /** ☆☆☆☆   Example: "(Binary data 256 bytes, use -b option to extract)" */
  AEDebugInfo?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "1/965" */
  AEExposureTime?: string;
  /** ☆☆☆☆   Example: "(Binary data 4096 bytes, use -b option to extract)" */
  AEHistogramInfo?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Hold" */
  AELButton?: string;
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  AELExposureIndicator?: string;
  /** ☆☆☆☆   Example: "(Binary data 4096 bytes, use -b option to extract)" */
  AELiveViewHistogramInfo?: BinaryField | string;
  /** ☆☆☆☆   Example: "(Binary data 2048 bytes, use -b option to extract)" */
  AELiveViewLocalHistogram?: BinaryField | string;
  /** ☆☆☆☆   Example: "(Binary data 2048 bytes, use -b option to extract)" */
  AELocalHistogram?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AELock?: string;
  /** ☆☆☆☆ ✔ Example: "AF Lock Only" */
  AELockButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AELockButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Evaluative" */
  AELockMeterModeAfterFocus?: string;
  /** ☆☆☆☆ ✔ Example: 5.7 */
  AEMaxAperture?: number;
  /** ☆☆☆☆ ✔ Example: "[1], [2]" */
  AEMeteringMode?: string;
  /** ☆☆☆☆ ✔ Example: "9.8 9.4 7.9 8.6 9.2 8.5 9.4 8.9 8.1 8.6 8.0 10.4 8.5 10.6…9.5 9.5" */
  AEMeteringSegments?: string;
  /** ☆☆☆☆ ✔ Example: "Enable; 0; 8; 0" */
  AEMicroadjustment?: string;
  /** ☆☆☆☆ ✔ Example: 38 */
  AEMinAperture?: number;
  /** ☆☆☆☆ ✔ Example: "1/7723" */
  AEMinExposureTime?: string;
  /** ☆☆☆☆ ✔ Example: "Sv or Green Mode" */
  AEProgramMode?: string;
  /** ★☆☆☆ ✔ Example: "Normal AE" */
  AESetting?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  AEStable?: string;
  /** ☆☆☆☆ ✔ Example: 89 */
  AETarget?: number;
  /** ☆☆☆☆   Example: "Daylight Fluorescent" */
  AEWhiteBalance?: string;
  /** ☆☆☆☆ ✔ Example: 0.5 */
  AEXv?: number;
  /** ☆☆☆☆ ✔ Example: 2147483600 */
  AFAccelDecelTracking?: number;
  /** ☆☆☆☆ ✔ Example: "Shutter/AF-On" */
  AFActivation?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  AFAdjustment?: number;
  /** ☆☆☆☆ ✔ Example: "Metering start" */
  AFAndMeteringButtons?: string;
  /** ☆☆☆☆ ✔ Example: 5.8 */
  AFAperture?: number;
  /** ☆☆☆☆ ✔ Example: 840 */
  AFAreaHeight?: number;
  /** ★☆☆☆ ✔ Example: "994 18 18 18 18 18 18 18 18" */
  AFAreaHeights?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  AFAreaIllumination?: string;
  /** ★★★☆ ✔ Example: "Zone AF" */
  AFAreaMode?: string;
  /** ☆☆☆☆ ✔ Example: "Wide" */
  AFAreaModeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFAreaPointSize?: string;
  /** ☆☆☆☆ ✔ Example: "none" */
  AFAreas?: string;
  /** ☆☆☆☆ ✔ Example: "Main Dial" */
  AFAreaSelectionMethod?: string;
  /** ☆☆☆☆ ✔ Example: "AF area selection button" */
  AFAreaSelectMethod?: string;
  /** ☆☆☆☆ ✔ Example: 996 */
  AFAreaWidth?: number;
  /** ★☆☆☆ ✔ Example: "994 18 18 18 18 18 18 18 18" */
  AFAreaWidths?: string;
  /** ☆☆☆☆ ✔ Example: 4388 */
  AFAreaXPosition?: number;
  /** ☆☆☆☆ ✔ Example: 744 */
  AFAreaYPosition?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFAreaZoneSize?: string;
  /** ☆☆☆☆ ✔ Example: "Only ext. flash emits/Fires" */
  AFAssist?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  AFAssistBeam?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (5)" */
  AFAssistLamp?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  AFButtonPressed?: string;
  /** ☆☆☆☆ ✔ Example: 8 */
  AFConfidence?: number;
  /** ☆☆☆☆ ✔ Example: "Case 2147483648" */
  AFConfigTool?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  AFCoordinatesAvailable?: string;
  /** ☆☆☆☆   Example: "(Binary data 256 bytes, use -b option to extract)" */
  AFDebugInfo?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 9 */
  AFDefocus?: number;
  /** ☆☆☆☆ ✔ Example: "Phase Detect" */
  AFDetectionMethod?: string;
  /** ☆☆☆☆ ✔ Example: "Quick mode" */
  AFDuringLiveView?: string;
  /** ☆☆☆☆ ✔ Example: "On (2)" */
  AFFineTune?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  AFFineTuneAdj?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  AFFineTuneAdjTele?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFFineTuneIndex?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFIlluminator?: string;
  /** ☆☆☆☆ ✔ Example: "0402" */
  AFInfo2Version?: string;
  /** ☆☆☆☆ ✔ Example: "90 ms" */
  AFIntegrationTime?: string;
  /** ☆☆☆☆ ✔ Example: 489 */
  AFMeasuredDepth?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  AFMicroAdj?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  AFMicroAdjMode?: string;
  /** ☆☆☆☆ ✔ Example: 2 */
  AFMicroAdjRegisteredLenses?: number;
  /** ☆☆☆☆ ✔ Example: "Disable; 0; 0; 0; 84" */
  AFMicroadjustment?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  AFMicroAdjValue?: number;
  /** ★☆☆☆ ✔ Example: "Zone" */
  AFMode?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFModeRestrictions?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AFOnAELockButtonSwitch?: string;
  /** ☆☆☆☆ ✔ Example: "AF-On" */
  AFOnButton?: string;
  /** ☆☆☆☆ ✔ Example: "682 1 53" */
  AFPerformance?: string;
  /** ★★☆☆ ✔ Example: "Upper-right" */
  AFPoint?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AFPointActivationArea?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AFPointAreaExpansion?: string;
  /** ☆☆☆☆ ✔ Example: "Left (vertical)" */
  AFPointAtShutterRelease?: string;
  /** ☆☆☆☆ ✔ Example: "Control-direct:disable/Main:enable" */
  AFPointAutoSelection?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  AFPointBrightness?: string;
  /** ☆☆☆☆ ✔ Example: 897 */
  AFPointDetails?: number;
  /** ☆☆☆☆ ✔ Example: "Selected (pre-AF, focused)" */
  AFPointDisplayDuringFocus?: string;
  /** ☆☆☆☆ ✔ Example: "On in Continuous Shooting and Manual Focusing" */
  AFPointIllumination?: string;
  /** ☆☆☆☆ ✔ Example: "Left (vertical)" */
  AFPointInFocus?: string;
  /** ☆☆☆☆ ✔ Example: "[2]" */
  AFPointMode?: string;
  /** ☆☆☆☆ ✔ Example: "none" */
  AFPointPosition?: string;
  /** ☆☆☆☆ ✔ Example: "Center" */
  AFPointRegistration?: string;
  /** ☆☆☆☆   Example: "Center" */
  AFPoints?: string;
  /** ☆☆☆☆ ✔ Example: "Use Half" */
  AFPointSel?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFPointSelected?: string;
  /** ☆☆☆☆ ✔ Example: "H=AF+Main/V=AF+Command" */
  AFPointSelection?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (1046 1046)" */
  AFPointSelectionMethod?: string;
  /** ☆☆☆☆ ✔ Example: "Lower-right" */
  AFPointSetting?: string;
  /** ★★☆☆ ✔ Example: "Upper-right, Top" */
  AFPointsInFocus?: string;
  /** ☆☆☆☆ ✔ Example: "C6 (C6)" */
  AFPointsInFocus1D?: string;
  /** ☆☆☆☆ ✔ Example: "Center" */
  AFPointsInFocus5D?: string;
  /** ☆☆☆☆ ✔ Example: "9/Active AF point" */
  AFPointSpotMetering?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  AFPointsSelected?: number;
  /** ☆☆☆☆   Example: 17 */
  AFPointsSpecial?: number;
  /** ☆☆☆☆ ✔ Example: "Top" */
  AFPointsUsed?: string;
  /** ☆☆☆☆ ✔ Example: 2147483600 */
  AFPointSwitching?: number;
  /** ☆☆☆☆ ✔ Example: 903 */
  AFPredictor?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFTracking?: string;
  /** ☆☆☆☆ ✔ Example: 2147483600 */
  AFTrackingSensitivity?: number;
  /** ☆☆☆☆ ✔ Example: "79-point" */
  AFType?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AFWithShutter?: string;
  /** ☆☆☆☆ ✔ Example: "Shooting not possible without focus" */
  AIServoContinuousShooting?: string;
  /** ☆☆☆☆ ✔ Example: "Focus Priority" */
  AIServoFirstImage?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  AIServoFirstImagePriority?: string;
  /** ☆☆☆☆ ✔ Example: "1: AF, 2: Tracking" */
  AIServoImagePriority?: string;
  /** ☆☆☆☆ ✔ Example: "Focus Priority" */
  AIServoSecondImage?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  AIServoSecondImagePriority?: string;
  /** ☆☆☆☆ ✔ Example: "Main focus point priority" */
  AIServoTrackingMethod?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AIServoTrackingSensitivity?: string;
  /** ☆☆☆☆ ✔ Example: "Off; Object Not Found" */
  AISubjectTrackingMode?: string;
  /** ☆☆☆☆ ✔ Example: "91 m" */
  Altitude?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AmbienceSelection?: string;
  /** ☆☆☆☆ ✔ Example: "40 C" */
  AmbientTemperature?: string;
  /** ☆☆☆☆   Example: "95 F" */
  AmbientTemperatureFahrenheit?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AntiFlicker?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ApertureLock?: string;
  /** ☆☆☆☆ ✔ Example: "Manual: Closed 64; Open 1; Auto: Closed 31; Open 6.3" */
  ApertureRange?: string;
  /** ☆☆☆☆ ✔ Example: "Prohibited" */
  ApertureRingUse?: string;
  /** ☆☆☆☆ ✔ Example: 9.1 */
  ApertureSetting?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  ApplySettingsToLiveView?: string;
  /** ☆☆☆☆ ✔ Example: "Enable; 1; 2; 1; 128; 48; 0; 1" */
  ApplyShootingMeteringMode?: string;
  /** ☆☆☆☆   Example: 8 */
  ApproximateFNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Soft Focus; 1280; 0; 0" */
  ArtFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Off; 0; 0; Partial Color 0; No Effect; 0; No Color Filter…0; 0; 0" */
  ArtFilterEffect?: string;
  /** ☆☆☆☆   Example: "Unknown (8305)" */
  ArtMode?: string;
  /** ☆☆☆☆   Example: "0 0 0" */
  ArtModeParameters?: string;
  /** ☆☆☆☆ ✔ Example: "0 192 4607 3263" */
  AspectFrame?: string;
  /** ★☆☆☆ ✔ Example: "Unknown (942874672)" */
  AspectRatio?: string;
  /** ☆☆☆☆ ✔ Example: "Auto Bracketing" */
  AssignBktButton?: string;
  /** ☆☆☆☆ ✔ Example: "LCD brightness" */
  AssignFuncButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieFunc1ButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieFunc2Button?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMoviePreviewButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Shutter/Aperture Lock" */
  AssignMovieRecordButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieRecordButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  AssignMovieSubselector?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieSubselectorPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignRemoteFnButton?: string;
  /** ☆☆☆☆ ✔ Example: "Select Home Position" */
  AssistButtonFunction?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  Audio?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AudioCompression?: string;
  /** ☆☆☆☆ ✔ Example: "On-Shot AF only" */
  AutoAFPointColorTracking?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AutoAFPointSelEOSiTRAF?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoAperture?: string;
  /** ☆☆☆☆   Example: "None" */
  AutoBracket?: string;
  /** ★☆☆☆ ✔ Example: "On" */
  AutoBracketing?: string;
  /** ☆☆☆☆ ✔ Example: "Flash/Speed" */
  AutoBracketingMode?: string;
  /** ☆☆☆☆ ✔ Example: "AE Only" */
  AutoBracketingSet?: string;
  /** ☆☆☆☆ ✔ Example: "Flash/Speed" */
  AutoBracketModeM?: string;
  /** ☆☆☆☆ ✔ Example: "0,-,+" */
  AutoBracketOrder?: string;
  /** ☆☆☆☆ ✔ Example: "Exposure" */
  AutoBracketSet?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoDistortionControl?: string;
  /** ☆☆☆☆ ✔ Example: "400%" */
  AutoDynamicRange?: string;
  /** ★★☆☆ ✔ Example: "On" */
  AutoExposureBracketing?: string;
  /** ☆☆☆☆ ✔ Example: "Subject and Background" */
  AutoFlashISOSensitivity?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AutoFP?: string;
  /** ★★☆☆ ✔ Example: 96 */
  AutoISO?: number;
  /** ☆☆☆☆ ✔ Example: "1/30 s" */
  AutoISOMinShutterSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AutoLightingOptimizer?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  AutoPortraitFramed?: string;
  /** ★☆☆☆ ✔ Example: "Rotate 90 CW" */
  AutoRotate?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  AuxiliaryLens?: string;
  /** ☆☆☆☆ ✔ Example: 6.7 */
  AvApertureSetting?: number;
  /** ☆☆☆☆ ✔ Example: "513 513 513 513" */
  AverageBlackLevel?: string;
  /** ☆☆☆☆ ✔ Example: 9.875 */
  AverageLV?: number;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  AvSettingWithoutLens?: string;
  /** ☆☆☆☆ ✔ Example: "99:99:99 00:00:00" */
  BabyAge?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  BabyName?: string;
  /** ☆☆☆☆ ✔ Example: "R0000148" */
  Barcode?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  BarometerInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  BaseExposureCompensation?: number;
  /** ★★☆☆ ✔ Example: 800 */
  BaseISO?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  BatteryLevel?: string;
  /** ☆☆☆☆ ✔ Example: "MB-D12 First" */
  BatteryOrder?: string;
  /** ☆☆☆☆ ✔ Example: "Sufficient Power Remaining" */
  BatteryState?: string;
  /** ☆☆☆☆ ✔ Example: "50.6 C" */
  BatteryTemperature?: string;
  /** ☆☆☆☆ ✔ Example: "NB-13L" */
  BatteryType?: string;
  /** ☆☆☆☆   Example: "8.52 V" */
  BatteryVoltage?: string;
  /** ☆☆☆☆   Example: "Unknown (0)" */
  BayerPattern?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  Beep?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  BeepPitch?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  BeepVolume?: string;
  /** ☆☆☆☆   Example: "Sports CS" */
  BestShotMode?: string;
  /** ☆☆☆☆ ✔ Example: "128 128 128 128" */
  BlackLevels?: string;
  /** ☆☆☆☆ ✔ Example: 2209 */
  BlackMaskBottomBorder?: number;
  /** ☆☆☆☆ ✔ Example: 14 */
  BlackMaskLeftBorder?: number;
  /** ☆☆☆☆ ✔ Example: 55 */
  BlackMaskRightBorder?: number;
  /** ☆☆☆☆ ✔ Example: 162 */
  BlackMaskTopBorder?: number;
  /** ☆☆☆☆ ✔ Example: "7 104 106 6" */
  BlackPoint?: string;
  /** ☆☆☆☆   Example: "n/a" */
  BleachBypassToning?: string;
  /** ☆☆☆☆   Example: "5C" */
  BlueGain?: string;
  /** ☆☆☆☆   Example: "Off; 0; 0; 0" */
  BlurControl?: string;
  /** ★☆☆☆ ✔ Example: "None" */
  BlurWarning?: string;
  /** ☆☆☆☆ ✔ Example: "28 C" */
  BoardTemperature?: string;
  /** ☆☆☆☆ ✔ Example: 165 */
  BodyBatteryADLoad?: number;
  /** ☆☆☆☆ ✔ Example: 199 */
  BodyBatteryADNoLoad?: number;
  /** ☆☆☆☆ ✔ Example: "Running Low" */
  BodyBatteryState?: string;
  /** ☆☆☆☆   Example: "RS1 :V01500000 " */
  BodyFirmware?: string;
  /** ☆☆☆☆ ✔ Example: 81 */
  BodyFirmwareVersion?: number;
  /** ☆☆☆☆   Example: "SID:14101105   " */
  BodySerialNumber?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  BracketIncrement?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  BracketMode?: string;
  /** ☆☆☆☆ ✔ Example: "Disabled" */
  BracketProgram?: string;
  /** ☆☆☆☆   Example: "0 0" */
  BracketSequence?: string;
  /** ☆☆☆☆ ✔ Example: "AE/Flash" */
  BracketSet?: string;
  /** ☆☆☆☆ ✔ Example: "No Bracket" */
  BracketSettings?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  BracketShotNumber?: number;
  /** ☆☆☆☆   Example: "Unknown (429458713)" */
  BracketStep?: string;
  /** ☆☆☆☆ ✔ Example: 12 */
  BracketValue?: number;
  /** ☆☆☆☆ ✔ Example: 9.25 */
  Brightness?: number;
  /** ☆☆☆☆   Example: "SU6-7" */
  BuildNumber?: string;
  /** ★★☆☆ ✔ Example: 0 */
  BulbDuration?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  BurstGroupID?: number;
  /** ☆☆☆☆ ✔ Example: "Unlimited" */
  BurstMode?: string;
  /** ☆☆☆☆   Example: 3 */
  BurstShot?: number;
  /** ☆☆☆☆ ✔ Example: 9 */
  BurstSpeed?: number;
  /** ☆☆☆☆ ✔ Example: "460727F2-20CF-4031-957B-7E04D567DF1F" */
  BurstUUID?: string;
  /** ☆☆☆☆ ✔ Example: "Normal (enable)" */
  ButtonFunctionControlOff?: string;
  /** ☆☆☆☆   Example: 8 */
  BWFilter?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  BWMode?: string;
  /** ☆☆☆☆   Example: "Starting calibration file for SD14F13_Rev3; S/N C75_00001…8:16:34" */
  Calibration?: string;
  /** ☆☆☆☆   Example: "2216/02/28 03:49:48" */
  CameraDateTime?: string;
  /** ★☆☆☆ ✔ Example: "h Company Ltd." */
  CameraID?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  CameraISO?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (155)" */
  CameraOrientation?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 8412 bytes, use -b option to extract)" */
  CameraParameters?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "User Defined 3" */
  CameraPictureStyle?: string;
  /** ☆☆☆☆   Example: -90 */
  CameraPitch?: number;
  /** ☆☆☆☆   Example: "+0.00" */
  CameraRoll?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  CameraSettingsVersion?: string;
  /** ★★☆☆ ✔ Example: "uD800,S800" */
  CameraType?: string;
  /** ☆☆☆☆   Example: "+90.80" */
  CameraYaw?: string;
  /** ★★☆☆ ✔ Example: "Unknown (-1)" */
  CanonExposureMode?: string;
  /** ☆☆☆☆ ✔ Example: "Full automatic mode" */
  CanonFileDescription?: string;
  /** ☆☆☆☆ ✔ Example: 3794598 */
  CanonFileLength?: number;
  /** ★★☆☆ ✔ Example: "Firmware version 1.00" */
  CanonFirmwareVersion?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  CanonFlashMode?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  CanonImageSize?: string;
  /** ★★☆☆ ✔ Example: "PIC:DC50 JPEG" */
  CanonImageType?: string;
  /** ★★☆☆ ✔ Example: "XH A1S" */
  CanonModelID?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  CardShutterLock?: string;
  /** ★☆☆☆ ✔ Example: "People" */
  Categories?: string;
  /** ☆☆☆☆   Example: 2 */
  CCDBoardVersion?: number;
  /** ☆☆☆☆ ✔ Example: "Interlaced" */
  CCDScanMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  CCDSensitivity?: number;
  /** ☆☆☆☆   Example: 0 */
  CCDVersion?: number;
  /** ☆☆☆☆ ✔ Example: "Normal Zone" */
  CenterAFArea?: string;
  /** ☆☆☆☆ ✔ Example: "Normal Zone" */
  CenterFocusPoint?: string;
  /** ☆☆☆☆ ✔ Example: "Small" */
  CenterWeightedAreaSize?: string;
  /** ☆☆☆☆ ✔ Example: "9 fps" */
  CHModeShootingSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ChromaticAberrationCorr?: string;
  /** ☆☆☆☆ ✔ Example: "9758 13871 16956 16964 14142 9776 30 9502 13101 15416 151…1 15949" */
  ChromaticAberrationCorrParams?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ChromaticAberrationSetting?: string;
  /** ☆☆☆☆   Example: "+0.500" */
  ChrominanceNoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: "San Francisco" */
  City2?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  Clarity?: number;
  /** ☆☆☆☆   Example: "Off" */
  ClarityControl?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ClearRetouch?: string;
  /** ☆☆☆☆ ✔ Example: "6 fps" */
  CLModeShootingSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Sub-command Dial" */
  CmdDialsApertureSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Autofocus Off, Exposure Off" */
  CmdDialsChangeMainSub?: string;
  /** ☆☆☆☆ ✔ Example: "On (Image Review Excluded)" */
  CmdDialsMenuAndPlayback?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  CmdDialsReverseRotation?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  CmdDialsReverseRotExposureComp?: number;
  /** ☆☆☆☆   Example: "0 0 0" */
  ColorAdjustment?: string;
  /** ☆☆☆☆   Example: "Off" */
  ColorAdjustmentMode?: string;
  /** ☆☆☆☆   Example: 256 */
  ColorBalanceBlue?: number;
  /** ☆☆☆☆   Example: 65792 */
  ColorBalanceGreen?: number;
  /** ☆☆☆☆   Example: 2.4960938 */
  ColorBalanceRed?: number;
  /** ☆☆☆☆ ✔ Example: "R01," */
  ColorBalanceVersion?: string;
  /** ☆☆☆☆ ✔ Example: 24 */
  ColorBitDepth?: number;
  /** ☆☆☆☆ ✔ Example: 257 */
  ColorBW?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ColorChromeEffect?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ColorChromeFXBlue?: string;
  /** ☆☆☆☆ ✔ Example: 8 */
  ColorCompensationFilter?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorCompensationFilterCustom?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorCompensationFilterSet?: number;
  /** ☆☆☆☆ ✔ Example: "96 4096 3072 4096 16 256" */
  ColorControl?: string;
  /** ☆☆☆☆ ✔ Example: "Color 0; 0; 29; Strength 0; -4; 3" */
  ColorCreatorEffect?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (65)" */
  ColorDataVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Warm" */
  ColorEffect?: string;
  /** ☆☆☆☆   Example: "Off" */
  ColorFilter?: string;
  /** ☆☆☆☆ ✔ Example: "0.00 0.00 0.00" */
  ColorGain?: string;
  /** ☆☆☆☆ ✔ Example: "Mode3a" */
  ColorHue?: string;
  /** ☆☆☆☆ ✔ Example: "600 -236 -108 -52 404 -96 -20 -140 416" */
  ColorMatrix?: string;
  /** ☆☆☆☆   Example: "1.66016 -0.66016 0.00000 -0.20703 1.52734 -0.32031 -0.132…1.42969" */
  ColorMatrixA?: string;
  /** ☆☆☆☆   Example: "1.12793 -0.03674 -0.09119 -0.20703 1.52734 -0.32031 -0.13…1.35791" */
  ColorMatrixB?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  ColorMatrixNumber?: number;
  /** ★★☆☆ ✔ Example: "n/a" */
  ColorMode?: string;
  /** ☆☆☆☆ ✔ Example: "Min -5; Max 5; Yellow 0; Orange 0; Orange-red 0; Red 0; M…green 0" */
  ColorProfileSettings?: string;
  /** ☆☆☆☆ ✔ Example: 8059 */
  ColorTempAsShot?: number;
  /** ☆☆☆☆ ✔ Example: 7397 */
  ColorTempAuto?: number;
  /** ☆☆☆☆ ✔ Example: 7103 */
  ColorTempCloudy?: number;
  /** ☆☆☆☆ ✔ Example: 5210 */
  ColorTempCustom?: number;
  /** ☆☆☆☆ ✔ Example: 6071 */
  ColorTempDaylight?: number;
  /** ★☆☆☆ ✔ Example: 9900 */
  ColorTemperature?: number;
  /** ☆☆☆☆ ✔ Example: 7820 */
  ColorTemperatureAuto?: number;
  /** ☆☆☆☆ ✔ Example: "6300 K" */
  ColorTemperatureCustom?: string;
  /** ☆☆☆☆ ✔ Example: "7200 K" */
  ColorTemperatureSet?: string;
  /** ☆☆☆☆ ✔ Example: "Temperature" */
  ColorTemperatureSetting?: string;
  /** ☆☆☆☆ ✔ Example: 9826 */
  ColorTempFlash?: number;
  /** ☆☆☆☆ ✔ Example: 5892 */
  ColorTempFluorescent?: number;
  /** ☆☆☆☆ ✔ Example: 8001 */
  ColorTempKelvin?: number;
  /** ☆☆☆☆ ✔ Example: 7397 */
  ColorTempMeasured?: number;
  /** ☆☆☆☆ ✔ Example: 7830 */
  ColorTempShade?: number;
  /** ☆☆☆☆ ✔ Example: 5892 */
  ColorTempTungsten?: number;
  /** ☆☆☆☆   Example: 5 */
  ColorTint?: number;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ColorTone?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneAuto?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneFaithful?: number;
  /** ☆☆☆☆ ✔ Example: 11 */
  ColorToneLandscape?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneNeutral?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorTonePortrait?: number;
  /** ☆☆☆☆ ✔ Example: 15663191 */
  ColorToneStandard?: number;
  /** ☆☆☆☆ ✔ Example: "Standard (Main Shutter, Sub Aperture)" */
  CommandDials?: string;
  /** ☆☆☆☆ ✔ Example: "Sub-command Dial" */
  CommandDialsApertureSetting?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  CommandDialsChangeMainSub?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  CommandDialsMenuAndPlayback?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  CommandDialsReverseRotation?: string;
  /** ☆☆☆☆ ✔ Example: 3 */
  CommanderChannel?: number;
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderGroupAManualOutput?: string;
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderGroupAMode?: string;
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderGroupBManualOutput?: string;
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderGroupBMode?: string;
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderInternalFlash?: string;
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderInternalManualOutput?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  CommanderInternalTTLComp?: number;
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompBuiltin?: number;
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompGroupA?: number;
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompGroupB?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  ComponentBitDepth?: number;
  /** ☆☆☆☆ ✔ Example: "Component version 1.00" */
  ComponentVersion?: string;
  /** ☆☆☆☆   Example: "Off" */
  CompositionAdjust?: string;
  /** ☆☆☆☆   Example: 8 */
  CompositionAdjustRotation?: number;
  /** ☆☆☆☆   Example: 4 */
  CompositionAdjustX?: number;
  /** ☆☆☆☆   Example: 1 */
  CompositionAdjustY?: number;
  /** ☆☆☆☆ ✔ Example: 98047 */
  CompressedImageSize?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  CompressionFactor?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  CompressionRatio?: number;
  /** ☆☆☆☆ ✔ Example: "FFCBAC24-E547-4BBC-AF47-38B1A3D845E3" */
  ContentIdentifier?: string;
  /** ☆☆☆☆ ✔ Example: "Low" */
  ContinuousBracketing?: string;
  /** ★★☆☆ ✔ Example: "Unknown (11)" */
  ContinuousDrive?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ContinuousModeDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ContinuousModeLiveView?: string;
  /** ☆☆☆☆ ✔ Example: "Hi 15000; Cont 15000; Lo 5000; Soft 8000; Soft LS 3000" */
  ContinuousShootingSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Disable; 99 shots" */
  ContinuousShotLimit?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ContrastAuto?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 578 bytes, use -b option to extract)" */
  ContrastCurve?: BinaryField | string;
  /** ☆☆☆☆   Example: "496 184 48 48" */
  ContrastDetectAFArea?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ContrastDetectAFInFocus?: string;
  /** ☆☆☆☆ ✔ Example: 6553600 */
  ContrastFaithful?: number;
  /** ☆☆☆☆   Example: 0 */
  ContrastHighlight?: number;
  /** ☆☆☆☆   Example: "On" */
  ContrastHighlightShadowAdj?: string;
  /** ☆☆☆☆ ✔ Example: 6553600 */
  ContrastLandscape?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (19)" */
  ContrastMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ContrastNeutral?: number;
  /** ☆☆☆☆ ✔ Example: 9699328 */
  ContrastPortrait?: number;
  /** ☆☆☆☆ ✔ Example: "1 (min -5, max 5)" */
  ContrastSetting?: string;
  /** ☆☆☆☆   Example: 0 */
  ContrastShadow?: number;
  /** ☆☆☆☆ ✔ Example: 12058626 */
  ContrastStandard?: number;
  /** ☆☆☆☆ ✔ Example: "Shutter Speed" */
  ControlDialSet?: string;
  /** ☆☆☆☆   Example: 0 */
  ControllerBoardVersion?: number;
  /** ★★☆☆ ✔ Example: "n/a" */
  ControlMode?: string;
  /** ☆☆☆☆ ✔ Example: "High" */
  ControlRingResponse?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ControlRingRotation?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  ConversionLens?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  Converter?: number;
  /** ☆☆☆☆ ✔ Example: 72 */
  CoringFilter?: number;
  /** ☆☆☆☆   Example: 6807 */
  CorrelatedColorTemp?: number;
  /** ☆☆☆☆ ✔ Example: "1.02.00.06" */
  CPUFirmwareVersion?: string;
  /** ☆☆☆☆   Example: "d, 2009:09:04 03:19:07" */
  CPUVersions?: string;
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  CreativeStyle?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  CreativeStyleSetting?: string;
  /** ☆☆☆☆ ✔ Example: 48 */
  CropBottomMargin?: number;
  /** ☆☆☆☆ ✔ Example: 7776 */
  CropHeight?: number;
  /** ☆☆☆☆ ✔ Example: "Off (7424x4924 cropped to 7424x4924 at pixel 0,0)" */
  CropHiSpeed?: string;
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropLeftMargin?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  CropMode?: string;
  /** ☆☆☆☆ ✔ Example: 5792 */
  CroppedImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 3153968 */
  CroppedImageLeft?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  CroppedImageTop?: number;
  /** ☆☆☆☆ ✔ Example: 8688 */
  CroppedImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropRightMargin?: number;
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropTopMargin?: number;
  /** ☆☆☆☆ ✔ Example: 5184 */
  CropWidth?: number;
  /** ☆☆☆☆   Example: "Off" */
  CrossProcess?: string;
  /** ☆☆☆☆ ✔ Example: "20 0 19 2 0 65535 65535 65535 2 2 0 65535 65535 65535 18 … 4 5 31" */
  CustomControls?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 1 30 31 0 0 0 0 0 0 2 30 31 0 0 0 0 0 0 5 30 31 0 0 0…1 1 1 0" */
  CustomizeDials?: string;
  /** ☆☆☆☆ ✔ Example: "P-STUDIO" */
  CustomPictureStyleFileName?: string;
  /** ☆☆☆☆ ✔ Example: "CS3 (min CS0, max CS4)" */
  CustomSaturation?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  CustomSettingsAllDefault?: string;
  /** ☆☆☆☆ ✔ Example: "B" */
  CustomSettingsBank?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBBlueLevel?: number;
  /** ☆☆☆☆ ✔ Example: "OK" */
  CustomWBError?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBGreenLevel?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBRedLevel?: number;
  /** ☆☆☆☆ ✔ Example: "Setup" */
  CustomWBSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DarkFocusEnvironment?: string;
  /** ★★☆☆ ✔ Example: "(Binary data 280 bytes, use -b option to extract)" */
  DataDump?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 8289 */
  DataScaling?: number;
  /** ☆☆☆☆ ✔ Example: "2021:05:03" */
  Date?: ExifDate | string;
  /** ☆☆☆☆ ✔ Example: "Y/M/D" */
  DateDisplayFormat?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DateImprint?: string;
  /** ★★☆☆ ✔ Example: "Off" */
  DateStampMode?: string;
  /** ☆☆☆☆   Example: "Off" */
  DateTimeStamp?: string;
  /** ☆☆☆☆ ✔ Example: "2023:10:17 14:59:23" */
  DateTimeUTC?: ExifDateTime | string;
  /** ★☆☆☆ ✔ Example: "Yes" */
  DaylightSavings?: string;
  /** ☆☆☆☆   Example: "Unknown (27471)" */
  DECPosition?: string;
  /** ☆☆☆☆ ✔ Example: "Erase selected" */
  DefaultEraseOption?: string;
  /** ☆☆☆☆ ✔ Example: 3 */
  DeletedImageCount?: number;
  /** ☆☆☆☆ ✔ Example: "Warsaw" */
  DestinationCity?: string;
  /** ☆☆☆☆   Example: "    " */
  DestinationCityCode?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DestinationDST?: string;
  /** ☆☆☆☆ ✔ Example: "SMX Video Camera" */
  DeviceType?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  DialDirectionTvAv?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  DiffractionCompensation?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  DiffractionCorrection?: string;
  /** ☆☆☆☆   Example: "Vivid" */
  DigitalFilter?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  DigitalGain?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DigitalICE?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DigitalLensOptimizer?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  DigitalLensOptimizerSetting?: string;
  /** ★★★☆ ✔ Example: "undef.0" */
  DigitalZoom?: string;
  /** ☆☆☆☆ ✔ Example: 897 */
  DirectoryIndex?: number;
  /** ☆☆☆☆ ✔ Example: 999 */
  DirectoryNumber?: number;
  /** ☆☆☆☆ ✔ Example: "DISP - Cycle Information Display (shooting)" */
  DispButton?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  DisplayAllAFPoints?: string;
  /** ☆☆☆☆ ✔ Example: 9.5 */
  DisplayAperture?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DistortionControl?: string;
  /** ★☆☆☆ ✔ Example: "Unknown (60)" */
  DistortionCorrection?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  DistortionCorrectionSetting?: string;
  /** ☆☆☆☆ ✔ Example: 100 */
  DistortionCorrectionValue?: number;
  /** ☆☆☆☆ ✔ Example: "88 0 -136 -288 -480 -696 -944 -1200 -1480 -1752 -2040 0 0 0 0 0" */
  DistortionCorrParams?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  DistortionCorrParamsNumber?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DistortionCorrParamsPresent?: string;
  /** ☆☆☆☆ ✔ Example: "Single Frame" */
  DriveModeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  DriveSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "100.00.00.00" */
  DSPFirmwareVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DualPixelRaw?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 1024 bytes, use -b option to extract)" */
  DustRemovalData?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DXCropAlert?: string;
  /** ☆☆☆☆ ✔ Example: "9 Points" */
  DynamicAFArea?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  DynamicAreaAFAssist?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  DynamicAreaAFDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "Wide" */
  DynamicRange?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DynamicRangeBoost?: string;
  /** ☆☆☆☆ ✔ Example: "On; Enabled; 0; 0" */
  DynamicRangeExpansion?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizer?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  DynamicRangeOptimizerBracket?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  DynamicRangeOptimizerLevel?: number;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizerMode?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizerSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  DynamicRangeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  EasyExposureComp?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  EasyExposureCompensation?: string;
  /** ★★☆☆ ✔ Example: "Unknown (83)" */
  EasyMode?: string;
  /** ☆☆☆☆ ✔ Example: 9.8 */
  EffectiveLV?: number;
  /** ☆☆☆☆ ✔ Example: 5.7 */
  EffectiveMaxAperture?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  ElectronicFrontCurtainShutter?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  EnergySavingMode?: string;
  /** ☆☆☆☆   Example: "Off" */
  Enhancement?: string;
  /** ☆☆☆☆ ✔ Example: 960 */
  Enhancer?: number;
  /** ☆☆☆☆   Example: 480 */
  EpsonImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 640 */
  EpsonImageWidth?: number;
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  EpsonSoftware?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  EquipmentVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Evaluative" */
  ETTLII?: string;
  /** ☆☆☆☆   Example: 89 */
  EventNumber?: number;
  /** ☆☆☆☆ ✔ Example: "1/3 EV Steps" */
  EVSteps?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  EVStepSize?: string;
  /** ☆☆☆☆ ✔ Example: "97.5 mm" */
  ExitPupilPosition?: string;
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  ExposureBracketingIndicatorLast?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureBracketShotNumber?: number;
  /** ☆☆☆☆ ✔ Example: 0.5 */
  ExposureBracketStepSize?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureBracketValue?: number;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ExposureCompAutoCancel?: string;
  /** ☆☆☆☆ ✔ Example: "Ambient and Flash" */
  ExposureCompensationMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureCompensationSet?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureCompensationSetting?: number;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureCompStepSize?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureControlStep?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureControlStepSize?: string;
  /** ★☆☆☆ ✔ Example: 1 */
  ExposureCount?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  ExposureDelayMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureDifference?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureIndicator?: number;
  /** ☆☆☆☆ ✔ Example: "1/3-stop set, 1/3-stop comp." */
  ExposureLevelIncrements?: string;
  /** ☆☆☆☆ ✔ Example: "Spot metering" */
  ExposureModeInManual?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureShift?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureStandardAdjustment?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureTuning?: number;
  /** ★☆☆☆ ✔ Example: "Good" */
  ExposureWarning?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  EXRAuto?: string;
  /** ☆☆☆☆ ✔ Example: "HR (High Resolution)" */
  EXRMode?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ExtendedMenuBanks?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ExtendedShutterSpeeds?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ExtendedWBDetect?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  Extender?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExtenderFirmwareVersion?: number;
  /** ☆☆☆☆ ✔ Example: "" */
  ExtenderModel?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  ExtenderSerialNumber?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ExternalFlash?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashBounce?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashCompensation?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashExposureComp?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashFirmware?: string;
  /** ☆☆☆☆ ✔ Example: "(none)" */
  ExternalFlashFlags?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashGuideNumber?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashGValue?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  ExternalFlashMode?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashReadyState?: string;
  /** ☆☆☆☆ ✔ Example: "Flash Not Attached" */
  ExternalFlashStatus?: string;
  /** ☆☆☆☆ ✔ Example: 54 */
  ExternalFlashZoom?: number;
  /** ☆☆☆☆ ✔ Example: "No" */
  ExternalFlashZoomOverride?: string;
  /** ☆☆☆☆   Example: 9.14 */
  ExternalSensorBrightnessValue?: number;
  /** ☆☆☆☆ ✔ Example: "0.2.0.0" */
  ExtraInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  EyeDetection?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  EyeStartAF?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (II*)" */
  FaceDetect?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 383 bytes, use -b option to extract)" */
  FaceDetectArea?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "0 26 640 428 0 26 640 428 0 0 0 0" */
  FaceDetectFrameCrop?: string;
  /** ★☆☆☆ ✔ Example: "720 480" */
  FaceDetectFrameSize?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  FaceDetection?: string;
  /** ☆☆☆☆ ✔ Example: "918 1058 1959 2101" */
  FaceElementPositions?: string;
  /** ☆☆☆☆ ✔ Example: "892 917 2131 2135" */
  FaceElementSelected?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (4096)" */
  FaceElementTypes?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  FaceInfoLength?: number;
  /** ☆☆☆☆ ✔ Example: 94 */
  FaceInfoOffset?: number;
  /** ☆☆☆☆ ✔ Example: "" */
  FaceName?: string;
  /** ☆☆☆☆   Example: "67 23" */
  FacePosition?: string;
  /** ☆☆☆☆ ✔ Example: "918 1058 1959 2101" */
  FacePositions?: string;
  /** ★★★☆ ✔ Example: 65535 */
  FacesDetected?: number;
  /** ☆☆☆☆ ✔ Example: 12336 */
  FacesRecognized?: number;
  /** ☆☆☆☆ ✔ Example: 35 */
  FaceWidth?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  Fade?: number;
  /** ☆☆☆☆ ✔ Example: "Enable; 0; 8; 0" */
  FEMicroadjustment?: string;
  /** ☆☆☆☆ ✔ Example: "X3F" */
  FileFormat?: string;
  /** ☆☆☆☆ ✔ Example: 9984 */
  FileIndex?: number;
  /** ☆☆☆☆ ✔ Example: "0100" */
  FileInfoVersion?: string;
  /** ★★☆☆ ✔ Example: "986-8698" */
  FileNumber?: string;
  /** ☆☆☆☆   Example: "Unknown (65537)" */
  FileNumberMemory?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  FileNumberSequence?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  FillFlashAutoReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FilmGrainEffect?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilmMode?: string;
  /** ☆☆☆☆ ✔ Example: "NEGATIVE(MONO) " */
  FilmType?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilterEffect?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilterEffectAuto?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  FinderDisplayDuringExposure?: string;
  /** ☆☆☆☆ ✔ Example: "On; Normal" */
  FineSharpness?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptCenterWeighted?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptHighlightWeighted?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptMatrixMetering?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptSpotMetering?: number;
  /** ☆☆☆☆   Example: "2015:11:09 08:38" */
  FirmwareDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "NX1_000000" */
  FirmwareName?: string;
  /** ★☆☆☆ ✔ Example: "Rev01500000" */
  FirmwareRevision?: string;
  /** ★☆☆☆ ✔ Example: "v2.2.16" */
  FirmwareVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FisheyeFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Fired" */
  FlashAction?: string;
  /** ☆☆☆☆ ✔ Example: "Did not fire" */
  FlashActionExternal?: string;
  /** ☆☆☆☆ ✔ Example: 255 */
  FlashActivity?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashBatteryLevel?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashBias?: number;
  /** ★★☆☆ ✔ Example: "Manual, External" */
  FlashBits?: string;
  /** ☆☆☆☆ ✔ Example: "Raise built-in flash" */
  FlashButtonFunction?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashChargeLevel?: number;
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashColorFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashCommanderMode?: string;
  /** ☆☆☆☆ ✔ Example: "Pre-flash TTL" */
  FlashControl?: string;
  /** ☆☆☆☆ ✔ Example: "iTTL-BL" */
  FlashControlMode?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashCurtain?: string;
  /** ☆☆☆☆ ✔ Example: "Fill Flash" */
  FlashDefault?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0 0)" */
  FlashDevice?: string;
  /** ☆☆☆☆   Example: 53 */
  FlashDistance?: number;
  /** ☆☆☆☆ ✔ Example: 0.3 */
  FlashExposureBracketValue?: number;
  /** ★★★☆ ✔ Example: 10 */
  FlashExposureComp?: number;
  /** ☆☆☆☆ ✔ Example: "Entire frame" */
  FlashExposureCompArea?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashExposureCompSet?: number;
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicator?: string;
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicatorLast?: string;
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicatorNext?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashExposureLock?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  FlashFired?: string;
  /** ☆☆☆☆ ✔ Example: "Fires" */
  FlashFiring?: string;
  /** ☆☆☆☆ ✔ Example: 1.005 */
  FlashFirmwareVersion?: number;
  /** ☆☆☆☆ ✔ Example: "12 mm" */
  FlashFocalLength?: string;
  /** ☆☆☆☆ ✔ Example: "No flash" */
  FlashFunction?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGNDistance?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupACompensation?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupAControlMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupBCompensation?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupBControlMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupCCompensation?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupCControlMode?: string;
  /** ★★☆☆ ✔ Example: 9 */
  FlashGuideNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  FlashIlluminationPattern?: string;
  /** ☆☆☆☆ ✔ Example: "0301" */
  FlashInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "n/a (x4)" */
  FlashIntensity?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashLevel?: string;
  /** ☆☆☆☆ ✔ Example: "TTL" */
  FlashMasterControlMode?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (65797)" */
  FlashMetering?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashMeteringMode?: string;
  /** ☆☆☆☆ ✔ Example: "18.0 18.5 20.0 20.0 20.0 20.0 20.0 20.0 20.0 18.6 18.0 18….2 19.0" */
  FlashMeteringSegments?: string;
  /** ★★☆☆ ✔ Example: "Unknown (c2)" */
  FlashMode?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashModel?: string;
  /** ☆☆☆☆ ✔ Example: "Red-eye reduction" */
  FlashOptions?: string;
  /** ★☆☆☆ ✔ Example: 94 */
  FlashOutput?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashRemoteControl?: string;
  /** ☆☆☆☆ ✔ Example: "01114671" */
  FlashSerialNumber?: string;
  /** ★☆☆☆ ✔ Example: "Uw-Normal" */
  FlashSetting?: string;
  /** ☆☆☆☆ ✔ Example: "1/64" */
  FlashShutterSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashSource?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashStatus?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashStatusExternal?: string;
  /** ☆☆☆☆   Example: "Front curtain" */
  FlashSyncMode?: string;
  /** ☆☆☆☆ ✔ Example: "1/250 s (auto FP)" */
  FlashSyncSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  FlashSyncSpeedAv?: string;
  /** ☆☆☆☆ ✔ Example: 8.5 */
  FlashThreshold?: number;
  /** ☆☆☆☆ ✔ Example: "Yes (flash required but disabled)" */
  FlashWarning?: string;
  /** ☆☆☆☆ ✔ Example: "320 262" */
  FlexibleSpotPosition?: string;
  /** ☆☆☆☆ ✔ Example: "Left to Right" */
  FlickAdvanceDirection?: string;
  /** ☆☆☆☆   Example: "On" */
  FlickerReduce?: string;
  /** ☆☆☆☆ ✔ Example: "Off (0x3223)" */
  FlickerReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlickerReductionIndicator?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlickerReductionShooting?: string;
  /** ☆☆☆☆   Example: "1321,81,37" */
  FlightDegree?: string;
  /** ☆☆☆☆   Example: "9,0,0" */
  FlightSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "70.0 mm" */
  FocalLengthTeleZoom?: string;
  /** ☆☆☆☆ ✔ Example: "640 428" */
  FocalPlaneAFPointArea?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  FocalPlaneAFPointsUsed?: number;
  /** ★☆☆☆ ✔ Example: "9.45 mm" */
  FocalPlaneDiagonal?: string;
  /** ★☆☆☆ ✔ Example: "9.02 mm" */
  FocalPlaneXSize?: string;
  /** ★☆☆☆ ✔ Example: "8.10 mm" */
  FocalPlaneYSize?: string;
  /** ★☆☆☆ ✔ Example: "Zoom" */
  FocalType?: string;
  /** ★★☆☆ ✔ Example: "32/mm" */
  FocalUnits?: string;
  /** ☆☆☆☆   Example: "Wide Focus (normal)" */
  FocusArea?: string;
  /** ☆☆☆☆ ✔ Example: "No Wrap" */
  FocusAreaSelection?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FocusBracket?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  FocusBracketStepSize?: number;
  /** ★☆☆☆ ✔ Example: "Single" */
  FocusContinuous?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  FocusDisplayAIServoAndMF?: string;
  /** ☆☆☆☆ ✔ Example: "7.68 - 36.90 m" */
  FocusDistanceRange?: string;
  /** ☆☆☆☆ ✔ Example: "475x476" */
  FocusFrameSize?: string;
  /** ☆☆☆☆ ✔ Example: "Focus Hold" */
  FocusHoldButton?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  FocusInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Eh-A" */
  FocusingScreen?: string;
  /** ☆☆☆☆ ✔ Example: "9504 6336 6029 2587" */
  FocusLocation?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  FocusLocked?: string;
  /** ★★★☆ ✔ Example: "Unknown (860272)" */
  FocusMode?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  FocusModeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "AF" */
  FocusModeSwitch?: string;
  /** ☆☆☆☆ ✔ Example: "Red" */
  FocusPeakingHighlightColor?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FocusPeakingLevel?: string;
  /** ★☆☆☆ ✔ Example: "972 1296" */
  FocusPixel?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  FocusPointPersistence?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FocusPointSchema?: string;
  /** ☆☆☆☆   Example: "Normal" */
  FocusPointSelectionSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Wrap" */
  FocusPointWrap?: string;
  /** ☆☆☆☆ ✔ Example: 999 */
  FocusPosition?: number;
  /** ☆☆☆☆ ✔ Example: "C" */
  FocusPositionHorizontal?: string;
  /** ☆☆☆☆ ✔ Example: "C" */
  FocusPositionVertical?: string;
  /** ☆☆☆☆ ✔ Example: "AF Used; 96" */
  FocusProcess?: string;
  /** ★★☆☆ ✔ Example: "Unknown (2)" */
  FocusRange?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  FocusRangeIndex?: number;
  /** ☆☆☆☆ ✔ Example: "Focus" */
  FocusResult?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  FocusRingRotation?: string;
  /** ☆☆☆☆   Example: "M" */
  FocusSetting?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  FocusShiftExposureLock?: string;
  /** ☆☆☆☆ ✔ Example: "3 Seconds" */
  FocusShiftInterval?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  FocusShiftNumberShots?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FocusShiftShooting?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  FocusShiftStepWidth?: number;
  /** ☆☆☆☆ ✔ Example: "Not confirmed, Tracking" */
  FocusStatus?: string;
  /** ☆☆☆☆ ✔ Example: 9713 */
  FocusStepInfinity?: number;
  /** ☆☆☆☆ ✔ Example: 9804 */
  FocusStepNear?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FocusTrackingLockOn?: string;
  /** ★☆☆☆ ✔ Example: "Out of focus" */
  FocusWarning?: string;
  /** ☆☆☆☆   Example: "Standard Form" */
  FolderName?: string;
  /** ☆☆☆☆ ✔ Example: 373 */
  FolderNumber?: number;
  /** ☆☆☆☆ ✔ Example: 849 */
  FrameNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  FramingGridDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 12 bytes, use -b option to extract)" */
  FreeBytes?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 805 */
  FreeMemoryCardImages?: number;
  /** ★☆☆☆ ✔ Example: "Red-eye reduction" */
  FujiFlashMode?: string;
  /** ☆☆☆☆ ✔ Example: "X100V_0100" */
  FujiModel?: string;
  /** ☆☆☆☆ ✔ Example: "9504x6336" */
  FullImageSize?: string;
  /** ☆☆☆☆   Example: "Off" */
  FullPressSnap?: string;
  /** ☆☆☆☆ ✔ Example: "Zoom (High)" */
  Func1Button?: string;
  /** ☆☆☆☆ ✔ Example: "Choose Image Area (DX/1.3x)" */
  Func1ButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  Func2Button?: string;
  /** ☆☆☆☆   Example: "Voice Memo" */
  Func3Button?: string;
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  FuncButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  FuncButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "ISO Display" */
  FunctionButton?: string;
  /** ☆☆☆☆ ✔ Example: 256 */
  GainBase?: number;
  /** ☆☆☆☆   Example: "4320x3240" */
  GEImageSize?: string;
  /** ☆☆☆☆   Example: "GEDSC DIGITAL CAMERA           " */
  GEMake?: string;
  /** ☆☆☆☆   Example: "J1470S" */
  GEModel?: string;
  /** ☆☆☆☆   Example: "1279,-900,0" */
  GimbalDegree?: string;
  /** ☆☆☆☆ ✔ Example: "n/a; User-Selected" */
  Gradation?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  GrainEffectRoughness?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  GrainEffectSize?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  GrainyBWFilter?: string;
  /** ☆☆☆☆   Example: "2E" */
  GreenGain?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  GridDisplay?: string;
  /** ☆☆☆☆ ✔ Example: 157 */
  GripBatteryADLoad?: number;
  /** ☆☆☆☆ ✔ Example: 5 */
  GripBatteryADNoLoad?: number;
  /** ☆☆☆☆ ✔ Example: "Empty or Missing" */
  GripBatteryState?: string;
  /** ☆☆☆☆ ✔ Example: "Squares" */
  GroupAreaAFIllumination?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (5)" */
  HDMIBitDepth?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  HDMIExternalRecorder?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  HDMIOutputRange?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  HDMIOutputResolution?: string;
  /** ★☆☆☆ ✔ Example: "On (normal)" */
  HDR?: string;
  /** ☆☆☆☆ ✔ Example: "Natural" */
  HDREffect?: string;
  /** ☆☆☆☆ ✔ Example: 1.7904162 */
  HDRGain?: number;
  /** ☆☆☆☆ ✔ Example: 1.568873 */
  HDRHeadroom?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  HDRImageType?: string;
  /** ☆☆☆☆ ✔ Example: "0200" */
  HDRInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HDRLevel?: string;
  /** ☆☆☆☆ ✔ Example: "On (Manual)" */
  HDRSetting?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HDRSmoothing?: string;
  /** ☆☆☆☆   Example: 53248 */
  HiddenDataLength?: number;
  /** ☆☆☆☆   Example: 7995392 */
  HiddenDataOffset?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  HighFrameRate?: string;
  /** ★☆☆☆ ✔ Example: "n/a" */
  HighISONoiseReduction?: string;
  /** ☆☆☆☆   Example: 0.1 */
  Highlight?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  Highlights?: number;
  /** ☆☆☆☆ ✔ Example: "0 0" */
  HighlightShadow?: string;
  /** ☆☆☆☆ ✔ Example: "0 (normal)" */
  HighlightTone?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  HighlightTonePriority?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HighlightWarning?: string;
  /** ☆☆☆☆   Example: 4 */
  HighLowKeyAdj?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  HighSpeedSync?: string;
  /** ☆☆☆☆   Example: "disable, " */
  Histogram?: string;
  /** ☆☆☆☆ ✔ Example: "ndon" */
  HometownCity?: string;
  /** ☆☆☆☆   Example: "NYC " */
  HometownCityCode?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HometownDST?: string;
  /** ☆☆☆☆   Example: 2 */
  HostSoftwareExportVersion?: number;
  /** ☆☆☆☆   Example: "Unknown (4 4)" */
  HostSoftwareRendering?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  Hue?: string;
  /** ☆☆☆☆   Example: "Off" */
  HueAdjust?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HueAdjustment?: string;
  /** ☆☆☆☆   Example: "(Binary data 8 bytes, use -b option to extract)" */
  HyperlapsDebugInfo?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  Illumination?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ImageAdjustment?: string;
  /** ☆☆☆☆ ✔ Example: "FX (36x24)" */
  ImageArea?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ImageAuthentication?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 8256 5504" */
  ImageBoundary?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (5)" */
  ImageCaptureType?: string;
  /** ☆☆☆☆ ✔ Example: 994 */
  ImageCount?: number;
  /** ☆☆☆☆ ✔ Example: 9927271 */
  ImageDataSize?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  ImageEditCount?: number;
  /** ☆☆☆☆ ✔ Example: "Red-eye Correction" */
  ImageEditing?: string;
  /** ☆☆☆☆   Example: "Standard" */
  ImageEffects?: string;
  /** ☆☆☆☆ ✔ Example: "Re-developed from RAW" */
  ImageGeneration?: string;
  /** ☆☆☆☆   Example: 912 */
  ImageIDNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ImageOptimization?: string;
  /** ☆☆☆☆ ✔ Example: "Red Eye Ruduction ;" */
  ImageProcessing?: string;
  /** ☆☆☆☆ ✔ Example: "0112" */
  ImageProcessingVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Very High" */
  ImageQuality?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ImageReview?: string;
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ImageReviewMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ImageReviewTime?: string;
  /** ☆☆☆☆   Example: "No" */
  ImageRotated?: string;
  /** ☆☆☆☆ ✔ Example: "Small" */
  ImageSizeRAW?: string;
  /** ★★★☆ ✔ Example: "n/a" */
  ImageStabilization?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ImageStabilizationSetting?: string;
  /** ☆☆☆☆ ✔ Example: "StyleBox2" */
  ImageStyle?: string;
  /** ☆☆☆☆   Example: 94 */
  ImageTemperatureMax?: number;
  /** ☆☆☆☆   Example: 86 */
  ImageTemperatureMin?: number;
  /** ☆☆☆☆ ✔ Example: "Vibrant" */
  ImageTone?: string;
  /** ★☆☆☆ ✔ Example: "fefafc6093e2c1470ac8dfa06ef26990" */
  ImageUniqueID?: string;
  /** ☆☆☆☆ ✔ Example: "Displays shooting functions" */
  InfoButtonWhenShooting?: string;
  /** ☆☆☆☆   Example: "On" */
  InfraredIlluminator?: string;
  /** ☆☆☆☆ ✔ Example: "Manual AF point" */
  InitialAFPointAIServoAF?: string;
  /** ☆☆☆☆ ✔ Example: "Initial AF Point Selected" */
  InitialAFPointInServo?: string;
  /** ☆☆☆☆ ✔ Example: "Low Magnification" */
  InitialZoomLiveView?: string;
  /** ☆☆☆☆ ✔ Example: "Medium Magnification" */
  InitialZoomSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Image Only" */
  InstantPlaybackSetup?: string;
  /** ☆☆☆☆ ✔ Example: "5 s" */
  InstantPlaybackTime?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  IntelligentAuto?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  IntelligentContrast?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  IntelligentExposure?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  IntelligentResolution?: string;
  /** ☆☆☆☆ ✔ Example: "TTL" */
  InternalFlash?: string;
  /** ☆☆☆☆ ✔ Example: "Did not fire, Red-eye reduction" */
  InternalFlashMode?: string;
  /** ☆☆☆☆ ✔ Example: 63 */
  InternalFlashStrength?: number;
  /** ☆☆☆☆ ✔ Example: 95 */
  InternalFlashTable?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  InternalNDFilter?: number;
  /** ★★☆☆ ✔ Example: "fdfec409" */
  InternalSerialNumber?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  IntervalDurationHours?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  IntervalDurationMinutes?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  IntervalDurationSeconds?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  IntervalExposureSmoothing?: string;
  /** ☆☆☆☆   Example: 65542 */
  IntervalLength?: number;
  /** ☆☆☆☆   Example: "Still Image" */
  IntervalMode?: string;
  /** ☆☆☆☆   Example: 65797 */
  IntervalNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  IntervalPriority?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  Intervals?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  IntervalShooting?: string;
  /** ☆☆☆☆ ✔ Example: 800 */
  ISO2?: number;
  /** ☆☆☆☆   Example: "On" */
  ISOAuto?: string;
  /** ☆☆☆☆ ✔ Example: "Same As Without Flash" */
  ISOAutoFlashLimit?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0x6)" */
  ISOAutoHiLimit?: string;
  /** ☆☆☆☆ ✔ Example: 800 */
  ISOAutoMax?: number;
  /** ☆☆☆☆ ✔ Example: 80 */
  ISOAutoMin?: number;
  /** ☆☆☆☆   Example: "Shutter Speed Control; 1/32" */
  ISOAutoMinSpeed?: string;
  /** ☆☆☆☆ ✔ Example: "Auto (Faster)" */
  ISOAutoShutterTime?: string;
  /** ☆☆☆☆ ✔ Example: "Show Frame Count" */
  ISODisplay?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ISOExpansion?: string;
  /** ☆☆☆☆ ✔ Example: 800 */
  ISOFloor?: number;
  /** ☆☆☆☆   Example: "Auto" */
  ISOSelected?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  ISOSelection?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ISOSensitivityStep?: string;
  /** ☆☆☆☆ ✔ Example: 90 */
  ISOSetting?: number;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ISOSpeedExpansion?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 Stop" */
  ISOSpeedIncrements?: string;
  /** ☆☆☆☆ ✔ Example: "Enable; Max 3200; Min 1" */
  ISOSpeedRange?: string;
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ISOStepSize?: string;
  /** ☆☆☆☆ ✔ Example: 79.44 */
  ISOValue?: number;
  /** ☆☆☆☆ ✔ Example: "n/a (Movie)" */
  JPEGQuality?: string;
  /** ☆☆☆☆ ✔ Example: "Size Priority" */
  JPGCompression?: string;
  /** ☆☆☆☆ ✔ Example: "10 MP" */
  JpgRecordedPixels?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  KeepExposure?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  KeystoneCompensation?: string;
  /** ☆☆☆☆ ✔ Example: "Vertical" */
  KeystoneDirection?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  KeystoneValue?: string;
  /** ☆☆☆☆   Example: 864 */
  KodakImageHeight?: number;
  /** ☆☆☆☆   Example: 800 */
  KodakImageWidth?: number;
  /** ☆☆☆☆   Example: "SKodakCommonInfo Jaguar7" */
  KodakInfoType?: string;
  /** ☆☆☆☆   Example: "Kodak                           " */
  KodakMake?: string;
  /** ☆☆☆☆   Example: "PENTAX" */
  KodakMaker?: string;
  /** ☆☆☆☆   Example: "Z760    " */
  KodakModel?: string;
  /** ☆☆☆☆   Example: "1.0.0.0" */
  KodakVersion?: string;
  /** ☆☆☆☆ ✔ Example: "English" */
  Language?: string;
  /** ☆☆☆☆   Example: 92 */
  LastFileNumber?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  LateralChromaticAberration?: string;
  /** ☆☆☆☆ ✔ Example: "Retain power off status" */
  LCDDisplayAtPowerOn?: string;
  /** ☆☆☆☆ ✔ Example: "With Shutter Button only" */
  LCDDisplayReturnToShoot?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  LCDIllumination?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  LCDIlluminationDuringBulb?: string;
  /** ☆☆☆☆ ✔ Example: "Remain. shots/File no." */
  LCDPanels?: string;
  /** ☆☆☆☆   Example: "4.0 to 22" */
  LensApertureRange?: string;
  /** ☆☆☆☆ ✔ Example: "None (Disabled)" */
  LensControlRing?: string;
  /** ☆☆☆☆ ✔ Example: "0802" */
  LensDataVersion?: string;
  /** ☆☆☆☆ ✔ Example: "97 154 172 70 104 114" */
  LensDistortionParams?: string;
  /** ☆☆☆☆ ✔ Example: "Focus search on" */
  LensDriveNoAF?: string;
  /** ☆☆☆☆ ✔ Example: "Continue Focus Search" */
  LensDriveWhenAFImpossible?: string;
  /** ☆☆☆☆   Example: "RL8 :V01390000 " */
  LensFirmware?: string;
  /** ☆☆☆☆ ✔ Example: "Ver.04.000" */
  LensFirmwareVersion?: string;
  /** ☆☆☆☆ ✔ Example: "70.0 mm" */
  LensFocalLength?: string;
  /** ☆☆☆☆   Example: "50 to 50" */
  LensFocalRange?: string;
  /** ☆☆☆☆ ✔ Example: "AF Lock Only" */
  LensFocusFunctionButtons?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (72)" */
  LensFormat?: string;
  /** ☆☆☆☆ ✔ Example: 8.67 */
  LensFStops?: number;
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  LensFunc1Button?: string;
  /** ☆☆☆☆ ✔ Example: "AF-On" */
  LensFunc2Button?: string;
  /** ☆☆☆☆ ✔ Example: 93 */
  LensIDNumber?: number;
  /** ☆☆☆☆   Example: "4 to 4" */
  LensMaxApertureRange?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  LensModulationOptimizer?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (74)" */
  LensMount?: string;
  /** ☆☆☆☆ ✔ Example: "Z-mount" */
  LensMountType?: string;
  /** ☆☆☆☆ ✔ Example: 91 */
  LensPositionAbsolute?: number;
  /** ☆☆☆☆ ✔ Example: "0xe253" */
  LensProperties?: string;
  /** ☆☆☆☆   Example: "Xcenter=1456 Ycenter=1068  GainMax=16" */
  LensShading?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  LensShutterLock?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (00 0 0 0 0 00)" */
  LensSpec?: string;
  /** ☆☆☆☆ ✔ Example: "ZA SSM II" */
  LensSpecFeatures?: string;
  /** ☆☆☆☆ ✔ Example: 35 */
  LensTemperature?: number;
  /** ★★☆☆ ✔ Example: "smc PENTAX-FA 28-105mm F3.2-4.5 AL[IF]" */
  LensType?: string;
  /** ☆☆☆☆   Example:  */
  LensType2?: string;
  /** ☆☆☆☆   Example:  */
  LensType3?: string;
  /** ☆☆☆☆ ✔ Example: 2 */
  LensTypeMake?: number;
  /** ☆☆☆☆ ✔ Example: "41 10" */
  LensTypeModel?: string;
  /** ☆☆☆☆ ✔ Example: "98%" */
  LensZoomPosition?: string;
  /** ☆☆☆☆   Example: 250 */
  LevelIndicator?: number;
  /** ☆☆☆☆   Example: "n/a" */
  LevelOrientation?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  LightCondition?: number;
  /** ☆☆☆☆   Example: "Shadow Enhance Low" */
  LightingMode?: string;
  /** ☆☆☆☆   Example: "Unknown (512)" */
  LightSourceSpecial?: string;
  /** ☆☆☆☆ ✔ Example: "LCD Backlight and Shooting Information" */
  LightSwitch?: string;
  /** ☆☆☆☆ ✔ Example: 8.546875 */
  LightValueCenter?: number;
  /** ☆☆☆☆ ✔ Example: 7.796875 */
  LightValuePeriphery?: number;
  /** ☆☆☆☆ ✔ Example: "No Restrictions" */
  LimitAFAreaModeSelection?: string;
  /** ☆☆☆☆ ✔ Example: 175 */
  LinearityUpperMargin?: number;
  /** ☆☆☆☆   Example: "Off" */
  LinkAEToAFPoint?: string;
  /** ☆☆☆☆ ✔ Example: 8595224600 */
  LivePhotoVideoIndex?: number;
  /** ☆☆☆☆   Example: "On" */
  LiveView?: string;
  /** ☆☆☆☆ ✔ Example: "Wide Area" */
  LiveViewAF?: string;
  /** ☆☆☆☆ ✔ Example: "Face-Priority" */
  LiveViewAFAreaMode?: string;
  /** ☆☆☆☆ ✔ Example: "Phase-detect AF" */
  LiveViewAFMethod?: string;
  /** ☆☆☆☆ ✔ Example: "AF-C" */
  LiveViewAFMode?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  LiveViewButtonOptions?: string;
  /** ☆☆☆☆ ✔ Example: "Enable (simulates exposure)" */
  LiveViewExposureSimulation?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  LiveViewFocusMode?: string;
  /** ☆☆☆☆ ✔ Example: "40 Segment" */
  LiveViewMetering?: string;
  /** ☆☆☆☆ ✔ Example: "3 min" */
  LiveViewMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  LiveViewShooting?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  LocalLocationName?: string;
  /** ☆☆☆☆ ✔ Example: ":99:99 00:00:00" */
  Location?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  LocationInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  LocationName?: string;
  /** ☆☆☆☆ ✔ Example: "Protect (hold:record memo); 31" */
  LockMicrophoneButton?: string;
  /** ★☆☆☆ ✔ Example: "n/a" */
  LongExposureNoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  LongExposureNRUsed?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  LowLightAF?: string;
  /** ☆☆☆☆ ✔ Example: 0.014752804 */
  LuminanceNoiseAmplitude?: number;
  /** ☆☆☆☆   Example: "+0.500" */
  LuminanceNoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Masked" */
  LVShootingAreaDisplay?: string;
  /** ☆☆☆☆   Example: 0 */
  M16CVersion?: number;
  /** ★★☆☆ ✔ Example: "Unknown (3)" */
  Macro?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MacroLED?: string;
  /** ★★☆☆ ✔ Example: "Unknown (852023)" */
  MacroMode?: string;
  /** ☆☆☆☆ ✔ Example: "Soft Focus 2; 1280; 0; 0" */
  MagicFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Image playback only" */
  MagnifiedView?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MainDialExposureComp?: string;
  /** ☆☆☆☆   Example: 916 */
  MakerNoteOffset?: number;
  /** ☆☆☆☆   Example: "Rdc" */
  MakerNoteType?: string;
  /** ★★☆☆ ✔ Example: "mlt0" */
  MakerNoteVersion?: string;
  /** ☆☆☆☆ ✔ Example: "98 kPa" */
  ManometerPressure?: string;
  /** ☆☆☆☆ ✔ Example: "400 m, 1320 ft" */
  ManometerReading?: string;
  /** ☆☆☆☆ ✔ Example: "Stops at AF area edges" */
  ManualAFPointSelectPattern?: string;
  /** ☆☆☆☆ ✔ Example: "Stops at AF Area Edges" */
  ManualAFPointSelPattern?: string;
  /** ☆☆☆☆ ✔ Example: "On (1/64 strength)" */
  ManualFlash?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  ManualFlashOutput?: string;
  /** ☆☆☆☆ ✔ Example: "n/a (x4)" */
  ManualFlashStrength?: string;
  /** ☆☆☆☆ ✔ Example: "inf" */
  ManualFocusDistance?: string;
  /** ☆☆☆☆ ✔ Example: "On During Focus Point Selection Only" */
  ManualFocusPointIllumination?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ManualFocusRingInAFMode?: string;
  /** ☆☆☆☆ ✔ Example: "Tv=Main/Av=Control" */
  ManualTv?: string;
  /** ☆☆☆☆ ✔ Example: "2021:03:17" */
  ManufactureDate?: ExifDate | string;
  /** ☆☆☆☆ ✔ Example: 0 */
  MasterGain?: number;
  /** ☆☆☆☆ ✔ Example: "Face Detection On" */
  MatrixMetering?: string;
  /** ★★☆☆ ✔ Example: 7.3 */
  MaxAperture?: number;
  /** ☆☆☆☆ ✔ Example: 6.7 */
  MaxApertureAtMaxFocal?: number;
  /** ☆☆☆☆ ✔ Example: 5.7 */
  MaxApertureAtMinFocal?: number;
  /** ☆☆☆☆ ✔ Example: 200 */
  MaxContinuousRelease?: number;
  /** ☆☆☆☆ ✔ Example: "8 8 8" */
  MaxFaces?: string;
  /** ★★☆☆ ✔ Example: "96.2 mm" */
  MaxFocalLength?: string;
  /** ☆☆☆☆ ✔ Example: "Bulgaria (284)" */
  MCCData?: string;
  /** ☆☆☆☆ ✔ Example: 99 */
  MCUVersion?: number;
  /** ★★☆☆ ✔ Example: 9.97 */
  MeasuredEV?: number;
  /** ☆☆☆☆ ✔ Example: 9.375 */
  MeasuredLV?: number;
  /** ☆☆☆☆ ✔ Example: "988 1024 1024 636" */
  MeasuredRGGB?: string;
  /** ☆☆☆☆ ✔ Example: "6653 9252 9606 4468" */
  MeasuredRGGBData?: string;
  /** ☆☆☆☆ ✔ Example: 7 */
  MechanicalShutterCount?: number;
  /** ☆☆☆☆ ✔ Example: "High (48 kHz)" */
  MemoAudioQuality?: string;
  /** ☆☆☆☆ ✔ Example: "SD card in use, MemoryStick slot empty" */
  MemoryCardConfiguration?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  MemoryCardNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Previous (top if power off)" */
  MenuButtonDisplayPosition?: string;
  /** ☆☆☆☆ ✔ Example: "Top" */
  MenuButtonReturn?: string;
  /** ☆☆☆☆ ✔ Example: "20 s" */
  MenuMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  MergedImages?: number;
  /** ☆☆☆☆ ✔ Example: "THm211000000000" */
  MetaVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Matrix" */
  Metering?: string;
  /** ☆☆☆☆ ✔ Example: "Within Range" */
  MeteringOffScaleIndicator?: string;
  /** ☆☆☆☆ ✔ Example: "8 s" */
  MeteringTime?: string;
  /** ☆☆☆☆   Example: "Matrix metering" */
  MeterMode?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MidRangeSharpness?: string;
  /** ★★☆☆ ✔ Example: 9.8 */
  MinAperture?: number;
  /** ★★☆☆ ✔ Example: "90.0 mm" */
  MinFocalLength?: string;
  /** ☆☆☆☆ ✔ Example: "2.0 m" */
  MinFocusDistance?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MiniatureFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (-1)" */
  MiniatureFilterOrientation?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  MiniatureFilterParameter?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  MiniatureFilterPosition?: number;
  /** ☆☆☆☆ ✔ Example: 80 */
  MinimumISO?: number;
  /** ☆☆☆☆   Example: "2004:07:05" */
  MinoltaDate?: ExifDate | string;
  /** ☆☆☆☆   Example: "Unknown (768)" */
  MinoltaImageSize?: string;
  /** ☆☆☆☆   Example: "DiMAGE S404" */
  MinoltaModelID?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  MinoltaQuality?: string;
  /** ☆☆☆☆   Example: "20:16:39" */
  MinoltaTime?: ExifTime | string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  MirrorLockup?: string;
  /** ☆☆☆☆ ✔ Example: "Manual" */
  ModeDialPosition?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ModelingFlash?: string;
  /** ☆☆☆☆ ✔ Example: 2018 */
  ModelReleaseYear?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedColorTemp?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedDigitalGain?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedParamFlag?: number;
  /** ☆☆☆☆ ✔ Example: "None" */
  ModifiedPictureStyle?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ModifiedSaturation?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSensorBlueLevel?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSensorRedLevel?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSharpness?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ModifiedSharpnessFreq?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  ModifiedToneCurve?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  ModifiedWhiteBalance?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedWhiteBalanceBlue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedWhiteBalanceRed?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  MonitorBrightness?: number;
  /** ☆☆☆☆ ✔ Example: "Automatic" */
  MonitorDisplayOff?: string;
  /** ☆☆☆☆ ✔ Example: "8 s" */
  MonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "(none)" */
  MonochromeColor?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MonochromeGrainEffect?: string;
  /** ☆☆☆☆ ✔ Example: "No Filter; 0; 8; Strength 2; 0; 3" */
  MonochromeProfileSettings?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MonochromeToning?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  MonochromeVignetting?: number;
  /** ☆☆☆☆   Example: "12:19" */
  MonthDayCreated?: string;
  /** ☆☆☆☆   Example: "Old Crescent" */
  MoonPhase?: string;
  /** ☆☆☆☆   Example: 100 */
  MotionSensitivity?: number;
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  MovieAELockButtonAssignment?: string;
  /** ☆☆☆☆ ✔ Example: "Single" */
  MovieAFAreaMode?: string;
  /** ☆☆☆☆ ✔ Example: "4 (Normal)" */
  MovieAFTrackingSensitivity?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  MovieFlickerReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Zoom (Low)" */
  MovieFunc1Button?: string;
  /** ☆☆☆☆ ✔ Example: "Zoom (1:1)" */
  MovieFunc2Button?: string;
  /** ☆☆☆☆   Example: "None" */
  MovieFunc3Button?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieFunctionButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieFunctionButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MovieHighlightDisplayPattern?: string;
  /** ☆☆☆☆ ✔ Example: 248 */
  MovieHighlightDisplayThreshold?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  MovieISOAutoControlManualMode?: string;
  /** ☆☆☆☆ ✔ Example: "ISO 6400" */
  MovieISOAutoHiLimit?: string;
  /** ☆☆☆☆ ✔ Example: "Power Aperture" */
  MovieLensControlRing?: string;
  /** ☆☆☆☆ ✔ Example: "Center Focus Point" */
  MovieMultiSelector?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MoviePreviewButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MoviePreviewButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Take Photo" */
  MovieShutterButton?: string;
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  MovieSubSelectorAssignment?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieSubSelectorAssignmentPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "H.265 10-bit (MOV)" */
  MovieType?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  MovieWhiteBalanceSameAsPhoto?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiControllerWhileMetering?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MultiExposure?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiExposureAutoGain?: string;
  /** ☆☆☆☆ ✔ Example: "Bright (comparative)" */
  MultiExposureControl?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiExposureMode?: string;
  /** ☆☆☆☆ ✔ Example: "Add" */
  MultiExposureOverlayMode?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  MultiExposureShots?: number;
  /** ☆☆☆☆ ✔ Example: "0103" */
  MultiExposureVersion?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MultiFrameNoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  MultiFrameNREffect?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (66)" */
  MultiFunctionLock?: string;
  /** ☆☆☆☆ ✔ Example: "On (2 frames); 1" */
  MultipleExposureMode?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (15)" */
  MultipleExposureSet?: string;
  /** ☆☆☆☆ ✔ Example: "Reset Meter-off Delay" */
  MultiSelector?: string;
  /** ☆☆☆☆ ✔ Example: "Start Movie Recording" */
  MultiSelectorLiveView?: string;
  /** ☆☆☆☆ ✔ Example: "Zoom On/Off" */
  MultiSelectorPlaybackMode?: string;
  /** ☆☆☆☆ ✔ Example: "Select Center Focus Point (Reset)" */
  MultiSelectorShootMode?: string;
  /** ★☆☆☆ ✔ Example: "Vivid" */
  MyColorMode?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  NDFilter?: string;
  /** ☆☆☆☆ ✔ Example: "n/a (JPEG)" */
  NEFBitDepth?: string;
  /** ☆☆☆☆ ✔ Example: "Uncompressed (reduced to 12 bit)" */
  NEFCompression?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 624 bytes, use -b option to extract)" */
  NEFLinearizationTable?: BinaryField | string;
  /** ☆☆☆☆   Example: "Off (Auto)" */
  NeutralDensityFilter?: string;
  /** ☆☆☆☆ ✔ Example: "ViewNX 2.8 M" */
  NikonCaptureVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Large (10.0 M)" */
  NikonImageSize?: string;
  /** ☆☆☆☆ ✔ Example: "Matrix" */
  NikonMeteringMode?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  NoiseFilter?: string;
  /** ★★☆☆ ✔ Example: "[4]" */
  NoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  NoiseReductionStrength?: number;
  /** ☆☆☆☆ ✔ Example: "Release Locked" */
  NoMemoryCard?: string;
  /** ☆☆☆☆ ✔ Example: 5.7 */
  NominalMaxAperture?: number;
  /** ☆☆☆☆ ✔ Example: 7 */
  NominalMinAperture?: number;
  /** ☆☆☆☆ ✔ Example: 16383 */
  NormalWhiteLevel?: number;
  /** ☆☆☆☆ ✔ Example: "55 Points" */
  NumberOfFocusPoints?: string;
  /** ☆☆☆☆ ✔ Example: 32 */
  NumberOffsets?: number;
  /** ☆☆☆☆ ✔ Example: 3 */
  NumFaceElements?: number;
  /** ☆☆☆☆ ✔ Example: 65535 */
  NumFacePositions?: number;
  /** ☆☆☆☆   Example: "inf" */
  ObjectDistance?: string;
  /** ☆☆☆☆ ✔ Example: 5 */
  OISMode?: number;
  /** ☆☆☆☆ ✔ Example: "Select Center Focus Point" */
  OKButton?: string;
  /** ☆☆☆☆ ✔ Example: 960 */
  OlympusImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 3648 */
  OlympusImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  OneTouchWB?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  OpticalVR?: string;
  /** ☆☆☆☆   Example: 3 */
  OpticalZoom?: number;
  /** ★★☆☆ ✔ Example: 94 */
  OpticalZoomCode?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  OpticalZoomMode?: string;
  /** ☆☆☆☆   Example: "On" */
  OpticalZoomOn?: string;
  /** ☆☆☆☆ ✔ Example: 668058300 */
  OrderNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Separate Vert/Horiz Points" */
  OrientationLinkedAF?: string;
  /** ☆☆☆☆ ✔ Example: "Same for vertical and horizontal" */
  OrientationLinkedAFPoint?: string;
  /** ☆☆☆☆   Example: "/home/username/pictures" */
  OriginalDirectory?: string;
  /** ☆☆☆☆ ✔ Example: "L9997698.JPG" */
  OriginalFileName?: string;
  /** ☆☆☆☆ ✔ Example: 4000 */
  OriginalImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 6000 */
  OriginalImageWidth?: number;
  /** ☆☆☆☆   Example: ["Sensor Upgraded","PREPRODUCTION CAMERA"] */
  OtherInfo?: string[];
  /** ☆☆☆☆ ✔ Example: "(Binary data 864 bytes, use -b option to extract)" */
  OutputLUT?: BinaryField | string;
  /** ★★☆☆ ✔ Example: "Itsa Myowna" */
  OwnerName?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PaintingFilter?: string;
  /** ☆☆☆☆ ✔ Example: "2023:01:19 22:32:42.04" */
  PanasonicDateTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "0425" */
  PanasonicExifVersion?: string;
  /** ☆☆☆☆ ✔ Example: 5584 */
  PanasonicImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 8368 */
  PanasonicImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: 360 */
  PanoramaAngle?: number;
  /** ☆☆☆☆ ✔ Example: 1080 */
  PanoramaCropBottom?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaCropLeft?: number;
  /** ☆☆☆☆ ✔ Example: 11520 */
  PanoramaCropRight?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaCropTop?: number;
  /** ☆☆☆☆ ✔ Example: "Right or Down" */
  PanoramaDirection?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaFrameHeight?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaFrameWidth?: number;
  /** ☆☆☆☆ ✔ Example: 1080 */
  PanoramaFullHeight?: number;
  /** ☆☆☆☆ ✔ Example: 11520 */
  PanoramaFullWidth?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PanoramaMode?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PanoramaSize3D?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaSourceHeight?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaSourceWidth?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (6)" */
  PentaxImageSize?: string;
  /** ☆☆☆☆ ✔ Example: "X90" */
  PentaxModelID?: string;
  /** ☆☆☆☆ ✔ Example: 6 */
  PentaxModelType?: number;
  /** ☆☆☆☆ ✔ Example: "9.1.2.0" */
  PentaxVersion?: string;
  /** ☆☆☆☆ ✔ Example: "513 513 513 513" */
  PerChannelBlackLevel?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  PeripheralIlluminationCorr?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  PeripheralLighting?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  PeripheralLightingSetting?: string;
  /** ☆☆☆☆ ✔ Example: 70 */
  PeripheralLightingValue?: number;
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PhotoEffect?: string;
  /** ☆☆☆☆ ✔ Example: "F7248739-9D7D-45ED-8B0C-63530491EEA8" */
  PhotoIdentifier?: string;
  /** ☆☆☆☆ ✔ Example: "Info Up-down, Playback Left-right" */
  PhotoInfoPlayback?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  PhotosAppFeatureFlags?: number;
  /** ☆☆☆☆ ✔ Example: "A" */
  PhotoShootingMenuBank?: string;
  /** ☆☆☆☆ ✔ Example: "FX (36x24)" */
  PhotoShootingMenuBankImageArea?: string;
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PhotoStyle?: string;
  /** ☆☆☆☆ ✔ Example: "Quick Adjust" */
  PictureControlAdjust?: string;
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PictureControlBase?: string;
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PictureControlName?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureControlQuickAdjust?: string;
  /** ☆☆☆☆ ✔ Example: "0310" */
  PictureControlVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PictureEffect?: string;
  /** ☆☆☆☆   Example: "Natural" */
  PictureFinish?: string;
  /** ★★☆☆ ✔ Example: "i-Enhance; 2" */
  PictureMode?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeBWFilter?: string;
  /** ☆☆☆☆ ✔ Example: "1 (min -2, max 2)" */
  PictureModeContrast?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeEffect?: string;
  /** ☆☆☆☆ ✔ Example: "0 (min -2, max 2)" */
  PictureModeSaturation?: string;
  /** ☆☆☆☆ ✔ Example: "2 (min -2, max 2)" */
  PictureModeSharpness?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeTone?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  PictureProfile?: string;
  /** ☆☆☆☆ ✔ Example: "User Def. 3" */
  PictureStyle?: string;
  /** ☆☆☆☆ ✔ Example: "n/a; n/a; n/a" */
  PictureStylePC?: string;
  /** ☆☆☆☆ ✔ Example: "Standard; Standard; Standard" */
  PictureStyleUserDef?: string;
  /** ☆☆☆☆ ✔ Example: "Low" */
  Pitch?: string;
  /** ☆☆☆☆ ✔ Example: 8.3 */
  PitchAngle?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  PixelAspectRatio?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PixelShiftInfo?: string;
  /** ☆☆☆☆   Example: "On" */
  PixelShiftResolution?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PixelShiftShooting?: string;
  /** ☆☆☆☆ ✔ Example: "5 min" */
  PlaybackMenusTime?: string;
  /** ☆☆☆☆ ✔ Example: "20 s" */
  PlaybackMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "Use Separate Zoom Buttons" */
  PlaybackZoom?: string;
  /** ☆☆☆☆ ✔ Example: "Auto Rotate" */
  PlayDisplay?: string;
  /** ☆☆☆☆ ✔ Example: 3 */
  POILevel?: number;
  /** ☆☆☆☆   Example: "Off" */
  PopupFlash?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PortraitImpressionBalance?: string;
  /** ☆☆☆☆   Example: "Off" */
  PortraitRefiner?: string;
  /** ☆☆☆☆ ✔ Example: "Post Focus Auto Merging or None" */
  PostFocusMerging?: string;
  /** ☆☆☆☆ ✔ Example: "Max" */
  PostReleaseBurstLength?: string;
  /** ☆☆☆☆ ✔ Example: "External Power Supply" */
  PowerSource?: string;
  /** ☆☆☆☆ ✔ Example: "2024:07:01 09:23:16" */
  PowerUpTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "On" */
  PreAF?: string;
  /** ☆☆☆☆ ✔ Example: 3.2996109 */
  PreCaptureFrames?: number;
  /** ☆☆☆☆ ✔ Example: "None" */
  PreReleaseBurstLength?: string;
  /** ☆☆☆☆ ✔ Example: "Daylight" */
  PresetWhiteBalance?: string;
  /** ☆☆☆☆ ✔ Example: "Preview" */
  PreviewButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  PreviewButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "28 28 0 0" */
  PreviewImageBorders?: string;
  /** ☆☆☆☆ ✔ Example: 976 */
  PreviewImageHeight?: number;
  /** ★★☆☆ ✔ Example: 9983 */
  PreviewImageLength?: number;
  /** ★☆☆☆ ✔ Example: "816x459" */
  PreviewImageSize?: string;
  /** ★★☆☆ ✔ Example: 9996 */
  PreviewImageStart?: number;
  /** ☆☆☆☆ ✔ Example: true */
  PreviewImageValid?: boolean;
  /** ☆☆☆☆ ✔ Example: 816 */
  PreviewImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: 95 */
  PreviewQuality?: number;
  /** ★☆☆☆ ✔ Example: 8 */
  PrimaryAFPoint?: number;
  /** ☆☆☆☆ ✔ Example: "XQD Card" */
  PrimarySlot?: string;
  /** ☆☆☆☆ ✔ Example: "AF" */
  PrioritySetupShutterRelease?: string;
  /** ☆☆☆☆ ✔ Example: 9.987 */
  ProductionCode?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ProgramISO?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ProgramLine?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ProgramShift?: number;
  /** ★★★☆ ✔ Example: "Unknown (5)" */
  Quality?: string;
  /** ☆☆☆☆ ✔ Example: "Exposure comp/Aperture" */
  QuickControlDialInMeter?: string;
  /** ☆☆☆☆   Example: "Off" */
  QuickShot?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  RangeFinder?: string;
  /** ☆☆☆☆ ✔ Example: "RAW+Small/Normal" */
  RawAndJpgRecording?: string;
  /** ☆☆☆☆ ✔ Example: "Little-endian (Intel, II)" */
  RawDataByteOrder?: string;
  /** ☆☆☆☆ ✔ Example: "Unchanged" */
  RawDataCFAPattern?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDataLength?: number;
  /** ☆☆☆☆ ✔ Example: "Off; 0; 0; 0" */
  RawDevArtFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  RawDevAutoGradation?: string;
  /** ☆☆☆☆ ✔ Example: "sRGB" */
  RawDevColorSpace?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevContrastValue?: string;
  /** ☆☆☆☆ ✔ Example: "Original" */
  RawDevEditStatus?: string;
  /** ☆☆☆☆   Example: "9 (Q)" */
  RawDevelopmentProcess?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  RawDevEngine?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevExposureBiasValue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevGradation?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevGrayPoint?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevMemoryColorEmphasis?: number;
  /** ☆☆☆☆ ✔ Example: "Noise Filter" */
  RawDevNoiseReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Natural" */
  RawDevPictureMode?: string;
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMContrast?: string;
  /** ☆☆☆☆ ✔ Example: "2 0 -2 1" */
  RawDevPMNoiseFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  RawDevPMPictureTone?: string;
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMSaturation?: string;
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMSharpness?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevSaturationEmphasis?: string;
  /** ☆☆☆☆ ✔ Example: "(none)" */
  RawDevSettings?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevSharpnessValue?: string;
  /** ☆☆☆☆ ✔ Example: "0100" */
  RawDevVersion?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevWBFineAdjustment?: number;
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  RawDevWhiteBalance?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevWhiteBalanceValue?: number;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  RAWFileType?: string;
  /** ☆☆☆☆ ✔ Example: "3712 2462" */
  RawImageCenter?: string;
  /** ☆☆☆☆ ✔ Example: 3296 */
  RawImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 4952 */
  RawImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: "RAW" */
  RawJpgQuality?: string;
  /** ☆☆☆☆ ✔ Example: "Large" */
  RawJpgSize?: string;
  /** ☆☆☆☆ ✔ Example: "95215 190283 189698 116484" */
  RawMeasuredRGGB?: string;
  /** ☆☆☆☆ ✔ Example: "ISO" */
  RearDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "Auto Rotate" */
  RecordDisplay?: string;
  /** ☆☆☆☆ ✔ Example: 58 */
  RecordID?: number;
  /** ☆☆☆☆   Example: "JPEG" */
  RecordingFormat?: string;
  /** ☆☆☆☆   Example: "Auto" */
  RecordingMode?: string;
  /** ★★☆☆ ✔ Example: "TIF+JPEG" */
  RecordMode?: string;
  /** ☆☆☆☆   Example: "Record while down" */
  RecordShutterRelease?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  RedEyeRemoval?: string;
  /** ☆☆☆☆   Example: "8D" */
  RedGain?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ReleaseButtonToUseDial?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (7)" */
  ReleaseMode?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  RemoteFuncButton?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RemoteOnDuration?: number;
  /** ☆☆☆☆ ✔ Example: 10 */
  RepeatingFlashCount?: number;
  /** ☆☆☆☆ ✔ Example: "1/32" */
  RepeatingFlashOutput?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  RepeatingFlashOutputExternal?: number;
  /** ☆☆☆☆ ✔ Example: "10 Hz" */
  RepeatingFlashRate?: string;
  /** ☆☆☆☆   Example: "No" */
  Resaved?: string;
  /** ☆☆☆☆   Example: "MED" */
  ResolutionMode?: string;
  /** ☆☆☆☆ ✔ Example: "Flags 0x77" */
  RestrictDriveModes?: string;
  /** ★☆☆☆ ✔ Example: "Unknown ()" */
  RetouchHistory?: string;
  /** ☆☆☆☆ ✔ Example: "0200" */
  RetouchInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  RetouchNEFProcessing?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  RetractLensOnPowerOff?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  ReverseExposureCompDial?: string;
  /** ☆☆☆☆ ✔ Example: "Not Reversed" */
  ReverseFocusRing?: string;
  /** ☆☆☆☆ ✔ Example: "- 0 +" */
  ReverseIndicators?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  ReverseShutterSpeedAperture?: string;
  /** ☆☆☆☆ ✔ Example: "Varies With Rotation Speed" */
  RFLensMFFocusRingSensitivity?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  RFLensType?: string;
  /** ☆☆☆☆   Example: "2012:03:29 18:17:52" */
  RicohDate?: ExifDateTime | string;
  /** ☆☆☆☆   Example: 960 */
  RicohImageHeight?: number;
  /** ☆☆☆☆   Example: 640 */
  RicohImageWidth?: number;
  /** ☆☆☆☆   Example: "XG-1Pentax" */
  RicohMake?: string;
  /** ☆☆☆☆   Example: "RICOH WG-M1" */
  RicohModel?: string;
  /** ☆☆☆☆   Example: 150.43 */
  Roll?: number;
  /** ☆☆☆☆ ✔ Example: 90 */
  RollAngle?: number;
  /** ☆☆☆☆ ✔ Example: "USA" */
  ROMOperationMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RunTimeEpoch?: number;
  /** ☆☆☆☆ ✔ Example: "Valid" */
  RunTimeFlags?: string;
  /** ☆☆☆☆ ✔ Example: 1000000000 */
  RunTimeScale?: number;
  /** ☆☆☆☆ ✔ Example: 987823130000000 */
  RunTimeValue?: number;
  /** ☆☆☆☆ ✔ Example: "Enable (Tv/Av)" */
  SafetyShift?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  SafetyShiftInAvOrTv?: string;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  SameExposureForNewAperture?: string;
  /** ☆☆☆☆ ✔ Example: "WP10 / VLUU WP10 / AQ100" */
  SamsungModelID?: string;
  /** ☆☆☆☆   Example: "Unknown (0x211)" */
  SanyoQuality?: string;
  /** ☆☆☆☆   Example: "(Binary data 10313 bytes, use -b option to extract)" */
  SanyoThumbnail?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 1 */
  SaturationAdj?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAuto?: number;
  /** ☆☆☆☆ ✔ Example: 655360 */
  SaturationFaithful?: number;
  /** ☆☆☆☆ ✔ Example: 8650752 */
  SaturationLandscape?: number;
  /** ☆☆☆☆ ✔ Example: 6619136 */
  SaturationNeutral?: number;
  /** ☆☆☆☆ ✔ Example: 6553609 */
  SaturationPortrait?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationSetting?: number;
  /** ☆☆☆☆ ✔ Example: 3 */
  SaturationStandard?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  SaveFocus?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ScanImageEnhancer?: string;
  /** ☆☆☆☆ ✔ Example: "Two-Shot" */
  SceneAssist?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  SceneDetect?: number;
  /** ★★☆☆ ✔ Example: "n/a" */
  SceneMode?: string;
  /** ☆☆☆☆   Example: "Unknown (9)" */
  SceneModeUsed?: string;
  /** ☆☆☆☆ ✔ Example: "Unrecognized" */
  SceneRecognition?: string;
  /** ☆☆☆☆   Example: "User 1" */
  SceneSelect?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ScreenTips?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (1)" */
  SecondarySlotFunction?: string;
  /** ☆☆☆☆ ✔ Example: "45 points" */
  SelectableAFPoint?: string;
  /** ☆☆☆☆ ✔ Example: "Single-point AF, Auto, Zone AF, Spot AF, [6], [8], [9], […], [14]" */
  SelectAFAreaSelectionMode?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (87)" */
  SelectAFAreaSelectMode?: string;
  /** ★★☆☆ ✔ Example: "Self-timer 5 or 10 s" */
  SelfTimer?: string;
  /** ☆☆☆☆ ✔ Example: "0.5 s" */
  SelfTimerInterval?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  SelfTimerShotCount?: number;
  /** ☆☆☆☆ ✔ Example: "1 s" */
  SelfTimerShotInterval?: string;
  /** ☆☆☆☆ ✔ Example: "2 s" */
  SelfTimerTime?: string;
  /** ☆☆☆☆ ✔ Example: {"_0":1,"_1":0,"_2":0,"_3":0} */
  SemanticStyle?: Struct;
  /** ☆☆☆☆   Example: true */
  SemanticStylePreset?: boolean;
  /** ☆☆☆☆   Example: true */
  SemanticStyleRenderingVer?: boolean;
  /** ☆☆☆☆ ✔ Example: 0 */
  SensitivityAdjust?: number;
  /** ☆☆☆☆ ✔ Example: "As EV Steps" */
  SensitivitySteps?: string;
  /** ☆☆☆☆   Example: "front-main-mot_s5k5e9" */
  Sensor?: string;
  /** ☆☆☆☆   Example: 14 */
  SensorBitDepth?: number;
  /** ☆☆☆☆ ✔ Example: 4214 */
  SensorBlueLevel?: number;
  /** ☆☆☆☆ ✔ Example: 5893 */
  SensorBottomBorder?: number;
  /** ☆☆☆☆ ✔ Example: "4095 646" */
  SensorCalibration?: string;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  SensorCleaning?: string;
  /** ☆☆☆☆   Example: 2472 */
  SensorFullHeight?: number;
  /** ☆☆☆☆   Example: 3288 */
  SensorFullWidth?: number;
  /** ☆☆☆☆ ✔ Example: 5920 */
  SensorHeight?: number;
  /** ☆☆☆☆   Example: "1TCTJ8803BJ07G" */
  SensorID?: string;
  /** ☆☆☆☆ ✔ Example: 88 */
  SensorLeftBorder?: number;
  /** ☆☆☆☆ ✔ Example: "9.4 x 9.4 um" */
  SensorPixelSize?: string;
  /** ☆☆☆☆ ✔ Example: 4370 */
  SensorRedLevel?: number;
  /** ☆☆☆☆ ✔ Example: 8883 */
  SensorRightBorder?: number;
  /** ☆☆☆☆ ✔ Example: "7.576 x 5.682 mm" */
  SensorSize?: string;
  /** ☆☆☆☆ ✔ Example: "80.9 C" */
  SensorTemperature?: string;
  /** ☆☆☆☆ ✔ Example: 96 */
  SensorTopBorder?: number;
  /** ☆☆☆☆ ✔ Example: "rear" */
  SensorType?: string;
  /** ☆☆☆☆ ✔ Example: 8896 */
  SensorWidth?: number;
  /** ☆☆☆☆   Example: "5 of 5" */
  Sequence?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  SequenceFileNumber?: number;
  /** ☆☆☆☆ ✔ Example: 4 */
  SequenceImageNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Continuous" */
  SequenceLength?: string;
  /** ★★★☆ ✔ Example: 6 */
  SequenceNumber?: number;
  /** ☆☆☆☆   Example: "5 frames/s" */
  SequenceShotInterval?: string;
  /** ☆☆☆☆   Example: "Unknown (28928)" */
  SequentialShot?: string;
  /** ★★☆☆ ✔ Example: "sw02028104 " */
  SerialNumber?: string;
  /** ☆☆☆☆ ✔ Example: "Format 2" */
  SerialNumberFormat?: string;
  /** ☆☆☆☆ ✔ Example: "Set: Picture Style" */
  SetButtonCrossKeysFunc?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (37 0)" */
  SetButtonWhenShooting?: string;
  /** ☆☆☆☆ ✔ Example: "Default (no function)" */
  SetFunctionWhenShooting?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ShadingCompensation?: string;
  /** ☆☆☆☆   Example: 0 */
  Shadow?: number;
  /** ☆☆☆☆   Example: "On" */
  ShadowCorrection?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  Shadows?: number;
  /** ☆☆☆☆ ✔ Example: "0 (normal)" */
  ShadowTone?: string;
  /** ☆☆☆☆ ✔ Example: "On but Disabled" */
  ShakeReduction?: string;
  /** ☆☆☆☆   Example: "Normal" */
  Sharpening?: string;
  /** ☆☆☆☆ ✔ Example: 3 */
  SharpnessAuto?: number;
  /** ☆☆☆☆ ✔ Example: 768 */
  SharpnessFactor?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SharpnessFaithful?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  SharpnessFreqTable?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SharpnessFrequency?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  SharpnessLandscape?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SharpnessNeutral?: number;
  /** ☆☆☆☆ ✔ Example: 2752758 */
  SharpnessPortrait?: number;
  /** ☆☆☆☆ ✔ Example: "+3" */
  SharpnessRange?: string;
  /** ☆☆☆☆ ✔ Example: "3 (min -3, max 5)" */
  SharpnessSetting?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  SharpnessStandard?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  SharpnessTable?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  ShootingInfoDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ShootingInfoMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "Continuous" */
  ShootingModeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Itsa Myowna" */
  ShortOwnerName?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ShortReleaseTimeLag?: string;
  /** ☆☆☆☆ ✔ Example: "0811" */
  ShotInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: 9 */
  ShotNumberSincePowerUp?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  ShotsPerInterval?: number;
  /** ☆☆☆☆ ✔ Example: "Silent / Electronic (0 0 0)" */
  Shutter?: string;
  /** ☆☆☆☆ ✔ Example: "AF/AE lock stop" */
  ShutterAELButton?: string;
  /** ☆☆☆☆ ✔ Example: "Metering start/Meter + AF start" */
  ShutterButtonAFOnButton?: string;
  /** ☆☆☆☆ ✔ Example: 998 */
  ShutterCount?: number;
  /** ☆☆☆☆   Example:  */
  ShutterCount2?: number;
  /** ☆☆☆☆   Example:  */
  ShutterCount3?: number;
  /** ☆☆☆☆ ✔ Example: "2nd-curtain sync" */
  ShutterCurtainSync?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  ShutterMode?: string;
  /** ☆☆☆☆ ✔ Example: "Single Shot" */
  ShutterReleaseMethod?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ShutterReleaseNoCFCard?: string;
  /** ☆☆☆☆ ✔ Example: "Priority on focus" */
  ShutterReleaseTiming?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ShutterReleaseWithoutLens?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ShutterSpeedLock?: string;
  /** ☆☆☆☆ ✔ Example: "Manual: Hi 1/8123; Lo 31.9; Auto: Hi 1/8123; Lo 31.9" */
  ShutterSpeedRange?: string;
  /** ☆☆☆☆ ✔ Example: "1/91" */
  ShutterSpeedSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ShutterType?: string;
  /** ☆☆☆☆ ✔ Example: 63.176895 */
  SignalToNoiseRatio?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  SilentPhotography?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  SingleFrame?: number;
  /** ☆☆☆☆ ✔ Example: "Low" */
  SingleFrameBracketing?: string;
  /** ☆☆☆☆   Example: "Off" */
  SkinToneCorrection?: string;
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0" */
  SlaveFlashMeteringSegments?: string;
  /** ★★☆☆ ✔ Example: "n/a" */
  SlowShutter?: string;
  /** ★☆☆☆ ✔ Example: "On" */
  SlowSync?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SmartAlbumColor?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  SmileShutter?: string;
  /** ☆☆☆☆ ✔ Example: "Slight Smile" */
  SmileShutterMode?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  SoftFocusFilter?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SoftSkinEffect?: string;
  /** ☆☆☆☆ ✔ Example: "2024:06:12 18:00:20" */
  SonyDateTime?: ExifDateTime | string;
  /** ☆☆☆☆   Example:  */
  SonyDateTime2?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "1/82" */
  SonyExposureTime?: string;
  /** ☆☆☆☆ ✔ Example: 8.8 */
  SonyFNumber?: number;
  /** ☆☆☆☆ ✔ Example: 65535 */
  SonyImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 6376 */
  SonyImageHeightMax?: number;
  /** ☆☆☆☆ ✔ Example: "Small (3:2)" */
  SonyImageSize?: string;
  /** ☆☆☆☆ ✔ Example: 9504 */
  SonyImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: 9568 */
  SonyImageWidthMax?: number;
  /** ☆☆☆☆ ✔ Example: 926 */
  SonyISO?: number;
  /** ☆☆☆☆ ✔ Example: 5.5 */
  SonyMaxAperture?: number;
  /** ☆☆☆☆ ✔ Example: 6.4 */
  SonyMaxApertureValue?: number;
  /** ☆☆☆☆ ✔ Example: 34 */
  SonyMinAperture?: number;
  /** ☆☆☆☆ ✔ Example: "ZV-E10" */
  SonyModelID?: string;
  /** ☆☆☆☆ ✔ Example: "Fine" */
  SonyQuality?: string;
  /** ☆☆☆☆ ✔ Example:  */
  SonyTimeMinSec?: string;
  /** ☆☆☆☆   Example: 100 */
  SourceDirectoryIndex?: number;
  /** ☆☆☆☆   Example: 60 */
  SourceFileIndex?: number;
  /** ☆☆☆☆   Example: 24576 */
  SpecialEffectLevel?: number;
  /** ☆☆☆☆   Example: "Off" */
  SpecialEffectMode?: string;
  /** ☆☆☆☆   Example: "Unknown (15)" */
  SpecialEffectSetting?: string;
  /** ★☆☆☆ ✔ Example: "Unknown (962), Sequence: 0, Panorama: (none)" */
  SpecialMode?: string;
  /** ☆☆☆☆ ✔ Example: 9966 */
  SpecularWhiteLevel?: number;
  /** ☆☆☆☆   Example: "+0.10" */
  SpeedX?: string;
  /** ☆☆☆☆   Example: "+6.10" */
  SpeedY?: string;
  /** ☆☆☆☆   Example: "+0.00" */
  SpeedZ?: string;
  /** ☆☆☆☆   Example: 1632 */
  SpotFocusPointX?: number;
  /** ☆☆☆☆   Example: 960 */
  SpotFocusPointY?: number;
  /** ★☆☆☆ ✔ Example: "Center" */
  SpotMeteringMode?: string;
  /** ☆☆☆☆ ✔ Example: "Enable (use active AF point)" */
  SpotMeterLinkToAFPoint?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  SRActive?: string;
  /** ☆☆☆☆ ✔ Example: "sRAW2 (sRAW)" */
  SRAWQuality?: string;
  /** ☆☆☆☆ ✔ Example: "97 mm" */
  SRFocalLength?: string;
  /** ☆☆☆☆ ✔ Example: "4.25 s or longer" */
  SRHalfPressTime?: string;
  /** ☆☆☆☆ ✔ Example: "Stabilized, Not ready" */
  SRResult?: string;
  /** ☆☆☆☆ ✔ Example: "Tripod high resolution" */
  StackedImage?: string;
  /** ☆☆☆☆ ✔ Example: "6 s" */
  StandbyMonitorOffTime?: string;
  /** ☆☆☆☆ ✔ Example: "6 s" */
  StandbyTimer?: string;
  /** ☆☆☆☆ ✔ Example: "Default (from LV)" */
  StartMovieShooting?: string;
  /** ☆☆☆☆ ✔ Example: 8 */
  StopsAboveBaseISO?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  StoreByOrientation?: string;
  /** ☆☆☆☆ ✔ Example: "10 Frames" */
  SubDialFrameAdvance?: string;
  /** ☆☆☆☆ ✔ Example: "People" */
  SubjectDetection?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  SubjectDetectionAreaMF?: string;
  /** ☆☆☆☆ ✔ Example: "Steady" */
  SubjectMotion?: string;
  /** ☆☆☆☆   Example: "None" */
  SubjectProgram?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  SubjectToDetect?: string;
  /** ☆☆☆☆ ✔ Example: "Focus Point Selection" */
  SubSelector?: string;
  /** ☆☆☆☆ ✔ Example: "Focus Point Selection" */
  SubSelectorAssignment?: string;
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  SubSelectorCenter?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  SubSelectorPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  SuperimposedDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  SuperMacro?: string;
  /** ☆☆☆☆ ✔ Example: 100 */
  SvISOSetting?: number;
  /** ☆☆☆☆ ✔ Example: "Right" */
  SweepPanoramaDirection?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  SweepPanoramaFieldOfView?: number;
  /** ☆☆☆☆ ✔ Example: "Wide" */
  SweepPanoramaSize?: string;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  SwitchToRegisteredAFPoint?: string;
  /** ☆☆☆☆ ✔ Example: "Sync" */
  SyncReleaseMode?: string;
  /** ★★☆☆ ✔ Example: 9 */
  TargetAperture?: number;
  /** ☆☆☆☆ ✔ Example: 4 */
  TargetCompressionRatio?: number;
  /** ☆☆☆☆ ✔ Example: "476 mm" */
  TargetDistanceSetting?: string;
  /** ★★☆☆ ✔ Example: "1/813" */
  TargetExposureTime?: string;
  /** ☆☆☆☆ ✔ Example: "Real-world Subject" */
  TargetImageType?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  Teleconverter?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TextEncoding?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  TextStamp?: string;
  /** ☆☆☆☆ ✔ Example: "THM_0043.JPG" */
  ThumbnailFileName?: string;
  /** ☆☆☆☆ ✔ Example: 120 */
  ThumbnailHeight?: number;
  /** ★★☆☆ ✔ Example: "0 159 7 112" */
  ThumbnailImageValidArea?: string;
  /** ☆☆☆☆ ✔ Example: 160 */
  ThumbnailWidth?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 7404 bytes, use -b option to extract)" */
  TiffMeteringImage?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 30 */
  TiffMeteringImageHeight?: number;
  /** ☆☆☆☆ ✔ Example: 44 */
  TiffMeteringImageWidth?: number;
  /** ☆☆☆☆ ✔ Example: "23:50:41" */
  Time?: ExifTime | string;
  /** ☆☆☆☆ ✔ Example: 50336257 */
  TimeLapseShotNumber?: number;
  /** ☆☆☆☆ ✔ Example: "Self-timer" */
  TimerFunctionButton?: string;
  /** ☆☆☆☆ ✔ Example: "Disable; 6 s: 6; 16 s: 16; After release: 2" */
  TimerLength?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  TimerRecording?: string;
  /** ☆☆☆☆ ✔ Example: "01:48:53.63" */
  TimeSincePowerOn?: ExifTime | string;
  /** ☆☆☆☆ ✔ Example: "2025:03:24 14:44:20" */
  TimeStamp?: ExifDateTime | string;
  /** ★☆☆☆ ✔ Example: "-09:00" */
  TimeZone?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TimeZoneCity?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  TimeZoneCode?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  TimeZoneInfo?: number;
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ToneComp?: string;
  /** ☆☆☆☆ ✔ Example: "Standard" */
  ToneCurve?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 95 bytes, use -b option to extract)" */
  ToneCurveMatching?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 1679 bytes, use -b option to extract)" */
  ToneCurveTable?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Highlights; 0; -7; 7; Shadows; 0; -7; 7; Midtones; 0; -7;…0; 0; 0" */
  ToneLevel?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningEffect?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningEffectAuto?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningSaturation?: string;
  /** ☆☆☆☆   Example: 5 */
  TotalZoom?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  TouchAE?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ToyCameraFilter?: string;
  /** ☆☆☆☆   Example: "Off" */
  Transform?: string;
  /** ☆☆☆☆ ✔ Example: "Normal (set center AF point)" */
  TrashButtonFunction?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TravelDay?: string;
  /** ☆☆☆☆   Example: "Motion Detection" */
  TriggerMode?: string;
  /** ☆☆☆☆ ✔ Example: "1/64" */
  TvExposureTimeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "7860345b882000641403450101000000170d0f1d0f11827ca3111430d3000000" */
  UniqueID?: string;
  /** ☆☆☆☆   Example: "ZME151000007" */
  UnknownNumber?: string;
  /** ☆☆☆☆ ✔ Example: 4 */
  UnsharpMaskFineness?: number;
  /** ☆☆☆☆ ✔ Example: 4 */
  UnsharpMaskThreshold?: number;
  /** ☆☆☆☆ ✔ Example: "Flags 0xf0" */
  UsableMeteringModes?: string;
  /** ☆☆☆☆ ✔ Example: "Flags 0x3f" */
  UsableShootingModes?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  USBPowerDelivery?: string;
  /** ☆☆☆☆   Example: "PC900 COVERT PRO" */
  UserLabel?: string;
  /** ☆☆☆☆   Example: "dpreview  " */
  UserProfile?: string;
  /** ☆☆☆☆ ✔ Example: "Turns on after one-shot AF" */
  USMLensElectronicMF?: string;
  /** ☆☆☆☆ ✔ Example: "12 0" */
  ValidBits?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VariableLowPassFilter?: string;
  /** ☆☆☆☆ ✔ Example: "Scene Auto" */
  VariProgram?: string;
  /** ☆☆☆☆ ✔ Example: "Same as AF-On Button" */
  VerticalAFOnButton?: string;
  /** ☆☆☆☆ ✔ Example: "Exposure Compensation" */
  VerticalFuncButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  VerticalFuncButtonPlusDials?: string;
  /** ☆☆☆☆ ✔ Example: "Same as AF-On" */
  VerticalMovieAFOnButton?: string;
  /** ☆☆☆☆ ✔ Example: "None" */
  VerticalMovieFuncButton?: string;
  /** ☆☆☆☆ ✔ Example: "Same as MultiSelector" */
  VerticalMultiSelector?: string;
  /** ☆☆☆☆ ✔ Example: "Enable" */
  VFDisplayIllumination?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VibrationReduction?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  VideoBurstMode?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  VideoBurstResolution?: string;
  /** ☆☆☆☆ ✔ Example: "No" */
  VideoPreburst?: string;
  /** ☆☆☆☆ ✔ Example: "Frame Count" */
  ViewfinderDisplay?: string;
  /** ☆☆☆☆ ✔ Example: "On" */
  ViewfinderWarning?: string;
  /** ☆☆☆☆ ✔ Example: "Monochrome, WB corrected, One-touch image quality, Noise …on, HDR" */
  ViewfinderWarnings?: string;
  /** ☆☆☆☆ ✔ Example: "Disable" */
  ViewInfoDuringExposure?: string;
  /** ☆☆☆☆ ✔ Example: "ViewFinder" */
  ViewingMode?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  VignetteControl?: string;
  /** ☆☆☆☆   Example: "Off" */
  Vignetting?: string;
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VignettingCorrection?: string;
  /** ☆☆☆☆ ✔ Example: "36 -17446 -19682 0 15496 -19605 -10627 -28672 187 27452 -… 99 121" */
  VignettingCorrParams?: string;
  /** ☆☆☆☆ ✔ Example: 97 */
  VignettingCorrVersion?: number;
  /** ☆☆☆☆   Example: "Off" */
  VoiceMemo?: string;
  /** ★☆☆☆ ✔ Example: 0 */
  VRDOffset?: number;
  /** ☆☆☆☆ ✔ Example: "0200" */
  VRInfoVersion?: string;
  /** ☆☆☆☆ ✔ Example: "Sport" */
  VRMode?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (1)" */
  VRType?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  WatercolorFilter?: string;
  /** ☆☆☆☆ ✔ Example: 9235 */
  WBBlueLevel?: number;
  /** ☆☆☆☆ ✔ Example: "WB Bracketing Disabled" */
  WBBracketingSteps?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  WBBracketMode?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketShotNumber?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketValueAB?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketValueGM?: number;
  /** ☆☆☆☆ ✔ Example: "Select To Send (PC)" */
  WBButtonPlaybackMode?: string;
  /** ☆☆☆☆ ✔ Example: 60416 */
  WBGreenLevel?: number;
  /** ☆☆☆☆ ✔ Example: "Rear LCD panel" */
  WBMediaImageSizeSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Unknown (1 1)" */
  WBMode?: string;
  /** ☆☆☆☆ ✔ Example: 834 */
  WBRedLevel?: number;
  /** ☆☆☆☆ ✔ Example: 7 */
  WBShiftAB?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBShiftCreativeControl?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBShiftGM?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  WBShiftIntelligentAuto?: number;
  /** ☆☆☆☆ ✔ Example: "On" */
  WhiteBalanceAutoAdjustment?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  WhiteBalanceBias?: number;
  /** ☆☆☆☆ ✔ Example: 796 */
  WhiteBalanceBlue?: number;
  /** ★☆☆☆ ✔ Example: "0 0" */
  WhiteBalanceBracket?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  WhiteBalanceBracketing?: string;
  /** ★☆☆☆ ✔ Example: 3 */
  WhiteBalanceFineTune?: number;
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  WhiteBalanceMatching?: string;
  /** ☆☆☆☆ ✔ Example: "User-Selected" */
  WhiteBalanceMode?: string;
  /** ☆☆☆☆ ✔ Example: 642 */
  WhiteBalanceRed?: number;
  /** ☆☆☆☆ ✔ Example: "Tungsten" */
  WhiteBalanceSet?: string;
  /** ☆☆☆☆ ✔ Example: "Custom 1" */
  WhiteBalanceSetting?: string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  WhiteBalanceSetup?: string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 2217 bytes, use -b option to extract)" */
  WhiteBalanceTable?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "Auto" */
  WhiteBalanceTemperature?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  WhiteBoard?: number;
  /** ☆☆☆☆   Example: "Not Attached" */
  WideAdapter?: string;
  /** ☆☆☆☆   Example: "Unknown (9)" */
  WideFocusZone?: string;
  /** ☆☆☆☆   Example: "Off" */
  WideRange?: string;
  /** ☆☆☆☆ ✔ Example: "Hometown" */
  WorldTimeLocation?: string;
  /** ☆☆☆☆   Example: 0.2 */
  X3FillLight?: number;
  /** ☆☆☆☆   Example: "(Binary data 512 bytes, use -b option to extract)" */
  Xidiri?: BinaryField | string;
  /** ☆☆☆☆   Example: 0.83734368 */
  Yaw?: number;
  /** ☆☆☆☆ ✔ Example: 99 */
  YawAngle?: number;
  /** ☆☆☆☆   Example: 2006 */
  YearCreated?: number;
  /** ☆☆☆☆ ✔ Example: "ISO Setting Used" */
  ZoneMatching?: string;
  /** ☆☆☆☆ ✔ Example: "Off" */
  ZoneMatchingMode?: string;
  /** ☆☆☆☆   Example: "Unknown (7040)" */
  ZoneMatchingOn?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ZoneMatchingValue?: number;
  /** ☆☆☆☆ ✔ Example: "(Binary data 64581 bytes, use -b option to extract)" */
  ZoomedPreviewImage?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: 92592 */
  ZoomedPreviewLength?: number;
  /** ☆☆☆☆ ✔ Example: "736 544" */
  ZoomedPreviewSize?: string;
  /** ☆☆☆☆ ✔ Example: 4184638 */
  ZoomedPreviewStart?: number;
  /** ★★☆☆ ✔ Example: 768 */
  ZoomSourceWidth?: number;
  /** ☆☆☆☆ ✔ Example: 8 */
  ZoomStepCount?: number;
  /** ★★☆☆ ✔ Example: 6000 */
  ZoomTargetWidth?: number;
}

export const MakerNotesTagsNames = strEnum(
  "AccelerationTracking",
  "AccelerationVector",
  "Accelerometer",
  "AccelerometerX",
  "AccelerometerY",
  "AccelerometerZ",
  "AccessorySerialNumber",
  "AccessoryType",
  "ActualCompensation",
  "AddAspectRatioInfo",
  "AddIPTCInformation",
  "AddOriginalDecisionData",
  "ADJDebugInfo",
  "AdjustmentMode",
  "ADLBracketingStep",
  "ADLBracketingType",
  "AdvancedFilter",
  "AdvancedSceneType",
  "AEAperture",
  "AEApertureSteps",
  "AEAverage",
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
  "AESetting",
  "AEStable",
  "AETarget",
  "AEWhiteBalance",
  "AEXv",
  "AFAccelDecelTracking",
  "AFActivation",
  "AFAdjustment",
  "AFAndMeteringButtons",
  "AFAperture",
  "AFAreaHeight",
  "AFAreaHeights",
  "AFAreaIllumination",
  "AFAreaMode",
  "AFAreaModeSetting",
  "AFAreaPointSize",
  "AFAreas",
  "AFAreaSelectionMethod",
  "AFAreaSelectMethod",
  "AFAreaWidth",
  "AFAreaWidths",
  "AFAreaXPosition",
  "AFAreaYPosition",
  "AFAreaZoneSize",
  "AFAssist",
  "AFAssistBeam",
  "AFAssistLamp",
  "AFButtonPressed",
  "AFConfidence",
  "AFConfigTool",
  "AFCoordinatesAvailable",
  "AFDebugInfo",
  "AFDefocus",
  "AFDetectionMethod",
  "AFDuringLiveView",
  "AFFineTune",
  "AFFineTuneAdj",
  "AFFineTuneAdjTele",
  "AFFineTuneIndex",
  "AFIlluminator",
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
  "AFPointSwitching",
  "AFPredictor",
  "AFTracking",
  "AFTrackingSensitivity",
  "AFType",
  "AFWithShutter",
  "AIServoContinuousShooting",
  "AIServoFirstImage",
  "AIServoFirstImagePriority",
  "AIServoImagePriority",
  "AIServoSecondImage",
  "AIServoSecondImagePriority",
  "AIServoTrackingMethod",
  "AIServoTrackingSensitivity",
  "AISubjectTrackingMode",
  "Altitude",
  "AmbienceSelection",
  "AmbientTemperature",
  "AmbientTemperatureFahrenheit",
  "AntiFlicker",
  "ApertureLock",
  "ApertureRange",
  "ApertureRingUse",
  "ApertureSetting",
  "ApplySettingsToLiveView",
  "ApplyShootingMeteringMode",
  "ApproximateFNumber",
  "ArtFilter",
  "ArtFilterEffect",
  "ArtMode",
  "ArtModeParameters",
  "AspectFrame",
  "AspectRatio",
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
  "AudioCompression",
  "AutoAFPointColorTracking",
  "AutoAFPointSelEOSiTRAF",
  "AutoAperture",
  "AutoBracket",
  "AutoBracketing",
  "AutoBracketingMode",
  "AutoBracketingSet",
  "AutoBracketModeM",
  "AutoBracketOrder",
  "AutoBracketSet",
  "AutoDistortionControl",
  "AutoDynamicRange",
  "AutoExposureBracketing",
  "AutoFlashISOSensitivity",
  "AutoFP",
  "AutoISO",
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
  "BarometerInfoVersion",
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
  "BlackLevels",
  "BlackMaskBottomBorder",
  "BlackMaskLeftBorder",
  "BlackMaskRightBorder",
  "BlackMaskTopBorder",
  "BlackPoint",
  "BleachBypassToning",
  "BlueGain",
  "BlurControl",
  "BlurWarning",
  "BoardTemperature",
  "BodyBatteryADLoad",
  "BodyBatteryADNoLoad",
  "BodyBatteryState",
  "BodyFirmware",
  "BodyFirmwareVersion",
  "BodySerialNumber",
  "BracketIncrement",
  "BracketMode",
  "BracketProgram",
  "BracketSequence",
  "BracketSet",
  "BracketSettings",
  "BracketShotNumber",
  "BracketStep",
  "BracketValue",
  "Brightness",
  "BuildNumber",
  "BulbDuration",
  "BurstGroupID",
  "BurstMode",
  "BurstShot",
  "BurstSpeed",
  "BurstUUID",
  "ButtonFunctionControlOff",
  "BWFilter",
  "BWMode",
  "Calibration",
  "CameraDateTime",
  "CameraID",
  "CameraISO",
  "CameraOrientation",
  "CameraParameters",
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
  "CanonImageSize",
  "CanonImageType",
  "CanonModelID",
  "CardShutterLock",
  "Categories",
  "CCDBoardVersion",
  "CCDScanMode",
  "CCDSensitivity",
  "CCDVersion",
  "CenterAFArea",
  "CenterFocusPoint",
  "CenterWeightedAreaSize",
  "CHModeShootingSpeed",
  "ChromaticAberrationCorr",
  "ChromaticAberrationCorrParams",
  "ChromaticAberrationSetting",
  "ChrominanceNoiseReduction",
  "City2",
  "Clarity",
  "ClarityControl",
  "ClearRetouch",
  "CLModeShootingSpeed",
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
  "CommanderInternalTTLComp",
  "CommanderInternalTTLCompBuiltin",
  "CommanderInternalTTLCompGroupA",
  "CommanderInternalTTLCompGroupB",
  "ComponentBitDepth",
  "ComponentVersion",
  "CompositionAdjust",
  "CompositionAdjustRotation",
  "CompositionAdjustX",
  "CompositionAdjustY",
  "CompressedImageSize",
  "CompressionFactor",
  "CompressionRatio",
  "ContentIdentifier",
  "ContinuousBracketing",
  "ContinuousDrive",
  "ContinuousModeDisplay",
  "ContinuousModeLiveView",
  "ContinuousShootingSpeed",
  "ContinuousShotLimit",
  "ContrastAuto",
  "ContrastCurve",
  "ContrastDetectAFArea",
  "ContrastDetectAFInFocus",
  "ContrastFaithful",
  "ContrastHighlight",
  "ContrastHighlightShadowAdj",
  "ContrastLandscape",
  "ContrastMode",
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
  "CoringFilter",
  "CorrelatedColorTemp",
  "CPUFirmwareVersion",
  "CPUVersions",
  "CreativeStyle",
  "CreativeStyleSetting",
  "CropBottomMargin",
  "CropHeight",
  "CropHiSpeed",
  "CropLeftMargin",
  "CropMode",
  "CroppedImageHeight",
  "CroppedImageLeft",
  "CroppedImageTop",
  "CroppedImageWidth",
  "CropRightMargin",
  "CropTopMargin",
  "CropWidth",
  "CrossProcess",
  "CustomControls",
  "CustomizeDials",
  "CustomPictureStyleFileName",
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
  "DateTimeStamp",
  "DateTimeUTC",
  "DaylightSavings",
  "DECPosition",
  "DefaultEraseOption",
  "DeletedImageCount",
  "DestinationCity",
  "DestinationCityCode",
  "DestinationDST",
  "DeviceType",
  "DialDirectionTvAv",
  "DiffractionCompensation",
  "DiffractionCorrection",
  "DigitalFilter",
  "DigitalGain",
  "DigitalICE",
  "DigitalLensOptimizer",
  "DigitalLensOptimizerSetting",
  "DigitalZoom",
  "DirectoryIndex",
  "DirectoryNumber",
  "DispButton",
  "DisplayAllAFPoints",
  "DisplayAperture",
  "DistortionControl",
  "DistortionCorrection",
  "DistortionCorrectionSetting",
  "DistortionCorrectionValue",
  "DistortionCorrParams",
  "DistortionCorrParamsNumber",
  "DistortionCorrParamsPresent",
  "DriveModeSetting",
  "DriveSpeed",
  "DSPFirmwareVersion",
  "DualPixelRaw",
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
  "EasyExposureCompensation",
  "EasyMode",
  "EffectiveLV",
  "EffectiveMaxAperture",
  "ElectronicFrontCurtainShutter",
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
  "EVStepSize",
  "ExitPupilPosition",
  "ExposureBracketingIndicatorLast",
  "ExposureBracketShotNumber",
  "ExposureBracketStepSize",
  "ExposureBracketValue",
  "ExposureCompAutoCancel",
  "ExposureCompensationMode",
  "ExposureCompensationSet",
  "ExposureCompensationSetting",
  "ExposureCompStepSize",
  "ExposureControlStep",
  "ExposureControlStepSize",
  "ExposureCount",
  "ExposureDelayMode",
  "ExposureDifference",
  "ExposureIndicator",
  "ExposureLevelIncrements",
  "ExposureModeInManual",
  "ExposureShift",
  "ExposureStandardAdjustment",
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
  "FaceInfoLength",
  "FaceInfoOffset",
  "FaceName",
  "FacePosition",
  "FacePositions",
  "FacesDetected",
  "FacesRecognized",
  "FaceWidth",
  "Fade",
  "FEMicroadjustment",
  "FileFormat",
  "FileIndex",
  "FileInfoVersion",
  "FileNumber",
  "FileNumberMemory",
  "FileNumberSequence",
  "FillFlashAutoReduction",
  "FilmGrainEffect",
  "FilmMode",
  "FilmType",
  "FilterEffect",
  "FilterEffectAuto",
  "FinderDisplayDuringExposure",
  "FineSharpness",
  "FineTuneOptCenterWeighted",
  "FineTuneOptHighlightWeighted",
  "FineTuneOptMatrixMetering",
  "FineTuneOptSpotMetering",
  "FirmwareDate",
  "FirmwareName",
  "FirmwareRevision",
  "FirmwareVersion",
  "FisheyeFilter",
  "FlashAction",
  "FlashActionExternal",
  "FlashActivity",
  "FlashBatteryLevel",
  "FlashBias",
  "FlashBits",
  "FlashButtonFunction",
  "FlashChargeLevel",
  "FlashColorFilter",
  "FlashCommanderMode",
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
  "FlashShutterSpeed",
  "FlashSource",
  "FlashStatus",
  "FlashStatusExternal",
  "FlashSyncMode",
  "FlashSyncSpeed",
  "FlashSyncSpeedAv",
  "FlashThreshold",
  "FlashWarning",
  "FlexibleSpotPosition",
  "FlickAdvanceDirection",
  "FlickerReduce",
  "FlickerReduction",
  "FlickerReductionIndicator",
  "FlickerReductionShooting",
  "FlightDegree",
  "FlightSpeed",
  "FocalLengthTeleZoom",
  "FocalPlaneAFPointArea",
  "FocalPlaneAFPointsUsed",
  "FocalPlaneDiagonal",
  "FocalPlaneXSize",
  "FocalPlaneYSize",
  "FocalType",
  "FocalUnits",
  "FocusArea",
  "FocusAreaSelection",
  "FocusBracket",
  "FocusBracketStepSize",
  "FocusContinuous",
  "FocusDisplayAIServoAndMF",
  "FocusDistanceRange",
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
  "FocusStepInfinity",
  "FocusStepNear",
  "FocusTrackingLockOn",
  "FocusWarning",
  "FolderName",
  "FolderNumber",
  "FrameNumber",
  "FramingGridDisplay",
  "FreeBytes",
  "FreeMemoryCardImages",
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
  "GripBatteryState",
  "GroupAreaAFIllumination",
  "HDMIBitDepth",
  "HDMIExternalRecorder",
  "HDMIOutputRange",
  "HDMIOutputResolution",
  "HDR",
  "HDREffect",
  "HDRGain",
  "HDRHeadroom",
  "HDRImageType",
  "HDRInfoVersion",
  "HDRLevel",
  "HDRSetting",
  "HDRSmoothing",
  "HiddenDataLength",
  "HiddenDataOffset",
  "HighFrameRate",
  "HighISONoiseReduction",
  "Highlight",
  "Highlights",
  "HighlightShadow",
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
  "ImageDataSize",
  "ImageEditCount",
  "ImageEditing",
  "ImageEffects",
  "ImageGeneration",
  "ImageIDNumber",
  "ImageOptimization",
  "ImageProcessing",
  "ImageProcessingVersion",
  "ImageQuality",
  "ImageReview",
  "ImageReviewMonitorOffTime",
  "ImageReviewTime",
  "ImageRotated",
  "ImageSizeRAW",
  "ImageStabilization",
  "ImageStabilizationSetting",
  "ImageStyle",
  "ImageTemperatureMax",
  "ImageTemperatureMin",
  "ImageTone",
  "ImageUniqueID",
  "InfoButtonWhenShooting",
  "InfraredIlluminator",
  "InitialAFPointAIServoAF",
  "InitialAFPointInServo",
  "InitialZoomLiveView",
  "InitialZoomSetting",
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
  "KodakImageHeight",
  "KodakImageWidth",
  "KodakInfoType",
  "KodakMake",
  "KodakMaker",
  "KodakModel",
  "KodakVersion",
  "Language",
  "LastFileNumber",
  "LateralChromaticAberration",
  "LCDDisplayAtPowerOn",
  "LCDDisplayReturnToShoot",
  "LCDIllumination",
  "LCDIlluminationDuringBulb",
  "LCDPanels",
  "LensApertureRange",
  "LensControlRing",
  "LensDataVersion",
  "LensDistortionParams",
  "LensDriveNoAF",
  "LensDriveWhenAFImpossible",
  "LensFirmware",
  "LensFirmwareVersion",
  "LensFocalLength",
  "LensFocalRange",
  "LensFocusFunctionButtons",
  "LensFormat",
  "LensFStops",
  "LensFunc1Button",
  "LensFunc2Button",
  "LensIDNumber",
  "LensMaxApertureRange",
  "LensModulationOptimizer",
  "LensMount",
  "LensMountType",
  "LensPositionAbsolute",
  "LensProperties",
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
  "LevelIndicator",
  "LevelOrientation",
  "LightCondition",
  "LightingMode",
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
  "LongExposureNoiseReduction",
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
  "MakerNoteOffset",
  "MakerNoteType",
  "MakerNoteVersion",
  "ManometerPressure",
  "ManometerReading",
  "ManualAFPointSelectPattern",
  "ManualAFPointSelPattern",
  "ManualFlash",
  "ManualFlashOutput",
  "ManualFlashStrength",
  "ManualFocusDistance",
  "ManualFocusPointIllumination",
  "ManualFocusRingInAFMode",
  "ManualTv",
  "ManufactureDate",
  "MasterGain",
  "MatrixMetering",
  "MaxAperture",
  "MaxApertureAtMaxFocal",
  "MaxApertureAtMinFocal",
  "MaxContinuousRelease",
  "MaxFaces",
  "MaxFocalLength",
  "MCCData",
  "MCUVersion",
  "MeasuredEV",
  "MeasuredLV",
  "MeasuredRGGB",
  "MeasuredRGGBData",
  "MechanicalShutterCount",
  "MemoAudioQuality",
  "MemoryCardConfiguration",
  "MemoryCardNumber",
  "MenuButtonDisplayPosition",
  "MenuButtonReturn",
  "MenuMonitorOffTime",
  "MergedImages",
  "MetaVersion",
  "Metering",
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
  "ModelingFlash",
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
  "MonochromeGrainEffect",
  "MonochromeProfileSettings",
  "MonochromeToning",
  "MonochromeVignetting",
  "MonthDayCreated",
  "MoonPhase",
  "MotionSensitivity",
  "MovieAELockButtonAssignment",
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
  "MovieType",
  "MovieWhiteBalanceSameAsPhoto",
  "MultiControllerWhileMetering",
  "MultiExposure",
  "MultiExposureAutoGain",
  "MultiExposureControl",
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
  "NEFBitDepth",
  "NEFCompression",
  "NEFLinearizationTable",
  "NeutralDensityFilter",
  "NikonCaptureVersion",
  "NikonImageSize",
  "NikonMeteringMode",
  "NoiseFilter",
  "NoiseReduction",
  "NoiseReductionStrength",
  "NoMemoryCard",
  "NominalMaxAperture",
  "NominalMinAperture",
  "NormalWhiteLevel",
  "NumberOfFocusPoints",
  "NumberOffsets",
  "NumFaceElements",
  "NumFacePositions",
  "ObjectDistance",
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
  "OrientationLinkedAF",
  "OrientationLinkedAFPoint",
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
  "PentaxImageSize",
  "PentaxModelID",
  "PentaxModelType",
  "PentaxVersion",
  "PerChannelBlackLevel",
  "PeripheralIlluminationCorr",
  "PeripheralLighting",
  "PeripheralLightingSetting",
  "PeripheralLightingValue",
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
  "PictureModeTone",
  "PictureProfile",
  "PictureStyle",
  "PictureStylePC",
  "PictureStyleUserDef",
  "Pitch",
  "PitchAngle",
  "PixelAspectRatio",
  "PixelShiftInfo",
  "PixelShiftResolution",
  "PixelShiftShooting",
  "PlaybackMenusTime",
  "PlaybackMonitorOffTime",
  "PlaybackZoom",
  "PlayDisplay",
  "POILevel",
  "PopupFlash",
  "PortraitImpressionBalance",
  "PortraitRefiner",
  "PostFocusMerging",
  "PostReleaseBurstLength",
  "PowerSource",
  "PowerUpTime",
  "PreAF",
  "PreCaptureFrames",
  "PreReleaseBurstLength",
  "PresetWhiteBalance",
  "PreviewButton",
  "PreviewButtonPlusDials",
  "PreviewImageBorders",
  "PreviewImageHeight",
  "PreviewImageLength",
  "PreviewImageSize",
  "PreviewImageStart",
  "PreviewImageValid",
  "PreviewImageWidth",
  "PreviewQuality",
  "PrimaryAFPoint",
  "PrimarySlot",
  "PrioritySetupShutterRelease",
  "ProductionCode",
  "ProgramISO",
  "ProgramLine",
  "ProgramShift",
  "Quality",
  "QuickControlDialInMeter",
  "QuickShot",
  "RangeFinder",
  "RawAndJpgRecording",
  "RawDataByteOrder",
  "RawDataCFAPattern",
  "RawDataLength",
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
  "RAWFileType",
  "RawImageCenter",
  "RawImageHeight",
  "RawImageWidth",
  "RawJpgQuality",
  "RawJpgSize",
  "RawMeasuredRGGB",
  "RearDisplay",
  "RecordDisplay",
  "RecordID",
  "RecordingFormat",
  "RecordingMode",
  "RecordMode",
  "RecordShutterRelease",
  "RedEyeRemoval",
  "RedGain",
  "ReleaseButtonToUseDial",
  "ReleaseMode",
  "RemoteFuncButton",
  "RemoteOnDuration",
  "RepeatingFlashCount",
  "RepeatingFlashOutput",
  "RepeatingFlashOutputExternal",
  "RepeatingFlashRate",
  "Resaved",
  "ResolutionMode",
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
  "RFLensType",
  "RicohDate",
  "RicohImageHeight",
  "RicohImageWidth",
  "RicohMake",
  "RicohModel",
  "Roll",
  "RollAngle",
  "ROMOperationMode",
  "RunTimeEpoch",
  "RunTimeFlags",
  "RunTimeScale",
  "RunTimeValue",
  "SafetyShift",
  "SafetyShiftInAvOrTv",
  "SameExposureForNewAperture",
  "SamsungModelID",
  "SanyoQuality",
  "SanyoThumbnail",
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
  "SelectAFAreaSelectionMode",
  "SelectAFAreaSelectMode",
  "SelfTimer",
  "SelfTimerInterval",
  "SelfTimerShotCount",
  "SelfTimerShotInterval",
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
  "SerialNumberFormat",
  "SetButtonCrossKeysFunc",
  "SetButtonWhenShooting",
  "SetFunctionWhenShooting",
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
  "SharpnessNeutral",
  "SharpnessPortrait",
  "SharpnessRange",
  "SharpnessSetting",
  "SharpnessStandard",
  "SharpnessTable",
  "ShootingInfoDisplay",
  "ShootingInfoMonitorOffTime",
  "ShootingModeSetting",
  "ShortOwnerName",
  "ShortReleaseTimeLag",
  "ShotInfoVersion",
  "ShotNumberSincePowerUp",
  "ShotsPerInterval",
  "Shutter",
  "ShutterAELButton",
  "ShutterButtonAFOnButton",
  "ShutterCount",
  "ShutterCount2",
  "ShutterCount3",
  "ShutterCurtainSync",
  "ShutterMode",
  "ShutterReleaseMethod",
  "ShutterReleaseNoCFCard",
  "ShutterReleaseTiming",
  "ShutterReleaseWithoutLens",
  "ShutterSpeedLock",
  "ShutterSpeedRange",
  "ShutterSpeedSetting",
  "ShutterType",
  "SignalToNoiseRatio",
  "SilentPhotography",
  "SingleFrame",
  "SingleFrameBracketing",
  "SkinToneCorrection",
  "SlaveFlashMeteringSegments",
  "SlowShutter",
  "SlowSync",
  "SmartAlbumColor",
  "SmileShutter",
  "SmileShutterMode",
  "SoftFocusFilter",
  "SoftSkinEffect",
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
  "SonyTimeMinSec",
  "SourceDirectoryIndex",
  "SourceFileIndex",
  "SpecialEffectLevel",
  "SpecialEffectMode",
  "SpecialEffectSetting",
  "SpecialMode",
  "SpecularWhiteLevel",
  "SpeedX",
  "SpeedY",
  "SpeedZ",
  "SpotFocusPointX",
  "SpotFocusPointY",
  "SpotMeteringMode",
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
  "StopsAboveBaseISO",
  "StoreByOrientation",
  "SubDialFrameAdvance",
  "SubjectDetection",
  "SubjectDetectionAreaMF",
  "SubjectMotion",
  "SubjectProgram",
  "SubjectToDetect",
  "SubSelector",
  "SubSelectorAssignment",
  "SubSelectorCenter",
  "SubSelectorPlusDials",
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
  "ThumbnailImageValidArea",
  "ThumbnailWidth",
  "TiffMeteringImage",
  "TiffMeteringImageHeight",
  "TiffMeteringImageWidth",
  "Time",
  "TimeLapseShotNumber",
  "TimerFunctionButton",
  "TimerLength",
  "TimerRecording",
  "TimeSincePowerOn",
  "TimeStamp",
  "TimeZone",
  "TimeZoneCity",
  "TimeZoneCode",
  "TimeZoneInfo",
  "ToneComp",
  "ToneCurve",
  "ToneCurveMatching",
  "ToneCurveTable",
  "ToneLevel",
  "ToningEffect",
  "ToningEffectAuto",
  "ToningSaturation",
  "TotalZoom",
  "TouchAE",
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
  "UsableMeteringModes",
  "UsableShootingModes",
  "USBPowerDelivery",
  "UserLabel",
  "UserProfile",
  "USMLensElectronicMF",
  "ValidBits",
  "VariableLowPassFilter",
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
  "VideoPreburst",
  "ViewfinderDisplay",
  "ViewfinderWarning",
  "ViewfinderWarnings",
  "ViewInfoDuringExposure",
  "ViewingMode",
  "VignetteControl",
  "Vignetting",
  "VignettingCorrection",
  "VignettingCorrParams",
  "VignettingCorrVersion",
  "VoiceMemo",
  "VRDOffset",
  "VRInfoVersion",
  "VRMode",
  "VRType",
  "WatercolorFilter",
  "WBBlueLevel",
  "WBBracketingSteps",
  "WBBracketMode",
  "WBBracketShotNumber",
  "WBBracketValueAB",
  "WBBracketValueGM",
  "WBButtonPlaybackMode",
  "WBGreenLevel",
  "WBMediaImageSizeSetting",
  "WBMode",
  "WBRedLevel",
  "WBShiftAB",
  "WBShiftCreativeControl",
  "WBShiftGM",
  "WBShiftIntelligentAuto",
  "WhiteBalanceAutoAdjustment",
  "WhiteBalanceBias",
  "WhiteBalanceBlue",
  "WhiteBalanceBracket",
  "WhiteBalanceBracketing",
  "WhiteBalanceFineTune",
  "WhiteBalanceMatching",
  "WhiteBalanceMode",
  "WhiteBalanceRed",
  "WhiteBalanceSet",
  "WhiteBalanceSetting",
  "WhiteBalanceSetup",
  "WhiteBalanceTable",
  "WhiteBalanceTemperature",
  "WhiteBoard",
  "WideAdapter",
  "WideFocusZone",
  "WideRange",
  "WorldTimeLocation",
  "X3FillLight",
  "Xidiri",
  "Yaw",
  "YawAngle",
  "YearCreated",
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
  /** ☆☆☆☆ ✔ Example: "uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" */
  About?: string;
  /** ☆☆☆☆   Example: "+823.75" */
  AbsoluteAltitude?: string;
  /** ☆☆☆☆   Example: "Twilight Dreams" */
  Album?: string;
  /** ☆☆☆☆ ✔ Example: true */
  AlreadyApplied?: boolean;
  /** ☆☆☆☆ ✔ Example: 5.01 */
  ApproximateFocusDistance?: number;
  /** ☆☆☆☆   Example: 0 */
  AsrClimaxDuration?: number;
  /** ☆☆☆☆   Example: "None" */
  AsrClimaxScene?: string;
  /** ☆☆☆☆   Example: 0 */
  AsrIsMacroRange?: number;
  /** ☆☆☆☆   Example: "Stable" */
  AsrSceneCondition?: string;
  /** ☆☆☆☆   Example: "NightPortrait" */
  AsrSceneMode?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  AutoLateralCA?: number;
  /** ☆☆☆☆   Example: ["LWIR"] */
  BandName?: string[];
  /** ☆☆☆☆ ✔ Example: 0 */
  BlueHue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  BlueSaturation?: number;
  /** ☆☆☆☆ ✔ Example: "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89" */
  BurstID?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  BurstPrimary?: number;
  /** ☆☆☆☆ ✔ Example: "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89" */
  CameraBurstID?: string;
  /** ☆☆☆☆   Example: "Front" */
  CameraFacing?: string;
  /** ☆☆☆☆ ✔ Example: "" */
  CameraModelID?: string;
  /** ☆☆☆☆ ✔ Example: "Embedded" */
  CameraProfile?: string;
  /** ☆☆☆☆ ✔ Example: "D4FE5D91640D0C5A01B5633EB8061002" */
  CameraProfileDigest?: string;
  /** ☆☆☆☆ ✔ Example: [{"Camera":{"DepthMap":{"ConfidenceURI":"android/confiden…cal"}}] */
  Cameras?: Struct[];
  /** ☆☆☆☆   Example: "Rear" */
  CameraUnit?: string;
  /** ☆☆☆☆   Example: 0 */
  CamReverse?: number;
  /** ☆☆☆☆ ✔ Example: "Photo" */
  CaptureMode?: string;
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  CaptureSoftware?: string;
  /** ☆☆☆☆ ✔ Example: ["Subjekt|Natur|Pflanzen","Ort|Deutschland|Rangsdorf"] */
  CatalogSets?: string[];
  /** ☆☆☆☆   Example: "240-8-330-901211" */
  CellGlobalID?: string;
  /** ☆☆☆☆   Example: 5 */
  CellR?: number;
  /** ☆☆☆☆   Example: 901211 */
  CellTowerID?: number;
  /** ☆☆☆☆   Example: 45 */
  CentralTemperature?: number;
  /** ☆☆☆☆   Example: [10000] */
  CentralWavelength?: number[];
  /** ☆☆☆☆ ✔ Example: ["tag,2011-07-26T05:44:01Z,0,c"] */
  Changes?: string[];
  /** ☆☆☆☆ ✔ Example: [{"CorrectionActive":true,"CorrectionAmount":1,"Correctio…tion"}] */
  CircularGradientBasedCorrections?: Struct[];
  /** ☆☆☆☆ ✔ Example: "3 (Superior)" */
  ColorClass?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorLabel?: number;
  /** ☆☆☆☆ ✔ Example: "" */
  Colorlabels?: string;
  /** ☆☆☆☆ ✔ Example: 25 */
  ColorNoiseReduction?: number;
  /** ☆☆☆☆ ✔ Example: 50 */
  ColorNoiseReductionDetail?: number;
  /** ☆☆☆☆ ✔ Example: 50 */
  ColorNoiseReductionSmoothness?: number;
  /** ☆☆☆☆ ✔ Example: "This is a comment." */
  Comment?: string;
  /** ☆☆☆☆ ✔ Example: {"Directory":[{"Item":{"DataURI":"primary_image","Length"…eg"}}]} */
  Container?: Struct;
  /** ☆☆☆☆   Example: "/home/username/pictures" */
  ContainerDirectory?: ContainerDirectoryItem[] | Struct[];
  /** ☆☆☆☆ ✔ Example: false */
  ConvertToGrayscale?: boolean;
  /** ☆☆☆☆ ✔ Example: "United States" */
  Country?: string;
  /** ☆☆☆☆ ✔ Example: "ir" */
  CountryCode?: string;
  /** ☆☆☆☆   Example:  */
  CreationTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: ["daniel@woss.io"] */
  Creator?: string[];
  /** ☆☆☆☆   Example: "{2d7e7fd6-2942-4d77-9842-389c3f62b14d}" */
  CreatorAppID?: string;
  /** ☆☆☆☆ ✔ Example: {"CiAdrCity":"Amsterdam","CiAdrCtry":"Netherlands","CiAdr…73 CH"} */
  CreatorContactInfo?: Struct;
  /** ☆☆☆☆   Example: 1 */
  CreatorOpenWithUIOptions?: number;
  /** ☆☆☆☆   Example: "Version Ver 1.04 " */
  Creatortool?: string;
  /** ☆☆☆☆ ✔ Example: "picnik.com" */
  CreatorTool?: string;
  /** ☆☆☆☆   Example: 0 */
  CropAngle?: number;
  /** ☆☆☆☆   Example: 1 */
  CropBottom?: number;
  /** ☆☆☆☆   Example: 0 */
  CropConstrainToWarp?: number;
  /** ☆☆☆☆ ✔ Example: "8 0" */
  CropLeft?: string;
  /** ☆☆☆☆ ✔ Example: 3872 */
  CroppedAreaImageHeightPixels?: number;
  /** ☆☆☆☆ ✔ Example: 7744 */
  CroppedAreaImageWidthPixels?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  CroppedAreaLeftPixels?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  CroppedAreaTopPixels?: number;
  /** ☆☆☆☆   Example: 1 */
  CropRight?: number;
  /** ☆☆☆☆ ✔ Example: "8 0" */
  CropTop?: string;
  /** ☆☆☆☆ ✔ Example: "2014:05:11 13:08:25.659" */
  DateAcquired?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "2023:11:07" */
  DateCreated?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "2017:08:13 12:38:30" */
  DateTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "2017:08:13 12:38:30" */
  DateTimeDigitized?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "2015:06:02 09:56:01" */
  DateUTC?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 0 */
  DefringeGreenAmount?: number;
  /** ☆☆☆☆ ✔ Example: 60 */
  DefringeGreenHueHi?: number;
  /** ☆☆☆☆ ✔ Example: 40 */
  DefringeGreenHueLo?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  DefringePurpleAmount?: number;
  /** ☆☆☆☆ ✔ Example: 70 */
  DefringePurpleHueHi?: number;
  /** ☆☆☆☆ ✔ Example: 30 */
  DefringePurpleHueLo?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  Dehaze?: number;
  /** ☆☆☆☆ ✔ Example:  */
  DerivedFrom?: string;
  /** ☆☆☆☆ ✔ Example: "nfd" */
  Description?: string;
  /** ☆☆☆☆ ✔ Example: ["Animation","Collage"] */
  DisableAutoCreation?: string[];
  /** ☆☆☆☆ ✔ Example: "xmp.did:7bf80ec8-c5cf-4881-b631-5ac83ae65ce2" */
  DocumentID?: string;
  /** ☆☆☆☆   Example: [{"FaceAnglePitch":0.009265,"FaceAngleRoll":-0.021281,"Fa…re":4}] */
  Face?: Struct[];
  /** ☆☆☆☆   Example: 1 */
  FaceNum?: number;
  /** ☆☆☆☆   Example: 0 */
  FaceSelectedIndex?: number;
  /** ☆☆☆☆   Example: 8 */
  Far?: number;
  /** ☆☆☆☆ ✔ Example: "u77" */
  Firmware?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashCompensation?: number;
  /** ☆☆☆☆ ✔ Example: "Example flash make" */
  FlashManufacturer?: string;
  /** ☆☆☆☆ ✔ Example: "FlashPix Version 1.0" */
  FlashPixVersion?: string;
  /** ☆☆☆☆   Example: 3.8 */
  FlightPitchDegree?: number;
  /** ☆☆☆☆   Example: 4.5 */
  FlightRollDegree?: number;
  /** ☆☆☆☆   Example: 88.699997 */
  FlightYawDegree?: number;
  /** ☆☆☆☆   Example: 6553500 */
  FocusAreaHeight?: number;
  /** ☆☆☆☆   Example: 1 */
  FocusAreaNum?: number;
  /** ☆☆☆☆   Example: 6553500 */
  FocusAreaWidth?: number;
  /** ☆☆☆☆   Example: 0 */
  FocusIsLensMoving?: number;
  /** ☆☆☆☆   Example: 3372647 */
  FocusPosX?: number;
  /** ☆☆☆☆   Example: 936214 */
  FocusPosY?: number;
  /** ☆☆☆☆   Example: "Inactive" */
  FocusState?: string;
  /** ☆☆☆☆ ✔ Example: "image/jpg" */
  Format?: string;
  /** ☆☆☆☆ ✔ Example: 3872 */
  FullPanoHeightPixels?: number;
  /** ☆☆☆☆ ✔ Example: 7744 */
  FullPanoWidthPixels?: number;
  /** ☆☆☆☆   Example: -90 */
  GimbalPitchDegree?: number;
  /** ☆☆☆☆   Example: 0 */
  GimbalReverse?: number;
  /** ☆☆☆☆   Example: "+0.00" */
  GimbalRollDegree?: string;
  /** ☆☆☆☆   Example: "+90.80" */
  GimbalYawDegree?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  GrainAmount?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  GreenHue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  GreenSaturation?: number;
  /** ☆☆☆☆ ✔ Example: false */
  HasCrop?: boolean;
  /** ☆☆☆☆ ✔ Example: "F995C3239BC6E6FC1997814864CD2CA2" */
  HasExtendedXMP?: string;
  /** ☆☆☆☆ ✔ Example: true */
  HasSettings?: boolean;
  /** ☆☆☆☆ ✔ Example: "(Binary data 23388 bytes, use -b option to extract)" */
  HdrPlusMakernote?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: "(Binary data 49603 bytes, use -b option to extract)" */
  HDRPMakerNote?: BinaryField | string;
  /** ☆☆☆☆ ✔ Example: ["点像F11"] */
  HierarchicalSubject?: string[];
  /** ☆☆☆☆ ✔ Example: [{"Action":"converted","Parameters":"from image/x-canon-c…alse}}] */
  History?: ResourceEvent[] | ResourceEvent | string;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentAqua?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentBlue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentGreen?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentMagenta?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentOrange?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentPurple?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentRed?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentYellow?: number;
  /** ☆☆☆☆ ✔ Example: "sRGB IEC61966-2.1" */
  ICCProfileName?: string;
  /** ☆☆☆☆ ✔ Example: 4048 */
  ImageLength?: number;
  /** ☆☆☆☆ ✔ Example: 9956 */
  ImageNumber?: number;
  /** ☆☆☆☆ ✔ Example: 180 */
  InitialViewHeadingDegrees?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  InitialViewPitchDegrees?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  InitialViewRollDegrees?: number;
  /** ☆☆☆☆ ✔ Example: "xmp.iid:f9edd04d-34a3-41cc-909f-5a49fc5b8154" */
  InstanceID?: string;
  /** ☆☆☆☆ ✔ Example: "N" */
  InteroperabilityIndex?: string;
  /** ☆☆☆☆ ✔ Example: "18, 25, 24.96" */
  InteroperabilityVersion?: string;
  /** ☆☆☆☆ ✔ Example: true */
  IsBokehActive?: boolean;
  /** ☆☆☆☆ ✔ Example: true */
  IsHDRActive?: boolean;
  /** ☆☆☆☆ ✔ Example: false */
  IsNightModeActive?: boolean;
  /** ☆☆☆☆ ✔ Example: "選択" */
  Label?: string;
  /** ☆☆☆☆ ✔ Example: ["red fish","bluefish"] */
  LastKeywordXMP?: string[];
  /** ☆☆☆☆ ✔ Example: "F351B7C76CEF50C906DB9B78A92FB1B4" */
  LegacyIPTCDigest?: string;
  /** ☆☆☆☆ ✔ Example: "Back" */
  LensFacing?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  LensManualDistortionAmount?: number;
  /** ☆☆☆☆ ✔ Example: "Example lens make" */
  LensManufacturer?: string;
  /** ☆☆☆☆ ✔ Example: 1 */
  LensProfileEnable?: number;
  /** ☆☆☆☆   Example: "Camera Settings" */
  LensProfileName?: string;
  /** ☆☆☆☆ ✔ Example: "LensDefaults" */
  LensProfileSetup?: string;
  /** ☆☆☆☆   Example: 37087 */
  LocationAreaCode?: number;
  /** ☆☆☆☆ ✔ Example: {"Amount":1,"Group":"Profiles","Name":"Adobe Color","Para…A7077"} */
  Look?: Struct;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentAqua?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentBlue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentGreen?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentMagenta?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentOrange?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentPurple?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentRed?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentYellow?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceSmoothing?: number;
  /** ☆☆☆☆ ✔ Example: "4577 bytes undefined data" */
  MakerNote?: string;
  /** ☆☆☆☆ ✔ Example: true */
  Marked?: boolean;
  /** ☆☆☆☆ ✔ Example: "" */
  Mask?: string;
  /** ☆☆☆☆ ✔ Example: "2024:10:02 15:51:50-07:00" */
  MetadataDate?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: 1 */
  MicroVideo?: number;
  /** ☆☆☆☆ ✔ Example: 2448784 */
  MicroVideoOffset?: number;
  /** ☆☆☆☆ ✔ Example: 366563 */
  MicroVideoPresentationTimestampUs?: number;
  /** ☆☆☆☆ ✔ Example: 1 */
  MicroVideoVersion?: number;
  /** ☆☆☆☆   Example: "image/jpeg" */
  Mime?: string;
  /** ☆☆☆☆   Example: 240 */
  MobileCountryCode?: number;
  /** ☆☆☆☆   Example: 8 */
  MobileNetworkCode?: number;
  /** ☆☆☆☆ ✔ Example: "2015:06:02 09:56:01" */
  ModificationDate?: ExifDateTime | string;
  /** ☆☆☆☆   Example: 1 */
  MotionPhoto?: number;
  /** ☆☆☆☆   Example: 717986 */
  MotionPhotoPresentationTimestampUs?: number;
  /** ☆☆☆☆   Example: 1 */
  MotionPhotoVersion?: number;
  /** ☆☆☆☆   Example: "36864,40960,40961,37121,37122,40962,40963,37510,40964,368…B0A1251" */
  NativeDigest?: string;
  /** ☆☆☆☆   Example: 115.4 */
  Near?: number;
  /** ☆☆☆☆   Example: "Album description" */
  Notes?: string;
  /** ☆☆☆☆   Example: 561 */
  ObjectAreaHeight?: number;
  /** ☆☆☆☆   Example: 884 */
  ObjectAreaWidth?: number;
  /** ☆☆☆☆   Example: 1 */
  ObjectNum?: number;
  /** ☆☆☆☆   Example: 1890 */
  ObjectPosX?: number;
  /** ☆☆☆☆   Example: 1796 */
  ObjectPosY?: number;
  /** ☆☆☆☆   Example:  */
  OriginalCreateDateTime?: ExifDateTime | string;
  /** ☆☆☆☆ ✔ Example: "xmp.did:7bf80ec8-c5cf-4881-b631-5ac83ae65ce2" */
  OriginalDocumentID?: string;
  /** ☆☆☆☆ ✔ Example: false */
  OverrideLookVignette?: boolean;
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricDarks?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricHighlights?: number;
  /** ☆☆☆☆ ✔ Example: 75 */
  ParametricHighlightSplit?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricLights?: number;
  /** ☆☆☆☆ ✔ Example: 50 */
  ParametricMidtoneSplit?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricShadows?: number;
  /** ☆☆☆☆ ✔ Example: 25 */
  ParametricShadowSplit?: number;
  /** ☆☆☆☆ ✔ Example: ["John Doe"] */
  PersonInImage?: string[];
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveAspect?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveHorizontal?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveRotate?: number;
  /** ☆☆☆☆ ✔ Example: 100 */
  PerspectiveScale?: number;
  /** ☆☆☆☆ ✔ Example: "Off" */
  PerspectiveUpright?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveVertical?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveX?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveY?: number;
  /** ☆☆☆☆ ✔ Example: 80 */
  PhotographicSensitivity?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PickLabel?: number;
  /** ☆☆☆☆ ✔ Example: "01.00" */
  PipelineVersion?: string;
  /** ☆☆☆☆ ✔ Example: "PM6" */
  PMVersion?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  PortraitVersion?: number;
  /** ☆☆☆☆ ✔ Example: 22.5 */
  PoseHeadingDegrees?: number;
  /** ☆☆☆☆ ✔ Example: 11.2 */
  PosePitchDegrees?: number;
  /** ☆☆☆☆ ✔ Example: 1.6 */
  PoseRollDegrees?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  PostCropVignetteAmount?: number;
  /** ☆☆☆☆ ✔ Example: "DSCF0722.JPG" */
  PreservedFileName?: string;
  /** ☆☆☆☆ ✔ Example: 11 */
  ProcessVersion?: number;
  /** ☆☆☆☆ ✔ Example: [{"Profile":{"CameraIndices":[0],"Type":"DepthPhoto"}}] */
  Profiles?: Struct[];
  /** ☆☆☆☆   Example:  */
  ProgramMode?: string;
  /** ☆☆☆☆ ✔ Example: "equirectangular" */
  ProjectionType?: string;
  /** ★★☆☆ ✔ Example: 5 */
  Rating?: number;
  /** ☆☆☆☆ ✔ Example: 50 */
  RatingPercent?: number;
  /** ☆☆☆☆ ✔ Example: "P2030414.jpg" */
  RawFileName?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  RedHue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  RedSaturation?: number;
  /** ☆☆☆☆ ✔ Example: {"AppliedToDimensions":{"H":3552,"W":2000},"RegionList":[…ace"}]} */
  RegionInfo?: Struct;
  /** ☆☆☆☆ ✔ Example: {"Regions":""} */
  RegionInfoMP?: Struct;
  /** ☆☆☆☆ ✔ Example: [{"RegItemId":"Number1","RegOrgId":"TestName1"},{"RegItem…ame3"}] */
  RegistryID?: Struct[];
  /** ☆☆☆☆   Example: "+90.80" */
  RelativeAltitude?: string;
  /** ☆☆☆☆ ✔ Example: "Kawp E. Reite Houldre" */
  Rights?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentAqua?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentBlue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentGreen?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentMagenta?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentOrange?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentPurple?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentRed?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentYellow?: number;
  /** ☆☆☆☆ ✔ Example: "AutoHDR" */
  Scene?: string;
  /** ☆☆☆☆ ✔ Example: "[0.997883, 0.92984027]" */
  SceneDetectResultConfidences?: string;
  /** ☆☆☆☆ ✔ Example: "[901, 60, 0]" */
  SceneDetectResultIds?: string;
  /** ☆☆☆☆   Example: "Undefined" */
  SelfData?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  ShadowTint?: number;
  /** ☆☆☆☆ ✔ Example: 25 */
  SharpenDetail?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SharpenEdgeMasking?: number;
  /** ☆☆☆☆ ✔ Example: "+1.0" */
  SharpenRadius?: string;
  /** ☆☆☆☆ ✔ Example: 2 */
  SourcePhotosCount?: number;
  /** ☆☆☆☆ ✔ Example: ["com.google.android.apps.camera.gallery.specialtype.Spec…TRAIT"] */
  SpecialTypeID?: string[];
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningBalance?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningHighlightHue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningHighlightSaturation?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningShadowHue?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningShadowSaturation?: number;
  /** ☆☆☆☆ ✔ Example: "Washington" */
  State?: string;
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  StitchingSoftware?: string;
  /** ☆☆☆☆ ✔ Example: 3 */
  StreamType?: number;
  /** ☆☆☆☆ ✔ Example: ["点像F11"] */
  Subject?: string[];
  /** ☆☆☆☆ ✔ Example: 296185 */
  SubsecTime?: number;
  /** ☆☆☆☆ ✔ Example: "#MB%:{9C0B071B-5553-4D89-B252-934C9EC1E04D}GBMB1:%MB#" */
  Tag?: string;
  /** ☆☆☆☆ ✔ Example: "Yes" */
  Tagged?: string;
  /** ☆☆☆☆ ✔ Example: ["Subjekt/Natur/Pflanzen","Ort/Deutschland/Rangsdorf"] */
  TagsList?: string[];
  /** ☆☆☆☆ ✔ Example: "+5" */
  Tint?: string;
  /** ☆☆☆☆ ✔ Example: "Very Blank" */
  Title?: string;
  /** ☆☆☆☆   Example: 0 */
  TlinearGain?: number;
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveBlue?: string[];
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveGreen?: string[];
  /** ☆☆☆☆ ✔ Example: "Medium Contrast" */
  ToneCurveName?: string;
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Blue?: string[];
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Green?: string[];
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Red?: string[];
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveRed?: string[];
  /** ☆☆☆☆ ✔ Example: 0 */
  ToneMapStrength?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightCenterMode?: number;
  /** ☆☆☆☆ ✔ Example: 0.5 */
  UprightCenterNormX?: number;
  /** ☆☆☆☆ ✔ Example: 0.5 */
  UprightCenterNormY?: number;
  /** ☆☆☆☆ ✔ Example: 35 */
  UprightFocalLength35mm?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightFocalMode?: number;
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightFourSegmentsCount?: number;
  /** ☆☆☆☆ ✔ Example: false */
  UprightPreview?: boolean;
  /** ☆☆☆☆ ✔ Example: 6 */
  UprightTransformCount?: number;
  /** ☆☆☆☆ ✔ Example: 151388160 */
  UprightVersion?: number;
  /** ☆☆☆☆ ✔ Example: true */
  UsePanoramaViewer?: boolean;
  /** ☆☆☆☆   Example:  */
  Versions?: Version[] | Version | string;
  /** ☆☆☆☆ ✔ Example: "+21" */
  Vibrance?: string;
  /** ☆☆☆☆ ✔ Example: 0 */
  VignetteAmount?: number;
  /** ☆☆☆☆   Example: [4500] */
  WavelengthFWHM?: number[];
  /** ☆☆☆☆   Example: "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><…="0" />" */
  XMPMeta?: string;
  /** ☆☆☆☆ ✔ Example: "XMP toolkit 3.0-28, framework 1.6" */
  XMPToolkit?: string;
}

export const XMPTagsNames = strEnum(
  "About",
  "AbsoluteAltitude",
  "Album",
  "AlreadyApplied",
  "ApproximateFocusDistance",
  "AsrClimaxDuration",
  "AsrClimaxScene",
  "AsrIsMacroRange",
  "AsrSceneCondition",
  "AsrSceneMode",
  "AutoLateralCA",
  "BandName",
  "BlueHue",
  "BlueSaturation",
  "BurstID",
  "BurstPrimary",
  "CameraBurstID",
  "CameraFacing",
  "CameraModelID",
  "CameraProfile",
  "CameraProfileDigest",
  "Cameras",
  "CameraUnit",
  "CamReverse",
  "CaptureMode",
  "CaptureSoftware",
  "CatalogSets",
  "CellGlobalID",
  "CellR",
  "CellTowerID",
  "CentralTemperature",
  "CentralWavelength",
  "Changes",
  "CircularGradientBasedCorrections",
  "ColorClass",
  "ColorLabel",
  "Colorlabels",
  "ColorNoiseReduction",
  "ColorNoiseReductionDetail",
  "ColorNoiseReductionSmoothness",
  "Comment",
  "Container",
  "ContainerDirectory",
  "ConvertToGrayscale",
  "Country",
  "CountryCode",
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
  "CropLeft",
  "CroppedAreaImageHeightPixels",
  "CroppedAreaImageWidthPixels",
  "CroppedAreaLeftPixels",
  "CroppedAreaTopPixels",
  "CropRight",
  "CropTop",
  "DateAcquired",
  "DateCreated",
  "DateTime",
  "DateTimeDigitized",
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
  "DisableAutoCreation",
  "DocumentID",
  "Face",
  "FaceNum",
  "FaceSelectedIndex",
  "Far",
  "Firmware",
  "FlashCompensation",
  "FlashManufacturer",
  "FlashPixVersion",
  "FlightPitchDegree",
  "FlightRollDegree",
  "FlightYawDegree",
  "FocusAreaHeight",
  "FocusAreaNum",
  "FocusAreaWidth",
  "FocusIsLensMoving",
  "FocusPosX",
  "FocusPosY",
  "FocusState",
  "Format",
  "FullPanoHeightPixels",
  "FullPanoWidthPixels",
  "GimbalPitchDegree",
  "GimbalReverse",
  "GimbalRollDegree",
  "GimbalYawDegree",
  "GrainAmount",
  "GreenHue",
  "GreenSaturation",
  "HasCrop",
  "HasExtendedXMP",
  "HasSettings",
  "HdrPlusMakernote",
  "HDRPMakerNote",
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
  "ImageLength",
  "ImageNumber",
  "InitialViewHeadingDegrees",
  "InitialViewPitchDegrees",
  "InitialViewRollDegrees",
  "InstanceID",
  "InteroperabilityIndex",
  "InteroperabilityVersion",
  "IsBokehActive",
  "IsHDRActive",
  "IsNightModeActive",
  "Label",
  "LastKeywordXMP",
  "LegacyIPTCDigest",
  "LensFacing",
  "LensManualDistortionAmount",
  "LensManufacturer",
  "LensProfileEnable",
  "LensProfileName",
  "LensProfileSetup",
  "LocationAreaCode",
  "Look",
  "LuminanceAdjustmentAqua",
  "LuminanceAdjustmentBlue",
  "LuminanceAdjustmentGreen",
  "LuminanceAdjustmentMagenta",
  "LuminanceAdjustmentOrange",
  "LuminanceAdjustmentPurple",
  "LuminanceAdjustmentRed",
  "LuminanceAdjustmentYellow",
  "LuminanceSmoothing",
  "MakerNote",
  "Marked",
  "Mask",
  "MetadataDate",
  "MicroVideo",
  "MicroVideoOffset",
  "MicroVideoPresentationTimestampUs",
  "MicroVideoVersion",
  "Mime",
  "MobileCountryCode",
  "MobileNetworkCode",
  "ModificationDate",
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
  "OriginalCreateDateTime",
  "OriginalDocumentID",
  "OverrideLookVignette",
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
  "PickLabel",
  "PipelineVersion",
  "PMVersion",
  "PortraitVersion",
  "PoseHeadingDegrees",
  "PosePitchDegrees",
  "PoseRollDegrees",
  "PostCropVignetteAmount",
  "PreservedFileName",
  "ProcessVersion",
  "Profiles",
  "ProgramMode",
  "ProjectionType",
  "Rating",
  "RatingPercent",
  "RawFileName",
  "RedHue",
  "RedSaturation",
  "RegionInfo",
  "RegionInfoMP",
  "RegistryID",
  "RelativeAltitude",
  "Rights",
  "SaturationAdjustmentAqua",
  "SaturationAdjustmentBlue",
  "SaturationAdjustmentGreen",
  "SaturationAdjustmentMagenta",
  "SaturationAdjustmentOrange",
  "SaturationAdjustmentPurple",
  "SaturationAdjustmentRed",
  "SaturationAdjustmentYellow",
  "Scene",
  "SceneDetectResultConfidences",
  "SceneDetectResultIds",
  "SelfData",
  "ShadowTint",
  "SharpenDetail",
  "SharpenEdgeMasking",
  "SharpenRadius",
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
  "SubsecTime",
  "Tag",
  "Tagged",
  "TagsList",
  "Tint",
  "Title",
  "TlinearGain",
  "ToneCurveBlue",
  "ToneCurveGreen",
  "ToneCurveName",
  "ToneCurvePV2012Blue",
  "ToneCurvePV2012Green",
  "ToneCurvePV2012Red",
  "ToneCurveRed",
  "ToneMapStrength",
  "UprightCenterMode",
  "UprightCenterNormX",
  "UprightCenterNormY",
  "UprightFocalLength35mm",
  "UprightFocalMode",
  "UprightFourSegmentsCount",
  "UprightPreview",
  "UprightTransformCount",
  "UprightVersion",
  "UsePanoramaViewer",
  "Versions",
  "Vibrance",
  "VignetteAmount",
  "WavelengthFWHM",
  "XMPMeta",
  "XMPToolkit",
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
 * Comments by each tag include:
 * - a popularity rating (★★★★ is found in > 50% of samples, and ☆☆☆☆ is rare),
 * - a checkmark if the tag is used by popular devices (like iPhones), and
 * - an example value, JSON stringified.
 *
 * Autogenerated by "npm run mktags" by ExifTool 13.26 on Fri May 16 2025.
 * 2761 unique tags were found in 10134 photo and video files.
 *
 * @see https://exiftool.org/TagNames/
 */
export interface Tags
  extends APPTags,
    CompositeTags,
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
    JPEGTags,
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
  ...FlashPixTagsNames.values,
  ...JPEGTagsNames.values,
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
