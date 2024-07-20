module.exports = {
  name: "exiftool-vendored",
  out: "./docs/",
  readme: "./README.md",
  includes: "./src",
  gitRevision: "main", // < prevents docs from changing after every commit
  exclude: ["**/update/*", "**/*test*", "**/*spec*"],
  excludePrivate: true,
  entryPoints: [
    "./src/ExifTool.ts",
  ]
}
