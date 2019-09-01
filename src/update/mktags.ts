require("source-map-support").install()

import { Logger, logger, setLogger } from "batch-cluster"
import * as _fs from "fs"
import * as globule from "globule"
import * as _path from "path"
import { argv, env, exit, on } from "process"
import ProgressBar = require("progress")

import { compact, filterInPlace, times, uniq } from "../Array"
import { ExifTool } from "../ExifTool"
import { map, Maybe, orElse } from "../Maybe"
import { isNumber } from "../Number"
import { nullish } from "../ReadTask"
import { blank, isString, leftPad } from "../String"

// ☠☠ THIS IS GRISLY, NASTY CODE. SCROLL DOWN AT YOUR OWN PERIL ☠☠

const exiftool = new ExifTool({
  maxProcs: 8,
  taskRetries: 3,
  streamFlushMillis: 1,
  minDelayBetweenSpawnMillis: 0
})

function ellipsize(str: string, max: number) {
  str = "" + str
  return str.length < max ? str : str.substring(0, max - 1) + "…"
}

// NO SRSLY STOP SCROLLING IT REALLY IS BAD

setLogger(
  Logger.withLevels(
    Logger.withTimestamps(
      Logger.filterLevels(
        {
          trace: console.log,
          debug: console.log,
          info: console.log,
          warn: console.warn,
          error: console.error
        },
        orElse(env.LOG as any, "info")
      )
    )
  )
)

on("uncaughtException", (error: any) => {
  console.error("Ack, caught uncaughtException: " + error.stack)
})

on("unhandledRejection", (reason: any, _promise: any) => {
  console.error(
    "Ack, caught unhandledRejection: " + (reason.stack || reason.toString)
  )
})

function usage() {
  console.log("Usage: `yarn run mktags IMG_DIR`")
  console.log("\nRebuilds src/Tags.ts from tags found in IMG_DIR.")
  exit(1)
}

const roots = argv.slice(2)
if (roots.length === 0)
  throw new Error("USAGE: mktags <path to image directory>")

const patternSuffix = "/**/*.+(3fr|avi|jpg|mov|mp4|cr2|cr3|nef|orf|raf|arw|rw2)"

const files = roots
  .map(root => {
    const pattern = _path.resolve(root) + patternSuffix
    logger().info("Scanning " + pattern + "...")
    return globule.find(pattern, { nocase: true, nodir: true })
  })
  .reduce((prev, curr) => prev.concat(curr))

if (files.length === 0) {
  console.error(`No files found in ${roots}`)
  usage()
}

logger().info("Found " + files.length + " files...")

function valueType(value: any): Maybe<string> {
  if (value == null) return
  if (Array.isArray(value)) {
    const types = uniq(compact(value.map(ea => valueType(ea))))
    return (types.length === 1 ? types[0] : "any") + "[]"
  }
  if (typeof value === "object") {
    const ctor = value.constructor.name
    return ctor === "Object" ? "Struct" : ctor
  } else {
    return typeof value
  }
}

// except CountingMap. Isn't it cute? Not ashamed of you, little guy!

class CountingMap<T> {
  private size = 0
  private readonly m = new Map<T, number>()
  add(t: T) {
    this.size++
    this.m.set(t, 1 + orElse(this.m.get(t), 0))
  }
  byCountDesc(): T[] {
    return Array.from(this.m.keys()).sort((a, b) =>
      cmp(this.m.get(b), this.m.get(a))
    )
  }
  /**
   * @param p [0,1]
   * @return the values found in the top p of values
   */
  byP(p: number): T[] {
    const min = p * this.size
    return this.byCountDesc().filter(ea => orElse(this.m.get(ea), 0) > min)
  }
}

class Tag {
  values: any[] = []
  important: boolean = false
  constructor(readonly tag: string) {}

