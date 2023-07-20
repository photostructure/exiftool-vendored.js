import { compact, filterInPlace, shallowArrayEql, sortBy, uniq } from "./Array"
import { times } from "./Times"
import { expect } from "./_chai.spec"

describe("Array", () => {
  describe("compact()", () => {
    it("removes undefined and nulls but no falsy values", () => {
      expect(compact([undefined, 1, null, 0, false, ""])).to.eql([
        1,
        0,
        false,
        "",
      ])
    })
  })

  describe("filterInPlace()", () => {
    it("no-ops for always-true predicates", () => {
      const arr = times(5, (i) => i)
      const exp = times(5, (i) => i)
      expect(filterInPlace(arr, () => true)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
    it("removes all items for always-false predicates", () => {
      const arr = times(5, (i) => i)
      const exp: number[] = []
      expect(filterInPlace(arr, () => false)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
    it("removes filtered items in the source array", () => {
      const arr = times(5, (i) => i)
      const exp = [0, 2, 4]
      expect(filterInPlace(arr, (i) => i % 2 === 0)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
  })

  describe("uniq()", () => {
    it("removes dupes and orders first-one-in", () => {
      expect(uniq([1, 1, 2, 3, 4, 5, 3, 2, 1, 2, 3, 4, 3])).to.eql([
        1, 2, 3, 4, 5,
      ])
    })
  })

  describe("shallowArrayEql", () => {
    for (const { a, b, exp } of [
      { a: [], b: undefined, exp: false },
      { a: [1], b: [], exp: false },
      { a: [1], b: [1], exp: true },
      { a: [1], b: [1, 2], exp: false },
      { a: [2, 1], b: [1, 2], exp: false },
      { a: ["a", 1], b: ["a", 1], exp: true },
      { a: ["a", 1], b: ["a ", 1], exp: false },
    ]) {
      it(`(${JSON.stringify(a)}, ${JSON.stringify(b)}) -> ${exp}`, () => {
        expect(shallowArrayEql(a as any, b as any)).to.eql(exp)
      })
    }
  })

  describe("sortBy", () => {
    const arr = Object.freeze([
      { s: "a", i: 0 },
      { s: "b", i: 1 },
      { s: "c", i: 2 },
      { s: "d", i: 0 },
      { s: "e", i: 1 },
      { s: "f", i: 2 },
      { s: "g", i: 0 },
      { s: "h", i: 1 },
      { s: "i", i: 2 },
    ])

    it("maintains sort order", () => {
      // This will error if it tries to mutate, as it's frozen:
      const result = sortBy(arr, (ea) => ea.i)
      expect(arr.map((ea) => ea.s).join("")).to.eql("abcdefghi")
      expect(result.map((ea) => ea.s).join("")).to.eql("adgbehcfi")
    })
    it("sorts case as expected", () => {
      const result = sortBy(["a", "b", "Aa", "Bb", "aa", "bb"], (ea) => ea)
      expect(result).to.eql(["a", "aa", "Aa", "b", "bb", "Bb"])
    })
  })
})
