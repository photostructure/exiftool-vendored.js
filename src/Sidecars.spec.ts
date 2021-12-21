import { isSidecarExt } from "./Sidecars"
import { expect } from "./_chai.spec"

describe("Sidecars", () => {
  describe("isSidecarExt", () => {
    for (const { p, exp } of [
      { p: "test", exp: false },
      { p: "test.txt", exp: false },
      { p: "test.jpeg", exp: false },
      { p: "test.jpg", exp: false },
      { p: "test.EXV", exp: true },
      { p: "JPEG.MIE", exp: true },
      { p: "tiff.XMP", exp: true },
    ]) {
      it(`(${p}) -> ${exp}`, () => {
        expect(isSidecarExt(p)).to.eql(exp)
      })
    }
  })
})
