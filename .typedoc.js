module.exports = {
  name: "exiftool-vendored",
  out: "./docs/",
  readme: "./README.md",
  includes: "./src",
  gitRevision: "master", // < prevents docs from changing after every commit
  exclude: ["**/update/*", "**/*test*", "**/*spec*"],
  mode: "file", 
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeNotExported: true
}
