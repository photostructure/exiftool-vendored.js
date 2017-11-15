import { tmpdir } from "os"
import { join } from "path"
import * as pify from "pify"

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

export { expect } from "chai"

export const pfs = pify(require("fs"))
export const pfse = pify(require("fs-extra"))
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
  const dir = join(tmpdir(), name + "-" + Date.now())
  await pfse.mkdir(dir)
  const dest = join(dir, name)
  await pfse.copyFile(join(testDir, name), dest)
  return dest
}
