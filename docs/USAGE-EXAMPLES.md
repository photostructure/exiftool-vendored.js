# Usage Examples

Complete examples for common exiftool-vendored use cases.

For detailed configuration options, see the [Configuration Guide](CONFIGURATION.md).

## Basic Setup

```javascript
import { exiftool } from "exiftool-vendored";
// or: const { exiftool } = require("exiftool-vendored");

// Verify installation
console.log(`ExifTool v${await exiftool.version()}`);

// Optional: graceful shutdown (Node.js will exit naturally without this as of v35)
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

## Resource Management

Node.js will not exit cleanly while any `ExifTool` instance has any running `exiftool` child processes due to the way that Node.js handles stdin/stdout/stderr streams.

At least with this library, it's up to you end what you start.

**Note**: depending on the platform, starting and ending an `exiftool` instance may be (very!) time consuming -- like, 5-30 seconds on Windows -- so ultrathink your code a bit to ensure you aren't spawning and killing exiftool instances needlessly.

_yes I said ultrathink as if it was Proper English but you know you thought it was funny_

### Manual Cleanup

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool();

try {
  const tags = await exiftool.read("photo.jpg");
  console.log(tags.Make, tags.Model);
} finally {
  // Optional: graceful shutdown (recommended for long-running apps)
  await exiftool.end();
}
```

### Automatic Cleanup with Disposable Interfaces

**For TypeScript 5.2+ projects** with proper tsconfig.json configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"]
  }
}
```

#### Synchronous Disposal

```javascript
import { ExifTool } from "exiftool-vendored";

// Block scope with automatic cleanup
{
  using et = new ExifTool();
  const tags = await et.read("photo.jpg");
  console.log(`Camera: ${tags.Make} ${tags.Model}`);
  // ExifTool.end(false) called automatically when block exits
}

// Multiple files with automatic cleanup
function processPhotos(filePaths) {
  using et = new ExifTool({ maxProcs: 4 });

  return Promise.all(
    filePaths.map(async (file) => {
      const tags = await et.read(file);
      return { file, camera: `${tags.Make} ${tags.Model}` };
    }),
  );
  // Cleanup happens even if Promise.all() throws
}
```

#### Asynchronous Disposal (Recommended)

```javascript
import { ExifTool } from "exiftool-vendored";

// Graceful cleanup with timeout protection
{
  await using et = new ExifTool();

  const tags = await et.read("photo.jpg");

  await et.write("photo.jpg", {
    XPComment: "Processed with exiftool-vendored, golly gee whiz it's neato",
    Copyright: "© 2024",
  });

  // ExifTool.end(true) called automatically with timeout protection
  // If graceful cleanup times out, forceful cleanup is attempted
}

// Function with automatic cleanup
async function batchProcessPhotos(filePaths) {
  await using et = new ExifTool({
    maxProcs: 8,
    taskTimeoutMillis: 30000,
  });

  const results = [];

  for (const file of filePaths) {
    try {
      const tags = await et.read(file);

      // Add copyright
      await et.write(file, {
        Copyright: "© 2025 Your Company",
      });

      results.push({ file, success: true, camera: tags.Make });
    } catch (error) {
      results.push({ file, success: false, error: error.message });
    }
  }

  return results;
  // Automatic cleanup happens here, even with exceptions
}
```

#### Error Handling with Disposables

```javascript
import { ExifTool } from "exiftool-vendored";

async function robustProcessing(file) {
  try {
    await using et = new ExifTool();

    const tags = await et.read(file);

    if (tags.errors?.length > 0) {
      console.warn(`Metadata warnings for ${file}:`, tags.errors);
    }

    return tags;
  } catch (error) {
    if (error.message.includes("ENOENT")) {
      throw new Error(`File not found: ${file}`);
    }
    throw error;
  }
  // ExifTool cleanup guaranteed, even with exceptions
}
```

#### Configurable Disposal Timeouts

```javascript
import { ExifTool } from "exiftool-vendored";

// Custom timeout configuration
{
  await using et = new ExifTool({
    disposalTimeoutMs: 2000, // 2 seconds for sync disposal
    asyncDisposalTimeoutMs: 30_000, // 30 seconds for async disposal
  });

  // Your processing here
  const tags = await et.read("large-file.tiff");
}
```

### Benefits of Disposable Interfaces

1. **Guaranteed Cleanup**: Resources are freed even if exceptions occur
2. **Timeout Protection**: Automatic forceful cleanup if graceful shutdown hangs
3. **Zero Boilerplate**: No manual `.end()` calls or complex try/finally blocks
4. **Scope-Based**: Clear resource lifetime tied to lexical scope
5. **Exception Safe**: Works correctly with async/await exception handling

### When to Use Each Approach

- **`using`**: Simple synchronous cleanup, fire-and-forget scenarios
- **`await using`**: Production code requiring graceful cleanup (recommended)
- **Manual `.end()`**: Pre-TypeScript 5.2 environments or fine-grained control
