import { IANAZone, Info } from "luxon"
import { expect } from "./_chai.spec"
import { ExifDateTime } from "./ExifDateTime"
import { Tags } from "./Tags"
import {
  UnsetZone,
  UnsetZoneOffsetMinutes,
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset,
  extractZone,
  normalizeZone,
  offsetMinutesToZoneName,
  validTzOffsetMinutes,
} from "./Timezones"

describe("Timezones", () => {
  describe("UnsetZone", () => {
    it("isValid", () => {
      expect(UnsetZone.isValid).to.eql(true)
    })
    it("reasonableTzOffsetMinutes() returns undefined for UnsetZone", () => {
      expect(validTzOffsetMinutes(UnsetZoneOffsetMinutes)).to.eql(false)
    })
    it("offsetMinutesToZoneName() returns undefined for UnsetZone", () => {
      expect(offsetMinutesToZoneName(UnsetZoneOffsetMinutes)).to.eql(undefined)
    })
    it("extractOffset() returns undefined for UnsetZone", () => {
      expect(extractZone("UTC-00:01")).to.eql(undefined)
    })
  })

  describe("normalizeZone()", () => {
    describe("rejects invalid inputs", () => {
      for (const invalid of [
        undefined,
        "",
        new IANAZone("invalid"),
        "GMT/invalid",
        "BAD",
        "UTC+21",
        "UTC-15",
        "+BAD",
        "+1",
        "2014-07-19T12:05:19-09:00",
      ]) {
        it(`(${JSON.stringify(invalid)}) => undefined`, () => {
          expect(normalizeZone(invalid)).to.eql(undefined)
        })
      }
    })
    describe("accepts valid inputs", () => {
      const ts = new Date("2023-01-01T01:00:00").getTime()
      for (const ea of [
        { z: "Z", exp: "+00:00" },
        { z: "GMT", exp: "+00:00" },
        { z: "Zulu", exp: "+00:00" },
        { z: "UTC", exp: "+00:00" },
        { z: "UCT", exp: "+00:00" },
        { z: "UTC+0", exp: "+00:00" },
        { z: "UTC+00:00", exp: "+00:00" },
        { z: "UTC+07:00", exp: "+07:00" },
        { z: "UTC+07:30", exp: "+07:30" },
        { z: "UTC-03:00", exp: "-03:00" },
        { z: "America/Los_Angeles", exp: "-08:00" },
        { z: "US/Hawaii", exp: "-10:00" },
        { z: "US/Hawaii", exp: "-10:00" },
        { z: "Japan", exp: "+09:00" },
        { z: "GB", exp: "+00:00" }, // FIRST MISSPELLING COLOR, AND NOW THIS
      ]) {
        it(`(${JSON.stringify(ea.z)}) => ${ea.exp}`, () => {
          expect(normalizeZone(ea.z)?.formatOffset(ts, "short")).to.eql(ea.exp)
        })
      }
    })
  })

  describe("extractOffset()", () => {
    function ozn(tz: string) {
      return {
        tz,
        src: "normalizeZone",
      }
    }
    const arr = [
      { s: "7", exp: "UTC+7" },
      { s: "3:30", exp: "UTC+3:30" },
    ]
    const ex = [
      { tz: "", exp: undefined },
      { tz: "garbage", exp: undefined },
      { tz: "+09:00", exp: { tz: "UTC+9", src: "offsetMinutesToZoneName" } },
      {
        tz: "America/Los_Angeles",
        exp: ozn("America/Los_Angeles"),
      },
      ...arr.map(({ s, exp }) => ({
        tz: "+" + s,
        exp: { leftovers: "", tz: exp, src: "offsetMinutesToZoneName" },
      })),
      ...arr.map(({ s, exp }) => ({ tz: "UTC+" + s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({
        tz: "-" + s,
        exp: {
          leftovers: "",
          tz: exp.replace("+", "-"),
          src: "offsetMinutesToZoneName",
        },
      })),
      ...arr.map(({ s, exp }) => ({
        tz: "UTC-" + s,
        exp: ozn(exp.replace("+", "-")),
      })),
      {
        tz: ExifDateTime.fromEXIF("2014:07:19 12:05:19-09:00"),
        exp: { tz: "UTC-9", src: "ExifDateTime.zone" },
      },
      { tz: 3, exp: { tz: "UTC+3", src: "hourOffset" } },
      { tz: -10, exp: { tz: "UTC-10", src: "hourOffset" } },
    ]

    for (const { tz, exp } of ex) {
      it(`("${tz}") => ${JSON.stringify(exp)}`, () => {
        expect(extractZone(tz)).to.containSubset(exp)
      })
    }
  })

  describe("extractTzOffsetFromTags", () => {
    describe("with TimeZone", () => {
      for (const { tzo, exp } of [
        { tzo: "-9", exp: "UTC-9" },
        { tzo: "-09:00", exp: "UTC-9" },
        { tzo: "+5:30", exp: "UTC+5:30" },
        { tzo: "+02:00", exp: "UTC+2" },
      ]) {
        it(`({ TimeZone: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZone: tzo })).to.eql({
            tz: exp,
            src: "TimeZone",
          })
        })
        it(`({ OffsetTime: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ OffsetTime: tzo })).to.eql({
            tz: exp,
            src: "OffsetTime",
          })
        })
        it(`({ TimeZoneOffset: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZoneOffset: tzo })).to.eql({
            tz: exp,
            src: "TimeZoneOffset",
          })
        })
        it(`${exp} normalizes to the same value`, () => {
          const zone = Info.normalizeZone(exp)
          expect(zone.name).to.eql(exp)
          expect(zone.isValid).to.eql(true)
        })
      }
    })
  })

  describe("extractTzOffsetFromUTCOffset", () => {
    it("with lagging GPSDateStamp & GPSTimeStamp and DateTimeOriginal in negative offset", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2016:07:25 11:08:49",
          GPSDateStamp: "2016:07:25",
          GPSTimeStamp: "17:45:46",
        })
      ).to.eql({
        tz: "UTC-7",
        src: "offset between DateTimeOriginal and GPSDateTimeStamp",
      })
    })
    for (const tagname of [
      "DateTimeUTC",
      "GPSDateTime",
      "SonyDateTime2",
    ] as const) {
      it(`with ${tagname} and created-at CreateDate with 7 hour offset`, () => {
        const obj: Tags = {
          CreateDate: "2014:07:19 12:05:19",
        }
        obj[tagname] = "2014:07:19 19:05:19"

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC-7",
          src: "offset between CreateDate and " + tagname,
        })
      })
      it(`with lagging ${tagname} and CreateDate in positive whole-number offset`, () => {
        const obj: Tags = {
          CreateDate: "2016:07:18 09:54:03",
        }
        obj[tagname] = "2016:07:18 07:41:01Z"

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC+2",
          src: "offset between CreateDate and " + tagname,
        })
      })
      it(`with lagging ${tagname} and SubSecCreateDate in positive half-hour offset`, () => {
        const obj: Tags = {
          SubSecCreateDate: "2016:07:18 09:54:03",
        }
        obj[tagname] = "2016:07:18 04:16:01"

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC+5:30",
          src: "offset between SubSecCreateDate and " + tagname,
        })
      })

      it(`with DateTimeUTC and very different created-at DateTime`, () => {
        const obj: Tags = {
          CreateDate: "2014:07:19 12:05:19",
        }
        obj[tagname] = "2015:07:19 19:05:19"

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql(undefined)
      })
    }
  })
})
