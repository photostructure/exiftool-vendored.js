import { stat, Stats } from "fs"
import { blank } from "./String"

export async function isFileEmpty(path: string): Promise<boolean> {
  if (blank(path)) {
    throw new Error("isFileEmpty(): blank path")
  }

  // TODO: convert this to using fs/promises once node 12 is EOL (2022-04-30)
  try {
    const s = await new Promise<Stats>((res, rej) => {
      try {
        stat(path, (err, val) => (err == null ? res(val) : rej(err)))
      } catch (err) {
        rej(err)
      }
    })
    return s == null || s.size === 0
  } catch (err: any) {
    if (err.code === "ENOENT") return true
    else throw err
  }
}
