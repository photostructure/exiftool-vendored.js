import { expect } from "./_chai.spec"
import { isNumber, toF, toI } from "./Number"

describe("Number", () => {
  const examples = [
    {
      n: null,
      isNum: false,
      i: undefined,
      f: undefined
    },
    {
      n: 0,
      isNum: true,
      i: 0,
      f: 0
    },
    {
      n: 1,
      isNum: true,
      i: 1,
      f: 1
    },
    {
      n: 1.5,
      isNum: true,
      i: 2,
      f: 1.5
    },
    {
      n: "123",
      isNum: false,
      i: 123,
      f: 123
    },
    {
      n: "123.5",
      isNum: false,
      i: 124,
      f: 123.5
    },
    {
      n: " 567.890 W 21431",
      isNum: false,
      i: 568,
      f: 567.89
    }
  ]
  describe("isNumber()", () => {
    examples.forEach(({ n, isNum }) => {
      it(JSON.stringify(n) + " => " + isNum, () =>
        expect(isNumber(n)).to.eql(isNum)
      )
    })
  })
  describe("toI()", () => {
    examples.forEach(({ n, i }) => {
      it(JSON.stringify(n) + " => " + i, () => expect(toI(n)).to.eql(i))
    })
  })
  describe("toF()", () => {
    examples.forEach(({ n, f }) => {
      it(JSON.stringify(n) + " => " + f, () => expect(toF(n)).to.eql(f))
    })
  })
})
