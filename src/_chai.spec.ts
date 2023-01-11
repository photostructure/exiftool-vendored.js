import { Deferred, Log, setLogger } from "batch-cluster"
import { expect } from "chai"
import crypto, { randomBytes } from "crypto"
import { copyFile, createReadStream, mkdirp } from "fs-extra"
import path from "path"
import process from "process"
import tmp from "tmp"
import { compact } from "./Array"
import { DateOrTime, toExifString } from "./DateTime"
import { isWin32 } from "./IsWin32"
import { lazy } from "./Lazy"
import { Maybe } from "./Maybe"
import { fromEntries } from "./Object"
import { isString } from "./String"
import { Tags } from "./Tags"

const chai = require("chai")
chai.use(require("chai-as-promised"))
chai.use(require("chai-subset"))

// Tests should be quiet unless LOG is set
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
        (process.env.LOG as any) ?? "error"
      )
    )
  )
)

export { expect } from "chai"

export const testDir = path.join(__dirname, "..", "test")

export function randomChars(chars = 8) {
  return randomBytes(chars / 2).toString("hex")
}

export const tmpdir = lazy(() => tmp.dirSync().name)

export function tmpname(prefix = ""): string {
  return path.join(tmpdir(), prefix + randomChars())
}

export function renderTagsWithISO(t: Tags) {
  return fromEntries(
    Object.entries(t).map(([k, v]) =>
      k === "SourceFile" ? undefined : [k, v["toISOString"]?.() ?? v]
    )
  )
}

export function renderTagsWithRawValues(t: Tags) {
  return fromEntries(Object.entries(t).map(([k, v]) => [k, v["rawValue"]]))
}

/**
 * Copy a test image to a tmp directory and return the path
 */
export async function testImg(
  srcBasename = "img.jpg",
  parentDir = "test",
  destBasename?: string
): Promise<string> {
  const dir = path.join(tmpname(), parentDir)
  await mkdirp(dir)
  const dest = path.join(dir, destBasename ?? srcBasename)
  await copyFile(path.join(testDir, srcBasename), dest)
  return dest
}

export async function testFile(name: string): Promise<string> {
  const dir = tmpname()
  await mkdirp(dir)
  return path.join(dir, name)
}

export function sha1(path: string): Promise<string> {
  const d = new Deferred<string>()
  const readStream = createReadStream(path, { autoClose: true })
  const sha = crypto.createHash("sha1")
  readStream.on("data", (ea) => sha.update(ea))
  readStream.on("error", (err) => d.reject(err))
  readStream.on("end", () => d.resolve(sha.digest().toString("hex")))
  return d.promise
}

export function sha1buffer(input: string | Buffer): string {
  return crypto.createHash("sha1").update(input).digest().toString("hex")
}

function dateishToExifString(d: Maybe<DateOrTime | string>): Maybe<string> {
  return d == null ? undefined : isString(d) ? d : toExifString(d)
}

export function assertEqlDateish(
  a: Maybe<string | DateOrTime>,
  b: Maybe<string | DateOrTime>
) {
  return expect(dateishToExifString(a)).to.eql(dateishToExifString(b))
}

export const NonAlphaStrings = compact([
  { str: `'`, desc: "straight single quote" },
  // windows doesn't support double-quotes in filenames (!!)
  isWin32() ? undefined : { str: `"`, desc: "straight double quote" },
  { str: `‘’“”«»`, desc: "curly quotes" },
  { str: "ñöᵽȅ", desc: "latin extended" },
  { str: "✋", desc: "dingbats block" },
  { str: "😤", desc: "emoticons block" },
  { str: "🚵🏿‍♀", desc: "transport block" },
  { str: "你好", desc: "Mandarin" },
  { str: "ようこそ", desc: "Japanese" },
  { str: "ברוך הבא", desc: "Hebrew" },
  { str: "ਸੁਆਗਤ ਹੈ", desc: "Punjabi" },
])

export const UnicodeTestMessage = `Double quotes("“”«») and single quotes('‘’‹›) and backquotes(\`), oh my 👍🌹🐱‍👓🚵‍♀️. ਸੁਆਗਤ ਹੈ ยินดีต้อนรับ 환영하다 ようこそ 歡迎 欢迎 ברוך הבא خوش آمدید`
