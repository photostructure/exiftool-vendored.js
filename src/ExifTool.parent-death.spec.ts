import { kill, pidExists } from "batch-cluster";
import child_process from "node:child_process";
import path from "node:path";
import process from "node:process";
import { exiftoolPath } from "./ExiftoolPath";
import { isWin32 } from "./IsWin32";
import { expect } from "./_chai.spec";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function beforeTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: () => string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message())), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function waitUntil(
  predicate: () => boolean,
  timeoutMs: number,
  delayMs = 25,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return true;
    await delay(delayMs);
  }
  return predicate();
}

/** A POSIX zombie is dead even though signal 0 still finds its PID. */
function pidIsRunning(pid: number): boolean {
  if (!pidExists(pid)) return false;
  if (isWin32()) return true;
  const result = child_process.spawnSync(
    "ps",
    ["-o", "stat=", "-p", String(pid)],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return false;
  return !result.stdout.trimStart().startsWith("Z");
}

describe("hard parent death", function () {
  it("lets ExifTool exit after its manager is force-killed", async function () {
    this.timeout(60_000);
    const executable =
      process.env.EXIFTOOL_PARENT_DEATH_TEST_PATH ?? (await exiftoolPath());
    const helperPath = path.join(__dirname, "ExifTool.parent-death-helper.js");
    const manager = child_process.spawn(
      process.execPath,
      [helperPath, executable],
      { detached: true },
    );
    let stdout = "";
    let stderr = "";
    let childPid: number | undefined;

    manager.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    manager.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    const managerClosed = new Promise<{
      code: number | null;
      signal: NodeJS.Signals | null;
    }>((resolve, reject) => {
      manager.once("close", (code, signal) => resolve({ code, signal }));
      manager.once("error", reject);
    });
    const ready = new Promise<number>((resolve, reject) => {
      const inspectOutput = () => {
        const match = /EXIFTOOL_PARENT_DEATH_READY (\{[^\n]+\})/.exec(stdout);
        if (match?.[1] != null) {
          const parsed = JSON.parse(match[1]) as { pid: number };
          resolve(parsed.pid);
        }
      };
      manager.stdout.on("data", inspectOutput);
      manager.once("error", reject);
      manager.once("close", (code, signal) => {
        reject(
          new Error(
            `manager exited before ready: code=${code} signal=${signal} stdout=${stdout} stderr=${stderr}`,
          ),
        );
      });
    });

    try {
      childPid = await beforeTimeout(
        ready,
        30_000,
        () => `manager did not become ready: stdout=${stdout} stderr=${stderr}`,
      );
      expect(pidIsRunning(childPid)).to.eql(
        true,
        `ExifTool ${childPid} should be live before manager death`,
      );

      expect(kill(manager.pid, true)).to.eql(
        true,
        `manager ${manager.pid} should accept a force kill`,
      );
      await beforeTimeout(
        managerClosed,
        10_000,
        () => `manager ${manager.pid} did not exit after force kill`,
      );

      expect(await waitUntil(() => !pidIsRunning(childPid!), 5_000)).to.eql(
        true,
        `ExifTool ${childPid} stayed alive after its stdin channel closed`,
      );
    } finally {
      if (childPid != null && pidIsRunning(childPid)) {
        kill(childPid, true);
        await waitUntil(() => !pidIsRunning(childPid!), 5_000);
      }
      kill(manager.pid, true);
    }
  });
});
