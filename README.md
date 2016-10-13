# exiftool-vendored

This is a cross-platform `npm` package for [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/).

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build Status](https://travis-ci.org/mceachen/exiftool-vendored.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored)


## Installation

    npm install --save exiftool-vendored

An ExifTool instance will manage a child process of exiftool, and, given batch commands, will return promises of the responses.

## Usage

```javascript
    import { ExifTool } from "ExiftoolVendored"

    // ExifTool construction is expensive and stateless; 
    // Optimally use it as a node-process singleton. 
    const exiftool = new ExifTool() 

    // .read() returns a Promise of the exiftool
    exiftool.read("path/to/file.jpg").then(exif => {
      console.log(`Make: ${exif.Make}, Model: ${exif.Model}`)
    })
```
Note that the fields from ExifTool are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like `AFPointSelected` and `ISO`. This library does not "fix" them to camelCase (as this would result in ungainly `aFPointSelected` and `iSO` attrocities).

## Features

1. Uses `-stay_open` mode by default, which can make ExifTool up to 60x faster[*](#stay_open)

1. Proper parsing of 
    - dates
    - latitudes & longitudes
    - rational numbers as [fractions](https://github.com/ekg/fraction.js)

1. Auditable ExifTool source code (the "vendored" code can be [verified](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. Supported on node v6.7.0 on Linux, Mac, and Windows.

1. Build target to update ExifTool releases ([new versions come out monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

## stay_open

Spinning up the perl version of ExifTool is expensive, but is *especially* expensive on the version of ExifTool for Windows. A *distribution of perl* is extracted and run out of a temporary directory from the self-extracting `exiftool.exe` archive for *every invocation*. Windows virus scanners make this approach an even more expensive approach.

With `-stay_open`, these setup costs are only paid once per node process, dropping response latency dramatically. 

## Change history

Note that version numbers, other than the patch number, follow ExifTool's in the interests of simplicity.

### 10.29.0

Initial Release.
