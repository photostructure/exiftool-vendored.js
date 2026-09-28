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
    // Each GeolocationPosition and GeolocationDistance is ExifTool's output for
    // the expected (correctly signed) coordinates, from:
    // node_modules/exiftool-vendored.pl/bin/exiftool -api "geolocation=LAT,LON" -n -GeolocationPosition -GeolocationDistance test/bad-exif-ifd.jpg

    it("should handle Northeast hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 35.6762,
        GPSLongitude: 139.6503,
        GeolocationPosition: "35.6755 139.6400", // Eifuku, Tokyo
        GeolocationDistance: "0.93 km",
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
        GeolocationPosition: "40.7143 -74.0060", // New York
        GeolocationDistance: "0.17 km",
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
        GeolocationPosition: "-33.8679 151.2072", // Sydney
        GeolocationDistance: "0.21 km",
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
        GeolocationPosition: "-33.9823 -70.7104", // San Francisco de Mostazal, near Santiago
        GeolocationDistance: "20.91 km",
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
        GeolocationPosition: "-33.9823 -70.7104", // San Francisco de Mostazal, near Santiago
        GeolocationDistance: "20.91 km",
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
        GeolocationPosition: "40.7143 -74.0060", // New York
        GeolocationDistance: "0.17 km",
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
        GeolocationPosition: "4.8982 -1.7602", // Takoradi, Ghana
        GeolocationDistance: "552.36 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result?.GPSLatitude).to.eql(0.3476);
      expect(result.result?.GPSLongitude).to.eql(0.2345);
      expect(result.result?.GPSLatitudeRef).to.eql("N");
      expect(result.result?.GPSLongitudeRef).to.eql("E");
      expect(result.invalid).to.eql(false);
    });

    // In each case the nearest city is on the other side of the prime
    // meridian, the equator, or the antimeridian, but ExifTool's
    // GeolocationDistance was measured from these same coordinates.
    for (const { desc, tags, GPSLatitude, GPSLongitude } of [
      {
        desc: "west of the prime meridian, Forest Row to the east",
        tags: {
          GPSLatitude: 51.053811,
          GPSLatitudeRef: "N",
          GPSLongitude: 0.038078,
          GPSLongitudeRef: "W",
          GeolocationPosition: "51.0964 0.0326",
          GeolocationDistance: "6.84 km",
        },
        GPSLatitude: 51.053811,
        GPSLongitude: -0.038078,
      },
      {
        desc: "west of the prime meridian, Timimoun 114 km to the east",
        tags: {
          GPSLatitude: 29,
          GPSLatitudeRef: "N",
          GPSLongitude: 0.9,
          GPSLongitudeRef: "W",
          GeolocationPosition: "29.2641 0.2359",
          GeolocationDistance: "114.15 km",
        },
        GPSLatitude: 29,
        GPSLongitude: -0.9,
      },
      {
        desc: "south of the equator, Entebbe to the north",
        tags: {
          GPSLatitude: 0.05,
          GPSLatitudeRef: "S",
          GPSLongitude: 32.5,
          GPSLongitudeRef: "E",
          GeolocationPosition: "0.0561 32.4794",
          GeolocationDistance: "12.02 km",
        },
        GPSLatitude: -0.05,
        GPSLongitude: 32.5,
      },
      {
        desc: "north of the equator, São Gabriel da Cachoeira 114 km to the south",
        tags: {
          GPSLatitude: 0.9,
          GPSLatitudeRef: "N",
          GPSLongitude: 67,
          GPSLongitudeRef: "W",
          GeolocationPosition: "-0.1181 -67.0853",
          GeolocationDistance: "113.61 km",
        },
        GPSLatitude: 0.9,
        GPSLongitude: -67,
      },
      {
        desc: "west of the antimeridian on Taveuni, Savusavu to the east",
        tags: {
          GPSLatitude: 16.83,
          GPSLatitudeRef: "S",
          GPSLongitude: 179.97,
          GPSLongitudeRef: "W",
          GeolocationPosition: "-16.7794 179.3357",
          GeolocationDistance: "74.11 km",
        },
        GPSLatitude: -16.83,
        GPSLongitude: -179.97,
      },
    ]) {
      it(`should not flip coordinates already at GeolocationDistance: ${desc}`, () => {
        const result = parseGPSLocation(tags, defaultOpts)!;
        expect(result.result).to.eql({
          GPSLatitude,
          GPSLongitude,
          GPSLatitudeRef: tags.GPSLatitudeRef,
          GPSLongitudeRef: tags.GPSLongitudeRef,
        });
        expect(result.warnings).to.eql([]);
        expect(result.invalid).to.eql(false);
      });
    }

    it("should correct a wrong longitude sign near the prime meridian", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 51.5072,
        GPSLatitudeRef: "N",
        GPSLongitude: 0.1276,
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "51.5085 -0.1257", // London
        GeolocationDistance: "0.21 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 51.5072,
        GPSLongitude: -0.1276,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "W",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLongitude sign based on GeolocationPosition",
        "Corrected GPSLongitudeRef to W based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should correct a wrong longitude sign 80 m from the prime meridian", () => {
      // Read as 0.0011 E, this is 0.339 km from Blackwall, 49 m more than
      // GeolocationDistance: more than ExifTool's rounding explains, so a
      // tolerance over 49 m would keep the wrong sign. Flipped, it is 0.281 km
      // away.
      const tags: GpsLocationTags = {
        GPSLatitude: 51.5072,
        GPSLatitudeRef: "N",
        GPSLongitude: 0.0011,
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "51.5097 -0.0017", // Blackwall, London
        GeolocationDistance: "0.29 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 51.5072,
        GPSLongitude: -0.0011,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "W",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLongitude sign based on GeolocationPosition",
        "Corrected GPSLongitudeRef to W based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should not correct signs without GeolocationDistance", () => {
      // ExifTool omits GeolocationDistance when it geolocates from city name
      // tags instead of GPS coordinates
      const tags: GpsLocationTags = {
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GeolocationPosition: "-33.8679 151.2072", // Sydney
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([]);
      expect(result.invalid).to.eql(false);
    });

    it("should not correct signs when more than one flipped position is at GeolocationDistance", () => {
      // ExifTool read 0.179 S, 0.5 W, which is 581.66 km from Takoradi.
      // Flipping the latitude of 0.179 S, 0.5 E instead lands within 34 m of
      // that too, so GeolocationDistance can't tell which sign is wrong.
      const tags: GpsLocationTags = {
        GPSLatitude: 0.179,
        GPSLatitudeRef: "S",
        GPSLongitude: 0.5,
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "4.8982 -1.7602", // Takoradi, Ghana
        GeolocationDistance: "581.66 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: -0.179,
        GPSLongitude: 0.5,
        GPSLatitudeRef: "S",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([]);
      expect(result.invalid).to.eql(false);
    });

    it("should correct a wrong longitude sign when the latitude is 0", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 0,
        GPSLatitudeRef: "N",
        GPSLongitude: 78.5,
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "-0.0542 -78.4537", // Pomasqui, Ecuador
        GeolocationDistance: "7.93 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 0,
        GPSLongitude: -78.5,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "W",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLongitude sign based on GeolocationPosition",
        "Corrected GPSLongitudeRef to W based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should correct a wrong latitude sign when the longitude is 0", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 51.4779,
        GPSLatitudeRef: "S", // Wrong ref
        GPSLongitude: 0,
        GPSLongitudeRef: "E",
        GeolocationPosition: "51.4778 -0.0117", // Greenwich
        GeolocationDistance: "0.81 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 51.4779,
        GPSLongitude: 0,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLatitude sign based on GeolocationPosition",
        "Corrected GPSLatitudeRef to N based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should correct a wrong latitude sign on the antimeridian", () => {
      // 180 E and 180 W are the same place, so flipping the longitude too
      // isn't a second match
      const tags: GpsLocationTags = {
        GPSLatitude: 16.83,
        GPSLatitudeRef: "N", // Wrong ref
        GPSLongitude: 180,
        GPSLongitudeRef: "E",
        GeolocationPosition: "-16.7794 179.3357", // Savusavu, Fiji
        GeolocationDistance: "70.94 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: -16.83,
        GPSLongitude: 180,
        GPSLatitudeRef: "S",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLatitude sign based on GeolocationPosition",
        "Corrected GPSLatitudeRef to S based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should correct a wrong latitude sign at a pole", () => {
      // Every longitude is the same place at a pole, so flipping the longitude
      // too isn't a second match
      const tags: GpsLocationTags = {
        GPSLatitude: 90,
        GPSLatitudeRef: "S", // Wrong ref
        GPSLongitude: 45,
        GPSLongitudeRef: "E",
        GeolocationPosition: "78.2233 15.6469", // Longyearbyen, Svalbard
        GeolocationDistance: "1309.49 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 90,
        GPSLongitude: 45,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([
        "Corrected GPSLatitude sign based on GeolocationPosition",
        "Corrected GPSLatitudeRef to N based on GeolocationPosition",
      ]);
      expect(result.invalid).to.eql(false);
    });

    it("should not correct signs when no sign combination is at GeolocationDistance", () => {
      // ExifTool geolocated from different GPS coordinates than these
      const tags: GpsLocationTags = {
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GeolocationPosition: "-33.8679 151.2072", // Sydney
        GeolocationDistance: "25.00 km",
      };
      const result = parseGPSLocation(tags, defaultOpts)!;
      expect(result.result).to.eql({
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "E",
      });
      expect(result.warnings).to.eql([]);
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
    expect(result.warnings).to.eql([
      "Corrected GPSLatitudeRef to S to match coordinate sign",
      "Corrected GPSLongitudeRef to W to match coordinate sign",
    ]);
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
