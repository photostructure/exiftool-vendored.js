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
import { Maybe, map } from "../Maybe";
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
const MAX_TAGS = 2500;

// These tags are important enough that we want to ensure they're always in the
// final Tags interface.
//
// If you're relying on a tag that gets inadvertently dropped in some release,
// consider opening a PR to restore it by adding it here:
const RequiredTags: Record<string, { t: string; grp: string; value?: any }> = {
  ExifToolVersion: { t: "string", grp: "ExifTool" }, // < ExifTool stores the version as a float (!!) which causes 12.30 to become 12.3.
  Album: { t: "string", grp: "XMP", value: "Twilight Dreams" },
  Aperture: { t: "number", grp: "Composite" },
  ApertureValue: { t: "number", grp: "EXIF" },
  AspectRatio: { t: "string", grp: "MakerNotes", value: "3:2" },
  Artist: { t: "string", grp: "EXIF" },
  AutoRotate: { t: "number | string", grp: "MakerNotes" },
  AvgBitrate: { t: "number | string", grp: "Composite" },
  BodySerialNumber: { t: "string", grp: "MakerNotes" },
  BurstID: { t: "string", grp: "XMP" },
  BurstUUID: { t: "string", grp: "MakerNotes" },
  CameraID: { t: "string", grp: "MakerNotes" },
  CameraOrientation: { t: "string", grp: "MakerNotes" },
  CameraSerialNumber: { t: "number", grp: "APP1" },
  "Caption-Abstract": { t: "string", grp: "IPTC" },
  Compass: { t: "string", grp: "APP5" },
  Comment: { t: "string", grp: "XMP" },
  ContainerDirectory: { t: "ContainerDirectoryItem[] | Struct[]", grp: "XMP" },
  Copyright: { t: "string", grp: "EXIF" },
  Country: { t: "string", grp: "XMP" },
  CountryCode: { t: "string", grp: "XMP" },
  CreateDate: { t: "ExifDateTime | ExifDate | string | number", grp: "EXIF" },
  CreationTime: { t: "ExifDateTime | string", grp: "XMP" },
  CropAngle: { t: "number", grp: "XMP" },
  CropBottom: { t: "number", grp: "XMP" },
  CropHeight: { t: "number", grp: "XMP" },
  CropLeft: { t: "number", grp: "XMP" },
  CropRight: { t: "number", grp: "XMP" },
  CropTop: { t: "number", grp: "XMP" },
  CropWidth: { t: "number", grp: "XMP" },
  DateCreated: { t: "ExifDateTime | string", grp: "XMP" },
  DateTime: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeCreated: { t: "ExifDateTime | string", grp: "IPTC" },
  DateTimeDigitized: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeGenerated: { t: "ExifDateTime | string", grp: "APP1" },
  DateTimeOriginal: { t: "ExifDateTime | string", grp: "EXIF" },
  DateTimeUTC: { t: "ExifDateTime | string", grp: "MakerNotes" },
  Description: { t: "string", grp: "XMP" },
  DOF: { t: "string", grp: "Composite" },
  Error: { t: "string", grp: "ExifTool" },
  ExifImageHeight: { t: "number", grp: "EXIF" },
  ExifImageWidth: { t: "number", grp: "EXIF" },
  ExposureTime: { t: "string", grp: "EXIF" },
  FileName: { t: "string", grp: "File" },
  FileSize: { t: "string", grp: "File" },
  FileType: { t: "string", grp: "File" },
  FileAccessDate: { t: "ExifDateTime | string", grp: "File" },
  FileCreateDate: { t: "ExifDateTime | string", grp: "File" },
  FileModifyDate: { t: "ExifDateTime | string", grp: "File" },
  FileInodeChangeDate: { t: "ExifDateTime | string", grp: "File" },
  FileTypeExtension: { t: "string", grp: "File" },
  FNumber: { t: "number", grp: "EXIF" },
  Fnumber: { t: "string", grp: "APP12" },
  FocalLength: { t: "string", grp: "EXIF" },
  GPSAltitude: { t: "number", grp: "EXIF" },
  GPSDateTime: { t: "ExifDateTime | string", grp: "Composite" },
  // We normally ask exiftool to render these as decimals, not DMS (degrees/minutes/seconds):
  GPSLatitude: {
    t: "number | string",
    grp: "EXIF",
    value: "37 deg 46' 29.64\" N",
  },
  GPSLongitude: {
    t: "number | string",
    grp: "EXIF",
    value: "122 deg 25' 9.85\" W",
  },
  History: { t: "ResourceEvent[] | ResourceEvent | string", grp: "XMP" },
  ImageDataMD5: { t: "string", grp: "File" },
  ImageDescription: { t: "string", grp: "EXIF" },
  ImageHeight: { t: "number", grp: "File" },
  ImageNumber: { t: "number", grp: "XMP" },
  ImageSize: { t: "number | string", grp: "Composite" },
  ImageWidth: { t: "number", grp: "File" },
  InternalSerialNumber: { t: "string", grp: "MakerNotes" },
  ISO: { t: "number", grp: "EXIF" },
  ISOSpeed: { t: "number", grp: "EXIF" },
  JpgFromRaw: { t: "BinaryField", grp: "EXIF" },
  Keywords: { t: "string | string[]", grp: "IPTC" },
  Lens: { t: "string", grp: "Composite" },
  LensID: { t: "string", grp: "Composite" },
  LensInfo: { t: "string", grp: "EXIF" },
  LensMake: { t: "string", grp: "EXIF" },
  LensModel: { t: "string", grp: "EXIF" },
  LensSerialNumber: { t: "string", grp: "EXIF" },
  LensSpec: { t: "string", grp: "MakerNotes" },
  LensType: { t: "string", grp: "MakerNotes" },
  LensType2: { t: "string", grp: "MakerNotes" },
  LensType3: { t: "string", grp: "MakerNotes" },
  Make: { t: "string", grp: "EXIF" },
  MaxDataRate: { t: "string", grp: "RIFF" },
  MediaCreateDate: { t: "ExifDateTime | string", grp: "QuickTime" },
  Megapixels: { t: "number", grp: "Composite" },
  MetadataDate: { t: "ExifDateTime | string", grp: "XMP" },
  MIMEType: { t: "string", grp: "File" },
  Model: { t: "string", grp: "EXIF" },
  ModifyDate: { t: "ExifDateTime | string", grp: "EXIF" },
  Notes: { t: "string", grp: "XMP", value: "Album description" },
  ObjectName: { t: "string", grp: "IPTC" },
  Orientation: { t: "number", grp: "EXIF" },
  OriginalCreateDateTime: { t: "ExifDateTime | string", grp: "XMP" },
  PreviewImage: { t: "BinaryField", grp: "Composite" },
  Rating: { t: "number", grp: "XMP" },
  RegistryID: { t: "Struct[]", grp: "XMP" },
  Rotation: { t: "number", grp: "Composite" },
  RunTimeValue: { t: "number", grp: "MakerNotes" },
  SerialNumber: { t: "string", grp: "MakerNotes" },
  ShutterCount: { t: "number", grp: "MakerNotes" },
  ShutterCount2: { t: "number", grp: "MakerNotes" },
  ShutterCount3: { t: "number", grp: "MakerNotes" },
  ShutterSpeed: { t: "string", grp: "Composite" },
  SonyDateTime2: { t: "ExifDateTime | string", grp: "MakerNotes" },
  SonyExposureTime: { t: "string", grp: "MakerNotes" },
  SonyFNumber: { t: "number", grp: "MakerNotes" },
  SonyISO: { t: "number", grp: "MakerNotes" },
  SourceFile: { t: "string", grp: "ExifTool", value: "path/to/file.jpg" },
  SubSecCreateDate: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecDateTimeOriginal: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecMediaCreateDate: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecModifyDate: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecTime: { t: "number", grp: "EXIF" },
  SubSecTimeDigitized: { t: "number", grp: "EXIF" },
  ThumbnailImage: { t: "BinaryField", grp: "EXIF" },
  ThumbnailTIFF: { t: "BinaryField", grp: "EXIF" },
  TimeStamp: { t: "ExifDateTime | string", grp: "MakerNotes" },
  TimeZone: { t: "string", grp: "MakerNotes" },
  TimeZoneOffset: { t: "number | string", grp: "EXIF" },
  Title: { t: "string", grp: "XMP" },
  Versions: { t: "Version[] | Version | string", grp: "XMP" },
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
    ...[...ExifToolVendoredTagNames.values].map((ea) => "^" + ea + "$"),
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
  important = false;
  groups = new Set<string>();
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
    const f = this.values.length / totalValues;
    return sigFigs(f, 1);
  }

  stars(totalValues: number): string {
    const f = this.values.length / totalValues;
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

    return [
      ` * @frequency ${mainstreamEmoji} ${starRating} (${frequencyPercent}%)`,
      ` * @groups ${groups}`,
      ` * @example ${this.example()}`,
    ].join("\n");
  }

  popIcon(totalValues: number): string {
    const f = this.values.length / totalValues;

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
    // Seed with required tags
    for (const [k, v] of Object.entries(RequiredTags)) {
      const t = this.tag(v.grp + ":" + k);
      if (v.value != null) {
        t.values.push(v.value);
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

  add(tagName: string, value: any, important: boolean) {
    if (
      tagName == null ||
      value == null ||
      tagName.match(ExcludedTagRe) != null ||
      // Geolocation tags are handled by a static interface:
      tagName.startsWith("ExifTool:Geolocation")
    ) {
      return;
    }

    const tag = this.tag(tagName);
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
        tagMap.add(k, v, importantFile);
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
        'import { ExifDate } from "./ExifDate";',
        'import { ExifDateTime } from "./ExifDateTime";',
        'import { ExifTime } from "./ExifTime";',
        'import { ExifToolVendoredTags, ExifToolVendoredTagNames } from "./ExifToolVendoredTags";',
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
        tagWriter.write(`\nexport const ${interfaceName}Names = strEnum(\n`);
        tagWriter.write(
          tagNamesForGroup.map((name) => `  "${name}"`).join(",\n"),
        );
        tagWriter.write(`\n) satisfies StrEnum<keyof ${interfaceName}>;\n`);

        tagWriter.write(
          `\nexport type ${interfaceName.slice(0, -1)} = StrEnumKeys<typeof ${interfaceName}Names>;\n`,
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
