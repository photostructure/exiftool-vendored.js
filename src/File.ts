import { stat, Stats } from "node:fs";
import { normalize } from "node:path";
import { lazy } from "./Lazy";
import { blank } from "./String";

export async function isFileEmpty(path: string): Promise<boolean> {
  if (blank(path)) {
    throw new Error("isFileEmpty(): blank path");
  }

  // TODO: convert this to using fs/promises once node 12 is EOL (2022-04-30)
  try {
    const s = await new Promise<Stats>((res, rej) => {
      try {
        stat(path, (err, val) => (err == null ? res(val) : rej(err)));
      } catch (err) {
        rej(err);
      }
    });
    return s == null || s.size === 0;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "ENOENT"
    )
      return true;
    else throw err;
  }
}

export const isPlatformCaseSensitive = lazy(
  () => process.platform !== "win32" && process.platform !== "darwin",
);

export function compareFilePaths(a: string, b: string): boolean {
  const aNorm = normalize(a);
  const bNorm = normalize(b);
  return isPlatformCaseSensitive()
    ? aNorm === bNorm
    : aNorm.localeCompare(bNorm, undefined, { sensitivity: "base" }) === 0;
}
