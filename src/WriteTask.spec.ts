import { ExifTool } from "./ExifTool"
import { expect, testImg } from "./chai.spec"

describe("WriteTask", () => {
  const exiftool = new ExifTool(1)
  after(() => exiftool.end())

  it("round-trips a comment", async () => {
    const src = await testImg()
    const newComment = "new comment from " + new Date()
    await exiftool.write(src, { XPComment: newComment })
    const t = await exiftool.read(src)
    expect(t.XPComment).to.eql(newComment)
    return
  })

  it("round-trips a numeric Orientation", async () => {
    const src = await testImg()
    await exiftool.write(src, { Orientation: "8" }, ["-n"])
    const t = await exiftool.read(src)
    expect(t.Orientation).to.eql("Rotate 270 CW")
    return
  })

  it("round-trips a string Orientation 90 CW", async () => {
    const src = await testImg()
    await exiftool.write(src, { Orientation: "Rotate 90 CW" })
    const n = await exiftool.read(src, ["-n"])
    expect(n.Orientation).to.eql(6)
    const t = await exiftool.read(src)
    expect(t.Orientation).to.eql("Rotate 90 CW")
    return
  })

  it("round-trips a string Orientation 180 CW", async () => {
    const src = await testImg()
    await exiftool.write(src, { Orientation: "Rotate 180" })
    const n = await exiftool.read(src, ["-n"])
    expect(n.Orientation).to.eql(3)
    const t = await exiftool.read(src)
    expect(t.Orientation).to.eql("Rotate 180")
    return
  })

  it("rejects a numeric Orientation without -n", async () => {
    const src = await testImg()
    return expect(exiftool.write(src, { Orientation: "3" })).to.be.rejectedWith(
      /Can't convert IFD0:Orientation/
    )
  })

  it("rejects unknown files", () => {
    return expect(
      exiftool.write("/tmp/.nonexistant-" + Date.now(), { XPComment: "boom" })
    ).to.be.rejectedWith(/File not found/)
  })

  it("rejects unknown tags", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { RandomTag: 123 } as any)
    ).to.be.rejectedWith(/Tag \'RandomTag\' is not defined/)
  })
})
