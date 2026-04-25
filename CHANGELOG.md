# Release changelog

## Releases

See the [releases page](https://github.com/photostructure/exiftool-vendored.js/releases) for

- release dates
- tag links, and
- commits for a given version

(The changes in this document are manually copied into the GitHub release notes)

## Versioning

Providing the flexibility to reversion the API or UPDATE version slots as
features or bugfixes arise and using ExifTool's version number is at odds with
each other, so this library follows [Semver](https://semver.org/), and the
vendored versions of ExifTool match the version that they vendor.

### The `MAJOR` or `API` version is incremented for

- 💔 Non-backward-compatible API changes
- 🏚️ [End of life](https://github.com/nodejs/release#release-schedule) versions of Node.js are dropped from the build matrix

### The `MINOR` or `UPDATE` version is incremented for

- 🌱 New releases of ExifTool
- 🔥 Security updates
- ✨ Backwards-compatible features

### The `PATCH` version is incremented for

- 🐞 Backwards-compatible bug fixes
- 📦 Minor packaging changes

## History

### v35.19.0

- 🔥 **Security: argument injection hardening [GHSA-cw26-7653-2rp5](https://github.com/photostructure/exiftool-vendored.js/security/advisories/GHSA-cw26-7653-2rp5).** ExifTool runs in `-stay_open True -@ -` mode, where arguments are read from stdin one per line. Several caller-supplied strings were previously interpolated into ExifTool arguments without rejecting line delimiters, so a `\n` inside a tag name or filename could split one argument into many. Two layers of defense have been added:
  - **Per-site validation.** A new `validateTagName` helper rejects tag-name strings that fall outside the ExifTool tag grammar (letters, digits, `:`, `-`, `_`, and the modifiers `*`, `?`, `+`, `#`). Applied to write tag keys, `deleteAllTags({retain})`, `read({numericTags})`, and the binary-extraction tag names. `imageHashType` is now also validated against an `ImageHashTypes` allowlist at runtime.
  - **Defense-in-depth at the command renderer.** `ExifToolTask.renderCommand` now rejects any argument containing `\r`, `\n`, or `\0` before transmission. This covers filename/path arguments, including `readRaw()` and `rewriteAllTags()`, raw `readArgs` / `writeArgs`, option values, and future newline-delimited interpolation sites.
  - Tag values passed to `write()` were already whitespace-encoded and were not vulnerable.
  - Reported by Hank Tam through coordinated disclosure.
- ✨ Added `ImageHashTypes` runtime enum and `ImageHashType` type export, for callers that need runtime-checked construction of the `imageHashType` option.

### v35.18.0

- 🌱 Upgraded ExifTool to version [13.57](https://exiftool.org/history.html#13.57).
- 🐞 Fixes an ExifTool 13.56 regression (shipped in v35.17.0) where XMP list-valued tags (`dc:subject`, `HierarchicalSubject`, `Keywords`) read from sidecar files were collapsed to just the last `<rdf:li>` as a scalar string when `-api struct=1` was in effect. Users on v35.17.0 who read XMP sidecars should upgrade.

### v35.17.0

- 🌱 Upgraded ExifTool to version [13.56](https://exiftool.org/history.html#13.56).

### v35.16.0

- 🌱 Upgraded ExifTool to version [13.55](https://exiftool.org/history.html#13.55).

### v35.15.0

- 🐞 Fixed parsing of POSIX locale date strings like `"Tue 17 Jun 2025 09:29:01 PM PDT"` (emitted by gnome-screenshot's `CreationTime` tag). Previously these fell through to raw strings, losing the time and timezone.
- ✨ `extractZone()` now resolves common unambiguous timezone abbreviations (PDT, EST, CEST, JST, NZDT, etc.) to fixed UTC offsets (e.g. PDT → `UTC-7`) as a last-resort fallback when no numeric UTC offset is present. Ambiguous abbreviations (CST, IST, BST, AST) are intentionally omitted.
- ✨ New `Settings.tzAbbreviationOffsets` allows users to resolve ambiguous abbreviations for their region (e.g. `{ CST: -6 * 60 }` for US Central, `{ IST: 5 * 60 + 30 }` for India).

### v35.14.0

- 🌱 Upgraded ExifTool to version [13.53](https://exiftool.org/history.html#13.53).

### v35.13.0

- ✨ Include `.typed` in `data/TagMetadata.json`. All seen tags now go into this JSON.

### v35.12.1

- 📦 Include `data/TagMetadata.json` in the npm package

### v35.12.0

- ✨ Added `type` field to `data/TagMetadata.json` (e.g. `"string"`, `"number"`, `"ExifDateTime | string"`, `"Struct"`)
- 🐞 Fixed XML entity double-unescaping in `TagDescriptions` by decoding `&amp;` last

### v35.11.0

- 🌱 Upgraded ExifTool to version [13.52](https://exiftool.org/history.html#13.52).

### v35.10.1

- 🐞 Pull in batch-cluster v17.3.1: Fixed orphaned child processes after `end()`. When `end()` was called (either explicitly or via the `beforeExit` handler), the synchronous `process.on("exit")` SIGKILL backstop was removed before async cleanup completed. If the parent process exited before graceful termination finished, child processes survived as orphans. The fix snapshots live PIDs before cleanup begins and keeps the backstop registered until async teardown succeeds.

### v35.10.0

- 🌱 Upgraded ExifTool to version [13.51](https://exiftool.org/history.html#13.51).

### v35.9.0

- 🌱 Upgraded ExifTool to version [13.50](https://exiftool.org/history.html#13.50).

### v35.8.0

- 📦 Pull in new [batch-cluster](https://github.com/photostructure/batch-cluster.js/releases/tag/v17.3.0), and run the new `findStreamFlushMillis()` on linux and windows. After examining ExifTool code, he always force-flushes stderr before emitting `{ready}` -- so we're updating the default for `streamFlushMillis` to `1`.

### v35.7.0

- 🌱 Upgraded ExifTool to version [13.49](https://exiftool.org/history.html#13.49).

### v35.6.0

- 🌱 Upgraded ExifTool to version [13.48](https://exiftool.org/history.html#13.48).

### v35.5.0

- 🌱 Upgraded ExifTool to version [13.47](https://exiftool.org/history.html#13.47).

### v35.4.0

- ✨ New `TagDescriptions` class provides human-readable descriptions for metadata tags. Descriptions are sourced from ExifTool's tag database and merged with hand-curated descriptions for important tags. The hand-curated descriptions are currently English-only. Supports caching and multiple languages.

### v35.3.0

- 🌱 Upgraded ExifTool to version [13.46](https://exiftool.org/history.html#13.46).

- 📦 Added tags and improved descriptions in the [Tags](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.Tags.html) interface

### v35.2.0

- 🐞 Pull in batch-cluster `on("exit")` sync cleanup fix in [v17.1.0](https://github.com/photostructure/batch-cluster.js/releases/tag/v17.1.0)
- 🐞 Fix [#320](https://github.com/photostructure/exiftool-vendored.js/issues/320): timezone info in IPTC `TimeCreated` and XMP datetime tags is now extracted by default. Set `inferTimezoneFromDatestamps: false` to restore prior behavior.

### v35.1.0

- 📦 Support custom ExifToolOption.`processFactory` implementations (for advanced use cases, not for general use)

### v35.0.0

- 💔 **BREAKING**: Upgraded to [batch-cluster v17](https://github.com/photostructure/batch-cluster.js/releases/tag/v17.0.0), which changes process cleanup behavior.

  **Previously**, even though child processes were unreferenced, the stdio streams kept the parent Node.js process alive, requiring explicit `.end()` calls.

  **Now**, stdio streams are unreferenced by default, so scripts can exit naturally without calling `.end()`. Child processes are cleaned up automatically when the parent exits.

  To restore the previous behavior (parent process stays alive until `.end()` is called):

  ```typescript
  new ExifTool({ unrefStreams: false });
  ```

  Fixes [#319](https://github.com/photostructure/exiftool-vendored.js/discussions/319).

### v34.3.0

- 🐞 Add support for colon-less timezone offsets (`2025:04:27 19:47:08-0300`). Thanks for the [report](https://github.com/photostructure/exiftool-vendored.js/issues/318), [@dosten](https://github.com/dosten)!

### v34.2.0

- 🌱 Upgraded ExifTool to version [13.45](https://exiftool.org/history.html#13.45).

### v34.1.0

- 🌱 Upgraded ExifTool to version [13.44](https://exiftool.org/history.html#13.44).

### v34.0.0

- 💔 A couple API changes from `batch-cluster` [v16.0.0](https://github.com/photostructure/batch-cluster.js/releases/tag/v16.0.0)'s impact our API: the `maxReasonableProcessFailuresPerMinute` option and `fatalError` event is now gone -- batch-cluster never shuts down if there are too many timeouts or any failure rate is "too high". Error logs are emitted, however. These large changes were made to service [#312](https://github.com/photostructure/exiftool-vendored.js/issues/312) (thanks for the report and assistance, [@mertalev](https://github.com/mertalev) and [@skatsubo](https://github.com/skatsubo)!)

- 🐞 Fixed: `stdin.write()` errors now properly end the process instead of leaving a broken process in the pool

- 📦 The default `taskTimeoutMillis` is now 30 seconds (it was 20 seconds)

- 🌱 Upgraded ExifTool to version [13.43](https://exiftool.org/history.html#13.43).

### v33.5.0

- 🐞 `isZoneValid` now properly validates Luxon Zone instances (not just zone-like objects)
- 🐞 `isObject` no longer incorrectly returns `true` for Arrays
- 🐞 `isIterable` now correctly handles arrays
- 🐞 Improved GPS data type safety in `ReadTask`
- 📦 Enhanced documentation across multiple modules

### v33.4.0

- ✨ Export `TimezoneOffsetRE`, `parseTimezoneOffsetMatch`, `parseTimezoneOffsetToMinutes`, and `TimezoneOffsetMatch` type for composable timezone parsing
- ✨ `normalizeZone` now accepts numeric offset minutes (e.g., `480` → `UTC+8`)
- ✨ `isUTC` now recognizes additional variants: `"0"`, `"Etc/UTC"`, `"-00"`, `"-00:00"`, `"+00"`
- 🐞 `isZone` now only returns `true` for valid zones

### v33.3.0

- ✨ Export timezone utility functions: `extractZone`, `extractTzOffsetFromTags`, `extractTzOffsetFromUTCOffset`, `normalizeZone`, `inferLikelyOffsetMinutes`, `isUTC`, `isZone`, `isZoneValid`, `isZoneUnset`, `validTzOffsetMinutes`, `zoneToShortOffset`, `equivalentZones`
- ✨ Export timezone types: `TzSrc`, `TimezoneOffset`
- ✨ Unicode minus sign (U+2212) now supported in timezone offset parsing
- ✨ Add `Settings.maxValidOffsetMinutes` (default: 30 minutes, which was used by prior versions) to configure GPS-based timezone inference tolerance
- 🐞 When `Settings.allowArchaicTimezoneOffsets` is `false`, archaic offsets (e.g., Hawaii -10:30) now round to nearest valid offset instead of being rejected

### v33.2.0

- 🌱 Upgraded ExifTool to version [13.42](https://exiftool.org/history.html#13.42).

### v33.1.0

- 🐞 Fixed `GPSTimeStamp` to be `ExifTime | string`
- 🐞 Removed `GPSPositionRef` (not a thing!)

### v33.0.0

- 🐞/💔 `SubSecMediaCreateDate` was removed from `CompositeTags` and `Tags`. It apparently never _was_ a thing, and, worse: I can't blame AI for hallucinating it, because I added it several years ago. Oops!
- ✨ `mktags` was enhanced to detect and avoid duplicate field definitions from included static interfaces.
- ✨ Increased MAX_TAGS from 2500 to 2700 to accommodate additional tags, so there's a bunch of new tags in there! Please open an issue if you see `error TS2590: Expression produces a union type that is too complex to represent` (please be sure to include a reproduction!)
- 📦 Added jsdocs to many, many fields.
- 🐞 `mktags` calculates `@frequency` correctly now (it was measuring "average occurrences per file across all groups" rather than "percentage of files containing this tag" -- this led to some tags having a frequency of 200% (!!))

### v32.1.0

- 🐞 Async `disposable` timeouts are now cancelled properly. Prior versions could prevent the process from exiting until the timeout elapsed.

### v32.0.1

- 💔 Archaic timezones are no longer supported by default. If you have relevant (old) digital media, set `Settings.allowArchaicTimezoneOffsets.value = true`.
- 💔 ExifToolOptions.useMWG now defaults to `true`, the ExifTool recommendation. See [the ExifTool page](https://exiftool.org/TagNames/MWG.html) for more details.
- ✨ Added **Settings** for global library configuration. See [CONFIGURATION](https://photostructure.github.io/exiftool-vendored.js/documents/docs_CONFIGURATION.html) for details.
- 📦 `MakerNotes.AspectRatio` was restored to the Tags union
- 📦 `ExifTool.readRaw()` now accepts the option `useMWG` (which also defaults to `true`) and has a signature that matches `read()`.

### v31.3.0

- 🌱 Upgraded ExifTool to version [13.41](https://exiftool.org/history.html#13.41).

- 📦 Rebuilt `Tags.ts` after adding new cameras from the last couple months. A couple obscure tags have been added and removed.

### v31.2.0

- 🌱 Upgraded ExifTool to version [13.40](https://exiftool.org/history.html#13.40).
- 📦 Added Node.js v25 to the build matrix

### v31.1.0

- 🌱 Upgraded ExifTool to version [13.38](https://exiftool.org/history.html#13.38).
- ✨ Rebuilt `Tags.ts`: fields that live in multiple groups **are now included in every group**. Prior versions would pick the first-seen group for these fields, and that was nondeterministic between versions.
- 📦 `TagMetadata.json` keys are sorted to minimize later per-version diffs
- 📦 (did you know that `File:Comment` was writable? TIL!)

### v31.0.0

- 💔 Rebuilt `Tags.ts` with new exiftool v13.37 and additional newer exemplar test images. Several prior fields (that hopefully no one is using) were dropped, and new fields were added (see the git diff of Tags.ts from the prior release for details)
- 🌱 Upgraded ExifTool to version [13.37](https://exiftool.org/history.html#13.37).

### v30.5.0

- 🌱 Upgraded ExifTool to version [13.35](https://exiftool.org/history.html#13.35).

### v30.4.0

- 🌱 Upgraded ExifTool to version [13.34](https://exiftool.org/history.html#13.34).

- 📦 Upgrade to batch-cluster [v15.0.1](https://github.com/photostructure/batch-cluster.js/releases/tag/v15.0.0) which includes a macos and linux /proc permission workaround, and is now built with OIDC, so it includes https://www.npmjs.com/package/batch-cluster#user-content-provenance

- 📦 Automated publishing (like batch-cluster!), so https://www.npmjs.com/package/exiftool-vendored#user-content-provenance will be a thing

### v30.3.0

- 🌱 Upgraded ExifTool to version [13.31](https://exiftool.org/history.html#13.31).

- ✨ Added **Disposable interface support** for automatic resource cleanup:
  - `ExifTool` now implements both `Disposable` and `AsyncDisposable` interfaces
  - Use `using et = new ExifTool()` for automatic synchronous cleanup (TypeScript 5.2+)
  - Use `await using et = new ExifTool()` for automatic asynchronous cleanup
  - Synchronous disposal initiates graceful cleanup with configurable timeout fallback
  - Asynchronous disposal provides robust cleanup with timeout protection
  - New options: `disposalTimeoutMs` (default: 1000ms) and `asyncDisposalTimeoutMs` (default: 5000ms)
  - Comprehensive error handling ensures disposal never throws or hangs
  - Maintains backward compatibility - existing `.end()` method unchanged

- ✨ **Enhanced JSDoc annotations** for Tags interface with emoji-based visual hierarchy:
  - Replaced cryptic star/checkmark system with ~~even more cryptic~~ semantic JSDoc tags
  - Added 🔥/🧊 emojis to indicate mainstream consumer vs specialized devices
  - Format: `@frequency 🔥 ★★★★ (85%)` combines device type, visual rating, and exact percentage
  - Consolidated @mainstream into @frequency tag for cleaner, more compact documentation
  - Added @groups tag showing all metadata groups where each tag appears (e.g., "EXIF, MakerNotes")
  - Generated `data/TagMetadata.json` with programmatic access to frequency, mainstream flags, and groups
  - Custom TypeDoc tags defined in tsdoc.json for proper tooling support
  - Star ratings maintain same thresholds: ★★★★ (>50%), ★★★☆ (>20%), ★★☆☆ (>10%), ★☆☆☆ (>5%), ☆☆☆☆ (≤5%)

### v30.2.0

- ✨ Enhanced `StrEnum` with iterator support and JSDoc

### v30.1.0

- 🌱 Upgraded ExifTool to version [13.30](https://exiftool.org/history.html#13.30).

- 🐞 Fixed `ExifToolVersion` to be a `string`. Prior versions used `exiftool`'s JSON representation, which rendered a numeric float. This caused versions like "12.3" and "12.30" to appear identical. We now preserve the exact version string to enable proper version comparisons.

- ✨ Added **partial date support** for `ExifDate` class. XMP date tags (like `XMP:CreateDate`, `XMP:MetadataDate`) now support:
  - **Year-only dates**: `1980` (numeric) or `"1980"` (string)
  - **Year-month dates**: `"1980:08"` (EXIF format) or `"1980-08"` (ISO format)
  - **Full dates**: `"1980:08:13"` (unchanged)

- ✨ Enhanced `ExifDate` with type-safe predicates:
  - `isYearOnly()`: Returns `true` for year-only dates with type narrowing
  - `isYearMonth()`: Returns `true` for year-month dates with type narrowing
  - `isFullDate()`: Returns `true` for complete dates with type narrowing
  - `isPartial()`: Returns `true` for year-only or year-month dates

- ✨ Added compositional TypeScript interfaces:
  - `ExifDateYearOnly`: `{year: number}`
  - `ExifDateYearMonth extends ExifDateYearOnly`: `{year: number, month: number}`
  - `ExifDateFull extends ExifDateYearMonth`: `{year: number, month: number, day: number}`

- ✨ Enhanced `WriteTags` interface with group-prefixed tag support:
  - `"XMP:CreateDate"`, `"XMP:MetadataDate"`, etc. accept partial dates
  - `"EXIF:CreateDate"`, etc. require full dates (type-safe distinction)

- 📦 Docs are now automatically updated via [GitHub Actions](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/docs.yml)

- 📦 Added comprehensive test coverage (47 new tests) for partial date functionality

- 📦 Upgrade to batch-cluster [v14.0.0](https://github.com/photostructure/batch-cluster.js/releases/tag/v14.0.0) which removes the requirement for `procps` on most linux distributions.

### v30.0.0

- 🏚️ Dropped support for Node v18, whose End-of-Life was 2025-04-30.

- 🌱 Upgraded ExifTool to version [13.29](https://exiftool.org/history.html#13.29).

- ✨ Added new `TagNames` string enumeration with the most popular 2,500(ish) tag field names that is automatically updated by `mktags`. As a reminder: the `Tags` interface _is not comprehensive_. If we're missing any of your favorite fields, open an issue with an attached example media file and I look into promoting it to a "guaranteed" status (like we've done with several hundred fields already).

- 📦 Renamed the `.tz` field in `Tags` to `.zone`. Note that for the next few releases, `.tz` will be kept, but marked as deprecated. After doing a bit of research, it turns out the correct term for identifiers like `America/Los_Angeles` within the IANA Time Zone Database is "zone." The "tz" term commonly refers to the entire Time Zone Database, or "tz database" (also called tzdata or zoneinfo).

- ✨ Updating to new versions of ExifTool is now fully automated via GitHub Actions.

### v29.3.0

- 🌱 Upgraded ExifTool to version [13.26](https://exiftool.org/history.html#13.26).

- ✨ Added support for [keepUTCTime](https://exiftool.org/ExifTool.html#KeepUTCTime) to ExifToolOptions. This is a new ExifTool feature specifically for unixtime-encoded datetimes, but seems to be rarely applicable as unixtime is not a valid encoding format for most datetime tags.

### v29.2.0

- 🌱 Upgraded ExifTool to version [13.25](https://exiftool.org/history.html#13.25).

- ✨ ExifTool.write() now supports `boolean` field values. Thanks for the [suggestion](https://github.com/photostructure/exiftool-vendored.js/issues/228), [Kira-Kitsune](https://github.com/Kira-Kitsune).

- 📦 Updated the default for ExifToolOptions.maxProcs to use [availableParallelism](https://nodejs.org/api/os.html#osavailableparallelism) where available.

### v29.1.0

- 🌱 Upgraded ExifTool to version [13.17](https://exiftool.org/history.html#13.17). Note that this release includes **seventeen** ExifTool version bumps (from November 2024 through January 2025--Phil Harvey has been _busy_!). Although I haven't seen any breaking changes in the Tags generation or test suite with the new versions, please do your own validation.

- ✨ Thanks to [Mert](https://github.com/mertalev) for [adding forceWrite to binary tag extraction](https://github.com/photostructure/exiftool-vendored.js/pull/222).

- ✨ ExifTool's Geolocation feature seems to work around some obscure GPS encoding issues where the decimal sign gets ignored. This project now leverages that "corrected" GPS location by adopting the hemisphere signs, which seems to [fix this issue](https://github.com/immich-app/immich/issues/13053).

- 🐞 Removed `OffsetTime` from the list of Timezone offset tags we infer tz from. Thanks for the [heads-up](https://github.com/photostructure/exiftool-vendored.js/issues/220), [Carsten Otto](https://github.com/C-Otto)!

- 📦 Updated to the latest `eslint`, which required rewriting the config, and delinting the new nits

- 📦 Deleted most of the `prettier` config to accept their defaults. This created a huge [no-op commit](https://github.com/photostructure/exiftool-vendored.js/commit/622e8a814e22697c25efeb911215855753a97892) but now it's over.

### v29.0.0

- 💔/🐞/📦 ExifTool sometimes returns `boolean` values for some tags, like `SemanticStylePreset`, but uses "Yes" or "No" values for other tags, like `GPSValid` (TIL!). If the tag name ends in `Valid` and is truthy (1, true, "Yes") or falsy (0, false, "No"), we'll convert it to a boolean for you. Note that this is arguably a breaking API change, but it should be what you were already expecting (so is it a bug fix?). See the diff to the Tags interface in this version to verify what types have changed.

- 📦 Reduced `streamFlushMillis` to `10`. This reduced elapsed time for the full test suite by 2.5x on macOS and 3x on Windows, and drops the upper latency bound substantially. Note that this is at the risk of buffered stream collisions between tasks. The (extensive) test suite on Github Actions (whose virtual machines are notoriously slower than molasses) still runs solidly, but if you see internal errors, please open a Github issue and increase your `streamFlushMillis`.

- 💔 TypeScript now emits ES2022, which requires Node.js 18.

#### GPS improvements

- 🐞/📦 GPS Latitude and GPS Longitude values are now parsed from [DMS notation](<https://en.wikipedia.org/wiki/Degree_(angle)#Subdivisions>), which seems to avoid some incorrectly signed values in some file formats (especially for some problematic XMP exports, like from Apple Photos). Numeric GPSLatitude and GPSLongitude are still accepted: to avoid the new coordinates parsing code, restore `GPSLatitude` and `GPSLongitude` to the `ExifToolOptions.numericTags` array.

- 🐞/📦 If `ExifToolOptions.geolocation` is enabled, and `GeolocationPosition` exists, and we got numeric GPS coordinates, we will assume the hemisphere from GeolocationPosition, as that tag seems to correct for more conditions than GPS\*Ref values.

- 🐞/📦 If the encoded GPS location is invalid, all `GPS*` and `Geolocation*` metadata will be omitted from `ExifTool.readTags()`. Prior versions let some values (like `GPSCoordinates`) from invalid values slip by. A location is invalid if latitude and longitude are 0, out of bounds, either are unspecified.

- 🐞/📦 Reading and writing GPS latitude and GPS longitude values is surprisingly tricky, and could fail for some file formats due to inconsistent handling of negative values. Now, within `ExifTool.writeTags()`, we will automatically set `GPSLatitudeRef` and `GPSLongitudeRef` if lat/lon are provided but references are unspecified. More tests were added to verify this workaround. On reads, `GPSLatitudeRef` and `GPSLongitudeRef` will be backfilled to be correct. Note that they only return `"N" | "S" | "E" | "W"` now, rather than possibly being the full cardinal direction name.

- 🐞 If `ignoreZeroZeroLatLon` and `geolocation` were `true`, (0,0) location timezones could still be inferred in prior versions.

- 📦 GPS coordinates are now round to 6 decimal places (≈11cm precision). This exceeds consumer GPS accuracy while simplifying test assertions and reducing noise in comparisons. Previously storing full float precision added complexity without practical benefit.

### v28.8.0

**Important:** ExifTool versions use the format `NN.NN` and do not follow semantic versioning. The version from ExifTool will not parse correctly with the `semver` library (for the next 10 versions) since they are zero- padded.

- 🌱 Upgraded ExifTool to version [13.00](https://exiftool.org/history.html#13.00)

  **Note:** ExifTool version numbers increment by 0.01 and do not follow semantic versioning conventions. The changes between version 12.99 and 13.00 are minor updates without any known breaking changes.

- 📦 Added Node.js v23 to the build matrix.

### v28.7.0

- 🌱 ExifTool upgraded to version [12.99](https://exiftool.org/history.html#12.99)

### v28.6.0

- 🌱 ExifTool upgraded to version [12.97](https://exiftool.org/history.html#12.97)

- 📦 Fields in `Tags` sub-interfaces are correctly sorted

### v28.5.0

- 🐞/📦 Add new `ExifToolOptions.preferTimezoneInferenceFromGps` to prefer GPS timezones. See the jsdoc for details.

- 🐞 Support triple-deep IANA timezones, like `America/Indiana/Indianapolis`.

### v28.4.1

- 📦 The warning "Invalid GPSLatitude or GPSLongitude. Deleting geolocation tags" will only be added if `GPSLatitude` or `GPSLongitude` is non-null.

### v28.4.0

- ✨ Add workaround for abberant Nikon `TimeZone` encoding. Addresses [#215](https://github.com/photostructure/exiftool-vendored.js/issues/215). Set `ExifToolOptions.adjustTimeZoneIfDaylightSavings` to `() => undefined` to retain prior behavior.

### v28.3.1

- 🐞 Re-add +13:00 as a valid timezone offset. Addresses [#214](https://github.com/photostructure/exiftool-vendored.js/issues/214).

### v28.3.0

- 🌱 ExifTool upgraded to [v12.96](https://exiftool.org/history.html#12.96)

- ✨ Add support for timezone offset extraction from `TimeStamp`. Note that this is disabled by default to retain prior behavior (and due to me being chicken that this might break other random cameras). Addresses [#209](https://github.com/photostructure/exiftool-vendored.js/issues/209)

- ✨ [@bugfest](https://github.com/bugfest) improved write typings around `Struct`s. Thanks! See [#212](https://github.com/photostructure/exiftool-vendored.js/pull/212)

- 🐞 [@noahmorrison](https://github.com/noahmorrison) found and fixed an issue with `inferLikelyOffsetMinutes`. Thanks for the assist! See [#208](https://github.com/photostructure/exiftool-vendored.js/pull/208) for details.

- 📦/💔 Possible breaking change: several archane timezone offsets were removed from the `ValidTimezoneOffsets` array, to better address [#208](https://github.com/photostructure/exiftool-vendored.js/pull/208).

### v28.2.1

- 📦 Add `snyk-linux` to npmignore to fix [#200](https://github.com/photostructure/exiftool-vendored.js/issues/200)

### v28.2.0

- 🌱/✨/🐞 ExifTool upgraded to [v12.91](https://exiftool.org/history.html#12.91). Notably, the shebang line has changed from `/usr/bin/perl` to `/usr/bin/env perl`. The [exiftool-vendored.pl package](https://github.com/photostructure/exiftool-vendored.pl/blob/9606de60669da56908c472b8b964f7fd17784df8/update.sh#L24) works around [a new error from this shebang line](https://exiftool.org/forum/index.php?topic=16271.0).

### v28.1.0

- 📦 Add tests for [#187](https://github.com/photostructure/exiftool-vendored.js/issues/187)

- 📦 Export `ImageDataHashTag` interface

### v28.0.0

- 🌱/✨/🐞 ExifTool upgraded to [v12.89](https://exiftool.org/history.html#12.89). Notably, ExifTool on Windows is now using the "official" packaging. This should be equivalent to prior builds, as [exiftool-vendored.exe](https://github.com/photostructure/exiftool-vendored.exe) was already using Oliver Betz's perl launcher.

- 💔 Prior versions included `APP1Tags`, `APP4Tags`, `APP5Tags`, `APP6Tags`, `APP12Tags`, and `APP14Tags`. Unfortunately, due to field name duplications, fields could hop between these interfaces between versions. These have all been collapsed into a single new `APPTags`.

- ✨ Added support for [old Sony A7 UTC inference](https://github.com/photostructure/exiftool-vendored.js/issues/187). Thanks for the help, [Friso Smit](https://github.com/fwsmit)!

- ✨ Added support for [Android Motion Photos](https://github.com/photostructure/exiftool-vendored.js/issues/189). Thanks for the help, [Lukas](https://github.com/lukashass)!

- 📦 Updated `ReadTask` and `WriteTask` constructors to be public as well as the `.parse()` methods as a workaround for [#190](https://github.com/photostructure/exiftool-vendored.js/issues/190)

- 📦 Fought AND WON [a very obscure issue with Node v22.5.0](https://photostructure.com/coding/node-22-exit-handler-never-called/)

### v27.0.0

- 💔 `ExifToolOptions.struct` is now `"undef" | 0 | 1 | 2`. See
  [#184](https://github.com/photostructure/exiftool-vendored.js/issues/184)

- ✨ `ExifToolOptions` now includes `readArgs` and `writeArgs`, which can be
  specified both at `ExifTool` construction, as well as calls to `ExifTool.read`
  and `ExifTool.write`. The prior method signatures are deprecated.

### v26.2.0

- ✨ Support for all ExifTool `struct` modes (fixes [#184](https://github.com/photostructure/exiftool-vendored.js/issues/184)). See ExifToolOptions.struct for details.

- 📦 Fix documentation to reference ExifTool.read() (fixes [#183](https://github.com/photostructure/exiftool-vendored.js/issues/183))

### v26.1.0

- 🌱/✨/🐞 ExifTool upgraded to [v12.85](https://exiftool.org/history.html#12.85). Notably, this addresses [reversed HEIC orientation](https://exiftool.org/forum/index.php?topic=15240.msg86229#msg86229).

- 🐞 Perhaps address [Perl not installed error](https://github.com/photostructure/exiftool-vendored.js/issues/182).

### v26.0.0

- 🌱/✨ ExifTool upgraded to [v12.84](https://exiftool.org/history.html#12.84)

- 📦 Support **disabling** `-ignoreMinorErrors` to work around shenanigans like [#181](https://github.com/photostructure/exiftool-vendored.js/issues/181). This is an optional field that defaults to prior behavior (enabled, which ignores minor errors, which is normally desired, _but has some side effects like fully reading tags that may be extremely long_). See ExifToolOptions.ignoreMinorErrors for details.

- 📦 ExifTool on Windows was upgraded to Strawberry Perl 5.32.1

### v25.2.0

- 🌱/✨ ExifTool upgraded to [v12.82](https://exiftool.org/history.html#v12.82)

- 📦 Add support for `NODE_DEBUG=exiftool-vendored`

- 📦 Export `exiftoolPath()` so custom implementations can use it as a fallback
  (or default, and provide their own fallback)

### v25.1.0

- ✨ Added `retain` field to ExifTool.deleteAllTags() to address [#178](https://github.com/photostructure/exiftool-vendored.js/issues/178)

- 📦 Added jsdocs for many `Tag` interface types

- 📦 Expose `GeolocationTags` and `isGeolocationTag()`

- 📦 Add `FileTags.FileCreateDate` (only a thing on Windows)

### v25.0.0

- 🌱/✨ ExifTool upgraded to [v12.80](https://exiftool.org/history.html#v12.80), which **adds support for reverse-geo lookups** and [several other geolocation features](https://exiftool.org/geolocation.html)

- ✨ If no vendored version of `exiftool` is available, we'll try to make do with whatever is available in the `PATH`.

- ✨ `ExifToolOptions.exiftoolPath` can now be an `async` function

- ✨ Added [Geolocation](https://exiftool.org/geolocation.html) Tags. These will only be available if ExifToolOptions.geolocation is set to true when constructing a new ExifTool instance.

- 📦 Added support for `electron-forge`: [see the docs for details](https://photostructure.github.io/exiftool-vendored.js/documents/docs_ELECTRON.html).

### v24.6.0

- 🌱 ExifTool upgraded to [v12.78](https://exiftool.org/history.html#v12.78)

- 📦 Added ExifTool.off() for unregistering event listeners

### v24.5.0

- 🌱 ExifTool upgraded to [v12.76](https://exiftool.org/history.html#v12.76). Note that an ARW file corrupting issue was found that's existed since v12.45.

- 📦 Updated dependencies, including new [batch-cluster v13](https://github.com/photostructure/batch-cluster.js/releases/tag/v13.0.0) 🍀

### v24.4.0

- 🌱 ExifTool upgraded to [v12.73](https://exiftool.org/history.html#v12.73).

- 📦 If the underlying Perl installation is invalid, throw an error. [See #168 for details.](https://github.com/photostructure/exiftool-vendored.js/issues/168)

### v24.3.0

- 🌱 ExifTool upgraded to [v12.72](https://exiftool.org/history.html#v12.72).

- 📦 Relax GPS latitude/longitude parser to handle invalid Ref values (a warning will be appended to the Tags.warnings field. See [#165](https://github.com/photostructure/exiftool-vendored.js/issues/165).

### v24.2.0

- 🐞 If `perl` isn't installed in `/usr/bin`, feed the full path to `perl` (if we can find it) to `spawn` (rather than relying on the shell to use `$PATH`). This should address issues like [#163](https://github.com/photostructure/exiftool-vendored.js/issues/163)

### v24.1.0

- 📦 Relaxed `isWarning()` detection to be simply `/warning:/i`. v24.0.0 would throw errors when extracting binary thumbnails due to issues like "Warning: Ignored non-standard EXIF at TIFF-IFD0-JPEG-APP1-IFD0", which is decidedly a warning. `ExifTool.write` now leans (hard) on returning Tags.warnings rather than throwing errors: **It is up to you to inspect `.warnings` and decide for your own usecase if the issue is exceptional**. See [issue #162](https://github.com/photostructure/exiftool-vendored.js/issues/162) for details.

### v24.0.0

- 💔 In the interests of reducing complexity, the `ExifToolOptions.isIgnorableError` predicate field was removed -- if this was used by anyone, please open an issue and we can talk about it.

- 💔 `ExifTool.write` now returns metadata describing how many files were unchanged, updated, or created, and **no longer throws errors** if the operation is a no-op or inputs are invalid. See [issue #162](https://github.com/photostructure/exiftool-vendored.js/issues/162) for details.

- ✨ `.warnings` are returned by `ExifTool.read` and `ExifTool.write` tasks if there are non-critical warnings emitted to `stderr` by ExifTool.

- 📦 Some fields in `Tags` were moved to more correct groups

- 📦 Refined `WriteTags` signature to omit `ExifToolTags` and `FileTags` fields.

- 📦 Added [`node:` prefix](https://nodejs.org/api/esm.html#node-imports) to Node.js module imports. This requires node v14.13, v16.0, or later.

### v23.7.0

- 📦 Added MWG `.HierarchicalKeywords` and `.Collections` to `Tags`

- 🐞/📦 `Rotation` was removed from the default set of `numericTags`, as it may
  be encoded as an EXIF orientation value, or a degree rotation, and it should
  be up to the application to figure it out.

### v23.6.0

- 📦 Added new option, `ignoreZeroZeroLatLon`, and **defaulted this new option
  to `true`**. Several camera manufacturers and image applications will write
  `0` to the `GPSLatitude` and `GPSLongitude` tags when they mean "unset"--but
  this can cause incorrect timezone inference. Set to `false` to retain prior
  code behavior.

- 📦 `Rotation` was added to the default set of `numericTags`, as it may be
  encoded as an EXIF orientation value. Prior builds could return Rotation
  values like `"Rotate 270 CW"`.

- 📦 `XMPTags.Notes` was added to `Tags`, used as an album description

- 🐞 Some `ExifToolOption`s were not passed from ExifTool into the ReadTask,
  which caused ReadTask to revert to defaults.

### v23.5.0

- 🌱 ExifTool upgraded to [v12.70](https://exiftool.org/history.html#v12.70). **🏆 Thanks for 20 years of updates, Phil Harvey! 🏆**

- 📦 `XMPTags.Album` was added to `Tags`

### v23.4.0

- 🌱 ExifTool upgraded to [v12.69](https://exiftool.org/history.html#v12.69)

- 📦 `ExifTool.read`: `ExifTime` now adopts the default zone extracted from
  the file. **This may result in different values for timestamps.**

- 📦 Updated dependencies

### v23.3.0

- 🐞 Restored datestamp parsing of `ResourceEvent.When`

### v23.2.0

- ✨ Timezone parsing improvements:
  - Added inferTimezoneFromDatestampTags().
  - Timezone inference from datestamps now skips over UTC values, as Google
    Takeout (and several other applications) may spuriously set "+00:00" to
    datestamps.
  - ReadTask.parse in prior versions had to scan all tags twice to set the
    timezone. Code was refactored to do this in a single pass.
  - Timezone extraction and normalization was improved.

- 📦 Add `creationDate` to `CapturedAtTagNames`. [See PR#159](https://github.com/photostructure/exiftool-vendored.js/pull/159).

### v23.1.0

- 🌱 ExifTool upgraded to [v12.67](https://exiftool.org/history.html#v12.67)

- ✨ `ExifTime` now parses and stores timezone offsets if available. This resolves [issue
  #157](https://github.com/photostructure/exiftool-vendored.js/issues/157).
- 📦 `ExifDateTime`, `ExifTime`, and `ExifDate` are now [only allowed to try
  to parse keys that includes `date` or
  `time`](https://github.com/photostructure/exiftool-vendored.js/blob/ed7bf9eaea9b1d8ad234fb907953568219fc5bdb/src/ReadTask.ts#L389),
  which avoids incorrect parsing of tags like `MonthDayCreated` (which looks
  like `12:19`)

- 📦 Updated all dependencies, but only `devDependencies` were impacted.

### v23.0.0

- 🏚️ Dropped support for Node.js v16, which is [End-of-Life](https://nodejs.org/en/blog/announcements/nodejs16-eol).

- 💔/🐞 If `defaultVideosToUTC` is set to `true`, `read()` will now allow non-UTC
  timezones extractable from other tags to be assigned to `.tz`. Prior
  versions would simply force `.tz` to "UTC" for all videos, which wasn't
  great. Note that "UTC" is still used as the default timezone for all
  datestamps without explicit timezones, just as prior versions did. See [issue
  #156](https://github.com/photostructure/exiftool-vendored.js/issues/156) for
  details.

- 💔 `backfillTimezones` now defaults to `true`. Although this is likely to be
  what people expect, but know that this makes the assumption that all encoded
  times without an explicit offset share the same tz, which may not be correct
  (say, if you edit the image in a different timezone from when it was
  captured).

- 💔 If `backfillTimezones` is set to `false`, `ExifDateTime` will no longer
  use the current file's `.tz` as a default. Prior versions would inherit the
  file's `.tz`, which might be incorrect.

- 📦 `ExifDateTime` now includes an `.inferredZone` field, which may be useful
  in helping to determine how "trustworthy" the zone and actual datestamp
  value is.

### v22.2.3

- 🐞 Apply the v22.2.3 bugfix _even wider_ (just found a `SubSecTime` value of "01" in the wild, and it was happily parsed into today's date, oops).

### v22.2.2

- 🐞 Apply the v22.2.1 bugfix wider: we now reject parsing any date-ish or time-ish value that matches `/^0+$/`.

### v22.2.1

- 🐞 `ExifTime` now properly rejects invalid `SubSecTime`, `SubSecTimeOriginal`, ... values of "0" or "00".

### v22.2.0

- ✨ Add support for zone extraction from `ExifDateTime`, `ExifTime`, `number[]`, and `number` fields.

- 📦 Improve type signature of `extractTzOffsetFromTags`.

### v22.1.0

- 🌱 ExifTool upgraded to [v12.65](https://exiftool.org/history.html#v12.65)

- ✨ Add support for new `ImageDataHash` tag.

- 🐞 `perl` is checked for on non-windows machines at startup. This resolves [#152](https://github.com/photostructure/exiftool-vendored.js/issues/152). You can disable this with the new `checkPerl` ExifToolOption.

### v22.0.0

- 🏚️ Drop support for Node 14, which EOL'ed 2023-04-30

- 🌱 ExifTool upgraded to [v12.62](https://exiftool.org/history.html#v12.62)

- 🐞 Fix exports for DefaultExifToolOptions and several other non-type values. Thanks for the [bug report, renambot!](https://github.com/photostructure/exiftool-vendored.js/issues/144)

### v21.5.1

- 📦 Avoid double-rendering of ImageDataMD5 (Thanks, Phil! See [forum post for details](https://exiftool.org/forum/index.php?topic=14706.msg79218#msg79218))

- 📦 Pull down new camera test images, rebuild Tags and docs

### v21.5.0

- ✨ Added support for ExifTool's [MWG Composite Tags](https://exiftool.org/TagNames/MWG.html). Set the new ExifToolOptions.useMWG option to `true` to enable.

- ✨ Added support for ExifTool's new `ImageDataMD5` feature. Set the new ExifToolOptions.includeImageDataMD5 option to `true` to enable.

- 📦 Extracted options-related code into modules to remove a couple circular
  dependencies. Exports should make this transparent to external clients.

### v21.4.0

- 🐞 Improved types from `ExifTool.readRaw()`. Thanks for the suggestion, [Silvio Brändle](https://github.com/photostructure/exiftool-vendored.js/issues/138)!

### v21.3.0

- 🌱 ExifTool upgraded to [v12.60](https://exiftool.org/history.html#v12.60)

- 📦 Replaced `Tags.tzSource` message `"from lat/lon"` to
  `"GPSLatitude/GPSLongitude"` to be more consistent with other timezone
  source messages.

### v21.2.0

- ✨ Implemented `ExifDateTime.plus()`. Added tests.

### v21.1.0

- 🐞 Negative GPSLatitude and GPSLongitude values are now supported for EXIF
  (like `.JPEG`), `.XMP`, and `.MIE` files. Thanks for the [bug
  report](https://github.com/photostructure/exiftool-vendored.js/issues/131),
  [Jason](https://github.com/contd), and the
  [solution](https://exiftool.org/forum/index.php?topic=14488.msg78082#msg78082),
  [Phil](https://exiftool.org/)!

- 🌱 ExifTool upgraded to [v12.56](https://exiftool.org/history.html#v12.56)

### v21.0.0

- 💔 `ExifDateTime.fromDateTime()` now takes an option hash as the second
  argument (instead of the second argument being `rawValue`)

- 🐞 `ExifDateTime.milliseconds` will now be `undefined` if the EXIF or ISO
  date string did not specify milliseconds, and will no longer render
  milliseconds if the `rawValue` did not include millisecond precision.

- 📦 EXIF and ISO dates without specified seconds or milliseconds are now allowed

- 📦 Switched `package.json` scripts from `yarn` to `npm`, as yarn@1 doesn't
  work with Node v22.5 and GitHub Actions.

### v20.0.0

- 💔 `ExifTool.write` took a generic that defaulted to `WriteTags`, but the type wasn't used for anything. I removed the generic typing, which may require consumers to change their code.

- 🌱 ExifTool upgraded to [v12.55](https://exiftool.org/history.html#v12.55)

- 📦 `npm run prettier` now re-organizes imports

- 📦 Updated dependencies, re-ran prettier, rebuilt tags, rebuilt docs

### v19.0.0

- 💔/🐞 [Fix #124](https://github.com/photostructure/exiftool-vendored.js/issues/124): Improved support for filenames with non-latin (a-z0-9) characters on Windows machines that weren't set to UTF-8. Thanks for the bug report and PR, [Jürg Rast](https://github.com/jrast)!

- 💔/🐞 ExifTool v12.54 has several new tags (see the diff) and now renders `GPSAltitude` with negative values when the altitude is below sea level.

- 🌱 ExifTool upgraded to [v12.54](https://exiftool.org/history.html#v12.54)

- 📦 Updated dependencies, re-ran prettier, rebuilt tags, rebuilt docs

- 📦 Node v19 added to the CI test matrix

### v18.6.0

- 🌱 ExifTool upgraded to [v12.50](https://exiftool.org/history.html#v12.50)

- 📦 Updated dependencies, rebuild tags and docs

### v18.5.0

- ✨ `ExifToolOptions` now supports an `ignorableError` predicate, used for characterizing errors as "ignorable". Defaults to ignoring the following styles of warnings:
  - `Warning: Duplicate MakerNoteUnknown tag in ExifIFD`
  - `Warning: ICC_Profile deleted. Image colors may be affected`

- 🐞 Only read operations are now retried. See [#119](https://github.com/photostructure/exiftool-vendored.js/issues/119#issuecomment-1299423164)

### v18.4.2

- 🐞 Date-time tags with exactly Common Epoch (`1970-01-01T00:00:00Z`) are no longer filtered as invalid. See [#118](https://github.com/photostructure/exiftool-vendored.js/issues/118) for details.

- 📦 Updated dependencies, rebuild tags and docs

### v18.4.1

- 🐞 The public export for `BinaryField` mistakenly exposed it being named
  `BinaryDataField`. The name of the export and the class are now both
  `BinaryField`.

### v18.4.0

- ✨ Binary fields are now parsed to a new `BinaryField` object which parses
  out the length of the binary field

- 🐞/📦 Added more required tag fields to `mktags`, including
  `SubSecModifyDate` (which fell off of the Tags.ts API in v18.3.0, oops!)

- 📦 `ExifTime` now retains the raw value to be consistent with `ExifDate` and `ExifDateTime`

### v18.3.0

- 🌱 ExifTool upgraded to [v12.49](https://exiftool.org/history.html#v12.49), which adds write support to WEBP and a bunch of other goodness

- 📦 Added new cameras to test image corpus, rebuilt tags and docs

- 📦 Updated dependencies

### v18.2.0

- ✨ Add support for alternative gps timezone lookup libraries. If you want to use `geo-tz` instead, use something like this:

```js
const geoTz = require("geo-tz");
const { ExifTool } = require("exiftool-vendored");
const exiftool = new ExifTool({
  geoToTz: (lat, lon) => geoTz.find(lat, lon)[0],
});
```

- ✨ If a timezone offset tag is present, _and_ GPS metadata can infer a timezone, _and_ they result in the same offset, `Tags.tz` will use the GPS zone name (like `America/Los_Angeles`).

- 🐞 We now only apply timezone offset defaults to tag values that are lacking in explicit offsets and are not always encoded in UTC.

- 📦 Timezone "normalization" to a single timezone is no longer applied--if a datetime tag has an offset, the ExifDateTime value should retain that offset value now. Use `ExifDateTime.setZone` if you want to normalize any instance.

- 📦 Restore `GPSPosition` to the default `numericTags` so all GPS lat/lon values are consistent.

### v18.1.0

- 📦 Switch from the abandoned `tz-lookup` package to [`@photostructure/tz-lookup`](https://github.com/photostructure/tz-lookup). Note that this uses an updated time zone geo database, so some time zone names and geo shapes have changed.

- 📦 The `GPSPosition` tag is no longer included in the default set of numeric tags, as this results in ExifTool returning two floats, whitespace-separated. Use `GPSLatitude` and `GPSLongitude` instead.

### v18.0.0

- 💔 `ReadTask.for()` now takes an options hash, which includes the new `defaultVideosToUTC` option.

- 🐞 Videos now default to UTC, unless there is a `TimeZone`, `OffsetTime`, `OffsetTimeOriginal`, `OffsetTimeDigitized`, or `TimeZoneOffset` tag value. Thanks for the [bug report](https://github.com/photostructure/exiftool-vendored.js/issues/113), @mrbrahman!

- 🌱 ExifTool upgraded to [v12.45](https://exiftool.org/history.html#v12.45).

### v17.1.0

- ✨ `ExifDateTime` and `ExifDate` now have a `toMillis()` to render in
  milliseconds from common epoch

- 📦 Expose `closeChildProcesses` from underlying BatchCluster instance

- 🐞 Pull in [batch-cluster bugfix](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1042)

(Note that this build _does not_ pull in ExifTool v12.44, [due to this bug](https://exiftool.org/forum/index.php?topic=13863.0))

### v17.0.1

- 🐞 `reasonableTzOffsetMinutes()`, `extractOffset()`, and
  `offsetMinutesToZoneName()` handle `UnsetZone` properly. This shouldn't normally come into play, as this would require serialization of the unset timezone, but... why not, eh?

### v17.0.0

- 💔 Luxon has a [breaking change](https://moment.github.io/luxon/#/upgrading?id=_2x-to-30). Please verify that date parsing and zone assignments work as expected.

- 🌱 ExifTool upgraded to [v12.43](https://exiftool.org/history.html#v12.43).

- 🐞 `UnsetZone` now uses [`Info.normalizeZone()`](https://moment.github.io/luxon/api-docs/index.html#info).

- 📦 Updated dependencies

### v16.5.1

- 🌱 ExifTool upgraded to [v12.42](https://exiftool.org/history.html#v12.42).

- 📦 Updated dependencies

- 📦 Dropped Node v12 from GitHub Actions CI

- 📦 Added [RELEASE.md](https://github.com/photostructure/exiftool-vendored.js/blob/main/RELEASE.md)

### v16.4.0

- 🐞 Struct values are now properly encoded when writing. Specifically, prior
  versions didn't support JSON string values (and now WriteTask knows how to
  serialize those characters to make ExifTool happy)

- 📦/💔 `String.htmlEncode` was made private: it was a special-purpose function
  just for `WriteTask`.

- 📦 Added Node 18 to test matrix. Node 12 will be dropped from support in the
  next version.

- 📦 Updated dependencies

### v16.3.0

- ✨ Added `ExifDateTime.fromMillis()`

- 📦 Fixed hanging sentence in README. Rebuild docs.

- 📦 Migrated `omit()` to `Object`.

### v16.2.0

- ✨ Added read/write support for
  [History](https://exiftool.org/TagNames/XMP.html#ResourceEvent) and
  [Versions](https://exiftool.org/TagNames/XMP.html#Version) structs.
  - These two tags return typed optional struct arrays.

  - Via the new `StructAppendTags` interface, `ExifTool.write()` now accepts
    plus-suffixed variants of these tags to append to existing records.

- 🌱 ExifTool upgraded to [v12.41](https://exiftool.org/history.html#v12.41).

- 📦 Updated dependencies

### v16.1.0

- ✨ Updated dependencies, including batch-cluster
  [v10.4.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1040)).

  This new version will detect when tasks are rejected (due to parsing issues or
  any other reason), and in that case, the child `exiftool` process will be
  verified to be "healthy" before being put back into the service pool.

### v16.0.0

- 💔/🐞 Timezone extraction has been adjusted: if there is a GPS location, we'll
  prefer that `tzlookup` as the authoritative timezone offset. If there isn't
  GPS lat/lon, we'll use `Timezone`, `OffsetTime`, or `TimeZoneOffset`. If those
  are missing, we'll infer the offset from UTC offsets.

  Prior builds would defer to the offset in `Timezone`, `OffsetTime`, or
  `TimeZoneOffset`, but GPS is more reliable, and results in a proper time zone
  (like `America/Los_Angeles`). Zone names work correctly even when times are
  adjusted across daylight savings offset boundaries.

- 💔/🐞 Timezone application is now has been improved: if a timezone can be
  extracted for a given file, `ExifTool.read()` will now make all `ExifDateTime`
  entries match that timezone. The timestamps should refer to the same
  timestamp/seconds-from-common-epoch, but "local time" may be different as
  we've adjusted the timezone accordingly.

  Metadata sometimes includes a timezone offset, and sometimes it doesn't, and
  it's all pretty inconsistent, but worse, prior versions would sometimes
  inherit the current system timezone for an arbitrary subset of tags. This
  version should remove the system timezone "leaking" into your metadata values.

  As an example, if you took a photo with GPS information from Rome (CET,
  UTC+1), and your computer is in California with `TZ=America/Los_Angeles`,
  prior versions could return `CreateDate: 2022-02-02 02:02:22-07:00`. This
  version will translate that time into `CreateDate: 2022-02-02 11:02:22+01:00`.

  Note that this fix results in `ExifTool.read()` rendering different `ExifDateTime`
  values from prior versions, so I bumped the major version to highlight this
  change.

- 💔 `Tags` is automatically generated by `mktags`, which now has a set of
  "required" tags with type and group metadata to ensure a core set of tags
  don't disappear or change types.

  As a reminder, the `Tags` interface is only a subset of fields returned, due
  to TypeScript limitations. `ExifTool.read()` still returns all values that ExifTool
  provides.

- 🐞 Fixed a bunch of broken API links in the README due to `typedoc` changing
  URLs. Harumph.
- 🐞 Prior versions of `ExifDateTime.parseISO` would accept just time or date
  strings.
- 🐞/📦 `TimeStamp` tags may now be properly parsed as `ExifDateTime`.
- 📦 Added performance section to the README.

- 📦 Timezone offset formatting changed slightly: the hour offset is no longer
  zero-padded, which better matches the Luxon implementation we use internally.

- 📦 `ExifDateTime` caches the result of `toDateTime` now, which may save a
  couple extra objects fed to the GC.

- 📦 Updated dependencies, including batch-cluster
  [v10.3.2](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1032)),
  which fixed several race conditions and added several process performance
  improvements including support for zero-wait multi-process launches.

### v15.12.1

- 📦 Updated dependencies (batch-cluster
  [v10.3.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1030)),
  including more pessimistic defaults for `streamFlushMillis` and new
  `noTaskData` event.

- 📦 Exported type signatures, `AdditionalWriteTags`, `ExpandedDateTags`,
  `Maybe`, `Omit`, and `Struct` to improve `typedoc`-generated documentation.
  Rebuilt docs.

### v15.12.0

- 📦 We now verify external `exiftool`s are healthy with a `-ver` ping every 30 seconds.

- 📦 Updated dependencies (batch-cluster [v10.2.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1020)) that includes this [performance improvement/bugfix](https://github.com/photostructure/batch-cluster.js/issues/15)

### v15.11.0

- 🌱 ExifTool upgraded to [v12.40](https://exiftool.org/history.html#v12.40).

- 📦 Updated dependencies (batch-cluster [v10.0.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v1000))

- 📦 Rebuild `Tags.ts` and docs

### v15.10.1

- 📦 Updated dependencies (batch-cluster v8.1.0)

- 📦 Rebuild docs

### v15.10.0

- 🌱 ExifTool upgraded to [v12.39](https://exiftool.org/history.html#v12.39).

- 🐞/📦 Include `@types/luxon` in `dependencies` (thanks, [davidmz](https://github.com/photostructure/exiftool-vendored.js/pull/108)!)

### v15.9.2

- 📦 Rebuild tags and docs with updated test images. Note that some `GPS` tags types changed to `string`: see v15.8.0.

### v15.9.1

- 📦 Exposed `UnsetZoneOffsetMinutes` from `Timezones`

### v15.9.0

- 📦 Exposed `UnsetZone` and `UnsetZoneName` from `Timezones`

### v15.8.0

- 🐞 `GPSDateTime` in prior versions could be incorrectly parsed, resulting in an incorrectly inferred current-date and encoded-time.

- 🐞 GPS latitude and longitude parsing could result in the incorrect hemisphere, depending on the version of ExifTool.

- 📦 The prior default of making all `GPS*` tags numeric has been reduced to only `GPSLatitude` and `GPSLongitude`, which means tags like `GPSImgDirectionRef` will now be something like "Magnetic North" instead of the more cryptic "M", and `GPSAltitudeRef` will now be "Below Sea Level" instead of "1".

### v15.7.0

- 🌱 ExifTool upgraded to [v12.38](https://exiftool.org/history.html#v12.38).

- ✨ Add specific support for [deleting values associated to existing tags](https://github.com/photostructure/exiftool-vendored.js/issues/104)

- 🐞 No-op `.write()` calls to sidecars are now gracefully no-op'ed.

- 📦 Added tests with and without retries (to validate stdout/stderr bugfixes in v8.0 of `batch-cluster`)

- 📦 Replace `orElse` calls with `??`

- 📦 Updated dependencies

### v15.6.0

- ✨ Added [serialization support](https://github.com/photostructure/exiftool-vendored.js/issues/102)

- 🌱 ExifTool upgraded to [v12.34](https://exiftool.org/history.html#v12.34).

### v15.5.0

- 🌱 ExifTool upgraded to [v12.33](https://exiftool.org/history.html#v12.33).

- 📦 Updated dependencies

- 📦 Now ignoring `yarn.lock`

### v15.4.0

- 🌱 ExifTool upgraded to [v12.31](https://exiftool.org/history.html#v12.31).

- 📦 Updated dependencies (including new TypeScript, which required import [adjustments](https://github.com/microsoft/TypeScript/issues/46027#issuecomment-926019016).

### v15.3.0

- ✨ `ExifTool.read` and `ExifTool.write` [now accept generics](https://github.com/photostructure/exiftool-vendored.js/issues/103).

- 🌱 ExifTool upgraded to [v12.30](https://exiftool.org/history.html#v12.30).

- 📦 Updated dependencies (including new Luxon and TypeScript)

- 📦 Rebuilt docs

### v15.2.0

- 📦 Updated dependencies (including [batch-cluster
  v7.1.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v710),
  which fixes a 2s startup delay

### v15.1.0

- 📦 Rebuild `Tags.ts` from more recent exemplars and tag type overrides
  (v15.0.0 changed to `Keywords: string`, this version reverts that change)

### v15.0.0

- 💔 TypeScript now renders modern (ES2018) JavaScript, which requires a
  [supported version of Node.js](https://nodejs.org/en/about/releases/).

- ✨ New `ExifTool.extractBinaryTagToBuffer()`: [extract binary tags directly into a
  `Buffer`](https://github.com/photostructure/exiftool-vendored.js/issues/99)
  (watch out for memory bloat from very large binary tag payloads!)

- ✨ Expose `ExifTool.childEndCounts` (counts of why child processes were recycled: useful for debugging)

- 📦 Updated dependencies (including [batch-cluster v7.0.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md#v700))

### v14.6.2

- 📦 Updated batch-cluster (support for listing current tasks)

### v14.6.1

- 📦 Updated batch-cluster (support for nullable pids)

### v14.6.0

- 🌱 ExifTool upgraded to [v12.28](https://exiftool.org/history.html#v12.28).

- 📦 Updated dependencies

### v14.5.0

- 🌱 ExifTool upgraded to [v12.26](https://exiftool.org/history.html#v12.26).

- 📦 Updated dependencies

### v14.4.0

- ✨ Added `ExifDate.rawValue`

- 📦 Updated dependencies

### v14.3.0 🔥

- 🔥/🌱 ExifTool upgraded to [v12.25](https://exiftool.org/history.html#v12.25).

  **All users should upgrade to this version as soon as possible**, as this should
  address
  [CVE-2021-22204](https://twitter.com/wcbowling/status/1385803927321415687).

- 📦 Updated dependencies

### v14.2.0

- 🌱 ExifTool upgraded to [v12.23](https://exiftool.org/history.html#v12.23)

### v14.1.1

- 📦 Republish of 14.1.0 (`np` failed to publish 14.1.0 properly)

### v14.1.0

- 🌱 ExifTool upgraded to [v12.21](https://exiftool.org/history.html#v12.21)

- 📦 Stopped excluding sourcemaps

- 📦 Updated dependencies

### v14.0.0

- 💔 `ExifDateTime.zone` will now return the actual IANA zone name (like `America/Los_Angeles`) rather than the time offset. This addresses issues with timezones like `Europe/Kiev` where, from 1900-1924, had an offset of `UTC +2:02:04`.

- ✨ Added `ExifDateTime.isValid`

- 🌱 ExifTool upgraded to [v12.19](https://exiftool.org/history.html#v12.19)

- 📦 Rebuilt Tags.ts and docs

- 📦 Updated dependencies

### v13.2.0

- 🌱 ExifTool upgraded to [v12.18](https://exiftool.org/history.html#v12.18)

- 📦 Updated dependencies

### v13.1.0

- 🐞 More complex characters, like emoji that use compound codepoints, like 🦍,
  🦄, or 🚵‍♀️, are now supported. See
  [#87](https://github.com/photostructure/exiftool-vendored.js/issues/87) for
  more details. Thanks for the report, [Gabe
  Rodriguez](https://github.com/grod220)!

- 🌱 ExifTool upgraded to [v12.14](https://exiftool.org/history.html#v12.14)

- 📦 [he](https://github.com/mathiasbynens/he) is now a dependency, which was
  required by the emoji bugfix.

- 📦 Updated dependencies

### v13.0.0

- 💔 The `Tags.ts` types have changed. **Some newly-found types were added, many
  rarely-occurring types have been removed, and `Tag` sub-interfaces have
  changed**. Tag retention heuristics had to be updated, as TypeScript would
  crash with `error TS2590: Expression produces a union type that is too complex to represent`.

  `mktags` now has a "safe" set of tags that will be retained, and a set of tags
  that are expressly excluded.

  These changes won't prevent all type changes from happening in the future, but
  will prevent these more-common tags from being removed completely.

  As several tags are found in several different
  [groups](https://exiftool.org/TagNames/index.html), `mktags` now tries to
  place tags first in `FileTags` and `EXIFTags` groups before more proprietary
  APP groups, which should help future interface stability. (This explains why
  `MIMEType` moved to `FileTags`, for example).

- 🌱 ExifTool upgraded to [v12.12](https://exiftool.org/history.html#v12.12).

  Note that this version renders file sizes a bit differently: "756 kB" will now
  be rendered as "756 KiB".

### v12.3.1

- 📦 Removed dev dependency on `npm-check-updates`, as it no longer supports
  Node v10 (wth, ncu)

### v12.3.0

- 🌱 ExifTool upgraded to [v12.10](https://exiftool.org/history.html#v12.10)
- 📦 Rebuilt Tags.ts and docs
- 📦 Updated dependencies

### v12.2.0

- 🌱 ExifTool upgraded to [v12.06](https://exiftool.org/history.html#v12.06)
- 📦 Added quoted-file test

### v12.1.0

- 🌱 ExifTool upgraded to [v12.05](https://exiftool.org/history.html#v12.05)
- 📦 Updated dependencies

### v12.0.0

- 💔 `ExifDateTime.toISOString()` now returns `string | undefined` (as it
  proxies for Luxon's `DateTime.toISO()`, which now may return `null`.)
- 🌱 ExifTool upgraded to [v12.04](https://exiftool.org/history.html#v12.04)
- 📦 Rebuilt Tags.ts and docs
- 📦 Updated dependencies

### v11.5.0

- 🐞 `ExifDateTime` and `ExifDate` no longer accept just a year or year and month.
- 📦 Updated dependencies

### v11.4.0

- 🌱 ExifTool upgraded to [v12.01](https://exiftool.org/history.html#v12.01)
- ✨ ExifTool now takes a `Logger` thunk in the constructor options.
- 📦 Updated dependencies

### v11.3.0

- 🌱 ExifTool upgraded to [v11.98](https://exiftool.org/history.html#v11.98)
- 📦 BinaryExtractionTasks don't bother retrying when binary payloads are
  missing (which turns out to be a common issue)
- 📦 ExifToolTask is now exported
- 📦 Updated dependencies

### v11.2.0

- 🌱 ExifTool upgraded to [v11.95](https://exiftool.org/history.html#v11.95)
- 📦 Updated dependencies

### v11.1.0

- 📦 Updated dependencies, including `batch-cluster`. The new
  `maxIdleMsPerProcess` option shuts down ExifTool processes automatically if
  they are idle for longer than `maxIdleMsPerProcess` milliseconds. New
  processes are forked when needed.

### v11.0.0

- 💔 **Breaking change:** A number of tags were removed from `Tags` because we
  were getting dangerously close to TypeScript's `error TS2590: Expression produces a union type that is too complex to represent.`
- 🌱 ExifTool upgraded to [v11.93](https://exiftool.org/history.html#v11.93)

### v10.1.0

- 🐞 ExifTool doesn't (currently) respect `-ignoreMinorErrors` when extracting
  binary blobs. `BinaryExtractionTask` now assumes stderr messages matching
  `/^warning: /` are not actually errors.
- 🌱 ExifTool upgraded to [v11.92](https://exiftool.org/history.html#v11.92)
- 📦 Updated dependencies
- 📦 Prettier 2.0.0 pulled in and codebase reformatted with new defaults, causing huge (no-op) diff.

### v10.0.0

- 💔 **Breaking change:** For the past many major versions, when date and time
  fields are invalid, this library returns the raw (invalid) string provided by
  ExifTool, rather than an instance of `ExifDateTime`, `ExifDate`, or
  `ExifTime`. The `Tag` types now reflect this, but you'll _probably need to
  update your code_. See
  [#73](https://github.com/photostructure/exiftool-vendored.js/issues/73) for
  more context.
- 🌱 ExifTool upgraded to [v11.91](https://exiftool.org/history.html#v11.91)
- 📦 Updated dependencies

### v9.7.0

- 🐞/✨ Date, DateTime, and Time tags can now ISO formatted. See
  [#71](https://github.com/photostructure/exiftool-vendored.js/issues/71).
  Thanks for the report, [Roland Ayala](https://github.com/rolanday)!

### v9.6.0

- 🌱 ExifTool upgraded to [v11.86](https://exiftool.org/history.html#v11.86)
- 📦 Replace tslint with eslint. Fixed new linting errors.
- 📦 Updated dependencies

### v9.5.0

- 🌱 ExifTool upgraded to [v11.80](https://exiftool.org/history.html#v11.80)

### v9.4.0

- 🌱 ExifTool upgraded to [v11.78](https://exiftool.org/history.html#v11.78)
- 📦 Updated ExifTool's homepage from
  <https://www.sno.phy.queensu.ca/~phil/exiftool/> to <https://exiftool.org>.
- 📦 Updated dependencies. New `batch-cluster` doesn't propagate errors from
  ended processes anymore, which should address [issue
  #46](https://github.com/photostructure/exiftool-vendored.js/issues/69).

### v9.3.1

- 📦 Updated dependencies. New batch-cluster shouldn't throw errors within async
  blocks anymore.

### v9.3.0

- ✨ Rebuilt `Tags` from 8008 example images and videos. New tags were found, but
  some of the more obscure tags have been dropped.
- 🌱 ExifTool upgraded to
  [v11.76](https://exiftool.org/history.html#v11.76)
- 📦 Updated dependencies

### v9.2.0

- 🌱 ExifTool upgraded to
  [v11.75](https://exiftool.org/history.html#v11.75)
- 📦 Updated dependencies, including TypeScript 2.7

### v9.1.0

- ✨ Added `ExifTool.deleteAllTags`.

### v9.0.0

- 📦 This version is using the new Windows packaging of ExifTool written by
  [Oliver Betz](https://oliverbetz.de/pages/Artikel/ExifTool-for-Windows), and
  is why I bumped the major version (as there may be issues with the new
  packaging).
- 🌱 ExifTool upgraded to
  [v11.73](https://exiftool.org/history.html#v11.73)

### v8.22.0

- ✨ Added `ExifDateTime.hasZone`
- ✨ `ExifDateTime.toISOString` automatically omits the timezone offset if unset
- 🐞 Hour timezone offsets were rendered without padding (which doesn't comply
  with the ISO spec).
- 🌱 ExifTool upgraded to
  [v11.65](https://exiftool.org/history.html#v11.65).

### v8.21.1

- 🐞 Fixed timezone inference rounding bug (`UTC+2` would return `UTC+02:15`)

### v8.21.0

- ✨ Exposed `Tags.tzSource` from `.read`. This is an optional string holding a
  description of where and how the source timezone offset, `Tags.tz`, was
  extracted. You will love it.

### v8.20.0

- ✨ Support for `.ExifTool_config` files was added. Either place your [user
  configuration file](http://owl.phy.queensu.ca/~phil/exiftool/config.html) in
  your `HOME` directory, or set the `EXIFTOOL_HOME` environment variable to the
  fully-qualified path that contains your user config. Addresses
  [#55](https://github.com/photostructure/exiftool-vendored.js/issues/55).

### v8.19.0

- 🌱 ExifTool upgraded to
  [v11.59](https://exiftool.org/history.html#v11.59).
- ✨ Rebuilt `Tags` from 6,818 sample images.
- 🐞 `GPSDateTime` is now forced to be `UTC`.

### v8.18.0

- ✨ Expose `Tags.tz` from `.read`. This is an optional string holding the
  timezone offset, like `UTC+1`, or an actual location specification, like
  `America/Los_Angeles`. This is only included when it is specified or inferred
  from tag values.
- ✨ Added another timezone offset extraction heuristic: if `DateTimeUTC` and
  another created-at time is present, the offset is inferred from the delta.

### v8.17.0

- ✨ Automagick workaround for AWS Lambda. See the new `ExifToolOption.ignoreShebang`
  option,
  which should automatically be set to `true` on non-Windows platforms that
  don't have `/usr/bin/perl` installed. [See
  #53](https://github.com/photostructure/exiftool-vendored.js/issues/53).

### v8.16.0

- 🌱 ExifTool upgraded to
  [v11.55](https://exiftool.org/history.html#v11.55).

### v8.15.0

- ✨ Write support has been improved
  - Creation of new sidecar files is now supported
  - Non-struct list tags (like `Keywords`) is now supported
  - Test coverage includes images, `.XMP` files, and `.MIE` files
- 📦 Set up `nyc` (test coverage report)
- 📦 Updated dependencies

### v8.14.0

- 🌱 ExifTool upgraded to
  [v11.54](https://exiftool.org/history.html#v11.54).
- 📦 Updated dependencies
- 📦 Mention the need for `perl` in the installation instructions. [See
  #51](https://github.com/photostructure/exiftool-vendored.js/issues/51).

### v8.13.1

- 📦 Updated dependencies

### v8.13.0

- 🐞 Better support for writing tags with date and time values. [See
  #50](https://github.com/photostructure/exiftool-vendored.js/issues/50).
- ✨ Manually added
  [ApplicationRecordTags](https://sno.phy.queensu.ca/~phil/exiftool/TagNames/IPTC.html#ApplicationRecord)
- 📦 Updated dependencies
- 📦 Added NodeJS version 12 to the CI build matrix
- 🌱 ExifTool upgraded to
  [v11.51](https://exiftool.org/history.html#v11.51).

### v8.12.0

- ✨ Rebuilt `Tags` from 6779 examples. New tags were found, including `PreviewTIFF`.
- 📦 Updated dependencies
- 🌱 ExifTool upgraded to
  [v11.49](https://exiftool.org/history.html#v11.49).

### v8.11.0

- 📦 Updated dependencies
- 🌱 ExifTool upgraded to
  [v11.47](https://exiftool.org/history.html#v11.47).

### v8.10.1

- 📦 Updated dependencies

### v8.10.0

- 🌱 ExifTool upgraded to
  [v11.43](https://exiftool.org/history.html#v11.43).
- 📦 Updated dependencies

### v8.9.0

- 🐞 Throw an error if
  [process.platform()](https://nodejs.org/api/process.html#process_process_platform)
  returns nullish
- 🌱 ExifTool upgraded to
  [v11.37](https://exiftool.org/history.html#v11.37).
- 📦 Updated dependencies, fixed a couple typing nits

### v8.8.0

- 🌱 ExifTool upgraded to
  [v11.34](https://exiftool.org/history.html#v11.34).
- ✨ `ExifDateTime` and `ExifDate` now have `fromExifStrict` and `fromExifLoose`
  parsing methods.
- 📦 Updated dependencies

### v8.7.1

- 📦 Updated dependencies
- 📦 Moved project to the PhotoStructure github org

### v8.7.0

- ✨ `ExifDateTime` now has a `rawValue` field holding the raw value provided by
  `exiftool`.

### v8.6.1

- 🐞 Luxon 1.12.0 caused [issue
  #46](https://github.com/mceachen/exiftool-vendored.js/issues/46). Fixed
  ExifDateTime to use new API.

### v8.6.0

- 🌱 ExifTool upgraded to
  [v11.32](https://exiftool.org/history.html#v11.32).
- 🐞 Pulled in new [batch-cluster
  5.6.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md),
  which fixed an issue with graceful `end` promise resolutions.

### v8.5.0

- 🌱 ExifTool upgraded to
  [v11.31](https://exiftool.org/history.html#v11.31).
- 🐞 `RewriteAllTagsTask` doesn't fail on warnings anymore
- ✨ Pulled in new [batch-cluster
  5.4.0](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md),
  which fixed `maxProcs`.

### v8.4.0

- ✨ Pulled in new [batch-cluster
  5.3.1](https://github.com/photostructure/batch-cluster.js/blob/main/CHANGELOG.md),
  which adds support for child start and exit events, internal errors, and more
  robust result parsing.
- ✨ Rebuilt `Tags` from over 6,600 unique camera makes and models. Added new
  exemplars to ensure `Keywords`, `Title`, `Subject`, and other common
  user-added tags were included in `Tags`.
- ✨ Added tslint, and delinted the codebase. Sparkles because no lint === ✨.
- 📦 `WriteTags` now is a proper superset of values from Tags.
- 📦 Updated dependencies

### v8.3.0

- 📦 Updated dependencies
- 📦 `yarn update` now uses `extract-zip`.
- 🌱 ExifTool upgraded to
  [v11.29](https://exiftool.org/history.html#v11.29).

### v8.2.0

- ✨ Implemented `ExifTool.readRaw`. If you decide to use this method, please
  take care to read the method's documentation. Addresses both
  [#44](https://github.com/mceachen/exiftool-vendored.js/issues/44) and
  [#45](https://github.com/mceachen/exiftool-vendored.js/issues/45).

### v8.1.0

- ✨ Added support for EXIF dates that include both the UTC offset as well as the
  time zone abbreviation, like `2014:07:17 08:46:27-07:00 DST`. The TZA is
  actually an over-specification, and can be safely discarded.
- 🌱 ExifTool upgraded to
  [v11.27](https://exiftool.org/history.html#v11.27).
- 📦 Updated dependencies
- 📦 Mocha 6.0.0 broke `mocha.opts`, switched to `.mocharc.yaml`

### v8.0.0

Note that this release supports structures. The value associated to `struct`
tags will be different from prior versions (in that they will actually be a
structure!). Because of that, I bumped the major version number (but I suspect
most users won't be affected, unless you've been waiting for this feature!)

- 💔 support for
  [structs](https://github.com/mceachen/exiftool-vendored.js/pull/43). Thanks,
  [Joshua Harris](https://github.com/Circuit8)!
- 🌱 ExifTool upgraded to
  [v11.26](https://exiftool.org/history.html#v11.26).
- 📦 `update` now requires `https` for new ExifTool instance checksums.
- 📦 Updated dependencies

### v7.6.1

- 🐞 Removed `yyyy` padding references that would break under Japanese year
  eras. Also removed 0 and 1 year validity heuristics.

### v7.6.0

- 🌱 ExifTool upgraded to
  [v11.24](https://exiftool.org/history.html#v11.24).
- 🐞 Fix [Lat/Lon parsing
  bug](https://github.com/mceachen/exiftool-vendored.js/pull/42). Thanks, [David
  Randler](https://github.com/draity)!

### v7.5.0

- 🌱 ExifTool upgraded to
  [v11.21](https://exiftool.org/history.html#v11.21).

### v7.4.0

- 🐞 `WriteTask` now supports newlines. [Fixes
  #37](https://github.com/mceachen/exiftool-vendored.js/issues/37).

### v7.3.0

- 📦 Rebuilt tags using new numeric default for GPS and new smartphone test
  images. Note that some tags were incorrect, and have now changed types (like
  `GPSLatitude` and `GPSLongitude`). New ExifTool versions gave us a new
  `FlashPixTags` group of tags, as well.
- 📦 Rebuilt docs

### v7.2.1

- 📦 Update dependencies to deal with
  [event-stream](https://github.com/dominictarr/event-stream/issues/116) 💩🌩️

### v7.2.0

- 🌱 ExifTool upgraded to
  [v11.20](https://exiftool.org/history.html#v11.20).
- 🐞 `GPS*` was added to the default print conversion exceptions. GPS Latitude
  and Longitude parsing was DRY'ed up, and now ensures correct sign based on
  Ref. With prior heuristics, if the GPS values were re-encoded without updating
  ref, the sign would be incorrect.
- 🐞 Timezone offset from GPS will be ignored if the date is > 14 hours different
- 📦 added more timezone extraction tests

### v7.1.0

- 📦 Moved the date and time parsing into the `ExifDateTime`, `ExifDate`, and
  `ExifTime` classes.

### v7.0.1: "nbd it's just the tags"

- 📦 Added more test images to corpus, so there are more tags now.
- 📦 Found error in `Directory` tag example, rebuilt tags

### v7.0.0: the "time zones & types are hard" edition

- ✨ More robust time zone extraction: this required adding `luxon` and
  `tz-lookup` as dependencies. See <https://photostructure.github.io/exiftool-vendored.js/documents/docs_DATES.html> for
  more information.

- 💔 Tag types are now **unions** of seen types. Previous typings only included
  the most prevalent type, which, unfortunately, meant values might return
  unexpected types at runtime. In an extreme case, `DateTimeOriginal` is now
  correctly reported as being `ExifDateTime | ExifTime | number | string`, as we
  return the value from ExifTool if the value is not a valid datetime, date, or
  time.

- ✨ ExifTool's "print conversion" can be disabled for arbitrary tags, and the
  defaults include `Orientation` and `*Duration*` (note that globs are
  supported!).

  By default, ExifTool-Vendored versions prior to `7.0.0` used ExifTool's print
  conversion code for most numeric values, rather than the actual numeric value.
  While ExifTool's output is reasonable for humans, writing code that consumed
  those values turned out to be hacky and brittle.

- 🐞 Depending on OS, [errors might not be correctly
  reported](https://github.com/mceachen/exiftool-vendored.js/issues/36). This
  issue was from `batch-cluster`, whose version 5.0.0 fixed this problem, and
  was pulled into this release.

- 🌱 ExifTool upgraded to
  [v11.15](https://exiftool.org/history.html#v11.15).

### v6.3.0

- 🌱 ExifTool upgraded to
  [v11.13](https://exiftool.org/history.html#v11.13).
- ✨ Rebuilt `Tags` based on new phone and camera models

### v6.2.3

- 📦 Better tag ratings by rebuilding tags with ExifTool's default category
  sorting. This fixed a number of tags (like ExposureTime, ISO, and FNumber)
  that were erroneously marked as "rare" because they were also (rarely) found
  in APP categories.

### v6.2.2

- 🐞 Increased default task timeout to 20s to resolve
  [#34](https://github.com/mceachen/exiftool-vendored.js/issues/34)

### v6.2.1

- 📦 Pull in batch-cluster 4.3.0, which exposes `taskData` events.

### v6.2.0

- ✨/🐞 [Joshua Harris](https://github.com/Circuit8) added support for [writing
  arrays](https://github.com/mceachen/exiftool-vendored.js/pull/32)
- 🌱 ExifTool upgraded to
  [v11.10](https://exiftool.org/history.html#v11.10).

### v6.1.2

- 📦 By pulling in the latest batch-cluster, the default logger is NoLogger,
  which may be a nicer default for people. Added logging, event, and error
  information to the README.

### v6.1.1

- 🐞 Warnings work now, _and I even have a test to prove it_. 😳
- ✨ Warning-vs-fatal errors can be configured via the new
  `minorErrorsRegExp`
  constructor parameter, or if you need more flexibility, by providing a
  `rejectTaskOnStderr`
  implementation to the ExifTool constructor.

### v6.1.0

- ✨ Warnings are back! Non-fatal processing errors are added to the Tags.errors field.
- 📦 Pulled in new typedoc version and switched to "file" rendering, which seems
  to generate better docs. This unfortunately broke links to underlying jsdocs.

### v6.0.1

- 📦 Typedoc fails to render `Partial<>` composites, so `mktags` now renders
  each Tag as optional. The `Tag` interface should be exactly the same as from
  v6.0.0.

### v6.0.0

- 💔 `ExifTool`'s many constructor parameters turned out to be quite unwieldy. Version 6's constructor now takes an options hash. If you used the defaults, those haven't changed, and your code won't need to change.
- 💔 `ExifTool.enqueueTask` takes a Task thunk now, to enable cleaner task retry
  code. I don't expect many consumers will have used this API directly.
- 🐞 In prior versions, when maxTasksPerProcess was reached, on some OSes, the
  host process would exit.
- ✨ Rebuilt `Tags` based on new phone and camera models
- 📦 Files are not `stat`ed before passing them on to ExifTool, as it seems to
  be faster on all platforms without this check. If you were error-matching on
  `ENOENT`, you'll need to switch to looking for "File not found".
- 💔 BatchCluster was updated, which has a robust PID-exists implementation, but
  those signatures now return Promises rather than being synchronous, so the
  exported `running` function has changed to return a `Promise<number[]>`.
- 🌱 ExifTool upgraded to
  [v11.09](https://exiftool.org/history.html#v11.09).

### v5.5.0

- 🌱 ExifTool upgraded to
  [v11.08](https://exiftool.org/history.html#v11.08).

### v5.4.0

- ✨ Some photo sharing sites will set the `CreateDate` or `SubSecCreateDate` to
  invalid values like `0001:01:01 00:00:00.00`. These values are now returned as
  strings so consumers can more consistently discriminate invalid metadata.

### v5.3.0

- ✨ Prior versions of `ExifTool.read()` always added the `-fast` option. This
  read mode omits metadata found after the image payload. This makes reads much
  faster, but means that a few tags, like `OriginalImageHeight`, may not be
  extracted. See <https://sno.phy.queensu.ca/~phil/exiftool/#performance> for more
  details.

  [Cuneytt](https://github.com/Cuneytt) reported this and I realized I should
  make `-fast` a user preference. To maintain existing behavior, I've made the
  optional second argument of `ExifTool.read` default to `["-fast"]`. If you
  want to use "slow mode", just give an empty array to the second argument. If
  you want `-fast2` mode, provide `["-fast2"]` as the second argument.

### v5.2.0

- 🌱 ExifTool upgraded to
  [v11.06](https://exiftool.org/history.html#v11.06).
- 📦 Removed node 9 from the build graph, as it isn't supported anymore:
  <https://github.com/nodejs/Release#release-schedule>
- 📦 Pull in latest dependencies

### v5.1.0

- ✨ new `exiftool.rewriteAllTags()`, which may repair problematic image
  metadata.
- 🌱 ExifTool upgraded to
  [v11.02](https://exiftool.org/history.html#v11.02).
- 📦 taskRetries default is now 1, which should allow recovery of the rare
  RPC/fork error, but actual corrupt files and real errors can be rejected
  sooner.
- 📦 Pull in latest dependencies, include new batch-cluster.

### v5.0.0

- 💔/✨ Task rejections are always `Error`s now, and `ExifTool.on` observers will
  be provided Errors on failure cases. Previously, rejections and events had
  been a mixture of strings and Errors. I'm bumping the major version just to
  make sure people adjust their code accordingly, but I'm hoping this is a no-op
  for most people. Thanks for the suggestion, [Nils
  Knappmeier](https://github.com/nknapp)!

### v4.26.0

- 🌱 ExifTool upgraded to
  [v11.01](https://exiftool.org/history.html#v11.01).
  Note that ExifTool doesn't really follow semver, so this shouldn't be a
  breaking change, so we'll stay on v4.
- 📦 Pull in latest dependencies, including batch-cluster and TypeScript.
- 📦 Fix version spec because exiftool now has a left-zero-padded version that
  semver is not happy about.

### v4.25.0

- 🌱 ExifTool upgraded to
  [v10.98](https://exiftool.org/history.html#v10.98)

### v4.24.0

- 🌱 ExifTool upgraded to
  [v10.95](https://exiftool.org/history.html#v10.95)
- 📦 Fix `.pl` dependency to omit test files and documentation

### v4.23.0

- 🌱 ExifTool upgraded to
  [v10.94](https://exiftool.org/history.html#v10.94)
- 📦 Pull in latest dependencies, including more robust BatchCluster exiting
  (which may help with rare child zombies during long-lived parent processes on
  macOS)

### v4.22.1

- 📦 Pull in latest dependencies, including less-verbose BatchCluster

### v4.22.0

- ✨ Support for writing `AllDates` (closes
  [#21](https://github.com/mceachen/exiftool-vendored.js/issues/21).)
- 🌱 ExifTool upgraded to
  [v10.93](https://exiftool.org/history.html#v10.93)

### v4.21.0

- ✨ Before reading or writing tags, we stat the file first to ensure it exists.
  Expect `ENOENT` rejections from `ExifTool.read` and `ExifTool.write` now.
- 📦 Expose batch-cluster lifecycle events and logger
- 🌱 ExifTool upgraded to
  [v10.92](https://exiftool.org/history.html#v10.92)

### v4.20.0

- ✨ Support for [Electron](https://electronjs.org). Added `exiftoolPath` to the
  `ExifTool` constructor. See the
  [wiki](https://github.com/mceachen/exiftool-vendored.js/wiki#how-do-you-make-this-work-with-electron)
  for more information.
- 🌱 ExifTool upgraded to
  [v10.89](https://exiftool.org/history.html#v10.89)

### v4.19.0

- 🌱 ExifTool upgraded to
  [v10.86](https://exiftool.org/history.html#v10.86)

### v4.18.1

- 📦 Pick up batch-cluster 1.10.0 to possibly address [this
  issue](https://stackoverflow.com/questions/48961238/electron-setinterval-implementation-difference-between-chrome-and-node).

### v4.18.0

- 🌱 ExifTool upgraded to
  [v10.81](https://exiftool.org/history.html#v10.81)
- 📦 Update deps, including batch-cluster 1.9.0
- 📦 Dropped support for node 4 (EOLs in 1 month).

### v4.17.0

- 🌱 ExifTool upgraded to
  [v10.79](https://exiftool.org/history.html#v10.79)
- 📦 Update deps, including TypeScript 2.7.2
- 📦 [Removed 🐱](https://github.com/mceachen/exiftool-vendored.js/issues/16)

### v4.16.0

- 🌱 ExifTool upgraded to
  [v10.78](https://exiftool.org/history.html#v10.78)
- 📦 Update deps, including TypeScript 2.7.1

### v4.15.0

- 🌱 ExifTool upgraded to
  [v10.76](https://exiftool.org/history.html#v10.76)
- 📦 Update deps

### v4.14.1

- 📦 Update deps

### v4.14.0

- 🐞 Use `spawn` instead of `execFile`, as the latter has buggy `maxBuffer`
  exit behavior and could leak exiftool processes on windows
- 🐞 The `.exiftool` singleton now properly uses a `DefaultMaxProcs` const.

### v4.13.1

- 🌱 ExifTool upgraded to
  [v10.70](https://exiftool.org/history.html#v10.70)
- 📦 Replace `tslint` and `tsfmt` with `prettier`
- 📦 Add test coverage report

(due to buggy interactions between `yarn` and `np`, v4.13.0 was published in
an incomplete state and subsequently unpublished)

### v4.12.1

- 📦 Rollback the rollback, as it's a [known issue with
  par](https://u88.n24.queensu.ca/exiftool/forum/index.php/topic,8747.msg44932.html#msg44932).
  If this happens again I'll add a windows-specific validation of the par
  directory.

### v4.12.0

- 🐞 Rollback to ExifTool v10.65 to avoid [this windows
  issue](https://u88.n24.queensu.ca/exiftool/forum/index.php?topic=8747.msg44926)

### v4.11.0

- ✨ Support for [non-latin filenames and tag
  values](https://github.com/mceachen/exiftool-vendored.js/issues/14)
  Thanks, [Demiurga](https://github.com/apolkingg8)!

### v4.10.0

- 🌱 ExifTool upgraded to
  [v10.67](https://exiftool.org/history.html#v10.67)

### v4.9.2

- 📦 More conservative default for `maxProcs`: `Math.max(1, system cpus / 4)`.

### v4.9.0

- 📦 Expose `ExifTool.ended`

### v4.8.0

- ✨ Corrected the type interface to `ExifTool.write()` to be only string or
  numeric values with keys from `Tags` so intellisense can work it's magicks
- 📦 Updated the README with more examples
- 📦 Added timestamp write tests

### v4.7.1

- ✨ Metadata writing is now supported. Closes [#6](https://github.com/mceachen/exiftool-vendored.js/issues/6)

### v4.6.0

- 🌱 ExifTool upgraded to
  [v10.66](https://exiftool.org/history.html#v10.66)
- ✨ Pull in new `batch-cluster` with more aggressive child process management
  (uses `taskkill` on win32 platforms and `kill -9` on unix-ish platforms)
- ✨ ExifTool constructor defaults were relaxed to handle slow NAS
- ✨ Upgraded to Mocha 4.0. Added calls to `exiftool.end()` in test `after`
  blocks and the README so `--exit` isn't necessary.
- 📦 Upgraded all dependencies

### v4.5.0

- 🌱 ExifTool upgraded to
  [v10.64](https://exiftool.org/history.html#v10.64)

### v4.4.1

- 📦 reverted batch-cluster reference

### v4.4.0

- 🌱 ExifTool upgraded to
  [v10.61](https://exiftool.org/history.html#v10.61)
- 🐞 Re-added the "-stay_open\nFalse" ExifTool exit command, which may be more
  reliable than only using signal traps.
- 📦 `yarn upgrade --latest`

### v4.3.0

- 🌱 ExifTool upgraded to
  [v10.60](https://exiftool.org/history.html#v10.60)
- 📦 Upgraded all dependencies

### v4.2.0

- 🌱 ExifTool upgraded to
  [v10.58](https://exiftool.org/history.html#v10.58)

### v4.1.0

- 📦 Added `QuickTimeTags` from several example movies (previous versions of
  `Tags` didn't have movie tag exemplar values)
- 🌱 ExifTool upgraded to
  [v10.57](https://exiftool.org/history.html#v10.57)

### v4.0.0

- 💔 All `Tags` fields are now marked as possibly undefined, as there are no
  EXIF, IPTC, or other values that are guaranteed to be set. Sorry for the major
  break, but the prior signature that promised all values were always set was
  strictly wrong.
- ✨ Added support for all downstream
  [batch-cluster](https://github.com/photostructure/batch-cluster.js) options in the
  ExifTool constructor.
- 📦 Added `ExifTool.pids` (used by a couple new integration tests)
- 📦 Rebuilt `Tags` with additional sample images and looser tag filtering.

### v3.2.0

- 🌱 ExifTool upgraded to
  [v10.54](https://exiftool.org/history.html#v10.54)
- 📦 Pulled in batch-cluster v1.2.0 that supports more robust child process
  cleanup
- ✨ Yarn and `platform-dependent-modules` don't play nicely. [Anton
  Mokrushin](https://github.com/amokrushin) submitted several PRs to address
  this. Thanks!

### v3.1.1

- 🐞 Fixed `package.json` references to `types` and `main`

### v3.1.0

- 📦 Completed jsdocs for ExifTool constructor
- 📦 Pulled in batch-cluster v1.1.0 that adds both `on("beforeExit")` and
  `on("exit")` handlers

### v3.0.0

- ✨ Extracted [batch-cluster](https://github.com/photostructure/batch-cluster.js) to
  power child process management. Task timeout, retry, and failure handling has
  excellent test coverage now.
- 💔 Switched from [debug](https://www.npmjs.com/package/debug) to node's
  [debuglog](https://nodejs.org/api/util.html#util_util_debuglog_section) to
  reduce external dependencies
- 🌱 ExifTool upgraded to
  [v10.51](https://exiftool.org/history.html#v10.51)
- 📦 Using `.npmignore` instead of package.json's `files` directive to specify
  the contents of the module.

### v2.17.1

- 🐛 Rounded milliseconds were not set by `ExifDateTime.toDate()` when timezone
  was not available. Breaking tests were added.

### v2.16.1

- 📦 Exposed datetime parsing via static methods on `ExifDateTime`, `ExifDate`, and `ExifTime`.

### v2.16.0

- ✨ Some newer smartphones (like the Google Pixel) render timestamps with
  microsecond precision, which is now supported.

### v2.15.0

- ✨ Added example movies to the sample image corpus used to build the tag
  definitions.

### v2.14.0

- ✨ Added `taskTimeoutMillis`, which will cause the promise to be rejected if
  exiftool takes longer than this value to parse the file. Note that this
  timeout only starts "ticking" when the task is enqueued to an idle ExifTool
  process.
- ✨ Pump the `onIdle` method every `onIdleIntervalMillis` (defaults to every 10
  seconds) to ensure all requested tasks are serviced.
- ✨ If `ECONN` or `ECONNRESET` is raised from the child process (which seems to
  happen for roughly 1% of requests), the current task is re-enqueued and the
  current exiftool process is recycled.
- ✨ Rebuilt `Tags` definitions using more (6,412!) sample image files
  (via `npm run mktags ~/sample-images`), including many RAW image types
  (like `.ORF`, `.CR2`, and `.NEF`).

### v2.13.0

- ✨ Added `maxReuses` before exiftool processes are recycled
- 🌱 ExifTool upgraded to
  [v10.50](https://exiftool.org/history.html#v10.50)

### v2.12.0

- 🐛 Fixed [`gps.toDate is not a function`](https://github.com/mceachen/exiftool-vendored.js/issues/3)

### v2.11.0

- 🌱 ExifTool upgraded to v10.47
- ✨ Added call to `.kill()` on `.end()` in case the stdin command was missed by ExifTool

### v2.10.0

- ✨ Added support for Node 4. TypeScript builds under es5 mode.

### v2.9.0

- 🌱 ExifTool upgraded to v10.46

### v2.8.0

- 🌱 ExifTool upgraded to v10.44
- 📦 Upgraded to TypeScript 2.2
- 🐞 `update/io.ts` error message didn't handle null statuscodes properly
- 🐞 `update/mktags.ts` had a counting bug exposed by TS 2.2

### v2.7.0

- ✨ More robust error handling for child processes (previously there was no
  `.on("error")` added to the process itself, only on `stderr` of the child
  process).

### v2.6.0

- 🌱 ExifTool upgraded to v10.41
- ✨ `Orientation` is [rendered as a string by
  ExifTool](https://exiftool.org/exiftool_pod.html#n---printConv),
  which was surprising (to me, at least). By exposing optional args in
  `ExifTool.read`, the caller can choose how ExifTool renders tag values.

### v2.5.0

- 🐞 `LANG` and `LC_` environment variables were passed through to exiftool (and
  subsequently, perl). These are now explicitly unset when exec'ing ExifTool,
  both to ensure tag names aren't internationalized, and to prevent perl errors
  from bubbling up to the caller due to missing locales.

### v2.4.0

- ✨ `extractBinaryTag` exposed because there are a **lot** of binary tags (and
  they aren't all embedded images)
- 🐞 `JpgFromRaw` was missing in `Tag` (no raw images were in the example corpus!)

### v2.3.0

- ✨ `extractJpgFromRaw` implemented to pull out EXIF-embedded images from RAW formats

### v2.2.0

- 🌱 ExifTool upgraded to v10.40

### v2.1.1

- ✨ `extractThumbnail` and `extractPreview` implemented to pull out EXIF-embedded images
- 📦 Rebuilt package.json.files section

### v2.0.1

- 💔 Switched from home-grown `logger` to [debug](https://www.npmjs.com/package/debug)

### v1.5.3

- 📦 Switch back to `platform-dependent-modules`.
  [npm warnings](https://stackoverflow.com/questions/15176082/npm-package-json-os-specific-dependency)
  aren't awesome.
- 📦 Don't include tests or updater in the published package

### v1.5.0

- 🌱 ExifTool upgraded to v10.38
- 📦 Use `npm`'s os-specific optionalDependencies rather than `platform-dependent-modules`.

### v1.4.1

- 🐛 Several imports (like `process`) name-collided on the globals imported by Electron

### v1.4.0

- 🌱 ExifTool upgraded to v10.37

### v1.3.0

- 🌱 ExifTool upgraded to v10.36
- ✨ `Tag.Error` exposed for unsupported file types.

### v1.2.0

- 🐛 It was too easy to miss calling `ExifTool.end()`, which left child ExifTool
  processes running. The constructor to ExifTool now adds a shutdown hook to
  send all child processes a shutdown signal.

### v1.1.0

- ✨ Added `toString()` for all date/time types

### v1.0.0

- ✨ Added typings reference in the package.json
- 🌱 Upgraded vendored exiftool to 10.33

### v0.4.0

- 📦 Fixed packaging (maintain jsdocs in .d.ts and added typings reference)
- 📦 Using [np](https://www.npmjs.com/package/np) for packaging

### v0.3.0

- ✨ Multithreading support with the `maxProcs` ctor param
- ✨ Added tests for reading images with truncated or missing EXIF headers
- ✨ Added tests for timezone offset extraction and rendering
- ✨ Subsecond resolution from the Google Pixel has 8 significant digits(!!),
  added support for that.

### v0.2.0

- ✨ More rigorous TimeZone extraction from assets, and added the
  `ExifTimeZoneOffset` to handle the `TimeZone` composite tag
- ✨ Added support for millisecond timestamps

### v0.1.1

🌱✨ Initial Release. Packages ExifTool v10.31.
