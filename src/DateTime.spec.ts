import { expect } from "./_chai.spec"
import { millisToFractionalPart } from "./DateTime"

describe(".millisToFractionalPart()", () => {
  const examples: [number, string][] = [
    [0, ".000"],
    [1, ".001"],
    [10, ".010"],
    [100, ".100"],
    [12, ".012"],
    [123, ".123"],
    [123.4, ".123"],
    [123.04, ".123"],
    [123.5, ".124"]
  ]
  examples.forEach(([millis, expected]) => {
    it(millis + " should render " + expected, () => {
      expect(millisToFractionalPart(millis)).to.eql(expected)
    })
  })
})
