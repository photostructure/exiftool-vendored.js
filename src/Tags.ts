import { ApplicationRecordTags } from "./ApplicationRecordTags"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ICCProfileTags } from "./ICCProfileTags"
import { Struct } from "./Struct"

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ExifToolTags {
  /** ☆☆☆☆ ✔ Example: "File is empty" */
  Error?: string
  /** ★★★★ ✔ Example: 12.4 */
  ExifToolVersion?: number
  /** ☆☆☆☆ ✔ Example: "Unrecognized IPTC record 0 (ignored)" */
  Warning?: string
}

export interface FileTags {
  /** ☆☆☆☆ ✔ Example: "Windows V3" */
  BMPVersion?: string
  /** ☆☆☆☆ ✔ Example: 24 */
  BitDepth?: number
  /** ★★★★ ✔ Example: 8 */
  BitsPerSample?: number
  /** ★★★★ ✔ Example: 3 */
  ColorComponents?: number
  /** ☆☆☆☆ ✔ Example: "This is a comment." */
  Comment?: string
  /** ☆☆☆☆ ✔ Example: "MJPG" */
  Compression?: string
  /** ☆☆☆☆ ✔ Example: "ff5978eb5c164fa308177d41e817e08f" */
  CurrentIPTCDigest?: string
  /** ★★★★ ✔ Example: "/home/username/pictures" */
  Directory?: string
  /** ★★★★ ✔ Example: "Progressive DCT, Huffman coding" */
  EncodingProcess?: string
  /** ★★★★ ✔ Example: "Little-endian (Intel, II)" */
  ExifByteOrder?: string
  /** ★★★★ ✔ Example: 2022-03-06T20:51:30.000-08:00 */
  FileAccessDate?: ExifDateTime | string
  /** ★★★★ ✔ Example: 2022-03-06T18:41:07.000-08:00 */
  FileInodeChangeDate?: ExifDateTime | string
  /** ★★★★ ✔ Example: 2022-02-18T12:22:50.000-08:00 */
  FileModifyDate?: ExifDateTime | string
  /** ★★★★ ✔ Example: "utc+8_oly.jpg" */
  FileName?: string
  /** ★★★★ ✔ Example: "-rwxrwxr-x" */
  FilePermissions?: string
  /** ★★★★ ✔ Example: "990 bytes" */
  FileSize?: string
  /** ★★★★ ✔ Example: "TXT" */
  FileType?: string
  /** ★★★★ ✔ Example: "txt" */
  FileTypeExtension?: string
  /** ★★★★ ✔ Example: 960 */
  ImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 230400 */
  ImageLength?: number
  /** ★★★★ ✔ Example: 8192 */
  ImageWidth?: number
  /** ★★★★ ✔ Example: "video/x-msvideo" */
  MIMEType?: string
  /** ☆☆☆☆ ✔ Example: "Use BitDepth" */
  NumColors?: string
  /** ☆☆☆☆ ✔ Example: "All" */
  NumImportantColors?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  PixelsPerMeterX?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PixelsPerMeterY?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  Planes?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 962696 bytes, use -b option to extract)" */
  PreviewImage?: string
  /** ★★★★ ✔ Example: "YCbCr4:4:4 (1 1)" */
  YCbCrSubSampling?: string
}

export interface CompositeTags {
  /** ☆☆☆☆ ✔ Example: "Unknown (49 5)" */
  AdvancedSceneMode?: string
  /** ★★★★ ✔ Example: 90 */
  Aperture?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoFocus?: string
  /** ☆☆☆☆ ✔ Example: "98.4 Mbps" */
  AvgBitrate?: string
  /** ★★☆☆ ✔ Example: 4.914063 */
  BlueBalance?: number
  /** ☆☆☆☆ ✔ Example: "[Yellow,Cyan][Green,Magenta]" */
  CFAPattern?: string
  /** ★★★★ ✔ Example: "1.030 mm" */
  CircleOfConfusion?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ConditionalFEC?: number
  /** ★★☆☆ ✔ Example: "inf (9.66 m - inf)" */
  DOF?: string
  /** ☆☆☆☆   Example: 2006-12-19 */
  DateCreated?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: undefined */
  DateTimeCreated?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 2017-02-20T18:06:40.000Z */
  DateTimeOriginal?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 2021-03-16T18:14:25.000-07:00 */
  DigitalCreationDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "4.00x" */
  DigitalZoom?: string
  /** ★★☆☆ ✔ Example: "Single-frame Shooting" */
  DriveMode?: string
  /** ☆☆☆☆ ✔ Example: 25.866408 */
  Duration?: number
  /** ☆☆☆☆ ✔ Example: "Not attached" */
  ExtenderStatus?: string
  /** ★★★★ ✔ Example: "97.7 deg" */
  FOV?: string
  /** ☆☆☆☆ ✔ Example: "897-9769" */
  FileNumber?: string
  /** ☆☆☆☆ ✔ Example: "Off, Did not fire" */
  Flash?: string
  /** ☆☆☆☆ ✔ Example: "External" */
  FlashType?: string
  /** ★★★★ ✔ Example: "99.7 mm (35 mm equivalent: 554.0 mm)" */
  FocalLength35efl?: string
  /** ☆☆☆☆ ✔ Example: "inf" */
  FocusDistance?: string
  /** ☆☆☆☆ ✔ Example: 99.8 */
  GPSAltitude?: number
  /** ☆☆☆☆   Example: "Above Sea Level" */
  GPSAltitudeRef?: string
  /** ☆☆☆☆ ✔ Example: 2022-02-05T18:48:08.000Z */
  GPSDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "43 deg 37' 59.61" N" */
  GPSDestLatitude?: string
  /** ☆☆☆☆ ✔ Example: "80 deg 23' 16.31" W" */
  GPSDestLongitude?: string
  /** ☆☆☆☆ ✔ Example: 48.857748 */
  GPSLatitude?: number
  /** ☆☆☆☆ ✔ Example: "North" */
  GPSLatitudeRef?: string
  /** ☆☆☆☆ ✔ Example: 2.2918888 */
  GPSLongitude?: number
  /** ☆☆☆☆ ✔ Example: "West" */
  GPSLongitudeRef?: string
  /** ☆☆☆☆ ✔ Example: "7.196465 134.376806666667" */
  GPSPosition?: string
  /** ★★★★ ✔ Example: "Inf m" */
  HyperfocalDistance?: string
  /** ★★☆☆ ✔ Example: 993 */
  ISO?: number
  /** ★★★★ ✔ Example: "960x540" */
  ImageSize?: string
  /** ★★☆☆ ✔ Example: "90.0 mm" */
  Lens?: string
  /** ★★☆☆ ✔ Example: "90.0 mm (35 mm equivalent: 141.5 mm)" */
  Lens35efl?: string
  /** ★★★☆ ✔ Example: "smc PENTAX-FA 28-105mm F3.2-4.5 AL[IF]" */
  LensID?: string
  /** ☆☆☆☆ ✔ Example: "85mm f/1.8 G" */
  LensSpec?: string
  /** ☆☆☆☆   Example: "Olympus Zuiko Digital ED 50mm F2.0 Macro" */
  LensType?: string
  /** ★★★★ ✔ Example: 9.9 */
  LightValue?: number
  /** ★★★★ ✔ Example: 9.9 */
  Megapixels?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 608 bytes, use -b option to extract)" */
  OriginalDecisionData?: string
  /** ☆☆☆☆   Example: "9.9 um" */
  PeakSpectralSensitivity?: string
  /** ☆☆☆☆ ✔ Example: "816x459" */
  PreviewImageSize?: string
  /** ★★☆☆ ✔ Example: 3.706667 */
  RedBalance?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  RedEyeReduction?: string
  /** ☆☆☆☆   Example: 11.2 */
  RicohPitch?: number
  /** ☆☆☆☆   Example: 0 */
  RicohRoll?: number
  /** ☆☆☆☆ ✔ Example: 90 */
  Rotation?: number
  /** ☆☆☆☆ ✔ Example: "9:30:01" */
  RunTimeSincePowerUp?: string
  /** ★★★★ ✔ Example: 9.9 */
  ScaleFactor35efl?: number
  /** ★★☆☆ ✔ Example: "Unknown (83)" */
  ShootingMode?: string
  /** ☆☆☆☆ ✔ Example: "1st-curtain sync" */
  ShutterCurtainHack?: string
  /** ★★★★ ✔ Example: "inf" */
  ShutterSpeed?: string
  /** ★★☆☆ ✔ Example: 2022-02-13T14:51:24.650+01:00 */
  SubSecCreateDate?: ExifDateTime | string
  /** ★★☆☆ ✔ Example: 2022-02-13T14:51:24.650+01:00 */
  SubSecDateTimeOriginal?: ExifDateTime | string
  /** ☆☆☆☆   Example:  */
  SubSecMediaCreateDate?: ExifDateTime | string
  /** ★★☆☆ ✔ Example: 2022-02-13T14:51:24.650+01:00 */
  SubSecModifyDate?: ExifDateTime | string
}

export interface APP1Tags {
  /** ☆☆☆☆   Example: "59 128 128" */
  AboveColor?: string
  /** ☆☆☆☆   Example: "29.4 C" */
  AtmosphericTemperature?: string
  /** ☆☆☆☆   Example: "60 128 128" */
  BelowColor?: string
  /** ☆☆☆☆   Example: "Z-CAMERA" */
  CameraModel?: string
  /** ☆☆☆☆   Example: "_______________" */
  CameraPartNumber?: string
  /** ☆☆☆☆   Example: 63988888 */
  CameraSerialNumber?: number
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  CameraSoftware?: string
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  CreatorSoftware?: string
  /** ☆☆☆☆   Example: 2013-03-12T16:31:26.000 */
  DateTimeGenerated?: ExifDateTime | string
  /** ☆☆☆☆   Example: "(Binary data 74741 bytes, use -b option to extract)" */
  EmbeddedImage?: string
  /** ☆☆☆☆   Example: 768 */
  EmbeddedImageHeight?: number
  /** ☆☆☆☆   Example: "PNG" */
  EmbeddedImageType?: string
  /** ☆☆☆☆   Example: 640 */
  EmbeddedImageWidth?: number
  /** ☆☆☆☆   Example: 1 */
  Emissivity?: number
  /** ☆☆☆☆   Example: "46.1 deg" */
  FieldOfView?: string
  /** ☆☆☆☆   Example: "NOF" */
  FilterModel?: string
  /** ☆☆☆☆   Example: "" */
  FilterPartNumber?: string
  /** ☆☆☆☆   Example: "00000000" */
  FilterSerialNumber?: string
  /** ☆☆☆☆   Example: 9149 */
  FocusStepCount?: number
  /** ☆☆☆☆   Example: 9 */
  FrameRate?: number
  /** ☆☆☆☆   Example: 1.9 */
  GPSDOP?: number
  /** ☆☆☆☆   Example: 94 */
  GPSImgDirection?: number
  /** ☆☆☆☆   Example: "Magnetic North" */
  GPSImgDirectionRef?: string
  /** ☆☆☆☆   Example: "WGS84" */
  GPSMapDatum?: string
  /** ☆☆☆☆   Example: "Yes" */
  GPSValid?: string
  /** ☆☆☆☆   Example: "7.4 C" */
  IRWindowTemperature?: string
  /** ☆☆☆☆   Example: 1 */
  IRWindowTransmission?: number
  /** ☆☆☆☆   Example: "99 128 128" */
  Isotherm1Color?: string
  /** ☆☆☆☆   Example: "92 115 209" */
  Isotherm2Color?: string
  /** ☆☆☆☆   Example: "N/A" */
  LensModel?: string
  /** ☆☆☆☆   Example: "T197909" */
  LensPartNumber?: string
  /** ☆☆☆☆   Example: "No Lens" */
  LensSerialNumber?: string
  /** ☆☆☆☆   Example: 1 */
  Meas1Label?: number
  /** ☆☆☆☆   Example: "80 60" */
  Meas1Params?: string
  /** ☆☆☆☆   Example: "Spot" */
  Meas1Type?: string
  /** ☆☆☆☆   Example: "Sp1" */
  Meas2Label?: string
  /** ☆☆☆☆   Example: "213 160 213 160" */
  Meas2Params?: string
  /** ☆☆☆☆   Example: "Spot" */
  Meas2Type?: string
  /** ☆☆☆☆   Example: "9.70 m" */
  ObjectDistance?: string
  /** ☆☆☆☆   Example: "+98" */
  OffsetX?: string
  /** ☆☆☆☆   Example: "+51" */
  OffsetY?: string
  /** ☆☆☆☆   Example: "67 216 98" */
  OverflowColor?: string
  /** ☆☆☆☆   Example: "(Binary data 672 bytes, use -b option to extract)" */
  Palette?: string
  /** ☆☆☆☆   Example: 224 */
  PaletteColors?: number
  /** ☆☆☆☆   Example: "iron.pal" */
  PaletteFileName?: string
  /** ☆☆☆☆   Example: 0 */
  PaletteMethod?: number
  /** ☆☆☆☆   Example: "iron" */
  PaletteName?: string
  /** ☆☆☆☆   Example: 3 */
  PaletteStretch?: number
  /** ☆☆☆☆   Example: ".basicImgData.objectParams.emissivity" */
  Param0?: string
  /** ☆☆☆☆   Example: "(Binary data 87431 bytes, use -b option to extract)" */
  RawThermalImage?: string
  /** ☆☆☆☆   Example: 90 */
  RawThermalImageHeight?: number
  /** ☆☆☆☆   Example: "TIFF" */
  RawThermalImageType?: string
  /** ☆☆☆☆   Example: 80 */
  RawThermalImageWidth?: number
  /** ☆☆☆☆   Example: 9392 */
  RawValueMedian?: number
  /** ☆☆☆☆   Example: 993 */
  RawValueRange?: number
  /** ☆☆☆☆   Example: 65535 */
  RawValueRangeMax?: number
  /** ☆☆☆☆   Example: 8628 */
  RawValueRangeMin?: number
  /** ☆☆☆☆   Example: 2.2125397 */
  Real2IR?: number
  /** ☆☆☆☆   Example: "26.7 C" */
  ReflectedApparentTemperature?: string
  /** ☆☆☆☆   Example: "80.0 %" */
  RelativeHumidity?: string
  /** ☆☆☆☆   Example: "41 110 240" */
  UnderflowColor?: string
}

export interface APP12Tags {
  /** ☆☆☆☆   Example: 388 */
  Again?: number
  /** ☆☆☆☆   Example: 3383 */
  B5100?: number
  /** ☆☆☆☆   Example: 216 */
  BHL?: number
  /** ☆☆☆☆   Example: 255 */
  BHighLight?: number
  /** ☆☆☆☆   Example: 86 */
  BMean?: number
  /** ☆☆☆☆   Example: 3 */
  BSD?: number
  /** ☆☆☆☆   Example: 1 */
  BSd?: number
  /** ☆☆☆☆   Example: 1908 */
  BStrobe?: number
  /** ☆☆☆☆   Example: 0 */
  Balance?: number
  /** ☆☆☆☆   Example: 2438 */
  Bgain?: number
  /** ☆☆☆☆   Example: 33 */
  Blk0?: number
  /** ☆☆☆☆   Example: 32 */
  Blk1?: number
  /** ☆☆☆☆   Example: 6 */
  Boff?: number
  /** ☆☆☆☆   Example: 2 */
  CBal?: number
  /** ☆☆☆☆ ✔ Example: 42926626 */
  COLOR1?: number
  /** ☆☆☆☆ ✔ Example: 32321478 */
  COLOR2?: number
  /** ☆☆☆☆ ✔ Example: 22701368 */
  COLOR3?: number
  /** ☆☆☆☆ ✔ Example: 5 */
  COLOR4?: number
  /** ☆☆☆☆ ✔ Example: "SR83" */
  CameraType?: string
  /** ☆☆☆☆   Example: 2 */
  Case?: number
  /** ☆☆☆☆   Example: 1 */
  Color?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  ColorMode?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ContTake?: number
  /** ☆☆☆☆ ✔ Example: 8501 */
  EXP1?: number
  /** ☆☆☆☆ ✔ Example: 59 */
  EXP2?: number
  /** ☆☆☆☆ ✔ Example: 237 */
  EXP3?: number
  /** ☆☆☆☆   Example: 0.97 */
  ExposRatio?: number
  /** ☆☆☆☆   Example: 3687 */
  Exposure?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureCompensation?: number
  /** ☆☆☆☆ ✔ Example: "1/8" */
  ExposureTime?: string
  /** ☆☆☆☆   Example: 192 */
  FMean?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  FNumber?: number
  /** ☆☆☆☆   Example: 1 */
  FinalRatio?: number
  /** ☆☆☆☆   Example: "v2.2.16" */
  FirmwareVersion?: string
  /** ☆☆☆☆   Example: 640 */
  FlashTime?: number
  /** ☆☆☆☆ ✔ Example: "F2.8" */
  Fnumber?: string
  /** ☆☆☆☆   Example: 2 */
  FocusMode?: number
  /** ☆☆☆☆   Example: 136 */
  FocusPos?: number
  /** ☆☆☆☆   Example: 2152 */
  GBgain?: number
  /** ☆☆☆☆   Example: 8 */
  GBoff?: number
  /** ☆☆☆☆   Example: 255 */
  GHL?: number
  /** ☆☆☆☆   Example: 255 */
  GHighLight?: number
  /** ☆☆☆☆   Example: 52 */
  GMean?: number
  /** ☆☆☆☆   Example: 2152 */
  GRgain?: number
  /** ☆☆☆☆   Example: 8 */
  GRoff?: number
  /** ☆☆☆☆   Example: 4 */
  GSD?: number
  /** ☆☆☆☆   Example: 1 */
  GSd?: number
  /** ☆☆☆☆   Example: 85 */
  Gain?: number
  /** ☆☆☆☆   Example: 0 */
  Gamma?: number
  /** ☆☆☆☆ ✔ Example: "PDR-M60" */
  ID?: string
  /** ☆☆☆☆ ✔ Example: 696880 */
  JPEG1?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LightS?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  Macro?: string
  /** ☆☆☆☆   Example: " 10.6" */
  Mean?: string
  /** ☆☆☆☆   Example: 26 */
  MotorPos?: number
  /** ☆☆☆☆   Example: 4 */
  Offset?: number
  /** ☆☆☆☆ ✔ Example: 87648 */
  PicLen?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  Protect?: number
  /** ☆☆☆☆   Example: 97 */
  Quality?: number
  /** ☆☆☆☆   Example: 6929 */
  R5100?: number
  /** ☆☆☆☆ ✔ Example: "DCPT" */
  REV?: string
  /** ☆☆☆☆   Example: 247 */
  RHL?: number
  /** ☆☆☆☆   Example: 255 */
  RHighLight?: number
  /** ☆☆☆☆   Example: 32 */
  RMean?: number
  /** ☆☆☆☆   Example: 4 */
  RSD?: number
  /** ☆☆☆☆   Example: 1 */
  RSd?: number
  /** ☆☆☆☆   Example: 5896 */
  RStrobe?: number
  /** ☆☆☆☆ ✔ Example: 6 */
  Resolution?: number
  /** ☆☆☆☆   Example: 1887 */
  Rgain?: number
  /** ☆☆☆☆   Example: 9 */
  Roff?: number
  /** ☆☆☆☆ ✔ Example: "8259,0,14bfe,a184,11987,1e4f1,0,7c0000,40b60000,56a05e6,616061a,…" */
  S0?: string
  /** ☆☆☆☆ ✔ Example: "#00000001" */
  SerialNumber?: string
  /** ☆☆☆☆   Example: 0 */
  StrobeTime?: number
  /** ☆☆☆☆ ✔ Example: "bd1,1,5,2beec,b5,ec15" */
  T0?: string
  /** ☆☆☆☆ ✔ Example: 357 */
  TagB?: number
  /** ☆☆☆☆ ✔ Example: 92 */
  TagQ?: number
  /** ☆☆☆☆ ✔ Example: 243 */
  TagR?: number
  /** ☆☆☆☆ ✔ Example: "v" */
  TagS?: string
  /** ☆☆☆☆ ✔ Example: 4016 */
  ThmLen?: number
  /** ☆☆☆☆ ✔ Example: "vf0-3c" */
  Version?: string
  /** ☆☆☆☆   Example: 4054 */
  YLevel?: number
  /** ☆☆☆☆   Example: 2209 */
  YTarget?: number
  /** ☆☆☆☆ ✔ Example:  */
  Zoom?: string
  /** ☆☆☆☆   Example: 9 */
  ZoomPos?: number
}

export interface APP14Tags {
  /** ☆☆☆☆ ✔ Example: "YCbCr" */
  ColorTransform?: string
  /** ☆☆☆☆ ✔ Example: 100 */
  DCTEncodeVersion?: number
}

export interface APP4Tags {
  /** ☆☆☆☆ ✔ Example: 976 */
  PreviewImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 816 */
  PreviewImageWidth?: number
  /** ☆☆☆☆ ✔ Example: 95 */
  PreviewQuality?: number
}

export interface APP5Tags {
  /** ☆☆☆☆   Example: "E" */
  Compass?: string
}

