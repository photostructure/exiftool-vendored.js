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

describe("ExifToolTask image data hash progress", () => {
  class ProgressTestTask extends ExifToolTask<string> {
    constructor() {
      super(["-ImageDataHash", "file.jpg"]);
    }
    protected parse(input: string): string {
      return input;
    }
  }

  it("reports each increase in bytes hashed, and only increases", () => {
    const task = new ProgressTestTask();
    const seen: number[] = [];
    task.onProgress = (bytes) => seen.push(bytes);
    task.onStderr("{progress:10}\n{progress:10}\n{progress:5}\n");
    task.onStderr("{progress:20}\n");
    expect(seen).to.eql([10, 20]);
  });

  it("resets the task timeout for each increase", () => {
    const task = new ProgressTestTask();
    let resets = 0;
    task.resetTimeout = () => {
      resets++;
      return true;
    };
    task.onStderr("{progress:10}\n{progress:10}\n{progress:30}\n");
    expect(resets).to.eql(2);
  });

  it("keeps every other stderr line", () => {
    expect(
      ExifToolTask.withoutProgressLines(
        "{progress:10}\nWarning: odd\r\n{progress:20}\r\nError: bad\n",
      ),
    ).to.eql({ bytes: [10, 20], rest: "Warning: odd\r\nError: bad\n" });
    expect(ExifToolTask.withoutProgressLines("Warning: odd\n")).to.eql({
      bytes: [],
      rest: "Warning: odd\n",
    });
  });
});
