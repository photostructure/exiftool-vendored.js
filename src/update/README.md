# Update

## ☠☠ This package doesn't contain code I'm proud of ☠☠

- Please don't look at this code as a good example of idiomatic TypeScript! Much
  of the code was the first code I ever wrote in TypeScript, and what hasn't
  been rewritten is pretty bad.
- There's no test coverage, and never will have (unless someone else wants to
  try), with the reasoning that if code in this package breaks, the whole module
  most likely either won't compile, or system tests will fail.

This submodule updates the platform-specific npm packages
[exiftool-vendored.pl](https://github.com/mceachen/exiftool-vendored.pl) and
[exiftool-vendored.exe](https://github.com/mceachen/exiftool-vendored.exe) to the latest version of ExifTool.

Note that these repositories are assumed to be checked out as
a sibling directory to `exiftool-vendored.js`:

```sh
$ (cd ../../.. ; ls -d1 exiftool-vendored*)
exiftool-vendored.js/
exiftool-vendored.exe/
exiftool-vendored.pl/
```
