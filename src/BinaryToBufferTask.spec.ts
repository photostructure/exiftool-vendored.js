import { fail } from "assert"
import { randomBytes } from "crypto"
import { join } from "path"
import { BinaryToBufferTask } from "./BinaryToBufferTask"
import { ExifTool } from "./ExifTool"
import { expect, sha1buffer } from "./_chai.spec"

const testDir = join(__dirname, "..", "test")
describe("BinaryToBufferTask", () => {
  const exiftool = new ExifTool({ maxProcs: 1 })
  after(() => exiftool.end())

  describe("parser", () => {
    const sut = BinaryToBufferTask.for("ThumbnailImage", "")
    it("returns success (undefined, no error) from expected input", () => {
      const result = sut.parse(
        JSON.stringify([
          { SourceFile: "test.jpg", ThumbnailImage: "base64:aGVsbG8gd29ybGQ=" },
        ])
      )
      expect(result.toString()).to.eql("hello world")
    })
    it("returns error from unexpected input", () => {
      expect(sut.parse("invalid").toString()).to.match(/invalid/)
    })
    it("throws on empty input", () => {
      expect(sut.parse("").toString()).to.match(/Unexpected end of JSON input/i)
    })
    it("returns any provided errors", () => {
      const err = new Error(randomBytes(3).toString("hex"))
      expect(sut.parse("", err).toString()).to.include(err.message)
    })
  })

  it("extracts expected thumb", async function () {
    this.slow(500)
    const src = join(testDir, "with_thumb.jpg")
    const buf = await exiftool.extractBinaryTagToBuffer("ThumbnailImage", src)
    // exiftool with_thumb.jpg -b -ThumbnailImage | sha1sum
    expect(sha1buffer(buf)).to.eql("c7c14706fce4038f6a9da96e213768756a4b2ad2")
  })

  it("throws for missing src", async function () {
    this.slow(500)
    const src = join(testDir, "nonexistant-file.jpg")
    try {
      await exiftool.extractBinaryTagToBuffer("JpgFromRaw", src)
      fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/File not found/i)
    }
  })

  it("throws for missing thumb", async function () {
    this.slow(500)
    const src = join(testDir, "with_thumb.jpg")
    try {
      await exiftool.extractBinaryTagToBuffer("JpgFromRaw", src)
      fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/JpgFromRaw not found/i)
    }
  })
})
