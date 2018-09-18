import { Logger, logger, setLogger } from "batch-cluster"
import * as _fs from "fs"
import * as globule from "globule"
import * as _path from "path"
import * as _process from "process"
import * as ProgressBar from "progress"

import "source-map-support/register"
import { compact, filterInPlace, times } from "../Array"
import { ExifTool } from "../ExifTool"
import { ReadTask } from "../ReadTask"
import { leftPad } from "../String"

// ☠☠ THIS IS GRISLY, NASTY CODE. SCROLL DOWN AT YOUR OWN PERIL ☠☠

const exiftool = new ExifTool({ maxProcs: 4, taskRetries: 3 })

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
        (_process.env.LOG as any) || "info"
      )
    )
  )
)

_process.on("uncaughtException", (error: any) => {
  console.error("Ack, caught uncaughtException: " + error.stack)
})

_process.on("unhandledRejection", (reason: any, _promise: any) => {
  console.error(
    "Ack, caught unhandledRejection: " + reason.stack || reason.toString
  )
})

function usage() {
  console.log("Usage: `npm run mktags IMG_DIR`")
  console.log("\nRebuilds src/Tags.ts from tags found in IMG_DIR.")
  _process.exit(1)
}

const roots = _process.argv.slice(2)
const patternSuffix = "/**/*.+(avi|jpg|mov|mp4|cr2|nef|orf|raf|arw|rw2)"

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

function valueType(value: any): string {
  if (typeof value === "object") {
    const ctorName = value.constructor.name
    if (ctorName === "Array") {
      if (value.length === 0) {
        return "any[]"
      } else {
        return `${valueType(value[0])}[]`
      }
    } else {
      return ctorName
    }
  } else {
    return typeof value
  }
}

// except CountingMap. Isn't it cute? Not ashamed of you, little guy!

class CountingMap<T> {
  private readonly m = new Map<T, number>()
  add(t: T) {
    this.m.set(t, 1 + (this.m.get(t) || 0))
  }
  byCountDesc(): T[] {
    return Array.from(this.m.keys()).sort((a, b) =>
      cmp(this.m.get(b), this.m.get(a))
    )
  }
}

class Tag {
  values: any[] = []
  important: boolean
  constructor(readonly tag: string) {}

  get group(): string {
    return this.tag.split(":")[0]
  }
  get withoutGroup(): string {
    return this.tag.split(":")[1]
  }
  get valueType(): string {
    // hard-coded because the ☆☆☆ ITPC tag doesn't match the ★★★ Composite tag, causing Tags not to compile
    if (this.withoutGroup === "DateCreated") {
      return "ExifDate"
    }
    const cm = new CountingMap<string>()
    compact(this.values)
      .map(i => valueType(i))
      .forEach(i => cm.add(i))
    const byCount = cm.byCountDesc().slice(0, 2)
    // If an "Exif*" type is common, let's use that instead of string.
    if (byCount[0] === "string" && ("" + byCount[1]).startsWith("Exif")) {
      byCount.shift()
    }
    return byCount[0]
  }
  vacuumValues() {
    filterInPlace(this.values, ea => ea != null && String(ea).trim().length > 0)
  }
  keep(minValues: number): boolean {
    this.vacuumValues()
    // If it's a tag from an "important" camera, always include the tag.
    // Otherwise, if we never get a valid value for the tag, skip it.
    return this.important || this.values.length >= minValues
  }
  popIcon(totalValues: number): string {
    const f = this.values.length / totalValues
    // kid: dad srsly stop with the emojicode no one likes it

    // dad: ur not the boss of me

    // As of 20180814, 4300 unique tags, 2713 of which were found in at least 2
    // cameras, and only 700 were found in at least 1% of cameras, so this looks
    // like a power law, long-tail distribution, so lets make the cutoffs more
    // exponentialish rather than linearish.

    // 22 at 99%, 64 at 50%, 87 at 25%, 120 at 10%, 230 at 5%.
    const stars =
      f > 0.75
        ? "★★★★"
        : f > 0.5
          ? "★★★☆"
          : f > 0.25
            ? "★★☆☆"
            : f > 0.1
              ? "★☆☆☆"
              : "☆☆☆☆"
    const important = this.important ? "✔" : " "
    return `${stars} ${important}`
  }
  firstValue(): any {
    this.vacuumValues()
    return this.values[0]
  }
  example(): string {
    const v = this.firstValue()
    return v == null ? "" : "Example: " + ellipsize(JSON.stringify(v), 60)
  }
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
    if (prevTag) {
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
  "reading tags [:bar] :current/:total files, :tasks pending @ :rate files/sec :etas",
  {
    complete: "=",
    incomplete: " ",
    width: 40,
    total: files.length
  }
)

let nextTick = Date.now()
let ticks = 0

const failedFiles: string[] = []
const seenFiles: string[] = []

async function readAndAddToTagMap(file: string) {
  const task = ReadTask.for(file, ["-G"])
  try {
    const tags: any = await exiftool.enqueueTask(() => task)
    seenFiles.push(file)
    const importantFile = file
      .toString()
      .toLowerCase()
      .includes("important")
    Object.keys(tags).forEach(key => {
      if (saneTagRe.exec(key)) {
        tagMap.add(key, tags[key], importantFile)
      }
    })
    if (tags.errors && tags.errors.length > 0) {
      bar.interrupt(`Error from ${file}: ${tags.errors}`)
      throw tags.errors
    }
  } catch (err) {
    failedFiles.push(file)
    console.error(err)
    bar.interrupt(`Failed to read ${file}: ${err.stack || err}`)
    throw err
  }
  ticks++
  if (nextTick <= Date.now()) {
    nextTick = Date.now() + 50
    bar.tick(ticks, {
      tasks: exiftool.pendingTasks
    })
    ticks = 0
  }
  return
}

const start = Date.now()

_process.on("unhandledRejection", (reason: any, _promise: any) => {
  console.error(
    "Ack, caught unhandled rejection: " + reason.stack || reason.toString
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
      `import { ExifDate, ExifTime, ExifDateTime, ExifTimeZoneOffset } from "./DateTime"\n\n`
    )
    tagWriter.write(
      `// Autogenerated by "npm run mktags" by ExifTool ${version} on ${new Date().toDateString()}.\n`
    )
    tagWriter.write(
      `// ${tagMap.map.size} unique tags were found in ${
        files.length
      } different digital imagery files.\n\n`
    )
    tagWriter.write(
      "// Comments by each tag include popularity (★★★★ is found in > 75% of cameras, ☆☆☆☆ is rare),\n"
    )
    tagWriter.write(
      "// followed by a checkmark if the tag is used by popular devices (like iPhones)\n"
    )
    tagWriter.write(
      "// An example value, JSON stringified, follows the popularity ratings.\n"
    )
    const groupedTags = tagMap.groupedTags
    const tagGroups: string[] = []
    const seenTagNames = new Set<string>()
    Array.from(groupedTags.entries()).forEach(([group, tags]) => {
      const filteredTags = tags
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
    tagWriter.write("\n")
    tagWriter.write("export interface Tags extends\n")
    tagWriter.write(`  ${tagGroups.map(s => s + "Tags").join(",\n  ")} {\n`)
    tagWriter.write("  errors?: string[]\n")
    tagWriter.write("  Error?: string\n")
    tagWriter.write("  Warning?: string\n")
    tagWriter.write("  SourceFile?: string\n")
    tagWriter.write("}\n")
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
    exiftool.end()
  })
  .catch(err => {
    console.error(err)
  })
