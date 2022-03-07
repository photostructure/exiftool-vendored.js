require("source-map-support").install()

import { BatchCluster, Log, logger, setLogger } from "batch-cluster"
import fs from "fs"
import globule from "globule"
import os from "os"
import path from "path"
import process from "process"
import { compact, filterInPlace, times, uniq } from "../Array"
import { ExifTool } from "../ExifTool"
import { map, Maybe } from "../Maybe"
import { isNumber } from "../Number"
import { nullish } from "../ReadTask"
import { blank, isString, leftPad } from "../String"
import ProgressBar = require("progress")

// ☠☠ THIS IS GRISLY, NASTY CODE. SCROLL DOWN AT YOUR OWN PERIL ☠☠

// Avoid error TS2590: Expression produces a union type that is too complex to represent
const MAX_TAGS = 3000 // TypeScript 4.2 crashes with 3100+

// ☠☠ HEY! YOU! I SAID STOP SCROLLING! ☠☠

const RequiredTags: Record<string, { t: string; grp: string }> = {
  ApertureValue: { t: "number", grp: "EXIF" },
  AvgBitrate: { t: "string", grp: "Composite" },
  BodySerialNumber: { t: "string", grp: "MakerNotes" },
  BurstID: { t: "string", grp: "XMP" },
  BurstUUID: { t: "string", grp: "MakerNotes" },
  CameraID: { t: "string", grp: "MakerNotes" },
  CameraOrientation: { t: "string", grp: "MakerNotes" },
  CameraSerialNumber: { t: "number", grp: "APP1" },
  "Caption-Abstract": { t: "string", grp: "IPTC" },
  Compass: { t: "string", grp: "APP5" },
  Copyright: { t: "string", grp: "EXIF" },
  Country: { t: "string", grp: "XMP" },
  CountryCode: { t: "string", grp: "XMP" },
  CreateDate: { t: "ExifDateTime | string", grp: "EXIF" },
  CreationTime: { t: "ExifDateTime | string", grp: "XMP" },
  DateCreated: { t: "ExifDateTime | string", grp: "XMP" },
  DateTime: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeCreated: { t: "ExifDateTime | string", grp: "Composite" },
  DateTimeDigitized: { t: "ExifDateTime | string", grp: "XMP" },
  DateTimeGenerated: { t: "ExifDateTime | string", grp: "APP1" },
  DateTimeOriginal: { t: "ExifDateTime | string", grp: "EXIF" },
  DateTimeUTC: { t: "ExifDateTime | string", grp: "MakerNotes" },
  Description: { t: "string", grp: "XMP" },
  Error: { t: "string", grp: "ExifTool" },
  ExifImageHeight: { t: "number", grp: "EXIF" },
  ExifImageWidth: { t: "number", grp: "EXIF" },
  ExposureTime: { t: "string", grp: "EXIF" },
  FileName: { t: "string", grp: "File" },
  FileSize: { t: "string", grp: "File" },
  FileType: { t: "string", grp: "File" },
  FileTypeExtension: { t: "string", grp: "File" },
  FNumber: { t: "number", grp: "EXIF" },
  Fnumber: { t: "string", grp: "APP12" },
  FocalLength: { t: "string", grp: "EXIF" },
  GPSAltitude: { t: "number", grp: "EXIF" },
  GPSDateTime: { t: "ExifDateTime | string", grp: "Composite" },
  GPSLatitude: { t: "number", grp: "EXIF" },
  GPSLongitude: { t: "number", grp: "EXIF" },
  ImageDescription: { t: "string", grp: "EXIF" },
  ImageHeight: { t: "number", grp: "File" },
  ImageNumber: { t: "number", grp: "XMP" },
  ImageSize: { t: "string", grp: "Composite" },
  ImageWidth: { t: "number", grp: "File" },
  InternalSerialNumber: { t: "string", grp: "MakerNotes" },
  ISO: { t: "number", grp: "EXIF" },
  ISOSpeed: { t: "number", grp: "EXIF" },
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
  ObjectName: { t: "string", grp: "IPTC" },
  Orientation: { t: "number", grp: "EXIF" },
  OriginalCreateDateTime: { t: "ExifDateTime | string", grp: "XMP" },
  Rating: { t: "number", grp: "XMP" },
  RegistryID: { t: "Struct[]", grp: "XMP" },
  Rotation: { t: "number", grp: "Composite" },
  RunTimeValue: { t: "number", grp: "MakerNotes" },
  SerialNumber: { t: "string", grp: "MakerNotes" },
  ShutterCount: { t: "number", grp: "MakerNotes" },
  ShutterCount2: { t: "number", grp: "MakerNotes" },
  ShutterCount3: { t: "number", grp: "MakerNotes" },
  ShutterSpeed: { t: "string", grp: "Composite" },
  SonyExposureTime: { t: "string", grp: "MakerNotes" },
  SonyFNumber: { t: "number", grp: "MakerNotes" },
  SonyISO: { t: "number", grp: "MakerNotes" },
  SubSecCreateDate: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecDateTimeOriginal: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecMediaCreateDate: { t: "ExifDateTime | string", grp: "Composite" },
  SubSecTime: { t: "number", grp: "EXIF" },
  SubSecTimeDigitized: { t: "number", grp: "EXIF" },
  TimeZone: { t: "string", grp: "MakerNotes" },
  TimeZoneOffset: { t: "number | string", grp: "EXIF" },
  Title: { t: "string", grp: "XMP" },
  Warning: { t: "string", grp: "ExifTool" },
  XPComment: { t: "string", grp: "EXIF" },
  XPKeywords: { t: "string", grp: "EXIF" },
  XPSubject: { t: "string", grp: "EXIF" },
  XPTitle: { t: "string", grp: "EXIF" },
}

