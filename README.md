# exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](https://exiftool.org/). Built and supported by [PhotoStructure](https://photostructure.com).**

[![npm version](https://img.shields.io/npm/v/exiftool-vendored.svg)](https://www.npmjs.com/package/exiftool-vendored)
[![Node.js CI](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml/badge.svg)](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml)
[![GitHub issues](https://img.shields.io/github/issues/photostructure/exiftool-vendored.js.svg)](https://github.com/photostructure/exiftool-vendored.js/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/photostructure/exiftool-vendored.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/photostructure/exiftool-vendored.js?targetFile=package.json)

## Features

1.  **Best-of-class cross-platform performance and reliability**.

    This is the module that [PhotoStructure](https://photostructure.com) (and [500+](https://github.com/photostructure/exiftool-vendored.js/network/dependents) other projects) use for photo and video metadata reading and writing.

    Expect [an order of magnitude faster performance](#performance) than other Node.js ExifTool modules.

1.  Best-effort extraction of

    - **dates** with [correct timezone offset encoding](#dates)
    - **latitudes & longitudes** as floats (where negative values indicate west or south of the meridian)

1.  Support for

    - [reading tags](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#read)
    - extracting embedded binaries, like [thumbnail](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#extractThumbnail) and [preview](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#extractPreview) images
    - [writing tags](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#write)
    - [rescuing metadata](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#rewriteAllTags)

1.  **[Robust type definitions](#tags)** of the top 99.5% tags used by over 6,000
    different camera makes and models (see an [example](https://photostructure.github.io/exiftool-vendored.js/interfaces/EXIFTags.html#CreateDate))

1.  **Automated updates** to ExifTool ([as new versions come out
    frequently](https://exiftool.org/history.html))

1.  **Robust test coverage**, performed with on [macOS, Linux, and
    Windows](https://github.com/photostructure/exiftool-vendored.js/actions?query=workflow%3A%22Node.js+CI%22)

## Installation

     yarn add exiftool-vendored

or

     npm install --save exiftool-vendored

### Installation notes

- `exiftool-vendored` provides an installation of ExifTool relevant for your
  local platform through
  [optionalDependencies](https://docs.npmjs.com/files/package.json#optionaldependencies).

- You shouldn't include either [exiftool-vendored.exe](https://github.com/photostructure/exiftool-vendored.exe) or
  [exiftool-vendored.pl](https://github.com/photostructure/exiftool-vendored.pl) as direct dependencies to your project, unless you know
  what you're doing.

- If you're installing on a minimal Linux distribution, you may need to install `perl`. On Alpine, run `apk add perl`.

- Node.js's `-slim` docker images don't include a working `perl` build. Use the non-slim image instead. [See the issue report for details.](https://github.com/photostructure/exiftool-vendored.js/issues/168)

## Upgrading

See the
[CHANGELOG](https://github.com/photostructure/exiftool-vendored.js/blob/main/CHANGELOG.md)
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
[`exiftool`](https://photostructure.github.io/exiftool-vendored.js/modules.html#exiftool) singleton.
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
parameters](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifToolOptions.html)
wont' work for you, it's just a class that takes an options hash:

```js
const ExifTool = require("exiftool-vendored").ExifTool
const exiftool = new ExifTool({ taskTimeoutMillis: 5000 })
```

You should only use the exported default `exiftool` singleton, or only create one instance of `ExifTool` as a singleton.

Remember to `.end()` whichever singleton you use.

### General API

`ExifTool.read()` returns a Promise to a [Tags](https://photostructure.github.io/exiftool-vendored.js/interfaces/Tags.html) instance. Note
that errors may be returned either by rejecting the promise, or for less
severe problems, via the `errors` field.

All other public ExifTool methods return `Promise<void>`, and will reject
the promise if the operation is not successful.

### `Tags` types

ExifTool knows how to extract _several thousand_ different tag fields.

Unfortunately, TypeScript crashes with `error TS2590: Expression produces a union type that is too complex to represent` if the `Tags` interface was comprehensive.

Instead, we build a corpus of "commonly seen" tags from over 10,000 different
digital camera makes and models, many from the [ExifTool metadata
repository](https://exiftool.org/sample_images.html) and <raw.pixls.us>.

Here are some example fields:

```ts
  /** ★☆☆☆ ✔ Example: 200 */
  ISO?: number

  /** ★★★★ ✔ Example: 1920 */
  ImageHeight?: number

  /** ★★★★ ✔ Example: 1080 */
  ImageWidth?: number

  /** ★★★★ ✔ Example: "image/jpeg" */
  MIMEType?: string
```

The stars represent how common that field has a value in the example corpus. ★★★★ fields are found in > 50% of the examples.
☆☆☆☆ fields are found in < 1% of examples.

The checkmark denotes if the field is found in "popular" cameras (like recent
Nikon, Canon, Sony, and Apple devices).

### Caveats with `Tags`

**The fields in `Tags` are not comprehensive.**

Just because a field is missing from the Tags interface **does not mean the
field doesn't exist in the returned object**. This library doesn't exclude
unknown fields, in other words. It's up to you and your code to look for other
fields you expect and cast to a more relevant interface.

### Logging and events

To enable trace, debug, info, warning, or error logging from this library and
the underlying `batch-cluster` library, provide a [Logger](https://photostructure.github.io/batch-cluster.js/interfaces/Logger.html) instance to the `ExifTool` constructor options.

ExifTool instances emits [many lifecycle and error events](https://photostructure.github.io/batch-cluster.js/interfaces/BatchClusterEvents.html#beforeEnd) via `batch-cluster`.

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

Note that only a portion of tags is writable. Refer to [the
documentation](https://exiftool.org/TagNames/index.html)
and look under the "Writable" column.

If you apply malformed values or ask to write to tags that aren't
supported, the returned `Promise` will be rejected.

Only string and numeric primitives are supported as values to the object.

To write a comment to the given file so it shows up in the Windows Explorer
Properties panel:

```js
exiftool.write("path/to/file.jpg", { XPComment: "this is a test comment" })
```

To change the DateTimeOriginal, CreateDate and ModifyDate tags (using the
[AllDates](https://exiftool.org/TagNames/Shortcuts.html)
shortcut) to 4:56pm UTC on February 6, 2016:

```js
exiftool.write("path/to/file.jpg", { AllDates: "2016-02-06T16:56:00" })
```

To write to a specific metadata group's tag, just prefix the tag name with the group.
(TypeScript users: you'll need to cast to make this compile).

```js
exiftool.write("path/to/file.jpg", {
  "IPTC:CopyrightNotice": "© 2021 PhotoStructure, Inc.",
})
```

To delete a tag, use `null` as the value.

```js
exiftool.write("path/to/file.jpg", { UserComment: null })
```

The above example removes any value associated with the `UserComment` tag.

### Always Beware: Timezones

If you edit a timestamp tag, realize that the difference between the
changed timestamp tag and the GPS value is used by `exiftool-vendored` to
infer the timezone.

In other words, if you only edit the `CreateDate` and don't edit the `GPS`
timestamps, your timezone will either be incorrect or missing. See the
section about [Dates](#dates) below for more information.

### Rewriting tags

You may find that some of your images have corrupt metadata and that writing
new dates, or editing the rotation information, for example, fails. ExifTool can
try to repair these images by rewriting all the metadata into a new file, along
with the original image content. See the
[documentation](https://exiftool.org/faq.html#Q20) for more
details about this functionality.

`rewriteAllTags` returns a void Promise that will be rejected if there are any
errors.

```js
exiftool.rewriteAllTags("problematic.jpg", "rewritten.jpg")
```

### ExifTool configuration support (`.ExifTool_config`)

ExifTool has an [extensive user configuration system](http://owl.phy.queensu.ca/~phil/exiftool/config.html). There are several ways to use one:

1. Place your [user configuration
   file](https://exiftool.org/config.html) in your `HOME`
   directory
1. Set the `EXIFTOOL_HOME` environment variable to the fully-qualified path that
   contains your user configuration.
1. Specify the in the ExifTool constructor options:

```js
new ExifTool({ exiftoolEnv: { EXIFTOOL_HOME: resolve("path", "to", "config", "dir") }
```

## Resource hygiene

**Call `ExifTool.end()` when you're done**

You must explicitly call
[`.end()`](https://photostructure.github.io/exiftool-vendored.js/classes/ExifTool.html#end)
on any used instance of `ExifTool` to allow `node` to exit gracefully.

ExifTool child processes consume system resources, and [prevents `node` from
exiting due to the way Node.js streams
work](https://github.com/photostructure/exiftool-vendored.js/issues/106).

Note that you can't call cannot be in a `process.on("exit")` hook, as the `stdio` streams
attached to the child process cannot be `unref`'ed. (If there's a solution to
this, please post to the above issue!)

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
different parts of the world result in different times for the same file.

Prior to version 7, heuristic 1 and 3 were applied.

As of version 7.0.0, `exiftool-vendored` uses the following heuristics. The
highest-priority heuristic to return a value will be used as the timezone offset
for all datetime tags that don't already have a specified timezone.

### Heuristic 1: explicit metadata

If the [EXIF](https://exiftool.org/TagNames/EXIF.html)
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

Because date-times have this optionally-set timezone, and some tags only specify
the date, this library returns classes that encode the date, the time of day, or
both, **with an optional timezone and an optional tzoffset**: `ExifDateTime` and
`ExifTime`. It's up to you, then, to determine what's correct for your
situation.

Note also that some smartphones record timestamps with microsecond precision
(not just milliseconds!), and both `ExifDateTime` and `ExifTime` have floating point
milliseconds.

## Tags

Official [EXIF](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf) tag names
are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like
`AFPointSelected` and `ISO`. ("Fixing" the field names to be camelCase, would
result in ungainly `aFPointSelected` and `iSO` atrocities).

The [Tags](https://photostructure.github.io/exiftool-vendored.js/interfaces/Tags.html) interface is
auto-generated by the `mktags` script, which parses through over 6,000 unique
camera make and model images, in large part sourced from the ExifTool site.
`mktags` groups tags, extracts their type, popularity, and example values such
that your IDE can autocomplete.

Tags marked with "★★★★", like
[MIMEType](https://photostructure.github.io/exiftool-vendored.js/interfaces/FileTags.html#MIMEType),
should be found in most files. Of the several thousand metadata tags, realize
less than 50 are found generally. You'll need to do your research to
determine which tags are valid for your uses.

Note that if parsing fails (for, example, a date-time string), the raw string
will be returned. Consuming code should verify both existence and type as
reasonable for safety.

## Serialization

The `Tags` object returned by `.readTags()` can be serialized to JSON with `JSON.stringify`.

To reconstitute, use the `parseJSON()` method.

```ts
import { exiftool, parseJSON } from "exiftool-vendored"

const tags: Tags = await exiftool.readTags("/path/to/file.jpg")
const str: string = JSON.stringify(tags)

// parseJSON doesn't validate the input, so we don't assert that it's a Tags
// instance, but you can cast it (unsafely...)

const tags2: Tags = parseJSON(str) as Tags
```

## Performance

The default [exiftool]() singleton is intentionally throttled. If full system
utilization is acceptable:

1. set
   [`maxProcs`](https://photostructure.github.io/batch-cluster.js/classes/BatchClusterOptions.html#maxProcs)
   higher

2. consider setting
   [`minDelayBetweenSpawnMillis`](https://photostructure.github.io/batch-cluster.js/classes/BatchClusterOptions.html#minDelayBetweenSpawnMillis)
   to 0

3. On a performant linux box, a smaller value of `streamFlushMillis` may work as
   well: if you see [`noTaskData`
   events](https://photostructure.github.io/batch-cluster.js/interfaces/BatchClusterEvents.html#noTaskData),
   you need to bump the value up.

## Benchmarking

The `yarn mktags ../path/to/examples` target reads all tags found in a directory
hierarchy of sample images and videos, and parses the results.

`exiftool-vendored` v16.0.0 on a 2019 AMD Ryzen 3900X running Ubuntu 20.04 on an
SSD can process 20+ files per second per thread, or 500+ files per second when
utilizing all CPU threads.

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
[CHANGELOG](https://github.com/mceachen/exiftool-vendored.js/blob/main/CHANGELOG.md) on github.
