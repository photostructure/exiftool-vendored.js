import sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import { BatchCluster, Log, logger, setLogger } from "batch-cluster";
import globule from "globule";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ProgressBar from "progress";
import { compact, filterInPlace, uniq } from "../Array";
import { ExifTool } from "../ExifTool";
import { ExifToolVendoredTagNames } from "../ExifToolVendoredTags";
import { GeolocationTagNames } from "../GeolocationTags";
import { ICCProfileTagNames } from "../ICCProfileTags";
import { ImageDataHashTagNames } from "../ImageDataHashTag";
import { IPTCApplicationRecordTagNames } from "../IPTCApplicationRecordTags";
import { Maybe, map } from "../Maybe";
import { MWGCollectionsTagNames, MWGKeywordTagNames } from "../MWGTags";
import { isNumber } from "../Number";
import { nullish } from "../ReadTask";
import { blank, isString, leftPad } from "../String";
import { times } from "../Times";

/**
 * Unfortunately, TypeScript has a limit on the complexity of types it can
 * represent.
 *
 * If we build a union type of all the tags ExifTool knows about (which is north
 * of 15,000 tags last time we checked), we exceed that limit and get `error
 * TS2590: Expression produces a union type that is too complex to represent`.
 *
 * So, we have to hack around this by only including the N "most popular" and
 * "most important" tags.
 *
 * Note that this limit is much less than that threshold (which was about 3,100
 * in 2023), but remember to account for the 8+ static interfaces we're also
 * including in the final Tags union.
 */
const MAX_TAGS = 2700;

// Static interfaces that Tags extends - these need special handling to avoid
// name collisions and to ensure their tag names appear in TagMetadata.json
const StaticInterfaceMetadata = [
  {
    name: "ExifToolVendoredTags",
    group: "Library", // Library-added tags
    tagNames: ExifToolVendoredTagNames,
  },
  {
    name: "GeolocationTags",
    group: "ExifTool", // ExifTool's geolocation feature
    tagNames: GeolocationTagNames,
  },
  {
    name: "ImageDataHashTag",
    group: "Composite", // Computed by ExifTool
    tagNames: ImageDataHashTagNames,
  },
  {
    name: "ICCProfileTags",
    group: "ICC_Profile",
    tagNames: ICCProfileTagNames,
  },
  {
    name: "IPTCApplicationRecordTags",
    group: "IPTC",
    tagNames: IPTCApplicationRecordTagNames,
  },
  {
    name: "MWGCollectionsTags",
    group: "XMP", // MWG (Metadata Working Group) uses XMP
    tagNames: MWGCollectionsTagNames,
  },
  {
    name: "MWGKeywordTags",
    group: "XMP", // MWG (Metadata Working Group) uses XMP
    tagNames: MWGKeywordTagNames,
  },
] as const;

// These tags are important enough that we want to ensure they're always in the
// final Tags interface.
//
// If you're relying on a tag that gets inadvertently dropped in some release,
// consider opening a PR to restore it by adding it here:
const RequiredTags: Record<
  string,
  { t: string; grp: string; value?: any; doc?: string; see?: string }