// ☠☠ NO REALLY THIS IS BAD CODE PLEASE STOP SCROLLING ☠☠

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
    "R2[A-Z]",
    "STB\\d",
    "Tag[\\d_]+",
    "TL84",
    "WB[_\\d]",
    "YhiY",
    "\\w{6,}\\d{1,2}$",
  ].join("|")
)

function sortBy<T>(
  arr: T[],
  f: (t: T, index: number) => Maybe<string | number>
): T[] {
  return (
    arr
      .filter((ea) => ea != null)
      .map((item, idx) => ({
        item,
        cmp: map(f(item, idx), (ea) => [ea, idx]),
      }))
      .filter((ea) => ea.cmp != null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .sort((a, b) => cmp(a.cmp!, b.cmp!))
      .map((ea) => ea.item)
  )
}

// Benchmark on 3900X: 53s for 10778 files with defaults

// 23s for 10778 files with these overrides:

const exiftool = new ExifTool({
  maxProcs: os.cpus().length,
  // if we use straight defaults, we're load-testing those defaults.
  streamFlushMillis: 2,
  minDelayBetweenSpawnMillis: 0,
  // maxTasksPerProcess: 100, // < uncomment to verify proc wearing works
})

function ellipsize(str: string, max: number) {
  str = "" + str
  return str.length < max ? str : str.substring(0, max - 1) + "…"
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
        (process.env.LOG as any) ?? "info"
      )
    )
  )
)

process.on("uncaughtException", (error: any) => {
  console.error("Ack, caught uncaughtException: " + error.stack)
})

process.on("unhandledRejection", (reason: any) => {
  console.error(
    "Ack, caught unhandledRejection: " + (reason.stack ?? reason.toString)
  )
})

function usage() {
  console.log("Usage: `yarn run mktags IMG_DIR`")
  console.log("\nRebuilds src/Tags.ts from tags found in IMG_DIR.")
  // eslint-disable-next-line no-process-exit
  process.exit(1)
}

function cmp(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0
}

const roots = process.argv.slice(2)
if (roots.length === 0)
  throw new Error("USAGE: mktags <path to image directory>")

