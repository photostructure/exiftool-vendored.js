const globule = require("globule")
const exif = require("exiftool")
const process = require("process")

const dir = process.argv[2]
const files = globule.find(`${dir}/**/*.jpg`).slice(0, 1000)

if (files.length === 0) {
  console.error(`Please provide a directory with example images.`)
  console.error(`Usage: node ./index.js IMAGE_DIRECTORY`)
  process.exit(1)
} else {
  console.log("Reading " + files.length + " files...")
}

const errors = []

function prom(file) {
  return new Promise((resolve, reject) => {
    try {
      exif.metadata(file, (err, metadata) => {
        if (err) errors.push("failed to read " + file + ": " + err)
        resolve() // throw away
      })
    } catch (err) {
      errors.push("error raised from " + file + ": " + err)
      resolve()
    }
  })
}

const start = Date.now()

Promise.all(files.map(f => prom(f))).then(() => {
  const elapsedMs = Date.now() - start
  console.log(
    `exiftool: Parsing took ${elapsedMs}ms (${(
      elapsedMs / files.length
    ).toFixed(1)}ms / file)`
  )
  if (errors.length > 0) {
    console.log("exiftool had errors:", errors)
  }
})
