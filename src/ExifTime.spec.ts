import { toExifString } from "./DateTime";
import { ExifTime } from "./ExifTime";
import { expect } from "./_chai.spec";

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe("ExifTime", () => {
  describe(".fromEXIF()", () => {
    for (const z of [
      { inputSuffix: "", outputSuffix: "", zone: undefined },
      { inputSuffix: "Z", outputSuffix: "+00:00", zone: "UTC" },
      { inputSuffix: "+2", outputSuffix: "+02:00", zone: "UTC+2" },
      { inputSuffix: "-04:00", outputSuffix: "-04:00", zone: "UTC-4" },
    ]) {
      describe(`with timezone ${JSON.stringify(z)}`, () => {
        it("parses hour/minute/second", () => {
          const et = ExifTime.fromEXIF("12:03:45" + z.inputSuffix)!;
          expect(et).to.containSubset({
            hour: 12,
            minute: 3,
            second: 45,
            millisecond: undefined,
            zone: z.zone,
          });
          expect(et.toString()).to.eql("12:03:45" + z.outputSuffix);
        });
        it("parses hour/minute/second/millis", () => {
          const et = ExifTime.fromEXIF("18:08:05.813" + z.inputSuffix)!;
          expect(et).to.containSubset({
            hour: 18,
            minute: 8,
            second: 5,
            millisecond: 813,
            zone: z.zone,
          });
          expect(et.toString()).to.eql("18:08:05.813" + z.outputSuffix);
        });
        it("parses hour/minute/second/micros", () => {
          const et = ExifTime.fromEXIF("08:20:55.207340" + z.inputSuffix)!;
          expect(et).to.containSubset({
            hour: 8,
            minute: 20,
            second: 55,
            millisecond: 207,
            zone: z.zone,
          });
          expect(et.millis).to.be.eql(207);
          expect(et.toString()).to.eql("08:20:55.207" + z.outputSuffix);
        });
      });
    }

    describe("from GPS", () => {
      it("hour/minute/second/millis", () => {
        const et = ExifTime.fromEXIF("05:28:09.123")!;
        expect([et.hour, et.minute, et.second, et.millis]).to.eql([
          5, 28, 9, 123,
        ]);
      });
    });
  });

  it("renders EXIF for 12:34:56", () => {
    expect(toExifString(new ExifTime(12, 34, 56))).to.eql("12:34:56");
  });
  it("renders EXIF for 01:02:03", () => {
    expect(toExifString(new ExifTime(1, 2, 3))).to.eql("01:02:03");
  });
  it("renders EXIF for 01:02:03", () => {
    expect(toExifString(new ExifTime(1, 2, 3))).to.eql("01:02:03");
  });

  describe("rejects invalid raw values", () => {
    for (const ea of [
      null,
      undefined,
      "",
      " ",
      "0",
      "00",
      "01",
      "02",
      "0001",
      "1958",
      "a",
    ]) {
      it(`rejects ${JSON.stringify(ea)}`, () => {
        expect(ExifTime.fromEXIF(ea as any)).to.eql(undefined);
      });
    }
  });
});
