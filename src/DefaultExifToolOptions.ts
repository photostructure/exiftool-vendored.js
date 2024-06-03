import * as bc from "batch-cluster"
import { debuglog } from "node:util"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { DefaultExiftoolArgs } from "./DefaultExiftoolArgs"
import { DefaultMaxProcs } from "./DefaultMaxProcs"
import { ExifToolOptions } from "./ExifToolOptions"
import { exiftoolPath } from "./ExiftoolPath"
import { geoTz } from "./GeoTz"
import { isWin32 } from "./IsWin32"
import { Omit } from "./Omit"
import { VersionTask } from "./VersionTask"

const _debuglog = debuglog("exiftool-vendored")
function noop() {}

export const ConsoleLogger: bc.Logger = {
  trace: noop,
  debug: _debuglog,
  info: _debuglog,
  warn: console.warn,
  error: console.error,
}

function logger(): bc.Logger {
  return debuglog("exiftool-vendored").enabled ? ConsoleLogger : bc.NoLogger
}

/**
 * Default values for `ExifToolOptions`, except for `processFactory` (which is
 * created by the ExifTool constructor)
 */
export const DefaultExifToolOptions: Omit<
  ExifToolOptions,
  "processFactory" | "ignoreShebang"
> = Object.freeze({
  ...new bc.BatchClusterOptions(),
  maxProcs: DefaultMaxProcs,
  maxTasksPerProcess: 500,
  spawnTimeoutMillis: 30000,
  // see https://github.com/photostructure/exiftool-vendored.js/issues/34 :
  taskTimeoutMillis: 20000,
  onIdleIntervalMillis: 2000,
  taskRetries: 1,
  exiftoolPath,
  exiftoolArgs: DefaultExiftoolArgs,
  exiftoolEnv: {},
  checkPerl: !isWin32(),
  pass: "{ready}",
  fail: "{ready}",
  exitCommand: "-stay_open\nFalse\n",
  versionCommand: new VersionTask().command,
  healthCheckIntervalMillis: 30000,
  healthCheckCommand: "-ver\n-execute\n",

  backfillTimezones: true,
  defaultVideosToUTC: true,
  geoTz: geoTz,
  geolocation: false,
  ignoreZeroZeroLatLon: true,
  ignoreMinorErrors: true,
  imageHashType: false,
  includeImageDataMD5: undefined,
  inferTimezoneFromDatestamps: false, // to retain prior behavior
  inferTimezoneFromDatestampTags: [...CapturedAtTagNames],
  logger,
  numericTags: [
    "*Duration*",
    "GPSAltitude",
    "GPSLatitude",
    "GPSLongitude",
    "GPSPosition",
    "Orientation",
  ],
  useMWG: false,
  struct: 1,
})
