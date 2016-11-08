import { TagsTask } from "./tags_task";
import { Tags } from "./tags";
import { expect } from "chai";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

function parse(tags: any): Tags {
  const tt = TagsTask.for("/tmp/example.jpg");
  tags.SourceFile = "/tmp/example.jpg";
  const json = JSON.stringify([tags]);
  return tt.parse(json);
}

describe("Lat/Lon parsing", () => {
  /* Example:   
    $ exiftool -j -coordFormat '%.8f' -fast ../test-images/important/Apple_iPhone7Plus.jpg | grep itude
    "GPSLatitudeRef": "North",
    "GPSLongitudeRef": "East",
    "GPSAltitudeRef": "Above Sea Level",
    "GPSAltitude": "73 m Above Sea Level",
    "GPSLatitude": "22.33543889 N",
    "GPSLongitude": "114.16401667 E",
   */
  it("N lat is positive", () => {
    expect(parse({ GPSLatitude: "22.33543889 N" }).GPSLatitude).to.be.closeTo(22.33543889, 0.00001);
  });
  it("S lat is negative", () => {
    expect(parse({ GPSLatitude: "33.84842123 S" }).GPSLatitude).to.be.closeTo(-33.84842123, 0.00001);
  });
  it("E lon is positive", () => {
    expect(parse({ GPSLongitude: "114.16401667 E" }).GPSLongitude).to.be.closeTo(114.16401667, 0.00001);
  });
  it("W lon is negative", () => {
    expect(parse({ GPSLongitude: "122.4406148 W" }).GPSLongitude).to.be.closeTo(-122.4406148, 0.00001);
  });
});

describe("TimeZone extraction", () => {
  it("finds positive TimeZone and sets accordingly", () => {
    const t = parse({
        TimeZone: "+09:00",
        DateTimeOriginal: "2016:08:12 13:28:50"
    });
    expect(t.DateTimeOriginal.tzoffsetMinutes).to.eql(9 * 60);
  });
  it("finds zulu TimeZone and sets accordingly", () => {
    const t = parse({
        TimeZone: "+00:00",
        DateTimeOriginal: "2016:08:12 13:28:50"
    });
    expect(t.DateTimeOriginal.tzoffsetMinutes).to.eql(0);
  });
  it("finds negative TimeZone and sets accordingly", () => {
    const t = parse({
        TimeZone: "-04:00",
        DateTimeOriginal: "2016:08:12 13:28:50"
    });
    expect(t.DateTimeOriginal.tzoffsetMinutes).to.eql(-4 * 60);
  });

  it("uses GPSDateTime and DateTimeOriginal and sets accordingly for -7", () => {
    const t = parse({
      DateTimeOriginal: "2016:10:19 11:15:14",
      GPSDateTime: "2016:10:19 18:15:12Z",
      DateTimeCreated: "2016:10:19 11:15:14"
    });
    expect(t.DateTimeOriginal.tzoffsetMinutes).to.eql(-7 * 60);
    expect(t.DateTimeCreated.tzoffsetMinutes).to.eql(-7 * 60);
  });

  it("uses GPSDateTime and DateTimeOriginal and sets accordingly for +8", () => {
    const t = parse({
      DateTimeOriginal: "2016:08:12 13:28:50",
      GPSDateTime: "2016:08:12 05:28:49Z",
      DateTimeCreated: "2016:08:12 13:28:50"
    });
    expect(t.DateTimeOriginal.tzoffsetMinutes).to.eql(8 * 60);
    expect(t.DateTimeCreated.tzoffsetMinutes).to.eql(8 * 60);
  });
});

describe("SubSecDateTimeOriginal", () => {
  it("extracts datetimestamp with millis", () => {
    const t = parse({ SubSecDateTimeOriginal: "2016:10:19 11:15:14.437831" }).SubSecDateTimeOriginal;
    expect(t.year).to.eql(2016);
    expect(t.month).to.eql(10);
    expect(t.day).to.eql(19);
    expect(t.hour).to.eql(11);
    expect(t.minute).to.eql(15);
    expect(t.second).to.eql(14);
    expect(t.tzoffsetMinutes).to.be.undefined;
    expect(t.millis).to.be.approximately(437.831, .01);
  });
});
