import * as fse from "fs-extra"
import path from "path"
import {
  expect,
  NonAlphaStrings,
  testDir,
  tmpdir,
  UnicodeTestMessage,
} from "./_chai.spec"
import { exiftool } from "./ExifTool"

after(() => exiftool.end())

describe("ReadRawTask", () => {
  describe("non-alphanumeric filenames", () => {
    for (const { str, desc } of NonAlphaStrings) {
      it("reads with " + desc, async () => {
        const FileName = str + ".jpg"
        const dest = path.join(tmpdir(), FileName)
        await fse.mkdirp(tmpdir())
        await fse.copyFile(path.join(testDir, "quotes.jpg"), dest)
        const t = await exiftool.readRaw(dest)
        expect(t).to.containSubset({
          MIMEType: "image/jpeg",
          FileName,
          Make: "Apple",
          Model: "iPhone 7 Plus",
          ImageDescription: "image description for quotes test",
          LastKeywordXMP: ["Test", "examples", "beach"],
          Title: UnicodeTestMessage,
        })
        expect(t.DateTimeOriginal).to.eql("2016:08:12 13:28:50")
      })
    }
  })
})
