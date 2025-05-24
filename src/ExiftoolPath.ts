import { Logger } from "batch-cluster";
import * as _fs from "node:fs";
import * as _path from "node:path";
import { isWin32 } from "./IsWin32";
import { Maybe } from "./Maybe";
import { which } from "./Which";

function vendorPackage() {
  return "exiftool-vendored." + (isWin32() ? "exe" : "pl");
}

async function tryImport({
  prefix = "",
  logger,
}: { prefix?: string; logger?: Maybe<Logger> } = {}): Promise<Maybe<string>> {
  const id = prefix + vendorPackage();
  try {
    const module = await import(id);
    return module.default ?? module;
  } catch (error) {
    logger?.warn(id + " not found: ", error);
    return;
  }
}

/**
 * This implementation relies on the fact that both `exiftool-vendored.pl` and
 * `exiftool-vendored.exe` both export the path to their respective exiftool
 * binary.
 *
 * When running in node, this method should suffice.
 *
 * When running in Electron, all bets are off, due to ASAR packaging and other
 * nonsense. As perl can't run from within an ASAR archive, `electron-builder`
 * must be configured to `asarUnpack`
 * "**&#47;node_modules/exiftool-vendored.{pl,exe}/". See
 * <https://www.electron.build/generated/platformspecificbuildoptions#configuration-asarUnpack>
 * for details.
 *
 * If you're using `electron-forge`, add something like the following to your
 * ForgeConfig.packagerConfig.extraResource array: `fs.join(".", "node_modules",
 * "exiftool-vendored." + (isWin ? "exe" : "pl"))` but then you must specify a
 * custom exiftoolPath in your options hash, as subprocesses that use
 * ELECTRON_RUN_AS_NODE will no longer have process.resourcesPath set.
 *
 * If none of the above work for your use case, you can provide your own
 * `exiftoolPath` implementation to your instance of ExifTool
 *
 * @return the path to the exiftool binary, preferring the vendored version in
 * node_modules.
 */
export async function exiftoolPath(logger?: Logger): Promise<string> {
  const path = await tryImport({ prefix: "", logger });
  // This s/app.asar/app.asar.unpacked/ path switch adds support for Electron
  // apps whose modules are ASAR-packed (like by electron-builder).

  const asarUnpackedPath = path
    ?.split(_path.sep)
    .map((ea) => (ea === "app.asar" ? "app.asar.unpacked" : ea))
    .join(_path.sep);

  // NOTE: we must check for the fixedPath FIRST, because Electron's ASAR
  // shenanigans will make existsSync return true for asar-packed resources
  if (asarUnpackedPath != null && _fs.existsSync(asarUnpackedPath)) {
    return asarUnpackedPath;
  }
  if (path != null && _fs.existsSync(path)) {
    return path;
  }

  logger?.warn("Failed to find exiftool via " + vendorPackage());

  // process.resourcesPath is set by electron-forge:
  const electronResourcePath = (process as { resourcesPath?: string })
    .resourcesPath;
  if (electronResourcePath != null) {
    const forgePath = _path.join(
      electronResourcePath,
      vendorPackage(),
      "bin",
      "exiftool" + (isWin32() ? ".exe" : ""),
    );
    if (_fs.existsSync(forgePath)) {
      return forgePath;
    } else {
      logger?.warn(
        "Failed to find exiftool in electron forge resources path: " +
          forgePath,
      );
    }
  }

  // Last ditch: is there a globally installed exiftool in the PATH?
  const fromPath = await which("exiftool");
  if (fromPath != null) {
    return fromPath;
  }

  throw new Error(
    `Failed to find ExifTool installation: set exiftoolPath explicitly.`,
  );
}
