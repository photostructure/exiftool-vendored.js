import * as _fs from 'fs'
import * as _crypto from 'crypto'
import * as _http from 'http'
import * as _zlib from 'zlib'
import * as rimraf from 'rimraf'

const tar = require('tar-fs')
const https = require('https')
const http = require('http')
const DecompressZip = require('decompress-zip')

interface Consumer {
  onData(data: Buffer | string): void
  onEnd(): string
}

class StringConsumer implements Consumer {
  private readonly data: string[] = []

  onData(data: Buffer | string) {
    this.data.push(data.toString())
  }

  onEnd(): string {
    return this.data.join('')
  }
}

class FileConsumer implements Consumer {
  private readonly out: _fs.WriteStream
  constructor(readonly destination: string) {
    this.out = _fs.createWriteStream(destination)
  }

  onData(data: Buffer | string) {
    this.out.write(data)
  }

  onEnd(): string {
    this.out.end()
    return this.destination
  }
}

function wget(url: string, consumer: Consumer): Promise<string> {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const request = lib.get(url, (response: _http.IncomingMessage) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed to load page, status code: ${response.statusCode}`))
      }
      response.on('data', (chunk: Buffer | string) => consumer.onData(chunk))
      response.on('end', () => resolve(consumer.onEnd()))
    })
    request.on('error', (err: any) => reject(err))
  })
}

export function wgetString(url: string): Promise<string> {
  return wget(url, new StringConsumer()).then(str => {
    console.log(`[ ✓ ] ${url} downloaded (${str.length} bytes)`)
    return str
  })
}

export function wgetFile(url: string, destinationFile: string): Promise<void> {
  return wget(url, new FileConsumer(destinationFile)).then(() => {
    console.log(`[ ✓ ] ${url} downloaded to ${destinationFile}`)
  })
}

export function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    _fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function writeFile(filename: string, content: string): Promise<string> {
  return new Promise((resolve, reject) => {
    _fs.writeFile(filename, content, 'utf8', (err: NodeJS.ErrnoException) => {
      if (err) {
        reject(err)
      } else {
        console.log(`[ ✓ ] Wrote ${filename}`)
        resolve()
      }
    })
  })
}

export function rename(before: string, after: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    _fs.rename(before, after, (err?: NodeJS.ErrnoException) => {
      if (err) {
        reject(err)
      } else {
        console.log(`[ ✓ ] Renamed ${before} to ${after}`)
        resolve()
      }
    })
  })
}

export function sha1(filename: string, expectedSha: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = _crypto.createHash('SHA1')
    const stream = _fs.createReadStream(filename)
    stream.on('error', (error: Error) => {
      reject(error)
      stream.close()
    })
    stream.on('data', (data: string | Buffer) => {
      hash.update(data, 'utf8')
    })
    stream.on('end', () => {
      resolve(hash.digest('hex'))
    })
  }).then(actualSha => {
    if (expectedSha !== actualSha) {
      throw new Error(`SHA1 MISMATCH: expected ${expectedSha} for ${filename}, got ${actualSha}`)
    } else {
      console.log(`[ ✓ ] ${filename} matches expected SHA`)
      return actualSha
    }
  })
}

export function unzip(zipFile: string, destDir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let unzipper = new DecompressZip(zipFile)
    unzipper.on('error', reject)
    unzipper.on('extract', () => {
      console.log(`[ ✓ ] ${zipFile} unzipped to ${destDir}`)
      resolve()
    })
    unzipper.extract({
      path: destDir
    })
  })
}

export function tarxzf(targzFile: string, destDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    _fs.createReadStream(targzFile)
      .on('error', reject)
      .pipe(_zlib.createGunzip())
      .on('error', reject)
      .pipe(tar.extract(destDir))
      .on('error', reject)
      .on('finish', () => {
        console.log(`[ ✓ ] ${targzFile} untargz'ed to ${destDir}`)
        resolve()
      })
  })
}

export function editPackageJson(
  packageJson: string,
  f: ((packageObj: any) => void)
): Promise<void> {
  return readFile(packageJson)
    .then((json: string) => {
      const pkg = JSON.parse(json)
      f(pkg)
      writeFile(packageJson, JSON.stringify(pkg, null, 2) + '\n')
    })
}

export function updatePackageVersion(
  packageJson: string,
  version: string
): Promise<void> {
  return editPackageJson(packageJson, (pkg => pkg.version = version))
}

export function rmrf(path: string, ignoreErrors: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(path, (err: Error) => {
      if (err && !ignoreErrors) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export function mkdir(path: string, ignoreErrors: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    _fs.mkdir(path, (err?: Error) => {
      if (err && !ignoreErrors) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
