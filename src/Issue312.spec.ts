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

import { ExifTool } from "./ExifTool";
import { end, expect } from "./_chai.spec";
import * as _path from "node:path";

describe("Issue #312: BatchCluster survives task timeouts", function () {
  this.timeout(60_000);
  this.slow(10_000);

  const img = _path.join(__dirname, "..", "test", "img.jpg");

  describe("cluster survives multiple task timeouts", function () {
    let et: ExifTool;

    afterEach(() => end(et));

    it("should NOT shut down when many tasks timeout", async function () {
      // Configure ExifTool with a very short task timeout to trigger timeouts
      const taskTimeoutMillis = 50; // Very short - will cause timeouts
      et = new ExifTool({
        maxProcs: 2,
        taskTimeoutMillis,
        // Disable retries so timeouts happen quickly
        taskRetries: 0,
        // Short spawn delay for faster testing
        minDelayBetweenSpawnMillis: 10,
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
              // Success is fine too
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

      // Create new instance with proper timeout
      et = new ExifTool({
        maxProcs: 1,
        taskTimeoutMillis: 30_000,
      });

      // This should work - proves cluster lifecycle is healthy
      const result = await et.read(img);
      expect(result.SourceFile).to.include("img.jpg");
    });

    it("should continue processing after spawn failures", async function () {
      // This test verifies that the cluster recovers from spawn failures
      // In old versions, too many spawn failures would trigger fatalError

      et = new ExifTool({
        maxProcs: 1,
        taskTimeoutMillis: 10_000,
        // Very short spawn timeout to trigger startup failures
        spawnTimeoutMillis: 100,
        minDelayBetweenSpawnMillis: 10,
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
      // Simulate the original issue: high concurrency + short timeouts
      const maxProcs = 4;
      et = new ExifTool({
        maxProcs,
        taskTimeoutMillis: 100, // Very short
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

      // Verify cluster is still functional
      et.options.taskTimeoutMillis = 30_000;
      const finalResult = await et.read(img);
      expect(finalResult.SourceFile).to.include("img.jpg");

      // Check that we didn't get "BatchCluster has ended" errors
      const endedErrors = results.filter(
        (r) => !r.success && r.error?.includes("has ended"),
      );
      expect(endedErrors).to.eql(
        [],
        "should not have any 'has ended' errors",
      );
    });
  });
});
