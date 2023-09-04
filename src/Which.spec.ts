import { isWin32 } from "./IsWin32"
import { which } from "./Which"
import { expect } from "./_chai.spec"

if (!isWin32()) {
  describe("Which", () => {
    it("finds perl", async () => {
      const act = await which("perl")
      // macOS is `/usr/local/bin/perl`. Most linux distros will use
      // `/usr/bin/perl`, but could be `/bin/perl` and still be valid.
      expect(act).to.match(/^(\/usr(\/local)?)?\/bin\/perl$/)
    })
    it("finds node", async () => {
      const act = await which("node")
      expect(act).to.match(/.\/node$/)
    })
    it("rejects non-existent tool", async () => {
      const act = await which("no-such-tool-exists-1234567890")
      expect(act).to.eql(undefined)
    })
  })
}