const pattern = "**/*.+(3fr|avi|jpg|mov|mp4|cr2|cr3|nef|orf|raf|arw|rw2|dng)"

const files = roots
  .map((root) => {
    logger().info("Scanning " + root + "/" + pattern + "...")
    return globule.find(pattern, {
      srcBase: root,
      nocase: true,
      nodir: true,
      absolute: true,
    })
  })
  .reduce((prev, curr) => prev.concat(curr))

if (files.length === 0) {
  console.error(`No files found in ${roots}`)
  usage()
}

logger().info("Found " + files.length + " files...", files.slice(0, 7))

function valueType(value: any): Maybe<string> {
  if (value == null) return
  if (Array.isArray(value)) {
    const types = uniq(compact(value.map((ea) => valueType(ea))))
    return (types.length === 1 ? types[0] : "any") + "[]"
  }
  if (typeof value === "object") {
    const ctor = value.constructor.name
    if (ctor === "Object") {
      return "Struct"
    }
    if (ctor.startsWith("ExifDate") || ctor.startsWith("ExifTime")) {
      return ctor + " | string"
    }
    return ctor
  } else {
    return typeof value
  }
}

// except CountingMap. Isn't it cute? Not ashamed of you, little guy!

class CountingMap<T> {
  private size = 0
  private readonly m = new Map<T, number>()
  add(...arr: T[]) {
    this.size += arr.length
    for (const ea of arr) {
      this.m.set(ea, 1 + (this.m.get(ea) ?? 0))
    }
  }
  byCountDesc(): T[] {
    return Array.from(this.m.keys()).sort((a, b) =>
      cmp(this.m.get(b), this.m.get(a))
    )
  }
  topN(n: number) {
    return this.byCountDesc().slice(0, n)
  }
  /**
   * @param p [0,1]
   * @return the values found in the top p of values
   */
  byP(p: number): T[] {
    const min = p * this.size
    return this.byCountDesc().filter((ea) => (this.m.get(ea) ?? 0) > min)
  }
}

function sigFigs(i: number, digits: number): number {
  if (i === 0 || digits === 0) return 0
  const pow = Math.pow(
    10,
    digits - Math.round(Math.ceil(Math.log10(Math.abs(i))))
  )
  return Math.round(i * pow) / pow
}

function toStr(o: any): any {
  if (o == null) return ""
  if (isString(o)) return `"${ellipsize(o, 65)}"`
  else if (o["toISOString"] != null) return o.toISOString()
  else if (isNumber(o)) return sigFigs(o, 8)
  else return ellipsize(JSON.stringify(o), 65)
}

function exampleToS(examples: any[]): string {
  return examples.length > 1
    ? "Examples: " + toStr(examples)
    : "Example: " + toStr(examples[0])
}

function getOrSet<K, V>(m: Map<K, V>, k: K, valueThunk: () => V): V {
  const prior = m.get(k)
  if (prior != null) {
    return prior
  } else {
    const v = valueThunk()
    m.set(k, v)
    return v
  }
}

class Tag {
  values: any[] = []
  important = false
  constructor(readonly tag: string) {}

  toString() {
    return JSON.stringify(this.toJSON())
  }

  toJSON() {
    return {
      group: this.group,
      base: this.base,
      important: this.important,
      valueTypes: this.valueTypes,
      values: [...new Set(this.values)].slice(0, 3),
    }
  }

  get group(): string {
    return this.tag.split(":")[0] ?? this.tag
  }

  get base(): string {
    return this.tag.split(":")[1] ?? this.tag
  }

  get valueTypes(): string[] {
    const cm = new CountingMap<string>()
    compact(this.values)
      .map((ea) => valueType(ea))
      .forEach((ea) => {
        if (!nullish(ea)) cm.add(ea)
      })
    return cm.byP(0.5).sort()
  }

  get valueType(): string {
    return (
      RequiredTags[this.base as any]?.t ??
      (this.valueTypes.length === 0 ? "string" : this.valueTypes.join(" | "))
    )
  }

