import * as _os from "node:os";
import { isFunction } from "./Object";

function maxCpus() {
  // https://nodejs.org/api/os.html#osavailableparallelism was added in node
  // 18.14, but people may still be running archaic versions of node.

  return Math.max(
    1,
    isFunction(_os.availableParallelism)
      ? _os.availableParallelism()
      : _os.cpus().length,
  );
}

export const DefaultMaxProcs = Math.ceil(maxCpus() / 4);