export interface EXIFTags {
  /** ☆☆☆☆ ✔ Example: 985255 */
  Acceleration?: number
  /** ☆☆☆☆   Example: "80 122 3950 5918" */
  ActiveArea?: string
  /** ☆☆☆☆ ✔ Example: "29.9 C" */
  AmbientTemperature?: string
  /** ☆☆☆☆ ✔ Example: "2.225585938 1 2.039794922" */
  AnalogBalance?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  AntiAliasStrength?: number
  /** ★★★☆ ✔ Example: 9016997700 */
  ApertureValue?: number
  /** ★☆☆☆ ✔ Example: "Arturo DeImage" */
  Artist?: string
  /** ☆☆☆☆ ✔ Example: "1 1 1" */
  AsShotNeutral?: string
  /** ☆☆☆☆ ✔ Example: 3.98745 */
  BaselineExposure?: number
  /** ☆☆☆☆   Example: 0 */
  BaselineExposureOffset?: number
  /** ☆☆☆☆   Example: 9 */
  BaselineNoise?: number
  /** ☆☆☆☆ ✔ Example: 1.5 */
  BaselineSharpness?: number
  /** ☆☆☆☆   Example: 500 */
  BayerGreenSplit?: number
  /** ☆☆☆☆   Example: 1 */
  BestQualityScale?: number
  /** ☆☆☆☆ ✔ Example: 64 */
  BlackLevel?: number
  /** ☆☆☆☆ ✔ Example: 511 */
  BlackLevelBlue?: number
  /** ☆☆☆☆ ✔ Example: 512 */
  BlackLevelGreen?: number
  /** ☆☆☆☆ ✔ Example: 511 */
  BlackLevelRed?: number
  /** ☆☆☆☆ ✔ Example: "2 2" */
  BlackLevelRepeatDim?: string
  /** ★★☆☆ ✔ Example: 9.9919505 */
  BrightnessValue?: number
  /** ☆☆☆☆   Example: "Rectangular" */
  CFALayout?: string
  /** ☆☆☆☆ ✔ Example: "Red,Green,Blue" */
  CFAPlaneColor?: string
  /** ☆☆☆☆ ✔ Example: "6 6" */
  CFARepeatPatternDim?: string
  /** ☆☆☆☆   Example: "com.adobe" */
  CameraCalibrationSig?: string
  /** ☆☆☆☆ ✔ Example: "22 -128 0 0 0 128 128 256 384 384 512 640 1152 1152 1152 1024 89…" */
  ChromaticAberrationCorrParams?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  ChromaticAberrationCorrection?: string
  /** ★★★★ ✔ Example: "sRGB" */
  ColorSpace?: string
  /** ★★★★ ✔ Example: "Y, Cr, Cb, -" */
  ComponentsConfiguration?: string
  /** ☆☆☆☆ ✔ Example: "Unknown" */
  CompositeImage?: string
  /** ★★★★ ✔ Example: 90 */
  CompressedBitsPerPixel?: number
  /** ★★★☆ ✔ Example: "Unknown (64)" */
  Contrast?: string
  /** ★★★☆ ✔ Example: "© Chuckles McSnortypants, Inc." */
  Copyright?: string
  /** ★★★★ ✔ Example: 2218-09-22T02:32:14.000 */
  CreateDate?: ExifDateTime | string
  /** ☆☆☆☆   Example: 7786 */
  CropBottom?: number
  /** ☆☆☆☆   Example: 920 */
  CropLeft?: number
  /** ☆☆☆☆   Example: 5480 */
  CropRight?: number
  /** ☆☆☆☆   Example: 8 */
  CropTop?: number
  /** ★★★★ ✔ Example: "Unknown (5840)" */
  CustomRendered?: string
  /** ☆☆☆☆ ✔ Example: "1.4.0.0" */
  DNGBackwardVersion?: string
  /** ☆☆☆☆   Example: "8.8-36.8mm f/1.8-2.8" */
  DNGLensInfo?: string
  /** ☆☆☆☆   Example: "(Binary data 765367 bytes, use -b option to extract)" */
  DNGPrivateData?: string
  /** ☆☆☆☆ ✔ Example: "1.6.0.0" */
  DNGVersion?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  DefaultBlackRender?: string
  /** ☆☆☆☆ ✔ Example: "8 8" */
  DefaultCropOrigin?: string
  /** ☆☆☆☆ ✔ Example: "960 540" */
  DefaultCropSize?: string
  /** ☆☆☆☆   Example: "1 1" */
  DefaultScale?: string
  /** ☆☆☆☆   Example: "0.007879185817 0.01803118908 0.992777413 0.9926900585" */
  DefaultUserCrop?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 536 bytes, use -b option to extract)" */
  DeviceSettingDescription?: string
  /** ★★★☆ ✔ Example: 8.1319764 */
  DigitalZoomRatio?: number
  /** ☆☆☆☆ ✔ Example: "11 32 4 -36 -83 -142 -208 -286 -363 -444 -521 -598 0 0 0 0 0" */
  DistortionCorrParams?: string
  /** ☆☆☆☆ ✔ Example: "Auto fixed by lens" */
  DistortionCorrection?: string
  /** ☆☆☆☆   Example: "" */
  DocumentName?: string
  /** ★★★★ ✔ Example: 990 */
  ExifImageHeight?: number
  /** ★★★★ ✔ Example: 999 */
  ExifImageWidth?: number
  /** ★★★★ ✔ Example: "Version 2.2" */
  ExifVersion?: string
  /** ★☆☆☆ ✔ Example: 83 */
  ExposureIndex?: number
  /** ★★★★ ✔ Example: "Unknown ()" */
  ExposureMode?: string
  /** ★★★★ ✔ Example: "Unknown (8176)" */
  ExposureProgram?: string
  /** ★★★★ ✔ Example: "Unknown (DSC)" */
  FileSource?: string
  /** ☆☆☆☆   Example: "Normal" */
  FillOrder?: string
  /** ☆☆☆☆ ✔ Example: 54 */
  FlashEnergy?: number
  /** ★★★★ ✔ Example: "?" */
  FlashpixVersion?: string
  /** ★★★★ ✔ Example: "99.7 mm" */
  FocalLength?: string
  /** ★★★☆ ✔ Example: "9920 mm" */
  FocalLengthIn35mmFormat?: string
  /** ★★★☆ ✔ Example: "um" */
  FocalPlaneResolutionUnit?: string
  /** ★★★☆ ✔ Example: 9941.7476 */
  FocalPlaneXResolution?: number
  /** ★★★☆ ✔ Example: 9846.1538 */
  FocalPlaneYResolution?: number
  /** ☆☆☆☆ ✔ Example: "府中市郷土の森博物館" */
  GPSAreaInformation?: string
  /** ☆☆☆☆ ✔ Example: 2022-02-05 */
  GPSDateStamp?: ExifDate | string
  /** ☆☆☆☆ ✔ Example: 86.180049 */
  GPSDestBearing?: number
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSDestBearingRef?: string
  /** ☆☆☆☆ ✔ Example: 0.030120052 */
  GPSDestDistance?: number
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSDestDistanceRef?: string
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSDestLatitudeRef?: string
  /** ☆☆☆☆ ✔ Example: "West" */
  GPSDestLongitudeRef?: string
  /** ☆☆☆☆ ✔ Example: "No Correction" */
  GPSDifferential?: string
  /** ☆☆☆☆ ✔ Example: "8.937059922 m" */
  GPSHPositioningError?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  GPSMeasureMode?: string
  /** ☆☆☆☆ ✔ Example: "gps" */
  GPSProcessingMethod?: string
  /** ☆☆☆☆ ✔ Example: "??B??" */
  GPSSatellites?: string
  /** ☆☆☆☆ ✔ Example: 5 */
  GPSSpeed?: number
  /** ☆☆☆☆ ✔ Example: "knots" */
  GPSSpeedRef?: string
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSStatus?: string
  /** ☆☆☆☆ ✔ Example: 23:59:41.001 */
  GPSTimeStamp?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: 74.882813 */
  GPSTrack?: number
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  GPSTrackRef?: string
  /** ★★☆☆ ✔ Example: "50.51.48.48" */
  GPSVersionID?: string
  /** ★★★☆ ✔ Example: "Unknown (8176)" */
  GainControl?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierBlue?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierGreen?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  HighISOMultiplierRed?: number
  /** ☆☆☆☆ ✔ Example: "iPhone 12 Pro Max" */
  HostComputer?: string
  /** ☆☆☆☆ ✔ Example: 598 */
  ISOSpeed?: number
  /** ★★★☆ ✔ Example: "{ "product_id": "090C", "uuid": "", "run_date": "", "filename": …" */
  ImageDescription?: string
  /** ☆☆☆☆ ✔ Example: 43991 */
  ImageNumber?: number
  /** ☆☆☆☆ ✔ Example: "fa5fdfee65f3a6e05fe7d4692b9112a7" */
  ImageUniqueID?: string
  /** ★★★★ ✔ Example: "Unknown ([None])" */
  InteropIndex?: string
  /** ★★★★ ✔ Example: "undef undef undef" */
  InteropVersion?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 996858 bytes, use -b option to extract)" */
  JpgFromRaw?: string
  /** ☆☆☆☆ ✔ Example: 996858 */
  JpgFromRawLength?: number
  /** ☆☆☆☆ ✔ Example: 996416 */
  JpgFromRawStart?: number
  /** ★☆☆☆ ✔ Example: "?mm f/?" */
  LensInfo?: string
  /** ☆☆☆☆ ✔ Example: "ZEISS" */
  LensMake?: string
  /** ★★★★ ✔ Example: "White Fluorescent" */
  LightSource?: string
  /** ☆☆☆☆   Example: 1 */
  LinearResponseLimit?: number
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitBlue?: number
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitGreen?: number
  /** ☆☆☆☆ ✔ Example: 4095 */
  LinearityLimitRed?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 382105 bytes, use -b option to extract)" */
  LinearizationTable?: string
  /** ☆☆☆☆   Example: "XB015" */
  LocalizedCameraModel?: string
  /** ★★★★ ✔ Example: "samsung" */
  Make?: string
  /** ☆☆☆☆   Example: "Unsafe" */
  MakerNoteSafety?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 3072 bytes, use -b option to extract)" */
  MakerNoteSamsung1a?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 66 bytes, use -b option to extract)" */
  MakerNoteUnknownBinary?: string
  /** ☆☆☆☆ ✔ Example: "}:-" */
  MakerNoteUnknownText?: string
  /** ★★★★ ✔ Example: 9.1 */
  MaxApertureValue?: number
  /** ★★★★ ✔ Example: "Unknown (7968)" */
  MeteringMode?: string
  /** ★★★★ ✔ Example: "x530" */
  Model?: string
  /** ☆☆☆☆ ✔ Example: "K520C-01044" */
  Model2?: string
  /** ★★★★ ✔ Example: 2216-02-28T03:49:50.000 */
  ModifyDate?: ExifDateTime | string
  /** ☆☆☆☆   Example: "Pixel Shift" */
  Multishot?: string
  /** ☆☆☆☆   Example: "ef0b8484e24c9aa107ac2ad2c7d8d04b" */
  NewRawImageDigest?: string
  /** ☆☆☆☆ ✔ Example: 6 */
  Noise?: number
  /** ☆☆☆☆ ✔ Example: "8.108e-05 6e-08" */
  NoiseProfile?: string
  /** ☆☆☆☆ ✔ Example: 0.94999999 */
  NoiseReductionApplied?: number
  /** ☆☆☆☆ ✔ Example: "5 100 4 4 4 200 8 8 8 400 16 16 16 800 32 32 32 1600 64 64 64" */
  NoiseReductionParams?: string
  /** ☆☆☆☆ ✔ Example: 58 */
  OffsetSchema?: number
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTime?: string
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTimeDigitized?: string
  /** ☆☆☆☆ ✔ Example: "-09:00" */
  OffsetTimeOriginal?: string
  /** ★★★★ ✔ Example: 9 */
  Orientation?: number
  /** ☆☆☆☆   Example: "0 0" */
  OriginalBestQualitySize?: string
  /** ☆☆☆☆   Example: "undef undef" */
  OriginalDefaultCropSize?: string
  /** ☆☆☆☆   Example: "0 0" */
  OriginalDefaultFinalSize?: string
  /** ☆☆☆☆   Example: "fujifilm-x100s-daylight-DSCF9505.RAF" */
  OriginalRawFileName?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 993611 bytes, use -b option to extract)" */
  OtherImage?: string
  /** ☆☆☆☆ ✔ Example: 993611 */
  OtherImageLength?: number
  /** ☆☆☆☆ ✔ Example: 755 */
  OtherImageStart?: number
  /** ★☆☆☆ ✔ Example: "Itsa Myowna" */
  OwnerName?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 2060 bytes, use -b option to extract)" */
  Padding?: string
  /** ☆☆☆☆ ✔ Example: "Transparency" */
  PageName?: string
  /** ☆☆☆☆ ✔ Example: "0500" */
  PanasonicRawVersion?: string
  /** ★☆☆☆ ✔ Example: "YCbCr" */
  PhotometricInterpretation?: string
  /** ★☆☆☆ ✔ Example: "Chunky" */
  PlanarConfiguration?: string
  /** ☆☆☆☆   Example: "None" */
  Predictor?: string
  /** ☆☆☆☆ ✔ Example: 995 */
  Pressure?: number
  /** ☆☆☆☆   Example: "dng_validate" */
  PreviewApplicationName?: string
  /** ☆☆☆☆   Example: 9.8 */
  PreviewApplicationVersion?: number
  /** ☆☆☆☆   Example: "sRGB" */
  PreviewColorSpace?: string
  /** ☆☆☆☆ ✔ Example: 2019-03-10T21:12:53.000+08:00 */
  PreviewDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 958208 */
  PreviewImageLength?: number
  /** ☆☆☆☆ ✔ Example: 9996 */
  PreviewImageStart?: number
  /** ☆☆☆☆   Example: "f195b95ad7863197fd6abcf71422e49b" */
  PreviewSettingsDigest?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 98514 bytes, use -b option to extract)" */
  PreviewTIFF?: string
  /** ☆☆☆☆ ✔ Example: "0.64 0.33 0.3 0.6 0.15 0.06" */
  PrimaryChromaticities?: string
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  ProcessingSoftware?: string
  /** ☆☆☆☆   Example: "com.adobe" */
  ProfileCalibrationSig?: string
  /** ☆☆☆☆   Example: "© Chuckles McSnortypants, Inc." */
  ProfileCopyright?: string
  /** ☆☆☆☆   Example: "Allow Copying" */
  ProfileEmbedPolicy?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 822464 bytes, use -b option to extract)" */
  ProfileGainTableMap?: string
  /** ☆☆☆☆   Example: "90 30 1" */
  ProfileHueSatMapDims?: string
  /** ☆☆☆☆   Example: "0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1" */
  ProfileLookTableData?: string
  /** ☆☆☆☆   Example: "36 8 16" */
  ProfileLookTableDims?: string
  /** ☆☆☆☆ ✔ Example: "XB015" */
  ProfileName?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 7195 bytes, use -b option to extract)" */
  ProfileToneCurve?: string
  /** ☆☆☆☆ ✔ Example: 3 */
  Rating?: number
  /** ☆☆☆☆ ✔ Example: 50 */
  RatingPercent?: number
  /** ☆☆☆☆ ✔ Example: 946688 */
  RawDataOffset?: number
  /** ☆☆☆☆ ✔ Example: "FE011C230F0804E207AE0D5000000000" */
  RawDataUniqueID?: string
  /** ☆☆☆☆ ✔ Example: 6 */
  RawFormat?: number
  /** ☆☆☆☆   Example: "87e7e7b16cb323c3a623982c20068dcb" */
  RawImageDigest?: string
  /** ☆☆☆☆ ✔ Example: "8 2160 2160" */
  RawImageSegmentation?: string
  /** ★☆☆☆ ✔ Example: 800 */
  RecommendedExposureIndex?: number
  /** ☆☆☆☆   Example: "M14-1451c" */
  ReelName?: string
  /** ☆☆☆☆ ✔ Example: "0 255 128 255 128 255" */
  ReferenceBlackWhite?: string
  /** ☆☆☆☆   Example: "JPEG Exif Ver 2.2" */
  RelatedImageFileFormat?: string
  /** ★★☆☆ ✔ Example: 960 */
  RelatedImageHeight?: number
  /** ★★☆☆ ✔ Example: 800 */
  RelatedImageWidth?: number
  /** ☆☆☆☆ ✔ Example: "xxx.avi" */
  RelatedSoundFile?: string
  /** ★★★★ ✔ Example: "inches" */
  ResolutionUnit?: string
  /** ★☆☆☆ ✔ Example: 96 */
  RowsPerStrip?: number
  /** ☆☆☆☆ ✔ Example: 4 */
  SRawType?: number
  /** ☆☆☆☆   Example: "Unsigned; Unsigned; Unsigned" */
  SampleFormat?: string
  /** ★☆☆☆ ✔ Example: 3 */
  SamplesPerPixel?: number
  /** ★★★☆ ✔ Example: "Unknown (8)" */
  Saturation?: string
  /** ★★★★ ✔ Example: "Unknown (8160)" */
  SceneCaptureType?: string
  /** ★★★★ ✔ Example: "Unknown (9)" */
  SceneType?: string
  /** ☆☆☆☆   Example: 0 */
  SelfTimerMode?: number
  /** ☆☆☆☆ ✔ Example: "urn:com:apple:photo:2020:aux:semanticskymatte" */
  SemanticName?: string
  /** ★★★☆ ✔ Example: "Unknown (74)" */
  SensingMethod?: string
  /** ★★☆☆ ✔ Example: "Unknown" */
  SensitivityType?: string
  /** ☆☆☆☆ ✔ Example: 7786 */
  SensorBottomBorder?: number
  /** ☆☆☆☆ ✔ Example: 7794 */
  SensorHeight?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  SensorLeftBorder?: number
  /** ☆☆☆☆ ✔ Example: 5480 */
  SensorRightBorder?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  SensorTopBorder?: number
  /** ☆☆☆☆ ✔ Example: 5488 */
  SensorWidth?: number
  /** ☆☆☆☆   Example: 1 */
  ShadowScale?: number
  /** ★★★☆ ✔ Example: "Unknown (7824)" */
  Sharpness?: string
  /** ★★★☆ ✔ Example: "1/999963365" */
  ShutterSpeedValue?: string
  /** ★★★★ ✔ Example: "https://PhotoStructure.com/" */
  Software?: string
  /** ☆☆☆☆ ✔ Example: "Sony Compressed RAW" */
  SonyRawFileType?: string
  /** ☆☆☆☆ ✔ Example: "8000 10400 12900 14100" */
  SonyToneCurve?: string
  /** ☆☆☆☆ ✔ Example: 668058300 */
  SpatialFrequencyResponse?: number
  /** ☆☆☆☆ ✔ Example: 800 */
  StandardOutputSensitivity?: number
  /** ★☆☆☆ ✔ Example: 9935445 */
  StripByteCounts?: number
  /** ★☆☆☆ ✔ Example: 999356 */
  StripOffsets?: number
  /** ★★☆☆ ✔ Example: 99 */
  SubSecTime?: number
  /** ★★☆☆ ✔ Example: 99 */
  SubSecTimeDigitized?: number
  /** ★★☆☆ ✔ Example: 999 */
  SubSecTimeOriginal?: number
  /** ☆☆☆☆ ✔ Example: "Semantic Mask" */
  SubfileType?: string
  /** ☆☆☆☆ ✔ Example: "982 959 945 933 918 921 955 1023 990 944 916 883 812 862 922 769…" */
  SubjectArea?: string
  /** ☆☆☆☆ ✔ Example: "99.99 m" */
  SubjectDistance?: string
  /** ★★★☆ ✔ Example: "Unknown (4400)" */
  SubjectDistanceRange?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  SubjectLocation?: number
  /** ★★★★ ✔ Example: "(Binary data 9998 bytes, use -b option to extract)" */
  ThumbnailImage?: string
  /** ★★★★ ✔ Example: 9998 */
  ThumbnailLength?: number
  /** ★★★★ ✔ Example: 998 */
  ThumbnailOffset?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 98520 bytes, use -b option to extract)" */
  ThumbnailTIFF?: string
  /** ☆☆☆☆ ✔ Example: "1991923 2063645 2029116 1974771" */
  TileByteCounts?: string
  /** ☆☆☆☆ ✔ Example: 528 */
  TileLength?: number
  /** ☆☆☆☆ ✔ Example: "9216 1143680" */
  TileOffsets?: string
  /** ☆☆☆☆ ✔ Example: 976 */
  TileWidth?: number
  /** ☆☆☆☆   Example: 22:16:21.020 */
  TimeCodes?: ExifTime | string
  /** ☆☆☆☆ ✔ Example:  */
  TimeZoneOffset?: number | string
  /** ☆☆☆☆ ✔ Example: "(Binary data 4133 bytes, use -b option to extract)" */
  TransferFunction?: string
  /** ☆☆☆☆ ✔ Example: "motorola XT1254" */
  UniqueCameraModel?: string
  /** ★★★☆ ✔ Example: "This is a comment." */
  UserComment?: string
  /** ☆☆☆☆ ✔ Example: "11 0 32 144 352 640 1040 1536 2144 2848 3600 4400 0 0 0 0 0" */
  VignettingCorrParams?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  VignettingCorrection?: string
  /** ☆☆☆☆ ✔ Example: 703 */
  WBBlueLevel?: number
  /** ☆☆☆☆ ✔ Example: 265 */
  WBGreenLevel?: number
  /** ☆☆☆☆ ✔ Example: 737 */
  WBRedLevel?: number
  /** ☆☆☆☆ ✔ Example: 0.1 */
  WaterDepth?: number
  /** ★★★★ ✔ Example: "Unknown (65535)" */
  WhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: 65535 */
  WhiteLevel?: number
  /** ☆☆☆☆ ✔ Example: "0.4234 0.399" */
  WhitePoint?: string
  /** ☆☆☆☆ ✔ Example: "Nom De Plume" */
  XPAuthor?: string
  /** ☆☆☆☆ ✔ Example: "This is a comment." */
  XPComment?: string
  /** ☆☆☆☆ ✔ Example: "v01.43.0042;0.0.1;v1.0.0" */
  XPKeywords?: string
  /** ☆☆☆☆ ✔ Example: "image thermique, thermal image" */
  XPSubject?: string
  /** ☆☆☆☆ ✔ Example: "楆慮⁬敤琠牡敤攠⁭汉慨䈠汥Ⅱ" */
  XPTitle?: string
  /** ★★★★ ✔ Example: 99 */
  XResolution?: number
  /** ☆☆☆☆ ✔ Example: "0.299 0.587 0.114" */
  YCbCrCoefficients?: string
  /** ★★★★ ✔ Example: "Unknown (0)" */
  YCbCrPositioning?: string
  /** ★★★★ ✔ Example: 99 */
  YResolution?: number
}

export interface APP6Tags {
  /** ☆☆☆☆ ✔ Example: 800 */
  AutoISOMax?: number
  /** ☆☆☆☆ ✔ Example: 3200 */
  AutoISOMin?: number
  /** ☆☆☆☆ ✔ Example: "Up" */
  AutoRotation?: string
  /** ☆☆☆☆ ✔ Example: "Photo Global Settings" */
  DeviceName?: string
  /** ☆☆☆☆ ✔ Example: "OFF" */
  HDRSetting?: string
  /** ☆☆☆☆ ✔ Example: "AUTO" */
  MaximumShutterAngle?: string
  /** ☆☆☆☆ ✔ Example: "859830e2f50cb3397a6216f09553fce800000000000000000000000000000000" */
  MediaUniqueID?: string
  /** ☆☆☆☆ ✔ Example: "7.6.4" */
  MetadataVersion?: string
  /** ☆☆☆☆ ✔ Example: "12MP_W" */
  PhotoResolution?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ProTune?: string
  /** ☆☆☆☆ ✔ Example: "4_1SEC" */
  Rate?: string
}

export interface FlashPixTags {
  /** ☆☆☆☆   Example: "(Binary data 20796 bytes, use -b option to extract)" */
  AudioStream?: string
  /** ☆☆☆☆ ✔ Example: "Unicode UTF-16, little endian" */
  CodePage?: string
  /** ☆☆☆☆ ✔ Example: "Picoss" */
  CreatingApplication?: string
  /** ☆☆☆☆ ✔ Example: "30020010-C06F-D011-BD01-00609719A180" */
  ExtensionClassID?: string
  /** ☆☆☆☆ ✔ Example: 2003-03-29T17:47:50.000 */
  ExtensionCreateDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "Presized image for LCD display" */
  ExtensionDescription?: string
  /** ☆☆☆☆ ✔ Example: 2003-03-29T17:47:50.000 */
  ExtensionModifyDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "Screen nail" */
  ExtensionName?: string
  /** ☆☆☆☆ ✔ Example: "Invalidated By Modification" */
  ExtensionPersistence?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 97265 bytes, use -b option to extract)" */
  ScreenNail?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  UsedExtensionNumbers?: number
}

export interface IPTCTags {
  /** ☆☆☆☆ ✔ Example: 4 */
  ApplicationRecordVersion?: number
  /** ☆☆☆☆   Example:  */
  "Caption-Abstract"?: string
  /** ☆☆☆☆ ✔ Example: "" */
  Category?: string
  /** ☆☆☆☆ ✔ Example: "Seattle" */
  City?: string
  /** ☆☆☆☆ ✔ Example: "UTF8" */
  CodedCharacterSet?: string
  /** ☆☆☆☆ ✔ Example: "Donna Ringmanumba" */
  Contact?: string
  /** ☆☆☆☆ ✔ Example: "Creative Commons Attribution 4.0 International" */
  CopyrightNotice?: string
  /** ☆☆☆☆ ✔ Example: "photo by Jenny Snapsalot" */
  Credit?: string
  /** ☆☆☆☆ ✔ Example: "" */
  DateSent?: string
  /** ☆☆☆☆ ✔ Example: "" */
  Destination?: string
  /** ☆☆☆☆ ✔ Example: 2021-03-16 */
  DigitalCreationDate?: ExifDate | string
  /** ☆☆☆☆ ✔ Example: 20:25:15 */
  DigitalCreationTime?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: "" */
  EnvelopeNumber?: string
  /** ☆☆☆☆ ✔ Example: "5 (normal urgency)" */
  EnvelopePriority?: string
  /** ☆☆☆☆ ✔ Example: 4 */
  EnvelopeRecordVersion?: number
  /** ☆☆☆☆ ✔ Example: "Tagged Image File Format (Adobe/Aldus Image data)" */
  FileFormat?: string
  /** ☆☆☆☆ ✔ Example: 2 */
  FileVersion?: number
  /** ☆☆☆☆ ✔ Example: "" */
  Headline?: string
  /** ☆☆☆☆ ✔ Example:  */
  Keywords?: string | string[]
  /** ☆☆☆☆ ✔ Example: "Artist deep into to wine and flower" */
  ObjectName?: string
  /** ☆☆☆☆ ✔ Example: "" */
  OriginalTransmissionReference?: string
  /** ☆☆☆☆ ✔ Example: "digiKam" */
  OriginatingProgram?: string
  /** ☆☆☆☆ ✔ Example: "Tagged:1, ColorClass:2, Rating:0, FrameNum:000940" */
  Prefs?: string
  /** ☆☆☆☆ ✔ Example: "4.13.0" */
  ProgramVersion?: string
  /** ☆☆☆☆ ✔ Example: "" */
  ServiceIdentifier?: string
  /** ☆☆☆☆ ✔ Example: "Renee Lanette Sims" */
  Source?: string
  /** ☆☆☆☆ ✔ Example: "" */
  SpecialInstructions?: string
  /** ☆☆☆☆ ✔ Example: "" */
  SupplementalCategories?: string
  /** ☆☆☆☆ ✔ Example: 23:47:00 */
  TimeCreated?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: "" */
  TimeSent?: string
  /** ☆☆☆☆ ✔ Example: "0 (reserved)" */
  Urgency?: string
}

export interface MPFTags {
  /** ★★☆☆ ✔ Example: 9697 */
  DependentImage1EntryNumber?: number
  /** ★★☆☆ ✔ Example: 960 */
  DependentImage2EntryNumber?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 99 bytes, use -b option to extract)" */
  ImageUIDList?: string
  /** ★★☆☆ ✔ Example: "0100" */
  MPFVersion?: string
  /** ★★☆☆ ✔ Example: "Representative image, Dependent parent image" */
  MPImageFlags?: string
  /** ★★☆☆ ✔ Example: "Unknown (4)" */
  MPImageFormat?: string
  /** ★★☆☆ ✔ Example: 999325 */
  MPImageLength?: number
  /** ★★☆☆ ✔ Example: 9999872 */
  MPImageStart?: number
  /** ★★☆☆ ✔ Example: "Undefined" */
  MPImageType?: string
  /** ★★☆☆ ✔ Example: 3 */
  NumberOfImages?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  TotalFrames?: number
}

export interface MetaTags {
  /** ☆☆☆☆   Example: 1 */
  BorderID?: number
  /** ☆☆☆☆   Example: 0 */
  BorderLocation?: number
  /** ☆☆☆☆   Example: "None" */
  BorderName?: string
  /** ☆☆☆☆   Example: 0 */
  BorderType?: number
  /** ☆☆☆☆   Example: "1 0 0 0" */
  BordersVersion?: string
  /** ☆☆☆☆   Example: "KODAK DC5000 ZOOM DIGITAL CAMERA" */
  CameraOwner?: string
  /** ☆☆☆☆   Example: 1 */
  CaptureConditionsPAR?: number
  /** ☆☆☆☆   Example: "None" */
  DigitalEffectsName?: string
  /** ☆☆☆☆   Example: 0 */
  DigitalEffectsType?: number
  /** ☆☆☆☆   Example: "1 0 0 0" */
  DigitalEffectsVersion?: string
  /** ☆☆☆☆   Example: 1 */
  EditTagArray?: number
  /** ☆☆☆☆   Example: 2 */
  FilmGencode?: number
  /** ☆☆☆☆   Example: 43 */
  FilmProductCode?: number
  /** ☆☆☆☆   Example: 1 */
  FilmSize?: number
  /** ☆☆☆☆   Example: 16 */
  FrameNumber?: number
  /** ☆☆☆☆   Example: 6 */
  ImageSourceEK?: number
  /** ☆☆☆☆ ✔ Example: "0110" */
  MetadataNumber?: string
  /** ☆☆☆☆   Example: "Version 9" */
  ModelAndVersion?: string
  /** ☆☆☆☆   Example: 3 */
  WatermarkType?: number
}

