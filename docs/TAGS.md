# Understanding Tags in exiftool-vendored

## Overview

The `Tags` interface in exiftool-vendored represents the massive world of image and video metadata. The core `Tags.ts` file is an auto-generated TypeScript file defining **thousands of metadata fields** that can be extracted from photos and videos.

## What are Tags?

Tags are metadata fields embedded in image and video files. They contain information like:

- **Camera settings**: ISO, aperture, shutter speed
- **Timestamps**: When the photo was taken, modified
- **Location data**: GPS coordinates, timezone information
- **Technical details**: Image dimensions, file format, color space
- **Descriptive metadata**: Keywords, copyright, descriptions

## JSDoc Notation System

Each tag in the TypeScript interface uses a special JSDoc comment format to indicate its **popularity** and **camera compatibility**:

```typescript
/** ★★★★ ✔ Example: 1920 */
ImageHeight?: number

/** ★☆☆☆   Example: "Custom tag value" */
RareCustomTag?: string
```

### Star Rating System (Popularity)

- **★★★★** - Found in **>50% of files** (very common)
- **★★★☆** - Common
- **★★☆☆** - Less common
- **★☆☆☆** - Rare
- **☆☆☆☆** - Very rare, found in **<1% of files**

### Checkmark Symbol (Camera Compatibility)

- **✔** - Found in popular cameras (Canon, Nikon, Sony, Apple devices)
- _(no checkmark)_ - Less common across mainstream cameras

### Examples

```typescript
/** ★★★★ ✔ Example: "image/jpeg" */
MIMEType?: string          // Very common, all cameras

/** ★★☆☆ ✔ Example: 200 */
ISO?: number               // Common, mainstream cameras

/** ☆☆☆☆   Example: "Custom data" */
ProprietaryField?: string  // Very rare, specific models only
```

## Auto-Generation Process

The `Tags` interface is **automatically generated** by the `mktags.ts` script, which:

1. **Analyzes 6,000+ sample images** from different camera makes and models
2. **Extracts all metadata fields** found across these samples
3. **Calculates popularity ratings** based on frequency of occurrence
4. **Generates TypeScript interfaces** with proper types and examples
5. **Generates TagMetadata.json** with programmatic access to tag popularity and compatibility data
6. **Identifies camera compatibility** patterns

Source images come from:

- [ExifTool metadata repository](https://exiftool.org/sample_images.html)
- [raw.pixls.us](https://raw.pixls.us) sample archive
- Real-world photo collections

## Interface Structure

The `Tags` interface combines multiple tag categories:

```typescript
export interface Tags
  extends FileTags, // File system info (size, dates, permissions)
    EXIFTags, // Camera settings (ISO, aperture, etc.)
    GPSTags, // Location data
    IPTCTags, // Descriptive metadata
    XMPTags, // Adobe metadata standard
    MakerNotesTags, // Camera manufacturer specific
    CompositeTags, // Calculated/derived values
    ExifToolTags {
  // ExifTool-specific fields
  // ... combined interface
}
```

### Major Tag Categories

- **FileTags**: File system metadata (size, dates, permissions)
- **EXIFTags**: Standard camera settings and technical data
- **GPSTags**: Geolocation information
- **IPTCTags**: Publishing and descriptive metadata
- **XMPTags**: Adobe's extensible metadata platform
- **MakerNotesTags**: Proprietary camera manufacturer data
- **CompositeTags**: Calculated values (like timezone-adjusted dates)

## Important Limitations

### ⚠️ Interface is Not Comprehensive

**The `Tags` interface does not include every possible metadata field.**

This is by design due to TypeScript limitations:

- ExifTool can extract **thousands** of different tag fields
- TypeScript crashes with "union type too complex" errors if we include everything
- We focus on the **most commonly used** fields

### Unknown Fields Still Returned

**Just because a field isn't in the `Tags` interface doesn't mean it won't be in your data.**

```typescript
const tags = await exiftool.read("photo.jpg");

// These are typed and autocomplete:
console.log(tags.Make); // "Canon"
console.log(tags.Model); // "EOS R5"

// This field might exist but isn't typed:
if ("CustomCameraField" in tags) {
  // do something interesting with tags.CustomCameraField
}
```

## Finding Relevant Tags

With thousands of possible fields, how do you find what you need?

### 1. Start with Very Common Tags (★★★★)

Focus on 4-star tags first - they're found in most files:

- `Make`, `Model` - Camera identification
- `ImageWidth`, `ImageHeight` - Dimensions
- `DateTime`, `DateTimeOriginal` - Timestamps
- `MIMEType` - File format

### 2. Use IDE Autocomplete

TypeScript provides excellent autocomplete for tag names:

```typescript
const tags = await exiftool.read("photo.jpg");
tags.  // <-- IDE shows all available tags with descriptions
```

### 3. Check the Documentation

1. Visit the [online API docs](https://photostructure.github.io/exiftool-vendored.js/interfaces/Tags.html) to browse all available tags with examples.

2. Refer to the [excellent ExifTool documentation](https://exiftool.org/TagNames/index.html). Start with the [EXIF](https://exiftool.org/TagNames/EXIF.html), [IPTC](https://exiftool.org/TagNames/IPTC.html), and [XMP](https://exiftool.org/TagNames/XMP.html) groups -- those are the most common.

### 4. Research Your Use Case

Different use cases need different tags:

- **Photo organizing**: `DateTime*`, `Make`, `Model`, `GPS*`
- **Print sizing**: `ImageWidth`, `ImageHeight`, `XResolution`, `YResolution`
- **Copyright/licensing**: `Copyright`, `Artist`, `Rights*`
- **Technical analysis**: `ISO`, `FNumber`, `ExposureTime`, `WhiteBalance`

## Working with Tag Values

### Type Safety

Tags have proper TypeScript types:

```typescript
const tags = await exiftool.read("photo.jpg");

// Number fields
const width: number | undefined = tags.ImageWidth;
const iso: number | undefined = tags.ISO;

// String fields
const make: string | undefined = tags.Make;
const mimeType: string | undefined = tags.MIMEType;

// Date fields (special classes)
const created: ExifDateTime | string | undefined = tags.DateTimeOriginal;
```

### Handling Missing Values

Most tags are optional (`?`) since not all files contain all metadata:

```typescript
const tags = await exiftool.read("photo.jpg");

// Safe checking
if (tags.Make) {
  console.log(`Camera: ${tags.Make}`);
}

// With defaults
const make = tags.Make ?? "Unknown";
const width = tags.ImageWidth ?? 0;

// Nullish coalescing for fallbacks
const timestamp = tags.DateTimeOriginal ?? tags.DateTime ?? tags.FileModifyDate;
```

### Error Handling

Check for parsing [errors and warnings](https://photostructure.github.io/exiftool-vendored.js/interfaces/ErrorsAndWarnings.html) in the returned `Tags` object:

```typescript
// const tags = await exiftool.read("photo.jpg");p

if (tags.errors && tags.errors.length > 0) {
  console.warn("Metadata parsing issues:", tags.errors);
}
```
