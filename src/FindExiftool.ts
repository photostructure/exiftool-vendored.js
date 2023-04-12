import * as _fs from "fs"
import * as _path from "path"
import { isWin32 } from "./IsWin32"

function findExiftool(): string {
  const path: string = require(`exiftool-vendored.${isWin32() ? "exe" : "pl"}`)
  // This s/app.asar/app.asar.unpacked/ path switch adds support for Electron
  // apps that are ASAR-packed.
  // Note that we can't check for electron because child processes that are
  // spawned by the main process will most likely need the ELECTRON_RUN_AS_NODE
  // environment variable set, which will unset the process.versions.electron
  // field.
  const fixedPath = path
    .split(_path.sep)
    .map((ea) => (ea === "app.asar" ? "app.asar.unpacked" : ea))
    .join(_path.sep)

  // Note also, that we must check for the fixedPath first, because Electron's
  // ASAR shenanigans will make existsSync return true even for asar-packed
  // resources.
  if (_fs.existsSync(fixedPath)) {
    return fixedPath
  }
  if (_fs.existsSync(path)) {
    return path
  }
  throw new Error(`Vendored ExifTool does not exist at ${path}`)
}

export const DefaultExifToolPath = findExiftool()
