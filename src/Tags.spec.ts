import { expect } from "./_chai.spec";
import { TagNames } from "./Tags";

describe("TagNames", () => {
  it("should include all expected common tags", () => {
    // Test presence of common tags
    expect(TagNames.includes("FileName")).to.be.true;
    expect(TagNames.includes("CreateDate")).to.be.true;
    expect(TagNames.includes("Make")).to.be.true;
    expect(TagNames.includes("Model")).to.be.true;
    expect(TagNames.includes("FileSize")).to.be.true;
    expect(TagNames.includes("FileType")).to.be.true;
    expect(TagNames.includes("MIMEType")).to.be.true;
    expect(TagNames.includes("ImageWidth")).to.be.true;
    expect(TagNames.includes("ImageHeight")).to.be.true;
    expect(TagNames.includes("Orientation")).to.be.true;
    expect(TagNames.includes("ExposureTime")).to.be.true;
    expect(TagNames.includes("ISO")).to.be.true;
    expect(TagNames.includes("FNumber")).to.be.true;
    expect(TagNames.includes("FocalLength")).to.be.true;
    expect(TagNames.includes("LensModel")).to.be.true;
    expect(TagNames.includes("GPSLatitude")).to.be.true;
    expect(TagNames.includes("GPSLongitude")).to.be.true;
    expect(TagNames.includes("Warning")).to.be.true;
    expect(TagNames.includes("Error")).to.be.true;
  });

  it("should have correct helper methods", () => {
    // Test strEnum helper methods work
    expect(TagNames.getCI("filename")).to.equal("FileName");
    expect(TagNames.getCI("FILENAME")).to.equal("FileName");
    expect(TagNames.getCI("createdate")).to.equal("CreateDate");
    expect(TagNames.getCI("CREATEDATE")).to.equal("CreateDate");

    // Test indexOf
    expect(TagNames.indexOf("FileName")).to.be.at.least(0);
    expect(TagNames.indexOf("CreateDate")).to.be.at.least(0);
    expect(TagNames.indexOf("NonExistentTag")).to.be.undefined;

    // Test has/includes
    expect(TagNames.has("Make")).to.be.true;
    expect(TagNames.has("Model")).to.be.true;
    expect(TagNames.has("NonExistentTag")).to.be.false;
  });

  it("should not have duplicates", () => {
    const uniqueValues = new Set(TagNames.values);
    expect(uniqueValues.size).to.equal(TagNames.values.length);
  });

  it("should have a reasonable number of tags", () => {
    // Based on the mktags MAX_TAGS of 2500 and the included interfaces
    expect(TagNames.values.length).to.be.greaterThan(100);
    expect(TagNames.values.length).to.be.lessThan(3000);
  });

  it("should include vendored tags", () => {
    // Check that our custom vendored tags are included
    expect(TagNames.includes("tz")).to.be.true;
    expect(TagNames.includes("zone")).to.be.true;
    expect(TagNames.includes("tzSource")).to.be.true;
    expect(TagNames.includes("zoneSource")).to.be.true;
    expect(TagNames.includes("errors")).to.be.true;
    expect(TagNames.includes("warnings")).to.be.true;
  });

  it("should include geolocation tags when available", () => {
    // Check that geolocation tags are included
    expect(TagNames.includes("GeolocationPosition")).to.be.true;
    expect(TagNames.includes("GeolocationCity")).to.be.true;
    expect(TagNames.includes("GeolocationCountry")).to.be.true;
    expect(TagNames.includes("GeolocationRegion")).to.be.true;
    expect(TagNames.includes("GeolocationCountryCode")).to.be.true;
    expect(TagNames.includes("GeolocationTimeZone")).to.be.true;
  });

  it("should include MWG tags", () => {
    // Check that MWG (Metadata Working Group) tags are included
    expect(TagNames.includes("Collections")).to.be.true;
    expect(TagNames.includes("Keywords")).to.be.true;
    expect(TagNames.includes("HierarchicalKeywords")).to.be.true;

    // These are struct field names:
    expect(TagNames.includes("CollectionName")).to.be.false;
    expect(TagNames.includes("CollectionURI")).to.be.false;
  });

  it("should be case-insensitive for lookup", () => {
    // Test various case combinations
    const testCases = [
      { input: "filename", expected: "FileName" },
      { input: "FILENAME", expected: "FileName" },
      { input: "FileName", expected: "FileName" },
      { input: "makeRnotes", expected: undefined }, // Invalid case mix
    ];

    for (const { input, expected } of testCases) {
      expect(TagNames.getCI(input)).to.equal(expected);
    }
  });

  it("should have working firstValid method", () => {
    expect(TagNames.firstValid("nonexistent", "filename", "make")).to.equal(
      "FileName",
    );
    expect(TagNames.firstValid("MAKE", "model")).to.equal("Make");
    expect(TagNames.firstValid("nonexistent1", "nonexistent2")).to.be.undefined;
  });

  it("should have working mapValid method", () => {
    expect(TagNames.mapValid("FileName", (t) => t.toLowerCase())).to.equal(
      "filename",
    );
    expect(TagNames.mapValid("NonExistent", (t) => t.toLowerCase())).to.be
      .undefined;
  });
});