> = {
  ExifToolVersion: { t: "string", grp: "ExifTool" }, // < ExifTool stores the version as a float (!!) which causes 12.30 to become 12.3.
  AccelerometerX: {
    t: "number",
    grp: "MakerNotes",
    doc: "Accelerometer X-axis reading. Panasonic: positive is acceleration to the left.\nAlso found in DJI and Lytro cameras. Used for motion/orientation detection.",
  },
  AccelerometerY: {
    t: "number",
    grp: "MakerNotes",
    doc: "Accelerometer Y-axis reading. Panasonic: positive is acceleration backwards.\nAlso found in DJI and Lytro cameras. Used for motion/orientation detection.",
  },
  AccelerometerZ: {
    t: "number",
    grp: "MakerNotes",
    doc: "Accelerometer Z-axis reading. Panasonic: positive is acceleration upward.\nAlso found in DJI and Lytro cameras. Used for motion/orientation detection.",
  },
  Album: { t: "string", grp: "XMP", value: "Twilight Dreams" },
  Aperture: {
    t: "number",
    grp: "Composite",
    doc: "Calculated aperture value derived from FNumber or ApertureValue.\nRead-only composite tag. To write, modify FNumber or ApertureValue instead.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ApertureValue: { t: "number", grp: "EXIF" },
  Artist: { t: "string", grp: "EXIF" },
  AspectRatio: { t: "string", grp: "MakerNotes", value: "3:2" },
  AutoRotate: { t: "number | string", grp: "MakerNotes" },
  AvgBitrate: {
    t: "number | string",
    grp: "Composite",
    doc: "Average bitrate for video/audio files, calculated from media data size divided by duration.\nRead-only composite tag for QuickTime-based formats (MOV, MP4, etc.).",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  BodySerialNumber: { t: "string", grp: "MakerNotes" },
  BracketSettings: {
    t: "string",
    grp: "MakerNotes",
    doc: "Panasonic exposure bracketing configuration.\nValues: 'No Bracket', '3 Images, Sequence 0/-/+', '3 Images, Sequence -/0/+',\n'5 Images, Sequence 0/-/+', '5 Images, Sequence -/0/+', '7 Images, Sequence 0/-/+', '7 Images, Sequence -/0/+'.",
  },
  BurstID: { t: "string", grp: "XMP" },
  BurstUUID: { t: "string", grp: "MakerNotes" },
  CameraID: { t: "string", grp: "MakerNotes" },
  CameraOrientation: { t: "string", grp: "MakerNotes" },
  CameraSerialNumber: {
    t: "string",
    grp: "EXIF",
    doc: "Camera serial number. DNG tag 0xc62f, writable string in IFD0.",
  },
  Comment: {
    t: "string",
    grp: "File",
    doc: "Comment text. JPEG COM segment, GIF comment, or other file-level comment.\nNot an XMP tag despite common confusion.",
  },
  Compass: {
    t: "number",
    grp: "MakerNotes",
    doc: "Ricoh Theta compass heading direction in degrees.\nCamera orientation sensor data.",
  },
  ContainerDirectory: {
    t: "ContainerDirectoryItem[] | Struct[]",
    grp: "XMP",
    doc: "XMP container directory structure containing list of container items.\nStruct type with flattened fields when Struct option is disabled.",
    see: "https://exiftool.org/TagNames/XMP.html",
  },
  Copyright: {
    t: "string",
    grp: "EXIF",
    doc: "Copyright notice for the image. MWG composite tag that reconciles EXIF:Copyright, IPTC:CopyrightNotice, and XMP-dc:Rights.\nWriting updates all three locations to maintain MWG synchronization.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Country: { t: "string", grp: "XMP" },
  CountryCode: { t: "string", grp: "XMP" },
  CreateDate: {
    t: "ExifDateTime | ExifDate | string | number",
    grp: "EXIF",
    doc: "When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate.\nDistinct from DateTimeOriginal (when photo was taken) - useful for scanned images.\nFor MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  CreationTime: { t: "ExifDateTime | string", grp: "XMP" },
  CropAngle: {
    t: "number",
    grp: "XMP",
    doc: "Crop rotation angle. Primarily from XMP-crs (Camera Raw Settings/Adobe Camera Raw) namespace.\nAlso found in Canon DPP recipe files.",
    see: "https://exiftool.org/TagNames/XMP.html#crs",
  },
  CropBottom: { t: "number", grp: "XMP" },
  CropHeight: { t: "number", grp: "XMP" },
  CropLeft: { t: "number", grp: "XMP" },
  CropRight: { t: "number", grp: "XMP" },
  CropTop: { t: "number", grp: "XMP" },
  CropWidth: { t: "number", grp: "XMP" },
  DateCreated: { t: "ExifDateTime | string", grp: "XMP" },
  DateTime: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeCreated: {
    t: "ExifDateTime | string",
    grp: "Composite",
    doc: "Composite tag combining IPTC:DateCreated (YYYYMMDD) and IPTC:TimeCreated (with timezone offset).\nRead-only composite - to write, set IPTC:DateCreated and IPTC:TimeCreated individually.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  DateTimeDigitized: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeGenerated: { t: "ExifDateTime | string", grp: "APP1" },
  DateTimeOriginal: {
    t: "ExifDateTime | string",
    grp: "EXIF",
    doc: "When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC date/time created, and XMP-photoshop DateTimeOriginal.\nThis is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  DateTimeUTC: { t: "ExifDateTime | string", grp: "MakerNotes" },
  Description: {
    t: "string",
    grp: "XMP",
    doc: "Image caption or description. MWG composite tag that reconciles EXIF:ImageDescription, IPTC:Caption-Abstract, and XMP-dc:Description.\nWriting updates all three locations for MWG compliance. Supports language variants via RFC 3066 codes (e.g., 'Description-fr').",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  DOF: {
    t: "string",
    grp: "Composite",
    doc: "Calculated depth of field based on focal length, aperture, and focus distance.\nWARNING: This value may be incorrect if the image has been resized.\nRead-only composite tag.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Error: { t: "string", grp: "ExifTool" },
  ExifImageHeight: { t: "number", grp: "EXIF" },
  ExifImageWidth: { t: "number", grp: "EXIF" },
  ExposureTime: { t: "string", grp: "EXIF" },
  EyeDetection: {
    t: "string",
    grp: "MakerNotes",
    doc: "Canon eye detection AF setting. Values: 'On' or 'Off'.\nEnables autofocus tracking on detected eyes.",
  },
  FaceDetection: {
    t: "string",
    grp: "MakerNotes",
    doc: "Sony face detection setting. Values: 'On' (16) or 'Off' (1).\nIndicates whether face detection was enabled during capture.",
  },
  FacesDetected: {
    t: "number",
    grp: "MakerNotes",
    doc: "Number of faces detected by the camera during capture.\nFound in MakerNotes from Canon, Nikon, Sony, Panasonic, Olympus, Fujifilm, Pentax, Ricoh, and others.",
  },
  FacesRecognized: {
    t: "number",
    grp: "MakerNotes",
    doc: "Panasonic: number of faces matched to user-registered known faces.\nRelated tags: RecognizedFace*Name, RecognizedFace*Position.",
  },
  FaceRecognition: {
    t: "string",
    grp: "MakerNotes",
    doc: "Samsung face recognition setting. Values: 'On' or 'Off'.\nWhen enabled, camera attempts to match faces to registered profiles.",
  },
  FileAccessDate: {
    t: "ExifDateTime | string",
    grp: "File",
    doc: "File system access date/time. Not stored metadata - file system property.\nWritable on some systems. Changes when file is read.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileCreateDate: {
    t: "ExifDateTime | string",
    grp: "File",
    doc: "File system creation date/time. Not stored metadata - file system property.\nWritable on some systems. Different from image capture date.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileInodeChangeDate: {
    t: "ExifDateTime | string",
    grp: "File",
    doc: "File system inode change date/time (Unix/Linux). Not stored metadata - file system property.\nChanges when file metadata (permissions, ownership) or content changes. Not available on Windows.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileModifyDate: {
    t: "ExifDateTime | string",
    grp: "File",
    doc: "File system modification date/time. Not stored metadata - file system property.\nWritable. Different from EXIF ModifyDate which tracks user edits.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileName: {
    t: "string",
    grp: "File",
    doc: "Name of the file. Not stored metadata - intrinsic file property.\nWritable: can rename files. May include full path to set Directory simultaneously.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileSize: {
    t: "string",
    grp: "File",
    doc: "Size of the file. Not stored metadata - intrinsic file property.\nRead-only. Uses SI prefixes by default (1 kB = 1000 bytes).",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileType: {
    t: "string",
    grp: "File",
    doc: "File type determined from file content, not extension. Not stored metadata - intrinsic file property.\nRead-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileTypeExtension: {
    t: "string",
    grp: "File",
    doc: "Recommended file extension for this file type. Not stored metadata - intrinsic file property.\nRead-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FNumber: { t: "number", grp: "EXIF" },
  Fnumber: {
    t: "string",
    grp: "APP12",
    doc: "F-number from APP12 segment (Ducky tags, uncommon). Note lowercase 'n'.\nDistinct from standard EXIF:FNumber. Use FNumber instead for consistency.",
    see: "https://exiftool.org/TagNames/APP12.html",
  },
  FocalLength: { t: "string", grp: "EXIF" },
  GPSAltitude: { t: "number", grp: "EXIF" },
  GPSAltitudeRef: {
    t: "number",
    grp: "EXIF",
    doc: "GPS altitude reference.\nValues: 0 (Above Sea Level), 1 (Below Sea Level), 2 (Positive Sea Level, sea-level ref), 3 (Negative Sea Level, sea-level ref).\nValues 2-3 added in EXIF 3.0 for ellipsoidal vs sea-level reference.",
  },
  GPSDateTime: {
    t: "ExifDateTime | string",
    grp: "Composite",
    doc: "GPS timestamp combining GPSDateStamp and GPSTimeStamp fields.\nRead-only composite from multiple GPS sources including manufacturer-specific implementations.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  // We normally ask exiftool to render these as decimals, not DMS (degrees/minutes/seconds):
  GPSLatitude: {
    t: "number | string",
    grp: "EXIF",
    value: "37 deg 46' 29.64\" N",
  },
  GPSLatitudeRef: {
    t: "string",
    grp: "EXIF",
    doc: "GPS latitude hemisphere.\nValid values: 'N' (North), 'S' (South)",
  },
  GPSLongitude: {
    t: "number | string",
    grp: "EXIF",
    value: "122 deg 25' 9.85\" W",
  },
  GPSLongitudeRef: {
    t: "string",
    grp: "EXIF",
    doc: "GPS longitude hemisphere.\nValid values: 'E' (East), 'W' (West)",
  },
  GPSPosition: {
    t: "string",
    grp: "Composite",
    doc: "Combined GPS latitude and longitude. Writable composite tag.\nWhen written, updates GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef.\nAccepts Google Maps coordinates (right-click format).",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  GPSSpeed: { t: "string", grp: "EXIF" },
  GPSSpeedRef: {
    t: "string",
    grp: "EXIF",
    doc: "GPS speed measurement unit.\nValid values: 'K' (km/h), 'M' (mph), 'N' (knots)",
  },
  GPSTimeStamp: {
    t: "ExifTime | string",
    grp: "EXIF",
    doc: "UTC time of GPS fix. When writing, date is stripped off if present, and time is adjusted to UTC if it includes a timezone",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  History: {
    t: "ResourceEvent[] | ResourceEvent | string",
    grp: "XMP",
    doc: "Tracks editing history of the document. XMP-xmpMM (Media Management) struct type.\nFlattened fields: HistoryAction, HistoryChanged, HistoryInstanceID, HistoryParameters, HistorySoftwareAgent, HistoryWhen.",
    see: "https://exiftool.org/TagNames/XMP.html#xmpMM",
  },
  ImageDataMD5: {
    t: "string",
    grp: "File",
    doc: "MD5 hash of the actual image data (excluding metadata). Computed by ExifTool, not stored in file.\nUseful for detecting identical images with different metadata.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  ImageDescription: { t: "string", grp: "EXIF" },
  ImageHeight: {
    t: "number",
    grp: "File",
    doc: "Image height in pixels. File-level property derived from file analysis.\nRead-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  ImageNumber: {
    t: "number | string",
    grp: "XMP",
    doc: "Image number/identifier. XMP-aux namespace.\nMay be numeric or string with leading zeros (e.g., '0001').",
    see: "https://exiftool.org/TagNames/XMP.html#aux",
  },
  ImageSize: {
    t: "number | string",
    grp: "Composite",
    doc: "Image dimensions combining width and height from various metadata fields.\nRead-only composite derived from ImageWidth, ImageHeight, ExifImageWidth, ExifImageHeight, or RawImageCroppedSize.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ImageUniqueID: {
    t: "string",
    grp: "EXIF",
    doc: "Unique identifier for the image, typically a 32-character hex string.\nUseful for image deduplication, tracking identity across edits, and linking related files (e.g., RAW + JPEG pairs).\nMay also appear in MakerNotes and XMP.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ImageWidth: {
    t: "number",
    grp: "File",
    doc: "Image width in pixels. File-level property derived from file analysis.\nRead-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  InternalSerialNumber: { t: "string", grp: "MakerNotes" },
  ISO: {
    t: "number",
    grp: "EXIF",
    doc: "Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values.\nHistorically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ISOSpeed: { t: "number", grp: "EXIF" },
  JpgFromRaw: {
    t: "BinaryField",
    grp: "EXIF",
    doc: "Embedded JPEG preview extracted from RAW files. Binary data type.\nAccess via BinaryField to get raw bytes or base64 encoding.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  Keywords: {
    t: "string | string[]",
    grp: "IPTC",
    doc: "Searchable subject terms for image content. MWG composite tag that reconciles IPTC:Keywords and XMP-dc:Subject.\nMulti-value fields use semicolon-space ('; ') separators when represented as string.\nIPTC constraint: max 64 characters per keyword. Character encoding depends on IPTC:CodedCharacterSet; UTF8 recommended.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Lens: {
    t: "string",
    grp: "Composite",
    doc: "Lens identification from focal length range, primarily for Canon cameras.\nRead-only composite. For more detailed lens identification, see LensID.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  LensID: {
    t: "string",
    grp: "Composite",
    doc: "Identifies actual lens model using manufacturer-specific lookup tables from partial type information.\nConfigurable: may be extended with user-defined lenses via ExifTool configuration.\nDifferent derivation logic for Canon (focal lengths), Nikon (LensIDNumber), Ricoh (LensFirmware), and others (XMP-aux:LensID).\nRead-only composite.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  LensInfo: { t: "string", grp: "EXIF" },
  LensMake: { t: "string", grp: "EXIF" },
  LensModel: { t: "string", grp: "EXIF" },
  LensSerialNumber: { t: "string", grp: "EXIF" },
  LensSpec: { t: "string", grp: "MakerNotes" },
  LensType: { t: "string", grp: "MakerNotes" },
  LensType2: { t: "string", grp: "MakerNotes" },
  LensType3: { t: "string", grp: "MakerNotes" },
  LightReading: {
    t: "number",
    grp: "MakerNotes",
    doc: "Pentax light meter reading. Calibration varies by camera model.\nFor Optio WP, add 6 to get approximate LV (Light Value).",
  },
  Make: {
    t: "string",
    grp: "EXIF",
    doc: "Camera/device manufacturer. ExifTool automatically removes trailing whitespace.\nUsed internally by ExifTool for vendor-specific tag handling.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  MaxDataRate: { t: "string", grp: "RIFF" },
  MediaCreateDate: {
    t: "ExifDateTime | string",
    grp: "QuickTime",
    doc: "Creation date/time for QuickTime/MOV/MP4 media track. Stored as seconds since 1904-01-01 UTC.\nWARNING: Many cameras incorrectly store local time instead of UTC. ExifTool does not assume timezone unless QuickTimeUTC option is set.\nFor MOV/MP4 videos, use this tag instead of DateTimeOriginal.\nCannot be truly deleted (set to zero instead) as it's part of binary structure.",
    see: "https://exiftool.org/TagNames/QuickTime.html",
  },
  Megapixels: {
    t: "number",
    grp: "Composite",
    doc: "Total megapixels calculated from ImageSize composite field.\nRead-only composite.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  MetadataDate: {
    t: "ExifDateTime | string",
    grp: "XMP",
    doc: "Date when metadata was last modified. XMP-xmp namespace.",
    see: "https://exiftool.org/TagNames/XMP.html#xmp",
  },
  MIMEType: {
    t: "string",
    grp: "File",
    doc: "MIME type of the file. Not stored metadata - intrinsic file property.\nRead-only, determined from file content.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  Model: {
    t: "string",
    grp: "EXIF",
    doc: "Camera/device model name. ExifTool automatically removes trailing whitespace.\nUsed internally by ExifTool for vendor-specific tag handling.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ModifyDate: {
    t: "ExifDateTime | string",
    grp: "EXIF",
    doc: "When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate.\nShould reflect intentional user edits, not automatic metadata updates. Different from file system modification time.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Notes: { t: "string", grp: "XMP", value: "Album description" },
  Orientation: {
    t: "number",
    grp: "EXIF",
    doc: "Image orientation. Standard EXIF tag 0x112 in IFD0.\nValid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW).\nMost images use values 1, 3, 6, and 8.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  OriginalCreateDateTime: { t: "ExifDateTime | string", grp: "XMP" },
  PersonInImage: {
    t: "string | string[]",
    grp: "XMP",
    doc: "Name(s) of person(s) shown in the image. XMP-iptcExt namespace.\nSimpler alternative to MWG RegionInfo when face coordinates aren't needed.\nMulti-value field; array when multiple people identified.",
    see: "https://exiftool.org/TagNames/XMP.html#iptcExt",
  },
  PersonInImageWDetails: {
    t: "Struct | Struct[]",
    grp: "XMP",
    doc: "Structured details about person(s) shown in the image. XMP-iptcExt namespace.\nIncludes PersonId, PersonName, PersonCharacteristic, PersonDescription.\nMore detailed than PersonInImage; IPTC Extension 2014+ standard.",
    see: "https://exiftool.org/TagNames/XMP.html#iptcExt",
  },
  PreviewImage: {
    t: "BinaryField",
    grp: "Composite",
    doc: "Embedded preview image data extracted from the file.\nCRITICAL: Writable for updating existing embedded images, but cannot create or delete previews.\nCan only modify previews that already exist in the file.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  PreviewImageSize: {
    t: "string",
    grp: "Composite",
    value: "816x459",
    doc: "Dimensions of the embedded preview image (e.g., '816x459').\nRead-only composite. Useful for checking preview size without extracting binary data.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Rating: {
    t: "number",
    grp: "XMP",
    doc: "Star rating for the image. MWG composite tag from XMP-xmp:Rating.\nValid values: -1 (rejected), 0 (unrated), 1-5 (star rating)\nNote: Rating may appear in EXIF but that's non-standard per MWG. Only XMP writes are supported.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RatingPercent: {
    t: "number",
    grp: "XMP",
    value: 99,
    doc: "Microsoft-specific percentage rating (1-99).",
    see: "https://exiftool.org/forum/index.php?topic=3567.msg16210#msg16210",
  },
  RAWFileType: {
    t: "string",
    grp: "MakerNotes",
    doc: "Sony RAW compression setting: 'Compressed RAW', 'Uncompressed RAW', or 'Lossless Compressed RAW'.\nIntroduced 2015 for uncompressed 14-bit RAW support.",
  },
  RegistryID: {
    t: "Struct[]",
    grp: "XMP",
    doc: "Registry identifiers for the image. XMP-iptcExt namespace struct type.\nFlattened fields: RegistryEntryRole, RegistryItemID, RegistryOrganisationID.",
    see: "https://exiftool.org/TagNames/XMP.html#iptcExt",
  },
  RegionAppliedToDimensionsH: {
    t: "number",
    grp: "XMP",
    doc: "Height of image when regions were defined. From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAppliedToDimensionsUnit: {
    t: "string",
    grp: "XMP",
    value: "pixel",
    doc: "Unit for AppliedToDimensions (typically 'pixel'). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAppliedToDimensionsW: {
    t: "number",
    grp: "XMP",
    doc: "Width of image when regions were defined. From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAreaH: {
    t: "number | number[]",
    grp: "XMP",
    doc: "Height of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0). Array when multiple regions.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAreaUnit: {
    t: "string",
    grp: "XMP",
    value: "normalized",
    doc: "Unit for RegionArea coordinates (typically 'normalized'). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAreaW: {
    t: "number | number[]",
    grp: "XMP",
    doc: "Width of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0). Array when multiple regions.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAreaX: {
    t: "number | number[]",
    grp: "XMP",
    doc: "Horizontal center of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0). Array when multiple regions.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionAreaY: {
    t: "number | number[]",
    grp: "XMP",
    doc: "Vertical center of region(s) as normalized value (0-1). From XMP-mwg-rs namespace.\nFlattened from RegionInfo struct (requires struct=0). Array when multiple regions.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionInfo: {
    t: "Struct",
    grp: "XMP",
    doc: "MWG face/region metadata structure containing AppliedToDimensions and RegionList.\nWith struct=1 (default), contains nested objects. With struct=0, fields are flattened.\nUsed by Lightroom, Picasa, Windows Photo Gallery, digiKam, and other photo organizers.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionInfoMP: {
    t: "Struct",
    grp: "XMP",
    doc: "Microsoft Photo region metadata structure (XMP-MP namespace).\nAlternative format to MWG regions, used by Windows Photo Gallery and some Microsoft tools.",
    see: "https://exiftool.org/TagNames/XMP.html#MP",
  },
  RegionName: {
    t: "string | string[]",
    grp: "XMP",
    doc: "Name(s) of identified region(s), typically person names for face regions.\nFrom XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).\nFor Lightroom compatibility, also add names to Keywords/Subject.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionPersonDisplayName: {
    t: "string | string[]",
    grp: "XMP",
    doc: "Display name(s) for person(s) in face regions.\nFrom XMP-MP namespace (Microsoft Photo), not XMP-mwg-rs.\nFlattened from RegionInfoMP struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/XMP.html#MP",
  },
  RegionRotation: {
    t: "number | number[]",
    grp: "XMP",
    doc: "Rotation angle(s) of region(s) in degrees.\nFrom XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionType: {
    t: "string | string[]",
    grp: "XMP",
    doc: "Type(s) of region(s) identified.\nValid values: 'Face', 'Pet', 'BarCode', 'Focus'.\nFrom XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Rotation: {
    t: "number",
    grp: "Composite",
    doc: "Degrees of clockwise camera rotation for QuickTime/MP4 video files.\nSpecial writable: Writing this tag updates QuickTime MatrixStructure for all tracks with a non-zero image size simultaneously.\nDifferent from EXIF Orientation tag.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  RunTimeValue: { t: "number", grp: "MakerNotes" },
  SerialNumber: { t: "string", grp: "MakerNotes" },
  ShutterCount: { t: "number", grp: "MakerNotes" },
  ShutterCount2: { t: "number", grp: "MakerNotes" },
  ShutterCount3: { t: "number", grp: "MakerNotes" },
  ShutterSpeed: {
    t: "string",
    grp: "Composite",
    doc: "Shutter speed combining ExposureTime, ShutterSpeedValue, and BulbDuration.\nRead-only composite tag. Format typically fractional (e.g., '1/250').",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SonyDateTime2: { t: "ExifDateTime | string", grp: "MakerNotes" },
  SonyExposureTime: { t: "string", grp: "MakerNotes" },
  SonyFNumber: { t: "number", grp: "MakerNotes" },
  SonyISO: { t: "number", grp: "MakerNotes" },
  SourceFile: { t: "string", grp: "ExifTool", value: "path/to/file.jpg" },
  SubSecCreateDate: {
    t: "ExifDateTime | string",
    grp: "Composite",
    doc: "Creation date with subsecond precision, merging EXIF:CreateDate, SubSecTimeDigitized, and OffsetTimeDigitized.\nWritable composite: writing updates all three fields simultaneously for high-precision timestamps with timezone information.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecDateTimeOriginal: {
    t: "ExifDateTime | string",
    grp: "Composite",
    doc: "Original datetime with subsecond precision, combining EXIF:DateTimeOriginal, SubSecTimeOriginal, and OffsetTimeOriginal.\nWritable composite: writing updates all three fields simultaneously. Represents when the photo was originally taken with high precision.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecModifyDate: {
    t: "ExifDateTime | string",
    grp: "Composite",
    doc: "Modification timestamp with subsecond precision, combining EXIF:ModifyDate, SubSecTime, and OffsetTime.\nWritable composite: writing updates all three fields simultaneously. Represents when the file was last modified with high precision.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecTime: { t: "number", grp: "EXIF" },
  SubSecTimeDigitized: { t: "number", grp: "EXIF" },
  SubjectDetection: {
    t: "string",
    grp: "MakerNotes",
    doc: "Nikon Z series subject detection mode.\nValues: 'Off', 'Auto', 'People', 'Animals', 'Vehicles', 'Birds', 'Airplanes'.\nIndicates what the camera's AI was configured to detect during capture.",
  },
  ThumbnailImage: {
    t: "BinaryField",
    grp: "EXIF",
    doc: "Embedded thumbnail image data. Binary data type.\nWritable for updating existing thumbnails, but cannot create or delete thumbnails.",
  },
  ThumbnailLength: {
    t: "number",
    grp: "EXIF",
    doc: "Size in bytes of the embedded JPEG thumbnail.\nUseful for checking thumbnail availability without extracting binary data.",
  },
  ThumbnailOffset: {
    t: "number",
    grp: "EXIF",
    doc: "Byte offset of the embedded JPEG thumbnail within the file.\nUsed with ThumbnailLength to locate thumbnail data.",
  },
  ThumbnailTIFF: {
    t: "BinaryField",
    grp: "Composite",
    doc: "Embedded TIFF thumbnail image data. Composite tag rebuilt from component EXIF tags.\nRead-only - derived from SubfileType, Compression, ImageWidth, ImageHeight, etc.",
  },
  TimeStamp: { t: "ExifDateTime | string", grp: "MakerNotes" },
  TimeZone: { t: "string", grp: "MakerNotes" },
  TimeZoneOffset: { t: "number | string", grp: "EXIF" },
  Title: {
    t: "string",
    grp: "XMP",
    doc: "Image title. XMP-dc (Dublin Core) namespace - use this standard schema instead of non-standard XMP-xmp:Title.\nSupports language variants via RFC 3066 codes (e.g., 'Title-fr'). Using 'x-default' language code preserves other existing languages when writing.",
    see: "https://exiftool.org/TagNames/XMP.html#dc",
  },
  Versions: {
    t: "Version[] | Version | string",
    grp: "XMP",
    doc: "Version history of the document. XMP-xmpMM (Media Management) struct type.\nFlattened fields include VersionsComments, VersionsEvent, etc.",
    see: "https://exiftool.org/TagNames/XMP.html#xmpMM",
  },
  Warning: { t: "string", grp: "ExifTool" },
  XPComment: { t: "string", grp: "EXIF" },
  XPKeywords: { t: "string", grp: "EXIF" },
  XPSubject: { t: "string", grp: "EXIF" },
  XPTitle: { t: "string", grp: "EXIF" },
};

// ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
// ☠☠                          AVAST YE!                           ☠☠
// ☠☠                                                              ☠☠
// ☠☠    BEYOND THIS POINT, THERE BE NAUGHT BUT TANGLED RIGGING    ☠☠
// ☠☠        AND CODE THAT'D MAKE A KRAKEN WEEP. TURN BACK,        ☠☠
// ☠☠              LEST YE FIND YERSELF IN DAVY JONES'             ☠☠
// ☠☠            LOCKER, WITH NAUGHT BUT BUGS FER COMPANY.         ☠☠
// ☠☠                                                              ☠☠
// ☠☠         YE'VE BEEN WARNED, YE BRAVE AND FOOLISH SOUL.        ☠☠
// ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠

//

// no srsly, this code is _really_ bad, but I wanted a Tags interface, more
// than I felt shame in writing this, so it's here. I'm sorry. Everything
// _else_ has tests, honest.

//

const js_docs = {
  CompositeTags: [
    "These are tags are derived from the values of one or more other tags.",
    "Only a few are writable directly.",
    "@see https://exiftool.org/TagNames/Composite.html",
  ],
  EXIFTags: ["@see https://exiftool.org/TagNames/EXIF.html"],
  ExifToolTags: ["These tags are added by `exiftool`."],
  FileTags: [
    "These tags are not metadata fields, but are intrinsic to the content of a",
    "given file. ExifTool can't write to many of these tags.",
  ],
  FlashPixTags: ["@see https://exiftool.org/TagNames/FlashPix.html"],
  GeolocationTags: [
    "These tags are only available if {@link ExifToolOptions.geolocation} is true",
    "and the file has valid GPS location data.",
  ],
  IPTCTags: ["@see https://exiftool.org/TagNames/IPTC.html"],
  PhotoshopTags: ["@see https://exiftool.org/TagNames/Photoshop.html"],
  XMPTags: ["@see https://exiftool.org/TagNames/XMP.html"],
};

// If we don't do tag pruning, TypeScript fails with
// error TS2590: Expression produces a union type that is too complex to represent.

// This is a set of regexp patterns that match tags that are (probably)
// ignorable:
const ExcludedTagRe = new RegExp(
  [
    "_",
    "A[ab]{3,}",
    "AEC",
    "AFR",
    "AFS",
    "AFStatus_",
    "AFTrace",
    "AFV",
    "ASF\\d",
    "AtmosphericTrans",
    "AWB",
    "CAM\\d",
    "CameraTemperature",
    "ChroSupC",
    "DayltConv",
    "DefConv",
    "DefCor",
    "Face\\d",
    "FCS\\d",
    "HJR",
    "IM[a-z]",
    "IncandConv",
    "Kelvin_?WB",
    "Label\\d",
    "Value\\d",
    "Mask_",
    "MODE",
    "MTR",
    "O[a-f]+Revision",
    "PF\\d\\d",
    "PictureWizard",
    "PiP",
    "Planck",
    "PF\\d",
    "ProfileLook",
    "R2[A-Z]", // noooo artooo
    "RecallShoot",
    "STB\\d",
    "Tag[\\d_]+",
    "TL84",
    "WB[_\\d]",
    "YhiY",
    "\\w{6,}\\d{1,2}$",
  ].join("|"),
);

function sortBy<T>(
  arr: T[],
  f: (t: T, index: number) => Maybe<string | number>,
): T[] {
  return arr
    .filter((ea) => ea != null)
    .map((item, idx) => ({
      item,
      cmp: map(f(item, idx), (ea) => [ea, idx]),
    }))
    .filter((ea) => ea.cmp != null)

    .sort((a, b) => cmp(a.cmp!, b.cmp!))
    .map((ea) => ea.item);
}

// Benchmark on 3900X: 53s for 10778 files with defaults

// 23s for 10778 files with these overrides:

const exiftool = new ExifTool({
  maxProcs: os.cpus().length,
  // if we use straight defaults, we're load-testing those defaults.
  streamFlushMillis: 2,
  minDelayBetweenSpawnMillis: 0,
  geolocation: true,
  // maxTasksPerProcess: 100, // < uncomment to verify proc wearing works
});

function ellipsize(str: string, max: number) {
  str = "" + str;
  return str.length < max ? str : str.slice(0, max - 8) + "…" + str.slice(-7);
}

// ☠☠ NO SRSLY STOP SCROLLING IT REALLY IS BAD ☠☠

setLogger(
  Log.withLevels(
    Log.withTimestamps(
      Log.filterLevels(
        {
          trace: console.log,
          debug: console.log,
          info: console.log,
          warn: console.warn,
          error: console.error,
        },
        (process.env.LOG as any) ?? "info",
      ),
    ),
  ),
);

process.on("uncaughtException", (error: unknown) => {
  console.error("Caught uncaughtException: " + error);
});

process.on("unhandledRejection", (reason: unknown) => {
  console.error("Caught unhandledRejection: " + reason);
});

function usage() {
  console.log("Usage: `npm run mktags IMG_DIR`");
  console.log("\nRebuilds src/Tags.ts from tags found in IMG_DIR.");

  process.exit(1);
}

function cmp(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0;
}

const roots = process.argv.slice(2);
if (roots.length === 0)
  throw new Error("USAGE: mktags <path to image directory>");

const pattern = "**/*.+(3fr|avi|jpg|mov|mp4|cr2|cr3|nef|orf|raf|arw|rw2|dng)";

const files = roots
  .map((root) => {
    logger().info("Scanning " + root + "/" + pattern + "...");
    return globule.find(pattern, {
      srcBase: root,
      nocase: true,
      nodir: true,
      absolute: true,
    } as any);
  })
  .reduce((prev, curr) => prev.concat(curr));

if (files.length === 0) {
  console.error(`No files found in ${roots}`);
  usage();
}

logger().info("Found " + files.length + " files...", files.slice(0, 7));

function valueType(value: unknown): Maybe<string> {
  if (value == null) return;
  if (Array.isArray(value)) {
    const types = uniq(compact(value.map((ea) => valueType(ea))));
    return (types.length === 1 ? types[0] : "any") + "[]";
  }
  if (typeof value === "object") {
    const ctor = value.constructor.name;
    if (ctor === "Object") {
      return "Struct";
    }
    if (
      ctor.startsWith("ExifDate") ||
      ctor.startsWith("ExifTime") ||
      ctor.endsWith("Field")
    ) {
      return ctor + " | string";
    }
    return ctor;
  } else {
    return typeof value;
  }
}

// except CountingMap. Isn't it cute? Not ashamed of you, little guy!

class CountingMap<T> {
  private size = 0;
  private readonly m = new Map<T, number>();
  add(...arr: T[]) {
    this.size += arr.length;
    for (const ea of arr) {
      this.m.set(ea, 1 + (this.m.get(ea) ?? 0));
    }
  }
  byCountDesc(): T[] {
    return Array.from(this.m.keys()).sort((a, b) =>
      cmp(this.m.get(b), this.m.get(a)),
    );
  }
  topN(n: number) {
    return this.byCountDesc().slice(0, n);
  }
  /**
   * @param p [0,1]
   * @return the values found in the top p of values
   */
  byP(p: number): T[] {
    const min = p * this.size;
    return this.byCountDesc().filter((ea) => (this.m.get(ea) ?? 0) > min);
  }
}

function sigFigs(i: number, digits: number): number {
  if (i === 0 || digits === 0) return 0;
  const pow = Math.pow(
    10,
    digits - Math.round(Math.ceil(Math.log10(Math.abs(i)))),
  );
  return Math.round(i * pow) / pow;
}

function toStr(o: any): any {
  if (o == null) return "";
  else if (isNumber(o)) return sigFigs(o, 8);
  else if (isString(o)) return `"${ellipsize(o, 65)}"`;
  else if (isString(o.rawValue)) return `"${ellipsize(o.rawValue, 65)}"`;
  else return ellipsize(JSON.stringify(o), 65);
}

function exampleToS(examples: any[]): string {
  return examples.length > 1 ? toStr(examples) : toStr(examples[0]);
}

function getOrSet<K, V>(m: Map<K, V>, k: K, valueThunk: () => V): V {
  const prior = m.get(k);
  if (prior != null) {
    return prior;
  } else {
    const v = valueThunk();
    m.set(k, v);
    return v;
  }
}

/**
 * Unfortunately there's a ton of duplication between APP group names, so we throw everything into APPTags.
 */
function normalizeGroup(group: string): string {
  return group.replace(/^APP\d+/, "APP");
}

class Tag {
  values: any[] = [];
  files = new Set<string>(); // Track unique files containing this tag
  important = false;
  groups = new Set<string>();
  staticInterface?: string; // If set, this tag is from a static interface and shouldn't be generated
  doc?: string; // Optional documentation/remarks for this tag
  see?: string; // Optional @see reference (URL or other reference)
  constructor(readonly tag: string) {
    // Initialize with the first group from the tag
    const firstGroup = map(tag.split(":")[0], normalizeGroup);
    if (firstGroup) {
      this.groups.add(firstGroup);
    }
  }

  addGroup(groupTag: string) {
    const group = map(groupTag.split(":")[0], normalizeGroup);
    if (group) {
      this.groups.add(group);
    }
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      groups: this.groups,
      base: this.base,
      important: this.important,
      valueTypes: this.valueTypes,
      values: [...new Set(this.values)].slice(0, 3),
    };
  }

  get base(): string {
    return this.tag.split(":")[1] ?? this.tag;
  }

  get valueTypes(): string[] {
    const cm = new CountingMap<string>();
    compact(this.values)
      .map((ea) => valueType(ea))
      .forEach((ea) => {
        if (!nullish(ea)) cm.add(ea);
      });
    return cm.byP(0.5).sort();
  }

  get valueType(): string {
    return (
      RequiredTags[this.base as any]?.t ??
      (this.valueTypes.length === 0 ? "string" : this.valueTypes.join(" | "))
    );
  }

  get sortBy() {
    return (
      -(this.required ? 1e8 : this.important ? 1e4 : 1) * this.values.length
    );
  }

  get required() {
    return this.base in RequiredTags;
  }

  vacuumValues() {
    return filterInPlace(this.values, (ea) => !nullish(ea));
  }

  keep(minValues: number): boolean {
    this.vacuumValues();
    // If it's a tag from an "important" camera, always include the tag.
    // Otherwise, if we never get a valid value for the tag, skip it.
    return (
      this.required ||
      (!blank(this.valueType) &&
        (this.important || this.values.length >= minValues))
    );
  }

  popularity(totalValues: number): number {
    const f = this.files.size / totalValues;
    return sigFigs(f, 1);
  }

  stars(totalValues: number): string {
    const f = this.files.size / totalValues;
    return f > 0.5
      ? "★★★★"
      : f > 0.2
        ? "★★★☆"
        : f > 0.1
          ? "★★☆☆"
          : f > 0.05
            ? "★☆☆☆"
            : "☆☆☆☆";
  }

  jsdocTags(totalValues: number): string {
    const frequencyDecimal = this.popularity(totalValues);
    const frequencyPercent = Math.round(frequencyDecimal * 100);
    const starRating = this.stars(totalValues);
    const mainstreamEmoji = this.important ? "🔥" : "🧊";
    const groups = [...this.groups].sort().join(", ");

    const lines = [
      ` * @frequency ${mainstreamEmoji} ${starRating} (${frequencyPercent}%)`,
      ` * @groups ${groups}`,
      ` * @example ${this.example()}`,
    ];

    // Add @remarks tag if documentation is provided
    if (this.doc != null) {
      // Replace newlines with newline + JSDoc comment prefix for multi-line support
      const remarks = this.doc.replace(/\n/g, "\n * ");
      lines.push(` * @remarks ${remarks}`);
    }

    // Add @see tag if reference is provided
    if (this.see != null) {
      lines.push(` * @see ${this.see}`);
    }

    return lines.join("\n");
  }

  popIcon(totalValues: number): string {
    const f = this.files.size / totalValues;

    // kid: dad srsly stop with the emojicode no one likes it

    // dad: ur not the boss of me 💩

    // As of 20180814, 4300 unique tags, 2713 of which were found in at least 2
    // cameras, and only 700 were found in at least 1% of cameras, so this looks
    // like a power law, long-tail distribution, so lets make the cutoffs more
    // exponentialish rather than linearish.

    // 22 at 99%, 64 at 50%, 87 at 25%, 120 at 10%, 230 at 5%, so if we make the
    // four star cutoff too high, nothing will have four stars.

    // Read 4311 unique tags from 6526 files.
    // missing files:
    // Parsing took 20075ms (3.1ms / file)
    // Distribution of tags:

    //  0%: 2714:#################################
    //  1%:  700:########
    //  2%:  389:####
    //  3%:  323:###
    //  4%:  265:###
    //  5%:  236:##
    //  6%:  207:##
    //  7%:  188:##
    //  8%:  173:##
    //  9%:  142:#
    // 10%:  130:#
    // 11%:  125:#
    // 12%:  118:#
    // 13%:  108:#
    // 14%:  103:#
    // 15%:  102:#
    // 16%:  101:#
    // 17%:   96:#
    // 18%:   93:#
    // 19%:   92:#
    // 20%:   91:#
    // 21%:   90:#
    // 22%:   89:#
    // 23%:   88:#
    // 24%:   86:#
    // 25%:   85:#
    // 26%:   81:
    // 27%:   80:
    // 28%:   80:
    // 29%:   79:
    // 30%:   77:
    // 31%:   76:
    // 32%:   75:
    // 33%:   75:
    // 34%:   74:
    // 35%:   74:
    // 36%:   72:
    // 37%:   71:
    // 38%:   70:
    // 39%:   70:
    // 40%:   70:
    // 41%:   70:

    const stars =
      f > 0.5
        ? "★★★★"
        : f > 0.2
          ? "★★★☆"
          : f > 0.1
            ? "★★☆☆"
            : f > 0.05
              ? "★☆☆☆"
              : "☆☆☆☆";
    const important = this.important ? "✔" : " ";
    return `${stars} ${important}`;
  }

  example(): string {
    // There are a bunch of tag values that have people's actual names or
    // contact information. Replace those values with stub values:
    if (this.tag.endsWith("GPSLatitude")) return exampleToS([48.8577484]);
    if (this.tag.endsWith("GPSLongitude")) return exampleToS([2.2918888]);
    if (this.tag.endsWith("Comment")) return exampleToS(["This is a comment."]);
    if (this.tag.endsWith("Directory"))
      return exampleToS(["/home/username/pictures"]);
    if (this.tag.endsWith("Copyright"))
      return exampleToS(["© Chuckles McSnortypants, Inc."]);
    if (this.tag.endsWith("CopyrightNotice"))
      return exampleToS(["Creative Commons Attribution 4.0 International"]);
    if (this.tag.endsWith("OwnerName")) return exampleToS(["Itsa Myowna"]);
    if (this.tag.endsWith("Artist")) return exampleToS(["Arturo DeImage"]);
    if (this.tag.endsWith("Author")) return exampleToS(["Norm De Plume"]);
    if (this.tag.endsWith("Contact")) return exampleToS(["Donna Ringmanumba"]);
    if (this.tag.endsWith("Rights"))
      return exampleToS(["Kawp E. Reite Houldre"]);
    if (this.tag.endsWith("Software") || this.tag.endsWith("URL"))
      return exampleToS(["https://PhotoStructure.com/"]);
    if (this.tag.endsWith("Credit"))
      return exampleToS(["photo by Jenny Snapsalot"]);
    // Don't override tags like "LightSource"--we just want "Source":
    if (this.base === "Source" && this.valueType === "string")
      return exampleToS(["Shutterfly McShutterface"]);
    const byValueType = new Map<string, any[]>();
    // Shove boring values to the end:
    this.vacuumValues();
    uniq(this.values)
      .sort()
      .reverse()
      .forEach((ea) => {
        getOrSet(byValueType, valueType(ea), () => []).push(ea);
      });
    // If there are multiple types, try to show one of each type:
    return exampleToS(
      this.valueTypes
        .map((key) => map(byValueType.get(key), (ea) => ea[0]))
        .filter((ea) => !nullish(ea)),
    );
  }
}

// const minOccurrences = 2

class TagMap {
  readonly byBase = new Map<string, Tag>();
  private maxValueCount = 0;
  private _finished = false;
  groupedTags = new Map<string, Tag[]>();
  readonly tags: Tag[] = [];
  constructor() {
    // Build static tag set for collision detection
    const staticTagNames = new Set<string>();
    for (const { tagNames } of StaticInterfaceMetadata) {
      for (const tagName of tagNames.values) {
        staticTagNames.add(tagName);
      }
    }

    // Seed with required tags
    const collisions: string[] = [];
    for (const [k, v] of Object.entries(RequiredTags)) {
      if (staticTagNames.has(k)) {
        collisions.push(k);
      }
      const t = this.tag(v.grp + ":" + k);
      if (v.value != null) {
        t.values.push(v.value);
      }
      if (v.doc != null) {
        t.doc = v.doc;
      }
      if (v.see != null) {
        t.see = v.see;
      }
    }

    if (collisions.length > 0) {
      console.log(
        `\n⚠️  ${collisions.length} RequiredTags also in static interfaces:`,
      );
      collisions.forEach((k) => console.log(`   - ${k}`));
      console.log(
        "   (These tags are defined in both RequiredTags and a static interface)\n",
      );
    }

    // Seed with static interface tags to reserve their names and capture metadata
    for (const entry of StaticInterfaceMetadata) {
      for (const tagName of entry.tagNames.values) {
        const t = this.tag(entry.group + ":" + tagName);
        t.staticInterface = entry.name;
        t.important = true; // Include in metadata even at 0 frequency
      }
    }
  }

  /**
   * @param tag expected to be "$group:$tagname". Gets or creates a Tag for the base tagname.
   * Groups are tracked separately via addGroup().
   */
  tag(tag: string) {
    const base = tag.split(":")[1] ?? tag;
    return getOrSet(this.byBase, base, () => new Tag(tag));
  }

  add(tagName: string, value: any, important: boolean, filename: string) {
    if (
      tagName == null ||
      value == null ||
      tagName.match(ExcludedTagRe) != null
    ) {
      return;
    }

    const tag = this.tag(tagName);
    // Track which file contains this tag (for accurate frequency calculation)
    tag.files.add(filename);
    // Add this group to the tag's groups set (in case it appears in multiple groups)
    tag.addGroup(tagName);
    if (important) {
      tag.important = true;
    }
    if (value != null) {
      const values = tag.values;
      values.push(value);
      this.maxValueCount = Math.max(values.length, this.maxValueCount);
    }
  }
  finish() {
    if (this._finished) return;
    this._finished = true;
    this.tags.length = 0;
    const arr = [...this.byBase.values()];
    this.tags.push(...arr.filter((ea) => ea.required));
    console.log("TagMap.finish(): required tag count:" + this.tags.length);
    const optional = sortBy(
      arr.filter((ea) => !ea.required && ea.keep(2)),
      (ea) => ea.sortBy,
    );
    this.tags.push(...optional.slice(0, MAX_TAGS - this.tags.length));
    console.log(
      "TagMap.finish(): final tag count:" +
        this.tags.length +
        " from " +
        arr.length +
        " raw tags.",
    );

    // console.log(
    //   `Skipping the following tags due to < ${minOccurrences} occurrences:`
    // )
    // console.log(
    //   allTags
    //     .filter((a) => !a.keep(minOccurrences))
    //     .map((t) => t.tag)
    //     .join(", ")
    // )
    this.groupedTags.clear();
    this.tags.forEach((tag) => {
      // Skip tags from static interfaces - they're already defined manually
      if (tag.staticInterface != null) {
        return;
      }
      // Add tag to ALL groups it belongs to, not just one
      for (const group of tag.groups) {
        getOrSet(this.groupedTags, group, () => []).push(tag);
      }
    });
  }
}

const tagMap = new TagMap();
const saneTagRe = /^\w+:\w+$/;

const bar = new ProgressBar(
  "reading tags [:bar] :current/:total files, :tasks pending @ :rate files/sec w/:procs procs :etas",
  {
    complete: "=",
    incomplete: " ",
    width: 40,
    total: files.length,
    renderThrottle: 100,
  },
);

let nextTick = Date.now();
let ticks = 0;

const failedFiles: string[] = [];
const seenFiles: string[] = [];

async function readAndAddToTagMap(file: string) {
  try {
    if (file.includes("metadesert")) return;
    const tags: any = await exiftool.read(file, ["-G"]);
    if (tags.warnings.length > 0 || tags.errors.length > 0) {
      console.log({ file, warnings: tags.warnings, errors: tags.errors });
    }
    seenFiles.push(file);
    const importantFile = file.toString().toLowerCase().includes("important");
    for (const [k, v] of Object.entries(tags)) {
      if (null != saneTagRe.exec(k)) {
        tagMap.add(k, v, importantFile, file);
      }
    }
    if (tags.errors?.length > 0) {
      bar.interrupt(`Error from ${file}: ${tags.errors}`);
    }
  } catch (err) {
    bar.interrupt(`Error from ${file}: ${err}`);
    failedFiles.push(file);
  }
  ticks++;
  if (nextTick <= Date.now()) {
    nextTick = Date.now() + 50;
    bar.tick(ticks, {
      tasks: exiftool.pendingTasks,
      procs: exiftool.busyProcs,
    });
    ticks = 0;
  }
  return;
}

const start = Date.now();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection: " + reason);
});

function escapeKey(s: string): string {
  return s.match(/\W/) != null ? JSON.stringify(s) : s;
}

Promise.all(files.map((file) => readAndAddToTagMap(file)))
  .then(async () => {
    bar.terminate();
    tagMap.finish();
    console.log(
      `\nRead ${tagMap.byBase.size} unique tags from ${seenFiles.length} files.`,
    );
    const missingFiles = files.filter((ea) => seenFiles.indexOf(ea) === -1);
    console.log("missing files: " + missingFiles.join("\n"));
    const elapsedMs = Date.now() - start;
    console.log(`Parsing took ${elapsedMs}ms`);
    const version = await exiftool.version();
    const destFile = path.resolve(__dirname, "../../src/Tags.ts");
    const tagWriter = fs.createWriteStream(destFile);
    tagWriter.write(
      [
        'import { BinaryField } from "./BinaryField";',
        'import { ContainerDirectoryItem } from "./ContainerDirectoryItem";',
        'import { Equal } from "./Equal";',
        'import { ExifDate } from "./ExifDate";',
        'import { ExifDateTime } from "./ExifDateTime";',
        'import { ExifTime } from "./ExifTime";',
        'import { ExifToolVendoredTags, ExifToolVendoredTagNames } from "./ExifToolVendoredTags";',
        'import { Expect } from "./Expect";',
        'import { GeolocationTags, GeolocationTagNames } from "./GeolocationTags";',
        'import { ICCProfileTags, ICCProfileTagNames } from "./ICCProfileTags";',
        'import { ImageDataHashTag, ImageDataHashTagNames } from "./ImageDataHashTag";',
        'import { IPTCApplicationRecordTags, IPTCApplicationRecordTagNames } from "./IPTCApplicationRecordTags";',
        'import { MWGCollectionsTags, MWGKeywordTags, MWGCollectionsTagNames, MWGKeywordTagNames } from "./MWGTags";',
        'import { ResourceEvent } from "./ResourceEvent";',
        'import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";',
        'import { Struct } from "./Struct";',
        'import { Version } from "./Version";',
        "",
      ].join("\n"),
    );
    const groupedTags = tagMap.groupedTags;
    const tagGroups: string[] = [];
    // Pick from the "APP###" groups last.

    const DesiredOrder = [
      "exiftool",
      "file",
      "composite",
      "exif",
      "iptc",
      "jfif",
      "makernotes",
      "xmp",
    ];
    const unsortedGroupNames = [...groupedTags.keys()].sort();
    const groupNames = sortBy(unsortedGroupNames, (ea, index) => {
      const indexOf = DesiredOrder.indexOf(ea.toLowerCase());
      return indexOf >= 0 ? indexOf : index + unsortedGroupNames.length;
    });
    for (const group of groupNames) {
      const interfaceName = group + "Tags";

      const tagsForGroup = groupedTags.get(group)!;
      if (tagsForGroup.length > 0) {
        tagGroups.push(group);
        if (interfaceName in js_docs) {
          tagWriter.write(`\n/**\n`);
          for (const line of (js_docs as any)[interfaceName]) {
            tagWriter.write(" * " + line + "\n");
          }
          tagWriter.write(` */`);
        }
        tagWriter.write(`\nexport interface ${interfaceName} {\n`);
        const tagNamesForGroup: string[] = [];
        for (const tag of sortBy(tagsForGroup, (tag) =>
          tag.base.toLowerCase(),
        )) {
          tagWriter.write(`  /**\n${tag.jsdocTags(files.length)}\n   */\n`);
          tagWriter.write(`  ${escapeKey(tag.base)}?: ${tag.valueType};\n`);
          tagNamesForGroup.push(tag.base);
        }
        tagWriter.write(`}\n`);

        // Generate strEnum for this interface
        const strEnumName = interfaceName + "Names";
        tagWriter.write(`\nexport const ${strEnumName} = strEnum(\n`);
        tagWriter.write(
          tagNamesForGroup.map((name) => `  "${name}"`).join(",\n"),
        );
        tagWriter.write(`\n) satisfies StrEnum<keyof ${interfaceName}>;\n`);

        const typeName = interfaceName.slice(0, -1);
        tagWriter.write(
          `\nexport type ${typeName} = StrEnumKeys<typeof ${strEnumName}>;\n`,
        );

        // assert the strEnum exactly matches the field names of an interface:
        tagWriter.write(
          `\ndeclare const _${typeName}: Expect<Equal<${typeName}, keyof ${interfaceName}>>;\n`,
        );
      }
    }
    const interfaceNames = [
      ...tagGroups.map((s) => s + "Tags"),
      "ExifToolVendoredTags",
      "GeolocationTags",
      "ImageDataHashTag",
      "ICCProfileTags",
      "IPTCApplicationRecordTags",
      "MWGCollectionsTags",
      "MWGKeywordTags",
    ].sort();
    tagWriter.write(
      [
        "",
        `/**`,
        ` * This is a partial list of fields returned by {@link ExifTool.read}.`,
        ` *`,
        ` * This interface is **not** comprehensive: we only include the most popular`,
        ` * ~2 thousand fields so as to avoid TypeScript error TS2590: (Expression`,
        ` * produces a union type that is too complex to represent).`,
        ` *`,
        ` * If this interface is missing a field you need, you should handle that`,
        ` * typecasting safely in your own code.`,
        ` *`,
        ` * JSDoc annotations for each tag include:`,
        ` * - @frequency: device type emoji (🔥 = mainstream consumer devices, 🧊 = specialized/professional), star rating (★★★★ is found in >50% of samples, ☆☆☆☆ is rare), and exact percentage in parentheses`,
        ` * - @groups: comma-separated list of metadata groups where this tag appears (e.g., "EXIF, MakerNotes")`,
        ` * - @example: representative value for the tag`,
        ` *`,
        ` * Autogenerated by "npm run mktags" by ExifTool ${version} on ${new Date().toDateString()}.`,
        ` * ${tagMap.byBase.size} unique tags were found in ${files.length} photo and video files.`,
        ` *`,
        ` * @see https://exiftool.org/TagNames/`,
        ` */`,
        "export interface Tags",
        `  extends ${interfaceNames.join(",\n    ")} {}`,
        "",
      ].join("\n"),
    );

    // Generate the concatenated TagNames strEnum
    const allTagNameVariables = [
      ...tagGroups.map((s) => s + "TagsNames"),
      "ExifToolVendoredTagNames",
      "GeolocationTagNames",
      "ImageDataHashTagNames",
      "ICCProfileTagNames",
      "IPTCApplicationRecordTagNames",
      "MWGCollectionsTagNames",
      "MWGKeywordTagNames",
    ];

    tagWriter.write(
      [
        "",
        "/**",
        " * All tag names combined from all interfaces",
        " */",
        "export const TagNames = strEnum(",
        `  ...${allTagNameVariables.map((name) => `${name}.values`).join(",\n  ...")}`,
        ") satisfies StrEnum<keyof Tags>;",
        "",
        "export type TagName = StrEnumKeys<typeof TagNames>;",
        "",
        "declare const _TagName: Expect<Equal<TagName, keyof Tags>>;",
        "",
      ].join("\n"),
    );

    tagWriter.end();

    // Generate JSON file with tag metadata
    const dataDir = path.resolve(__dirname, "../../data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const jsonDestFile = path.resolve(dataDir, "TagMetadata.json");
    const tagMetadata: Record<
      string,
      { frequency: number; mainstream: boolean; groups: string[] }
    > = {};

    for (const tag of tagMap.tags) {
      tagMetadata[tag.base] = {
        frequency: tag.popularity(files.length),
        mainstream: tag.important,
        groups: [...tag.groups].sort(),
      };
    }

    // Sort keys to minimize diffs between rebuilds
    const sortedTagMetadata = Object.keys(tagMetadata)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = tagMetadata[key]!;
          return acc;
        },
        {} as typeof tagMetadata,
      );

    fs.writeFileSync(jsonDestFile, JSON.stringify(sortedTagMetadata, null, 2));
    console.log(`\nWrote tag metadata to ${jsonDestFile}`);

    // Let's look at tag distributions:
    const tags = tagMap.tags;
    const tagsByPctPop = times(
      25,
      (pct) =>
        tags.filter((tag) => tag.values.length / files.length > pct / 100.0)
          .length,
    );
    const scale = 80 / files.length;
    console.log("Distribution of tags: \n");
    tagsByPctPop.forEach((cnt, pct) =>
      console.log(
        leftPad(pct, 2, " ") +
          "%: " +
          leftPad(cnt, 4, " ") +
          ":" +
          times(Math.floor(cnt * scale), () => "#").join(""),
      ),
    );
    await exiftool.end();
    const bc: BatchCluster = exiftool["batchCluster"];
    if (bc.internalErrorCount > 0) {
      console.error("ERROR: " + bc.internalErrorCount + " internal errors.");
    }
    console.log("Final batch cluster stats", bc.stats());
    return;
  })
  .catch((err) => {
    console.error(err);
  });
