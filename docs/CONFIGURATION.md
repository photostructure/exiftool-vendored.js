# Configuration Guide

exiftool-vendored provides two levels of configuration:

1. **Library-wide Settings** - Global configuration that affects all `ExifTool` instances
2. **Per-instance Options** - Configuration specific to each `ExifTool` instance

## Library-wide Settings

The `Settings` object provides global configuration that applies across all `ExifTool` instances in your application. These settings control parsing behavior and are particularly important for timezone handling.

```javascript
import { Settings } from "exiftool-vendored";

// Enable archaic timezone offsets globally
Settings.allowArchaicTimezoneOffsets.value = true;

// Enable Baker Island Time (UTC-12:00)
Settings.allowBakerIslandTime.value = true;

// Reset all settings to defaults
Settings.reset();
```

### Available Settings

#### `allowArchaicTimezoneOffsets`

**Type**: `Setting<boolean>`
**Default**: `false`

Allow parsing of archaic timezone offsets that are no longer in use.

These include historical offsets like:

- `-10:30` (Hawaii 1896-1947)
- `-04:30` (Venezuela 1912-1965, 2007-2016)
- `+04:51` (Bombay/Mumbai until 1955)
- And others from the [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

**Warning**: Enabling this may lead to incorrect timezone parsing for modern files, as these offsets are not currently used anywhere. Only enable this if you are specifically working with historical photographs or scanned archival material.

```javascript
import { Settings } from "exiftool-vendored";

// Enable for historical photograph processing
Settings.allowArchaicTimezoneOffsets.value = true;

const tags = await exiftool.read("archival-photo-1920.jpg");
console.log(tags.DateTimeOriginal?.tzoffset); // May contain archaic offset like -10:30
```

#### `allowBakerIslandTime`

**Type**: `Setting<boolean>`
**Default**: `false`

Allow parsing of the UTC-12:00 timezone offset ("Baker Island Time") as a valid timezone.

This timezone is not used for any populated land, and is disabled by default to prevent incorrect timezone parsing from files with mangled metadata.

```javascript
import { Settings } from "exiftool-vendored";

// Only enable if you specifically need UTC-12:00 support
Settings.allowBakerIslandTime.value = true;
```

### Observing Setting Changes

Each `Setting` instance provides an `onChange()` method for observing value changes:

```javascript
import { Settings } from "exiftool-vendored";

// Subscribe to changes
const unsubscribe = Settings.allowArchaicTimezoneOffsets.onChange(
  (oldValue, newValue) => {
    console.log(`Setting changed from ${oldValue} to ${newValue}`);
  },
);

// Later, if needed, you can unsubscribe to future changes:
unsubscribe();
```

## Per-instance Configuration

The `ExifToolOptions` interface provides detailed configuration for individual `ExifTool` instances. Pass these options to the constructor:

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  maxProcs: 4,
  taskTimeoutMillis: 30000,
  backfillTimezones: true,
  useMWG: true,
});
```

### Process Management Options

#### `maxProcs`

**Type**: `number`
**Default**: `Math.max(1, Math.floor(os.cpus().length / 4))`

The maximum number of ExifTool child processes to spawn when load merits.

```javascript
const exiftool = new ExifTool({
  maxProcs: 8, // Allow up to 8 concurrent ExifTool processes
});
```

#### `maxTasksPerProcess`

**Type**: `number`
**Default**: `500`

The maximum number of requests a given ExifTool process will service before being retired. This balances performance with memory usage.

```javascript
const exiftool = new ExifTool({
  maxTasksPerProcess: 1000, // Process more tasks before retiring
});
```

#### `spawnTimeoutMillis`

**Type**: `number`
**Default**: `30000` (30 seconds)

Spawning new ExifTool processes must not take longer than this value before timing out. Be pessimistic here - Windows can regularly take several seconds due to antivirus checks.

Minimum value: `100`

```javascript
const exiftool = new ExifTool({
  spawnTimeoutMillis: 45000, // 45 seconds for slow systems
});
```

#### `taskTimeoutMillis`

**Type**: `number`
**Default**: `20000` (20 seconds)

If requests to ExifTool take longer than this, presume the underlying process is dead and restart the task.

Minimum value: `10`

```javascript
const exiftool = new ExifTool({
  taskTimeoutMillis: 60000, // 60 seconds for large files
});
```

#### `onIdleIntervalMillis`

**Type**: `number`
**Default**: `2000` (2 seconds)

An interval timer is scheduled to do periodic maintenance of underlying child processes with this periodicity.

```javascript
const exiftool = new ExifTool({
  onIdleIntervalMillis: 5000, // Check every 5 seconds
});
```

#### `taskRetries`

**Type**: `number`
**Default**: `1`

The number of times a task can error or timeout and be retried. A value of `1` means every task gets 2 chances.

```javascript
const exiftool = new ExifTool({
  taskRetries: 2, // Up to 3 attempts per task
});
```

### ExifTool Path and Arguments

#### `exiftoolPath`

**Type**: `string | Promise<string> | ((logger?: Logger) => string | Promise<string>)`
**Default**: Path to vendored ExifTool binary

Allows for non-standard paths to ExifTool. This must be the full path to `exiftool`, not just the directory.

```javascript
const exiftool = new ExifTool({
  exiftoolPath: "/usr/local/bin/exiftool",
});
```

#### `exiftoolArgs`

**Type**: `string[]`
**Default**: `["-charset", "filename=utf8"]`

Arguments only passed to ExifTool on launch. You probably don't need to change this.

#### `exiftoolEnv`

**Type**: `NodeJS.ProcessEnv`
**Default**: `{}`

Environment variables passed to ExifTool (besides `EXIFTOOL_HOME`).

```javascript
const exiftool = new ExifTool({
  exiftoolEnv: {
    CUSTOM_VAR: "value",
  },
});
```

### Metadata Reading Options

#### `useMWG`

**Type**: `boolean`
**Default**: `false`

Should ExifTool use MWG (Metadata Working Group) composite tags for reading and writing tags?

ExifTool recommends this to be set to `true`. This defaults to `false` to maintain consistency with prior versions.

Note that this can result in many tag value differences from `ExifTool.read`, and makes `ExifTool.write` write to "synonymous" MWG tags automatically.

See [MWG Tags](https://exiftool.org/TagNames/MWG.html) for details.

```javascript
const exiftool = new ExifTool({
  useMWG: true, // Use MWG composite tags
});
```

#### `numericTags`

**Type**: `string[]`
**Default**: `["*Duration*", "GPSAltitude", "GPSLatitude", "GPSLongitude", "GPSPosition", "GeolocationPosition", "Orientation"]`

Tag names (which can have `*` glob matchers) which you want numeric values for, rather than ExifTool's "Print Conversion."

If you're using tag values only for human consumption, you may want to leave this blank.

```javascript
const exiftool = new ExifTool({
  numericTags: ["*Duration*", "GPSLatitude", "GPSLongitude", "ISO", "FNumber"],
});
```

#### `imageHashType`

**Type**: `false | "MD5" | "SHA256" | "SHA512"`
**Default**: `false`

If defined, ExifTool will attempt to calculate an "ImageDataHash" tag value with a checksum of image data.

As of 2022-04-12, ExifTool supports JPEG, TIFF, PNG, CRW, CR3, MRW, RAF, X3F, IIQ, JP2, JXL, HEIC and AVIF images, MOV/MP4 videos, and some RIFF-based files such as AVI, WAV and WEBP.

This defaults to `false` as it adds at least 20ms of overhead to every read -- you should benchmark your own setup, but it's not free!

```javascript
const exiftool = new ExifTool({
  imageHashType: "SHA256", // Calculate SHA256 hash of image data
});

