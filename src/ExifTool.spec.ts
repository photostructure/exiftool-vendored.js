import { BatchCluster } from "batch-cluster"
import * as _path from "path"
import { platform } from "process"

import { expect, testImg } from "./_chai.spec"
import { times } from "./Array"
import { ExifDateTime } from "./ExifDateTime"
import { DefaultMaxProcs, ExifTool, exiftool } from "./ExifTool"
import { Tags } from "./Tags"

function normalize(tagNames: string[]): string[] {
  return tagNames
    .filter(i => i !== "FileInodeChangeDate" && i !== "FileCreateDate")
    .sort()
}

function posixPath(path: string) {
  return path.split(_path.sep).join("/")
}

describe("ExifTool", function() {
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
    const vendorVersion =
      packageJson.optionalDependencies["exiftool-vendored." + flavor]
    // Frakkin semver, which is pissy about 0-padded version numbers (srsly,
    // it's ok) and exiftool (which bumps the major version because minor hit 99
    // and you've got to maintain ascibetical sort order so...)
    // </rant>
    return vendorVersion
      .split(".")
      .slice(0, 2)
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
    if (platform !== "win32") ignoreShebangs.push(true)
  }

  for (const ignoreShebang of ignoreShebangs) {
    describe("exiftool({ ignoreShebang: " + ignoreShebang + " })", () => {
      let et: ExifTool

      before(
        () =>
          (et = new ExifTool({
            maxProcs: 2,
            ignoreShebang
          }))
      )
      after(() => et.end())

      it("returns the correct version", async function() {
        this.slow(500)
        return expect(await et.version()).to.eql(expectedExiftoolVersion())
      })

      it("returns a reasonable value for MaxProcs", () => {
        // 64 cpus on my dream laptop
        expect(DefaultMaxProcs).to.be.within(1, 64)
      })

      it("returns expected results for a given file", async function() {
        this.slow(500)
        return expect(et.read(img).then(tags => tags.Model)).to.eventually.eql(
          "iPhone 7 Plus"
        )
      })

      it("returns raw tag values", async () => {
        return expect(et.readRaw(img, ["-Make", "-Model"])).to.eventually.eql({
          Make: "Apple",
          Model: "iPhone 7 Plus",
          SourceFile: posixPath(img)
        }) // and nothing else
      })

      it("returns expected results for a given file with non-english filename", async function() {
        this.slow(500)
        return expect(
          et.read(nonEnglishImg).then(tags => tags.Model)
        ).to.eventually.eql("iPhone 7 Plus")
      })

      it("renders Orientation as numbers", async () => {
        const tags = await et.read(img)
        expect(tags.Orientation).to.eql(1)
        return
      })

      it("omits OriginalImage{Width,Height} by default", async () => {
        const tags = await et.read(img2)
        expect(tags.Keywords).to.eql("jambalaya")
        expect(tags.ImageHeight).to.eql(8)
        expect(tags.ImageWidth).to.eql(8)
        expect(tags.OriginalImageHeight).to.eql(undefined)
        expect(tags.OriginalImageWidth).to.eql(undefined)
        return
      })

      it("extracts OriginalImage{Width,Height} if [] is provided to override the -fast option", async () => {
        const tags = await et.read(img2, [])
        expect(tags.Keywords).to.eql("jambalaya")
        expect(tags.ImageHeight).to.eql(8)
        expect(tags.ImageWidth).to.eql(8)
        expect(tags.OriginalImageHeight).to.eql(16)
        expect(tags.OriginalImageWidth).to.eql(16)
        return
      })

      it("returns warning for a truncated file", () => {
        return expect(
          et.read(truncated).then(tags => tags.Warning)
        ).to.eventually.eql("JPEG format error")
      })

      it("returns no exif metadata for an image with no headers", () => {
        return expect(
          et.read(noexif).then(tags => normalize(Object.keys(tags)))
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
            "errors"
          ])
        )
      })

      it("returns error for missing file", () => {
        return expect(et.read("bogus")).to.eventually.be.rejectedWith(
          /ENOENT|file not found/i
        )
      })

      it("sets Error for unsupported file types", async () => {
        return expect((await et.read(__filename)).Error).to.match(
          /Unknown file type/i
        )
      })

      function assertReasonableTags(tags: Tags[]): void {
        tags.forEach(tag => {
          expect(tag.errors).to.eql([])
          expect(tag.MIMEType).to.eql("image/jpeg")
          expect(tag.GPSLatitude).to.be.within(-90, 90)
          expect(tag.GPSLongitude).to.be.within(-180, 180)
        })
      }

      it("ends procs when they've run > maxTasksPerProcess", async function() {
        const maxProcs = 5
        const maxTasksPerProcess = 8
        const et2 = new ExifTool({ maxProcs, maxTasksPerProcess })

        const iters = maxProcs * maxTasksPerProcess
        // Warm up the children:
        const promises = times(iters, () => et2.read(img))
        const tags = await Promise.all(promises)

        // I don't want to expose the .batchCluster field as part of the public API:
        const bc = et2["batchCluster"] as BatchCluster
        expect(bc.spawnedProcs).to.be.gte(maxProcs)
        expect(bc.meanTasksPerProc).to.be.within(
          maxTasksPerProcess / 2,
          maxTasksPerProcess
        )
        assertReasonableTags(tags)
        await et2.end()
        expect(await et2.pids).to.eql([])
        return
      })

      it("ends with multiple procs", async function() {
        const maxProcs = 4
        const et2 = new ExifTool({ maxProcs })
        try {
          const tasks = await Promise.all(
            times(maxProcs * 4, () => et2.read(img3))
          )
          tasks.forEach(t =>
            expect(t).to.include({
              // SourceFile: img3, Don't include SourceFile, because it's wonky on windows. :\
              MIMEType: "image/jpeg",
              Model: "C2020Z",
              ImageWidth: 1600,
              ImageHeight: 1200
            })
          )
          await et2.end()
          expect(await et2.pids).to.eql([])
        } finally {
          await et2.end()
        }
        return
      })

      it("invalid images throw errors on write", async function() {
        const badImg = await testImg("bad-exif-ifd.jpg")
        return expect(
          et.write(badImg, { AllDates: new Date().toISOString() })
        ).to.be.rejectedWith(/Duplicate MakerNoteUnknown/)
      })

      it("reads from a dSLR", async () => {
        const t = await et.read("./test/oly.jpg")
        expect(t).to.contain({
          MIMEType: "image/jpeg",
          Make: "OLYMPUS IMAGING CORP.",
          Model: "E-M1",
          ExposureTime: "1/320",
          FNumber: 5,
          ExposureProgram: "Program AE",
          ISO: 200,
          Aperture: 5,
          MaxApertureValue: 2.8,
          ExifImageWidth: 3200,
          ExifImageHeight: 2400,
          LensInfo: "12-40mm f/2.8",
          LensModel: "OLYMPUS M.12-40mm F2.8",
          tz: "UTC-07"
        })
        expect(t.DateTimeOriginal!.toISOString()).to.eql(
          "2014-07-19T12:05:19.000-07:00"
        )
      })

      it("reads from a smartphone with GPS", async () => {
        const t = await et.read("./test/pixel.jpg")
        expect(t).to.contain({
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
          GPSAltitude: -47,
          tz: "America/Los_Angeles"
        })
        expect(t.SubSecDateTimeOriginal!.toISOString()).to.eql(
          "2016-12-13T09:05:27.120-08:00"
        )
      })

      it("reads from a directory with dots", async () => {
        const dots = await testImg("img.jpg", "2019.05.28")
        const tags = await et.read(dots)
        expect(tags).to.contain({
          MIMEType: "image/jpeg",
          GPSLatitudeRef: "N",
          GPSLongitudeRef: "E",
          Make: "Apple",
          Model: "iPhone 7 Plus",
          FNumber: 1.8,
          tz: "Asia/Hong_Kong"
        })
        expect(tags.DateTimeCreated).to.eql(
          ExifDateTime.fromISO(
            "2016-08-12T13:28:50",
            "UTC+8",
            "2016:08:12 13:28:50"
          )
        )
      })
    })
  }
})
