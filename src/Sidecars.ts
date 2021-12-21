import { parse } from "path"

export const SidecarExts = [".exif", ".exv", ".mie", ".xmp"]

export function isSidecarExt(filename: string) {
  const p = parse(filename)
  return SidecarExts.includes(String(p.ext).toLowerCase())
}
