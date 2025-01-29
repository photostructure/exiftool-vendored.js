import * as _os from "node:os";
import { lazy } from "./Lazy";

export const isWin32 = lazy(() => _os.platform() === "win32");
