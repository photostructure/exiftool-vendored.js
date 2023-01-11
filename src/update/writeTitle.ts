import { exiftool } from "../ExifTool"
import { testDir, UnicodeTestMessage } from "../_chai.spec"
import path from "path"

async function run() {
  await exiftool.write(path.join(testDir, "quotes.jpg"), {
    Title: UnicodeTestMessage,
  })
}

run().then(() => exiftool.end())
