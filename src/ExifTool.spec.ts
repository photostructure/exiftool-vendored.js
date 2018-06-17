import { BatchCluster } from "batch-cluster"
import * as _path from "path"

import { expect, times } from "./chai.spec"
import { DefaultMaxProcs, ExifTool, exiftool } from "./ExifTool"
import { Tags } from "./Tags"

describe("ExifTool", () => {
  const et = new ExifTool(2)
  after(() => et.end())

  const truncated = _path.join(__dirname, "..", "test", "truncated.jpg")
  const noexif = _path.join(__dirname, "..", "test", "noexif.jpg")
  const img = _path.join(__dirname, "..", "test", "img.jpg")
  const nonEnglishImg = _path.join(__dirname, "..", "test", "中文.jpg")

  const packageJson = require("../package.json")

  function expectedExiftoolVersion(flavor: "exe" | "pl" = "pl"): string {
    const vendorVersion =
      packageJson.optionalDependencies["exiftool-vendored." + flavor]
    // Frakkin semver, which is pissy about 0-padded version numbers (srsly,
    // it's ok) and exiftool (which bumps the major version because minor hit 99
    // and you've got to maintain ascibetical sort order so...)
    // </rant>
    const [major, minor] = vendorVersion.replace(/^\D+/g, "").split(".")
    return `${major}.${minor}`
  }

  it("perl and win32 versions match", () => {
    const pl = expectedExiftoolVersion("pl")
    const exe = expectedExiftoolVersion("exe")
    expect(pl).to.eql(exe)
  })

  it("returns the correct version", async function() {
    this.slow(500)
    return expect(await et.version()).to.eql(expectedExiftoolVersion())
  })

  it("returns a reasonable value for MaxProcs", () => {
    // 64 cpus on my dream laptop
    expect(DefaultMaxProcs).to.be.within(1, 64)
  })

  it("exports a singleton instance", () => {
    // don't call any methods that actually results in spinning up a child
    // proc:
    expect(exiftool.maxProcs).to.eql(DefaultMaxProcs)
  })

  it("returns expected results for a given file", async function() {
    this.slow(500)
    return expect(et.read(img).then(tags => tags.Model)).to.eventually.eql(
      "iPhone 7 Plus"
    )
  })

  it("returns expected results for a given file with non-english filename", async function() {
    this.slow(500)
    return expect(
      et.read(nonEnglishImg).then(tags => tags.Model)
    ).to.eventually.eql("iPhone 7 Plus")
  })

  it("Renders Orientation as strings normally", async () => {
    const tags = await et.read(img)
    return expect(tags.Orientation).to.eql("Horizontal (normal)")
  })

  it("Renders Orientation as a number when specified", async () => {
    const tags = await et.read(img, ["-Orientation#"])
    return expect(tags.Orientation).to.eql(1)
  })

  it("returns warning for a truncated file", () => {
    return expect(
      et.read(truncated).then(tags => tags.Warning)
    ).to.eventually.eql("JPEG format error")
  })

  function normalize(tagNames: string[]): string[] {
    return tagNames
      .filter(i => i !== "FileInodeChangeDate" && i !== "FileCreateDate")
      .sort()
  }

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
    return expect(et.read("bogus")).to.eventually.be.rejectedWith(/ENOENT/)
  })

  it("sets Error for unsupported file types", async () => {
    return expect((await et.read(__filename)).Error).to.match(
      /Unknown file type/i
    )
  })

  function assertReasonableTags(tags: Tags[]): void {
    tags.forEach(tag => {
      expect(tag.errors).to.be.empty
      expect(tag.MIMEType).to.eql("image/jpeg")
      expect(tag.GPSLatitude).to.be.within(-90, 90)
      expect(tag.GPSLongitude).to.be.within(-180, 180)
    })
  }

  it("ends procs when they've run > maxTasksPerProcess", async function() {
    this.slow(5000)
    const maxProcs = 8
    const maxTasksPerProcess = 15
    const et = new ExifTool(maxProcs, maxTasksPerProcess)
    const promises = times(maxProcs * maxTasksPerProcess * 2, () =>
      et.read(img)
    )
    // By the time the first response finishes, our pending tasks should be at
    // max length, and pids should be maxProcs:
    await Promise.race(promises)
    expect(et.pids.length).to.eql(maxProcs)
    const bc = et["batchCluster"] as BatchCluster
    const tags = await Promise.all(promises)
    expect(bc.meanTasksPerProc).to.be.within(
      maxTasksPerProcess - 3,
      maxTasksPerProcess
    )
    expect(et.pids.length).to.be.within(1, maxProcs)
    assertReasonableTags(tags)
    await et.end()
    return expect(et.pids).to.eql([])
  })

  it("ends with multiple procs", async function() {
    this.slow(500)
    const maxProcs = 4
    const et = new ExifTool(maxProcs)
    try {
      const warmupTasks = await Promise.all(times(maxProcs, () => et.read(img)))
      expect(et.pids.length).to.be.within(2, maxProcs)
      const secondTasks = await Promise.all(
        times(maxProcs * 4, () => et.read(img))
      )
      warmupTasks.forEach(t => expect(t).to.not.be.undefined)
      secondTasks.forEach(t => expect(t).to.not.be.undefined)
      await et.end()
      return expect(et.pids).to.eql([])
    } finally {
      await et.end()
    }
  })
})
