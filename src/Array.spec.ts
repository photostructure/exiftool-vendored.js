import { expect } from "./_chai.spec"
import { compact, filterInPlace, times, uniq } from "./Array"

describe("Array", () => {
  describe("compact()", () => {
    it("removes undefined and nulls but no falsy values", () => {
      expect(compact([undefined, 1, null, 0, false, ""])).to.eql([
        1,
        0,
        false,
        ""
      ])
    })
  })
  describe("times()", () => {
    it("returns the mapped result", () => {
      expect(times(5, String)).to.eql(["0", "1", "2", "3", "4"])
    })
  })

  describe("filterInPlace()", () => {
    it("no-ops for always-true predicates", () => {
      const arr = times(5, i => i)
      const exp = times(5, i => i)
      expect(filterInPlace(arr, () => true)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
    it("removes all items for always-false predicates", () => {
      const arr = times(5, i => i)
      const exp: number[] = []
      expect(filterInPlace(arr, () => false)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
    it("removes filtered items in the source array", () => {
      const arr = times(5, i => i)
      const exp = [0, 2, 4]
      expect(filterInPlace(arr, i => i % 2 === 0)).to.eql(exp)
      expect(arr).to.eql(exp)
    })
  })

  describe("uniq()", () => {
    it("removes dupes and orders first-one-in", () => {
      expect(uniq([1, 1, 2, 3, 4, 5, 3, 2, 1, 2, 3, 4, 3])).to.eql([
        1,
        2,
        3,
        4,
        5
      ])
    })
  })
})
