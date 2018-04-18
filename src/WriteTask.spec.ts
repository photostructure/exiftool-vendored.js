import { expect, testImg } from "./chai.spec"
import { ExifTool, Tags, WriteTags } from "./ExifTool"

describe("WriteTask", () => {
  const exiftool = new ExifTool(1)
  after(() => exiftool.end())

  async function assertRoundTrip(args: {
    tag: keyof Tags
    inputValue: string | number
    expectedValue?: string
    imgName?: string
    args?: string[]
  }) {
    const src = await testImg(args.imgName)
    const wt: WriteTags = {}
    wt[args.tag] = args.inputValue
    await exiftool.write(src, wt, args.args)
    const result = await exiftool.read(src)
    const expected =
      args.expectedValue == null ? String(args.inputValue) : args.expectedValue
    expect(String(result[args.tag])).to.eql(expected)
    return
  }

  it("round-trips a comment", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "new comment from " + new Date()
    })
  })

  it("round-trips a non-latin comment", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "早安晨之美" + new Date()
    })
  })

  it("round-trips a comment with non-latin filename", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "new comment from " + new Date(),
      imgName: "中文.jpg"
    })
  })

  it("round-trips a non-latin comment with non-latin filename", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "早安晨之美" + new Date(),
      imgName: "中文.jpg"
    })
  })

  it("round-trips a numeric Orientation", async () => {
    return assertRoundTrip({
      tag: "Orientation",
      args: ["-n"],
      inputValue: 8,
      expectedValue: "Rotate 270 CW"
    })
  })

  it("round-trips a string Orientation 90 CW", async () => {
    return assertRoundTrip({
      tag: "Orientation",
      inputValue: "Rotate 90 CW"
    })
  })

  it("round-trips a string Orientation 180 CW", async () => {
    return assertRoundTrip({
      tag: "Orientation",
      inputValue: "Rotate 180"
    })
  })

  it("updates DateTimeOriginal to a specific time", async () => {
    return assertRoundTrip({
      tag: "DateTimeOriginal",
      inputValue: "2017-11-15T12:34:56",
      expectedValue: "2017-11-15T12:34:56.000"
    })
  })

  it("rejects setting to a non-time value", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { DateTimeOriginal: "this is not a time" })
    ).to.be.rejectedWith(/Invalid date\/time/)
  })

  it("rejects a numeric Orientation without -n", async () => {
    const src = await testImg()
    return expect(exiftool.write(src, { Orientation: "3" })).to.be.rejectedWith(
      /Can't convert IFD0:Orientation/
    )
  })

  it("Accepts a shortcut tag", async () => {
    const date = "2018-04-17T12:34:56.000"
    const src = await testImg()
    await exiftool.write(src, { AllDates: date })
    const tags = await exiftool.read(src)
    expect(String(tags.DateTimeOriginal)).to.eql(date)
    expect(String(tags.CreateDate)).to.eql(date)
    expect(String(tags.ModifyDate)).to.eql(date)
    return
  })

  it("rejects unknown files", () => {
    return expect(
      exiftool.write("/tmp/.nonexistant-" + Date.now(), { XPComment: "boom" })
    ).to.be.rejectedWith(/ENOENT/)
  })

  it("rejects unknown tags", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { RandomTag: 123 } as any)
    ).to.be.rejectedWith(/Tag \'RandomTag\' is not defined/)
  })
})
