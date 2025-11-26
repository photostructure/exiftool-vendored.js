import { stat } from "node:fs/promises";
import { normalize } from "node:path";
import { lazy } from "./Lazy";
import { blank } from "./String";

/**
 * Checks if a file is empty or does not exist.
 * @param path - the file path to check
 * @returns true if the file is empty or does not exist, false otherwise
 * @throws if path is blank or if a non-ENOENT error occurs
 */
export async function isFileEmpty(path: string): Promise<boolean> {
  if (blank(path)) {
    throw new Error("isFileEmpty(): blank path");
  }

  try {
    const s = await stat(path);
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

/**
 * Returns true if the current platform has case-sensitive file paths.
 */
export const isPlatformCaseSensitive = lazy(
  () => process.platform !== "win32" && process.platform !== "darwin",
);

/**
 * Compares two file paths for equality, respecting platform case sensitivity.
 * @param a - first file path
 * @param b - second file path
 * @returns true if paths refer to the same file
 */
export function compareFilePaths(a: string, b: string): boolean {
  const aNorm = normalize(a);
  const bNorm = normalize(b);
  return isPlatformCaseSensitive()
    ? aNorm === bNorm
    : aNorm.localeCompare(bNorm, undefined, { sensitivity: "base" }) === 0;
}
