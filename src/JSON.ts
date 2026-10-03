import { BinaryField } from "./BinaryField";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import { reviveInvalidUtf8Bytes } from "./InvalidUtf8Bytes";

export type Json = Literal | { [key: string]: Json } | Json[];
export type Literal = string | number | boolean | bigint | null;

type JsonObject = { _ctor: string; [key: string]: Json };

/**
 * Helper type to extract the parameter type of a static fromJSON method
 * Usage: FromJSONParam<typeof SomeClass>
 */
type FromJSONParam<T> = T extends { fromJSON: (arg: infer P) => unknown }
  ? P
  : never;

const Revivers: Record<string, (value: JsonObject) => unknown> = {
  BinaryField: (ea) =>
    BinaryField.fromJSON(ea as unknown as FromJSONParam<typeof BinaryField>),
  ExifDateTime: (ea) =>
    ExifDateTime.fromJSON(ea as unknown as FromJSONParam<typeof ExifDateTime>),
  ExifDate: (ea) =>
    ExifDate.fromJSON(ea as unknown as FromJSONParam<typeof ExifDate>),
  ExifTime: (ea) =>
    ExifTime.fromJSON(ea as unknown as FromJSONParam<typeof ExifTime>),
};
/**
 * Parses a JSON string into an object, reviving the custom types defined in the Revivers map.
 *
 * - {@link BinaryField} is revived using {@link BinaryField.fromJSON}
 * - {@link ExifDateTime} is revived using {@link ExifDateTime.fromJSON}
 * - {@link ExifDate} is revived using {@link ExifDate.fromJSON}
 * - {@link ExifTime} is revived using {@link ExifTime.fromJSON}
 * - `invalidUtf8Bytes` sidecars are revived as nested `Uint8Array` values
 */
export function parseJSON(s: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- parseJSON() has always returned `any`; `unknown` would break callers
  return JSON.parse(s, (key, value: Json) => {
    if (
      typeof value === "object" &&
      value !== null &&
      "_ctor" in value &&
      typeof value._ctor === "string"
    ) {
      return Revivers[value._ctor]?.(value as JsonObject) ?? value;
    }
    if (key === "invalidUtf8Bytes") {
      return reviveInvalidUtf8Bytes(value);
    }
    return value;
  });
}
