# 📸 exiftool-vendored

**Fast, cross-platform [Node.js](https://nodejs.org/) access to [ExifTool](https://exiftool.org/). Built and supported by [PhotoStructure](https://photostructure.com).**

[![npm version](https://img.shields.io/npm/v/exiftool-vendored.svg)](https://www.npmjs.com/package/exiftool-vendored)
[![Node.js CI](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/build.yml/badge.svg)](https://github.com/photostructure/exiftool-vendored.js/actions/workflows/build.yml)
[![GitHub issues](https://img.shields.io/github/issues/photostructure/exiftool-vendored.js.svg)](https://github.com/photostructure/exiftool-vendored.js/issues)

## 🚀 Installation & Quick Start

**Requirements**: Node.js Active LTS or Maintenance LTS versions only

```bash
npm install exiftool-vendored
```

```javascript
import { exiftool } from "exiftool-vendored";

// Read metadata
const tags = await exiftool.read("photo.jpg");
console.log(`Camera: ${tags.Make} ${tags.Model}`);
console.log(`Taken: ${tags.DateTimeOriginal}`);
console.log(`Size: ${tags.ImageWidth}x${tags.ImageHeight}`);

// Write metadata
await exiftool.write("photo.jpg", {
  XPComment: "Amazing sunset!",
  Copyright: "© 2024 Your Name",
});

// Extract thumbnail
await exiftool.extractThumbnail("photo.jpg", "thumb.jpg");

await exiftool.end();
```

## 🤔 Why exiftool-vendored?

### ⚡ **Performance**

Order of magnitude faster than other Node.js ExifTool modules. Powers [PhotoStructure](https://photostructure.com) and [1,000+ other projects](https://github.com/photostructure/exiftool-vendored.js/network/dependents).

### 🔧 **Battle-tested**

- **Cross-platform**: macOS, Linux, Windows
- **Full-featured**: Read, write, extract embedded images
- **Reliable**: Extensive test coverage across most camera manufacturers

### 📚 **Developer-Friendly**

- **TypeScript**: Full type definitions for thousands of metadata fields
- **Smart dates**: Timezone-aware `ExifDateTime` classes
- **Auto-generated tags**: Based on 10,000+ real camera samples

## ✨ Core Features

### Reading Metadata

```javascript
const tags = await exiftool.read("photo.jpg");

// Camera info
console.log(tags.Make, tags.Model, tags.LensModel);

// Capture settings
console.log(tags.ISO, tags.FNumber, tags.ExposureTime);

// Location (if available)
console.log(tags.GPSLatitude, tags.GPSLongitude);

// Always check for parsing errors
if (tags.errors?.length > 0) {
  console.warn("Metadata warnings:", tags.errors);
}
```

### Writing Metadata

```javascript
// Add keywords and copyright
await exiftool.write("photo.jpg", {
  Keywords: ["sunset", "landscape"],
  Copyright: "© 2024 Photographer Name",
  "IPTC:CopyrightNotice": "© 2024 Photographer Name",
});

// Update all date fields at once
await exiftool.write("photo.jpg", {
  AllDates: "2024:03:15 14:30:00",
});

// Delete tags
await exiftool.write("photo.jpg", {
  UserComment: null,
});
```

For targeted list-value and supported structured edits, use `editTags()`. See
[Editing Individual Tag Values](docs/USAGE-EXAMPLES.md#editing-individual-tag-values)
for examples, supported tags, and safety constraints.

### Extracting Images

```javascript
// Extract thumbnail
await exiftool.extractThumbnail("photo.jpg", "thumbnail.jpg");

// Extract preview (larger than thumbnail)
await exiftool.extractPreview("photo.jpg", "preview.jpg");

// Extract JPEG from RAW files
await exiftool.extractJpgFromRaw("photo.cr2", "processed.jpg");
```

## 🏷️ Understanding Tags

The `Tags` interface contains **thousands of metadata fields** from an auto-generated TypeScript file. Each tag has JSDoc annotations:

```typescript
/**
 * @frequency 🔥 ★★★★ (85%)
 * @groups EXIF, MakerNotes
 * @example 100
 */
ISO?: number;

/**
 * @frequency 🧊 ★★★☆ (23%)
 * @groups MakerNotes
 * @example "Custom lens data"
 */
LensSpec?: string;
```

- **🔥** = Found on mainstream devices (iPhone, Canon, Nikon, Sony)
- **🧊** = Only found on more obscure camera makes and models
- **★★★★** = Found in >50% of files, **☆☆☆☆** = rare (<1%)
- **@groups** = Metadata categories (EXIF, GPS, IPTC, XMP, etc.)
- **@example** = Representative values

## 🏷️🏷️ Group names: the recommended forward path

By default, `read()` returns bare tag names, like `Make` or `MeteringMode`.
Many tag names appear in **several** metadata groups of the same file, though
(`MeteringMode` may be in both `EXIF` and `MakerNotes`), and in bare mode
ExifTool silently picks one winner per name.

Set `groupNames: true` to key each tag by its group instead, exactly as
ExifTool's `-G` option renders it. This removes that ambiguity, and is the
**recommended path for new integrations**; bare mode remains fully supported,
but new features will target group-prefixed output first.

```ts
import { exiftool, tag } from "exiftool-vendored";

const t = await exiftool.read("photo.jpg", { groupNames: true });
// returns a GroupedTags object:
// { "EXIF:Make": "Canon", "EXIF:MeteringMode": "Multi-segment",
//   "MakerNotes:MeteringMode": "Pattern", zone: "America/Los_Angeles", ... }

t["EXIF:Make"]; // typed via the GroupedTags interface
tag(t, "Make"); // "Canon": tag() looks up bare names in either mode
```

### The output contract

- **Prefixed keys are ExifTool's output, verbatim.** Every tag that ExifTool
  emits (except `SourceFile`, which ExifTool itself leaves bare) is keyed
  `Group:TagName` using family-0 group names (`EXIF:Make`,
  `ExifTool:Warning`, `Composite:ImageSize`). The two exceptions are for data
  safety: the group-prefixed GPS position tags carry the library's validated,
  sign-corrected values, and if the GPS position is invalid, **all** GPS tags
  are omitted.
- **Bare keys are the library's own namespace**: `SourceFile`, `errors`,
  `warnings`, `zone`, `tz`, `tzSource`, `zoneSource`, `invalidUtf8Bytes`, and
  the parsed, validated GPS quartet (`GPSLatitude`, `GPSLatitudeRef`,
  `GPSLongitude`, `GPSLongitudeRef`).
- **`errors` and `warnings` aggregate everything**: ExifTool's stderr plus the
  JSON-embedded `Error`/`Warning` fields, whether bare or
  `ExifTool:`-prefixed.
- **`ExifToolVersion` stays a string** (`"12.30"` is not the same version as
  `"12.3"`), under the `ExifTool:ExifToolVersion` key.

### Caveats

- **Heuristics degroup first.** Timezone inference, video detection, and other
  heuristics look tags up by bare name via a degrouped view where the **last**
  group listed for a name wins. When a tag name appears in several groups with
  different values, those heuristics are approximations (in bare mode,
  ExifTool's internal priority picks the winner instead--neither view can
  reproduce the other).
- **Bare-name APIs**: `TagDescriptions.get()` and the
  `inferTimezoneFromDatestampTags` / `extractTzOffsetFromTags` machinery are
  keyed by bare tag names. Strip the `Group:` prefix before passing
  group-prefixed keys to them.
- **`APP0`...`APP15` segment tags** are only loosely typed in `GroupedTags`
  (as an `` `APP${number}:${string}` `` index signature): those groups hold a
  grab-bag of vendor-specific tags.

## 🛡️ Code defensively!

The generated `Tags` interface is a deliberately bounded, best-effort model of
what ExifTool extracts.

### Declared fields may be missing

Formats, cameras, and editing software write different subsets of metadata,
and later tools may strip fields. Treat every property as optional, even when
it is common for the files you currently handle.

### Undeclared fields may be included

The interface favors the most common and useful fields. Without tag pruning,
TypeScript fails with `TS2590: Expression produces a union type that is too
complex to represent`.

Rare, vendor-specific, and custom tags may still appear at runtime. If your app
needs arbitrary tags, intersect `Tags` with `Record<string, unknown>`; if a tag
would be useful to others, please open a PR to add it to the generated
interface.

### Value types may vary

ExifTool may return unexpected representations for malformed, ambiguous, or
format-specific values. Validate values at runtime and handle strings in
nominally numeric fields gracefully.

📖 **[Complete Tags Documentation →](docs/TAGS.md)**

## 🪤 Parsing gotchas

### Timezones may be inferred

Media metadata often omits its timezone, so this library uses several heuristics
to infer one. See [Dates & Timezones](#timezones) for the inference order and
configuration options.

### Malformed UTF-8 is marked and preserved

Malformed UTF-8 bytes are marked with the Unicode replacement character
U+FFFD, not ASCII `?`, so byte corruption stays distinguishable from
authored punctuation. The original bytes are preserved without another file
read in the sparse `invalidUtf8Bytes` sidecar:

```ts
const tags = await exiftool.read(file);
tags.ImageDescription; // "Arch Enemy\rG�teborg, 19.07.2007"

const bytes = tags.invalidUtf8Bytes?.ImageDescription;
if (bytes instanceof Uint8Array) {
  // Camera/tag-specific evidence identifies this Kodak value as MacRoman:
  const recovered = new TextDecoder("macintosh").decode(bytes);
  recovered; // "Arch Enemy\rGöteborg, 19.07.2007"
}
```

The `macintosh` charset is justified by evidence for this specific Kodak
value; it is not a default for every damaged field.

Nested metadata mirrors the representation selected by ExifTool's `struct`
option. Extracted XML element text, attribute values, CDATA, and parsed
embedded XML values are captured at their returned paths. These are the
bytes of ExifTool's extracted value after XML parsing, not the original XML
token: entity spellings and CDATA delimiters are not retained. Value filters
never receive XML element or attribute _names_, and ExifTool's JSON output
repairs or canonicalizes malformed names before the library sees them, so
their exact bytes cannot be exposed by this sidecar.

The library deliberately does not guess a legacy charset: files assembled
over many years may contain several encodings, and readable alternatives are
not necessarily correct. Consumers can decode only the sidecar entries using
their own camera/tag/user context. An explicit custom ExifTool `Filter`
disables both built-in repair and byte capture. To restore the pre-v37
display, guard on the value type first:
`typeof value === "string" ? value.replace(/\uFFFD/g, "?") : value`.

## ⚠️ Important Notes

### Configuration

exiftool-vendored provides two levels of configuration:

**Library-wide Settings** - Global configuration affecting all instances:

```javascript
import { Settings } from "exiftool-vendored";

// Enable parsing of archaic timezone offsets for historical photos
Settings.allowArchaicTimezoneOffsets.value = true;
```

**Per-instance Options** - Configuration for individual ExifTool instances:

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  maxProcs: 8, // More concurrent processes
  useMWG: true, // Use Metadata Working Group tags
  backfillTimezones: true, // Infer missing timezones
});
```

📖 **[Complete Configuration Guide →](docs/CONFIGURATION.md)**

<a id="timezones"></a>

### Dates & Timezones

Images rarely specify timezones. This library infers them using several heuristics:

1. **Explicit metadata** (TimeZoneOffset, OffsetTime)
2. **GPS location** → timezone lookup
3. **UTC timestamps** → calculate offset

```javascript
const dt = tags.DateTimeOriginal;
if (dt instanceof ExifDateTime) {
  console.log("Timezone offset:", dt.tzoffset, "minutes");
  console.log("Timezone:", dt.zone);
}
```

📖 **[Date & Timezone Guide →](docs/DATES.md)**

### Resource Cleanup

With the default settings, ExifTool workers no longer keep Node.js alive after
awaited work finishes. During normal shutdown, the library attempts to clean up
workers automatically. Abrupt termination, such as `SIGKILL` or an operating-
system crash, cannot run cleanup handlers.

Call and await `.end()` when cleanup must finish before your application
continues or exits. For servers and daemons, make this one part of the
application's complete shutdown procedure:

```javascript
import { exiftool } from "exiftool-vendored";

async function shutdown(signal) {
  try {
    await closeApplicationResources(); // Server, sockets, database, etc.
    await exiftool.end();
  } finally {
    // A signal listener disables Node's default termination behavior. Re-send
    // the signal after cleanup so the process terminates normally.
    process.kill(process.pid, signal);
  }
}

process.once("SIGINT", (signal) => void shutdown(signal));
process.once("SIGTERM", (signal) => void shutdown(signal));
```

#### Automatic Cleanup with Disposable Interfaces

For **TypeScript 5.2+** projects configured for explicit resource management,
you can bind an instance's lifecycle to a scope:

```javascript
import { ExifTool } from "exiftool-vendored";

// Starts cleanup when the scope exits, but does not wait for it
{
  using et = new ExifTool();
  const tags = await et.read("photo.jpg");
  // ExifTool cleanup is initiated when the block exits
}

// Waits for cleanup when the scope exits (recommended)
{
  await using et = new ExifTool();
  const tags = await et.read("photo.jpg");
  // ExifTool cleanup is awaited when the block exits
}
```

**Benefits:**

- **Scope-bound disposal**: Disposal runs on ordinary scope exit, including exceptions
- **Awaited cleanup**: `await using` waits for asynchronous disposal
- **Less boilerplate**: No manual `try`/`finally` cleanup block

**Caution:**

- **Operating-system startup lag**: Startup time varies widely with the OS,
  hardware, and security software, and can take several seconds on some
  systems. Don't dispose an instance until you're really done with it.

### Tag Completeness

The `Tags` interface shows the most common fields, but ExifTool can extract many more. Cast to access unlisted fields:

```javascript
const tags = await exiftool.read("photo.jpg");
const customField = (tags as any).UncommonTag;
```

## 📚 Documentation

### **Guides**

- **[Installation Guide](docs/INSTALLATION.md)** - Electron, Docker, platform setup
- **[Usage Examples](docs/USAGE-EXAMPLES.md)** - Comprehensive API examples
- **[Date Handling](docs/DATES.md)** - Timezone complexities explained
- **[Tags Reference](docs/TAGS.md)** - Understanding the 2,500+ metadata fields
- **[Electron Integration](docs/ELECTRON.md)** - Electron-specific setup

### **Troubleshooting**

- **[Debugging Guide](docs/DEBUGGING.md)** - Debug logging and common issues
- **[Temporal Migration](docs/TEMPORAL-MIGRATION.md)** - Future JavaScript Temporal API

### **API Reference**

- **[TypeDoc Documentation](https://photostructure.github.io/exiftool-vendored.js/)** - Complete API reference

## ⚡ Performance

The default singleton is throttled for stability. For high-throughput processing:

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  maxProcs: 8, // More concurrent processes
  minDelayBetweenSpawnMillis: 0, // Faster spawning
  streamFlushMillis: 10, // Faster streaming
});

// Process many files efficiently
const results = await Promise.all(filePaths.map((file) => exiftool.read(file)));

await exiftool.end();
```

**Benchmarks**: 20+ files/second/thread, 500+ files/second using all CPU cores.

## 🤝 Support & Community

- **📋 Issues**: [GitHub Issues](https://github.com/photostructure/exiftool-vendored.js/issues)
- **📖 Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **🔒 Security**: [SECURITY.md](SECURITY.md)
- **📄 License**: [MIT](LICENSE)

### Contributors

[Matthew McEachen](https://github.com/mceachen), [Joshua Harris](https://github.com/Circuit8), [Anton Mokrushin](https://github.com/amokrushin), [Luca Ban](https://github.com/mesqueeb), [Demiurga](https://github.com/apolkingg8), [David Randler](https://github.com/draity)
