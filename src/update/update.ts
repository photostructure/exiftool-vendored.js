import * as _fse from "fs-extra"
import * as globule from "globule"
import * as _path from "path"

import * as io from "./io"

const BaseUrl = "https://owl.phy.queensu.ca/~phil/exiftool/"
const DlDir = _path.join(__dirname, "..", "..", "dl")
const PatchVersion = ".0"

type UpdateOpts = {
  version: string
  baseName: string
  sha1: string
}
abstract class Update {
  constructor(
    readonly opts: UpdateOpts & {
      packageJson: string
      unpackDir: string
    }
  ) {}

  get url() {
    return BaseUrl + "/" + this.opts.baseName
  }

  get dlFile() {
    return _path.join(DlDir, this.opts.baseName)
  }

  download(): Promise<void> {
    return io.wgetFile(this.url, this.dlFile)
  }

  verify() {
    return io.sha1(this.dlFile, this.opts.sha1)
  }

  async downloadMaybeAndVerify() {
    try {
      await this.verify()
      return
    } catch (err) {
      await _fse.remove(this.dlFile)
      await this.download()
      await this.verify()
      return
    }
  }

  async cleanDest(): Promise<void> {
    await _fse.remove(this.opts.unpackDir)
    await _fse.mkdirp(this.opts.unpackDir)
    console.log(`✅ Cleaned ${this.opts.unpackDir}`)
    return
  }

  abstract unpack(): Promise<void>

  async update(): Promise<void> {
    await this.downloadMaybeAndVerify()
    await this.cleanDest()
    await this.unpack()
    await io.updatePackageVersion(
      this.opts.packageJson,
      this.opts.version + PatchVersion + "-pre"
    )
    return
  }
}

const ExeModuleDir = _path.resolve(
  _path.join(__dirname, "..", "..", "..", "exiftool-vendored.exe")
)
const ExePackageJson = _path.join(ExeModuleDir, "package.json")

class ZipUpdate extends Update {
  constructor(readonly o: UpdateOpts) {
    super({
      ...o,
      packageJson: ExePackageJson,
      unpackDir: _path.join(ExeModuleDir, "bin")
    })
  }

  async unpack(): Promise<void> {
    const destDir = this.opts.unpackDir
    const before = _path.join(destDir, "exiftool(-k).exe")
    const after = _path.join(destDir, "exiftool.exe")
    await io.unzip(this.dlFile, destDir)
    await io.rename(before, after)
    console.log(`✅ unzipped ${after}`)
    return
  }
}

const PlModuleDir = _path.resolve(
  _path.join(__dirname, "..", "..", "..", "exiftool-vendored.pl")
)
const PlPackageJson = _path.join(PlModuleDir, "package.json")

class TarUpdate extends Update {
  constructor(readonly o: UpdateOpts) {
    super({
      ...o,
      packageJson: PlPackageJson,
      unpackDir: _path.join(PlModuleDir, "bin")
    })
  }

  async unpack(): Promise<void> {
    const tmpUnpack = _path.join(PlModuleDir, "tmp")
    await io.tarxzf(this.dlFile, tmpUnpack)
    // The tarball is prefixed with "Image-ExifTool-VERSION". Move that subdirectory into bin proper.
    const subdir = globule.find(
      _path.join(tmpUnpack, `Image-ExifTool*${_path.sep}`)
    )
    if (subdir.length !== 1) {
      throw new Error(`Failed to find subdirector in ${tmpUnpack}`)
    }
    // We have to remove the unpack dir, "bin," because we're renaming the
    // Image-ExifTool-11.26 directory to "bin":
    await _fse.remove(this.opts.unpackDir)
    await _fse.rename(subdir[0], this.opts.unpackDir)
    await _fse.remove(_path.join(this.opts.unpackDir, "t"))
    await _fse.remove(_path.join(this.opts.unpackDir, "html"))
    console.log(`✅ finished with ${this.opts.unpackDir}`)
    return
  }
}

function updatePlatformDependentModules(version: string): Promise<void> {
  return io.editPackageJson(
    _path.join(__dirname, "..", "..", "package.json"),
    pkg => {
      const mods = pkg.optionalDependencies
      mods["exiftool-vendored.pl"] = version
      mods["exiftool-vendored.exe"] = version
    }
  )
}

async function releases() {
  const version = await io.wgetString(BaseUrl + "ver.txt")
  const files: { baseName: string; sha1: string }[] = []

  const checksums = await io.wgetString(BaseUrl + "checksums.txt")
  const re = /SHA1\((\S+)\)=\s*([a-f0-9]+)/gim
  let m: RegExpExecArray | null
  while ((m = re.exec(checksums)) !== null) {
    if (m.index === re.lastIndex) re.lastIndex++
    files.push({ baseName: m[1], sha1: m[2] })
  }
  return { version, files }
}

export async function update(): Promise<void> {
  const { version, files } = await releases()
  const tar = files.find(ea => ea.baseName.endsWith(".tar.gz"))
  const zip = files.find(ea => ea.baseName.endsWith(".zip"))
  if (tar && zip) {
    await _fse.mkdirp(DlDir)
    const tarUpdate = new TarUpdate({ version, ...tar })
    await tarUpdate.update()
    const zipUpdate = new ZipUpdate({ version, ...zip })
    await zipUpdate.update()
    await updatePlatformDependentModules(version + PatchVersion)
    console.log(
      "👍 now run `git commit` and `np` in the .pl and .exe subdirectories."
    )
  } else {
    throw new Error("Did not find both the .zip and .tar.gz enclosures.")
  }
}

update()
