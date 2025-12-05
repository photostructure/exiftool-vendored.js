# Configuration Guide

exiftool-vendored provides two levels of configuration:

1. **[Settings](https://photostructure.github.io/exiftool-vendored.js/variables/ExifTool.Settings.html)** - Library-wide configuration affecting all `ExifTool` instances
2. **[ExifToolOptions](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ExifToolOptions.html)** - Per-instance configuration

## Quick Start

```javascript
import { ExifTool, Settings } from "exiftool-vendored";

// Use the singleton for simple cases
import { exiftool } from "exiftool-vendored";
const tags = await exiftool.read("photo.jpg");

// Or create a custom instance
const et = new ExifTool({
  maxProcs: 4,
  taskTimeoutMillis: 30000,
});
```

## Library-wide Settings

The [`Settings`](https://photostructure.github.io/exiftool-vendored.js/variables/ExifTool.Settings.html) object provides global configuration:

```javascript
import { Settings } from "exiftool-vendored";

// Enable historical timezone offsets for archival photos
Settings.allowArchaicTimezoneOffsets.value = true;

// Observe setting changes
const unsubscribe = Settings.allowArchaicTimezoneOffsets.onChange(
  (oldValue, newValue) => console.log(`Changed: ${oldValue} -> ${newValue}`),
);

// Reset all settings to defaults
Settings.reset();
```

Available settings:

- `allowArchaicTimezoneOffsets` - Parse historical timezone offsets (default: `false`)
- `allowBakerIslandTime` - Accept UTC-12:00 timezone (default: `false`)
- `maxValidOffsetMinutes` - Tolerance for GPS/UTC timezone inference (default: `30`)
- `logger` - Logging configuration (default: enabled when `NODE_DEBUG=exiftool-vendored`)

## Per-instance Options

The [`ExifToolOptions`](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ExifToolOptions.html) interface provides detailed configuration for individual `ExifTool` instances.

### Common Configurations

**High-throughput processing:**

```javascript
const exiftool = new ExifTool({
  maxProcs: 8,
  maxTasksPerProcess: 1000,
  taskTimeoutMillis: 60000,
});
```

**Timezone accuracy:**

```javascript
const exiftool = new ExifTool({
  backfillTimezones: true,
  inferTimezoneFromDatestamps: true,
  preferTimezoneInferenceFromGps: true,
});
```

**Using geo-tz for accurate timezone lookup:**

```javascript
import { find } from "geo-tz";

const exiftool = new ExifTool({
  geoTz: (lat, lon) => find(lat, lon)[0],
});
```

**Enable geolocation features:**

```javascript
const exiftool = new ExifTool({
  geolocation: true, // Requires ExifTool 12.78+
});

const tags = await exiftool.read("photo.jpg");
console.log(tags.GeolocationCity, tags.GeolocationCountryCode);
```

**MWG composite tags:**

```javascript
const exiftool = new ExifTool({
  useMWG: true, // Recommended by ExifTool, enabled by default
});
```

## Resource Cleanup

Always clean up ExifTool instances to prevent hanging processes:

```javascript
// Modern approach with disposables (TypeScript 5.2+)
{
  await using exiftool = new ExifTool();
  const tags = await exiftool.read("photo.jpg");
} // Automatic cleanup

// Traditional approach
const exiftool = new ExifTool();
try {
  const tags = await exiftool.read("photo.jpg");
} finally {
  await exiftool.end();
}
```

## API Reference

For complete documentation of all options with defaults:

- **[ExifToolOptions](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ExifToolOptions.html)** - All per-instance options
- **[Settings](https://photostructure.github.io/exiftool-vendored.js/variables/ExifTool.Settings.html)** - Library-wide settings
- **[DefaultExifToolOptions](https://photostructure.github.io/exiftool-vendored.js/variables/ExifTool.DefaultExifToolOptions.html)** - Default values
