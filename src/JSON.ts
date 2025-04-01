/* eslint-disable @typescript-eslint/no-explicit-any */
import { BinaryField } from "./BinaryField";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";

const Revivers = {
  BinaryField: (ea: any) => BinaryField.fromJSON(ea),
  ExifDateTime: (ea: any) => ExifDateTime.fromJSON(ea),
  ExifDate: (ea: any) => ExifDate.fromJSON(ea),
  ExifTime: (ea: any) => ExifTime.fromJSON(ea),
} as Record<string, (value: unknown) => unknown>;
/**
 * Parses a JSON string into an object, reviving the custom types defined in the Revivers map.
 *
 * - {@link BinaryField} is revived using {@link BinaryField.fromJSON}
 * - {@link ExifDateTime} is revived using {@link ExifDateTime.fromJSON}
 * - {@link ExifDate} is revived using {@link ExifDate.fromJSON}
 * - {@link ExifTime} is revived using {@link ExifTime.fromJSON}
 */
export function parseJSON(s: string) {
  return JSON.parse(s, (_key, value: any) => {
    return Revivers[value?._ctor]?.(value) ?? value;
  });
}
