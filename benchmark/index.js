const globule = require("globule");
const exif = require("exiftool");
const process = require("process");

const dir = process.argv[2];
const files = globule.find(`${dir}/**/*.jpg`).slice(0, 1000);

if (files.length === 0) {
  console.error(`Please provide a directory with example images.`);
  console.error(`Usage: node ./index.js IMAGE_DIRECTORY`);
  process.exit(1);
} else {
  console.log("Reading " + files.length + " files...");
}

async function run() {
  const start = Date.now();
  const errors = [];
  for (const file of files) {
    await new Promise(resolve => {
      try {
        exif.metadata(file, (err, metadata) => {
          if (err) errors.push("failed to read " + file + ": " + err);
          resolve();
        });
      } catch (err) {
        errors.push("error raised from " + file + ": " + err);
        resolve();
      }
    });
  }
  const elapsedMs = Date.now() - start;
  console.log(
    `exiftool: Parsing took ${elapsedMs}ms (${(
      elapsedMs / files.length
    ).toFixed(1)}ms / file)`
  );
  if (errors.length > 0) {
    console.log("exiftool had errors:", errors);
  }
}

run();
