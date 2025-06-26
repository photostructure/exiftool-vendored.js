# Usage Examples

Complete examples for common exiftool-vendored use cases.

## Basic Setup

```javascript
import { exiftool } from "exiftool-vendored";
// or: const { exiftool } = require("exiftool-vendored");

// Verify installation
console.log(`ExifTool v${await exiftool.version()}`);

// Shut down the `exiftool` child process so node can exit cleanly:
await exiftool.end();
```

## Reading Metadata

### Basic Tag Reading

```javascript
const tags = await exiftool.read("photo.jpg");

console.log("Camera:", tags.Make, tags.Model);
console.log("Size:", tags.ImageWidth, "x", tags.ImageHeight);
console.log("Taken:", tags.DateTimeOriginal);
console.log("Location:", tags.GPSLatitude, tags.GPSLongitude);
```

### Safe Property Access

```javascript
const tags = await exiftool.read("photo.jpg");

// Handle optional values safely
const camera = tags.Make ? `${tags.Make} ${tags.Model}` : "Unknown camera";
const dimensions =
  tags.ImageWidth && tags.ImageHeight
    ? `${tags.ImageWidth}x${tags.ImageHeight}`
    : "Unknown size";

// Use nullish coalescing for fallbacks
const timestamp = tags.DateTimeOriginal ?? tags.DateTime ?? tags.FileModifyDate;
const title = tags.Title ?? tags.DocumentName ?? tags.FileName;
```

### Error Handling

```javascript
try {
  const tags = await exiftool.read("photo.jpg");

  // Check for parsing warnings
  if (tags.errors && tags.errors.length > 0) {
    console.warn("Metadata warnings:", tags.errors);
  }

  console.log("Successfully read metadata");
} catch (error) {
  console.error("Failed to read file:", error.message);
}
```

## Writing Metadata

### Basic Tag Writing

```javascript
// Add comment and copyright
await exiftool.write("photo.jpg", {
  XPComment: "Beautiful sunset",
  Copyright: "© 2024 Your Name",
});

// Update capture date
await exiftool.write("photo.jpg", {
  DateTimeOriginal: "2024:03:15 14:30:00",
});
```

### Writing to Specific Groups

```javascript
// Write to specific metadata groups
await exiftool.write("photo.jpg", {
  "IPTC:Keywords": "sunset, landscape, nature",
  "IPTC:CopyrightNotice": "© 2024 Photographer Name",
  "XMP:Title": "Sunset Over Mountains",
  "XMP:Description": "A stunning sunset captured in the mountains",
});
```

### Deleting Tags

```javascript
// Delete specific tags by setting to null
await exiftool.write("photo.jpg", {
  UserComment: null,
  ImageDescription: null,
  "IPTC:Keywords": null,
});
```

### Batch Updates with AllDates

```javascript
// Update all date fields at once
await exiftool.write("photo.jpg", {
  AllDates: "2024:03:15 14:30:00",
});

// This is equivalent to setting:
// - DateTimeOriginal
// - CreateDate
// - ModifyDate
```

### GPS Coordinates

```javascript
// Set GPS location (decimal degrees)
await exiftool.write("photo.jpg", {
  GPSLatitude: 40.7128,
  GPSLongitude: -74.006,
  GPSAltitude: 10, // meters above sea level
});
```

## Extracting Embedded Images

### Thumbnail Extraction

```javascript
// Extract EXIF thumbnail
try {
  await exiftool.extractThumbnail("photo.jpg", "thumbnail.jpg");
  console.log("Thumbnail extracted successfully");
} catch (error) {
  console.log("No thumbnail found or extraction failed");
}
```

### Preview Image Extraction

```javascript
// Extract preview image (larger than thumbnail)
try {
  await exiftool.extractPreview("photo.jpg", "preview.jpg");
  console.log("Preview extracted successfully");
} catch (error) {
  console.log("No preview found or extraction failed");
}
```

## JSON Serialization

### Serialize and Deserialize Tags

```javascript
import { parseJSON, ExifDateTime } from "exiftool-vendored";
import { readFile, writeFile } from "node:fs/promises";

// Read and serialize
const tags = await exiftool.read("photo.jpg");
const jsonString = JSON.stringify(tags);

// Save to file or send over network
await writeFile("metadata.json", jsonString);

// Later, deserialize
const savedJson = await readFile("metadata.json", "utf8");
const restoredTags = parseJSON(savedJson);

// restoredTags has proper ExifDateTime objects restored
console.log(restoredTags.DateTimeOriginal instanceof ExifDateTime); // true
```
