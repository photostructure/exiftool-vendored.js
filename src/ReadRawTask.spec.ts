import { copyFile } from "node:fs/promises";
import path from "node:path";
import { exiftool } from "./ExifTool";
import {
  NonAlphaStrings,
  UnicodeTestMessage,
  end,
  expect,
  mkdirp,
  testDir,
  tmpdir,
} from "./_chai.spec";

after(() => end(exiftool));

describe("ReadRawTask", () => {
  describe("non-alphanumeric filenames", () => {
    for (const { str, desc } of NonAlphaStrings) {
      it("reads with " + desc, async () => {
        const FileName = str + ".jpg";
        const dest = path.join(tmpdir(), FileName);
        await mkdirp(tmpdir());
        await copyFile(path.join(testDir, "quotes.jpg"), dest);
        const t = await exiftool.readRaw(dest);
        expect(t).to.containSubset({
          MIMEType: "image/jpeg",
          FileName,
          Make: "Apple",
          Model: "iPhone 7 Plus",
          ImageDescription: "image description for quotes test",
          LastKeywordXMP: ["Test", "examples", "beach"],
          Title: UnicodeTestMessage,
        });
        expect(t.DateTimeOriginal).to.eql("2016:08:12 13:28:50");
      });
    }
  });
});
