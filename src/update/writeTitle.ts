import path from "path"
import { testDir, UnicodeTestMessage } from "../_chai.spec"
import { exiftool } from "../ExifTool"

async function run() {
  await exiftool.write(path.join(testDir, "quotes.jpg"), {
    Title: UnicodeTestMessage,
  })
}

run().then(() => exiftool.end())
