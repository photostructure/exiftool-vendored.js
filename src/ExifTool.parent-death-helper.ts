/**
 * Subprocess manager for the real ExifTool hard-parent-death regression.
 *
 * The outer spec waits until this process has established a stay-open session,
 * records the exact ExifTool PID, and then force-kills this manager without
 * allowing any JavaScript cleanup to run.
 */
import process from "node:process";
import timers from "node:timers";
import { ExifTool } from "./ExifTool";

let et: ExifTool | undefined;

async function main() {
  const exiftoolPath = process.argv[2];
  if (exiftoolPath == null) throw new Error("expected an ExifTool path");

  et = new ExifTool({ exiftoolPath, maxProcs: 1 });
  const version = await et.version();
  const pids = et.pids;
  if (pids.length !== 1) {
    throw new Error(
      `expected one live ExifTool, found ${JSON.stringify(pids)}`,
    );
  }

  process.stdout.write(
    `EXIFTOOL_PARENT_DEATH_READY ${JSON.stringify({ pid: pids[0], version })}\n`,
  );
  // Hold the event loop open for the spec's force-kill, but never outlive it:
  // the spec spawns this manager detached, so it survives a Ctrl-C aimed at the
  // test runner. An unbounded keep-alive would leak exactly the orphaned
  // manager/ExifTool pair that this test exists to prevent.
  // eslint-disable-next-line n/no-process-exit -- this child process reports to ExifTool.parent-death.spec.ts through its exit code
  timers.setTimeout(() => process.exit(3), 120_000);
}

main().catch(async (err: unknown) => {
  await et?.end(false);
  process.stderr.write(String(err) + "\n");
  // eslint-disable-next-line n/no-process-exit -- see above
  process.exit(1);
});
