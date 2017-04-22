import { expect } from "./chai.spec"
import { ExifToolProcess } from "./exiftool_process"

describe("ExifToolProcess", () => {
  it("ends properly", async function () {
    this.slow(500)
    let idled: number[] = []
    let ended: number[] = []
    const observer = {
      onIdle: () => idled.push(Date.now()),
      onEnd: () => ended.push(Date.now()),
      enqueueTask: () => { throw new Error("not implemented") }
    }
    const etp = new ExifToolProcess(observer)
    etp.end()
    expect(etp.ended).to.eql(true)
    await etp.closedPromise
    expect(idled.length).to.eql(1)
    expect(ended.length).to.eql(1)
    expect(idled[0]).to.lt(ended[0], "process should be idle then end")
    return expect(etp.closed).to.be.true
  })
})
