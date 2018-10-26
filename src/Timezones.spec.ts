import { expect } from "./_chai.spec"
import { extractOffset } from "./Timezones"

describe("Timezones", () => {
  describe("extractOffsetMinutes", () => {
    ;[
      { tz: "", exp: undefined },
      { tz: "garbage", exp: undefined },
      { tz: "-7", exp: "UTC-7" },
      { tz: "+3:30", exp: "UTC+03:30" },
      { tz: "-09:00", exp: "UTC-9" },
      { tz: "America/Los_Angeles", exp: "America/Los_Angeles" }
    ].forEach(({ tz, exp }) =>
      it(`("${tz}") => ${exp}`, () => {
        expect(extractOffset(tz)).to.eql(exp)
      })
    )
  })
})
