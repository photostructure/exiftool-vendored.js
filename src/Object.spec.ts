import { fromEntries, omit } from "./Object"
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

  describe(".omit", () => {
    for (const { o, arr, exp } of [
      { o: undefined, arr: [], exp: {} },
      { o: null, arr: [], exp: {} },
      { o: {}, arr: [], exp: {} },
      { o: {}, arr: ["nonexistant"], exp: {} },
      { o: { a: 123 }, arr: ["nonexistant"], exp: { a: 123 } },
      { o: { a: 123 }, arr: ["a"], exp: {} },
      { o: { a: 123, b: "a" }, arr: ["a"], exp: { b: "a" } },
      {
        o: { a: { b: 123 }, c: 234 },
        arr: ["b"], // ignores nested fields
        exp: { a: { b: 123 }, c: 234 },
      },
      {
        o: { a: { b: 123 }, c: 234 },
        arr: ["a"], // prunes non-primitive values
        exp: { c: 234 },
      },
    ]) {
      it(`(${JSON.stringify(o)}, ${arr.join(", ")}) -> ${JSON.stringify(
        exp
      )}`, () => {
        expect(omit(o as any, ...arr)).to.eql(exp)
      })
    }
  })
})
