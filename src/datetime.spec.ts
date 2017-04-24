import * as _dt from "./datetime"

import { expect } from "./chai.spec"

describe("ExifDateTime", () => {
  describe("example strings with no tz", () => {
    const dt = _dt.parse("DateTimeOriginal", "2016:08:12 07:28:50.9") as _dt.ExifDateTime
    it("year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2016, 8, 12])
    })
    it("hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([7, 28, 50, 900])
    })
    it(".toString", () => {
      expect(dt.toString()).to.eql("2016-08-12T07:28:50.900")
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2016-08-12T07:28:50.900")
    })
    it("Renders a Date assuming the current timezone offset", () => {
      expect(dt.toDate().toLocaleString("en-US")).to.eql("8/12/2016, 7:28:50 AM")
    })
  })

  describe("example strings with UTC tzoffset", () => {
    const dt = _dt.parse("GPSDateTime", "2011:01:23 18:19:20") as _dt.ExifDateTime
    it("year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2011, 1, 23])
    })
    it("hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([18, 19, 20])
    })
    it("tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(0)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2011-01-23T18:19:20.000Z")
    })
    it("Renders a Date assuming the current timezone offset", () => {
      const d = dt.toDate()
      expect([d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]).to.eql([2011, 1, 23])
      expect([d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]).to.eql([18, 19, 20])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2011-01-23T18:19:20.000Z")
    })
  })

  describe("example strings with tz", () => {
    const dt = _dt.parse("DateTimeOriginal", "2013:12:30 11:04:15-05:00") as _dt.ExifDateTime // non-local offset
    it("year/month/day", () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2013, 12, 30])
    })
    it("hour/minute/second", () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([11, 4, 15])
    })
    it("tzoffset", () => {
      expect(dt.tzoffsetMinutes).to.eql(-60 * 5)
    })
    it(".toISOString", () => {
      expect(dt.toISOString()).to.eql("2013-12-30T11:04:15.000-05:00")
    })
    it("Renders a Date assuming the forced timezone offset", () => {
      const d = dt.toDate()
      expect([d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]).to.eql([2013, 12, 30])
      expect([d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]).to.eql([11 + 5, 4, 15])
    })
    it("Renders a UTC Date assuming the current timezone offset", () => {
      expect(dt.toDate().toISOString()).to.eql("2013-12-30T16:04:15.000Z")
    })
  })
})

describe("ExifTime", () => {
  it("hour/minute/second", () => {
    const dt = _dt.parse("RunTimeSincePowerUp", "12:03:45") as _dt.ExifTime
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([12, 3, 45, 0])
  })
  it("hour/minute/second/millis", () => {
    const dt = _dt.parse("RunTimeSincePowerUp", "18:08:05.813") as _dt.ExifTime
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([18, 8, 5, 813])
  })
  it("hour/minute/second/micros", () => {
    const dt = _dt.parse("SubSecDateTimeOriginal", "08:20:55.207340") as _dt.ExifTime
    expect([dt.hour, dt.minute, dt.second]).to.eql([8, 20, 55])
    expect(dt.millis).to.be.closeTo(207.34, .001)
  })
})

describe("ExifTime from GPS", () => {
  const dt = _dt.parse("GPSTimeStamp", "05:28:09.123") as _dt.ExifTime
  it("hour/minute/second/millis", () => {
    expect([dt.hour, dt.minute, dt.second, dt.millis]).to.eql([5, 28, 9, 123])
  })
  it("tzoffset", () => {
    expect(dt.tzoffsetMinutes).to.eql(0)
  })
})

describe("TimeZone", () => {
  it("extracts timezone from a datetimestamp", () => {
    const tz = new _dt.ExifTimeZoneOffset("FileModifyDate", "2016:09:30 09:24:53-09:00")
    expect(tz.tagName).to.eql("FileModifyDate")
    expect(tz.inputWithoutTimezone).to.eql("2016:09:30 09:24:53")
    expect(tz.tzOffsetMinutes).to.eql(-9 * 60)
    expect(tz.toString()).to.eql("-09:00")
  })
  it("extracts just offsets", () => {
    const tz = _dt.parse("RunTimeSincePowerUp", "+11:00") as _dt.ExifTimeZoneOffset
    expect(tz.tagName).to.eql("RunTimeSincePowerUp")
    expect(tz.inputWithoutTimezone).to.eql("")
    expect(tz.tzOffsetMinutes).to.eql(11 * 60)
    expect(tz.toString()).to.eql("+11:00")
  })
})

describe("pad2", () => {
  it("renders positive values", () => {
    expect(_dt.pad2(0)).to.eql(["00"])
    expect(_dt.pad2(1)).to.eql(["01"])
    expect(_dt.pad2(9)).to.eql(["09"])
    expect(_dt.pad2(10)).to.eql(["10"])
    expect(_dt.pad2(11)).to.eql(["11"])
    expect(_dt.pad2(99)).to.eql(["99"])
    expect(_dt.pad2(100)).to.eql(["100"])
  })
  it("renders negative values", () => {
    expect(_dt.pad2(-1)).to.eql(["-1"])
    expect(_dt.pad2(-10)).to.eql(["-10"])
  })
})

describe("pad3", () => {
  it("renders positive values", () => {
    expect(_dt.pad3(0)).to.eql(["000"])
    expect(_dt.pad3(1)).to.eql(["001"])
    expect(_dt.pad3(9)).to.eql(["009"])
    expect(_dt.pad3(10)).to.eql(["010"])
    expect(_dt.pad3(11)).to.eql(["011"])
    expect(_dt.pad3(99)).to.eql(["099"])
    expect(_dt.pad3(100)).to.eql(["100"])
  })
  it("renders negative values", () => {
    expect(_dt.pad3(-1)).to.eql(["-01"])
    expect(_dt.pad3(-9)).to.eql(["-09"])
    expect(_dt.pad3(-10)).to.eql(["-10"])
    expect(_dt.pad3(-99)).to.eql(["-99"])
    expect(_dt.pad3(-100)).to.eql(["-100"])
  })
})

describe("parsing empty/invalid input", () => {
  ["", "     ", "0000:00:00 00:00:00", "    :  :     :  :  "].forEach(bad => {
    it(bad, () => {
      expect(_dt.parse("DateTimeOriginal", bad)).to.eql(bad)
    })
  })
})
