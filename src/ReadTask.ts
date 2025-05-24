import { logger } from "batch-cluster";
import * as _path from "node:path";
import { toArray } from "./Array";
import { BinaryField } from "./BinaryField";
import { toBoolean } from "./Boolean";
import { DefaultExifToolOptions } from "./DefaultExifToolOptions";
import { errorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import { ExifToolOptions, handleDeprecatedOptions } from "./ExifToolOptions";
import { ExifToolTask } from "./ExifToolTask";
import { compareFilePaths } from "./File";
import { Utf8FilenameCharsetArgs } from "./FilenameCharsetArgs";
import { parseGPSLocation } from "./GPS";
import { lazy } from "./Lazy";
import { Maybe } from "./Maybe";
import { isNumber } from "./Number";
import { isObject } from "./Object";
import { OnlyZerosRE } from "./OnlyZerosRE";
import { pick } from "./Pick";
import { isString, notBlank } from "./String";
import { Tags } from "./Tags";
import {
  TzSrc,
  extractTzOffsetFromDatestamps,
  extractTzOffsetFromTags,
  extractTzOffsetFromTimeStamp,
  extractTzOffsetFromUTCOffset,
  normalizeZone,
} from "./Timezones";

/**
 * tag names we don't need to muck with, but name conventions (like including
 * "date") suggest they might be date/time tags
 */
const PassthroughTags = [
  "ExifToolVersion",
  "DateStampMode",
  "Sharpness",
  "Firmware",
  "DateDisplayFormat",
];

export const ReadTaskOptionFields = [
  "adjustTimeZoneIfDaylightSavings",
  "backfillTimezones",
  "defaultVideosToUTC",
  "geolocation",
  "geoTz",
  "ignoreMinorErrors",
  "ignoreZeroZeroLatLon",
  "imageHashType",
  "includeImageDataMD5",
  "inferTimezoneFromDatestamps",
  "inferTimezoneFromDatestampTags",
  "inferTimezoneFromTimeStamp",
  "keepUTCTime",
  "numericTags",
  "preferTimezoneInferenceFromGps",
  "readArgs",
  "struct",
  "useMWG",
] as const satisfies (keyof ExifToolOptions)[];

const NullIsh = ["undef", "null", "undefined"];

export function nullish(s: unknown): s is undefined {
  return s == null || (isString(s) && NullIsh.includes(s.trim()));
}

export const DefaultReadTaskOptions = {
  ...pick(DefaultExifToolOptions, ...ReadTaskOptionFields),
} as const satisfies Partial<ExifToolOptions>;

export type ReadTaskOptions = Partial<typeof DefaultReadTaskOptions>;

const MaybeDateOrTimeRe = /when|date|time|subsec|creat|modif/i;

export class ReadTask extends ExifToolTask<Tags> {
  private readonly degroup: boolean;
  #raw: Record<string, unknown> = {};
  #rawDegrouped: Record<string, unknown> = {};
  readonly #tags: Tags = {};

  /**
   * @param sourceFile the file to read
   * @param args the full arguments to pass to exiftool that take into account
   * the flags in `options`
   */
  constructor(
    readonly sourceFile: string,
    override readonly args: string[],
    override options: Required<ReadTaskOptions>,
  ) {
    super(args, options);
    // See https://github.com/photostructure/exiftool-vendored.js/issues/147#issuecomment-1642580118
    this.degroup = this.args.includes("-G");
    this.#tags = { SourceFile: sourceFile } as Tags;
    this.#tags.errors = this.errors;
  }

  static for(filename: string, options: ReadTaskOptions): ReadTask {
    const opts: Required<ReadTaskOptions> = handleDeprecatedOptions({
      ...DefaultReadTaskOptions,
      ...options,
    });
    const sourceFile = _path.resolve(filename);
    const args = [
      ...Utf8FilenameCharsetArgs,
      "-json",
      ...toArray(opts.readArgs),
    ];
    // "-api struct=undef" doesn't work: but it's the same as struct=0:
    args.push("-api", "struct=" + (isNumber(opts.struct) ? opts.struct : "0"));
    if (opts.useMWG) {
      args.push("-use", "MWG");
    }
    if (opts.imageHashType != null && opts.imageHashType !== false) {
      // See https://exiftool.org/forum/index.php?topic=14706.msg79218#msg79218
      args.push("-api", "requesttags=imagedatahash");
      args.push("-api", "imagehashtype=" + opts.imageHashType);
    }
    if (true === opts.geolocation) {
      args.push("-api", "geolocation");
    }
    if (true === opts.keepUTCTime) {
      args.push("-api", "keepUTCTime");
    }
    // IMPORTANT: "-all" must be after numeric tag references, as the first
    // reference in wins
    args.push(...opts.numericTags.map((ea) => "-" + ea + "#"));
    // We have to add a -all or else we'll only get the numericTags. sad.

    // TODO: Do you need -xmp:all, -all, or -all:all? Is -* better?
    args.push("-all", sourceFile);

    return new ReadTask(sourceFile, args, opts);
  }

  override toString(): string {
    return "ReadTask" + this.sourceFile + ")";
  }

  // only exposed for tests
  parse(data: string, err?: Error): Tags {
    try {
      // Fix ExifToolVersion to be a string to preserve version distinctions like 12.3 vs 12.30
      const versionFixedData = data.replace(
        /"ExifToolVersion"\s*:\s*(\d+(?:\.\d+)?)/,
        '"ExifToolVersion":"$1"',
      );
      this.#raw = JSON.parse(versionFixedData)[0];
    } catch (jsonError) {
      // TODO: should restart exiftool?
      logger().warn("ExifTool.ReadTask(): Invalid JSON", {
        data,
        err,
        jsonError,
      });
      throw err ?? jsonError;
    }
    // ExifTool does "humorous" things to paths, like flip path separators. resolve() undoes that.
    if (notBlank(this.#raw.SourceFile)) {
      if (!compareFilePaths(this.#raw.SourceFile, this.sourceFile)) {
        // this would indicate a bug in batch-cluster:
        throw new Error(
          `Internal error: unexpected SourceFile of ${this.#raw.SourceFile} for file ${this.sourceFile}`,
        );
      }
    }

    return this.#parseTags();
  }

  #isVideo(): boolean {
    return String(this.#rawDegrouped?.MIMEType).startsWith("video/");
  }

  #defaultToUTC(): boolean {
    return this.#isVideo() && this.options.defaultVideosToUTC;
  }

  #tagName(k: string): string {
    return this.degroup ? (k.split(":")[1] ?? k) : k;
  }

  #parseTags(): Tags {
    if (this.degroup) {
      this.#rawDegrouped = {};
      for (const [key, value] of Object.entries(this.#raw)) {
        const k = this.#tagName(key);
        this.#rawDegrouped[k] = value;
      }
    } else {
      this.#rawDegrouped = this.#raw;
    }

    // avoid casting `this.tags as any` for the rest of the function:
    const tags = this.#tags as Record<string, unknown>;

    // Must be run before extracting tz offset, to repair possibly-invalid
    // GeolocationTimeZone
    this.#extractGpsMetadata();

    const tzSrc = this.#extractTzOffset();
    if (tzSrc) {
      tags.zone = tzSrc.zone;
      tags.tz = tzSrc.tz;
      tags.tzSource = tzSrc.src;
    }

    for (const [key, value] of Object.entries(this.#raw)) {
      const k = this.#tagName(key);
      // Did something already set this? (like GPS tags)
      if (key in tags) continue;
      const v = this.#parseTag(k, value);
      // Note that we set `key` (which may include a group prefix):
      if (v == null) {
        // Use Reflect.deleteProperty for dynamic keys
        Reflect.deleteProperty(tags, key);
      } else {
        tags[key] = v;
      }
    }

    // we could `return {...tags, ...errorsAndWarnings(this, tags)}` but tags is
    // a chonky monster, and we don't want to double the work for the poor
    // garbage collector.
    const { errors, warnings } = errorsAndWarnings(this, tags);
    tags.errors = errors;
    tags.warnings = warnings;

    return tags;
  }

  #extractGpsMetadata = lazy(() => {
    const result = parseGPSLocation(this.#rawDegrouped, this.options);
    if (result?.warnings != null && (result.warnings.length ?? 0) > 0) {
      this.warnings.push(...result.warnings);
    }
    if (result?.invalid !== true) {
      for (const [k, v] of Object.entries(result?.result ?? {})) {
        (this.#tags as Record<string, unknown>)[k] = v;
      }
    }
    return result;
  });

  #gpsIsInvalid = lazy<boolean>(
    () => this.#extractGpsMetadata()?.invalid ?? false,
  );

  #gpsResults = lazy<Record<string, unknown>>(() =>
    this.#gpsIsInvalid() ? {} : (this.#extractGpsMetadata()?.result ?? {}),
  );

  #extractTzOffsetFromGps = lazy<Maybe<TzSrc>>(() => {
    const gps = this.#extractGpsMetadata();
    const lat = gps?.result?.GPSLatitude;
    const lon = gps?.result?.GPSLongitude;
    if (gps == null || gps.invalid === true || lat == null || lon == null)
      return;
    // First try GeolocationTimeZone:
    const geolocZone = normalizeZone(this.#rawDegrouped.GeolocationTimeZone);
    if (geolocZone != null) {
      return {
        zone: geolocZone.name,
        tz: geolocZone.name,
        src: "GeolocationTimeZone",
      };
    }

    try {
      const geoTz = this.options.geoTz(lat, lon);
      const zone = normalizeZone(geoTz);
      if (zone != null) {
        return {
          zone: zone.name,
          tz: zone.name,
          src: "GPSLatitude/GPSLongitude",
        };
      }
    } catch (error) {
      this.warnings.push(
        "Failed to determine timezone from GPS coordinates: " + error,
      );
    }
    return;
  });

  #tz = lazy(() => this.#extractTzOffset()?.tz);

  #extractTzOffset = lazy<Maybe<TzSrc>>(() => {
    if (true === this.options.preferTimezoneInferenceFromGps) {
      const fromGps = this.#extractTzOffsetFromGps();
      if (fromGps != null) {
        return fromGps;
      }
    }
    return (
      extractTzOffsetFromTags(this.#rawDegrouped, this.options) ??
      this.#extractTzOffsetFromGps() ??
      extractTzOffsetFromDatestamps(this.#rawDegrouped, this.options) ??
      // See https://github.com/photostructure/exiftool-vendored.js/issues/113
      // and https://github.com/photostructure/exiftool-vendored.js/issues/156
      // Videos are frequently encoded in UTC, but don't include the
      // timezone offset in their datetime stamps.
      (this.#defaultToUTC()
        ? {
            zone: "UTC",
            tz: "UTC",
            src: "defaultVideosToUTC",
          }
        : // not applicable:
          undefined) ??
      // This is a last-ditch estimation heuristic:
      extractTzOffsetFromUTCOffset(this.#rawDegrouped) ??
      // No, really, this is the even worse than UTC offset heuristics:
      extractTzOffsetFromTimeStamp(this.#rawDegrouped, this.options)
    );
  });

  #parseTag(tagName: string, value: unknown): unknown {
    if (nullish(value)) return undefined;

    try {
      if (PassthroughTags.indexOf(tagName) >= 0) {
        return value;
      }
      if (tagName.startsWith("GPS") || tagName.startsWith("Geolocation")) {
        if (this.#gpsIsInvalid()) return undefined;

        // If we parsed out a better value, use that:
        const parsed = this.#gpsResults()[tagName];
        if (parsed != null) return parsed;

        // Otherwise, parse the raw value like any other tag: (It might be
        // something like "GPSTimeStamp"):
      }

      if (Array.isArray(value)) {
        return value.map((ea) => this.#parseTag(tagName, ea));
      }
      if (isObject(value)) {
        const result: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value)) {
          result[k] = this.#parseTag(tagName + "." + k, v);
        }
        return result;
      }
      if (typeof value === "string") {
        const b = BinaryField.fromRawValue(value);
        if (b != null) return b;

        if (/Valid$/.test(tagName)) {
          const b = toBoolean(value);
          if (b != null) return b;
        }

        if (
          MaybeDateOrTimeRe.test(tagName) &&
          // Reject date/time keys that are "0" or "00" (found in Canon
          // SubSecTime values)
          !OnlyZerosRE.test(value)
        ) {
          // if #defaultToUTC() is true, _we actually think zoneless
          // datestamps are all in UTC_, rather than being in `this.tz` (which
          // may be from GPS or other heuristics). See issue #153.
          const tz =
            isUtcTagName(tagName) || this.#defaultToUTC()
              ? "UTC"
              : this.options.backfillTimezones
                ? this.#tz()
                : undefined;

          // Time-only tags have "time" but not "date" in their name:
          const keyIncludesTime = /subsec|time/i.test(tagName);
          const keyIncludesDate = /date/i.test(tagName);
          const keyIncludesWhen = /when/i.test(tagName); // < ResourceEvent.When
          const result =
            (keyIncludesTime || keyIncludesDate || keyIncludesWhen
              ? ExifDateTime.from(value, tz)
              : undefined) ??
            (keyIncludesTime || keyIncludesWhen
              ? ExifTime.fromEXIF(value, tz)
              : undefined) ??
            (keyIncludesDate || keyIncludesWhen
              ? ExifDate.from(value)
              : undefined) ??
            value;

          const defaultTz = this.#tz();
          if (
            this.options.backfillTimezones &&
            result != null &&
            defaultTz != null &&
            result instanceof ExifDateTime &&
            this.#defaultToUTC() &&
            !isUtcTagName(tagName) &&
            true === result.inferredZone
          ) {
            return result.setZone(defaultTz);
          }

          return result;
        }
      }
      // Trust that ExifTool rendered the value with the correct type in JSON:
      return value;
    } catch (e) {
      this.warnings.push(
        `Failed to parse ${tagName} with value ${JSON.stringify(value)}: ${e}`,
      );
      return value;
    }
  }
}

function isUtcTagName(tagName: string): boolean {
  return tagName.includes("UTC") || tagName.startsWith("GPS");
}
