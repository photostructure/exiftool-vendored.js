import { Deferred, Log, setLogger } from "batch-cluster";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { createHash, randomInt } from "node:crypto";
import { createReadStream } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { env } from "node:process";
import { dirSync } from "tmp";
import { compact } from "./Array";
import { DateOrTime, toExifString } from "./DateTime";
import { ExifTool } from "./ExifTool";
import { isWin32 } from "./IsWin32";
import { lazy } from "./Lazy";
import { Maybe } from "./Maybe";
import { fromEntries } from "./Object";
import { isString } from "./String";
import { Tags } from "./Tags";
import { times } from "./Times";

use(chaiAsPromised);

export function mkdirp(dir: string) {
  return mkdir(dir, { recursive: true });
}

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
        (env.LOG as any) ?? "error",
      ),
    ),
  ),
);

export { expect } from "chai";

export const testDir = join(__dirname, "..", "test");

const LOWERCASE_A_CHAR_CODE = "a".charCodeAt(0);
const ALPHABET_LENGTH = "z".charCodeAt(0) - "a".charCodeAt(0) + 1;

export async function end(et: ExifTool) {
  await et?.end();
  if (et != null) expect(et.batchCluster.internalErrorCount).to.eql(0);
}

export function randomChar() {
  return String.fromCharCode(
    LOWERCASE_A_CHAR_CODE + randomInt(ALPHABET_LENGTH),
  );
}

export function randomChars(chars = 8) {
  return times(chars, randomChar).join("");
}

export const tmpdir = lazy(() => dirSync().name);

export function tmpname(prefix = ""): string {
  return join(tmpdir(), prefix + randomChars());
}

export function renderTagsWithISO(t: Tags) {
  return fromEntries(
    Object.entries(t).map(([k, v]) =>
      k === "SourceFile" ? undefined : [k, v["toISOString"]?.() ?? v],
    ),
  );
}

export function renderTagsWithRawValues(t: Tags) {
  return fromEntries(Object.entries(t).map(([k, v]) => [k, v["rawValue"]]));
}

/**
 * Copy a test image to a tmp directory and return the path
 */
export async function testImg({
  srcBasename = "img.jpg",
  parentDir,
  destBasename,
}: {
  srcBasename?: Maybe<string>;
  parentDir?: string;
  destBasename?: string;
} = {}): Promise<string> {
  const parent = tmpname();
  const dir = parentDir == null ? parent : join(parent, parentDir);
  await mkdirp(dir);
  const dest = join(dir, destBasename ?? srcBasename);
  await copyFile(join(testDir, srcBasename), dest);
  return dest;
}

export const IPTC_JPG = "iptc.jpg";

export async function testFile(name: string): Promise<string> {
  const dir = tmpname();
  await mkdirp(dir);
  return join(dir, name);
}

export function sha1(path: string): Promise<string> {
  const d = new Deferred<string>();
  const readStream = createReadStream(path, { autoClose: true });
  const sha = createHash("sha1");
  readStream.on("data", (ea) => sha.update(ea));
  readStream.on("error", (err) => d.reject(err));
  readStream.on("end", () => d.resolve(sha.digest().toString("hex")));
  return d.promise;
}

export function sha1buffer(input: string | Buffer): string {
  return createHash("sha1").update(input).digest().toString("hex");
}

function dateishToExifString(d: Maybe<DateOrTime | string>): Maybe<string> {
  return d == null ? undefined : isString(d) ? d : toExifString(d);
}

export function assertEqlDateish(
  a: Maybe<string | DateOrTime>,
  b: Maybe<string | DateOrTime>,
) {
  return expect(dateishToExifString(a)).to.eql(dateishToExifString(b));
}

export const NonAlphaStrings = compact([
  { str: `'`, desc: "straight single quote" },
  // windows doesn't support double-quotes in filenames (!!)
  isWin32() ? undefined : { str: `"`, desc: "straight double quote" },
  { str: `‘’“”«»`, desc: "curly quotes" },
  { str: "ñöᵽȅ", desc: "latin extended" },
  { str: "✋", desc: "dingbats block" },
  // These emoji tests fail on node 18.18+ and node 20 on Windows, but it's a
  // bug in node, as it passes on macOS and Linux.
  isWin32() ? undefined : { str: "😤", desc: "emoticons block" },
  isWin32() ? undefined : { str: "🚵🏿‍♀", desc: "transport block" },
  { str: "你好", desc: "Mandarin" },
  { str: "ようこそ", desc: "Japanese" },
  { str: "ברוך הבא", desc: "Hebrew" },
  { str: "ਸੁਆਗਤ ਹੈ", desc: "Punjabi" },
]);

// Using Unicode escapes for quote characters to prevent editor/tool mangling:
// \u201c = " (left double quotation mark)
// \u201d = " (right double quotation mark)
// \u00ab = « (left-pointing double angle quotation mark)
// \u00bb = » (right-pointing double angle quotation mark)
// \u2018 = ' (left single quotation mark)
// \u2019 = ' (right single quotation mark)
// \u2039 = ‹ (single left-pointing angle quotation mark)
// \u203a = › (single right-pointing angle quotation mark)
export const UnicodeTestMessage = `Double quotes("\u201c\u201d\u00ab\u00bb) and single quotes('\u2018\u2019\u2039\u203a) and backquotes(\`), oh my 👍🌹🐱‍👓🚵‍♀️. ਸੁਆਗਤ ਹੈ ยินดีต้อนรับ 환영하다 ようこそ 歡迎 欢迎 ברוך הבא خوش آمدید`;