  get sortBy() {
    return (
      -(this.required ? 1e8 : this.important ? 1e4 : 1) * this.values.length
    )
  }

  get required() {
    return this.base in RequiredTags
  }

  vacuumValues() {
    return filterInPlace(this.values, (ea) => !nullish(ea))
  }
  keep(minValues: number): boolean {
    this.vacuumValues()
    // If it's a tag from an "important" camera, always include the tag.
    // Otherwise, if we never get a valid value for the tag, skip it.
    return (
      this.required ||
      (!blank(this.valueType) &&
        (this.important || this.values.length >= minValues))
    )
  }
  popIcon(totalValues: number): string {
    const f = this.values.length / totalValues

    // kid: dad srsly stop with the emojicode no one likes it

    // dad: ur not the boss of me

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
        : "☆☆☆☆"
    const important = this.important ? "✔" : " "
    return `${stars} ${important}`
  }

  example(): string {
    // There are a bunch of tag values that have people's actual names or
    // contact information. Replace those values with stub values:
    if (this.tag.endsWith("GPSLatitude")) return exampleToS([48.8577484])
    if (this.tag.endsWith("GPSLongitude")) return exampleToS([2.2918888])
    if (this.tag.endsWith("Comment")) return exampleToS(["This is a comment."])
    if (this.tag.endsWith("Directory"))
      return exampleToS(["/home/username/pictures"])
    if (this.tag.endsWith("Copyright"))
      return exampleToS(["© Chuckles McSnortypants, Inc."])
    if (this.tag.endsWith("CopyrightNotice"))
      return exampleToS(["Creative Commons Attribution 4.0 International"])
    if (this.tag.endsWith("OwnerName")) return exampleToS(["Itsa Myowna"])
    if (this.tag.endsWith("Artist")) return exampleToS(["Arturo DeImage"])
    if (this.tag.endsWith("Author")) return exampleToS(["Nom De Plume"])
    if (this.tag.endsWith("Contact")) return exampleToS(["Donna Ringmanumba"])
    if (this.tag.endsWith("Software") || this.tag.endsWith("URL"))
      return exampleToS(["https://PhotoStructure.com/"])
    if (this.tag.endsWith("Credit"))
      return exampleToS(["photo by Jenny Snapsalot"])
    const byValueType = new Map<string, any[]>()
    // Shove boring values to the end:
    this.vacuumValues()
    uniq(this.values)
      .sort()
      .reverse()
      .forEach((ea) => {
        getOrSet(byValueType, valueType(ea), () => []).push(ea)
      })
    // If there are multiple types, try to show one of each type:
    return exampleToS(
      this.valueTypes
        .map((key) => map(byValueType.get(key), (ea) => ea[0]))
        .filter((ea) => !nullish(ea))
    )
  }
}

// const minOccurrences = 2

class TagMap {
  readonly map = new Map<string, Tag>()
  private maxValueCount = 0
  private _finished = false
  groupedTags = new Map<string, Tag[]>()
  readonly tags: Tag[] = []
  constructor() {
    // Seed with required tags
    for (const ea of Object.entries(RequiredTags)) {
      this.tag(ea[1].grp + ":" + ea[0])
    }
  }

