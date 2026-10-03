/**
 * Original bytes for metadata strings that contained malformed UTF-8.
 *
 * Keys mirror the returned tag value. List indexes are represented as numeric
 * object keys, and branches without malformed strings are omitted. Each leaf
 * is a `Uint8Array`; intermediate values are nested `InvalidUtf8Bytes` objects.
 * Narrow a dynamic lookup with `value instanceof Uint8Array` before decoding
 * it.
 */
export interface InvalidUtf8Bytes {
  [tagOrIndex: string]: Uint8Array | InvalidUtf8Bytes;
}

export const InvalidUtf8Marker = "__etvInvalidUtf8V1";

const StringPrefix = "s:";
const Base64Prefix = "b64:";

interface InvalidUtf8WireValue {
  replacement: string;
  rawBase64: string;
}

type InvalidUtf8BytesValue = Uint8Array | InvalidUtf8Bytes;

interface Unwrapped {
  value: unknown;
  bytes?: InvalidUtf8BytesValue;
}

function wireValue(value: unknown): InvalidUtf8WireValue | undefined {
  if (value == null || typeof value !== "object" || Array.isArray(value)) {
    return;
  }
  const outerEntries = Object.entries(value as Record<string, unknown>);
  if (outerEntries.length !== 1 || outerEntries[0]?.[0] !== InvalidUtf8Marker) {
    return;
  }
  const payload = outerEntries[0][1];
  if (
    payload == null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return;
  }
  const payloadEntries = Object.entries(payload);
  if (
    payloadEntries.length !== 2 ||
    typeof (payload as Partial<InvalidUtf8WireValue>).replacement !==
      "string" ||
    typeof (payload as Partial<InvalidUtf8WireValue>).rawBase64 !== "string"
  ) {
    return;
  }
  const result = payload as InvalidUtf8WireValue;
  return result.replacement.startsWith(StringPrefix) &&
    result.rawBase64.startsWith(Base64Prefix)
    ? result
    : undefined;
}

function unwrap(value: unknown): Unwrapped {
  const wire = wireValue(value);
  if (wire != null) {
    return {
      value: wire.replacement.slice(StringPrefix.length),
      bytes: new Uint8Array(
        Buffer.from(wire.rawBase64.slice(Base64Prefix.length), "base64"),
      ),
    };
  }

  if (value == null || typeof value !== "object") return { value };

  const result = value as unknown[] | Record<string, unknown>;
  let bytes: InvalidUtf8Bytes | undefined;

  for (const [key, child] of Object.entries(value)) {
    const unwrapped = unwrap(child);
    if (unwrapped.value !== child) {
      Object.defineProperty(result, key, {
        configurable: true,
        enumerable: true,
        value: unwrapped.value,
        writable: true,
      });
    }
    if (unwrapped.bytes != null) {
      bytes ??= {};
      // Assignment would invoke Object.prototype.__proto__'s setter.
      Object.defineProperty(bytes, key, {
        configurable: true,
        enumerable: true,
        value: unwrapped.bytes,
        writable: true,
      });
    }
  }

  return bytes == null ? { value: result } : { value: result, bytes };
}

/** Restore byte arrays after callers serialize tags with `JSON.stringify()`. */
export function reviveInvalidUtf8Bytes(value: unknown): unknown {
  if (value == null || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  const entries = Object.entries(value);
  if (
    entries.length > 0 &&
    entries.every(
      ([key, byte], index) =>
        key === String(index) &&
        typeof byte === "number" &&
        Number.isInteger(byte) &&
        byte >= 0 &&
        byte <= 0xff,
    )
  ) {
    return Uint8Array.from(entries.map(([, byte]) => byte as number));
  }
  for (const [key, child] of entries) {
    const revived = reviveInvalidUtf8Bytes(child);
    if (revived !== child) {
      Object.defineProperty(value, key, {
        configurable: true,
        enumerable: true,
        value: revived,
        writable: true,
      });
    }
  }
  return value;
}

/** Decode the private ExifTool filter wrapper before returning public tags. */
export function unwrapInvalidUtf8Tags(tags: Record<string, unknown>): {
  tags: Record<string, unknown>;
  invalidUtf8Bytes?: InvalidUtf8Bytes;
} {
  const result = unwrap(tags);
  const decodedTags = { tags: result.value as Record<string, unknown> };
  return result.bytes == null || result.bytes instanceof Uint8Array
    ? decodedTags
    : { ...decodedTags, invalidUtf8Bytes: result.bytes };
}
