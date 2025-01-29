import * as bc from "batch-cluster"
import { debuglog } from "node:util"
import { toBoolean } from "./Boolean"
import { CapturedAtTagNames } from "./CapturedAtTagNames"
import { DefaultExiftoolArgs } from "./DefaultExiftoolArgs"
import { DefaultMaxProcs } from "./DefaultMaxProcs"
import { ExifToolOptions } from "./ExifToolOptions"
import { exiftoolPath } from "./ExiftoolPath"
import { geoTz } from "./GeoTz"
import { isWin32 } from "./IsWin32"
import { Omit } from "./Omit"
import { Tags } from "./Tags"
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
  streamFlushMillis: 10,
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
  inferTimezoneFromTimeStamp: false, // to retain prior behavior
  logger,
  numericTags: [
    "*Duration*",
    "GPSAltitude",
    "GPSLatitude",
    "GPSLongitude",
    "GPSPosition",
    "GeolocationPosition",

    "Orientation",
    // NOT Rotation! Rotation can be encoded as degrees rotated clockwise, or a
    // EXIF-Orientation string (!!). If we ask ExifTool for numeric rotations of HEICs,
    // we get "3" (when it means "Rotate 90 CW"):

    // $ exiftool -j -Rotation -Orientation IMG_6947.HEIC
    // [{
    //   "Rotation": "Rotate 90 CW",
    //   "Orientation": "Rotate 90 CW"
    // }]

    // $ exiftool -j -Rotation# -Orientation# IMG_6947.HEIC
    // [{
    //   "Rotation": 3,   // < WTH is this? 3 means 180º (!?)
    //   "Orientation": 6 // < expected
    // }]
  ],
  useMWG: false,
  struct: 1,
  readArgs: ["-fast"],
  writeArgs: [],

  adjustTimeZoneIfDaylightSavings: defaultAdjustTimeZoneIfDaylightSavings,

  preferTimezoneInferenceFromGps: false, // to retain prior behavior
})

/**
 * @see https://github.com/photostructure/exiftool-vendored.js/issues/215
 */
export function defaultAdjustTimeZoneIfDaylightSavings(
  t: Tags
): number | undefined {
  // `DaylightSavings` may be "Yes" or `true`:
  return true === toBoolean(t.DaylightSavings) &&
    // Daggum Nikon likes "FS-Nikon", "Nikon", "NIKON", and "NIKON CORPORATION"
    /\bnikon\b/i.test(String(t.Make))
    ? 60
    : undefined
}
