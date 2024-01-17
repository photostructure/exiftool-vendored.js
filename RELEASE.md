# Releasing new versions of `exiftool-vendored`

1. `git clone` this repo into `~/src`

2. On a POSIX machine, clone
   [exiftool-vendored.pl](https://github.com/photostructure/exiftool-vendored.pl)
   into `~/src` (or another common subdirectory)

3. On a Windows machine, clone
   [exiftool-vendored.exe](https://github.com/photostructure/exiftool-vendored.exe)

4. On POSIX, in `../exiftool-vendored.pl`:

   1. `git stash -u && git fetch && git checkout main && yarn install && yarn update && yarn test`
   1. Verify diffs are in order, and commit
   1. `npx release-it`

5. On Windows, in `...\exiftool-vendored.exe\`:

(The terminal built into vscode plays with `ncu` and `release-it` a bit nicer than CMD or Windows for Git's terminal)

   1. `git stash -u && git fetch && git checkout main && yarn install && yarn update && yarn test`
   1. Verify diffs are in order, and commit
   1. `npx release-it`

6. Finally, back on the POSIX box, release `exiftool-vendored`:

   1. `cd ../exiftool-vendored.js`
   1. `yarn u`
   1. `yarn install`
   1. `yarn mktags ../test-images` # < assumes ``../test-images`` has the full ExifTool sample image suite
   1. `yarn prettier`
   1. `yarn lint`
   1. `yarn docs`
   1. Verify docs were rebuilt successfully at <http://localhost:3000/index.html>
   1. `yarn test`
   1. Verify diffs are reasonable, `git commit` and `git push`
   1. Verify [![Node.js CI](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml/badge.svg)](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/node.js.yml)
   1. Update the [CHANGELOG.md](https://github.com/photostructure/exiftool-vendored.js/blob/main/CHANGELOG.md)
   1. `npx release-it`
