import { DateTime } from "luxon";
import { ExifDate } from "./ExifDate";
import { ExifDateTime } from "./ExifDateTime";
import { ExifTime } from "./ExifTime";
import { Maybe } from "./Maybe";

export function validDateTime(dt: Maybe<DateTime>): dt is DateTime {
  return dt?.isValid === true;
}

export const SecondMs = 1000;
export const MinuteMs = 60 * SecondMs;
export const HourMs = 60 * MinuteMs;
export const DayMs = 24 * HourMs;

export type DateOrTime = ExifDateTime | ExifDate | ExifTime | DateTime;

export function isDateOrTime(o: unknown): o is DateOrTime {
  return (
    o instanceof ExifDateTime ||
    o instanceof ExifDate ||
    o instanceof ExifTime ||
    DateTime.isDateTime(o)
  );
}

export function dateTimeToExif(
  d: DateTime,
  opts?: { includeOffset?: boolean; includeMilliseconds?: boolean },
): string {
  return d.toFormat(
    "y:MM:dd HH:mm:ss" +
      (opts?.includeMilliseconds === true ? ".u" : "") +
      (opts?.includeOffset === false ? "" : "ZZ"),
  );
}

export function toExifString(d: DateOrTime): Maybe<string> {
  if (DateTime.isDateTime(d)) {
    return dateTimeToExif(d);
  } else {
    return d?.toExifString?.();
  }
}

export function hms(
  d: DateTime,
  opts?: { includeMilliseconds?: boolean },
): string {
  return d.toFormat(
    "HH:mm:ss" + (opts?.includeMilliseconds === true ? ".SSS" : ""),
  );
}
