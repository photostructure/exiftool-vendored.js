import { expect } from "./_chai.spec";
import { GpsLocationTags, parseGPSLocation } from "./GPS";
describe("parseGPSLocation", () => {
  const defaultOpts = { ignoreZeroZeroLatLon: false };

  it("should return empty object when no GPS data present", () => {
    const result = parseGPSLocation({} as GpsLocationTags, defaultOpts);
    expect(result).to.containSubset({ invalid: false });
  });

  it("should ignore zero coordinates when ignoreZeroZeroLatLon is true", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 0,
      GPSLongitude: 0,
    };
    const result = parseGPSLocation(tags, { ignoreZeroZeroLatLon: true })!;
    expect(result.invalid).to.eql(true);
    expect(result.warnings?.some((w) => /Ignoring zero/.test(w))).to.eql(
      true,
      `Expected warning about zero coordinates, but got: ${result.warnings}`,
    );
  });

  it("should process valid coordinates correctly", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 40.7128,
      GPSLatitudeRef: "N",
      GPSLongitude: 74.006,
      GPSLongitudeRef: "W",
    };
    const result = parseGPSLocation(tags, defaultOpts)!;
    expect(result.invalid).to.eql(false);
    expect(result.result?.GPSLatitude).to.eql(40.7128);
    expect(result.result?.GPSLongitude).to.eql(-74.006);
  });

  it("should handle out of range coordinates", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 90.1,
      GPSLongitude: 180.1,
    };
    const result = parseGPSLocation(tags, defaultOpts)!;
    expect(result.invalid).to.eql(true);
    expect(result.warnings).to.include(
      "Invalid GPSLatitude: 90.1 is out of range",
    );
    expect(result.warnings).to.include(
      "Invalid GPSLongitude: 180.1 is out of range",
    );
  });

  describe("GeolocationPosition hemisphere handling", () => {
    it("should handle Northeast hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 35.6762,
        GPSLongitude: 139.6503,
        GeolocationPosition: "35.6762,139.6503", // Tokyo
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(35.6762);
      expect(result.result?.GPSLongitude).to.eql(139.6503);
      expect(result.result?.GPSLatitudeRef).to.eql("N");
      expect(result.result?.GPSLongitudeRef).to.eql("E");
      expect(result.invalid).to.eql(false);
    });

    it("should handle Northwest hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006, // Fixed: Input longitude should be negative
        GeolocationPosition: "40.7128,-74.0060", // New York
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(40.7128);
      expect(result.result?.GPSLongitude).to.eql(-74.006);
      expect(result.result?.GPSLatitudeRef).to.eql("N");
      expect(result.result?.GPSLongitudeRef).to.eql("W");
      expect(result.invalid).to.eql(false);
    });

    it("should handle Southeast hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GeolocationPosition: "-33.8688,151.2093", // Sydney
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(-33.8688);
      expect(result.result?.GPSLongitude).to.eql(151.2093);
      expect(result.result?.GPSLatitudeRef).to.eql("S");
      expect(result.result?.GPSLongitudeRef).to.eql("E");
      expect(result.invalid).to.eql(false);
    });

    it("should handle Southwest hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.9249,
        GPSLongitude: 70.9264,
        GeolocationPosition: "-33.9249,-70.9264", // Santiago
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(-33.9249);
      expect(result.result?.GPSLongitude).to.eql(-70.9264);
      expect(result.result?.GPSLatitudeRef).to.eql("S");
      expect(result.result?.GPSLongitudeRef).to.eql("W");
      expect(result.invalid).to.eql(false);
    });

    it("should correct mismatched signs with GeolocationPosition", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.9249, // Wrong sign
        GPSLongitude: 70.9264, // Wrong sign
        GPSLatitudeRef: "N", // Wrong ref
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "-33.9249,-70.9264", // Santiago (correct)
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(-33.9249);
      expect(result.result?.GPSLongitude).to.eql(-70.9264);
      expect(result.result?.GPSLatitudeRef).to.eql("S");
      expect(result.result?.GPSLongitudeRef).to.eql("W");
      expect(result.warnings).to.include(
        "Corrected GPSLatitude sign based on GeolocationPosition",
      );
      expect(result.warnings).to.include(
        "Corrected GPSLongitude sign based on GeolocationPosition",
      );
      expect(result.warnings).to.include(
        "Corrected GPSLatitudeRef to S based on GeolocationPosition",
      );
      expect(result.warnings).to.include(
        "Corrected GPSLongitudeRef to W based on GeolocationPosition",
      );
      expect(result.invalid).to.eql(false);
    });

    it("should correct wrong signs in Northwest hemisphere", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLongitude: 74.006, // Wrong sign (positive instead of negative)
        GeolocationPosition: "40.7128,-74.0060", // New York (correct)
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(40.7128);
      expect(result.result?.GPSLongitude).to.eql(-74.006);
      expect(result.result?.GPSLatitudeRef).to.eql("N");
      expect(result.result?.GPSLongitudeRef).to.eql("W");
      expect(result.warnings).to.include(
        "Corrected GPSLongitude sign based on GeolocationPosition",
      );
      expect(result.invalid).to.eql(false);
    });

    it("should handle coordinates near the equator and prime meridian", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 0.3476,
        GPSLongitude: 0.2345,
        GeolocationPosition: "0.3476,0.2345", // Near 0,0
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(0.3476);
      expect(result.result?.GPSLongitude).to.eql(0.2345);
      expect(result.result?.GPSLatitudeRef).to.eql("N");
      expect(result.result?.GPSLongitudeRef).to.eql("E");
      expect(result.invalid).to.eql(false);
    });
  });

  it("should handle mismatched ref and coordinate signs", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: -40.7128,
      GPSLatitudeRef: "N",
      GPSLongitude: -74.006,
      GPSLongitudeRef: "E",
    };
    const result = parseGPSLocation(tags, defaultOpts)!;
    expect(result.result?.GPSLatitudeRef).to.eql("S");
    expect(result.result?.GPSLongitudeRef).to.eql("W");
    expect(result.warnings?.length).to.eql(2);
  });

  it("should handle missing ref values", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 40.7128,
      GPSLongitude: -74.006,
    };
    const result = parseGPSLocation(tags, defaultOpts)!;
    expect(result.result?.GPSLatitudeRef).to.eql("N");
    expect(result.result?.GPSLongitudeRef).to.eql("W");
  });

  describe("invalid input handling", () => {
    it("should handle non-numeric latitude/longitude values", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: "invalid" as any,
        GPSLongitude: "not-a-number" as any,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.warnings).to.have.length.greaterThan(0);
      expect(
        result.warnings?.some((w) => w.includes("Error parsing GPSLatitude")),
      ).to.be.true;
      expect(
        result.warnings?.some((w) => w.includes("Error parsing GPSLongitude")),
      ).to.be.true;
    });

    it("should handle invalid GeolocationPosition format", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        GeolocationPosition: "invalid,format,here",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.warnings).to.have.length.greaterThan(0);
      expect(
        result.warnings?.some((w) =>
          w.includes("Error parsing GeolocationPosition"),
        ),
      ).to.be.true;
    });

    it("should handle undefined and null values", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: undefined as any,
        GPSLongitude: null as any,
        GPSLatitudeRef: undefined as any,
        GPSLongitudeRef: null as any,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.invalid).to.be.false;
      expect(result.warnings).to.have.length(0);
    });

    it("should handle extreme coordinate values", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: Number.MAX_VALUE,
        GPSLongitude: Number.MIN_VALUE,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.invalid).to.be.true;
      expect(result.warnings).to.have.length.greaterThan(0);
    });

    it("should handle NaN values", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: NaN,
        GPSLongitude: NaN,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.warnings).to.have.length.greaterThan(0);
    });

    it("should handle invalid ref values", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLatitudeRef: "X", // Invalid ref
        GPSLongitude: -74.006,
        GPSLongitudeRef: "Y", // Invalid ref
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.warnings).to.have.length.greaterThan(0);
      expect(result.warnings?.some((w) => w.includes("Invalid GPSLatitudeRef")))
        .to.be.true;
      expect(
        result.warnings?.some((w) => w.includes("Invalid GPSLongitudeRef")),
      ).to.be.true;
    });
  });

  describe("edge cases", () => {
    it("should handle coordinates at exact poles", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 90,
        GPSLongitude: 0,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.invalid).to.be.false;
      expect(result.result?.GPSLatitude).to.eql(90);
      expect(result.result?.GPSLongitude).to.eql(0);
    });

    it("should handle coordinates at the international date line", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 0,
        GPSLongitude: 180,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.invalid).to.be.false;
      expect(result.result?.GPSLatitude).to.eql(0);
      expect(result.result?.GPSLongitude).to.eql(180);
    });

    it("should handle fractional zero coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 0.0000001,
        GPSLongitude: -0.0000001,
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.invalid).to.be.false;
      expect(result.result?.GPSLatitude).to.be.closeTo(0, 0.0000001);
      expect(result.result?.GPSLongitude).to.be.closeTo(0, 0.0000001);
    });
  });
});