const tags = await exiftool.read("photo.jpg");
console.log(tags.ImageDataHash); // SHA256 hash
```

#### `geolocation`

**Type**: `boolean`
**Default**: `false`

When reading metadata, should we enable ExifTool's geolocation features? Note that this requires ExifTool version 12.78 or later, and does make every read with GPS tags a bit slower.

See [ExifTool Geolocation](https://exiftool.org/geolocation.html) for details.

```javascript
const exiftool = new ExifTool({
  geolocation: true, // Enable geolocation features
});

const tags = await exiftool.read("photo.jpg");
console.log(tags.GeolocationCity);
console.log(tags.GeolocationCountryCode);
```

#### `ignoreMinorErrors`

**Type**: `boolean`
**Default**: `true`

Should we ignore minor errors when reading metadata? ExifTool can be quite chatty with warnings.

```javascript
const exiftool = new ExifTool({
  ignoreMinorErrors: false, // Report all warnings
});
```

#### `struct`

**Type**: `"undef" | 0 | 1 | 2`
**Default**: `1`

How should ExifTool handle nested structures?

- `0` = Read/copy flattened tags
- `1` = Read/copy structures
- `2` = Read/copy both flattened and structured tags, but flag flattened tags as "unsafe" for copying
- `"undef"` = Same as `0` for reading and `2` for copying

See [ExifTool struct documentation](https://exiftool.org/struct.html) for details.

```javascript
const exiftool = new ExifTool({
  struct: 2, // Read both flattened and structured tags
});
```

#### `readArgs`

**Type**: `string[]`
**Default**: `["-fast"]`

Any additional arguments that should be added by default to all read tasks. The value provided to the ExifTool constructor can be overridden in the call to `ExifTool.read()`.

```javascript
const exiftool = new ExifTool({
  readArgs: ["-fast", "-api", "largefilesupport=1"],
});

