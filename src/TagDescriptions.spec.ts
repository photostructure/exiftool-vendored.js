import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { end, expect, randomChars } from "./_chai.spec";
import { exiftool } from "./ExifTool";
import { TagDescriptions } from "./TagDescriptions";

after(() => end(exiftool));

describe("TagDescriptions", function () {
  this.slow(5000);
  this.timeout(30000);

  // Tests that need fresh unloaded state for each test
  describe("loading behavior", () => {
    let descriptions: TagDescriptions;
    let testCacheDir: string;

    beforeEach(function () {
      testCacheDir = join(tmpdir(), "exiftool-test-" + randomChars());
      mkdirSync(testCacheDir, { recursive: true });
      descriptions = new TagDescriptions(exiftool, {
        cacheDir: testCacheDir,
      });
    });

    afterEach(() => {
      descriptions.clear();
      if (existsSync(testCacheDir)) {
        rmSync(testCacheDir, { recursive: true, force: true });
      }
    });

    it("starts unloaded and loads descriptions from ExifTool", async () => {
      expect(descriptions.isLoaded).to.equal(false);
      await descriptions.preload();
      expect(descriptions.isLoaded).to.equal(true);
      expect(descriptions.size).to.be.greaterThan(1000);
    });

    it("get() returns curated descriptions even when not loaded", () => {
      // Curated descriptions are available immediately without preload
      expect(descriptions.get("DateTimeOriginal")).to.not.equal(undefined);
      // But non-curated tags require loading (use a rare tag not in CuratedDescriptions)
      expect(descriptions.get("BitsPerSample")).to.equal(undefined);
    });

    it("getAsync() auto-loads descriptions for non-curated tags", async () => {
      expect(descriptions.isLoaded).to.equal(false);
      // Use a non-curated tag to verify auto-loading (BitsPerSample is in ExifTool but not curated)
      const desc = await descriptions.getAsync("BitsPerSample");
      expect(descriptions.isLoaded).to.equal(true);
      expect(desc).to.not.equal(undefined);
    });

    it("clear() clears the in-memory cache", async () => {
      await descriptions.preload();
      expect(descriptions.isLoaded).to.equal(true);
      descriptions.clear();
      expect(descriptions.isLoaded).to.equal(false);
    });
  });

  // Tests that need fresh cache directories
  describe("caching", () => {
    let descriptions: TagDescriptions;
    let testCacheDir: string;

    beforeEach(function () {
      testCacheDir = join(tmpdir(), "exiftool-test-" + randomChars());
      mkdirSync(testCacheDir, { recursive: true });
      descriptions = new TagDescriptions(exiftool, {
        cacheDir: testCacheDir,
      });
    });

    afterEach(() => {
      descriptions.clear();
      if (existsSync(testCacheDir)) {
        rmSync(testCacheDir, { recursive: true, force: true });
      }
    });

    it("creates cache file after first load", async () => {
      await descriptions.preload();
      const files = readdirSync(testCacheDir);
      expect(files.length).to.equal(1);
      expect(files[0]).to.match(/^tag-descriptions-.*\.json$/);
    });

    it("loads from cache on second instantiation", async () => {
      await descriptions.preload();
      const size1 = descriptions.size;

      const descriptions2 = new TagDescriptions(exiftool, {
        cacheDir: testCacheDir,
      });
      await descriptions2.preload();
      expect(descriptions2.size).to.equal(size1);
    });

    it("respects disableDiskCache option", async () => {
      const noCacheDir = join(tmpdir(), "exiftool-nocache-" + randomChars());
      mkdirSync(noCacheDir, { recursive: true });

      try {
        const noCacheDescriptions = new TagDescriptions(exiftool, {
          cacheDir: noCacheDir,
          disableDiskCache: true,
        });
        await noCacheDescriptions.preload();

        const files = readdirSync(noCacheDir);
        expect(files.length).to.equal(0);
      } finally {
        rmSync(noCacheDir, { recursive: true, force: true });
      }
    });
  });

  // Tests that just need loaded data - share one instance
  describe("with loaded descriptions", () => {
    let descriptions: TagDescriptions;
    let testCacheDir: string;

    before(async function () {
      testCacheDir = join(tmpdir(), "exiftool-test-" + randomChars());
      mkdirSync(testCacheDir, { recursive: true });
      descriptions = new TagDescriptions(exiftool, {
        cacheDir: testCacheDir,
      });
    });

    after(() => {
      descriptions.clear();
      if (existsSync(testCacheDir)) {
        rmSync(testCacheDir, { recursive: true, force: true });
      }
    });

    it("preload() is idempotent", async () => {
      await descriptions.preload();
      const size1 = descriptions.size;
      await descriptions.preload();
      expect(descriptions.size).to.equal(size1);
    });

    it("getAsync() returns curated descriptions for important tags", async () => {
      const desc = await descriptions.getAsync("DateTimeOriginal");
      expect(desc).to.not.equal(undefined);
      expect(desc!.desc).to.include("photo was taken");
      expect(desc!.see).to.include("exiftool.org");
    });

    it("get() returns ExifTool descriptions for standard tags", async () => {
      const desc = await descriptions.getAsync("ImageWidth");
      expect(desc).to.not.equal(undefined);
      expect(desc!.desc.length).to.be.greaterThan(0);
    });

    it("getAsync() returns undefined for unknown tags", async () => {
      expect(await descriptions.getAsync("NotARealTagName12345")).to.equal(
        undefined,
      );
    });

    it("get() returns undefined for unknown tags", async () => {
      await descriptions.preload();
      expect(descriptions.get("NotARealTagName12345")).to.equal(undefined);
    });

    it("getAll() returns all descriptions", async () => {
      const all = await descriptions.getAll();
      expect(all.size).to.be.greaterThan(1000);
      expect(all.get("DateTimeOriginal")).to.not.equal(undefined);
    });

    it("decodes XML entities without double-unescaping", async () => {
      const all = await descriptions.getAll();
      for (const [tag, info] of all) {
        expect(info.desc, `${tag} has undecoded entity`).to.not.match(
          /&(?:lt|gt|amp|quot|apos);/,
        );
      }
    });

    // Curated description tests - verify our curated descriptions are used
    const curatedTags = [
      "DateTimeOriginal",
      "CreateDate",
      "ModifyDate",
      "Copyright",
      "Description",
      "Keywords",
      "Rating",
      "Orientation",
      "GPSLatitudeRef",
      "GPSLongitudeRef",
      "Make",
      "Model",
      "ISO",
    ];

    for (const tag of curatedTags) {
      it(`getAsync has curated description for ${tag}`, async () => {
        const desc = await descriptions.getAsync(tag);
        expect(desc, `Missing description for ${tag}`).to.not.equal(undefined);
        expect(desc!.desc.length).to.be.greaterThan(50);
      });
    }
  });

  describe("non-English language", () => {
    let descriptions: TagDescriptions;
    let testCacheDir: string;

    before(async function () {
      testCacheDir = join(tmpdir(), "exiftool-test-de-" + randomChars());
      mkdirSync(testCacheDir, { recursive: true });
      descriptions = new TagDescriptions(exiftool, {
        cacheDir: testCacheDir,
        language: "de",
      });
      await descriptions.preload();
    });

    after(() => {
      descriptions.clear();
      if (existsSync(testCacheDir)) {
        rmSync(testCacheDir, { recursive: true, force: true });
      }
    });

    it("uses ExifTool descriptions instead of curated ones for non-English", async () => {
      const desc = await descriptions.getAsync("DateTimeOriginal");
      expect(desc).to.not.equal(undefined);
      // Our curated description contains "photo was taken" - ExifTool's German one won't
      expect(desc!.desc).to.not.include("photo was taken");
      // Should have some German description from ExifTool
      expect(desc!.desc.length).to.be.greaterThan(0);
    });

    it("get() also uses ExifTool descriptions for non-English", () => {
      const desc = descriptions.get("DateTimeOriginal");
      expect(desc).to.not.equal(undefined);
      expect(desc!.desc).to.not.include("photo was taken");
    });

    it("does not include 'see' URLs from curated descriptions", async () => {
      const desc = await descriptions.getAsync("DateTimeOriginal");
      expect(desc).to.not.equal(undefined);
      // Our curated descriptions have 'see' URLs, ExifTool's don't
      expect(desc!.see).to.equal(undefined);
    });
  });
});
