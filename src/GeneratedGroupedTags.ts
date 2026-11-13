import { BinaryField } from "./BinaryField";
import { ContainerDirectoryItem } from "./ContainerDirectoryItem";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import { ResourceEvent } from "./ResourceEvent";
import { Struct } from "./Struct";
import { Version } from "./Version";

/**
 * The `APP1:` fields of {@link GroupedTags}.
 */
export interface APP1GroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "59 128 128"
   */
  "APP1:AboveColor"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "5.0 C"
   */
  "APP1:AtmosphericTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "60 128 128"
   */
  "APP1:BelowColor"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "Z-CAMERA"
   */
  "APP1:CameraModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "_______________"
   */
  "APP1:CameraPartNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 84510763
   * @remarks Camera serial number. DNG tag 0xc62f, writable string in IFD0.
   */
  "APP1:CameraSerialNumber"?: string | number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "https://PhotoStructure.com/"
   */
  "APP1:CameraSoftware"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "https://PhotoStructure.com/"
   */
  "APP1:CreatorSoftware"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2013:03:12 16:31:26"
   */
  "APP1:DateTimeGenerated"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "2025:01:24 17:39:52.628+02:00"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "APP1:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 1011393 bytes, use -b option to extract)"
   */
  "APP1:EmbeddedImage"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 960
   */
  "APP1:EmbeddedImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "PNG"
   */
  "APP1:EmbeddedImageType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 640
   */
  "APP1:EmbeddedImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 1
   */
  "APP1:Emissivity"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "46.1 deg"
   */
  "APP1:FieldOfView"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "NOF"
   */
  "APP1:FilterModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example ""
   */
  "APP1:FilterPartNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "00000000"
   */
  "APP1:FilterSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "97.9 m"
   */
  "APP1:FocusDistance"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 9149
   */
  "APP1:FocusStepCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 9
   */
  "APP1:FrameRate"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 49.799999
   * @remarks GPS altitude in meters. Always stored as positive value; sign determined by GPSAltitudeRef.
   * Composite GPSAltitude combines this with Ref to return signed value with 'Above/Below Sea Level' text.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "APP1:GPSAltitude"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 99.99
   */
  "APP1:GPSDOP"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 94
   */
  "APP1:GPSImgDirection"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Magnetic North"
   */
  "APP1:GPSImgDirectionRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 48.857748
   * @remarks GPS latitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLatitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLatitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "APP1:GPSLatitude"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "South"
   * @remarks GPS latitude hemisphere.
   * Valid values: 'N' (North), 'S' (South). When writing, ExifTool accepts signed numbers or direction strings.
   */
  "APP1:GPSLatitudeRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2.2918888
   * @remarks GPS longitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLongitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLongitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "APP1:GPSLongitude"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "West"
   * @remarks GPS longitude hemisphere.
   * Valid values: 'E' (East), 'W' (West)
   */
  "APP1:GPSLongitudeRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "WGS84"
   */
  "APP1:GPSMapDatum"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 20.56
   * @remarks GPS speed of camera movement during capture. Units determined by GPSSpeedRef (K=km/h, M=mph, N=knots).
   * Must be paired with GPSSpeedRef for meaningful interpretation.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "APP1:GPSSpeed"?: string | number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "km/h"
   * @remarks GPS speed measurement unit.
   * Valid values: 'K' (km/h), 'M' (mph), 'N' (knots)
   */
  "APP1:GPSSpeedRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 88.01
   */
  "APP1:GPSTrack"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "True North"
   */
  "APP1:GPSTrackRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "APP1:GPSValid"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2.2.0.0"
   */
  "APP1:GPSVersionID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "7.4 C"
   */
  "APP1:IRWindowTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 1
   */
  "APP1:IRWindowTransmission"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "99 128 128"
   */
  "APP1:Isotherm1Color"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "92 115 209"
   */
  "APP1:Isotherm2Color"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "N/A"
   */
  "APP1:LensModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "T199703"
   */
  "APP1:LensPartNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "No Lens"
   */
  "APP1:LensSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP1:Meas1Label"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "80 60"
   */
  "APP1:Meas1Params"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Spot"
   */
  "APP1:Meas1Type"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Sp1"
   */
  "APP1:Meas2Label"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "213 160 213 160"
   */
  "APP1:Meas2Params"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Spot"
   */
  "APP1:Meas2Type"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "9.70 m"
   */
  "APP1:ObjectDistance"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [-9,"+98"]
   */
  "APP1:OffsetX"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [-78,"+51"]
   */
  "APP1:OffsetY"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "67 216 98"
   */
  "APP1:OverflowColor"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "(Binary data 672 bytes, use -b option to extract)"
   */
  "APP1:Palette"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 224
   */
  "APP1:PaletteColors"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "iron.pal"
   */
  "APP1:PaletteFileName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 0
   */
  "APP1:PaletteMethod"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "iron"
   */
  "APP1:PaletteName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 3
   */
  "APP1:PaletteStretch"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ".basicImgData.objectParams.emissivity"
   */
  "APP1:Param0"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "(Binary data 614604 bytes, use -b option to extract)"
   */
  "APP1:RawThermalImage"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 90
   */
  "APP1:RawThermalImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "TIFF"
   */
  "APP1:RawThermalImageType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 80
   */
  "APP1:RawThermalImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 9392
   */
  "APP1:RawValueMedian"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 993
   */
  "APP1:RawValueRange"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 65535
   */
  "APP1:RawValueRangeMax"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 8628
   */
  "APP1:RawValueRangeMin"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2.2125397
   */
  "APP1:Real2IR"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "26.7 C"
   */
  "APP1:ReflectedApparentTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "80.0 %"
   */
  "APP1:RelativeHumidity"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "41 110 240"
   */
  "APP1:UnderflowColor"?: string;
}

/**
 * The `APP4:` fields of {@link GroupedTags}.
 */
export interface APP4GroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "25.0 C"
   */
  "APP4:AmbientTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.95
   */
  "APP4:Emissivity"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5.0 m"
   */
  "APP4:ObjectDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 976
   */
  "APP4:PreviewImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 816
   */
  "APP4:PreviewImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 95
   */
  "APP4:PreviewQuality"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "50 %"
   */
  "APP4:RelativeHumidity"?: string;
}

/**
 * The `APP5:` fields of {@link GroupedTags}.
 */
export interface APP5GroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "R0000148"
   */
  "APP5:Barcode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "E"
   * @remarks Ricoh Theta compass heading direction in degrees.
   * Camera orientation sensor data.
   */
  "APP5:Compass"?: number | string;
}

/**
 * The `APP6:` fields of {@link GroupedTags}.
 */
export interface APP6GroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 800
   */
  "APP6:AutoISOMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3200
   */
  "APP6:AutoISOMin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Up"
   */
  "APP6:AutoRotation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "C3331350753540"
   * @remarks Camera serial number. DNG tag 0xc62f, writable string in IFD0.
   */
  "APP6:CameraSerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "GOPRO"
   */
  "APP6:ColorMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Photo Global Settings"
   */
  "APP6:DeviceName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 148.34216
   */
  "APP6:DiagonalFieldOfView"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP6:DigitalZoom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "APP6:DigitalZoomOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   * @remarks Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec.
   * Signed value indicating deviation from metered exposure.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP6:ExposureCompensation"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AUTO"
   */
  "APP6:ExposureType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "HD8.01.01.60.00"
   */
  "APP6:FirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "OFF"
   */
  "APP6:HDRSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "GPRO"
   */
  "APP6:LensProjection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "859830e2f50cb3397a6216f09553fce800000000000000000000000000000000"
   */
  "APP6:MediaUniqueID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7.6.4"
   */
  "APP6:MetadataVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "HERO8 Black"
   * @remarks Camera/device model name. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP6:Model"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "12MP_W"
   */
  "APP6:PhotoResolution"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "APP6:Protune"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4_1SEC"
   */
  "APP6:Rate"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "MED"
   */
  "APP6:Sharpness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "APP6:SpotMeter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AUTO"
   * @remarks White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual).
   * MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc.
   * EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP6:WhiteBalance"?: number | string;
}

/**
 * The `APP8:` fields of {@link GroupedTags}.
 */
export interface APP8GroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "APP8:BitsPerSample"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "APP8:ColorComponents"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "YCbCr, ITU-R BT 709, video"
   * @remarks Color space of image data. EXIF mandatory tag.
   * Standard values: 1 (sRGB), 0xFFFF (Uncalibrated).
   * Non-standard values: 2 (Adobe RGB, some cameras), 0xFFFD (Wide Gamut RGB, Sony), 0xFFFE (ICC Profile, Sony).
   * Adobe RGB is typically indicated by 'Uncalibrated' with InteropIndex='R03'.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP8:ColorSpace"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "JPEG"
   */
  "APP8:Compression"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4500
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "APP8:ImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3000
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "APP8:ImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "inches"
   */
  "APP8:ResolutionUnit"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 300
   */
  "APP8:XResolution"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 300
   */
  "APP8:YResolution"?: number;
}

/**
 * The `APP10:` fields of {@link GroupedTags}.
 */
export interface APP10GroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1417 bytes, use -b option to extract)"
   */
  "APP10:HDRGainCurve"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 755
   */
  "APP10:HDRGainCurveSize"?: number;
}

/**
 * The `APP12:` fields of {@link GroupedTags}.
 */
export interface APP12GroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 388
   */
  "APP12:Again"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   * @remarks Calculated aperture value derived from FNumber or ApertureValue.
   * Read-only composite tag. To write, modify FNumber or ApertureValue instead.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "APP12:Aperture"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3383
   */
  "APP12:B5100"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:Balance"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2438
   */
  "APP12:Bgain"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 255
   */
  "APP12:BHighLight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 216
   */
  "APP12:BHL"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 33
   */
  "APP12:Blk0"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 32
   */
  "APP12:Blk1"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 86
   */
  "APP12:BMean"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6
   */
  "APP12:Boff"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "APP12:BSD"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:BSd"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1908
   */
  "APP12:BStrobe"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "SR83"
   */
  "APP12:CameraType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "APP12:Case"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "APP12:CBal"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:Color"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 42926626
   */
  "APP12:COLOR1"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 32321478
   */
  "APP12:COLOR2"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 22701368
   */
  "APP12:COLOR3"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "APP12:COLOR4"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:ColorMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:ContTake"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2001:04:10 14:20:52"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "APP12:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8501
   */
  "APP12:EXP1"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 59
   */
  "APP12:EXP2"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 237
   */
  "APP12:EXP3"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.97
   */
  "APP12:ExposRatio"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3687
   */
  "APP12:Exposure"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   * @remarks Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec.
   * Signed value indicating deviation from metered exposure.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP12:ExposureCompensation"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/8"
   * @remarks Shutter speed in seconds (e.g., '1/250'). Primary source for ShutterSpeed composite.
   * To write shutter speed, use this tag directly. BulbDuration takes priority in ShutterSpeed composite if present and > 0.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP12:ExposureTime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:FinalRatio"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "v2.2.16"
   */
  "APP12:FirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   * @remarks Flash status and mode as bitfield. Common values:
   * 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected),
   * 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired),
   * 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction).
   * Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP12:Flash"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 640
   */
  "APP12:FlashTime"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 192
   */
  "APP12:FMean"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   * @remarks Lens aperture as f-number (e.g., 2.8, 5.6). Primary source for Aperture composite.
   * To write aperture, use this tag - it's more intuitive than ApertureValue (which uses APEX units).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP12:FNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "F2.8"
   * @remarks F-number from APP12 segment (Ducky tags, uncommon). Note lowercase 'n'.
   * Distinct from standard EXIF:FNumber. Use FNumber instead for consistency.
   * @see https://exiftool.org/TagNames/APP12.html
   */
  "APP12:Fnumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "APP12:FocusMode"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 136
   */
  "APP12:FocusPos"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 85
   */
  "APP12:Gain"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:Gamma"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2152
   */
  "APP12:GBgain"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "APP12:GBoff"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 255
   */
  "APP12:GHighLight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 255
   */
  "APP12:GHL"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 52
   */
  "APP12:GMean"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2152
   */
  "APP12:GRgain"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "APP12:GRoff"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "APP12:GSD"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:GSd"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "PDR-M60"
   */
  "APP12:ID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "896x600"
   * @remarks Image dimensions combining width and height from various metadata fields.
   * Read-only composite derived from ImageWidth, ImageHeight, ExifImageWidth, ExifImageHeight, or RawImageCroppedSize.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "APP12:ImageSize"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 696880
   */
  "APP12:JPEG1"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:LightS"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "APP12:Macro"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example " 10.6"
   */
  "APP12:Mean"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 26
   */
  "APP12:MotorPos"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "APP12:Offset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 87648
   */
  "APP12:PicLen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:Protect"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 97
   */
  "APP12:Quality"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6929
   */
  "APP12:R5100"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6
   */
  "APP12:Resolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "DCPT"
   */
  "APP12:REV"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1887
   */
  "APP12:Rgain"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 255
   */
  "APP12:RHighLight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 247
   */
  "APP12:RHL"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 32
   */
  "APP12:RMean"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 9
   */
  "APP12:Roff"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "APP12:RSD"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "APP12:RSd"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5896
   */
  "APP12:RStrobe"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8259,0,14bfe,a184,11987,1e4f1,0,7c0000,40b60000,56a05e6,6…0038,d7"
   */
  "APP12:S0"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "#00000001"
   */
  "APP12:SerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "APP12:StrobeTime"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "bd1,1,5,2beec,b5,ec15"
   */
  "APP12:T0"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 357
   */
  "APP12:TagB"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 92
   */
  "APP12:TagQ"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 243
   */
  "APP12:TagR"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "v"
   */
  "APP12:TagS"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4016
   */
  "APP12:ThmLen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "vf0-3c"
   */
  "APP12:Version"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 80
   * @remarks White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual).
   * MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc.
   * EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "APP12:WhiteBalance"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4054
   */
  "APP12:YLevel"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2209
   */
  "APP12:YTarget"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [0,"x1.0"]
   */
  "APP12:Zoom"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 9
   */
  "APP12:ZoomPos"?: number;
}

/**
 * The `APP14:` fields of {@link GroupedTags}.
 */
export interface APP14GroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "YCbCr"
   */
  "APP14:ColorTransform"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 100
   */
  "APP14:DCTEncodeVersion"?: number;
}

/**
 * The `Composite:` fields of {@link GroupedTags}.
 *
 * These are tags are derived from the values of one or more other tags.
 * Only a few are writable directly.
 * @see https://exiftool.org/TagNames/Composite.html
 */
export interface CompositeGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown (49 5)"
   */
  "Composite:AdvancedSceneMode"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example 90
   * @remarks Calculated aperture value derived from FNumber or ApertureValue.
   * Read-only composite tag. To write, modify FNumber or ApertureValue instead.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:Aperture"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "On"
   */
  "Composite:AutoFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8.82 Mbps"
   * @remarks Average bitrate for video/audio files, calculated from media data size divided by duration.
   * Read-only composite tag for QuickTime-based formats (MOV, MP4, etc.).
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:AvgBitrate"?: number | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 4.914063
   */
  "Composite:BlueBalance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "[Red,Green][Green,Blue]"
   */
  "Composite:CFAPattern"?: string;

  /**
   * @frequency 🔥 ★★★★ (50%)
   * @example "1.030 mm"
   */
  "Composite:CircleOfConfusion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "Composite:ConditionalFEC"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "Composite:ContrastDetectAF"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "© Chuckles McSnortypants, Inc."
   * @remarks Copyright notice for the image. MWG composite tag that reconciles EXIF:Copyright, IPTC:CopyrightNotice, and XMP-dc:Rights.
   * Writing updates all three locations to maintain MWG synchronization.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:Copyright"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "United States"
   */
  "Composite:Country"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "2218:09:22 02:32:14"
   * @remarks When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.
   * Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images.
   * For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:CreateDate"?: ExifDateTime | ExifDate | string | number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "www.jaro.ch"
   */
  "Composite:Creator"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2006:12:19"
   */
  "Composite:DateCreated"?: ExifDateTime | string | ExifDate;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:08:23 19:41:40-04:00"
   * @remarks Composite tag combining IPTC:DateCreated (YYYYMMDD) and IPTC:TimeCreated (with timezone offset).
   * Read-only composite - to write, set IPTC:DateCreated and IPTC:TimeCreated individually.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:DateTimeCreated"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "2218:09:22 02:32:14"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "Ð¤Ð¸Ð»Ð¾ÑÐ¾Ñ„ÑÐºÐ¸Ð¸Ì† Ð´Ð²Ð¾Ñ€Ð¸Ðº, Ñ€ÐµÐ»ÑŒÐµÑ„Ñ‹ Ð¢Ð…v, 1970"
   * @remarks Image caption or description. MWG composite tag that reconciles EXIF:ImageDescription, IPTC:Caption-Abstract, and XMP-dc:Description.
   * Writing updates all three locations for MWG compliance. Supports language variants via RFC 3066 codes (e.g., 'Description-fr').
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:Description"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:02:19 17:21:26+00:00"
   */
  "Composite:DigitalCreationDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4.00x"
   */
  "Composite:DigitalZoom"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "inf (9.66 m - inf)"
   * @remarks Calculated depth of field based on focal length, aperture, and focus distance.
   * WARNING: This value may be incorrect if the image has been resized.
   * Read-only composite tag.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:DOF"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Single-frame Shooting"
   */
  "Composite:DriveMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 25.866408
   * @remarks Video/audio duration. QuickTime: stored in time scale units, converted to seconds using TimeScale.
   * ExifTool formats as 'H:MM:SS' or seconds. Some iPhone live-photo MOV videos may show key frame time instead of total duration.
   * @see https://exiftool.org/TagNames/QuickTime.html
   */
  "Composite:Duration"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Not attached"
   */
  "Composite:ExtenderStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "897-9769"
   */
  "Composite:FileNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off, Did not fire"
   * @remarks Flash status and mode as bitfield. Common values:
   * 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected),
   * 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired),
   * 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction).
   * Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "Composite:Flash"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "External"
   */
  "Composite:FlashType"?: string;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "99.7 mm (35 mm equivalent: 554.0 mm)"
   */
  "Composite:FocalLength35efl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "inf"
   */
  "Composite:FocusDistance"?: string;

  /**
   * @frequency 🔥 ★★★★ (50%)
   * @example "97.7 deg"
   */
  "Composite:FOV"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 99.8
   * @remarks GPS altitude in meters. Always stored as positive value; sign determined by GPSAltitudeRef.
   * Composite GPSAltitude combines this with Ref to return signed value with 'Above/Below Sea Level' text.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "Composite:GPSAltitude"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Above Sea Level"
   * @remarks GPS altitude reference.
   * Values: 0 (Above Sea Level), 1 (Below Sea Level), 2 (Positive Sea Level, sea-level ref), 3 (Negative Sea Level, sea-level ref).
   * Values 2-3 added in EXIF 3.0 for ellipsoidal vs sea-level reference.
   */
  "Composite:GPSAltitudeRef"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:09:20 15:27:20Z"
   * @remarks GPS timestamp combining GPSDateStamp and GPSTimeStamp fields.
   * Read-only composite from multiple GPS sources including manufacturer-specific implementations.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:GPSDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "43 deg 37' 59.61" N"
   */
  "Composite:GPSDestLatitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "80 deg 23' 16.31" W"
   */
  "Composite:GPSDestLongitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 48.857748
   * @remarks GPS latitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLatitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLatitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "Composite:GPSLatitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "N"
   * @remarks GPS latitude hemisphere.
   * Valid values: 'N' (North), 'S' (South). When writing, ExifTool accepts signed numbers or direction strings.
   */
  "Composite:GPSLatitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 2.2918888
   * @remarks GPS longitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLongitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLongitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "Composite:GPSLongitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "W"
   * @remarks GPS longitude hemisphere.
   * Valid values: 'E' (East), 'W' (West)
   */
  "Composite:GPSLongitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "7.196465 134.376806666667"
   * @remarks Combined GPS latitude and longitude. Writable composite tag.
   * When written, updates GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef.
   * Accepts Google Maps coordinates (right-click format).
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:GPSPosition"?: string;

  /**
   * @frequency 🔥 ★★★★ (50%)
   * @example "Inf m"
   */
  "Composite:HyperfocalDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5424
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "Composite:ImageHeight"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "9728x6656"
   * @remarks Image dimensions combining width and height from various metadata fields.
   * Read-only composite derived from ImageWidth, ImageHeight, ExifImageWidth, ExifImageHeight, or RawImageCroppedSize.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:ImageSize"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8144
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "Composite:ImageWidth"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 993
   * @remarks Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values.
   * Historically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "Composite:ISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["点像F11"]
   * @remarks Searchable subject terms for image content. MWG composite tag that reconciles IPTC:Keywords and XMP-dc:Subject.
   * Multi-value fields use semicolon-space ('; ') separators when represented as string.
   * IPTC constraint: max 64 characters per keyword. Character encoding depends on IPTC:CodedCharacterSet; UTF8 recommended.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:Keywords"?: string | string[];

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "9.2 - 92.0 mm"
   * @remarks Lens identification from focal length range, primarily for Canon cameras.
   * Read-only composite. For more detailed lens identification, see LensID.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:Lens"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "9.2 - 92.0 mm (35 mm equivalent: 24.9 - 248.8 mm)"
   */
  "Composite:Lens35efl"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   * @remarks Identifies actual lens model using manufacturer-specific lookup tables from partial type information.
   * Configurable: may be extended with user-defined lenses via ExifTool configuration.
   * Different derivation logic for Canon (focal lengths), Nikon (LensIDNumber), Ricoh (LensFirmware), and others (XMP-aux:LensID).
   * Read-only composite.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:LensID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "85mm f/1.8 G"
   */
  "Composite:LensSpec"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Olympus Zuiko Digital ED 50mm F2.0 Macro"
   */
  "Composite:LensType"?: string;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example 9.9
   */
  "Composite:LightValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Taumatawhakatangihangakōauauotamateapōkaiwhenuakitānatahu"
   */
  "Composite:Location"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 9.5
   * @remarks Total megapixels calculated from ImageSize composite field.
   * Read-only composite.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:Megapixels"?: number;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "2216:02:28 03:49:50"
   * @remarks When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate.
   * Should reflect intentional user edits, not automatic metadata updates. Different from file system modification time.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:ModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example 8
   * @remarks Image orientation. Standard EXIF tag 0x112 in IFD0.
   * Valid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW).
   * Most images use values 1, 3, 6, and 8.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "Composite:Orientation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 512 bytes, use -b option to extract)"
   */
  "Composite:OriginalDecisionData"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "9.9 um"
   */
  "Composite:PeakSpectralSensitivity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On (51-point)"
   */
  "Composite:PhaseDetectAF"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:PreviewImage"?: BinaryField;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "816x459"
   * @remarks Dimensions of the embedded preview image (e.g., '816x459').
   * Read-only composite. Useful for checking preview size without extracting binary data.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:PreviewImageSize"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 5
   * @remarks Star rating for the image. MWG composite tag from XMP-xmp:Rating.
   * Valid values: -1 (rejected), 0 (unrated), 1-5 (star rating)
   * Note: Rating may appear in EXIF but that's non-standard per MWG. Only XMP writes are supported.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "Composite:Rating"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 3.706667
   */
  "Composite:RedBalance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On"
   */
  "Composite:RedEyeReduction"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 11.2
   */
  "Composite:RicohPitch"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1.59
   */
  "Composite:RicohRoll"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 90
   * @remarks Degrees of clockwise camera rotation for QuickTime/MP4 video files.
   * Special writable: Writing this tag updates QuickTime MatrixStructure for all tracks with a non-zero image size simultaneously.
   * Different from EXIF Orientation tag.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:Rotation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "9:30:01"
   */
  "Composite:RunTimeSincePowerUp"?: string;

  /**
   * @frequency 🔥 ★★★★ (50%)
   * @example 9.9
   */
  "Composite:ScaleFactor35efl"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (83)"
   */
  "Composite:ShootingMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "1st-curtain sync"
   */
  "Composite:ShutterCurtainHack"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "inf"
   * @remarks Shutter speed combining ExposureTime, ShutterSpeedValue, and BulbDuration.
   * Read-only composite tag. Format typically fractional (e.g., '1/250').
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:ShutterSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Washington"
   */
  "Composite:State"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "2026:07:05 17:26:40.905+12:00"
   * @remarks Creation date with subsecond precision, merging EXIF:CreateDate, SubSecTimeDigitized, and OffsetTimeDigitized.
   * Writable composite: writing updates all three fields simultaneously for high-precision timestamps with timezone information.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:SubSecCreateDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "2026:07:05 17:26:40.905+12:00"
   * @remarks Original datetime with subsecond precision, combining EXIF:DateTimeOriginal, SubSecTimeOriginal, and OffsetTimeOriginal.
   * Writable composite: writing updates all three fields simultaneously. Represents when the photo was originally taken with high precision.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:SubSecDateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "2026:07:05 17:26:40.905+12:00"
   * @remarks Modification timestamp with subsecond precision, combining EXIF:ModifyDate, SubSecTime, and OffsetTime.
   * Writable composite: writing updates all three fields simultaneously. Represents when the file was last modified with high precision.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "Composite:SubSecModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Embedded TIFF thumbnail image data. Composite tag rebuilt from component EXIF tags.
   * Read-only - derived from SubfileType, Compression, ImageWidth, ImageHeight, etc.
   */
  "Composite:ThumbnailTIFF"?: BinaryField;
}

/**
 * The `Ducky:` fields of {@link GroupedTags}.
 */
export interface DuckyGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "80%"
   */
  "Ducky:Quality"?: string;
}

/**
 * The `EXIF:` fields of {@link GroupedTags}.
 *
 * @see https://exiftool.org/TagNames/EXIF.html
 */
