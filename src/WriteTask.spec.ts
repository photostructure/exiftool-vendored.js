import { expect, testImg } from "./_chai.spec"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifTool, WriteTags } from "./ExifTool"
import { Struct } from "./Struct"
import { offsetMinutesToZoneName } from "./Timezones"

describe("WriteTask", () => {
  const exiftool = new ExifTool({ maxProcs: 1 })
  after(() => exiftool.end())

  type InputValue = string | number | Struct

  async function assertRoundTrip(args: {
    tag: keyof WriteTags
    inputValue: InputValue | InputValue[]
    expectedValue?: any
    imgName?: string
    args?: string[]
  }) {
    const src = await testImg(args.imgName)
    const wt: WriteTags = {}
    wt[args.tag] = args.inputValue as any
    await exiftool.write(src, wt, args.args)
    const result = (await exiftool.read(src)) as any
    const expected =
      args.expectedValue == null ? args.inputValue : args.expectedValue
    const tag = args.tag.endsWith("#")
      ? args.tag.substring(0, args.tag.length - 1)
      : args.tag
    const actual = result[tag]
    expect(actual).to.eql(
      expected,
      JSON.stringify({ src, tag, expected, actual })
    )
    return
  }

  it("round-trips a comment", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "new comment from " + new Date()
    })
  })

  it("round-trips a comment with a newline and carriage return", async () => {
    return assertRoundTrip({
      tag: "XPComment",
      inputValue: "new comment\nfrom\r" + new Date()
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
      tag: "Orientation#",
      inputValue: 1
    })
  })

  it("round-trips a string Orientation 90 CW", async () => {
    return assertRoundTrip({
      tag: "Orientation#",
      inputValue: 6
    })
  })

  it("round-trips a string Orientation 180 CW", async () => {
    return assertRoundTrip({
      tag: "Orientation#",
      inputValue: 3
    })
  })

  it("updates DateTimeOriginal to a specific time", async () => {
    return assertRoundTrip({
      tag: "DateTimeOriginal",
      inputValue: "2017-11-15T12:34:56+8:00",
      expectedValue: ExifDateTime.fromISO(
        "2017-11-15T12:34:56",
        offsetMinutesToZoneName(480),
        "2017:11:15 12:34:56" // < expected EXIF date time format
      )
    })
  })

  it("updates DateTimeOriginal", async () => {
    const src = await testImg()
    const wt: WriteTags = {
      DateTimeOriginal: new ExifDateTime(2010, 7, 13, 14, 15, 16)
    }
    await exiftool.write(src, wt)
    const newTags = await exiftool.read(src)
    expect(newTags.DateTimeOriginal!.rawValue).to.eql("2010:07:13 14:15:16")
    return
  })

  it("updates CreateDate to a time with zeroes", async () => {
    const src = await testImg()
    const wt: WriteTags = {
      CreateDate: new ExifDateTime(2019, 1, 2, 0, 0, 0, undefined, -480)
    }
    await exiftool.write(src, wt)
    const newTags = await exiftool.read(src)
    expect(newTags.CreateDate!.toISOString()).to.eql(
      "2019-01-02T00:00:00.000+08:00"
    )
    return
  })

  it("updates ReleaseDate to a specific date", async () => {
    const src = await testImg()
    const wt: WriteTags = {
      ReleaseDate: ExifDate.fromISO("2019-01-02")
    }
    await exiftool.write(src, wt)
    const newTags = await exiftool.read(src)
    expect(newTags.ReleaseDate!.toISOString()).to.eql("2019-01-02")
    return
  })

  it("updates DigitalCreationTime to a specific time", async () => {
    const src = await testImg()
    const wt: WriteTags = {
      DigitalCreationTime: new ExifTime(12, 34, 56)
    }
    await exiftool.write(src, wt)
    const newTags = await exiftool.read(src)
    expect(newTags.DigitalCreationTime!.toString()).to.match(/^12:34:56/)
    return
  })

  it("round-trips list tag array input", async () => {
    return assertRoundTrip({
      tag: "Keywords",
      inputValue: ["one", "two", "three"]
    })
  })

  it("round-trips a struct tag", async () => {
    const struct: Struct[] = [
      { RegItemId: "item 1", RegOrgId: "org 1" },
      { RegEntryRole: "role 2", RegOrgId: "org 2" }
    ]
    const src = await testImg()
    await exiftool.write(src, { RegistryID: struct })
    const tags = await exiftool.read(src)
    expect(tags.RegistryID).to.eql(struct)
    return
  })

  it("rejects setting to a non-time value", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { DateTimeOriginal: "this is not a time" as any })
    ).to.be.rejectedWith(/Invalid date\/time/)
  })

  it("rejects an invalid numeric Orientation", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { "Orientation#": -1 })
    ).to.be.rejectedWith(/Value below int16u minimum/i)
  })

  it("rejects an invalid string Orientation", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, {
        Orientation: "this isn't a valid orientation" as any
      })
    ).to.be.rejectedWith(/Can't convert IFD0:Orientation/i)
  })

  it("Accepts a shortcut tag", async () => {
    const date = "2018-04-17T12:34:56.000+08:00"
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
    ).to.be.rejectedWith(/ENOENT|File not found/i)
  })

  it("rejects unknown tags", async () => {
    const src = await testImg()
    return expect(
      exiftool.write(src, { RandomTag: 123 } as any)
    ).to.be.rejectedWith(/Tag \'RandomTag\' is not defined/)
  })
})
