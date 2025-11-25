import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";
import { end, expect, testDir } from "./_chai.spec";
import { ExifTool } from "./ExifTool";
import { exiftoolPath } from "./ExiftoolPath";
import {
  GeolocationTagName,
  GeolocationTagNames,
  GeolocationTags,
} from "./GeolocationTags";

const execFileAsync = promisify(execFile);

interface ExiftoolGeolocationResult extends GeolocationTags {
  SourceFile: string;
}

async function getGeolocationTags(
  lat: number,
  lon: number,
): Promise<ExiftoolGeolocationResult> {
  const exiftool = await exiftoolPath();
  const { stdout } = await execFileAsync(exiftool, [
    "-api",
    `geolocation=${lat},${lon}`,
    "-json",
  ]);
  const results = JSON.parse(stdout) as ExiftoolGeolocationResult[];
  return results[0]!;
}

// Type ensures we have an entry for every GeolocationTagName
type ExpectedGeolocationTags = Record<GeolocationTagName, unknown>;

// Tags that are always returned by ExifTool for valid coordinates
const alwaysReturnedTags = new Set<GeolocationTagName>([
  "GeolocationBearing",
  "GeolocationCity",
  "GeolocationCountry",
  "GeolocationCountryCode",
  "GeolocationDistance",
  "GeolocationFeatureCode",
  "GeolocationFeatureType",
  "GeolocationPopulation",
  "GeolocationPosition",
  "GeolocationRegion",
  "GeolocationSubregion",
  "GeolocationTimeZone",
]);

// Tags that may not be returned in normal results
const optionalTags = new Set<GeolocationTagName>(["GeolocationWarning"]);

