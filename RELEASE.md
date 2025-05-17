# Releasing new versions of `exiftool-vendored`

As of May 2025, the Windows
[exiftool-vendored.exe](https://github.com/photostructure/exiftool-vendored.exe)
and POSIX
[exiftool-vendored.pl](https://github.com/photostructure/exiftool-vendored.pl)
vendored versions of ExifTool are updated and released automatically.

1. `git clone` this repo,
1. `npm install`
1. `npm run u` # although this should be a no-op, thanks to Dependabot
1. `npm run mktags ../test-images` # < assumes `../test-images` has the full ExifTool sample image suite
1. `npm run fmt && npm run lint && npm run docs`
1. Verify docs were rebuilt successfully at <http://localhost:3000/index.html>
1. `npm run test`
1. Verify diffs are reasonable, `git commit` and `git push`
1. Verify [![Node.js CI](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml/badge.svg)](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml)
1. Update the [CHANGELOG.md](https://github.com/photostructure/exiftool-vendored.js/blob/main/CHANGELOG.md)
1. Run the [release action on GitHub](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/release.yml)
1. Copy the relevate CHANGELOG entries into the new GitHub Release. [Here's an example](https://github.com/photostructure/exiftool-vendored.js/releases/tag/30.0.0).