export interface EXIFGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 988517
   */
  "EXIF:Acceleration"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8 12 1968 2628"
   */
  "EXIF:ActiveArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "22.6 C"
   */
  "EXIF:AmbientTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2.499755859 1 1.763427734"
   */
  "EXIF:AnalogBalance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:AntiAliasStrength"?: number;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example 9016997700
   * @remarks Lens aperture in APEX units. Secondary source for Aperture composite (FNumber takes priority).
   * Formula: ApertureValue = 2 × log₂(FNumber). To write aperture, prefer FNumber as it's more intuitive.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Arturo DeImage"
   * @remarks Image creator/photographer name. ExifTool trims trailing whitespace.
   * When MWG module is loaded, this becomes a list-type tag synchronized with XMP-dc:Creator and IPTC:By-line.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:Artist"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1 1 1"
   */
  "EXIF:AsShotNeutral"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0.346428 0.359709"
   */
  "EXIF:AsShotWhiteXY"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3.0050511
   */
  "EXIF:BaselineExposure"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:BaselineNoise"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1.5
   */
  "EXIF:BaselineSharpness"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 500
   */
  "EXIF:BayerGreenSplit"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:BestQualityScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "8 8 8"
   */
  "EXIF:BitsPerSample"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "64 64 64 64"
   */
  "EXIF:BlackLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 512
   */
  "EXIF:BlackLevelBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 512
   */
  "EXIF:BlackLevelGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 512
   */
  "EXIF:BlackLevelRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2 2"
   */
  "EXIF:BlackLevelRepeatDim"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 9.9919505
   */
  "EXIF:BrightnessValue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 7.3
   */
  "EXIF:CameraElevationAngle"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 91702442
   * @remarks Camera serial number. DNG tag 0xc62f, writable string in IFD0.
   */
  "EXIF:CameraSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Rectangular"
   */
  "EXIF:CFALayout"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "[Red,Green][Green,Blue]"
   */
  "EXIF:CFAPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Red,Green,Blue"
   */
  "EXIF:CFAPlaneColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2 2"
   */
  "EXIF:CFARepeatPatternDim"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "EXIF:ChromaticAberrationCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "32 2048 1920 1792 1664 1664 1536 1408 1280 1152 1024 896 …96 1280"
   */
  "EXIF:ChromaticAberrationCorrParams"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "sRGB"
   * @remarks Color space of image data. EXIF mandatory tag.
   * Standard values: 1 (sRGB), 0xFFFF (Uncalibrated).
   * Non-standard values: 2 (Adobe RGB, some cameras), 0xFFFD (Wide Gamut RGB, Sony), 0xFFFE (ICC Profile, Sony).
   * Adobe RGB is typically indicated by 'Uncalibrated' with InteropIndex='R03'.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ColorSpace"?: number | string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "Y, Cr, Cb, -"
   */
  "EXIF:ComponentsConfiguration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown"
   */
  "EXIF:CompositeImage"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8 0"
   */
  "EXIF:CompositeImageCount"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1/161 1/161 1/161 1/161 1/161 0 0 1 1 undef undef undef u…f undef"
   */
  "EXIF:CompositeImageExposureTimes"?: string;

  /**
   * @frequency 🔥 ★★★★ (60%)
   * @example 90
   */
  "EXIF:CompressedBitsPerPixel"?: number;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "Unknown (0)"
   */
  "EXIF:Compression"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "Unknown (99)"
   */
  "EXIF:Contrast"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "© Chuckles McSnortypants, Inc."
   * @remarks Copyright notice for the image. MWG composite tag that reconciles EXIF:Copyright, IPTC:CopyrightNotice, and XMP-dc:Rights.
   * Writing updates all three locations to maintain MWG synchronization.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "EXIF:Copyright"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "2218:09:22 02:32:14"
   * @remarks When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.
   * Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images.
   * For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "EXIF:CreateDate"?: ExifDateTime | ExifDate | string | number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5428
   */
  "EXIF:CropBottom"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "EXIF:CropLeft"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8148
   */
  "EXIF:CropRight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "EXIF:CropTop"?: number;

  /**
   * @frequency 🔥 ★★★★ (60%)
   * @example "Unknown (5840)"
   */
  "EXIF:CustomRendered"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "2218:09:22 02:32:14"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "EXIF:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "EXIF:DefaultBlackRender"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8 8"
   */
  "EXIF:DefaultCropOrigin"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9504 6336"
   */
  "EXIF:DefaultCropSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1 1"
   */
  "EXIF:DefaultScale"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0 0 1 1"
   */
  "EXIF:DefaultUserCrop"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (0); Unknown (0)"
   */
  "EXIF:DevelopmentType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "(Binary data 0 bytes, use -b option to extract)"
   */
  "EXIF:DeviceSettingDescription"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★★☆ (50%)
   * @example 8.1319764
   */
  "EXIF:DigitalZoomRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "EXIF:DistortionCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "16 3 -3 -16 -35 -62 -94 -135 -178 -226 -274 -326 -377 -42…23 -564"
   */
  "EXIF:DistortionCorrParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1.4.0.0"
   */
  "EXIF:DNGBackwardVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1.7.0.0"
   */
  "EXIF:DNGVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ""
   */
  "EXIF:DocumentName"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 990
   */
  "EXIF:ExifImageHeight"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 999
   */
  "EXIF:ExifImageWidth"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "Version 2.2"
   * @remarks EXIF specification version (e.g., '0232' for EXIF 2.32). EXIF mandatory tag.
   * Stored as 4-byte ASCII without separators. ExifTool accepts '2.32' format when writing.
   * Some files incorrectly include null terminators which ExifTool removes.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ExifVersion"?: string;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example 0
   * @remarks Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec.
   * Signed value indicating deviation from metered exposure.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ExposureCompensation"?: number | string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example 83
   */
  "EXIF:ExposureIndex"?: number;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example "Unknown (386)"
   */
  "EXIF:ExposureMode"?: string;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example "Unknown (8112)"
   * @remarks Camera exposure mode.
   * Values: 0 (Not Defined), 1 (Manual), 2 (Program AE), 3 (Aperture-priority AE), 4 (Shutter speed priority AE), 5 (Creative/Slow speed), 6 (Action/High speed), 7 (Portrait), 8 (Landscape).
   * Value 9 (Bulb) is non-standard but used by some Canon models.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ExposureProgram"?: number | string;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "inf"
   * @remarks Shutter speed in seconds (e.g., '1/250'). Primary source for ShutterSpeed composite.
   * To write shutter speed, use this tag directly. BulbDuration takes priority in ShutterSpeed composite if present and > 0.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ExposureTime"?: string;

  /**
   * @frequency 🔥 ★★★★ (60%)
   * @example "Unknown (DSC)"
   */
  "EXIF:FileSource"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "Unknown (0xffff)"
   * @remarks Flash status and mode as bitfield. Common values:
   * 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected),
   * 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired),
   * 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction).
   * Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:Flash"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 54
   */
  "EXIF:FlashEnergy"?: number;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "0101"
   */
  "EXIF:FlashpixVersion"?: string;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example 90
   * @remarks Lens aperture as f-number (e.g., 2.8, 5.6). Primary source for Aperture composite.
   * To write aperture, use this tag - it's more intuitive than ApertureValue (which uses APEX units).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:FNumber"?: number;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "99.7 mm"
   * @remarks Lens focal length in millimeters. Actual focal length, not 35mm equivalent.
   * For 35mm equivalent, see FocalLengthIn35mmFormat or FocalLength35efl composite.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:FocalLength"?: string;

  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example "9920 mm"
   */
  "EXIF:FocalLengthIn35mmFormat"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "um"
   */
  "EXIF:FocalPlaneResolutionUnit"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 9941.7476
   */
  "EXIF:FocalPlaneXResolution"?: number;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 9846.1538
   */
  "EXIF:FocalPlaneYResolution"?: number;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "Unknown (8176)"
   */
  "EXIF:GainControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3.0585938
   */
  "EXIF:Gamma"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 99.8
   * @remarks GPS altitude in meters. Always stored as positive value; sign determined by GPSAltitudeRef.
   * Composite GPSAltitude combines this with Ref to return signed value with 'Above/Below Sea Level' text.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "EXIF:GPSAltitude"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unknown (2.2)"
   * @remarks GPS altitude reference.
   * Values: 0 (Above Sea Level), 1 (Below Sea Level), 2 (Positive Sea Level, sea-level ref), 3 (Negative Sea Level, sea-level ref).
   * Values 2-3 added in EXIF 3.0 for ellipsoidal vs sea-level reference.
   */
  "EXIF:GPSAltitudeRef"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "府中市郷土の森博物館"
   */
  "EXIF:GPSAreaInformation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:09:20"
   */
  "EXIF:GPSDateStamp"?: ExifDate | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 86.180049
   */
  "EXIF:GPSDestBearing"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown ()"
   */
  "EXIF:GPSDestBearingRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.030120052
   */
  "EXIF:GPSDestDistance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Kilometers"
   */
  "EXIF:GPSDestDistanceRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "43 deg 37' 59.61""
   */
  "EXIF:GPSDestLatitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "North"
   */
  "EXIF:GPSDestLatitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "80 deg 23' 16.31""
   */
  "EXIF:GPSDestLongitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "West"
   */
  "EXIF:GPSDestLongitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No Correction"
   */
  "EXIF:GPSDifferential"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 99.99
   */
  "EXIF:GPSDOP"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "8.937059922 m"
   */
  "EXIF:GPSHPositioningError"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 94.800416
   */
  "EXIF:GPSImgDirection"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown ()"
   */
  "EXIF:GPSImgDirectionRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 48.857748
   * @remarks GPS latitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLatitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLatitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "EXIF:GPSLatitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unknown ()"
   * @remarks GPS latitude hemisphere.
   * Valid values: 'N' (North), 'S' (South). When writing, ExifTool accepts signed numbers or direction strings.
   */
  "EXIF:GPSLatitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 2.2918888
   * @remarks GPS longitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLongitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLongitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "EXIF:GPSLongitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "West"
   * @remarks GPS longitude hemisphere.
   * Valid values: 'E' (East), 'W' (West)
   */
  "EXIF:GPSLongitudeRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "WGS84"
   */
  "EXIF:GPSMapDatum"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown ()"
   */
  "EXIF:GPSMeasureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "gps"
   */
  "EXIF:GPSProcessingMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "09"
   */
  "EXIF:GPSSatellites"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5
   * @remarks GPS speed of camera movement during capture. Units determined by GPSSpeedRef (K=km/h, M=mph, N=knots).
   * Must be paired with GPSSpeedRef for meaningful interpretation.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "EXIF:GPSSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "knots"
   * @remarks GPS speed measurement unit.
   * Valid values: 'K' (km/h), 'M' (mph), 'N' (knots)
   */
  "EXIF:GPSSpeedRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown ()"
   */
  "EXIF:GPSStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "23:59:41.001"
   * @remarks UTC time of GPS fix. When writing, date is stripped off if present, and time is adjusted to UTC if it includes a timezone
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "EXIF:GPSTimeStamp"?: ExifTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 88
   */
  "EXIF:GPSTrack"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "True North"
   */
  "EXIF:GPSTrackRef"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "50.51.48.48"
   */
  "EXIF:GPSVersionID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:HighISOMultiplierBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:HighISOMultiplierGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:HighISOMultiplierRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "iPhone SE (2nd generation)"
   */
  "EXIF:HostComputer"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "untitled"
   */
  "EXIF:ImageDescription"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example 960
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "EXIF:ImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 43991
   * @remarks Image number/identifier. XMP-aux namespace.
   * May be numeric or string with leading zeros (e.g., '0001').
   * @see https://exiftool.org/TagNames/XMP.html#aux
   */
  "EXIF:ImageNumber"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "EXIF:ImageTitle"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "fa5fdfee65f3a6e05fe7d4692b9112a7"
   * @remarks Unique identifier for the image, typically a 32-character hex string.
   * Useful for image deduplication, tracking identity across edits, and linking related files (e.g., RAW + JPEG pairs).
   * May also appear in MakerNotes and XMP.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ImageUniqueID"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example 9728
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "EXIF:ImageWidth"?: number;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "Unknown ([None])"
   */
  "EXIF:InteropIndex"?: string;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "undef undef undef"
   */
  "EXIF:InteropVersion"?: string;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example 99
   * @remarks Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values.
   * Historically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:ISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 598
   */
  "EXIF:ISOSpeed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 772608 bytes, use -b option to extract)"
   * @remarks Embedded JPEG preview extracted from RAW files. Binary data type.
   * Access via BinaryField to get raw bytes or base64 encoding.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:JpgFromRaw"?: BinaryField;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 845574
   */
  "EXIF:JpgFromRawLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 978944
   */
  "EXIF:JpgFromRawStart"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown(65535)"
   */
  "EXIF:LearningOptOutIn"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "?mm f/?"
   */
  "EXIF:LensInfo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "ZEISS"
   */
  "EXIF:LensMake"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  "EXIF:LensModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "TE003674"
   */
  "EXIF:LensSerialNumber"?: string;

  /**
   * @frequency 🔥 ★★★★ (60%)
   * @example "White Fluorescent"
   */
  "EXIF:LightSource"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 65535
   */
  "EXIF:LinearityLimitBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 65535
   */
  "EXIF:LinearityLimitGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 65535
   */
  "EXIF:LinearityLimitRed"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 5438 bytes, use -b option to extract)"
   */
  "EXIF:LinearizationTable"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:LinearResponseLimit"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "samsung"
   * @remarks Camera/device manufacturer. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:Make"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unsafe"
   */
  "EXIF:MakerNoteSafety"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 3072 bytes, use -b option to extract)"
   */
  "EXIF:MakerNoteSamsung1a"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 66 bytes, use -b option to extract)"
   */
  "EXIF:MakerNoteUnknownBinary"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "}:-"
   */
  "EXIF:MakerNoteUnknownText"?: string;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example 9.1
   */
  "EXIF:MaxApertureValue"?: number;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "Unknown (7968)"
   * @remarks Light metering mode used during capture.
   * Values: 0 (Unknown), 1 (Average), 2 (Center-weighted average), 3 (Spot), 4 (Multi-spot), 5 (Multi-segment/Pattern/Evaluative), 6 (Partial), 255 (Other).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:MeteringMode"?: number | string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "x530"
   * @remarks Camera/device model name. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:Model"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "K520C-01044"
   */
  "EXIF:Model2"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "2216:02:28 03:49:50"
   * @remarks When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate.
   * Should reflect intentional user edits, not automatic metadata updates. Different from file system modification time.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "EXIF:ModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "d4368ca3c83a7c5545d9c8384dad0c9c"
   */
  "EXIF:NewRawImageDigest"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6
   */
  "EXIF:Noise"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9.94492365862243e-05 2.63463221017446e-07 8.6474654381163…652e-07"
   */
  "EXIF:NoiseProfile"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.94999999
   */
  "EXIF:NoiseReductionApplied"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "5 100 4 4 4 200 8 8 8 400 16 16 16 800 32 32 32 1600 64 64 64"
   */
  "EXIF:NoiseReductionParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 58
   */
  "EXIF:OffsetSchema"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "-09:00"
   * @remarks Timezone offset for ModifyDate (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag.
   * Used by SubSecModifyDate composite to produce timezone-aware timestamps.
   * Writing SubSecModifyDate automatically updates this field.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:OffsetTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "-09:00"
   * @remarks Timezone offset for CreateDate (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag.
   * Used by SubSecCreateDate composite to produce timezone-aware timestamps.
   * Writing SubSecCreateDate automatically updates this field.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:OffsetTimeDigitized"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "-09:00"
   * @remarks Timezone offset for DateTimeOriginal (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag.
   * Used by SubSecDateTimeOriginal composite to produce timezone-aware timestamps.
   * Writing SubSecDateTimeOriginal automatically updates this field.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:OffsetTimeOriginal"?: string;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example 8
   * @remarks Image orientation. Standard EXIF tag 0x112 in IFD0.
   * Valid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW).
   * Most images use values 1, 3, 6, and 8.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:Orientation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 4798 bytes, use -b option to extract)"
   */
  "EXIF:OtherImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 998114
   */
  "EXIF:OtherImageLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 755
   */
  "EXIF:OtherImageStart"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "Itsa Myowna"
   */
  "EXIF:OwnerName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 2060 bytes, use -b option to extract)"
   */
  "EXIF:Padding"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Reflective"
   */
  "EXIF:PageName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0500"
   */
  "EXIF:PanasonicRawVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "EXIF:Photographer"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "YCbCr"
   */
  "EXIF:PhotometricInterpretation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Chunky"
   */
  "EXIF:PlanarConfiguration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1022
   */
  "EXIF:Pressure"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "sRGB"
   */
  "EXIF:PreviewColorSpace"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2015:06:02 09:56:01"
   */
  "EXIF:PreviewDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 621129 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "EXIF:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 92756
   */
  "EXIF:PreviewImageLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9996
   */
  "EXIF:PreviewImageStart"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 4665816 bytes, use -b option to extract)"
   */
  "EXIF:PreviewTIFF"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0.64 0.33 0.3 0.6 0.15 0.06"
   */
  "EXIF:PrimaryChromaticities"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "EXIF:ProcessingSoftware"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Allow Copying"
   */
  "EXIF:ProfileEmbedPolicy"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 3158080 bytes, use -b option to extract)"
   */
  "EXIF:ProfileGainTableMap"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "LEICA M10-R            "
   */
  "EXIF:ProfileName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 7155 bytes, use -b option to extract)"
   */
  "EXIF:ProfileToneCurve"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3
   * @remarks Star rating for the image. MWG composite tag from XMP-xmp:Rating.
   * Valid values: -1 (rejected), 0 (unrated), 1-5 (star rating)
   * Note: Rating may appear in EXIF but that's non-standard per MWG. Only XMP writes are supported.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "EXIF:Rating"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 50
   * @remarks Microsoft-specific percentage rating (1-99).
   * @see https://exiftool.org/forum/index.php?topic=3567.msg16210#msg16210
   */
  "EXIF:RatingPercent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 928768
   */
  "EXIF:RawDataOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "D400182B000F01E107690C5000000000"
   */
  "EXIF:RawDataUniqueID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "EXIF:RawFormat"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3 1440 1440"
   */
  "EXIF:RawImageSegmentation"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example 800
   */
  "EXIF:RecommendedExposureIndex"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0 255 128 255 128 255"
   */
  "EXIF:ReferenceBlackWhite"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "JPEG Exif Ver 2.2"
   */
  "EXIF:RelatedImageFileFormat"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 960
   */
  "EXIF:RelatedImageHeight"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 800
   */
  "EXIF:RelatedImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "xxx.avi"
   */
  "EXIF:RelatedSoundFile"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "inches"
   */
  "EXIF:ResolutionUnit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 964
   */
  "EXIF:RowsPerStrip"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 3
   */
  "EXIF:SamplesPerPixel"?: number;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "Unknown (8)"
   */
  "EXIF:Saturation"?: string;

  /**
   * @frequency 🔥 ★★★★ (70%)
   * @example "Unknown (8160)"
   */
  "EXIF:SceneCaptureType"?: string;

  /**
   * @frequency 🔥 ★★★★ (50%)
   * @example "Unknown (9)"
   */
  "EXIF:SceneType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "urn:com:apple:photo:2020:aux:semanticskymatte"
   */
  "EXIF:SemanticName"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "Unknown (74)"
   */
  "EXIF:SensingMethod"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "Unknown"
   */
  "EXIF:SensitivityType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5428
   */
  "EXIF:SensorBottomBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5432
   */
  "EXIF:SensorHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "EXIF:SensorLeftBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8148
   */
  "EXIF:SensorRightBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "EXIF:SensorTopBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8152
   */
  "EXIF:SensorWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "d260b89c2e571693cd1019061f946e48"
   */
  "EXIF:SerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:ShadowScale"?: number;

  /**
   * @frequency 🔥 ★★★☆ (50%)
   * @example "Unknown (7824)"
   */
  "EXIF:Sharpness"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "1/999963365"
   */
  "EXIF:ShutterSpeedValue"?: string;

  /**
   * @frequency 🔥 ★★★★ (60%)
   * @example "https://PhotoStructure.com/"
   */
  "EXIF:Software"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "9504 6336"
   */
  "EXIF:SonyCropSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "32 20"
   */
  "EXIF:SonyCropTopLeft"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sony Uncompressed 14-bit RAW"
   */
  "EXIF:SonyRawFileType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "9568 6376"
   */
  "EXIF:SonyRawImageSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8000 10400 12900 14100"
   */
  "EXIF:SonyToneCurve"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 668058300
   */
  "EXIF:SpatialFrequencyResponse"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4
   */
  "EXIF:SRawType"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 800
   */
  "EXIF:StandardOutputSensitivity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9600
   */
  "EXIF:StripByteCounts"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 986
   */
  "EXIF:StripOffsets"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Semantic Mask"
   */
  "EXIF:SubfileType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "967 967 1425 851"
   */
  "EXIF:SubjectArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "99.99 m"
   */
  "EXIF:SubjectDistance"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "Unknown (4400)"
   */
  "EXIF:SubjectDistanceRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "EXIF:SubjectLocation"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 996
   */
  "EXIF:SubSecTime"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 996
   */
  "EXIF:SubSecTimeDigitized"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 999
   */
  "EXIF:SubSecTimeOriginal"?: number;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example "(Binary data 10202 bytes, use -b option to extract)"
   * @remarks Embedded thumbnail image data. Binary data type.
   * Writable for updating existing thumbnails, but cannot create or delete thumbnails.
   */
  "EXIF:ThumbnailImage"?: BinaryField;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example 9998
   * @remarks Size in bytes of the embedded JPEG thumbnail.
   * Useful for checking thumbnail availability without extracting binary data.
   */
  "EXIF:ThumbnailLength"?: number;

  /**
   * @frequency 🔥 ★★★★ (90%)
   * @example 998
   * @remarks Byte offset of the embedded JPEG thumbnail within the file.
   * Used with ThumbnailLength to locate thumbnail data.
   */
  "EXIF:ThumbnailOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 57816 bytes, use -b option to extract)"
   * @remarks Embedded TIFF thumbnail image data. Composite tag rebuilt from component EXIF tags.
   * Read-only - derived from SubfileType, Compression, ImageWidth, ImageHeight, etc.
   */
  "EXIF:ThumbnailTIFF"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 447 bytes, use -b option to extract)"
   */
  "EXIF:TileByteCounts"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 80
   */
  "EXIF:TileLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 508 bytes, use -b option to extract)"
   */
  "EXIF:TileOffsets"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6080
   */
  "EXIF:TileWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "EXIF:TimeZoneOffset"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 3636 bytes, use -b option to extract)"
   */
  "EXIF:TransferFunction"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "motorola XT1254"
   */
  "EXIF:UniqueCameraModel"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "This is a comment."
   */
  "EXIF:UserComment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "EXIF:VignettingCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "16 0 96 320 704 1216 1856 2656 3712 4928 6240 7552 8768 9…6 12896"
   */
  "EXIF:VignettingCorrParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.1
   */
  "EXIF:WaterDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 538
   */
  "EXIF:WBBlueLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 265
   */
  "EXIF:WBGreenLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 737
   */
  "EXIF:WBRedLevel"?: number;

  /**
   * @frequency 🔥 ★★★★ (80%)
   * @example "Unknown (65535)"
   * @remarks White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual).
   * MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc.
   * EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "EXIF:WhiteBalance"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 65535
   */
  "EXIF:WhiteLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0.4234 0.399"
   */
  "EXIF:WhitePoint"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Redmi 9T"
   */
  "EXIF:XiaomiModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Norm De Plume"
   */
  "EXIF:XPAuthor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "This is a comment."
   */
  "EXIF:XPComment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "v01.40.0002;0.0.1;v1.0.0"
   */
  "EXIF:XPKeywords"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "image thermique, thermal image"
   */
  "EXIF:XPSubject"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "楆慮⁬敤琠牡敤攠⁭汉慨䈠汥Ⅱ"
   */
  "EXIF:XPTitle"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 99
   */
  "EXIF:XResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0.299 0.587 0.114"
   */
  "EXIF:YCbCrCoefficients"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "Unknown (0)"
   */
  "EXIF:YCbCrPositioning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "YCbCr4:4:0 (1 2)"
   */
  "EXIF:YCbCrSubSampling"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 99
   */
  "EXIF:YResolution"?: number;
}

/**
 * The `ExifTool:` fields of {@link GroupedTags}.
 *
 * These tags are added by `exiftool`.
 */
export interface ExifToolGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "File is empty"
   */
  "ExifTool:Error"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "13.63"
   */
  "ExifTool:ExifToolVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unrecognized IPTC record 0 (ignored)"
   */
  "ExifTool:Warning"?: string;
}

/**
 * The `File:` fields of {@link GroupedTags}.
 *
 * These tags are not metadata fields, but are intrinsic to the content of a
 * given file. ExifTool can't write to many of these tags.
 */
export interface FileGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 24
   */
  "File:BitDepth"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 8
   */
  "File:BitsPerSample"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Windows V3"
   */
  "File:BMPVersion"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 3
   */
  "File:ColorComponents"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "This is a comment."
   * @remarks Comment text. JPEG COM segment, GIF comment, or other file-level comment.
   * Not an XMP tag despite common confusion.
   */
  "File:Comment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "MJPG"
   */
  "File:Compression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "ff5cfd18caabb797e0a7a4bb378cde2f"
   */
  "File:CurrentIPTCDigest"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "/home/username/pictures"
   */
  "File:Directory"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "Progressive DCT, Huffman coding"
   */
  "File:EncodingProcess"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "Little-endian (Intel, II)"
   */
  "File:ExifByteOrder"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "2026:11:12 23:18:46Z"
   * @remarks File system access date/time. Not stored metadata - file system property.
   * Writable on some systems. Changes when file is read.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileAccessDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks File system creation date/time. Not stored metadata - file system property.
   * Writable on some systems. Different from image capture date.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileCreateDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "2026:11:12 23:18:19Z"
   * @remarks File system inode change date/time (Unix/Linux). Not stored metadata - file system property.
   * Changes when file metadata (permissions, ownership) or content changes. Not available on Windows.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileInodeChangeDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "2026:03:14 01:38:40Z"
   * @remarks File system modification date/time. Not stored metadata - file system property.
   * Writable. Different from EXIF ModifyDate which tracks user edits.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "zv_e10m2.jpg"
   * @remarks Name of the file. Not stored metadata - intrinsic file property.
   * Writable: can rename files. May include full path to set Directory simultaneously.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileName"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "-rwxrwxr-x"
   */
  "File:FilePermissions"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "990 bytes"
   * @remarks Size of the file. Not stored metadata - intrinsic file property.
   * Read-only. Uses SI prefixes by default (1 kB = 1000 bytes).
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileSize"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "RW2"
   * @remarks File type determined from file content, not extension. Not stored metadata - intrinsic file property.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileType"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "rw2"
   * @remarks Recommended file extension for this file type. Not stored metadata - intrinsic file property.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:FileTypeExtension"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks MD5 hash of the actual image data (excluding metadata). Computed by ExifTool, not stored in file.
   * Useful for detecting identical images with different metadata.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:ImageDataMD5"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 8736
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:ImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2764800
   */
  "File:ImageLength"?: number;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example 9504
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:ImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Little-endian (Intel, II)"
   */
  "File:MakerNoteByteOrder"?: string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "video/x-msvideo"
   * @remarks MIME type of the file. Not stored metadata - intrinsic file property.
   * Read-only, determined from file content.
   * @see https://exiftool.org/TagNames/File.html
   */
  "File:MIMEType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Use BitDepth"
   */
  "File:NumColors"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "All"
   */
  "File:NumImportantColors"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "File:PixelsPerMeterX"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "File:PixelsPerMeterY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "File:Planes"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "(Binary data 315546 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "File:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★★★ (100%)
   * @example "YCbCr4:4:4 (1 1)"
   */
  "File:YCbCrSubSampling"?: string;
}

/**
 * The `FlashPix:` fields of {@link GroupedTags}.
 *
 * @see https://exiftool.org/TagNames/FlashPix.html
 */
export interface FlashPixGroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 18 bytes, use -b option to extract)"
   */
  "FlashPix:AudioStream"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unicode UTF-16, little endian"
   */
  "FlashPix:CodePage"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Picoss"
   */
  "FlashPix:CreatingApplication"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "30020010-C06F-D011-BD01-00609719A180"
   */
  "FlashPix:ExtensionClassID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2003:03:29 17:47:50"
   */
  "FlashPix:ExtensionCreateDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Presized image for LCD display"
   */
  "FlashPix:ExtensionDescription"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2003:03:29 17:47:50"
   */
  "FlashPix:ExtensionModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Screen nail"
   */
  "FlashPix:ExtensionName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Invalidated By Modification"
   */
  "FlashPix:ExtensionPersistence"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example "(Binary data 46145 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "FlashPix:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 960
   */
  "FlashPix:PreviewImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 640
   */
  "FlashPix:PreviewImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 46285 bytes, use -b option to extract)"
   */
  "FlashPix:ScreenNail"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1
   */
  "FlashPix:UsedExtensionNumbers"?: number;
}

/**
 * The `IPTC:` fields of {@link GroupedTags}.
 *
 * @see https://exiftool.org/TagNames/IPTC.html
 */
export interface IPTCGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "UTF8"
   */
  "IPTC:CodedCharacterSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:08:23"
   */
  "IPTC:DateCreated"?: ExifDateTime | string | ExifDate;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:02:19"
   */
  "IPTC:DigitalCreationDate"?: ExifDate | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "21:12:40"
   */
  "IPTC:DigitalCreationTime"?: ExifTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4
   */
  "IPTC:EnvelopeRecordVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["red","car"]
   * @remarks Searchable subject terms for image content. MWG composite tag that reconciles IPTC:Keywords and XMP-dc:Subject.
   * Multi-value fields use semicolon-space ('; ') separators when represented as string.
   * IPTC constraint: max 64 characters per keyword. Character encoding depends on IPTC:CodedCharacterSet; UTF8 recommended.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "IPTC:Keywords"?: string | string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "23:47:07+01:00"
   */
  "IPTC:TimeCreated"?: ExifTime | string;
}

/**
 * The `JFIF:` fields of {@link GroupedTags}.
 */
