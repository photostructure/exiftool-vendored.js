import { Logger, setLogger } from "batch-cluster"
import * as fse from "fs-extra"
import { tmpdir } from "os"
import { join } from "path"
import { env } from "process"

import { orElse } from "./Maybe"

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

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
  return join(
    tmpdir(),
    prefix + Math.floor(Math.random() * 1000000000).toString(16)
  )
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