  get group(): string {
    return this.tag.split(":")[0]
  }
  get withoutGroup(): string {
    return this.tag.split(":")[1]
  }
  get valueTypes(): string[] {
    const cm = new CountingMap<string>()
    compact(this.values)
      .map(ea => valueType(ea))
      .filter(ea => !nullish(ea))
      .forEach(ea => cm.add(ea!))
    return cm.byP(0.5)
  }
  get valueType(): string {
    return this.valueTypes.join(" | ")
  }
  vacuumValues() {
    return filterInPlace(this.values, ea => !nullish(ea))
  }
  keep(minValues: number): boolean {
    this.vacuumValues()
    // If it's a tag from an "important" camera, always include the tag.
    // Otherwise, if we never get a valid value for the tag, skip it.
    return (
      !blank(this.valueType) &&
      (this.important || this.values.length >= minValues)
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
      f > 0.75
        ? "★★★★"
        : f > 0.325
        ? "★★★☆"
        : f > 0.1625
        ? "★★☆☆"
        : f > 0.08125
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
    if (this.tag.endsWith("Artist")) return exampleToS(["Ansel Adams"])
    if (this.tag.endsWith("Author")) return exampleToS(["Arturo DeImage"])
    if (this.tag.endsWith("Contact")) return exampleToS(["Dohncha Ringmanumba"])
    if (this.tag.endsWith("Software")) return exampleToS(["<https://PhotoStructure.com/>"])
    if (this.tag.endsWith("Credit"))
      return exampleToS(["photo by Jenny McSnapsalot"])
    const byValueType = new Map<string, any[]>()
    // Shove boring values to the end:
    this.vacuumValues()
    uniq(this.values)
      .sort()
      .reverse()
      .forEach(ea => {
        getOrSet(byValueType, valueType(ea), () => []).push(ea)
      })
    // If there are multiple types, try to show one of each type:
    return exampleToS(
      this.valueTypes
        .map(key => map(byValueType.get(key), ea => ea[0]))
        .filter(ea => !nullish(ea))
    )
  }
}

function exampleToS(examples: any[]): string {
  return examples.length > 1
    ? "Examples: " + toStr(examples)
    : "Example: " + toStr(examples[0])
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
  if (isString(o)) return `"${ellipsize(o, 65)}"`
  else if (o["toISOString"]) return o.toISOString()
  else if (isNumber(o)) return sigFigs(o, 8)
  else return ellipsize(JSON.stringify(o), 65)
}

function getOrSet<K, V>(m: Map<K, V>, k: K, valueThunk: () => V): V {
  if (m.has(k)) {
    return m.get(k)!
  } else {
    const v = valueThunk()
    m.set(k, v)
    return v
  }
}

const minOccurences = 2

class TagMap {
  readonly map = new Map<string, Tag>()
  private maxValueCount = 0
  private _finished = false
  groupedTags = new Map<string, Tag[]>()
  tags: Tag[] = []

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
    const tag = this.tag(tagName)
    if (important) {
      tag.important = true
    }
    const values = tag.values
    values.push(value)
    this.maxValueCount = Math.max(values.length, this.maxValueCount)
  }
  finish() {
    if (this._finished) return
    this._finished = true
    const allTags = Array.from(this.map.values())
    console.log(
      `Skipping the following tags due to < ${minOccurences} occurances:`
    )
    console.log(
      allTags
        .filter(a => !a.keep(minOccurences))
        .map(t => t.tag)
        .join(", ")
    )
    this.tags = allTags.filter(a => a.keep(minOccurences))
    this.groupedTags.clear()
    this.tags.forEach(tag => {
      getOrSet(this.groupedTags, tag.group, () => []).push(tag)
    })
  }
}

function cmp(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0
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
    renderThrottle: 100
  }
)

let nextTick = Date.now()
let ticks = 0

const failedFiles: string[] = []
const seenFiles: string[] = []

async function readAndAddToTagMap(file: string) {
  try {
    const tags: any = await exiftool.read(file, ["-G", "-fast"])
    seenFiles.push(file)
    const importantFile = file
      .toString()
      .toLowerCase()
      .includes("important")
    Object.keys(tags).forEach(key => {
      if (null != saneTagRe.exec(key)) {
        tagMap.add(key, tags[key], importantFile)
      }
    })
    if (tags.errors && tags.errors.length > 0) {
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
      procs: exiftool.busyProcs
    })
    ticks = 0
  }
  return
}