export interface JFIFGroupedTags {
  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 1.02
   */
  "JFIF:JFIFVersion"?: number;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "inches"
   */
  "JFIF:ResolutionUnit"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 118
   */
  "JFIF:ThumbnailHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 18880 bytes, use -b option to extract)"
   * @remarks Embedded thumbnail image data. Binary data type.
   * Writable for updating existing thumbnails, but cannot create or delete thumbnails.
   */
  "JFIF:ThumbnailImage"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 55578 bytes, use -b option to extract)"
   * @remarks Embedded TIFF thumbnail image data. Composite tag rebuilt from component EXIF tags.
   * Read-only - derived from SubfileType, Compression, ImageWidth, ImageHeight, etc.
   */
  "JFIF:ThumbnailTIFF"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 157
   */
  "JFIF:ThumbnailWidth"?: number;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 99
   */
  "JFIF:XResolution"?: number;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 99
   */
  "JFIF:YResolution"?: number;
}

/**
 * The `JPEG:` fields of {@link GroupedTags}.
 */
export interface JPEGGroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "urn:iso:std:iso:ts:21496:-1"
   */
  "JPEG:UniformResourceName"?: string;
}

/**
 * The `JSON:` fields of {@link GroupedTags}.
 */
export interface JSONGroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "JSON:AIScene"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 66048
   */
  "JSON:FilterId"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "off"
   */
  "JSON:Hdr"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example false
   */
  "JSON:Mirror"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 36864
   */
  "JSON:OpMode"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "rear"
   */
  "JSON:SensorType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "JSON:ZoomMultiple"?: number;
}

/**
 * The `JUMBF:` fields of {@link GroupedTags}.
 */
export interface JUMBFGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"action":"c2pa.created","description":"Created by Pixel …pture"}
   */
  "JUMBF:Actions"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "sha256"
   */
  "JUMBF:Alg"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"start":6,"length":34744},{"start":34772,"length":1594}…:7283}]
   */
  "JUMBF:Exclusions"?: Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 32 bytes, use -b option to extract)"
   */
  "JUMBF:Hash"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "d5e2bea0-b14c-b11e-2ff0-4ee721b47a1d"
   */
  "JUMBF:InstanceID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1526 bytes, use -b option to extract)"
   */
  "JUMBF:Item0"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"sigTst2":{"tstTokens":[{"val":{"_ctor":"BinaryField","b…act)"}}
   */
  "JUMBF:Item1"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 64 bytes, use -b option to extract)"
   */
  "JUMBF:Item3"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "c2pa"
   */
  "JUMBF:JUMDLabel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(c2pa)-0011-0010-800000aa00389b71"
   */
  "JUMBF:JUMDType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 22 bytes, use -b option to extract)"
   */
  "JUMBF:Pad"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1 bytes, use -b option to extract)"
   */
  "JUMBF:Pad2"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"location":{"byteOffset":0,"length":3990153},"hashAsser…:true}]
   */
  "JUMBF:Parts"?: Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "self#jumbf=c2pa.signature"
   */
  "JUMBF:Signature"?: string;
}

/**
 * The `MakerNotes:` fields of {@link GroupedTags}.
 */
