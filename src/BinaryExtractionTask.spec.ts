import { join } from "path"

import { expect, ptmp } from "./_chai.spec"
import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { ExifTool } from "./ExifTool"
import { sha1 } from "./update/io"

const testDir = join(__dirname, "..", "test")
describe("BinaryExtractionTask", () => {
  const exiftool = new ExifTool({ maxProcs: 1 })
  after(() => exiftool.end())

  describe("parser", () => {
    const sut = BinaryExtractionTask.for("ThumbnailImage", "", "")
    it("returns success from expected input", () => {
      expect(() => sut.parse("    1 output files created")).to.not.throw()
    })
    it("throws on empty input", () => {
      expect(() => sut.parse("")).to.throw(/Missing expected status message/)
    })
    it("extracts the expected error message", () => {
      expect(() =>
        sut.parse(
          `Error creating /etc/test.jpg
            1 files could not be read
            0 output files created`
        )
      ).to.throw(/Error creating \/etc\/test.jpg/)
    })
  })

  it("extracts expected thumb", async function() {
    this.slow(500)
    const src = join(testDir, "with_thumb.jpg")
    const dest = await ptmp.tmpName()
    await exiftool.extractThumbnail(src, dest)
    // exiftool with_thumb.jpg -b -ThumbnailImage | sha1sum
    return sha1(dest, "c7c14706fce4038f6a9da96e213768756a4b2ad2")
  })
})
