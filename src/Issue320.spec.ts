/**
 * Regression tests for https://github.com/photostructure/exiftool-vendored.js/issues/320
 *
 * Issue: XMP datetime tags contain timezone information, but when there's no GPS data,
 * the timezone is not being extracted because MWG prefers the EXIF DateTimeOriginal
 * (which lacks timezone) over the XMP DateTimeOriginal (which has it).
 *
 * The test images have:
 * - EXIF DateTimeOriginal: 2004:06:18 15:05:14 (no timezone)
 * - XMP DateTimeDigitized: 2004:06:18 15:05:14+02:00 (has timezone)
 * - XMP DateCreated: 2004:06:18 15:05:14+02:00 (has timezone)
 * - IPTC TimeCreated: 15:05:14+02:00 (has timezone)
 */

import { join } from "node:path";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTool } from "./ExifTool";
import { end, expect, testDir } from "./_chai.spec";

describe("Issue #320: XMP datetime timezone extraction", function () {
  this.slow(5000);

  let exiftool: ExifTool;
  before(() => (exiftool = new ExifTool()));
  after(() => end(exiftool));

  describe("image without GPS but with XMP timezone info", () => {
    const img = join(testDir, "issue320-no-gps.jpg");

    it("should extract timezone from XMP/IPTC datetime tags", async () => {
      const t = await exiftool.read(img);

      // The key assertion: timezone SHOULD be extracted from XMP datetime tags
      expect(t.tz).to.not.be.undefined;
      expect(t.tz).to.eql("UTC+2");
      expect(t.tzSource).to.not.be.undefined;

      // DateTimeOriginal should have the timezone applied
      const dto = t.DateTimeOriginal as ExifDateTime;
      expect(dto).to.be.instanceOf(ExifDateTime);
      expect(dto.tzoffsetMinutes).to.eql(120); // +02:00 = 120 minutes
      expect(dto.toString()).to.eql("2004-06-18T15:05:14+02:00");
    });

    it("should NOT extract timezone when inferTimezoneFromDatestamps is disabled", async () => {
      // This tests the opt-out behavior for users who don't want datetime-based
      // timezone inference
      const t = await exiftool.read(img, {
        inferTimezoneFromDatestamps: false,
      });

      // With inferTimezoneFromDatestamps disabled, timezone should NOT be found
      // (since this image has no GPS or explicit offset tags)
      expect(t.tz).to.be.undefined;
      expect(t.tzSource).to.be.undefined;

      // DateTimeOriginal should NOT have timezone backfilled
      const dto = t.DateTimeOriginal as ExifDateTime;
      expect(dto).to.be.instanceOf(ExifDateTime);
      expect(dto.tzoffsetMinutes).to.be.undefined;
    });
  });

  describe("image with GPS also has IPTC timezone", () => {
    const img = join(testDir, "issue320-with-gps.jpg");

    it("should use GPS timezone (checked before datetime stamps)", async () => {
      const t = await exiftool.read(img);

      // GPS is checked before inferTimezoneFromDatestamps, so GPS timezone is used
      expect(t.tz).to.not.be.undefined;
      expect(t.tzSource).to.include("GPS");

      const dto = t.DateTimeOriginal as ExifDateTime;
      expect(dto).to.be.instanceOf(ExifDateTime);
      expect(dto.tzoffsetMinutes).to.eql(120); // Both GPS and TimeCreated give +02:00
    });

    it("should use GPS even with preferTimezoneInferenceFromGps enabled", async () => {
      const t = await exiftool.read(img, {
        preferTimezoneInferenceFromGps: true,
      });

      // GPS should be used
      expect(t.tz).to.not.be.undefined;
      expect(t.tzSource).to.include("GPS");
    });
  });
});
