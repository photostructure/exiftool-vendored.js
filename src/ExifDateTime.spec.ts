import { HourMs } from "./DateTime"
import { ExifDateTime } from "./ExifDateTime"
import { expect, randomChars } from "./_chai.spec"

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe("ExifDateTime", () => {
  describe("example with no tzoffset or zulu suffix", () => {
    const raw = "2016:08:12 07:28:50.768120"
    const iso = "2016-08-12T07:28:50.768"
    const dt = ExifDateTime.fromEXIF(raw)!
    const dtIso = ExifDateTime.fromISO(iso)!
    it("doesn't set the zone from EXIF", () => {
      expect(dt.hasZone).to.eql(false)
      expect(dt.zone).to.eql(undefined)
    })
    it("doesn't set the zone from ISO", () => {
      expect(dtIso.hasZone).to.eql(false)
      expect(dtIso.zone).to.eql(undefined)
    })
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2016, 8, 12])
    })
    it("parses ISO year/month/day", () => {
      expect([dtIso.year, dtIso.month, dtIso.day]).to.eql([2016, 8, 12])
    })
    it("renders toMillis()", () => {
      expect(dt.toMillis()).to.be.closeTo(new Date(iso).getTime(), 12 * HourMs)
    })
    it("parses hour/minute/second/millis", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([7, 28, 50])
      expect(dt.millisecond).to.eql(768)
    })
    it("includes the raw value", () => {
      expect(dt.rawValue).to.eql(raw)
    })
    it(".toDate() renders a valid Date", () => {
      const d = dt.toDate()
      expect(d.getFullYear()).to.eql(2016)
      expect(d.getMonth()).to.eql(8 - 1)
      expect(d.getDate()).to.eql(12)
      expect(d.getHours()).to.eql(7)
      expect(d.getMinutes()).to.eql(28)
      expect(d.getSeconds()).to.eql(50)
      expect(d.getMilliseconds()).to.eql(768)
    })
    it("ISO .toString()s", () => {
      expect(dt.toString()).to.eql(iso)
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(iso)
    })
    it("Renders a Date assuming the current timezone offset", () => {
      expect(dt.toDate().toLocaleString("en-US")).to.eql(
        "8/12/2016, 7:28:50 AM"
      )
    })
    it("Round-trips from ISO", () => {
      const zone = undefined
      const actual = ExifDateTime.fromISO(iso, zone)!
      expect(actual.toISOString()).to.eql(dt.toISOString())
    })
  })

  describe("example with no tzoffset and UTC default", () => {
    const raw = "2011:01:23 18:19:20"
    const dt = ExifDateTime.fromEXIF(raw, "utc")!
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2011, 1, 23])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([18, 19, 20])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(0)
    })
    it("includes the raw value", () => {
      expect(dt.rawValue).to.eql(raw)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2011-01-23T18:19:20.000Z")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
    it("Renders a Date assuming the current timezone offset", () => {
      const d = dt.toDate()
      const actual = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]
      expect(actual).to.eql([2011, 1, 23])
      expect([
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds(),
      ]).to.eql([18, 19, 20, 0])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2011-01-23T18:19:20.000Z")
    })
  })

  describe("example with ISO formatting and no tzoffset", () => {
    const raw = "2015-11-14T14:20:36"
    const dt = ExifDateTime.fromExifStrict(raw, "utc")!
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2015, 11, 14])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([14, 20, 36])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(0)
    })
    it("includes the raw value", () => {
      expect(dt.rawValue).to.eql(raw)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2015-11-14T14:20:36.000Z")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
    it("Renders a Date assuming the current timezone offset", () => {
      const d = dt.toDate()
      const actual = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]
      expect(actual).to.eql([2015, 11, 14])
      expect([
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds(),
      ]).to.eql([14, 20, 36, 0])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2015-11-14T14:20:36.000Z")
    })
  })

  describe("example with tzoffset and spurious timezone", () => {
    const raw = "2014:07:17 08:46:27-07:00 DST"
    const dt = ExifDateTime.fromEXIF(raw)!
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2014, 7, 17])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([8, 46, 27])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(-60 * 7)
    })
    it("includes the raw value", () => {
      expect(dt.rawValue).to.eql(raw)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2014-07-17T08:46:27.000-07:00")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
  })

  describe("example with tzoffset and no millis", () => {
    const raw = "2013:12:30 11:04:15-05:00"
    const dt = ExifDateTime.fromEXIF(raw)!
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2013, 12, 30])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([11, 4, 15])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(-60 * 5)
    })
    it("includes the raw value", () => {
      expect(dt.rawValue).to.eql(raw)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2013-12-30T11:04:15.000-05:00")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
    it("Renders a Date assuming the forced timezone offset", () => {
      const d = dt.toDate()
      const actual = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]
      expect(actual).to.eql([2013, 12, 30])
      expect([
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds(),
      ]).to.eql([11 + 5, 4, 15, 0])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2013-12-30T16:04:15.000Z")
    })
  })

  describe("example with tzoffset and millis", () => {
    const raw = "2013:12:30 03:04:15.079321-05:00"
    const edt = ExifDateTime.fromEXIF(raw)!
    it("parses year/month/day", () => {
      expect([edt.year, edt.month, edt.day]).to.eql([2013, 12, 30])
    })
    it("parses hour/minute/second/millis", () => {
      expect([edt.hour, edt.minute, edt.second]).to.eql([3, 4, 15])
      expect(edt.millisecond).to.be.eql(79)
    })
    it("parses tzoffset", () => {
      expect(edt.tzoffsetMinutes).to.eql(-60 * 5)
    })
    it("includes the raw value", () => {
      expect(edt.rawValue).to.eql(raw)
    })
    it(".toISOString", () => {
      expect(edt.toISOString()).to.eql("2013-12-30T03:04:15.079-05:00")
    })
    it(".toISOString() matches .toString()", () => {
      expect(edt.toISOString()).to.eql(edt.toString())
    })
    it("Renders a Date assuming the forced timezone offset", () => {
      const d = edt.toDate()
      expect([d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]).to.eql([
        2013, 12, 30,
      ])
      expect([
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds(),
      ]).to.eql([3 + 5, 4, 15, 79])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      // javascript doesn't maintain fractional millis precision:
      expect(edt.toDate().toISOString()).to.eql("2013-12-30T08:04:15.079Z")
    })
  })

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
    expect(dt.toISOString()).to.eql("2014-07-17T08:46:27.000-07:00")
    expect(dt.zone).to.eql("UTC-7")
  })

  it("try to repro issue #46", () => {
    const edt = new ExifDateTime(2019, 3, 8, 14, 24, 54, 0, -480)
    const dt = edt.toDateTime()
    expect(dt.toISO()).to.eql("2019-03-08T14:24:54.000-08:00")
  })

  it("parses non-standard timezone offset", () => {
    // 1900-1923, Kyiv had an offset of UTC +2:02:04
    const edt = ExifDateTime.fromExifStrict(
      "1904:02:03 13:14:15",
      "Europe/Kiev"
    )!
    expect(edt.hasZone).to.eql(true)
    expect(edt.isValid).to.eql(true)
    expect(edt.toISOString()).to.eql("1904-02-03T13:14:15.000+02:02")
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
})
