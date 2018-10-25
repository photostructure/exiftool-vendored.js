import { expect } from "./_chai.spec"
import { parseExifDate } from "./DateTime"

describe("ExifDateTime", () => {
  ;[
    { text: "2018:9:3", iso: "2018-09-03" },
    { text: "2018:02:09", iso: "2018-02-09" },
    { text: "2018:10:30", iso: "2018-10-30" },
    { text: "Mar 4 2018", iso: "2018-03-04" },
    { text: "April 09 2018", iso: "2018-04-09" }
  ].forEach(({ text, iso }) => {
    it("parses " + iso, () => {
      expect(parseExifDate(text)!.toISOString()).to.eql(iso)
    })
  })
})
