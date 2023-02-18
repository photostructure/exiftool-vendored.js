import * as fse from "fs-extra"
import path, { join } from "path"
import { ExifDateTime } from "./ExifDateTime"
import { defaultVideosToUTC, exiftool, ExifTool } from "./ExifTool"
import { geoTz as _geoTz } from "./GeoTz"
import { ReadTask } from "./ReadTask"
import { Tags } from "./Tags"
import {
  expect,
  NonAlphaStrings,
  renderTagsWithISO,
  renderTagsWithRawValues,
  testDir,
  tmpdir,
  UnicodeTestMessage,
} from "./_chai.spec"

const gt = require("geo-tz")

function parse({
  tags,
  error,
  SourceFile = "/tmp/example.jpg",
  numericTags = [],
  optionalArgs = [],
  geoTz = _geoTz,
}: {
  tags: any
  error?: Error
  SourceFile?: string
  numericTags?: never[]
  optionalArgs?: never[]
  geoTz?: typeof _geoTz
}): Tags {
  const tt = ReadTask.for(SourceFile, {
    numericTags,
    optionalArgs,
    defaultVideosToUTC: true,
    geoTz,
  })
  const json = JSON.stringify([{ ...tags, SourceFile }])
  return tt.parse(json, error)
}

function geo_tz(lat: number, lon: number): string | undefined {
  try {
    return gt.find(lat, lon)[0]
  } catch {
    return
  }
}

after(() => exiftool.end())