describe("GeolocationTags", function () {
  this.timeout(10000);
  this.slow(2000);

  // Expected values from ExifTool - this validates tag name casing
  const sfExploratorium: ExpectedGeolocationTags = {
    GeolocationBearing: 227,
    GeolocationCity: "Chinatown",
    GeolocationCountry: "United States",
    GeolocationCountryCode: "US",
    GeolocationDistance: "0.80 km",
    GeolocationFeatureCode: "PPLX",
    GeolocationFeatureType: "Section of Populated Place",
    GeolocationPopulation: 100000,
    GeolocationPosition: "37.7966, -122.4086",
    GeolocationRegion: "California",
    GeolocationSubregion: "City and County of San Francisco",
    GeolocationTimeZone: "America/Los_Angeles",
    GeolocationWarning: undefined, // Not returned for valid coordinates
  };

  const eiffelTower: ExpectedGeolocationTags = {
    GeolocationBearing: 319,
    GeolocationCity: "Neuilly-sur-Seine",
    GeolocationCountry: "France",
    GeolocationCountryCode: "FR",
    GeolocationDistance: "3.33 km",
    GeolocationFeatureCode: "PPL",
    GeolocationFeatureType: "Populated Place",
    GeolocationPopulation: 61000,
    GeolocationPosition: "48.8845, 2.2697",
    GeolocationRegion: "Île-de-France",
    GeolocationSubregion: "Hauts-de-Seine",
    GeolocationTimeZone: "Europe/Paris",
    GeolocationWarning: undefined,
  };

  // Southern hemisphere test case
  const sydneyOperaHouse: ExpectedGeolocationTags = {
    GeolocationBearing: 251,
    GeolocationCity: "The Rocks",
    GeolocationCountry: "Australia",
    GeolocationCountryCode: "AU",
    GeolocationDistance: "0.69 km",
    GeolocationFeatureCode: "PPLL",
    GeolocationFeatureType: "Populated Locality",
    GeolocationPopulation: 2100,
    GeolocationPosition: "-33.8592, 151.2083",
    GeolocationRegion: "New South Wales",
    GeolocationSubregion: "City of Sydney",
    GeolocationTimeZone: "Australia/Sydney",
    GeolocationWarning: undefined,
  };

  const testLocations = [
    {
      name: "SF Exploratorium",
      lat: 37.802078,
      lon: -122.4026305,
      expected: sfExploratorium,
    },
    {
      name: "Eiffel Tower",
      lat: 48.8583736,
      lon: 2.2919064,
      expected: eiffelTower,
    },
    {
      name: "Sydney Opera House",
      lat: -33.856784,
      lon: 151.215297,
      expected: sydneyOperaHouse,
    },
  ];

  for (const loc of testLocations) {
    describe(loc.name, () => {
      let result: ExiftoolGeolocationResult;

      before(async () => {
        result = await getGeolocationTags(loc.lat, loc.lon);
      });

      it("returns expected tag values", () => {
        for (const tagName of GeolocationTagNames.values) {
          if (optionalTags.has(tagName)) continue;
          expect(result[tagName]).to.eql(
            loc.expected[tagName],
            `Tag ${tagName} mismatch`,
          );
        }
      });

      it("all returned tag names match GeolocationTagNames casing", () => {
        const returnedKeys = Object.keys(result).filter(
          (k) => k !== "SourceFile",
        );

        const unknownTags: string[] = [];
        const knownTagsSet = new Set<string>(GeolocationTagNames.values);

        for (const key of returnedKeys) {
          if (!knownTagsSet.has(key)) {
            unknownTags.push(key);
          }
        }

        expect(unknownTags).to.eql(
          [],
          `ExifTool returned geolocation tags not in GeolocationTagNames: ${unknownTags.join(", ")}. ` +
            `This may indicate a casing mismatch or missing tags.`,
        );
      });

      it("all expected tags are returned by ExifTool", () => {
        const returnedKeys = new Set(Object.keys(result));

        for (const tagName of alwaysReturnedTags) {
          expect(returnedKeys.has(tagName)).to.eql(
            true,
            `Expected tag "${tagName}" not returned by ExifTool`,
          );
        }
      });
    });
  }

  describe("reading from image file", () => {
    let et: ExifTool;

    before(() => {
      et = new ExifTool({ geolocation: true });
    });

    after(() => end(et));

    // Expected values when reading pixel.jpg with geolocation enabled
    // Note: GeolocationPosition format differs from raw exiftool output
    // (ExifTool class normalizes "lat, lon" to "lat lon")
    const pixelJpgExpected: ExpectedGeolocationTags = {
      GeolocationBearing: 318,
      GeolocationCity: "El Granada",
      GeolocationCountry: "United States",
      GeolocationCountryCode: "US",
      GeolocationDistance: "2.60 km",
      GeolocationFeatureCode: "PPL",
      GeolocationFeatureType: "Populated Place",
      GeolocationPopulation: 5500,
      GeolocationPosition: "37.5027 -122.4694",
      GeolocationRegion: "California",
      GeolocationSubregion: "San Mateo County",
      GeolocationTimeZone: "America/Los_Angeles",
      GeolocationWarning: undefined,
    };

    it("returns geolocation tags when reading pixel.jpg", async () => {
      const tags = await et.read(join(testDir, "pixel.jpg"));

      for (const tagName of GeolocationTagNames.values) {
        if (optionalTags.has(tagName)) continue;
        expect(tags[tagName]).to.eql(
          pixelJpgExpected[tagName],
          `Tag ${tagName} mismatch`,
        );
      }
    });

    it("all returned geolocation tag names match GeolocationTagNames casing", async () => {
      const tags = await et.read(join(testDir, "pixel.jpg"));
      const returnedKeys = Object.keys(tags).filter((k) =>
        k.startsWith("Geolocation"),
      );

      const unknownTags: string[] = [];
      const knownTagsSet = new Set<string>(GeolocationTagNames.values);

      for (const key of returnedKeys) {
        if (!knownTagsSet.has(key)) {
          unknownTags.push(key);
        }
      }

      expect(unknownTags).to.eql(
        [],
        `ExifTool returned geolocation tags not in GeolocationTagNames: ${unknownTags.join(", ")}`,
      );
    });
  });
});