export interface MakerNotesGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "MakerNotes:AccelerationTracking"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1.006910168 -0.02202510258 -0.04414990859"
   */
  "MakerNotes:AccelerationVector"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "358.3 11.2"
   */
  "MakerNotes:Accelerometer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9
   * @remarks Accelerometer X-axis reading. Panasonic: positive is acceleration to the left.
   * Also found in DJI and Lytro cameras. Used for motion/orientation detection.
   */
  "MakerNotes:AccelerometerX"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 80
   * @remarks Accelerometer Y-axis reading. Panasonic: positive is acceleration backwards.
   * Also found in DJI and Lytro cameras. Used for motion/orientation detection.
   */
  "MakerNotes:AccelerometerY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 56
   * @remarks Accelerometer Z-axis reading. Panasonic: positive is acceleration upward.
   * Also found in DJI and Lytro cameras. Used for motion/orientation detection.
   */
  "MakerNotes:AccelerometerZ"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "00:00"
   */
  "MakerNotes:AccessorySerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "NO-ACCESSORY"
   */
  "MakerNotes:AccessoryType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Focus Priority"
   */
  "MakerNotes:ActionInAFCCont"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ActionPriority"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.0"
   */
  "MakerNotes:ActualCompensation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:AddAspectRatioInfo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Disable"
   */
  "MakerNotes:AddIPTCInformation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:AddOriginalDecisionData"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:AddOriginalDescisionData"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  "MakerNotes:ADJDebugInfo"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "X3F Setting Mode"
   */
  "MakerNotes:AdjustmentMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ADLBracketingStep"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ADLBracketingType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Toy Camera"
   */
  "MakerNotes:AdvancedFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9
   */
  "MakerNotes:AdvancedSceneType"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.9
   */
  "MakerNotes:AEAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:AEApertureSteps"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 90
   */
  "MakerNotes:AEAverage"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:AEBAutoCancel"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 0
   */
  "MakerNotes:AEBBracketValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE Bracketing Disabled"
   */
  "MakerNotes:AEBracketingSteps"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0,-,+"
   */
  "MakerNotes:AEBSequence"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0,-,+/Enabled"
   */
  "MakerNotes:AEBSequenceAutoCancel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "7 shots"
   */
  "MakerNotes:AEBShotCount"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.5
   */
  "MakerNotes:AEBXv"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 256 bytes, use -b option to extract)"
   */
  "MakerNotes:AEDebugInfo"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/965"
   */
  "MakerNotes:AEExposureTime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 4096 bytes, use -b option to extract)"
   */
  "MakerNotes:AEHistogramInfo"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Hold"
   */
  "MakerNotes:AELButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Indicated"
   */
  "MakerNotes:AELExposureIndicator"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 4096 bytes, use -b option to extract)"
   */
  "MakerNotes:AELiveViewHistogramInfo"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 2048 bytes, use -b option to extract)"
   */
  "MakerNotes:AELiveViewLocalHistogram"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 2048 bytes, use -b option to extract)"
   */
  "MakerNotes:AELocalHistogram"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On"
   */
  "MakerNotes:AELock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF Lock Only"
   */
  "MakerNotes:AELockButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AELockButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Evaluative"
   */
  "MakerNotes:AELockMeterModeAfterFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5.7
   */
  "MakerNotes:AEMaxAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "[2], Spot"
   */
  "MakerNotes:AEMeteringMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "9.8 9.4 7.9 8.6 9.2 8.5 9.4 8.9 8.1 8.6 8.0 10.4 8.5 10.6…9.5 9.5"
   */
  "MakerNotes:AEMeteringSegments"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable; 0; 8; 0"
   */
  "MakerNotes:AEMicroadjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 38
   */
  "MakerNotes:AEMinAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/7723"
   */
  "MakerNotes:AEMinExposureTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sv or Green Mode"
   */
  "MakerNotes:AEProgramMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "Normal AE"
   */
  "MakerNotes:AESetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:AEStable"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 89
   */
  "MakerNotes:AETarget"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Daylight Fluorescent"
   */
  "MakerNotes:AEWhiteBalance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:AEXv"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example [0,"n/a"]
   */
  "MakerNotes:AFAccelDecelTracking"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Shutter/AF-On"
   */
  "MakerNotes:AFActivation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:AFAdjustment"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Metering start"
   */
  "MakerNotes:AFAndMeteringButtons"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5.8
   */
  "MakerNotes:AFAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 840
   */
  "MakerNotes:AFAreaHeight"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "994 18 18 18 18 18 18 18 18"
   */
  "MakerNotes:AFAreaHeights"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:AFAreaIllumination"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "Zone AF"
   */
  "MakerNotes:AFAreaMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Zone"
   */
  "MakerNotes:AFAreaModeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:AFAreaPointSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "none"
   */
  "MakerNotes:AFAreas"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Main Dial"
   */
  "MakerNotes:AFAreaSelectionMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "AF area selection button"
   */
  "MakerNotes:AFAreaSelectMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:AFAreaSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 996
   */
  "MakerNotes:AFAreaWidth"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "994 18 18 18 18 18 18 18 18"
   */
  "MakerNotes:AFAreaWidths"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5382
   */
  "MakerNotes:AFAreaXPosition"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example "999 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  "MakerNotes:AFAreaXPositions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 744
   */
  "MakerNotes:AFAreaYPosition"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example "950 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  "MakerNotes:AFAreaYPositions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:AFAreaZoneSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Only ext. flash emits/Fires"
   */
  "MakerNotes:AFAssist"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (4)"
   */
  "MakerNotes:AFAssistBeam"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (5)"
   */
  "MakerNotes:AFAssistLamp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:AFButtonPressed"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:AFCHold"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:AFConfidence"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:AFConfigTool"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:AFCoordinatesAvailable"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Type 1"
   */
  "MakerNotes:AFCPointTracking"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:AFCSensitivity"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 256 bytes, use -b option to extract)"
   */
  "MakerNotes:AFDebugInfo"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9
   */
  "MakerNotes:AFDefocus"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Head, Body, Face"
   */
  "MakerNotes:AFDetectedParts"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Person"
   */
  "MakerNotes:AFDetectedSubject"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Phase Detect"
   */
  "MakerNotes:AFDetectionMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Quick mode"
   */
  "MakerNotes:AFDuringLiveView"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:AFEyeUsed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On (2)"
   */
  "MakerNotes:AFFineTune"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 0
   */
  "MakerNotes:AFFineTuneAdj"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:AFFineTuneAdjTele"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:AFFineTuneIndex"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "297 224 47 33"
   */
  "MakerNotes:AFFocusArea"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "4770 mm"
   */
  "MakerNotes:AFFocusDistance"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 14
   */
  "MakerNotes:AFFocusPosition"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "720x480"
   */
  "MakerNotes:AFFrameSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:AFIlluminator"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 88
   */
  "MakerNotes:AFImageHeight"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 8688
   */
  "MakerNotes:AFImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0402"
   */
  "MakerNotes:AFInfo2Version"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "90 ms"
   */
  "MakerNotes:AFIntegrationTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 96
   */
  "MakerNotes:AFMeasuredDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:AFMicroAdj"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown (3)"
   */
  "MakerNotes:AFMicroAdjMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "MakerNotes:AFMicroAdjRegisteredLenses"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable; 0; 0; 0; 84"
   */
  "MakerNotes:AFMicroadjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:AFMicroAdjValue"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Zone"
   */
  "MakerNotes:AFMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:AFModeRestrictions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:AFOnAELockButtonSwitch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF-On"
   */
  "MakerNotes:AFOnButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "98 1 31"
   */
  "MakerNotes:AFPerformance"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Upper-right"
   */
  "MakerNotes:AFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:AFPointActivationArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:AFPointAreaExpansion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Left (vertical)"
   */
  "MakerNotes:AFPointAtShutterRelease"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Control-direct:disable/Main:enable"
   */
  "MakerNotes:AFPointAutoSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:AFPointBrightness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 897
   */
  "MakerNotes:AFPointDetails"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Selected (pre-AF, focused)"
   */
  "MakerNotes:AFPointDisplayDuringFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On in Continuous Shooting and Manual Focusing"
   */
  "MakerNotes:AFPointIllumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Left (vertical)"
   */
  "MakerNotes:AFPointInFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "[2]"
   */
  "MakerNotes:AFPointMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "none"
   */
  "MakerNotes:AFPointPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Center"
   */
  "MakerNotes:AFPointRegistration"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Center"
   */
  "MakerNotes:AFPoints"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Use Half"
   */
  "MakerNotes:AFPointSel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "n/a"
   */
  "MakerNotes:AFPointSelected"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "H=AF+Main/V=AF+Command"
   */
  "MakerNotes:AFPointSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (1046 1046)"
   */
  "MakerNotes:AFPointSelectionMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Lower-right"
   */
  "MakerNotes:AFPointSetting"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "Upper-right, Top"
   */
  "MakerNotes:AFPointsInFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "C6 (C6)"
   */
  "MakerNotes:AFPointsInFocus1D"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Center"
   */
  "MakerNotes:AFPointsInFocus5D"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9/Active AF point"
   */
  "MakerNotes:AFPointSpotMetering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 9
   */
  "MakerNotes:AFPointsSelected"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 7
   */
  "MakerNotes:AFPointsSpecial"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Top"
   */
  "MakerNotes:AFPointsUsed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:AFPointSwitching"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 903
   */
  "MakerNotes:AFPredictor"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:AFTracking"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5077 4055 1756 1394"
   */
  "MakerNotes:AFTrackingArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["+0.0 ms: raw centre -124 +817"]
   */
  "MakerNotes:AFTrackingHistory"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example [0,"n/a"]
   */
  "MakerNotes:AFTrackingSensitivity"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AFTrackingTarget"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "79-point"
   */
  "MakerNotes:AFType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:AFWithShutter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Shooting not possible without focus"
   */
  "MakerNotes:AIServoContinuousShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Release Priority"
   */
  "MakerNotes:AIServoFirstImage"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (2)"
   */
  "MakerNotes:AIServoFirstImagePriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1: AF, 2: Tracking"
   */
  "MakerNotes:AIServoImagePriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Release High Priority"
   */
  "MakerNotes:AIServoSecondImage"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (2)"
   */
  "MakerNotes:AIServoSecondImagePriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Main focus point priority"
   */
  "MakerNotes:AIServoTrackingMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:AIServoTrackingSensitivity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:AISubjectTrackingMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "91 m"
   */
  "MakerNotes:Altitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Standard"
   */
  "MakerNotes:AmbienceSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "40 C"
   */
  "MakerNotes:AmbientTemperature"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "95 F"
   */
  "MakerNotes:AmbientTemperatureFahrenheit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "google/tokay/tokay:16/BP3A.250905.014/13873947:user/release-keys"
   */
  "MakerNotes:AndroidRelease"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:AntiFlicker"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 2000
   */
  "MakerNotes:AntiShockWaitingTime"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6.7
   * @remarks Calculated aperture value derived from FNumber or ApertureValue.
   * Read-only composite tag. To write, modify FNumber or ApertureValue instead.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:Aperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:ApertureLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Manual: Closed 64; Open 1; Auto: Closed 31; Open 6.3"
   */
  "MakerNotes:ApertureRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Prohibited"
   */
  "MakerNotes:ApertureRingUse"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9.1
   */
  "MakerNotes:ApertureSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8.6
   * @remarks Lens aperture in APEX units. Secondary source for Aperture composite (FNumber takes priority).
   * Formula: ApertureValue = 2 × log₂(FNumber). To write aperture, prefer FNumber as it's more intuitive.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "com.google.android.GoogleCamera"
   */
  "MakerNotes:Application"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ApplySettingsToLiveView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable; 1; 2; 1; 128; 48; 0; 1"
   */
  "MakerNotes:ApplyShootingMeteringMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:ApproximateFNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9.8.102.748116395.16"
   */
  "MakerNotes:AppVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Soft Focus; 1280; 0; 0"
   */
  "MakerNotes:ArtFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off; 0; 0; Partial Color 0; No Effect; 0; No Color Filter…0; 0; 0"
   */
  "MakerNotes:ArtFilterEffect"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Arturo DeImage"
   * @remarks Image creator/photographer name. ExifTool trims trailing whitespace.
   * When MWG module is loaded, this becomes a list-type tag synchronized with XMP-dc:Creator and IPTC:By-line.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:Artist"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (8305)"
   */
  "MakerNotes:ArtMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0 0 0"
   */
  "MakerNotes:ArtModeParameters"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0 192 4607 3263"
   */
  "MakerNotes:AspectFrame"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "Unknown (942874672)"
   */
  "MakerNotes:AspectRatio"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto Bracketing"
   */
  "MakerNotes:AssignBktButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "LCD brightness"
   */
  "MakerNotes:AssignFuncButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignMovieFunc1ButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignMovieFunc2Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignMoviePreviewButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Shutter/Aperture Lock"
   */
  "MakerNotes:AssignMovieRecordButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignMovieRecordButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE/AF Lock"
   */
  "MakerNotes:AssignMovieSubselector"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignMovieSubselectorPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AssignRemoteFnButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Select Home Position"
   */
  "MakerNotes:AssistButtonFunction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "No"
   */
  "MakerNotes:Audio"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:AudioCompression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On-Shot AF only"
   */
  "MakerNotes:AutoAFPointColorTracking"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Enable"
   */
  "MakerNotes:AutoAFPointSelEOSiTRAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:AutoAperture"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:AutoBracket"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "On"
   */
  "MakerNotes:AutoBracketing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Flash/Speed"
   */
  "MakerNotes:AutoBracketingMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE Only"
   */
  "MakerNotes:AutoBracketingSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Flash/Speed"
   */
  "MakerNotes:AutoBracketModeM"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0,-,+"
   */
  "MakerNotes:AutoBracketOrder"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Exposure"
   */
  "MakerNotes:AutoBracketSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:AutoDistortionControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "400%"
   */
  "MakerNotes:AutoDynamicRange"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "On"
   */
  "MakerNotes:AutoExposureBracketing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Subject and Background"
   */
  "MakerNotes:AutoFlashISOSensitivity"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "No Limit"
   */
  "MakerNotes:AutoFocusModeRestrictions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:AutoFP"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 96
   */
  "MakerNotes:AutoISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1600
   */
  "MakerNotes:AutoISOMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/30 s"
   */
  "MakerNotes:AutoISOMinShutterSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Standard"
   */
  "MakerNotes:AutoLightingOptimizer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "No"
   */
  "MakerNotes:AutoPortraitFramed"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "Rotate 90 CW"
   */
  "MakerNotes:AutoRotate"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:AutoSceneLighting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:AutoSceneMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:AutoSceneSubject"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:AuxiliaryLens"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6.7
   */
  "MakerNotes:AvApertureSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "513 513 513 513"
   */
  "MakerNotes:AverageBlackLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.875
   */
  "MakerNotes:AverageLV"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable"
   */
  "MakerNotes:AvSettingWithoutLens"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "99:99:99 00:00:00"
   */
  "MakerNotes:BabyAge"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example ""
   */
  "MakerNotes:BabyName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "A0E3S7000218RC"
   */
  "MakerNotes:Barcode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0100"
   */
  "MakerNotes:BarometerInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:BaseExposureCompensation"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 800
   */
  "MakerNotes:BaseISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "n/a"
   */
  "MakerNotes:BatteryLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "MB-D12 First"
   */
  "MakerNotes:BatteryOrder"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sufficient Power Remaining"
   */
  "MakerNotes:BatteryState"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "50.6 C"
   */
  "MakerNotes:BatteryTemperature"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "NB-13L"
   */
  "MakerNotes:BatteryType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8.52 V"
   */
  "MakerNotes:BatteryVoltage"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (0)"
   */
  "MakerNotes:BayerPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:Beep"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:BeepPitch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:BeepVolume"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Sports CS"
   */
  "MakerNotes:BestShotMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:BitDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "94 95 93 93"
   */
  "MakerNotes:BlackLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "131 128 131 128"
   */
  "MakerNotes:BlackLevels"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 2209
   */
  "MakerNotes:BlackMaskBottomBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 14
   */
  "MakerNotes:BlackMaskLeftBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 55
   */
  "MakerNotes:BlackMaskRightBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 162
   */
  "MakerNotes:BlackMaskTopBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "7 104 106 6"
   */
  "MakerNotes:BlackPoint"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:BleachBypassToning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 46
   */
  "MakerNotes:BlueBalance"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5C"
   */
  "MakerNotes:BlueGain"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off; 0; 0; 0"
   */
  "MakerNotes:BlurControl"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "None"
   */
  "MakerNotes:BlurWarning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "28 C"
   */
  "MakerNotes:BoardTemperature"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 165
   */
  "MakerNotes:BodyBatteryADLoad"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 199
   */
  "MakerNotes:BodyBatteryADNoLoad"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 80
   */
  "MakerNotes:BodyBatteryPercent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Running Low"
   */
  "MakerNotes:BodyBatteryState"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "7.77 V"
   */
  "MakerNotes:BodyBatteryVoltage"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "RS1 :V01500000 "
   */
  "MakerNotes:BodyFirmware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 81
   */
  "MakerNotes:BodyFirmwareVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "SID:14101105   "
   */
  "MakerNotes:BodySerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:BracketIncrement"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Disable"
   */
  "MakerNotes:BracketingBurstOptions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:BracketMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disabled"
   */
  "MakerNotes:BracketProgram"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0 0"
   */
  "MakerNotes:BracketSequence"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE/Flash"
   */
  "MakerNotes:BracketSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "No Bracket"
   * @remarks Panasonic exposure bracketing configuration.
   * Values: 'No Bracket', '3 Images, Sequence 0/-/+', '3 Images, Sequence -/0/+',
   * '5 Images, Sequence 0/-/+', '5 Images, Sequence -/0/+', '7 Images, Sequence 0/-/+', '7 Images, Sequence -/0/+'.
   */
  "MakerNotes:BracketSettings"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 0
   */
  "MakerNotes:BracketShotNumber"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (429458713)"
   */
  "MakerNotes:BracketStep"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 12
   */
  "MakerNotes:BracketValue"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example 9.25
   */
  "MakerNotes:Brightness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9.8335938
   */
  "MakerNotes:BrightnessValue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "SU6-7"
   */
  "MakerNotes:BuildNumber"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 0
   */
  "MakerNotes:BulbDuration"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unlimited"
   */
  "MakerNotes:BurstMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:BurstShot"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9
   */
  "MakerNotes:BurstSpeed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "460727F2-20CF-4031-957B-7E04D567DF1F"
   */
  "MakerNotes:BurstUUID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal (enable)"
   */
  "MakerNotes:ButtonFunctionControlOff"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:BWFilter"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:BWGrainEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "On"
   */
  "MakerNotes:BWMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "666 500 4668 3000"
   */
  "MakerNotes:CAFArea"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "7x7"
   */
  "MakerNotes:CAFGridSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(none)"
   */
  "MakerNotes:CAFPointsInFocus"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "9,10,11,12,13,16,17,18,19,20,23,24,25,26,27"
   */
  "MakerNotes:CAFPointsSelected"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Starting calibration file for SD14F13_Rev3; S/N C75_00001…8:16:34"
   */
  "MakerNotes:Calibration"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2216/02/28 03:49:48"
   */
  "MakerNotes:CameraDateTime"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "h Company Ltd."
   */
  "MakerNotes:CameraID"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:CameraISO"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "DCS Pro 14N"
   */
  "MakerNotes:CameraModel"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example "Unknown (155)"
   */
  "MakerNotes:CameraOrientation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 8412 bytes, use -b option to extract)"
   */
  "MakerNotes:CameraParameters"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "User Defined 3"
   */
  "MakerNotes:CameraPictureStyle"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example -90
   */
  "MakerNotes:CameraPitch"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.00"
   */
  "MakerNotes:CameraRoll"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "0100"
   */
  "MakerNotes:CameraSettingsVersion"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "uD800,S800"
   */
  "MakerNotes:CameraType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+90.80"
   */
  "MakerNotes:CameraYaw"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (-1)"
   */
  "MakerNotes:CanonExposureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Full automatic mode"
   */
  "MakerNotes:CanonFileDescription"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3794598
   */
  "MakerNotes:CanonFileLength"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Firmware version 1.00"
   */
  "MakerNotes:CanonFirmwareVersion"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:CanonFlashMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 768
   */
  "MakerNotes:CanonImageHeight"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:CanonImageSize"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "PIC:DC50 JPEG"
   */
  "MakerNotes:CanonImageType"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 8688
   */
  "MakerNotes:CanonImageWidth"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "XH A1S"
   */
  "MakerNotes:CanonModelID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:CardShutterLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:CaseAutoSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "People"
   */
  "MakerNotes:Categories"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "MakerNotes:CCDBoardVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Interlaced"
   */
  "MakerNotes:CCDScanMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CCDSensitivity"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CCDVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal Zone"
   */
  "MakerNotes:CenterAFArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal Zone"
   */
  "MakerNotes:CenterFocusPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Standard"
   */
  "MakerNotes:CenterWeightedAreaSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9 fps"
   */
  "MakerNotes:CHModeShootingSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ChromaticAberrationCorr"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ChromaticAberrationCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "978 820 698 610 558 558 558 492 418 388 364 328 280 218 1…320 428"
   */
  "MakerNotes:ChromaticAberrationCorrParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:ChromaticAberrationSetting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.500"
   */
  "MakerNotes:ChrominanceNoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "San Francisco"
   */
  "MakerNotes:City2"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 4
   */
  "MakerNotes:Clarity"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ClarityControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:ClearRetouch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "6 fps"
   */
  "MakerNotes:CLModeShootingSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sub-command Dial"
   */
  "MakerNotes:CmdDialsApertureSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Autofocus Off, Exposure Off"
   */
  "MakerNotes:CmdDialsChangeMainSub"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On (Image Review Excluded)"
   */
  "MakerNotes:CmdDialsMenuAndPlayback"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "No"
   */
  "MakerNotes:CmdDialsReverseRotation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CmdDialsReverseRotExposureComp"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0 0 0"
   */
  "MakerNotes:ColorAdjustment"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ColorAdjustmentMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 256
   */
  "MakerNotes:ColorBalanceBlue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 65792
   */
  "MakerNotes:ColorBalanceGreen"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2.4960938
   */
  "MakerNotes:ColorBalanceRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "R01,"
   */
  "MakerNotes:ColorBalanceVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 24
   */
  "MakerNotes:ColorBitDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 257
   */
  "MakerNotes:ColorBW"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:ColorChromeEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ColorChromeFXBlue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8
   */
  "MakerNotes:ColorCompensationFilter"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ColorCompensationFilterCustom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ColorCompensationFilterSet"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "96 4096 3072 4096 16 256"
   */
  "MakerNotes:ColorControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Color 0; 0; 29; Strength 0; -4; 3"
   */
  "MakerNotes:ColorCreatorEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "9 (60D/1100D)"
   */
  "MakerNotes:ColorDataVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Warm"
   */
  "MakerNotes:ColorEffect"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ColorFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0.00 0.00 0.00"
   */
  "MakerNotes:ColorGain"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Mode3a"
   */
  "MakerNotes:ColorHue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "953 -8 79 188 970 -134 105 -19 938"
   */
  "MakerNotes:ColorMatrix"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1.66016 -0.66016 0.00000 -0.20703 1.52734 -0.32031 -0.132…1.42969"
   */
  "MakerNotes:ColorMatrixA"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1.12793 -0.03674 -0.09119 -0.20703 1.52734 -0.32031 -0.13…1.35791"
   */
  "MakerNotes:ColorMatrixB"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4
   */
  "MakerNotes:ColorMatrixNumber"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:ColorMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Min -5; Max 5; Yellow 0; Orange 0; Orange-red 0; Red 0; M…green 0"
   */
  "MakerNotes:ColorProfileSettings"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "sRGB"
   * @remarks Color space of image data. EXIF mandatory tag.
   * Standard values: 1 (sRGB), 0xFFFF (Uncalibrated).
   * Non-standard values: 2 (Adobe RGB, some cameras), 0xFFFD (Wide Gamut RGB, Sony), 0xFFFE (ICC Profile, Sony).
   * Adobe RGB is typically indicated by 'Uncalibrated' with InteropIndex='R03'.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ColorSpace"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8059
   */
  "MakerNotes:ColorTempAsShot"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 7397
   */
  "MakerNotes:ColorTempAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 7103
   */
  "MakerNotes:ColorTempCloudy"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5210
   */
  "MakerNotes:ColorTempCustom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 6071
   */
  "MakerNotes:ColorTempDaylight"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example 9900
   */
  "MakerNotes:ColorTemperature"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 7820
   */
  "MakerNotes:ColorTemperatureAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "6300 K"
   */
  "MakerNotes:ColorTemperatureCustom"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7200 K"
   */
  "MakerNotes:ColorTemperatureSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Temperature"
   */
  "MakerNotes:ColorTemperatureSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 9826
   */
  "MakerNotes:ColorTempFlash"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 4607
   */
  "MakerNotes:ColorTempFluorescent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 8001
   */
  "MakerNotes:ColorTempKelvin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 7397
   */
  "MakerNotes:ColorTempMeasured"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 7830
   */
  "MakerNotes:ColorTempShade"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 3212
   */
  "MakerNotes:ColorTempTungsten"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:ColorTint"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Normal"
   */
  "MakerNotes:ColorTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ColorToneAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ColorToneFaithful"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 11
   */
  "MakerNotes:ColorToneLandscape"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ColorToneNeutral"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ColorTonePortrait"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 15663191
   */
  "MakerNotes:ColorToneStandard"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard (Main Shutter, Sub Aperture)"
   */
  "MakerNotes:CommandDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sub-command Dial"
   */
  "MakerNotes:CommandDialsApertureSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:CommandDialsChangeMainSub"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On (Image Review Excluded)"
   */
  "MakerNotes:CommandDialsMenuAndPlayback"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:CommandDialsReverseRotation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:CommanderChannel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Full"
   */
  "MakerNotes:CommanderGroupAManualOutput"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "TTL"
   */
  "MakerNotes:CommanderGroupAMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Full"
   */
  "MakerNotes:CommanderGroupBManualOutput"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "TTL"
   */
  "MakerNotes:CommanderGroupBMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "TTL"
   */
  "MakerNotes:CommanderInternalFlash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Full"
   */
  "MakerNotes:CommanderInternalManualOutput"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CommanderInternalTTLComp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example -3
   */
  "MakerNotes:CommanderInternalTTLCompBuiltin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example -3
   */
  "MakerNotes:CommanderInternalTTLCompGroupA"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example -3
   */
  "MakerNotes:CommanderInternalTTLCompGroupB"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 45
   * @remarks Ricoh Theta compass heading direction in degrees.
   * Camera orientation sensor data.
   */
  "MakerNotes:Compass"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:ComponentBitDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Component version 1.00"
   */
  "MakerNotes:ComponentVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Panorama"
   */
  "MakerNotes:CompositeImageMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:CompositionAdjust"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:CompositionAdjustRotation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "MakerNotes:CompositionAdjustX"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:CompositionAdjustY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 98047
   */
  "MakerNotes:CompressedImageSize"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "Unknown (1536)"
   */
  "MakerNotes:Compression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 8
   */
  "MakerNotes:CompressionFactor"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "MakerNotes:CompressionRatio"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "CanonCR3_001/01.11.00/00.00.00"
   */
  "MakerNotes:CompressorVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "FFCBAC24-E547-4BBC-AF47-38B1A3D845E3"
   */
  "MakerNotes:ContentIdentifier"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Low"
   */
  "MakerNotes:ContinuousBracketing"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (11)"
   */
  "MakerNotes:ContinuousDrive"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ContinuousModeDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ContinuousModeLiveView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Hi 15000; Cont 15000; Lo 5000; Soft 8000; Soft LS 3000"
   */
  "MakerNotes:ContinuousShootingSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable; 99 shots"
   */
  "MakerNotes:ContinuousShotLimit"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "n/a"
   */
  "MakerNotes:Contrast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ContrastAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 578 bytes, use -b option to extract)"
   */
  "MakerNotes:ContrastCurve"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "496 184 48 48"
   */
  "MakerNotes:ContrastDetectAFArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:ContrastDetectAFInFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6553600
   */
  "MakerNotes:ContrastFaithful"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ContrastHighlight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ContrastHighlightShadowAdj"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6553600
   */
  "MakerNotes:ContrastLandscape"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (19)"
   */
  "MakerNotes:ContrastMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 524288
   */
  "MakerNotes:ContrastMonochrome"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ContrastNeutral"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9699328
   */
  "MakerNotes:ContrastPortrait"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "1 (min -5, max 5)"
   */
  "MakerNotes:ContrastSetting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ContrastShadow"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 12058626
   */
  "MakerNotes:ContrastStandard"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Shutter Speed"
   */
  "MakerNotes:ControlDialSet"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ControllerBoardVersion"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:ControlMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "High"
   */
  "MakerNotes:ControlRingResponse"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:ControlRingRotation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unknown (0)"
   */
  "MakerNotes:ConversionLens"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Converter"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "© Chuckles McSnortypants, Inc."
   * @remarks Copyright notice for the image. MWG composite tag that reconciles EXIF:Copyright, IPTC:CopyrightNotice, and XMP-dc:Rights.
   * Writing updates all three locations to maintain MWG synchronization.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "MakerNotes:Copyright"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 72
   */
  "MakerNotes:CoringFilter"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6807
   */
  "MakerNotes:CorrelatedColorTemp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "United States"
   */
  "MakerNotes:Country"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ENG"
   */
  "MakerNotes:CountryCode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1.02.00.06"
   */
  "MakerNotes:CPUFirmwareVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (2%)
   * @example "d, 2009:09:04 03:19:07"
   */
  "MakerNotes:CPUVersions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2026:07:05 05:26:40Z"
   * @remarks When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.
   * Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images.
   * For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "MakerNotes:CreateDate"?: ExifDateTime | ExifDate | string | number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "Vivid"
   */
  "MakerNotes:CreativeStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:CreativeStyleSetting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8 8 6048 4024"
   */
  "MakerNotes:CropArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 48
   */
  "MakerNotes:CropBottomMargin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 7776
   */
  "MakerNotes:CropHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off (7424x4924 cropped to 7424x4924 at pixel 0,0)"
   */
  "MakerNotes:CropHiSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "8 0"
   */
  "MakerNotes:CropLeft"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8240
   */
  "MakerNotes:CropLeftMargin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:CropMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example 5792
   */
  "MakerNotes:CroppedImageHeight"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example 3153968
   */
  "MakerNotes:CroppedImageLeft"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example 0
   */
  "MakerNotes:CroppedImageTop"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example 8688
   */
  "MakerNotes:CroppedImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8240
   */
  "MakerNotes:CropRightMargin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "8 0"
   */
  "MakerNotes:CropTop"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8240
   */
  "MakerNotes:CropTopMargin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5184
   */
  "MakerNotes:CropWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:CrossProcess"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:CrossProcessingColorTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "20 0 19 2 0 65535 65535 65535 2 2 0 65535 65535 65535 18 … 4 5 31"
   */
  "MakerNotes:CustomControls"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 1 30 31 0 0 0 0 0 0 2 30 31 0 0 0 0 0 0 5 30 31 0 0 0…1 1 1 0"
   */
  "MakerNotes:CustomizeDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "P-STUDIO"
   */
  "MakerNotes:CustomPictureStyleFileName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Scene: RAW_HDR|JGRawHDR, JGRawHDR_0,OK, 5/3|MtkIspHidl, O…OK, 0/0"
   */
  "MakerNotes:CustomRendered"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "CS3 (min CS0, max CS4)"
   */
  "MakerNotes:CustomSaturation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:CustomSettingsAllDefault"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "B"
   */
  "MakerNotes:CustomSettingsBank"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CustomWBBlueLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "OK"
   */
  "MakerNotes:CustomWBError"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CustomWBGreenLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:CustomWBRedLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Setup"
   */
  "MakerNotes:CustomWBSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Yes"
   */
  "MakerNotes:DarkFocusEnvironment"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example "(Binary data 280 bytes, use -b option to extract)"
   */
  "MakerNotes:DataDump"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 8289
   */
  "MakerNotes:DataScaling"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "2021:08:22"
   */
  "MakerNotes:Date"?: ExifDate | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Y/M/D"
   */
  "MakerNotes:DateDisplayFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DateImprint"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Off"
   */
  "MakerNotes:DateStampMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2013:07:21 16:18:47"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "MakerNotes:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DateTimeStamp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2023:10:17 14:59:23"
   */
  "MakerNotes:DateTimeUTC"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Yes"
   */
  "MakerNotes:DaylightSavings"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (27471)"
   */
  "MakerNotes:DECPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Erase selected"
   */
  "MakerNotes:DefaultEraseOption"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:DeletedImageCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Warsaw"
   */
  "MakerNotes:DestinationCity"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "    "
   */
  "MakerNotes:DestinationCityCode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:DestinationDST"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 200
   */
  "MakerNotes:DevelopmentDynamicRange"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "tokay"
   */
  "MakerNotes:DeviceCodename"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "MP1.0"
   */
  "MakerNotes:DeviceHardwareRevision"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Google"
   */
  "MakerNotes:DeviceMake"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "SMX Video Camera"
   */
  "MakerNotes:DeviceType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Normal"
   */
  "MakerNotes:DialDirectionTvAv"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:DiffractionCompensation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:DiffractionCorrection"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Vivid"
   */
  "MakerNotes:DigitalFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 0
   */
  "MakerNotes:DigitalGain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DigitalICE"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Standard"
   */
  "MakerNotes:DigitalLensOptimizer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:DigitalLensOptimizerSetting"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "undef.0"
   */
  "MakerNotes:DigitalZoom"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:DigitalZoomOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 2
   */
  "MakerNotes:DigitalZoomRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 897
   */
  "MakerNotes:DirectoryIndex"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 999
   */
  "MakerNotes:DirectoryNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "DISP - Cycle Information Display (shooting)"
   */
  "MakerNotes:DispButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:DisplayAllAFPoints"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9.5
   */
  "MakerNotes:DisplayAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DistortionControl"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Unknown (60)"
   */
  "MakerNotes:DistortionCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "n/a"
   */
  "MakerNotes:DistortionCorrectionSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 100
   */
  "MakerNotes:DistortionCorrectionValue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0100"
   */
  "MakerNotes:DistortionCorrectionVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "88 0 -136 -288 -480 -696 -944 -1200 -1480 -1752 -2040 0 0 0 0 0"
   */
  "MakerNotes:DistortionCorrParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (0)"
   */
  "MakerNotes:DistortionCorrParamsNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:DistortionCorrParamsPresent"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Video; n/a; Shutter Button; Video"
   */
  "MakerNotes:DriveMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Single Frame"
   */
  "MakerNotes:DriveModeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:DriveSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "100.00.00.00"
   */
  "MakerNotes:DSPFirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:DualPixelRaw"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  "MakerNotes:DustRemovalData"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DXCropAlert"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9 Points"
   */
  "MakerNotes:DynamicAFArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:DynamicAreaAFAssist"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:DynamicAreaAFDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Wide"
   */
  "MakerNotes:DynamicRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DynamicRangeBoost"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On; Enabled; 0; 0"
   */
  "MakerNotes:DynamicRangeExpansion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Standard"
   */
  "MakerNotes:DynamicRangeOptimizer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:DynamicRangeOptimizerBracket"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5
   */
  "MakerNotes:DynamicRangeOptimizerLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:DynamicRangeOptimizerMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:DynamicRangeOptimizerSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Manual"
   */
  "MakerNotes:DynamicRangeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:EasyExposureComp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:EasyExposureCompensation"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (83)"
   */
  "MakerNotes:EasyMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9.8
   */
  "MakerNotes:EffectiveLV"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5.7
   */
  "MakerNotes:EffectiveMaxAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:ElectronicFrontCurtainShutter"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 1
   */
  "MakerNotes:Emissivity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:EnergySavingMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:Enhancement"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 960
   */
  "MakerNotes:Enhancer"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 480
   */
  "MakerNotes:EpsonImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 640
   */
  "MakerNotes:EpsonImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "MakerNotes:EpsonSoftware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "0100"
   */
  "MakerNotes:EquipmentVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Evaluative"
   */
  "MakerNotes:ETTLII"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 89
   */
  "MakerNotes:EventNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/3 EV Steps"
   */
  "MakerNotes:EVSteps"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/3 EV"
   */
  "MakerNotes:EVStepSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 84
   */
  "MakerNotes:ExitPupilCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "97.5 mm"
   */
  "MakerNotes:ExitPupilPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Indicated"
   */
  "MakerNotes:ExposureBracketingIndicatorLast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ExposureBracketShotNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.5
   */
  "MakerNotes:ExposureBracketStepSize"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:ExposureBracketValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:ExposureCompAutoCancel"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example 1
   * @remarks Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec.
   * Signed value indicating deviation from metered exposure.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ExposureCompensation"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Ambient and Flash"
   */
  "MakerNotes:ExposureCompensationMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ExposureCompensationSet"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ExposureCompensationSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/3 EV"
   */
  "MakerNotes:ExposureCompStepSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/3 EV"
   */
  "MakerNotes:ExposureControlStep"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/3 EV"
   */
  "MakerNotes:ExposureControlStepSize"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example 1
   */
  "MakerNotes:ExposureCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ExposureDelayMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:ExposureDifference"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ExposureIndicator"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "1/3-stop set, 1/3-stop comp."
   */
  "MakerNotes:ExposureLevelIncrements"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "Unknown (50)"
   */
  "MakerNotes:ExposureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Spot metering"
   */
  "MakerNotes:ExposureModeInManual"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "iAuto+"
   * @remarks Camera exposure mode.
   * Values: 0 (Not Defined), 1 (Manual), 2 (Program AE), 3 (Aperture-priority AE), 4 (Shutter speed priority AE), 5 (Creative/Slow speed), 6 (Action/High speed), 7 (Portrait), 8 (Landscape).
   * Value 9 (Bulb) is non-standard but used by some Canon models.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ExposureProgram"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ExposureShift"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ExposureStandardAdjustment"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "1/99"
   * @remarks Shutter speed in seconds (e.g., '1/250'). Primary source for ShutterSpeed composite.
   * To write shutter speed, use this tag directly. BulbDuration takes priority in ShutterSpeed composite if present and > 0.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ExposureTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 32
   */
  "MakerNotes:ExposureTimeMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.000084738001
   */
  "MakerNotes:ExposureTimeMin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:ExposureTuning"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Good"
   */
  "MakerNotes:ExposureWarning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Manual"
   */
  "MakerNotes:EXRAuto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "HR (High Resolution)"
   */
  "MakerNotes:EXRMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ExtendedMenuBanks"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ExtendedShutterSpeeds"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:ExtendedWBDetect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "None"
   */
  "MakerNotes:Extender"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:ExtenderFirmwareVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example ""
   */
  "MakerNotes:ExtenderModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example ""
   */
  "MakerNotes:ExtenderSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Not attached"
   */
  "MakerNotes:ExtenderStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On"
   */
  "MakerNotes:ExternalFlash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:ExternalFlashBounce"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ExternalFlashCompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:ExternalFlashExposureComp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:ExternalFlashFirmware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(none)"
   */
  "MakerNotes:ExternalFlashFlags"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:ExternalFlashGuideNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ExternalFlashGValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:ExternalFlashMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:ExternalFlashReadyState"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Flash Not Attached"
   */
  "MakerNotes:ExternalFlashStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 54
   */
  "MakerNotes:ExternalFlashZoom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "No"
   */
  "MakerNotes:ExternalFlashZoomOverride"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 9.14
   */
  "MakerNotes:ExternalSensorBrightnessValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0.2.0.0"
   */
  "MakerNotes:ExtraInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   * @remarks Canon eye detection AF setting. Values: 'On' or 'Off'.
   * Enables autofocus tracking on detected eyes.
   */
  "MakerNotes:EyeDetection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:EyeStartAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (II*)"
   */
  "MakerNotes:FaceDetect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "(Binary data 383 bytes, use -b option to extract)"
   */
  "MakerNotes:FaceDetectArea"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 26 640 428 0 26 640 428 0 0 0 0"
   */
  "MakerNotes:FaceDetectFrameCrop"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "720 480"
   */
  "MakerNotes:FaceDetectFrameSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   * @remarks Sony face detection setting. Values: 'On' (16) or 'Off' (1).
   * Indicates whether face detection was enabled during capture.
   */
  "MakerNotes:FaceDetection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "918 1058 1959 2101"
   */
  "MakerNotes:FaceElementPositions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "892 917 2131 2135"
   */
  "MakerNotes:FaceElementSelected"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (4096)"
   */
  "MakerNotes:FaceElementTypes"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "6000 4000"
   */
  "MakerNotes:FaceImageSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 9
   */
  "MakerNotes:FaceInfoLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 94
   */
  "MakerNotes:FaceInfoOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "MakerNotes:FaceName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "67 23"
   */
  "MakerNotes:FacePosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "918 1058 1959 2101"
   */
  "MakerNotes:FacePositions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   * @remarks Samsung face recognition setting. Values: 'On' or 'Off'.
   * When enabled, camera attempts to match faces to registered profiles.
   */
  "MakerNotes:FaceRecognition"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example 65535
   * @remarks Number of faces detected by the camera during capture.
   * Found in MakerNotes from Canon, Nikon, Sony, Panasonic, Olympus, Fujifilm, Pentax, Ricoh, and others.
   */
  "MakerNotes:FacesDetected"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FacesDetectedA"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FacesDetectedB"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 12336
   * @remarks Panasonic: number of faces matched to user-registered known faces.
   * Related tags: RecognizedFace*Name, RecognizedFace*Position.
   */
  "MakerNotes:FacesRecognized"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 35
   */
  "MakerNotes:FaceWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Fade"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable; 0; 8; 0"
   */
  "MakerNotes:FEMicroadjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "X3F"
   */
  "MakerNotes:FileFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9984
   */
  "MakerNotes:FileIndex"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0100"
   */
  "MakerNotes:FileInfoVersion"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "986-8698"
   */
  "MakerNotes:FileNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (65537)"
   */
  "MakerNotes:FileNumberMemory"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:FileNumberSequence"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "APS_H"
   */
  "MakerNotes:FileSource"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:FillFlashAutoReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FilmGrainEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:FilmMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "NEGATIVE(MONO) "
   */
  "MakerNotes:FilmType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:FilterEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:FilterEffectAuto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (0x10000)"
   */
  "MakerNotes:FilterEffectMonochrome"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:FinderDisplayDuringExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On; Normal"
   */
  "MakerNotes:FineSharpness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FineTuneOptCenterWeighted"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FineTuneOptHighlightWeighted"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FineTuneOptMatrixMetering"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FineTuneOptSpotMetering"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 9236 bytes, use -b option to extract)"
   */
  "MakerNotes:FinishedImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "u77"
   */
  "MakerNotes:Firmware"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2015:11:09 08:38"
   */
  "MakerNotes:FirmwareDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 21870002
   */
  "MakerNotes:FirmwareID"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "6.7.2 96(4f) at offset 0x43d"
   */
  "MakerNotes:FirmwareInfo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "NX1_000000"
   */
  "MakerNotes:FirmwareName"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Rev01500000"
   */
  "MakerNotes:FirmwareRevision"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "V1.00 "
   */
  "MakerNotes:FirmwareVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Focus Priority"
   */
  "MakerNotes:FirstFrameActionInAFC"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FisheyeFilter"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   * @remarks Flash status and mode as bitfield. Common values:
   * 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected),
   * 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired),
   * 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction).
   * Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:Flash"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Flash Fired"
   */
  "MakerNotes:FlashAction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Did not fire"
   */
  "MakerNotes:FlashActionExternal"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:FlashBatteryLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 0
   */
  "MakerNotes:FlashBias"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Manual, External"
   */
  "MakerNotes:FlashBits"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Exposure"
   */
  "MakerNotes:FlashBurstPriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Raise built-in flash"
   */
  "MakerNotes:FlashButtonFunction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FlashChargeLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "None"
   */
  "MakerNotes:FlashColorFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FlashCommanderMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:FlashCompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Pre-flash TTL"
   */
  "MakerNotes:FlashControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "iTTL-BL"
   */
  "MakerNotes:FlashControlMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:FlashCurtain"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Fill Flash"
   */
  "MakerNotes:FlashDefault"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (0 0)"
   */
  "MakerNotes:FlashDevice"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 53
   */
  "MakerNotes:FlashDistance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0.3
   */
  "MakerNotes:FlashExposureBracketValue"?: number;

  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example 10
   */
  "MakerNotes:FlashExposureComp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Entire frame"
   */
  "MakerNotes:FlashExposureCompArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FlashExposureCompSet"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Indicated"
   */
  "MakerNotes:FlashExposureIndicator"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Indicated"
   */
  "MakerNotes:FlashExposureIndicatorLast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Indicated"
   */
  "MakerNotes:FlashExposureIndicatorNext"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:FlashExposureLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:FlashFired"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Fires"
   */
  "MakerNotes:FlashFiring"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1.005
   */
  "MakerNotes:FlashFirmwareVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "12 mm"
   */
  "MakerNotes:FlashFocalLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No flash"
   */
  "MakerNotes:FlashFunction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:FlashGNDistance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:FlashGroupACompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:FlashGroupAControlMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:FlashGroupBCompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:FlashGroupBControlMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:FlashGroupCCompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:FlashGroupCControlMode"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9
   */
  "MakerNotes:FlashGuideNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:FlashIlluminationPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "0301"
   */
  "MakerNotes:FlashInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a (x4)"
   */
  "MakerNotes:FlashIntensity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "n/a"
   */
  "MakerNotes:FlashLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "TTL"
   */
  "MakerNotes:FlashMasterControlMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (65797)"
   */
  "MakerNotes:FlashMetering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FlashMeteringMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "18.0 18.5 20.0 20.0 20.0 20.0 20.0 20.0 20.0 18.6 18.0 18….2 19.0"
   */
  "MakerNotes:FlashMeteringSegments"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (c2)"
   */
  "MakerNotes:FlashMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example "n/a"
   */
  "MakerNotes:FlashModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Red-eye reduction"
   */
  "MakerNotes:FlashOptions"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example 94
   */
  "MakerNotes:FlashOutput"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:FlashRemoteControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "01114671"
   */
  "MakerNotes:FlashSerialNumber"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Uw-Normal"
   */
  "MakerNotes:FlashSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/64"
   */
  "MakerNotes:FlashShutterSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "None"
   */
  "MakerNotes:FlashSource"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FlashStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:FlashStatusExternal"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Front curtain"
   */
  "MakerNotes:FlashSyncMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/250 s (auto FP)"
   */
  "MakerNotes:FlashSyncSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Auto"
   */
  "MakerNotes:FlashSyncSpeedAv"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8.5
   */
  "MakerNotes:FlashThreshold"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Optional,TTL"
   */
  "MakerNotes:FlashType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes (flash required but disabled)"
   */
  "MakerNotes:FlashWarning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "410 180"
   */
  "MakerNotes:FlexibleSpotPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Left to Right"
   */
  "MakerNotes:FlickAdvanceDirection"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:FlickerReduce"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off (0x3223)"
   */
  "MakerNotes:FlickerReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FlickerReductionIndicator"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FlickerReductionShooting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1321,81,37"
   */
  "MakerNotes:FlightDegree"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "9,0,0"
   */
  "MakerNotes:FlightSpeed"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9.9
   * @remarks Lens aperture as f-number (e.g., 2.8, 5.6). Primary source for Aperture composite.
   * To write aperture, use this tag - it's more intuitive than ApertureValue (which uses APEX units).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:FNumber"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "99.0 mm"
   * @remarks Lens focal length in millimeters. Actual focal length, not 35mm equivalent.
   * For 35mm equivalent, see FocalLengthIn35mmFormat or FocalLength35efl composite.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:FocalLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "70.0 mm"
   */
  "MakerNotes:FocalLengthTeleZoom"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "640 428"
   */
  "MakerNotes:FocalPlaneAFPointArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9
   */
  "MakerNotes:FocalPlaneAFPointsUsed"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "9.45 mm"
   */
  "MakerNotes:FocalPlaneDiagonal"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "9.02 mm"
   */
  "MakerNotes:FocalPlaneXSize"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "8.10 mm"
   */
  "MakerNotes:FocalPlaneYSize"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Zoom"
   */
  "MakerNotes:FocalType"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "32/mm"
   */
  "MakerNotes:FocalUnits"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Wide Focus (normal)"
   */
  "MakerNotes:FocusArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No Wrap"
   */
  "MakerNotes:FocusAreaSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FocusBracket"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FocusBracketing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusBracketingCropDepthComposite"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusBracketingDepthComposite"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusBracketingExposureSmoothing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FocusBracketingFlashInterval"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FocusBracketingFocusIncrement"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:FocusBracketingImageCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:FocusBracketStepSize"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Single"
   */
  "MakerNotes:FocusContinuous"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:FocusDisplayAIServoAndMF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "inf"
   */
  "MakerNotes:FocusDistance"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example "inf"
   */
  "MakerNotes:FocusDistanceLower"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "7.68 - 36.90 m"
   */
  "MakerNotes:FocusDistanceRange"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example "inf"
   */
  "MakerNotes:FocusDistanceUpper"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:FocusFrameSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Focus Hold"
   */
  "MakerNotes:FocusHoldButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0100"
   */
  "MakerNotes:FocusInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Eh-A"
   */
  "MakerNotes:FocusingScreen"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "9504 6336 6088 2389"
   */
  "MakerNotes:FocusLocation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:FocusLocked"?: string;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "Unknown (860272)"
   */
  "MakerNotes:FocusMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Manual"
   */
  "MakerNotes:FocusModeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF"
   */
  "MakerNotes:FocusModeSwitch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Red"
   */
  "MakerNotes:FocusPeakingHighlightColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusPeakingLevel"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "972 1296"
   */
  "MakerNotes:FocusPixel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:FocusPointBrightness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:FocusPointPersistence"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:FocusPointSchema"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:FocusPointSelectionSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Wrap"
   */
  "MakerNotes:FocusPointWrap"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 999
   */
  "MakerNotes:FocusPosition"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "C"
   */
  "MakerNotes:FocusPositionHorizontal"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "C"
   */
  "MakerNotes:FocusPositionVertical"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "AF Used; 96"
   */
  "MakerNotes:FocusProcess"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (2)"
   */
  "MakerNotes:FocusRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7 (very far)"
   */
  "MakerNotes:FocusRangeIndex"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Focus"
   */
  "MakerNotes:FocusResult"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:FocusRingRotation"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "M"
   */
  "MakerNotes:FocusSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:FocusShiftExposureLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3 Seconds"
   */
  "MakerNotes:FocusShiftInterval"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:FocusShiftNumberShots"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusShiftShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:FocusShiftStepWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not confirmed, Tracking"
   */
  "MakerNotes:FocusStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 98
   */
  "MakerNotes:FocusStepCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9713
   */
  "MakerNotes:FocusStepInfinity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9804
   */
  "MakerNotes:FocusStepNear"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FocusTrackingLockOn"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Out of focus"
   */
  "MakerNotes:FocusWarning"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Standard Form"
   */
  "MakerNotes:FolderName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 373
   */
  "MakerNotes:FolderNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9
   */
  "MakerNotes:FrameCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 849
   */
  "MakerNotes:FrameNumber"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 30
   */
  "MakerNotes:FrameRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:FramingGridDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 12 bytes, use -b option to extract)"
   */
  "MakerNotes:FreeBytes"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 805
   */
  "MakerNotes:FreeMemoryCardImages"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Red-eye reduction"
   */
  "MakerNotes:FujiFlashMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "X100V_0100"
   */
  "MakerNotes:FujiModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "9504x6336"
   */
  "MakerNotes:FullImageSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:FullPressSnap"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Zoom (High)"
   */
  "MakerNotes:Func1Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:Func1ButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Virtual Horizon"
   */
  "MakerNotes:Func2Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Voice Memo"
   */
  "MakerNotes:Func3Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Virtual Horizon"
   */
  "MakerNotes:FuncButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:FuncButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ISO Display"
   */
  "MakerNotes:FunctionButton"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 16
   */
  "MakerNotes:Gain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 256
   */
  "MakerNotes:GainBase"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "4320x3240"
   */
  "MakerNotes:GEImageSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "GEDSC DIGITAL CAMERA           "
   */
  "MakerNotes:GEMake"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "J1470S"
   */
  "MakerNotes:GEModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1279,-900,0"
   */
  "MakerNotes:GimbalDegree"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a; User-Selected"
   */
  "MakerNotes:Gradation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:GrainEffectRoughness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:GrainEffectSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:GrainyBWFilter"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2E"
   */
  "MakerNotes:GreenGain"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:GridDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 157
   */
  "MakerNotes:GripBatteryADLoad"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:GripBatteryADNoLoad"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:GripBatteryPercent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Empty or Missing"
   */
  "MakerNotes:GripBatteryState"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5.90 V"
   */
  "MakerNotes:GripBatteryVoltage"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Squares"
   */
  "MakerNotes:GroupAreaAFIllumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (5)"
   */
  "MakerNotes:HDMIBitDepth"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HDMIExternalRecorder"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:HDMIOutputRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:HDMIOutputResolution"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "On (normal)"
   */
  "MakerNotes:HDR"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Natural"
   */
  "MakerNotes:HDREffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1.9571289
   */
  "MakerNotes:HDRGain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1.6864181
   */
  "MakerNotes:HDRHeadroom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (2)"
   */
  "MakerNotes:HDRImageType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0200"
   */
  "MakerNotes:HDRInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:HDRLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "MakerNotes:HDRPSoftware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "On (Manual)"
   */
  "MakerNotes:HDRSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:HDRSmoothing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 53248
   */
  "MakerNotes:HiddenDataLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7995392
   */
  "MakerNotes:HiddenDataOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HighFrameRate"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HighFrequencyFlickerReduction"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (8%)
   * @example "n/a"
   */
  "MakerNotes:HighISONoiseReduction"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.1
   */
  "MakerNotes:Highlight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Highlights"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0"
   */
  "MakerNotes:HighlightShadow"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 (normal)"
   */
  "MakerNotes:HighlightTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:HighlightTonePriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Yes"
   */
  "MakerNotes:HighlightWarning"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:HighLowKey"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "MakerNotes:HighLowKeyAdj"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HighSpeedSync"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 1024 bytes, use -b option to extract)"
   */
  "MakerNotes:Histogram"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "ndon"
   */
  "MakerNotes:HometownCity"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "NYC "
   */
  "MakerNotes:HometownCityCode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:HometownDST"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "MakerNotes:HostSoftwareExportVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (4 4)"
   */
  "MakerNotes:HostSoftwareRendering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:Hue"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HueAdjust"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:HueAdjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:HybridLogGamma"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 8 bytes, use -b option to extract)"
   */
  "MakerNotes:HyperlapsDebugInfo"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:Illumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Normal"
   */
  "MakerNotes:ImageAdjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "FX (36x24)"
   */
  "MakerNotes:ImageArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ImageAuthentication"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0 0 8256 5504"
   */
  "MakerNotes:ImageBoundary"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (9)"
   */
  "MakerNotes:ImageCaptureType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 994
   */
  "MakerNotes:ImageCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 9236 bytes, use -b option to extract)"
   */
  "MakerNotes:ImageData"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9927271
   */
  "MakerNotes:ImageDataSize"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1
   */
  "MakerNotes:ImageEditCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Red-eye Correction"
   */
  "MakerNotes:ImageEditing"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:ImageEffects"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Re-developed from RAW"
   */
  "MakerNotes:ImageGeneration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 608
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "MakerNotes:ImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 912
   */
  "MakerNotes:ImageIDNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Finished image"
   */
  "MakerNotes:ImageName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9956
   * @remarks Image number/identifier. XMP-aux namespace.
   * May be numeric or string with leading zeros (e.g., '0001').
   * @see https://exiftool.org/TagNames/XMP.html#aux
   */
  "MakerNotes:ImageNumber"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:ImageOptimization"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Red Eye Ruduction ;"
   */
  "MakerNotes:ImageProcessing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "0112"
   */
  "MakerNotes:ImageProcessingVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Very High"
   */
  "MakerNotes:ImageQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ImageReview"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "4 s"
   */
  "MakerNotes:ImageReviewMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4 s"
   */
  "MakerNotes:ImageReviewTime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:ImageRotated"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Small"
   */
  "MakerNotes:ImageSizeRAW"?: string;

  /**
   * @frequency 🔥 ★★★☆ (20%)
   * @example "n/a"
   */
  "MakerNotes:ImageStabilization"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:ImageStabilizationMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ImageStabilizationSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "StyleBox2"
   */
  "MakerNotes:ImageStyle"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 94
   */
  "MakerNotes:ImageTemperatureMax"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 86
   */
  "MakerNotes:ImageTemperatureMin"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Vibrant"
   */
  "MakerNotes:ImageTone"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "fefafc6093e2c1470ac8dfa06ef26990"
   * @remarks Unique identifier for the image, typically a 32-character hex string.
   * Useful for image deduplication, tracking identity across edits, and linking related files (e.g., RAW + JPEG pairs).
   * May also appear in MakerNotes and XMP.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ImageUniqueID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 832
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "MakerNotes:ImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Displays shooting functions"
   */
  "MakerNotes:InfoButtonWhenShooting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:InfraredIlluminator"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Manual AF point"
   */
  "MakerNotes:InitialAFPointAIServoAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Initial AF Point Selected"
   */
  "MakerNotes:InitialAFPointInServo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Low Magnification"
   */
  "MakerNotes:InitialZoomLiveView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Medium Magnification"
   */
  "MakerNotes:InitialZoomSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 876 bytes, use -b option to extract)"
   */
  "MakerNotes:InitParamsText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Image Only"
   */
  "MakerNotes:InstantPlaybackSetup"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "5 s"
   */
  "MakerNotes:InstantPlaybackTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "On"
   */
  "MakerNotes:IntelligentAuto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "n/a"
   */
  "MakerNotes:IntelligentContrast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Standard"
   */
  "MakerNotes:IntelligentExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Standard"
   */
  "MakerNotes:IntelligentResolution"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "8.7.5"
   */
  "MakerNotes:InternalFirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "TTL"
   */
  "MakerNotes:InternalFlash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Did not fire, Red-eye reduction"
   */
  "MakerNotes:InternalFlashMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 63
   */
  "MakerNotes:InternalFlashStrength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 95
   */
  "MakerNotes:InternalFlashTable"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:InternalNDFilter"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "fdfec409"
   */
  "MakerNotes:InternalSerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:IntervalDurationHours"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:IntervalDurationMinutes"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:IntervalDurationSeconds"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:IntervalExposureSmoothing"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 65542
   */
  "MakerNotes:IntervalLength"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Still Image"
   */
  "MakerNotes:IntervalMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 65797
   */
  "MakerNotes:IntervalNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:IntervalPriority"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:Intervals"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:IntervalShooting"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 90
   * @remarks Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values.
   * Historically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:ISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 800
   */
  "MakerNotes:ISO2"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ISOAuto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Same As Without Flash"
   */
  "MakerNotes:ISOAutoFlashLimit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (0x6)"
   */
  "MakerNotes:ISOAutoHiLimit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 800
   */
  "MakerNotes:ISOAutoMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 800
   */
  "MakerNotes:ISOAutoMin"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Shutter Speed Control; 1/32"
   */
  "MakerNotes:ISOAutoMinSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Auto (Fastest)"
   */
  "MakerNotes:ISOAutoShutterTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Show Frame Count"
   */
  "MakerNotes:ISODisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "On"
   */
  "MakerNotes:ISOExpansion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 800
   */
  "MakerNotes:ISOFloor"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9846.1543
   */
  "MakerNotes:ISOMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 56.078434
   */
  "MakerNotes:ISOMin"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:ISOSelected"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Manual"
   */
  "MakerNotes:ISOSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/3 EV"
   */
  "MakerNotes:ISOSensitivityStep"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 90
   */
  "MakerNotes:ISOSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:ISOSpeedExpansion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/3 Stop"
   */
  "MakerNotes:ISOSpeedIncrements"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable; Max 3200; Min 1"
   */
  "MakerNotes:ISOSpeedRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/3 EV"
   */
  "MakerNotes:ISOStepSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 79.44
   */
  "MakerNotes:ISOValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "n/a (Movie)"
   */
  "MakerNotes:JPEGQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Size Priority"
   */
  "MakerNotes:JPGCompression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "10 MP"
   */
  "MakerNotes:JpgRecordedPixels"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:KeepExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:KeystoneCompensation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Vertical"
   */
  "MakerNotes:KeystoneDirection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0"
   */
  "MakerNotes:KeystoneValue"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 864
   */
  "MakerNotes:KodakImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 800
   */
  "MakerNotes:KodakImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "SKodakCommonInfo Jaguar7"
   */
  "MakerNotes:KodakInfoType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Kodak                           "
   */
  "MakerNotes:KodakMake"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "PENTAX"
   */
  "MakerNotes:KodakMaker"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "Z760    "
   */
  "MakerNotes:KodakModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1.0.0.0"
   */
  "MakerNotes:KodakVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "UNICORN THEATRE FOR CHILDREN"
   */
  "MakerNotes:Landmark"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "English"
   */
  "MakerNotes:Language"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 92
   */
  "MakerNotes:LastFileNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:LateralChromaticAberration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Retain power off status"
   */
  "MakerNotes:LCDDisplayAtPowerOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "With Shutter Button only"
   */
  "MakerNotes:LCDDisplayReturnToShoot"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:LCDIllumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:LCDIlluminationDuringBulb"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Remain. shots/File no."
   */
  "MakerNotes:LCDPanels"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "85mm f/1.8"
   * @remarks Lens identification from focal length range, primarily for Canon cameras.
   * Read-only composite. For more detailed lens identification, see LensID.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:Lens"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9974
   */
  "MakerNotes:LensAFCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "4.0 to 22"
   */
  "MakerNotes:LensApertureRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None (Disabled)"
   */
  "MakerNotes:LensControlRing"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 18
   */
  "MakerNotes:LensCorrectionPoints"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "606 1211 1817 2423 2726 3028 3331 3634 3937 4013 4088 416…67 4543"
   */
  "MakerNotes:LensCorrectionPositions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0802"
   */
  "MakerNotes:LensDataVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 7351
   */
  "MakerNotes:LensDiaphragmCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "97 154 172 70 104 114"
   */
  "MakerNotes:LensDistortionParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Focus search on"
   */
  "MakerNotes:LensDriveNoAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Continue Focus Search"
   */
  "MakerNotes:LensDriveWhenAFImpossible"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "RL8 :V01390000 "
   */
  "MakerNotes:LensFirmware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "Ver.04.000"
   */
  "MakerNotes:LensFirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "70.0 mm"
   */
  "MakerNotes:LensFocalLength"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "50 to 50"
   */
  "MakerNotes:LensFocalRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF Lock Only"
   */
  "MakerNotes:LensFocusFunctionButtons"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown (72)"
   */
  "MakerNotes:LensFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 8.67
   */
  "MakerNotes:LensFStops"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE/AF Lock"
   */
  "MakerNotes:LensFunc1Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF-On"
   */
  "MakerNotes:LensFunc2Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Nikkor Z DX 16-50mm f/3.5-6.3 VR"
   * @remarks Identifies actual lens model using manufacturer-specific lookup tables from partial type information.
   * Configurable: may be extended with user-defined lenses via ExifTool configuration.
   * Different derivation logic for Canon (focal lengths), Nikon (LensIDNumber), Ricoh (LensFirmware), and others (XMP-aux:LensID).
   * Read-only composite.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:LensID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 93
   */
  "MakerNotes:LensIDNumber"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8.5mm F1.9"
   */
  "MakerNotes:LensInfo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 993
   */
  "MakerNotes:LensISCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "4 to 4"
   */
  "MakerNotes:LensMaxApertureRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "RF85mm F2 MACRO IS STM"
   */
  "MakerNotes:LensModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:LensModulationOptimizer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown (74)"
   */
  "MakerNotes:LensMount"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Z-mount"
   */
  "MakerNotes:LensMountType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 91
   */
  "MakerNotes:LensPositionAbsolute"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ""
   */
  "MakerNotes:LensProfileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0xe253"
   */
  "MakerNotes:LensProperties"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "XA250002G12K"
   */
  "MakerNotes:LensSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Xcenter=1456 Ycenter=1068  GainMax=16"
   */
  "MakerNotes:LensShading"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:LensShutterLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown (00 0 0 0 0 00)"
   */
  "MakerNotes:LensSpec"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "ZA SSM II"
   */
  "MakerNotes:LensSpecFeatures"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 35
   */
  "MakerNotes:LensTemperature"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   */
  "MakerNotes:LensType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "MakerNotes:LensType2"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "MakerNotes:LensType3"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "MakerNotes:LensTypeMake"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "41 10"
   */
  "MakerNotes:LensTypeModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "98%"
   */
  "MakerNotes:LensZoomPosition"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:LevelIndicator"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:LevelOrientation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:LightCondition"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Shadow Enhance Low"
   */
  "MakerNotes:LightingMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 8
   * @remarks Pentax light meter reading. Calibration varies by camera model.
   * For Optio WP, add 6 to get approximate LV (Light Value).
   */
  "MakerNotes:LightReading"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown"
   */
  "MakerNotes:LightSource"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (512)"
   */
  "MakerNotes:LightSourceSpecial"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "LCD Backlight and Shooting Information"
   */
  "MakerNotes:LightSwitch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8.546875
   */
  "MakerNotes:LightValueCenter"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7.796875
   */
  "MakerNotes:LightValuePeriphery"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No Restrictions"
   */
  "MakerNotes:LimitAFAreaModeSelection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 12735
   */
  "MakerNotes:LinearityUpperMargin"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:LinkAEToAFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 8595224600
   */
  "MakerNotes:LivePhotoVideoIndex"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:LiveView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Wide Area"
   */
  "MakerNotes:LiveViewAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Face-Priority"
   */
  "MakerNotes:LiveViewAFAreaMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Phase-detect AF"
   */
  "MakerNotes:LiveViewAFMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF-C"
   */
  "MakerNotes:LiveViewAFMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:LiveViewButtonOptions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable (simulates exposure)"
   */
  "MakerNotes:LiveViewExposureSimulation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Manual"
   */
  "MakerNotes:LiveViewFocusMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "40 Segment"
   */
  "MakerNotes:LiveViewMetering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3 min"
   */
  "MakerNotes:LiveViewMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On"
   */
  "MakerNotes:LiveViewShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "MakerNotes:LocalLocationName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example ":99:99 00:00:00"
   */
  "MakerNotes:Location"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0100"
   */
  "MakerNotes:LocationInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "MakerNotes:LocationName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Protect (hold:record memo); 31"
   */
  "MakerNotes:LockMicrophoneButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1754 bytes, use -b option to extract)"
   */
  "MakerNotes:LoggingMetadataText"?: BinaryField | string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "n/a"
   */
  "MakerNotes:LongExposureNoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:LongExposureNRUsed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:LowLightAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.014752804
   */
  "MakerNotes:LuminanceNoiseAmplitude"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.500"
   */
  "MakerNotes:LuminanceNoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sample LUT1"
   */
  "MakerNotes:LUT1Name"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 100
   */
  "MakerNotes:LUT1Opacity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "MakerNotes:LUT2Name"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:LUT2Opacity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Masked"
   */
  "MakerNotes:LVShootingAreaDisplay"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:M16CVersion"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (3)"
   */
  "MakerNotes:Macro"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:MacroLED"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "Unknown (852023)"
   */
  "MakerNotes:MacroMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Soft Focus 2; 1280; 0; 0"
   */
  "MakerNotes:MagicFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Image playback only"
   */
  "MakerNotes:MagnifiedView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:MainDialExposureComp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "OLYMPUS DIGITAL CAMERA"
   * @remarks Camera/device manufacturer. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:Make"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 916
   */
  "MakerNotes:MakerNoteOffset"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "Rdc"
   */
  "MakerNotes:MakerNoteType"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "mlt0"
   */
  "MakerNotes:MakerNoteVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "98 kPa"
   */
  "MakerNotes:ManometerPressure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "400 m, 1320 ft"
   */
  "MakerNotes:ManometerReading"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Stops at AF area edges"
   */
  "MakerNotes:ManualAFPointSelectPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Stops at AF Area Edges"
   */
  "MakerNotes:ManualAFPointSelPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On (1/64 strength)"
   */
  "MakerNotes:ManualFlash"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:ManualFlashOutput"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a (x4)"
   */
  "MakerNotes:ManualFlashStrength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "inf"
   */
  "MakerNotes:ManualFocusDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On During Focus Point Selection Only"
   */
  "MakerNotes:ManualFocusPointIllumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ManualFocusRingInAFMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Tv=Main/Av=Control"
   */
  "MakerNotes:ManualTv"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2021:03:17"
   */
  "MakerNotes:ManufactureDate"?: ExifDate | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:MasterGain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Face Detection On"
   */
  "MakerNotes:MatrixMetering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 761.90479
   */
  "MakerNotes:MaxAnalogISO"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 7.3
   */
  "MakerNotes:MaxAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 6.7
   */
  "MakerNotes:MaxApertureAtMaxFocal"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 5.7
   */
  "MakerNotes:MaxApertureAtMinFocal"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 200
   */
  "MakerNotes:MaxContinuousRelease"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "8 8 8"
   */
  "MakerNotes:MaxFaces"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "96.2 mm"
   */
  "MakerNotes:MaxFocalLength"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 25
   */
  "MakerNotes:MaxNumAFPoints"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "United Kingdom (234)"
   */
  "MakerNotes:MCCData"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 99
   */
  "MakerNotes:MCUVersion"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9.97
   */
  "MakerNotes:MeasuredEV"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.375
   */
  "MakerNotes:MeasuredLV"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "988 1024 1024 636"
   */
  "MakerNotes:MeasuredRGGB"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "6653 9252 9606 4468"
   */
  "MakerNotes:MeasuredRGGBData"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 89
   */
  "MakerNotes:MechanicalShutterCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "High (48 kHz)"
   */
  "MakerNotes:MemoAudioQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "SD card in use, MemoryStick slot empty"
   */
  "MakerNotes:MemoryCardConfiguration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 1
   */
  "MakerNotes:MemoryCardNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Previous (top if power off)"
   */
  "MakerNotes:MenuButtonDisplayPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Top"
   */
  "MakerNotes:MenuButtonReturn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "20 s"
   */
  "MakerNotes:MenuMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1748 bytes, use -b option to extract)"
   */
  "MakerNotes:MergedImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 5
   */
  "MakerNotes:MergedImages"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "THm211000000000"
   */
  "MakerNotes:MetaVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Matrix"
   */
  "MakerNotes:Metering"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Metering"
   */
  "MakerNotes:MeteringButton"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:MeteringFrameCount"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "Unknown (52990)"
   * @remarks Light metering mode used during capture.
   * Values: 0 (Unknown), 1 (Average), 2 (Center-weighted average), 3 (Spot), 4 (Multi-spot), 5 (Multi-segment/Pattern/Evaluative), 6 (Partial), 255 (Other).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:MeteringMode"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Within Range"
   */
  "MakerNotes:MeteringOffScaleIndicator"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8 s"
   */
  "MakerNotes:MeteringTime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Matrix metering"
   */
  "MakerNotes:MeterMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:MidRangeSharpness"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9.8
   */
  "MakerNotes:MinAperture"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "90.0 mm"
   */
  "MakerNotes:MinFocalLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2.0 m"
   */
  "MakerNotes:MinFocusDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:MiniatureFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (-1)"
   */
  "MakerNotes:MiniatureFilterOrientation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:MiniatureFilterParameter"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:MiniatureFilterPosition"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 80
   */
  "MakerNotes:MinimumISO"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2004:07:05"
   */
  "MakerNotes:MinoltaDate"?: ExifDate | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (768)"
   */
  "MakerNotes:MinoltaImageSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "DiMAGE S404"
   */
  "MakerNotes:MinoltaModelID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:MinoltaQuality"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "20:16:39"
   */
  "MakerNotes:MinoltaTime"?: ExifTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Enable"
   */
  "MakerNotes:MirrorLockup"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Manual"
   */
  "MakerNotes:ModeDialPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "sd Quattro H"
   * @remarks Camera/device model name. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:Model"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ModelingFlash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 2018
   */
  "MakerNotes:ModelReleaseYear"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedColorTemp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedDigitalGain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedParamFlag"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:ModifiedPictureStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:ModifiedSaturation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedSensorBlueLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedSensorRedLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedSharpness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:ModifiedSharpnessFreq"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:ModifiedToneCurve"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:ModifiedWhiteBalance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedWhiteBalanceBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ModifiedWhiteBalanceRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:MonitorBrightness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Automatic"
   */
  "MakerNotes:MonitorDisplayOff"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "8 s"
   */
  "MakerNotes:MonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(none)"
   */
  "MakerNotes:MonochromeColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:MonochromeFilterEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:MonochromeGrainEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "No Filter; 0; 8; Strength 2; 0; 3"
   */
  "MakerNotes:MonochromeProfileSettings"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "None"
   */
  "MakerNotes:MonochromeToning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:MonochromeVignetting"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "12:19"
   */
  "MakerNotes:MonthDayCreated"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Old Crescent"
   */
  "MakerNotes:MoonPhase"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 100
   */
  "MakerNotes:MotionSensitivity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE/AF Lock"
   */
  "MakerNotes:MovieAELockButtonAssignment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Wide (S)"
   */
  "MakerNotes:MovieAFAreaMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4 (Normal)"
   */
  "MakerNotes:MovieAFTrackingSensitivity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:MovieFlickerReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Zoom (Low)"
   */
  "MakerNotes:MovieFunc1Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Zoom (1:1)"
   */
  "MakerNotes:MovieFunc2Button"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MovieFunc3Button"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MovieFunctionButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MovieFunctionButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:MovieHighlightDisplayPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 248
   */
  "MakerNotes:MovieHighlightDisplayThreshold"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:MovieISOAutoControlManualMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ISO 6400"
   */
  "MakerNotes:MovieISOAutoHiLimit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Power Aperture"
   */
  "MakerNotes:MovieLensControlRing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Center Focus Point"
   */
  "MakerNotes:MovieMultiSelector"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MoviePreviewButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MoviePreviewButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Take Photo"
   */
  "MakerNotes:MovieShutterButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AE/AF Lock"
   */
  "MakerNotes:MovieSubSelectorAssignment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:MovieSubSelectorAssignmentPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "NRAW 12-bit (NEV)"
   */
  "MakerNotes:MovieType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:MovieWhiteBalanceSameAsPhoto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "e4"
   */
  "MakerNotes:MPUVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:MultiControllerWhileMetering"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:MultiExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:MultiExposureAutoGain"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Bright (comparative)"
   */
  "MakerNotes:MultiExposureControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Off"
   */
  "MakerNotes:MultiExposureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Add"
   */
  "MakerNotes:MultiExposureOverlayMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 1
   */
  "MakerNotes:MultiExposureShots"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0103"
   */
  "MakerNotes:MultiExposureVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:MultiFrameNoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Normal"
   */
  "MakerNotes:MultiFrameNREffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (66)"
   */
  "MakerNotes:MultiFunctionLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On (2 frames); 1"
   */
  "MakerNotes:MultipleExposureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (15)"
   */
  "MakerNotes:MultipleExposureSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Reset Meter-off Delay"
   */
  "MakerNotes:MultiSelector"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Start Movie Recording"
   */
  "MakerNotes:MultiSelectorLiveView"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Zoom On/Off"
   */
  "MakerNotes:MultiSelectorPlaybackMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Select Center Focus Point (Reset)"
   */
  "MakerNotes:MultiSelectorShootMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Vivid"
   */
  "MakerNotes:MyColorMode"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:NDFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a (JPEG)"
   */
  "MakerNotes:NEFBitDepth"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Uncompressed (reduced to 12 bit)"
   */
  "MakerNotes:NEFCompression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 624 bytes, use -b option to extract)"
   */
  "MakerNotes:NEFLinearizationTable"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off (Auto)"
   */
  "MakerNotes:NeutralDensityFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "ViewNX 2.8 M"
   */
  "MakerNotes:NikonCaptureVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Large (10.0 M)"
   */
  "MakerNotes:NikonImageSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Matrix"
   */
  "MakerNotes:NikonMeteringMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:NoiseFilter"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "[4]"
   */
  "MakerNotes:NoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:NoiseReductionStrength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Release Locked"
   */
  "MakerNotes:NoMemoryCard"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5.7
   */
  "MakerNotes:NominalMaxAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7
   */
  "MakerNotes:NominalMinAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 16383
   */
  "MakerNotes:NormalWhiteLevel"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 9
   */
  "MakerNotes:NumAFPoints"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "55 Points"
   */
  "MakerNotes:NumberOfFocusPoints"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 32
   */
  "MakerNotes:NumberOffsets"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 49
   */
  "MakerNotes:NumCAFPoints"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 5
   */
  "MakerNotes:NumFaceElements"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 65535
   */
  "MakerNotes:NumFacePositions"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "inf"
   */
  "MakerNotes:ObjectDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:OISMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Select Center Focus Point"
   */
  "MakerNotes:OKButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 960
   */
  "MakerNotes:OlympusImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3648
   */
  "MakerNotes:OlympusImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unknown ()"
   */
  "MakerNotes:OneTouchWB"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:OpticalVR"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:OpticalZoom"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 94
   */
  "MakerNotes:OpticalZoomCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (0)"
   */
  "MakerNotes:OpticalZoomMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:OpticalZoomOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 668058300
   */
  "MakerNotes:OrderNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Separate Vert/Horiz Points"
   */
  "MakerNotes:OrientationLinkedAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Same for vertical and horizontal"
   */
  "MakerNotes:OrientationLinkedAFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3318
   */
  "MakerNotes:OriginalDecisionDataOffset"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "/home/username/pictures"
   */
  "MakerNotes:OriginalDirectory"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "L9997698.JPG"
   */
  "MakerNotes:OriginalFileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 4000
   */
  "MakerNotes:OriginalImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6000
   */
  "MakerNotes:OriginalImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 11
   */
  "MakerNotes:OriginalPayloadFrameCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ["Sensor Upgraded","PREPRODUCTION CAMERA"]
   */
  "MakerNotes:OtherInfo"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 864 bytes, use -b option to extract)"
   */
  "MakerNotes:OutputLUT"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Itsa Myowna"
   */
  "MakerNotes:OwnerName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:PaintingFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2023:01:19 22:32:42.04"
   */
  "MakerNotes:PanasonicDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "0425"
   */
  "MakerNotes:PanasonicExifVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 5584
   */
  "MakerNotes:PanasonicImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 8368
   */
  "MakerNotes:PanasonicImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 360
   */
  "MakerNotes:PanoramaAngle"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1080
   */
  "MakerNotes:PanoramaCropBottom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaCropLeft"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 11520
   */
  "MakerNotes:PanoramaCropRight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaCropTop"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Right or Down"
   */
  "MakerNotes:PanoramaDirection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaFrameHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaFrameWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1080
   */
  "MakerNotes:PanoramaFullHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 11520
   */
  "MakerNotes:PanoramaFullWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Off"
   */
  "MakerNotes:PanoramaMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:PanoramaSize3D"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaSourceHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PanoramaSourceWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 15278 bytes, use -b option to extract)"
   */
  "MakerNotes:PayloadMetadataText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (6)"
   */
  "MakerNotes:PentaxImageSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "X90"
   */
  "MakerNotes:PentaxModelID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 6
   */
  "MakerNotes:PentaxModelType"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "9.1.2.0"
   */
  "MakerNotes:PentaxVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "513 513 513 513"
   */
  "MakerNotes:PerChannelBlackLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Unknown (3)"
   */
  "MakerNotes:PeripheralIlluminationCorr"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8191 8188 8177 8161 8139 8127 8109 8081 8049 8008 7997 79…24 5996"
   */
  "MakerNotes:PeripheralIlluminationCurve"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:PeripheralLighting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On"
   */
  "MakerNotes:PeripheralLightingSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 70
   */
  "MakerNotes:PeripheralLightingValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On (73-point)"
   */
  "MakerNotes:PhaseDetectAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Vivid"
   */
  "MakerNotes:PhotoEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "F7248739-9D7D-45ED-8B0C-63530491EEA8"
   */
  "MakerNotes:PhotoIdentifier"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Info Up-down, Playback Left-right"
   */
  "MakerNotes:PhotoInfoPlayback"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1
   */
  "MakerNotes:PhotosAppFeatureFlags"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "A"
   */
  "MakerNotes:PhotoShootingMenuBank"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "FX (36x24)"
   */
  "MakerNotes:PhotoShootingMenuBankImageArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Vivid"
   */
  "MakerNotes:PhotoStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Quick Adjust"
   */
  "MakerNotes:PictureControlAdjust"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Vivid"
   */
  "MakerNotes:PictureControlBase"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Vivid"
   */
  "MakerNotes:PictureControlName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:PictureControlQuickAdjust"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0310"
   */
  "MakerNotes:PictureControlVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:PictureEffect"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Natural"
   */
  "MakerNotes:PictureFinish"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "i-Enhance; 2"
   */
  "MakerNotes:PictureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:PictureModeBWFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1 (min -2, max 2)"
   */
  "MakerNotes:PictureModeContrast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:PictureModeEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 (min -2, max 2)"
   */
  "MakerNotes:PictureModeSaturation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2 (min -2, max 2)"
   */
  "MakerNotes:PictureModeSharpness"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:PictureModeStrength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:PictureModeTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "VV2"
   */
  "MakerNotes:PictureProfile"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "User Def. 3"
   */
  "MakerNotes:PictureStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a; n/a; n/a"
   */
  "MakerNotes:PictureStylePC"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Standard; Standard; Standard"
   */
  "MakerNotes:PictureStyleUserDef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Low"
   */
  "MakerNotes:Pitch"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8.3
   */
  "MakerNotes:PitchAngle"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:PixelAspectRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:PixelShiftActive"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:PixelShiftInfo"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:PixelShiftResolution"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:PixelShiftShooting"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:PlaybackFlickDown"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:PlaybackFlickUp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "5 min"
   */
  "MakerNotes:PlaybackMenusTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "20 s"
   */
  "MakerNotes:PlaybackMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Use Separate Zoom Buttons"
   */
  "MakerNotes:PlaybackZoom"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto Rotate"
   */
  "MakerNotes:PlayDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "MakerNotes:POILevel"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:PopupFlash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:PortraitImpressionBalance"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:PortraitRefiner"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Post Focus Auto Merging or None"
   */
  "MakerNotes:PostFocusMerging"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Max"
   */
  "MakerNotes:PostReleaseBurstLength"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Body Battery"
   */
  "MakerNotes:PowerAvailable"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 102
   */
  "MakerNotes:PowerOnDirectoryNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9974
   */
  "MakerNotes:PowerOnFileNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:06:11 11:07:34"
   */
  "MakerNotes:PowerOnTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "External Power Supply"
   */
  "MakerNotes:PowerSource"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2024:09:23 17:07:09"
   */
  "MakerNotes:PowerUpTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:PreAF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 3.2996109
   */
  "MakerNotes:PreCaptureFrames"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:PreReleaseBurstLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Daylight"
   */
  "MakerNotes:PresetWhiteBalance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Preview"
   */
  "MakerNotes:PreviewButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:PreviewButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "(Binary data 37244 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "28 28 0 0"
   */
  "MakerNotes:PreviewImageBorders"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 768
   */
  "MakerNotes:PreviewImageHeight"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9983
   */
  "MakerNotes:PreviewImageLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "720x480"
   * @remarks Dimensions of the embedded preview image (e.g., '816x459').
   * Read-only composite. Useful for checking preview size without extracting binary data.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:PreviewImageSize"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9910
   */
  "MakerNotes:PreviewImageStart"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example true
   */
  "MakerNotes:PreviewImageValid"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 640
   */
  "MakerNotes:PreviewImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:PreviewQuality"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example 8
   */
  "MakerNotes:PrimaryAFPoint"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "XQD Card"
   */
  "MakerNotes:PrimarySlot"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF"
   */
  "MakerNotes:PrioritySetupShutterRelease"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Neither warping nor relighting is required -> proceeds to…tiZoom."
   */
  "MakerNotes:ProcessingNotes"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9.987
   */
  "MakerNotes:ProductionCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:ProgramISO"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:ProgramLine"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (160)"
   */
  "MakerNotes:ProgramMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:ProgramShift"?: number;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "Unknown (5)"
   */
  "MakerNotes:Quality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Exposure comp/Aperture"
   */
  "MakerNotes:QuickControlDialInMeter"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:QuickShot"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Single"
   */
  "MakerNotes:QuietShutterShootingSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:RangeFinder"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example 5
   * @remarks Star rating for the image. MWG composite tag from XMP-xmp:Rating.
   * Valid values: -1 (rejected), 0 (unrated), 1-5 (star rating)
   * Note: Rating may appear in EXIF but that's non-standard per MWG. Only XMP writes are supported.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "MakerNotes:Rating"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "RAW+Small/Normal"
   */
  "MakerNotes:RawAndJpgRecording"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:RawBurstImageCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:RawBurstImageNum"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Little-endian (Intel, II)"
   */
  "MakerNotes:RawDataByteOrder"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Unchanged"
   */
  "MakerNotes:RawDataCFAPattern"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:RawDataLength"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 16
   */
  "MakerNotes:RawDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off; 0; 0; 0"
   */
  "MakerNotes:RawDevArtFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:RawDevAutoGradation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "sRGB"
   */
  "MakerNotes:RawDevColorSpace"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0 0"
   */
  "MakerNotes:RawDevContrastValue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Original"
   */
  "MakerNotes:RawDevEditStatus"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "9 (Q)"
   */
  "MakerNotes:RawDevelopmentProcess"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (2)"
   */
  "MakerNotes:RawDevEngine"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:RawDevExposureBiasValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:RawDevGradation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0 0"
   */
  "MakerNotes:RawDevGrayPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:RawDevMemoryColorEmphasis"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Noise Filter"
   */
  "MakerNotes:RawDevNoiseReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Natural"
   */
  "MakerNotes:RawDevPictureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 -2 2"
   */
  "MakerNotes:RawDevPMContrast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2 0 -2 1"
   */
  "MakerNotes:RawDevPMNoiseFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (0)"
   */
  "MakerNotes:RawDevPMPictureTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 -2 2"
   */
  "MakerNotes:RawDevPMSaturation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 -2 2"
   */
  "MakerNotes:RawDevPMSharpness"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0 0"
   */
  "MakerNotes:RawDevSaturationEmphasis"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(none)"
   */
  "MakerNotes:RawDevSettings"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0 0"
   */
  "MakerNotes:RawDevSharpnessValue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0100"
   */
  "MakerNotes:RawDevVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:RawDevWBFineAdjustment"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (3)"
   */
  "MakerNotes:RawDevWhiteBalance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:RawDevWhiteBalanceValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   * @remarks Sony RAW compression setting: 'Compressed RAW', 'Uncompressed RAW', or 'Lossless Compressed RAW'.
   * Introduced 2015 for uncompressed 14-bit RAW support.
   */
  "MakerNotes:RAWFileType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4144 2760"
   */
  "MakerNotes:RawImageCenter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8750
   */
  "MakerNotes:RawImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7752
   */
  "MakerNotes:RawImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "RAW"
   */
  "MakerNotes:RawJpgQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Large"
   */
  "MakerNotes:RawJpgSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "95215 190283 189698 116484"
   */
  "MakerNotes:RawMeasuredRGGB"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Release Mode"
   */
  "MakerNotes:RearControPanelDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ISO"
   */
  "MakerNotes:RearDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto Rotate"
   */
  "MakerNotes:RecordDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 58
   */
  "MakerNotes:RecordID"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "JPEG"
   */
  "MakerNotes:RecordingFormat"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:RecordingMode"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "TIF+JPEG"
   */
  "MakerNotes:RecordMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Record while down"
   */
  "MakerNotes:RecordShutterRelease"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 886 bytes, use -b option to extract)"
   */
  "MakerNotes:RectifaceText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 38.625
   */
  "MakerNotes:RedBalance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:RedEyeReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:RedEyeRemoval"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8D"
   */
  "MakerNotes:RedGain"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "MakerNotes:ReleaseButtonToUseDial"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "Unknown (7)"
   */
  "MakerNotes:ReleaseMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:RemoteFuncButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:RemoteOnDuration"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 10
   */
  "MakerNotes:RepeatingFlashCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/32"
   */
  "MakerNotes:RepeatingFlashOutput"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:RepeatingFlashOutputExternal"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "10 Hz"
   */
  "MakerNotes:RepeatingFlashRate"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:Resaved"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 6
   */
  "MakerNotes:Resolution"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "MED"
   */
  "MakerNotes:ResolutionMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example "inches"
   */
  "MakerNotes:ResolutionUnit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Flags 0xc77"
   */
  "MakerNotes:RestrictDriveModes"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Unknown ()"
   */
  "MakerNotes:RetouchHistory"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0200"
   */
  "MakerNotes:RetouchInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:RetouchNEFProcessing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Enable"
   */
  "MakerNotes:RetractLensOnPowerOff"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:ReverseExposureCompDial"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Not Reversed"
   */
  "MakerNotes:ReverseFocusRing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "- 0 +"
   */
  "MakerNotes:ReverseIndicators"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:ReverseShutterSpeedAperture"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Varies With Rotation Speed"
   */
  "MakerNotes:RFLensMFFocusRingSensitivity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:RFLensType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "2012:03:29 18:17:52"
   */
  "MakerNotes:RicohDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 960
   */
  "MakerNotes:RicohImageHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example 640
   */
  "MakerNotes:RicohImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "XG-1Pentax"
   */
  "MakerNotes:RicohMake"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "RICOH WG-M1"
   */
  "MakerNotes:RicohModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example -6.1
   */
  "MakerNotes:Roll"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 90.5
   */
  "MakerNotes:RollAngle"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "USA"
   */
  "MakerNotes:ROMOperationMode"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "Unknown (0)"
   * @remarks Degrees of clockwise camera rotation for QuickTime/MP4 video files.
   * Special writable: Writing this tag updates QuickTime MatrixStructure for all tracks with a non-zero image size simultaneously.
   * Different from EXIF Orientation tag.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:Rotation"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:RunTimeEpoch"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Valid"
   */
  "MakerNotes:RunTimeFlags"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1000000000
   */
  "MakerNotes:RunTimeScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 987823130000000
   */
  "MakerNotes:RunTimeValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Enable (Tv/Av)"
   */
  "MakerNotes:SafetyShift"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:SafetyShiftInAvOrTv"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Disable"
   */
  "MakerNotes:SameExposureForNewAperture"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "WP10 / VLUU WP10 / AQ100"
   */
  "MakerNotes:SamsungModelID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "Unknown (0x211)"
   */
  "MakerNotes:SanyoQuality"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 10313 bytes, use -b option to extract)"
   */
  "MakerNotes:SanyoThumbnail"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example "n/a"
   */
  "MakerNotes:Saturation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 1
   */
  "MakerNotes:SaturationAdj"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:SaturationAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 655360
   */
  "MakerNotes:SaturationFaithful"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 8650752
   */
  "MakerNotes:SaturationLandscape"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6619136
   */
  "MakerNotes:SaturationNeutral"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6553609
   */
  "MakerNotes:SaturationPortrait"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:SaturationSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3
   */
  "MakerNotes:SaturationStandard"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SaveFocus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ScanImageEnhancer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Two-Shot"
   */
  "MakerNotes:SceneAssist"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9
   */
  "MakerNotes:SceneDetect"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "n/a"
   */
  "MakerNotes:SceneMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (9)"
   */
  "MakerNotes:SceneModeUsed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unrecognized"
   */
  "MakerNotes:SceneRecognition"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "User 1"
   */
  "MakerNotes:SceneSelect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ScreenTips"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (1)"
   */
  "MakerNotes:SecondarySlotFunction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "45 points"
   */
  "MakerNotes:SelectableAFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Single-point AF, Auto, Zone AF, Spot AF, [6], [8], [9], […], [14]"
   */
  "MakerNotes:SelectAFAreaSelectionMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (87)"
   */
  "MakerNotes:SelectAFAreaSelectMode"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (20%)
   * @example "Self-timer 5 or 10 s"
   */
  "MakerNotes:SelfTimer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0.5 s"
   */
  "MakerNotes:SelfTimerInterval"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9
   */
  "MakerNotes:SelfTimerShotCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1 s"
   */
  "MakerNotes:SelfTimerShotInterval"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "5 s"
   */
  "MakerNotes:SelfTimerTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"_0":1,"_1":0,"_2":0,"_3":0}
   */
  "MakerNotes:SemanticStyle"?: Struct;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "MakerNotes:SemanticStylePreset"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "MakerNotes:SemanticStyleRenderingVer"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:SensitivityAdjust"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "As EV Steps"
   */
  "MakerNotes:SensitivitySteps"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "front-main-mot_s5k5e9"
   */
  "MakerNotes:Sensor"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 14
   */
  "MakerNotes:SensorBitDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 4214
   */
  "MakerNotes:SensorBlueLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 5893
   */
  "MakerNotes:SensorBottomBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "4095 646"
   */
  "MakerNotes:SensorCalibration"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable"
   */
  "MakerNotes:SensorCleaning"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2472
   */
  "MakerNotes:SensorFullHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3288
   */
  "MakerNotes:SensorFullWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 5920
   */
  "MakerNotes:SensorHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "53HQK1V0M100UV"
   */
  "MakerNotes:SensorID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 88
   */
  "MakerNotes:SensorLeftBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "9.4 x 9.4 um"
   */
  "MakerNotes:SensorPixelSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 4370
   */
  "MakerNotes:SensorRedLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8883
   */
  "MakerNotes:SensorRightBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7.576 x 5.682 mm"
   */
  "MakerNotes:SensorSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "80.9 C"
   */
  "MakerNotes:SensorTemperature"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 96
   */
  "MakerNotes:SensorTopBorder"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "MakerNotes:SensorType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 8896
   */
  "MakerNotes:SensorWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5 of 5"
   */
  "MakerNotes:Sequence"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 4
   */
  "MakerNotes:SequenceFileNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 4
   */
  "MakerNotes:SequenceImageNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Continuous"
   */
  "MakerNotes:SequenceLength"?: string;

  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example 5
   */
  "MakerNotes:SequenceNumber"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "5 frames/s"
   */
  "MakerNotes:SequenceShotInterval"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (28928)"
   */
  "MakerNotes:SequentialShot"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "sw02028104 "
   */
  "MakerNotes:SerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Format 2"
   */
  "MakerNotes:SerialNumberFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Case Manual"
   */
  "MakerNotes:ServoAFCharacteristics"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Set: Picture Style"
   */
  "MakerNotes:SetButtonCrossKeysFunc"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (37 0)"
   */
  "MakerNotes:SetButtonWhenShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Default (no function)"
   */
  "MakerNotes:SetFunctionWhenShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "On"
   */
  "MakerNotes:ShadingCompensation"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Shadow"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:ShadowCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Shadows"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 (normal)"
   */
  "MakerNotes:ShadowTone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On but Disabled"
   */
  "MakerNotes:ShakeReduction"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Normal"
   */
  "MakerNotes:Sharpening"?: string;

  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example 64
   */
  "MakerNotes:Sharpness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3
   */
  "MakerNotes:SharpnessAuto"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 768
   */
  "MakerNotes:SharpnessFactor"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:SharpnessFaithful"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  "MakerNotes:SharpnessFreqTable"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:SharpnessFrequency"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 4
   */
  "MakerNotes:SharpnessLandscape"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 3
   */
  "MakerNotes:SharpnessMonochrome"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:SharpnessNeutral"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 2752758
   */
  "MakerNotes:SharpnessPortrait"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "+3"
   */
  "MakerNotes:SharpnessRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "3 (min -3, max 5)"
   */
  "MakerNotes:SharpnessSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 4
   */
  "MakerNotes:SharpnessStandard"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  "MakerNotes:SharpnessTable"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (0)"
   */
  "MakerNotes:ShootingInfoDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "4 s"
   */
  "MakerNotes:ShootingInfoMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example "Unknown (49)"
   */
  "MakerNotes:ShootingMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Continuous"
   */
  "MakerNotes:ShootingModeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Itsa Myowna"
   */
  "MakerNotes:ShortOwnerName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:ShortReleaseTimeLag"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0811"
   */
  "MakerNotes:ShotInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1116 bytes, use -b option to extract)"
   */
  "MakerNotes:ShotLogDataText"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:ShotNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 9
   */
  "MakerNotes:ShotNumberSincePowerUp"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1493 bytes, use -b option to extract)"
   */
  "MakerNotes:ShotParamsText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:ShotsPerInterval"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Silent / Electronic (0 0 0)"
   */
  "MakerNotes:Shutter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AF/AE lock stop"
   */
  "MakerNotes:ShutterAELButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Metering + AF start"
   */
  "MakerNotes:ShutterButtonAFOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Metering start/Meter + AF start"
   */
  "MakerNotes:ShutterButtonAFOnButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example 998
   */
  "MakerNotes:ShutterCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "MakerNotes:ShutterCount2"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "MakerNotes:ShutterCount3"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2nd-curtain sync"
   */
  "MakerNotes:ShutterCurtainSync"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unknown (4)"
   */
  "MakerNotes:ShutterMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Single Shot"
   */
  "MakerNotes:ShutterReleaseMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:ShutterReleaseNoCFCard"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Priority on focus"
   */
  "MakerNotes:ShutterReleaseTiming"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Enable"
   */
  "MakerNotes:ShutterReleaseWithoutLens"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1/500"
   * @remarks Shutter speed combining ExposureTime, ShutterSpeedValue, and BulbDuration.
   * Read-only composite tag. Format typically fractional (e.g., '1/250').
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MakerNotes:ShutterSpeed"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:ShutterSpeedLock"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Manual: Hi 1/8123; Lo 31.9; Auto: Hi 1/8123; Lo 31.9"
   */
  "MakerNotes:ShutterSpeedRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/91"
   */
  "MakerNotes:ShutterSpeedSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/99"
   */
  "MakerNotes:ShutterSpeedValue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Normal"
   */
  "MakerNotes:ShutterType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 63.176895
   */
  "MakerNotes:SignalToNoiseRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On"
   */
  "MakerNotes:SilentPhotography"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "MakerNotes:SingleFrame"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Low"
   */
  "MakerNotes:SingleFrameBracketing"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SkinToneCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0…0 0 0 0"
   */
  "MakerNotes:SlaveFlashMeteringSegments"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "n/a"
   */
  "MakerNotes:SlowShutter"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "On"
   */
  "MakerNotes:SlowSync"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:SmartAlbumColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SmileShutter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Slight Smile"
   */
  "MakerNotes:SmileShutterMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:SoftFocusFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:SoftSkinEffect"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "MakerNotes:Software"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2026:03:25 01:18:34.000Z"
   */
  "MakerNotes:SoftwareDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "2025:09:20 15:00:47"
   */
  "MakerNotes:SonyDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "MakerNotes:SonyDateTime2"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "1/97"
   */
  "MakerNotes:SonyExposureTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 8.8
   */
  "MakerNotes:SonyFNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 65535
   */
  "MakerNotes:SonyImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 6376
   */
  "MakerNotes:SonyImageHeightMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Small (3:2)"
   */
  "MakerNotes:SonyImageSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 9504
   */
  "MakerNotes:SonyImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 9568
   */
  "MakerNotes:SonyImageWidthMax"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 926
   */
  "MakerNotes:SonyISO"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5.5
   */
  "MakerNotes:SonyMaxAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 6.5
   */
  "MakerNotes:SonyMaxApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 34
   */
  "MakerNotes:SonyMinAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "ZV-E10M2"
   */
  "MakerNotes:SonyModelID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Fine"
   */
  "MakerNotes:SonyQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"_ctor":"ExifTime","hour":16,"minute":10,"second":0,"ra…48:36"]
   */
  "MakerNotes:SonyTimeMinSec"?: ExifTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 100
   */
  "MakerNotes:SourceDirectoryIndex"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 60
   */
  "MakerNotes:SourceFileIndex"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 24576
   */
  "MakerNotes:SpecialEffectLevel"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SpecialEffectMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (15)"
   */
  "MakerNotes:SpecialEffectSetting"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "Unknown (962), Sequence: 0, Panorama: (none)"
   */
  "MakerNotes:SpecialMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 9966
   */
  "MakerNotes:SpecularWhiteLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1 stop"
   */
  "MakerNotes:SpeedIncrements"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.10"
   */
  "MakerNotes:SpeedX"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+6.10"
   */
  "MakerNotes:SpeedY"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.00"
   */
  "MakerNotes:SpeedZ"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Soccer"
   */
  "MakerNotes:SportEvents"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1632
   */
  "MakerNotes:SpotFocusPointX"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 960
   */
  "MakerNotes:SpotFocusPointY"?: number;

  /**
   * @frequency 🔥 ★☆☆☆ (9%)
   * @example "Center"
   */
  "MakerNotes:SpotMeteringMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable (use active AF point)"
   */
  "MakerNotes:SpotMeterLinkToAFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "MakerNotes:SRActive"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "sRAW2 (sRAW)"
   */
  "MakerNotes:SRAWQuality"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "97 mm"
   */
  "MakerNotes:SRFocalLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4.25 s or longer"
   */
  "MakerNotes:SRHalfPressTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Stabilized, [1], [2], [3], [4]"
   */
  "MakerNotes:SRResult"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Tripod high resolution"
   */
  "MakerNotes:StackedImage"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "6 s"
   */
  "MakerNotes:StandbyMonitorOffTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "6 s"
   */
  "MakerNotes:StandbyTimer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Default (from LV)"
   */
  "MakerNotes:StartMovieShooting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "MIDDLESEX"
   */
  "MakerNotes:State"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1321 bytes, use -b option to extract)"
   */
  "MakerNotes:StaticMetadataText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 8
   */
  "MakerNotes:StopsAboveBaseISO"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Padded"
   */
  "MakerNotes:StorageMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:StoreByOrientation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "10 Frames"
   */
  "MakerNotes:SubDialFrameAdvance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0 0"
   */
  "MakerNotes:SubjectDetectArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0 0"
   */
  "MakerNotes:SubjectDetectDetail"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "640 480"
   */
  "MakerNotes:SubjectDetectFrameSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "People"
   * @remarks Nikon Z series subject detection mode.
   * Values: 'Off', 'Auto', 'People', 'Animals', 'Vehicles', 'Birds', 'Airplanes'.
   * Indicates what the camera's AI was configured to detect during capture.
   */
  "MakerNotes:SubjectDetection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SubjectDetectionAreaMF"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No Subject or Face Detected"
   */
  "MakerNotes:SubjectDetectStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Steady"
   */
  "MakerNotes:SubjectMotion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:SubjectProgram"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SubjectRecognition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "On Subject"
   */
  "MakerNotes:SubjectSwitching"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "People"
   */
  "MakerNotes:SubjectToDetect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Focus Point Selection"
   */
  "MakerNotes:SubSelector"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Focus Point Selection"
   */
  "MakerNotes:SubSelectorAssignment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Virtual Horizon"
   */
  "MakerNotes:SubSelectorCenter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:SubSelectorPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 1214 bytes, use -b option to extract)"
   */
  "MakerNotes:SummaryText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:SuperimposedDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:SuperMacro"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 100
   */
  "MakerNotes:SvISOSetting"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Right"
   */
  "MakerNotes:SweepPanoramaDirection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:SweepPanoramaFieldOfView"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Wide"
   */
  "MakerNotes:SweepPanoramaSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable"
   */
  "MakerNotes:SwitchToRegisteredAFPoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Sync"
   */
  "MakerNotes:SyncReleaseMode"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9
   */
  "MakerNotes:TargetAperture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4
   */
  "MakerNotes:TargetCompressionRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "476 mm"
   */
  "MakerNotes:TargetDistanceSetting"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "1/813"
   */
  "MakerNotes:TargetExposureTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Real-world Subject"
   */
  "MakerNotes:TargetImageType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "None"
   */
  "MakerNotes:Teleconverter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "n/a"
   */
  "MakerNotes:TextEncoding"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:TextStamp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "THM_0043.JPG"
   */
  "MakerNotes:ThumbnailFileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 120
   */
  "MakerNotes:ThumbnailHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 9108 bytes, use -b option to extract)"
   * @remarks Embedded thumbnail image data. Binary data type.
   * Writable for updating existing thumbnails, but cannot create or delete thumbnails.
   */
  "MakerNotes:ThumbnailImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "0 159 7 112"
   */
  "MakerNotes:ThumbnailImageValidArea"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 13181
   * @remarks Size in bytes of the embedded JPEG thumbnail.
   * Useful for checking thumbnail availability without extracting binary data.
   */
  "MakerNotes:ThumbnailLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 160
   */
  "MakerNotes:ThumbnailWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 7404 bytes, use -b option to extract)"
   */
  "MakerNotes:TiffMeteringImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 30
   */
  "MakerNotes:TiffMeteringImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 44
   */
  "MakerNotes:TiffMeteringImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "23:50:41"
   */
  "MakerNotes:Time"?: ExifTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "23:59:46.92"
   */
  "MakerNotes:TimeCreated"?: ExifTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 50336257
   */
  "MakerNotes:TimeLapseShotNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 5032 bytes, use -b option to extract)"
   */
  "MakerNotes:TimeLogText"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Self-timer"
   */
  "MakerNotes:TimerFunctionButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable; 6 s: 6; 16 s: 16; After release: 2"
   */
  "MakerNotes:TimerLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:TimerRecording"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "01:48:53.63"
   */
  "MakerNotes:TimeSincePowerOn"?: ExifTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "2025:06:11 11:07:41.57"
   */
  "MakerNotes:TimeStamp"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ★☆☆☆ (6%)
   * @example "-09:00"
   */
  "MakerNotes:TimeZone"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "n/a"
   */
  "MakerNotes:TimeZoneCity"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:TimeZoneCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:TimeZoneInfo"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example ""
   * @remarks Image title. XMP-dc (Dublin Core) namespace - use this standard schema instead of non-standard XMP-xmp:Title.
   * Supports language variants via RFC 3066 codes (e.g., 'Title-fr'). Using 'x-default' language code preserves other existing languages when writing.
   * @see https://exiftool.org/TagNames/XMP.html#dc
   */
  "MakerNotes:Title"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Normal"
   */
  "MakerNotes:ToneComp"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Standard"
   */
  "MakerNotes:ToneCurve"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 95 bytes, use -b option to extract)"
   */
  "MakerNotes:ToneCurveMatching"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 1505 bytes, use -b option to extract)"
   */
  "MakerNotes:ToneCurveTable"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Highlights; 0; -7; 7; Shadows; 0; -7; 7; Midtones; 0; -7;…0; 0; 0"
   */
  "MakerNotes:ToneLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:ToningEffect"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:ToningEffectAuto"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "None"
   */
  "MakerNotes:ToningEffectMonochrome"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:ToningSaturation"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5
   */
  "MakerNotes:TotalZoom"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:TouchAE"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:ToyCameraFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:Transform"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Normal (set center AF point)"
   */
  "MakerNotes:TrashButtonFunction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "n/a"
   */
  "MakerNotes:TravelDay"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Motion Detection"
   */
  "MakerNotes:TriggerMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/64"
   */
  "MakerNotes:TvExposureTimeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7860345b882000641403450101000000170d0f1d0f11827ca3111430d3000000"
   */
  "MakerNotes:UniqueID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "ZME151000007"
   */
  "MakerNotes:UnknownNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 4
   */
  "MakerNotes:UnsharpMaskFineness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 4
   */
  "MakerNotes:UnsharpMaskThreshold"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 5411 bytes, use -b option to extract)"
   */
  "MakerNotes:UnusedLoggingMetadata"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Flags 0xf0"
   */
  "MakerNotes:UsableMeteringModes"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Flags 0x3f"
   */
  "MakerNotes:UsableShootingModes"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Enable"
   */
  "MakerNotes:USBPowerDelivery"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (4)"
   */
  "MakerNotes:UserDef1PictureStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (0)"
   */
  "MakerNotes:UserDef2PictureStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (4)"
   */
  "MakerNotes:UserDef3PictureStyle"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "PC900 COVERT PRO"
   */
  "MakerNotes:UserLabel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "dpreview  "
   */
  "MakerNotes:UserProfile"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (3)"
   */
  "MakerNotes:USMLensElectronicMF"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 99
   */
  "MakerNotes:ValidAFPoints"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "12 0"
   */
  "MakerNotes:ValidBits"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "n/a"
   */
  "MakerNotes:VariableLowPassFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Scene Auto"
   */
  "MakerNotes:VariProgram"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example "0130"
   */
  "MakerNotes:Version"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Same as AF-On Button"
   */
  "MakerNotes:VerticalAFOnButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Exposure Compensation"
   */
  "MakerNotes:VerticalFuncButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:VerticalFuncButtonPlusDials"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Same as AF-On"
   */
  "MakerNotes:VerticalMovieAFOnButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "MakerNotes:VerticalMovieFuncButton"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Same as MultiSelector"
   */
  "MakerNotes:VerticalMultiSelector"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Enable"
   */
  "MakerNotes:VFDisplayIllumination"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:VibrationReduction"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:VideoBurstMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (0)"
   */
  "MakerNotes:VideoBurstResolution"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:VideoFrameRate"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "No"
   */
  "MakerNotes:VideoPreburst"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Frame Count"
   */
  "MakerNotes:ViewfinderDisplay"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:ViewfinderWarning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Monochrome, WB corrected, One-touch image quality, Noise …on, HDR"
   */
  "MakerNotes:ViewfinderWarnings"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Disable"
   */
  "MakerNotes:ViewInfoDuringExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ViewFinder"
   */
  "MakerNotes:ViewingMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:Vignette"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:VignetteControl"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0100"
   */
  "MakerNotes:VignetteCorrectionVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:Vignetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "n/a"
   */
  "MakerNotes:VignettingCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "96 240 384 544 720 896 1088 1280 1488 1696 1920 2128 2368…8 15280"
   */
  "MakerNotes:VignettingCorrParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 97
   */
  "MakerNotes:VignettingCorrVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:VoiceMemo"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (7%)
   * @example 0
   */
  "MakerNotes:VRDOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "0200"
   */
  "MakerNotes:VRInfoVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Sport"
   */
  "MakerNotes:VRMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Unknown (1)"
   */
  "MakerNotes:VRType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9974
   */
  "MakerNotes:WakeFileNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Off"
   */
  "MakerNotes:WatercolorFilter"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 735
   */
  "MakerNotes:WBBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 9235
   */
  "MakerNotes:WBBlueLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "WB Bracketing Disabled"
   */
  "MakerNotes:WBBracketingSteps"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "Off"
   */
  "MakerNotes:WBBracketMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:WBBracketShotNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 0
   */
  "MakerNotes:WBBracketValueAB"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 0
   */
  "MakerNotes:WBBracketValueGM"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Select To Send (PC)"
   */
  "MakerNotes:WBButtonPlaybackMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 302
   */
  "MakerNotes:WBGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 60416
   */
  "MakerNotes:WBGreenLevel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Rear LCD panel"
   */
  "MakerNotes:WBMediaImageSizeSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (1 1)"
   */
  "MakerNotes:WBMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 640
   */
  "MakerNotes:WBRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 834
   */
  "MakerNotes:WBRedLevel"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2 2 2 2"
   */
  "MakerNotes:WBScale"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example 7
   */
  "MakerNotes:WBShiftAB"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:WBShiftCreativeControl"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example 0
   */
  "MakerNotes:WBShiftGM"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "MakerNotes:WBShiftIntelligentAuto"?: number;

  /**
   * @frequency 🔥 ★★★☆ (40%)
   * @example "White Preset"
   * @remarks White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual).
   * MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc.
   * EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "MakerNotes:WhiteBalance"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:WhiteBalanceAutoAdjustment"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example 0
   */
  "MakerNotes:WhiteBalanceBias"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 796
   */
  "MakerNotes:WhiteBalanceBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:WhiteBalanceBracket"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:WhiteBalanceBracketing"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Red +0, Blue +0"
   */
  "MakerNotes:WhiteBalanceFineTune"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
   */
  "MakerNotes:WhiteBalanceMatching"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "User-Selected"
   */
  "MakerNotes:WhiteBalanceMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example 642
   */
  "MakerNotes:WhiteBalanceRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Tungsten"
   */
  "MakerNotes:WhiteBalanceSet"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Custom 1"
   */
  "MakerNotes:WhiteBalanceSetting"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "MakerNotes:WhiteBalanceSetup"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 2201 bytes, use -b option to extract)"
   */
  "MakerNotes:WhiteBalanceTable"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "Auto"
   */
  "MakerNotes:WhiteBalanceTemperature"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 0
   */
  "MakerNotes:WhiteBoard"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "15360 15360 15360"
   */
  "MakerNotes:WhiteLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "9696 8192 8192 7136"
   */
  "MakerNotes:WhitePoint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "MakerNotes:WholeAreaTracking"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Not Attached"
   */
  "MakerNotes:WideAdapter"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (9)"
   */
  "MakerNotes:WideFocusZone"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:WideRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Hometown"
   */
  "MakerNotes:WorldTimeLocation"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.2
   */
  "MakerNotes:X3FillLight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 512 bytes, use -b option to extract)"
   */
  "MakerNotes:Xidiri"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example 72
   */
  "MakerNotes:XResolution"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0.83734368
   */
  "MakerNotes:Yaw"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 99
   */
  "MakerNotes:YawAngle"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0.0234375 0.75 0.0625"
   */
  "MakerNotes:YCbCrCoefficients"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "Unknown (512)"
   */
  "MakerNotes:YCbCrPositioning"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2006
   */
  "MakerNotes:YearCreated"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (5%)
   * @example 72
   */
  "MakerNotes:YResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "ISO Setting Used"
   */
  "MakerNotes:ZoneMatching"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "MakerNotes:ZoneMatchingMode"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Unknown (7040)"
   */
  "MakerNotes:ZoneMatchingOn"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "MakerNotes:ZoneMatchingValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 64581 bytes, use -b option to extract)"
   */
  "MakerNotes:ZoomedPreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 92592
   */
  "MakerNotes:ZoomedPreviewLength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "736 544"
   */
  "MakerNotes:ZoomedPreviewSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4184638
   */
  "MakerNotes:ZoomedPreviewStart"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 768
   */
  "MakerNotes:ZoomSourceWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example 8
   */
  "MakerNotes:ZoomStepCount"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 6000
   */
  "MakerNotes:ZoomTargetWidth"?: number;
}

