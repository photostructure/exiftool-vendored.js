import { fromEntries } from "./Object"
import { expect } from "./_chai.spec"

describe("Object", () => {
  describe(".fromEntries()", () => {
    it("reconstitutes expected", () => {
      expect(
        fromEntries([
          ["a", "string"],
          ["b", 2],
          ["c", false],
          ["d", undefined],
          ["e", null],
          [] as any,
          ["f", { neat: true }],
        ])
      ).to.eql({ a: "string", b: 2, c: false, e: null, f: { neat: true } })
    })
  })
})
