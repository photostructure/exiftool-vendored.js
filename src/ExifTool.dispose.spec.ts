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

  it("should request forceful cleanup after an async disposal timeout", async () => {
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
        // Model a forceful cleanup request that settles quickly
        return originalEnd(false);
      }
    };

    // The async disposer should request forceful cleanup after its timeout
    await et[Symbol.asyncDispose]();

    expect(endCalled).to.be.true;
    expect(forcefulEndCalled).to.be.true;
    expect(et.ended).to.be.true;
  }).timeout(8000);

  it("should log a rejected forceful cleanup request after a sync disposal timeout", async () => {
    const errorLogs: unknown[][] = [];
    const noop = (): void => undefined;
    const et = new ExifTool({
      disposalTimeoutMs: 10,
      logger: () => ({
        trace: noop,
        debug: noop,
        info: noop,
        warn: noop,
        error: (...args: unknown[]) => errorLogs.push(args),
      }),
    });

    // Hang graceful cleanup so the disposal timeout fires
    const originalEnd = et.end.bind(et);
    let releaseEnd = noop;
    (et as any).end = () =>
      new Promise<void>((resolve) => (releaseEnd = resolve));

    const forcefulError = new Error("forceful cleanup failed");
    let onCloseChildProcesses = noop;
    const closeChildProcessesCalled = new Promise<void>(
      (resolve) => (onCloseChildProcesses = resolve),
    );
    et.batchCluster.closeChildProcesses = () => {
      onCloseChildProcesses();
      return Promise.reject(forcefulError);
    };

    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on("unhandledRejection", onUnhandled);
    try {
      et[Symbol.dispose]();
      await closeChildProcessesCalled;
      // Node emits unhandledRejection before the next macrotask runs
      await new Promise((resolve) => setImmediate(resolve));

      expect(unhandled).to.eql([]);
      expect(errorLogs).to.deep.include([
        "Error while requesting forceful child process cleanup during sync disposal:",
        forcefulError,
      ]);
    } finally {
      process.off("unhandledRejection", onUnhandled);
      releaseEnd();
      await originalEnd(false);
    }
  });

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
  it("should work with using keyword", async () => {
    let _: any; // < to hold reference outside using block
    {
      using et = new ExifTool();
      _ = et;
      expect(et.ended).to.be.false;
    }
    expect(_.ended).to.be.true;
  });

  it("should work with await using keyword", async () => {
    let _: any; // < to hold reference outside using block
    {
      await using et = new ExifTool();
      _ = et;
      expect(et.ended).to.be.false;
      const version = await et.version();
      expect(version).to.match(/^\d+\.\d+/);
    }
    expect(_.ended).to.be.true;
  });
});
