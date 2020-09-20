# exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](https://exiftool.org/).**

[![npm version](https://img.shields.io/npm/v/exiftool-vendored.svg)](https://www.npmjs.com/package/exiftool-vendored)
[![Build status](https://travis-ci.org/photostructure/exiftool-vendored.js.svg?branch=master)](https://travis-ci.org/photostructure/exiftool-vendored.js)
[![Build status](https://ci.appveyor.com/api/projects/status/g5pfma7owvtsrrkm/branch/master?svg=true)](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master)
[![GitHub issues](https://img.shields.io/github/issues/photostructure/exiftool-vendored.js.svg)](https://github.com/photostructure/exiftool-vendored.js/issues)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/photostructure/exiftool-vendored.js.svg)](https://lgtm.com/projects/g/photostructure/exiftool-vendored.js/context:javascript)
[![Known Vulnerabilities](https://snyk.io/test/github/photostructure/exiftool-vendored.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/photostructure/exiftool-vendored.js?targetFile=package.json)

## Features

1.  **Best-of-class cross-platform performance and reliability**.

    _Expect [an order of magnitude faster performance](#performance) than other packages._

1.  Proper extraction of

    - **dates** with [correct timezone offset encoding, when available](#dates))
    - **latitudes & longitudes** as floats (where negative values indicate west or south of the meridian)

1.  Support for

    - [reading tags](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#read)
    - extracting embedded binaries, like [thumbnail](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#extractthumbnail) and [preview](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#extractpreview) images
    - [writing tags](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#write)
    - [rescuing metadata](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#rewritealltags)

1.  **[Robust type definitions](#tags)** of the top 99.5% tags used by over 6,000
    different camera makes and models (see an [example](interfaces/exiftags.html))

1.  **Auditable ExifTool source code** (the vendored code is
    [checksum verified](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1.  **Automated updates** to ExifTool ([as new versions come out
    monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1.  **Robust test coverage**, performed with [supported Node
    versions](https://nodejs.org/en/about/releases/) on [Linux,
    Mac](https://travis-ci.org/photostructure/exiftool-vendored.js), &
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

If you're installing on a minimal Linux distribution, like
[Alpine](https://alpinelinux.org/), you may need to install `perl` (à la "`apk add perl`").

## Upgrading

See the
[CHANGELOG](https://github.com/mceachen/exiftool-vendored.js/blob/master/CHANGELOG.md)
for breaking changes since you last updated.

### Major version bumps

I bump the major version if there's a **chance** existing code might be
affected.

I've been bit too many times by my code breaking when I pull in minor or patch
upgrades with other libraries. I think it's better to be pessimistic in code
change impact analysis: "over-promise and under-deliver" your breaking-code
changes.

When you upgrade to a new major version, please take a bit more care in
validating your own systems, but don't be surprised when everything still works.

## Usage

There are many configuration options to ExifTool, but all values have (more or
less sensible) defaults.

Those defaults have been used to create the
[`exiftool`](https://photostructure.github.io/exiftool-vendored.js/globals.html#exiftool) singleton.
Note that if you _don't_ use the default singleton, you don't need to `.end()`
it.

```js
// We're using the singleton here for convenience:
const exiftool = require("exiftool-vendored").exiftool

// And to verify everything is working:
exiftool
  .version()
  .then((version) => console.log(`We're running ExifTool v${version}`))
```

If the default [ExifTool constructor
parameters](https://photostructure.github.io/exiftool-vendored.js/classes/exiftool.html#constructor)
wont' work for you, it's just a class that takes an options hash:

```js
const ExifTool = require("exiftool-vendored").ExifTool
const exiftool = new ExifTool({ taskTimeoutMillis: 5000 })
```

You should only use the exported default `exiftool` singleton, or only create one instance of `ExifTool` as a singleton.

Remember to `.end()` whichever singleton you use.

### General API

`ExifTool.read()` returns a Promise to a [Tags](https://photostructure.github.io/exiftool-vendored.js/interfaces/tags.html) instance. Note
that errors may be returned either by rejecting the promise, or for less
severe problems, via the `errors` field.

All other public ExifTool methods return `Promise<void>`, and will reject
the promise if the operation is not successful.

### Errors and Warnings

ExifTool has a pretty exhaustive set of error checking, and many "errors" are
actually non-fatal warnings about invalid tag structures that seem to be
regularly found in otherwise-not-corrupt images.

If we rejected every `read` or `write` when any error happened, this would
prevent reading and/or writing to otherwise-ok files. To "demote" errors to be
warnings that don't reject the underlying task, you can provide either a
[`minorErrorsRegExp`](interfaces/exiftooloptions.html#minorerrorsregexp), or an
implementation of
[`rejectTaskOnStderr`](interfaces/exiftooloptions.html#rejecttaskonstderr).
Either of these parameters are provided to the `ExifTool` constructor.

### Logging and events

To enable trace, debug, info, warning, or error logging from this library and
the underlying `batch-cluster` library,
use[`setLogger`](globals.html#setlogger). Example
code can be found
[here](https://github.com/photostructure/batch-cluster.js/blob/master/src/_chai.spec.ts#L20).

ExifTool instances emits events for "startError", "taskError", "endError",
"beforeEnd", and "end" that you can register listeners for, using
[on](https://batch-cluster.js.org/classes/batchcluster.html#on).

### Reading tags

```js
exiftool
  .read("path/to/image.jpg")
  .then((tags /*: Tags */) =>
    console.log(
      `Make: ${tags.Make}, Model: ${tags.Model}, Errors: ${tags.errors}`
    )
  )
  .catch((err) => console.error("Something terrible happened: ", err))
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

### ExifTool configuration support (`.ExifTool_config`)

ExifTool has an [extensive user configuration system](http://owl.phy.queensu.ca/~phil/exiftool/config.html). There are several ways to use one:

1. Place your [user configuration
   file](http://owl.phy.queensu.ca/~phil/exiftool/config.html) in your `HOME`
   directory
1. Set the `EXIFTOOL_HOME` environment variable to the fully-qualified path that
   contains your user config.
1. Specify the in the ExifTool constructor options:

```js
new ExifTool({ exiftoolEnv: { EXIFTOOL_HOME: resolve("path", "to", "config", "dir") }
```

## Resource hygiene

**Always remember to call `.end()`.**

ExifTool child processes consume system resources. Ensure you don't leave zombie
processes around by calling `.end()`, which returns a `Promise<void>` if you
want to wait for the shutdown to be complete.

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

**The date metadata in all your images and videos are, most likely,
underspecified.**

Images and videos rarely specify a time zone in their dates. If all your files
were captured in your current time zone, defaulting to the local time zone is a
safe assumption, but if you have files that were captured in different parts of
the world, **this assumption will not be correct**. Parsing the same file in
different parts of the world results in a different times for the same file.

Prior to version 7, heuristic 1 and 3 was applied.

As of version 7.0.0, `exiftool-vendored` uses the following heuristics. The
highest-priority heuristic to return a value will be used as the timezone offset
for all datetime tags that don't already have a specified timezone.

### Heuristic 1: explicit metadata

If the [EXIF](https://sno.phy.queensu.ca/~phil/exiftool/TagNames/EXIF.html)
`TimeZoneOffset` tag is present it will be applied as per the spec to
`DateTimeOriginal`, and if there are two values, the `ModifyDate` tag as well.
`OffsetTime`, `OffsetTimeOriginal`, and `OffsetTimeDigitized` are also
respected, if present (but are very rarely set).

### Heuristic 2: GPS location

If GPS latitude and longitude is present and valid (the value of `0, 0` is
considered invalid), the `tz-lookup` library will be used to determine the time
zone name for that location.

### Heuristic 3: UTC timestamps

If `GPSDateTime` or `DateTimeUTC` is present, the delta with the dates found
within the file, as long as the delta is valid, is used as the timezone offset.
Deltas of > 14 hours are considered invalid.

### ExifDate and ExifDateTime

Because datetimes have this optionally-set timezone, and some tags only specify
the date, this library returns classes that encode the date, the time of day, or
both, **with an optional timezone and an optional tzoffset**: `ExifDateTime` and
`ExifTime`. It's up to you, then, to determine what's correct for your
situation.

Note also that some smartphones record timestamps with microsecond precision
(not just millis!), and both `ExifDateTime` and `ExifTime` have floating point
milliseconds.

## Tags

Official [EXIF](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf) tag names
are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like
`AFPointSelected` and `ISO`. ("Fixing" the field names to be camelCase, would
result in ungainly `aFPointSelected` and `iSO` atrocities).

The [Tags](https://photostructure.github.io/exiftool-vendored.js/interfaces/tags.html) interface is
auto-generated by the `mktags` script, which parses through over 6,000 unique
camera make and model images, in large part sourced from the ExifTool site.
`mktags` groups tags, extracts their type, popularity, and example values such
that your IDE can autocomplete.

For an example of a group of tags, see the [EXIFTags
interface](interfaces/exiftags.html).

Tags marked with "★★★★", like
[MIMEType](https://photostructure.github.io/exiftool-vendored.js/interfaces/filetags.html#mimetype),
should be found in most files. Of the several thousand metadata tags, realize
less than 50 are found generally. You'll need to do your own research to
determine which tags are valid for your uses.

Note that if parsing fails (for, example, a datetime string), the raw string
will be returned. Consuming code should verify both existence and type as
reasonable for safety.

## Performance

The `npm run mktags` target reads all tags found in a batch of sample images and
parses the results.

Using `exiftool-vendored`:

```sh
Read 2236 unique tags from 3011 files.
Parsing took 16s (5.4ms / file) # windows 10, core i7, maxProcs 4
Parsing took 27s (9.0ms / file) # ubuntu 18.04, core i3, maxProcs 1
Parsing took 13s (4.2ms / file) # ubuntu 18.04, core i3, maxProcs 4

# September 2020 update with > 2x more files and faster CPU:
Read 3100 unique tags from 8028 files.
Parsing took 16s (2.0ms / file) # ubuntu 20.04, AMD Ryzen 9 3900X, maxProcs 24
```

Using the `exiftool` npm package takes 7-10x longer, and doesn't work on Windows.

```sh
Reading 3011 files...
Parsing took 86s (28.4ms / file) # ubuntu, core i3
```

### Batch mode

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

- [Joshua Harris](https://github.com/Circuit8)
- [Anton Mokrushin](https://github.com/amokrushin)
- [Luca Ban](https://github.com/mesqueeb)
- [Demiurga](https://github.com/apolkingg8)
- [David Randler](https://github.com/draity)

## CHANGELOG

See the
[CHANGELOG](https://github.com/mceachen/exiftool-vendored.js/blob/master/CHANGELOG.md) on github.
