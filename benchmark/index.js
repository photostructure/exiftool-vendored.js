const globule = require('globule');
const exif = require('exiftool');
const process = require('process');

const root = process.argv[2];
const files = globule.find(`${root}/**/*.jpg`);

if (files.length === 0) {
  console.error(`No files found in ${root}`);
  process.exit(1);
} else {
  console.log("Reading " + files.length + " files...");
}

function prom(file) {
  return new Promise((resolve, reject) => {
    exif.metadata(file, (err, metadata) => {
      process.stdout.write('.');
      if (err) reject(err);
      else resolve(); // throw away
    });
  });
}

const start = Date.now();

Promise.all(files.map(f => prom(f))).then(() => {
  const elapsedMs = Date.now() - start;
  console.log(`Parsing took ${elapsedMs}ms (${(elapsedMs / files.length).toFixed(1)}ms / file)`);
});
