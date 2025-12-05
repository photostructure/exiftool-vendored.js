/**
 * Regression tests for https://github.com/photostructure/exiftool-vendored.js/issues/312
 *
 * Issue: "BatchCluster has ended, cannot enqueue" errors when processing large
 * videos with the `-ee` flag under high concurrency.
 *
 * Root cause (batch-cluster <= 15.x):
 * - Task timeouts were incorrectly counted as "startup failures"
 * - When too many "failures" occurred within a minute, the cluster would
 *   fatally shut down via `maxReasonableProcessFailuresPerMinute`
 * - Subsequent enqueue attempts would fail with "BatchCluster has ended"
 *
 * The fix in batch-cluster 16.x:
 * 1. Startup task failures are now correctly identified by taskId, not taskCount
 * 2. The `maxReasonableProcessFailuresPerMinute` option was removed entirely
 * 3. The `fatalError` event was removed - clusters never auto-shutdown
 * 4. Default `taskTimeoutMillis` changed to 0 (disabled) to prevent
 *    legitimate long-running tasks from timing out
 */

import * as _path from "node:path";
import { ExifTool } from "./ExifTool";
import { end, expect, measureSpawnTime } from "./_chai.spec";

describe("Issue #312: BatchCluster survives task timeouts", function () {
  this.timeout(120_000); // Allow plenty of time for slow CI
  this.slow(10_000);

  const img = _path.join(__dirname, "..", "test", "img.jpg");

  // Measure spawn time once before all tests
  let baselineSpawnMs: number;
  before(async () => {
    baselineSpawnMs = await measureSpawnTime();
  });

  describe("cluster survives multiple task timeouts", function () {
    let et: ExifTool;

    afterEach(() => end(et));

    it("should NOT shut down when many tasks timeout", async function () {
      // Use a timeout shorter than spawn time to guarantee timeouts
      // but not so short that nothing can ever complete
      const shortTimeout = Math.max(10, Math.floor(baselineSpawnMs / 4));

      et = new ExifTool({
        maxProcs: 2,
        taskTimeoutMillis: shortTimeout,
        // Disable retries so timeouts happen quickly
        taskRetries: 0,
        // Short spawn delay for faster testing
        minDelayBetweenSpawnMillis: Math.max(
          5,
          Math.floor(baselineSpawnMs / 10),
        ),
      });

      const timeoutErrors: Error[] = [];

      // Submit many tasks that will timeout
      // In old versions, these would be counted as "startup failures"
      // and eventually trigger cluster shutdown
      const timeoutPromises: Promise<void>[] = [];
      for (let i = 0; i < 10; i++) {
        timeoutPromises.push(
          et.read(img).then(
            () => {
              // Success is fine too (fast machine)
            },
            (err: Error) => {
              timeoutErrors.push(err);
            },
          ),
        );
      }

      await Promise.all(timeoutPromises);

      // Key assertion: cluster should NOT have ended
      expect(et.ended).to.eql(
        false,
        "cluster should NOT have ended after task timeouts",
      );

      // Verify we did get some timeout errors (proving timeouts occurred)
      expect(timeoutErrors.length).to.be.gte(1, "expected some timeout errors");

      // Now close the cluster and create a new one with reasonable timeout
      await et.end();

      // Create new instance with generous timeout based on measured spawn time
      const safeTimeout = Math.max(30_000, baselineSpawnMs * 20);
      et = new ExifTool({
        maxProcs: 1,
        taskTimeoutMillis: safeTimeout,
        spawnTimeoutMillis: safeTimeout,
      });

      // This should work - proves cluster lifecycle is healthy
      const result = await et.read(img);
      expect(result.SourceFile).to.include("img.jpg");
    });

    it("should continue processing normally", async function () {
      // This test verifies normal operation works with adaptive timeouts
      const safeTimeout = Math.max(30_000, baselineSpawnMs * 20);

      et = new ExifTool({
        maxProcs: 1,
        taskTimeoutMillis: safeTimeout,
        spawnTimeoutMillis: safeTimeout,
        minDelayBetweenSpawnMillis: Math.max(
          10,
          Math.floor(baselineSpawnMs / 5),
        ),
      });

      // First task should succeed (spawns a process)
      const result1 = await et.read(img);
      expect(result1.SourceFile).to.include("img.jpg");

      // Cluster should still be alive
      expect(et.ended).to.eql(false);

      // Continue processing
      const result2 = await et.read(img);
      expect(result2.SourceFile).to.include("img.jpg");

      expect(et.ended).to.eql(false, "cluster should still be alive");
    });
  });

  describe("enqueueTask rejection does not leave task in queue", function () {
    it("rejected task should not be added to pending queue", async function () {
      const et = new ExifTool({ maxProcs: 1 });

      // End the cluster immediately
      await et.end();
      expect(et.ended).to.eql(true);

      // Try to enqueue a task - it should be rejected
      try {
        await et.read(img);
        expect.fail("should have rejected");
      } catch (err) {
        expect(String(err)).to.include("has ended");
      }

      // The task should NOT be in the pending queue after rejection
      expect(et.batchCluster.pendingTaskCount).to.eql(
        0,
        "rejected task should not be in pending queue",
      );
    });
  });

  describe("high concurrency with timeout-inducing workload", function () {
    let et: ExifTool;

    afterEach(() => end(et));

    it("should handle bursty load without cluster shutdown", async function () {
      // Use adaptive short timeout to trigger timeouts
      const shortTimeout = Math.max(10, Math.floor(baselineSpawnMs / 4));
      const maxProcs = 4;

      et = new ExifTool({
        maxProcs,
        taskTimeoutMillis: shortTimeout,
        taskRetries: 0,
        minDelayBetweenSpawnMillis: 0, // Spawn quickly
      });

      const results: { success: boolean; error?: string }[] = [];

      // Burst of concurrent requests (like the original issue with video processing)
      const concurrentBatch = async () => {
        const promises = [];
        for (let i = 0; i < maxProcs * 2; i++) {
          promises.push(
            et
              .read(img)
              .then(() => ({ success: true }))
              .catch((err: Error) => ({
                success: false,
                error: String(err),
              })),
          );
        }
        return Promise.all(promises);
      };

      // Run multiple batches
      for (let batch = 0; batch < 3; batch++) {
        const batchResults = await concurrentBatch();
        results.push(...batchResults);

        // Key check: cluster should NOT have ended between batches
        expect(et.ended).to.eql(
          false,
          `cluster ended after batch ${batch + 1}`,
        );
      }

      // Check that we didn't get "BatchCluster has ended" errors
      const endedErrors = results.filter(
        (r) => !r.success && r.error?.includes("has ended"),
      );
      expect(endedErrors).to.eql([], "should not have any 'has ended' errors");

      // Clean up this instance with short timeouts
      await et.end();

      // Create a fresh instance with adaptive safe timeout
      const safeTimeout = Math.max(30_000, baselineSpawnMs * 20);
      et = new ExifTool({
        maxProcs: 1,
        taskTimeoutMillis: safeTimeout,
        spawnTimeoutMillis: safeTimeout,
      });
      const finalResult = await et.read(img);
      expect(finalResult.SourceFile).to.include("img.jpg");
    });
  });
});
