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

export function parseJSON(s: string) {
  return JSON.parse(s, (_key, value: any) => {
    return Revivers[value?._ctor]?.(value) ?? value;
  });
}
