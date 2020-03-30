import { expect } from "./_chai.spec"
import { pad2, pad3 } from "./String"

describe("String", () => {
  const examples = [
    { i: -100, pad2: "-100", pad3: "-100" },
    { i: -10, pad2: "-10", pad3: "-10" },
    { i: -1, pad2: "-1", pad3: "-01" },
    { i: 0, pad2: "00", pad3: "000" },
    { i: 1, pad2: "01", pad3: "001" },
    { i: 9, pad2: "09", pad3: "009" },
    { i: 10, pad2: "10", pad3: "010" },
    { i: 11, pad2: "11", pad3: "011" },
    { i: 99, pad2: "99", pad3: "099" },
    { i: 100, pad2: "100", pad3: "100" },
    { i: 1999, pad2: "1999", pad3: "1999" },
  ]
  describe("pad2()", () => {
    examples.forEach((e) => {
      it(e.i + " => " + e.pad2, () => {
        expect(pad2(e.i)).to.eql([e.pad2])
      })
    })
  })
  describe("pad3()", () => {
    examples.forEach((e) => {
      it(e.i + " => " + e.pad3, () => {
        expect(pad3(e.i)).to.eql([e.pad3])
      })
    })
  })
})
