import { expect } from "./_chai.spec"
import {
  extractOffset,
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset
} from "./Timezones"

describe("Timezones", () => {
  describe("extractOffsetMinutes", () => {
    const arr = [{ tz: "7", exp: "UTC+7" }, { tz: "3:30", exp: "UTC+03:30" }]
    ;[
      { tz: "", exp: undefined },
      { tz: "garbage", exp: undefined },
      { tz: "09:00", exp: "UTC+9" },
      { tz: "America/Los_Angeles", exp: "America/Los_Angeles" },
      ...arr,
      ...arr.map(({ tz, exp }) => ({ tz: "+" + tz, exp })),
      ...arr.map(({ tz, exp }) => ({ tz: "UTC+" + tz, exp })),
      ...arr.map(({ tz, exp }) => ({
        tz: "-" + tz,
        exp: exp.replace("+", "-")
      })),
      ...arr.map(({ tz, exp }) => ({
        tz: "UTC-" + tz,
        exp: exp.replace("+", "-")
      }))
    ].forEach(({ tz, exp }) =>
      it(`("${tz}") => ${exp}`, () => {
        expect(extractOffset(tz)).to.eql(exp)
      })
    )
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
          expect(extractTzOffsetFromTags({ TimeZone: tzo })).to.eql(exp)
        })
        it(`({ OffsetTime: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ OffsetTime: tzo })).to.eql(exp)
        })
        it(`({ TimeZoneOffset: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZoneOffset: tzo })).to.eql(exp)
        })
      }
    })
  })
  describe("extractTzOffsetFromUTCOffset", () => {
    it("with DateTimeUTC and another created-at DateTime", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          CreateDate: "2014:07:19 12:05:19",
          DateTimeUTC: "2014:07:19 19:05:19"
        })
      ).to.eql("UTC-7")
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
