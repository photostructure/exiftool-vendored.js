import assert from "assert";
import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  BinaryExtractionTask,
  BinaryExtractionTaskOptions,
} from "./BinaryExtractionTask";
import { exiftool } from "./ExifTool";
import {
  NonAlphaStrings,
  end,
  expect,
  mkdirp,
  randomChars,
  sha1,
  testDir,
  tmpdir,
  tmpname,
} from "./_chai.spec";

after(() => end(exiftool));

describe("BinaryExtractionTask", () => {
  describe("parser", () => {
    const sut = BinaryExtractionTask.for("ThumbnailImage", "", "");
    it("returns success (undefined, no error) from expected input", () => {
      expect(sut.parse("    1 output files created")).to.eql(undefined);
    });
    it("returns error from expected input", () => {
      expect(sut.parse("     0 output files created")).to.eql(
        "0 output files created",
      );
    });
    it("throws on empty input", () => {
      expect(() => sut.parse("")).to.throw(/Missing expected status message/);
    });
    it("extracts the expected error message", () => {
      expect(() =>
        sut.parse(
          ["Error creating /etc/test.jpg", "1 files could not be read"].join(
            "\n",
          ),
        ),
      ).to.throw(/Error creating \/etc\/test.jpg/);
    });
  });

  async function assertExtractThumbnail(
    str: string,
    opts?: BinaryExtractionTaskOptions,
  ) {
    const dir = path.join(tmpdir(), "binary-" + randomChars());
    // Make sure the str (which may have non-latin characters) shows up in the
    // directory path and filename:
    const srcDir = path.join(dir, "src");
    await mkdirp(srcDir);
    const src = path.join(srcDir, str + ".jpg");
    await copyFile(path.join(testDir, "with_thumb.jpg"), src);
    const dest = path.join(dir, "dest", str + ".jpg");
    await exiftool.extractThumbnail(src, dest, opts);
    // exiftool test/with_thumb.jpg -b -ThumbnailImage | sha1sum
    expect(await sha1(dest)).to.eql("57885e5e16b16599ccf208981a87fe198612d9fb");
  }

  it("extracts expected thumb", () => assertExtractThumbnail("image"));

  for (const { str, desc } of NonAlphaStrings) {
    it("extracts expected thumb with " + desc + " characters", () =>
      assertExtractThumbnail(str),
    );
  }

  it("throws for missing src", async function () {
    this.slow(500);
    const src = path.join(testDir, "nonexistant-file.jpg");
    const dest = tmpname();
    try {
      await exiftool.extractJpgFromRaw(src, dest);
      assert.fail("expected error to be thrown");
    } catch (err) {
      expect(String(err)).to.match(/File not found/i);
    }
  });

  it("throws for missing thumb", async function () {
    this.slow(500);
    const src = path.join(testDir, "with_thumb.jpg");
    const dest = tmpname();
    try {
      await exiftool.extractJpgFromRaw(src, dest);
      assert.fail("expected error to be thrown");
    } catch (err) {
      expect(String(err)).to.match(/Error: 0 output files created/i);
    }
  });

  it("throws when output file already exists", async () => {
    const src = path.join(testDir, "with_thumb.jpg");
    const dest = tmpname();
    await writeFile(dest, "existing file");
    expect(exiftool.extractJpgFromRaw(src, dest)).to.be.rejectedWith(
      /already exists/i,
    );
  });

  it("does not throw when output file exists if `forceWrite` is true", async () => {
    return assertExtractThumbnail("image", {
      ignoreMinorErrors: true,
      forceWrite: true,
    });
  });
});
