import { NoLogger, setLogger } from "batch-cluster"
import { tmpdir } from "os"
import { join } from "path"
import * as pify from "pify"

const cpFile = require("cp-file")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
setLogger(NoLogger)

export { expect } from "chai"

export const pfs = pify(require("fs"))
export const ptmp = pify(require("tmp"))

require("source-map-support").install()

export function times<T>(n: number, f: ((idx: number) => T)): T[] {
  return Array(n)
    .fill(undefined)
    .map((_, i) => f(i))
}

export const testDir = join(__dirname, "..", "test")

/**
 * Copy a test image to a tmp directory and return the path
 */
export async function testImg(name: string = "img.jpg"): Promise<string> {
  const dir = join(tmpdir(), (Math.random() * 1000000).toFixed())
  await pfs.mkdir(dir)
  const dest = join(dir, name)
  return cpFile(join(testDir, name), dest).then(() => dest)
}
