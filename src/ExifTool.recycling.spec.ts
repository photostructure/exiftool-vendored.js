import { join } from "node:path";
import { DefaultExifToolOptions } from "./DefaultExifToolOptions";
import { ExifTool } from "./ExifTool";
import { end, expect, testDir } from "./_chai.spec";

/**
 * ExifTool inherits batch-cluster's process-recycling rules. Failure-count
 * recycling in particular is wrong for a `-stay_open` ExifTool child, and
 * turning it on only shows up as a mysterious drop in throughput -- so these
 * tests pin the effective defaults rather than trusting them to stay put
 * upstream.
 */
describe("ExifTool process recycling", function () {
  this.slow(2000);

  const img = join(testDir, "img.jpg");
  const missing = join(testDir, "no-such-file");

  describe("maxFailedTasksPerProcess", () => {
    it("defaults to 0 (disabled)", () => {
      expect(DefaultExifToolOptions.maxFailedTasksPerProcess).to.eql(0);
    });

    it("keeps one child process across many per-file read errors", async function () {
      this.timeout(30_000);
      const et = new ExifTool({ maxProcs: 1 });
      try {
        for (let i = 0; i < 4; i++) {
          await expect(et.read(`${missing}-${i}.jpg`)).to.be.rejectedWith(
            /file not found/i,
          );
        }
        // A bad file is not a sick child: ExifTool emits `{ready}` after a
        // per-file error and keeps working, so nothing should have been
        // respawned or reported as "broken".
        expect(et.spawnedProcs).to.eql(1);
        expect(et.childEndCounts()).to.not.have.property("broken");

        // ...and the same child still services real work:
        expect((await et.read(img)).Model).to.eql("iPhone 7 Plus");
        expect(et.spawnedProcs).to.eql(1);
      } finally {
        await end(et);
      }
    });

    it("recycles the child as broken when explicitly enabled", async function () {
      // Characterizes the upstream rule we leave disabled: if this stops
      // recycling, batch-cluster's failure counter has gone inert again (it was
      // a no-op before batch-cluster v19) and the default above stops mattering.
      this.timeout(30_000);
      const et = new ExifTool({ maxProcs: 1, maxFailedTasksPerProcess: 2 });
      try {
        for (let i = 0; i < 2; i++) {
          await expect(et.read(`${missing}-${i}.jpg`)).to.be.rejectedWith(
            /file not found/i,
          );
        }
        // `taskRetries` defaults to 1, so each read above fails twice, hitting
        // the limit of 2 on its first bad file.
        expect(et.childEndCounts().broken).to.be.gte(1);
        expect(et.spawnedProcs).to.be.gte(2);
      } finally {
        await end(et);
      }
    });
  });

  describe("killProcessGroup", () => {
    it("defaults to false", () => {
      // The default processFactory spawns non-detached children, so there is no
      // process group to signal.
      expect(DefaultExifToolOptions.killProcessGroup).to.eql(false);
    });

    it("still terminates a non-detached child when enabled", async function () {
      // batch-cluster falls back to signalling the pid directly when `-pid`
      // names no group, so enabling this against the default factory is
      // pointless but must not leak processes.
      this.timeout(30_000);
      const et = new ExifTool({ maxProcs: 1, killProcessGroup: true });
      try {
        expect((await et.read(img)).Model).to.eql("iPhone 7 Plus");
        expect(et.pids).to.have.lengthOf(1);
      } finally {
        await end(et);
      }
      expect(et.pids).to.eql([]);
    });
  });
});
