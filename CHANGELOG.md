# Changelog/Versioning

## Versioning

Providing the flexibility to reversion the API or UPDATE version slots as
features or bugfixes arise and using ExifTool's version number is at odds with
eachother, so this library follows [Semver](https://semver.org/), and the
vendored versions of ExifTool match the version they vendor.

### The `MAJOR` or `API` version is incremented for

- 💔 Non-backward-compatible API changes
- 🌲 New releases of ExifTool that have externally visible changes

### The `MINOR` or `UPDATE` version is incremented for

- 🌱 New releases of ExifTool with no externally visible changes
- ✨ Backwards-compatible features

### The `PATCH` version is incremented for

- 🐞 Backwards-compatible bug fixes
- 📦 Minor packaging changes

## Version history

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
- 📦 Rebuild Tags.ts and docs
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

- ✨ Aded `ExifTool.deleteAllTags`.

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

- ✨ Automagick workaround for AWS Lambda. See [the new `ignoreShebang`
  option](https://photostructure.github.io/exiftool-vendored.js/interfaces/exiftooloptions.html#ignoreshebang),
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
  5.6.0](https://github.com/photostructure/batch-cluster.js/blob/master/CHANGELOG.md),
  which fixed an issue with graceful `end` promise resolutions.

### v8.5.0

- 🌱 ExifTool upgraded to
  [v11.31](https://exiftool.org/history.html#v11.31).
- 🐞 `RewriteAllTagsTask` doesn't fail on warnings anymore
- ✨ Pulled in new [batch-cluster
  5.4.0](https://github.com/photostructure/batch-cluster.js/blob/master/CHANGELOG.md),
  which fixed `maxProcs`.

### v8.4.0

- ✨ Pulled in new [batch-cluster
  5.3.1](https://github.com/photostructure/batch-cluster.js/blob/master/CHANGELOG.md),
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
  `tz-lookup` as dependencies. See <https://photostructure.github.io/exiftool-vendored.js/#dates> for
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
  [`minorErrorsRegExp`](https://photostructure.github.io/exiftool-vendored.js/interfaces/exiftooloptions.html#minorerrorsregexp)
  constructor parameter, or if you need more flexibility, by providing a
  [`rejectTaskOnStderr`](https://photostructure.github.io/exiftool-vendored.js/interfaces/exiftooloptions.html#rejecttaskonstderr)
  implementation to the ExifTool constructor.

### v6.1.0

- ✨ Warnings are back! Non-fatal processing errors are added to the
  [Tags.errors](https://photostructure.github.io/exiftool-vendored.js/interfaces/tags.html#errors)
  field.
- 📦 Pulled in new typedoc version and switched to "file" rendering, which seems
  to generate better docs. This unfortunately broke links to underlying jsdocs.

### v6.0.1

- 📦 Typedoc fails to render `Partial<>` composites, so `mktags` now renders
  each Tag as optional. The `Tag` interface should be exactly the same as from
  v6.0.0.

### v6.0.0

- 💔 `ExifTool`'s many constructor parameters turned out to be quite unweildy.
  Version 6's [constructor](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#constructor) now takes an [options
  hash](https://photostructure.github.io/exiftool-vendored.js/interfaces/exiftooloptions.html).
  If you used the defaults, those haven't changed, and your code won't need to
  change.
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
  RPC/fork error, but actual corrupt files and realy errors can be rejected
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
- 📦 Replace tslint and tsfmt with prettier
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
  (uses `taskkill` on win32 platforms and `kill -9` on unixish platforms)
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
