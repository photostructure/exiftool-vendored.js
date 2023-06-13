import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTool } from "./ExifTool"
import { isFileEmpty } from "./File"
import { omit } from "./Object"
import { ResourceEvent } from "./ResourceEvent"
import { isSidecarExt } from "./Sidecars"
import { stripSuffix } from "./String"
import { Struct } from "./Struct"
import { Tags } from "./Tags"
import { Version } from "./Version"
import { WriteTags } from "./WriteTags"
import {
  UnicodeTestMessage,
  assertEqlDateish,
  expect,
  randomChars,
  testFile,
  testImg,
} from "./_chai.spec"

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe("WriteTask", function () {
  this.slow(1) // always show timings
  for (const opts of [
    { maxProcs: 1, maxRetries: 0, useMWG: true },
    { maxProcs: 3, maxRetries: 3, useMWG: false },
  ]) {
    describe(`new ExifTool(${JSON.stringify(opts)})`, () => {
      const exiftool = new ExifTool(opts)
      after(() => exiftool.end())

      describe("MWG composite tags", () => {
        it("round-trips Creator", async () => {
          const f = await testImg()
          const Creator = "Ms " + randomChars(5) + " " + randomChars(5)
          await exiftool.write(f, { Creator })
          const t = await exiftool.read(f)
          if (opts.useMWG) {
            expect(t.Creator).to.eql(Creator, ".Creator")
            expect(t.Artist).to.eql(Creator, ".Artist")
          } else {
            expect(t.Creator).to.eql([Creator], ".Creator")
            expect(t.Artist).to.eql(undefined, ".Artist")
          }
        })

        it("round-trips Description", async () => {
          const f = await testImg()
          const Description = "new description " + randomChars(8)
          await exiftool.write(f, { Description })
          const t = await exiftool.read(f)
          if (opts.useMWG) {
            expect(t.Description).to.eql(Description, ".Description")
            expect(t.ImageDescription).to.eql(Description, ".ImageDescription")
            expect(t["Caption-Abstract"]).to.eql(
              Description,
              ".Caption-Abstract"
            )
          } else {
            expect(t.Description).to.eql(Description, ".Description")
            expect(t.ImageDescription).to.eql(
              "Prior Title",
              ".ImageDescription"
            )
            expect(t["Caption-Abstract"]).to.eql(
              "Prior Title",
              ".Caption-Abstract"
            )
          }
        })
      })

      type InputValue = string | number | Struct | ResourceEvent

      async function assertRoundTrip({
        dest,
        tagName,
        inputValue,
        expectedValue,
        args,
        cmp,
      }: {
        dest: string
        tagName: keyof WriteTags
        inputValue: InputValue | InputValue[]
        expectedValue?: any
        args?: string[]
        cmp?: (actual: any, tags: Tags) => any
      }) {
        const wt: WriteTags = {}
        ;(wt[tagName] as any) = inputValue
        await exiftool.write(dest, wt, args)
        const result = (await exiftool.read(dest)) as any
        const expected = expectedValue ?? inputValue
        const cleanTagName = stripSuffix(tagName, "#")
        const actual = result[cleanTagName]
        if (cmp != null) {
          cmp(actual, result)
        } else {
          expect(actual).to.eql(
            expected,
            JSON.stringify({ src: dest, tagName, expected, actual })
          )
        }
        return
      }

      // Well-supported text tag name:
      const textTagName = "Description"

      // Well-supported multi-value string tag:
      const multiTagName = "TagsList" as any

      function runRoundTripTests({
        withTZ,
        dest,
      }: {
        withTZ: boolean
        dest: (basename?: string) => Promise<string>
      }) {
        const tzo = withTZ ? "+08:00" : ""
        it("round-trips a comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "new comment from " + new Date(),
          })
        })

        it("round-trips a comment with many whitespace flavors", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "a\rnew\ncomment\n\r\tfrom\r\n" + new Date(),
          })
        })

        it("round-trips a non-latin comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "早安晨之美" + new Date(),
          })
        })

        it("round-trips a comment with simple and compound codepoint emoji", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "⌚✨💑🏽👰🏽🦏🌈🦍🦄🧑‍🤝‍🧑🚵‍♀️ " + new Date(),
          })
        })

        it("round-trips a comment with non-latin filename", async () => {
          return assertRoundTrip({
            dest: await dest("中文.jpg"),
            tagName: textTagName,
            inputValue: "new comment from " + new Date(),
          })
        })

        it("round-trips a non-latin comment with non-latin filename", async () => {
          return assertRoundTrip({
            dest: await dest("中文.jpg"),
            tagName: textTagName,
            inputValue: "早安晨之美" + new Date(),
          })
        })

        it("round-trips a rtl comment", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: textTagName,
            inputValue: "مرحبا بالعالم " + new Date(),
          })
        })

        it("round-trips a numeric Orientation", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 1,
          })
        })

        it("round-trips a string Orientation 90 CW", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 6,
          })
        })

        it("round-trips a string Orientation 180 CW", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "Orientation#",
            inputValue: 3,
          })
        })

        it("updates ExposureTime to a specific time", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "ExposureTime",
            inputValue: "1/300",
          })
        })

        it("updates DateTimeOriginal to a specific time", async () => {
          return assertRoundTrip({
            dest: await dest(),
            tagName: "DateTimeOriginal",
            inputValue: "2017-11-15T12:34:56" + tzo,
            cmp: (actual: ExifDateTime) => {
              expect(actual.toISOString()).to.eql(`2017-11-15T12:34:56${tzo}`)
            },
          })
        })

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
          })
        })

        it("updates DateTimeDigitized with TimeZoneOffset", async () => {
          const src = await dest()
          const wt: WriteTags = {
            DateTimeDigitized: new ExifDateTime(2010, 7, 13, 14, 15, 16, 123),
            TimeZoneOffset: +8,
          }
          await exiftool.write(src, wt)
          const newTags = await exiftool.read(src)
          const d = newTags.DateTimeDigitized as ExifDateTime
          expect(d.toISOString()).to.eql(
            "2010-07-13T14:15:16.123" + tzo,
            JSON.stringify(d)
          )
          return
        })

        it("updates CreateDate to a time with zeroes and OffsetTime", async () => {
          const src = await dest()
          const wt: WriteTags = {
            CreateDate: new ExifDateTime(2019, 1, 2, 0, 0, 0),
            // We have to clear the GPS info to make the OffsetTime be respected:
            GPSLatitude: null,
            GPSLongitude: null,
            OffsetTime: "-05:00",
          }
          await exiftool.write(src, wt)
          const t = await exiftool.read(src)
          expect(t.CreateDate?.toString()).to.eql(
            "2019-01-02T00:00:00" + (withTZ ? "-05:00" : "")
          )
          return
        })

        it("updates ReleaseDate to a specific date", async () => {
          const f = await dest()
          const wt: WriteTags = {
            ReleaseDate: ExifDate.fromISO("2019-01-02")!,
          }
          await exiftool.write(f, wt)
          const newTags = await exiftool.read(f)
          expect(newTags.ReleaseDate!.toISOString()).to.eql("2019-01-02")
          return
        })

        function randomFloat(min: number, max: number) {
          return Math.random() * (max - min) + min
        }

        describe("round-trips GPS values (attempt to reproduce #131)", () => {
          // Verify there's no shenanigans with negative, zero, or positive
          // lat/lon combinations:
          for (const GPSLatitude of [
            randomFloat(-89, 1),
            0,
            39.1132577,
            randomFloat(1, 89),
          ]) {
            for (const GPSLongitude of [
              randomFloat(-179, 1),
              -84.6907715,
              0,
              randomFloat(1, 179),
            ]) {
              it(JSON.stringify({ GPSLatitude, GPSLongitude }), async () => {
                const f = await dest()
                await exiftool.write(f, { GPSLatitude, GPSLongitude })
                const tags = await exiftool.read(f)
                expect(tags.GPSLatitude).to.be.closeTo(GPSLatitude, 0.001)
                expect(tags.GPSLongitude).to.be.closeTo(GPSLongitude, 0.001)
              })
            }
          }
        })

        it("round-trips a struct tag", async () => {
          const struct: Struct[] = [
            { RegItemId: "item 1", RegOrgId: "org 1" },
            { RegEntryRole: "role 2", RegOrgId: "org 2" },
          ]
          const f = await dest()
          await exiftool.write(f, { RegistryID: struct })
          const tags = await exiftool.read(f)
          expect(tags.RegistryID).to.eql(struct)
          return
        })

        it("rejects setting to a non-time value", async () => {
          const src = await dest()
          return expect(
            exiftool.write(src, {
              DateTimeOriginal: "this is not a time" as any,
            })
          ).to.be.rejectedWith(/Invalid date\/time/)
        })

        it("rejects an invalid numeric Orientation", async () => {
          const src = await dest()
          return expect(
            exiftool.write(src, { "Orientation#": -1 })
          ).to.be.rejectedWith(/Value below int16u minimum/i)
        })

        it("tags case-insensitively", async () => {
          const src = await dest()
          await exiftool.write(src, { rating: 12 } as any, [
            "-overwrite_original",
          ])
          const t = (await exiftool.read(src)) as any
          // this should compile...
          expect(t.rating).to.eql(undefined)
          // but ExifTool will have done the conversion to "Rating":
          expect(t.Rating).to.eql(12)
        })

        it("rejects un-writable tags", async () => {
          const src = await dest()
          await expect(
            exiftool.write(src, { ImageOffset: 12345 } as any)
          ).to.be.rejectedWith(/ImageOffset is not writable/)
        })

        it("rejects an invalid string Orientation", async () => {
          const src = await dest()
          await expect(
            exiftool.write(src, {
              Orientation: "this isn't a valid orientation" as any,
            })
          ).to.be.rejectedWith(/Can't convert IFD0:Orientation/i)
        })

        it("handles deleting tags from empty files", async () => {
          const src = await dest()
          const isSidecar = isSidecarExt(src)
          // if sidecar, should be empty:
          expect(await isFileEmpty(src)).to.eql(isSidecar)
          await exiftool.write(src, { Orientation: null })
          // still should be empty:
          expect(await isFileEmpty(src)).to.eql(isSidecar)
          if (!isSidecar) {
            const t = await exiftool.read(src)
            expect(t.Orientation).to.eql(undefined)
          }
        })

        it("removes null values", async () => {
          const src = await dest()
          const ExposureTime = "1/4567"
          // NOTE: Neither XPComment nor Comment are supported by .XMP
          const UserComment = [
            "Buenos días",
            "Schönen Tag",
            "Добрый день",
            "良い一日",
            "יום טוב",
          ].join(",")

          await exiftool.write(src, {
            Title: UnicodeTestMessage,
            "Orientation#": 3,
            ExposureTime,
            UserComment,
          } as WriteTags)

          {
            expect(await isFileEmpty(src)).to.eql(false)
            const t = await exiftool.read(src)
            expect(t).to.containSubset({
              Orientation: 3,
              ExposureTime,
              UserComment,
            })
          }

          await exiftool.write(src, { Orientation: null } as WriteTags)

          {
            expect(await isFileEmpty(src)).to.eql(false)
            const t = await exiftool.read(src)
            expect(t.Orientation).to.eql(undefined)
            expect(t).to.containSubset({
              Title: UnicodeTestMessage,
              ExposureTime,
              UserComment,
            })
          }

          await exiftool.write(src, { ExposureTime: null, UserComment: null })

          {
            expect(await isFileEmpty(src)).to.eql(false)
            const t = await exiftool.read(src)
            expect(t.Orientation).to.eql(undefined)
            expect(t.ExposureTime).to.eql(undefined)
            expect(t.UserComment).to.eql(undefined)
            expect(t.Title).to.eql(UnicodeTestMessage)
          }
        })

        it("Accepts a shortcut tag", async () => {
          // AllDates doesn't accept millisecond precision:
          const date = "2018-04-17T12:34:56+08:00"
          const src = await dest()
          await exiftool.write(src, { AllDates: date })
          const tags = await exiftool.read(src)
          expect(String(tags.DateTimeOriginal)).to.eql(date)
          expect(String(tags.CreateDate)).to.eql(date)
          expect(String(tags.ModifyDate)).to.eql(date)
          return
        })

        it("rejects unknown files", () => {
          return expect(
            exiftool.write("/tmp/.nonexistant-" + Date.now(), {
              Comment: "boom",
            })
          ).to.be.rejectedWith(/ENOENT|File not found/i)
        })

        it("rejects unknown tags", async () => {
          const src = await dest()
          return expect(
            exiftool.write(src, { RandomTag: 123 } as any)
          ).to.be.rejectedWith(/Tag 'RandomTag' is not defined/)
        })

        it("round-trips a struct tag with a ResourceEvent with primitive values", async () => {
          const inputValue: ResourceEvent[] = [
            {
              Action: "testing",
              Changed: "🤷🏿‍♀️",
            },
          ]
          return assertRoundTrip({
            dest: await dest(),
            tagName: "History",
            inputValue,
          })
        })

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
          ]
          return assertRoundTrip({
            dest: await dest(),
            tagName: "History",
            inputValue,
          })
        })
      }

      describe("round-trip with an image", () =>
        runRoundTripTests({
          withTZ: true,
          dest: (name) => testImg(name, undefined, "ïmägë.jpg"),
        }))

      describe("round-trip with an XMP sidecar", () =>
        runRoundTripTests({
          withTZ: false, // BOO XMP DOESN'T LIKE TIMEZONES WTH
          dest: (ea) => testFile((ea ?? "ïmg") + ".xmp"),
        }))

      describe("round-trip with an MIE sidecar", () =>
        runRoundTripTests({
          withTZ: true,
          dest: (ea) => testFile((ea ?? "ïmg") + ".mie"),
        }))

      function mkResourceEvent(o?: Partial<ResourceEvent>): ResourceEvent {
        return {
          Action: "test",
          Changed: "rating",
          InstanceID: "instance-id-" + randomChars(),
          Parameters: "value-" + randomChars(),
          SoftwareAgent: "PhotoStructure",
          When: ExifDateTime.now(),
          ...o,
        }
      }

      function assertEqlResourceEvents(a: ResourceEvent[], b: ResourceEvent[]) {
        if (a != null || b != null) {
          for (let idx = 0; idx < a.length; idx++) {
            expect(omit(a[idx]!, "When")).to.eql(omit(b[idx]!, "When"))
            assertEqlDateish(a[idx]!.When, b[idx]!.When)
          }
        }
      }

      async function mkXMP(nativePath: string, t?: WriteTags) {
        const priorContents = {
          Copyright: "PhotoStructure, Inc. " + randomChars(),
          ...t,
        }
        await exiftool.write(nativePath, priorContents)
        expect(await exiftool.read(nativePath)).to.containSubset(
          omit(priorContents, "History", "Versions")
        )
      }

      describe("appends History structs", () => {
        it("from no XMP", async () => {
          const f = await testFile("image.xmp")
          const re = mkResourceEvent()
          await exiftool.write(f, { "History+": re }) // < NOT AN ARRAY

          // NOTE: This tests ReadTask handles History records properly:
          const t = (await exiftool.read(f)) as any
          assertEqlResourceEvents(t.History, [re])
        })
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp")
          const re = mkResourceEvent()
          await mkXMP(f)
          await exiftool.write(f, { "History+": [re] })
          const t = (await exiftool.read(f)) as any
          assertEqlResourceEvents(t.History[0], [re])
        })
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp")
          const re1 = mkResourceEvent({ Action: "test-1" })
          const re2 = mkResourceEvent({ Action: "test-2" })
          await mkXMP(f, { History: [re1] })
          await exiftool.write(f, { "History+": [re2] })
          const t = (await exiftool.read(f)) as any
          assertEqlResourceEvents(t.History, [re1, re2])
        })
      })

      describe("replaces History structs", () => {
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp")
          await mkXMP(f)
          const re = mkResourceEvent()
          await exiftool.write(f, { History: [re] })
          const t = (await exiftool.read(f)) as any
          assertEqlResourceEvents(t.History, [re])
        })
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp")
          const re1 = mkResourceEvent({ Action: "test-1" })
          const re2 = mkResourceEvent({ Action: "test-2" })
          await mkXMP(f, { History: [re1] })
          await exiftool.write(f, { History: [re2] })
          const t = (await exiftool.read(f)) as any
          assertEqlResourceEvents(t.History, [re2])
        })
      })

      function mkVersion(v?: Partial<Version>): Version {
        return {
          Comments: "comment " + randomChars(),
          Event: mkResourceEvent(),
          Modifier: "modifier " + randomChars(),
          ModifyDate: ExifDateTime.now(),
          Version: "version " + randomChars(),
          ...v,
        }
      }

      function assertEqlVersions(a: Version[], b: Version[]) {
        for (let idx = 0; idx < a.length; idx++) {
          const av = a[idx]!
          const bv = b[idx]!
          expect(omit(av, "ModifyDate", "Event")).to.eql(
            omit(bv, "ModifyDate", "Event")
          )
          if (av.Event != null || bv.Event != null)
            assertEqlResourceEvents([av.Event!], [bv.Event!])
          assertEqlDateish(a[idx]!.ModifyDate, b[idx]!.ModifyDate)
        }
      }

      describe("appends Versions structs", () => {
        it("from no XMP", async () => {
          const f = await testFile("image.xmp")
          const v = mkVersion()
          await exiftool.write(f, { "Versions+": v }) // < NOT AN ARRAY
          const t = (await exiftool.read(f)) as any
          assertEqlVersions(t.Versions, [v])
        })
        it("from empty XMP", async () => {
          const f = await testFile("image.xmp")
          await mkXMP(f)
          const v = mkVersion()
          await exiftool.write(f, { "Versions+": v }) // < NOT AN ARRAY
          const t = (await exiftool.read(f)) as any
          assertEqlVersions(t.Versions, [v])
        })
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp")
          const v1 = mkVersion({ Modifier: "event-1" })
          const v2 = mkVersion({ Modifier: "event-2" })
          await mkXMP(f, { Versions: [v1] })
          await exiftool.write(f, { "Versions+": [v2] })
          const t = (await exiftool.read(f)) as any
          assertEqlVersions(t.Versions, [v1, v2])
        })
      })
      describe("replaces Versions structs", () => {
        it("from XMP with existing History", async () => {
          const f = await testFile("image.xmp")
          const v1 = mkVersion({ Modifier: "event-1" })
          const v2 = mkVersion({ Modifier: "event-2" })
          await mkXMP(f, { Versions: [v1] })
          await exiftool.write(f, { Versions: v2 }) // < OH SNAP NOT AN ARRAY BUT IT STILL WORKS
          const t = (await exiftool.read(f)) as any
          assertEqlVersions(t.Versions, [v2])
        })
      })
    })
  }
})
