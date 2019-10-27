import { Deferred, Logger, setLogger } from "batch-cluster"
import { createHash } from "crypto"
import * as fse from "fs-extra"
import { tmpdir } from "os"
import { join } from "path"
import { env } from "process"

import { orElse } from "./Maybe"

const chai = require("chai")
chai.use(require("chai-as-promised"))

// Tests should be quiet unless LOG is set
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
        orElse(env.LOG as any, "error")
      )
    )
  )
)

export { expect } from "chai"

export const testDir = join(__dirname, "..", "test")

export function tmpname(prefix = "") {
  return join(tmpdir(), prefix + Math.floor(Math.random() * 1e9).toString(16))
}

/**
 * Copy a test image to a tmp directory and return the path
 */
export async function testImg(
  name: string = "img.jpg",
  parentDir: string = "test"
): Promise<string> {
  const dir = join(tmpname(), parentDir)
  await fse.mkdirp(dir)
  const dest = join(dir, name)
  return fse.copyFile(join(testDir, name), dest).then(() => dest)
}

export async function testFile(name: string = "img.XMP"): Promise<string> {
  const dir = tmpname()
  await fse.mkdirp(dir)
  return join(dir, name)
}

export function sha1(path: string) {
  const d = new Deferred<string>()
  const readStream = fse.createReadStream(path, { autoClose: true })
  const sha = createHash("sha1")
  readStream.on("data", ea => sha.update(ea))
  readStream.on("error", err => d.reject(err))
  readStream.on("end", () => d.resolve(sha.digest().toString("hex")))
  return d.promise
}
