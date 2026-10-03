import { end, expect, testImg, tmpname } from "./_chai.spec";
import { ExifDateTime } from "./ExifDateTime";
import {
  ExifTool,
  ReadRawTaskOptions,
  ReadTaskOptions,
  WriteTaskOptions,
} from "./ExifTool";
import { TagDescriptions } from "./TagDescriptions";

// ExifTool.jpg has a CIFF DateTimeOriginal that differs from its EXIF
// DateTimeOriginal. The MWG composite reports the EXIF value.
const MwgDateTimeOriginal = "2001:05:19 18:36:41";

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
