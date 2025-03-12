import { existsSync } from "node:fs";
import {
  UnicodeTestMessage,
  assertEqlDateish,
  end,
  expect,
  randomChars,
  testFile,
  testImg,
} from "./_chai.spec";
import { toArray } from "./Array";
import { parseCoordinates } from "./CoordinateParser";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTool, WriteTaskOptions } from "./ExifTool";
import { isExifToolTag } from "./ExifToolTags";
import {
  ExifToolVendoredTags,
  isExifToolVendoredTag,
} from "./ExifToolVendoredTags";
import { isFileEmpty } from "./File";
import { isFileTag } from "./FileTags";
import { omit } from "./Object";
import { ResourceEvent } from "./ResourceEvent";
import { isSidecarExt } from "./Sidecars";
import { stripSuffix } from "./String";
import { Struct } from "./Struct";
import { ExifToolTags, FileTags, Tags } from "./Tags";
import { Version } from "./Version";
import { WriteTags } from "./WriteTags";

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe("WriteTask", function () {
  this.slow(1); // always show timings

  const ImageExifData = {
    UserComment: "This is a user comment added by exiftool.",
    Artist: "Arturo DeImage",
    Copyright: "© Chuckles McSnortypants, Inc.",
    Credit: "photo by Jenny Snapsalot",
  };

  for (const opts of [
    { maxProcs: 1, maxRetries: 0, useMWG: true },
    { maxProcs: 3, maxRetries: 3, useMWG: false },
  ]) {
    describe(`new ExifTool(${JSON.stringify(opts)})`, () => {
      const exiftool = new ExifTool(opts);
      after(() => end(exiftool));

      describe("with empty WriteTags", () => {
        it("resolves with no options", async () => {
          const f = await testImg();
          const result = await exiftool.write(f, {});
          expect(toArray(result.warnings)).to.eql([]);
          expect(result.unchanged).to.eql(1);
        });
        it("resolves writeArgs: -overwrite_original", async () => {
          const f = await testImg();
          const result = await exiftool.write(
            f,
            {},
            { writeArgs: ["-overwrite_original"] },
          );
          expect(toArray(result.warnings)).to.eql([]);
          expect(result.unchanged).to.eql(1);
        });
      });

      describe("MWG composite tags", () => {
        it("round-trips Creator", async () => {
          const f = await testImg();
          const Creator = "Ms " + randomChars(5) + " " + randomChars(5);
          await exiftool.write(f, { Creator });
          const t = await exiftool.read(f);
          if (opts.useMWG) {
            expect(t.Creator).to.eql(Creator, ".Creator");
            expect(t.Artist).to.eql(Creator, ".Artist");
          } else {
            expect(t.Creator).to.eql([Creator], ".Creator");
            expect(t.Artist).to.eql(undefined, ".Artist");
          }
        });

        it("round-trips Description", async () => {
          const f = await testImg();
          const Description = "new description " + randomChars(8);
          await exiftool.write(f, { Description });
          const t = await exiftool.read(f);
          if (opts.useMWG) {
            expect(t.Description).to.eql(Description, ".Description");
            expect(t.ImageDescription).to.eql(Description, ".ImageDescription");
            expect(t["Caption-Abstract"]).to.eql(
              Description,
              ".Caption-Abstract",
            );
          } else {
            expect(t.Description).to.eql(Description, ".Description");
            expect(t.ImageDescription).to.eql(
              "Prior Title",
              ".ImageDescription",
            );
            expect(t["Caption-Abstract"]).to.eql(
              "Prior Title",
              ".Caption-Abstract",
            );
          }
        });
      });

      type InputValue = string | number | Struct | ResourceEvent | boolean;

      async function assertRoundTrip({
        dest,
        tagName,
        inputValue,
        expectedValue,
        writeArgs,
        cmp,
      }: {
        dest: string;
        tagName: keyof WriteTags;
        inputValue: InputValue | InputValue[];
        expectedValue?: any;
        writeArgs?: string[];
        cmp?: (actual: any, tags: Tags) => any;
      }) {
        const fileExists = existsSync(dest);
        const wt: WriteTags = {};
        (wt[tagName] as any) = inputValue;
        const writeResult = await exiftool.write(dest, wt, {
          writeArgs,
        } as WriteTaskOptions);
        expect(writeResult.warnings).to.eql(
          undefined,
          JSON.stringify({
            writeTags: wt,
            warnings: writeResult.warnings,
            writeArgs,
          }),
        );

        if (fileExists) {
          expect(writeResult).to.containSubset({ created: 0, updated: 1 });
        } else {
          expect(writeResult).to.containSubset({ created: 1, updated: 0 });
        }

        const result = (await exiftool.read(dest)) as any;
        const expected = expectedValue ?? inputValue;
        const cleanTagName = stripSuffix(tagName, "#");
        const actual = result[cleanTagName];
        if (cmp != null) {
          cmp(actual, result);
        } else {
          expect(actual).to.eql(
            expected,
            JSON.stringify({ src: dest, tagName, expected, actual }),
          );
        }
        return writeResult;
      }

      // Well-supported text tag name:
      const textTagName = "Description";

      // Well-supported multi-value string tag:
      const multiTagName = "TagsList" as any;

      function runRoundTripTests({
        withTZ,
        dest,
      }: {
        withTZ: boolean;
        dest: (basename?: string) => Promise<string>;
      }) {
        const tzo = withTZ ? "+08:00" : "";
        it("round-trips a comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "new comment from " + new Date(),
          });
        });

        it("round-trips a comment with many whitespace flavors", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "a\rnew\ncomment\n\r\tfrom\r\n" + new Date(),
          });
        });

        it("round-trips a non-latin comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "早安晨之美" + new Date(),
          });
        });

        it("round-trips a comment with simple and compound codepoint emoji", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "⌚✨💑🏽👰🏽🦏🌈🦍🦄🧑‍🤝‍🧑🚵‍♀️ " + new Date(),
          });
        });

        it("round-trips a comment with non-latin filename", async () => {
          return assertRoundTrip({
            dest: await dest("中文.jpg"),
            tagName: textTagName,
            inputValue: "new comment from " + new Date(),
          });
        });

        it("round-trips a non-latin comment with non-latin filename", async () => {
          return assertRoundTrip({
            dest: await dest("中文.jpg"),
            tagName: textTagName,
            inputValue: "早安晨之美" + new Date(),
          });
        });

        it("round-trips a rtl comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "مرحبا بالعالم " + new Date(),
          });
        });

        it("round-trips a numeric Orientation", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 1,
          });
        });

        it("round-trips a string Orientation 90 CW", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 6,
          });
        });

        it("round-trips a string Orientation 180 CW", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 3,
          });
        });

        it("updates ExposureTime to a specific time", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "ExposureTime",
            inputValue: "1/300",
          });
        });

        it("updates DateTimeOriginal to a specific time", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "DateTimeOriginal",
            inputValue: "2017-11-15T12:34:56" + tzo,
            cmp: (actual: ExifDateTime) => {
              expect(actual.toISOString()).to.eql(`2017-11-15T12:34:56${tzo}`);
            },
          });
        });

        it("round-trips list tag array input", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: multiTagName,
            inputValue: [
              "one",
              "two",
              "three",
              "commas, and { evil [\t|\r] characters \n }",
            ],
          });
        });

        it("updates DateTimeDigitized with TimeZoneOffset", async () => {
          const src = await dest();
          const wt: WriteTags = {
            DateTimeDigitized: new ExifDateTime(2010, 7, 13, 14, 15, 16, 123),
            TimeZoneOffset: +8,
          };
          await exiftool.write(src, wt);
          const newTags = await exiftool.read(src);
          const d = newTags.DateTimeDigitized as ExifDateTime;
          expect(d.toISOString()).to.eql(
            "2010-07-13T14:15:16.123" + tzo,
            JSON.stringify(d),
          );
          return;
        });

        it("updates CreateDate to a time with zeroes and OffsetTimeDigitized", async () => {
          const src = await dest();
          const wt: WriteTags = {
            CreateDate: new ExifDateTime(2019, 1, 2, 0, 0, 0),
            // We have to clear the GPS info to make the OffsetTime be respected:
            GPSLatitude: null,
            GPSLongitude: null,
            OffsetTimeDigitized: "-05:00",
          };
          await exiftool.write(src, wt);
          const t = await exiftool.read(src);
          expect(t.CreateDate?.toString()).to.eql(
            "2019-01-02T00:00:00" + (withTZ ? "-05:00" : ""),
          );
          return;
        });

        it("updates ReleaseDate to a specific date", async () => {
          const f = await dest();
          const wt: WriteTags = {
            ReleaseDate: ExifDate.fromISO("2019-01-02")!,
          };
          await exiftool.write(f, wt);
          const newTags = await exiftool.read(f);
          expect(newTags.ReleaseDate!.toISOString()).to.eql("2019-01-02");
          return;
        });

        it("round-trips a boolean true value", async () => {
          const file = await dest();
          // Using a native boolean tag
          return assertRoundTrip({
            dest: file,
            tagName: "AlreadyApplied",
            inputValue: true,
            expectedValue: true,
          });
        });

        it("round-trips a boolean false value", async () => {
          const file = await dest();
          // Using a native boolean tag
          return assertRoundTrip({
            dest: file,
            tagName: "AlreadyApplied",
            inputValue: false,
            expectedValue: false,
          });
        });

        function randomFloat(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        for (const ignoreZeroZeroLatLon of [false, true]) {
          describe(
            "round-trips GPS values (attempt to reproduce #131): " +
              JSON.stringify({ ignoreZeroZeroLatLon }),
            () => {
              // Verify there's no shenanigans with negative, zero, or positive
              // lat/lon combinations:
              for (const GPSLatitude of [
                randomFloat(-89, -1),
                0,
                39.1132577,
                randomFloat(1, 89),
              ]) {
                for (const GPSLongitude of [
                  randomFloat(-179, -1),
                  -84.6907715,
                  0,
                  randomFloat(1, 179),
                ]) {
                  it(
                    JSON.stringify({ GPSLatitude, GPSLongitude }),
                    async () => {
                      exiftool.options.ignoreZeroZeroLatLon =
                        ignoreZeroZeroLatLon;
                      const f = await dest();
                      const result = await exiftool.write(f, {
                        GPSLatitude,
                        GPSLongitude,
                        Title: "title",
                      });
                      expect(result.created + result.updated).to.eql(1);
                      const tags = await exiftool.read(f, {
                        ignoreZeroZeroLatLon,
                      });
                      if (
                        ignoreZeroZeroLatLon &&
                        GPSLatitude === 0 &&
                        GPSLongitude === 0
                      ) {
                        expect(tags.GPSLatitude).to.eql(undefined);
                        expect(tags.GPSLongitude).to.eql(undefined);
                      } else {
                        expect(tags.GPSLatitude).to.be.closeTo(
                          GPSLatitude,
                          0.001,
                        );
                        expect(tags.GPSLongitude).to.be.closeTo(
                          GPSLongitude,
                          0.001,
                        );
                      }
                    },
                  );
                }
              }
            },
          );
        }

        it("round-trips a struct tag", async () => {
          const struct: Struct[] = [
            { RegItemId: "item 1", RegOrgId: "org 1" },
            { RegEntryRole: "role 2", RegOrgId: "org 2" },
          ];
          const f = await dest();
          await exiftool.write(f, { RegistryID: struct });
          const tags = await exiftool.read(f);
          expect(tags.RegistryID).to.eql(struct);
        });

        it("rejects setting to a non-time value", async () => {
          const src = await dest();
          expect(
            (
              await exiftool.write(src, {
                DateTimeOriginal: "this is not a time" as any,
              })
            ).warnings?.join("\n"),
          ).to.match(/Invalid date\/time/);
        });

        it("rejects an invalid numeric Orientation", async () => {
          const src = await dest();
          expect(
            (await exiftool.write(src, { "Orientation#": -1 })).warnings?.join(
              "\n",
            ),
          ).to.match(/Value below int16u minimum/i);
        });

        it("rejects an invalid string Orientation", async () => {
          const src = await dest();
          expect(
            (
              await exiftool.write(src, {
                Orientation: "this isn't a valid orientation",
              })
            ).warnings?.join("\n"),
          ).to.be.match(/Can't convert IFD0:Orientation/i);
        });

        it("tags case-insensitively", async () => {
          const src = await dest();
          await exiftool.write(src, { rating: 12 } as any, [
            "-overwrite_original",
          ]);
          const t = (await exiftool.read(src)) as any;
          // this should compile...
          expect(t.rating).to.eql(undefined);
          // but ExifTool will have done the conversion to "Rating":
          expect(t.Rating).to.eql(12);
        });

        it("rejects un-writable tags", async () => {
          const src = await dest();
          expect(
            (
              await exiftool.write(src, {
                ImageOffset: 12345,
              } as any)
            ).warnings?.join("\n"),
          ).to.match(/ImageOffset is not writable/i);
        });

        it("handles deleting tags from empty files", async () => {
          const src = await dest();
          const isSidecar = isSidecarExt(src);
          // if sidecar, should be empty:
          expect(await isFileEmpty(src)).to.eql(isSidecar);
          await exiftool.write(src, { Orientation: null });
          // still should be empty:
          expect(await isFileEmpty(src)).to.eql(isSidecar);
          if (!isSidecar) {
            const t = await exiftool.read(src);
            expect(t.Orientation).to.eql(undefined);
          }
        });

        it("removes null values", async () => {
          const src = await dest();
          const ExposureTime = "1/4567";
          // NOTE: Neither XPComment nor Comment are supported by .XMP
          const UserComment = [
            "Buenos días",
            "Schönen Tag",
            "Добрый день",
            "良い一日",
            "יום טוב",
          ].join(",");

          await exiftool.write(src, {
            Title: UnicodeTestMessage,
            "Orientation#": 3,
            ExposureTime,
            UserComment,
          } as WriteTags);

          {
            expect(await isFileEmpty(src)).to.eql(false);
            const t = await exiftool.read(src);
            expect(t).to.containSubset({
              Orientation: 3,
              ExposureTime,
              UserComment,
            });
          }

          await exiftool.write(src, { Orientation: null } as WriteTags);

          {
            expect(await isFileEmpty(src)).to.eql(false);
            const t = await exiftool.read(src);
            expect(t.Orientation).to.eql(undefined);
            expect(t).to.containSubset({
              Title: UnicodeTestMessage,
              ExposureTime,
              UserComment,
            });
          }

          await exiftool.write(src, { ExposureTime: null, UserComment: null });

          {
            expect(await isFileEmpty(src)).to.eql(false);
            const t = await exiftool.read(src);
            expect(t.Orientation).to.eql(undefined);
            expect(t.ExposureTime).to.eql(undefined);
            expect(t.UserComment).to.eql(undefined);
            expect(t.Title).to.eql(UnicodeTestMessage);
          }
        });

        it("Accepts a shortcut tag", async () => {
          // AllDates doesn't accept millisecond precision:
          const date = "2018-04-17T12:34:56+08:00";
          const src = await dest();
          await exiftool.write(src, { AllDates: date });
          const tags = await exiftool.read(src);
          expect(String(tags.DateTimeOriginal)).to.eql(date);
          expect(String(tags.CreateDate)).to.eql(date);
          expect(String(tags.ModifyDate)).to.eql(date);
          return;
        });

        it("rejects unknown files", () => {
          return expect(
            exiftool.write("/tmp/.nonexistant-" + Date.now(), {
              Comment: "boom",
            }),
          ).to.be.rejectedWith(/ENOENT|File not found/i);
        });

        it("rejects unknown tags", async () => {
          const src = await dest();
          return expect(
            (
              await exiftool.write(src, { RandomTag: 123 } as any)
            ).warnings?.join("\n"),
          ).to.match(/Tag 'RandomTag' is not defined/);
        });

        it("round-trips a struct tag with a ResourceEvent with primitive values", async () => {
          const inputValue: ResourceEvent[] = [
            {
              Action: "testing",
              Changed: "🤷🏿‍♀️",
            },
          ];
          return assertRoundTrip({
            dest: await dest(),
            tagName: "History",
            inputValue,
          });
        });

        it("round-trips a struct tag with a stringified value", async () => {
          const inputValue: ResourceEvent[] = [
            {
              Action: "testing",
              Changed: "🤷🏿‍♀️",
              Parameters: JSON.stringify({
                numeric: 123,
                string: "hello",
                meanString: "\n|\r}\t{][(), ",
              }),
            },
          ];
          return assertRoundTrip({
            dest: await dest(),
            tagName: "History",
            inputValue,
          });
        });
      }

      describe("round-trip with an image", () =>
        runRoundTripTests({
          withTZ: true,
          dest: (name) =>
            testImg({
              srcBasename: name,
              destBasename: "ĩmägë.jpg",
            }), // non-latin characters
        }));

      describe("round-trip with an XMP sidecar", () =>
        runRoundTripTests({
          withTZ: false, // BOO XMP DOESN'T LIKE TIMEZONES WTH
          dest: (ea) => testFile((ea ?? "ïmg") + ".xmp"), // < i with diaeresis/umlaut
        }));

      describe("round-trip with an MIE sidecar", () =>
        runRoundTripTests({
          withTZ: true,
          dest: (ea) => testFile((ea ?? "îmg") + ".mie"), // i with circumflex
        }));

      function mkResourceEvent(o?: Partial<ResourceEvent>): ResourceEvent {
        return {
          Action: "test",
          Changed: "rating",
          InstanceID: "instance-id-" + randomChars(),
          Parameters: "value-" + randomChars(),
          SoftwareAgent: "PhotoStructure",
          When: ExifDateTime.now(),
          ...o,
        };
      }

      function assertEqlResourceEvents(a: ResourceEvent[], b: ResourceEvent[]) {
        if (a != null || b != null) {
          for (let idx = 0; idx < a.length; idx++) {
            expect(omit(a[idx]!, "When")).to.eql(omit(b[idx]!, "When"));
            assertEqlDateish(a[idx]!.When, b[idx]!.When);
          }
        }
      }

      async function mkXMP(nativePath: string, t?: WriteTags) {
        const priorContents = {
          Copyright: "PhotoStructure, Inc. " + randomChars(),
          ...t,
        };
        await exiftool.write(nativePath, priorContents);
        expect(await exiftool.read(nativePath)).to.containSubset(
          omit(priorContents, "History", "Versions"),
        );
      }

      describe("appends History structs", () => {
        it("from no XMP", async () => {
          const f = await testFile("image.xmp");
          const re = mkResourceEvent();
          await exiftool.write(f, { "History+": re }); // < NOT AN ARRAY

          // NOTE: This tests ReadTask handles History records properly:
          const t = (await exiftool.read(f)) as any;
          assertEqlResourceEvents(t.History, [re]);
        });
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp");
          const re = mkResourceEvent();
          await mkXMP(f);
          await exiftool.write(f, { "History+": [re] });
          const t = (await exiftool.read(f)) as any;
          assertEqlResourceEvents(t.History[0], [re]);
        });
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp");
          const re1 = mkResourceEvent({ Action: "test-1" });
          const re2 = mkResourceEvent({ Action: "test-2" });
          await mkXMP(f, { History: [re1] });
          await exiftool.write(f, { "History+": [re2] });
          const t = (await exiftool.read(f)) as any;
          assertEqlResourceEvents(t.History, [re1, re2]);
        });
      });

      describe("replaces History structs", () => {
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp");
          await mkXMP(f);
          const re = mkResourceEvent();
          await exiftool.write(f, { History: [re] });
          const t = (await exiftool.read(f)) as any;
          assertEqlResourceEvents(t.History, [re]);
        });
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp");
          const re1 = mkResourceEvent({ Action: "test-1" });
          const re2 = mkResourceEvent({ Action: "test-2" });
          await mkXMP(f, { History: [re1] });
          await exiftool.write(f, { History: [re2] });
          const t = (await exiftool.read(f)) as any;
          assertEqlResourceEvents(t.History, [re2]);
        });
      });

      function mkVersion(v?: Partial<Version>): Version {
        return {
          Comments: "comment " + randomChars(),
          Event: mkResourceEvent(),
          Modifier: "modifier " + randomChars(),
          ModifyDate: ExifDateTime.now(),
          Version: "version " + randomChars(),
          ...v,
        };
      }

      function assertEqlVersions(a: Version[], b: Version[]) {
        for (let idx = 0; idx < a.length; idx++) {
          const av = a[idx]!;
          const bv = b[idx]!;
          expect(omit(av, "ModifyDate", "Event")).to.eql(
            omit(bv, "ModifyDate", "Event"),
          );
          if (av.Event != null || bv.Event != null)
            assertEqlResourceEvents([av.Event!], [bv.Event!]);
          assertEqlDateish(a[idx]!.ModifyDate, b[idx]!.ModifyDate);
        }
      }

      describe("appends Versions structs", () => {
        it("from no XMP", async () => {
          const f = await testFile("image.xmp");
          const v = mkVersion();
          await exiftool.write(f, { "Versions+": v }); // < NOT AN ARRAY
          const t = (await exiftool.read(f)) as any;
          assertEqlVersions(t.Versions, [v]);
        });
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp");
          await mkXMP(f);
          const v = mkVersion();
          await exiftool.write(f, { "Versions+": v }); // < NOT AN ARRAY
          const t = (await exiftool.read(f)) as any;
          assertEqlVersions(t.Versions, [v]);
        });
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp");
          const v1 = mkVersion({ Modifier: "event-1" });
          const v2 = mkVersion({ Modifier: "event-2" });
          await mkXMP(f, { Versions: [v1] });
          await exiftool.write(f, { "Versions+": [v2] });
          const t = (await exiftool.read(f)) as any;
          assertEqlVersions(t.Versions, [v1, v2]);
        });
      });
      describe("replaces Versions structs", () => {
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp");
          const v1 = mkVersion({ Modifier: "event-1" });
          const v2 = mkVersion({ Modifier: "event-2" });
          await mkXMP(f, { Versions: [v1] });
          await exiftool.write(f, { Versions: v2 }); // < OH SNAP NOT AN ARRAY BUT IT STILL WORKS
          const t = (await exiftool.read(f)) as any;
          assertEqlVersions(t.Versions, [v2]);
        });
      });
    });
  }

  /**
   * @see https://github.com/photostructure/exiftool-vendored.js/issues/178
   */
  describe("deleteAllTags()", () => {
    const exiftool = new ExifTool();
    after(() => end(exiftool));

    const expectedDefinedTags = [
      "Make",
      "Model",
      "Software",
      "ExposureTime",
      "FNumber",
      "ISO",
      "CreateDate",
      "DateTimeOriginal",
      "LightSource",
      "Flash",
      "FocalLength",
      "SerialNumber",
      "DateTimeUTC",
    ];

    function assertMissingGeneralTags(t: Tags) {
      for (const ea of expectedDefinedTags) {
        expect(t).to.not.haveOwnProperty(ea);
      }
    }

    function assertDefinedGeneralTags(t: Tags) {
      for (const ea of expectedDefinedTags) {
        expect(t).to.haveOwnProperty(ea);
      }
    }

    function isIntrinsticTag(
      k: string,
    ): k is keyof (FileTags | ExifToolTags | ExifToolVendoredTags) {
      return (
        isFileTag(k) ||
        isExifToolTag(k) ||
        isExifToolVendoredTag(k) ||
        ["ImageSize", "Megapixels"].includes(k)
      );
    }

    function expectedChangedTag(k: string) {
      return [
        "CurrentIPTCDigest",
        "ExifByteOrder",
        "FileAccessDate",
        "FileCreateDate",
        "FileModifyDate",
        "FileInodeChangeDate",
        "FileSize",
        "tz",
        "tzSource",
      ].includes(k);
    }

    it("deletes all tags by default", async () => {
      const img = await testImg({ srcBasename: "oly.jpg" });
      const before = await exiftool.read(img);

      expect(before).to.containSubset(ImageExifData);
      assertDefinedGeneralTags(before);
      await exiftool.deleteAllTags(img);
      const after = await exiftool.read(img);
      assertMissingGeneralTags(after);
      expect(after).to.not.containSubset(ImageExifData);
      for (const k in ImageExifData) {
        expect(after).to.not.haveOwnProperty(k);
      }
      // And make sure everything else is gone:
      for (const k in before) {
        if (expectedChangedTag(k)) continue;
        if (isIntrinsticTag(k)) {
          expect(after[k]).to.eql(before[k], "intrinsic tag " + k);
        } else {
          expect(after).to.not.haveOwnProperty(k);
        }
      }
    });

    for (const key in ImageExifData) {
      it(`deletes all tags except ${key}`, async () => {
        const img = await testImg({ srcBasename: "oly.jpg" });
        const before = await exiftool.read(img);
        expect(before).to.containSubset(ImageExifData);
        assertDefinedGeneralTags(before);
        await exiftool.deleteAllTags(img, { retain: [key] });
        const after = await exiftool.read(img);
        assertMissingGeneralTags(after);
        expect(after).to.haveOwnProperty(key);
        for (const k in Object.keys(ImageExifData)) {
          if (k !== key) {
            expect(after).to.not.haveOwnProperty(k);
          }
        }
      });
    }
    it("supports deleting everything-except (issue #178)", async () => {
      const img = await testImg({ srcBasename: "oly.jpg" });
      const before = await exiftool.read(img);
      expect(before).to.containSubset(ImageExifData);
      assertDefinedGeneralTags(before);
      await exiftool.deleteAllTags(img, { retain: Object.keys(ImageExifData) });
      const after = await exiftool.read(img);
      assertMissingGeneralTags(after);
      expect(after).to.containSubset(ImageExifData);
    });

    it("supports creating arrays in structs", async () => {
      const f = await testImg();
      const regionData = {
        RegionInfo: {
          AppliedToDimensions: { W: 10, H: 10, Unit: "pixel" },
          RegionList: [
            {
              Area: { X: 0.5, Y: 0.5, W: 0.1, H: 0.1, Unit: "normalized" },
              Rotation: 0,
              Type: "Face",
              Name: "randomName1",
            },
            {
              Area: { X: 0.5, Y: 0.5, W: 0.1, H: 0.1, Unit: "normalized" },
              Rotation: 0,
              Type: "Face",
              Name: "randomName2",
            },
          ],
        },
      };

      await exiftool.write(f, regionData);
      const after = await exiftool.read(f);
      expect(after).to.containSubset(regionData);
    });
  });
});

