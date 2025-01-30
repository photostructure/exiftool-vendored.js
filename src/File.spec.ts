import { writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { expect, tmpname } from "./_chai.spec";
import { compareFilePaths, isFileEmpty, isPlatformCaseSensitive } from "./File";
import { isWin32 } from "./IsWin32";

describe("File", () => {
  describe("isFileEmpty()", () => {
    it("returns true for non-existent file", async () => {
      const path = tmpname();
      expect(await isFileEmpty(path)).to.eql(true);
    });

    it("returns true for empty file", async () => {
      const path = tmpname();
      await writeFile(path, "");
      expect(await isFileEmpty(path)).to.eql(true);
    });

    it("returns false for non-empty file", async () => {
      const path = tmpname();
      await writeFile(path, "content");
      expect(await isFileEmpty(path)).to.eql(false);
    });

    it("throws error for blank path", async () => {
      await expect(isFileEmpty("")).to.be.rejectedWith(
        "isFileEmpty(): blank path",
      );
    });
  });

  describe("compareFilePaths()", () => {
    it("returns true for identical paths", () => {
      const path = "/some/path/file.txt";
      expect(compareFilePaths(path, path)).to.eql(true);
    });

    it("returns true for normalized paths", () => {
      expect(
        compareFilePaths(
          join(homedir(), "file"),
          join(homedir(), "dir", "..", "file"),
        ),
      ).to.eql(true);
    });

    it("returns true for case-sensitive paths", () => {
      expect(compareFilePaths("/path/to/file", "/path/to/file")).to.eql(true);
    });

    it("returns !isPlatformCaseSensitive() for case-insensitive-matching paths", () => {
      expect(compareFilePaths("/PATH/TO/FILE", "/path/to/file")).to.eql(
        !isPlatformCaseSensitive(),
      );
    });

    if (isWin32()) {
      it("handles different path separators on Windows", () => {
        expect(compareFilePaths("/path/to/file", "\\path\\to/file")).to.eql(
          true,
        );
      });
    }

    it("returns false for different paths", () => {
      expect(compareFilePaths("/path/to/file1", "/path/to/file2")).to.eql(
        false,
      );
    });
  });
});
