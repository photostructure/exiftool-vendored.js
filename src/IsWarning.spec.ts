import { isWarning } from "./IsWarning"
import { expect } from "./_chai.spec"

describe("IsWarning", () => {
  for (const msg of [
    "Warning: Duplicate MakerNoteUnknown tag in ExifIFD",
    "Warning: ICC_Profile deleted. Image colors may be affected",
    "Warning: Tag 'INVALID_TAG_NAME' is not defined",
    "Error: Nothing to write - /tmp/test.xmp",
    "Nothing to do.",
  ]) {
    it(`accepts ${msg}`, () => {
      expect(isWarning(msg)).to.eql(true)
    })
  }
  for (const msg of [
    "Error: File not found - nonexistant.jpg",
  ]) {
    it(`rejects ${msg}`, () => {
      expect(isWarning(msg)).to.eql(false)
    })
  }
})