describe("WriteTask (simpler)", () => {
  const exiftool = new ExifTool();
  after(() => end(exiftool));

  describe("GPS coordinate writing", () => {
    // Test coordinates covering all hemispheres:
    const testCoordinates = [
      { lat: 37.7749, lon: -122.4194, desc: "NW - San Francisco" },
      { lat: 40.7128, lon: -74.006, desc: "NW - New York" },
      { lat: -33.8688, lon: 151.2093, desc: "SE - Sydney" },
      { lat: -22.9068, lon: -43.1729, desc: "SW - Rio de Janeiro" },
      { lat: 35.6762, lon: 139.6503, desc: "NE - Tokyo" },
      { lat: 1.3521, lon: 103.8198, desc: "NE near equator - Singapore" },
      { lat: -0.1855, lon: -78.4352, desc: "SW near equator - Quito" },
    ];

    const fileFormats = [
      { type: "JPEG", getPath: () => testImg({ srcBasename: "noexif.jpg" }) },
      { type: "MIE", getPath: () => testFile("test.mie") },
      { type: "XMP", getPath: () => testFile("test.xmp") },
    ];

    for (const format of fileFormats) {
      describe(`${format.type} files`, () => {
        for (const coords of testCoordinates) {
          const { lat, lon, desc } = coords;

          const assertTags = (tags: Tags) => {
            // Verify latitude
            expect(tags.GPSLatitude).to.be.closeTo(lat, 0.0001);
            if (format.type !== "MIE") {
              // .mie files don't get a Ref tag (!?!)
              expect(tags.GPSLatitudeRef).to.equal(lat >= 0 ? "N" : "S");
            }

            // Verify longitude
            expect(tags.GPSLongitude).to.be.closeTo(lon, 0.0001);
            if (format.type !== "MIE") {
              // .mie files don't get a Ref tag (!?!)
              expect(tags.GPSLongitudeRef).to.equal(lon >= 0 ? "E" : "W");
            }

            // Verify GPSPosition format
            const actual = parseCoordinates(tags.GPSPosition!);
            expect(actual.latitude).to.be.closeTo(lat, 0.0001);
            expect(actual.longitude).to.be.closeTo(lon, 0.0001);
          };

          it(`writes and reads back coordinates for ${desc}`, async () => {
            const file = await format.getPath();
            await exiftool.write(file, {
              GPSLatitude: lat,
              GPSLongitude: lon,
            });
            assertTags(await exiftool.read(file));
          });

          it(`writes and reads back GPSPosition for ${desc}`, async () => {
            const file = await format.getPath();
            await exiftool.write(file, {
              GPSPosition: lat + "," + lon,
            });
            assertTags(await exiftool.read(file));
          });

          it(`handles clearing GPS data for ${desc}`, async () => {
            const file = await format.getPath();

            // First write coordinates
            await exiftool.write(file, {
              Title: `Something to avoid "Can't delete all meta information" error`,
              GPSLatitude: lat,
              GPSLongitude: lon,
            });

            // Then clear them
            await exiftool.write(file, {
              GPSLatitude: null,
              GPSLongitude: null,
            });

            // Verify they're gone
            const tags = await exiftool.read(file);
            expect(tags.GPSLatitude).to.eql(undefined);
            expect(tags.GPSLongitude).to.eql(undefined);
            expect(tags.GPSLatitudeRef).to.eql(undefined);
            expect(tags.GPSLongitudeRef).to.eql(undefined);
            expect(tags.GPSPosition).to.eql(undefined);
          });
        }

        it("doesn't reject invalid latitude values", async () => {
          const file = await format.getPath();
          await exiftool.write(file, { GPSLatitude: 91 }); // > 90 degrees
          const tags = await exiftool.readRaw(file);
          expect(tags.GPSLatitude).to.eql(`91 deg 0' 0.00" N`);
        });

        it("doesn't reject invalid longitude values", async () => {
          const file = await format.getPath();
          await exiftool.write(file, { GPSLongitude: 181 }); // > 180 degrees
          const tags = await exiftool.readRaw(file);
          expect(tags.GPSLongitude).to.eql(`181 deg 0' 0.00" E`);
        });
      });
    }
  });
});
