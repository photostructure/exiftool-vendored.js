import { isIgnorableWarning } from "./IgnorableError"
import { expect } from "./_chai.spec"

describe("IgnorableError", () => {
  for (const msg of ["Warning: Duplicate MakerNoteUnknown tag in ExifIFD"]) {
    it(`accepts ${msg}`, () => {
      expect(isIgnorableWarning(msg)).to.eql(true)
    })
  }
  for (const msg of [
    "Warning: ICC_Profile deleted. Image colors may be affected",
    "Error: Tag 'INVALID_TAG_NAME' is not defined",
    "Error: Nothing to write - nonexistant.xmp",
    "Error: File not found - nonexistant.jpg",
  ]) {
    it(`rejects ${msg}`, () => {
      expect(isIgnorableWarning(msg)).to.eql(false)
    })
  }
})
