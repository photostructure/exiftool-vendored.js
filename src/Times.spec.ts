import { times } from "./Times";
import { expect } from "./_chai.spec";

describe("Times", () => {
  describe("times()", () => {
    it("returns the mapped result", () => {
      expect(times(5, String)).to.eql(["0", "1", "2", "3", "4"]);
    });
  });
});
