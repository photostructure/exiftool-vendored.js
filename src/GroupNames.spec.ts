import { join } from "node:path";
import { end, expect, testDir, tmpdir } from "./_chai.spec";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTool } from "./ExifTool";
import { ExifToolVendoredTagNames } from "./ExifToolVendoredTags";
import { GroupedTags, tag } from "./GroupedTags";
import { InvalidUtf8Marker } from "./InvalidUtf8Bytes";
import { ReadTask, ReadTaskOptions } from "./ReadTask";
import { Tags } from "./Tags";

const SourceFile = join(tmpdir(), "example.jpg");

/**
 * Pretend that ExifTool rendered `args.tags`: this is the same parse harness
 * as ReadTask.spec.ts, but defaults to group-prefixed (`-G`) input via
 * `readArgs`.
 */
function parse(
  args: {
    tags: object;
    error?: Error;
    SourceFile?: string;
  } & Partial<ReadTaskOptions>,
): Tags {
  const tt = ReadTask.for(args.SourceFile ?? SourceFile, {
    defaultVideosToUTC: true,
    backfillTimezones: true,
    ...args,
  });
  const json = JSON.stringify([{ ...args.tags, SourceFile }]);
  return tt.parse(json, args.error);
}

describe("GroupNames (-G) support", () => {
  describe("errors and warnings", () => {
    it("reads bare Error/Warning JSON fields (bare mode)", () => {
      const t = parse({ tags: { Error: "boom", Warning: "meh" } });
      expect(t.errors).to.eql(["boom"]);
      expect(t.warnings).to.eql(["meh"]);
    });

    it("reads ExifTool:Error/ExifTool:Warning JSON fields (-G mode)", () => {
      const t = parse({
        tags: { "ExifTool:Error": "boom", "ExifTool:Warning": "meh" },
        readArgs: ["-G"],
      });
      expect(t.errors).to.eql(["boom"]);
      expect(t.warnings).to.eql(["meh"]);
    });

    it("keeps the prefixed Error/Warning tags verbatim in -G mode", () => {
      const t = parse({
        tags: { "ExifTool:Error": "boom", "ExifTool:Warning": "meh" },
        readArgs: ["-G"],
      }) as Record<string, unknown>;
      expect(t["ExifTool:Error"]).to.eql("boom");
      expect(t["ExifTool:Warning"]).to.eql("meh");
    });
  });

  describe("ExifToolVersion preservation", () => {
    // We can't use the parse() harness here: we need specific control of the
    // JSON formatting (ExifTool emits significant trailing zeros in the
    // version number).
    it("preserves trailing zero for ExifTool:ExifToolVersion under -G", () => {
      const tt = ReadTask.for(SourceFile, { readArgs: ["-G"] });
      const json = `[{"SourceFile":${JSON.stringify(SourceFile)},"ExifTool:ExifToolVersion":13.30}]`;
      const result = tt.parse(json) as Record<string, unknown>;
      expect(result["ExifTool:ExifToolVersion"]).to.be.a("string");
      expect(result["ExifTool:ExifToolVersion"]).to.eql("13.30");
      // the bare key must not appear: prefixed input stays prefixed
      expect(result.ExifToolVersion).to.eql(undefined);
    });

    it("handles JSON whitespace variants for the prefixed key", () => {
      for (const jsonStr of [
        '"ExifTool:ExifToolVersion":12.3',
        '"ExifTool:ExifToolVersion": 12.3',
        '"ExifTool:ExifToolVersion" : 12.3',
      ]) {
        const tt = ReadTask.for(SourceFile, { readArgs: ["-G"] });
        const json = `[{"SourceFile":${JSON.stringify(SourceFile)},${jsonStr}}]`;
        const result = tt.parse(json) as Record<string, unknown>;
        expect(result["ExifTool:ExifToolVersion"]).to.eql("12.3");
      }
    });

    it("still preserves the bare ExifToolVersion (bare mode)", () => {
      const tt = ReadTask.for(SourceFile, {});
      const json = `[{"SourceFile":${JSON.stringify(SourceFile)},"ExifToolVersion":12.30}]`;
      const result = tt.parse(json);
      expect(result.ExifToolVersion).to.eql("12.30");
    });
  });

  describe("groupNames option", () => {
    function gArgs(opts: Partial<ReadTaskOptions>): string[] {
      return ReadTask.for(SourceFile, opts).args.filter(
        (ea) => ea === "-G" || ea === "-G1",
      );
    }

    it("does not add -G by default", () => {
      expect(gArgs({})).to.eql([]);
    });

    it("groupNames: true adds -G", () => {
      expect(gArgs({ groupNames: true })).to.eql(["-G"]);
    });

    it("groupNames: true with readArgs: ['-G'] doesn't double up -G", () => {
      expect(gArgs({ groupNames: true, readArgs: ["-G"] })).to.eql(["-G"]);
    });

    it("groupNames: false still honors readArgs: ['-G']", () => {
      expect(gArgs({ groupNames: false, readArgs: ["-G"] })).to.eql(["-G"]);
    });

    it("groupNames: true degroups for tz heuristics", () => {
      const t = parse({
        tags: {
          "EXIF:OffsetTimeOriginal": "+03:30",
          "EXIF:DateTimeOriginal": "2016:08:12 13:28:50",
        },
        groupNames: true,
      });
      expect(t).to.containSubset({
        tz: "UTC+3:30",
        tzSource: "OffsetTimeOriginal",
      });
    });

    it("readArgs: ['-G'] alone still degroups (back-compat)", () => {
      const t = parse({
        tags: {
          "EXIF:OffsetTimeOriginal": "+03:30",
          "EXIF:DateTimeOriginal": "2016:08:12 13:28:50",
        },
        readArgs: ["-G"],
      });
      expect(t).to.containSubset({
        tz: "UTC+3:30",
        tzSource: "OffsetTimeOriginal",
      });
    });

    it("groupNames: false with readArgs: ['-G'] still degroups (back-compat)", () => {
      const t = parse({
        tags: {
          "EXIF:OffsetTimeOriginal": "+03:30",
          "EXIF:DateTimeOriginal": "2016:08:12 13:28:50",
        },
        groupNames: false,
        readArgs: ["-G"],
      });
      expect(t).to.containSubset({
        tz: "UTC+3:30",
        tzSource: "OffsetTimeOriginal",
      });
    });

    it("readArgs: ['-G1'] still does NOT degroup (back-compat)", () => {
      const t = parse({
        tags: {
          "IFD0:OffsetTimeOriginal": "+03:30",
          "IFD0:DateTimeOriginal": "2016:08:12 13:28:50",
        },
        readArgs: ["-G1"],
      });
      expect(t.tz).to.eql(undefined);
      expect(t.tzSource).to.eql(undefined);
    });
  });

  describe("zoneSource", () => {
    it("is set alongside tzSource in bare mode", () => {
      const t = parse({
        tags: {
          OffsetTimeOriginal: "+03:30",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      });
      expect(t.zone).to.eql("UTC+3:30");
      expect(t.tzSource).to.eql("OffsetTimeOriginal");
      expect(t.zoneSource).to.eql("OffsetTimeOriginal");
    });

    it("is set alongside tzSource in -G mode", () => {
      const t = parse({
        tags: {
          "EXIF:OffsetTimeOriginal": "+03:30",
          "EXIF:DateTimeOriginal": "2016:08:12 13:28:50",
        },
        groupNames: true,
      });
      expect(t.zone).to.eql("UTC+3:30");
      expect(t.zoneSource).to.eql("OffsetTimeOriginal");
    });
  });

  describe("GPS and synthetic-tag contract under -G", () => {
    const ValidGps = {
      "EXIF:GPSLatitude": 33.451856,
      "EXIF:GPSLatitudeRef": "S",
      "EXIF:GPSLongitude": 70.650466,
      "EXIF:GPSLongitudeRef": "W",
    };

    it("valid GPS: bare quartet and prefixed keys are both sign-corrected", () => {
      const t = parse({ tags: ValidGps, groupNames: true }) as Record<
        string,
        unknown
      >;
      // bare keys are the library's parsed, validated namespace:
      expect(t.GPSLatitude).to.eql(-33.451856);
      expect(t.GPSLongitude).to.eql(-70.650466);
      expect(t.GPSLatitudeRef).to.eql("S");
      expect(t.GPSLongitudeRef).to.eql("W");
      // prefixed keys also carry the validated sign-corrected values:
      expect(t["EXIF:GPSLatitude"]).to.eql(-33.451856);
      expect(t["EXIF:GPSLongitude"]).to.eql(-70.650466);
      expect(t["EXIF:GPSLatitudeRef"]).to.eql("S");
      expect(t["EXIF:GPSLongitudeRef"]).to.eql("W");
    });

    it("invalid GPS: no GPS keys anywhere", () => {
      const t = parse({
        tags: { "EXIF:GPSLatitude": 999, "EXIF:GPSLongitude": 1 },
        groupNames: true,
      }) as Record<string, unknown>;
      for (const k of [
        "GPSLatitude",
        "GPSLongitude",
        "EXIF:GPSLatitude",
        "EXIF:GPSLongitude",
      ]) {
        expect(t[k]).to.eql(undefined, k);
      }
    });

    it("(0, 0) GPS with default ignoreZeroZeroLatLon: no GPS keys anywhere", () => {
      const t = parse({
        tags: { "EXIF:GPSLatitude": 0, "EXIF:GPSLongitude": 0 },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t.GPSLatitude).to.eql(undefined);
      expect(t["EXIF:GPSLatitude"]).to.eql(undefined);
    });

    it("uses ExifTool:GeolocationTimeZone for zone inference and keeps the prefixed tag verbatim", () => {
      const t = parse({
        tags: {
          ...ValidGps,
          "ExifTool:GeolocationTimeZone": "America/Santiago",
        },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t.zone).to.eql("America/Santiago");
      expect(t.tzSource).to.eql("GeolocationTimeZone");
      expect(t.zoneSource).to.eql("GeolocationTimeZone");
      expect(t["ExifTool:GeolocationTimeZone"]).to.eql("America/Santiago");
    });

    it("falls back to geoTz when ExifTool:GeolocationTimeZone is invalid", () => {
      const t = parse({
        tags: {
          ...ValidGps,
          "ExifTool:GeolocationTimeZone": "Not/AZone",
        },
        groupNames: true,
      });
      expect(t.zone).to.eql("America/Santiago");
      expect(t.tzSource).to.eql("GPSLatitude/GPSLongitude");
    });

    it("parses EXIF:SubSecDateTimeOriginal into an ExifDateTime with the inferred zone", () => {
      const t = parse({
        tags: {
          "EXIF:SubSecDateTimeOriginal": "2016:08:12 13:28:50.123",
          "EXIF:OffsetTimeOriginal": "+03:30",
        },
        groupNames: true,
      }) as Record<string, unknown>;
      const dt = t["EXIF:SubSecDateTimeOriginal"] as ExifDateTime;
      expect(dt).to.be.instanceOf(ExifDateTime);
      expect(dt).to.containSubset({
        year: 2016,
        month: 8,
        day: 12,
        hour: 13,
        minute: 28,
        second: 50,
        millisecond: 123,
        zone: "UTC+3:30",
      });
      // and no bare SubSecDateTimeOriginal:
      expect(t.SubSecDateTimeOriginal).to.eql(undefined);
    });

    it("recurses into structs under prefixed keys", () => {
      const t = parse({
        tags: {
          "XMP:RegionInfo": {
            AppliedToDimensions: { W: 640, H: 480, Unit: "pixel" },
            RegionList: [
              {
                Area: { X: 0.35, Y: 0.4, W: 0.25, H: 0.35, Unit: "normalized" },
                Name: "Alice Smith",
                Type: "Face",
              },
            ],
          },
        },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t["XMP:RegionInfo"]).to.containSubset({
        AppliedToDimensions: { W: 640, H: 480, Unit: "pixel" },
      });
      expect((t["XMP:RegionInfo"] as any).RegionList[0]).to.containSubset({
        Name: "Alice Smith",
        Type: "Face",
      });
      expect(t.RegionInfo).to.eql(undefined);
    });

    it("keys invalidUtf8Bytes by the prefixed tag path", () => {
      const t = parse({
        tags: {
          "IPTC:City": {
            [InvalidUtf8Marker]: {
              replacement: "s:\uFFFDK",
              rawBase64: "b64:3Es=",
            },
          },
        },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t["IPTC:City"]).to.eql("\uFFFDK");
      expect(t.City).to.eql(undefined);
      expect(
        (t.invalidUtf8Bytes as Record<string, unknown>)["IPTC:City"],
      ).to.deep.equal(new Uint8Array([0xdc, 0x4b]));
    });

    it("prunes invalidUtf8Bytes paths for tags rejected by invalid GPS", () => {
      const t = parse({
        tags: {
          "EXIF:GPSLatitude": 999,
          "EXIF:GPSLongitude": 1,
          "EXIF:GPSProcessingMethod": {
            [InvalidUtf8Marker]: {
              replacement: "s:\uFFFDGPS",
              rawBase64: "b64:3EdQUw==",
            },
          },
        },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t["EXIF:GPSProcessingMethod"]).to.eql(undefined);
      expect(t.invalidUtf8Bytes).to.eql(undefined);
    });

    it("keeps colliding tag names from different groups verbatim", () => {
      const t = parse({
        tags: {
          "EXIF:MeteringMode": "Multi-segment",
          "MakerNotes:MeteringMode": "Pattern",
        },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t["EXIF:MeteringMode"]).to.eql("Multi-segment");
      expect(t["MakerNotes:MeteringMode"]).to.eql("Pattern");
      // ExifTool's raw values are not degrouped into bare keys:
      expect(t.MeteringMode).to.eql(undefined);
    });

    it("does not leak bare keys for prefixed input", () => {
      const t = parse({
        tags: { "EXIF:Make": "Canon" },
        groupNames: true,
      }) as Record<string, unknown>;
      expect(t["EXIF:Make"]).to.eql("Canon");
      expect(t.Make).to.eql(undefined);
    });
  });

  describe("GroupedTags and tag()", () => {
    const grouped = parse({
      tags: {
        "EXIF:Make": "Canon",
        "EXIF:MeteringMode": "Multi-segment",
        "MakerNotes:MeteringMode": "Pattern",
        "EXIF:GPSLatitude": 33.451856,
        "EXIF:GPSLatitudeRef": "S",
        "EXIF:GPSLongitude": 70.650466,
        "EXIF:GPSLongitudeRef": "W",
        "EXIF:OffsetTimeOriginal": "+03:30",
        "EXIF:DateTimeOriginal": "2016:08:12 13:28:50",
      },
      groupNames: true,
    }) as GroupedTags;

    const bare = parse({
      tags: { Make: "Canon", MeteringMode: "Pattern" },
    });

    it("looks up exact prefixed keys with inferred types", () => {
      // these assignments are also compile-time type assertions:
      const make: string | undefined = tag(grouped, "EXIF:Make");
      expect(make).to.eql("Canon");
      const mm: number | string | undefined = tag(grouped, "EXIF:MeteringMode");
      expect(mm).to.eql("Multi-segment");
      expect(tag(grouped, "MakerNotes:MeteringMode")).to.eql("Pattern");
    });

    it("looks up library (bare) keys in -G mode", () => {
      // GPSLatitude is typed as the union of the validated bare key (number)
      // and the raw Tags declaration (number | string), because the
      // degrouped fallback can surface an unvalidated raw value:
      const lat: number | string | undefined = tag(grouped, "GPSLatitude");
      expect(lat).to.eql(-33.451856);
      const zone: string | undefined = tag(grouped, "zone");
      expect(zone).to.eql("UTC+3:30");
    });

    it("degroup fallback can surface a raw (string) GPS value from a partial position", () => {
      // A partial GPS position (no longitude) isn't validated, so the raw
      // value passes through under its prefixed key only:
      const partial = parse({
        tags: { "EXIF:GPSLatitude": "33 deg 27' 3.4\" N" },
        groupNames: true,
      }) as GroupedTags;
      expect(partial.GPSLatitude).to.eql(undefined);
      expect(tag(partial, "GPSLatitude")).to.eql("33 deg 27' 3.4\" N");
    });

    it("degroups bare names in -G mode (last group wins)", () => {
      const make: string | undefined = tag(grouped, "Make");
      expect(make).to.eql("Canon");
      // EXIF:MeteringMode is listed before MakerNotes:MeteringMode, so
      // last-wins matches ReadTask's degrouped view:
      expect(tag(grouped, "MeteringMode")).to.eql("Pattern");
    });

    it("falls back to the bare name for a prefixed lookup of bare-mode tags", () => {
      expect(tag(bare, "EXIF:Make")).to.eql("Canon");
      expect(tag(bare, "Make")).to.eql("Canon");
    });

    it("does not resolve a prefixed name from a different group", () => {
      expect(tag(grouped, "XMP:Rating")).to.eql(undefined);
      // and a prefixed name doesn't match another group's identically-named
      // tag in -G mode:
      expect(tag(grouped, "Composite:Make" as never)).to.eql(undefined);
    });

    it("tolerates nullish tag objects", () => {
      expect(tag(undefined, "Make")).to.eql(undefined);
      expect(tag(null as unknown as undefined, "Make")).to.eql(undefined);
    });

    it("GroupedTags types library-namespace and prefixed keys", () => {
      // compile-time assertions:
      const zone: string | undefined = grouped.zone;
      const errors: string[] | undefined = grouped.errors;
      const lat: number | undefined = grouped.GPSLatitude;
      const make: string | undefined = grouped["EXIF:Make"];
      const version: string | undefined = grouped["ExifTool:ExifToolVersion"];
      const sourceFile: string | undefined = grouped.SourceFile;
      expect(sourceFile).to.eql(SourceFile);
      expect({ zone, errors, lat, make, version }).to.be.an("object");
    });
  });

  describe("live differential: bare vs groupNames", () => {
    let exiftool: ExifTool;
    before(() => (exiftool = new ExifTool()));
    after(() => end(exiftool));

    /**
     * The documented bare-key namespace under -G: everything else must be
     * `Group:TagName`-prefixed. See {@link UngroupedVendoredTags}.
     */
    const LibraryBareKeys = new Set<string>([
      "SourceFile",
      ...ExifToolVendoredTagNames.values,
      "GPSLatitude",
      "GPSLatitudeRef",
      "GPSLongitude",
      "GPSLongitudeRef",
    ]);

    for (const name of [
      "oly.jpg",
      "pixel.jpg",
      "truncated.jpg",
      "iphone-export-1.xmp",
    ]) {
      it(`${name}: obeys the group-names output contract`, async () => {
        const file = join(testDir, name);
        const bare: Tags = await exiftool.read(file);
        // this assignment is also a compile-time check of the read() overload:
        const g: GroupedTags = await exiftool.read(file, { groupNames: true });

        // (a) every bare key in -G output is in the library's namespace:
        for (const key of Object.keys(g)) {
          if (!key.includes(":")) {
            expect(LibraryBareKeys.has(key)).to.eql(
              true,
              `unexpected bare key ${key}`,
            );
          }
        }

        // (b) errors and warnings match across modes:
        expect(g.errors).to.eql(bare.errors);
        expect(g.warnings).to.eql(bare.warnings);

        // (c) timezone extraction matches across modes:
        expect(g.zone).to.eql(bare.zone);
        expect(g.tz).to.eql(bare.tz);
        expect(g.tzSource).to.eql(bare.tzSource);
        expect(g.zoneSource).to.eql(bare.zoneSource);

        // (d) the degrouped -G keyset is a superset of the bare-mode keys:
        const degrouped = new Set(
          Object.keys(g).map((ea) => ea.split(":")[1] ?? ea),
        );
        for (const key of Object.keys(bare)) {
          expect(degrouped.has(key)).to.eql(
            true,
            `bare-mode key ${key} missing from groupNames read`,
          );
        }

        // (e) ExifToolVersion is preserved as a string under -G:
        const version = g["ExifTool:ExifToolVersion"];
        expect(version).to.be.a("string");
        expect(version).to.eql(await exiftool.version());
      });
    }

    it("readRaw aggregates ExifTool:Warning into warnings under -G", async () => {
      const raw = await exiftool.readRaw(join(testDir, "truncated.jpg"), {
        readArgs: ["-G", "-fast"],
      });
      expect(raw.warnings).to.include("JPEG format error");
      expect((raw as Record<string, unknown>)["ExifTool:Warning"]).to.eql(
        "JPEG format error",
      );
    });
  });
});