/**
 * The `Meta:` fields of {@link GroupedTags}.
 */
export interface MetaGroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "Meta:BorderID"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "Meta:BorderLocation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "Meta:BorderName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1 0 0 0"
   */
  "Meta:BordersVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "Meta:BorderType"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "KODAK DC5000 ZOOM DIGITAL CAMERA"
   */
  "Meta:CameraOwner"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "Meta:CaptureConditionsPAR"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "Meta:DigitalEffectsName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "Meta:DigitalEffectsType"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1 0 0 0"
   */
  "Meta:DigitalEffectsVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "Meta:EditTagArray"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "Meta:FilmGencode"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 43
   */
  "Meta:FilmProductCode"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "Meta:FilmSize"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 16
   */
  "Meta:FrameNumber"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6
   */
  "Meta:ImageSourceEK"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0110"
   */
  "Meta:MetadataNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Version 9"
   */
  "Meta:ModelAndVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "M530 140163616"
   */
  "Meta:SerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3
   */
  "Meta:WatermarkType"?: number;
}

/**
 * The `MPF:` fields of {@link GroupedTags}.
 */
export interface MPFGroupedTags {
  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9697
   */
  "MPF:DependentImage1EntryNumber"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 960
   */
  "MPF:DependentImage2EntryNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "(Binary data 66 bytes, use -b option to extract)"
   */
  "MPF:ImageUIDList"?: BinaryField | string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "0100"
   */
  "MPF:MPFVersion"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Representative image, Dependent parent image"
   */
  "MPF:MPImageFlags"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Unknown (4)"
   */
  "MPF:MPImageFormat"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 999325
   */
  "MPF:MPImageLength"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 9999872
   */
  "MPF:MPImageStart"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "Undefined"
   */
  "MPF:MPImageType"?: string;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example 3
   */
  "MPF:NumberOfImages"?: number;