describe("ReadTask", () => {
  describe("Lat/Lon parsing", () => {
    /* Example:
    $ exiftool -j -coordFormat '%.8f' -fast ../test-images/important/Apple_iPhone7Plus.jpg | grep itude
    "GPSLatitudeRef": "North",
    "GPSLongitudeRef": "East",
    "GPSAltitudeRef": "Above Sea Level",
    "GPSAltitude": "73 m Above Sea Level",
    "GPSLatitude": 22.33543889,
    "GPSLongitude": 114.16401667,
   */
    it("N lat is positive", () => {
      expect(
        parse({ tags: { GPSLatitude: 22.33543889, GPSLatitudeRef: "N" } })
          .GPSLatitude
      ).to.be.closeTo(22.33543889, 0.00001)
    })
    it("S lat is negative", () => {
      expect(
        parse({ tags: { GPSLatitude: 33.84842123, GPSLatitudeRef: "S" } })
          .GPSLatitude
      ).to.be.closeTo(-33.84842123, 0.00001)
    })
    it("E lon is positive", () => {
      expect(
        parse({ tags: { GPSLongitude: 114.16401667, GPSLongitudeRef: "E" } })
          .GPSLongitude
      ).to.be.closeTo(114.16401667, 0.00001)
    })
    it("W lon is negative", () => {
      expect(
        parse({ tags: { GPSLongitude: 122.4406148, GPSLongitudeRef: "W" } })
          .GPSLongitude
      ).to.be.closeTo(-122.4406148, 0.00001)
    })
    it("parses lat lon even if timezone is given", () => {
      expect(
        parse({
          tags: {
            GPSLongitude: 122.4406148,
            GPSLongitudeRef: "West",
            OffsetTime: "+02:00",
          },
        }).GPSLongitude
      ).to.be.closeTo(-122.4406148, 0.00001)
    })

    it("extracts problematic GPSDateTime", async () => {
      const t = await exiftool.read(join(testDir, "nexus5x.jpg"))
      expect(t).to.containSubset({
        MIMEType: "image/jpeg",
        Make: "LGE",
        Model: "Nexus 5X",
        ImageWidth: 16,
        ImageHeight: 16,
        tz: "Europe/Zurich",
        tzSource: "GPSLatitude/GPSLongitude",
      })

      const gpsdt = t.GPSDateTime as any as ExifDateTime
      expect(gpsdt.toString()).to.eql("2016-07-19T10:00:24Z")
      expect(gpsdt.rawValue).to.eql("2016:07:19 10:00:24Z")
      expect(gpsdt.zoneName).to.eql("UTC")
    })

    describe("without *Ref fields", () => {
      for (const latSign of [1, -1]) {
        for (const lonSign of [1, -1]) {
          const input = {
            GPSLatitude: latSign * 34.4,
            GPSLongitude: lonSign * 119.8,
          }
          it(`extracts (${JSON.stringify(input)})`, () => {
            expect(parse({ tags: input })).to.containSubset(input)
          })
        }
      }
    })
  })

  describe("Time zone extraction", () => {
    it("finds singular positive TimeZoneOffset and sets accordingly", () => {
      const t = parse({
        tags: {
          TimeZoneOffset: 9,
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(9 * 60)
    })

    it("finds positive array TimeZoneOffset and sets accordingly", () => {
      const t = parse({
        tags: {
          TimeZoneOffset: [9, 8],
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(9 * 60)
    })

    it("finds zulu TimeZoneOffset and sets accordingly", () => {
      const t = parse({
        tags: {
          TimeZoneOffset: 0,
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(0)
    })

    it("finds negative TimeZoneOffset in array and sets accordingly", () => {
      const t = parse({
        tags: {
          TimeZoneOffset: [-4],
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-4 * 60)
    })

    it("respects positive HH:MM OffsetTime", () => {
      const t = parse({
        tags: {
          OffsetTime: "+02:30",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(2 * 60 + 30)
    })

    it("respects positive HH OffsetTime", () => {
      const t = parse({
        tags: {
          OffsetTime: "+07",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(7 * 60)
    })

    it("respects negative HH:MM OffsetTime", () => {
      const t = parse({
        tags: {
          OffsetTime: "-06:30",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-(6 * 60 + 30))
    })

    it("respects negative H OffsetTime", () => {
      const t = parse({
        tags: {
          OffsetTime: "-9",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-9 * 60)
      expect(t.tz).to.eql("UTC-9")
      expect(t.tzSource).to.eql("offsetMinutesToZoneName from OffsetTime")
    })

    it("respects negative HH OffsetTime", () => {
      const t = parse({
        tags: {
          OffsetTime: "-09",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-9 * 60)
      expect(t.tz).to.eql("UTC-9")
      expect(t.tzSource).to.eql("offsetMinutesToZoneName from OffsetTime")
    })

    it("determines timezone offset from GPS (specifically, Landscape Arch!)", () => {
      const t = parse({
        tags: {
          GPSLatitude: 38.791121,
          GPSLatitudeRef: "North",
          GPSLongitude: 109.606407,
          GPSLongitudeRef: "West",
          DateTimeOriginal: "2016:08:12 13:28:50",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(-6 * 60)
      expect(t.tz).to.eql("America/Denver")
      expect(t.tzSource).to.eql("GPSLatitude/GPSLongitude")
    })

    it("uses GPSDateTime and DateTimeOriginal and sets accordingly for -7", () => {
      const t = parse({
        tags: {
          DateTimeOriginal: "2016:10:19 11:15:14",
          GPSDateTime: "2016:10:19 18:15:12",
          DateTimeCreated: "2016:10:19 11:15:14",
        },
      })
      expect((t.DateTimeOriginal as ExifDateTime).tzoffsetMinutes).to.eql(
        -7 * 60
      )
      expect((t.DateTimeCreated as ExifDateTime).tzoffsetMinutes).to.eql(
        -7 * 60
      )
      expect(t.tz).to.eql("UTC-7")
      expect(t.tzSource).to.eql(
        "offset between DateTimeOriginal and GPSDateTime"
      )
    })

    it("uses DateTimeUTC and DateTimeOriginal and sets accordingly for +8", () => {
      const t = parse({
        tags: {
          DateTimeOriginal: "2016:10:19 11:15:14",
          DateTimeUTC: "2016:10:19 03:15:12",
          DateTimeCreated: "2016:10:19 11:15:14",
        },
      })
      expect((t.DateTimeOriginal as ExifDateTime).tzoffsetMinutes).to.eql(
        8 * 60
      )
      expect((t.DateTimeCreated as ExifDateTime).tzoffsetMinutes).to.eql(8 * 60)
      expect(t.tz).to.eql("UTC+8")
      expect(t.tzSource).to.eql(
        "offset between DateTimeOriginal and DateTimeUTC"
      )
    })

    it("uses DateTimeUTC and DateTimeOriginal and sets accordingly for +5:30", () => {
      const t = parse({
        tags: {
          DateTimeOriginal: "2018:10:19 11:15:14",
          DateTimeUTC: "2018:10:19 05:45:12",
          DateTimeCreated: "2018:10:19 11:15:14",
        },
      })
      expect((t.DateTimeOriginal as ExifDateTime).tzoffsetMinutes).to.eql(
        5.5 * 60
      )
      expect((t.DateTimeCreated as ExifDateTime).tzoffsetMinutes).to.eql(
        5.5 * 60
      )
      expect(t.tz).to.eql("UTC+5:30")
      expect(t.tzSource).to.eql(
        "offset between DateTimeOriginal and DateTimeUTC"
      )
    })

    it("renders SubSecDateTimeOriginal with no zone if no tz is inferrable", () => {
      const input = {
        DateTimeOriginal: "2016:12:13 09:05:27",
        SubSecDateTimeOriginal: "2016:12:13 09:05:27.12038200",
      }
      const t = parse({ tags: input })
      expect(renderTagsWithRawValues(t)).to.eql(input)
      expect(renderTagsWithISO(t)).to.eql({
        DateTimeOriginal: "2016-12-13T09:05:27",
        SubSecDateTimeOriginal: "2016-12-13T09:05:27.120",
        errors: [],
      })
    })

    it("renders SubSecDateTimeOriginal for -8", () => {
      const input = {
        DateTimeOriginal: "2016:12:13 09:05:27",
        GPSDateTime: "2016:12:13 17:05:25Z",
        SubSecDateTimeOriginal: "2016:12:13 09:05:27.12038200",
      }
      const t = parse({ tags: input })
      expect(renderTagsWithRawValues(t)).to.eql(input)
      expect(renderTagsWithISO(t)).to.eql({
        DateTimeOriginal: "2016-12-13T09:05:27-08:00",
        GPSDateTime: "2016-12-13T17:05:25Z",
        SubSecDateTimeOriginal: "2016-12-13T09:05:27.120-08:00",
        errors: [],
        tz: "UTC-8",
        tzSource: "offset between SubSecDateTimeOriginal and GPSDateTime",
      })
    })

    it("skips invalid timestamps", () => {
      const t = parse({
        tags: {
          DateTimeOriginal: "2016:08:12 13:28:50",
          GPSDateTime: "not a timestamp",
        },
      })
      expect((t.DateTimeOriginal as any).tzoffsetMinutes).to.eql(undefined)
      expect(t.tz).to.eql(undefined)
      expect(t.tzSource).to.eql(undefined)
    })

    describe("try to reproduce issue #118", () => {
      it("invalid GPSTimeStamp doesn't throw", async () => {
        const t = parse({
          tags: {
            GPSTimeStamp: "1970:01:01 00:00:00Z", // < INVALID, this field is always a timestamp without a date
          },
        })
        expect((t.GPSTimeStamp as any).toISOString()).to.eql(
          "1970-01-01T00:00:00Z"
        )
      })

      it("reads file with GPS tags set to common epoch", async () => {
        const t = await exiftool.read(join(testDir, "0epoch.jpg"))
        expect((t.GPSDateTime as ExifDateTime).toMillis()).to.eql(0)
      })
    })

    // https://github.com/photostructure/exiftool-vendored.js/issues/113
    describe("timezone parsing", () => {
      for (const MIMEType of ["image/jpeg", "video/mp4"]) {
        describe(JSON.stringify({ MIMEType }), () => {
          it("handles explicit GMT with explicit offset", () => {
            const t = parse({
              tags: {
                MIMEType,
                TimeZone: "+00:00",
                CreateDate: "2020:08:03 08:00:19-07:00",
                SubSecCreateDate: "2020:08:03 15:00:19.01+00:00",
                DateTimeOriginal: "2020:08:03 15:00:19",
                TimeStamp: "2020:08:03 15:00:19.01",
              },
            })
            expect(renderTagsWithISO(t)).to.eql({
              MIMEType,
              CreateDate: "2020-08-03T08:00:19-07:00",
              SubSecCreateDate: "2020-08-03T15:00:19.010Z",
              DateTimeOriginal: "2020-08-03T15:00:19Z",
              TimeStamp: "2020-08-03T15:00:19.010Z",

              tz: "UTC",
              tzSource: "offsetMinutesToZoneName from TimeZone",
              TimeZone: "+00:00",

              errors: [],
            })
          })
        })
      }
      it("defaults video without offset to UTC", () => {
        const t = parse({
          tags: {
            MIMEType: "video/mp4",
            CreateDate: "2014:07:17 08:46:27",
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          // ALL DATES ARE IN ZULU!
          MIMEType: "video/mp4",
          CreateDate: "2014-07-17T08:46:27Z",
          tz: "UTC",
          tzSource: defaultVideosToUTC,
          errors: [],
        })
      })
      it("retains tzoffset in video timestamps", () => {
        const t = parse({
          tags: {
            MIMEType: "video/mp4",
            CreateDate: "2014:07:17 08:46:27-05:00 DST",
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          // ALL DATES ARE IN ZULU!
          MIMEType: "video/mp4",
          CreateDate: "2014-07-17T08:46:27-05:00",
          tz: "UTC",
          tzSource: defaultVideosToUTC,
          errors: [],
        })
      })
      it("handles CET timezone for images", () => {
        const t = parse({
          tags: {
            TimeZone: "+01:00",
            TimeZoneCity: "Rome",
            CreateDate: "2020:08:03 16:00:19", // < different (local system) zone!
            SubSecCreateDate: "2020:08:03 16:00:19.123+01:00",
            DateTimeOriginal: "2020:08:03 16:00:19", // < missing zone!
            TimeStamp: "2020:08:03 16:00:19.01", // < missing zone!
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          CreateDate: "2020-08-03T16:00:19+01:00",
          DateTimeOriginal: "2020-08-03T16:00:19+01:00",
          SubSecCreateDate: "2020-08-03T16:00:19.123+01:00",
          TimeStamp: "2020-08-03T16:00:19.010+01:00",

          TimeZone: "+01:00",
          TimeZoneCity: "Rome",
          tz: "UTC+1",
          tzSource: "offsetMinutesToZoneName from TimeZone",
          errors: [],
        })
      })
      it("handles CET timezone for video with TimeZone tag", () => {
        const t = parse({
          tags: {
            MIMEType: "video/mp4",
            TimeZone: "+01:00",
            TimeZoneCity: "Rome",
            CreateDate: "2020:08:03 16:00:19", // < different (local system) zone!
            DateTimeOriginal: "2020:08:03 16:00:19", // < missing zone!
            SubSecCreateDate: "2020:08:03 16:00:19.123+01:00",
            TimeStamp: "2020:08:03 16:00:19.01", // < missing zone!
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          MIMEType: "video/mp4",

          CreateDate: "2020-08-03T16:00:19+01:00",
          DateTimeOriginal: "2020-08-03T16:00:19+01:00",
          SubSecCreateDate: "2020-08-03T16:00:19.123+01:00",
          TimeStamp: "2020-08-03T16:00:19.010+01:00",

          TimeZone: "+01:00",
          TimeZoneCity: "Rome",
          tz: "UTC+1",
          tzSource: "offsetMinutesToZoneName from TimeZone",
          errors: [],
        })
      })
      it("handles CET timezone for video without TimeZone tag", () => {
        const t = parse({
          tags: {
            MIMEType: "video/mp4",
            CreateDate: "2020:08:03 15:00:19", // < naughty video in UTC
            SubSecCreateDate: "2020:08:03 16:00:19.123+01:00",
            DateTimeOriginal: "2020:08:03 15:00:19", // < missing zone!
            TimeStamp: "2020:08:03 15:00:19.01", // < missing zone!
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          MIMEType: "video/mp4",

          CreateDate: "2020-08-03T15:00:19Z",
          SubSecCreateDate: "2020-08-03T16:00:19.123+01:00",
          DateTimeOriginal: "2020-08-03T15:00:19Z",
          TimeStamp: "2020-08-03T15:00:19.010Z",

          tz: "UTC",
          tzSource: defaultVideosToUTC,
          errors: [],
        })
      })
      it("doesn't apply missing timezone", () => {
        const t = parse({
          tags: {
            CreateDate: "2020:08:03 08:00:19-07:00",
            DateTimeOriginal: "2020:08:03 15:00:19", // < no zone!
            SubSecCreateDate: "2020:08:03 15:00:19.01+00:00",
            TimeStamp: "2020:08:03 15:00:19.01", // < no zone!
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          // No timezone found, so no normalization:
          CreateDate: "2020-08-03T08:00:19-07:00",
          DateTimeOriginal: "2020-08-03T15:00:19", // < no zone!
          SubSecCreateDate: "2020-08-03T15:00:19.010Z",
          TimeStamp: "2020-08-03T15:00:19.010", // < no zone!
          errors: [],
        })
        expect(t.tz).to.eql(undefined)
        expect(t.tzSource).to.eql(undefined)
      })

      it("handles EST", () => {
        const t = parse({
          tags: {
            CreateDate: "2020:12:29 14:24:45",
            DateTimeOriginal: "2020:12:29 14:24:45",
            GPSAltitude: 259.016,
            GPSDateStamp: "2020:12:29",
            GPSLatitude: 34.15,
            GPSLongitude: -84.73,
            ModifyDate: "2020:12:29 14:24:45",
            OffsetTime: "-05:00",
            OffsetTimeDigitized: "-05:00",
            OffsetTimeOriginal: "-05:00",
            SubSecCreateDate: "2020:12:29 14:24:45.700-05:00",
            SubSecDateTimeOriginal: "2020:12:29 14:24:45.700-05:00",
            SubSecModifyDate: "2020:12:29 14:24:45.789-05:00",
            SubSecTimeDigitized: 700,
            SubSecTimeOriginal: 700,
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          CreateDate: "2020-12-29T14:24:45-05:00",
          DateTimeOriginal: "2020-12-29T14:24:45-05:00",
          SubSecCreateDate: "2020-12-29T14:24:45.700-05:00",
          SubSecDateTimeOriginal: "2020-12-29T14:24:45.700-05:00",
          SubSecModifyDate: "2020-12-29T14:24:45.789-05:00",
          ModifyDate: "2020-12-29T14:24:45-05:00",

          GPSAltitude: 259.016,
          GPSDateStamp: "2020-12-29",
          GPSLatitude: 34.15,
          GPSLongitude: -84.73,
          OffsetTime: "-05:00",
          OffsetTimeDigitized: "-05:00",
          OffsetTimeOriginal: "-05:00",
          SubSecTimeDigitized: 700,
          SubSecTimeOriginal: 700,
          errors: [],
          tz: "America/New_York",
          tzSource:
            "offsetMinutesToZoneName from OffsetTime & GPSLatitude/GPSLongitude",
        })
      })

      it("handles EST with only GPS and geo-tz", () => {
        const t = parse({
          geoTz: geo_tz,
          tags: {
            CreateDate: "2020:12:29 14:24:45",
            GPSLatitude: 34.15,
            GPSLongitude: -84.73,
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          CreateDate: "2020-12-29T14:24:45-05:00",
          GPSLatitude: 34.15,
          GPSLongitude: -84.73,
          errors: [],
          tz: "America/New_York",
          tzSource: "GPSLatitude/GPSLongitude",
        })
      })

      it("assumes UTC if video (even if GPS infers EST)", () => {
        const t = parse({
          tags: {
            MIMEType: "video/mp4",
            CreateDate: "2022:08:31 00:32:06",
            // Smartphone videos seem to always encode timestamps in UTC, even
            // if there is GPS metadata
            GPSLatitude: 34.15,
            GPSLongitude: -84.73,
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          MIMEType: "video/mp4",
          CreateDate: "2022-08-31T00:32:06Z",
          // Smartphone videos seem to always encode timestamps in UTC, even
          // if there is GPS metadata
          GPSLatitude: 34.15,
          GPSLongitude: -84.73,
          errors: [],
          tz: "UTC",
          tzSource: defaultVideosToUTC,
        })
      })

      it("infers GPS tz (EDT) if not video", () => {
        const t = parse({
          tags: {
            CreateDate: "2022:08:31 00:32:06",
            // Smartphone videos seem to always encode timestamps in UTC, even
            // if there is GPS metadata
            GPSLatitude: 34.15,
            GPSLongitude: -84.73,
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          CreateDate: "2022-08-31T00:32:06-04:00",
          // Smartphone videos seem to always encode timestamps in UTC, even
          // if there is GPS metadata
          GPSLatitude: 34.15,
          GPSLongitude: -84.73,
          errors: [],
          tz: "America/New_York",
          tzSource: "GPSLatitude/GPSLongitude",
        })
      })

      it("normalizes when in EST with only OffsetTime", () => {
        const t = parse({
          tags: {
            CreateDate: "2020:12:29 14:24:45", // < no zone
            DateTimeOriginal: "2020:12:29 14:24:45", // < no zone
            ModifyDate: "2020:12:29 14:24:45", // < no zone
            OffsetTime: "-05:00",
            OffsetTimeDigitized: "-05:00",
            OffsetTimeOriginal: "-05:00",
            SubSecCreateDate: "2020:12:29 14:24:45.700-05:00",
            SubSecDateTimeOriginal: "2020:12:29 14:24:45.700-05:00",
            SubSecModifyDate: "2020:12:29 14:24:45.789-05:00",
            SubSecTimeDigitized: 700,
            SubSecTimeOriginal: 700,
          },
        })
        expect(renderTagsWithISO(t)).to.eql({
          // Everything normalized to PST:
          CreateDate: "2020-12-29T14:24:45-05:00",
          DateTimeOriginal: "2020-12-29T14:24:45-05:00",
          ModifyDate: "2020-12-29T14:24:45-05:00",
          SubSecCreateDate: "2020-12-29T14:24:45.700-05:00",
          SubSecDateTimeOriginal: "2020-12-29T14:24:45.700-05:00",
          SubSecModifyDate: "2020-12-29T14:24:45.789-05:00",

          OffsetTime: "-05:00",
          OffsetTimeDigitized: "-05:00",
          OffsetTimeOriginal: "-05:00",
          SubSecTimeDigitized: 700,
          SubSecTimeOriginal: 700,
          errors: [],
          tz: "UTC-5",
          tzSource: "offsetMinutesToZoneName from OffsetTime",
        })
      })
    })
  })

  describe("SubSecDateTimeOriginal", () => {
    it("extracts datetimestamp with millis", () => {
      const t = parse({
        tags: { SubSecDateTimeOriginal: "2016:10:19 11:15:14.437831" },
      }).SubSecDateTimeOriginal as ExifDateTime
      expect(t.year).to.eql(2016)
      expect(t.month).to.eql(10)
      expect(t.day).to.eql(19)
      expect(t.hour).to.eql(11)
      expect(t.minute).to.eql(15)
      expect(t.second).to.eql(14)
      expect(t.tzoffsetMinutes).to.eql(undefined)
      expect(t.millisecond).to.eql(437)
      const d = t.toDate()
      expect(d.getFullYear()).to.eql(2016)
      expect(d.getMonth()).to.eql(10 - 1)
      expect(d.getDate()).to.eql(19)
      expect(d.getHours()).to.eql(11)
      expect(d.getMinutes()).to.eql(15)
      expect(d.getSeconds()).to.eql(14)

      expect(d.getMilliseconds()).to.eql(437) // Javascript Date doesn't do fractional millis.
    })
  })
  describe("EXIFTOOL_HOME", () => {
    let et: ExifTool
    before(
      () =>
        (et = new ExifTool({
          exiftoolEnv: { EXIFTOOL_HOME: path.resolve(__dirname, "..", "test") },
        }))
    )
    after(() => et.end())
    it("returns the new custom tag", async () => {
      const t: any = await et.read("./test/pixel.jpg")

      // This is a non-standard tag, added by the custom user configuration:
      expect(t.UppercaseBaseName).to.eql("PIXEL")
    })
  })

  describe("non-alphanumeric filenames", () => {
    for (const { str, desc } of NonAlphaStrings) {
      it("reads with " + desc, async () => {
        const FileName = str + ".jpg"
        const dest = path.join(tmpdir(), FileName)
        await fse.mkdirp(tmpdir())
        await fse.copyFile(path.join(testDir, "quotes.jpg"), dest)
        const t = await exiftool.read(dest)
        expect(t).to.containSubset({
          MIMEType: "image/jpeg",
          FileName,
          Make: "Apple",
          Model: "iPhone 7 Plus",
          ImageDescription: "image description for quotes test",
          LastKeywordXMP: ["Test", "examples", "beach"],
          Title: UnicodeTestMessage,
        })
        expect(t.DateTimeOriginal?.toString()).to.match(/^2016-08-12T13:28:50/)
      })
    }
  })
})
