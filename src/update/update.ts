import { Enclosure } from "./enclosure"
import * as io from "./io"
import * as _path from "path"

const globule = require("globule")

abstract class Update {
  abstract readonly patchVersion: string
  abstract readonly enclosure: Enclosure
  abstract readonly dlDest: string
  abstract readonly unpackDest: string
  abstract readonly moduleDir: string
  abstract readonly packageJson: string

  get version(): string {
    return (this.enclosure.version + this.patchVersion)
      .split(".")
      .slice(0, 3)
      .join(".")
  }

  download(): Promise<void> {
    return io.wgetFile(this.enclosure.url, this.dlDest)
  }

  verify(): Promise<void> {
    return io.sha1(this.dlDest, this.enclosure.sha1).then(() => undefined)
  }

  async downloadMaybeAndVerify(): Promise<void> {
    try {
      await this.verify()
      return
    } catch (err) {
      await io.rmrf(this.dlDest, true)
      await this.download()
      return this.verify()
    }
  }

  async cleanDest(): Promise<void> {
    await io.rmrf(this.unpackDest, true)
    await io.mkdir(this.unpackDest)
    console.log(`[ √ ] Cleaned ${this.unpackDest}`)
    return
  }

  abstract unpack(): Promise<void>

  async update(): Promise<void> {
    await this.downloadMaybeAndVerify()
    await this.cleanDest()
    await this.unpack()
    await io.updatePackageVersion(this.packageJson, this.version + "-pre")
    return
  }
}

class ZipUpdate extends Update {
  readonly patchVersion = ".0"
  readonly moduleDir = _path.join(
    __dirname,
    "..",
    "..",
    "..",
    "exiftool-vendored.exe"
  )
  readonly packageJson = _path.join(this.moduleDir, "package.json")
  readonly unpackDest: string
  readonly dlDest: string

  constructor(readonly enclosure: Enclosure, readonly dlDir: string) {
    super()
    this.dlDest = _path.join(dlDir, enclosure.path.base)
    this.unpackDest = _path.join(this.moduleDir, "bin")
  }

  async unpack(): Promise<void> {
    const before = _path.join(this.unpackDest, "exiftool(-k).exe")
    const after = _path.join(this.unpackDest, "exiftool.exe")
    await io.unzip(this.dlDest, this.unpackDest)
    await io.rename(before, after)
    console.log(` ${after}`)
    return
  }
}

class TarUpdate extends Update {
  readonly patchVersion = ".0"
  readonly moduleDir = _path.join(
    __dirname,
    "..",
    "..",
    "..",
    "exiftool-vendored.pl"
  )
  readonly packageJson = _path.join(this.moduleDir, "package.json")
  readonly dlDest: string
  readonly unpackDest: string

  constructor(readonly enclosure: Enclosure, readonly dlDir: string) {
    super()
    this.dlDest = _path.join(dlDir, enclosure.path.base)
    this.unpackDest = _path.join(this.moduleDir, "bin")
  }

  async unpack(): Promise<void> {
    const tmpUnpack = _path.join(this.moduleDir, "tmp")
    await io.tarxzf(this.dlDest, tmpUnpack)
    // The tarball is prefixed with "Image-ExifTool-VERSION". Move that subdirectory into bin proper.
    const subdir = globule.find(
      _path.join(tmpUnpack, `Image-ExifTool*${_path.sep}`)
    )
    if (subdir.length !== 1) {
      throw new Error(`Failed to find subdirector in ${tmpUnpack}`)
    }
    await io.rmrf(this.unpackDest)
    await io.rename(subdir[0], this.unpackDest)
    await io.rmrf(this.unpackDest + "/t/")
    await io.rmrf(this.unpackDest + "/html/")
    return
  }
}

function updatePlatformDependentModules(
  perlVersion: string,
  exeVersion: string
): Promise<void> {
  return io.editPackageJson(
    _path.join(__dirname, "..", "..", "package.json"),
    pkg => {
      const mods = pkg.optionalDependencies
      mods["exiftool-vendored.pl"] = perlVersion
      mods["exiftool-vendored.exe"] = exeVersion
    }
  )
}

export async function update(): Promise<void> {
  const encs = await Enclosure.get()
  const tar = encs.find(enc => enc.path.ext === ".gz")
  const zip = encs.find(enc => enc.path.ext === ".zip")
  if (tar && zip) {
    const dl = _path.join(__dirname, "..", "..", "dl")
    await io.mkdir(dl, true)
    const tarUpdate = new TarUpdate(tar, dl)
    await tarUpdate.update()
    const zipUpdate = new ZipUpdate(zip, dl)
    await zipUpdate.update()
    await updatePlatformDependentModules(tarUpdate.version, zipUpdate.version)
    console.log(
      "👍 now run `git commit` and `np` in the .pl and .exe subdirectories."
    )
  } else {
    throw new Error("Did not find both the .zip and .tar.gz enclosures.")
  }
}

update()
