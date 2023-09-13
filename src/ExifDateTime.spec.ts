import { randomInt } from "crypto"
import { MinuteMs } from "./DateTime"
import { ExifDateTime } from "./ExifDateTime"
import { omit } from "./Object"
import { expect, randomChars } from "./_chai.spec"

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe("ExifDateTime", () => {
  for (const ea of [
    {
      desc: "no zone suffix",
      exif: "2016:09:12 07:28:50.768120",
      exifExp: "2016:09:12 07:28:50.768",
      iso: "2016-09-12T07:28:50.768",
      d: {
        hasZone: false,
        zoneName: undefined,
        year: 2016,
        month: 9,
        day: 12,
        hour: 7,
        minute: 28,
        second: 50,
        millisecond: 768,
      },
    },
    {
      desc: "with zulu suffix",
      exif: "1999:01:02 03:04:05.67890Z",
      exifExp: "1999:01:02 03:04:05.678+00:00",
      iso: "1999-01-02T03:04:05.678Z",
      d: {
        hasZone: true,
        zoneName: "UTC",
        year: 1999,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5,
        millisecond: 678,
      },
    },
    {
      desc: "with timezone offset",
      exif: "2002:10:11 13:14:15.789-03:00",
      iso: "2002-10-11 13:14:15.789-03:00", // < no T!
      isoExp: "2002-10-11T13:14:15.789-03:00",
      d: {
        hasZone: true,
        zoneName: "UTC-3",
        year: 2002,
        month: 10,
        day: 11,
        hour: 13,
        minute: 14,
        second: 15,
        millisecond: 789,
      },
    },
    {
      desc: "with no tzoffset and UTC default",
      exif: "2011:01:23 18:19:20Z",
      iso: "2011-01-23T18:19:20Z",
      exifExp: "2011:01:23 18:19:20+00:00",
      d: {
        hasZone: true,
        zoneName: "UTC",
        year: 2011,
        month: 1,
        day: 23,
        hour: 18,
        minute: 19,
        second: 20,
        millisecond: undefined,
      },
    },
    {
      desc: "EXIF with ISO formatting and no tzoffset",
      exif: "2016:08:12 07:28:50.768120",
      exifExp: "2016:08:12 07:28:50.768",
      iso: "2016-08-12T07:28:50.768",
      d: {
        hasZone: false,
        zoneName: undefined,
        year: 2016,
        month: 8,
        day: 12,
        hour: 7,
        minute: 28,
        second: 50,
        millisecond: 768,
      },
    },
    {
      desc: "with tzoffset and spurious timezone",
      exif: "2015:07:17 08:46:27.123-09:00 DST",
      exifExp: "2015:07:17 08:46:27.123-09:00",
      iso: "2015-07-17T08:46:27.123-09:00",
      isoExp: "2015-07-17T08:46:27.123-09:00",
      d: {
        hasZone: true,
        zoneName: "UTC-9",
        year: 2015,
        month: 7,
        day: 17,
        hour: 8,
        minute: 46,
        second: 27,
        millisecond: 123,
      },
    },
    {
      desc: "with tzoffset, no millis, and spurious timezone",
      exif: "2014:07:17 08:46:27-07:00 DST",
      exifExp: "2014:07:17 08:46:27-07:00",
      iso: "2014-07-17T08:46:27-07:00",
      isoExp: "2014-07-17T08:46:27-07:00",
      d: {
        hasZone: true,
        zoneName: "UTC-7",
        year: 2014,
        month: 7,
        day: 17,
        hour: 8,
        minute: 46,
        second: 27,
        millisecond: undefined,
      },
    },
    {
      desc: "with tzoffset, no millis or seconds",
      exif: "2014:07:17 08:46-07:00",
      exifExp: "2014:07:17 08:46:00-07:00",
      iso: "2014-07-17T08:46-07:00",
      isoExp: "2014-07-17T08:46:00-07:00",
      d: {
        hasZone: true,
        zoneName: "UTC-7",
        year: 2014,
        month: 7,
        day: 17,
        hour: 8,
        minute: 46,
        second: 0,
        millisecond: undefined,
      },
    },
  ]) {
    describe(ea.desc + " (iso: " + ea.iso + ")", () => {
      const fromExif = ExifDateTime.fromEXIF(ea.exif)
      const expected = {
        ...ea.d,
        inferredZone: false, // < because the .fromEXIF call doesn't have a default!
      }
      it("parses from EXIF", () => {
        expect(fromExif).to.containSubset(expected)
      })
      it("parses from EXIF with zone default", () => {
        const edt = ExifDateTime.fromEXIF(ea.exif, "UTC+1")
        expect(edt).to.haveOwnProperty("inferredZone", !expected.hasZone)
        expect(edt?.zoneName).to.eql(expected.zoneName ?? "UTC+1")
      })
      const fromISO = ExifDateTime.fromISO(ea.iso)
      it("parses from ISO", () => {
        expect(fromISO).to.containSubset(expected)
      })
      it("parses from ISO with zone default", () => {
        const edt = ExifDateTime.fromISO(ea.iso, "UTC-5")
        expect(edt).to.haveOwnProperty("inferredZone", !expected.hasZone)
        expect(edt?.zoneName).to.eql(expected.zoneName ?? "UTC-5")
      })
      const jsDate = new Date(ea.iso)
      it("renders correct epoch millis", () => {
        const exp = jsDate.getTime()
        expect(fromExif?.toMillis()).to.eql(exp)
        expect(fromISO?.toMillis()).to.eql(exp)
      })
      it("renders correct JS Date", () => {
        expect(fromExif?.toDate()).to.eql(jsDate)
        expect(fromISO?.toDate()).to.eql(jsDate)
      })
      it("renders correct ISO string", () => {
        const exp = ea.isoExp ?? ea.iso
        expect(fromExif?.toISOString()).to.eql(exp)
        expect(fromISO?.toISOString()).to.eql(exp)
      })
      it("renders correct EXIF string", () => {
        const exp = ea.exifExp ?? ea.exif
        expect(fromExif?.toExifString()).to.eql(exp)
        expect(fromISO?.toExifString()).to.eql(exp)
      })
    })
  }

  describe("parsing empty/invalid input", () => {
    const examples = [
      "",
      "     ",
      "0000",
      "1958",
      "2010_08",
      "01:08:22",
      "0000:00:00 00:00:00",
      "0000:00:00",
      "0001:01:01 00:00:00.00", // < actual value from a Fotofly image (SHAME!)
      "0001:01:01",
      "    :  :     :  :  ",
    ]
    examples.forEach((bad) => {
      it(`.fromEXIF(${bad}) => undefined`, () => {
        expect(ExifDateTime.fromEXIF(bad)).to.eql(undefined)
      })
      it(`.fromISO(${bad}) => undefined`, () => {
        expect(ExifDateTime.fromISO(bad)).to.eql(undefined)
      })
    })
  })

  it("parses timestamps that end in DST", () => {
    const raw = "2014:07:17 08:46:27-07:00 DST"
    const dt = ExifDateTime.fromEXIF(raw)!
    expect(dt.toISOString()).to.eql("2014-07-17T08:46:27-07:00")
    expect(dt.zone).to.eql("UTC-7")
  })

  it("try to repro issue #46", () => {
    const edt = new ExifDateTime(2019, 3, 8, 14, 24, 54, 0, -480)
    const dt = edt.toDateTime()
    expect(dt.toISO()).to.eql("2019-03-08T14:24:54.000-08:00")
  })

  it("try to repro issue #118", () => {
    const edt = ExifDateTime.fromExifStrict("1970:01:01 00:00:00Z")
    expect(edt!.toMillis()).to.eql(0)
  })

  it("parses non-standard timezone offset", () => {
    // 1900-1923, Kyiv had an offset of UTC +2:02:04
    const edt = ExifDateTime.fromExifStrict(
      "1904:02:03 13:14:15",
      "Europe/Kiev"
    )!
    expect(edt.hasZone).to.eql(true)
    expect(edt.isValid).to.eql(true)
    expect(edt.toISOString()).to.eql("1904-02-03T13:14:15+02:02")
  })

  describe(".fromMillis()", () => {
    it("round-trips now()", () => {
      const e = ExifDateTime.now()
      expect(e.toDate().getTime()).to.be.closeTo(Date.now(), 2_000)
    })
    it("round-trips now() and retains raw value", () => {
      const rawValue = randomChars()
      const e = ExifDateTime.now({ rawValue })
      expect(e.toDate().getTime()).to.be.closeTo(Date.now(), 2_000)
      expect(e.rawValue).to.eql(rawValue)
    })
    it("renders pre-epoch timestamp()", () => {
      const e = ExifDateTime.fromMillis(-27686744322, { zone: "UTC" })
      expect(e.toISOString()).to.eql("1969-02-14T13:14:15.678Z")
    })
    it("renders UTC TWOSday timestamp()", () => {
      const e = ExifDateTime.fromMillis(1643767342222, { zone: "UTC" })
      expect(e.toISOString()).to.eql("2022-02-02T02:02:22.222Z")
    })
    it("renders PST TWOSday timestamp()", () => {
      const rawValue = randomChars()
      const e = ExifDateTime.fromMillis(1643796142345, {
        zone: "America/Los_Angeles",
        rawValue,
      })
      expect(e.toISOString()).to.eql("2022-02-02T02:02:22.345-08:00")
      expect(e.rawValue).to.eql(rawValue)
    })
  })

  describe(".plus()", () => {
    const ts = Math.floor(randomInt(0, Date.now()) / MinuteMs) * MinuteMs

    it("retains values with no zone", () => {
      console.dir({ timestamp: ts })
      // we want a timestamp where adding a second won't change the minute:
      const e = ExifDateTime.fromMillis(ts)!
      expect(e.hasZone).to.eql(false)
      const json = e.toJSON()
      const e2 = e.plus({ seconds: 1 })!
      expect(e2.hasZone).to.eql(false)
      expect(e2.toJSON()).to.containSubset(
        omit(json, "second", "millisecond", "rawValue")
      )
    })

    it("retains values with zone", () => {
      const zoneStr = "UTC+6"
      // we want a timestamp where adding a second won't change the minute:
      const e = ExifDateTime.fromMillis(ts)!.setZone(zoneStr)!
      expect(e.hasZone).to.eql(true)
      const json = e.toJSON()
      const e2 = e.plus({ seconds: 1 })!
      expect(e2.hasZone).to.eql(true)
      expect(e2.zone).to.eql(zoneStr)
      expect(e2.toJSON()).to.containSubset(
        omit(json, "second", "millisecond", "rawValue")
      )
    })
  })
})
