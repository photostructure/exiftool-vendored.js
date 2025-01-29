import { retryOnReject } from "./AsyncRetry";
import { expect } from "./_chai.spec";

describe("AsyncRetry", () => {
  it("returns simple passing thunk", async () => {
    expect(await retryOnReject(() => "hello", 0)).to.eql("hello");
  });
  it("rejects fail/pass thunk", async () => {
    const results = [new Error("boom"), 123];
    return expect(
      retryOnReject(() => {
        const r = results.shift();
        if (r != null && r instanceof Error) throw r;
        else return r;
      }, 0),
    ).to.be.rejectedWith(/boom/);
  });
  it("accepts fail/pass thunk if retries > 0", async () => {
    const results = [new Error("boom"), 123];
    return expect(
      retryOnReject(() => {
        const r = results.shift();
        if (r != null && r instanceof Error) throw r;
        else return r;
      }, 1),
    ).to.eventually.eql(123);
  });

  it("succeeds immediately with synchronous success", async () => {
    const result = await retryOnReject(() => "success", 3);
    expect(result).to.eql("success");
  });

  it("succeeds immediately with asynchronous success", async () => {
    const result = await retryOnReject(
      async () => Promise.resolve("async success"),
      3,
    );
    expect(result).to.eql("async success");
  });

  it("retries until success", async () => {
    let attempts = 0;
    const result = await retryOnReject(() => {
      attempts++;
      if (attempts < 3) {
        throw new Error("temporary failure");
      }
      return "eventual success";
    }, 3);

    expect(attempts).to.eql(3);
    expect(result).to.eql("eventual success");
  });

  it("fails after exhausting retries", async () => {
    let attempts = 0;
    const operation = retryOnReject(() => {
      attempts++;
      throw new Error("persistent failure");
    }, 2);

    await expect(operation).to.be.rejectedWith("persistent failure");
    expect(attempts).to.eql(3); // Initial + 2 retries
  });

  it("preserves error types", async () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = "CustomError";
      }
    }

    const operation = retryOnReject(() => {
      throw new CustomError("custom error");
    }, 1);

    try {
      await operation;
      expect.fail("Should have thrown");
    } catch (error: any) {
      expect(error).to.be.instanceOf(CustomError);
      expect(error.message).to.eql("custom error");
    }
  });

  it("handles async errors", async () => {
    let attempts = 0;
    const operation = retryOnReject(async () => {
      attempts++;
      return Promise.reject(new Error("async failure"));
    }, 2);

    await expect(operation).to.be.rejectedWith("async failure");
    expect(attempts).to.eql(3);
  });

  it("works with zero retries", async () => {
    let attempts = 0;
    const operation = retryOnReject(() => {
      attempts++;
      throw new Error("fail");
    }, 0);

    await expect(operation).to.be.rejectedWith("fail");
    expect(attempts).to.eql(1); // Only initial attempt
  });

  it("handles mixed sync/async successes", async () => {
    let attempts = 0;
    const result = await retryOnReject(async () => {
      attempts++;
      if (attempts === 1) return "sync";
      if (attempts === 2) return Promise.resolve("async");
      throw new Error("should not reach here");
    }, 2);

    expect(attempts).to.eql(1);
    expect(result).to.eql("sync");
  });

  it("handles null/undefined returns", async () => {
    const nullResult = await retryOnReject(() => null, 1);
    expect(nullResult).to.eql(null);

    const undefinedResult = await retryOnReject(() => undefined, 1);
    expect(undefinedResult).to.eql(undefined);
  });

  it("retries with increasing durations", async () => {
    const startTime = Date.now();
    let attempts = 0;

    try {
      await retryOnReject(async () => {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 50));
        throw new Error("retry");
      }, 2);
    } catch {
      const duration = Date.now() - startTime;
      expect(duration).to.be.gte(150); // 3 attempts * 50ms minimum
      expect(attempts).to.eql(3);
    }
  });
});
