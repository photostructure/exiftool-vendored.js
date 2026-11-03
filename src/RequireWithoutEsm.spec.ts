import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { expect } from "./_chai.spec";

describe("require() without require(esm)", function () {
  this.timeout(15000);

  // Node only require()s ES modules from 22.12.0, and engines.node accepts
  // every Node 22. --no-experimental-require-module makes this Node behave like
  // 22.0-22.11: exiftool-vendored 39.1.0 depended on the ESM-only he 2.0.0 and
  // failed here with ERR_REQUIRE_ESM.
  it("loads the CommonJS entry point", () => {
    const stdout = execFileSync(
      process.execPath,
      [
        "--no-experimental-require-module",
        "-e",
        `require(${JSON.stringify(join(__dirname, "ExifTool.js"))}); process.stdout.write("loaded")`,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    expect(stdout).to.eql("loaded");
  });
});
