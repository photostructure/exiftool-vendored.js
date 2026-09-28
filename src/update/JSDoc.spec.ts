import { expect } from "../_chai.spec";
import { escapeJSDoc } from "./JSDoc";

describe("escapeJSDoc", () => {
  for (const { desc, input, expected } of [
    {
      desc: "leaves text without a comment terminator unchanged",
      input: `"Canon * EOS / 5D"`,
      expected: `"Canon * EOS / 5D"`,
    },
    {
      desc: "escapes a comment terminator",
      input: `"Canon */ process.exit(1); interface Tags { /*"`,
      expected: `"Canon *\\/ process.exit(1); interface Tags { /*"`,
    },
    {
      desc: "escapes every comment terminator",
      input: `*/ **/ */`,
      expected: `*\\/ **\\/ *\\/`,
    },
  ]) {
    it(desc, () => {
      const actual = escapeJSDoc(input);
      expect(actual).to.equal(expected);
      expect(actual).to.not.include("*/");
    });
  }
});
