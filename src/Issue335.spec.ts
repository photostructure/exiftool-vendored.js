/**
 * Regression tests for https://github.com/photostructure/exiftool-vendored.js/issues/335
 *
 * Adobe software writes XMP-xmpDM:duration as a Time struct, like
 * `<xmpDM:duration xmpDM:value="1216215" xmpDM:scale="1/90000"/>`. With the
 * default `struct: 1`, ExifTool returns that struct as the `Duration` tag
 * (`{ Value: 1216215, Scale: 1.11111111111111e-05 }`), and in MP4 files it
 * replaces the numeric QuickTime:Duration.
 */

import { writeFile } from "node:fs/promises";
import { ExifTool } from "./ExifTool";
import { end, expect, testFile } from "./_chai.spec";

function xmpWithDuration(value: number, scale: string): string {
  return `<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:xmpDM="http://ns.adobe.com/xmp/1.0/DynamicMedia/">
      <xmpDM:duration xmpDM:value="${value}" xmpDM:scale="${scale}"/>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>`;
}

async function sidecar(value: number, scale: string): Promise<string> {
  const file = await testFile("duration.xmp");
  await writeFile(file, xmpWithDuration(value, scale));
  return file;
}

describe("Issue #335: XMP-xmpDM:duration Time struct", function () {
  this.slow(5000);

  let exiftool: ExifTool;
  before(() => (exiftool = new ExifTool()));
  after(() => end(exiftool));

  it("converts a 90 kHz timescale duration to seconds", async () => {
    const t = await exiftool.read(await sidecar(1216215, "1/90000"));
    expect(t.Duration).to.be.a("number");
    expect(t.Duration).to.be.closeTo(13.5135, 1e-9);
  });

  it("converts a 29.97 fps frame-count duration to seconds", async () => {
    // 1001/30000 is the frame-based NTSC (29.97 fps) scale. Unlike 1/90000,
    // its numerator isn't 1, so this fails a conversion that assumes Scale is
    // 1/N, like `Value / Math.round(1 / Scale)` (which gives 13.5 here).
    const t = await exiftool.read(await sidecar(405, "1001/30000"));
    expect(t.Duration).to.be.a("number");
    expect(t.Duration).to.be.closeTo(13.5135, 1e-9);
  });

  it("converts the group-prefixed tag when groupNames is true", async () => {
    const t = await exiftool.read(await sidecar(1216215, "1/90000"), {
      groupNames: true,
    });
    expect(t["XMP:Duration"]).to.be.a("number");
    expect(t["XMP:Duration"]).to.be.closeTo(13.5135, 1e-9);
  });
});
