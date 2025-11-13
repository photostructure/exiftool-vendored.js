# Date and Timezone Handling

## The Problem with Dates in Your Media Metadata

Date metadata very rarely includes the time zone.

This creates a fundamental problem:

- Parsing the same file in different parts of the world gives different absolute times
- Most metadata contains only "local time" without timezone context
- GPS coordinates might be present but not linked to date fields

This library provides sophisticated heuristics to handle these timezone ambiguities.

## ExifDateTime and ExifTime Classes

This library returns date values as custom classes that handle timezone complexity:

```javascript
const tags = await exiftool.read("photo.jpg");
const dateTime = tags.DateTimeOriginal;

if (dateTime instanceof ExifDateTime) {
  console.log("Raw value:", dateTime.rawValue); // "2024:03:15 14:30:00"
  console.log("As Date:", dateTime.toDate()); // JavaScript Date object
  console.log("ISO string:", dateTime.toISOString()); // "2024-03-15T14:30:00.000Z"
  console.log("Timezone offset:", dateTime.tzoffset); // minutes from UTC (or null)
  console.log("Timezone name:", dateTime.zone); // timezone name (or "UnsetZone")
}
```

### Key Properties

- **`rawValue`**: Original string from the image file
- **`toDate()`**: Convert to JavaScript Date object
- **`tzoffset`**: Minutes from UTC (positive = east of UTC, negative = west)
- **`zone`**: Timezone name (e.g., "America/New_York") or "UnsetZone" for unknown

## Timezone Inference Heuristics

The library uses multiple heuristics to determine timezone offsets, applied in priority order:

### Heuristic 1: Explicit Metadata

**Highest Priority** - Use explicit timezone tags if present:

```javascript
// EXIF timezone tags (rarely set)
TimeZoneOffset; // Applied to DateTimeOriginal
OffsetTime; // Generic time offset
OffsetTimeOriginal; // Specific to DateTimeOriginal
OffsetTimeDigitized; // Specific to DateTimeDigitized
```

### Heuristic 2: GPS Location

**High Priority** - Infer timezone from GPS coordinates:

```javascript
const tags = await exiftool.read("photo.jpg");

if (tags.GPSLatitude && tags.GPSLongitude) {
  console.log("Location:", tags.GPSLatitude, tags.GPSLongitude);
  // Library uses tz-lookup by default, but see ExifToolOptions.geoTZ for details:
  // https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ExifToolOptions.html#geotz
  console.log("Inferred timezone:", tags.DateTimeOriginal?.zone);
}
```

**Note**: Coordinates of `0, 0` are considered invalid if the
[ignoreZeroZeroLatLon](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ExifToolOptions.html#ignorezerozerolatlon)
option is set.

### Heuristic 3: UTC Timestamp Delta

**Medium Priority** - Calculate offset from UTC timestamps:

```javascript
// If present, compare local time with UTC time
const localTime = tags.DateTimeOriginal; // Local camera time
const utcTime = tags.GPSDateTime; // UTC from GPS
// or
const utcTime2 = tags.DateTimeUTC; // UTC timestamp

// Library calculates the delta to infer timezone offset
// Deltas > 14 hours are considered invalid
```

## Timezone Configuration

For advanced timezone configuration options, including:

- Enabling archaic timezone offsets for historical photographs
- Configuring Baker Island Time (UTC-12:00) support
- Customizing timezone inference heuristics
- GPS-based timezone lookup

See the [Configuration Guide](CONFIGURATION.md#timezone-configuration-options).

## Working with Timezones

### Checking Timezone Information

```javascript
import { ExifDateTime } from "exiftool-vendored";

const tags = await exiftool.read("photo.jpg");
const dt = tags.DateTimeOriginal;

if (dt instanceof ExifDateTime) {
  if (dt.tzoffset !== null) {
    console.log(
      `Photo taken at UTC${dt.tzoffset >= 0 ? "+" : ""}${dt.tzoffset / 60}`,
    );
    console.log("Timezone:", dt.zone);
  } else {
    console.log("Timezone unknown - using system default");
  }
}
```

### Converting to Different Timezones

```javascript
import { ExifDateTime } from "exiftool-vendored";

const dt = tags.DateTimeOriginal;

if (dt instanceof ExifDateTime) {
  const utcDate = new Date(dt.toDate().getTime() - (dt.tzoffset ?? 0) * 60000);
  console.log("UTC time:", utcDate.toISOString());

  // Convert to specific timezone (requires additional library like date-fns-tz)
  const nyTime = utcDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  console.log("New York time:", nyTime);
}
```

## Writing Dates

### Full Dates

```javascript
// Write complete date with timezone
await exiftool.write("photo.jpg", {
  DateTimeOriginal: "2024:03:15 14:30:00+05:00",
});

// Write date in multiple formats
await exiftool.write("photo.jpg", {
  AllDates: "2024:03:15 14:30:00", // Updates DateTimeOriginal, DateTime, ModifyDate
});
```

### Partial Dates (XMP Only)

**New in v30.2.0** - XMP tags support partial dates:

```javascript
// Year only
await exiftool.write("photo.jpg", {
  "XMP:CreateDate": 1980,
});

// Year and month
await exiftool.write("photo.jpg", {
  "XMP:CreateDate": "1980:08", // or "1980-08"
});

// Using ExifDate helper
import { ExifDate } from "exiftool-vendored";

await exiftool.write("photo.jpg", {
  "XMP:CreateDate": ExifDate.fromYear(1980),
  "XMP:MetadataDate": ExifDate.fromYearMonth("1980-08"),
});
```

**⚠️ Important**: Partial dates only work with XMP tags (`XMP:CreateDate`, `XMP:MetadataDate`). EXIF tags require complete dates.

### Timezone Considerations When Writing

**Warning**: Editing timestamp tags can impact timezone inference.

If you change `DateTimeOriginal` but not GPS timestamps, the timezone inference may become incorrect:

```javascript
// This might break timezone calculation
await exiftool.write("photo.jpg", {
  DateTimeOriginal: "2024:03:15 14:30:00", // New local time
  // GPS timestamp unchanged - now timezone delta is wrong!
});

// Better: Update related timestamps or include timezone
await exiftool.write("photo.jpg", {
  AllDates: "2024:03:15 14:30:00", // Updates all date fields
  TimeZoneOffset: "+05:00", // Explicit timezone
});
```

## Precision and Microseconds

Modern smartphones and cameras can record timestamps with **microsecond precision**:

```javascript
const dt = tags.DateTimeOriginal;

if (dt instanceof ExifDateTime) {
  // Floating point milliseconds include microsecond precision
  console.log("Milliseconds:", dt.millisecond); // e.g., 123.456 (123456 microseconds)
}
```

Both `ExifDateTime` and `ExifTime` preserve this sub-millisecond precision.
