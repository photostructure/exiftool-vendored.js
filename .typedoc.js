module.exports = {
  name: "exiftool-vendored",
  out: "./docs/",
  readme: "./README.md",
  includes: "./src",
  gitRevision: "master", // < prevents docs from changing after every commit
  exclude: ["**/update/*", "**/*test*", "**/*spec*"],
  // mode: "file",
  excludePrivate: true,
  // excludeProtected: true,
  // excludeExternals: true,
  entryPoints: ["./src/ExifTool.ts", "./src/Tags.ts", "./src/BinaryExtractionTask.ts", "./src/ExifDate.ts", "./src/ExifDateTime.ts", "./src/ReadTask.ts", "./src/WriteTask.ts"],
  // entryPoints: ["./src"]
  // excludeNotExported: true
}