export interface PanasonicRawTags {
  /** ☆☆☆☆ ✔ Example: 1.02416 */
  DistortionScale?: number
  /** ☆☆☆☆   Example: "Yes" */
  FacesDetected?: string
  /** ☆☆☆☆   Example: "Yes" */
  FlashFired?: string
  /** ☆☆☆☆   Example: 5 */
  FocusStepNear?: number
  /** ☆☆☆☆   Example: "Yes" */
  LensAttached?: string
  /** ☆☆☆☆   Example: 2 */
  LensTypeMake?: number
  /** ☆☆☆☆   Example: "30 10" */
  LensTypeModel?: string
  /** ☆☆☆☆   Example: "Yes" */
  MultishotOn?: string
  /** ☆☆☆☆ ✔ Example: 7 */
  NumWBEntries?: number
  /** ☆☆☆☆   Example: 4.8789063 */
  SensitivityValue?: number
  /** ☆☆☆☆   Example: "Tungsten" */
  WhiteBalanceDetected?: string
  /** ☆☆☆☆   Example: "Kelvin" */
  WhiteBalanceSet?: string
  /** ☆☆☆☆   Example: 54 */
  ZoomPosition?: number
}

export interface PhotoshopTags {
  /** ☆☆☆☆ ✔ Example: true */
  CopyrightFlag?: boolean
  /** ☆☆☆☆ ✔ Example: "inches" */
  DisplayedUnitsX?: string
  /** ☆☆☆☆ ✔ Example: "inches" */
  DisplayedUnitsY?: string
  /** ☆☆☆☆ ✔ Example: 30 */
  GlobalAltitude?: number
  /** ☆☆☆☆ ✔ Example: 90 */
  GlobalAngle?: number
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HasRealMergedData?: string
  /** ☆☆☆☆ ✔ Example: "fd826cdf97ac15335b426a20d23c1041" */
  IPTCDigest?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  NumSlices?: number
  /** ☆☆☆☆ ✔ Example: "Standard" */
  PhotoshopFormat?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  PhotoshopQuality?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 8561 bytes, use -b option to extract)" */
  PhotoshopThumbnail?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  PixelAspectRatio?: number
  /** ☆☆☆☆ ✔ Example: "0 0" */
  PrintPosition?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  PrintScale?: number
  /** ☆☆☆☆ ✔ Example: "Centered" */
  PrintStyle?: string
  /** ☆☆☆☆ ✔ Example: "3 Scans" */
  ProgressiveScans?: string
  /** ☆☆☆☆ ✔ Example: "Adobe Photoshop CS" */
  ReaderName?: string
  /** ☆☆☆☆ ✔ Example: "panasonic_lumix_dmc_lx15_02" */
  SlicesGroupName?: string
  /** ☆☆☆☆ ✔ Example: "Adobe Photoshop" */
  WriterName?: string
}

export interface PrintIMTags {
  /** ★★★☆ ✔ Example: "0300" */
  PrintIMVersion?: string
}

export interface QuickTimeTags {
  /** ☆☆☆☆ ✔ Example: 60 */
  AndroidCaptureFps?: number
  /** ☆☆☆☆ ✔ Example: 7.1 */
  AndroidVersion?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 4 bytes, use -b option to extract)" */
  AndroidVideoTemporalLayersCount?: string
  /** ☆☆☆☆ ✔ Example: 8 */
  AudioBitsPerSample?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  AudioChannels?: number
  /** ☆☆☆☆ ✔ Example: "sowt" */
  AudioFormat?: string
  /** ☆☆☆☆ ✔ Example: 8000 */
  AudioSampleRate?: number
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  AudioVendorID?: string
  /** ☆☆☆☆ ✔ Example: "Nom De Plume" */
  Author?: string
  /** ☆☆☆☆ ✔ Example: "65535 65535 65535" */
  BackgroundColor?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ChapterListTrackID?: number
  /** ☆☆☆☆   Example: "3840x2160" */
  CleanApertureDimensions?: string
  /** ☆☆☆☆ ✔ Example: "nclx 9 1 9" */
  ColorRepresentation?: string
  /** ☆☆☆☆ ✔ Example: ["qt  "] */
  CompatibleBrands?: string[]
  /** ☆☆☆☆ ✔ Example: "jpeg" */
  CompressorID?: string
  /** ☆☆☆☆ ✔ Example: "Photo - JPEG" */
  CompressorName?: string
  /** ☆☆☆☆   Example: "Track 1" */
  ContentDescribes?: string
  /** ☆☆☆☆   Example: 2021-10-24T17:00:51.000+01:00 */
  CreationDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "0 s" */
  CurrentTime?: string
  /** ☆☆☆☆   Example: "3840x2160" */
  EncodedPixelsDimensions?: string
  /** ☆☆☆☆ ✔ Example: "Helvetica" */
  FontName?: string
  /** ☆☆☆☆ ✔ Example: "51 deg 28' 58.44" N, 3 deg 11' 9.96" W, 13.739 m Above Sea Level" */
  GPSCoordinates?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  GenBalance?: number
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  GenFlags?: string
  /** ☆☆☆☆ ✔ Example: "ditherCopy" */
  GenGraphicsMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  GenMediaVersion?: number
  /** ☆☆☆☆ ✔ Example: "32768 32768 32768" */
  GenOpColor?: string
  /** ☆☆☆☆ ✔ Example: "srcCopy" */
  GraphicsMode?: string
  /** ☆☆☆☆ ✔ Example: "Data Handler" */
  HandlerClass?: string
  /** ☆☆☆☆ ✔ Example: "SoundHandle" */
  HandlerDescription?: string
  /** ☆☆☆☆ ✔ Example: "Video Track" */
  HandlerType?: string
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  HandlerVendorID?: string
  /** ☆☆☆☆   Example: 4.798027 */
  LocationAccuracyHorizontal?: number
  /** ☆☆☆☆ ✔ Example: "MP4 v2 [ISO 14496-14]" */
  MajorBrand?: string
  /** ☆☆☆☆ ✔ Example: "1 0 0 0 1 0 0 0 1" */
  MatrixStructure?: string
  /** ☆☆☆☆ ✔ Example: 2021-12-29T10:57:50.000-05:00 */
  MediaCreateDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 98304 */
  MediaDataOffset?: number
  /** ☆☆☆☆ ✔ Example: 9790496 */
  MediaDataSize?: number
  /** ☆☆☆☆ ✔ Example: 9.5095 */
  MediaDuration?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  MediaHeaderVersion?: number
  /** ☆☆☆☆ ✔ Example: "und" */
  MediaLanguageCode?: string
  /** ☆☆☆☆ ✔ Example: 2021-12-29T10:57:50.000-05:00 */
  MediaModifyDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 8000 */
  MediaTimeScale?: number
  /** ☆☆☆☆   Example: "mebx" */
  MetaFormat?: string
  /** ☆☆☆☆ ✔ Example: "2011.7.0" */
  MinorVersion?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  MovieHeaderVersion?: number
  /** ☆☆☆☆ ✔ Example: 6 */
  NextTrackID?: number
  /** ☆☆☆☆ ✔ Example: "32768 32768 32768" */
  OpColor?: string
  /** ☆☆☆☆ ✔ Example: "tmcd" */
  OtherFormat?: string
  /** ☆☆☆☆ ✔ Example: "SEQ_PLAY" */
  PlayMode?: string
  /** ☆☆☆☆ ✔ Example: "0 s" */
  PosterTime?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  PreferredRate?: number
  /** ☆☆☆☆ ✔ Example: "99.61%" */
  PreferredVolume?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  PreviewDuration?: number
  /** ☆☆☆☆ ✔ Example: "0 s" */
  PreviewTime?: string
  /** ☆☆☆☆   Example: "3840x2160" */
  ProductionApertureDimensions?: string
  /** ☆☆☆☆   Example: "mp4a" */
  PurchaseFileFormat?: string
  /** ☆☆☆☆   Example: 1 */
  SampleDuration?: number
  /** ☆☆☆☆   Example: "0 s" */
  SampleTime?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  SelectionDuration?: number
  /** ☆☆☆☆ ✔ Example: "0 s" */
  SelectionTime?: string
  /** ☆☆☆☆ ✔ Example: "43333139313032343731363032300000" */
  SerialNumberHash?: string
  /** ☆☆☆☆ ✔ Example: 720 */
  SourceImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 8192 */
  SourceImageWidth?: number
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  TextColor?: string
  /** ☆☆☆☆ ✔ Example: "Plain" */
  TextFace?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (21)" */
  TextFont?: string
  /** ☆☆☆☆ ✔ Example: 10 */
  TextSize?: number
  /** ☆☆☆☆ ✔ Example: 3 */
  TimeCode?: number
  /** ☆☆☆☆ ✔ Example: 90000 */
  TimeScale?: number
  /** ☆☆☆☆ ✔ Example: 2021-12-29T10:57:50.000-05:00 */
  TrackCreateDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 9.5095 */
  TrackDuration?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  TrackHeaderVersion?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  TrackID?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  TrackLayer?: number
  /** ☆☆☆☆ ✔ Example: 2021-12-29T10:57:50.000-05:00 */
  TrackModifyDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "0.00%" */
  TrackVolume?: string
  /** ☆☆☆☆ ✔ Example: "Panasonic" */
  VendorID?: string
  /** ☆☆☆☆ ✔ Example: 60 */
  VideoFrameRate?: number
}

export interface RAFTags {
  /** ☆☆☆☆ ✔ Example: "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071297989 …" */
  ChromaticAberrationParams?: string
  /** ☆☆☆☆ ✔ Example: "8 9 11 10" */
  FujiLayout?: string
  /** ☆☆☆☆ ✔ Example: "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071297989 …" */
  GeometricDistortionParams?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RawExposureBias?: number
  /** ☆☆☆☆   Example: "4:3" */
  RawImageAspectRatio?: string
  /** ☆☆☆☆ ✔ Example: "8 12" */
  RawImageCropTopLeft?: string
  /** ☆☆☆☆ ✔ Example: "8256x6192" */
  RawImageCroppedSize?: string
  /** ☆☆☆☆ ✔ Example: 8754 */
  RawImageFullHeight?: number
  /** ☆☆☆☆ ✔ Example: "9216x6210" */
  RawImageFullSize?: string
  /** ☆☆☆☆ ✔ Example: 9216 */
  RawImageFullWidth?: number
  /** ☆☆☆☆   Example: "7680x2720" */
  RawImageSize?: string
  /** ☆☆☆☆   Example: 0 */
  RelativeExposure?: number
  /** ☆☆☆☆ ✔ Example: "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071297989 …" */
  VignettingParams?: string
  /** ☆☆☆☆ ✔ Example: "GRBGBR BGGRGG RGGBGG GBRGRB RGGBGG BGGRGG" */
  XTransLayout?: string
}

export interface RIFFTags {
  /** ☆☆☆☆ ✔ Example: "" */
  AudioCodec?: string
  /** ☆☆☆☆ ✔ Example: 285154 */
  AudioSampleCount?: number
  /** ☆☆☆☆ ✔ Example: 11024 */
  AvgBytesPerSec?: number
  /** ☆☆☆☆ ✔ Example: "Microsoft PCM" */
  Encoding?: string
  /** ☆☆☆☆ ✔ Example: 388 */
  FrameCount?: number
  /** ☆☆☆☆ ✔ Example: "467.4 kB/s" */
  MaxDataRate?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  NumChannels?: number
  /** ☆☆☆☆ ✔ Example: 11024 */
  SampleRate?: number
  /** ☆☆☆☆ ✔ Example: "Variable" */
  SampleSize?: string
  /** ☆☆☆☆ ✔ Example: 2 */
  StreamCount?: number
  /** ☆☆☆☆ ✔ Example: "Video" */
  StreamType?: string
  /** ☆☆☆☆ ✔ Example: "mjpg" */
  VideoCodec?: string
  /** ☆☆☆☆ ✔ Example: 388 */
  VideoFrameCount?: number
}

export interface JFIFTags {
  /** ★★★☆ ✔ Example: 1.02 */
  JFIFVersion?: number
}

