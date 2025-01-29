import * as _os from "node:os";

export const DefaultMaxProcs = Math.max(1, Math.floor(_os.cpus().length / 4));
