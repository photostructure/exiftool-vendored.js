import { expect } from "./_chai.spec"
import {
  parseCoordinate,
  parseCoordinates,
  parseDecimalCoordinate,
} from "./CoordinateParser"

describe("Coordinate Parser", () => {
  describe("parsePosition", () => {
    it("should parse valid DMS coordinates", () => {
      const input = "40° 26' 46\" N 79° 58' 56\" W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 40.446111,
        longitude: -79.982222,
      })
    })
    it("should parse valid DMS coordinates from ExifTool", () => {
      const input = "37 deg 46' 29.64\" N, 122 deg 25' 9.85\" W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 37.7749,
        longitude: -122.419403,
      })
    })

    it("should parse valid DM coordinates", () => {
      const input = "40° 26.767' N 79° 58.933' W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 40.446117,
        longitude: -79.982217,
      })
    })

    it("should parse valid decimal coordinates", () => {
      const input = "40.44611° N 79.98222° W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 40.44611,
        longitude: -79.98222,
      })
    })

    it("should throw on empty input", () => {
      expect(() => parseCoordinates("")).to.throw(
        "Input string cannot be empty"
      )
    })

    it("should throw on multiple latitude values", () => {
      const input = "40° N 50° N"
      expect(() => parseCoordinates(input)).to.throw(
        "Multiple latitude values found"
      )
    })
  })

  describe("parseDecimalCoordinate", () => {
    it("should parse valid decimal coordinate", () => {
      const result = parseDecimalCoordinate("40.44611° N")
      expect(result).to.eql({
        degrees: 40.44611,
        direction: "N",
      })
    })

    it("should throw on non-decimal format", () => {
      expect(() => parseDecimalCoordinate("40° 26' N")).to.throw(
        "Expected decimal degrees format"
      )
    })
  })

  describe("parseCoordinates", () => {
    it("should parse multiple coordinates", () => {
      const input = "40° N 79° W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 40,
        longitude: -79,
      })
    })

    it("should handle mixed formats", () => {
      const input = "40° 26' 46\" N 79.98222° W"
      const result = parseCoordinates(input)
      expect(result).to.eql({
        latitude: 40.446111,
        longitude: -79.98222,
      })
    })
  })

  describe("parseCoordinate", () => {
    it("should parse DMS format", () => {
      const result = parseCoordinate("40° 26' 46\" N")
      expect(result).to.eql({
        degrees: 40,
        minutes: 26,
        seconds: 46,
        direction: "N",
        format: "DMS",
        remainder: "",
      })
    })

    it("should parse DM format", () => {
      const result = parseCoordinate("40° 26.767' N")
      expect(result).to.eql({
        degrees: 40,
        minutes: 26.767,
        seconds: undefined,
        direction: "N",
        format: "DM",
        remainder: "",
      })
    })

    it("should parse decimal format", () => {
      const result = parseCoordinate("40.44611° N")
      expect(result).to.eql({
        degrees: 40.44611,
        minutes: undefined,
        seconds: undefined,
        direction: "N",
        format: "D",
        remainder: "",
      })
    })

    it("should handle negative degrees", () => {
      const result = parseCoordinate("-40.44611° S")
      expect(result.degrees).to.eql(-40.44611)
    })

    it("should handle remainder text", () => {
      const result = parseCoordinate("40° N Additional Text")
      expect(result.remainder).to.eql("Additional Text")
    })

    it("should throw on invalid minutes", () => {
      expect(() => parseCoordinate("40° 60' N")).to.throw(
        "Minutes must be between 0 and 59"
      )
    })

    it("should throw on invalid seconds", () => {
      expect(() => parseCoordinate("40° 30' 60\" N")).to.throw(
        "Seconds must be between 0 and 59"
      )
    })

    it("should throw on invalid latitude degrees", () => {
      expect(() => parseCoordinate("91° N")).to.throw(
        "Degrees must be between -90 and 90"
      )
    })

    it("should throw on invalid longitude degrees", () => {
      expect(() => parseCoordinate("181° E")).to.throw(
        "Degrees must be between -180 and 180"
      )
    })
  })
})
