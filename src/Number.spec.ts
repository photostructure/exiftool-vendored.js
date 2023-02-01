import { isNumber, toFloat, toInt } from "./Number"
import { expect } from "./_chai.spec"

describe("Number", () => {
  const examples = [
    {
      n: null,
      isNum: false,
      i: undefined,
      f: undefined,
    },
    {
      n: 0,
      isNum: true,
      i: 0,
      f: 0,
    },
    {
      n: 1,
      isNum: true,
      i: 1,
      f: 1,
    },
    {
      n: 1.3,
      isNum: true,
      i: 1,
      f: 1.3,
    },
    {
      n: 1.5,
      isNum: true,
      i: 1,
      f: 1.5,
    },
    {
      n: "123",
      isNum: false,
      i: 123,
      f: 123,
    },
    {
      n: "123.5",
      isNum: false,
      i: 123,
      f: 123.5,
    },
    {
      n: " 567.890 W 21431",
      isNum: false,
      i: 567,
      f: 567.89,
    },
  ]
  describe("isNumber()", () => {
    examples.forEach(({ n, isNum }) => {
      it(JSON.stringify(n) + " => " + isNum, () =>
        expect(isNumber(n)).to.eql(isNum)
      )
    })
  })
  describe("toInt()", () => {
    examples.forEach(({ n, i }) => {
      it(JSON.stringify(n) + " => " + i, () => expect(toInt(n)).to.eql(i))
    })
  })
  describe("toFloat()", () => {
    examples.forEach(({ n, f }) => {
      it(JSON.stringify(n) + " => " + f, () => expect(toFloat(n)).to.eql(f))
    })
  })
})
