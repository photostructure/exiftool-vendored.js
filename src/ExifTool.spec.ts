import { BatchCluster } from "batch-cluster"
import * as _path from "path"
import { times } from "./Array"
import { BinaryField } from "./BinaryField"
import { DefaultMaxProcs } from "./DefaultMaxProcs"
import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"
import { ExifTool, exiftool } from "./ExifTool"
import { isWin32 } from "./IsWin32"
import { parseJSON } from "./JSON"
import { fromEntries, keys } from "./Object"
import { leftPad } from "./String"
import { Tags } from "./Tags"
import { expect, renderTagsWithISO, testImg } from "./_chai.spec"

function normalize(tagNames: string[]): string[] {
  return tagNames
    .filter((i) => i !== "FileInodeChangeDate" && i !== "FileCreateDate")
    .sort()
}

function posixPath(path: string) {
  return path.split(_path.sep).join("/")
}

after(() => exiftool.end())

describe("ExifTool", function () {
  this.timeout(15000)
  this.slow(100)

  const truncated = _path.join(__dirname, "..", "test", "truncated.jpg")
  const noexif = _path.join(__dirname, "..", "test", "noexif.jpg")
  const img = _path.join(__dirname, "..", "test", "img.jpg")
  const img2 = _path.join(__dirname, "..", "test", "ExifTool.jpg")
  const img3 = _path.join(__dirname, "..", "test", "with_thumb.jpg")
  const nonEnglishImg = _path.join(__dirname, "..", "test", "中文.jpg")

  const packageJson = require("../package.json")

  function expectedExiftoolVersion(flavor: "exe" | "pl" = "pl"): string {
    const vendorVersion: string =
      packageJson.optionalDependencies["exiftool-vendored." + flavor]
    // Everyone's a monster here:
    // * semver is pissy about 0-padded version numbers (srsly, it's ok)
    // * exiftool bumps the major version because minor hit 99</rant>

    // vendorVersion might have a ^ or ~ or something else as a prefix, so get
    // rid of that:
    return vendorVersion
      .replace(/^[^.0-9]+/, "")
      .split(".")
      .slice(0, 2)
      .map((ea) => leftPad(ea, 2, "0"))
      .join(".")
  }

  it("perl and win32 versions match", () => {
    const pl = expectedExiftoolVersion("pl")
    const exe = expectedExiftoolVersion("exe")
    expect(pl).to.eql(exe)
  })

  it("exports a singleton instance", () => {
    // don't call any methods that actually results in spinning up a child
    // proc:
    expect(exiftool.options.maxProcs).to.eql(DefaultMaxProcs)
  })

  const ignoreShebangs = []
  if (exiftool.options.ignoreShebang) {
    // If the default is true, we can only test true.
    ignoreShebangs.push(true)
  } else {
    ignoreShebangs.push(false)
    if (!isWin32()) ignoreShebangs.push(true)
  }

  for (const ignoreShebang of ignoreShebangs) {
    describe("exiftool({ ignoreShebang: " + ignoreShebang + " })", () => {
      let et: ExifTool

      before(
        () =>
          (et = new ExifTool({
            maxProcs: 2,
            ignoreShebang,
          }))
      )
      after(() => et.end())

      it("returns the correct version", async function () {
        this.slow(500)
        return expect(await et.version()).to.eql(expectedExiftoolVersion())
      })

      it("returns a reasonable value for MaxProcs", () => {
        // 64 cpus on my dream laptop
        expect(DefaultMaxProcs).to.be.within(1, 64)
      })

      it("returns expected results for a given file", async function () {
        this.slow(500)
        return expect(
          et.read(img).then((tags) => tags.Model)
        ).to.eventually.eql("iPhone 7 Plus")
      })

      it("returns raw tag values", async () => {
        return expect(et.readRaw(img, ["-Make", "-Model"])).to.eventually.eql({
          Make: "Apple",
          Model: "iPhone 7 Plus",
          SourceFile: posixPath(img),
        }) // and nothing else
      })

      it("returns expected results for a given file with non-english filename", async function () {
        this.slow(500)
        return expect(
          et.read(nonEnglishImg).then((tags) => tags.Model)
        ).to.eventually.eql("iPhone 7 Plus")
      })

      it("renders Orientation as numbers", async () => {
        const tags = await et.read(img)
        expect(tags.Orientation).to.eql(1)
        return
      })

      it("omits OriginalImage{Width,Height} by default", async () => {
        return expect(await et.read(img2)).to.containSubset({
          Keywords: "jambalaya",
          ImageHeight: 8,
          ImageWidth: 8,
          OriginalImageHeight: undefined,
          OriginalImageWidth: undefined,
        })
      })

      async function readBinaryFieldSizes(
        filename: string
      ): Promise<Record<string, number>> {
        return fromEntries(
          Object.entries(await et.read(filename))
            .filter(([, v]) => v instanceof BinaryField)
            .map(([k, v]) => [k, v.bytes])
        )
      }

      it("parses expected binary fields from " + img2, async () => {
        // Validate with `exiftool -j -struct test/ExifTool.jpg | grep Binary | sort`
        expect(await readBinaryFieldSizes(img2)).to.eql({
          BlueTRC: 14,
          FreeBytes: 12,
          GreenTRC: 14,
          PreviewImage: 1039273,
          RatioImage: 19,
          RedTRC: 14,
          SBAExposureRecord: 368,
          ScreenNail: 5917,
          ThumbnailImage: 1558,
          UserAdjSBA_RGBShifts: 5,
        })
      })

      it("parses expected binary fields from " + img3, async () => {
        // Validate with `exiftool -j -struct test/ExifTool.jpg | grep Binary | sort`
        expect(await readBinaryFieldSizes(img3)).to.eql({
          BlueTRC: 32,
          GreenTRC: 32,
          RedTRC: 32,
          ThumbnailImage: 5133,
        })
      })

      it("extracts OriginalImage{Width,Height} if [] is provided to override the -fast option", async () => {
        return expect(await et.read(img2, [])).to.containSubset({
          Keywords: "jambalaya",
          ImageHeight: 8,
          ImageWidth: 8,
          OriginalImageHeight: 16,
          OriginalImageWidth: 16,
        })
      })

      it("returns warning for a truncated file", async () => {
        return expect(await et.read(truncated)).to.containSubset({
          FileName: "truncated.jpg",
          FileSize: "1000 bytes",
          FileType: "JPEG",
          FileTypeExtension: "jpg",
          MIMEType: "image/jpeg",
          Warning: "JPEG format error",
        })
      })

      it("returns no exif metadata for an image with no headers", () => {
        return expect(
          et.read(noexif).then((tags) => normalize(Object.keys(tags)))
        ).to.become(
          normalize([
            "BitsPerSample",
            "ColorComponents",
            "Directory",
            "EncodingProcess",
            "ExifToolVersion",
            "FileAccessDate",
            "FileModifyDate",
            "FileName",
            "FilePermissions",
            "FileSize",
            "FileType",
            "FileTypeExtension",
            "ImageHeight",
            "ImageSize",
            "ImageWidth",
            "Megapixels",
            "MIMEType",
            "SourceFile",
            "YCbCrSubSampling",
            "errors",
          ])
        )
      })

      it("returns error for missing file", () => {
        return expect(et.read("bogus")).to.eventually.be.rejectedWith(
          /ENOENT|file not found/i
        )
      })

      it("works with text files", async () => {
        return expect(await et.read(__filename)).to.containSubset({
          FileType: "TXT",
          FileTypeExtension: "txt",
          MIMEType: "text/plain",
          // may be utf-8 or us-ascii, but we don't really care.
          // MIMEEncoding: "us-ascii",
          errors: [],
        })
      })

      function assertReasonableTags(tags: Tags[]): void {
        tags.forEach((tag) => {
          expect(tag.errors).to.eql([])
          expect(tag.MIMEType).to.eql("image/jpeg")
          expect(tag.GPSLatitude).to.be.within(-90, 90)
          expect(tag.GPSLongitude).to.be.within(-180, 180)
        })
      }

      it("ends procs when they've run > maxTasksPerProcess", async function () {
        const maxProcs = 5
        const maxTasksPerProcess = 8
        const et2 = new ExifTool({ maxProcs, maxTasksPerProcess })

        const iters = maxProcs * maxTasksPerProcess
        // Warm up the children:
        const promises = times(iters, () => et2.read(img))
        const tags = await Promise.all(promises)

        // I don't want to expose the .batchCluster field as part of the public API:
        const bc = et2["batchCluster"] as BatchCluster
        expect(bc.spawnedProcCount).to.be.gte(maxProcs)
        expect(bc.meanTasksPerProc).to.be.within(
          maxTasksPerProcess / 2,
          maxTasksPerProcess
        )
        assertReasonableTags(tags)
        await et2.end()
        expect(await et2.pids).to.eql([])
        return
      })

      it("ends with multiple procs", async function () {
        const maxProcs = 4
        const et2 = new ExifTool({ maxProcs })
        try {
          const tasks = await Promise.all(
            times(maxProcs * 4, () => et2.read(img3))
          )
          tasks.forEach((t) =>
            expect(t).to.include({
              // SourceFile: img3, Don't include SourceFile, because it's wonky on windows. :\
              MIMEType: "image/jpeg",
              Model: "Pixel",
              ImageWidth: 4048,
              ImageHeight: 3036,
            })
          )
          await et2.end()
          expect(await et2.pids).to.eql([])
        } finally {
          await et2.end()
        }
        return
      })

      it("images with warnings can still be written to", async function () {
        const img = await testImg("bad-exif-ifd.jpg")
        const s = "2022-11-01T19:56:34.875"
        await et.write(img, { AllDates: s })
        const t = await et.read(img)
        expect(t.SubSecCreateDate?.toString()).to.eql(s)
      })

      it("invalid images throw errors on write", async function () {
        const badImg = await testImg("truncated.jpg")
        return expect(
          et.write(badImg, { AllDates: new Date().toISOString() })
        ).to.be.rejectedWith(/Corrupted JPEG image/)
      })

      it("reads from a dSLR", async () => {
        const t = await et.read("./test/oly.jpg")
        expect(renderTagsWithISO(t)).to.containSubset({
          Aperture: 5,
          CreateDate: "2014-07-19T12:05:19-07:00",
          DateTimeOriginal: "2014-07-19T12:05:19-07:00",
          ExifImageHeight: 2400,
          ExifImageWidth: 3200,
          ExposureProgram: "Program AE",
          ExposureTime: "1/320",
          FNumber: 5,
          ISO: 200,
          LensInfo: "12-40mm f/2.8",
          LensModel: "OLYMPUS M.12-40mm F2.8",
          Make: "OLYMPUS IMAGING CORP.",
          MaxApertureValue: 2.8,
          MIMEType: "image/jpeg",
          Model: "E-M1",
          ModifyDate: "2014-07-19T12:05:19-07:00",
          Orientation: 1,
          SensorTemperature: "80.3 C",
          tz: "UTC-7",
          tzSource: "offset between DateTimeOriginal and DateTimeUTC",
        })
      })

      it("reads from a smartphone with GPS", async () => {
        const t = await et.read("./test/pixel.jpg")
        expect(t).to.containSubset({
          MIMEType: "image/jpeg",
          Make: "Google",
          Model: "Pixel",
          ExposureTime: "1/831",
          FNumber: 2,
          ExposureProgram: "Program AE",
          ISO: 50,
          Aperture: 2,
          MaxApertureValue: 2,
          ExifImageWidth: 4048,
          ExifImageHeight: 3036,
          GPSLatitude: 37.4836666666667,
          GPSLongitude: -122.452094444444,
          GPSLatitudeRef: "North",
          GPSLongitudeRef: "West",
          GPSAltitude: -47,
          tz: "America/Los_Angeles",
        })
        expect(t.SubSecDateTimeOriginal?.toString()).to.eql(
          "2016-12-13T09:05:27.120-08:00"
        )
      })

      it("reads from a directory with dots", async () => {
        const dots = await testImg("img.jpg", "2019.05.28")
        const tags = await et.read(dots)
        expect(renderTagsWithISO(tags)).to.containSubset({
          DateTimeCreated: "2016-08-12T13:28:50+08:00",
          DateTimeOriginal: "2016-08-12T13:28:50+08:00",
          Description: "Prior Title",
          FNumber: 1.8,
          GPSLatitudeRef: "North",
          GPSLongitudeRef: "East",
          Make: "Apple",
          MIMEType: "image/jpeg",
          Model: "iPhone 7 Plus",
          Subject: ["Test", "examples", "beach"],
          SubSecCreateDate: "2016-08-12T13:28:50.728+08:00",
          SubSecDateTimeOriginal: "2016-08-12T13:28:50.728+08:00",
          SubSecTimeDigitized: 728,
          SubSecTimeOriginal: 728,
          tz: "Asia/Hong_Kong",
          tzSource: "GPSLatitude/GPSLongitude",
        })
      })

      describe("deleteAllTags", () => {
        // These tags should be removed:
        const expectedBeforeTags = [
          "ApertureValue",
          "DateCreated",
          "DateTimeOriginal",
          "Flash",
          "GPSAltitude",
          "GPSLatitude",
          "GPSLongitude",
          "GPSTimeStamp",
          "LensInfo",
          "Make",
          "Model",
          "ShutterSpeedValue",
          "TimeCreated",
          "XPKeywords",
        ]

        // These are intrinsic fields that are expected to remain:
        const expectedAfterTags = [
          "BitsPerSample",
          "ColorComponents",
          "Directory",
          "EncodingProcess",
          "errors",
          "ExifToolVersion",
          "FileAccessDate",
          "FileModifyDate",
          "FileName",
          "FilePermissions",
          "FileSize",
          "FileType",
          "FileTypeExtension",
          "ImageHeight",
          "ImageSize",
          "ImageWidth",
          "Megapixels",
          "MIMEType",
          "SourceFile",
          "YCbCrSubSampling",
        ]

        function assertMetadataWipe(after: Tags) {
          const afterKeys = keys(after).sort()
          expectedBeforeTags.forEach((ea) =>
            expect(afterKeys).to.not.include(ea)
          )
          expectedAfterTags.forEach((ea) => expect(afterKeys).to.include(ea))
        }

        it("removes all metadata tags", async () => {
          const f = await testImg()
          const before = await et.read(f)
          // This is just a sample of additional tags that are expected to be removed:

          {
            const beforeKeys = keys(before)
            ;[...expectedBeforeTags, ...expectedAfterTags].forEach((ea) =>
              expect(beforeKeys).to.include(ea)
            )
          }
          await et.deleteAllTags(f)
          assertMetadataWipe(await et.read(f))
        })

        it("issue #119", async () => {
          const f = await testImg("delete-test.jpg")
          await et.deleteAllTags(f)
          assertMetadataWipe(await et.read(f))
        })
      })
    })
  }

  describe("parseJSON", () => {
    it("round-trips", async () => {
      const t = await exiftool.read(img3)

      function validate(ea: Tags) {
        expect((ea.SubSecCreateDate as any).constructor).to.eql(ExifDateTime)
        expect((ea.GPSTimeStamp as any).constructor).to.eql(ExifTime)
        expect((ea.GPSDateStamp as any).constructor).to.eql(ExifDate)
        expect((ea.ThumbnailImage as any).constructor).to.eql(BinaryField)

        expect({
          datetime: ea.SubSecCreateDate?.toString(),
          time: ea.GPSTimeStamp?.toString(),
          date: ea.GPSDateStamp?.toString(),
          thumbBytes: ea.ThumbnailImage?.bytes,
        }).to.eql({
          datetime: "2017-12-22T17:08:35.363-08:00",
          time: "01:08:22",
          date: "2017-12-23",
          thumbBytes: 5133,
        })

        // Verify that all primitive types are as expected:
        expect(ea.ISO).to.eql(60)
        expect(ea.FNumber).to.be.closeTo(2.0, 0.01)
        expect(ea.Contrast).to.eql("Normal")
        expect(ea.Keywords).to.eql(["red fish", "blue fish"])
      }

      validate(t)

      const t2 = parseJSON(JSON.stringify(t))
      validate(t2)

      expect(t2.SubSecCreateDate).to.eql(t.SubSecCreateDate)
      expect(t2.GPSDateTime).to.eql(t.GPSDateTime)
      expect(t2.GPSDateStamp).to.eql(t.GPSDateStamp)
      expect(t2.ThumbnailImage).to.eql(t.ThumbnailImage)
    })
  })
})
