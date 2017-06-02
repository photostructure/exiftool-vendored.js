import { compact } from "../DateTime"
import { exiftool } from "../ExifTool"
import { TagsTask } from "../TagsTask"
import * as _fs from "fs"
import * as _path from "path"
import * as _process from "process"
const ProgressBar = require("progress")

// ☠☠ THIS IS GRISLY CODE. SCROLL DOWN AT YOUR OWN PERIL ☠☠

// DO NOT READ THIS CODE. I AM ASHAMED OF IT. YOU SHOULD BE TOO.

const globule = require("globule")

require("source-map-support").install()

function ellipsize(str: string, max: number) {
  str = "" + str
  return (str.length < max) ? str : str.substring(0, max - 1) + "…"
}

// NO SRSLY STOP SCROLLING IT REALLY IS BAD

function usage() {
  console.log("Usage: `npm run mktags IMG_DIR`")
  console.log("\nRebuilds src/Tags.ts from tags found in IMG_DIR.")
  _process.exit(1)
}

const roots = _process.argv.slice(2)
const files: string[] = roots.map(root => {
  console.log("Reading " + root + "...")
  return globule.find(`${root}/**/*.+(jpg|JPG|CR2|NEF|ORF|RAF|ARW|RW2)`, { dot: true })
}).reduce((prev, curr) => [...prev, ...curr], [])

if (files.length === 0) {
  console.error(`No files found in ${roots}`)
  usage()
}

// OMG THIS IS ON YOU NOW. IT'S YOUR FAULT.

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
    return Array.from(this.m.keys()).sort((a, b) => cmp(this.m.get(b), this.m.get(a)))
  }
}

class Tag {
  values: any[] = []
  important: boolean
  constructor(readonly tag: string) { }

