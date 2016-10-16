import { wgetString } from "./io"

/**
 * If the vendored ExifTool version is different from
 * the current latest version, download and extract
 * into the appropriate sibling directories, and update
 * their package.json.
 *
 * Running tests, committing to git, and publishing the npm are
 * manual subsequent steps.
 */

export class Checksums {
  private readonly store: { [key: string]: string } = {}
  /**
   * @param checksums is a newline-separated text file with the following format:
   * $HASHTYPE($FILENAME) = $HASH
   *
   * We only care about SHA1, so we're pulling just those out.
   */
  private static readonly regex = /SHA1 ?\((\S+)\) ?= ?([a-f0-9]+)/i

  constructor(checksums: string) {
    checksums.split("\n").forEach(line => {
      const match = Checksums.regex.exec(line)
      if (match !== null) this.store[match[1]] = match[2]
    })
  }

  sha1(filename: string) {
    return this.store[filename]
  }

  static get(): Promise<Checksums> {
    return wgetString("http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt")
      .then(body => new Checksums(body))
  }
}
