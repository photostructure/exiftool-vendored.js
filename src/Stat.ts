import * as fs from "fs"

/**
 * Promisified `stat`
 */
export function stat(path: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => (stat == null || err != null) ? reject(err) : resolve(stat))
  })
}