export interface MakerNotesTags {
  /** ☆☆☆☆ ✔ Example: "Off" */
  ADLBracketingStep?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ADLBracketingType?: string
  /** ☆☆☆☆ ✔ Example: 9.9 */
  AEAperture?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  AEApertureSteps?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  AEBAutoCancel?: string
  /** ★★☆☆ ✔ Example: 0 */
  AEBBracketValue?: number
  /** ☆☆☆☆ ✔ Example: "0,-,+" */
  AEBSequence?: string
  /** ☆☆☆☆ ✔ Example: "0,-,+/Enabled" */
  AEBSequenceAutoCancel?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (5 0)" */
  AEBShotCount?: string
  /** ☆☆☆☆ ✔ Example: 0.5 */
  AEBXv?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (0x12)" */
  AEBracketingSteps?: string
  /** ☆☆☆☆ ✔ Example: "1/965" */
  AEExposureTime?: string
  /** ☆☆☆☆ ✔ Example: "Hold" */
  AELButton?: string
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  AELExposureIndicator?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AELock?: string
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  AELockButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AELockButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Evaluative, Partial, Spot, Center-weighted" */
  AELockMeterModeAfterFocus?: string
  /** ☆☆☆☆ ✔ Example: 5.7 */
  AEMaxAperture?: number
  /** ☆☆☆☆ ✔ Example: "[1], [2]" */
  AEMeteringMode?: string
  /** ☆☆☆☆ ✔ Example: "9.8 9.4 7.9 8.6 9.2 8.5 9.4 8.9 8.1 8.6 8.0 10.4 8.5 10.6 9.5 9.…" */
  AEMeteringSegments?: string
  /** ☆☆☆☆ ✔ Example: "Enable; 0; 8; 0" */
  AEMicroadjustment?: string
  /** ☆☆☆☆ ✔ Example: 38 */
  AEMinAperture?: number
  /** ☆☆☆☆ ✔ Example: "1/7723" */
  AEMinExposureTime?: string
  /** ☆☆☆☆ ✔ Example: "Sv or Green Mode" */
  AEProgramMode?: string
  /** ★☆☆☆ ✔ Example: "Normal AE" */
  AESetting?: string
  /** ☆☆☆☆   Example: "Daylight Fluorescent" */
  AEWhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: 0.5 */
  AEXv?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  AFAccelDecelTracking?: number
  /** ☆☆☆☆ ✔ Example: "Shutter/AF-On" */
  AFActivation?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  AFAdjustment?: number
  /** ☆☆☆☆ ✔ Example: "Metering start" */
  AFAndMeteringButtons?: string
  /** ☆☆☆☆ ✔ Example: 6.5 */
  AFAperture?: number
  /** ☆☆☆☆ ✔ Example: 888 */
  AFAreaHeight?: number
  /** ★☆☆☆ ✔ Example: "994 18 18 18 18 18 18 18 18" */
  AFAreaHeights?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  AFAreaIllumination?: string
  /** ★★★☆ ✔ Example: "Zone AF" */
  AFAreaMode?: string
  /** ☆☆☆☆ ✔ Example: "Wide" */
  AFAreaModeSetting?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFAreaPointSize?: string
  /** ☆☆☆☆ ✔ Example: "AF area selection button" */
  AFAreaSelectMethod?: string
  /** ☆☆☆☆ ✔ Example: "Main Dial" */
  AFAreaSelectionMethod?: string
  /** ☆☆☆☆ ✔ Example: 996 */
  AFAreaWidth?: number
  /** ★☆☆☆ ✔ Example: "994 18 18 18 18 18 18 18 18" */
  AFAreaWidths?: string
  /** ☆☆☆☆ ✔ Example: 4908 */
  AFAreaXPosition?: number
  /** ★★☆☆ ✔ Example: "999 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 …" */
  AFAreaXPositions?: string
  /** ☆☆☆☆ ✔ Example: 744 */
  AFAreaYPosition?: number
  /** ★★☆☆ ✔ Example: "9 0 0 0 0 0 0 0 0" */
  AFAreaYPositions?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFAreaZoneSize?: string
  /** ☆☆☆☆ ✔ Example: "none" */
  AFAreas?: string
  /** ☆☆☆☆ ✔ Example: "Only ext. flash emits/Fires" */
  AFAssist?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  AFAssistBeam?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (5)" */
  AFAssistLamp?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  AFButtonPressed?: string
  /** ☆☆☆☆ ✔ Example: "Case 5" */
  AFConfigTool?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  AFDefocus?: number
  /** ☆☆☆☆ ✔ Example: "Quick mode" */
  AFDuringLiveView?: string
  /** ☆☆☆☆ ✔ Example: "On (2)" */
  AFFineTune?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  AFFineTuneAdj?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  AFFineTuneAdjTele?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFFineTuneIndex?: string
  /** ☆☆☆☆ ✔ Example: "6L of Center" */
  AFFocusPointXPosition?: string
  /** ☆☆☆☆ ✔ Example: "C" */
  AFFocusPointYPosition?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFIlluminator?: string
  /** ★★☆☆ ✔ Example: 88 */
  AFImageHeight?: number
  /** ★★☆☆ ✔ Example: 8688 */
  AFImageWidth?: number
  /** ☆☆☆☆ ✔ Example: "0400" */
  AFInfo2Version?: string
  /** ☆☆☆☆ ✔ Example: "90 ms" */
  AFIntegrationTime?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  AFMicroAdj?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  AFMicroAdjMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  AFMicroAdjRegisteredLenses?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  AFMicroAdjValue?: number
  /** ☆☆☆☆ ✔ Example: "Disable; 1; 0; 0; 0" */
  AFMicroadjustment?: string
  /** ★☆☆☆ ✔ Example: "Zone" */
  AFMode?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFModeRestrictions?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AFOnAELockButtonSwitch?: string
  /** ☆☆☆☆ ✔ Example: "AF-On" */
  AFOnButton?: string
  /** ★★☆☆ ✔ Example: "Upper-right" */
  AFPoint?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AFPointActivationArea?: string
  /** ☆☆☆☆ ✔ Example: "Surrounding AF points" */
  AFPointAreaExpansion?: string
  /** ☆☆☆☆ ✔ Example: "Left (vertical)" */
  AFPointAtShutterRelease?: string
  /** ☆☆☆☆ ✔ Example: "Control-direct:disable/Main:enable" */
  AFPointAutoSelection?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  AFPointBrightness?: string
  /** ☆☆☆☆ ✔ Example: "Selected (pre-AF, focused)" */
  AFPointDisplayDuringFocus?: string
  /** ☆☆☆☆ ✔ Example: "On in Continuous Shooting and Manual Focusing" */
  AFPointIllumination?: string
  /** ☆☆☆☆ ✔ Example: "Left (vertical)" */
  AFPointInFocus?: string
  /** ☆☆☆☆ ✔ Example: "[2]" */
  AFPointMode?: string
  /** ☆☆☆☆ ✔ Example: "none" */
  AFPointPosition?: string
  /** ☆☆☆☆ ✔ Example: "Center" */
  AFPointRegistration?: string
  /** ☆☆☆☆ ✔ Example: "Use Half" */
  AFPointSel?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  AFPointSelected?: string
  /** ☆☆☆☆ ✔ Example: "H=AF+Main/V=AF+Command" */
  AFPointSelection?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (1046 1046)" */
  AFPointSelectionMethod?: string
  /** ☆☆☆☆ ✔ Example: "Lower-right" */
  AFPointSetting?: string
  /** ☆☆☆☆ ✔ Example: "9/Active AF point" */
  AFPointSpotMetering?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  AFPointSwitching?: number
  /** ☆☆☆☆   Example: "Center" */
  AFPoints?: string
  /** ★★☆☆ ✔ Example: "Upper-right, Top" */
  AFPointsInFocus?: string
  /** ☆☆☆☆ ✔ Example: "C6 (C6)" */
  AFPointsInFocus1D?: string
  /** ☆☆☆☆ ✔ Example: "Center" */
  AFPointsInFocus5D?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  AFPointsSelected?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (03 00 06 00 30 00 00)" */
  AFPointsUsed?: string
  /** ☆☆☆☆ ✔ Example: 903 */
  AFPredictor?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  AFTracking?: string
  /** ☆☆☆☆ ✔ Example: 2 */
  AFTrackingSensitivity?: number
  /** ☆☆☆☆ ✔ Example: "79-point" */
  AFType?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AFWithShutter?: string
  /** ☆☆☆☆ ✔ Example: "Shooting not possible without focus" */
  AIServoContinuousShooting?: string
  /** ☆☆☆☆ ✔ Example: "Focus Priority" */
  AIServoFirstImage?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  AIServoFirstImagePriority?: string
  /** ☆☆☆☆ ✔ Example: "1: Release, 2: Drive speed" */
  AIServoImagePriority?: string
  /** ☆☆☆☆ ✔ Example: "Focus Priority" */
  AIServoSecondImage?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  AIServoSecondImagePriority?: string
  /** ☆☆☆☆ ✔ Example: "Main focus point priority" */
  AIServoTrackingMethod?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  AIServoTrackingSensitivity?: string
  /** ☆☆☆☆ ✔ Example: 2 */
  AccelerationTracking?: number
  /** ☆☆☆☆ ✔ Example: "0.9421226483 0.0351725654 -0.3452420701" */
  AccelerationVector?: string
  /** ☆☆☆☆   Example: "358.3 11.2" */
  Accelerometer?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  AccelerometerX?: number
  /** ☆☆☆☆ ✔ Example: 88 */
  AccelerometerY?: number
  /** ☆☆☆☆ ✔ Example: 61 */
  AccelerometerZ?: number
  /** ☆☆☆☆ ✔ Example: "00:00" */
  AccessorySerialNumber?: string
  /** ☆☆☆☆ ✔ Example: "NO-ACCESSORY" */
  AccessoryType?: string
  /** ☆☆☆☆   Example: "+0.0" */
  ActualCompensation?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  AddAspectRatioInfo?: string
  /** ☆☆☆☆ ✔ Example: "Disable" */
  AddIPTCInformation?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AddOriginalDecisionData?: string
  /** ☆☆☆☆   Example: "X3F Setting Mode" */
  AdjustmentMode?: string
  /** ☆☆☆☆ ✔ Example: "Toy Camera" */
  AdvancedFilter?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  AdvancedSceneType?: number
  /** ☆☆☆☆ ✔ Example: "91 m" */
  Altitude?: string
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  AmbienceSelection?: string
  /** ☆☆☆☆   Example: "95 F" */
  AmbientTemperatureFahrenheit?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ApertureLock?: string
  /** ☆☆☆☆ ✔ Example: "Manual: Closed 64; Open 1; Auto: Closed 31; Open 6.3" */
  ApertureRange?: string
  /** ☆☆☆☆ ✔ Example: "Prohibited" */
  ApertureRingUse?: string
  /** ☆☆☆☆ ✔ Example: 9.1 */
  ApertureSetting?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  ApplySettingsToLiveView?: string
  /** ☆☆☆☆ ✔ Example: "Enable; 1; 2; 1; 128; 48; 0; 1" */
  ApplyShootingMeteringMode?: string
  /** ☆☆☆☆   Example: 8 */
  ApproximateFNumber?: number
  /** ☆☆☆☆ ✔ Example: "Soft Focus; 1280; 0; 0" */
  ArtFilter?: string
  /** ☆☆☆☆ ✔ Example: "Off; 0; 0; Partial Color 0; No Effect; 0; No Color Filter; 0; 0;…" */
  ArtFilterEffect?: string
  /** ☆☆☆☆   Example: "Unknown (8305)" */
  ArtMode?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  ArtModeParameters?: string
  /** ☆☆☆☆ ✔ Example: "0 484 5183 3403" */
  AspectFrame?: string
  /** ★☆☆☆ ✔ Example: "Unknown (942874672)" */
  AspectRatio?: string
  /** ☆☆☆☆ ✔ Example: "Multiple Exposure" */
  AssignBktButton?: string
  /** ☆☆☆☆ ✔ Example: "LCD brightness" */
  AssignFuncButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieFunc1ButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieFunc2Button?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMoviePreviewButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Shutter/Aperture Lock" */
  AssignMovieRecordButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieRecordButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  AssignMovieSubselector?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignMovieSubselectorPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  AssignRemoteFnButton?: string
  /** ☆☆☆☆ ✔ Example: "Select Home Position" */
  AssistButtonFunction?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  Audio?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AudioCompression?: string
  /** ☆☆☆☆ ✔ Example: "On-Shot AF only" */
  AutoAFPointColorTracking?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  AutoAFPointSelEOSiTRAF?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoAperture?: string
  /** ☆☆☆☆   Example: "None" */
  AutoBracket?: string
  /** ☆☆☆☆ ✔ Example: "Flash/Speed/Aperture" */
  AutoBracketModeM?: string
  /** ☆☆☆☆ ✔ Example: "0,-,+" */
  AutoBracketOrder?: string
  /** ☆☆☆☆ ✔ Example: "Flash Only" */
  AutoBracketSet?: string
  /** ★☆☆☆ ✔ Example: "On" */
  AutoBracketing?: string
  /** ☆☆☆☆ ✔ Example: "Flash/Speed" */
  AutoBracketingMode?: string
  /** ☆☆☆☆ ✔ Example: "AE & Flash" */
  AutoBracketingSet?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoDistortionControl?: string
  /** ☆☆☆☆ ✔ Example: "400%" */
  AutoDynamicRange?: string
  /** ★★☆☆ ✔ Example: "On" */
  AutoExposureBracketing?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  AutoFP?: string
  /** ☆☆☆☆ ✔ Example: "Subject and Background" */
  AutoFlashISOSensitivity?: string
  /** ☆☆☆☆   Example: "No Limit" */
  AutoFocusModeRestrictions?: string
  /** ★★☆☆ ✔ Example: 96 */
  AutoISO?: number
  /** ☆☆☆☆ ✔ Example: "1/60 s" */
  AutoISOMinShutterSpeed?: string
  /** ☆☆☆☆ ✔ Example: "Strong" */
  AutoLightingOptimizer?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  AutoPortraitFramed?: string
  /** ★☆☆☆ ✔ Example: "Rotate 90 CW" */
  AutoRotate?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  AuxiliaryLens?: string
  /** ☆☆☆☆ ✔ Example: 6.7 */
  AvApertureSetting?: number
  /** ☆☆☆☆ ✔ Example: "Disable" */
  AvSettingWithoutLens?: string
  /** ☆☆☆☆ ✔ Example: "513 513 513 513" */
  AverageBlackLevel?: string
  /** ☆☆☆☆ ✔ Example: 9.875 */
  AverageLV?: number
  /** ☆☆☆☆   Example: 8 */
  BWFilter?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  BWMode?: string
  /** ☆☆☆☆ ✔ Example: "99:99:99 00:00:00" */
  BabyAge?: string
  /** ☆☆☆☆ ✔ Example: "" */
  BabyName?: string
  /** ☆☆☆☆ ✔ Example: "A0E3S7000218RC" */
  Barcode?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  BarometerInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  BaseExposureCompensation?: number
  /** ★★☆☆ ✔ Example: 800 */
  BaseISO?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  BatteryLevel?: string
  /** ☆☆☆☆ ✔ Example: "MB-D12 First" */
  BatteryOrder?: string
  /** ☆☆☆☆ ✔ Example: "Sufficient Power Remaining" */
  BatteryState?: string
  /** ☆☆☆☆ ✔ Example: "50.6 C" */
  BatteryTemperature?: string
  /** ☆☆☆☆ ✔ Example: "NB-13L" */
  BatteryType?: string
  /** ☆☆☆☆   Example: "8.52 V" */
  BatteryVoltage?: string
  /** ☆☆☆☆   Example: "BGGR" */
  BayerPattern?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  Beep?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  BeepPitch?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  BeepVolume?: string
  /** ☆☆☆☆   Example: "Sports CS" */
  BestShotMode?: string
  /** ☆☆☆☆ ✔ Example: "128 128 128 128" */
  BlackLevels?: string
  /** ☆☆☆☆ ✔ Example: 7 */
  BlackMaskBottomBorder?: number
  /** ☆☆☆☆ ✔ Example: 80 */
  BlackMaskLeftBorder?: number
  /** ☆☆☆☆ ✔ Example: 959 */
  BlackMaskRightBorder?: number
  /** ☆☆☆☆ ✔ Example: 312 */
  BlackMaskTopBorder?: number
  /** ☆☆☆☆ ✔ Example: "7 104 106 6" */
  BlackPoint?: string
  /** ☆☆☆☆   Example: "n/a" */
  BleachBypassToning?: string
  /** ☆☆☆☆   Example: "5C" */
  BlueGain?: string
  /** ☆☆☆☆   Example: "Off; 0; 0; 0" */
  BlurControl?: string
  /** ★☆☆☆ ✔ Example: "None" */
  BlurWarning?: string
  /** ☆☆☆☆ ✔ Example: "28 C" */
  BoardTemperature?: string
  /** ☆☆☆☆ ✔ Example: 165 */
  BodyBatteryADLoad?: number
  /** ☆☆☆☆ ✔ Example: 199 */
  BodyBatteryADNoLoad?: number
  /** ☆☆☆☆ ✔ Example: "Running Low" */
  BodyBatteryState?: string
  /** ☆☆☆☆   Example: "RS1 :V01500000 " */
  BodyFirmware?: string
  /** ☆☆☆☆ ✔ Example: 81 */
  BodyFirmwareVersion?: number
  /** ☆☆☆☆   Example: "SID:14101105   " */
  BodySerialNumber?: string
  /** ☆☆☆☆   Example: 1 */
  BracketIncrement?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  BracketMode?: string
  /** ☆☆☆☆ ✔ Example: "Disabled" */
  BracketProgram?: string
  /** ☆☆☆☆   Example: "0 0" */
  BracketSequence?: string
  /** ☆☆☆☆ ✔ Example: "AE/Flash" */
  BracketSet?: string
  /** ☆☆☆☆ ✔ Example: "No Bracket" */
  BracketSettings?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  BracketShotNumber?: number
  /** ☆☆☆☆   Example: "Unknown (429458713)" */
  BracketStep?: string
  /** ☆☆☆☆ ✔ Example: 12 */
  BracketValue?: number
  /** ☆☆☆☆   Example: "Disable" */
  BracketingBurstOptions?: string
  /** ★☆☆☆ ✔ Example: "n/a" */
  Brightness?: string
  /** ☆☆☆☆   Example: "SU6-7" */
  BuildNumber?: string
  /** ★★☆☆ ✔ Example: 0 */
  BulbDuration?: number
  /** ☆☆☆☆ ✔ Example: "Unlimited" */
  BurstMode?: string
  /** ☆☆☆☆   Example: 3 */
  BurstShot?: number
  /** ☆☆☆☆ ✔ Example: 9 */
  BurstSpeed?: number
  /** ☆☆☆☆ ✔ Example: "460727F2-20CF-4031-957B-7E04D567DF1F" */
  BurstUUID?: string
  /** ☆☆☆☆ ✔ Example: "Normal (enable)" */
  ButtonFunctionControlOff?: string
  /** ☆☆☆☆   Example: 2 */
  CCDBoardVersion?: number
  /** ☆☆☆☆ ✔ Example: "Interlaced" */
  CCDScanMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  CCDSensitivity?: number
  /** ☆☆☆☆   Example: 0 */
  CCDVersion?: number
  /** ☆☆☆☆ ✔ Example: "9 fps" */
  CHModeShootingSpeed?: string
  /** ☆☆☆☆ ✔ Example: "6 fps" */
  CLModeShootingSpeed?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  CMContrast?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  CMHue?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  CMSaturation?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  CMSharpness?: string
  /** ☆☆☆☆   Example: 0 */
  CMWhiteBalance?: number
  /** ☆☆☆☆   Example: 0 */
  CMWhiteBalanceComp?: number
  /** ☆☆☆☆   Example: "0 0 0" */
  CMWhiteBalanceGrayPoint?: string
  /** ☆☆☆☆ ✔ Example: "1.02.00.06" */
  CPUFirmwareVersion?: string
  /** ☆☆☆☆   Example: "d, 2009:09:04 03:19:07" */
  CPUVersions?: string
  /** ☆☆☆☆   Example: "Starting calibration file for SD14F13_Rev3; S/N C75_00001212; SD…" */
  Calibration?: string
  /** ☆☆☆☆   Example: "2216/02/28 03:49:48" */
  CameraDateTime?: string
  /** ★☆☆☆ ✔ Example: "h Company Ltd." */
  CameraID?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  CameraISO?: string
  /** ★☆☆☆ ✔ Example: "Unknown (155)" */
  CameraOrientation?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 8964 bytes, use -b option to extract)" */
  CameraParameters?: string
  /** ☆☆☆☆ ✔ Example: "User Defined 3" */
  CameraPictureStyle?: string
  /** ☆☆☆☆   Example: -90 */
  CameraPitch?: number
  /** ☆☆☆☆   Example: "+0.00" */
  CameraRoll?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  CameraSettingsVersion?: string
  /** ☆☆☆☆   Example: "+90.80" */
  CameraYaw?: string
  /** ★★☆☆ ✔ Example: "Unknown (-1)" */
  CanonExposureMode?: string
  /** ☆☆☆☆ ✔ Example: "Full automatic mode" */
  CanonFileDescription?: string
  /** ☆☆☆☆ ✔ Example: 3794598 */
  CanonFileLength?: number
  /** ★★☆☆ ✔ Example: "Firmware version 1.00" */
  CanonFirmwareVersion?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  CanonFlashMode?: string
  /** ★★☆☆ ✔ Example: 768 */
  CanonImageHeight?: number
  /** ★★☆☆ ✔ Example: "n/a" */
  CanonImageSize?: string
  /** ★★☆☆ ✔ Example: "PIC:DC50 JPEG" */
  CanonImageType?: string
  /** ★★☆☆ ✔ Example: 8688 */
  CanonImageWidth?: number
  /** ★★☆☆ ✔ Example: "XH A1S" */
  CanonModelID?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  CardShutterLock?: string
  /** ★☆☆☆ ✔ Example: "People" */
  Categories?: string
  /** ☆☆☆☆ ✔ Example: "Normal Zone" */
  CenterAFArea?: string
  /** ☆☆☆☆ ✔ Example: "Normal Zone" */
  CenterFocusPoint?: string
  /** ☆☆☆☆ ✔ Example: "Average" */
  CenterWeightedAreaSize?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ChromaticAberrationCorr?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ChromaticAberrationSetting?: string
  /** ☆☆☆☆   Example: "+0.500" */
  ChrominanceNoiseReduction?: string
  /** ☆☆☆☆ ✔ Example: "San Francisco" */
  City2?: string
  /** ☆☆☆☆ ✔ Example: 4 */
  Clarity?: number
  /** ☆☆☆☆   Example: "Off" */
  ClarityControl?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ClearRetouch?: string
  /** ☆☆☆☆ ✔ Example: "Sub-command Dial" */
  CmdDialsApertureSetting?: string
  /** ☆☆☆☆ ✔ Example: "Autofocus Off, Exposure Off" */
  CmdDialsChangeMainSub?: string
  /** ☆☆☆☆ ✔ Example: "On (Image Review Excluded)" */
  CmdDialsMenuAndPlayback?: string
  /** ☆☆☆☆   Example: 0 */
  CmdDialsReverseRotExposureComp?: number
  /** ☆☆☆☆ ✔ Example: "No" */
  CmdDialsReverseRotation?: string
  /** ☆☆☆☆   Example: "0 0 0" */
  ColorAdjustment?: string
  /** ☆☆☆☆   Example: "Off" */
  ColorAdjustmentMode?: string
  /** ☆☆☆☆ ✔ Example: 257 */
  ColorBW?: number
  /** ☆☆☆☆   Example: "On" */
  ColorBalanceAdj?: string
  /** ☆☆☆☆   Example: 256 */
  ColorBalanceBlue?: number
  /** ☆☆☆☆   Example: 65792 */
  ColorBalanceGreen?: number
  /** ☆☆☆☆   Example: 2.4960938 */
  ColorBalanceRed?: number
  /** ☆☆☆☆ ✔ Example: "R01," */
  ColorBalanceVersion?: string
  /** ☆☆☆☆ ✔ Example: 24 */
  ColorBitDepth?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  ColorChromeEffect?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ColorChromeFXBlue?: string
  /** ☆☆☆☆ ✔ Example: 8 */
  ColorCompensationFilter?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorCompensationFilterCustom?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorCompensationFilterSet?: number
  /** ☆☆☆☆ ✔ Example: "96 4096 3072 4096 16 256" */
  ColorControl?: string
  /** ☆☆☆☆ ✔ Example: "Color 0; 0; 29; Strength 0; -4; 3" */
  ColorCreatorEffect?: string
  /** ☆☆☆☆ ✔ Example: "9 (60D/1100D)" */
  ColorDataVersion?: string
  /** ☆☆☆☆ ✔ Example: "Warm" */
  ColorEffect?: string
  /** ☆☆☆☆   Example: "Off" */
  ColorFilter?: string
  /** ☆☆☆☆ ✔ Example: "0.00 0.00 0.00" */
  ColorGain?: string
  /** ☆☆☆☆ ✔ Example: "Mode3a" */
  ColorHue?: string
  /** ☆☆☆☆ ✔ Example: "600 -236 -108 -52 404 -96 -20 -140 416" */
  ColorMatrix?: string
  /** ☆☆☆☆   Example: "1.66016 -0.66016 0.00000 -0.20703 1.52734 -0.32031 -0.13281 -0.2…" */
  ColorMatrixA?: string
  /** ☆☆☆☆   Example: "1.12793 -0.03674 -0.09119 -0.20703 1.52734 -0.32031 -0.13574 -0.…" */
  ColorMatrixB?: string
  /** ☆☆☆☆ ✔ Example: 4 */
  ColorMatrixNumber?: number
  /** ☆☆☆☆ ✔ Example: "Min -5; Max 5; Yellow 0; Orange 0; Orange-red 0; Red 0; Magenta …" */
  ColorProfileSettings?: string
  /** ☆☆☆☆ ✔ Example: 8483 */
  ColorTempAsShot?: number
  /** ☆☆☆☆ ✔ Example: 8483 */
  ColorTempAuto?: number
  /** ☆☆☆☆ ✔ Example: 8391 */
  ColorTempCloudy?: number
  /** ☆☆☆☆ ✔ Example: 5221 */
  ColorTempCustom?: number
  /** ☆☆☆☆ ✔ Example: 7306 */
  ColorTempDaylight?: number
  /** ☆☆☆☆ ✔ Example: 9826 */
  ColorTempFlash?: number
  /** ☆☆☆☆ ✔ Example: 7130 */
  ColorTempFluorescent?: number
  /** ★☆☆☆ ✔ Example: 8001 */
  ColorTempKelvin?: number
  /** ☆☆☆☆ ✔ Example: 8483 */
  ColorTempMeasured?: number
  /** ☆☆☆☆ ✔ Example: 8391 */
  ColorTempShade?: number
  /** ☆☆☆☆ ✔ Example: 3895 */
  ColorTempTungsten?: number
  /** ★☆☆☆ ✔ Example: 9900 */
  ColorTemperature?: number
  /** ☆☆☆☆ ✔ Example: 6800 */
  ColorTemperatureAuto?: number
  /** ☆☆☆☆ ✔ Example: "6300 K" */
  ColorTemperatureCustom?: string
  /** ☆☆☆☆ ✔ Example: "7200 K" */
  ColorTemperatureSet?: string
  /** ☆☆☆☆ ✔ Example: "Temperature" */
  ColorTemperatureSetting?: string
  /** ☆☆☆☆   Example: 6 */
  ColorTint?: number
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ColorTone?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneAuto?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneFaithful?: number
  /** ☆☆☆☆ ✔ Example: 11 */
  ColorToneLandscape?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorToneNeutral?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorTonePortrait?: number
  /** ☆☆☆☆ ✔ Example: 15663191 */
  ColorToneStandard?: number
  /** ☆☆☆☆ ✔ Example: "Standard (Main Shutter, Sub Aperture)" */
  CommandDials?: string
  /** ☆☆☆☆ ✔ Example: "Sub-command Dial" */
  CommandDialsApertureSetting?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  CommandDialsChangeMainSub?: string
  /** ☆☆☆☆ ✔ Example: "On (Image Review Exclude)" */
  CommandDialsMenuAndPlayback?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  CommandDialsReverseRotation?: string
  /** ☆☆☆☆ ✔ Example: 3 */
  CommanderChannel?: number
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderGroupAManualOutput?: string
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderGroupAMode?: string
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderGroupBManualOutput?: string
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderGroupBMode?: string
  /** ☆☆☆☆ ✔ Example: "TTL" */
  CommanderInternalFlash?: string
  /** ☆☆☆☆ ✔ Example: "Full" */
  CommanderInternalManualOutput?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  CommanderInternalTTLComp?: number
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompBuiltin?: number
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompGroupA?: number
  /** ☆☆☆☆ ✔ Example: -3 */
  CommanderInternalTTLCompGroupB?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  ComponentBitDepth?: number
  /** ☆☆☆☆ ✔ Example: "Component version 1.00" */
  ComponentVersion?: string
  /** ☆☆☆☆   Example: "Off" */
  CompositionAdjust?: string
  /** ☆☆☆☆   Example: 8 */
  CompositionAdjustRotation?: number
  /** ☆☆☆☆   Example: 4 */
  CompositionAdjustX?: number
  /** ☆☆☆☆   Example: 1 */
  CompositionAdjustY?: number
  /** ☆☆☆☆ ✔ Example: 98047 */
  CompressedImageSize?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  CompressionFactor?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  CompressionRatio?: number
  /** ☆☆☆☆   Example: "CanonCR3_001/01.09.00/00.00.00" */
  CompressorVersion?: string
  /** ☆☆☆☆ ✔ Example: "Low" */
  ContinuousBracketing?: string
  /** ★★☆☆ ✔ Example: "Unknown (11)" */
  ContinuousDrive?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ContinuousModeDisplay?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ContinuousModeLiveView?: string
  /** ☆☆☆☆ ✔ Example: "Hi 1; Cont 16; Lo 3; Soft 5; Soft LS 3" */
  ContinuousShootingSpeed?: string
  /** ☆☆☆☆ ✔ Example: "Enable; 99 shots" */
  ContinuousShotLimit?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ContrastAuto?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 8256 bytes, use -b option to extract)" */
  ContrastCurve?: string
  /** ☆☆☆☆ ✔ Example: "On (2)" */
  ContrastDetectAF?: string
  /** ☆☆☆☆   Example: "496 184 48 48" */
  ContrastDetectAFArea?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ContrastDetectAFInFocus?: string
  /** ☆☆☆☆ ✔ Example: 6553600 */
  ContrastFaithful?: number
  /** ☆☆☆☆   Example: 0 */
  ContrastHighlight?: number
  /** ☆☆☆☆   Example: "Off" */
  ContrastHighlightShadowAdj?: string
  /** ☆☆☆☆ ✔ Example: 6553600 */
  ContrastLandscape?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (19)" */
  ContrastMode?: string
  /** ☆☆☆☆ ✔ Example: 524288 */
  ContrastMonochrome?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ContrastNeutral?: number
  /** ☆☆☆☆ ✔ Example: 9699328 */
  ContrastPortrait?: number
  /** ☆☆☆☆ ✔ Example: "1 (min -5, max 5)" */
  ContrastSetting?: string
  /** ☆☆☆☆   Example: 0 */
  ContrastShadow?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  ContrastStandard?: number
  /** ☆☆☆☆ ✔ Example: "Shutter Speed" */
  ControlDialSet?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  ControlMode?: string
  /** ☆☆☆☆   Example: "High" */
  ControlRingResponse?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ControlRingRotation?: string
  /** ☆☆☆☆   Example: 0 */
  ControllerBoardVersion?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  ConversionLens?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  Converter?: number
  /** ☆☆☆☆ ✔ Example: 8704 */
  CoringFilter?: number
  /** ☆☆☆☆   Example: "4352 4352 4352 4352 4352 4352 4352 4352 4352 4352 4352" */
  CoringValues?: string
  /** ☆☆☆☆   Example: 6807 */
  CorrelatedColorTemp?: number
  /** ☆☆☆☆ ✔ Example: "United States" */
  Country?: string
  /** ☆☆☆☆ ✔ Example: "ENG" */
  CountryCode?: string
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  CreativeStyle?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  CreativeStyleSetting?: string
  /** ☆☆☆☆   Example: "8 8 6048 4024" */
  CropArea?: string
  /** ☆☆☆☆ ✔ Example: 8 */
  CropBottomMargin?: number
  /** ☆☆☆☆ ✔ Example: 7776 */
  CropHeight?: number
  /** ☆☆☆☆ ✔ Example: "Off (7424x4924 cropped to 7424x4924 at pixel 0,0)" */
  CropHiSpeed?: string
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropLeftMargin?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  CropMode?: string
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropRightMargin?: number
  /** ☆☆☆☆ ✔ Example: 8240 */
  CropTopMargin?: number
  /** ☆☆☆☆ ✔ Example: 9216 */
  CropWidth?: number
  /** ★☆☆☆ ✔ Example: 5792 */
  CroppedImageHeight?: number
  /** ★☆☆☆ ✔ Example: 912 */
  CroppedImageLeft?: number
  /** ★☆☆☆ ✔ Example: 488 */
  CroppedImageTop?: number
  /** ★☆☆☆ ✔ Example: 8688 */
  CroppedImageWidth?: number
  /** ☆☆☆☆   Example: "Off" */
  CrossProcess?: string
  /** ☆☆☆☆   Example: "On" */
  Curves?: string
  /** ☆☆☆☆ ✔ Example: "20 0 19 2 0 65535 65535 65535 2 2 0 65535 65535 65535 18 2 4 2 8…" */
  CustomControls?: string
  /** ☆☆☆☆ ✔ Example: "P-STUDIO" */
  CustomPictureStyleFileName?: string
  /** ☆☆☆☆ ✔ Example: "CS3 (min CS0, max CS4)" */
  CustomSaturation?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  CustomSettingsAllDefault?: string
  /** ☆☆☆☆ ✔ Example: "B" */
  CustomSettingsBank?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBBlueLevel?: number
  /** ☆☆☆☆ ✔ Example: "OK" */
  CustomWBError?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBGreenLevel?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  CustomWBRedLevel?: number
  /** ☆☆☆☆ ✔ Example: "Setup" */
  CustomWBSetting?: string
  /** ☆☆☆☆ ✔ Example: "7 8 1 30 31 0 0 0 0 0 0 2 30 31 0 0 0 0 0 0 5 30 31 0 0 0 0 0 0 …" */
  CustomizeDials?: string
  /** ☆☆☆☆   Example: "Unknown (27471)" */
  DECPosition?: string
  /** ☆☆☆☆ ✔ Example: "10.01.00.00" */
  DSPFirmwareVersion?: string
  /** ☆☆☆☆   Example: "Off" */
  DXCropAlert?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DarkFocusEnvironment?: string
  /** ★☆☆☆ ✔ Example: "(Binary data 8918 bytes, use -b option to extract)" */
  DataDump?: string
  /** ☆☆☆☆ ✔ Example: 8289 */
  DataScaling?: number
  /** ☆☆☆☆ ✔ Example: 2016-03-30 */
  Date?: ExifDate | string
  /** ☆☆☆☆ ✔ Example: "Y/M/D" */
  DateDisplayFormat?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  DateImprint?: string
  /** ★★☆☆ ✔ Example: "Off" */
  DateStampMode?: string
  /** ☆☆☆☆   Example: "Off" */
  DateTimeStamp?: string
  /** ☆☆☆☆ ✔ Example: 2021-10-20T18:26:14.000Z */
  DateTimeUTC?: ExifDateTime | string
  /** ★☆☆☆ ✔ Example: "Yes" */
  DaylightSavings?: string
  /** ☆☆☆☆ ✔ Example: "Erase selected" */
  DefaultEraseOption?: string
  /** ☆☆☆☆ ✔ Example: 7382 */
  DeletedImageCount?: number
  /** ☆☆☆☆ ✔ Example: "Warsaw" */
  DestinationCity?: string
  /** ☆☆☆☆   Example: "    " */
  DestinationCityCode?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DestinationDST?: string
  /** ☆☆☆☆ ✔ Example: 400 */
  DevelopmentDynamicRange?: number
  /** ☆☆☆☆ ✔ Example: "SMX Video Camera" */
  DeviceType?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  DialDirectionTvAv?: string
  /** ☆☆☆☆   Example: "Unknown (49)" */
  DiffractionCompensation?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  DiffractionCorrection?: string
  /** ☆☆☆☆   Example: "Vivid" */
  DigitalFilter?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  DigitalGain?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  DigitalICE?: string
  /** ☆☆☆☆   Example: "On" */
  DigitalZoomOn?: string
  /** ☆☆☆☆ ✔ Example: 897 */
  DirectoryIndex?: number
  /** ☆☆☆☆ ✔ Example: 999 */
  DirectoryNumber?: number
  /** ☆☆☆☆ ✔ Example: "Enable" */
  DisplayAllAFPoints?: string
  /** ☆☆☆☆ ✔ Example: 9.5 */
  DisplayAperture?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  DistortionControl?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  DistortionCorrParamsNumber?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  DistortionCorrParamsPresent?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  DistortionCorrectionSetting?: string
  /** ☆☆☆☆ ✔ Example: 100 */
  DistortionCorrectionValue?: number
  /** ☆☆☆☆ ✔ Example: "Single Frame" */
  DriveModeSetting?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  DriveSpeed?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 2047 bytes, use -b option to extract)" */
  DustRemovalData?: string
  /** ☆☆☆☆ ✔ Example: "9 Points" */
  DynamicAFArea?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  DynamicAreaAFAssist?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  DynamicAreaAFDisplay?: string
  /** ☆☆☆☆ ✔ Example: "Wide" */
  DynamicRange?: string
  /** ☆☆☆☆ ✔ Example: "On; Enabled; 0; 0" */
  DynamicRangeExpansion?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizer?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  DynamicRangeOptimizerBracket?: string
  /** ☆☆☆☆ ✔ Example: 5 */
  DynamicRangeOptimizerLevel?: number
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizerMode?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  DynamicRangeOptimizerSetting?: string
  /** ☆☆☆☆ ✔ Example: "Wide2 (400%)" */
  DynamicRangeSetting?: string
  /** ☆☆☆☆ ✔ Example: "Evaluative" */
  ETTLII?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  EVStepSize?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV Steps" */
  EVSteps?: string
  /** ☆☆☆☆ ✔ Example: "Manual" */
  EXRAuto?: string
  /** ☆☆☆☆ ✔ Example: "SN (Signal to Noise priority)" */
  EXRMode?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  EasyExposureComp?: string
  /** ☆☆☆☆ ✔ Example: "On (auto reset)" */
  EasyExposureCompensation?: string
  /** ★★☆☆ ✔ Example: "Unknown (83)" */
  EasyMode?: string
  /** ☆☆☆☆ ✔ Example: 9.8 */
  EffectiveLV?: number
  /** ☆☆☆☆ ✔ Example: 6.3 */
  EffectiveMaxAperture?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  ElectronicFrontCurtainShutter?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  EnergySavingMode?: string
  /** ☆☆☆☆   Example: "Off" */
  Enhancement?: string
  /** ☆☆☆☆ ✔ Example: 960 */
  Enhancer?: number
  /** ☆☆☆☆   Example: "576 768 960 1120 1440 0 0" */
  EnhancerValues?: string
  /** ☆☆☆☆   Example: 480 */
  EpsonImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 640 */
  EpsonImageWidth?: number
  /** ☆☆☆☆   Example: "https://PhotoStructure.com/" */
  EpsonSoftware?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  EquipmentVersion?: string
  /** ☆☆☆☆   Example: 89 */
  EventNumber?: number
  /** ☆☆☆☆ ✔ Example: "97.5 mm" */
  ExitPupilPosition?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureBracketShotNumber?: number
  /** ☆☆☆☆ ✔ Example: 0.5 */
  ExposureBracketStepSize?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureBracketValue?: number
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  ExposureBracketingIndicatorLast?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ExposureCompAutoCancel?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureCompStepSize?: string
  /** ☆☆☆☆ ✔ Example: "Ambient and Flash" */
  ExposureCompensationMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureCompensationSet?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureCompensationSetting?: number
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureControlStep?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ExposureControlStepSize?: string
  /** ★☆☆☆ ✔ Example: 1 */
  ExposureCount?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  ExposureDelayMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureDifference?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureIndicator?: number
  /** ☆☆☆☆ ✔ Example: "1/3-stop set, 1/3-stop comp." */
  ExposureLevelIncrements?: string
  /** ☆☆☆☆ ✔ Example: "Spot metering" */
  ExposureModeInManual?: string
  /** ☆☆☆☆ ✔ Example: 0.66 */
  ExposureShift?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureStandardAdjustment?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExposureTuning?: number
  /** ★☆☆☆ ✔ Example: "Good" */
  ExposureWarning?: string
  /** ☆☆☆☆   Example: "Off" */
  ExtendedMenuBanks?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ExtendedShutterSpeeds?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ExtendedWBDetect?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  Extender?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExtenderFirmwareVersion?: number
  /** ☆☆☆☆ ✔ Example: "" */
  ExtenderModel?: string
  /** ☆☆☆☆ ✔ Example: "" */
  ExtenderSerialNumber?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ExternalFlash?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashBounce?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashCompensation?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashExposureComp?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashFirmware?: string
  /** ☆☆☆☆ ✔ Example: "Fired, Wide Flash Adapter, [7]" */
  ExternalFlashFlags?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ExternalFlashGValue?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashGuideNumber?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  ExternalFlashMode?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ExternalFlashReadyState?: string
  /** ☆☆☆☆ ✔ Example: "Flash Not Attached" */
  ExternalFlashStatus?: string
  /** ☆☆☆☆ ✔ Example: 54 */
  ExternalFlashZoom?: number
  /** ☆☆☆☆ ✔ Example: "No" */
  ExternalFlashZoomOverride?: string
  /** ☆☆☆☆   Example: 9.14 */
  ExternalSensorBrightnessValue?: number
  /** ☆☆☆☆ ✔ Example: "0.1.0.1" */
  ExtraInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  EyeStartAF?: string
  /** ☆☆☆☆ ✔ Example: "Enable; 0; 8; 0" */
  FEMicroadjustment?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (II*)" */
  FaceDetect?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 405 bytes, use -b option to extract)" */
  FaceDetectArea?: string
  /** ☆☆☆☆ ✔ Example: "0 26 640 428 0 26 640 428 0 0 0 0" */
  FaceDetectFrameCrop?: string
  /** ★☆☆☆ ✔ Example: "720 480" */
  FaceDetectFrameSize?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FaceDetection?: string
  /** ☆☆☆☆ ✔ Example: "918 1058 1959 2101" */
  FaceElementPositions?: string
  /** ☆☆☆☆ ✔ Example: "892 917 2131 2135" */
  FaceElementSelected?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (4096)" */
  FaceElementTypes?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  FaceInfoLength?: number
  /** ☆☆☆☆ ✔ Example: 94 */
  FaceInfoOffset?: number
  /** ☆☆☆☆ ✔ Example: "" */
  FaceName?: string
  /** ☆☆☆☆   Example: "67 23" */
  FacePosition?: string
  /** ☆☆☆☆ ✔ Example: "918 1058 1959 2101" */
  FacePositions?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FaceRecognition?: string
  /** ☆☆☆☆ ✔ Example: 35 */
  FaceWidth?: number
  /** ☆☆☆☆ ✔ Example: 12336 */
  FacesRecognized?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  Fade?: number
  /** ☆☆☆☆ ✔ Example: 9984 */
  FileIndex?: number
  /** ☆☆☆☆ ✔ Example: "0100" */
  FileInfoVersion?: string
  /** ☆☆☆☆   Example: "Unknown (65537)" */
  FileNumberMemory?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FileNumberSequence?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  FillFlashAutoReduction?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FilmGrainEffect?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilmMode?: string
  /** ☆☆☆☆ ✔ Example: "POSITIVE       " */
  FilmType?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilterEffect?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FilterEffectAuto?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0x10000)" */
  FilterEffectMonochrome?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FinderDisplayDuringExposure?: string
  /** ☆☆☆☆ ✔ Example: "On; Normal" */
  FineSharpness?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptCenterWeighted?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptHighlightWeighted?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptMatrixMetering?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  FineTuneOptSpotMetering?: number
  /** ☆☆☆☆ ✔ Example: "u77" */
  Firmware?: string
  /** ☆☆☆☆   Example: "2015:11:09 08:38" */
  FirmwareDate?: string
  /** ☆☆☆☆ ✔ Example: "NX1_000000" */
  FirmwareName?: string
  /** ★☆☆☆ ✔ Example: "Rev01500000" */
  FirmwareRevision?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FisheyeFilter?: string
  /** ☆☆☆☆ ✔ Example: "Fired" */
  FlashAction?: string
  /** ☆☆☆☆ ✔ Example: "Did not fire" */
  FlashActionExternal?: string
  /** ★☆☆☆ ✔ Example: 255 */
  FlashActivity?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashBatteryLevel?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashBias?: number
  /** ★★☆☆ ✔ Example: "Manual, External" */
  FlashBits?: string
  /** ☆☆☆☆   Example: "Exposure" */
  FlashBurstPriority?: string
  /** ☆☆☆☆ ✔ Example: "Raise built-in flash" */
  FlashButtonFunction?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashChargeLevel?: number
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashColorFilter?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashCommanderMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashCompensation?: number
  /** ☆☆☆☆ ✔ Example: "Pre-flash TTL" */
  FlashControl?: string
  /** ☆☆☆☆ ✔ Example: "iTTL-BL" */
  FlashControlMode?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashCurtain?: string
  /** ☆☆☆☆ ✔ Example: "Fill Flash" */
  FlashDefault?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0 0)" */
  FlashDevice?: string
  /** ☆☆☆☆   Example: 53 */
  FlashDistance?: number
  /** ☆☆☆☆ ✔ Example: 0.3 */
  FlashExposureBracketValue?: number
  /** ★★★☆ ✔ Example: 2 */
  FlashExposureComp?: number
  /** ☆☆☆☆ ✔ Example: "Entire frame" */
  FlashExposureCompArea?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashExposureCompSet?: number
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicator?: string
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicatorLast?: string
  /** ☆☆☆☆ ✔ Example: "Not Indicated" */
  FlashExposureIndicatorNext?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashExposureLock?: string
  /** ☆☆☆☆ ✔ Example: "Fires" */
  FlashFiring?: string
  /** ☆☆☆☆ ✔ Example: 1.005 */
  FlashFirmwareVersion?: number
  /** ☆☆☆☆ ✔ Example: "14 mm" */
  FlashFocalLength?: string
  /** ☆☆☆☆ ✔ Example: "No flash" */
  FlashFunction?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGNDistance?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupACompensation?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupAControlMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupBCompensation?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupBControlMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FlashGroupCCompensation?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashGroupCControlMode?: string
  /** ★★☆☆ ✔ Example: 9 */
  FlashGuideNumber?: number
  /** ☆☆☆☆ ✔ Example: "0301" */
  FlashInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "n/a (x4)" */
  FlashIntensity?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  FlashLevel?: string
  /** ☆☆☆☆   Example: "Unknown (243)" */
  FlashMasterControlMode?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (65797)" */
  FlashMetering?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashMeteringMode?: string
  /** ☆☆☆☆ ✔ Example: "18.0 18.5 20.0 20.0 20.0 20.0 20.0 20.0 20.0 18.6 18.0 18.0 19.0…" */
  FlashMeteringSegments?: string
  /** ★★☆☆ ✔ Example: "Unknown (c2)" */
  FlashMode?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashModel?: string
  /** ☆☆☆☆ ✔ Example: "Red-eye reduction" */
  FlashOptions?: string
  /** ★☆☆☆ ✔ Example: 94 */
  FlashOutput?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashRemoteControl?: string
  /** ☆☆☆☆ ✔ Example: "01114671" */
  FlashSerialNumber?: string
  /** ★☆☆☆ ✔ Example: "Uw-Normal" */
  FlashSetting?: string
  /** ☆☆☆☆ ✔ Example: "30 s" */
  FlashShutterSpeed?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashSource?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  FlashStatus?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  FlashStatusExternal?: string
  /** ☆☆☆☆   Example: "Front curtain" */
  FlashSyncMode?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  FlashSyncSpeed?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  FlashSyncSpeedAv?: string
  /** ☆☆☆☆ ✔ Example: 8.5 */
  FlashThreshold?: number
  /** ☆☆☆☆ ✔ Example: "Yes (flash required but disabled)" */
  FlashWarning?: string
  /** ☆☆☆☆ ✔ Example: "320 262" */
  FlexibleSpotPosition?: string
  /** ☆☆☆☆ ✔ Example: "Right to Left" */
  FlickAdvanceDirection?: string
  /** ☆☆☆☆   Example: "On" */
  FlickerReduce?: string
  /** ☆☆☆☆ ✔ Example: "Off (0x3223)" */
  FlickerReduction?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FlickerReductionIndicator?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  FlickerReductionShooting?: string
  /** ☆☆☆☆   Example: "No" */
  FlipHorizontal?: string
  /** ☆☆☆☆ ✔ Example: "70.0 mm" */
  FocalLengthTeleZoom?: string
  /** ☆☆☆☆ ✔ Example: "640 428" */
  FocalPlaneAFPointArea?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  FocalPlaneAFPointsUsed?: number
  /** ★☆☆☆ ✔ Example: "9.45 mm" */
  FocalPlaneDiagonal?: string
  /** ★☆☆☆ ✔ Example: "9.02 mm" */
  FocalPlaneXSize?: string
  /** ★☆☆☆ ✔ Example: "8.10 mm" */
  FocalPlaneYSize?: string
  /** ★☆☆☆ ✔ Example: "Zoom" */
  FocalType?: string
  /** ★★☆☆ ✔ Example: "32/mm" */
  FocalUnits?: string
  /** ☆☆☆☆   Example: "Wide Focus (normal)" */
  FocusArea?: string
  /** ☆☆☆☆ ✔ Example: "Wrap" */
  FocusAreaSelection?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  FocusBracket?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  FocusBracketStepSize?: number
  /** ★★☆☆ ✔ Example: "Single" */
  FocusContinuous?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  FocusDisplayAIServoAndMF?: string
  /** ★★☆☆ ✔ Example: "inf" */
  FocusDistanceLower?: string
  /** ★★☆☆ ✔ Example: "inf" */
  FocusDistanceUpper?: string
  /** ☆☆☆☆ ✔ Example: "450x359" */
  FocusFrameSize?: string
  /** ☆☆☆☆ ✔ Example: "Focus Hold" */
  FocusHoldButton?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  FocusInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "9504 6336 4306 4356" */
  FocusLocation?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  FocusLocked?: string
  /** ☆☆☆☆ ✔ Example: "Manual" */
  FocusModeSetting?: string
  /** ☆☆☆☆ ✔ Example: "AF" */
  FocusModeSwitch?: string
  /** ☆☆☆☆ ✔ Example: "White" */
  FocusPeakingHighlightColor?: string
  /** ☆☆☆☆ ✔ Example: "Standard Sensitivity" */
  FocusPeakingLevel?: string
  /** ★☆☆☆ ✔ Example: "972 1296" */
  FocusPixel?: string
  /** ☆☆☆☆   Example: "Normal" */
  FocusPointBrightness?: string
  /** ☆☆☆☆   Example: "Auto" */
  FocusPointPersistence?: string
  /** ☆☆☆☆   Example: "Normal" */
  FocusPointSelectionSpeed?: string
  /** ☆☆☆☆ ✔ Example: "Wrap" */
  FocusPointWrap?: string
  /** ☆☆☆☆ ✔ Example: "0xff" */
  FocusPosition?: string
  /** ☆☆☆☆   Example: "3R of Center" */
  FocusPositionHorizontal?: string
  /** ☆☆☆☆   Example: "1U from Center" */
  FocusPositionVertical?: string
  /** ☆☆☆☆ ✔ Example: "AF Used; 96" */
  FocusProcess?: string
  /** ★★☆☆ ✔ Example: "Unknown (2)" */
  FocusRange?: string
  /** ☆☆☆☆ ✔ Example: 5 */
  FocusRangeIndex?: number
  /** ☆☆☆☆ ✔ Example: "Normal" */
  FocusRingRotation?: string
  /** ☆☆☆☆   Example: "M" */
  FocusSetting?: string
  /** ☆☆☆☆   Example: "Unknown (46)" */
  FocusShiftExposureLock?: string
  /** ☆☆☆☆   Example: "153 Seconds" */
  FocusShiftInterval?: string
  /** ☆☆☆☆   Example: 50 */
  FocusShiftNumberShots?: number
  /** ☆☆☆☆   Example: "Off" */
  FocusShiftShooting?: string
  /** ☆☆☆☆   Example: 54 */
  FocusShiftStepWidth?: number
  /** ☆☆☆☆ ✔ Example: "Not confirmed, Tracking" */
  FocusStatus?: string
  /** ☆☆☆☆ ✔ Example: 9747 */
  FocusStepInfinity?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  FocusTrackingLockOn?: string
  /** ★☆☆☆ ✔ Example: "Out of focus" */
  FocusWarning?: string
  /** ☆☆☆☆ ✔ Example: "Eh-A" */
  FocusingScreen?: string
  /** ☆☆☆☆   Example: "Standard Form" */
  FolderName?: string
  /** ☆☆☆☆ ✔ Example: 373 */
  FolderNumber?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  FramingGridDisplay?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 12 bytes, use -b option to extract)" */
  FreeBytes?: string
  /** ☆☆☆☆ ✔ Example: 805 */
  FreeMemoryCardImages?: number
  /** ★☆☆☆ ✔ Example: "TTL" */
  FujiFlashMode?: string
  /** ☆☆☆☆ ✔ Example: "9504x6336" */
  FullImageSize?: string
  /** ☆☆☆☆   Example: "Off" */
  FullPressSnap?: string
  /** ☆☆☆☆ ✔ Example: "Zoom (High)" */
  Func1Button?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  Func1ButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "White Balance" */
  Func2Button?: string
  /** ☆☆☆☆   Example: "Photo Shooting Menu Bank" */
  Func2ButtonPlusDials?: string
  /** ☆☆☆☆   Example: "Voice Memo" */
  Func3Button?: string
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  FuncButton?: string
  /** ☆☆☆☆ ✔ Example: "Shutter Speed & Aperture Lock" */
  FuncButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "ISO Display" */
  FunctionButton?: string
  /** ☆☆☆☆   Example: "4320x3240" */
  GEImageSize?: string
  /** ☆☆☆☆   Example: "GEDSC DIGITAL CAMERA           " */
  GEMake?: string
  /** ☆☆☆☆   Example: "J1470S" */
  GEModel?: string
  /** ☆☆☆☆ ✔ Example: 256 */
  GainBase?: number
  /** ☆☆☆☆ ✔ Example: "n/a; User-Selected" */
  Gradation?: string
  /** ☆☆☆☆ ✔ Example: "Weak" */
  GrainEffect?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  GrainyBWFilter?: string
  /** ☆☆☆☆   Example: "2E" */
  GreenGain?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  GridDisplay?: string
  /** ☆☆☆☆ ✔ Example: 157 */
  GripBatteryADLoad?: number
  /** ☆☆☆☆ ✔ Example: 5 */
  GripBatteryADNoLoad?: number
  /** ☆☆☆☆ ✔ Example: "Empty or Missing" */
  GripBatteryState?: string
  /** ☆☆☆☆ ✔ Example: "Squares" */
  GroupAreaAFIllumination?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (5)" */
  HDMIBitDepth?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  HDMIExternalRecorder?: string
  /** ☆☆☆☆   Example: "Unknown (1)" */
  HDMIOutputHDR?: string
  /** ☆☆☆☆ ✔ Example: "Full" */
  HDMIOutputRange?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  HDMIOutputResolution?: string
  /** ☆☆☆☆   Example: "Off" */
  HDMIViewAssist?: string
  /** ★☆☆☆ ✔ Example: "On" */
  HDR?: string
  /** ☆☆☆☆ ✔ Example: "Natural" */
  HDREffect?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  HDRImageType?: string
  /** ☆☆☆☆ ✔ Example: "0200" */
  HDRInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HDRLevel?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (1)" */
  HDRShot?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HDRSmoothing?: string
  /** ★☆☆☆ ✔ Example: "n/a" */
  HighISONoiseReduction?: string
  /** ☆☆☆☆   Example: 4 */
  HighLowKeyAdj?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  HighSpeedSync?: string
  /** ☆☆☆☆   Example: 0.1 */
  Highlight?: number
  /** ☆☆☆☆ ✔ Example: "0 0" */
  HighlightShadow?: string
  /** ☆☆☆☆ ✔ Example: "0 (normal)" */
  HighlightTone?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  HighlightTonePriority?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HighlightWarning?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  Highlights?: number
  /** ☆☆☆☆ ✔ Example: "ndon" */
  HometownCity?: string
  /** ☆☆☆☆   Example: "NYC " */
  HometownCityCode?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  HometownDST?: string
  /** ☆☆☆☆   Example: 2 */
  HostSoftwareExportVersion?: number
  /** ☆☆☆☆   Example: "Unknown (4 4)" */
  HostSoftwareRendering?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  Hue?: string
  /** ☆☆☆☆   Example: "Off" */
  HueAdjust?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  HueAdjustment?: string
  /** ☆☆☆☆   Example: "0 -5 5" */
  HueSetting?: string
  /** ☆☆☆☆ ✔ Example: 800 */
  ISO2?: number
  /** ☆☆☆☆   Example: "On" */
  ISOAuto?: string
  /** ☆☆☆☆ ✔ Example: "Same As Without Flash" */
  ISOAutoFlashLimit?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0x6)" */
  ISOAutoHiLimit?: string
  /** ☆☆☆☆ ✔ Example: 6400 */
  ISOAutoMax?: number
  /** ☆☆☆☆ ✔ Example: 80 */
  ISOAutoMin?: number
  /** ☆☆☆☆   Example: "Standard" */
  ISOAutoParameters?: string
  /** ☆☆☆☆ ✔ Example: "Auto (Slowest)" */
  ISOAutoShutterTime?: string
  /** ☆☆☆☆ ✔ Example: "Show ISO/Easy ISO" */
  ISODisplay?: string
  /** ★☆☆☆ ✔ Example: "On" */
  ISOExpansion?: string
  /** ☆☆☆☆ ✔ Example: 800 */
  ISOFloor?: number
  /** ☆☆☆☆   Example: "Auto" */
  ISOSelected?: string
  /** ☆☆☆☆ ✔ Example: "Manual" */
  ISOSelection?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ISOSensitivityStep?: string
  /** ☆☆☆☆ ✔ Example: 90 */
  ISOSetting?: number
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ISOSpeedExpansion?: string
  /** ☆☆☆☆ ✔ Example: "1/3 Stop" */
  ISOSpeedIncrements?: string
  /** ☆☆☆☆ ✔ Example: "Enable; Max 3200; Min 1" */
  ISOSpeedRange?: string
  /** ☆☆☆☆ ✔ Example: "1/3 EV" */
  ISOStepSize?: string
  /** ☆☆☆☆ ✔ Example: 79.44 */
  ISOValue?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  Illumination?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ImageAdjustment?: string
  /** ☆☆☆☆ ✔ Example: "FX (36x24)" */
  ImageArea?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ImageAuthentication?: string
  /** ☆☆☆☆ ✔ Example: "0 0 8256 5504" */
  ImageBoundary?: string
  /** ☆☆☆☆ ✔ Example: 994 */
  ImageCount?: number
  /** ☆☆☆☆ ✔ Example: 9927271 */
  ImageDataSize?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  ImageEditCount?: number
  /** ☆☆☆☆ ✔ Example: "Red-eye Correction" */
  ImageEditing?: string
  /** ☆☆☆☆   Example: "Standard" */
  ImageEffects?: string
  /** ☆☆☆☆ ✔ Example: "Re-developed from RAW" */
  ImageGeneration?: string
  /** ☆☆☆☆   Example: 912 */
  ImageIDNumber?: number
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  ImageOptimization?: string
  /** ☆☆☆☆ ✔ Example: "Red Eye Ruduction ;" */
  ImageProcessing?: string
  /** ☆☆☆☆ ✔ Example: "0112" */
  ImageProcessingVersion?: string
  /** ☆☆☆☆ ✔ Example: "Very High" */
  ImageQuality?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ImageReview?: string
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ImageReviewMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ImageReviewTime?: string
  /** ☆☆☆☆   Example: "No" */
  ImageRotated?: string
  /** ☆☆☆☆ ✔ Example: "Small" */
  ImageSizeRAW?: string
  /** ★★★☆ ✔ Example: "n/a" */
  ImageStabilization?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ImageStabilizationSetting?: string
  /** ☆☆☆☆ ✔ Example: "StyleBox1" */
  ImageStyle?: string
  /** ☆☆☆☆   Example: 94 */
  ImageTemperatureMax?: number
  /** ☆☆☆☆   Example: 86 */
  ImageTemperatureMin?: number
  /** ☆☆☆☆ ✔ Example: "Vibrant" */
  ImageTone?: string
  /** ☆☆☆☆ ✔ Example: "Displays shooting functions" */
  InfoButtonWhenShooting?: string
  /** ☆☆☆☆   Example: "On" */
  InfraredIlluminator?: string
  /** ☆☆☆☆ ✔ Example: "Manual AF point" */
  InitialAFPointAIServoAF?: string
  /** ☆☆☆☆ ✔ Example: "Initial AF Point Selected" */
  InitialAFPointInServo?: string
  /** ☆☆☆☆ ✔ Example: "Low Magnification" */
  InitialZoomLiveView?: string
  /** ☆☆☆☆ ✔ Example: "Medium Magnification" */
  InitialZoomSetting?: string
  /** ☆☆☆☆ ✔ Example: "Image Only" */
  InstantPlaybackSetup?: string
  /** ☆☆☆☆ ✔ Example: "5 s" */
  InstantPlaybackTime?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  IntelligentAuto?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  IntelligentContrast?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  IntelligentExposure?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  IntelligentResolution?: string
  /** ☆☆☆☆ ✔ Example: "TTL" */
  InternalFlash?: string
  /** ☆☆☆☆ ✔ Example: "Did not fire, Red-eye reduction" */
  InternalFlashMode?: string
  /** ☆☆☆☆ ✔ Example: 63 */
  InternalFlashStrength?: number
  /** ☆☆☆☆ ✔ Example: 95 */
  InternalFlashTable?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  InternalNDFilter?: number
  /** ★★☆☆ ✔ Example: "fdfec409" */
  InternalSerialNumber?: string
  /** ☆☆☆☆   Example: 0 */
  IntervalDurationHours?: number
  /** ☆☆☆☆   Example: 1 */
  IntervalDurationMinutes?: number
  /** ☆☆☆☆   Example: 0 */
  IntervalDurationSeconds?: number
  /** ☆☆☆☆   Example: "On" */
  IntervalExposureSmoothing?: string
  /** ☆☆☆☆   Example: 65542 */
  IntervalLength?: number
  /** ☆☆☆☆   Example: "Still Image" */
  IntervalMode?: string
  /** ☆☆☆☆   Example: 65797 */
  IntervalNumber?: number
  /** ☆☆☆☆   Example: "Off" */
  IntervalPriority?: string
  /** ☆☆☆☆   Example: "Off" */
  IntervalShooting?: string
  /** ☆☆☆☆   Example: 1 */
  Intervals?: number
  /** ☆☆☆☆ ✔ Example: "n/a (RAW only)" */
  JPEGQuality?: string
  /** ☆☆☆☆   Example: "5216x3472" */
  JPEGSize?: string
  /** ☆☆☆☆ ✔ Example: "Size Priority" */
  JPGCompression?: string
  /** ☆☆☆☆ ✔ Example: "10 MP" */
  JpgRecordedPixels?: string
  /** ☆☆☆☆   Example: "Off" */
  KeepExposure?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  KeystoneCompensation?: string
  /** ☆☆☆☆ ✔ Example: "Vertical" */
  KeystoneDirection?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  KeystoneValue?: string
  /** ☆☆☆☆   Example: 864 */
  KodakImageHeight?: number
  /** ☆☆☆☆   Example: 800 */
  KodakImageWidth?: number
  /** ☆☆☆☆   Example: "SKodakCommonInfo Jaguar7" */
  KodakInfoType?: string
  /** ☆☆☆☆   Example: "Kodak                           " */
  KodakMake?: string
  /** ☆☆☆☆   Example: "PENTAX" */
  KodakMaker?: string
  /** ☆☆☆☆   Example: "Z760    " */
  KodakModel?: string
  /** ☆☆☆☆   Example: "1.0.0.0" */
  KodakVersion?: string
  /** ☆☆☆☆ ✔ Example: "Retain power off status" */
  LCDDisplayAtPowerOn?: string
  /** ☆☆☆☆ ✔ Example: "With Shutter Button only" */
  LCDDisplayReturnToShoot?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  LCDIllumination?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  LCDIlluminationDuringBulb?: string
  /** ☆☆☆☆ ✔ Example: "Remain. shots/File no." */
  LCDPanels?: string
  /** ☆☆☆☆   Example: "On" */
  LCHEditor?: string
  /** ☆☆☆☆ ✔ Example: "Masked" */
  LVShootingAreaDisplay?: string
  /** ☆☆☆☆ ✔ Example: "UNICORN THEATRE FOR CHILDREN" */
  Landmark?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  Language?: string
  /** ☆☆☆☆   Example: 92 */
  LastFileNumber?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  LateralChromaticAberration?: string
  /** ☆☆☆☆   Example: "4.0 to 22" */
  LensApertureRange?: string
  /** ☆☆☆☆ ✔ Example: "None (Disabled)" */
  LensControlRing?: string
  /** ☆☆☆☆ ✔ Example: "0802" */
  LensDataVersion?: string
  /** ☆☆☆☆ ✔ Example: "97 154 172 70 104 114" */
  LensDistortionParams?: string
  /** ☆☆☆☆ ✔ Example: "Focus search on" */
  LensDriveNoAF?: string
  /** ☆☆☆☆ ✔ Example: "Stop Focus Search" */
  LensDriveWhenAFImpossible?: string
  /** ☆☆☆☆ ✔ Example: 8.67 */
  LensFStops?: number
  /** ☆☆☆☆   Example: "RL8 :V01390000 " */
  LensFirmware?: string
  /** ☆☆☆☆ ✔ Example: "Ver.02.006" */
  LensFirmwareVersion?: string
  /** ☆☆☆☆ ✔ Example: "70.0 mm" */
  LensFocalLength?: string
  /** ☆☆☆☆   Example: "50 to 50" */
  LensFocalRange?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  LensFocusFunctionButtons?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (72)" */
  LensFormat?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (29)" */
  LensFunc1Button?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (29)" */
  LensFunc2Button?: string
  /** ☆☆☆☆ ✔ Example: 93 */
  LensIDNumber?: number
  /** ☆☆☆☆   Example: "4 to 4" */
  LensMaxApertureRange?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  LensModulationOptimizer?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (74)" */
  LensMount?: string
  /** ☆☆☆☆ ✔ Example: "0xe253" */
  LensProperties?: string
  /** ☆☆☆☆   Example: "Xcenter=1456 Ycenter=1068  GainMax=16" */
  LensShading?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  LensShutterLock?: string
  /** ☆☆☆☆ ✔ Example: "ZA SSM II" */
  LensSpecFeatures?: string
  /** ☆☆☆☆ ✔ Example: 35 */
  LensTemperature?: number
  /** ☆☆☆☆   Example:  */
  LensType2?: string
  /** ☆☆☆☆   Example:  */
  LensType3?: string
  /** ☆☆☆☆ ✔ Example: "98%" */
  LensZoomPosition?: string
  /** ☆☆☆☆   Example: 250 */
  LevelIndicator?: number
  /** ☆☆☆☆   Example: "n/a" */
  LevelOrientation?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  LightCondition?: number
  /** ☆☆☆☆   Example: 8 */
  LightReading?: number
  /** ☆☆☆☆   Example: "Unknown (512)" */
  LightSourceSpecial?: string
  /** ☆☆☆☆ ✔ Example: "LCD Backlight and Shooting Information" */
  LightSwitch?: string
  /** ☆☆☆☆ ✔ Example: 8.546875 */
  LightValueCenter?: number
  /** ☆☆☆☆ ✔ Example: 7.796875 */
  LightValuePeriphery?: number
  /** ☆☆☆☆   Example: "Shadow Enhance Low" */
  LightingMode?: string
  /** ☆☆☆☆ ✔ Example: "No Restrictions" */
  LimitAFAreaModeSelection?: string
  /** ☆☆☆☆ ✔ Example: 12735 */
  LinearityUpperMargin?: number
  /** ☆☆☆☆   Example: "Off" */
  LinkAEToAFPoint?: string
  /** ☆☆☆☆ ✔ Example: "Wide Area" */
  LiveViewAF?: string
  /** ☆☆☆☆ ✔ Example: "Face-Priority" */
  LiveViewAFAreaMode?: string
  /** ☆☆☆☆ ✔ Example: "Phase-detect AF" */
  LiveViewAFMethod?: string
  /** ☆☆☆☆ ✔ Example: "AF-C" */
  LiveViewAFMode?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  LiveViewButtonOptions?: string
  /** ☆☆☆☆ ✔ Example: "Enable (simulates exposure)" */
  LiveViewExposureSimulation?: string
  /** ☆☆☆☆ ✔ Example: "Manual" */
  LiveViewFocusMode?: string
  /** ☆☆☆☆ ✔ Example: "40 Segment" */
  LiveViewMetering?: string
  /** ☆☆☆☆ ✔ Example: "No Limit" */
  LiveViewMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  LiveViewShooting?: string
  /** ☆☆☆☆ ✔ Example: "" */
  LocalLocationName?: string
  /** ☆☆☆☆ ✔ Example: ":99:99 00:00:00" */
  Location?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  LocationInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "" */
  LocationName?: string
  /** ☆☆☆☆ ✔ Example: "Record memo (protect:disable)" */
  LockMicrophoneButton?: string
  /** ☆☆☆☆   Example: "Yes" */
  LongExposureNRUsed?: string
  /** ★☆☆☆ ✔ Example: "n/a" */
  LongExposureNoiseReduction?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  LowLightAF?: string
  /** ☆☆☆☆   Example: "+0.500" */
  LuminanceNoiseReduction?: string
  /** ☆☆☆☆   Example: 0 */
  M16CVersion?: number
  /** ☆☆☆☆ ✔ Example: 99 */
  MCUVersion?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  MacroLED?: string
  /** ★★★☆ ✔ Example: "Unknown (852023)" */
  MacroMode?: string
  /** ☆☆☆☆ ✔ Example: "Soft Focus 2; 1280; 0; 0" */
  MagicFilter?: string
  /** ☆☆☆☆ ✔ Example: "Image playback only" */
  MagnifiedView?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MainDialExposureComp?: string
  /** ☆☆☆☆   Example: 916 */
  MakerNoteOffset?: number
  /** ☆☆☆☆   Example: "Rdc" */
  MakerNoteType?: string
  /** ★★☆☆ ✔ Example: 2.11 */
  MakerNoteVersion?: number
  /** ☆☆☆☆ ✔ Example: "99.5 kPa" */
  ManometerPressure?: string
  /** ☆☆☆☆ ✔ Example: "90.8 m, 297.8 ft" */
  ManometerReading?: string
  /** ☆☆☆☆ ✔ Example: "Stops at AF Area Edges" */
  ManualAFPointSelPattern?: string
  /** ☆☆☆☆ ✔ Example: "Stops at AF area edges" */
  ManualAFPointSelectPattern?: string
  /** ☆☆☆☆ ✔ Example: "On (Full strength)" */
  ManualFlash?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  ManualFlashOutput?: string
  /** ☆☆☆☆ ✔ Example: "n/a (x4)" */
  ManualFlashStrength?: string
  /** ☆☆☆☆ ✔ Example: "inf" */
  ManualFocusDistance?: string
  /** ☆☆☆☆ ✔ Example: "On During Focus Point Selection Only" */
  ManualFocusPointIllumination?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ManualFocusRingInAFMode?: string
  /** ☆☆☆☆ ✔ Example: "Tv=Main/Av=Control" */
  ManualTv?: string
  /** ☆☆☆☆ ✔ Example: 2016-02-04 */
  ManufactureDate?: ExifDate | string
  /** ☆☆☆☆ ✔ Example: 0 */
  MasterGain?: number
  /** ☆☆☆☆ ✔ Example: "Face Detection On" */
  MatrixMetering?: string
  /** ★★☆☆ ✔ Example: 7.3 */
  MaxAperture?: number
  /** ★☆☆☆ ✔ Example: 6.7 */
  MaxApertureAtMaxFocal?: number
  /** ★☆☆☆ ✔ Example: 5.7 */
  MaxApertureAtMinFocal?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  MaxContinuousRelease?: number
  /** ☆☆☆☆ ✔ Example: "8 8 8" */
  MaxFaces?: string
  /** ★★☆☆ ✔ Example: "96.2 mm" */
  MaxFocalLength?: string
  /** ★★☆☆ ✔ Example: 9.97 */
  MeasuredEV?: number
  /** ☆☆☆☆ ✔ Example: 9.375 */
  MeasuredLV?: number
  /** ☆☆☆☆ ✔ Example: "988 1024 1024 636" */
  MeasuredRGGB?: string
  /** ☆☆☆☆ ✔ Example: "70293 120427 116868 67475" */
  MeasuredRGGBData?: string
  /** ☆☆☆☆ ✔ Example: 65 */
  MechanicalShutterCount?: number
  /** ☆☆☆☆ ✔ Example: "FFCBAC24-E547-4BBC-AF47-38B1A3D845E3" */
  MediaGroupUUID?: string
  /** ☆☆☆☆ ✔ Example: "High (48 kHz)" */
  MemoAudioQuality?: string
  /** ☆☆☆☆ ✔ Example: "SD card in use, MemoryStick slot empty" */
  MemoryCardConfiguration?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  MemoryCardNumber?: number
  /** ☆☆☆☆ ✔ Example: "Previous (top if power off)" */
  MenuButtonDisplayPosition?: string
  /** ☆☆☆☆ ✔ Example: "Top" */
  MenuButtonReturn?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (6)" */
  MenuMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "THm211000000000" */
  MetaVersion?: string
  /** ☆☆☆☆   Example: "Matrix metering" */
  MeterMode?: string
  /** ☆☆☆☆ ✔ Example: "Matrix" */
  Metering?: string
  /** ☆☆☆☆   Example: "Metering" */
  MeteringButton?: string
  /** ☆☆☆☆ ✔ Example: "Within Range" */
  MeteringOffScaleIndicator?: string
  /** ☆☆☆☆ ✔ Example: "8 s" */
  MeteringTime?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MidRangeSharpness?: string
  /** ★★☆☆ ✔ Example: 9.8 */
  MinAperture?: number
  /** ★★☆☆ ✔ Example: "90.0 mm" */
  MinFocalLength?: string
  /** ☆☆☆☆ ✔ Example: "2.0 m" */
  MinFocusDistance?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MiniatureFilter?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (-1)" */
  MiniatureFilterOrientation?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  MiniatureFilterParameter?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  MiniatureFilterPosition?: number
  /** ☆☆☆☆   Example: 2004-07-05 */
  MinoltaDate?: ExifDate | string
  /** ☆☆☆☆   Example: "Unknown (768)" */
  MinoltaImageSize?: string
  /** ☆☆☆☆   Example: "DiMAGE S404" */
  MinoltaModelID?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  MinoltaQuality?: string
  /** ☆☆☆☆   Example: 20:16:39 */
  MinoltaTime?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  MirrorLockup?: string
  /** ☆☆☆☆ ✔ Example: "Manual" */
  ModeDialPosition?: string
  /** ☆☆☆☆ ✔ Example: 2018 */
  ModelReleaseYear?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  ModelingFlash?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedColorTemp?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedDigitalGain?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedParamFlag?: number
  /** ☆☆☆☆ ✔ Example: "None" */
  ModifiedPictureStyle?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ModifiedSaturation?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSensorBlueLevel?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSensorRedLevel?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedSharpness?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ModifiedSharpnessFreq?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  ModifiedToneCurve?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  ModifiedWhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedWhiteBalanceBlue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ModifiedWhiteBalanceRed?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  MonitorBrightness?: number
  /** ☆☆☆☆ ✔ Example: "Automatic" */
  MonitorDisplayOff?: string
  /** ☆☆☆☆ ✔ Example: "8 s" */
  MonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "(none)" */
  MonochromeColor?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MonochromeFilterEffect?: string
  /** ☆☆☆☆   Example: "Off" */
  MonochromeGrainEffect?: string
  /** ☆☆☆☆ ✔ Example: "No Filter; 0; 8; Strength 2; 0; 3" */
  MonochromeProfileSettings?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MonochromeToning?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  MonochromeVignetting?: number
  /** ☆☆☆☆   Example: "12:19" */
  MonthDayCreated?: string
  /** ☆☆☆☆   Example: "Old Crescent" */
  MoonPhase?: string
  /** ☆☆☆☆   Example: 100 */
  MotionSensitivity?: number
  /** ☆☆☆☆ ✔ Example: "AE/AF Lock" */
  MovieAELockButtonAssignment?: string
  /** ☆☆☆☆ ✔ Example: "Single" */
  MovieAFAreaMode?: string
  /** ☆☆☆☆ ✔ Example: "4 (Normal)" */
  MovieAFTrackingSensitivity?: string
  /** ☆☆☆☆   Example: "Auto" */
  MovieFlickerReduction?: string
  /** ☆☆☆☆ ✔ Example: "Zoom (Low)" */
  MovieFunc1Button?: string
  /** ☆☆☆☆ ✔ Example: "Zoom (1:1)" */
  MovieFunc2Button?: string
  /** ☆☆☆☆   Example: "None" */
  MovieFunc3Button?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieFunctionButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieFunctionButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Pattern 2" */
  MovieHighlightDisplayPattern?: string
  /** ☆☆☆☆ ✔ Example: 248 */
  MovieHighlightDisplayThreshold?: number
  /** ☆☆☆☆ ✔ Example: "On" */
  MovieISOAutoControlManualMode?: string
  /** ☆☆☆☆ ✔ Example: "ISO 6400" */
  MovieISOAutoHiLimit?: string
  /** ☆☆☆☆ ✔ Example: "Center Focus Point" */
  MovieMultiSelector?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MoviePreviewButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MoviePreviewButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Take Photo" */
  MovieShutterButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieSubSelectorAssignment?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  MovieSubSelectorAssignmentPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  MovieWhiteBalanceSameAsPhoto?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiControllerWhileMetering?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MultiExposure?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiExposureAutoGain?: string
  /** ☆☆☆☆ ✔ Example: "Bright (comparative)" */
  MultiExposureControl?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  MultiExposureMode?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  MultiExposureShots?: number
  /** ☆☆☆☆ ✔ Example: "0101" */
  MultiExposureVersion?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  MultiFrameNREffect?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  MultiFrameNoiseReduction?: string
  /** ☆☆☆☆ ✔ Example: "On (quick control dial)" */
  MultiFunctionLock?: string
  /** ☆☆☆☆ ✔ Example: "Reset Meter-off Delay" */
  MultiSelector?: string
  /** ☆☆☆☆ ✔ Example: "Zoom" */
  MultiSelectorLiveView?: string
  /** ☆☆☆☆   Example: "Reset" */
  MultiSelectorLiveViewMode?: string
  /** ☆☆☆☆ ✔ Example: "Zoom On/Off" */
  MultiSelectorPlaybackMode?: string
  /** ☆☆☆☆ ✔ Example: "Zoom On/Off" */
  MultiSelectorShootMode?: string
  /** ☆☆☆☆ ✔ Example: "On (2 frames); 1" */
  MultipleExposureMode?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (15)" */
  MultipleExposureSet?: string
  /** ★☆☆☆ ✔ Example: "Vivid" */
  MyColorMode?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  NDFilter?: string
  /** ☆☆☆☆ ✔ Example: "n/a (JPEG)" */
  NEFBitDepth?: string
  /** ☆☆☆☆ ✔ Example: "Uncompressed (reduced to 12 bit)" */
  NEFCompression?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 624 bytes, use -b option to extract)" */
  NEFLinearizationTable?: string
  /** ☆☆☆☆   Example: "Off" */
  NeutralDensityFilter?: string
  /** ☆☆☆☆ ✔ Example: "ViewNX 2.8 M" */
  NikonCaptureVersion?: string
  /** ☆☆☆☆ ✔ Example: "Large (10.0 M)" */
  NikonImageSize?: string
  /** ☆☆☆☆ ✔ Example: "Matrix" */
  NikonMeteringMode?: string
  /** ☆☆☆☆ ✔ Example: "Release Locked" */
  NoMemoryCard?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  NoiseFilter?: string
  /** ★★☆☆ ✔ Example: "[4]" */
  NoiseReduction?: string
  /** ☆☆☆☆   Example: 0 */
  NoiseReductionStrength?: number
  /** ☆☆☆☆ ✔ Example: 5.7 */
  NominalMaxAperture?: number
  /** ☆☆☆☆ ✔ Example: 7 */
  NominalMinAperture?: number
  /** ☆☆☆☆ ✔ Example: 16383 */
  NormalWhiteLevel?: number
  /** ★★☆☆ ✔ Example: 9 */
  NumAFPoints?: number
  /** ☆☆☆☆ ✔ Example: 3 */
  NumFaceElements?: number
  /** ☆☆☆☆ ✔ Example: 65535 */
  NumFacePositions?: number
  /** ☆☆☆☆ ✔ Example: "55 Points" */
  NumberOfFocusPoints?: string
  /** ☆☆☆☆ ✔ Example: 32 */
  NumberOffsets?: number
  /** ☆☆☆☆ ✔ Example: "Select Center Focus Point" */
  OKButton?: string
  /** ☆☆☆☆ ✔ Example: 960 */
  OlympusImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 3648 */
  OlympusImageWidth?: number
  /** ☆☆☆☆ ✔ Example: "Unknown ()" */
  OneTouchWB?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  OpticalVR?: string
  /** ☆☆☆☆   Example: 3 */
  OpticalZoom?: number
  /** ★★☆☆ ✔ Example: 94 */
  OpticalZoomCode?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  OpticalZoomMode?: string
  /** ☆☆☆☆   Example: "On" */
  OpticalZoomOn?: string
  /** ☆☆☆☆ ✔ Example: 668058300 */
  OrderNumber?: number
  /** ☆☆☆☆ ✔ Example: "Separate Vert/Horiz Points" */
  OrientationLinkedAF?: string
  /** ☆☆☆☆ ✔ Example: "Select different AF points" */
  OrientationLinkedAFPoint?: string
  /** ☆☆☆☆ ✔ Example: 7488956 */
  OriginalDecisionDataOffset?: number
  /** ☆☆☆☆   Example: "/home/username/pictures" */
  OriginalDirectory?: string
  /** ☆☆☆☆ ✔ Example: "L9997698.JPG" */
  OriginalFileName?: string
  /** ☆☆☆☆ ✔ Example: 4000 */
  OriginalImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 6000 */
  OriginalImageWidth?: number
  /** ☆☆☆☆   Example: ["Sensor Upgraded","PREPRODUCTION CAMERA"] */
  OtherInfo?: string[]
  /** ☆☆☆☆ ✔ Example: "(Binary data 864 bytes, use -b option to extract)" */
  OutputLUT?: string
  /** ☆☆☆☆ ✔ Example: 3 */
  POILevel?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  PaintingFilter?: string
  /** ☆☆☆☆ ✔ Example: 2019-11-26T11:22:36.720+01:00 */
  PanasonicDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "0417" */
  PanasonicExifVersion?: string
  /** ☆☆☆☆ ✔ Example: 7776 */
  PanasonicImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 8368 */
  PanasonicImageWidth?: number
  /** ☆☆☆☆ ✔ Example: 360 */
  PanoramaAngle?: number
  /** ☆☆☆☆ ✔ Example: 1080 */
  PanoramaCropBottom?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaCropLeft?: number
  /** ☆☆☆☆ ✔ Example: 11520 */
  PanoramaCropRight?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaCropTop?: number
  /** ☆☆☆☆ ✔ Example: "Right or Down" */
  PanoramaDirection?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaFrameHeight?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaFrameWidth?: number
  /** ☆☆☆☆ ✔ Example: 1080 */
  PanoramaFullHeight?: number
  /** ☆☆☆☆ ✔ Example: 11520 */
  PanoramaFullWidth?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  PanoramaMode?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PanoramaSize3D?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaSourceHeight?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PanoramaSourceWidth?: number
  /** ☆☆☆☆ ✔ Example: "Full" */
  PentaxImageSize?: string
  /** ☆☆☆☆ ✔ Example: "X90" */
  PentaxModelID?: string
  /** ☆☆☆☆ ✔ Example: 6 */
  PentaxModelType?: number
  /** ☆☆☆☆ ✔ Example: "9.1.2.0" */
  PentaxVersion?: string
  /** ☆☆☆☆ ✔ Example: "513 513 513 513" */
  PerChannelBlackLevel?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  PeripheralIlluminationCorr?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  PeripheralLighting?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  PeripheralLightingSetting?: string
  /** ☆☆☆☆ ✔ Example: 70 */
  PeripheralLightingValue?: number
  /** ☆☆☆☆ ✔ Example: "On (81-point)" */
  PhaseDetectAF?: string
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PhotoEffect?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  PhotoInfoPlayback?: string
  /** ☆☆☆☆ ✔ Example: "A" */
  PhotoShootingMenuBank?: string
  /** ☆☆☆☆ ✔ Example: "FX (36x24)" */
  PhotoShootingMenuBankImageArea?: string
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PhotoStyle?: string
  /** ☆☆☆☆ ✔ Example: "Quick Adjust" */
  PictureControlAdjust?: string
  /** ☆☆☆☆ ✔ Example: "Vivid" */
  PictureControlBase?: string
  /** ☆☆☆☆ ✔ Example: "Vivid-KR" */
  PictureControlName?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureControlQuickAdjust?: string
  /** ☆☆☆☆ ✔ Example: "0301" */
  PictureControlVersion?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  PictureEffect?: string
  /** ☆☆☆☆   Example: "Natural" */
  PictureFinish?: string
  /** ★★☆☆ ✔ Example: "i-Enhance; 2" */
  PictureMode?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeBWFilter?: string
  /** ☆☆☆☆ ✔ Example: "1 (min -2, max 2)" */
  PictureModeContrast?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeEffect?: string
  /** ☆☆☆☆ ✔ Example: "2 (min -2, max 2)" */
  PictureModeSaturation?: string
  /** ☆☆☆☆ ✔ Example: "2 (min -2, max 2)" */
  PictureModeSharpness?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PictureModeTone?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  PictureProfile?: string
  /** ☆☆☆☆ ✔ Example: "User Def. 3" */
  PictureStyle?: string
  /** ☆☆☆☆ ✔ Example: "n/a; n/a; n/a" */
  PictureStylePC?: string
  /** ☆☆☆☆ ✔ Example: "Standard; Standard; Standard" */
  PictureStyleUserDef?: string
  /** ☆☆☆☆ ✔ Example: "Low" */
  Pitch?: string
  /** ☆☆☆☆ ✔ Example: 8 */
  PitchAngle?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  PixelShiftInfo?: string
  /** ☆☆☆☆   Example: "On" */
  PixelShiftResolution?: string
  /** ☆☆☆☆ ✔ Example: "Auto Rotate" */
  PlayDisplay?: string
  /** ☆☆☆☆   Example: "None" */
  PlaybackFlickDown?: string
  /** ☆☆☆☆   Example: "None" */
  PlaybackFlickUp?: string
  /** ☆☆☆☆ ✔ Example: "8 s" */
  PlaybackMenusTime?: string
  /** ☆☆☆☆ ✔ Example: "4 s" */
  PlaybackMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "Use Separate Zoom Buttons" */
  PlaybackZoom?: string
  /** ☆☆☆☆   Example: "Off" */
  PopupFlash?: string
  /** ☆☆☆☆   Example: "Magenta: 7.8 Brightness: -31.5" */
  PortraitImpressionBalance?: string
  /** ☆☆☆☆   Example: "Off" */
  PortraitRefiner?: string
  /** ☆☆☆☆   Example: "Post Focus Auto Merging or None" */
  PostFocusMerging?: string
  /** ☆☆☆☆ ✔ Example: "External Power Supply" */
  PowerSource?: string
  /** ☆☆☆☆ ✔ Example: "2022:02:04 20:42:55" */
  PowerUpTime?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  PreAF?: string
  /** ☆☆☆☆ ✔ Example: 3.2996109 */
  PreCaptureFrames?: number
  /** ☆☆☆☆   Example: 0 */
  PreFlashReturnStrength?: number
  /** ☆☆☆☆   Example: "Off" */
  PreferSubSelectorCenter?: string
  /** ☆☆☆☆ ✔ Example: "Daylight" */
  PresetWhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  PreviewButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  PreviewButtonPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "28 28 0 0" */
  PreviewImageBorders?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  PreviewImageValid?: string
  /** ★☆☆☆ ✔ Example: 8 */
  PrimaryAFPoint?: number
  /** ☆☆☆☆ ✔ Example: "XQD Card" */
  PrimarySlot?: string
  /** ☆☆☆☆ ✔ Example: "AF" */
  PrioritySetupShutterRelease?: string
  /** ☆☆☆☆ ✔ Example: 9.987 */
  ProductionCode?: number
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ProgramISO?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ProgramLine?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ProgramShift?: number
  /** ☆☆☆☆ ✔ Example: "ISO speed" */
  QuickControlDialInMeter?: string
  /** ☆☆☆☆   Example: "Off" */
  QuickShot?: string
  /** ☆☆☆☆   Example: "Single" */
  QuietShutterShootingSpeed?: string
  /** ☆☆☆☆ ✔ Example: "Uncompressed RAW" */
  RAWFileType?: string
  /** ☆☆☆☆ ✔ Example: "Varies With Rotation Speed" */
  RFLensMFFocusRingSensitivity?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  RFLensType?: string
  /** ☆☆☆☆ ✔ Example: "USA" */
  ROMOperationMode?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  RangeFinder?: string
  /** ☆☆☆☆ ✔ Example: "RAW+Small/Normal" */
  RawAndJpgRecording?: string
  /** ☆☆☆☆   Example: 0 */
  RawBurstImageCount?: number
  /** ☆☆☆☆   Example: 0 */
  RawBurstImageNum?: number
  /** ☆☆☆☆ ✔ Example: "Little-endian (Intel, II)" */
  RawDataByteOrder?: string
  /** ☆☆☆☆ ✔ Example: "Unchanged" */
  RawDataCFAPattern?: string
  /** ☆☆☆☆ ✔ Example: "Off; 0; 0; 0" */
  RawDevArtFilter?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  RawDevAutoGradation?: string
  /** ☆☆☆☆ ✔ Example: "sRGB" */
  RawDevColorSpace?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevContrastValue?: string
  /** ☆☆☆☆ ✔ Example: "Original" */
  RawDevEditStatus?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (2)" */
  RawDevEngine?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevExposureBiasValue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevGradation?: number
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevGrayPoint?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevMemoryColorEmphasis?: number
  /** ☆☆☆☆ ✔ Example: "Noise Filter" */
  RawDevNoiseReduction?: string
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMContrast?: string
  /** ☆☆☆☆ ✔ Example: "2 0 -2 1" */
  RawDevPMNoiseFilter?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  RawDevPMPictureTone?: string
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMSaturation?: string
  /** ☆☆☆☆ ✔ Example: "0 -2 2" */
  RawDevPMSharpness?: string
  /** ☆☆☆☆ ✔ Example: "Natural" */
  RawDevPictureMode?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevSaturationEmphasis?: string
  /** ☆☆☆☆ ✔ Example: "(none)" */
  RawDevSettings?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0" */
  RawDevSharpnessValue?: string
  /** ☆☆☆☆ ✔ Example: "0100" */
  RawDevVersion?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevWBFineAdjustment?: number
  /** ☆☆☆☆ ✔ Example: "Unknown (3)" */
  RawDevWhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RawDevWhiteBalanceValue?: number
  /** ☆☆☆☆   Example: "9 (Q)" */
  RawDevelopmentProcess?: string
  /** ☆☆☆☆ ✔ Example: "4144 2760" */
  RawImageCenter?: string
  /** ☆☆☆☆ ✔ Example: 90 */
  RawImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 8402 */
  RawImageWidth?: number
  /** ☆☆☆☆   Example: 1000 */
  RawInfoVersion?: number
  /** ☆☆☆☆ ✔ Example: "RAW" */
  RawJpgQuality?: string
  /** ☆☆☆☆ ✔ Example: "Large" */
  RawJpgSize?: string
  /** ☆☆☆☆ ✔ Example: "95813 89948 88346 17433" */
  RawMeasuredRGGB?: string
  /** ☆☆☆☆   Example: "Frame Count" */
  RearControPanelDisplay?: string
  /** ☆☆☆☆ ✔ Example: "ISO" */
  RearDisplay?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncAFAreaMode?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncAperture?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncExposureComp?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncExposureMode?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncFocusTracking?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncISO?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncMeteringMode?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncShutterSpeed?: string
  /** ☆☆☆☆   Example: "On" */
  RecallShootFuncWhiteBalance?: string
  /** ☆☆☆☆ ✔ Example: "Auto Rotate" */
  RecordDisplay?: string
  /** ☆☆☆☆ ✔ Example: 58 */
  RecordID?: number
  /** ★★☆☆ ✔ Example: "TIF+JPEG" */
  RecordMode?: string
  /** ☆☆☆☆   Example: "Record while down" */
  RecordShutterRelease?: string
  /** ☆☆☆☆   Example: "JPEG" */
  RecordingFormat?: string
  /** ☆☆☆☆   Example: "Auto" */
  RecordingMode?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  RedEyeRemoval?: string
  /** ☆☆☆☆   Example: "8D" */
  RedGain?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ReleaseButtonToUseDial?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (9)" */
  ReleaseMode?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  RemoteFuncButton?: string
  /** ☆☆☆☆ ✔ Example: 3 */
  RemoteOnDuration?: number
  /** ☆☆☆☆ ✔ Example: 5 */
  RepeatingFlashCount?: number
  /** ☆☆☆☆ ✔ Example: "1/8" */
  RepeatingFlashOutput?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  RepeatingFlashOutputExternal?: number
  /** ☆☆☆☆ ✔ Example: "20 Hz" */
  RepeatingFlashRate?: string
  /** ☆☆☆☆   Example: "No" */
  Resaved?: string
  /** ☆☆☆☆   Example: "MED" */
  ResolutionMode?: string
  /** ☆☆☆☆ ✔ Example: "Flags 0x77" */
  RestrictDriveModes?: string
  /** ★☆☆☆ ✔ Example: "Unknown ()" */
  RetouchHistory?: string
  /** ☆☆☆☆ ✔ Example: "0200" */
  RetouchInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  RetouchNEFProcessing?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  RetractLensOnPowerOff?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  ReverseExposureCompDial?: string
  /** ☆☆☆☆ ✔ Example: "Not Reversed" */
  ReverseFocusRing?: string
  /** ☆☆☆☆ ✔ Example: "- 0 +" */
  ReverseIndicators?: string
  /** ☆☆☆☆ ✔ Example: "No" */
  ReverseShutterSpeedAperture?: string
  /** ☆☆☆☆   Example: 2012-03-29T18:17:52.000 */
  RicohDate?: ExifDateTime | string
  /** ☆☆☆☆   Example: 960 */
  RicohImageHeight?: number
  /** ☆☆☆☆   Example: 640 */
  RicohImageWidth?: number
  /** ☆☆☆☆   Example: "XG-1Pentax" */
  RicohMake?: string
  /** ☆☆☆☆   Example: "RICOH WG-M1" */
  RicohModel?: string
  /** ☆☆☆☆   Example: -6.1 */
  Roll?: number
  /** ☆☆☆☆ ✔ Example: 6.4 */
  RollAngle?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  RunTimeEpoch?: number
  /** ☆☆☆☆ ✔ Example: "Valid" */
  RunTimeFlags?: string
  /** ☆☆☆☆ ✔ Example: 1000000000 */
  RunTimeScale?: number
  /** ☆☆☆☆ ✔ Example: 987823130000000 */
  RunTimeValue?: number
  /** ☆☆☆☆ ✔ Example: "sRAW2 (sRAW)" */
  SRAWQuality?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  SRActive?: string
  /** ☆☆☆☆ ✔ Example: "97 mm" */
  SRFocalLength?: string
  /** ☆☆☆☆ ✔ Example: "4.25 s or longer" */
  SRHalfPressTime?: string
  /** ☆☆☆☆ ✔ Example: "Stabilized, Not ready" */
  SRResult?: string
  /** ☆☆☆☆ ✔ Example: "Enable (Tv/Av)" */
  SafetyShift?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  SafetyShiftInAvOrTv?: string
  /** ☆☆☆☆ ✔ Example: "Disable" */
  SameExposureForNewAperture?: string
  /** ☆☆☆☆ ✔ Example: "WP10 / VLUU WP10 / AQ100" */
  SamsungModelID?: string
  /** ☆☆☆☆   Example: "Unknown (0x211)" */
  SanyoQuality?: string
  /** ☆☆☆☆   Example: "(Binary data 9801 bytes, use -b option to extract)" */
  SanyoThumbnail?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  SaturationAdj?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAuto?: number
  /** ☆☆☆☆ ✔ Example: 655360 */
  SaturationFaithful?: number
  /** ☆☆☆☆ ✔ Example: 8650752 */
  SaturationLandscape?: number
  /** ☆☆☆☆ ✔ Example: 6619136 */
  SaturationNeutral?: number
  /** ☆☆☆☆ ✔ Example: 6553609 */
  SaturationPortrait?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationSetting?: number
  /** ☆☆☆☆ ✔ Example: 3 */
  SaturationStandard?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  SaveFocus?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ScanImageEnhancer?: string
  /** ☆☆☆☆ ✔ Example: "Two-Shot" */
  SceneAssist?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  SceneDetect?: number
  /** ★★☆☆ ✔ Example: "n/a" */
  SceneMode?: string
  /** ☆☆☆☆   Example: "Unknown (9)" */
  SceneModeUsed?: string
  /** ☆☆☆☆ ✔ Example: "Unrecognized" */
  SceneRecognition?: string
  /** ☆☆☆☆   Example: "User 1" */
  SceneSelect?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ScreenTips?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (1)" */
  SecondarySlotFunction?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (87)" */
  SelectAFAreaSelectMode?: string
  /** ☆☆☆☆ ✔ Example: "Single-point AF, Zone AF, AF Point Expansion (4 point), Spot AF,…" */
  SelectAFAreaSelectionMode?: string
  /** ☆☆☆☆ ✔ Example: "45 points" */
  SelectableAFPoint?: string
  /** ★★☆☆ ✔ Example: "Self-timer 5 or 10 s" */
  SelfTimer?: string
  /** ☆☆☆☆ ✔ Example: "0.5 s" */
  SelfTimerInterval?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  SelfTimerShotCount?: number
  /** ☆☆☆☆ ✔ Example: "2 s" */
  SelfTimerShotInterval?: string
  /** ☆☆☆☆ ✔ Example: "5 s" */
  SelfTimerTime?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  SensitivityAdjust?: number
  /** ☆☆☆☆ ✔ Example: "As EV Steps" */
  SensitivitySteps?: string
  /** ☆☆☆☆   Example: "BACK,ov16860" */
  Sensor?: string
  /** ☆☆☆☆   Example: 14 */
  SensorBitDepth?: number
  /** ☆☆☆☆ ✔ Example: 4214 */
  SensorBlueLevel?: number
  /** ☆☆☆☆ ✔ Example: "4095 646" */
  SensorCalibration?: string
  /** ☆☆☆☆ ✔ Example: "Disable" */
  SensorCleaning?: string
  /** ☆☆☆☆   Example: 2472 */
  SensorFullHeight?: number
  /** ☆☆☆☆   Example: 3288 */
  SensorFullWidth?: number
  /** ☆☆☆☆ ✔ Example: "9.4 x 9.4 um" */
  SensorPixelSize?: string
  /** ☆☆☆☆ ✔ Example: 4370 */
  SensorRedLevel?: number
  /** ☆☆☆☆ ✔ Example: "7.576 x 5.682 mm" */
  SensorSize?: string
  /** ☆☆☆☆ ✔ Example: "81.0 C" */
  SensorTemperature?: string
  /** ☆☆☆☆   Example: "Standard" */
  SensorType?: string
  /** ☆☆☆☆   Example: "5 of 5" */
  Sequence?: string
  /** ☆☆☆☆ ✔ Example: 4 */
  SequenceFileNumber?: number
  /** ☆☆☆☆ ✔ Example: 4 */
  SequenceImageNumber?: number
  /** ☆☆☆☆ ✔ Example: "Continuous" */
  SequenceLength?: string
  /** ★★★☆ ✔ Example: 5 */
  SequenceNumber?: number
  /** ☆☆☆☆   Example: "5 frames/s" */
  SequenceShotInterval?: string
  /** ☆☆☆☆   Example: "Unknown (28928)" */
  SequentialShot?: string
  /** ☆☆☆☆ ✔ Example: "Format 2" */
  SerialNumberFormat?: string
  /** ☆☆☆☆ ✔ Example: "Set: Quality" */
  SetButtonCrossKeysFunc?: string
  /** ☆☆☆☆ ✔ Example: "Viewfinder leveling gauge" */
  SetButtonWhenShooting?: string
  /** ☆☆☆☆ ✔ Example: "Default (no function)" */
  SetFunctionWhenShooting?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ShadingCompensation?: string
  /** ☆☆☆☆   Example: 0 */
  Shadow?: number
  /** ☆☆☆☆   Example: "On" */
  ShadowCorrection?: string
  /** ☆☆☆☆ ✔ Example: "0 (normal)" */
  ShadowTone?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  Shadows?: number
  /** ☆☆☆☆ ✔ Example: "On but Disabled" */
  ShakeReduction?: string
  /** ☆☆☆☆   Example: "Normal" */
  Sharpening?: string
  /** ☆☆☆☆ ✔ Example: 3 */
  SharpnessAuto?: number
  /** ☆☆☆☆ ✔ Example: 960 */
  SharpnessFactor?: number
  /** ☆☆☆☆ ✔ Example: 3 */
  SharpnessFaithful?: number
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  SharpnessFreqTable?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SharpnessFrequency?: string
  /** ☆☆☆☆ ✔ Example: 6 */
  SharpnessLandscape?: number
  /** ☆☆☆☆ ✔ Example: 5 */
  SharpnessMonochrome?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SharpnessNeutral?: number
  /** ☆☆☆☆ ✔ Example: 2752758 */
  SharpnessPortrait?: number
  /** ☆☆☆☆ ✔ Example: "+3" */
  SharpnessRange?: string
  /** ☆☆☆☆ ✔ Example: "3 (min -3, max 5)" */
  SharpnessSetting?: string
  /** ☆☆☆☆ ✔ Example: 5 */
  SharpnessStandard?: number
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  SharpnessTable?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  ShootingInfoDisplay?: string
  /** ☆☆☆☆ ✔ Example: "4 s" */
  ShootingInfoMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "Single Frame" */
  ShootingModeSetting?: string
  /** ☆☆☆☆ ✔ Example: "Itsa Myowna" */
  ShortOwnerName?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ShortReleaseTimeLag?: string
  /** ☆☆☆☆ ✔ Example: "0805" */
  ShotInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: 9 */
  ShotNumberSincePowerUp?: number
  /** ☆☆☆☆   Example: 1 */
  ShotsPerInterval?: number
  /** ☆☆☆☆ ✔ Example: "Silent / Electronic (0 0 0)" */
  Shutter?: string
  /** ☆☆☆☆ ✔ Example: "AF/AE lock stop" */
  ShutterAELButton?: string
  /** ☆☆☆☆ ✔ Example: "Metering start/Meter + AF start" */
  ShutterButtonAFOnButton?: string
  /** ★☆☆☆ ✔ Example: 98 */
  ShutterCount?: number
  /** ☆☆☆☆   Example:  */
  ShutterCount2?: number
  /** ☆☆☆☆   Example:  */
  ShutterCount3?: number
  /** ☆☆☆☆ ✔ Example: "2nd-curtain sync" */
  ShutterCurtainSync?: string
  /** ★☆☆☆ ✔ Example: "Unknown (4)" */
  ShutterMode?: string
  /** ☆☆☆☆ ✔ Example: "Single Shot" */
  ShutterReleaseMethod?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  ShutterReleaseNoCFCard?: string
  /** ☆☆☆☆ ✔ Example: "Priority on focus" */
  ShutterReleaseTiming?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ShutterReleaseWithoutLens?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ShutterSpeedLock?: string
  /** ☆☆☆☆ ✔ Example: "Manual: Hi 1/8123; Lo 31.9; Auto: Hi 1/8123; Lo 31.9" */
  ShutterSpeedRange?: string
  /** ☆☆☆☆ ✔ Example: "1/91" */
  ShutterSpeedSetting?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ShutterType?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  SilentPhotography?: string
  /** ☆☆☆☆ ✔ Example: "Low" */
  SingleFrameBracketing?: string
  /** ☆☆☆☆   Example: "Off" */
  SkinToneCorrection?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 …" */
  SlaveFlashMeteringSegments?: string
  /** ★★☆☆ ✔ Example: "n/a" */
  SlowShutter?: string
  /** ★☆☆☆ ✔ Example: "On" */
  SlowSync?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SmartAlbumColor?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  SmileShutter?: string
  /** ☆☆☆☆ ✔ Example: "Slight Smile" */
  SmileShutterMode?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  SoftFocusFilter?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  SoftSkinEffect?: string
  /** ☆☆☆☆ ✔ Example: 2021-07-23T16:13:55.000-07:00 */
  SonyDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "1/82" */
  SonyExposureTime?: string
  /** ☆☆☆☆ ✔ Example: 8.8 */
  SonyFNumber?: number
  /** ☆☆☆☆ ✔ Example: 926 */
  SonyISO?: number
  /** ☆☆☆☆ ✔ Example: 65535 */
  SonyImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 6376 */
  SonyImageHeightMax?: number
  /** ☆☆☆☆ ✔ Example: "Small (3:2)" */
  SonyImageSize?: string
  /** ☆☆☆☆ ✔ Example: 9504 */
  SonyImageWidth?: number
  /** ☆☆☆☆ ✔ Example: 9568 */
  SonyImageWidthMax?: number
  /** ☆☆☆☆ ✔ Example: 5.5 */
  SonyMaxAperture?: number
  /** ☆☆☆☆ ✔ Example: 6.4 */
  SonyMaxApertureValue?: number
  /** ☆☆☆☆ ✔ Example: 34 */
  SonyMinAperture?: number
  /** ☆☆☆☆ ✔ Example: "ZV-E10" */
  SonyModelID?: string
  /** ☆☆☆☆ ✔ Example: "Fine" */
  SonyQuality?: string
  /** ☆☆☆☆ ✔ Example: "48:36" */
  SonyTimeMinSec?: string
  /** ☆☆☆☆   Example: 100 */
  SourceDirectoryIndex?: number
  /** ☆☆☆☆   Example: 60 */
  SourceFileIndex?: number
  /** ☆☆☆☆   Example: 24576 */
  SpecialEffectLevel?: number
  /** ☆☆☆☆   Example: "Off" */
  SpecialEffectMode?: string
  /** ☆☆☆☆   Example: "Unknown (15)" */
  SpecialEffectSetting?: string
  /** ★☆☆☆ ✔ Example: "Unknown (962), Sequence: 0, Panorama: (none)" */
  SpecialMode?: string
  /** ☆☆☆☆ ✔ Example: 16383 */
  SpecularWhiteLevel?: number
  /** ☆☆☆☆   Example: "+0.20" */
  SpeedX?: string
  /** ☆☆☆☆   Example: "+6.10" */
  SpeedY?: string
  /** ☆☆☆☆   Example: "+0.00" */
  SpeedZ?: string
  /** ☆☆☆☆   Example: 1632 */
  SpotFocusPointX?: number
  /** ☆☆☆☆   Example: 960 */
  SpotFocusPointY?: number
  /** ☆☆☆☆ ✔ Example: "Enable (use active AF point)" */
  SpotMeterLinkToAFPoint?: string
  /** ★☆☆☆ ✔ Example: "Center" */
  SpotMeteringMode?: string
  /** ☆☆☆☆ ✔ Example: "Tripod high resolution" */
  StackedImage?: string
  /** ☆☆☆☆ ✔ Example: "6 s" */
  StandbyMonitorOffTime?: string
  /** ☆☆☆☆ ✔ Example: "6 s" */
  StandbyTimer?: string
  /** ☆☆☆☆ ✔ Example: "Default (from LV)" */
  StartMovieShooting?: string
  /** ☆☆☆☆ ✔ Example: "MIDDLESEX" */
  State?: string
  /** ☆☆☆☆ ✔ Example: 8 */
  StopsAboveBaseISO?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  StoreByOrientation?: string
  /** ☆☆☆☆ ✔ Example: "10 Frames" */
  SubDialFrameAdvance?: string
  /** ☆☆☆☆ ✔ Example: "Same as MultiSelector" */
  SubSelector?: string
  /** ☆☆☆☆ ✔ Example: "Same As Multi-selector" */
  SubSelectorAssignment?: string
  /** ☆☆☆☆ ✔ Example: "Virtual Horizon" */
  SubSelectorCenter?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  SubSelectorPlusDials?: string
  /** ☆☆☆☆   Example: "Auto" */
  SubjectDetection?: string
  /** ☆☆☆☆ ✔ Example: "Steady" */
  SubjectMotion?: string
  /** ☆☆☆☆   Example: "None" */
  SubjectProgram?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  SuperMacro?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  SuperimposedDisplay?: string
  /** ☆☆☆☆ ✔ Example: 100 */
  SvISOSetting?: number
  /** ☆☆☆☆ ✔ Example: "Right" */
  SweepPanoramaDirection?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  SweepPanoramaFieldOfView?: number
  /** ☆☆☆☆ ✔ Example: "Wide" */
  SweepPanoramaSize?: string
  /** ☆☆☆☆ ✔ Example: "Only while pressing assist" */
  SwitchToRegisteredAFPoint?: string
  /** ☆☆☆☆ ✔ Example: "Sync" */
  SyncReleaseMode?: string
  /** ★★☆☆ ✔ Example: 9 */
  TargetAperture?: number
  /** ☆☆☆☆ ✔ Example: 4 */
  TargetCompressionRatio?: number
  /** ☆☆☆☆ ✔ Example: "476 mm" */
  TargetDistanceSetting?: string
  /** ★★☆☆ ✔ Example: "1/813" */
  TargetExposureTime?: string
  /** ☆☆☆☆ ✔ Example: "Real-world Subject" */
  TargetImageType?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  Teleconverter?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TextEncoding?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  TextStamp?: string
  /** ☆☆☆☆ ✔ Example: "THM_0043.JPG" */
  ThumbnailFileName?: string
  /** ☆☆☆☆ ✔ Example: 120 */
  ThumbnailHeight?: number
  /** ★★☆☆ ✔ Example: "0 159 7 112" */
  ThumbnailImageValidArea?: string
  /** ☆☆☆☆ ✔ Example: 160 */
  ThumbnailWidth?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 7404 bytes, use -b option to extract)" */
  TiffMeteringImage?: string
  /** ☆☆☆☆ ✔ Example: 30 */
  TiffMeteringImageHeight?: number
  /** ☆☆☆☆ ✔ Example: 44 */
  TiffMeteringImageWidth?: number
  /** ☆☆☆☆ ✔ Example: 23:50:41 */
  Time?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: 50336257 */
  TimeLapseShotNumber?: number
  /** ☆☆☆☆ ✔ Example: 01:48:53.630 */
  TimeSincePowerOn?: ExifTime | string
  /** ☆☆☆☆ ✔ Example: 2021-12-29T10:57:50.070-05:00 */
  TimeStamp?: ExifDateTime | string
  /** ★☆☆☆ ✔ Example: "-09:00" */
  TimeZone?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TimeZoneCity?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  TimeZoneCode?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  TimeZoneInfo?: number
  /** ☆☆☆☆ ✔ Example: "Shooting Mode" */
  TimerFunctionButton?: string
  /** ☆☆☆☆ ✔ Example: "Enable; 6 s: 6; 16 s: 16; After release: 2" */
  TimerLength?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  TimerRecording?: string
  /** ☆☆☆☆ ✔ Example: "" */
  Title?: string
  /** ☆☆☆☆ ✔ Example: "Normal" */
  ToneComp?: string
  /** ☆☆☆☆ ✔ Example: "Standard" */
  ToneCurve?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 95 bytes, use -b option to extract)" */
  ToneCurveMatching?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 1679 bytes, use -b option to extract)" */
  ToneCurveTable?: string
  /** ☆☆☆☆ ✔ Example: "Highlights; 0; -7; 7; Shadows; 0; -7; 7; Midtones; 0; -7; 7; 0; …" */
  ToneLevel?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningEffect?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningEffectAuto?: string
  /** ☆☆☆☆ ✔ Example: "Sepia" */
  ToningEffectMonochrome?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  ToningSaturation?: string
  /** ☆☆☆☆   Example: 5 */
  TotalZoom?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  TouchAE?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ToyCameraFilter?: string
  /** ☆☆☆☆   Example: "Off" */
  Transform?: string
  /** ☆☆☆☆ ✔ Example: "Normal (set center AF point)" */
  TrashButtonFunction?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  TravelDay?: string
  /** ☆☆☆☆   Example: "Motion Detection" */
  TriggerMode?: string
  /** ☆☆☆☆ ✔ Example: "1/64" */
  TvExposureTimeSetting?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  USBPowerDelivery?: string
  /** ☆☆☆☆ ✔ Example: "Turns on after one-shot AF" */
  USMLensElectronicMF?: string
  /** ☆☆☆☆ ✔ Example: "7860345b882000641403450101000000170d0f1d0f11827ca3111430d3000000" */
  UniqueID?: string
  /** ☆☆☆☆   Example: "ZME151000007" */
  UnknownNumber?: string
  /** ☆☆☆☆   Example: 0 */
  UnsharpCount?: number
  /** ☆☆☆☆   Example: "On" */
  UnsharpMask?: string
  /** ☆☆☆☆ ✔ Example: "Flags 0xf0" */
  UsableMeteringModes?: string
  /** ☆☆☆☆ ✔ Example: "Flags 0xec" */
  UsableShootingModes?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  UserDef1PictureStyle?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  UserDef2PictureStyle?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (4)" */
  UserDef3PictureStyle?: string
  /** ☆☆☆☆   Example: "PC900 COVERT PRO" */
  UserLabel?: string
  /** ☆☆☆☆   Example: "dpreview  " */
  UserProfile?: string
  /** ☆☆☆☆ ✔ Example: "Enable; Non-illuminated" */
  VFDisplayIllumination?: string
  /** ★☆☆☆ ✔ Example: 0 */
  VRDOffset?: number
  /** ☆☆☆☆ ✔ Example: "0200" */
  VRInfoVersion?: string
  /** ☆☆☆☆ ✔ Example: "Sport" */
  VRMode?: string
  /** ★★☆☆ ✔ Example: 99 */
  ValidAFPoints?: number
  /** ☆☆☆☆ ✔ Example: "12 0" */
  ValidBits?: string
  /** ☆☆☆☆   Example: "12 0" */
  ValidPixelDepth?: string
  /** ☆☆☆☆ ✔ Example: "Scene Auto" */
  VariProgram?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VariableLowPassFilter?: string
  /** ☆☆☆☆ ✔ Example: "Same as AF-On Button" */
  VerticalAFOnButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  VerticalFuncButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  VerticalFuncButtonPlusDials?: string
  /** ☆☆☆☆   Example: "None" */
  VerticalFuncPlusDials?: string
  /** ☆☆☆☆ ✔ Example: "Same as AF-On" */
  VerticalMovieAFOnButton?: string
  /** ☆☆☆☆ ✔ Example: "None" */
  VerticalMovieFuncButton?: string
  /** ☆☆☆☆ ✔ Example: "Same as MultiSelector" */
  VerticalMultiSelector?: string
  /** ☆☆☆☆ ✔ Example: "n/a" */
  VibrationReduction?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  VideoBurstMode?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (0)" */
  VideoBurstResolution?: string
  /** ☆☆☆☆   Example: "No" */
  VideoPreburst?: string
  /** ☆☆☆☆ ✔ Example: "Enable" */
  ViewInfoDuringExposure?: string
  /** ☆☆☆☆ ✔ Example: "Frame Count" */
  ViewfinderDisplay?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  ViewfinderWarning?: string
  /** ☆☆☆☆ ✔ Example: "Monochrome, WB corrected, One-touch image quality, Noise reducti…" */
  ViewfinderWarnings?: string
  /** ☆☆☆☆ ✔ Example: "ViewFinder" */
  ViewingMode?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  VignetteControl?: string
  /** ☆☆☆☆   Example: "Off" */
  Vignetting?: string
  /** ☆☆☆☆ ✔ Example: 96 */
  VignettingCorrVersion?: number
  /** ☆☆☆☆   Example: "Off" */
  VoiceMemo?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  WBBracketMode?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketShotNumber?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketValueAB?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  WBBracketValueGM?: number
  /** ☆☆☆☆ ✔ Example: "WB Bracketing Disabled" */
  WBBracketingSteps?: string
  /** ☆☆☆☆ ✔ Example: "Rear LCD panel" */
  WBMediaImageSizeSetting?: string
  /** ☆☆☆☆ ✔ Example: "Unknown (1 1)" */
  WBMode?: string
  /** ★☆☆☆ ✔ Example: 7 */
  WBShiftAB?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  WBShiftCreativeControl?: number
  /** ★☆☆☆ ✔ Example: 0 */
  WBShiftGM?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  WBShiftIntelligentAuto?: number
  /** ☆☆☆☆ ✔ Example: "Off" */
  WatercolorFilter?: string
  /** ☆☆☆☆ ✔ Example: "On" */
  WhiteBalanceAutoAdjustment?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  WhiteBalanceBias?: number
  /** ☆☆☆☆ ✔ Example: 796 */
  WhiteBalanceBlue?: number
  /** ★☆☆☆ ✔ Example: "1 0" */
  WhiteBalanceBracket?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  WhiteBalanceBracketing?: string
  /** ☆☆☆☆   Example: "0 -7 7" */
  WhiteBalanceComp?: string
  /** ★☆☆☆ ✔ Example: "Red -80, Blue -80" */
  WhiteBalanceFineTune?: string
  /** ☆☆☆☆ ✔ Example: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" */
  WhiteBalanceMatching?: string
  /** ☆☆☆☆ ✔ Example: "User-Selected" */
  WhiteBalanceMode?: string
  /** ☆☆☆☆ ✔ Example: 642 */
  WhiteBalanceRed?: number
  /** ☆☆☆☆ ✔ Example: "Custom 1" */
  WhiteBalanceSetting?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  WhiteBalanceSetup?: string
  /** ☆☆☆☆ ✔ Example: "(Binary data 2217 bytes, use -b option to extract)" */
  WhiteBalanceTable?: string
  /** ☆☆☆☆ ✔ Example: "Auto" */
  WhiteBalanceTemperature?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  WhiteBoard?: number
  /** ☆☆☆☆   Example: "Not Attached" */
  WideAdapter?: string
  /** ☆☆☆☆   Example: "Unknown (9)" */
  WideFocusZone?: string
  /** ☆☆☆☆   Example: "Off" */
  WideRange?: string
  /** ☆☆☆☆ ✔ Example: "Hometown" */
  WorldTimeLocation?: string
  /** ☆☆☆☆   Example: 0.2 */
  X3FillLight?: number
  /** ☆☆☆☆   Example: "+89.40" */
  Yaw?: string
  /** ☆☆☆☆ ✔ Example: 99.8 */
  YawAngle?: number
  /** ☆☆☆☆   Example: 2006 */
  YearCreated?: number
  /** ☆☆☆☆ ✔ Example: "ISO Setting Used" */
  ZoneMatching?: string
  /** ☆☆☆☆ ✔ Example: "Off" */
  ZoneMatchingMode?: string
  /** ☆☆☆☆   Example: "Unknown (7040)" */
  ZoneMatchingOn?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ZoneMatchingValue?: number
  /** ★★☆☆ ✔ Example: 768 */
  ZoomSourceWidth?: number
  /** ☆☆☆☆ ✔ Example: 8 */
  ZoomStepCount?: number
  /** ★★☆☆ ✔ Example: 6000 */
  ZoomTargetWidth?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 92592 bytes, use -b option to extract)" */
  ZoomedPreviewImage?: string
  /** ☆☆☆☆ ✔ Example: 92592 */
  ZoomedPreviewLength?: number
  /** ☆☆☆☆ ✔ Example: "736 544" */
  ZoomedPreviewSize?: string
  /** ☆☆☆☆ ✔ Example: 4184638 */
  ZoomedPreviewStart?: number
}

