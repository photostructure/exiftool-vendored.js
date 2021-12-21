import path from "path"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTool } from "./ExifTool"
import { expect, testImg } from "./_chai.spec"

describe("RewriteAllTagsTask", () => {
  for (const opts of [
    { maxProcs: 1, maxRetries: 0 },
    { maxProcs: 3, maxRetries: 3 },
  ]) {
    describe(`new ExifTool(${JSON.stringify(opts)})`, () => {
      const exiftool = new ExifTool(opts)

      const d = new Date()
      d.setMilliseconds(0)

      after(() => exiftool.end())

      it("throws on missing input", async function () {
        this.slow(500)
        return expect(
          exiftool.rewriteAllTags("missing.jpg", "ignored.jpg")
        ).to.be.rejectedWith(/Error opening file.+missing\.jpg/)
      })

      function expectSameYmdHms(a: ExifDateTime, b: Date) {
        expect([a.year, a.month, a.day, a.hour, a.minute, a.second]).to.eql([
          b.getUTCFullYear(),
          b.getUTCMonth() + 1,
          b.getUTCDate(),
          b.getUTCHours(),
          b.getUTCMinutes(),
          b.getUTCSeconds(),
        ])
      }

      it("test file is not problematic", async () => {
        const img = await testImg()
        await exiftool.write(img, { CreateDate: d.toISOString() })
        const tags = await exiftool.read(img)
        expectSameYmdHms(tags.CreateDate as any, d)
        return
      })

      describe("with problematic file", () => {
        const writeTags = {
          CreateDate: d.toISOString(),
          FNumber: null,
        }

        const expectedMeta = {
          Make: "SAMSUNG",
          Model: "GT-i7500",
          MIMEType: "image/jpeg",
          ExposureTime: "1/10",
          FNumber: 2.8,
          ExposureProgram: "Aperture-priority AE",
          ISO: 200,
          Flash: "No Flash",
        }

        it("matches expected metadata", async () => {
          const img = await testImg("problematic.jpg")
          expect(await exiftool.read(img)).to.containSubset(expectedMeta)
        })

        it("problematic file is problematic", async () => {
          const img = await testImg("problematic.jpg")
          return expect(exiftool.write(img, writeTags)).to.be.rejectedWith(
            /Error reading ThumbnailImage data/
          )
        })

        it("problematic file is not problematic after rewriting", async () => {
          const img = await testImg("problematic.jpg")
          const f = path.parse(img)
          const rewritten = path.join(f.dir, "rewritten.jpg")
          await exiftool.rewriteAllTags(img, rewritten)
          await exiftool.write(rewritten, writeTags)

          const tags = await exiftool.read(rewritten)
          expect(tags).to.containSubset({ ...expectedMeta, FNumber: undefined })
          expectSameYmdHms(tags.CreateDate as any, d)
        })
      })
    })
  }
})
