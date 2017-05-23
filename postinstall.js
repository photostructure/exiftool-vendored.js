var process = require("process")
var isWin32 = process.platform === "win32"

try {
  require("exiftool-vendored." + (isWin32 ? "exe" : "pl"))
} catch (err) {
  throw new Error("Vendored ExifTool does not installed")
}
