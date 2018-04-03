# Changelog

## Versioning

Providing the flexibility to reversion the API or UPDATE version slots as
features or bugfixes arise and using ExifTool's version number is at odds with
eachother, so this library follows [SemVer](http://semver.org/), and the
vendored versions of ExifTool match the version they vendor.

### The `MAJOR` or `API` version is incremented for

* 💔 Non-backward-compatible API changes
* 🌲 New releases of ExifTool that have externally visible changes

### The `MINOR` or `UPDATE` version is incremented for

* 🌱 New releases of ExifTool with no externally visible changes
* ✨ Backwards-compatible features

### The `PATCH` version is incremented for

* 🐞 Backwards-compatible bug fixes
* 📦 Minor packaging changes

## Version history

### v4.20.0

* ✨ Support for [Electron](https://electronjs.org). Added `exiftoolPath` to the
  `ExifTool` constructor. See the
  [wiki](https://github.com/mceachen/exiftool-vendored.js/wiki#how-do-you-make-this-work-with-electron)
  for more information.
* 🌱 ExifTool upgraded to
  [v10.89](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.89)

### v4.19.0

* 🌱 ExifTool upgraded to
  [v10.86](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.86)

### v4.18.1

* 📦 Pick up batch-cluster 1.10.0 to possibly address [this
  issue](https://stackoverflow.com/questions/48961238/electron-setinterval-implementation-difference-between-chrome-and-node).

### v4.18.0

* 🌱 ExifTool upgraded to
  [v10.81](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.81)
* 📦 Update deps, including batch-cluster 1.9.0
* 📦 Dropped support for node 4 (EOLs in 1 month).

### v4.17.0

* 🌱 ExifTool upgraded to
  [v10.79](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.79)
* 📦 Update deps, including TypeScript 2.7.2
* 📦 [Removed 🐱](https://github.com/mceachen/exiftool-vendored.js/issues/16)

### v4.16.0

* 🌱 ExifTool upgraded to
  [v10.78](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.78)
* 📦 Update deps, including TypeScript 2.7.1

### v4.15.0

* 🌱 ExifTool upgraded to
  [v10.76](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.76)
* 📦 Update deps

### v4.14.1

* 📦 Update deps

### v4.14.0

* 🐞 Use `spawn` instead of `execFile`, as the latter has buggy `maxBuffer`
  exit behavior and could leak exiftool processes on windows
* 🐞 The `.exiftool` singleton now properly uses a `DefaultMaxProcs` const.

### v4.13.1

* 🌱 ExifTool upgraded to
  [v10.70](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.70)
* 📦 Replace tslint and tsfmt with prettier
* 📦 Add test coverage report

(due to buggy interactions between `yarn` and `np`, v4.13.0 was published in
an incomplete state and subsequently unpublished)

### v4.12.1

* 📦 Rollback the rollback, as it's a [known issue with
  par](http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,8747.msg44932.html#msg44932).
  If this happens again I'll add a windows-specific validation of the par
  directory.

### v4.12.0

* 🐞 Rollback to ExifTool v10.65 to avoid [this windows
  issue](http://u88.n24.queensu.ca/exiftool/forum/index.php?topic=8747.msg44926)

### v4.11.0

* ✨ Support for [non-latin filenames and tag
  values](https://github.com/mceachen/exiftool-vendored.js/issues/14)
  Thanks, [Demiurga](https://github.com/apolkingg8)!

### v4.10.0

* 🌱 ExifTool upgraded to
  [v10.67](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.67)

### v4.9.2

* 📦 More conservative default for `maxProcs`: `Math.max(1, system cpus / 4)`.

### v4.9.0

* 📦 Expose `ExifTool.ended`

### v4.8.0

* ✨ Corrected the type interface to `ExifTool.write()` to be only string or
  numeric values with keys from `Tags` so intellisense can work it's magicks
* 📦 Updated the README with more examples
* 📦 Added timestamp write tests

### v4.7.1

* ✨ Metadata writing is now supported. Closes [#6](https://github.com/mceachen/exiftool-vendored.js/issues/6)

### v4.6.0

* 🌱 ExifTool upgraded to
  [v10.66](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.66)
* ✨ Pull in new `batch-cluster` with more aggressive child process management
  (uses `taskkill` on win32 platforms and `kill -9` on unixish platforms)
* ✨ ExifTool constructor defaults were relaxed to handle slow NAS
* ✨ Upgraded to Mocha 4.0. Added calls to `exiftool.end()` in test `after`
  blocks and the README so `--exit` isn't necessary.
* 📦 `salita --update`

### v4.5.0

* 🌱 ExifTool upgraded to
  [v10.64](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.64)

### v4.4.1

* 📦 reverted batch-cluster reference

### v4.4.0

* 🌱 ExifTool upgraded to
  [v10.61](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.61)
* 🐞 Re-added the "-stay_open\nFalse" ExifTool exit command, which may be more
  reliable than only using signal traps.
* 📦 `yarn upgrade --latest`

### v4.3.0

* 🌱 ExifTool upgraded to
  [v10.60](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.60)
* 📦 Upgraded all dependencies

### v4.2.0

* 🌱 ExifTool upgraded to
  [v10.58](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.58)

### v4.1.0

* 📦 Added `QuickTimeTags` from several example movies (previous versions of
  `Tags` didn't have movie tag exemplar values)
* 🌱 ExifTool upgraded to
  [v10.57](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.57)

### v4.0.0

* 💔 All `Tags` fields are now marked as possibly undefined, as there are no
  EXIF, IPTC, or other values that are guaranteed to be set. Sorry for the major
  break, but the prior signature that promised all values were always set was
  strictly wrong.
* ✨ Added support for all downstream
  [batch-cluster](https://github.com/mceachen/batch-cluster.js) options in the
  ExifTool constructor.
* 📦 Added `ExifTool.pids` (used by a couple new integration tests)
* 📦 Rebuilt `Tags` with additional sample images and looser tag filtering.

### v3.2.0

* 🌱 ExifTool upgraded to
  [v10.54](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.54)
* 📦 Pulled in batch-cluster v1.2.0 that supports more robust child process
  cleanup
* ✨ Yarn and `platform-dependent-modules` don't play nicely. [Anton
  Mokrushin](https://github.com/amokrushin) submitted several PRs to address
  this. Thanks!

### v3.1.1

* 🐞 Fixed `package.json` references to `types` and `main`

### v3.1.0

* 📦 Completed jsdocs for ExifTool constructor
* 📦 Pulled in batch-cluster v1.1.0 that adds both `on("beforeExit")` and
  `on("exit")` handlers

### v3.0.0

* ✨ Extracted [batch-cluster](https://github.com/mceachen/batch-cluster.js) to
  power child process management. Task timeout, retry, and failure handling has
  excellent test coverage now.
* 💔 Switched from [debug](https://www.npmjs.com/package/debug) to node's
  [debuglog](https://nodejs.org/api/util.html#util_util_debuglog_section) to
  reduce external dependencies
* 🌱 ExifTool upgraded to
  [v10.51](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.51)
* 📦 Using `.npmignore` instead of package.json's `files` directive to specify
  the contents of the module.

### v2.17.1

* 🐛 Rounded milliseconds were not set by `ExifDateTime.toDate()` when timezone
  was not available. Breaking tests were added.

### v2.16.1

* 📦 Exposed datetime parsing via static methods on `ExifDateTime`, `ExifDate`, and `ExifTime`.

### v2.16.0

* ✨ Some newer smartphones (like the Google Pixel) render timestamps with
  microsecond precision, which is now supported.

### v2.15.0

* ✨ Added example movies to the sample image corpus used to build the tag
  definitions.

### v2.14.0

* ✨ Added `taskTimeoutMillis`, which will cause the promise to be rejected if
  exiftool takes longer than this value to parse the file. Note that this
  timeout only starts "ticking" when the task is enqueued to an idle ExifTool
  process.
* ✨ Pump the `onIdle` method every `onIdleIntervalMillis` (defaults to every 10
  seconds) to ensure all requested tasks are serviced.
* ✨ If `ECONN` or `ECONNRESET` is raised from the child process (which seems to
  happen for roughly 1% of requests), the current task is re-enqueued and the
  current exiftool process is recycled.
* ✨ Rebuilt `Tags` definitions using more (6,412!) sample image files
  (via `npm run mktags ~/sample-images`), including many RAW image types
  (like `.ORF`, `.CR2`, and `.NEF`).

### v2.13.0

* ✨ Added `maxReuses` before exiftool processes are recycled
* 🌱 ExifTool upgraded to
  [v10.50](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.50)

### v2.12.0

* 🐛 Fixed [`gps.toDate is not a function`](https://github.com/mceachen/exiftool-vendored.js/issues/3)

### v2.11.0

* 🌱 ExifTool upgraded to v10.47
* ✨ Added call to `.kill()` on `.end()` in case the stdin command was missed by ExifTool

### v2.10.0

* ✨ Added support for Node 4. TypeScript builds under es5 mode.

### v2.9.0

* 🌱 ExifTool upgraded to v10.46

### v2.8.0

* 🌱 ExifTool upgraded to v10.44
* 📦 Upgraded to TypeScript 2.2
* 🐞 `update/io.ts` error message didn't handle null statuscodes properly
* 🐞 `update/mktags.ts` had a counting bug exposed by TS 2.2

### v2.7.0

* ✨ More robust error handling for child processes (previously there was no
  `.on("error")` added to the process itself, only on `stderr` of the child
  process).

### v2.6.0

* 🌱 ExifTool upgraded to v10.41
* ✨ `Orientation` is [rendered as a string by
  ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html#n---printConv),
  which was surprising (to me, at least). By exposing optional args in
  `ExifTool.read`, the caller can choose how ExifTool renders tag values.

### v2.5.0

* 🐞 `LANG` and `LC_` environment variables were passed through to exiftool (and
  subsequently, perl). These are now explicitly unset when exec'ing ExifTool,
  both to ensure tag names aren't internationalized, and to prevent perl errors
  from bubbling up to the caller due to missing locales.

### v2.4.0

* ✨ `extractBinaryTag` exposed because there are a **lot** of binary tags (and
  they aren't all embedded images)
* 🐞 `JpgFromRaw` was missing in `Tag` (no raw images were in the example corpus!)

### v2.3.0

* ✨ `extractJpgFromRaw` implemented to pull out EXIF-embedded images from RAW formats

### v2.2.0

* 🌱 ExifTool upgraded to v10.40

### v2.1.1

* ✨ `extractThumbnail` and `extractPreview` implemented to pull out EXIF-embedded images
* 📦 Rebuilt package.json.files section

### v2.0.1

* 💔 Switched from home-grown `logger` to [debug](https://www.npmjs.com/package/debug)

### v1.5.3

* 📦 Switch back to `platform-dependent-modules`.
  [npm warnings](http://stackoverflow.com/questions/15176082/npm-package-json-os-specific-dependency)
  aren't awesome.
* 📦 Don't include tests or updater in the published package

### v1.5.0

* 🌱 ExifTool upgraded to v10.38
* 📦 Use `npm`'s os-specific optionalDependencies rather than `platform-dependent-modules`.

### v1.4.1

* 🐛 Several imports (like `process`) name-collided on the globals imported by Electron

### v1.4.0

* 🌱 ExifTool upgraded to v10.37

### v1.3.0

* 🌱 ExifTool upgraded to v10.36
* ✨ `Tag.Error` exposed for unsupported file types.

### v1.2.0

* 🐛 It was too easy to miss calling `ExifTool.end()`, which left child ExifTool
  processes running. The constructor to ExifTool now adds a shutdown hook to
  send all child processes a shutdown signal.

### v1.1.0

* ✨ Added `toString()` for all date/time types

### v1.0.0

* ✨ Added typings reference in the package.json
* 🌱 Upgraded vendored exiftool to 10.33

### v0.4.0

* 📦 Fixed packaging (maintain jsdocs in .d.ts and added typings reference)
* 📦 Using [np](https://www.npmjs.com/package/np) for packaging

### v0.3.0

* ✨ Multithreading support with the `maxProcs` ctor param
* ✨ Added tests for reading images with truncated or missing EXIF headers
* ✨ Added tests for timezone offset extraction and rendering
* ✨ Subsecond resolution from the Google Pixel has 8 significant digits(!!),
  added support for that.

### v0.2.0

* ✨ More rigorous TimeZone extraction from assets, and added the
  `ExifTimeZoneOffset` to handle the `TimeZone` composite tag
* ✨ Added support for millisecond timestamps

### v0.1.1

🌱✨ Initial Release. Packages ExifTool v10.31.
