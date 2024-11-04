import { isNumber, roundToDecimalPlaces, toFloat, toInt } from "./Number"
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

  describe("roundToDecimalPlaces", () => {
    describe("input validation", () => {
      it("should throw error for non-numeric values", () => {
        const invalidInputs = [null, undefined, "123", [], {}, NaN]

        invalidInputs.forEach((input) => {
          expect(() => roundToDecimalPlaces(input as any, 2)).to.throw(
            "Value must be a number"
          )
        })
      })

      it("should throw error for negative precision", () => {
        expect(() => roundToDecimalPlaces(123.456, -1)).to.throw(
          "Precision must be non-negative"
        )
      })
    })

    describe("edge cases", () => {
      it("should handle zero correctly", () => {
        expect(roundToDecimalPlaces(0, 2)).to.eql(0)
        expect(roundToDecimalPlaces(-0, 4)).to.eql(0)
      })

      it("should handle very small numbers near epsilon", () => {
        expect(roundToDecimalPlaces(Number.EPSILON / 2, 20)).to.eql(0)
        expect(roundToDecimalPlaces(-Number.EPSILON / 2, 20)).to.eql(0)
      })

      it("should handle very large numbers", () => {
        const largeNumber = 1e15
        expect(roundToDecimalPlaces(largeNumber, 2)).to.eql(largeNumber)
      })

      it("should handle very small decimal numbers", () => {
        expect(roundToDecimalPlaces(0.0000001, 5)).to.eql(0)
        expect(roundToDecimalPlaces(0.0000001, 7)).to.eql(0.0000001)
      })
    })

    describe("normal operations", () => {
      it("should round to specified decimal places", () => {
        const testCases = [
          { value: 123.456, precision: 2, expected: 123.46 },
          { value: 123.454, precision: 2, expected: 123.45 },
          { value: 0.125, precision: 2, expected: 0.13 },
          { value: -123.456, precision: 2, expected: -123.46 },
          { value: 123.456, precision: 0, expected: 123 },
          { value: 123.456, precision: 1, expected: 123.5 },
          { value: 123.456, precision: 3, expected: 123.456 },
        ]

        testCases.forEach(({ value, precision, expected }) => {
          expect(roundToDecimalPlaces(value, precision)).to.eql(expected)
        })
      })

      it("should handle rounding up at midpoint", () => {
        expect(roundToDecimalPlaces(0.5, 0)).to.eql(1)
        expect(roundToDecimalPlaces(1.5, 0)).to.eql(2)
        expect(roundToDecimalPlaces(2.5, 0)).to.eql(3)
      })

      it("should maintain precision for whole numbers", () => {
        const testCases = [
          { value: 100, precision: 2, expected: 100 },
          { value: 1000, precision: 3, expected: 1000 },
          { value: -500, precision: 1, expected: -500 },
        ]

        testCases.forEach(({ value, precision, expected }) => {
          expect(roundToDecimalPlaces(value, precision)).to.eql(expected)
        })
      })
    })

    describe("precision handling", () => {
      it("should handle different precision levels correctly", () => {
        const value = 123.456789
        expect(roundToDecimalPlaces(value, 0)).to.eql(123)
        expect(roundToDecimalPlaces(value, 1)).to.eql(123.5)
        expect(roundToDecimalPlaces(value, 2)).to.eql(123.46)
        expect(roundToDecimalPlaces(value, 3)).to.eql(123.457)
        expect(roundToDecimalPlaces(value, 4)).to.eql(123.4568)
        expect(roundToDecimalPlaces(value, 5)).to.eql(123.45679)
        expect(roundToDecimalPlaces(value, 6)).to.eql(123.456789)
      })
    })
  })
})
