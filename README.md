# exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/).**

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build status](https://travis-ci.org/mceachen/exiftool-vendored.js.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored.js)
[![Build status](https://ci.appveyor.com/api/projects/status/g5pfma7owvtsrrkm/branch/master?svg=true)](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/9bdc62a0da0dbb5879e8/maintainability.svg)](https://codeclimate.com/github/mceachen/exiftool-vendored.js)

_If links are broken, please read this on [exiftool-vendored.js.org](https://exiftool-vendored.js.org)._

## Features

1.  **Best-of-class cross-platform performance and reliability**.

    _Expect [an order of magnitude faster performance](#performance) than other packages._

1.  Proper extraction of

    - **dates** with [correct timezone offset encoding, when available](#dates))
    - **latitudes & longitudes** as floats (where negative values indicate west or south of the meridian)

1.  Support for

    - extracting embedded binaries, like [thumbnail](classes/_exiftool_.exiftool#extractthumbnail) and [preview](classes/_exiftool_.exiftool#extractpreview) images
    - [writing tags](classes/_exiftool_.exiftool#write)
    - [rescuing metadata](classes/_exiftool_.exiftool#rewritealltags)

1.  **[Robust type definitions](#tags)** of the top 99.5% tags used by over 6,000
    different camera makes and models (see an [example](interfaces/_tags_.exiftags))

1.  **Auditable ExifTool source code** (the vendored code is
    [checksum verified](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1.  **Automated updates** to ExifTool ([as new versions come out
    monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1.  **Robust test coverage**, performed with the latest Node v6, v8, and v10 on [Linux,
    Mac](https://travis-ci.org/mceachen/exiftool-vendored.js), &
    [Windows](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master).

## Installation

     yarn add exiftool-vendored

or

     npm install --save exiftool-vendored

Note that `exiftool-vendored` provides an installation of ExifTool relevant
for your local platform through
[optionalDependencies](https://docs.npmjs.com/files/package.json#optionaldependencies).

You shouldn't include either the `exiftool-vendored.exe` or
`exiftool-vendored.pl` as direct dependencies to your project.

## Upgrading

See the [Version History](#version-history) for breaking changes since you last updated.

## Usage

There are many configuration options to ExifTool, but all values have (more or
less sensible) defaults.

Those defaults have been used to create an exported
[`exiftool`](modules/_exiftool_#exiftool-1) singleton. Feel free to review the [ExifTool
constructor parameters](classes/_exiftool_.exiftool#constructor) and override default
values where appropriate if the defaults wont' work for you, but you should use
your singleton to minimize system load. Note that if you _don't_ use the default
singleton, note that you don't need to `.end()` it.

```js
// We're using the singleton here for convenience:
const exiftool = require("exiftool-vendored").exiftool

// And to verify everything is working:
exiftool
  .version()
  .then(version => console.log(`We're running ExifTool v${version}`))
```

### General API

`ExifTool.read()` returns a Promise to a [Tags](modules/_tags_) instance. Note
that errors may be returned either by rejecting the promise, or for less
severe problems, via the `errors` field.

All other public ExifTool methods return `Promise<void>`, and will reject
the promise if the operation is not successful.

### Reading tags

```js
exiftool
  .read("path/to/image.jpg")
  .then((tags /*: Tags */) =>
    console.log(
      `Make: ${tags.Make}, Model: ${tags.Model}, Errors: ${tags.errors}`
    )
  )
  .catch(err => console.error("Something terrible happened: ", err))
```

### Extracting embedded images

Extract the low-resolution thumbnail in `path/to/image.jpg`, write it to
`path/to/thumbnail.jpg`, and return a `Promise<void>` that is fulfilled
when the image is extracted:

```js
exiftool.extractThumbnail("path/to/image.jpg", "path/to/thumbnail.jpg")
```

Extract the `Preview` image (only found in some images):

```js
exiftool.extractPreview("path/to/image.jpg", "path/to/preview.jpg")
```

Extract the `JpgFromRaw` image (found in some RAW images):

```js
exiftool.extractJpgFromRaw("path/to/image.cr2", "path/to/fromRaw.jpg")
```

Extract the binary value from "tagname" tag in `path/to/image.jpg`
and write it to `dest.bin` (which cannot exist already
and whose parent directory must already exist):

```js
exiftool.extractBinaryTag("tagname", "path/to/file.exf", "path/to/dest.bin")
```

### Writing tags

Note that only a portion of tags are writable. Refer to [the
documentation](https://sno.phy.queensu.ca/~phil/exiftool/TagNames/index.html)
and look under the "Writable" column.

If you apply malformed values or ask to write to tags that aren't
supported, the returned `Promise` will be rejected.

Only string and numeric primitive are supported as values to the object

Write a comment to the given file so it shows up in the Windows Explorer
Properties panel:

```js
exiftool.write("path/to/file.jpg", { XPComment: "this is a test comment" })
```

Change the DateTimeOriginal, CreateDate and ModifyDate tags (using the
[AllDates](https://sno.phy.queensu.ca/~phil/exiftool/TagNames/Shortcuts.html)
shortcut) to 4:56pm UTC on February 6, 2016:

```js
exiftool.write("path/to/file.jpg", { AllDates: "2016-02-06T16:56:00" })
```

### Always Beware: Timezones

If you edit a timestamp tag, realize that the difference between the
changed timestamp tag and the GPS value is used by `exiftool-vendored` to
infer the timezone.

In other words, if you only edit the `CreateDate` and don't edit the `GPS`
timestamps, your timezone will either be incorrect or missing. See the
section about [Dates](#dates) below for more information.

### Rewriting tags

You may find that some of your images have corrupt metadata, and that writing
new dates, or editing the rotation information, for example, fails. ExifTool can
try to repair these images by rewriting all the metadata into a new file, along
with the original image content. See the
[documentation](http://owl.phy.queensu.ca/~phil/exiftool/faq.html#Q20) for more
details about this functionality.

`rewriteAllTags` returns a void Promise that will be rejected if there are any
errors.

```js
exiftool.rewriteAllTags("problematic.jpg", "rewritten.jpg")
```

## Resource hygene

**Remember to call `.end()`.**

ExifTool processes consume system resources. If you're done with it, turn
it off with `.end()`, which returns a `Promise<void>` if you want to wait
for the shutdown to be complete.

### Mocha v4.0.0

If you use [mocha](https://mochajs.org/) v4 or later, and you don't call
`exiftool.end()`, you will find that your test suite hangs. [The relevant
change is described here](https://github.com/mochajs/mocha/issues/3044),
and can be solved by adding an `after` block that shuts down the instance
of ExifTool that your tests are using:

```js
after(() => exiftool.end()) // assuming your singleton is called `exiftool`
```

## Dates

Generally, EXIF tags encode dates and times with **no timezone offset.**
Presumably the time is captured in local time, but this means parsing the same
file in different parts of the world results in a different _absolute_ timestamp
for the same file.

Rather than returning a
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
which always includes a timezone, this library returns classes that encode the
date, the time of day, or both, with an optional tzoffset. It's up to you, then,
to do what's right.

In many cases, though, **a tzoffset can be determined**, either by the composite
`TimeZone` tag, or by looking at the difference between the local
`DateTimeOriginal` and `GPSDateTime` tags. `GPSDateTime` is present in most
smartphone images.

If a tzoffset can be determined, it is encoded in all related `ExifDateTime`
tags for those files.

Note also that some smartphones record timestamps with microsecond precision (not just millis!),
and both `ExifDateTime` and `ExifTime` have floating point milliseconds.

## Tags

Official [EXIF](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf) tag names
are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like
`AFPointSelected` and `ISO`. ("Fixing" the field names to be camelCase, would
result in ungainly `aFPointSelected` and `iSO` atrocities).

The [Tags.ts](modules/_tags_) file is autogenerated by the `mktags` script,
which parses through over 6,000 unique camera make and model images, in large
part sourced from the ExifTool site. `mktags` groups tags, extracts their type,
popularity, and example values such that your IDE can autocomplete.

For an example of a group of tags, see the [EXIFTags
interface](interfaces/_tags_.exiftags).

Note that if parsing fails (for, example, a datetime string), the raw string
will be returned. Consuming code should verify both existence and type as
reasonable for safety.

## Performance

The `npm run mktags` target reads all tags found in a batch of sample images and
parses the results.

Using `exiftool-vendored`:

```sh
Read 2236 unique tags from 3011 files.
Parsing took 16191ms (5.4ms / file) # win32, core i7, maxProcs 4
Parsing took 27141ms (9.0ms / file) # ubuntu, core i3, maxProcs 1
Parsing took 12545ms (4.2ms / file) # ubuntu, core i3, maxProcs 4
```

Using the `exiftool` npm package takes 7x longer (and doesn't work on Windows):

```sh
Reading 3011 files...
Parsing took 85654ms (28.4ms / file) # ubuntu, core i3
```

### Batch mode

Starting the perl version of ExifTool is expensive, and is _especially_
expensive on the Windows version of ExifTool.

On Windows, for **every invocation**, `exiftool` _installs a distribution of
Perl **and** extracts the ~1000 files that make up ExifTool_, and **then** runs
the perl script. Windows virus scanners prevent reads on these files while they
are scanned, which makes this approach even more costly.

Using ExifTool's `-stay_open` batch mode means we can reuse a single
instance of ExifTool across many requests, dropping response latency
dramatically as well as reducing system load.

### Parallelism

To avoid overwhelming your system, the `exiftool` singleton is configured with a
`maxProcs` set to a quarter the number of CPUs on the current system (minimally
1); no more than `maxProcs` instances of `exiftool` will be spawned. If the
system is CPU constrained, however, you may want a smaller value. If you have
very fast disk IO, you may see a speed increase with larger values of
`maxProcs`, but note that each child process can consume 100 MB of RAM.

## Author

- [Matthew McEachen](https://github.com/mceachen)

## Contributors 🎉

- [Anton Mokrushin](https://github.com/amokrushin)
- [Luca Ban](https://github.com/mesqueeb)
- [Demiurga](https://github.com/apolkingg8)

## Versioning

Providing the flexibility to reversion the API or UPDATE version slots as
features or bugfixes arise and using ExifTool's version number is at odds with
eachother, so this library follows [Semver](http://semver.org/), and the
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

### v6.0.0

- 💔 `ExifTool`'s many constructor parameters turned out to be quite unweildy.
  Version 6 now takes an [options hash](interfaces/_exiftool_.exiftooloptions).
  If you used the defaults, those haven't changed, and your code won't need to
  change.
- 💔 `ExifTool.enqueueTask` takes a Task thunk now, to enable cleaner task retry
  code. I don't expect many consumers will have used this API directly.
- 🐞 In prior versions, when maxTasksPerProcess was reached, on some OSes, the
  host process would exit.
- ✨ Rebuilt `Tags` based on new phone and camera models
- 📦 Files are not `stat`ed before passing them on to ExifTool, as it seems to
  be faster on all platforms without this check. If you were error-matching on
  ENOENT, you'll need to switch to looking for "File not found".
- 💔 BatchCluster was updated, which has a robust PID-exists implementation, but
  those signatures now return Promises rather than being synchronous, so the
  exported `running` function has changed to return a `Promise<number[]>`.
- 🌱 ExifTool upgraded to
  [v11.09](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v11.09).

### v5.5.0

- 🌱 ExifTool upgraded to
  [v11.08](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v11.08).

### v5.4.0

- ✨ Some photo sharing sites will set the `CreateDate` or `SubSecCreateDate` to
  invalid values like `0001:01:01 00:00:00.00`. These values are now returned as
  strings so consumers can more consistently discriminate invalid metadata.

### v5.3.0

- ✨ Prior versions of `ExifTool.read()` always added the `-fast` option. This
  read mode omits metadata found after the image payload. This makes reads much
  faster, but means that a few tags, like `OriginalImageHeight`, may not be
  extracted. See https://sno.phy.queensu.ca/~phil/exiftool/#performance for more
  details.

  [Cuneytt](https://github.com/Cuneytt) reported this and I realized I should
  make `-fast` a user preference. To maintain existing behavior, I've made the
  optional second argument of `ExifTool.read` default to `["-fast"]`. If you
  want to use "slow mode", just give an empty array to the second argument. If
  you want `-fast2` mode, provide `["-fast2"]` as the second argument.

### v5.2.0

- 🌱 ExifTool upgraded to
  [v11.06](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v11.06).
- 📦 Removed node 9 from the build graph, as it isn't supported anymore:
  https://github.com/nodejs/Release#release-schedule
- 📦 Pull in latest dependencies

### v5.1.0

- ✨ new `exiftool.rewriteAllTags()`, which may repair problematic image
  metadata.
- 🌱 ExifTool upgraded to
  [v11.02](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v11.02).
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
  [v11.01](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v11.01).
  Note that ExifTool doesn't really follow semver, so this shouldn't be a
  breaking change, so we'll stay on v4.
- 📦 Pull in latest dependencies, including batch-cluster and TypeScript.
- 📦 Fix version spec because exiftool now has a left-zero-padded version that
  semver is not happy about.

### v4.25.0

- 🌱 ExifTool upgraded to
  [v10.98](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.98)

### v4.24.0

- 🌱 ExifTool upgraded to
  [v10.95](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.95)
- 📦 Fix `.pl` dependency to omit test files and documentation

### v4.23.0

- 🌱 ExifTool upgraded to
  [v10.94](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.94)
- 📦 Pull in latest dependencies, including more robust BatchCluster exiting
  (which may help with rare child zombies during long-lived parent processes on
  macOS)

### v4.22.1

- 📦 Pull in latest dependencies, including less-verbose BatchCluster

### v4.22.0

- ✨ Support for writing `AllDates` (closes
  [#21](https://github.com/mceachen/exiftool-vendored.js/issues/21).)
- 🌱 ExifTool upgraded to
  [v10.93](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.93)

### v4.21.0

- ✨ Before reading or writing tags, we stat the file first to ensure it exists.
  Expect `ENOENT` rejections from `ExifTool.read` and `ExifTool.write` now.
- 📦 Expose batch-cluster lifecycle events and logger
- 🌱 ExifTool upgraded to
  [v10.92](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.92)

### v4.20.0

- ✨ Support for [Electron](https://electronjs.org). Added `exiftoolPath` to the
  `ExifTool` constructor. See the
  [wiki](https://github.com/mceachen/exiftool-vendored.js/wiki#how-do-you-make-this-work-with-electron)
  for more information.
- 🌱 ExifTool upgraded to
  [v10.89](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.89)

### v4.19.0

- 🌱 ExifTool upgraded to
  [v10.86](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.86)

### v4.18.1

- 📦 Pick up batch-cluster 1.10.0 to possibly address [this
  issue](https://stackoverflow.com/questions/48961238/electron-setinterval-implementation-difference-between-chrome-and-node).

### v4.18.0

- 🌱 ExifTool upgraded to
  [v10.81](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.81)
- 📦 Update deps, including batch-cluster 1.9.0
- 📦 Dropped support for node 4 (EOLs in 1 month).

### v4.17.0

- 🌱 ExifTool upgraded to
  [v10.79](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.79)
- 📦 Update deps, including TypeScript 2.7.2
- 📦 [Removed 🐱](https://github.com/mceachen/exiftool-vendored.js/issues/16)

### v4.16.0

- 🌱 ExifTool upgraded to
  [v10.78](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.78)
- 📦 Update deps, including TypeScript 2.7.1

### v4.15.0

- 🌱 ExifTool upgraded to
  [v10.76](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.76)
- 📦 Update deps

### v4.14.1

- 📦 Update deps

### v4.14.0

- 🐞 Use `spawn` instead of `execFile`, as the latter has buggy `maxBuffer`
  exit behavior and could leak exiftool processes on windows
- 🐞 The `.exiftool` singleton now properly uses a `DefaultMaxProcs` const.

### v4.13.1

- 🌱 ExifTool upgraded to
  [v10.70](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.70)
- 📦 Replace tslint and tsfmt with prettier
- 📦 Add test coverage report

(due to buggy interactions between `yarn` and `np`, v4.13.0 was published in
an incomplete state and subsequently unpublished)

### v4.12.1

- 📦 Rollback the rollback, as it's a [known issue with
  par](http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,8747.msg44932.html#msg44932).
  If this happens again I'll add a windows-specific validation of the par
  directory.

### v4.12.0

- 🐞 Rollback to ExifTool v10.65 to avoid [this windows
  issue](http://u88.n24.queensu.ca/exiftool/forum/index.php?topic=8747.msg44926)

### v4.11.0

- ✨ Support for [non-latin filenames and tag
  values](https://github.com/mceachen/exiftool-vendored.js/issues/14)
  Thanks, [Demiurga](https://github.com/apolkingg8)!

### v4.10.0

- 🌱 ExifTool upgraded to
  [v10.67](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.67)

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
  [v10.66](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.66)
- ✨ Pull in new `batch-cluster` with more aggressive child process management
  (uses `taskkill` on win32 platforms and `kill -9` on unixish platforms)
- ✨ ExifTool constructor defaults were relaxed to handle slow NAS
- ✨ Upgraded to Mocha 4.0. Added calls to `exiftool.end()` in test `after`
  blocks and the README so `--exit` isn't necessary.
- 📦 `salita --update`

### v4.5.0

- 🌱 ExifTool upgraded to
  [v10.64](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.64)

### v4.4.1

- 📦 reverted batch-cluster reference

### v4.4.0

- 🌱 ExifTool upgraded to
  [v10.61](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.61)
- 🐞 Re-added the "-stay_open\nFalse" ExifTool exit command, which may be more
  reliable than only using signal traps.
- 📦 `yarn upgrade --latest`

### v4.3.0

- 🌱 ExifTool upgraded to
  [v10.60](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.60)
- 📦 Upgraded all dependencies

### v4.2.0

- 🌱 ExifTool upgraded to
  [v10.58](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.58)

### v4.1.0

- 📦 Added `QuickTimeTags` from several example movies (previous versions of
  `Tags` didn't have movie tag exemplar values)
- 🌱 ExifTool upgraded to
  [v10.57](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.57)

### v4.0.0

- 💔 All `Tags` fields are now marked as possibly undefined, as there are no
  EXIF, IPTC, or other values that are guaranteed to be set. Sorry for the major
  break, but the prior signature that promised all values were always set was
  strictly wrong.
- ✨ Added support for all downstream
  [batch-cluster](https://github.com/mceachen/batch-cluster.js) options in the
  ExifTool constructor.
- 📦 Added `ExifTool.pids` (used by a couple new integration tests)
- 📦 Rebuilt `Tags` with additional sample images and looser tag filtering.

### v3.2.0

- 🌱 ExifTool upgraded to
  [v10.54](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.54)
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

- ✨ Extracted [batch-cluster](https://github.com/mceachen/batch-cluster.js) to
  power child process management. Task timeout, retry, and failure handling has
  excellent test coverage now.
- 💔 Switched from [debug](https://www.npmjs.com/package/debug) to node's
  [debuglog](https://nodejs.org/api/util.html#util_util_debuglog_section) to
  reduce external dependencies
- 🌱 ExifTool upgraded to
  [v10.51](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.51)
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
  [v10.50](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html#v10.50)

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
  ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/exiftool_pod.html#n---printConv),
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
  [npm warnings](http://stackoverflow.com/questions/15176082/npm-package-json-os-specific-dependency)
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

<script src="//twemoji.maxcdn.com/2/twemoji.min.js?11.0"></script>
<script>twemoji.parse(document.body, { size: "svg", ext: ".svg" })</script>
<style> .emoji { height: 18px; } </style>
