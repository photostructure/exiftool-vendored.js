# Installation Guide

## Basic Installation

```bash
npm install exiftool-vendored
```

## Platform Requirements

### Node.js Requirements

- **Node.js 20+** (Active LTS or Maintenance LTS versions only)
- Works on macOS, Linux, and Windows

### System Dependencies

#### Linux

- **Most distributions**: No additional setup required
- **Minimal distributions** (Alpine, Docker slim): **install `perl`**

  ```bash
  # Alpine
  apk add perl

  # Debian/Ubuntu minimal
  apt-get install perl
  ```

## Docker

### Standard Images

Use the full Node.js Docker image, not the `-slim` variant:

```dockerfile
# ✅ Good - includes perl
FROM node:18

# ❌ Bad - missing perl
FROM node:18-slim
```

### Slim Images

If you must use slim images, install `perl`:

```dockerfile
FROM node:18-slim
RUN apt-get update && apt-get install -y perl && rm -rf /var/lib/apt/lists/*
```

### Example Dockerfile

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]
```

### Temporary Files

ExifTool creates temporary files during processing. Ensure:

- Adequate disk space in temp directory
- Proper cleanup on application shutdown
- Secure temp directory permissions

## Next Steps

After installation:

1. **Verify setup**: Run `exiftool.version()` to confirm working installation
2. **Read the [Usage Examples](USAGE-EXAMPLES.md)** for common patterns
3. **Understand [Tags](TAGS.md)** to work with metadata effectively
4. **Add proper error handling** and resource cleanup
