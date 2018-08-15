import { expect } from "./_chai.spec"
import {
  ExifDateTime,
  ExifTime,
  ExifTimeZoneOffset,
  millisToFractionalPart,
  parse
} from "./DateTime"

describe(".millisToFractionalPart()", () => {
  const examples: [number, string][] = [
    [0, ".000"],
    [1, ".001"],
    [10, ".010"],
    [100, ".100"],
    [12, ".012"],
    [123, ".123"],
    [123.4, ".1234"],
    [123.04, ".12304"],
    [123.004, ".123004"],
    [123.0004, ".123"],
    [123.4567, ".123457"],
    [1234.5678, "1.23457"]
  ]
  examples.forEach(([millis, expected]) => {
    it(millis + " should render " + expected, () => {
      expect(millisToFractionalPart(millis)).to.eql(expected)
    })
  })
})

describe("ExifDateTime", () => {
  describe("example strings with no tz", () => {
    const dt = parse(
      "DateTimeOriginal",
      "2016:08:12 07:28:50.768120"
    ) as ExifDateTime
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2016, 8, 12])
    })
    it("parses hour/minute/second/millis", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([7, 28, 50])
      expect(dt.millis).to.be.closeTo(768.12, 0.01)
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
      expect(dt.toString()).to.eql("2016-08-12T07:28:50.76812")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
    it("Renders a Date assuming the current timezone offset", () => {
      expect(dt.toDate().toLocaleString("en-US")).to.eql(
        "8/12/2016, 7:28:50 AM"
      )
    })
  })

  describe("example strings with UTC tzoffset", () => {
    const dt = parse("GPSDateTime", "2011:01:23 18:19:20") as ExifDateTime
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2011, 1, 23])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([18, 19, 20])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(0)
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
        d.getUTCMilliseconds()
      ]).to.eql([18, 19, 20, 0])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2011-01-23T18:19:20.000Z")
    })
  })

  describe("example strings with tz and no millis", () => {
    const dt = parse(
      "DateTimeOriginal",
      "2013:12:30 11:04:15-05:00"
    ) as ExifDateTime // non-local offset
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2013, 12, 30])
    })
    it("parses hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([11, 4, 15])
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(-60 * 5)
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
        d.getUTCMilliseconds()
      ]).to.eql([11 + 5, 4, 15, 0])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2013-12-30T16:04:15.000Z")
    })
  })

  describe("example strings with tz and millis", () => {
    const dt = parse(
      "DateTimeOriginal",
      "2013:12:30 03:04:15.079321-05:00"
    ) as ExifDateTime // non-local offset
    it("parses year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2013, 12, 30])
    })
    it("parses hour/minute/second/millis", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([3, 4, 15])
      expect(dt.millis).to.be.closeTo(79.321, 0.001)
    })
    it("parses tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(-60 * 5)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2013-12-30T03:04:15.079321-05:00")
    })
    it(".toISOString() matches .toString()", () => {
      expect(dt.toISOString()).to.eql(dt.toString())
    })
    it("Renders a Date assuming the forced timezone offset", () => {
      const d = dt.toDate()
      expect([d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]).to.eql([
        2013,
        12,
        30
      ])
      expect([
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds()
      ]).to.eql([3 + 5, 4, 15, 79])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      // javascript doesn't maintain fractional millis precision:
      expect(dt.toDate().toISOString()).to.eql("2013-12-30T08:04:15.079Z")
    })
  })
})

describe("ExifTime", () => {
  it("parses hour/minute/second", () => {
    const dt = parse("RunTimeSincePowerUp", "12:03:45") as ExifTime
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([12, 3, 45, 0])
  })
  it("parses hour/minute/second/millis", () => {
    const dt = parse("RunTimeSincePowerUp", "18:08:05.813") as ExifTime
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([18, 8, 5, 813])
  })
  it("parses hour/minute/second/micros", () => {
    const dt = parse("SubSecDateTimeOriginal", "08:20:55.207340") as ExifTime
    expect([dt.hour, dt.minute, dt.second]).to.eql([8, 20, 55])
    expect(dt.millis).to.be.closeTo(207.34, 0.001)
    expect(dt.toString()).to.eql("08:20:55.20734")
  })
})

describe("ExifTime from GPS", () => {
  const dt = parse("GPSTimeStamp", "05:28:09.123") as ExifTime
  it("hour/minute/second/millis", () => {
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([5, 28, 9, 123])
  })
  it("tzoffset", () => {
    expect(dt.tzoffsetMinutes).to.eql(0)
  })
})

describe("TimeZone", () => {
  it("extracts timezone from a datetimestamp", () => {
    const tz = new ExifTimeZoneOffset(
      "FileModifyDate",
      "2016:09:30 09:24:53-09:00"
    )
    expect(tz.tagName).to.eql("FileModifyDate")
    expect(tz.inputWithoutTimezone).to.eql("2016:09:30 09:24:53")
    expect(tz.tzOffsetMinutes).to.eql(-9 * 60)
    expect(tz.toString()).to.eql("-09:00")
  })
  it("extracts just offsets", () => {
    const tz = parse("RunTimeSincePowerUp", "+11:00") as ExifTimeZoneOffset
    expect(tz.tagName).to.eql("RunTimeSincePowerUp")
    expect(tz.inputWithoutTimezone).to.eql("")
    expect(tz.tzOffsetMinutes).to.eql(11 * 60)
    expect(tz.toString()).to.eql("+11:00")
  })
})

describe("parsing empty/invalid input", () => {
  const examples = [
    "",
    "     ",
    "0000:00:00 00:00:00",
    "0000:00:00",
    "0001:01:01 00:00:00.00", // < actual value from a Fotofly image (SHAME!)
    "0001:01:01",
    "    :  :     :  :  "
  ]
  examples.forEach(bad => {
    it(bad + " for DateTimeOriginal", () => {
      expect(parse("DateTimeOriginal", bad)).to.eql(bad)
    })
    it(bad + " for SubSecCreateDate", () => {
      expect(parse("SubSecCreateDate", bad)).to.eql(bad)
    })
  })
})
