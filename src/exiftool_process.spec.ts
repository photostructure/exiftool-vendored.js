import { ExifToolProcess } from "./exiftool_process"
import { expect } from "./chai.spec"

describe("ExifToolProcess", () => {
  it("ends properly", () => {
    const etp = new ExifToolProcess(() => undefined)
    etp.end()
    expect(etp.ended).to.eql(true)
    return expect(etp.closedPromise.then(() => etp.closed)).to.become(true)
  })
})
