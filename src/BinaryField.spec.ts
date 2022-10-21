import { BinaryField } from "./BinaryField"
import { expect } from "./_chai.spec"

describe("BinaryField", () => {
  describe(".fromRawValue", () => {
    it("rejects blank", () => {
      expect(BinaryField.fromRawValue("")).to.eql(undefined)
    })
    it("rejects stringified number", () => {
      expect(BinaryField.fromRawValue("1234")).to.eql(undefined)
    })
    it("rejects EXIF date time", () => {
      expect(BinaryField.fromRawValue("2022:10:21 14:55:32")).to.eql(undefined)
    })
    it("accepts ExifTool's binary data value", async () => {
      const rawValue = "(Binary data 2506078 bytes, use -b option to extract)"
      const actual = BinaryField.fromRawValue(rawValue)
      expect(actual).to.containSubset({
        bytes: 2506078,
        rawValue,
      })
    })
  })
})