  get group(): string { return this.tag.split(":")[0] }
  get withoutGroup(): string { return this.tag.split(":")[1] }
  get valueType(): string {
    // hard-coded because the ☆☆☆ ITPC tag doesn't match the ★★★ Composite tag, causing Tags not to compile
    if (this.withoutGroup === "DateCreated") { return "ExifDate" }
    const cm = new CountingMap<string>()
    compact(this.values).map(i => valueType(i)).forEach(i => cm.add(i))
    const byCount = cm.byCountDesc().slice(0, 2)
    // If an "Exif*" type is common, let's use that instead of string.
    if (byCount[0] === "string" && ("" + byCount[1]).startsWith("Exif")) {
      byCount.shift()
    }
    return byCount[0]
  }
  keep(minValues: number): boolean {
    return this.firstValue() != null && this.important || this.values.length >= minValues
  }
  popIcon(totalValues: number): string {
    const f = this.values.length / totalValues
    // dad srsly stop with the emojicode no one likes it
    const stars = (f > .75) ? "★★★" : (f > .5) ? "★★☆" : (f > .25) ? "★☆☆" : "☆☆☆"
    const important = (this.important) ? "✔" : " "
    return `${stars} ${important}`
  }
  firstValue(): any {
    // First non-null, non-zero, non-empty value:
    return this.values.find(ea => ea != null && ["", "0"].indexOf(ea.toString().trim()) === -1)
  }
  example(): string {
    return ellipsize(JSON.stringify(this.firstValue()), 80)
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

class TagMap {
  readonly map = new Map<string, Tag>()
  private maxValueCount = 0

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
    if (important) { tag.important = true }
    const values = tag.values
    values.push(value)
    this.maxValueCount = Math.max(values.length, this.maxValueCount)
  }
  tags(): Tag[] {
    const minValues = 2
    const allTags = Array.from(this.map.values())
    console.log(`Skipping the following tags due to < ${minValues.toFixed(0)} occurances:`)
    console.log(allTags.filter(a => !a.keep(minValues)).map(t => t.tag).join(", "))
    return allTags.filter(a => a.keep(minValues))
  }
  groupedTags(): Map<string, Tag[]> {
    const groupedTags = new Map<string, Tag[]>()
    this.tags().forEach(tag => {
      getOrSet(groupedTags, tag.group, () => []).push(tag)
    })
    return groupedTags
  }
}

function cmp(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0
}

const tagMap = new TagMap()
const saneTagRe = /^[a-z0-9_]+:[a-z0-9_]+$/i

const bar = new ProgressBar('reading tags [:bar] :current/:total files, :tasks pending @ :rate files/sec :etas w/  :pids procs', {
  complete: "=",
  incomplete: " ",
  width: 40,
  total: files.length
});

let nextTick = Date.now()
let ticks = 0

async function readAndAddToTagMap(file: string) {
  const task = TagsTask.for(file, ["-G"])
  try {
    const tags: any = await exiftool.enqueueTask(task)
    const importantFile = file.toString().toLowerCase().includes("important")
    Object.keys(tags).forEach(key => {
      if (saneTagRe.exec(key)) { tagMap.add(key, tags[key], importantFile) }
    })
    if (tags.errors && tags.errors.length > 0) {
      bar.interrupt(`Error from ${file}: ${tags.errors}`)
    }
    if (tags.Warning && tags.Warning.length > 0) {
      bar.interrupt(`Warning from ${file}: ${tags.errors}`)
    }
  } catch (err) {
    bar.interrupt(`Failed to read ${file} after ${task.retries} retries: ${err.stack || err}`)
  }
  ticks++
  if (nextTick <= Date.now()) {
    bar.tick(ticks, { pids: exiftool.pids.length, tasks: exiftool.pendingTasks })
    ticks = 0
    nextTick = Date.now() + 100
  }
}

const start = Date.now()

_process.on("unhandledRejection", (reason: any, _promise: any) => {
  console.error("Ack, caught unhandled rejection: " + reason.stack || reason.toString)
})

Promise.all(files.map(file => readAndAddToTagMap(file)))
  .then(async () => {
    bar.terminate()
    console.log(`\nRead ${tagMap.map.size} unique tags from ${files.length} files. `)
    const elapsedMs = Date.now() - start
    console.log(`Parsing took ${elapsedMs}ms (${(elapsedMs / files.length).toFixed(1)}ms / file)`)
    const version = await exiftool.version()
    const destFile = _path.resolve(__dirname, "../../src/Tags.ts")
    const tagWriter = _fs.createWriteStream(destFile)
    tagWriter.write("/* tslint:disable:class-name */\n") // because of ICC_Profile
    tagWriter.write(`import { ExifDate, ExifTime, ExifDateTime, ExifTimeZoneOffset } from "./DateTime"\n\n`)
    tagWriter.write(`// Autogenerated by "npm run mktags" by ExifTool ${version} on ${new Date().toDateString()}.\n`)
    tagWriter.write(`// ${tagMap.map.size} unique tags were found in ${files.length} different digital imagery files.\n\n`)
    tagWriter.write("// Comments by each tag include popularity (★★★ is found in > 70% of cameras, ☆☆☆ is rare),\n")
    tagWriter.write("// followed by a checkmark if the tag is used by recent, popular devices (like iPhones)\n")
    tagWriter.write("// An example value, JSON stringified, follows the popularity ratings.\n")
    const groupedTags = tagMap.groupedTags()
    const tagGroups: string[] = []
    const seenTags = new Set<string>()
    Array.from(groupedTags.entries()).sort().forEach(([group, tags]) => {
      const filteredTags = tags
        .sort((a, b) => cmp(a.tag, b.tag))
        .filter(tag => !seenTags.has(tag.withoutGroup))
      if (filteredTags.length > 0) {
        tagGroups.push(group)
        tagWriter.write(`\nexport interface ${group}Tags {\n`)
        filteredTags.forEach(tag => {
          tagWriter.write(`  /** ${tag.popIcon(files.length)} ${tag.example()} */\n`)
          tagWriter.write(`  ${tag.withoutGroup}: ${tag.valueType}\n`)
          seenTags.add(tag.withoutGroup)
        })
        tagWriter.write(`}\n`)
      }
    })
    tagWriter.write("\n")
    tagWriter.write("export interface Tags extends\n")
    tagWriter.write(`  ${tagGroups.map(s => "Partial<" + s + "Tags>").join(",\n  ")} {\n`)
    tagWriter.write("  errors: string[]\n")
    tagWriter.write("  /** \"Unknown file type\" */\n")
    tagWriter.write("  Error: string\n")
    tagWriter.write("  Warning: string\n")
    tagWriter.write("  SourceFile: string\n")
    tagWriter.write("}\n")
    tagWriter.end()
    console.log("Done.")
    exiftool.end()
  }).catch(err => {
    console.error(err)
  })