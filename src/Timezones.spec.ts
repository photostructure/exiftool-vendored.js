import { expect } from "./_chai.spec"
import { extractOffset } from "./Timezones"

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
})
