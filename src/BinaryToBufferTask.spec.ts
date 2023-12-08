import assert from "assert"
import crypto from "node:crypto"
import { copyFile } from "node:fs/promises"
import path from "node:path"
import { BinaryToBufferTask } from "./BinaryToBufferTask"
import { exiftool } from "./ExifTool"
import {
  NonAlphaStrings,
  expect,
  mkdirp,
  sha1buffer,
  testDir,
  tmpdir,
} from "./_chai.spec"

after(() => exiftool.end())

describe("BinaryToBufferTask", () => {
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
      const err = new Error(crypto.randomBytes(3).toString("hex"))
      expect(sut.parse("", err).toString()).to.include(err.message)
    })
  })

  async function assertExtractThumbnail(str: string) {
    // Make sure the str (which may have non-latin characters) shows up in the
    // directory path and filename:
    const srcDir = path.join(tmpdir(), "src-" + str)
    await mkdirp(srcDir)
    const src = path.join(srcDir, str + ".jpg")
    await copyFile(path.join(testDir, "with_thumb.jpg"), src)
    const buf = await exiftool.extractBinaryTagToBuffer("ThumbnailImage", src)
    // exiftool test/with_thumb.jpg -b -ThumbnailImage | sha1sum
    expect(sha1buffer(buf)).to.eql("57885e5e16b16599ccf208981a87fe198612d9fb")
  }

  it("extracts expected thumb", async function () {
    this.slow(500)
    await assertExtractThumbnail("image")
  })

  for (const { str, desc } of NonAlphaStrings) {
    it("extracts expected thumb with " + desc + " characters", () =>
      assertExtractThumbnail(str)
    )
  }

  it("throws for missing src", async function () {
    this.slow(500)
    const src = path.join(testDir, "nonexistant-file.jpg")
    try {
      await exiftool.extractBinaryTagToBuffer("JpgFromRaw", src)
      assert.fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/File not found/i)
    }
  })

  it("throws for missing thumb", async function () {
    this.slow(500)
    const src = path.join(testDir, "with_thumb.jpg")
    try {
      await exiftool.extractBinaryTagToBuffer("JpgFromRaw", src)
      assert.fail("expected error to be thrown")
    } catch (err) {
      expect(String(err)).to.match(/JpgFromRaw not found/i)
    }
  })
})