export interface XMPTags {
  /** ☆☆☆☆ ✔ Example: "uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" */
  About?: string
  /** ☆☆☆☆   Example: "+862.32" */
  AbsoluteAltitude?: string
  /** ☆☆☆☆ ✔ Example: true */
  AlreadyApplied?: boolean
  /** ☆☆☆☆ ✔ Example: 5.01 */
  ApproximateFocusDistance?: number
  /** ☆☆☆☆   Example: 0 */
  AsrClimaxDuration?: number
  /** ☆☆☆☆   Example: "None" */
  AsrClimaxScene?: string
  /** ☆☆☆☆   Example: 0 */
  AsrIsMacroRange?: number
  /** ☆☆☆☆   Example: "Auto" */
  AsrSceneCondition?: string
  /** ☆☆☆☆   Example: "NightPortrait" */
  AsrSceneMode?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  AutoLateralCA?: number
  /** ☆☆☆☆ ✔ Example: "portraiteffectsmatte" */
  AuxiliaryImageSubType?: string
  /** ☆☆☆☆ ✔ Example: "urn:com:apple:photo:2020:aux:semanticskymatte" */
  AuxiliaryImageType?: string
  /** ☆☆☆☆   Example: ["LWIR"] */
  BandName?: string[]
  /** ☆☆☆☆ ✔ Example: 0 */
  BlueHue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  BlueSaturation?: number
  /** ☆☆☆☆ ✔ Example: "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89" */
  BurstID?: string
  /** ☆☆☆☆ ✔ Example: 1 */
  BurstPrimary?: number
  /** ☆☆☆☆   Example: 0 */
  CamReverse?: number
  /** ☆☆☆☆ ✔ Example: "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89" */
  CameraBurstID?: string
  /** ☆☆☆☆   Example: "Front" */
  CameraFacing?: string
  /** ☆☆☆☆ ✔ Example: "" */
  CameraModelID?: string
  /** ☆☆☆☆ ✔ Example: "Embedded" */
  CameraProfile?: string
  /** ☆☆☆☆ ✔ Example: "FAD901B800F3B8DB133F79CA0AE63BE0" */
  CameraProfileDigest?: string
  /** ☆☆☆☆   Example: "Rear" */
  CameraUnit?: string
  /** ☆☆☆☆ ✔ Example: [{"Camera":{"DepthMap":{"ConfidenceURI":"android/confidencemap",… */
  Cameras?: Struct[]
  /** ☆☆☆☆ ✔ Example: "Photo" */
  CaptureMode?: string
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  CaptureSoftware?: string
  /** ☆☆☆☆ ✔ Example: ["Subjekt|Natur|Pflanzen","Ort|Deutschland|Rangsdorf"] */
  CatalogSets?: string[]
  /** ☆☆☆☆   Example: "240-8-330-901211" */
  CellGlobalID?: string
  /** ☆☆☆☆   Example: 5 */
  CellR?: number
  /** ☆☆☆☆   Example: 901211 */
  CellTowerID?: number
  /** ☆☆☆☆   Example: 45 */
  CentralTemperature?: number
  /** ☆☆☆☆   Example: [10000] */
  CentralWavelength?: number[]
  /** ☆☆☆☆ ✔ Example: ["tag,2011-07-26T05:44:01Z,0,c"] */
  Changes?: string[]
  /** ☆☆☆☆   Example: 0 */
  ChromaticAberrationB?: number
  /** ☆☆☆☆   Example: 0 */
  ChromaticAberrationR?: number
  /** ☆☆☆☆ ✔ Example: [{"CorrectionActive":true,"CorrectionAmount":1,"CorrectionMasks"… */
  CircularGradientBasedCorrections?: Struct[]
  /** ☆☆☆☆ ✔ Example: "3 (Superior)" */
  ColorClass?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ColorLabel?: number
  /** ☆☆☆☆ ✔ Example: 9 */
  ColorNoiseReduction?: number
  /** ☆☆☆☆ ✔ Example: 50 */
  ColorNoiseReductionDetail?: number
  /** ☆☆☆☆ ✔ Example: 50 */
  ColorNoiseReductionSmoothness?: number
  /** ☆☆☆☆ ✔ Example: "" */
  Colorlabels?: string
  /** ☆☆☆☆ ✔ Example: {"Directory":[{"Item":{"DataURI":"primary_image","Length":0,"Mim… */
  Container?: Struct
  /** ☆☆☆☆ ✔ Example: false */
  ConvertToGrayscale?: boolean
  /** ☆☆☆☆   Example:  */
  CreationTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: ["daniel@woss.io"] */
  Creator?: string[]
  /** ☆☆☆☆   Example: "{2d7e7fd6-2942-4d77-9842-389c3f62b14d}" */
  CreatorAppID?: string
  /** ☆☆☆☆ ✔ Example: {"CiAdrCity":"Amsterdam","CiAdrCtry":"Netherlands","CiAdrExtadr"… */
  CreatorContactInfo?: Struct
  /** ☆☆☆☆   Example: 1 */
  CreatorOpenWithUIOptions?: number
  /** ☆☆☆☆ ✔ Example: "picnik.com" */
  CreatorTool?: string
  /** ☆☆☆☆   Example: "Version Ver 1.04 " */
  Creatortool?: string
  /** ☆☆☆☆   Example: 0 */
  CropAngle?: number
  /** ☆☆☆☆   Example: 0 */
  CropConstrainToWarp?: number
  /** ☆☆☆☆ ✔ Example: 3872 */
  CroppedAreaImageHeightPixels?: number
  /** ☆☆☆☆ ✔ Example: 7744 */
  CroppedAreaImageWidthPixels?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  CroppedAreaLeftPixels?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  CroppedAreaTopPixels?: number
  /** ☆☆☆☆   Example: 273.01282 */
  DataTimestamp?: number
  /** ☆☆☆☆ ✔ Example: 2014-05-11T13:08:25.659-04:00 */
  DateAcquired?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 2017-08-13T12:38:30.000+04:00 */
  DateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 2018-06-24T12:14:49.000-04:00 */
  DateTimeDigitized?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 2015-06-02T09:56:01.000Z */
  DateUTC?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 0 */
  DefringeGreenAmount?: number
  /** ☆☆☆☆ ✔ Example: 60 */
  DefringeGreenHueHi?: number
  /** ☆☆☆☆ ✔ Example: 40 */
  DefringeGreenHueLo?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  DefringePurpleAmount?: number
  /** ☆☆☆☆ ✔ Example: 70 */
  DefringePurpleHueHi?: number
  /** ☆☆☆☆ ✔ Example: 30 */
  DefringePurpleHueLo?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  Dehaze?: number
  /** ☆☆☆☆ ✔ Example: {"DocumentID":"E8032E8674415D1687235859C596DD91","OriginalDocume… */
  DerivedFrom?: Struct
  /** ☆☆☆☆ ✔ Example: "nfd" */
  Description?: string
  /** ☆☆☆☆ ✔ Example: ["Animation","Collage"] */
  DisableAutoCreation?: string[]
  /** ☆☆☆☆ ✔ Example: "xmp.did:d96799f0-46b8-1d4e-aa0e-0cf5fab47155" */
  DocumentID?: string
  /** ☆☆☆☆ ✔ Example: "Example flash make" */
  FlashManufacturer?: string
  /** ☆☆☆☆ ✔ Example: "FlashPix Version 1.0" */
  FlashPixVersion?: string
  /** ☆☆☆☆   Example: 3.8 */
  FlightPitchDegree?: number
  /** ☆☆☆☆   Example: 4.5 */
  FlightRollDegree?: number
  /** ☆☆☆☆   Example: "+0.00" */
  FlightXSpeed?: string
  /** ☆☆☆☆   Example: "+0.00" */
  FlightYSpeed?: string
  /** ☆☆☆☆   Example: "+89.40" */
  FlightYawDegree?: string
  /** ☆☆☆☆   Example:  */
  FlightZSpeed?: string
  /** ☆☆☆☆   Example: 4681071 */
  FocusAreaHeight?: number
  /** ☆☆☆☆   Example: 1 */
  FocusAreaNum?: number
  /** ☆☆☆☆   Example: 3640833 */
  FocusAreaWidth?: number
  /** ☆☆☆☆   Example: 0 */
  FocusIsLensMoving?: number
  /** ☆☆☆☆   Example: 1456333 */
  FocusPosX?: number
  /** ☆☆☆☆   Example: 936214 */
  FocusPosY?: number
  /** ☆☆☆☆   Example: "Inactive" */
  FocusState?: string
  /** ☆☆☆☆ ✔ Example: "image/tiff" */
  Format?: string
  /** ☆☆☆☆   Example: 273.01444 */
  FrameTimestamp?: number
  /** ☆☆☆☆ ✔ Example: 3872 */
  FullPanoHeightPixels?: number
  /** ☆☆☆☆ ✔ Example: 7744 */
  FullPanoWidthPixels?: number
  /** ☆☆☆☆   Example: -90 */
  GimbalPitchDegree?: number
  /** ☆☆☆☆   Example: 0 */
  GimbalReverse?: number
  /** ☆☆☆☆   Example: "+0.00" */
  GimbalRollDegree?: string
  /** ☆☆☆☆   Example: "+90.80" */
  GimbalYawDegree?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  GrainAmount?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  GreenHue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  GreenSaturation?: number
  /** ☆☆☆☆ ✔ Example: "(Binary data 53037 bytes, use -b option to extract)" */
  HDRPMakerNote?: string
  /** ☆☆☆☆ ✔ Example: true */
  HasCrop?: boolean
  /** ☆☆☆☆ ✔ Example: "D1C7077D72112BA2E3FD1FDA7BCC2F0C" */
  HasExtendedXMP?: string
  /** ☆☆☆☆ ✔ Example: true */
  HasSettings?: boolean
  /** ☆☆☆☆ ✔ Example: ["点像F11"] */
  HierarchicalSubject?: string[]
  /** ☆☆☆☆ ✔ Example: [{"Action":"converted","Parameters":"from image/x-canon-cr2 to i… */
  History?: Struct[]
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentAqua?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentBlue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentGreen?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentMagenta?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentOrange?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentPurple?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentRed?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  HueAdjustmentYellow?: number
  /** ☆☆☆☆ ✔ Example: "sRGB IEC61966-2.1" */
  ICCProfileName?: string
  /** ☆☆☆☆ ✔ Example: 180 */
  InitialViewHeadingDegrees?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  InitialViewPitchDegrees?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  InitialViewRollDegrees?: number
  /** ☆☆☆☆ ✔ Example: "xmp.iid:f9edd04d-34a3-41cc-909f-5a49fc5b8154" */
  InstanceID?: string
  /** ☆☆☆☆   Example: 10107.684 */
  IntegratedGyroX?: number
  /** ☆☆☆☆   Example: -5432.3525 */
  IntegratedGyroY?: number
  /** ☆☆☆☆   Example: -5771.0996 */
  IntegratedGyroZ?: number
  /** ☆☆☆☆ ✔ Example: "N" */
  InteroperabilityIndex?: string
  /** ☆☆☆☆ ✔ Example: "18, 25, 24.96" */
  InteroperabilityVersion?: string
  /** ☆☆☆☆ ✔ Example: false */
  IsBokehActive?: boolean
  /** ☆☆☆☆ ✔ Example: true */
  IsHDRActive?: boolean
  /** ☆☆☆☆ ✔ Example: false */
  IsNightModeActive?: boolean
  /** ☆☆☆☆ ✔ Example: "選択" */
  Label?: string
  /** ☆☆☆☆ ✔ Example: ["red fish","bluefish"] */
  LastKeywordXMP?: string[]
  /** ☆☆☆☆ ✔ Example: "F351B7C76CEF50C906DB9B78A92FB1B4" */
  LegacyIPTCDigest?: string
  /** ☆☆☆☆ ✔ Example: "Back" */
  LensFacing?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  LensManualDistortionAmount?: number
  /** ☆☆☆☆ ✔ Example: "Example lens make" */
  LensManufacturer?: string
  /** ☆☆☆☆   Example: "1FCE420A790ADDB565D479EE73A4C0F0" */
  LensProfileDigest?: string
  /** ☆☆☆☆   Example: 100 */
  LensProfileDistortionScale?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  LensProfileEnable?: number
  /** ☆☆☆☆   Example: "Camera Settings" */
  LensProfileName?: string
  /** ☆☆☆☆ ✔ Example: "LensDefaults" */
  LensProfileSetup?: string
  /** ☆☆☆☆   Example: 100 */
  LensProfileVignettingScale?: number
  /** ☆☆☆☆   Example: 37087 */
  LocationAreaCode?: number
  /** ☆☆☆☆ ✔ Example: {"Amount":1,"Group":"Profiles","Name":"Adobe Color","Parameters"… */
  Look?: Struct
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentAqua?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentBlue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentGreen?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentMagenta?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentOrange?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentPurple?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentRed?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  LuminanceAdjustmentYellow?: number
  /** ☆☆☆☆   Example: 25 */
  LuminanceNoiseReductionContrast?: number
  /** ☆☆☆☆   Example: 75 */
  LuminanceNoiseReductionDetail?: number
  /** ☆☆☆☆ ✔ Example: 47 */
  LuminanceSmoothing?: number
  /** ☆☆☆☆ ✔ Example: "4577 bytes undefined data" */
  MakerNote?: string
  /** ☆☆☆☆ ✔ Example: true */
  Marked?: boolean
  /** ☆☆☆☆ ✔ Example: "" */
  Mask?: string
  /** ☆☆☆☆ ✔ Example: 2021-10-26T10:51:01.000+01:00 */
  MetadataDate?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: 1 */
  MicroVideo?: number
  /** ☆☆☆☆ ✔ Example: 2448784 */
  MicroVideoOffset?: number
  /** ☆☆☆☆ ✔ Example: 366563 */
  MicroVideoPresentationTimestampUs?: number
  /** ☆☆☆☆ ✔ Example: 1 */
  MicroVideoVersion?: number
  /** ☆☆☆☆   Example: 240 */
  MobileCountryCode?: number
  /** ☆☆☆☆   Example: 8 */
  MobileNetworkCode?: number
  /** ☆☆☆☆ ✔ Example: 2015-06-02T09:56:01.000+01:00 */
  ModificationDate?: ExifDateTime | string
  /** ☆☆☆☆   Example: "36864,40960,40961,37121,37122,40962,40963,37510,40964,36867,3686…" */
  NativeDigest?: string
  /** ☆☆☆☆   Example:  */
  OriginalCreateDateTime?: ExifDateTime | string
  /** ☆☆☆☆ ✔ Example: "xmp.did:7bf80ec8-c5cf-4881-b631-5ac83ae65ce2" */
  OriginalDocumentID?: string
  /** ☆☆☆☆ ✔ Example: false */
  OverrideLookVignette?: boolean
  /** ☆☆☆☆ ✔ Example: "PM6" */
  PMVersion?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricDarks?: number
  /** ☆☆☆☆ ✔ Example: 75 */
  ParametricHighlightSplit?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricHighlights?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricLights?: number
  /** ☆☆☆☆ ✔ Example: 50 */
  ParametricMidtoneSplit?: number
  /** ☆☆☆☆ ✔ Example: 25 */
  ParametricShadowSplit?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ParametricShadows?: number
  /** ☆☆☆☆ ✔ Example: ["John Doe"] */
  PersonInImage?: string[]
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveAspect?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveHorizontal?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveRotate?: number
  /** ☆☆☆☆ ✔ Example: 100 */
  PerspectiveScale?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveUpright?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveVertical?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveX?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PerspectiveY?: number
  /** ☆☆☆☆ ✔ Example: 80 */
  PhotographicSensitivity?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PickLabel?: number
  /** ☆☆☆☆ ✔ Example: "01.00" */
  PipelineVersion?: string
  /** ☆☆☆☆ ✔ Example: 65537 */
  PortraitEffectsMatteVersion?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PortraitVersion?: number
  /** ☆☆☆☆ ✔ Example: 22.5 */
  PoseHeadingDegrees?: number
  /** ☆☆☆☆ ✔ Example: 11.2 */
  PosePitchDegrees?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PoseRollDegrees?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  PostCropVignetteAmount?: number
  /** ☆☆☆☆ ✔ Example: "DSCF0722.JPG" */
  PreservedFileName?: string
  /** ☆☆☆☆ ✔ Example: 6.7 */
  ProcessVersion?: number
  /** ☆☆☆☆ ✔ Example: [{"Profile":{"CameraIndices":[0],"Type":"DepthPhoto"}}] */
  Profiles?: Struct[]
  /** ☆☆☆☆ ✔ Example: "equirectangular" */
  ProjectionType?: string
  /** ☆☆☆☆ ✔ Example: "P2030414.jpg" */
  RawFileName?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  RedHue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  RedSaturation?: number
  /** ☆☆☆☆ ✔ Example: {"AppliedToDimensions":{"H":3552,"W":2000},"RegionList":[{"Area"… */
  RegionInfo?: Struct
  /** ☆☆☆☆ ✔ Example: {"Regions":""} */
  RegionInfoMP?: Struct
  /** ☆☆☆☆ ✔ Example: [{"RegItemId":"Number1","RegOrgId":"TestName1"},{"RegItemId":"Nu… */
  RegistryID?: Struct[]
  /** ☆☆☆☆   Example: "+97.80" */
  RelativeAltitude?: string
  /** ☆☆☆☆ ✔ Example: "james robinson taylor" */
  Rights?: string
  /** ☆☆☆☆   Example: 0 */
  RtkFlag?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentAqua?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentBlue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentGreen?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentMagenta?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentOrange?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentPurple?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentRed?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SaturationAdjustmentYellow?: number
  /** ☆☆☆☆ ✔ Example: "AutoHDR" */
  Scene?: string
  /** ☆☆☆☆ ✔ Example: "[0.997883, 0.92984027]" */
  SceneDetectResultConfidences?: string
  /** ☆☆☆☆ ✔ Example: "[901, 60, 0]" */
  SceneDetectResultIds?: string
  /** ☆☆☆☆   Example: "Undefined" */
  SelfData?: string
  /** ☆☆☆☆ ✔ Example: 65536 */
  SemanticSegmentationMatteVersion?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  ShadowTint?: number
  /** ☆☆☆☆ ✔ Example: 30 */
  SharpenDetail?: number
  /** ☆☆☆☆ ✔ Example: 20 */
  SharpenEdgeMasking?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  SharpenRadius?: number
  /** ☆☆☆☆ ✔ Example: 2 */
  SourcePhotosCount?: number
  /** ☆☆☆☆ ✔ Example: ["com.google.android.apps.camera.gallery.specialtype.SpecialType… */
  SpecialTypeID?: string[]
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningBalance?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningHighlightHue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningHighlightSaturation?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningShadowHue?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  SplitToningShadowSaturation?: number
  /** ☆☆☆☆ ✔ Example: "https://PhotoStructure.com/" */
  StitchingSoftware?: string
  /** ☆☆☆☆ ✔ Example: ["点像F11"] */
  Subject?: string[]
  /** ☆☆☆☆ ✔ Example: 296185 */
  SubsecTime?: number
  /** ☆☆☆☆ ✔ Example: "#MB%:{9C0B071B-5553-4D89-B252-934C9EC1E04D}GBMB1:%MB#" */
  Tag?: string
  /** ☆☆☆☆ ✔ Example: "Yes" */
  Tagged?: string
  /** ☆☆☆☆ ✔ Example: ["Subjekt/Natur/Pflanzen","Ort/Deutschland/Rangsdorf"] */
  TagsList?: string[]
  /** ☆☆☆☆   Example: 45 */
  Texture?: number
  /** ☆☆☆☆ ✔ Example: "+56" */
  Tint?: string
  /** ☆☆☆☆   Example: 0 */
  TlinearGain?: number
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveBlue?: string[]
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveGreen?: string[]
  /** ☆☆☆☆ ✔ Example: "Medium Contrast" */
  ToneCurveName?: string
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Blue?: string[]
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Green?: string[]
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurvePV2012Red?: string[]
  /** ☆☆☆☆ ✔ Example: ["0, 0","255, 255"] */
  ToneCurveRed?: string[]
  /** ☆☆☆☆ ✔ Example: 0 */
  ToneMapStrength?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightCenterMode?: number
  /** ☆☆☆☆ ✔ Example: 0.51688833 */
  UprightCenterNormX?: number
  /** ☆☆☆☆ ✔ Example: 0.5 */
  UprightCenterNormY?: number
  /** ☆☆☆☆ ✔ Example: 35 */
  UprightFocalLength35mm?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightFocalMode?: number
  /** ☆☆☆☆ ✔ Example: 0 */
  UprightFourSegmentsCount?: number
  /** ☆☆☆☆ ✔ Example: false */
  UprightPreview?: boolean
  /** ☆☆☆☆ ✔ Example: 6 */
  UprightTransformCount?: number
  /** ☆☆☆☆ ✔ Example: 151388160 */
  UprightVersion?: number
  /** ☆☆☆☆ ✔ Example: true */
  UsePanoramaViewer?: boolean
  /** ☆☆☆☆ ✔ Example: "+21" */
  Vibrance?: string
  /** ☆☆☆☆ ✔ Example: 0 */
  VignetteAmount?: number
  /** ☆☆☆☆   Example: [4500] */
  WavelengthFWHM?: number[]
  /** ☆☆☆☆ ✔ Example: "XMP toolkit 3.0-28, framework 1.6" */
  XMPToolkit?: string
}

