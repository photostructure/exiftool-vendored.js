import { Logger } from "batch-cluster"
import * as _fs from "node:fs"
import * as _path from "node:path"
import process from "node:process"
import { isWin32 } from "./IsWin32"
import { Maybe } from "./Maybe"
import { which } from "./Which"

function vendorPackage() {
  return "exiftool-vendored." + (isWin32() ? "exe" : "pl")
}

function tryRequire({
  prefix = "",
  logger,
}: { prefix?: string; logger?: Maybe<Logger> } = {}): Maybe<string> {
  const id = prefix + vendorPackage()
  try {
    return require(id)
  } catch (error) {
    logger?.warn(id + "not found: ", error)
    return
  }
}

export async function exiftoolPath(logger?: Logger): Promise<string> {
  const path = tryRequire({ prefix: "", logger })
  // This s/app.asar/app.asar.unpacked/ path switch adds support for Electron
  // apps that are ASAR-packed (like by electron-builder). This is necessary because
  // Note that we can't reliably automatically detect that we're running in
  // electron because child processes that are spawned by the main process will
  // most likely need the ELECTRON_RUN_AS_NODE environment variable set, which
  // will unset the process.versions.electron field.
  const fixedPath = path
    ?.split(_path.sep)
    .map((ea) => (ea === "app.asar" ? "app.asar.unpacked" : ea))
    .join(_path.sep)

  // Note also, that we must check for the fixedPath first, because Electron's
  // ASAR shenanigans will make existsSync return true even for asar-packed
  // resources.
  if (fixedPath != null && _fs.existsSync(fixedPath)) {
    return fixedPath
  }
  if (path != null && _fs.existsSync(path)) {
    return path
  }

  logger?.warn("Failed to find exiftool via " + vendorPackage())

  // Set by electron-forge:
  const electronResourcePath = (process as any).resourcesPath
  if (electronResourcePath != null) {
    const forgePath = _path.join(
      electronResourcePath,
      vendorPackage(),
      "bin",
      "exiftool" + (isWin32() ? ".exe" : "")
    )
    if (_fs.existsSync(forgePath)) {
      return forgePath
    } else {
      logger?.warn(
        "Failed to find exiftool in electron forge resources path: " + forgePath
      )
    }
  }

  // Last ditch: is there a globally installed exiftool in the PATH?
  const fromPath = await which("exiftool")
  if (fromPath != null) {
    return fromPath
  }

  throw new Error(
    `Failed to find ExifTool installation: set exiftoolPath explicitly.`
  )
}
