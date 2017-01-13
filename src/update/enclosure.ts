import { Checksums } from "./checksums"
import * as io from "./io"
import * as _path from "path"
import * as _url from "url"
import * as xmldom from "xmldom"

const xpath = require("xpath")

export class Enclosure {

  // The file suffix and the path will already be stripped out at this point
  private static readonly regex = /.*?([\d\.]+)(\.tar\.gz|\.zip)$/

  constructor(
    readonly url: string,
    readonly path: _path.ParsedPath,
    readonly sha1: string,
    readonly version: string
  ) { } // tslint:disable-line

  static parsedPath(url: string): _path.ParsedPath | undefined {
    const parsedUrlPathname = _url.parse(url).pathname
    if (parsedUrlPathname) {
      return _path.posix.parse(parsedUrlPathname)
    }
    return undefined
  }

  static versionFromParsedPath(parsedPath: _path.ParsedPath): string | undefined {
    const match = Enclosure.regex.exec(parsedPath.base)
    if (match !== null) {
      return match[1]
    } else {
      return undefined
    }
  }

  static fromNode(enclosureNode: Element, checksums: Checksums): Enclosure | undefined {
    const url = enclosureNode.getAttributeNode("url").value
    const parsedPath = Enclosure.parsedPath(url)
    if (parsedPath) {
      const sha1 = checksums.sha1(parsedPath.base)
      const version = Enclosure.versionFromParsedPath(parsedPath)
      if (version && io.sha1) {
        const e = new Enclosure(url, parsedPath, sha1, version)
        return e
      }
    }
    return undefined
  }

  static get(): Promise<Enclosure[]> {
    return Checksums.get()
      .then(checksums => io.wgetString("http://owl.phy.queensu.ca/~phil/exiftool/rss.xml")
        .then(body => Enclosure.parseBody(body, checksums)))
  }

  static parseBody(body: string, checksums: Checksums): Enclosure[] {
    let doc = new xmldom.DOMParser().parseFromString(body)
    const nodes: Element[] = xpath.select("//rss/channel/item[1]/enclosure", doc)
    const enclosures = nodes.map(node => Enclosure.fromNode(node, checksums))
    return enclosures.filter(item => item !== undefined) as Enclosure[]
  }
}
