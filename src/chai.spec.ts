import * as pify from "pify"
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

export { expect } from "chai"

export const pfs = pify(require("fs"))
export const ptmp = pify(require("tmp"))

require("source-map-support").install()

export function times<T>(n: number, f: ((idx: number) => T)): T[] {
  return Array(n).fill(undefined).map((_, i) => f(i))
}