const start = Date.now()

on("unhandledRejection", (reason: any, _promise: any) => {
  console.error(
    "Ack, caught unhandled rejection: " + (reason.stack || reason.toString)
  )
})

Promise.all(files.map(file => readAndAddToTagMap(file)))
  .then(async () => {
    bar.terminate()
    tagMap.finish()
    console.log(
      `\nRead ${tagMap.map.size} unique tags from ${seenFiles.length} files.`
    )
    const missingFiles = files.filter(ea => seenFiles.indexOf(ea) === -1)
    console.log("missing files: " + missingFiles.join("\n"))
    const elapsedMs = Date.now() - start
    console.log(
      `Parsing took ${elapsedMs}ms (${(elapsedMs / files.length).toFixed(
        1
      )}ms / file)`
    )
    const version = await exiftool.version()
    const destFile = _path.resolve(__dirname, "../../src/Tags.ts")
    const tagWriter = _fs.createWriteStream(destFile)
    tagWriter.write(
      [
        'import { ApplicationRecordTags } from "./ApplicationRecordTags"',
        'import { ExifDate } from "./ExifDate"',
        'import { ExifDateTime } from "./ExifDateTime"',
        'import { ExifTime } from "./ExifTime"',
        'import { Struct } from "./Struct"',
        "",
        `// Autogenerated by "npm run mktags" by ExifTool ${version} on ${new Date().toDateString()}.`,
        `// ${tagMap.map.size} unique tags were found in ${files.length} different digital imagery files.`,
        "",
        "// Comments by each tag include popularity (★★★★ is found in > 75% of cameras, ☆☆☆☆ is rare),",
        "// followed by a checkmark if the tag is used by popular devices (like iPhones)",
        "// An example value, JSON stringified, follows the popularity ratings.",
        ""
      ].join("\n")
    )
    const groupedTags = tagMap.groupedTags
    const tagGroups: string[] = []
    const seenTagNames = new Set<string>()
    Array.from(groupedTags.entries()).forEach(([group, tagsForGroup]) => {
      const filteredTags = tagsForGroup
        .sort((a, b) => cmp(a.tag, b.tag))
        // First group with a tag name wins. Other group's colliding tag names
        // are omitted:
        .filter(tag => !seenTagNames.has(tag.withoutGroup))
      if (filteredTags.length > 0) {
        tagGroups.push(group)
        tagWriter.write(`\nexport interface ${group}Tags {\n`)
        filteredTags.forEach(tag => {
          tagWriter.write(
            `  /** ${tag.popIcon(files.length)} ${tag.example()} */\n`
          )
          tagWriter.write(`  ${tag.withoutGroup}?: ${tag.valueType}\n`)
          seenTagNames.add(tag.withoutGroup)
        })
        tagWriter.write(`}\n`)
      }
    })
    const interfaceNames = [
      ...tagGroups.map(s => s + "Tags"),
      "ApplicationRecordTags"
    ]
    tagWriter.write(
      [
        "",
        "export interface Tags",
        `  extends ${interfaceNames.join(",\n    ")} {`,
        "  errors?: string[]",
        "  Error?: string",
        "  Warning?: string",
        "  SourceFile?: string",
        "  /** Either an offset, like `UTC-7`, or an actual timezone, like `America/Los_Angeles` */",
        "  tz?: string",
        "  /** Description of where and how `tz` was extracted */",
        "  tzSource?: string",
        "}"
      ].join("\n")
    )
    tagWriter.end()

    // Let's look at tag distributions:
    const tags = tagMap.tags
    const tagsByPctPop = times(
      100,
      pct =>
        tags.filter(tag => tag.values.length / files.length > pct / 100.0)
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
    console.log(
      "\nInternal error count: " + exiftool["batchCluster"].internalErrorCount
    )
    return exiftool.end()
  })
  .catch(err => {
    console.error(err)
  })
