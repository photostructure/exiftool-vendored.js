/** @type {import('npm-check-updates').RunOptions} */
module.exports = {
  // Ranges are deliberately preserved: this is a library, and exact pins in
  // `dependencies` would force duplicate installs on every consumer. The
  // committed lockfile is what pins CI and contributor installs.
  // Internal release-train packages are reviewed at their source and should
  // be eligible immediately; third-party releases retain the full cooldown.
  cooldown: (packageName) =>
    [
      "@photostructure/tz-lookup",
      "batch-cluster",
      "exiftool-vendored.exe",
      "exiftool-vendored.pl",
    ].includes(packageName)
      ? 0
      : 14,
  // Packages we deliberately hold back, with the reason for each.
  reject: [
    // TypeScript 7 (the native compiler) isn't supported yet by typedoc
    // (peer <=6.0.x) or typescript-eslint (peer <6.1.0). Revisit once both
    // ship TS 7 support.
    "typescript",

    // Newer majors of the test/lint stack went ESM-only; we're not ready to
    // leave CommonJS yet.
    "@types/chai",
    "@types/chai-as-promised",
    "@types/mocha",
    "chai",
    "chai-as-promised",
    "deep-eql",
    "eslint",
    "mocha",

    // he 2 is ESM-only, and dist/WriteTask.js require()s it, which Node only
    // supports from 22.12.0. engines.node accepts every Node 22.
    "he",
  ],
};
