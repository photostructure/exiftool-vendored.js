// By requiring ExifTool, we'll be verifying that the vendored ExifTool
// is also properly installed.

try {
  require("./ExifTool")
} catch (err) {
  console.error("Installation failed: " + err)
  require("process").exit(1)
}
