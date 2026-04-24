import { expect } from "./_chai.spec";
import { validateTagName } from "./TagNameValidation";

describe("TagNameValidation", () => {
  describe("validateTagName()", () => {
    describe("accepts legitimate tag names", () => {
      const valid = [
        "Artist",
        "Description",
        "XMP-dc:Title",
        "EXIF:DateTimeOriginal",
        "IPTC:By-line",
        "QuickTime:Keys:DateTimeOriginal",
        "File:FileName",
        "ThumbnailImage",
        "Orientation",
        "GPSLatitude",
        "_Private",
        "XMP-dc:Sub_Tag-Name",
        // glob patterns — shipped as numericTags defaults
        "*Duration*",
        "?mm",
        "Orientation*",
        "*:all",
        // write modifiers — force numeric, list append
        "Orientation#",
        "History+",
        "Versions+",
        "XMP:History+",
      ];
      for (const name of valid) {
        it(`accepts ${JSON.stringify(name)}`, () => {
          expect(() => validateTagName(name)).to.not.throw();
        });
      }
    });

    describe("rejects argument-injection payloads", () => {
      // From the reporter's PoC #1 (arbitrary output redirection):
      const poc1 = "XMP-dc:Title\n-o\n../exploit\n-XMP-dc:Title";
      // From the reporter's PoC #2 (arbitrary file read + write):
      const poc2 =
        "execute\n-p\n/etc/passwd\n-w!\nleak.txt\ninput.jpg\n-execute\n-Comment";

      it("rejects reporter's PoC #1 (newline -o injection)", () => {
        expect(() => validateTagName(poc1)).to.throw(/Invalid tag name/);
      });
      it("rejects reporter's PoC #2 (newline -p /etc/passwd injection)", () => {
        expect(() => validateTagName(poc2)).to.throw(/Invalid tag name/);
      });
    });

    describe("rejects control characters and metacharacters", () => {
      const invalid: [string, string][] = [
        ["", "empty string"],
        [" Artist", "leading space"],
        ["Artist ", "trailing space"],
        ["Art ist", "embedded space"],
        ["Artist\n", "trailing newline"],
        ["Artist\r", "trailing CR"],
        ["Artist\0", "NUL byte"],
        ["Artist\t", "tab"],
        ["Artist=value", "equals sign"],
        ["Artist<value", "less-than"],
        ["Artist>value", "greater-than"],
        ["Artist;rm", "semicolon"],
        ["Artist|rm", "pipe"],
        ["Artist&rm", "ampersand"],
        ["Artist$rm", "dollar sign"],
        ['Artist"rm', "double quote"],
        ["Artist'rm", "single quote"],
        ["-Artist", "leading dash"],
      ];
      for (const [name, desc] of invalid) {
        it(`rejects ${desc} ${JSON.stringify(name)}`, () => {
          expect(() => validateTagName(name)).to.throw(/Invalid/);
        });
      }
    });

    it("includes the supplied context in the error message", () => {
      expect(() => validateTagName("bad name", "retain tag name")).to.throw(
        /Invalid retain tag name/,
      );
    });

    it("rejects non-string input", () => {
      expect(() => validateTagName(undefined as unknown as string)).to.throw(
        /Invalid/,
      );
      expect(() => validateTagName(null as unknown as string)).to.throw(
        /Invalid/,
      );
      expect(() => validateTagName(123 as unknown as string)).to.throw(
        /Invalid/,
      );
    });
  });

  describe("documented workaround", () => {
    // Mirrors the workaround published in the security advisory.
    //
    // This is intentionally not the library's real validator: it is a
    // conservative pre-upgrade guard for applications that need to block the
    // known argument-injection primitive. It rejects spaces, so it is stricter
    // than necessary for filenames and should not be treated as the complete
    // tag-name grammar.
    function assertSafeForExifTool(s: string): void {
      // eslint-disable-next-line no-control-regex -- Mirrors the advisory workaround for rejecting control characters.
      if (typeof s !== "string" || /[\x00-\x20=<>]/.test(s)) {
        throw new Error("Rejected unsafe string for ExifTool");
      }
    }

    it("blocks known argument-injection delimiters", () => {
      for (const s of [
        "Artist\n-o\n../exploit",
        "Artist\r-o\r../exploit",
        "Artist\0-o\0../exploit",
        "Artist\t-o",
        "Artist=value",
        "Artist<value",
        "Artist>value",
      ]) {
        expect(() => assertSafeForExifTool(s)).to.throw(/Rejected unsafe/);
      }
    });

    it("allows simple safe strings used in the advisory examples", () => {
      for (const s of ["Artist", "XMP-dc:Title", "*Duration*", "image.jpg"]) {
        expect(() => assertSafeForExifTool(s)).not.to.throw();
      }
    });
  });
});
