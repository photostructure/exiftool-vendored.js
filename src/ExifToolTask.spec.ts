import { expect } from "./_chai.spec";
import { ExifToolTask } from "./ExifToolTask";

describe("ExifToolTask.renderCommand()", () => {
  it("joins non-blank args with newlines and appends -execute", () => {
    const cmd = ExifToolTask.renderCommand(["-Artist=me", "file.jpg"]);
    expect(cmd).to.eql("-Artist=me\nfile.jpg\n-execute\n");
  });

  it("appends -ignoreMinorErrors when option set", () => {
    const cmd = ExifToolTask.renderCommand(["-Artist=me", "file.jpg"], {
      ignoreMinorErrors: true,
    });
    expect(cmd).to.eql("-Artist=me\nfile.jpg\n-ignoreMinorErrors\n-execute\n");
  });

  describe("defense-in-depth control-character check", () => {
    it("throws if any arg contains a newline", () => {
      expect(() =>
        ExifToolTask.renderCommand(["-Artist\n-o\n../exploit=x", "file.jpg"]),
      ).to.throw(/control character/);
    });

    it("throws if any arg contains a carriage return", () => {
      expect(() =>
        ExifToolTask.renderCommand(["-Artist\r=x", "file.jpg"]),
      ).to.throw(/control character/);
    });

    it("throws if any arg contains a NUL byte", () => {
      expect(() =>
        ExifToolTask.renderCommand(["-Artist\0=x", "file.jpg"]),
      ).to.throw(/control character/);
    });
  });
});
