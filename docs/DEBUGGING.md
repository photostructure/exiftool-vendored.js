# Debug Logging

Enable debug logging when `exiftool-vendored` isn't working as expected.

## Enable Debug Logging

### Environment Variable (Recommended)

```bash
NODE_DEBUG=exiftool-vendored npm test
NODE_DEBUG=exiftool-vendored node your-script.js
```

### Logger Option

```javascript
import { ExifTool } from "exiftool-vendored";

const exiftool = new ExifTool({
  logger: console, // Basic logging
});

// Or custom logger
const exiftool = new ExifTool({
  logger: {
    debug: (msg) => console.log(`[DEBUG] ${msg}`),
    info: (msg) => console.log(`[INFO] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`),
  },
});
```
