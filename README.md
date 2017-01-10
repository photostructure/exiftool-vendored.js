# exiftool-vendored

**Blazing-fast, cross-platform [node](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/).**

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build Status](https://travis-ci.org/mceachen/exiftool-vendored.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored)
[![Build status](https://ci.appveyor.com/api/projects/status/g5pfma7owvtsrrkm/branch/master?svg=true)](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master)

## Features

1. **High performance** via [`-stay_open`](#stay_open) and [multithreading](#parallelism). [7-300x faster](#performance) than competing packages

1. Support for [Mac, Linux](https://travis-ci.org/mceachen/exiftool-vendored), and [Windows](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master).

1. Proper extraction of 
    - **dates** with [correct timezone offset encoding, when available](#dates))
    - **latitudes & longitudes** as floats (where negative values indicate W or S of the meridian)

1. Robust **[type definitions](#tags)** of the top 99.5% of tags used by over 3,000 different camera makes and models

1. **Auditable ExifTool source code** (the "vendored" code is [verifiable](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. **Automated updates** to ExifTool ([as new versions come out monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1. **Robust test suite**, performed with node v6+ on [Linux, Mac,](https://travis-ci.org/mceachen/exiftool-vendored) & [Windows](https://ci.appveyor.com/project/mceachen/exiftool-vendored/branch/master).

## Installation

```sh
npm install --save exiftool-vendored
```

The vendored version of ExifTool relevant for your platform will be installed via [platform-dependent-modules](https://www.npmjs.com/package/platform-dependent-modules). You shouldn't include either the `exiftool-vendored.exe` or `exiftool-vendored.pl` as direct dependencies to your project.

## Usage

```js
import { exiftool, Tags } from "exiftool-vendored"
exiftool.read("path/to/file.jpg").then((tags /*: Tags */) => {
  console.log(`Make: ${metadata.Make}, Model: ${metadata.Model}`)
})
```

## Performance

With the `npm run mktags` target, > 3000 sample images, and `maxProcs` set to 4, reading tags on my laptop takes ~6 ms per image:

```sh
Read 2236 unique tags from 3011 files.
Parsing took 16191ms (5.4ms / file) # win32, core i7, maxProcs 4
Parsing took 27141ms (9.0ms / file) # ubuntu, core i3, maxProcs 1
Parsing took 12545ms (4.2ms / file) # ubuntu, core i3, maxProcs 4
```

For reference, using the `exiftool` npm package (which doesn't work on Windows) took 85 seconds (almost 7x the time):

```sh
Reading 3011 files...
Parsing took 85654ms (28.4ms / file) # ubuntu, core i3
```

This package is so much faster due to `ExifTool` child process reuse, as well as delegation to > 1 child processes.

### stay_open

Starting the perl version of ExifTool is expensive, and is *especially* expensive on the Windows version of ExifTool. 

On Windows, a distribution of Perl and the ~1000 files that make up ExifTool are extracted into a temporary directory for **every invocation**. Windows virus scanners that wedge reads on these files until they've been determined to be safe make this approach even more costly.

Using `-stay_open` we can reuse a single instance of ExifTool across all requests, which drops response latency dramatically. 

### Parallelism

The `exiftool` singleton is configured with a `maxProcs` of 1; 
no more than 1 child process of ExifTool will be spawned, even if there are many read requests outstanding.

If you want higher throughput, instantiate your own singleton reference of `ExifTool` with a higher maxProcs. Note that exceeding your cpu count won't increase throughput, and that each child process consumes between 10 and 50 MB of RAM.

You may want to call `.end()` on your singleton reference when your script terminates. This gracefully shuts down all child processes.

## Dates

Generally, EXIF tags encode dates and times with **no timezone offset.** Presumably the time is captured in local time, but this means parsing the same file in different parts of the world results in a different *absolute* timestamp for the same file.

Rather than returning a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) which always includes a timezone, this library returns classes that encode the date, the time of day, or both, with an optional tzoffset. It's up to you, then, to do what's right.

In many cases, though, **a tzoffset can be determined**, either by the composite `TimeZone` tag, or by looking at the difference between the local `DateTimeOriginal` and `GPSDateTime` tags. `GPSDateTime` is present in most smartphone images. 

If a tzoffset can be determined, it is encoded in all related `ExifDateTime` tags for those files.

## Tags

Official [EXIF](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf) tag names are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like `AFPointSelected` and `ISO`. ("Fixing" the field names to be camelCase, would result in ungainly `aFPointSelected` and `iSO` atrocities).

The `tags.ts` file is autogenerated by parsing through images of more than 3,000 different camera makes and models taken from the ExifTool site. It groups tags, their type, frequency, and example values such that your IDE can autocomplete.

Note that tag existence and types is **not guaranteed**. If parsing fails (for, example, and datetime string), the raw string will be returned. Consuming code should verify both existence and type as reasonable for safety. 

## Versioning

I wanted to include the ExifTool's version number explicitly in the version number, but npm requires strict compliance with SemVer. Given that ExifTool sometimes includes patch releases, there aren't always enough spots to encode an API version *and* the ExifTool version.

Given those constraints, version numbers follow standard SemVer, with the following scheme:

```sh
  API.UPDATE.PATCH
```

### `API` is incremented for

* 💔 Non-backward-compatible API changes
* 🌲 New releases of ExifTool that have externally visible changes

### `UPDATE` is incremented for

* 🌱 New releases of ExifTool with no externally visible changes 
* 🐛 Bugfixes
* ✨ Backward-compatible features

### `PATCH` is incremented for

* 📦 Minor packaging changes
* 🐞 Minor bugfixes

## Changelog

### v1.5.0

* 🌱 ExifTool upgraded to v10.38
* ✨ Use `npm`'s os-specific optionalDependencies rather than `platform-dependent-modules`.
* 📦 Don't include tests in npm 

### v1.4.0

* 🌱 ExifTool upgraded to v10.37

### v1.3.0

* 🌱 ExifTool upgraded to v10.36
* ✨ `Tag.Error` exposed for unsupported file types. 

### v1.2.0

* 🐛 It was too easy to miss calling `ExifTool.end()`, which left child ExifTool processes running.
  The constructor to ExifTool now adds a shutdown hook to send all child processes a shutdown signal. 

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
* ✨ Subsecond resolution from the Google Pixel has 8 significant digits(!!), added support for that. 

### v0.2.0

* ✨ More rigorous TimeZone extraction from assets, and added the `ExifTimeZoneOffset` to handle the `TimeZone` composite tag
* ✨ Added support for millisecond timestamps

### v0.1.1

🌱✨ Initial Release. Packages ExifTool v10.31.
