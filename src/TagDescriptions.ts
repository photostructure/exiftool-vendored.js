import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ExifTool } from "./ExifTool";
import { lazy } from "./Lazy";
import { ListXTask } from "./ListXTask";
import { Maybe } from "./Maybe";

/**
 * Description information for a metadata tag.
 */
export interface TagDescription {
  /**
   * Human-readable description of what this tag represents.
   */
  desc: string;
  /**
   * Optional URL reference to ExifTool documentation or other resources.
   */
  see?: string;
}

/**
 * Options for configuring TagDescriptions behavior.
 */
export interface TagDescriptionsOptions {
  /**
   * Directory to cache parsed tag descriptions.
   * Defaults to system temp directory.
   */
  cacheDir?: string;
  /**
   * Language code for descriptions (e.g., 'en', 'de', 'fr').
   * Defaults to 'en'.
   */
  language?: string;
  /**
   * If true, disables disk caching. Useful for testing or memory-constrained environments.
   * Defaults to false.
   */
  disableDiskCache?: boolean;
}

// Hand-curated descriptions for important tags.
// These take priority over ExifTool's built-in descriptions.
// Extracted from RequiredTags in mktags.ts
const CuratedDescriptions: Record<string, TagDescription> = {
  Aperture: {
    desc: "Calculated aperture value derived from FNumber or ApertureValue. Read-only composite tag. To write, modify FNumber or ApertureValue instead.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ApertureValue: {
    desc: "Lens aperture in APEX units. Secondary source for Aperture composite (FNumber takes priority). Formula: ApertureValue = 2 × log₂(FNumber). To write aperture, prefer FNumber as it's more intuitive.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  Artist: {
    desc: "Image creator/photographer name. ExifTool trims trailing whitespace. When MWG module is loaded, this becomes a list-type tag synchronized with XMP-dc:Creator and IPTC:By-line.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  AvgBitrate: {
    desc: "Average bitrate for video/audio files, calculated from media data size divided by duration. Read-only composite tag for QuickTime-based formats (MOV, MP4, etc.).",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ColorSpace: {
    desc: "Color space of image data. EXIF mandatory tag. Standard values: 1 (sRGB), 0xFFFF (Uncalibrated). Non-standard values: 2 (Adobe RGB, some cameras), 0xFFFD (Wide Gamut RGB, Sony), 0xFFFE (ICC Profile, Sony). Adobe RGB is typically indicated by 'Uncalibrated' with InteropIndex='R03'.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  Copyright: {
    desc: "Copyright notice for the image. MWG composite tag that reconciles EXIF:Copyright, IPTC:CopyrightNotice, and XMP-dc:Rights. Writing updates all three locations to maintain MWG synchronization.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  CreateDate: {
    desc: "When an image was digitized (captured by camera sensor). MWG composite tag that reconciles EXIF:CreateDate, IPTC digital creation fields, and XMP-xmp:CreateDate. Distinct from DateTimeOriginal (when photo was taken) - useful for scanned images. For MOV/MP4 videos, use CreateDate instead of DateTimeOriginal.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  DateTimeOriginal: {
    desc: "When a photo was taken (shutter actuation time). MWG composite tag that reconciles EXIF:DateTimeOriginal, IPTC:DateCreated/TimeCreated, and XMP-photoshop:DateCreated. This is the most commonly used timestamp for photos. Different from CreateDate (digitization) and ModifyDate (file modification).",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Description: {
    desc: "Image caption or description. MWG composite tag that reconciles EXIF:ImageDescription, IPTC:Caption-Abstract, and XMP-dc:Description. Writing updates all three locations for MWG compliance.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  DOF: {
    desc: "Calculated depth of field based on focal length, aperture, and focus distance. WARNING: This value may be incorrect if the image has been resized. Read-only composite tag.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Duration: {
    desc: "Video/audio duration. QuickTime: stored in time scale units, converted to seconds using TimeScale. ExifTool formats as 'H:MM:SS' or seconds. Some iPhone live-photo MOV videos may show key frame time instead of total duration.",
    see: "https://exiftool.org/TagNames/QuickTime.html",
  },
  ExifVersion: {
    desc: "EXIF specification version (e.g., '0232' for EXIF 2.32). EXIF mandatory tag. Stored as 4-byte ASCII without separators. ExifTool accepts '2.32' format when writing. Some files incorrectly include null terminators which ExifTool removes.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ExposureCompensation: {
    desc: "Exposure bias/compensation in EV units (e.g., -0.67, +1.0). Also called ExposureBiasValue in EXIF spec. Signed value indicating deviation from metered exposure.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ExposureProgram: {
    desc: "Camera exposure mode. Values: 0 (Not Defined), 1 (Manual), 2 (Program AE), 3 (Aperture-priority AE), 4 (Shutter speed priority AE), 5 (Creative/Slow speed), 6 (Action/High speed), 7 (Portrait), 8 (Landscape). Value 9 (Bulb) is non-standard but used by some Canon models.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ExposureTime: {
    desc: "Shutter speed in seconds (e.g., '1/250'). Primary source for ShutterSpeed composite. To write shutter speed, use this tag directly. BulbDuration takes priority in ShutterSpeed composite if present and > 0.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  FileAccessDate: {
    desc: "File system access date/time. Not stored metadata - file system property. Read-only. Updated when file is read (including by ExifTool).",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileCreateDate: {
    desc: "File system creation date/time. Not stored metadata - file system property. Writable on some systems. Different from image capture date.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileModifyDate: {
    desc: "File system modification date/time. Not stored metadata - file system property. Writable. Different from EXIF ModifyDate which tracks user edits.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileName: {
    desc: "Name of the file. Not stored metadata - intrinsic file property. Writable: can rename files. May include full path to set Directory simultaneously.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileSize: {
    desc: "Size of the file. Not stored metadata - intrinsic file property. Read-only. Uses SI prefixes by default (1 kB = 1000 bytes).",
    see: "https://exiftool.org/TagNames/File.html",
  },
  FileType: {
    desc: "File type determined from file content, not extension. Not stored metadata - intrinsic file property. Read-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  Flash: {
    desc: "Flash status and mode as bitfield. Common values: 0x00 (No Flash), 0x01 (Fired), 0x05 (Fired, Return not detected), 0x07 (Fired, Return detected), 0x10 (Off, Did not fire), 0x18 (Auto, Did not fire), 0x19 (Auto, Fired), 0x41 (Fired, Red-eye reduction), 0x59 (Auto, Fired, Red-eye reduction). Bit 0: fired, Bit 1-2: return detection, Bit 3-4: mode, Bit 5: function present, Bit 6: red-eye mode.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  FNumber: {
    desc: "Lens aperture as f-number (e.g., 2.8, 5.6). Primary source for Aperture composite. To write aperture, use this tag - it's more intuitive than ApertureValue (which uses APEX units).",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  FocalLength: {
    desc: "Lens focal length in millimeters. Actual focal length, not 35mm equivalent. For 35mm equivalent, see FocalLengthIn35mmFormat or FocalLength35efl composite.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  GPSAltitude: {
    desc: "GPS altitude in meters. Always stored as positive value; sign determined by GPSAltitudeRef. Composite GPSAltitude combines this with Ref to return signed value with 'Above/Below Sea Level' text.",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  GPSAltitudeRef: {
    desc: "GPS altitude reference. Values: 0 (Above Sea Level, ellipsoidal), 1 (Below Sea Level, ellipsoidal), 2 (Above Sea Level, sea-level ref), 3 (Below Sea Level, sea-level ref). EXIF 3.0 clarifies 0-1 use ellipsoidal surface, 2-3 use sea-level reference. ExifTool also accepts negative numbers when writing.",
  },
  GPSDateTime: {
    desc: "GPS timestamp combining GPS:GPSDateStamp and GPS:GPSTimeStamp fields into a single UTC datetime. Read-only composite tag.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  GPSLatitude: {
    desc: "GPS latitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLatitudeRef. ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLatitude returns signed decimal.",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  GPSLatitudeRef: {
    desc: "GPS latitude hemisphere. Valid values: 'N' (North), 'S' (South). When writing, ExifTool accepts signed numbers or direction strings.",
  },
  GPSLongitude: {
    desc: "GPS longitude stored as three rationals (degrees, minutes, seconds). Always positive; hemisphere from GPSLongitudeRef. ExifTool accepts decimal degrees, DMS, or mixed formats when writing. Composite GPSLongitude returns signed decimal.",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  GPSLongitudeRef: {
    desc: "GPS longitude hemisphere. Valid values: 'E' (East), 'W' (West). When writing, ExifTool accepts signed numbers or direction strings.",
  },
  GPSPosition: {
    desc: "Combined GPS latitude and longitude. Writable composite tag. When written, updates GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef. Accepts Google Maps coordinates (right-click format).",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  GPSSpeed: {
    desc: "GPS speed of camera movement during capture. Units determined by GPSSpeedRef (K=km/h, M=mph, N=knots). Must be paired with GPSSpeedRef for meaningful interpretation.",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  GPSSpeedRef: {
    desc: "GPS speed measurement unit. Valid values: 'K' (km/h), 'M' (mph), 'N' (knots).",
  },
  GPSTimeStamp: {
    desc: "UTC time of GPS fix. When writing, date is stripped off if present, and time is adjusted to UTC if it includes a timezone.",
    see: "https://exiftool.org/TagNames/GPS.html",
  },
  History: {
    desc: "Tracks editing history of the document. XMP-xmpMM (Media Management) struct type. Flattened fields: HistoryAction, HistoryChanged, HistoryInstanceID, HistoryParameters, HistorySoftwareAgent, HistoryWhen.",
    see: "https://exiftool.org/TagNames/XMP.html#xmpMM",
  },
  ImageDataHash: {
    desc: "Hash of image data (excluding metadata). Only generated if specifically requested via -api RequestAll=3. Hash algorithm configurable via ImageHashType option (MD5 default, also SHA256/SHA512). Supports JPEG, TIFF, PNG, RAW formats, and MOV/MP4 videos (includes audio). Excludes thumbnails/previews but includes JpgFromRaw.",
    see: "https://exiftool.org/TagNames/Extra.html",
  },
  ImageHeight: {
    desc: "Image height in pixels. File-level property derived from file analysis. Read-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  ImageSize: {
    desc: "Image dimensions combining width and height from various metadata fields. Read-only composite derived from ImageWidth, ImageHeight, ExifImageWidth, ExifImageHeight, or RawImageCroppedSize.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ImageUniqueID: {
    desc: "Unique identifier for the image, typically a 32-character hex string. Useful for image deduplication, tracking identity across edits, and linking related files (e.g., RAW + JPEG pairs). May also appear in MakerNotes and XMP.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ImageWidth: {
    desc: "Image width in pixels. File-level property derived from file analysis. Read-only.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  ISO: {
    desc: "Camera ISO sensitivity rating. In EXIF, this is an array (int16u[n]) that can contain multiple values. Historically called ISOSpeedRatings in EXIF 2.2, renamed to PhotographicSensitivity in EXIF 2.3.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  JpgFromRaw: {
    desc: "Embedded JPEG preview extracted from RAW files. Binary data type. Writable: can update existing embedded images, but cannot create or delete them. Access via BinaryField to get raw bytes or base64 encoding.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Keywords: {
    desc: "Searchable subject terms for image content. MWG composite tag that reconciles IPTC:Keywords and XMP-dc:Subject. Multi-value fields use semicolon-space ('; ') separators when represented as string. IPTC constraint: max 64 characters per keyword.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Lens: {
    desc: "Lens information (model name or focal length range). Sources vary by camera manufacturer and file format - may come from MakerNotes, XMP aux:Lens, or be derived from focal length values. Read-only composite. For detailed lens identification from lookup tables, see LensID.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  LensID: {
    desc: "Identifies actual lens model using manufacturer-specific lookup tables from partial type information. Configurable: may be extended with user-defined lenses via ExifTool configuration. Read-only composite.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Make: {
    desc: "Camera/device manufacturer. ExifTool automatically removes trailing whitespace. Used internally by ExifTool for vendor-specific tag handling.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  MediaCreateDate: {
    desc: "Creation date/time for QuickTime/MOV/MP4 media track. Stored as seconds since 1904-01-01 UTC. WARNING: Many cameras incorrectly store local time instead of UTC. For MOV/MP4 videos, use this tag instead of DateTimeOriginal.",
    see: "https://exiftool.org/TagNames/QuickTime.html",
  },
  Megapixels: {
    desc: "Total megapixels calculated from ImageSize composite field. Read-only composite.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  MeteringMode: {
    desc: "Light metering mode used during capture. Values: 0 (Unknown), 1 (Average), 2 (Center-weighted average), 3 (Spot), 4 (Multi-spot), 5 (Multi-segment/Pattern/Evaluative), 6 (Partial), 255 (Other).",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  MIMEType: {
    desc: "MIME type of the file. Not stored metadata - intrinsic file property. Read-only, determined from file content.",
    see: "https://exiftool.org/TagNames/File.html",
  },
  Model: {
    desc: "Camera/device model name. ExifTool automatically removes trailing whitespace. Used internally by ExifTool for vendor-specific tag handling.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  ModifyDate: {
    desc: "When the file was last modified by a user (not automatic processes). MWG composite tag that reconciles EXIF:ModifyDate and XMP-xmp:ModifyDate. Should reflect intentional user edits, not automatic metadata updates.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Orientation: {
    desc: "Image orientation. Valid values: 1 (Horizontal/normal), 2 (Mirror horizontal), 3 (Rotate 180°), 4 (Mirror vertical), 5 (Mirror horizontal + rotate 270° CW), 6 (Rotate 90° CW), 7 (Mirror horizontal + rotate 90° CW), 8 (Rotate 270° CW). Most images use values 1, 3, 6, and 8.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  OffsetTime: {
    desc: "Timezone offset for ModifyDate (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag. Used by SubSecModifyDate composite to produce timezone-aware timestamps. Writing SubSecModifyDate automatically updates this field.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  OffsetTimeDigitized: {
    desc: "Timezone offset for CreateDate (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag. Used by SubSecCreateDate composite to produce timezone-aware timestamps. Writing SubSecCreateDate automatically updates this field.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  OffsetTimeOriginal: {
    desc: "Timezone offset for DateTimeOriginal (e.g., '+05:30', '-08:00', 'Z'). EXIF 2.31+ tag. Used by SubSecDateTimeOriginal composite to produce timezone-aware timestamps. Writing SubSecDateTimeOriginal automatically updates this field.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
  PersonInImage: {
    desc: "Name(s) of person(s) shown in the image. XMP-iptcExt namespace. Simpler alternative to MWG RegionInfo when face coordinates aren't needed. Multi-value field; array when multiple people identified.",
    see: "https://exiftool.org/TagNames/XMP.html#iptcExt",
  },
  PreviewImage: {
    desc: "Embedded preview image data extracted from the file. CRITICAL: Writable for updating existing embedded images, but cannot create or delete previews. Can only modify previews that already exist in the file.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  Rating: {
    desc: "Star rating for the image. MWG composite tag from XMP-xmp:Rating. Valid values: -1 (rejected), 0 (unrated), 1-5 (star rating). Note: Rating may appear in EXIF but that's non-standard per MWG.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionInfo: {
    desc: "MWG face/region metadata structure containing AppliedToDimensions and RegionList. With struct=1 (default), contains nested objects. With struct=0, fields are flattened. Used by Lightroom, Picasa, Windows Photo Gallery, digiKam, and other photo organizers.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionName: {
    desc: "Name(s) of identified region(s), typically person names for face regions. From XMP-mwg-rs namespace. Flattened from RegionInfo struct (requires struct=0). For Lightroom compatibility, also add names to Keywords/Subject.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  RegionType: {
    desc: "Type(s) of region(s) identified. Valid values: 'Face', 'Pet', 'BarCode', 'Focus'. From XMP-mwg-rs namespace.",
    see: "https://exiftool.org/TagNames/MWG.html",
  },
  Rotation: {
    desc: "Degrees of clockwise camera rotation for QuickTime/MP4 video files. Special writable: Writing this tag updates QuickTime MatrixStructure for all tracks with a non-zero image size simultaneously. Different from EXIF Orientation tag.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ShutterSpeed: {
    desc: "Shutter speed combining ExposureTime, ShutterSpeedValue, and BulbDuration. Read-only composite tag. Format typically fractional (e.g., '1/250').",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecCreateDate: {
    desc: "Creation date with subsecond precision, merging EXIF:CreateDate, SubSecTimeDigitized, and OffsetTimeDigitized. Writable composite: writing updates all three fields simultaneously for high-precision timestamps with timezone information.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecDateTimeOriginal: {
    desc: "Original datetime with subsecond precision, combining EXIF:DateTimeOriginal, SubSecTimeOriginal, and OffsetTimeOriginal. Writable composite: writing updates all three fields simultaneously. Represents when the photo was originally taken with high precision.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  SubSecModifyDate: {
    desc: "Modification timestamp with subsecond precision, combining EXIF:ModifyDate, SubSecTime, and OffsetTime. Writable composite: writing updates all three fields simultaneously.",
    see: "https://exiftool.org/TagNames/Composite.html",
  },
  ThumbnailImage: {
    desc: "Embedded thumbnail image data. Binary data type. Writable for updating existing thumbnails, but cannot create or delete thumbnails.",
  },
  Title: {
    desc: "Image title. XMP-dc (Dublin Core) namespace - use this standard schema instead of non-standard XMP-xmp:Title. Supports language variants via RFC 3066 codes (e.g., 'Title-fr').",
    see: "https://exiftool.org/TagNames/XMP.html#dc",
  },
  WhiteBalance: {
    desc: "White balance mode. Standard EXIF values: 0 (Auto), 1 (Manual). MakerNotes often contain more detailed WhiteBalance with values like Daylight, Cloudy, Tungsten, Fluorescent, Flash, Custom, etc. EXIF:WhiteBalance has lower priority than MakerNotes version when both exist.",
    see: "https://exiftool.org/TagNames/EXIF.html",
  },
};

/**
 * Provides access to human-readable descriptions for ExifTool metadata tags.
 *
 * Descriptions are sourced from ExifTool's built-in tag database (via `-listx`)
 * and merged with hand-curated descriptions for important tags.
 *
 * **CAUTION**: The first call to an async method (e.g., `getAsync()`, `preload()`,
 * `getAll()`) may take several seconds as it launches ExifTool to retrieve tag
 * information.
 *
 * **SECOND CAUTION**: The in-memory cache can consume significant memory (several
 * MB).
 *
 * **THIRD CAUTION**: The on-disk cache can consume disk space (several MB).
 *
 * **FOURTH CAUTION**: The synchronous `get()` method only works after descriptions
 * are loaded! Be sure to call `preload()` during application initialization for
 * sync access later.
 *
 * **FIFTH CAUTION**: Tag descriptions may vary between ExifTool versions and languages.
 *
 * @example
 * ```typescript
 * import { exiftool } from "exiftool-vendored";
 *
 * const descriptions = new TagDescriptions(exiftool);
 *
 * // Preload during app initialization for sync access later
 * await descriptions.preload();
 *
 * // Sync lookup (instant if preloaded)
 * const desc = descriptions.get("DateTimeOriginal");
 * // => { desc: "When a photo was taken...", see: "https://..." }
 *
 * // Or use async lookup (auto-loads if needed)
 * const desc2 = await descriptions.getAsync("ISO");
 * ```
 */
export class TagDescriptions {
  readonly #exiftool: ExifTool;
  readonly #options: TagDescriptionsOptions;
  // Cached value for sync access via get()
  #cacheSync: Map<string, TagDescription> | null = null;

  constructor(exiftool: ExifTool, options?: TagDescriptionsOptions) {
    this.#exiftool = exiftool;
    this.#options = {
      language: "en",
      disableDiskCache: false,
      ...options,
    };
  }

  /**
   * Preload all tag descriptions into memory.
   * Call this during application initialization for instant sync access later.
   *
   * @returns Promise that resolves when descriptions are loaded
   */
  async preload(): Promise<void> {
    await this.#cache();
  }

  /**
   * Whether descriptions have been loaded into memory.
   */
  get isLoaded(): boolean {
    return this.#cacheSync != null;
  }

  /**
   * Get the number of tag descriptions available.
   * Returns 0 if not yet loaded.
   */
  get size(): number {
    return this.#cacheSync?.size ?? 0;
  }

  /**
   * Returns curated descriptions only when language is English.
   */
  get #curated(): Record<string, TagDescription> {
    return this.#options.language === "en" ? CuratedDescriptions : {};
  }

  /**
   * Synchronous lookup of a tag description.
   * Returns undefined if descriptions haven't been loaded or tag is unknown.
   *
   * For guaranteed results, call `preload()` first or use `getAsync()`.
   *
   * @param tagName The tag name (e.g., "DateTimeOriginal", "ISO")
   * @returns Tag description or undefined
   */
  get(tagName: string): TagDescription | undefined {
    return this.#curated[tagName] ?? this.#cacheSync?.get(tagName);
  }

  /**
   * Asynchronous lookup of a tag description.
   * Automatically loads descriptions if not yet loaded.
   *
   * @param tagName The tag name (e.g., "DateTimeOriginal", "ISO")
   * @returns Promise resolving to tag description or undefined
   */
  async getAsync(tagName: string): Promise<TagDescription | undefined> {
    return this.#curated[tagName] ?? (await this.#cache()).get(tagName);
  }

  /**
   * Get all loaded tag descriptions.
   * Automatically loads descriptions if not yet loaded.
   *
   * @returns Promise resolving to a readonly Map of tag names to descriptions
   */
  async getAll(): Promise<ReadonlyMap<string, TagDescription>> {
    return await this.#cache();
  }

  /**
   * Clear the in-memory cache.
   * The disk cache is preserved; call `preload()` to reload from disk.
   */
  clear(): void {
    this.#cacheSync = null;
    this.#cache.clear();
  }

  readonly #cache = lazy(async (): Promise<Map<string, TagDescription>> => {
    // Get ExifTool version for cache key
    const version = await this.#exiftool.version();
    const lang = this.#options.language ?? "en";

    // Try to load from disk cache first
    if (!this.#options.disableDiskCache) {
      const cached = this.#readDiskCache(version, lang);
      if (cached != null) {
        this.#cacheSync = cached;
        return cached;
      }
    }

    // Query ExifTool for tag information
    const xml = await this.#exiftool.enqueueTask(() => new ListXTask());

    // Parse XML and extract descriptions
    const parsed = this.#parseListX(xml, lang);

    // Merge with curated descriptions (curated takes priority, English only)
    for (const [name, desc] of Object.entries(this.#curated)) {
      parsed.set(name, desc);
    }

    // Write to disk cache
    if (!this.#options.disableDiskCache) {
      this.#writeDiskCache(version, lang, parsed);
    }

    this.#cacheSync = parsed;
    return parsed;
  });

  #getCacheDir(): string {
    return this.#options.cacheDir ?? join(tmpdir(), "exiftool-vendored");
  }

  #getCacheFilename(version: string, lang: string): string {
    return join(
      this.#getCacheDir(),
      `tag-descriptions-${version}-${lang}.json`,
    );
  }

  #readDiskCache(
    version: string,
    lang: string,
  ): Maybe<Map<string, TagDescription>> {
    try {
      const filename = this.#getCacheFilename(version, lang);
      if (!existsSync(filename)) return;

      const data = readFileSync(filename, "utf-8");
      const parsed = JSON.parse(data) as {
        version: string;
        language: string;
        descriptions: Record<string, TagDescription>;
      };

      // Validate cache metadata
      if (parsed.version !== version || parsed.language !== lang) {
        return;
      }

      return new Map(Object.entries(parsed.descriptions));
    } catch {
      // Cache miss or corrupt - will regenerate
      return;
    }
  }

  #writeDiskCache(
    version: string,
    lang: string,
    descriptions: Map<string, TagDescription>,
  ): void {
    try {
      const dir = this.#getCacheDir();
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      const filename = this.#getCacheFilename(version, lang);
      const data = JSON.stringify(
        {
          version,
          language: lang,
          generatedAt: new Date().toISOString(),
          descriptions: Object.fromEntries(descriptions),
        },
        null,
        2,
      );

      writeFileSync(filename, data, "utf-8");
    } catch {
      // Non-fatal - cache write failure shouldn't break the app
    }
  }

  #parseListX(xml: string, lang: string): Map<string, TagDescription> {
    const descriptions = new Map<string, TagDescription>();

    // Simple regex-based parsing - more robust than DOM for large files
    // Format: <tag ... name='TagName' ...><desc lang='en'>Description</desc>...</tag>
    const tagRegex =
      /<tag[^>]*\sname=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/tag>/gi;
    const descRegex = new RegExp(
      `<desc\\s+lang=['"]${lang}['"]>([^<]+)</desc>`,
      "i",
    );

    let match;
    while ((match = tagRegex.exec(xml)) !== null) {
      const tagName = match[1];
      const tagContent = match[2];
      if (tagName == null || tagContent == null) continue;

      const descMatch = descRegex.exec(tagContent);
      if (descMatch?.[1] != null) {
        const desc = this.#decodeXmlEntities(descMatch[1].trim());
        if (desc.length > 0) {
          descriptions.set(tagName, { desc });
        }
      }
    }

    return descriptions;
  }

  #decodeXmlEntities(str: string): string {
    return str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  }
}
