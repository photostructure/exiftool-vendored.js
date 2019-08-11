import { expect } from "./_chai.spec"
import {
  extractOffset,
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset
} from "./Timezones"

describe("Timezones", () => {
  describe("extractOffsetMinutes", () => {
    function ozn(tz: string) {
      return {
        tz,
        src: "offsetMinutesToZoneName"
      }
    }
    const arr = [{ s: "7", exp: "UTC+7" }, { s: "3:30", exp: "UTC+03:30" }]
    const ex = [
      { tz: "", exp: undefined },
      { tz: "garbage", exp: undefined },
      { tz: "09:00", exp: ozn("UTC+9") },
      {
        tz: "America/Los_Angeles",
        exp: { tz: "America/Los_Angeles", src: "validIANAZone" }
      },
      ...arr.map(({ s, exp }) => ({ tz: s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({ tz: "+" + s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({ tz: "UTC+" + s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({
        tz: "-" + s,
        exp: ozn(exp.replace("+", "-"))
      })),
      ...arr.map(({ s, exp }) => ({
        tz: "UTC-" + s,
        exp: ozn(exp.replace("+", "-"))
      }))
    ]

    for (const { tz, exp } of ex) {
      it(`("${tz}") => ${exp}`, () => {
        expect(extractOffset(tz)).to.eql(exp)
      })
    }
  })

  describe("extractTzOffsetFromTags", () => {
    describe("with TimeZone", () => {
      for (const { tzo, exp } of [
        { tzo: "-9", exp: "UTC-9" },
        { tzo: "-09:00", exp: "UTC-9" },
        { tzo: "+5:30", exp: "UTC+05:30" },
        { tzo: "+02:00", exp: "UTC+2" }
      ]) {
        it(`({ TimeZone: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZone: tzo })).to.eql({
            tz: exp,
            src: "offsetMinutesToZoneName from TimeZone"
          })
        })
        it(`({ OffsetTime: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ OffsetTime: tzo })).to.eql({
            tz: exp,
            src: "offsetMinutesToZoneName from OffsetTime"
          })
        })
        it(`({ TimeZoneOffset: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZoneOffset: tzo })).to.eql({
            tz: exp,
            src: "offsetMinutesToZoneName from TimeZoneOffset"
          })
        })
      }
    })
  })
  describe("extractTzOffsetFromUTCOffset", () => {
    it("with DateTimeUTC and created-at DateTime", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          CreateDate: "2014:07:19 12:05:19",
          DateTimeUTC: "2014:07:19 19:05:19"
        })
      ).to.eql({
        tz: "UTC-7",
        src: "offset between CreateDate and DateTimeUTC"
      })
    })
    it("with lagging DateTimeUTC and CreateDate in positive whole-number offset", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          CreateDate: "2016:07:18 09:54:03",
          DateTimeUTC: "2016:07:18 07:41:01Z"
        })
      ).to.eql({
        tz: "UTC+2",
        src: "offset between CreateDate and DateTimeUTC"
      })
    })
    it("with lagging DateTimeUTC and SubSecCreateDate in positive half-hour offset", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          SubSecCreateDate: "2016:07:18 09:54:03",
          DateTimeUTC: "2016:07:18 04:16:01"
        })
      ).to.eql({
        tz: "UTC+05:30",
        src: "offset between SubSecCreateDate and DateTimeUTC"
      })
    })
    it("with lagging GPSDateStamp & GPSTimeStamp and DateTimeOriginal in negative offset", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2016:07:25 11:08:49",
          GPSDateStamp: "2016:07:25",
          GPSTimeStamp: "17:45:46"
        })
      ).to.eql({
        tz: "UTC-7",
        src: "offset between DateTimeOriginal and GPSDateTimeStamp"
      })
    })
    it("with DateTimeUTC and very different created-at DateTime", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          CreateDate: "2014:07:19 12:05:19",
          DateTimeUTC: "2015:07:19 19:05:19"
        })
      ).to.eql(undefined)
    })
  })
})
