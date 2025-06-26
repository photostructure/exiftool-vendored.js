# Electron Integration Guide

`exiftool-vendored` in Electron requires special configuration for app packaging and sandboxing.

**Support Notice**: Due to Electron's complexity, we cannot provide support for Electron-specific issues. Use [Stack Overflow](https://stackoverflow.com/questions/tagged/electron), [Electron Discord](https://discord.gg/electron), or [Electron forums](https://www.electronjs.org/community).

## Installation

```bash
npm install exiftool-vendored
```

## Key Challenges

1. **Binary path resolution** - Finding ExifTool in packaged apps
2. **ASAR packaging** - ExifTool must be unpacked from ASAR
3. **Process spawning** - Child processes need correct paths

## Electron Builder

### Configuration

```yaml
# electron-builder.yml
asarUnpack:
  - "node_modules/exiftool-vendored.*/**/*"
```

Or in `package.json`:

```json
{
  "build": {
    "asarUnpack": ["node_modules/exiftool-vendored.*/**/*"]
  }
}
```

### Basic Usage

```javascript
import { exiftool } from "exiftool-vendored";
const tags = await exiftool.read("path/to/image.jpg");
```

### Custom Path (if needed)

```javascript
import { ExifTool } from "exiftool-vendored";
import path from "node:path";

const exiftool = new ExifTool({
  exiftoolPath: (platform) => {
    if (process.env.NODE_ENV === "development") {
      const suffix = platform === "win32" ? "exe" : "pl";
      return path.join(
        __dirname,
        "..",
        "node_modules",
        `exiftool-vendored.${suffix}`,
        "bin",
        "exiftool",
      );
    } else {
      const resourcesPath = process.resourcesPath;
      const suffix = platform === "win32" ? "exe" : "pl";
      return path.join(
        resourcesPath,
        "app.asar.unpacked",
        "node_modules",
        `exiftool-vendored.${suffix}`,
        "bin",
        "exiftool",
      );
    }
  },
});
```

## Electron Forge

### Configuration

```javascript
// forge.config.js
module.exports = {
  packagerConfig: {
    extraResource: [
      "./node_modules/exiftool-vendored." +
        (process.platform === "win32" ? "exe" : "pl"),
    ],
  },
};
```
