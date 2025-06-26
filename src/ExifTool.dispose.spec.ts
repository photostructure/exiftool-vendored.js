import { expect } from "chai";
import { ExifTool } from "./ExifTool";

describe("ExifTool disposal", () => {
  it("should support Symbol.dispose", () => {
    const et = new ExifTool();
    expect(et[Symbol.dispose]).to.be.a("function");
  });

  it("should support Symbol.asyncDispose", () => {
    const et = new ExifTool();
    expect(et[Symbol.asyncDispose]).to.be.a("function");
  });

  it("should dispose synchronously without throwing", () => {
    const et = new ExifTool();
    expect(() => et[Symbol.dispose]()).to.not.throw();
    // The sync disposal calls end() immediately, so it should be marked as ended
    // even though the actual cleanup happens asynchronously
    expect(et.ended).to.be.true;
  });

  it("should dispose asynchronously", async () => {
    const et = new ExifTool();
    await et[Symbol.asyncDispose]();
    expect(et.ended).to.be.true;
  });

  it("should be idempotent", async () => {
    const et = new ExifTool();
    await et[Symbol.asyncDispose]();
    expect(et.ended).to.be.true;
    // Should not throw on second call
    await et[Symbol.asyncDispose]();
    expect(et.ended).to.be.true;
  });

  it("should handle timeout in async disposal gracefully", async () => {
    const et = new ExifTool();

    // Mock a slow .end() method by stubbing it
    const originalEnd = et.end.bind(et);
    let endCalled = false;
    let forcefulEndCalled = false;

    (et as any).end = async (graceful: boolean) => {
      if (graceful) {
        endCalled = true;
        // Simulate a hanging cleanup that takes longer than the timeout
        await new Promise((resolve) => setTimeout(resolve, 6000));
        return originalEnd(false);
      } else {
        forcefulEndCalled = true;
        // Forceful cleanup should work quickly
        return originalEnd(false);
      }
    };

    // The async dispose should timeout and attempt forceful cleanup
    await et[Symbol.asyncDispose]();

    expect(endCalled).to.be.true;
    expect(forcefulEndCalled).to.be.true;
    expect(et.ended).to.be.true;
  }).timeout(8000);

  it("should actually stop child processes on disposal", async () => {
    const et = new ExifTool({ maxProcs: 2 });

    // Force creation of child processes by doing some work
    await et.version();
    await et.version(); // Second call to potentially spawn another process

    // Verify we have running processes
    const pidsBeforeDisposal = et.pids;
    expect(pidsBeforeDisposal.length).to.be.greaterThan(0);

    // Dispose and verify processes are cleaned up
    await et[Symbol.asyncDispose]();

    const pidsAfterDisposal = et.pids;
    expect(pidsAfterDisposal).to.eql([]);
    expect(et.ended).to.be.true;
  });

  it("should mark as ended immediately in sync disposal", () => {
    const et = new ExifTool();
    expect(et.ended).to.be.false;

    et[Symbol.dispose]();

    // Should be marked as ended immediately, even though cleanup is async
    expect(et.ended).to.be.true;
  });

  // This test demonstrates the usage with TypeScript 5.2+
  // Uncomment when using TypeScript 5.2+ with appropriate config
  /*
  it("should work with using keyword", async () => {
    let disposed = false;
    {
      using et = new ExifTool();
      expect(et.ended).to.be.false;
    }
    // et.end() should have been called automatically
  });

  it("should work with await using keyword", async () => {
    let ended = false;
    {
      await using et = new ExifTool();
      expect(et.ended).to.be.false;
      const version = await et.version();
      expect(version).to.match(/^\d+\.\d+/);
    }
    // et.end() should have been called automatically
  });
  */
});
