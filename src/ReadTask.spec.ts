import { expect } from "./_chai.spec"
import { ExifDateTime } from "./ExifDateTime"
import { ReadTask } from "./ReadTask"
import { Tags } from "./Tags"

function parse(tags: any, err?: Error): Tags {
  const tt = ReadTask.for("/tmp/example.jpg", [])
  tags.SourceFile = "/tmp/example.jpg"
  const json = JSON.stringify([tags])
  return tt["parse"](json, err)
}

describe("Lat/Lon parsing", () => {
  /* Example:
    $ exiftool -j -coordFormat '%.8f' -fast ../test-images/important/Apple_iPhone7Plus.jpg | grep itude
    "GPSLatitudeRef": "North",
    "GPSLongitudeRef": "East",
    "GPSAltitudeRef": "Above Sea Level",
    "GPSAltitude": "73 m Above Sea Level",
    "GPSLatitude": 22.33543889,
    "GPSLongitude": 114.16401667,
   */
  it("N lat is positive", () => {
    expect(
      parse({ GPSLatitude: 22.33543889, GPSLatitudeRef: "N" }).GPSLatitude
    ).to.be.closeTo(22.33543889, 0.00001)
  })
  it("S lat is negative", () => {
    expect(
      parse({ GPSLatitude: 33.84842123, GPSLatitudeRef: "S" }).GPSLatitude
    ).to.be.closeTo(-33.84842123, 0.00001)
  })
  it("E lon is positive", () => {
    expect(
      parse({ GPSLongitude: 114.16401667, GPSLongitudeRef: "E" }).GPSLongitude
    ).to.be.closeTo(114.16401667, 0.00001)
  })
  it("W lon is negative", () => {
    expect(
      parse({ GPSLongitude: 122.4406148, GPSLongitudeRef: "W" }).GPSLongitude
    ).to.be.closeTo(-122.4406148, 0.00001)
  })
  it("parses lat lon even if timezone is given", () => {
    expect(
      parse({
        GPSLongitude: 122.4406148,
        GPSLongitudeRef: "W",
        OffsetTime: "+02:00"
      }).GPSLongitude
    ).to.be.closeTo(-122.4406148, 0.00001)
  })
})

describe("Time zone extraction", () => {
  it("finds singular positive TimeZoneOffset and sets accordingly", () => {
    const t = parse({
      TimeZoneOffset: 9,
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(9 * 60)
  })

  it("finds positive array TimeZoneOffset and sets accordingly", () => {
    const t = parse({
      TimeZoneOffset: [9, 8],
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(9 * 60)
  })

  it("finds zulu TimeZoneOffset and sets accordingly", () => {
    const t = parse({
      TimeZoneOffset: 0,
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(0)
  })

  it("finds negative TimeZoneOffset in array and sets accordingly", () => {
    const t = parse({
      TimeZoneOffset: [-4],
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-4 * 60)
  })

  it("respects positive HH:MM OffsetTime", () => {
    const t = parse({
      OffsetTime: "+02:30",
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(2 * 60 + 30)
  })

  it("respects positive HH OffsetTime", () => {
    const t = parse({
      OffsetTime: "+07",
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(7 * 60)
  })

  it("respects negative HH:MM OffsetTime", () => {
    const t = parse({
      OffsetTime: "-06:30",
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-(6 * 60 + 30))
  })

  it("respects negative HH OffsetTime", () => {
    const t = parse({
      OffsetTime: "-9",
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-9 * 60)
  })

  it("determines timezone offset from GPS (specifically, Landscape Arch!)", () => {
    const t = parse({
      GPSLatitude: 38.791121,
      GPSLatitudeRef: "N",
      GPSLongitude: 109.606407,
      GPSLongitudeRef: "W",
      DateTimeOriginal: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-6 * 60)
  })

  it("uses GPSDateTime and DateTimeOriginal and sets accordingly for -7", () => {
    const t = parse({
      DateTimeOriginal: "2016:10:19 11:15:14",
      GPSDateTime: "2016:10:19 18:15:12",
      DateTimeCreated: "2016:10:19 11:15:14"
    })
    expect((t.DateTimeOriginal as any)!.tzoffsetMinutes).to.eql(-7 * 60)
    expect(t.DateTimeCreated!.tzoffsetMinutes).to.eql(-7 * 60)
  })

  it("uses GPSDateTime and DateTimeOriginal and sets accordingly for +8", () => {
    const t = parse({
      DateTimeOriginal: "2016:08:12 13:28:50",
      GPSDateTime: "2016:08:12 05:28:49Z",
      DateTimeCreated: "2016:08:12 13:28:50"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(8 * 60)
    expect(t.DateTimeCreated!.tzoffsetMinutes).to.eql(8 * 60)
  })

  it("renders SubSecDateTimeOriginal for -8", () => {
    const t = parse({
      DateTimeOriginal: "2016:12:13 09:05:27",
      GPSDateTime: "2016:12:13 17:05:25Z",
      SubSecDateTimeOriginal: "2016:12:13 09:05:27.12038200"
    })
    expect((t.SubSecDateTimeOriginal as any).tzoffsetMinutes).to.eql(-8 * 60)
    expect(t.SubSecDateTimeOriginal!.toString()).to.eql(
      "2016-12-13T09:05:27.120-08:00"
    )
  })

  it("skips invalid timestamps", () => {
    const t = parse({
      DateTimeOriginal: "2016:08:12 13:28:50",
      GPSDateTime: "not a timestamp"
    })
    expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.be.undefined
  })
})

describe("SubSecDateTimeOriginal", () => {
  it("extracts datetimestamp with millis", () => {
    const t = parse({ SubSecDateTimeOriginal: "2016:10:19 11:15:14.437831" })
      .SubSecDateTimeOriginal as ExifDateTime
    expect(t.year).to.eql(2016)
    expect(t.month).to.eql(10)
    expect(t.day).to.eql(19)
    expect(t.hour).to.eql(11)
    expect(t.minute).to.eql(15)
    expect(t.second).to.eql(14)
    expect(t.tzoffsetMinutes).to.be.undefined
    expect(t.millis).to.eql(437)
    const d = t.toDate()
    expect(d.getFullYear()).to.eql(2016)
    expect(d.getMonth()).to.eql(10 - 1)
    expect(d.getDate()).to.eql(19)
    expect(d.getHours()).to.eql(11)
    expect(d.getMinutes()).to.eql(15)
    expect(d.getSeconds()).to.eql(14)
    expect(d.getMilliseconds()).to.eql(437) // Javascript Date doesn't do fractional millis.
  })
})
