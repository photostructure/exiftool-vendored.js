import { constants, existsSync } from "node:fs";
import { access } from "node:fs/promises";
import { basename, delimiter, isAbsolute, join } from "node:path";
import { env } from "node:process";
import { isWin32 } from "./IsWin32";
import { Maybe } from "./Maybe";
import { toS } from "./String";

export async function which(binaryOrPath: string): Promise<Maybe<string>> {
  if (isAbsolute(binaryOrPath) && (await canRX(binaryOrPath))) {
    return binaryOrPath;
  }
  const base = basename(binaryOrPath);
  for (const dir of toS(env.PATH).split(delimiter)) {
    const fullPath = join(dir, base);
    if (await canRX(fullPath)) {
      return fullPath;
    }
  }
  return;
}

async function canRX(fullpath: string): Promise<boolean> {
  if (isWin32()) return existsSync(fullpath);
  try {
    await access(fullpath, constants.R_OK | constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
