import { writeFile } from "node:fs/promises";
import { end, expect, testImg, tmpname } from "./_chai.spec";
import { ExifDateTime } from "./ExifDateTime";
import {
  ExifTool,
  ReadRawTaskOptions,
  ReadTaskOptions,
  WriteTaskOptions,
} from "./ExifTool";
import { TagDescriptions } from "./TagDescriptions";
import { WriteTags } from "./WriteTags";

// ExifTool.jpg has a CIFF DateTimeOriginal that differs from its EXIF
// DateTimeOriginal. The MWG composite reports the EXIF value.
const NonMwgDateTimeOriginal = "1998:05:01 21:33:18";
const MwgDateTimeOriginal = "2001:05:19 18:36:41";

async function readDateTimeOriginal(et: ExifTool, file: string) {
  const t = await et.read(file);
  return (t.DateTimeOriginal as ExifDateTime).rawValue;
}

describe("ExifTool useMWG", function () {
  this.slow(1); // always show timings

  for (const useMWG of [true, false]) {
    describe(`new ExifTool({ useMWG: ${useMWG} })`, () => {
      let et: ExifTool;
      const commands: string[] = [];
      before(() => {
        et = new ExifTool({ maxProcs: 1, useMWG });
        et.batchCluster.on("taskResolved", (task) =>
          commands.push(task.command),
        );
      });
      after(() => end(et));

      it(`${useMWG ? "sends" : "never sends"} -use MWG with every command`, async () => {
        const img = await testImg({ srcBasename: "with_thumb.jpg" });
        await et.version();
        await et.read(img);
        await et.readRaw(img);
        await et.extractThumbnail(img, tmpname("thumb-") + ".jpg");
        await et.extractBinaryTagToBuffer("ThumbnailImage", img);
        await et.write(img, { Title: "title" });
        await et.editTags(img, [
          { tag: "XMP-dc:Subject", operation: "add", value: "forest" },
        ]);
        await et.rewriteAllTags(img, tmpname("rewrite-") + ".jpg");
        await et.deleteAllTags(img);
        await new TagDescriptions(et, { disableDiskCache: true }).preload();

        // TagDescriptions sends -ver and -listx:
        expect(commands).to.have.lengthOf(11);
        for (const command of commands) {
          const args = command.split("\n");
          const i = args.indexOf("-use");
          expect(i >= 0 && args[i + 1] === "MWG").to.eql(useMWG, command);
        }
      });
    });
  }

  describe("new ExifTool({ useMWG: false }) with MWG tag references", () => {
    // maxProcs: 1 makes every task run on the same ExifTool process:
    let et: ExifTool;
    beforeEach(() => (et = new ExifTool({ maxProcs: 1, useMWG: false })));
    afterEach(() => end(et));

    for (const { desc, loadMWG } of [
      {
        desc: "write() with an MWG: tag",
        loadMWG: (f: string) =>
          et.write(f, { "MWG:Description": "desc" } as WriteTags),
      },
      {
        desc: "a failed write() with an MWG: tag",
        loadMWG: (f: string) =>
          expect(
            et.write(f + ".missing", {
              "MWG:Description": "desc",
            } as WriteTags),
          ).to.be.rejectedWith(/not found/i),
      },
      {
        desc: "read() with an MWG: tag in readArgs",
        loadMWG: (f: string) =>
          et.read(f, { readArgs: ["-MWG:DateTimeOriginal"] }),
      },
      {
        desc: "readRaw() with -use MWG in readArgs",
        loadMWG: (f: string) => et.readRaw(f, { readArgs: ["-use", "MWG"] }),
      },
      // ExifTool strips leading whitespace from each argument and decodes
      // "#[CSTR]" arguments, so these load MWG too. Verified with:
      // printf '%s\n' -j -DateTimeOriginal test/ExifTool.jpg -execute1 -use " MWG" -j -DateTimeOriginal test/ExifTool.jpg -execute2 -j -DateTimeOriginal test/ExifTool.jpg -execute3 -stay_open False | perl node_modules/exiftool-vendored.pl/bin/exiftool -stay_open True -@ -
      ...[" MWG", "#[CSTR]MWG"].map((module) => ({
        desc: `readRaw() with -use ${JSON.stringify(module)} in readArgs`,
        loadMWG: (f: string) => et.readRaw(f, { readArgs: ["-use", module] }),
      })),
      // ExifTool reads more arguments from an -@ argument file, and accepts
      // U+2212 as the option prefix. Verified with an argfile of "-use\nMWG\n":
      // printf '%s\n' -j -DateTimeOriginal test/ExifTool.jpg -execute1 -j -DateTimeOriginal -@ mwg.args test/ExifTool.jpg -execute2 -j -DateTimeOriginal test/ExifTool.jpg -execute3 -stay_open False | perl node_modules/exiftool-vendored.pl/bin/exiftool -stay_open True -@ -
      ...["-@", "\u2212@"].map((option) => ({
        desc: `readRaw() with ${option} and an argument file`,
        loadMWG: async (f: string) => {
          const argfile = tmpname("mwg-") + ".args";
          await writeFile(argfile, "-use\nMWG\n");
          return et.readRaw(f, { readArgs: [option, argfile] });
        },
      })),
      {
        // The same command with -p and a format file of "$MWG:Description\n"
        // also loads MWG. readRaw() rejects, as -p output isn't JSON.
        desc: "readRaw() with -p and a format file",
        loadMWG: async (f: string) => {
          const fmtfile = tmpname("mwg-") + ".fmt";
          await writeFile(fmtfile, "$MWG:Description\n");
          return expect(
            et.readRaw(f, { readArgs: ["-p", fmtfile] }),
          ).to.be.rejectedWith(/JSON/);
        },
      },
    ]) {
      it(`replaces the ExifTool process after ${desc}`, async () => {
        const f = await testImg({ srcBasename: "ExifTool.jpg" });
        expect(await readDateTimeOriginal(et, f)).to.eql(
          NonMwgDateTimeOriginal,
        );
        const retired = new Promise<void>((resolve) =>
          et.batchCluster.on("childEnd", (_proc, why) => {
            if (why === "retired") resolve();
          }),
        );
        await loadMWG(f);
        await retired;
        expect(await readDateTimeOriginal(et, f)).to.eql(
          NonMwgDateTimeOriginal,
        );
      });
    }

    it("gives MWG results to the command that references MWG", async () => {
      const f = await testImg({ srcBasename: "ExifTool.jpg" });
      const t = await et.readRaw(f, { readArgs: ["-use", "MWG"] });
      expect(t.DateTimeOriginal).to.eql(MwgDateTimeOriginal);
    });
  });

  describe("per-call useMWG", () => {
    let et: ExifTool;
    before(() => (et = new ExifTool({ maxProcs: 1, useMWG: true })));
    after(() => end(et));

    // Per-call useMWG isn't part of the option types anymore, but JavaScript
    // callers can still pass it:
    const mismatch: object = { useMWG: false };

    for (const { method, call } of [
      {
        method: "read",
        call: (f: string) => et.read(f, mismatch as ReadTaskOptions),
      },
      {
        method: "readRaw",
        call: (f: string) => et.readRaw(f, mismatch as ReadRawTaskOptions),
      },
      {
        method: "write",
        call: (f: string) =>
          et.write(f, { Title: "title" }, mismatch as WriteTaskOptions),
      },
      {
        method: "editTags",
        call: (f: string) =>
          et.editTags(
            f,
            [{ tag: "XMP-dc:Subject", operation: "add", value: "forest" }],
            mismatch,
          ),
      },
    ]) {
      it(`${method}() rejects a useMWG that differs from the instance`, async () => {
        const f = await testImg({ srcBasename: "ExifTool.jpg" });
        await expect(call(f)).to.be.rejectedWith(/useMWG/);
      });
    }

    it("read() accepts a useMWG that matches the instance", async () => {
      const f = await testImg({ srcBasename: "ExifTool.jpg" });
      const matching: object = { useMWG: true };
      const t = await et.read(f, matching as ReadTaskOptions);
      expect((t.DateTimeOriginal as ExifDateTime).rawValue).to.eql(
        MwgDateTimeOriginal,
      );
    });
  });
});
