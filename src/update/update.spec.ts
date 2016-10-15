import { expect } from "chai"

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)


describe("Enclosure", () => {
  describe("versionFromUrl", () => {
    it("returns expected version for zip", () => {
      /*
      			<enclosure url="http://owl.phy.queensu.ca/~phil/exiftool/Image-ExifTool-10.30.tar.gz" length="4199203" type="application/x-gzip" />
			<enclosure url="http://owl.phy.queensu.ca/~phil/exiftool/exiftool-10.30.zip" length="5166058" type="application/zip" />
			<enclosure url="http://owl.phy.queensu.ca/~phil/exiftool/ExifTool-10.30.dmg" length="2701155" type="application/octet-stream" />
*/
      // expect(Enclosure.versionFromUrl("http://owl.phy.queensu.ca/~phil/exiftool/exiftool-10.30.zip")).to.eql("10.30")
    })

  })
})
describe("Update.parseBody", () => {

})