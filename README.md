# exiftool-vendored

Efficient, cross-platform [node](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/). 

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build Status](https://travis-ci.org/mceachen/exiftool-vendored.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored)

## Features

1. Uses `-stay_open` mode by default, which can be up to 60x faster than other packages[*](#stay_open)

1. Proper parsing of 
    - dates
    - latitudes & longitudes
    - rational numbers as [fractions](https://github.com/ekg/fraction.js)

1. Auditable ExifTool source code (the "vendored" code is [verifiable](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. Automated updates to ExifTool ([as new versions come out monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1. Supported on Node.js v6.7.0+ on Linux, Mac, & Windows.

## Installation

    npm install --save exiftool-vendored

## Usage

```js
    import { ExifTool } from "ExiftoolVendored"

    // ExifTool construction is expensive and stateless; 
    // Optimally use it as a node-process singleton. 
    const exiftool = new ExifTool() 

    // ExifTool.read() returns a Promise of metadata
    exiftool.read("path/to/file.jpg").then(metadata => {
      console.log(`Make: ${metadata.Make}, Model: ${metadata.Model}`)
    })
```

Note that the field names that come from ExifTool are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like `AFPointSelected` and `ISO`. (I thought about "fixing" the field names to be camelCase, but this would result in ungainly `aFPointSelected` and `iSO` atrocities).

## stay_open

Starting the perl version of ExifTool is expensive, but is *especially* expensive on the Windows version of ExifTool. 

A distribution of Perl is extracted, along with ~1000 files that make up ExifTool,into a temporary directory for **every invocation**. Windows virus scanners make this approach an even more expensive approach.

With `-stay_open`, these setup costs are only paid once per node process, dropping response latency dramatically. 

## Versioning

Version numbers follow the following scheme:
```js
  [
    EXIFTOOL_VENDORED_API_VERSION,
    EXIFTOOL_VERSION,
    EXIFTOOL_VENDORED_PATCH_RELEASE
  ].join(".")
```

In the spirit of [SemVer](http://semver.org/), major version numbers track non-backward-compatible API updates to this package. Minor and patch versions follow ExifTool's to make it clear which version is being vendored. Unfortunately, ExifTool sometimes has patch releases, and this package may need multiple releases in the course of a single version of ExifTool, so the above scheme may result in > 3 numbers (which technically violates SemVer, but shouldn't cause an issue with `npm`).

As a worst case, `v2.10.30.1.3` encodes the third patch release of api v2 that vendors ExifTool v10.30.1.

### v0.10.30

Initial Release.
