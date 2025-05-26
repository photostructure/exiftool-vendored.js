import { DateTime } from "luxon";

import { HourMs, validDateTime } from "./DateTime";
import { Maybe, firstDefinedThunk } from "./Maybe";
import { blank, pad2, toS } from "./String";

/**
 * Base type for year-only date
 */
export interface ExifDateYearOnly {
  readonly year: number;
}

/**
 * Type for year-month date (extends year-only)
 */
export interface ExifDateYearMonth extends ExifDateYearOnly {
  readonly month: number;
}

/**
 * Type for full date (extends year-month)
 */
export interface ExifDateFull extends ExifDateYearMonth {
  readonly day: number;
}

/**
 * Type for partial ExifDate (year-only or year-month)
 */
export type ExifDatePartial = ExifDateYearOnly | ExifDateYearMonth;

const StrictExifRE = /^\d{1,4}:\d{1,2}:\d{1,2}|\d{1,4}-\d{1,2}-\d{1,2}$/;
const YearMonthRE = /^\d{1,4}[:-]\d{1,2}$/;
const YearOnlyRE = /^\d{1,4}$/;
const LooseExifRE = /^\S+\s+\S+\s+\S+$/;

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  static from(exifOrIso: string | number): Maybe<ExifDate> {
    if (typeof exifOrIso === "number") {
      return this.fromYear(exifOrIso);
    }
    return (
      // in order of strictness:
      this.fromExifStrict(exifOrIso) ??
      this.fromYearMonth(exifOrIso) ??
      this.fromYear(exifOrIso) ??
      this.fromISO(exifOrIso) ??
      this.fromExifLoose(exifOrIso)
    );
  }
  static fromISO(text: string): Maybe<ExifDate> {
    return StrictExifRE.test(toS(text).trim())
      ? this.fromDateTime(DateTime.fromISO(text), text)
      : undefined;
  }

  private static fromPatterns(text: string, fmts: string[]) {
    if (blank(text)) return;
    text = toS(text).trim();
    for (const fmt of fmts) {
      const dt = DateTime.fromFormat(text, fmt);
      if (validDateTime(dt)) {
        return this.fromDateTime(dt, text);
      }
    }
    return;
  }

  // These are all formats I've seen in the wild from exiftool's output.

  // More iterations might make sense, like "d MMM, y" or "MMM d, y", but I
  // want to be constrained in what I consider a valid date to lessen the
  // chance of misinterpreting a given value.

  static fromExifStrict(text: string): Maybe<ExifDate> {
    return StrictExifRE.test(toS(text).trim())
      ? this.fromPatterns(text, ["y:MM:dd", "y-MM-dd", "y:M:d"])
      : undefined;
  }

  static fromYearMonth(text: string | number): Maybe<ExifDate> {
    const textStr = toS(text).trim();
    if (!YearMonthRE.test(textStr)) return undefined;

    for (const fmt of ["y:MM", "y-MM", "y:M", "y-M"]) {
      const dt = DateTime.fromFormat(textStr, fmt);
      if (validDateTime(dt)) {
        return new ExifDate(dt.year, dt.month, undefined, textStr);
      }
    }
    return undefined;
  }

  static fromYear(yearValue: string | number): Maybe<ExifDate> {
    const textStr = toS(yearValue).trim();
    if (YearOnlyRE.test(textStr)) {
      const year = parseInt(textStr, 10);
      if (!isNaN(year) && year > 0 && year <= 9999) {
        return new ExifDate(year, undefined, undefined, textStr);
      }
    }
    return undefined;
  }

  static fromExifLoose(text: string): Maybe<ExifDate> {
    // Unfortunately, Luxon parses "00" and "01" as _today_. So if we don't
    // three non-blank strings parts, reject.
    return LooseExifRE.test(toS(text).trim())
      ? this.fromPatterns(text, ["MMM d y", "MMMM d y"])
      : undefined;
  }

  static fromEXIF(text: string): Maybe<ExifDate> {
    return firstDefinedThunk([
      () => this.fromExifStrict(text),
      () => this.fromExifLoose(text),
    ]);
  }

  static fromDateTime(dt: DateTime, rawValue?: string): Maybe<ExifDate> {
    return validDateTime(dt)
      ? new ExifDate(dt.year, dt.month, dt.day, rawValue)
      : undefined;
  }

  constructor(
    readonly year: number, // full year (probably 2019-ish, but maybe Japanese 30-ish). See https://ericasadun.com/2018/12/25/iso-8601-yyyy-yyyy-and-why-your-year-may-be-wrong/
    readonly month?: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day?: number, // 1-31
    readonly rawValue?: string,
  ) {}

  toDate(): Date {
    return new Date(this.year, (this.month ?? 1) - 1, this.day ?? 1);
  }

  /**
   * @param deltaMs defaults to 12 hours, so toMillis() is in the middle of the day.
   *
   * @return the epoch milliseconds for this day in UTC, plus `deltaMs` milliseconds.
   */
  toMillis(deltaMs = 12 * HourMs) {
    return this.toDate().getTime() + deltaMs;
  }

  toISOString(): string {
    return this.toString("-");
  }

  toExifString(): string {
    return this.toString(":");
  }

  toString(sep = "-"): string {
    if (this.month == null) {
      return `${this.year}`;
    }
    if (this.day == null) {
      return `${this.year}${sep}${pad2(this.month).join("")}`;
    }
    return `${this.year}${sep}${pad2(this.month, this.day).join(sep)}`;
  }

  toJSON() {
    return {
      _ctor: "ExifDate",
      year: this.year,
      month: this.month,
      day: this.day,
      rawValue: this.rawValue,
    };
  }

  static fromJSON(json: ReturnType<ExifDate["toJSON"]>): ExifDate {
    return new ExifDate(json.year, json.month, json.day, json.rawValue);
  }

  /**
   * @returns true if this is a partial date (year-only or year-month)
   */
  isPartial(): this is ExifDatePartial {
    return this.month == null || this.day == null;
  }

  /**
   * @returns true if this is a year-only date
   */
  isYearOnly(): this is ExifDateYearOnly {
    return this.month == null;
  }

  /**
   * @returns true if this is a year-month date (no day)
   */
  isYearMonth(): this is ExifDateYearMonth {
    return this.month != null && this.day == null;
  }

  /**
   * @returns true if this is a full date (year, month, and day)
   */
  isFullDate(): this is ExifDateFull {
    return this.month != null && this.day != null;
  }
}
