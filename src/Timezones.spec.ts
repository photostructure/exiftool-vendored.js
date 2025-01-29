import { IANAZone, Info } from "luxon";
import { ExifDateTime } from "./ExifDateTime";
import { Tags } from "./Tags";
import {
  UnsetZone,
  UnsetZoneOffsetMinutes,
  extractTzOffsetFromTags,
  extractTzOffsetFromUTCOffset,
  extractZone,
  normalizeZone,
  offsetMinutesToZoneName,
  validTzOffsetMinutes,
} from "./Timezones";
import { expect } from "./_chai.spec";

describe("Timezones", () => {
  describe("UnsetZone", () => {
    it("isValid", () => {
      expect(UnsetZone.isValid).to.eql(true);
    });
    it("reasonableTzOffsetMinutes() returns undefined for UnsetZone", () => {
      expect(validTzOffsetMinutes(UnsetZoneOffsetMinutes)).to.eql(false);
    });
    it("offsetMinutesToZoneName() returns undefined for UnsetZone", () => {
      expect(offsetMinutesToZoneName(UnsetZoneOffsetMinutes)).to.eql(undefined);
    });
    it("extractOffset() returns undefined for UnsetZone", () => {
      expect(extractZone("UTC-00:01")).to.eql(undefined);
    });
  });

  describe("normalizeZone()", () => {
    describe("rejects invalid inputs", () => {
      for (const invalid of [
        undefined,
        "",
        new IANAZone("invalid"),
        "GMT/invalid",
        "BAD",
        "UTC+21",
        "UTC-15",
        "+BAD",
        "+1",
        "2014-07-19T12:05:19-09:00",
      ]) {
        it(`(${JSON.stringify(invalid)}) => undefined`, () => {
          expect(normalizeZone(invalid)).to.eql(undefined);
        });
      }
    });

    describe("accepts valid inputs", () => {
      const ts = new Date("2023-01-01T01:00:00").getTime();
      for (const ea of [
        { z: "Z", exp: "+00:00" },
        { z: "GMT", exp: "+00:00" },
        { z: "Zulu", exp: "+00:00" },
        { z: "UTC", exp: "+00:00" },
        { z: "UCT", exp: "+00:00" },
        { z: "UTC+0", exp: "+00:00" },
        { z: "UTC+00:00", exp: "+00:00" },
        { z: "UTC+07:00", exp: "+07:00" },
        { z: "UTC+07:30", exp: "+07:30" },
        { z: "UTC-03:00", exp: "-03:00" },
        { z: "America/Los_Angeles", exp: "-08:00" },
        { z: "America/Indiana/Indianapolis", exp: "-05:00" },
        { z: "America/Kentucky/Louisville", exp: "-05:00" },
        { z: "US/Hawaii", exp: "-10:00" },
        { z: "Pacific/Honolulu", exp: "-10:00" },
        { z: "Japan", exp: "+09:00" },
        { z: "GB", exp: "+00:00" }, // FIRST THEY MISSPEL COLOUR, AND NOW THIS. BLIMEY.
      ]) {
        it(`(${JSON.stringify(ea.z)}) => ${ea.exp}`, () => {
          expect(normalizeZone(ea.z)?.formatOffset(ts, "short")).to.eql(ea.exp);
        });
      }
    });
  });

  describe("extractOffset()", () => {
    function ozn(tz: string) {
      return {
        tz,
        src: "normalizeZone",
      };
    }
    const arr = [
      { s: "7", exp: "UTC+7" },
      { s: "3:30", exp: "UTC+3:30" },
    ];
    const ex = [
      { tz: "", exp: undefined },
      { tz: "garbage", exp: undefined },
      { tz: "+09:00", exp: { tz: "UTC+9", src: "offsetMinutesToZoneName" } },
      {
        tz: "America/Los_Angeles",
        exp: ozn("America/Los_Angeles"),
      },
      ...arr.map(({ s, exp }) => ({
        tz: "+" + s,
        exp: { leftovers: "", tz: exp, src: "offsetMinutesToZoneName" },
      })),
      ...arr.map(({ s, exp }) => ({ tz: "UTC+" + s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({
        tz: "-" + s,
        exp: {
          leftovers: "",
          tz: exp.replace("+", "-"),
          src: "offsetMinutesToZoneName",
        },
      })),
      ...arr.map(({ s, exp }) => ({
        tz: "UTC-" + s,
        exp: ozn(exp.replace("+", "-")),
      })),
      {
        tz: ExifDateTime.fromEXIF("2014:07:19 12:05:19-09:00"),
        exp: { tz: "UTC-9", src: "ExifDateTime.zone" },
      },
      { tz: 3, exp: { tz: "UTC+3", src: "hourOffset" } },
      { tz: -10, exp: { tz: "UTC-10", src: "hourOffset" } },
    ];

    for (const { tz, exp } of ex) {
      it(`("${tz}") => ${JSON.stringify(exp)}`, () => {
        expect(extractZone(tz)).to.containSubset(exp);
      });
    }
  });

  describe("extractTzOffsetFromTags", () => {
    describe("with TimeZone", () => {
      for (const { tzo, exp } of [
        { tzo: "+00:00", exp: "UTC" },
        { tzo: "-9", exp: "UTC-9" },
        { tzo: "-09:00", exp: "UTC-9" },
        { tzo: "+5:30", exp: "UTC+5:30" },
        { tzo: "+02:00", exp: "UTC+2" },
      ]) {
        it(`({ TimeZone: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZone: tzo })).to.eql({
            tz: exp,
            src: "TimeZone",
          });
        });
        it(`({ OffsetTime: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ OffsetTime: tzo })).to.eql({
            tz: exp,
            src: "OffsetTime",
          });
        });
        it(`({ TimeZoneOffset: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZoneOffset: tzo })).to.eql({
            tz: exp,
            src: "TimeZoneOffset",
          });
        });
        it(`${exp} normalizes to the same value`, () => {
          const zone = Info.normalizeZone(exp);
          expect(zone.name).to.eql(exp);
          expect(zone.isValid).to.eql(true);
        });
      }
    });
  });

  describe("extractTzOffsetFromUTCOffset", () => {
    it("with DateTimeUTC offset by 4 hours and preceding by one second from DateTimeOriginal", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2024:09:14 12:00:00",
          DateTimeUTC: "2024:09:14 15:59:00", // from a prior GPS fix?
        }),
      ).to.eql({
        tz: "UTC-4",
        src: "offset between DateTimeOriginal and DateTimeUTC",
      });
    });
    it("with DateTimeUTC offset by 4 hours and lagging by one second from DateTimeOriginal", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2024:09:14 12:00:00",
          DateTimeUTC: "2024:09:14 16:00:01",
        }),
      ).to.eql({
        tz: "UTC-4",
        src: "offset between DateTimeOriginal and DateTimeUTC",
      });
    });
    it("with lagging GPSDateStamp & GPSTimeStamp and DateTimeOriginal in negative offset", () => {
      expect(
        extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2016:07:25 11:08:49",
          GPSDateStamp: "2016:07:25",
          GPSTimeStamp: "17:45:46",
        }),
      ).to.eql({
        tz: "UTC-7",
        src: "offset between DateTimeOriginal and GPSDateTimeStamp",
      });
    });
    for (const tagname of [
      "DateTimeUTC",
      "GPSDateTime",
      "SonyDateTime2",
    ] as const) {
      it(`with ${tagname} and created-at CreateDate with 7 hour offset`, () => {
        const obj: Tags = {
          CreateDate: "2014:07:19 12:05:19",
        };
        obj[tagname] = "2014:07:19 19:05:19";

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC-7",
          src: "offset between CreateDate and " + tagname,
        });
      });
      it(`with lagging ${tagname} and CreateDate in positive whole-number offset`, () => {
        const obj: Tags = {
          CreateDate: "2016:07:18 09:54:03",
        };
        obj[tagname] = "2016:07:18 07:41:01Z";

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC+2",
          src: "offset between CreateDate and " + tagname,
        });
      });
      it(`with lagging ${tagname} and SubSecCreateDate in positive :20 offset`, () => {
        const obj: Tags = {
          SubSecCreateDate: "2016:07:18 09:54:03",
        };
        obj[tagname] = "2016:07:18 04:16:01";

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql({
          tz: "UTC+5:45",
          src: "offset between SubSecCreateDate and " + tagname,
        });
      });

      it(`with DateTimeUTC and very different created-at DateTime`, () => {
        const obj: Tags = {
          CreateDate: "2014:07:19 12:05:19",
        };
        obj[tagname] = "2015:07:19 19:05:19";

        expect(extractTzOffsetFromUTCOffset(obj)).to.eql(undefined);
      });
    }
  });

  describe("Nikon Daylight Savings Time (#215)", () => {
    describe("America/Los_Angeles", () => {
      it("doesn't adjust for non-daylight-savings", () => {
        const tags = {
          CreateDate: "2021:11:07 11:22:33",
          TimeZone: "-08:00",
          DaylightSavings: "No",
          Make: "NIKON CORPORATION",
        };
        expect(extractTzOffsetFromTags(tags)).to.eql({
          tz: "UTC-8",
          src: "TimeZone",
        });
      });
      it("adjusts forward by an hour for daylight-savings", () => {
        const tags = {
          CreateDate: "2021:07:07 11:22:33",
          TimeZone: "-08:00",
          DaylightSavings: "Yes",
          Make: "NIKON CORPORATION",
        };
        expect(extractTzOffsetFromTags(tags)).to.eql({
          tz: "UTC-7",
          src: "TimeZone (adjusted for DaylightSavings)",
        });
      });
      it("DOESN'T adjust forward by an hour for daylight-savings if adjustment function returns null", () => {
        const tags = {
          CreateDate: "2021:07:07 11:22:33",
          TimeZone: "-08:00",
          DaylightSavings: "Yes",
          Make: "NIKON CORPORATION",
        };
        expect(
          extractTzOffsetFromTags(tags, {
            adjustTimeZoneIfDaylightSavings: () => undefined,
          }),
        ).to.eql({
          tz: "UTC-8",
          src: "TimeZone",
        });
      });
      it("DOESN'T adjust forward by an hour for daylight-savings if NOT Nikon (by default)", () => {
        const tags = {
          CreateDate: "2021:07:07 11:22:33",
          TimeZone: "-08:00",
          DaylightSavings: "Yes",
          Make: "Canon",
        };
        expect(extractTzOffsetFromTags(tags)).to.eql({
          tz: "UTC-8",
          src: "TimeZone",
        });
      });
    });
  });
  describe("Pacific/Auckland", () => {
    it("doesn't adjust for non-daylight-savings", () => {
      const tags = {
        CreateDate: "2021:11:07 11:22:33",
        TimeZone: "+12:00",
        DaylightSavings: "No",
        Make: "NIKON CORPORATION",
      };
      expect(extractTzOffsetFromTags(tags)).to.eql({
        tz: "UTC+12",
        src: "TimeZone",
      });
    });
    it("adjusts forward by an hour for daylight-savings", () => {
      const tags = {
        CreateDate: "2021:07:07 11:22:33",
        TimeZone: "+12:00",
        DaylightSavings: "Yes",
        Make: "NIKON CORPORATION",
      };
      expect(extractTzOffsetFromTags(tags)).to.eql({
        tz: "UTC+13",
        src: "TimeZone (adjusted for DaylightSavings)",
      });
    });
    it("DOESN'T adjust forward by an hour for daylight-savings if adjustment function returns null", () => {
      const tags = {
        CreateDate: "2021:07:07 11:22:33",
        TimeZone: "+12:00",
        DaylightSavings: "Yes",
        Make: "NIKON CORPORATION",
      };
      expect(
        extractTzOffsetFromTags(tags, {
          adjustTimeZoneIfDaylightSavings: () => undefined,
        }),
      ).to.eql({
        tz: "UTC+12",
        src: "TimeZone",
      });
    });
    it("DOESN'T adjust forward by an hour for daylight-savings if NOT Nikon (by default)", () => {
      const tags = {
        CreateDate: "2021:07:07 11:22:33",
        TimeZone: "+12:00",
        DaylightSavings: "Yes",
        Make: "Apple, Inc.",
      };
      expect(extractTzOffsetFromTags(tags)).to.eql({
        tz: "UTC+12",
        src: "TimeZone",
      });
    });
  });

  describe("with problematic timezone strings", () => {
    const invalidTimeZones = [
      { input: "UTC+25:00", desc: "hours > 24" },
      { input: "UTC-25:00", desc: "negative hours < -24" },
      { input: "UTC+10:60", desc: "minutes > 59" },
      { input: "UTC+10:99", desc: "invalid minutes" },
      { input: "UTC+:", desc: "missing values" },
      { input: "UTC++10:00", desc: "double plus" },
      { input: "UTC--10:00", desc: "double minus" },
      { input: "UTC+10::00", desc: "double colon" },
      { input: "UTC10:00", desc: "missing sign" },
    ];

    invalidTimeZones.forEach(({ input, desc }) => {
      it(`rejects ${desc}: ${input}`, () => {
        expect(normalizeZone(input)).to.eql(undefined);
      });
    });
  });

  describe("with fractional offsets", () => {
    const fractionalCases = [
      { input: "+05:30", expected: "UTC+5:30" },
      { input: "+05:45", expected: "UTC+5:45" },
      { input: "-03:30", expected: "UTC-3:30" },
      { input: "UTC+05:30", expected: "UTC+5:30" },
      { input: "UTC+05:45", expected: "UTC+5:45" },
      { input: "UTC-03:30", expected: "UTC-3:30" },
    ];

    fractionalCases.forEach(({ input, expected }) => {
      it(`correctly handles ${input}`, () => {
        const result = extractZone(input);
        expect(result?.tz).to.eql(expected);
      });
    });
  });

  describe("timezone equivalence", () => {
    const equivalentPairs = [
      { a: "UTC", b: "GMT" },
      { a: "UTC+0", b: "Z" },
      { a: "UTC+00:00", b: "Zulu" },
      { a: "+00:00", b: "GMT" },
      { a: "UTC+5", b: "UTC+05:00" },
      { a: "UTC-8", b: "UTC-08:00" },
    ];

    equivalentPairs.forEach(({ a, b }) => {
      it(`considers ${a} and ${b} equivalent`, () => {
        const zoneA = normalizeZone(a);
        const zoneB = normalizeZone(b);
        expect(zoneA?.equals(zoneB!)).to.eql(true);
      });
    });
  });

  describe("extractTzOffsetFromTags with complex scenarios", () => {
    it("handles multiple timezone tags with different values", () => {
      const tags = {
        TimeZone: "+09:00",
        OffsetTime: "+08:00",
        TimeZoneOffset: "+07:00",
      };
      // Should use first valid timezone found in order of precedence
      expect(extractTzOffsetFromTags(tags)).to.eql({
        tz: "UTC+9",
        src: "TimeZone",
      });
    });

    it("handles array values in TimeZoneOffset", () => {
      const tags = {
        TimeZoneOffset: ["-8", "-7"], // Some cameras provide multiple offsets
      };
      expect(extractTzOffsetFromTags(tags as any)).to.eql({
        tz: "UTC-8",
        src: "TimeZoneOffset",
      });
    });

    it("handles null and undefined values gracefully", () => {
      const tags = {
        TimeZone: null as any,
        OffsetTime: undefined as any,
        TimeZoneOffset: "",
      };
      expect(extractTzOffsetFromTags(tags)).to.eql(undefined);
    });
  });
});
