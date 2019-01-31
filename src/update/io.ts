import { Deferred } from "batch-cluster"
import * as _crypto from "crypto"
import * as _fs from "fs"
import * as _fse from "fs-extra"
import { IncomingMessage } from "http"
import * as _https from "https"
import { Duplex, DuplexOptions, Writable } from "stream"
import * as tar from "tar-fs"
import * as _zlib from "zlib"

const DecompressZip = require("decompress-zip")

export class WritableToBuffer extends Duplex {
  private readonly deferred = new Deferred<Buffer>()
  private readonly _buf: Buffer[] = []

  constructor(opts?: DuplexOptions) {
    super(opts)
    this.on("finish", () => this.deferred.resolve(Buffer.concat(this._buf)))
    this.on("error", err => {
      this.deferred.reject(err)
    })
  }

  get data(): Promise<Buffer> {
    return this.deferred.promise
  }

  _read() {} // required by stream

  _write(chunk: any, encoding: string, next: () => void) {
    const buf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, encoding)
    this._buf.push(buf)
    next()
  }
}

function wget(url: string, writeable: Writable): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = _https.get(url, (response: IncomingMessage) => {
      if (
        response.statusCode == null ||
        response.statusCode < 200 ||
        response.statusCode > 299
      ) {
        reject(
          new Error(`Failed to load page, status code: ${response.statusCode}`)
        )
      }
      response.on("error", reject)
      writeable.on("error", reject)
      response
        .pipe(writeable)
        .on("error", reject)
        .on("finish", resolve)
    })
    request.on("error", reject)
  })
}

export async function wgetString(url: string): Promise<string> {
  const w = new WritableToBuffer()
  await wget(url, w)
  const str = (await w.data).toString()
  console.log(`✅ ${url} downloaded (${str.length} bytes)`)
  return str
}

export async function wgetFile(
  url: string,
  destinationFile: string
): Promise<void> {
  await wget(url, _fs.createWriteStream(destinationFile))
  console.log(`✅ ${url} downloaded to ${destinationFile}`)
}

export function readFile(filename: string): Promise<string> {
  return _fse.readFile(filename).then(buf => buf.toString())
}

export async function writeFile(file: string, content: string): Promise<void> {
  await _fse.writeFile(file, content)
  console.log(`✅ Wrote ${file}`)
}

export async function rename(before: string, after: string): Promise<void> {
  await _fse.rename(before, after)
  console.log(`✅ Renamed ${before} to ${after}`)
}

export function sha1(file: string, expectedSha: string) {
  return new Promise<string>((resolve, reject) => {
    const hash = _crypto.createHash("SHA1")
    const stream = _fs.createReadStream(file)
    stream.on("error", (error: Error) => {
      reject(error)
      stream.close()
    })
    stream.on("data", (data: string | Buffer) => {
      hash.update(data as any, "utf8") // < the Hash types are broken
    })
    stream.on("end", () => {
      resolve(hash.digest("hex"))
    })
  }).then(actualSha => {
    if (expectedSha !== actualSha) {
      throw new Error(
        `SHA1 MISMATCH: expected ${expectedSha} for ${file}, got ${actualSha}`
      )
    } else {
      console.log(`✅ ${file} matches expected SHA`)
      return actualSha
    }
  })
}

export function unzip(zipFile: string, destDir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let unzipper = new DecompressZip(zipFile)
    unzipper.on("error", reject)
    unzipper.on("extract", () => {
      console.log(`✅ ${zipFile} unzipped to ${destDir}`)
      resolve()
    })
    unzipper.extract({
      path: destDir
    })
  })
}

export function tarxzf(targzFile: string, destDir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    _fs
      .createReadStream(targzFile)
      .on("error", reject)
      .pipe(_zlib.createGunzip())
      .on("error", reject)
      .pipe(tar.extract(destDir))
      .on("error", reject)
      .on("finish", () => {
        console.log(`✅ ${targzFile} untargz'ed to ${destDir}`)
        resolve()
      })
  })
}

export async function editPackageJson(
  packageJson: string,
  f: ((packageObj: any) => void)
): Promise<void> {
  const pkg = JSON.parse(await readFile(packageJson))
  f(pkg)
  await writeFile(packageJson, JSON.stringify(pkg, null, 2) + "\n")
  return
}

export function updatePackageVersion(
  packageJson: string,
  version: string
): Promise<void> {
  return editPackageJson(packageJson, pkg => (pkg.version = version))
}


export function mkdir(
  path: string,
  ignoreErrors: boolean = false
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    _fs.mkdir(path, (err?: Error) => {
      if (err && !ignoreErrors) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
