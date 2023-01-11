import * as _os from "os"
import { lazy } from "./Lazy"

export const isWin32 = lazy(() => _os.platform() === "win32")
