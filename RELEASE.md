# Releasing new versions of `exiftool-vendored`

As of May 2025, the Windows
[exiftool-vendored.exe](https://github.com/photostructure/exiftool-vendored.exe)
and POSIX
[exiftool-vendored.pl](https://github.com/photostructure/exiftool-vendored.pl)
vendored versions of ExifTool are updated and released automatically.

## Automated Dependency Updates

A GitHub Actions workflow automatically checks for dependency updates (including ExifTool packages) periodically and creates pull requests when updates are available. The workflow:

- Updates all dependencies using `npm-check-updates`
- Creates a pull request with signed commits
- Includes a detailed diff of changes
- Allows manual approval and merging
- Can also be triggered manually via the Actions tab

## Manual Release Process

1. `git clone` this repo,
1. `npm install`
1. `npm run mktags ../test-images` # < assumes `../test-images` has the full ExifTool sample image suite
1. `npm run precommit` (look for lint or documentation generation issues)
1. `npm run test`
1. Verify diffs are reasonable, `git commit` and `git push`
1. Verify [![Node.js CI](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml/badge.svg)](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml)
1. Update the [CHANGELOG.md](https://github.com/photostructure/exiftool-vendored.js/blob/main/CHANGELOG.md)
1. Run the [release action on GitHub](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/release.yml)
1. Copy the relevant CHANGELOG entries into the new GitHub Release. [Here's an example](https://github.com/photostructure/exiftool-vendored.js/releases/tag/30.0.0).
