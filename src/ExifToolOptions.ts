import * as bc from "batch-cluster"
import { geoTz } from "./GeoTz"
import { IgnorableError } from "./IgnorableError"
import { Tags } from "./Tags"

/**
 * Options for the {@link ExifTool} constructor.
 *
 * Defaults are defined in {@link DefaultExifToolOptions}.
 */
export interface ExifToolOptions
  extends bc.BatchClusterOptions,
    bc.BatchProcessOptions,
    bc.ChildProcessFactory {
  /**
   * The maximum number of ExifTool child processes to spawn when load merits.
   *
   * Defaults to 1/4 the number of CPUs, minimally 1.
   */
  maxProcs: number

  /**
   * The maximum number of requests a given ExifTool process will service
   * before being retired.
   *
   * Defaults to 500, to balance performance with memory usage.
   */
  maxTasksPerProcess: number

  /**
   * Spawning new ExifTool processes must not take longer than
   * {@link spawnTimeoutMillis} milliseconds before the child process is timed
   * out and a new attempt is made. Be pessimistic here--windows can regularly
   * take several seconds to spin up a process, thanks to antivirus
   * shenanigans. This can't be set to a value less than 100ms.
   *
   * Defaults to 30 seconds, to accommodate slow Windows machines.
   */
  spawnTimeoutMillis: number

  /**
   * If requests to ExifTool take longer than this, presume the underlying
   * process is dead and we should restart the task. This can't be set to a
   * value less than 10ms, and really should be set to at more than a second
   * unless `taskRetries` is sufficiently large or all writes will be to a
   * fast local disk. Defaults to 10 seconds.
   */
  taskTimeoutMillis: number

  /**
   * An interval timer is scheduled to do periodic maintenance of underlying
   * child processes with this periodicity.
   *
   * Defaults to 2 seconds.
   */
  onIdleIntervalMillis: number

  /**
   * The number of times a task can error or timeout and be retried.
   *
   * Defaults to 1 (every task gets 2 chances).
   */
  taskRetries: number

  /**
   * Allows for non-standard paths to ExifTool. Defaults to the perl or
   * windows binaries provided by `exiftool-vendored.pl` or
   * `exiftool-vendored.exe`.
   */
  exiftoolPath: string

  /**
   * Args passed to exiftool on launch.
   */
  exiftoolArgs: string[]

  /**
   * Environment variables passed to ExifTool (besides `EXIFTOOL_HOME`)
   */
  exiftoolEnv: NodeJS.ProcessEnv

  /**
   * Should ExifTool use MWG (Metadata Working Group) composite tags for
   * reading and writing tags?
   *
   * ExifTool recommends this to be set to true. This defaults to `false` to
   * maintain consistency with prior versions.
   *
   * Note that this can result in many tag value differences from
   * `ExifTool.read`, and makes `ExifTool.write` write to "synonymous" MWG
   * tags automatically.
   *
   * @see https://exiftool.org/TagNames/MWG.html for details
   */
  useMWG: boolean

  /**
   * Tag names (which can have '*' glob matchers) which you want numeric
   * values, rather than ExifTool's "Print Conversion."
   *
   * If you're using tag values only for human consumption, you may want to
   * leave this blank.
   *
   * The default includes "*Duration*", {@link Tags.GPSAltitude},
   * {@link Tags.GPSLatitude}, {@link Tags.GPSLongitude},
   * {@link Tags.GPSPosition}, and {@link Tags.Orientation}.
   */
  numericTags: string[]

  /**
   * If defined, ExifTool will attempt to calculate an "ImageDataHash" tag
   * value with a checksum of image data.
   *
   * Note that as of 2022-04-12, ExifTool supports JPEG, TIFF, PNG, CRW, CR3,
   * MRW, RAF, X3F, IIQ, JP2, JXL, HEIC and AVIF images, MOV/MP4 videos, and
   * some RIFF-based files such as AVI, WAV and WEBP.
   *
   * This defaults to undefined, as it adds ~20ms of overhead to every read
   */
  imageHashType: false | "MD5" | "SHA256" | "SHA512"

  /**
   * @deprecated Use `imageHashType` instead.
   */
  includeImageDataMD5: boolean | undefined

  /**
   * Video file dates are assumed to be in UTC, rather than using timezone
   * inference used in images. To disable this default, set this to false.
   *
   * @see https://github.com/photostructure/exiftool-vendored.js/issues/113
   */
  defaultVideosToUTC: boolean

  /**
   * Should we try to backfill timezones for date-times that don't have them?
   * If set to `true`, and {@link defaultVideosToUTC} is also `true`, we'll
   * try backfilling timezones for date-times that are UTC, as well.
   *
   * Setting this to `false` removes **all** timezone inference--only those
   * date-times with an explicit offset will have a defined timezone.
   *
   * Prior versions of exiftool-vendored would use the file's `.tz` as a
   * backstop even if this was set to `false`.
   *
   * As of version 23, this now defaults to `true`, as it's more likely to be
   * what people expect.
   */
  backfillTimezones: boolean

  /**
   * We always look at {@link Tags.TimeZone}, {@link Tags.OffsetTime},
   * {@link Tags.TimeZoneOffset}, {@link Tags.OffsetTimeOriginal},
   * {@link Tags.OffsetTimeDigitized}, and GPS metadata to infer the timezone.
   *
   * If these strategies fail, and this is enabled, we'll try to infer the
   * timezone from non-UTC datestamps included in the
   * {@link inferTimezoneFromDatestampTags} value.
   *
   * This defaults to false as it both retains prior behavior and means fewer
   * "fuzzy" heuristics are enabled by default.
   */
  inferTimezoneFromDatestamps: boolean

  /**
   * This is the list of tag names that will be used to infer the timezone as
   * a backstop, if no explicit timezone is found in metadata. Note that
   * datestamps with UTC offsets are ignored, as they are frequently
   * incorrectly set.
   *
   * This setting is only in play if {@link inferTimezoneFromDatestamps} has
   * been overridden to be `true`.
   *
   * This defaults to {@link DefaultCreateDatestampNames}
   */
  inferTimezoneFromDatestampTags: (keyof Tags)[]

  /**
   * `ExifTool` has a shebang line that assumes a valid `perl` is installed at
   * `/usr/bin/perl`.
   *
   * Some environments may not include a valid `/usr/bin/perl` (like AWS
   * Lambda), but `perl` may be available in your `PATH` some place else (like
   * `/opt/bin/perl`), if you pull in a perl layer.
   *
   * This will default to `true` in those environments as a workaround in these
   * situations. Note also that `perl` will be spawned in a sub-shell.
   */
  ignoreShebang: boolean

  /**
   * Should we check for a readable and executable `perl` file in $PATH? This
   * defaults to false on Windows, and true everywhere else. Set this to false
   * if you know perl is installed.
   */
  checkPerl: boolean

  /**
   * Override the default geo-to-timezone lookup service.
   *
   * This defaults to `@photostructure/tz-lookup`, but if you have the
   * resources, consider using `geo-tz` for more accurate results.
   *
   * Here's a snippet of how to use `geo-tz` instead of `tz-lookup`:
   *
```js
const geotz = require("geo-tz")
const { ExifTool } = require("exiftool-vendored")
const exiftool = new ExifTool({ geoTz: (lat, lon) => geotz.find(lat, lon)[0] })
```
   *
   * @see https://github.com/photostructure/tz-lookup
   * @see https://github.com/evansiroky/node-geo-tz/
   */
  geoTz: typeof geoTz

  /**
   * Predicate for error handling.
   *
   * ExifTool will emit error and warning messages for a variety of reasons.
   *
   * The default implementation ignores all errors that begin with "Warning:"
   *
   * @return true if the error should be ignored
   */
  isIgnorableError: IgnorableError
}

export function handleDeprecatedOptions<
  T extends Pick<ExifToolOptions, "includeImageDataMD5" | "imageHashType">,
>(options: T): T {
  if (options.imageHashType == null && options.includeImageDataMD5 != null) {
    options.imageHashType = options.includeImageDataMD5 ? "MD5" : false
  }
  return options
}
