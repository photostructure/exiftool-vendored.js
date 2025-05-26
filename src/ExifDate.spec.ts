import { HourMs } from "./DateTime";
import { ExifDate } from "./ExifDate";
import { expect } from "./_chai.spec";

describe("ExifDate", () => {
  for (const { text, iso } of [
    { text: "2018:9:3", iso: "2018-09-03" },
    { text: "2018:02:09", iso: "2018-02-09" },
    { text: "2018-02-09", iso: "2018-02-09" },
    { text: "2018:10:30", iso: "2018-10-30" },
    { text: "Mar 4 2018", iso: "2018-03-04" },
    { text: "April 09 2018", iso: "2018-04-09" },
  ]) {
    const ed = ExifDate.fromEXIF(text);
    it("parses " + iso, () => {
      expect(ed?.toISOString()).to.eql(iso);
      expect(ed?.rawValue).to.eql(text);
    });
    it("toMillis()", () => {
      expect(ed?.toMillis(0)).to.be.closeTo(
        new Date(iso).getTime(),
        12 * HourMs,
      );
    });
  }
  for (const ea of ["", "   ", "0", "00", "0000", "2010_08"]) {
    it(`rejects "${ea}"`, () => {
      expect(ExifDate.fromEXIF(ea)).to.eql(undefined);
      expect(ExifDate.from(ea)).to.eql(undefined);
    });
  }

  // These are now valid year-only dates with partial date support
  for (const ea of ["01", "1958"]) {
    it(`accepts "${ea}" as year-only date`, () => {
      expect(ExifDate.fromEXIF(ea)).to.eql(undefined); // fromEXIF still rejects
      expect(ExifDate.from(ea)).to.not.eql(undefined); // but from() accepts as year
    });
  }

  describe("Partial date support", () => {
    describe("Year-only dates", () => {
      for (const year of [1980, 2023, 1234, 9999]) {
        it(`parses numeric year ${year}`, () => {
          const date = ExifDate.fromYear(year);
          expect(date).to.not.be.undefined;
          expect(date!.year).to.eql(year);
          expect(date!.month).to.be.undefined;
          expect(date!.day).to.be.undefined;
          expect(date!.isYearOnly()).to.be.true;
          expect(date!.isYearMonth()).to.be.false;
          expect(date!.isFullDate()).to.be.false;
          expect(date!.isPartial()).to.be.true;
          expect(date!.toString()).to.eql(String(year));
          expect(date!.toExifString()).to.eql(String(year));
        });

        it(`parses string year "${year}"`, () => {
          const date = ExifDate.fromYear(String(year));
          expect(date).to.not.be.undefined;
          expect(date!.year).to.eql(year);
          expect(date!.isYearOnly()).to.be.true;
        });
      }

      it("handles year via ExifDate.from() with number", () => {
        const date = ExifDate.from(1980);
        expect(date).to.not.be.undefined;
        expect(date!.year).to.eql(1980);
        expect(date!.isYearOnly()).to.be.true;
      });

      it("rejects invalid years", () => {
        expect(ExifDate.fromYear(0)).to.be.undefined;
        expect(ExifDate.fromYear(-1)).to.be.undefined;
        expect(ExifDate.fromYear(10000)).to.be.undefined;
        expect(ExifDate.fromYear("abc")).to.be.undefined;
        expect(ExifDate.fromYear("")).to.be.undefined;
      });
    });

    describe("Year-month dates", () => {
      const testCases = [
        { input: "1980:08", year: 1980, month: 8 },
        { input: "1980-08", year: 1980, month: 8 },
        { input: "2023:12", year: 2023, month: 12 },
        { input: "2023:1", year: 2023, month: 1 },
        { input: "2023-1", year: 2023, month: 1 },
        { input: "1234:06", year: 1234, month: 6 },
        { input: "1234-06", year: 1234, month: 6 },
      ];

      for (const { input, year, month } of testCases) {
        it(`parses year-month "${input}"`, () => {
          const date = ExifDate.fromYearMonth(input);
          expect(date).to.not.be.undefined;
          expect(date!.year).to.eql(year);
          expect(date!.month).to.eql(month);
          expect(date!.day).to.be.undefined;
          expect(date!.isYearOnly()).to.be.false;
          expect(date!.isYearMonth()).to.be.true;
          expect(date!.isFullDate()).to.be.false;
          expect(date!.isPartial()).to.be.true;
          const expectedToString = input.includes(":")
            ? `${year}-${month.toString().padStart(2, "0")}`
            : `${year}-${month.toString().padStart(2, "0")}`;
          expect(date!.toString()).to.eql(expectedToString);
        });

        it(`parses year-month "${input}" via ExifDate.from()`, () => {
          const date = ExifDate.from(input);
          expect(date).to.not.be.undefined;
          expect(date!.year).to.eql(year);
          expect(date!.month).to.eql(month);
          expect(date!.isYearMonth()).to.be.true;
        });
      }

      it("rejects invalid year-month formats", () => {
        expect(ExifDate.fromYearMonth("1980")).to.be.undefined;
        expect(ExifDate.fromYearMonth("1980:13")).to.be.undefined;
        expect(ExifDate.fromYearMonth("1980:00")).to.be.undefined;
        expect(ExifDate.fromYearMonth("abc:08")).to.be.undefined;
        expect(ExifDate.fromYearMonth("")).to.be.undefined;
      });
    });

    describe("Full date behavior", () => {
      it("identifies full dates correctly", () => {
        const fullDate = ExifDate.from("2023:08:15");
        expect(fullDate).to.not.be.undefined;
        expect(fullDate!.isYearOnly()).to.be.false;
        expect(fullDate!.isYearMonth()).to.be.false;
        expect(fullDate!.isFullDate()).to.be.true;
        expect(fullDate!.isPartial()).to.be.false;
      });
    });

    describe("toDate() method", () => {
      it("converts year-only to Date (defaults to Jan 1)", () => {
        const date = ExifDate.fromYear(1980)!;
        const jsDate = date.toDate();
        expect(jsDate.getFullYear()).to.eql(1980);
        expect(jsDate.getMonth()).to.eql(0); // January (0-indexed)
        expect(jsDate.getDate()).to.eql(1);
      });

      it("converts year-month to Date (defaults to 1st day)", () => {
        const date = ExifDate.fromYearMonth("1980:08")!;
        const jsDate = date.toDate();
        expect(jsDate.getFullYear()).to.eql(1980);
        expect(jsDate.getMonth()).to.eql(7); // August (0-indexed)
        expect(jsDate.getDate()).to.eql(1);
      });

      it("converts full date normally", () => {
        const date = ExifDate.from("1980:08:13")!;
        const jsDate = date.toDate();
        expect(jsDate.getFullYear()).to.eql(1980);
        expect(jsDate.getMonth()).to.eql(7); // August (0-indexed)
        expect(jsDate.getDate()).to.eql(13);
      });
    });

    describe("JSON serialization", () => {
      it("serializes and deserializes year-only dates", () => {
        const original = ExifDate.fromYear(1980)!;
        const json = original.toJSON();
        const restored = ExifDate.fromJSON(json);
        expect(restored.year).to.eql(original.year);
        expect(restored.month).to.eql(original.month);
        expect(restored.day).to.eql(original.day);
        expect(restored.isYearOnly()).to.be.true;
      });

      it("serializes and deserializes year-month dates", () => {
        const original = ExifDate.fromYearMonth("1980:08")!;
        const json = original.toJSON();
        const restored = ExifDate.fromJSON(json);
        expect(restored.year).to.eql(original.year);
        expect(restored.month).to.eql(original.month);
        expect(restored.day).to.eql(original.day);
        expect(restored.isYearMonth()).to.be.true;
      });
    });
  });
});
