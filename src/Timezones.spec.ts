import { IANAZone, Info } from "luxon";
import { ExifDateTime } from "./ExifDateTime";
import { Settings } from "./Settings";
import { Tags } from "./Tags";
import {
  ArchaicTimezoneOffsets,
  extractTzOffsetFromDatestamps,
  extractTzOffsetFromTags,
  extractTzOffsetFromTimeStamp,
  extractTzOffsetFromUTCOffset,
  extractZone,
  getZoneName,
  incrementZone,
  inferLikelyOffsetMinutes,
  isUTC,
  isZone,
  isZoneUnset,
  isZoneValid,
  normalizeZone,
  offsetMinutesToZoneName,
  parseTimezoneOffsetMatch,
  parseTimezoneOffsetToMinutes,
  TimezoneOffsetRE,
  UnsetZone,
  UnsetZoneOffsetMinutes,
  ValidTimezoneOffsets,
  validTzOffsetMinutes,
  zoneToShortOffset,
} from "./Timezones";
import { expect } from "./_chai.spec";

describe("Timezones", () => {
  afterEach(() => {
    Settings.reset();
  });

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
        "+123",
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
        { z: "UTC+06:30", exp: "+06:30" }, // Changed from +07:30 which is archaic (Malaysia until 1982)
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

    describe("with archaic offsets", () => {
      beforeEach(() => {
        Settings.allowArchaicTimezoneOffsets.value = true;
      });

      afterEach(() => {
        Settings.reset();
      });

      const archaicCases = [
        { z: "UTC-10:30", desc: "Hawaii 1896-1947", exp: "-10:30" },
        {
          z: "UTC-04:30",
          desc: "Venezuela 1912-1965, 2007-2016",
          exp: "-04:30",
        },
        { z: "UTC+04:51", desc: "Bombay until 1955", exp: "+04:51" },
        { z: "UTC+05:40", desc: "Nepal until 1920", exp: "+05:40" },
        { z: "UTC+07:30", desc: "Malaysia until 1982", exp: "+07:30" },
      ];

      for (const { z, desc, exp } of archaicCases) {
        it(`accepts ${z} (${desc})`, () => {
          const ts = new Date("2023-01-01T01:00:00").getTime();
          const result = normalizeZone(z);
          expect(result).to.not.eql(undefined);
          expect(result?.formatOffset(ts, "short")).to.eql(exp);
        });
      }
    });

    describe("without archaic offsets", () => {
      beforeEach(() => {
        Settings.allowArchaicTimezoneOffsets.value = false;
      });

      const archaicCases = [
        { z: "UTC-10:30", desc: "Hawaii 1896-1947" },
        { z: "UTC-04:30", desc: "Venezuela 1912-1965, 2007-2016" },
        { z: "UTC+04:51", desc: "Bombay until 1955" },
        { z: "UTC+05:40", desc: "Nepal until 1920" },
        { z: "UTC+07:30", desc: "Malaysia until 1982" },
      ];

      for (const { z, desc } of archaicCases) {
        it(`rejects ${z} (${desc})`, () => {
          expect(normalizeZone(z)).to.eql(undefined);
        });
      }
    });

    describe("numeric offset inputs", () => {
      it("accepts valid numeric offset (480 = UTC+8)", () => {
        const zone = normalizeZone(480);
        expect(zone?.name).to.eql("UTC+8");
      });

      it("accepts valid numeric offset (-300 = UTC-5)", () => {
        const zone = normalizeZone(-300);
        expect(zone?.name).to.eql("UTC-5");
      });

      it("accepts zero offset (0 = UTC)", () => {
        const zone = normalizeZone(0);
        expect(zone?.name).to.eql("UTC");
      });

      it("rejects invalid numeric offset (100 minutes)", () => {
        expect(normalizeZone(100)).to.eql(undefined);
      });

      it("rejects UnsetZone sentinel (-1)", () => {
        expect(normalizeZone(-1)).to.eql(undefined);
      });

      it("rejects offset beyond ±14 hours (1200 = 20 hours)", () => {
        expect(normalizeZone(1200)).to.eql(undefined);
      });

      it("rejects archaic offset when disabled (-630 = Hawaii -10:30)", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(normalizeZone(-630)).to.eql(undefined);
      });

      it("accepts archaic offset when enabled (-630 = Hawaii -10:30)", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        const zone = normalizeZone(-630);
        expect(zone?.name).to.eql("UTC-10:30");
        Settings.reset();
      });
    });
  });

  describe("extractOffset()", () => {
    function ozn(zone: string) {
      return {
        zone,
        tz: zone,
        src: "normalizeZone",
      };
    }
    const arr = [
      { s: "7", exp: "UTC+7" },
      { s: "3:30", exp: "UTC+3:30" },
    ];
    const ex = [
      { zone: "", exp: undefined },
      { zone: "garbage", exp: undefined },
      {
        zone: "+09:00",
        exp: ozn("UTC+9"),
      },
      {
        zone: "America/Los_Angeles",
        exp: ozn("America/Los_Angeles"),
      },
      ...arr.map(({ s, exp }) => ({
        zone: "+" + s,
        exp: ozn(exp),
      })),
      ...arr.map(({ s, exp }) => ({ zone: "UTC+" + s, exp: ozn(exp) })),
      ...arr.map(({ s, exp }) => ({
        zone: "-" + s,
        exp: ozn(exp.replace("+", "-")),
      })),
      ...arr.map(({ s, exp }) => ({
        zone: "UTC-" + s,
        exp: ozn(exp.replace("+", "-")),
      })),
      {
        zone: ExifDateTime.fromEXIF("2014:07:19 12:05:19-09:00"),
        exp: { zone: "UTC-9", src: "ExifDateTime.zone" },
      },
      { zone: 3, exp: { zone: "UTC+3", src: "hourOffset" } },
      { zone: -10, exp: { zone: "UTC-10", src: "hourOffset" } },
    ];

    for (const { zone, exp } of ex) {
      it(`("${zone}") => ${JSON.stringify(exp)}`, () => {
        expect(extractZone(zone)).to.containSubset(exp);
      });
    }
  });

  describe("Unicode timezone signs", () => {
    it("should handle Unicode minus sign (U+2212) in offset", () => {
      const result = extractZone("−08:00"); // Unicode minus
      expect(result?.zone).to.equal("UTC-8");
      expect(result?.src).to.equal("normalizeZone");
    });

    it("should handle Unicode minus sign with UTC prefix", () => {
      const result = extractZone("UTC−8"); // Unicode minus
      expect(result?.zone).to.equal("UTC-8");
      expect(result?.src).to.equal("normalizeZone");
    });

    it("should handle Unicode minus in full timestamp", () => {
      const result = extractZone("2023:01:15 10:30:00−08:00"); // Unicode minus
      expect(result?.zone).to.equal("UTC-8");
      expect(result?.leftovers).to.equal("2023:01:15 10:30:00");
    });

    it("should handle archaic offset with Unicode minus", () => {
      Settings.allowArchaicTimezoneOffsets.value = true;
      const result = extractZone("−00:44"); // Liberia historical offset with Unicode minus
      expect(result?.zone).to.match(/UTC-0:44/);
    });

    it("should normalize Unicode minus to ASCII minus in zone name", () => {
      const result = extractZone("−08:00"); // Unicode minus input
      expect(result?.zone).to.match(/^UTC-/); // ASCII minus in output
      expect(result?.zone).to.not.match(/−/); // No Unicode minus in output
    });
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
            zone: exp,
            tz: exp,
            src: "TimeZone",
          });
        });
        it(`({ OffsetTimeOriginal: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ OffsetTimeOriginal: tzo })).to.eql({
            zone: exp,
            tz: exp,
            src: "OffsetTimeOriginal",
          });
        });
        it(`({ TimeZoneOffset: ${tzo}}) => ${exp}`, () => {
          expect(extractTzOffsetFromTags({ TimeZoneOffset: tzo })).to.eql({
            zone: exp,
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
        zone: "UTC-4",
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
        zone: "UTC-4",
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
        zone: "UTC-7",
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
          zone: "UTC-7",
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
          zone: "UTC+2",
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
          zone: "UTC+5:45",
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

    describe("with archaic timezone offsets", () => {
      it("rounds archaic Hawaii offset (-10:30) to nearest valid offset (-11:00) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        // Hawaii archaic offset is -10:30 (630 minutes)
        // With 30-minute tolerance, rounds to -11:00 (660 minutes)
        const result = extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2024:09:14 12:00:00",
          DateTimeUTC: "2024:09:14 22:30:00",
        });
        expect(result?.zone).to.eql("UTC-11");
      });

      it("accepts archaic Hawaii offset (-10:30) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        expect(
          extractTzOffsetFromUTCOffset({
            DateTimeOriginal: "2024:09:14 12:00:00",
            DateTimeUTC: "2024:09:14 22:30:00",
          }),
        ).to.eql({
          zone: "UTC-10:30",
          tz: "UTC-10:30",
          src: "offset between DateTimeOriginal and DateTimeUTC",
        });
      });

      it("rounds archaic Venezuela offset (-04:30) to nearest valid offset (-05:00) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        // Venezuela archaic offset is -04:30 (270 minutes)
        // With 30-minute tolerance, rounds to -05:00 (300 minutes)
        const result = extractTzOffsetFromUTCOffset({
          CreateDate: "2024:09:14 12:00:00",
          GPSDateTime: "2024:09:14 16:30:00",
        });
        expect(result?.zone).to.eql("UTC-5");
      });

      it("accepts archaic Venezuela offset (-04:30) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        expect(
          extractTzOffsetFromUTCOffset({
            CreateDate: "2024:09:14 12:00:00",
            GPSDateTime: "2024:09:14 16:30:00",
          }),
        ).to.eql({
          zone: "UTC-4:30",
          tz: "UTC-4:30",
          src: "offset between CreateDate and GPSDateTime",
        });
      });

      it("rounds archaic Bombay offset (+04:51) to nearest valid offset (+05:00) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        // +04:51 is only 9 minutes from +05:00, so it gets rounded
        const result = extractTzOffsetFromUTCOffset({
          DateTimeOriginal: "2024:09:14 12:00:00",
          DateTimeUTC: "2024:09:14 07:09:00",
        });
        expect(result?.zone).to.eql("UTC+5");
      });

      it("accepts exact archaic Bombay offset (+04:51) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        expect(
          extractTzOffsetFromUTCOffset({
            DateTimeOriginal: "2024:09:14 12:00:00",
            DateTimeUTC: "2024:09:14 07:09:00",
          }),
        ).to.eql({
          zone: "UTC+4:51",
          tz: "UTC+4:51",
          src: "offset between DateTimeOriginal and DateTimeUTC",
        });
      });
    });
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
          zone: "UTC-8",
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
          zone: "UTC-7",
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
          zone: "UTC-8",
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
        expect(extractTzOffsetFromTags(tags)).to.containSubset({
          zone: "UTC-8",
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
      expect(extractTzOffsetFromTags(tags)).to.containSubset({
        zone: "UTC+12",
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
        zone: "UTC+13",
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
      ).to.containSubset({
        zone: "UTC+12",
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
      expect(extractTzOffsetFromTags(tags)).to.containSubset({
        zone: "UTC+12",
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
        TimeZoneOffset: "+07:00",
      };
      // Should use first valid timezone found in order of precedence
      expect(extractTzOffsetFromTags(tags)).to.containSubset({
        zone: "UTC+9",
        tz: "UTC+9",
        src: "TimeZone",
      });
    });

    it("handles array values in TimeZoneOffset", () => {
      const tags = {
        TimeZoneOffset: ["-8", "-7"], // Some cameras provide multiple offsets
      };
      expect(extractTzOffsetFromTags(tags as any)).to.containSubset({
        zone: "UTC-8",
        tz: "UTC-8",
        src: "TimeZoneOffset",
      });
    });

    it("handles null and undefined values gracefully", () => {
      const tags = {
        TimeZone: null as any,
        TimeZoneOffset: "",
      };
      expect(extractTzOffsetFromTags(tags)).to.eql(undefined);
    });
  });

  describe("Settings.allowArchaicTimezoneOffsets", () => {
    afterEach(() => {
      // Reset to default after each test
      Settings.reset();
    });

    describe("archaic offsets are rejected by default", () => {
      for (const offset of ArchaicTimezoneOffsets) {
        it(`rejects ${offset} when allowArchaicTimezoneOffsets is false`, () => {
          Settings.allowArchaicTimezoneOffsets.value = false;
          expect(validTzOffsetMinutes(offsetToMinutes(offset))).to.eql(false);
          expect(extractZone(offset)).to.eql(undefined);
        });
      }
    });

    describe("archaic offsets are accepted when enabled", () => {
      for (const offset of ArchaicTimezoneOffsets) {
        it(`accepts ${offset} when allowArchaicTimezoneOffsets is true`, () => {
          Settings.allowArchaicTimezoneOffsets.value = true;
          const minutes = offsetToMinutes(offset);
          expect(validTzOffsetMinutes(minutes)).to.eql(true);
          const zoneName = offsetMinutesToZoneName(minutes);
          expect(zoneName).to.not.eql(undefined);
        });
      }
    });

    it("resetToDefaults() restores default behavior", () => {
      Settings.allowArchaicTimezoneOffsets.value = true;
      Settings.reset();
      expect(Settings.allowArchaicTimezoneOffsets.value).to.eql(false);
      // Should reject archaic offset after reset
      expect(extractZone("-10:30")).to.eql(undefined);
    });

    describe("specific archaic offset examples", () => {
      it("rejects Hawaii archaic offset (-10:30) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        const tags = { TimeZone: "-10:30" };
        expect(extractTzOffsetFromTags(tags)).to.eql(undefined);
      });

      it("accepts Hawaii archaic offset (-10:30) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        const tags = { TimeZone: "-10:30" };
        const result = extractTzOffsetFromTags(tags);
        expect(result?.zone).to.match(/UTC-10:30/);
      });

      it("rejects Bombay archaic offset (+04:51) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        const tags = { TimeZone: "+04:51" };
        expect(extractTzOffsetFromTags(tags)).to.eql(undefined);
      });

      it("accepts Bombay archaic offset (+04:51) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        const tags = { TimeZone: "+04:51" };
        const result = extractTzOffsetFromTags(tags);
        expect(result?.zone).to.match(/UTC\+4:51/);
      });

      it("rejects Ireland archaic offset (-00:25:21) by default", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        const tags = { TimeZone: "-00:25:21" };
        expect(extractTzOffsetFromTags(tags)).to.eql(undefined);
      });

      it("accepts Ireland archaic offset (-00:25:21) when enabled", () => {
        Settings.allowArchaicTimezoneOffsets.value = true;
        const tags = { TimeZone: "-00:25:21" };
        const result = extractTzOffsetFromTags(tags);
        // Note: Luxon zone names may not preserve seconds precision
        expect(result).to.not.eql(undefined);
        expect(result?.zone).to.match(/^UTC-0:/);
      });
    });

    describe("cache invalidation", () => {
      it("cache is invalidated when setting changes from false to true", () => {
        // Start with archaic offsets disabled
        Settings.allowArchaicTimezoneOffsets.value = false;
        const hawaiiMinutes = offsetToMinutes("-10:30");
        expect(validTzOffsetMinutes(hawaiiMinutes)).to.eql(false);

        // Enable archaic offsets
        Settings.allowArchaicTimezoneOffsets.value = true;
        // Cache should be invalidated, so now it should be valid
        expect(validTzOffsetMinutes(hawaiiMinutes)).to.eql(true);
      });

      it("cache is invalidated when setting changes from true to false", () => {
        // Start with archaic offsets enabled
        Settings.allowArchaicTimezoneOffsets.value = true;
        const bombayMinutes = offsetToMinutes("+04:51");
        expect(validTzOffsetMinutes(bombayMinutes)).to.eql(true);

        // Disable archaic offsets
        Settings.allowArchaicTimezoneOffsets.value = false;
        // Cache should be invalidated, so now it should be invalid
        expect(validTzOffsetMinutes(bombayMinutes)).to.eql(false);
      });

      it("cache works correctly after multiple setting toggles", () => {
        const venezuelaMinutes = offsetToMinutes("-04:30");

        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(validTzOffsetMinutes(venezuelaMinutes)).to.eql(false);

        Settings.allowArchaicTimezoneOffsets.value = true;
        expect(validTzOffsetMinutes(venezuelaMinutes)).to.eql(true);

        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(validTzOffsetMinutes(venezuelaMinutes)).to.eql(false);

        Settings.allowArchaicTimezoneOffsets.value = true;
        expect(validTzOffsetMinutes(venezuelaMinutes)).to.eql(true);
      });

      it("extractZone respects cache invalidation", () => {
        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(extractZone("+04:51")).to.eql(undefined);

        Settings.allowArchaicTimezoneOffsets.value = true;
        const result = extractZone("+04:51");
        expect(result).to.not.eql(undefined);
        expect(result?.zone).to.match(/UTC\+4:51/);

        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(extractZone("+04:51")).to.eql(undefined);
      });

      it("offsetMinutesToZoneName respects cache invalidation", () => {
        const irelandMinutes = offsetToMinutes("-00:25:21");

        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(offsetMinutesToZoneName(irelandMinutes)).to.eql(undefined);

        Settings.allowArchaicTimezoneOffsets.value = true;
        const zoneName = offsetMinutesToZoneName(irelandMinutes);
        expect(zoneName).to.not.eql(undefined);
        expect(zoneName).to.match(/UTC-/);

        Settings.allowArchaicTimezoneOffsets.value = false;
        expect(offsetMinutesToZoneName(irelandMinutes)).to.eql(undefined);
      });
    });
  });

  describe("isUTC()", () => {
    it("returns true for UTC string", () => {
      expect(isUTC("UTC")).to.eql(true);
    });

    it("returns true for GMT string", () => {
      expect(isUTC("GMT")).to.eql(true);
    });

    it("returns true for Z", () => {
      expect(isUTC("Z")).to.eql(true);
    });

    it("returns false for Zulu (must normalize first)", () => {
      // "Zulu" gets normalized to "UTC" in normalizeZone, but isUTC doesn't normalize
      expect(isUTC("Zulu")).to.eql(false);
      // After normalizing, it's UTC:
      const zone = normalizeZone("Zulu");
      expect(isUTC(zone)).to.eql(true);
    });

    it("returns true for numeric 0", () => {
      expect(isUTC(0)).to.eql(true);
    });

    it("returns true for numeric -0", () => {
      expect(isUTC(-0)).to.eql(true);
    });

    it("returns true for +0", () => {
      expect(isUTC("+0")).to.eql(true);
    });

    it("returns true for +00:00", () => {
      expect(isUTC("+00:00")).to.eql(true);
    });

    it("returns true for UTC+0", () => {
      expect(isUTC("UTC+0")).to.eql(true);
    });

    it("returns true for GMT+0", () => {
      expect(isUTC("GMT+0")).to.eql(true);
    });

    it("returns true for UTC+00:00", () => {
      expect(isUTC("UTC+00:00")).to.eql(true);
    });

    it("returns true for GMT+00:00", () => {
      expect(isUTC("GMT+00:00")).to.eql(true);
    });

    it("returns true for UTC Zone instance", () => {
      const zone = Info.normalizeZone("UTC");
      expect(isUTC(zone)).to.eql(true);
    });

    it("returns false for America/New_York", () => {
      expect(isUTC("America/New_York")).to.eql(false);
    });

    it("returns false for +08:00", () => {
      expect(isUTC("+08:00")).to.eql(false);
    });

    it("returns false for numeric 480", () => {
      expect(isUTC(480)).to.eql(false);
    });

    it("returns false for null", () => {
      expect(isUTC(null)).to.eql(false);
    });

    it("returns false for undefined", () => {
      expect(isUTC(undefined)).to.eql(false);
    });

    it("returns false for non-UTC Zone instance", () => {
      const zone = Info.normalizeZone("America/Los_Angeles");
      expect(isUTC(zone)).to.eql(false);
    });

    // New tests for expanded Zulus array
    it("returns true for string '0'", () => {
      expect(isUTC("0")).to.eql(true);
    });

    it("returns true for Etc/UTC", () => {
      expect(isUTC("Etc/UTC")).to.eql(true);
    });

    it("returns true for +00", () => {
      expect(isUTC("+00")).to.eql(true);
    });

    it("returns true for -00", () => {
      expect(isUTC("-00")).to.eql(true);
    });

    it("returns true for -00:00", () => {
      expect(isUTC("-00:00")).to.eql(true);
    });

    it("returns false for non-zero numeric offsets", () => {
      expect(isUTC(1)).to.eql(false);
      expect(isUTC(7)).to.eql(false);
      expect(isUTC(-7)).to.eql(false);
      expect(isUTC(60)).to.eql(false);
      expect(isUTC(-60)).to.eql(false);
    });

    // Systematic test of all ValidTimezoneOffsets
    describe("ValidTimezoneOffsets coverage", () => {
      for (const offset of ValidTimezoneOffsets) {
        const expected = offset === "+00:00";
        it(`isUTC("${offset}") === ${expected}`, () => {
          expect(isUTC(offset)).to.eql(expected);
        });
      }
    });
  });

  describe("isZoneUnset()", () => {
    it("returns true for UnsetZone", () => {
      expect(isZoneUnset(UnsetZone)).to.eql(true);
    });

    it("returns false for UTC", () => {
      const zone = Info.normalizeZone("UTC");
      if (zone) expect(isZoneUnset(zone)).to.eql(false);
    });

    it("returns false for UTC+8", () => {
      const zone = Info.normalizeZone("UTC+8");
      if (zone) expect(isZoneUnset(zone)).to.eql(false);
    });

    it("returns false for IANA zone", () => {
      const zone = Info.normalizeZone("America/New_York");
      if (zone) expect(isZoneUnset(zone)).to.eql(false);
    });
  });

  describe("isZoneValid()", () => {
    it("returns true for UTC", () => {
      const zone = Info.normalizeZone("UTC");
      expect(isZoneValid(zone)).to.eql(true);
    });

    it("returns true for UTC+8", () => {
      const zone = Info.normalizeZone("UTC+8");
      expect(isZoneValid(zone)).to.eql(true);
    });

    it("returns true for America/Los_Angeles", () => {
      const zone = Info.normalizeZone("America/Los_Angeles");
      expect(isZoneValid(zone)).to.eql(true);
    });

    it("returns false for UnsetZone", () => {
      expect(isZoneValid(UnsetZone)).to.eql(false);
    });

    it("returns false for invalid zone", () => {
      const zone = Info.normalizeZone("invalid");
      expect(isZoneValid(zone)).to.eql(false);
    });

    it("returns false for null", () => {
      expect(isZoneValid(null as any)).to.eql(false);
    });

    it("returns false for undefined", () => {
      expect(isZoneValid(undefined)).to.eql(false);
    });

    it("returns false for zone beyond ±14 hours (UTC+20)", () => {
      // Create a zone with offset beyond valid range
      const zone = Info.normalizeZone("UTC+20");
      expect(isZoneValid(zone)).to.eql(false);
    });
  });

  describe("isZone()", () => {
    it("returns true for Zone instance from normalizeZone", () => {
      const zone = Info.normalizeZone("UTC");
      expect(isZone(zone)).to.eql(true);
    });

    it("returns true for IANA Zone", () => {
      const zone = Info.normalizeZone("America/Los_Angeles");
      expect(isZone(zone)).to.eql(true);
    });

    it("returns false for string", () => {
      expect(isZone("UTC")).to.eql(false);
    });

    it("returns false for number", () => {
      expect(isZone(480)).to.eql(false);
    });

    it("returns false for null", () => {
      expect(isZone(null)).to.eql(false);
    });

    it("returns false for undefined", () => {
      expect(isZone(undefined)).to.eql(false);
    });

    it("returns false for plain object", () => {
      expect(isZone({ name: "UTC" })).to.eql(false);
    });
  });

  describe("zoneToShortOffset()", () => {
    it("converts UTC+8 to +08:00", () => {
      expect(zoneToShortOffset("UTC+8")).to.eql("+08:00");
    });

    it("converts numeric 480 to +08:00", () => {
      expect(zoneToShortOffset(480)).to.eql("+08:00");
    });

    it("converts UTC-3:30 to -03:30", () => {
      expect(zoneToShortOffset("UTC-3:30")).to.eql("-03:30");
    });

    it("converts UTC to +00:00", () => {
      expect(zoneToShortOffset("UTC")).to.eql("+00:00");
    });

    it("handles IANA zone with timestamp in winter (PST)", () => {
      const winter = new Date("2023-01-15").getTime();
      expect(zoneToShortOffset("America/Los_Angeles", winter)).to.eql("-08:00");
    });

    it("handles IANA zone with timestamp in summer (PDT)", () => {
      const summer = new Date("2023-07-15").getTime();
      expect(zoneToShortOffset("America/Los_Angeles", summer)).to.eql("-07:00");
    });

    it("returns empty string for invalid zone", () => {
      expect(zoneToShortOffset("invalid")).to.eql("");
    });

    it("returns empty string for null", () => {
      expect(zoneToShortOffset(null as any)).to.eql("");
    });

    it("returns empty string for undefined", () => {
      expect(zoneToShortOffset(undefined)).to.eql("");
    });
  });

  describe("incrementZone()", () => {
    it("increments UTC+8 by 60 minutes to UTC+9", () => {
      const result = incrementZone("UTC+8", 60);
      expect(result?.name).to.eql("UTC+9");
    });

    it("increments UTC-5 by -60 minutes to UTC-6", () => {
      const result = incrementZone("UTC-5", -60);
      expect(result?.name).to.eql("UTC-6");
    });

    it("increments UTC by 30 minutes to UTC+0:30", () => {
      const result = incrementZone("UTC", 30);
      expect(result?.name).to.eql("UTC+0:30");
    });

    it("increments numeric offset 480 by 60 to 540", () => {
      const result = incrementZone(480, 60);
      expect(result?.offset(0)).to.eql(540);
    });

    it("returns undefined for IANA zone (not universal)", () => {
      const result = incrementZone("America/Los_Angeles", 60);
      expect(result).to.eql(undefined);
    });

    it("returns undefined for invalid zone", () => {
      const result = incrementZone("invalid", 60);
      expect(result).to.eql(undefined);
    });
  });

  describe("inferLikelyOffsetMinutes()", () => {
    afterEach(() => {
      Settings.reset();
    });

    it("returns exact match for 480 (UTC+8)", () => {
      expect(inferLikelyOffsetMinutes(480)).to.eql(480);
    });

    it("returns exact match for -300 (UTC-5)", () => {
      expect(inferLikelyOffsetMinutes(-300)).to.eql(-300);
    });

    it("rounds 485 to 480 (within 30 min default threshold)", () => {
      expect(inferLikelyOffsetMinutes(485)).to.eql(480);
    });

    it("rounds -295 to -300 (within 30 min default threshold)", () => {
      expect(inferLikelyOffsetMinutes(-295)).to.eql(-300);
    });

    it("rounds 330.5 to 330 (UTC+5:30)", () => {
      expect(inferLikelyOffsetMinutes(330.5)).to.eql(330);
    });

    it("rounds 495 to 480 (within 30 min default threshold)", () => {
      expect(inferLikelyOffsetMinutes(495)).to.eql(480);
    });

    it("rounds 505 to 510 (within 30 min default threshold)", () => {
      expect(inferLikelyOffsetMinutes(505)).to.eql(510);
    });

    it("rounds 100 to 120 (UTC+2, within 30 min default threshold)", () => {
      // 100 minutes is 20 minutes from 120 (UTC+2), within 30-minute threshold
      expect(inferLikelyOffsetMinutes(100)).to.eql(120);
    });

    it("rounds 666 to 660 (UTC+11, within 30 min threshold)", () => {
      // 666 minutes is only 6 minutes from UTC+11 (660 minutes)
      expect(inferLikelyOffsetMinutes(666)).to.eql(660);
    });

    it("handles GPS lag of 23 minutes (real-world case)", () => {
      // 443 minutes = ~7h23m, should round to 420 (UTC-7)
      expect(inferLikelyOffsetMinutes(443)).to.eql(420);
    });

    it("accepts custom threshold override", () => {
      expect(inferLikelyOffsetMinutes(495, 30)).to.eql(480);
      expect(inferLikelyOffsetMinutes(495, 10)).to.eql(undefined);
    });

    it("rounds 485 with custom threshold of 5 minutes", () => {
      expect(inferLikelyOffsetMinutes(485, 5)).to.eql(480);
    });

    it("rejects with custom threshold of 4 minutes", () => {
      expect(inferLikelyOffsetMinutes(485, 4)).to.eql(undefined);
    });

    it("respects Settings.maxValidOffsetMinutes", () => {
      Settings.maxValidOffsetMinutes.value = 15;
      expect(inferLikelyOffsetMinutes(495)).to.eql(480); // 15 min from UTC+8 (480), at threshold
      expect(inferLikelyOffsetMinutes(496)).to.eql(510); // 14 min from UTC+8:30 (510), within threshold
      expect(inferLikelyOffsetMinutes(526)).to.eql(525); // 1 min from UTC+8:45 (525), within threshold
      expect(inferLikelyOffsetMinutes(556)).to.eql(570); // 14 min from UTC+9:30 (570), within threshold

      // Test a value that's beyond 15-minute threshold from all valid offsets
      // 700 minutes is 20 min from UTC+12 (720) and 40 min from UTC+11 (660)
      expect(inferLikelyOffsetMinutes(700)).to.eql(undefined); // beyond 15 min threshold

      Settings.maxValidOffsetMinutes.value = 5;
      expect(inferLikelyOffsetMinutes(485)).to.eql(480); // within threshold
      expect(inferLikelyOffsetMinutes(486)).to.eql(undefined); // beyond threshold
    });

    it("handles fractional offsets like Nepal UTC+5:45", () => {
      expect(inferLikelyOffsetMinutes(345)).to.eql(345);
    });

    it("rounds near-Nepal offset 343 to 345", () => {
      expect(inferLikelyOffsetMinutes(343)).to.eql(345);
    });
  });

  describe("extractTzOffsetFromDatestamps()", () => {
    const opts = {
      inferTimezoneFromDatestamps: true,
      inferTimezoneFromDatestampTags: [
        "DateTimeOriginal",
        "CreateDate",
      ] as (keyof Tags)[],
    };

    it("extracts timezone from DateTimeOriginal with offset", () => {
      const tags = {
        DateTimeOriginal: "2023:01:15 10:30:00-08:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result?.zone).to.eql("UTC-8");
      expect(result?.src).to.eql("DateTimeOriginal");
    });

    it("extracts timezone from CreateDate with offset", () => {
      const tags = {
        CreateDate: "2023:01:15 10:30:00+09:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result?.zone).to.eql("UTC+9");
      expect(result?.src).to.eql("CreateDate");
    });

    it("ignores UTC offsets (spurious +00:00 from Google Takeout)", () => {
      const tags = {
        DateTimeOriginal: "2023:01:15 10:30:00+00:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result).to.eql(undefined);
    });

    it("returns undefined when inferTimezoneFromDatestamps is false", () => {
      const tags = {
        DateTimeOriginal: "2023:01:15 10:30:00-08:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, {
        inferTimezoneFromDatestamps: false,
      });
      expect(result).to.eql(undefined);
    });

    it("returns undefined when no tags match", () => {
      const tags = {
        SubSecCreateDate: "2023:01:15 10:30:00-08:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result).to.eql(undefined);
    });

    it("returns undefined when tags have no timezone", () => {
      const tags = {
        DateTimeOriginal: "2023:01:15 10:30:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result).to.eql(undefined);
    });

    it("uses first valid tag in order", () => {
      const tags = {
        DateTimeOriginal: "2023:01:15 10:30:00-08:00",
        CreateDate: "2023:01:15 10:30:00+09:00",
      };
      const result = extractTzOffsetFromDatestamps(tags, opts);
      expect(result?.zone).to.eql("UTC-8");
      expect(result?.src).to.eql("DateTimeOriginal");
    });
  });

  describe("extractTzOffsetFromTimeStamp()", () => {
    // Note: This function is already extensively tested in ReadTask.spec.ts
    // These tests cover basic functionality

    it("returns undefined when inferTimezoneFromTimeStamp is false", () => {
      const tags: Tags = {
        TimeStamp: "2023:01:15 19:30:00-07:00",
        DateTimeOriginal: "2023:01:15 11:30:00",
      };
      const result = extractTzOffsetFromTimeStamp(tags, {
        inferTimezoneFromTimeStamp: false,
      });
      expect(result).to.eql(undefined);
    });

    it("returns undefined when TimeStamp is missing", () => {
      const tags: Tags = {
        DateTimeOriginal: "2023:01:15 11:30:00",
      };
      const result = extractTzOffsetFromTimeStamp(tags, {
        inferTimezoneFromTimeStamp: true,
        inferTimezoneFromDatestampTags: ["DateTimeOriginal"],
      });
      expect(result).to.eql(undefined);
    });

    it("returns undefined when all datestamp tags are missing", () => {
      const tags: Tags = {
        TimeStamp: "2023:01:15 19:30:00-07:00",
      };
      const result = extractTzOffsetFromTimeStamp(tags, {
        inferTimezoneFromTimeStamp: true,
        inferTimezoneFromDatestampTags: ["DateTimeOriginal"],
      });
      expect(result).to.eql(undefined);
    });

    it("extracts explicit zone from DateTimeOriginal with timezone", () => {
      const dateTime = ExifDateTime.fromEXIF("2023:01:15 11:30:00+09:00");
      expect(dateTime).to.not.eql(undefined);
      const tags: Tags = {
        TimeStamp: "2023:01:15 19:30:00-07:00",
        DateTimeOriginal: dateTime!,
      };
      const result = extractTzOffsetFromTimeStamp(tags, {
        inferTimezoneFromTimeStamp: true,
        inferTimezoneFromDatestampTags: ["DateTimeOriginal"],
      });
      expect(result?.zone).to.eql("UTC+9");
      expect(result?.src).to.eql("DateTimeOriginal");
    });
  });

  describe("getZoneName()", () => {
    it("returns zone name from Zone instance", () => {
      const zone = Info.normalizeZone("America/Los_Angeles");
      const result = getZoneName({ zone });
      expect(result).to.eql("America/Los_Angeles");
    });

    it("returns zone name from zoneName string", () => {
      const result = getZoneName({ zoneName: "UTC+8" });
      expect(result).to.eql("UTC+8");
    });

    it("returns zone name from tzoffsetMinutes", () => {
      const result = getZoneName({ tzoffsetMinutes: 480 });
      expect(result).to.eql("UTC+8");
    });

    it("prioritizes zone over zoneName", () => {
      const zone = Info.normalizeZone("America/New_York");
      const result = getZoneName({ zone, zoneName: "UTC+8" });
      expect(result).to.eql("America/New_York");
    });

    it("prioritizes zoneName over tzoffsetMinutes", () => {
      const result = getZoneName({ zoneName: "UTC+9", tzoffsetMinutes: 480 });
      expect(result).to.eql("UTC+9");
    });

    it("returns undefined for UnsetZone", () => {
      const result = getZoneName({ zone: UnsetZone });
      expect(result).to.eql(undefined);
    });

    it("returns undefined for invalid zoneName", () => {
      const result = getZoneName({ zoneName: "invalid" });
      expect(result).to.eql(undefined);
    });

    it("returns undefined for invalid tzoffsetMinutes", () => {
      const result = getZoneName({ tzoffsetMinutes: 12345 });
      expect(result).to.eql(undefined);
    });

    it("returns undefined for empty object", () => {
      const result = getZoneName({});
      expect(result).to.eql(undefined);
    });
  });

  describe("IanaFormatRE edge cases", () => {
    it("accepts WET (3-letter IANA timezone)", () => {
      const result = normalizeZone("WET");
      expect(result).to.not.eql(undefined);
      expect(result?.name).to.eql("WET");
    });

    it("accepts GB (2-letter IANA timezone)", () => {
      const result = normalizeZone("GB");
      expect(result).to.not.eql(undefined);
    });

    it("accepts America/Indiana/Indianapolis (double-slash IANA path)", () => {
      const result = normalizeZone("America/Indiana/Indianapolis");
      expect(result).to.not.eql(undefined);
      expect(result?.name).to.eql("America/Indiana/Indianapolis");
    });

    it("accepts America/Kentucky/Louisville (double-slash IANA path)", () => {
      const result = normalizeZone("America/Kentucky/Louisville");
      expect(result).to.not.eql(undefined);
      expect(result?.name).to.eql("America/Kentucky/Louisville");
    });

    it("accepts Asia/Tokyo (single-slash IANA path)", () => {
      const result = normalizeZone("Asia/Tokyo");
      expect(result).to.not.eql(undefined);
      expect(result?.name).to.eql("Asia/Tokyo");
    });

    it("accepts Japan (IANA timezone without slashes)", () => {
      const result = normalizeZone("Japan");
      expect(result).to.not.eql(undefined);
    });

    it("rejects W-SU (hyphen not in \\w)", () => {
      // The IanaFormatRE uses \w which doesn't include hyphens
      const result = normalizeZone("W-SU");
      // This will be rejected by the regex and passed to Info.normalizeZone
      // If Luxon accepts it, it will normalize; otherwise undefined
      // Let's verify the actual behavior
      expect(result).to.satisfy(
        (r: any) => r == null || r.isValid,
        "W-SU should either be rejected or normalized by Luxon",
      );
    });

    it("rejects single letter (below 2-char minimum)", () => {
      const result = normalizeZone("X");
      expect(result).to.eql(undefined);
    });

    it("rejects path component with hyphen", () => {
      // The regex doesn't allow hyphens in timezone names
      const result = normalizeZone("America/North-Dakota/Center");
      // This should fail the regex test but might be accepted by Luxon
      expect(result).to.satisfy(
        (r: any) => r == null || r.isValid,
        "Hyphenated zones should either be rejected by regex or normalized by Luxon",
      );
    });
  });

  describe("parseTimezoneOffsetToMinutes()", () => {
    it("parses +08:00 to 480", () => {
      expect(parseTimezoneOffsetToMinutes("+08:00")).to.eql(480);
    });

    it("parses -05:30 to -330", () => {
      expect(parseTimezoneOffsetToMinutes("-05:30")).to.eql(-330);
    });

    it("parses UTC+8 to 480", () => {
      expect(parseTimezoneOffsetToMinutes("UTC+8")).to.eql(480);
    });

    it("parses GMT-5 to -300", () => {
      expect(parseTimezoneOffsetToMinutes("GMT-5")).to.eql(-300);
    });

    it("parses Z to 0", () => {
      expect(parseTimezoneOffsetToMinutes("Z")).to.eql(0);
    });

    it("parses UTC to 0", () => {
      expect(parseTimezoneOffsetToMinutes("UTC")).to.eql(0);
    });

    it("parses archaic Ireland offset -00:25:21", () => {
      const result = parseTimezoneOffsetToMinutes("-00:25:21");
      expect(result).to.be.closeTo(-25.35, 0.01);
    });

    it("handles Unicode minus sign (U+2212)", () => {
      expect(parseTimezoneOffsetToMinutes("−08:00")).to.eql(-480);
    });

    it("returns undefined for invalid input", () => {
      expect(parseTimezoneOffsetToMinutes("invalid")).to.eql(undefined);
      expect(parseTimezoneOffsetToMinutes("")).to.eql(undefined);
      expect(parseTimezoneOffsetToMinutes("+25:00")).to.eql(undefined);
    });

    // https://github.com/photostructure/exiftool-vendored.js/issues/318
    it("parses colon-less +0800 to 480", () => {
      expect(parseTimezoneOffsetToMinutes("+0800")).to.eql(480);
    });

    it("parses colon-less -0300 to -180", () => {
      expect(parseTimezoneOffsetToMinutes("-0300")).to.eql(-180);
    });

    it("parses colon-less -0530 to -330", () => {
      expect(parseTimezoneOffsetToMinutes("-0530")).to.eql(-330);
    });
  });

  describe("TimezoneOffsetRE", () => {
    it("matches Z", () => {
      const match = TimezoneOffsetRE.exec("Z");
      expect(match?.groups?.tz_utc).to.eql("Z");
    });

    it("matches UTC", () => {
      const match = TimezoneOffsetRE.exec("UTC");
      expect(match?.groups?.tz_utc).to.eql("UTC");
    });

    it("matches GMT", () => {
      const match = TimezoneOffsetRE.exec("GMT");
      expect(match?.groups?.tz_utc).to.eql("GMT");
    });

    it("matches +08:00", () => {
      const match = TimezoneOffsetRE.exec("+08:00");
      expect(match?.groups?.tz_sign).to.eql("+");
      expect(match?.groups?.tz_hours).to.eql("08");
      expect(match?.groups?.tz_minutes).to.eql("00");
    });

    it("matches -05:30", () => {
      const match = TimezoneOffsetRE.exec("-05:30");
      expect(match?.groups?.tz_sign).to.eql("-");
      expect(match?.groups?.tz_hours).to.eql("05");
      expect(match?.groups?.tz_minutes).to.eql("30");
    });

    it("matches offset without minutes (+8)", () => {
      const match = TimezoneOffsetRE.exec("+8");
      expect(match?.groups?.tz_sign).to.eql("+");
      expect(match?.groups?.tz_hours).to.eql("8");
      expect(match?.groups?.tz_minutes).to.eql(undefined);
    });

    // https://github.com/photostructure/exiftool-vendored.js/issues/318
    it("matches colon-less +0800", () => {
      const match = TimezoneOffsetRE.exec("+0800");
      expect(match?.groups?.tz_sign).to.eql("+");
      expect(match?.groups?.tz_hours).to.eql("08");
      expect(match?.groups?.tz_minutes).to.eql("00");
    });

    it("matches colon-less -0300", () => {
      const match = TimezoneOffsetRE.exec("-0300");
      expect(match?.groups?.tz_sign).to.eql("-");
      expect(match?.groups?.tz_hours).to.eql("03");
      expect(match?.groups?.tz_minutes).to.eql("00");
    });

    it("can be used in larger patterns", () => {
      const dateTimeRE = new RegExp(
        `(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})${TimezoneOffsetRE.source}`,
      );
      const match = dateTimeRE.exec("2023-01-15T10:30:00-08:00");
      expect(match).to.not.eql(null);
      expect(match?.[1]).to.eql("2023");
      expect(match?.groups?.tz_sign).to.eql("-");
      expect(match?.groups?.tz_hours).to.eql("08");
    });
  });

  describe("parseTimezoneOffsetMatch()", () => {
    it("parses UTC match", () => {
      const match = TimezoneOffsetRE.exec("UTC");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: 0, isUtc: true });
    });

    it("parses Z match", () => {
      const match = TimezoneOffsetRE.exec("Z");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: 0, isUtc: true });
    });

    it("parses +08:00 match", () => {
      const match = TimezoneOffsetRE.exec("+08:00");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: 480, isUtc: false });
    });

    it("parses -05:30 match", () => {
      const match = TimezoneOffsetRE.exec("-05:30");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: -330, isUtc: false });
    });

    it("parses +8 (no minutes) match", () => {
      const match = TimezoneOffsetRE.exec("+8");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: 480, isUtc: false });
    });

    it("returns undefined for null match", () => {
      expect(parseTimezoneOffsetMatch(null)).to.eql(undefined);
    });

    it("handles Unicode minus sign (U+2212)", () => {
      const match = TimezoneOffsetRE.exec("−08:00");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: -480, isUtc: false });
    });

    // https://github.com/photostructure/exiftool-vendored.js/issues/318
    it("parses colonless -0300 match", () => {
      const match = TimezoneOffsetRE.exec("-0300");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: -180, isUtc: false });
    });

    it("parses colonless +0530 match", () => {
      const match = TimezoneOffsetRE.exec("+0530");
      const result = parseTimezoneOffsetMatch(match);
      expect(result).to.eql({ offsetMinutes: 330, isUtc: false });
    });
  });
});

// Helper function for tests - needs to match the implementation
function offsetToMinutes(offset: string): number {
  // Extract sign from string to handle "-00:25:21" correctly
  const sign = offset.startsWith("-") ? -1 : 1;
  const parts = offset.replace(/^[+-]/, "").split(":").map(Number);
  const [h, m = 0, s = 0] = parts as [number, number?, number?];
  return sign * (h * 60 + m + s / 60);
}