  /**
   * @frequency 🔥 ★★☆☆ (10%)
   * @example "(Binary data 473516 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "MPF:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 1
   */
  "MPF:TotalFrames"?: number;
}

/**
 * The `PanasonicRaw:` fields of {@link GroupedTags}.
 */
export interface PanasonicRawGroupedTags {
  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 10.1
   * @remarks Lens aperture in APEX units. Secondary source for Aperture composite (FNumber takes priority).
   * Formula: ApertureValue = 2 × log₂(FNumber). To write aperture, prefer FNumber as it's more intuitive.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "PanasonicRaw:ApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "On"
   */
  "PanasonicRaw:DistortionCorrection"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1.0141438
   */
  "PanasonicRaw:DistortionScale"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "No"
   */
  "PanasonicRaw:FlashFired"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "50 mm"
   */
  "PanasonicRaw:FocalLengthIn35mmFormat"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 115
   */
  "PanasonicRaw:FocusStepCount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "PanasonicRaw:FocusStepNear"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "PanasonicRaw:LensTypeMake"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "12 10"
   */
  "PanasonicRaw:LensTypeModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7
   */
  "PanasonicRaw:NumWBEntries"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   * @remarks Image orientation. Standard EXIF tag 0x112 in IFD0.
   * Valid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW).
   * Most images use values 1, 3, 6, and 8.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "PanasonicRaw:Orientation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "1/203"
   */
  "PanasonicRaw:ShutterSpeedValue"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Auto"
   */
  "PanasonicRaw:WhiteBalanceSet"?: string;
}