/**
 * This is a partial list of fields returned by {@link ExifTool.read}.
 *
 * To prevent error TS2590: (Expression produces a union type that is too
 * complex to represent) only the most common 2874 tags are retained in this
 * interface.
 *
 * Comments by each tag include popularity (★★★★ is found in > 50% of samples,
 * and ☆☆☆☆ is rare), followed by a checkmark if the tag is used by popular
 * devices (like iPhones) An example value, JSON stringified, follows the
 * popularity ratings.
 *
 * Autogenerated by "yarn mktags" by ExifTool 12.40 on Mon Mar 07 2022.
 * 3081 unique tags were found in 10778 photo and video files.
 */
export interface Tags
  extends APP12Tags,
    APP14Tags,
    APP1Tags,
    APP4Tags,
    APP5Tags,
    APP6Tags,
    ApplicationRecordTags,
    CompositeTags,
    EXIFTags,
    ExifToolTags,
    FileTags,
    FlashPixTags,
    ICCProfileTags,
    IPTCTags,
    JFIFTags,
    MPFTags,
    MakerNotesTags,
    MetaTags,
    PanasonicRawTags,
    PhotoshopTags,
    PrintIMTags,
    QuickTimeTags,
    RAFTags,
    RIFFTags,
    XMPTags {
  errors?: string[]
  /** ☆☆☆☆ ✔ Example: "File is empty" */
  Error?: string
  /** ☆☆☆☆ ✔ Example: "Unrecognized IPTC record 0 (ignored)" */
  Warning?: string
  SourceFile?: string
  /** Either an offset, like `UTC-7`, or an actual timezone, like `America/Los_Angeles` */
  tz?: string
  /** Description of where and how `tz` was extracted */
  tzSource?: string
}
