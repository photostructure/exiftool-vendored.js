import path from "path"
import { exiftool } from "../ExifTool"
import { testDir, UnicodeTestMessage } from "../_chai.spec"

async function run() {
  await exiftool.write(path.join(testDir, "quotes.jpg"), {
    Title: UnicodeTestMessage,
  })
}

run().then(() => exiftool.end())