// Override for a specific read
const tags = await exiftool.read("photo.jpg", ["-G1"]);
```

### Metadata Writing Options

#### `forceWrite`

**Type**: `boolean`
**Default**: `false`

When writing an extracted tag to a file, this will overwrite an existing file instead of throwing an error. Enabling this option is equivalent to `-w!` in ExifTool.

```javascript
const exiftool = new ExifTool({
  forceWrite: true, // Overwrite existing files
});
```

#### `writeArgs`

**Type**: `string[]`
**Default**: `[]`

Any additional arguments that should be added by default to all write tasks. The value provided to the ExifTool constructor can be overridden in the call to `ExifTool.write()`.

```javascript
const exiftool = new ExifTool({
  writeArgs: ["-overwrite_original"], // Don't create backup files
});
```

### Timezone Configuration Options

Timezone handling is one of the most complex aspects of metadata processing. These options control how exiftool-vendored infers and handles timezones.

#### `defaultVideosToUTC`

**Type**: `boolean`
**Default**: `true`

Video file dates are assumed to be in UTC, rather than using timezone inference used in images. To disable this default, set this to `false`.

See [issue #113](https://github.com/photostructure/exiftool-vendored.js/issues/113) for background.

```javascript
const exiftool = new ExifTool({
  defaultVideosToUTC: false, // Apply timezone inference to videos
});
```

#### `backfillTimezones`

**Type**: `boolean`
**Default**: `true`

Should we try to backfill timezones for date-times that don't have them? If set to `true`, and `defaultVideosToUTC` is also `true`, we'll try backfilling timezones for date-times that are UTC, as well.

Setting this to `false` removes **all** timezone inference - only those date-times with an explicit offset will have a defined timezone.

```javascript
const exiftool = new ExifTool({
  backfillTimezones: false, // Only use explicit timezone metadata
});
```

#### `geoTz`

**Type**: `(lat: number, lon: number) => string`
**Default**: `@photostructure/tz-lookup` implementation

Override the default geo-to-timezone lookup service. The default uses `@photostructure/tz-lookup`, but if you have the resources, consider using `geo-tz` for more accurate results.

If your implementation throws an error, `ExifTool` will consider that given latitude/longitude as invalid.

```javascript
import { find } from "geo-tz";

