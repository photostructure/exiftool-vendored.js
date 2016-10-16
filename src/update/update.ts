import { Enclosure } from "./enclosure"
import * as io from "./io"
import * as _url from "url"
import * as _path from "path"
import * as _http from "http"
import * as _fs from "fs"
import * as _crypto from "crypto"

abstract class Update {
  abstract readonly patchVersion: string
  abstract readonly enclosure: Enclosure
  abstract readonly dlDest: string
  abstract readonly unpackDest: string
  abstract readonly moduleDir: string
  abstract readonly packageJson: string

  get version(): string {
    return this.enclosure.version + this.patchVersion
  }

  download(): Promise<void> {
    return io.wgetFile(this.enclosure.url, this.dlDest)
  }

  verify(): Promise<void> {
    return io.sha1(this.dlDest, this.enclosure.sha1)
  }

  cleanDest(): Promise<void> {
    return io.rmrf(this.unpackDest)
      .then(() => io.mkdir(this.unpackDest))
      .then(() => console.log(`[ ✓ ] Cleaned ${this.unpackDest}`))
  }

  abstract unpack(): Promise<void>

  update(): Promise<void> {
    return this.download()
      .then(() => this.verify())
      .then(() => this.cleanDest())
      .then(() => this.unpack())
      .then(() => io.updatePackageVersion(
        this.packageJson,
        this.version
      ))
  }
}

class ZipUpdate extends Update {
  readonly patchVersion = ""
  readonly moduleDir = _path.join(__dirname, "..", "..", "..", "exiftool-vendored.exe")
  readonly packageJson = _path.join(this.moduleDir, "package.json")
  readonly unpackDest: string
  readonly exePath: string
  readonly dlDest: string

  constructor(readonly enclosure: Enclosure, readonly dlDir: string) {
    super()
    this.dlDest = _path.join(dlDir, enclosure.path.base)
    this.unpackDest = _path.join(this.moduleDir, "bin")
    this.exePath = _path.join(this.unpackDest, "exiftool(-k).exe")
  }

  unpack(): Promise<void> {
    const before = _path.join(this.unpackDest, "exiftool(-k).exe")
    const after = _path.join(this.unpackDest, "exiftool.exe")
    return io.unzip(this.dlDest, this.unpackDest)
      .then(() => io.rename(before, after))
  }
}

class TarUpdate extends Update {
  readonly patchVersion = ""
  readonly moduleDir = _path.join(__dirname, "..", "..", "..", "exiftool-vendored.pl")
  readonly packageJson = _path.join(this.moduleDir, "package.json")
  readonly unpackDest: string
  readonly dlDest: string

  constructor(readonly enclosure: Enclosure, readonly dlDir: string) {
    super()
    this.dlDest = _path.join(dlDir, enclosure.path.base)
    this.unpackDest = _path.join(this.moduleDir, "bin")
  }

  unpack(): Promise<void> {
    return io.tarxzf(this.dlDest, this.unpackDest)
  }
}

function updatePlatformDependentModules(
  rootVersion: string,
  perlVersion: string,
  exeVersion: string
): Promise<void> {
  return io.editPackageJson(
    _path.join(__dirname, "..", "..", "package.json"), (pkg => {
      pkg.version = rootVersion
      const mods = pkg.config.platformDependentModules
      const pl = [`exiftool-vendored.pl@${perlVersion}`]
      const exe = [`exiftool-vendored.exe@${exeVersion}`]
      mods.linux = pl
      mods.darwin = pl
      mods.win32 = exe
    })
  )
}

const rootPatchVersion = ""

export function update(): Promise<void> {
  return Enclosure.get().then(enclosures => {
    
    // console.log("By extension: " + JSON.stringify(byExt))
    const [tar, zip] = [byExt[".gz"], byExt[".zip"]]
    if (tar && zip) {
      const dl = _path.join(__dirname, "..", "..", "dl")
      const zipUpdate = new ZipUpdate(zip, dl)
      const tarUpdate = new TarUpdate(tar, dl)
      return io.rmrf(dl).then(() => io.mkdir(dl))
        .then(() => Promise.all([
          zipUpdate.update(),
          tarUpdate.update()
        ]))
        .then(() => {
          updatePlatformDependentModules(
            tarUpdate.enclosure.version + rootPatchVersion,
            tarUpdate.version,
            zipUpdate.version
          )
        })
    } else {
      throw new Error("Did not find both the .zip and .tar.gz enclosures.")
    }
  })
}

console.log("boom")
update()
