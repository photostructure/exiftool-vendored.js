import { expect, testImg } from "./_chai.spec"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTool } from "./ExifTool"

describe("RewriteAllTagsTask", () => {
  const exiftool = new ExifTool({ maxProcs: 1 })
  const d = new Date()
  d.setMilliseconds(0)

  after(() => exiftool.end())

  it("throws on missing input", async function() {
    this.slow(500)
    return expect(
      exiftool.rewriteAllTags("missing.jpg", "ignored.jpg")
    ).to.be.rejectedWith(/Error opening file.+missing\.jpg/)
  })

  function expectSameYmdHms(a: ExifDateTime, b: Date) {
    expect([a.year, a.month, a.day, a.hour, a.minute, a.second]).to.eql([
      b.getUTCFullYear(),
      b.getUTCMonth() + 1,
      b.getUTCDate(),
      b.getUTCHours(),
      b.getUTCMinutes(),
      b.getUTCSeconds()
    ])
  }

  it("test file is not problematic", async () => {
    const img = await testImg()
    await exiftool.write(img, { CreateDate: d.toISOString() })
    const tags = await exiftool.read(img)
    expectSameYmdHms(tags.CreateDate as any, d)
    return
  })

  it("problematic file is problematic", async () => {
    const img = await testImg("problematic.jpg")
    return expect(
      exiftool.write(img, { CreateDate: d.toISOString() })
    ).to.be.rejectedWith(/Error reading ThumbnailImage data/)
  })

  it("problematic file is not problematic after rewriting", async () => {
    const img = await testImg("problematic.jpg")
    const rewritten = img + "-rewritten.jpg"
    await exiftool.rewriteAllTags(img, rewritten)
    await exiftool.write(rewritten, { CreateDate: d.toISOString() })
    const tags = await exiftool.read(rewritten)
    expectSameYmdHms(tags.CreateDate as any, d)
    return
  })
})