const exiftool = new ExifTool({
  geoTz: (lat, lon) => find(lat, lon)[0],
});
```

#### `ignoreZeroZeroLatLon`

**Type**: `boolean`
**Default**: `true`

Some software uses a GPS position of (0,0) as a synonym for "unset". If this option is `true`, and GPSLatitude and GPSLongitude are both 0, then those values will be returned, but the TZ will not be inferred from that location.

If both this and `geolocation` are `true`, we will delete the Geolocation tags from the returned metadata object.

See [Null Island](https://en.wikipedia.org/wiki/Null_Island) for background.

```javascript
const exiftool = new ExifTool({
  ignoreZeroZeroLatLon: false, // Treat (0,0) as valid GPS coordinates
});
```

#### `inferTimezoneFromDatestamps`

**Type**: `boolean`
**Default**: `false`

We always look at `TimeZone`, `TimeZoneOffset`, `OffsetTimeOriginal`, `OffsetTimeDigitized`, and GPS metadata to infer the timezone.

If these strategies fail, and this is enabled, we'll try to infer the timezone from non-UTC datestamps included in the `inferTimezoneFromDatestampTags` value.

This defaults to `false` as it both retains prior behavior and means fewer "fuzzy" heuristics are enabled by default.

```javascript
const exiftool = new ExifTool({
  inferTimezoneFromDatestamps: true, // Try to infer timezone from datestamps
});
```

#### `inferTimezoneFromDatestampTags`

**Type**: `(keyof Tags)[]`
**Default**: `["DateTimeOriginal", "CreateDate", "DateTimeCreated", ...]` (captured-at tags)

This is the list of tag names that will be used to infer the timezone as a backstop, if no explicit timezone is found in metadata. Note that datestamps with UTC offsets are ignored, as they are frequently incorrectly set.

This setting is only in play if `inferTimezoneFromDatestamps` has been overridden to be `true`.

```javascript
const exiftool = new ExifTool({
  inferTimezoneFromDatestamps: true,
  inferTimezoneFromDatestampTags: [
    "DateTimeOriginal",
    "CreateDate",
    "MediaCreateDate",
  ],
});
```

#### `inferTimezoneFromTimeStamp`

**Type**: `boolean`
**Default**: `false`

Some cameras (Samsung Galaxy S7, for example) may not always include GPS metadata in photos if a fix can't be obtained. If this option is `true`, and GPS metadata is missing, we'll try to infer the timezone from the difference of the TimeStamp tag and the first defined tag value from `inferTimezoneFromDatestampTags`.

This heuristic is pretty sketchy, and used as a last resort. You shouldn't enable it unless you have to.

See [issue #209](https://github.com/photostructure/exiftool-vendored.js/issues/209) for background.

```javascript
const exiftool = new ExifTool({
  inferTimezoneFromTimeStamp: true, // Last resort timezone inference
});
```

#### `adjustTimeZoneIfDaylightSavings`

**Type**: `(tags: Tags, tz: string) => number | undefined`
**Default**: Adjusts by 60 minutes for Nikon cameras when `DaylightSavings` is `true`

The TimeZone tag normally represents the offset from UTC.

Unfortunately, at least for some Nikon cameras, the TimeZone tag **and the DaylightSavings tag** must be taken into account to find the UTC offset.

By default, this is a predicate that returns `true` if the `Make` tag is `Nikon`. The return value is the number of minutes to adjust the timezone by.

See [issue #215](https://github.com/photostructure/exiftool-vendored.js/issues/215) for background.

```javascript
const exiftool = new ExifTool({
  adjustTimeZoneIfDaylightSavings: (tags, tz) => {
    // Custom logic for other camera makes
    if (/canon/i.test(String(tags.Make)) && tags.DaylightSavings === "Yes") {
      return 60; // Adjust by 60 minutes
    }
    return undefined;
  },
});
```

#### `preferTimezoneInferenceFromGps`

**Type**: `boolean`
**Default**: `false`

Timezone parsing requires a bunch of heuristics due to hardware and software companies not following metadata specifications similarly.

If GPS metadata is trustworthy, set this to `true` to override explicit values assigned to timezone offset tags.

Note that there **are** regions that have had their IANA timezone change over time - this will result in incorrect timezones.

```javascript
const exiftool = new ExifTool({
  preferTimezoneInferenceFromGps: true, // Trust GPS over explicit timezone tags
});
```

#### `keepUTCTime`

**Type**: `boolean`
**Default**: `true`

Should ExifTool keep times that are stored as seconds since UTC epoch as UTC times? If `false`, ExifTool will use local time instead of UTC/Zulu.

We default to `true` to ensure we don't unintentionally adopt local timezones.

Please note: when trying to validate this option, we could not find a single example that had a unixtime-encoded datetime, so this is likely irrelevant for most use cases and files.

See [ExifTool KeepUTCTime](https://exiftool.org/ExifTool.html#KeepUTCTime) for details.

```javascript
const exiftool = new ExifTool({
  keepUTCTime: false, // Convert UTC epoch times to local time
});
```

### Resource Management Options

#### `disposalTimeoutMs`

**Type**: `number`
**Default**: `1000` (1 second)

Timeout in milliseconds for synchronous disposal (using `Symbol.dispose`). If graceful cleanup takes longer than this, forceful cleanup is attempted.

```javascript
const exiftool = new ExifTool({
  disposalTimeoutMs: 2000, // 2 seconds for sync disposal
});

