# exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/).**

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build status](https://travis-ci.org/mceachen/exiftool-vendored.js.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored.js)
[![Build status](https://ci.appveyor.com/api/projects/status/g5pfma7owvtsrrkm/branch/master?svg=true)](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master)

## Features

1. **Best-of-class cross-platform performance and reliability**.

   *Expect [an order of magnitude faster performance](#performance) than other packages.*

1. Proper extraction of
    - **dates** with [correct timezone offset encoding, when available](#dates))
    - **latitudes & longitudes** as floats (where negative values indicate west or south of the meridian)
    - **embedded images**, both `Thumbnail` and `Preview` (if they exist)

1. Robust **[type definitions](#tags)** of the top 99.5% tags used by over 6,000
   different camera makes and models

1. **Auditable ExifTool source code** (the vendored code is
   [checksum verified](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. **Automated updates** to ExifTool ([as new versions come out
   monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1. **Robust test suite**, performed with Node v4, v6, and v8 on [Linux,
   Mac](https://travis-ci.org/mceachen/exiftool-vendored.js), &
   [Windows](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master).

## Installation

```sh
npm install --save exiftool-vendored
```

Note that `exiftool-vendored` provides an installation of ExifTool relevant for your platform
through
[optionalDependencies](https://docs.npmjs.com/files/package.json#optionaldependencies).
You shouldn't include either the `exiftool-vendored.exe` or
`exiftool-vendored.pl` as direct dependencies to your project.

## Usage

```js
import { ExifTool } from "exiftool-vendored";

// Note that there are many configuration options to ExifTool.
// Based on your hardware performance and expected performance
// characteristics, the defaults may not be relevant for you.
// See src/ExifTool.ts#L70 for jsdocs.
const exiftool = new ExifTool();

// Read all metadata tags in `path/to/image.jpg`.
// Returns a `Promise<Tags>`.
exiftool
  .read("path/to/image.jpg")
  .then((tags /*: Tags */) => console.log(`Make: ${tags.Make}, Model: ${tags.Model}`))
  .catch(err => console.error("Something terrible happened: ", err))

// Extract the low-resolution thumbnail in `path/to/image.jpg`,
// write it to `path/to/thumbnail.jpg`, and return a Promise<void>
// that is fulfilled when the image is extracted:
exiftool.extractThumbnail("path/to/image.jpg", "path/to/thumbnail.jpg");

// Extract the "Preview" image (found in some images):
exiftool.extractPreview("path/to/image.jpg", "path/to/preview.jpg");

// Extract the "JpgFromRaw" image (found in some RAW images):
exiftool.extractJpgFromRaw("path/to/image.cr2", "path/to/fromRaw.jpg");

// Extract the binary value from "tagname" tag in `path/to/image.jpg`
// and write it to `dest.bin` (which cannot exist already
// and whose parent directory must already exist):
exiftool.extractBinaryTag("tagname", "path/to/file.exf", "path/to/dest.bin");

// Make sure you end ExifTool when you're done with it.
// Note that `.end` returns a Promise that you can `await`.
exiftool.end()
```

## Resource hygene

**Remember to call `.end()`.**

If you use [mocha](https://mochajs.org/) v4 or later, and you don't call
`exiftool.end()`, you will find that your tests hang after completion. [The relevant change is described
here](https://github.com/mochajs/mocha/issues/3044), and can be solved by
adding an `after` block that shuts down the instance of ExifTool that your
tests are using:

```js
after(() => exiftool.end()) // assuming your singleton is called `exiftool`
```

## Dates

Generally, EXIF tags encode dates and times with **no timezone offset.**
Presumably the time is captured in local time, but this means parsing the
same file in different parts of the world results in a different *absolute*
timestamp for the same file.

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

The [Tags.ts](src/Tags.ts) file is autogenerated by parsing through
images of more than 3,000 different camera makes and models taken from the
ExifTool site. It groups tags, their type, popularity, and example values such
that your IDE can autocomplete.

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

Using the `exiftool` npm package takes 7x longer:

```sh
Reading 3011 files...
Parsing took 85654ms (28.4ms / file) # ubuntu, core i3
```

### Batch mode

Starting the perl version of ExifTool is expensive, and is *especially*
expensive on the Windows version of ExifTool.

On Windows, for **every invocation**, exiftool *installs a distribution of Perl
**and** extracts the ~1000 files that make up ExifTool*, and then runs the
script. Windows virus scanners prevent reads on these files while they are
scanned, which makes this approach even more costly.

Using ExifTool's `-stay_open` batch mode, we can reuse a single instance of
ExifTool across many requests, dropping response latency dramatically and
reducing system load.

### Parallelism

The `exiftool` singleton is configured with a `maxProcs` set to the number of
CPUs on the current system; no more than `maxProcs` instances of `exiftool` will
be spawned.

Note that each child process consumes between 10 and 50 MB of RAM. If you have
limited system resources you may want to use a smaller `maxProcs` value.

## Logging

[debuglog](https://nodejs.org/api/util.html#util_util_debuglog_section) is used
with the `exiftool` prefix. To enable logging, set the environment flag
`NODE_DEBUG=exiftool`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Author

- [Matthew McEachen](https://github.com/mceachen)

## Contributors 🎉

- [Anton Mokrushin](https://github.com/amokrushin)
