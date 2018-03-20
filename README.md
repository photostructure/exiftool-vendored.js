# exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/).**

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build status](https://travis-ci.org/mceachen/exiftool-vendored.js.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored.js)
[![Build status](https://ci.appveyor.com/api/projects/status/g5pfma7owvtsrrkm/branch/master?svg=true)](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/9bdc62a0da0dbb5879e8/maintainability.svg)](https://codeclimate.com/github/mceachen/exiftool-vendored.js)
<!-- [![Test Coverage](https://api.codeclimate.com/v1/badges/9bdc62a0da0dbb5879e8/test_coverage)](https://codeclimate.com/github/mceachen/exiftool-vendored.js) -->

## Features

1. **Best-of-class cross-platform performance and reliability**.

   *Expect [an order of magnitude faster performance](#performance) than other packages.*

1. Proper extraction of
    - **dates** with [correct timezone offset encoding, when available](#dates))
    - **latitudes & longitudes** as floats (where negative values indicate west or south of the meridian)
    - **embedded images**, like `Thumbnail` and `Preview` (if they exist)

1. Support for writing tags

1. **[Type definitions](#tags)** of the top 99.5% tags used by over 6,000
   different camera makes and models

1. **Auditable ExifTool source code** (the vendored code is
   [checksum verified](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. **Automated updates** to ExifTool ([as new versions come out
   monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1. **Robust test coverage**, performed with the latest Node v6, v8, and v9 on [Linux,
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

## Usage

There are many configuration options to ExifTool, but all values have defaults.

Please review the [ExifTool constructor parameters](src/ExifTool.ts#L70)
and override default values where appropriate.

```js
const { ExifTool } = require("exiftool-vendored");
const exiftool = new ExifTool();

// And to verify everything is working:
exiftool.version().then(version =>
  console.log(`We're running ExifTool v${version}`)
);
```

### General API

`ExifTool.read()` returns a Promise to a [Tags](src/Tags.ts) instance. Note
that errors may be returned either by rejecting the promise, or for less
severe problems, via the `errors` field.

All other public ExifTool methods return `Promise<void>`, and will reject
the promise if the operation is not successful.

### Reading tags

```js
exiftool
  .read("path/to/image.jpg")
  .then((tags /*: Tags */) => console.log(`Make: ${tags.Make}, Model: ${tags.Model}, Errors: ${tags.errors}`))
  .catch(err => console.error("Something terrible happened: ", err))
```

### Extracting embedded images

Extract the low-resolution thumbnail in `path/to/image.jpg`, write it to
`path/to/thumbnail.jpg`, and return a `Promise<void>` that is fulfilled
when the image is extracted:

```js
exiftool.extractThumbnail("path/to/image.jpg", "path/to/thumbnail.jpg");
```

Extract the `Preview` image (only found in some images):

```js
exiftool.extractPreview("path/to/image.jpg", "path/to/preview.jpg");
```

Extract the `JpgFromRaw` image (found in some RAW images):

```js
exiftool.extractJpgFromRaw("path/to/image.cr2", "path/to/fromRaw.jpg");
```

Extract the binary value from "tagname" tag in `path/to/image.jpg`
and write it to `dest.bin` (which cannot exist already
and whose parent directory must already exist):

```js
exiftool.extractBinaryTag("tagname", "path/to/file.exf", "path/to/dest.bin");
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
exiftool.write("path/to/file.jpg", { XPComment: "this is a test comment" });
```

Change the DateTimeOriginal, CreateDate and ModifyDate tags (using the
[AllDates](https://sno.phy.queensu.ca/~phil/exiftool/TagNames/Shortcuts.html)
shortcut) to 4:56pm UTC on February 6, 2016:

```js
exiftool.write("path/to/file.jpg", { AllDates: "2016-02-06T16:56:00" });
```

### Always Beware: Timezones

If you edit a timestamp tag, realize that the difference between the
changed timestamp tag and the GPS value is used by `exiftool-vendored` to
infer the timezone.

In other words, if you only edit the `CreateDate` and don't edit the `GPS`
timestamps, your timezone will either be incorrect or missing. See the
section about [Dates](#dates) below for more information.

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

Using the `exiftool` npm package takes 7x longer (and doesn't work on Windows):

```sh
Reading 3011 files...
Parsing took 85654ms (28.4ms / file) # ubuntu, core i3
```

### Batch mode

Starting the perl version of ExifTool is expensive, and is *especially*
expensive on the Windows version of ExifTool.

On Windows, for **every invocation**, `exiftool` *installs a distribution
of Perl **and** extracts the ~1000 files that make up ExifTool*, and
**then** runs the perl script. Windows virus scanners prevent reads on
these files while they are scanned, which makes this approach even more
costly.

Using ExifTool's `-stay_open` batch mode means we can reuse a single
instance of ExifTool across many requests, dropping response latency
dramatically as well as reducing system load.

### Parallelism

To avoid overwhelming your system, the `exiftool` singleton is configured
with a `maxProcs` set to a quarter the number of CPUs on the current system
(minimally 1); no more than `maxProcs` instances of `exiftool` will be
spawned. If the system is CPU constrained, however, you may want a smaller
value. If you have very fast disk IO, you may see a speed increase with
larger values of `maxProcs`, but note that each child process can consume
100 MB of RAM.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Author

- [Matthew McEachen](https://github.com/mceachen)

## Contributors 🎉

- [Anton Mokrushin](https://github.com/amokrushin)
- [Luca Ban](https://github.com/mesqueeb)
- [Demiurga](https://github.com/apolkingg8)