{
  using et = exiftool;
  // Work with et...
} // Cleanup with 2-second timeout
```

#### `asyncDisposalTimeoutMs`

**Type**: `number`
**Default**: `5000` (5 seconds)

Timeout in milliseconds for asynchronous disposal (using `Symbol.asyncDispose`). If graceful cleanup takes longer than this, forceful cleanup is attempted.

```javascript
const exiftool = new ExifTool({
  asyncDisposalTimeoutMs: 30000, // 30 seconds for async disposal
});

{
  await using et = exiftool;
  // Work with et...
} // Graceful cleanup with 30-second timeout
```

### Platform-specific Options

#### `ignoreShebang`

**Type**: `boolean`
**Default**: `true` on systems without `/usr/bin/perl`, `false` otherwise

`ExifTool` has a shebang line that assumes a valid `perl` is installed at `/usr/bin/perl`.

Some environments may not include a valid `/usr/bin/perl` (like AWS Lambda), but `perl` may be available in your `PATH` some place else (like `/opt/bin/perl`).

This will default to `true` in those environments as a workaround. Note that `perl` will be spawned in a sub-shell.

```javascript
const exiftool = new ExifTool({
  ignoreShebang: true, // Use perl from PATH
});
```

#### `checkPerl`

**Type**: `boolean`
**Default**: `false` on Windows, `true` everywhere else

Should we check for a readable and executable `perl` file in `$PATH`? Set this to `false` if you know perl is installed.

```javascript
const exiftool = new ExifTool({
  checkPerl: false, // Skip perl check
});
```

## Configuration Best Practices

### Start Conservative

The singleton `exiftool` instance uses conservative defaults suitable for most use cases:

```javascript
import { exiftool } from "exiftool-vendored";

// Works for most scenarios
const tags = await exiftool.read("photo.jpg");
```

### Customize for Performance

When processing many files, increase concurrency:

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  maxProcs: 8, // More concurrent processes
  maxTasksPerProcess: 1000, // Fewer process restarts
  taskTimeoutMillis: 30000, // Longer timeout for large files
});
```

### Customize for Accuracy

When timezone accuracy is critical:

```javascript
import { ExifTool, Settings } from "exiftool-vendored";

// Enable all timezone inference heuristics
const exiftool = new ExifTool({
  backfillTimezones: true,
  inferTimezoneFromDatestamps: true,
  inferTimezoneFromTimeStamp: true,
  preferTimezoneInferenceFromGps: true,
});

// Enable historical timezone support if needed
Settings.allowArchaicTimezoneOffsets.value = true;
```

### Use MWG for Consistency

When working with files from multiple sources:

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  useMWG: true, // Use Metadata Working Group standards
});
```

### Resource Cleanup

Always clean up ExifTool instances to prevent hanging processes:

```javascript
import { ExifTool } from "exiftool-vendored";

// Modern approach with disposables (TypeScript 5.2+)
{
  await using exiftool = new ExifTool();
  const tags = await exiftool.read("photo.jpg");
  // Automatic cleanup
}

// Traditional approach
const exiftool = new ExifTool();
try {
  const tags = await exiftool.read("photo.jpg");
} finally {
  await exiftool.end();
}
```

## Relationship Between Settings and Options

**Library-wide Settings** affect parsing behavior globally:

- `Settings.allowArchaicTimezoneOffsets` - Controls what timezone offsets are considered valid
- `Settings.allowBakerIslandTime` - Controls whether UTC-12:00 is accepted

**Per-instance Options** control how each ExifTool instance operates:

- Process management (how many child processes, timeouts, etc.)
- What data to extract (MWG tags, numeric values, image hashes)
- How to infer timezones (GPS lookup, datestamp comparison)
- How to write metadata (force overwrite, MWG compatibility)

Together, they provide fine-grained control over metadata processing behavior.
