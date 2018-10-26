import { expect } from "./_chai.spec"
import { ExifTime } from "./ExifTime"

describe("ExifTime", () => {
  it("parses hour/minute/second", () => {
    const et = ExifTime.fromEXIF("12:03:45")!
    expect([et.hour, et.minute, et.second, et.millis]).to.eql([12, 3, 45, 0])
  })
  it("parses hour/minute/second/millis", () => {
    const et = ExifTime.fromEXIF("18:08:05.813")!
    expect([et.hour, et.minute, et.second, et.millis]).to.eql([18, 8, 5, 813])
  })
  it("parses hour/minute/second/micros", () => {
    const et = ExifTime.fromEXIF("08:20:55.207340")!
    expect([et.hour, et.minute, et.second]).to.eql([8, 20, 55])
    expect(et.millis).to.be.eql(207)
    expect(et.toString()).to.eql("08:20:55.207")
  })

  describe("from GPS", () => {
    const et = ExifTime.fromEXIF("05:28:09.123")!
    it("hour/minute/second/millis", () => {
      expect([et.hour, et.minute, et.second, et.millis]).to.eql([5, 28, 9, 123])
    })
  })
})
