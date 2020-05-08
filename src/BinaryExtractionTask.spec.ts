import { fail } from "assert"
import { join } from "path"

import { expect, sha1, tmpname } from "./_chai.spec"
import { BinaryExtractionTask } from "./BinaryExtractionTask"
import { ExifTool } from "./ExifTool"

const testDir = join(__dirname, "..", "test")
describe("BinaryExtractionTask", () => {
  const exiftool = new ExifTool({ maxProcs: 1 })
  after(() => exiftool.end())

  describe("parser", () => {
    const sut = BinaryExtractionTask.for("ThumbnailImage", "", "")
    it("returns success (undefined, no error) from expected input", () => {
      expect(sut.parse("    1 output files created")).to.eql(undefined)
    })
    it("returns error from expected input", () => {
      expect(sut.parse("     0 output files created")).to.eql(
        "0 output files created"
      )
    })
    it("throws on empty input", () => {
      expect(() => sut.parse("")).to.throw(/Missing expected status message/)
    })
    it("extracts the expected error message", () => {
      expect(() =>
        sut.parse(
          ["Error creating /etc/test.jpg", "1 files could not be read"].join(
            "\n"
          )
        )
      ).to.throw(/Error creating \/etc\/test.jpg/)
    })
  })

  it("extracts expected thumb", async function () {
    this.slow(500)
    const src = join(testDir, "with_thumb.jpg")
    const dest = await tmpname()
    await exiftool.extractThumbnail(src, dest)
    // exiftool with_thumb.jpg -b -ThumbnailImage | sha1sum
    expect(await sha1(dest)).to.eql("c7c14706fce4038f6a9da96e213768756a4b2ad2")
  })

  it("throws for missing src", async function () {
    this.slow(500)
    const src = join(testDir, "nonexistant-file.jpg")
    const dest = await tmpname()
    try {
      await exiftool.extractJpgFromRaw(src, dest)
      fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/File not found/i)
    }
  })

  it("throws for missing thumb", async function () {
    this.slow(500)
    const src = join(testDir, "with_thumb.jpg")
    const dest = await tmpname()
    try {
      await exiftool.extractJpgFromRaw(src, dest)
      fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/Error: 0 output files created/i)
    }
  })
})