  tag(tag: string) {
    const prevTag = this.map.get(tag)
    if (prevTag != null) {
      return prevTag
    } else {
      const t = new Tag(tag)
      this.map.set(tag, t)
      return t
    }
  }
  add(tagName: string, value: any, important: boolean) {
    if (
      tagName == null ||
      value == null ||
      tagName.match(ExcludedTagRe) != null
    ) {
      return
    }
    const tag = this.tag(tagName)
    if (important) {
      tag.important = true
    }
    if (value != null) {
      const values = tag.values
      values.push(value)
      this.maxValueCount = Math.max(values.length, this.maxValueCount)
    }
  }
  finish() {
    if (this._finished) return
    this._finished = true
    this.tags.length = 0
    const arr = [...this.map.values()]
    this.tags.push(...arr.filter((ea) => ea.required))
    console.log("TagMap.finish(): required tag count:" + this.tags.length)
    const optional = sortBy(
      arr.filter((ea) => !ea.required && ea.keep(2)),
      (ea) => ea.sortBy
    )
    this.tags.push(...optional.slice(0, MAX_TAGS - this.tags.length))
    console.log(
      "TagMap.finish(): final tag count:" +
        this.tags.length +
        " from " +
        arr.length +
        " raw tags."
    )

    // console.log(
    //   `Skipping the following tags due to < ${minOccurrences} occurrences:`
    // )
    // console.log(
    //   allTags
    //     .filter((a) => !a.keep(minOccurrences))
    //     .map((t) => t.tag)
    //     .join(", ")
    // )
    this.groupedTags.clear()
    this.tags.forEach((tag) => {
      getOrSet(this.groupedTags, tag.group, () => []).push(tag)
    })
  }
}

const tagMap = new TagMap()
const saneTagRe = /^[a-z0-9_]+:[a-z0-9_]+$/i

const bar = new ProgressBar(
  "reading tags [:bar] :current/:total files, :tasks pending @ :rate files/sec w/:procs procs :etas",
  {
    complete: "=",
    incomplete: " ",
    width: 40,
    total: files.length,
    renderThrottle: 100,
  }
)

let nextTick = Date.now()
let ticks = 0

const failedFiles: string[] = []
const seenFiles: string[] = []

async function readAndAddToTagMap(file: string) {
  try {
    if (file.includes("metadesert")) return
    const tags: any = await exiftool.read(file, ["-G"])
    seenFiles.push(file)
    const importantFile = file.toString().toLowerCase().includes("important")
    Object.keys(tags).forEach((key) => {
      if (null != saneTagRe.exec(key)) {
        tagMap.add(key, tags[key], importantFile)
      }
    })
    if (tags.errors?.length > 0) {
      bar.interrupt(`Error from ${file}: ${tags.errors}`)
    }
  } catch (err) {
    bar.interrupt(`Error from ${file}: ${err}`)
    failedFiles.push(file)
  }
  ticks++
  if (nextTick <= Date.now()) {
    nextTick = Date.now() + 50
    bar.tick(ticks, {
      tasks: exiftool.pendingTasks,
      procs: exiftool.busyProcs,
    })
    ticks = 0
  }
  return
}

const start = Date.now()

process.on("unhandledRejection", (reason: any) => {
  console.error(
    "Ack, caught unhandled rejection: " + (reason.stack ?? reason.toString)
  )
})

function escapeKey(s: string): string {
  return s.match(/[^0-9a-z_]/i) != null ? JSON.stringify(s) : s
}

