module.exports = {
  name: "exiftool-vendored",
  out: "./docs/",
  readme: "./README.md",
  includes: "./src",
  exclude: ["**/update/*", "**/*test*", "**/*spec*"],
  mode: "modules", // "file" doesn't work with Tags. :(
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeNotExported: true
}
