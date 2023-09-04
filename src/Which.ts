import { constants } from "node:fs"
import { access } from "node:fs/promises"
import { delimiter, join } from "node:path"
import { env } from "node:process"
import { Maybe } from "./Maybe"
import { toS } from "./String"

export async function which(binary: string): Promise<Maybe<string>> {
  for (const dir of toS(env.PATH).split(delimiter)) {
    const fullPath = join(dir, binary)
    try {
      await access(fullPath, constants.R_OK | constants.X_OK)
      return fullPath
    } catch {
      //
    }
  }
  return
}
