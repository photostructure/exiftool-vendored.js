import { isWin32 } from "./IsWin32"
import { which } from "./Which"
import { expect } from "./_chai.spec"

if (!isWin32()) {
  describe("Which", () => {
    it("finds perl", async () => {
      const act = await which("perl")
      // macOS is expected to be `/usr/local/bin/perl` or
      // `/opt/homebrew/bin/perl`.

      // Most linux distros will use `/usr/bin/perl` or `/bin/perl`.
      expect([
        "/bin/perl",
        "/usr/bin/perl",
        "/usr/local/bin/perl",
        "/opt/homebrew/bin/perl",
      ]).to.include(act)
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
