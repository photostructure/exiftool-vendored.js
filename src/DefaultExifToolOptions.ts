import * as bc from "batch-cluster"
import { DefaultExiftoolArgs } from "./DefaultExiftoolArgs"
import { DefaultMaxProcs } from "./DefaultMaxProcs"
import { ExifToolOptions } from "./ExifToolOptions"
import { DefaultExifToolPath } from "./FindExiftool"
import { geoTz } from "./GeoTz"
import { isIgnorableWarning } from "./IgnorableError"
import { Omit } from "./Omit"
import { VersionTask } from "./VersionTask"

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
  exiftoolPath: DefaultExifToolPath,
  exiftoolArgs: DefaultExiftoolArgs,
  exiftoolEnv: {},
  pass: "{ready}",
  fail: "{ready}",
  exitCommand: "-stay_open\nFalse\n",
  versionCommand: new VersionTask().command,
  healthCheckIntervalMillis: 30000,
  healthCheckCommand: "-ver\n-execute\n",
  useMWG: false,
  numericTags: [
    "*Duration*",
    "GPSAltitude",
    "GPSLatitude",
    "GPSLongitude",
    "GPSPosition",
    "Orientation",
  ],
  includeImageDataMD5: false,
  defaultVideosToUTC: true,
  backfillTimezones: false, // to retain prior behavior
  inferTimezoneFromDatestamps: false, // to retain prior behavior
  geoTz: geoTz,
  isIgnorableError: isIgnorableWarning,
})