/**
 * The `Photoshop:` fields of {@link GroupedTags}.
 *
 * @see https://exiftool.org/TagNames/Photoshop.html
 */
export interface PhotoshopGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example true
   */
  "Photoshop:CopyrightFlag"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "inches"
   */
  "Photoshop:DisplayedUnitsX"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "inches"
   */
  "Photoshop:DisplayedUnitsY"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 30
   */
  "Photoshop:GlobalAltitude"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 90
   */
  "Photoshop:GlobalAngle"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Yes"
   */
  "Photoshop:HasRealMergedData"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "fd826cdf97ac15335b426a20d23c1041"
   */
  "Photoshop:IPTCDigest"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "Photoshop:NumSlices"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Standard"
   */
  "Photoshop:PhotoshopFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9
   */
  "Photoshop:PhotoshopQuality"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 5768 bytes, use -b option to extract)"
   */
  "Photoshop:PhotoshopThumbnail"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "Photoshop:PixelAspectRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0"
   */
  "Photoshop:PrintPosition"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "Photoshop:PrintScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Centered"
   */
  "Photoshop:PrintStyle"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Adobe Photoshop CS5"
   */
  "Photoshop:ReaderName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "panasonic_lumix_dmc_lx15_02"
   */
  "Photoshop:SlicesGroupName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Adobe Photoshop"
   */
  "Photoshop:WriterName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 72
   */
  "Photoshop:XResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 72
   */
  "Photoshop:YResolution"?: number;
}

/**
 * The `PrintIM:` fields of {@link GroupedTags}.
 */
export interface PrintIMGroupedTags {
  /**
   * @frequency 🔥 ★★★☆ (30%)
   * @example "0300"
   */
  "PrintIM:PrintIMVersion"?: string;
}

/**
 * The `QuickTime:` fields of {@link GroupedTags}.
 */
export interface QuickTimeGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 60
   */
  "QuickTime:AndroidCaptureFPS"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7.1
   */
  "QuickTime:AndroidVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 4 bytes, use -b option to extract)"
   */
  "QuickTime:AndroidVideoTemporalLayersCount"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "QuickTime:AudioBitsPerSample"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "QuickTime:AudioChannels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "sowt"
   */
  "QuickTime:AudioFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8000
   */
  "QuickTime:AudioSampleRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Panasonic"
   */
  "QuickTime:AudioVendorID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Norm De Plume"
   */
  "QuickTime:Author"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "65535 65535 65535"
   */
  "QuickTime:BackgroundColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:Balance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 24
   */
  "QuickTime:BitDepth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:ChapterListTrackID"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3840x2160"
   */
  "QuickTime:CleanApertureDimensions"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1308
   */
  "QuickTime:CleanApertureHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:CleanApertureOffsetX"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:CleanApertureOffsetY"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1920
   */
  "QuickTime:CleanApertureWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "SMPTE EG 432-1"
   */
  "QuickTime:ColorPrimaries"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "nclx"
   */
  "QuickTime:ColorProfiles"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["qt  ","CAEP"]
   */
  "QuickTime:CompatibleBrands"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "jpeg"
   */
  "QuickTime:CompressorID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Photo - JPEG"
   */
  "QuickTime:CompressorName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "CanonAVC0005"
   */
  "QuickTime:CompressorVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Track 1"
   */
  "QuickTime:ContentDescribes"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "E94FB74B-EDAB-447D-B1FB-0CF791A74550"
   */
  "QuickTime:ContentIdentifier"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:18"
   * @remarks When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.
   * Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images.
   * For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "QuickTime:CreateDate"?: ExifDateTime | ExifDate | string | number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 12:15:18-07:00"
   */
  "QuickTime:CreationDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 s"
   */
  "QuickTime:CurrentTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.5095
   * @remarks Video/audio duration. QuickTime: stored in time scale units, converted to seconds using TimeScale.
   * ExifTool formats as 'H:MM:SS' or seconds. Some iPhone live-photo MOV videos may show key frame time instead of total duration.
   * @see https://exiftool.org/TagNames/QuickTime.html
   */
  "QuickTime:Duration"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3840x2160"
   */
  "QuickTime:EncodedPixelsDimensions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "HD3.22.01.50"
   */
  "QuickTime:FirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 27
   */
  "QuickTime:FocalLengthIn35mmFormat"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Helvetica"
   */
  "QuickTime:FontName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Digital Camera"
   */
  "QuickTime:Format"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "QuickTime:FullFrameRatePlaybackIntent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2.2
   */
  "QuickTime:Gamma"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:GenBalance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0"
   */
  "QuickTime:GenFlags"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ditherCopy"
   */
  "QuickTime:GenGraphicsMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:GenMediaVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "32768 32768 32768"
   */
  "QuickTime:GenOpColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "51 deg 6' 13.32" N, 0 deg 52' 23.52" W, 99.22 m Above Sea Level"
   */
  "QuickTime:GPSCoordinates"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "srcCopy"
   */
  "QuickTime:GraphicsMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Media Handler"
   */
  "QuickTime:HandlerClass"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "VideoHandle"
   */
  "QuickTime:HandlerDescription"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Video Track"
   */
  "QuickTime:HandlerType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Panasonic"
   */
  "QuickTime:HandlerVendorID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 720
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "QuickTime:ImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8192
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "QuickTime:ImageWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 2025677 bytes, use -b option to extract)"
   * @remarks Embedded JPEG preview extracted from RAW files. Binary data type.
   * Access via BinaryField to get raw bytes or base64 encoding.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "QuickTime:JpgFromRaw"?: BinaryField | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Stereo"
   */
  "QuickTime:LayoutFlags"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "iPhone 13 Pro back camera 5.7mm f/1.5"
   */
  "QuickTime:LensModel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "LAB5071800129531"
   */
  "QuickTime:LensSerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5.700385
   */
  "QuickTime:LocationAccuracyHorizontal"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "MP4 v2 [ISO 14496-14]"
   */
  "QuickTime:MajorBrand"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Apple"
   * @remarks Camera/device manufacturer. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "QuickTime:Make"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "BT.709"
   */
  "QuickTime:MatrixCoefficients"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1 0 0 0 1 0 0 0 1"
   */
  "QuickTime:MatrixStructure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:18"
   * @remarks Creation date/time for QuickTime/MOV/MP4 media track. Stored as seconds since 1904-01-01 UTC.
   * WARNING: Many cameras incorrectly store local time instead of UTC. ExifTool does not assume timezone unless QuickTimeUTC option is set.
   * For MOV/MP4 videos, use this tag instead of DateTimeOriginal.
   * Cannot be truly deleted (set to zero instead) as it's part of binary structure.
   * @see https://exiftool.org/TagNames/QuickTime.html
   */
  "QuickTime:MediaCreateDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 98312
   */
  "QuickTime:MediaDataOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9790496
   */
  "QuickTime:MediaDataSize"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.52
   */
  "QuickTime:MediaDuration"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:MediaHeaderVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "und"
   */
  "QuickTime:MediaLanguageCode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:21"
   */
  "QuickTime:MediaModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 90000
   */
  "QuickTime:MediaTimeScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "583d47d07afe1fbcfa0894d17e66051f07e1230a0000072550c3000000000000"
   */
  "QuickTime:MediaUID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "mett"
   */
  "QuickTime:MetaFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2011.7.0"
   */
  "QuickTime:MinorVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "iPhone 14 Pro"
   * @remarks Camera/device model name. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "QuickTime:Model"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:21"
   * @remarks When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate.
   * Should reflect intentional user edits, not automatic metadata updates. Different from file system modification time.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "QuickTime:ModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:MovieHeaderVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "QuickTime:NextTrackID"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "32768 32768 32768"
   */
  "QuickTime:OpColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "tmcd"
   */
  "QuickTime:OtherFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "65536:65536"
   */
  "QuickTime:PixelAspectRatio"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 59.94006
   */
  "QuickTime:PlaybackFrameRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "SEQ_PLAY"
   */
  "QuickTime:PlayMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 s"
   */
  "QuickTime:PosterTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "QuickTime:PreferredRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "99.61%"
   */
  "QuickTime:PreferredVolume"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:PreviewDuration"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 522136 bytes, use -b option to extract)"
   * @remarks Embedded preview image data extracted from the file.
   * CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.
   * Can only modify previews that already exist in the file.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "QuickTime:PreviewImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 s"
   */
  "QuickTime:PreviewTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "3840x2160"
   */
  "QuickTime:ProductionApertureDimensions"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "mp4a"
   */
  "QuickTime:PurchaseFileFormat"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "QuickTime:SampleDuration"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0 s"
   */
  "QuickTime:SampleTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:SelectionDuration"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 s"
   */
  "QuickTime:SelectionTime"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "43333139313032343731363032300000"
   */
  "QuickTime:SerialNumberHash"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "QuickTime:Software"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 720
   */
  "QuickTime:SourceImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8192
   */
  "QuickTime:SourceImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0 0 0"
   */
  "QuickTime:TextColor"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Plain"
   */
  "QuickTime:TextFace"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (21)"
   */
  "QuickTime:TextFont"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 12
   */
  "QuickTime:TextSize"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "QuickTime:TimecodeTrack"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 90000
   */
  "QuickTime:TimeScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:18"
   */
  "QuickTime:TrackCreateDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 9.5095
   */
  "QuickTime:TrackDuration"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:TrackHeaderVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "QuickTime:TrackID"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "QuickTime:TrackLayer"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:10:21 19:15:21"
   */
  "QuickTime:TrackModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "100.00%"
   */
  "QuickTime:TrackVolume"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "BT.709"
   */
  "QuickTime:TransferCharacteristics"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Panasonic"
   */
  "QuickTime:VendorID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 60
   */
  "QuickTime:VideoFrameRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Limited"
   */
  "QuickTime:VideoFullRangeFlag"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 72
   */
  "QuickTime:XResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 72
   */
  "QuickTime:YResolution"?: number;
}

/**
 * The `RAF:` fields of {@link GroupedTags}.
 */
export interface RAFGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 16
   */
  "RAF:BitsPerSample"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "50 50 50 50"
   */
  "RAF:BlackLevel"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…8888889"
   */
  "RAF:ChromaticAberrationParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "0400"
   */
  "RAF:FirmwareVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "12 12 12 12"
   */
  "RAF:FujiLayout"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…9809875"
   */
  "RAF:GeometricDistortionParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Uncompressed"
   */
  "RAF:RAFCompression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example -1.7
   */
  "RAF:RawExposureBias"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "4:3"
   */
  "RAF:RawImageAspectRatio"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7728x5152"
   */
  "RAF:RawImageCroppedSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7 8"
   */
  "RAF:RawImageCropTopLeft"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8754
   */
  "RAF:RawImageFullHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "7872x5196"
   */
  "RAF:RawImageFullSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7872
   */
  "RAF:RawImageFullWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "No"
   */
  "RAF:RawZoomActive"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "7728x5152"
   */
  "RAF:RawZoomSize"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0x0"
   */
  "RAF:RawZoomTopLeft"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 81805824
   */
  "RAF:StripByteCounts"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 908800
   */
  "RAF:StripOffsets"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "808.8888889 0.3535648995 0.5001828154 0.6124314442 0.7071…3652344"
   */
  "RAF:VignettingParams"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "GRBGBR BGGRGG RGGBGG GBRGRB RGGBGG BGGRGG"
   */
  "RAF:XTransLayout"?: string;
}

/**
 * The `RIFF:` fields of {@link GroupedTags}.
 */
export interface RIFFGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "RIFF:AudioCodec"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 800000
   */
  "RIFF:AudioSampleCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 32000
   */
  "RIFF:AudioSampleRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 64000
   */
  "RIFF:AvgBytesPerSec"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   */
  "RIFF:BitsPerSample"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2009:10:27 12:14:00"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "RIFF:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Microsoft PCM"
   */
  "RIFF:Encoding"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 600
   */
  "RIFF:FrameCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 24
   */
  "RIFF:FrameRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 720
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "RIFF:ImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 320
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "RIFF:ImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "478.6 kB/s"
   */
  "RIFF:MaxDataRate"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "RIFF:NumChannels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 10000
   */
  "RIFF:Quality"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 32000
   */
  "RIFF:SampleRate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Variable"
   */
  "RIFF:SampleSize"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "RIFF:Software"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "RIFF:StreamCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Video"
   */
  "RIFF:StreamType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "mjpg"
   */
  "RIFF:VideoCodec"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 600
   */
  "RIFF:VideoFrameCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 24
   */
  "RIFF:VideoFrameRate"?: number;
}

/**
 * The `XMP:` fields of {@link GroupedTags}.
 *
 * @see https://exiftool.org/TagNames/XMP.html
 */
