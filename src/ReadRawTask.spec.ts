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
        expect(exiftool.options.useMWG).to.equal(true);
        const FileName = str + ".jpg";
        const dest = path.join(tmpdir(), FileName);
        await mkdirp(tmpdir());
        await copyFile(path.join(testDir, "quotes.jpg"), dest);
        const t = await exiftool.readRaw(dest);
        expect(t).to.containSubset({
          MIMEType: "image/jpeg",
          FileName,
          DateTimeOriginal: "2016:08:12 13:28:50.728",
          Make: "Apple",
          Model: "iPhone 7 Plus",
          ImageDescription: "image description for quotes test",
          LastKeywordXMP: ["Test", "examples", "beach"],
          Title: UnicodeTestMessage,
        });
      });
    }
  });

  // Filename arguments to readRaw rely on the defense-in-depth
  // control-character check in ExifToolTask.renderCommand. These tests
  // pin that safety net.
  describe("argument-injection hardening", () => {
    it("rejects filename containing a newline (defense-in-depth)", async () => {
      return expect(
        exiftool.readRaw("input.jpg\n-p\n/etc/passwd\n-w!\nleak.txt"),
      ).to.be.rejectedWith(/control character/);
    });

    it("rejects filename containing a NUL byte (defense-in-depth)", async () => {
      return expect(
        exiftool.readRaw("input.jpg\0-p\0/etc/passwd"),
      ).to.be.rejectedWith(/control character/);
    });
  });
});
