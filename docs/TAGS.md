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

## JSDoc Annotations

Each tag in the TypeScript interface includes semantic JSDoc annotations:

```ts
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

These annotations provide:

- **@frequency**
  - A 🔥 fire emoji will very professionally begin this value if the tag is found on common mainstream devices, like flagship phones and digital cameras.
  - A 🧊 ice cube emoji will begin this value if the tag is only found on more obscure camera makes and models.
  - A star rating (★★★★ is found in >50% of samples, ☆☆☆☆ is rare), and the exact percentage in parentheses follows. Note that these values are _directionally_ correct -- it's based on the (large) sample set of test images from the ExifTool project and several other online image example repositories.
- **@groups**: Comma-separated list of metadata groups where this tag appears
- **@example**: Representative value for the tag

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

## Auto-Generation Process

The `Tags` interface is **automatically generated** by the `mktags.ts` script, which:

1. **Analyzes 6,000+ sample images** from different camera makes and models
2. **Extracts all metadata fields** found across these samples
3. **Calculates popularity ratings** based on frequency of occurrence
4. **Generates TypeScript interfaces** with proper types and examples
5. **Generates TagMetadata.json** with programmatic access to tag frequency and mainstream device compatibility data
6. **Identifies camera compatibility** patterns

Source images come from:

- [ExifTool metadata repository](https://exiftool.org/sample_images.html)
- [raw.pixls.us](https://raw.pixls.us) sample archive
- Real-world photo collections

## TagMetadata.json

The `mktags` script also generates `data/TagMetadata.json`, which provides programmatic access to tag metadata in the format:

```typescript
Record<
  string,
  {
    frequency: number; // 0-1 decimal: percentage of sample files containing this tag
    mainstream: boolean; // true if tag is from mainstream consumer devices (iPhone, popular Canon/Nikon/Sony)
    groups: string[]; // sorted array of metadata groups where this tag appears (e.g., ["EXIF", "MakerNotes"])
  }
>;
```

This allows developers to programmatically access the same frequency and device compatibility information shown in the JSDoc annotations, plus metadata group information for understanding where tags originate (EXIF, XMP, MakerNotes, etc.).

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

1. Visit the [online API docs](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.Tags.html) to browse all available tags with examples.

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

Check for parsing [errors and warnings](https://photostructure.github.io/exiftool-vendored.js/interfaces/ExifTool.ErrorsAndWarnings.html) in the returned `Tags` object:

```typescript
// const tags = await exiftool.read("photo.jpg");p

if (tags.errors && tags.errors.length > 0) {
  console.warn("Metadata parsing issues:", tags.errors);
}
```
