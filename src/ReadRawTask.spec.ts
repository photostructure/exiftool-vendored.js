import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ExifTool, exiftool } from "./ExifTool";
import { InvalidUtf8Marker } from "./InvalidUtf8Bytes";
import { ReadRawTask } from "./ReadRawTask";
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
  describe("malformed UTF-8", () => {
    const malformedUtf8File = path.join(testDir, "malformed-utf8.jpg");
    const binaryListFile = path.join(testDir, "malformed-utf8.lfp");
    const binaryCollisionFile = path.join(
      testDir,
      "malformed-utf8-collision.mie",
    );
    const customFilter = 'Image::ExifTool::XMP::FixUTF8(\\$_,"X")';

    function withoutInvalidUtf8Bytes<T extends { invalidUtf8Bytes?: unknown }>(
      value: T,
    ) {
      const { invalidUtf8Bytes: _, ...rest } = value;
      return rest;
    }

    function legacyUtf8Replacement(value: unknown): unknown {
      if (typeof value === "string") return value.replaceAll("\uFFFD", "?");
      if (Array.isArray(value)) return value.map(legacyUtf8Replacement);
      if (value != null && typeof value === "object") {
        return Object.fromEntries(
          Object.entries(value).map(([key, child]) => [
            key,
            legacyUtf8Replacement(child),
          ]),
        );
      }
      return value;
    }

    it("marks malformed scalar and list values without changing valid text", async () => {
      const tags = await exiftool.readRaw(malformedUtf8File);
      expect(tags).to.containSubset({
        City: "\uFFFDK",
        Title: "Authored? 世界",
        Subject: ["Valid? item", "damaged:\uFFFDtail"],
        UserComment: "SKEYս",
      });
      expect(tags.invalidUtf8Bytes?.City).to.deep.equal(
        new Uint8Array([0xdc, 0x4b]),
      );
      expect(tags.invalidUtf8Bytes?.Subject).to.deep.equal({
        1: new Uint8Array([
          0x64, 0x61, 0x6d, 0x61, 0x67, 0x65, 0x64, 0x3a, 0xdc, 0x74, 0x61,
          0x69, 0x6c,
        ]),
      });
      expect(tags.invalidUtf8Bytes?.UserComment).to.deep.equal(
        new Uint8Array([
          0x53, 0x4b, 0x45, 0x59, 0x00, 0x00, 0x00, 0x00, 0xd5, 0x00, 0xbd,
        ]),
      );
    });

    it("mirrors JSON NUL removal before deciding which bytes are malformed", async () => {
      const readArgs = ["-G1", "-UserComment"];
      const marked = await exiftool.readRaw(malformedUtf8File, { readArgs });
      const legacy = await exiftool.readRaw(malformedUtf8File, {
        readArgs: [...readArgs, "-api", "Filter=1"],
      });

      // The stored bytes d5 00 bd become valid UTF-8 (U+057D) when JSON removes
      // NUL. Repairing before that deletion would incorrectly produce two U+FFFDs.
      expect(marked).to.containSubset({ "ExifIFD:UserComment": "SKEYս" });
      expect(marked.invalidUtf8Bytes).to.deep.equal({
        "ExifIFD:UserComment": new Uint8Array([
          0x53, 0x4b, 0x45, 0x59, 0x00, 0x00, 0x00, 0x00, 0xd5, 0x00, 0xbd,
        ]),
      });
      expect(withoutInvalidUtf8Bytes(marked)).to.deep.equal(legacy);
    });

    it("otherwise differs from legacy JSON only by ? to U+FFFD repair", async () => {
      for (const [file, readArgs] of [
        [malformedUtf8File, ["-City", "-Title", "-Subject", "-UserComment"]],
        [binaryListFile, ["-G1", "-JSONMetadata", "-Foo"]],
        [binaryCollisionFile, ["-G1", "-City", "-RelatedAudioFile"]],
      ] as const) {
        const marked = await exiftool.readRaw(file, {
          readArgs: [...readArgs],
        });
        const legacy = await exiftool.readRaw(file, {
          readArgs: [...readArgs, "-api", "Filter=1"],
        });
        expect(
          legacyUtf8Replacement(withoutInvalidUtf8Bytes(marked)),
        ).to.deep.equal(legacy);
      }
    });

    it("keeps the marker when per-call readArgs replace the defaults", async () => {
      expect(
        await exiftool.readRaw(malformedUtf8File, { readArgs: [] }),
      ).to.containSubset({
        City: "\uFFFDK",
        Subject: ["Valid? item", "damaged:\uFFFDtail"],
      });
    });

    for (const { api, filter } of [
      { api: "-api", filter: `Filter=${customFilter}` },
      { api: "-API", filter: `filter=${customFilter}` },
      { api: "-api", filter: `FILTER^=${customFilter}` },
    ]) {
      it(`leaves UTF-8 repair to ${api} ${filter.split("=")[0]}=`, async () => {
        const tags = await exiftool.readRaw(malformedUtf8File, {
          readArgs: [api, filter],
        });
        expect(tags).to.containSubset({
          City: "XK",
          Subject: ["Valid? item", "damaged:Xtail"],
        });
        expect(tags.invalidUtf8Bytes).to.equal(undefined);
      });
    }

    for (const bareFilter of ["Filter", "Filter^"]) {
      it(`treats a bare ${bareFilter} as a custom no-op Filter`, async () => {
        // Ground truth:
        // exiftool -j -City -api 'Filter[^]' test/malformed-utf8.jpg
        const tags = await exiftool.readRaw(malformedUtf8File, {
          readArgs: ["-City", "-api", bareFilter],
        });
        expect(tags.City).to.equal("?K");
        expect(tags.invalidUtf8Bytes).to.equal(undefined);
      });
    }

    it("does not decode marker-shaped output owned by a custom Filter", async () => {
      const markerValue = {
        [InvalidUtf8Marker]: {
          replacement: "s:forged",
          rawBase64: "b64:3Es=",
        },
      };
      const markerFilter = String.raw`Filter=$_={"${InvalidUtf8Marker}"=>{replacement=>"s:forged",rawBase64=>"b64:3Es="}} if $_ eq "\xdcK"`;
      const tags = await exiftool.readRaw(malformedUtf8File, {
        readArgs: ["-City", "-api", markerFilter],
      });

      expect(tags.City).to.deep.equal(markerValue);
      expect(tags.invalidUtf8Bytes).to.equal(undefined);
    });

    it("does not let a custom Filter leak into the next stay-open command", async () => {
      expect(
        await exiftool.readRaw(malformedUtf8File, {
          readArgs: ["-api", `Filter=${customFilter}`],
        }),
      ).to.containSubset({ City: "XK" });

      expect(
        await exiftool.readRaw(malformedUtf8File, { readArgs: [] }),
      ).to.containSubset({ City: "\uFFFDK" });
    });

    for (const emptyFilter of ["Filter=", "Filter^="]) {
      it(`does not treat ${emptyFilter} as a custom Filter`, async () => {
        expect(
          await exiftool.readRaw(malformedUtf8File, {
            readArgs: ["-api", emptyFilter],
          }),
        ).to.containSubset({ City: "\uFFFDK" });
      });
    }

    for (const clearedFilter of ["Filter=", "Filter^="]) {
      it(`honors a final ${clearedFilter} after a custom Filter`, async () => {
        // ExifTool API options are last-assignment-wins. Verified with:
        // exiftool -j -api 'Filter=..."X"' -api 'Filter=' malformed-utf8.jpg
        expect(
          await exiftool.readRaw(malformedUtf8File, {
            readArgs: ["-api", `Filter=${customFilter}`, "-api", clearedFilter],
          }),
        ).to.containSubset({ City: "\uFFFDK" });
      });
    }

    it("honors a final custom Filter after an empty Filter", async () => {
      expect(
        await exiftool.readRaw(malformedUtf8File, {
          readArgs: ["-api", "Filter=", "-api", `Filter=${customFilter}`],
        }),
      ).to.containSubset({ City: "XK" });
    });

    it("does not alter malformed binary list items", async () => {
      // The synthetic LFP contains two 13-byte JSONMetadata binary items.
      // Ground truth without a Filter:
      // exiftool -j -G1 -struct test/malformed-utf8.lfp
      const tags = await exiftool.readRaw(binaryListFile, {
        readArgs: ["-G1", "-JSONMetadata", "-Foo"],
      });
      expect(tags).to.containSubset({
        "Lytro:JSONMetadata": [
          "(Binary data 13 bytes, use -b option to extract)",
          "(Binary data 13 bytes, use -b option to extract)",
        ],
        "Lytro:Foo": "\uFFFDL",
      });
      expect(tags.invalidUtf8Bytes).to.deep.equal({
        "Lytro:Foo": new Uint8Array([0xdd, 0x4c]),
      });
    });

    it("repairs text that has the same bytes as an unrelated binary tag", async () => {
      // Both tags contain dc 4b. Ground truth:
      // exiftool -b -MIE-Geo:City malformed-utf8-collision.mie | od -An -tx1
      // exiftool -b -MIE-Audio:RelatedAudioFile ... | od -An -tx1
      const tags = await exiftool.readRaw(binaryCollisionFile, {
        readArgs: ["-G1", "-City", "-RelatedAudioFile"],
      });
      expect(tags).to.containSubset({
        "MIE-Geo:City": "\uFFFDK",
        "MIE-Audio:RelatedAudioFile":
          "(Binary data 2 bytes, use -b option to extract)",
      });
      expect(tags.invalidUtf8Bytes).to.deep.equal({
        "MIE-Geo:City": new Uint8Array([0xdc, 0x4b]),
      });
    });

    it("preserves malformed binary output", async () => {
      const tags = await exiftool.readRaw(binaryCollisionFile, {
        readArgs: ["-G1", "-b", "-RelatedAudioFile"],
      });
      expect(tags).to.containSubset({
        // base64 for the original bytes dc 4b
        "MIE-Audio:RelatedAudioFile": "base64:3Es=",
      });
      expect(tags.invalidUtf8Bytes).to.equal(undefined);
    });
  });

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