export interface XMPGroupedTags {
  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b"
   */
  "XMP:About"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+823.75"
   */
  "XMP:AbsoluteAltitude"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Twilight Dreams"
   */
  "XMP:Album"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example true
   */
  "XMP:AlreadyApplied"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "RtkAlt"
   */
  "XMP:AltitudeType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   * @remarks Lens aperture in APEX units. Secondary source for Aperture composite (FNumber takes priority).
   * Formula: ApertureValue = 2 × log₂(FNumber). To write aperture, prefer FNumber as it's more intuitive.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6.06
   */
  "XMP:ApproximateFocusDistance"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:AsrClimaxDuration"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "None"
   */
  "XMP:AsrClimaxScene"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:AsrIsMacroRange"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Stable"
   */
  "XMP:AsrSceneCondition"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "NightPortrait"
   */
  "XMP:AsrSceneMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:AutoLateralCA"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ["LWIR"]
   */
  "XMP:BandName"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [8,8,8]
   */
  "XMP:BitsPerSample"?: number[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:BlueHue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:BlueSaturation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 75
   */
  "XMP:Brightness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2.86 EV (24.88 cd/m^2)"
   */
  "XMP:BrightnessValue"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89"
   */
  "XMP:BurstID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:BurstPrimary"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "5c62348a-2bbb-4e4c-89d9-3bf6a461ec89"
   */
  "XMP:CameraBurstID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Front"
   */
  "XMP:CameraFacing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:CameraModelID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Embedded"
   */
  "XMP:CameraProfile"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "FA401BB3ADB9630D5AF577E3A7BD8680"
   */
  "XMP:CameraProfileDigest"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"DepthMap":{"ConfidenceURI":"android/confidencemap","De…ical"}]
   */
  "XMP:Cameras"?: Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "example serial number"
   * @remarks Camera serial number. DNG tag 0xc62f, writable string in IFD0.
   */
  "XMP:CameraSerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CamReverse"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Photo"
   */
  "XMP:CaptureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "XMP:CaptureSoftware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["Subjekt|Natur|Pflanzen","Ort|Deutschland|Rangsdorf"]
   */
  "XMP:CatalogSets"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "<Categories><Category Assigned="0">Subjekt<Category Assig…gories>"
   */
  "XMP:Categories"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "240-8-330-901211"
   */
  "XMP:CellGlobalID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 5
   */
  "XMP:CellR"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 901211
   */
  "XMP:CellTowerID"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 45
   */
  "XMP:CentralTemperature"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [10000]
   */
  "XMP:CentralWavelength"?: number[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["tag,2011-07-26T05:44:01Z,0,c"]
   */
  "XMP:Changes"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ChromaticAberrationB"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ChromaticAberrationR"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"CorrectionActive":true,"CorrectionAmount":1,"Correctio…tion"}]
   */
  "XMP:CircularGradientBasedCorrections"?: Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "5 (Typical)"
   */
  "XMP:ColorClass"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 50
   */
  "XMP:ColorGradeBlending"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeGlobalHue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeGlobalLum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeGlobalSat"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeHighlightLum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeMidtoneHue"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeMidtoneLum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeMidtoneSat"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorGradeShadowLum"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ColorLabel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:Colorlabels"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "RGB"
   */
  "XMP:ColorMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 25
   */
  "XMP:ColorNoiseReduction"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 50
   */
  "XMP:ColorNoiseReductionDetail"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 50
   */
  "XMP:ColorNoiseReductionSmoothness"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "sRGB"
   * @remarks Color space of image data. EXIF mandatory tag.
   * Standard values: 1 (sRGB), 0xFFFF (Uncalibrated).
   * Non-standard values: 2 (Adobe RGB, some cameras), 0xFFFD (Wide Gamut RGB, Sony), 0xFFFE (ICC Profile, Sony).
   * Adobe RGB is typically indicated by 'Uncalibrated' with InteropIndex='R03'.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ColorSpace"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5750
   */
  "XMP:ColorTemperature"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["Y","Cb","Cr","-"]
   */
  "XMP:ComponentsConfiguration"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 4
   */
  "XMP:CompressedBitsPerPixel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "JPEG compression"
   */
  "XMP:Compression"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"Directory":[{"DataURI":"primary_image","Length":0,"Mime…peg"}]}
   */
  "XMP:Container"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "/home/username/pictures"
   * @remarks XMP container directory structure containing list of container items.
   * Struct type with flattened fields when Struct option is disabled.
   * @see https://exiftool.org/TagNames/XMP.html
   */
  "XMP:ContainerDirectory"?: ContainerDirectoryItem[] | Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Normal)"
   */
  "XMP:Contrast"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example false
   */
  "XMP:ConvertToGrayscale"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "United States"
   */
  "XMP:Country"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "ir"
   */
  "XMP:CountryCode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "2025:08:23 19:41:40.318-04:00"
   * @remarks When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.
   * Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images.
   * For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:CreateDate"?: ExifDateTime | ExifDate | string | number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "XMP:CreationTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["daniel@woss.io"]
   */
  "XMP:Creator"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "{2d7e7fd6-2942-4d77-9842-389c3f62b14d}"
   */
  "XMP:CreatorAppID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"CiAdrCity":"Amsterdam","CiAdrCtry":"Netherlands","CiAdr…73 CH"}
   */
  "XMP:CreatorContactInfo"?: Struct;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:CreatorOpenWithUIOptions"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (4%)
   * @example "picnik.com"
   */
  "XMP:CreatorTool"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Version Ver 1.04 "
   */
  "XMP:Creatortool"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   * @remarks Crop rotation angle. Primarily from XMP-crs (Camera Raw Settings/Adobe Camera Raw) namespace.
   * Also found in Canon DPP recipe files.
   * @see https://exiftool.org/TagNames/XMP.html#crs
   */
  "XMP:CropAngle"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:CropBottom"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CropConstrainToWarp"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "XMP:CropHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CropLeft"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3872
   */
  "XMP:CroppedAreaImageHeightPixels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7744
   */
  "XMP:CroppedAreaImageWidthPixels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CroppedAreaLeftPixels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CroppedAreaTopPixels"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:CropRight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:CropTop"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "XMP:CropWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Custom process)"
   */
  "XMP:CustomRendered"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2014:05:11 13:08:25.659"
   */
  "XMP:DateAcquired"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:08:23 19:41:40.318-04:00"
   */
  "XMP:DateCreated"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2017:08:13 12:38:30"
   */
  "XMP:DateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:05:19 20:52:13+02:00"
   */
  "XMP:DateTimeDigitized"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:05:19 20:52:13+02:00"
   * @remarks When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.
   * This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:DateTimeOriginal"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2015:06:02 09:56:01"
   */
  "XMP:DateUTC"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:DefringeGreenAmount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 60
   */
  "XMP:DefringeGreenHueHi"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 40
   */
  "XMP:DefringeGreenHueLo"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:DefringePurpleAmount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 70
   */
  "XMP:DefringePurpleHueHi"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 30
   */
  "XMP:DefringePurpleHueLo"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:Dehaze"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 37430 bytes, use -b option to extract)"
   */
  "XMP:DepthImage"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"DocumentID":"FF83ACFC7D7DA90BD3BA1CB76A4B0313","Instanc…B0313"}
   */
  "XMP:DerivedFrom"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "nfd"
   * @remarks Image caption or description. MWG composite tag that reconciles EXIF:ImageDescription, IPTC:Caption-Abstract, and XMP-dc:Description.
   * Writing updates all three locations for MWG compliance. Supports language variants via RFC 3066 codes (e.g., 'Description-fr').
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:Description"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:DigitalZoomRatio"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["Animation","Collage"]
   */
  "XMP:DisableAutoCreation"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:DistortionCorrectionAlreadyApplied"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "xmp.did:fec7af37-2965-48d8-bb7e-3e95ee085681"
   */
  "XMP:DocumentID"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:DroneModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:DroneSerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 16.901
   * @remarks Video/audio duration. QuickTime: stored in time scale units, converted to seconds using TimeScale.
   * ExifTool formats as 'H:MM:SS' or seconds. Some iPhone live-photo MOV videos may show key frame time instead of total duration.
   * @see https://exiftool.org/TagNames/QuickTime.html
   */
  "XMP:Duration"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 624
   */
  "XMP:ExifImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 832
   */
  "XMP:ExifImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Exif Version 2.2"
   * @remarks EXIF specification version (e.g., '0232' for EXIF 2.32). EXIF mandatory tag.
   * Stored as 4-byte ASCII without separators. ExifTool accepts '2.32' format when writing.
   * Some files incorrectly include null terminators which ExifTool removes.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ExifVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [-0.35,"+0.15"]
   */
  "XMP:Exposure"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.08
   * @remarks Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec.
   * Signed value indicating deviation from metered exposure.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ExposureCompensation"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Auto exposure)"
   */
  "XMP:ExposureMode"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Normal program)"
   * @remarks Camera exposure mode.
   * Values: 0 (Not Defined), 1 (Manual), 2 (Program AE), 3 (Aperture-priority AE), 4 (Shutter speed priority AE), 5 (Creative/Slow speed), 6 (Action/High speed), 7 (Portrait), 8 (Landscape).
   * Value 9 (Bulb) is non-standard but used by some Canon models.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ExposureProgram"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/80"
   * @remarks Shutter speed in seconds (e.g., '1/250'). Primary source for ShutterSpeed composite.
   * To write shutter speed, use this tag directly. BulbDuration takes priority in ShutterSpeed composite if present and > 0.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ExposureTime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [{"FaceAnglePitch":0.009265,"FaceAngleRoll":-0.021281,"Fa…re":4}]
   */
  "XMP:Face"?: Struct[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:FaceNum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:FaceSelectedIndex"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "XMP:Far"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Digital Camera"
   */
  "XMP:FileSource"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ["Brightness:0.08279166;Shadows:-0.01900926;Colortone:0.2…cess"]]
   */
  "XMP:Filters"?: string | string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1.01
   */
  "XMP:Firmware"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"Fired":false,"Function":false,"Mode":"Unknown","RedEyeM…ction"}
   * @remarks Flash status and mode as bitfield. Common values:
   * 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected),
   * 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired),
   * 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction).
   * Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:Flash"?: number | string | Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 0
   */
  "XMP:FlashCompensation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Example flash make"
   */
  "XMP:FlashManufacturer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Example flash model"
   */
  "XMP:FlashModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "0100"
   */
  "XMP:FlashpixVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "FlashPix Version 1.0"
   */
  "XMP:FlashPixVersion"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3.8
   */
  "XMP:FlightPitchDegree"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example -5.4
   */
  "XMP:FlightRollDegree"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:FlightXSpeed"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 88.699997
   */
  "XMP:FlightYawDegree"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:FlightYSpeed"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:FlightZSpeed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   * @remarks Lens aperture as f-number (e.g., 2.8, 5.6). Primary source for Aperture composite.
   * To write aperture, use this tag - it's more intuitive than ApertureValue (which uses APEX units).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:FNumber"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "6.9 mm"
   * @remarks Lens focal length in millimeters. Actual focal length, not 35mm equivalent.
   * For 35mm equivalent, see FocalLengthIn35mmFormat or FocalLength35efl composite.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:FocalLength"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "65 mm"
   */
  "XMP:FocalLengthIn35mmFormat"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "inches"
   */
  "XMP:FocalPlaneResolutionUnit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5728.1768
   */
  "XMP:FocalPlaneXResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5808.4034
   */
  "XMP:FocalPlaneYResolution"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6553500
   */
  "XMP:FocusAreaHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:FocusAreaNum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 6553500
   */
  "XMP:FocusAreaWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 71291.672
   */
  "XMP:FocusDistance"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:FocusIsLensMoving"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 3372647
   */
  "XMP:FocusPosX"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 936214
   */
  "XMP:FocusPosY"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "NotFocusedLocked"
   */
  "XMP:FocusState"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "image/jpg"
   */
  "XMP:Format"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3872
   */
  "XMP:FullPanoHeightPixels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 7744
   */
  "XMP:FullPanoWidthPixels"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "None"
   */
  "XMP:GainControl"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:GFileMetadata"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example -90
   */
  "XMP:GimbalPitchDegree"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:GimbalReverse"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+0.00"
   */
  "XMP:GimbalRollDegree"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [84.400002,"+90.80"]
   */
  "XMP:GimbalYawDegree"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6.1
   * @remarks GPS altitude in meters. Always stored as positive value; sign determined by GPSAltitudeRef.
   * Composite GPSAltitude combines this with Ref to return signed value with 'Above/Below Sea Level' text.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "XMP:GPSAltitude"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Sea level reference)"
   * @remarks GPS altitude reference.
   * Values: 0 (Above Sea Level), 1 (Below Sea Level), 2 (Positive Sea Level, sea-level ref), 3 (Negative Sea Level, sea-level ref).
   * Values 2-3 added in EXIF 3.0 for ellipsoidal vs sea-level reference.
   */
  "XMP:GPSAltitudeRef"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2017:08:13"
   */
  "XMP:GPSDateStamp"?: ExifDate | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2025:05:19 18:51:58Z"
   * @remarks GPS timestamp combining GPSDateStamp and GPSTimeStamp fields.
   * Read-only composite from multiple GPS sources including manufacturer-specific implementations.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "XMP:GPSDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 33.988
   */
  "XMP:GPSDOP"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 81
   */
  "XMP:GPSImgDirection"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "True North"
   */
  "XMP:GPSImgDirectionRef"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 48.857748
   * @remarks GPS latitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLatitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLatitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "XMP:GPSLatitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2.2918888
   * @remarks GPS longitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLongitudeRef.
   * ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLongitude returns signed decimal.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "XMP:GPSLongitude"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "W"
   * @remarks GPS longitude hemisphere.
   * Valid values: 'E' (East), 'W' (West)
   */
  "XMP:GPSLongitudeRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "WGS-84"
   */
  "XMP:GPSMapDatum"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "HYBRID-FIX"
   */
  "XMP:GPSProcessingMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   * @remarks GPS speed of camera movement during capture. Units determined by GPSSpeedRef (K=km/h, M=mph, N=knots).
   * Must be paired with GPSSpeedRef for meaningful interpretation.
   * @see https://exiftool.org/TagNames/GPS.html
   */
  "XMP:GPSSpeed"?: string | number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "km/h"
   * @remarks GPS speed measurement unit.
   * Valid values: 'K' (km/h), 'M' (mph), 'N' (knots)
   */
  "XMP:GPSSpeedRef"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Invalid"
   */
  "XMP:GpsStatus"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2.2.0.0"
   */
  "XMP:GPSVersionID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:GrainAmount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:GreenHue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:GreenSaturation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:HasCrop"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "F995C3239BC6E6FC1997814864CD2CA2"
   */
  "XMP:HasExtendedXMP"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:HasSettings"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 70804 bytes, use -b option to extract)"
   */
  "XMP:HDRPlusMakerNote"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "(Binary data 31092 bytes, use -b option to extract)"
   */
  "XMP:HDRPMakerNote"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["点像F11"]
   */
  "XMP:HierarchicalSubject"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example [{"Action":"converted","Parameters":"from image/x-canon-c…alse}}]
   * @remarks Tracks editing history of the document. XMP-xmpMM (Media Management) struct type.
   * Flattened fields: HistoryAction, HistoryChanged, HistoryInstanceID, HistoryParameters, HistorySoftwareAgent, HistoryWhen.
   * @see https://exiftool.org/TagNames/XMP.html#xmpMM
   */
  "XMP:History"?: ResourceEvent[] | ResourceEvent | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentAqua"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentMagenta"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentOrange"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentPurple"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:HueAdjustmentYellow"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "sRGB IEC61966-2.1"
   */
  "XMP:ICCProfileName"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 2388696 bytes, use -b option to extract)"
   */
  "XMP:ImageData"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4032
   * @remarks Image height in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "XMP:ImageHeight"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 4048
   */
  "XMP:ImageLength"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "image/jpeg"
   */
  "XMP:ImageMimeType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 99
   * @remarks Image number/identifier. XMP-aux namespace.
   * May be numeric or string with leading zeros (e.g., '0001').
   * @see https://exiftool.org/TagNames/XMP.html#aux
   */
  "XMP:ImageNumber"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "DefaultCamera"
   */
  "XMP:ImageSource"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "D099A124286A4E04A8248E2BF9F83B03"
   * @remarks Unique identifier for the image, typically a 32-character hex string.
   * Useful for image deduplication, tracking identity across edits, and linking related files (e.g., RAW + JPEG pairs).
   * May also appear in MakerNotes and XMP.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ImageUniqueID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5184
   * @remarks Image width in pixels. File-level property derived from file analysis.
   * Read-only.
   * @see https://exiftool.org/TagNames/File.html
   */
  "XMP:ImageWidth"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 180
   */
  "XMP:InitialViewHeadingDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:InitialViewPitchDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:InitialViewRollDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "xmp.iid:fec7af37-2965-48d8-bb7e-3e95ee085681"
   */
  "XMP:InstanceID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "N"
   */
  "XMP:InteroperabilityIndex"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "18, 25, 24.96"
   */
  "XMP:InteroperabilityVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:IsBokehActive"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:IsHDRActive"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example false
   */
  "XMP:IsNightModeActive"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [800]
   * @remarks Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values.
   * Historically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:ISO"?: number | number[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 80
   */
  "XMP:ISOSpeed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "選択"
   */
  "XMP:Label"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["red fish","bluefish"]
   */
  "XMP:LastKeywordXMP"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:LateralChromaticAberrationCorrectionAlreadyApplied"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "F351B7C76CEF50C906DB9B78A92FB1B4"
   */
  "XMP:LegacyIPTCDigest"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "smc PENTAX-FA 43mm F1.9 Limited"
   * @remarks Lens identification from focal length range, primarily for Canon cameras.
   * Read-only composite. For more detailed lens identification, see LensID.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "XMP:Lens"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Back"
   */
  "XMP:LensFacing"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 65535
   * @remarks Identifies actual lens model using manufacturer-specific lookup tables from partial type information.
   * Configurable: may be extended with user-defined lenses via ExifTool configuration.
   * Different derivation logic for Canon (focal lengths), Nikon (LensIDNumber), Ricoh (LensFirmware), and others (XMP-aux:LensID).
   * Read-only composite.
   * @see https://exiftool.org/TagNames/Composite.html
   */
  "XMP:LensID"?: string | number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "8.8-25.7mm f/1.8-2.8"
   */
  "XMP:LensInfo"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Apple"
   */
  "XMP:LensMake"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LensManualDistortionAmount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Example lens make"
   */
  "XMP:LensManufacturer"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "iPhone XS back dual camera 6mm f/2.4"
   */
  "XMP:LensModel"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "8F12B291B497C65672E0AA61A6160502"
   */
  "XMP:LensProfileDigest"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 100
   */
  "XMP:LensProfileDistortionScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:LensProfileEnable"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:LensProfileIsEmbedded"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Camera Settings"
   */
  "XMP:LensProfileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "LensDefaults"
   */
  "XMP:LensProfileSetup"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 100
   */
  "XMP:LensProfileVignettingScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "TE003674"
   */
  "XMP:LensSerialNumber"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Unknown)"
   */
  "XMP:LightSource"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Taumatawhakatangihangakōauauotamateapōkaiwhenuakitānatahu"
   */
  "XMP:Location"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 37087
   */
  "XMP:LocationAreaCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"Amount":1,"Copyright":"© 2018 Adobe Systems, Inc.","Gro…A7077"}
   */
  "XMP:Look"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentAqua"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentMagenta"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentOrange"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentPurple"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceAdjustmentYellow"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:LuminanceNoiseReductionContrast"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 75
   */
  "XMP:LuminanceNoiseReductionDetail"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5
   */
  "XMP:LuminanceSmoothing"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Trust Computer Products"
   * @remarks Camera/device manufacturer. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:Make"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "4577 bytes undefined data"
   */
  "XMP:MakerNote"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:Marked"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:Mask"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 5.7
   */
  "XMP:MaxApertureValue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "2026:03:13 18:38:39.859"
   * @remarks Date when metadata was last modified. XMP-xmp namespace.
   * @see https://exiftool.org/TagNames/XMP.html#xmp
   */
  "XMP:MetadataDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Center-weighted average)"
   * @remarks Light metering mode used during capture.
   * Values: 0 (Unknown), 1 (Average), 2 (Center-weighted average), 3 (Spot), 4 (Multi-spot), 5 (Multi-segment/Pattern/Evaluative), 6 (Partial), 255 (Other).
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:MeteringMode"?: number | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:MicroVideo"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2448784
   */
  "XMP:MicroVideoOffset"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 366563
   */
  "XMP:MicroVideoPresentationTimestampUs"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:MicroVideoVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "image/png"
   */
  "XMP:Mime"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:MinorVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 240
   */
  "XMP:MobileCountryCode"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 8
   */
  "XMP:MobileNetworkCode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "V-LUX 4"
   * @remarks Camera/device model name. ExifTool automatically removes trailing whitespace.
   * Used internally by ExifTool for vendor-specific tag handling.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:Model"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "2015:06:02 09:56:01"
   */
  "XMP:ModificationDate"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (3%)
   * @example "2025:08:23 19:41:40.318-04:00"
   * @remarks When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate.
   * Should reflect intentional user edits, not automatic metadata updates. Different from file system modification time.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:ModifyDate"?: ExifDateTime | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:MotionPhoto"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 717986
   */
  "XMP:MotionPhotoPresentationTimestampUs"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:MotionPhotoVersion"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "36864,40960,40961,37121,37122,40962,40963,37510,40964,368…B0A1251"
   */
  "XMP:NativeDigest"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 115.4
   */
  "XMP:Near"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Album description"
   */
  "XMP:Notes"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 655
   */
  "XMP:ObjectAreaHeight"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 884
   */
  "XMP:ObjectAreaWidth"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1
   */
  "XMP:ObjectNum"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1890
   */
  "XMP:ObjectPosX"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 1796
   */
  "XMP:ObjectPosY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 8
   * @remarks Image orientation. Standard EXIF tag 0x112 in IFD0.
   * Valid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW).
   * Most images use values 1, 3, 6, and 8.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:Orientation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   */
  "XMP:OriginalCreateDateTime"?: ExifDateTime | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (2%)
   * @example "xmp.did:CA75A78ACAC4DF11B8A4EF512D9BE2EA"
   */
  "XMP:OriginalDocumentID"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example false
   */
  "XMP:OverrideLookVignette"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "2060 bytes undefined data"
   */
  "XMP:Padding"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ParametricDarks"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ParametricHighlights"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 75
   */
  "XMP:ParametricHighlightSplit"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ParametricLights"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 50
   */
  "XMP:ParametricMidtoneSplit"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ParametricShadows"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 25
   */
  "XMP:ParametricShadowSplit"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["John Doe"]
   * @remarks Name(s) of person(s) shown in the image. XMP-iptcExt namespace.
   * Simpler alternative to MWG RegionInfo when face coordinates aren't needed.
   * Multi-value field; array when multiple people identified.
   * @see https://exiftool.org/TagNames/XMP.html#iptcExt
   */
  "XMP:PersonInImage"?: string | string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Structured details about person(s) shown in the image. XMP-iptcExt namespace.
   * Includes PersonId, PersonName, PersonCharacteristic, PersonDescription.
   * More detailed than PersonInImage; IPTC Extension 2014+ standard.
   * @see https://exiftool.org/TagNames/XMP.html#iptcExt
   */
  "XMP:PersonInImageWDetails"?: Struct | Struct[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveAspect"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveHorizontal"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveRotate"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 100
   */
  "XMP:PerspectiveScale"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Off"
   */
  "XMP:PerspectiveUpright"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveVertical"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveX"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PerspectiveY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 80
   */
  "XMP:PhotographicSensitivity"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "RGB"
   */
  "XMP:PhotometricInterpretation"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PickLabel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "01.00"
   */
  "XMP:PipelineVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "PM6"
   */
  "XMP:PMVersion"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PortraitVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 22.5
   */
  "XMP:PoseHeadingDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 11.2
   */
  "XMP:PosePitchDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1.6
   */
  "XMP:PoseRollDegrees"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:PostCropVignetteAmount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "DSC_0065.NEF"
   */
  "XMP:PreservedFileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6.7
   */
  "XMP:ProcessVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"CameraIndices":[0],"Type":"DepthPhoto"}]
   */
  "XMP:Profiles"?: Struct[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 2
   */
  "XMP:ProgramMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "equirectangular"
   */
  "XMP:ProjectionType"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (10%)
   * @example 5
   * @remarks Star rating for the image. MWG composite tag from XMP-xmp:Rating.
   * Valid values: -1 (rejected), 0 (unrated), 1-5 (star rating)
   * Note: Rating may appear in EXIF but that's non-standard per MWG. Only XMP writes are supported.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:Rating"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 99
   * @remarks Microsoft-specific percentage rating (1-99).
   * @see https://exiftool.org/forum/index.php?topic=3567.msg16210#msg16210
   */
  "XMP:RatingPercent"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "VI7H4042.CR2"
   */
  "XMP:RawFileName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 1600
   */
  "XMP:RecommendedExposureIndex"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:RedHue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:RedSaturation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Height of image when regions were defined. From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAppliedToDimensionsH"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "pixel"
   * @remarks Unit for AppliedToDimensions (typically 'pixel'). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAppliedToDimensionsUnit"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Width of image when regions were defined. From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAppliedToDimensionsW"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Height of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0). Array when multiple regions.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAreaH"?: number | number[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "normalized"
   * @remarks Unit for RegionArea coordinates (typically 'normalized'). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAreaUnit"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Width of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0). Array when multiple regions.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAreaW"?: number | number[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Horizontal center of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0). Array when multiple regions.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAreaX"?: number | number[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Vertical center of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.
   * Flattened from RegionInfo struct (requires struct=0). Array when multiple regions.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionAreaY"?: number | number[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"AppliedToDimensions":{"H":3552,"W":2000},"RegionList":[…ace"}]}
   * @remarks MWG face/region metadata structure containing AppliedToDimensions and RegionList.
   * With struct=1 (default), contains nested objects. With struct=0, fields are flattened.
   * Used by Lightroom, Picasa, Windows Photo Gallery, digiKam, and other photo organizers.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionInfo"?: Struct;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example {"Regions":""}
   * @remarks Microsoft Photo region metadata structure (XMP-MP namespace).
   * Alternative format to MWG regions, used by Windows Photo Gallery and some Microsoft tools.
   * @see https://exiftool.org/TagNames/XMP.html#MP
   */
  "XMP:RegionInfoMP"?: Struct;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Name(s) of identified region(s), typically person names for face regions.
   * From XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).
   * For Lightroom compatibility, also add names to Keywords/Subject.
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionName"?: string | string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Display name(s) for person(s) in face regions.
   * From XMP-MP namespace (Microsoft Photo), not XMP-mwg-rs.
   * Flattened from RegionInfoMP struct (requires struct=0).
   * @see https://exiftool.org/TagNames/XMP.html#MP
   */
  "XMP:RegionPersonDisplayName"?: string | string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Rotation angle(s) of region(s) in degrees.
   * From XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionRotation"?: number | number[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Type(s) of region(s) identified.
   * Valid values: 'Face', 'Pet', 'BarCode', 'Focus'.
   * From XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).
   * @see https://exiftool.org/TagNames/MWG.html
   */
  "XMP:RegionType"?: string | string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example [{"RegItemId":"Number1","RegOrgId":"TestName1"},{"RegItem…ame3"}]
   * @remarks Registry identifiers for the image. XMP-iptcExt namespace struct type.
   * Flattened fields: RegistryEntryRole, RegistryItemID, RegistryOrganisationID.
   * @see https://exiftool.org/TagNames/XMP.html#iptcExt
   */
  "XMP:RegistryID"?: Struct[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "+99.600"
   */
  "XMP:RelativeAltitude"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "inches"
   */
  "XMP:ResolutionUnit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Kawp E. Reite Houldre"
   */
  "XMP:Rights"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "XMP:SamplesPerPixel"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6
   */
  "XMP:Saturation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentAqua"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentBlue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentGreen"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentMagenta"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentOrange"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentPurple"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentRed"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SaturationAdjustmentYellow"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "AutoHDR"
   */
  "XMP:Scene"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Standard)"
   */
  "XMP:SceneCaptureType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "[0.997883, 0.92984027]"
   */
  "XMP:SceneDetectResultConfidences"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "[901, 60, 0]"
   */
  "XMP:SceneDetectResultIds"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Directly photographed)"
   */
  "XMP:SceneType"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Undefined"
   */
  "XMP:SelfData"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (One-chip color area sensor)"
   */
  "XMP:SensingMethod"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "XMP:SensitivityType"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "XGL1802020069"
   */
  "XMP:SerialNumber"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:Shadows"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ShadowTint"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 25
   */
  "XMP:SharpenDetail"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SharpenEdgeMasking"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "XMP:SharpenRadius"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 50
   */
  "XMP:Sharpness"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "(Binary data 676 bytes, use -b option to extract)"
   */
  "XMP:ShotLogData"?: BinaryField | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "1/80"
   */
  "XMP:ShutterSpeedValue"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Electronic"
   */
  "XMP:ShutterType"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "XMP:Software"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 2
   */
  "XMP:SourcePhotosCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["com.google.android.apps.camera.gallery.specialtype.Spec…TRAIT"]
   */
  "XMP:SpecialTypeID"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SplitToningBalance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SplitToningHighlightHue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SplitToningHighlightSaturation"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SplitToningShadowHue"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SplitToningShadowSaturation"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "Washington"
   */
  "XMP:State"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "https://PhotoStructure.com/"
   */
  "XMP:StitchingSoftware"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 3
   */
  "XMP:StreamType"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["点像F11"]
   */
  "XMP:Subject"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "64.4 m"
   */
  "XMP:SubjectDistance"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Macro)"
   */
  "XMP:SubjectDistanceRange"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 296185
   */
  "XMP:SubsecTime"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 296185
   */
  "XMP:SubSecTimeDigitized"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 296185
   */
  "XMP:SubSecTimeOriginal"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:SurveyingMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "#MB%:{9C0B071B-5553-4D89-B252-934C9EC1E04D}GBMB1:%MB#"
   */
  "XMP:Tag"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example "Yes"
   */
  "XMP:Tagged"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["Subjekt/Natur/Pflanzen","Ort/Deutschland/Rangsdorf"]
   */
  "XMP:TagsList"?: string[];

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 9
   */
  "XMP:Texture"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "+9"
   */
  "XMP:Tint"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Very Blank"
   * @remarks Image title. XMP-dc (Dublin Core) namespace - use this standard schema instead of non-standard XMP-xmp:Title.
   * Supports language variants via RFC 3066 codes (e.g., 'Title-fr'). Using 'x-default' language code preserves other existing languages when writing.
   * @see https://exiftool.org/TagNames/XMP.html#dc
   */
  "XMP:Title"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:TlinearGain"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","32, 22","64, 56","128, 128","192, 196","255, 255"]
   */
  "XMP:ToneCurve"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurveBlue"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurveGreen"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Medium Contrast"
   */
  "XMP:ToneCurveName"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurvePV2012Blue"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurvePV2012Green"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurvePV2012Red"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example ["0, 0","255, 255"]
   */
  "XMP:ToneCurveRed"?: string[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:ToneMapStrength"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:UprightCenterMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.5
   */
  "XMP:UprightCenterNormX"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0.5
   */
  "XMP:UprightCenterNormY"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 35
   */
  "XMP:UprightFocalLength35mm"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:UprightFocalMode"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:UprightFourSegmentsCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example false
   */
  "XMP:UprightPreview"?: boolean;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 6
   */
  "XMP:UprightTransformCount"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 151388160
   */
  "XMP:UprightVersion"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example true
   */
  "XMP:UsePanoramaViewer"?: boolean;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "This is a comment."
   */
  "XMP:UserComment"?: string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example ""
   */
  "XMP:UTCAtExposure"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (1%)
   * @example 7
   */
  "XMP:Version"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example
   * @remarks Version history of the document. XMP-xmpMM (Media Management) struct type.
   * Flattened fields include VersionsComments, VersionsEvent, etc.
   * @see https://exiftool.org/TagNames/XMP.html#xmpMM
   */
  "XMP:Versions"?: Version[] | Version | string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:Vibrance"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 0
   */
  "XMP:VignetteAmount"?: number;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example [4500]
   */
  "XMP:WavelengthFWHM"?: number[];

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Unknown (Auto white balance)"
   * @remarks White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual).
   * MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc.
   * EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.
   * @see https://exiftool.org/TagNames/EXIF.html
   */
  "XMP:WhiteBalance"?: number | string;

  /**
   * @frequency 🧊 ☆☆☆☆ (0%)
   * @example "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><…="0" />"
   */
  "XMP:XMPMeta"?: string;

  /**
   * @frequency 🔥 ★☆☆☆ (5%)
   * @example "XMP toolkit 3.0-28, framework 1.6"
   */
  "XMP:XMPToolkit"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 72
   */
  "XMP:XResolution"?: number;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example "Co-sited"
   */
  "XMP:YCbCrPositioning"?: string;

  /**
   * @frequency 🔥 ☆☆☆☆ (0%)
   * @example 72
   */
  "XMP:YResolution"?: number;
}

/**
 * The `Group:TagName` fields of {@link GroupedTags}, for every generated
 * {@link Tags} field, in every family-0 group the sample files had it in.
 *
 * Each field's @frequency, @example, and type come only from that group's
 * values, except that a curated RequiredTags type applies in every group,
 * so `XMP:ISO` is `number | number[]` while `EXIF:ISO` is `number`.
 *
 * Autogenerated by "npm run mktags" by ExifTool 13.63 on Fri Nov 13 2026.
 */
export interface GeneratedGroupedTags
  extends
    APP1GroupedTags,
    APP4GroupedTags,
    APP5GroupedTags,
    APP6GroupedTags,
    APP8GroupedTags,
    APP10GroupedTags,
    APP12GroupedTags,
    APP14GroupedTags,
    CompositeGroupedTags,
    DuckyGroupedTags,
    EXIFGroupedTags,
    ExifToolGroupedTags,
    FileGroupedTags,
    FlashPixGroupedTags,
    IPTCGroupedTags,
    JFIFGroupedTags,
    JPEGGroupedTags,
    JSONGroupedTags,
    JUMBFGroupedTags,
    MakerNotesGroupedTags,
    MetaGroupedTags,
    MPFGroupedTags,
    PanasonicRawGroupedTags,
    PhotoshopGroupedTags,
    PrintIMGroupedTags,
    QuickTimeGroupedTags,
    RAFGroupedTags,
    RIFFGroupedTags,
    XMPGroupedTags {}