Promise.all(files.map((file) => readAndAddToTagMap(file)))
  .then(async () => {
    bar.terminate()
    tagMap.finish()
    console.log(
      `\nRead ${tagMap.map.size} unique tags from ${seenFiles.length} files.`
    )
    const missingFiles = files.filter((ea) => seenFiles.indexOf(ea) === -1)
    console.log("missing files: " + missingFiles.join("\n"))
    const elapsedMs = Date.now() - start
    console.log(
      `Parsing took ${elapsedMs}ms (${(elapsedMs / files.length).toFixed(
        1
      )}ms / file)`
    )
    const version = await exiftool.version()
    const destFile = path.resolve(__dirname, "../../src/Tags.ts")
    const tagWriter = fs.createWriteStream(destFile)
    tagWriter.write(
      [
        'import { ApplicationRecordTags } from "./ApplicationRecordTags"',
        'import { ExifDate } from "./ExifDate"',
        'import { ExifDateTime } from "./ExifDateTime"',
        'import { ExifTime } from "./ExifTime"',
        'import { ICCProfileTags } from "./ICCProfileTags"',
        'import { Struct } from "./Struct"',
        "",
        "/* eslint-disable @typescript-eslint/no-explicit-any */",
        "",
      ].join("\n")
    )
    const groupedTags = tagMap.groupedTags
    const tagGroups: string[] = []
    const seenTagNames = new Set<string>()
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
    ]
    const unsortedGroupNames = [...groupedTags.keys()].sort()
    const groupNames = sortBy(unsortedGroupNames, (ea, index) => {
      const indexOf = DesiredOrder.indexOf(ea.toLowerCase())
      return indexOf >= 0 ? indexOf : index + unsortedGroupNames.length
    })
    for (const group of groupNames) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const tagsForGroup = groupedTags.get(group)!
      const filteredTags = sortBy(tagsForGroup, (ea) => ea.tag)
        // First group with a tag name wins. Other group's colliding tag names
        // are omitted:
        .filter((tag) => !seenTagNames.has(tag.base))
      if (filteredTags.length > 0) {
        tagGroups.push(group)
        tagWriter.write(`\nexport interface ${group}Tags {\n`)
        for (const tag of filteredTags) {
          tagWriter.write(
            `  /** ${tag.popIcon(files.length)} ${tag.example()} */\n`
          )
          tagWriter.write(`  ${escapeKey(tag.base)}?: ${tag.valueType}\n`)
          seenTagNames.add(tag.base)
        }
        tagWriter.write(`}\n`)
      }
    }
    const interfaceNames = [
      ...tagGroups.map((s) => s + "Tags"),
      "ApplicationRecordTags",
      "ICCProfileTags",
    ].sort()
    tagWriter.write(
      [
        "",
        `/**`,
        ` * This is a partial list of fields returned by {@link ExifTool.read}.`,
        ` *`,
        ` * To prevent error TS2590: (Expression produces a union type that is too`,
        ` * complex to represent) only the most common 2874 tags are retained in this`,
        ` * interface.`,
        ` *`,
        ` * Comments by each tag include popularity (★★★★ is found in > 50% of samples,`,
        ` * and ☆☆☆☆ is rare), followed by a checkmark if the tag is used by popular`,
        ` * devices (like iPhones) An example value, JSON stringified, follows the`,
        ` * popularity ratings.`,
        ` *`,
        ` * Autogenerated by "yarn mktags" by ExifTool ${version} on ${new Date().toDateString()}.`,
        ` * ${tagMap.map.size} unique tags were found in ${files.length} photo and video files.`,
        ` */`,
        "export interface Tags",
        `  extends ${interfaceNames.join(",\n    ")} {`,
        "  errors?: string[]",
        `  /** ☆☆☆☆ ✔ Example: "File is empty" */`,
        "  Error?: string",
        `  /** ☆☆☆☆ ✔ Example: "Unrecognized IPTC record 0 (ignored)" */`,
        "  Warning?: string",
        "  SourceFile?: string",
        "  /** Either an offset, like `UTC-7`, or an actual timezone, like `America/Los_Angeles` */",
        "  tz?: string",
        "  /** Description of where and how `tz` was extracted */",
        "  tzSource?: string",
        "}",
        "",
      ].join("\n")
    )
    tagWriter.end()

    // Let's look at tag distributions:
    const tags = tagMap.tags
    const tagsByPctPop = times(
      25,
      (pct) =>
        tags.filter((tag) => tag.values.length / files.length > pct / 100.0)
          .length
    )
    const scale = 80 / files.length
    console.log("Distribution of tags: \n")
    tagsByPctPop.forEach((cnt, pct) =>
      console.log(
        leftPad(pct, 2, " ") +
          "%: " +
          leftPad(cnt, 4, " ") +
          ":" +
          times(Math.floor(cnt * scale), () => "#").join("")
      )
    )
    await exiftool.end()
    const bc: BatchCluster = exiftool["batchCluster"]
    console.log("Final batch cluster stats", bc.stats())
    return
  })
  .catch((err) => {
    console.error(err)
  })