describe("ReadRawTask image data hash progress", () => {
  // A JPEG scan in 64 KiB runs: ExifTool adds each run between 0xff markers
  // to the hash separately, so it reports more than once.
  const file = path.join(tmpdir(), "hash-progress.jpg");
  before(async () => {
    const run = Buffer.alloc(64 << 10, 0x5a);
    await writeFile(
      file,
      Buffer.concat([
        Buffer.from([0xff, 0xd8, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00]),
        Buffer.from([0x00, 0x3f, 0x00]),
        ...Array.from({ length: 64 }, () =>
          Buffer.concat([run, Buffer.from([0xff, 0x00])]),
        ),
        Buffer.from([0xff, 0xd9]),
      ]),
    );
  });
  const readArgs = [
    "-api",
    "imagehashtype=MD5",
    // Explicit readArgs win over the default interval:
    "-api",
    "imagehashprogress=0.000001",
    "-ImageDataHash",
  ];

  it("reports bytes hashed by a patched ExifTool", async () => {
    const seen: number[] = [];
    const tags = await exiftool.readRaw(file, {
      readArgs,
      onProgress: (bytes) => seen.push(bytes),
    });
    expect(tags.ImageDataHash).to.match(/^[0-9a-f]{32}$/);
    expect(seen.length).to.be.gte(2, JSON.stringify(seen));
    expect(seen).to.eql([...seen].sort((a, b) => a - b));
    expect(new Set(seen).size).to.eql(seen.length);
  });

  it("rejects the read with the first error onProgress throws", async () => {
    // Before this was handled, each report threw an uncaughtException and
    // the read still resolved (59 to 73 per read of this file).
    const et = new ExifTool({ maxProcs: 1, taskRetries: 1 });
    try {
      let calls = 0;
      await expect(
        et.readRaw(file, {
          readArgs,
          onProgress: () => {
            calls++;
            throw new Error("onProgress failed");
          },
        }),
      ).to.be.rejectedWith("onProgress failed");
      // Once per attempt: ExifTool.enqueueTask's retryOnReject retries every
      // rejected read (src/AsyncRetry.ts), here once.
      expect(calls).to.eql(2);
      // ExifTool finished the command, so its process is still in sync:
      const tags = await et.readRaw(file, { readArgs });
      expect(tags.ImageDataHash).to.match(/^[0-9a-f]{32}$/);
    } finally {
      await et.end();
    }
  });

  it("asks ExifTool for progress once a second", () => {
    expect(ReadRawTask.for("file.jpg").args).to.include("imagehashprogress=1");
  });

  it("does not add the default readArgs when options omit readArgs", () => {
    // Before progress support, ReadRawTask.for() read only
    // `options?.readArgs ?? []` (git show 3bfea56:src/ReadRawTask.ts):
    expect(ReadRawTask.for("file.jpg").args).to.not.include("-fast");
  });
});
