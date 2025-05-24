import { expect } from "chai";
import { strEnum, StrEnumKeys } from "./StrEnum";

describe("StrEnum", () => {
  const Examples = strEnum("a", "b", "c");
  // TypeScript typing verification:
  type Example = StrEnumKeys<typeof Examples>;

  it(".values", () => {
    const expected: Example[] = ["a", "b", "c"];
    expect(Examples.values).to.eql(expected);
  });

  const fixtures = [
    { v: null, idx: undefined, exp: false },
    { v: undefined, idx: undefined, exp: false },
    { v: "", idx: undefined, exp: false },
    { v: "a", idx: 0, exp: true },
    { v: "b", idx: 1, exp: true },
    { v: "c", idx: 2, exp: true },
    { v: "d", idx: undefined, exp: false },
  ];

  for (const { v, exp } of fixtures) {
    it(`.has(${v}) -> ${exp}`, () => {
      expect(Examples.has(v)).to.eql(exp);
    });
    it(`.includes(${v}) -> ${exp}`, () => {
      expect(Examples.includes(v)).to.eql(exp);
    });
    it(`.getCI(${v?.toUpperCase()}) -> ${exp}`, () => {
      expect(Examples.getCI(v?.toUpperCase())).to.eql(exp ? v : undefined);
    });
  }
  for (const { v, idx } of fixtures) {
    it(`.indexOf(${v}) -> ${idx}`, () => {
      expect(Examples.indexOf(v)).to.eql(idx);
    });
  }
  for (const { v, exp } of fixtures) {
    it(`.toValid(${v}) -> ${exp ? v : "undefined"}`, () => {
      expect(Examples.toValid(v)).to.eql(exp ? v : undefined);
      expect(Examples.toValid(v) ?? "default").to.eql(exp ? v : "default");
    });
    it(`.firstValid(${v}) -> ${exp ? v : "undefined"}`, () => {
      expect(Examples.firstValid()).to.eql(undefined);
      expect(Examples.firstValid(v, "invalid")).to.eql(exp ? v : undefined);
      expect(Examples.firstValid("invalid", v)).to.eql(exp ? v : undefined);
      expect(Examples.firstValid("invalid", v) ?? "default").to.eql(
        exp ? v : "default",
      );
    });
  }
  for (const { v, exp } of fixtures) {
    const f = (ea: any) => `f(${ea})`;
    const expF = exp ? f(v) : undefined;
    it(`.map(${v}) -> ${expF}`, () => {
      expect(Examples.mapValid(v, f)).to.eql(expF);
    });
  }
  it(".omit()", () => {
    // type assertions:
    {
      const s: "c"[] = Examples.omit("a", "b");
      expect(s).to.eql(["c"]);
    }
    {
      const s: ("a" | "c")[] = Examples.omit("b");
      expect(s).to.eql(["a", "c"]);
    }
    {
      const s: never[] = Examples.omit("a", "b", "c");
      expect(s).to.eql([]);
    }
  });

  it(".pick()", () => {
    // type assertions:
    {
      const s: "a"[] = Examples.pick("a");
      expect(s).to.eql(["a"]);
    }
    {
      const s: ("a" | "c")[] = Examples.pick("a", "c");
      expect(s).to.eql(["a", "c"]);
    }
    {
      const s: ("a" | "b" | "c")[] = Examples.pick("a", "b", "c");
      expect(s).to.eql(["a", "b", "c"]);
    }
    {
      const s: never[] = Examples.pick();
      expect(s).to.eql([]);
    }
  });

  it(".ordinal()", () => {
    for (const { v, idx } of fixtures) {
      const expected = idx ?? Examples.values.length;
      expect(Examples.ordinal(v)).to.eql(expected);
    }
  });

  describe(".cmp()", () => {
    it("compares two valid enum values", () => {
      expect(Examples.cmp("a", "b")).to.eql(-1);
      expect(Examples.cmp("b", "a")).to.eql(1);
      expect(Examples.cmp("b", "b")).to.eql(0);
    });

    it("returns undefined for invalid values", () => {
      expect(Examples.cmp("a", "d")).to.eql(undefined);
      expect(Examples.cmp("d", "a")).to.eql(undefined);
      expect(Examples.cmp(null, "a")).to.eql(undefined);
      expect(Examples.cmp("a", null)).to.eql(undefined);
    });
  });

  describe(".lt()", () => {
    it("compares two valid enum values", () => {
      expect(Examples.lt("a", "b")).to.eql(true);
      expect(Examples.lt("b", "a")).to.eql(false);
      expect(Examples.lt("a", "a")).to.eql(false);
      expect(Examples.lt("c", "b")).to.eql(false);
      expect(Examples.lt("b", "c")).to.eql(true);
    });
  });

  describe(".next()", () => {
    it("returns the same value for valid inputs", () => {
      expect(Examples.next("a")).to.eql("a");
      expect(Examples.next("b")).to.eql("b");
    });

    it("returns undefined for invalid inputs", () => {
      expect(Examples.next("d")).to.eql(undefined);
      expect(Examples.next(null)).to.eql(undefined);
      expect(Examples.next(undefined)).to.eql(undefined);
    });
  });

  describe(".toReversed()", () => {
    it("returns a new StrEnum with values in reversed order", () => {
      const reversed = Examples.toReversed();
      expect(reversed.values).to.eql(["c", "b", "a"]);

      // Verify the returned object is a proper StrEnum
      expect(reversed.has("b")).to.eql(true);
      expect(reversed.indexOf("c")).to.eql(0);
      expect(reversed.indexOf("b")).to.eql(1);
      expect(reversed.indexOf("a")).to.eql(2);
    });
  });
});
