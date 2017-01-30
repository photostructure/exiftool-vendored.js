import { expect, pfs, ptmp } from "./chai.spec"
import { exiftool } from "./exiftool"
import { BinaryExtractionTask } from "./binary_extraction_task"
import { join } from "path"

const testDir = join(__dirname, "..", "test")
describe("BinaryExtractionTask", () => {
  describe("parser", () => {
    const sut = BinaryExtractionTask.for("ThumbnailImage", "", "")
    it("returns success from expected input", () => {
      expect(() => sut.parse("    1 output files created")).to.not.throw()
    })
    it("throws on empty input", () => {
      expect(() => sut.parse("")).to.throw(/Missing expected status message/)
    })
    it("extracts the expected error message", () => {
      expect(() => sut.parse(
        `Error creating /etc/test.jpg
            1 files could not be read
            0 output files created`
      )).to.throw(/Error creating \/etc\/test.jpg/)
    })
  })

  it("extracts expected thumb", async () => {
    const src = join(testDir, "with_thumb.jpg")
    const dest = await ptmp.tmpName()
    await exiftool.extractThumbnail(src, dest)
    const expected = pfs.readFile(join(testDir, "expected_thumb.jpg"))
    const actual = pfs.readFile(dest)
    return expect(actual).to.eql(expected)
  })
})
