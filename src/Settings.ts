import * as bc from "batch-cluster";
import { debuglog } from "node:util";

/**
 * A function that unsubscribes from a Setting change listener.
 * @see Setting.onChange
 */
export type UnsubscribeFunction = () => void;

/**
 * A setting value that can be observed for changes.
 *
 * Each Setting instance manages its own value and listeners, providing
 * a clean, composable alternative to global event buses or proxies.
 */
export class Setting<T> {
  #value: T;
  readonly #listeners = new Set<(oldValue: T, newValue: T) => void>();

  constructor(readonly defaultValue: T) {
    this.#value = this.defaultValue;
  }

  /** Get the current value */
  get value(): T {
    return this.#value;
  }

  /** Set a new value, notifying listeners if changed */
  set value(newValue: T) {
    if (this.#value !== newValue) {
      const old = this.#value;
      this.#value = newValue;
      for (const ea of this.#listeners) {
        ea(old, newValue);
      }
    }
  }

  /**
   * Subscribe to value changes.
   *
   * @returns Unsubscribe function
   */
  onChange(listener: (oldValue: T, newValue: T) => void): UnsubscribeFunction {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  /** Reset to default value */
  reset(): void {
    this.value = this.defaultValue;
  }

  /** Allow implicit coercion in conditionals */
  valueOf(): T {
    return this.#value;
  }

  toString(): string {
    return String(this.#value);
  }
}

const _debuglog = debuglog("exiftool-vendored");
function noop() {}

const ConsoleLogger: bc.Logger = {
  trace: noop,
  debug: _debuglog,
  info: _debuglog,
  warn: console.warn,
  error: console.error,
};

const defaultLogger = () => (_debuglog.enabled ? ConsoleLogger : bc.NoLogger);

/**
 * Library-wide configuration settings for exiftool-vendored
 *
 * @see ExifToolOptions for per-instance settings.
 */
export const Settings = {
  /**
   * Allow parsing of archaic timezone offsets that are no longer in use.
   *
   * These include historical offsets like:
   * - "-10:30" (Hawaii 1896-1947)
   * - "-04:30" (Venezuela 1912-1965, 2007-2016)
   * - "+04:51" (Bombay until 1955)
   * - and others from
   *   https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   *
   * **Warning**: Enabling this may lead to incorrect timezone parsing for
   * modern files, as these offsets are not currently used anywhere. Only enable
   * this if you are specifically working with historical photographs or scanned
   * archival material.
   *
   * @default false
   */
  allowArchaicTimezoneOffsets: new Setting(false),

  /**
   * Allow parsing of the UTC-12:00 timezone offset ("Baker Island Time") as a
   * valid timezone.
   *
   * This timezone is not used for any populated land, and is disabled by
   * default to prevent incorrect timezone parsing from files with mangled
   * metadata.
   *
   * @default false
   */
  allowBakerIslandTime: new Setting(false),

  /**
   * Maximum distance (in minutes) from a valid timezone offset to accept when
   * inferring timezones from GPS or UTC timestamp comparisons.
   *
   * This threshold handles GPS time drift and clock skew. GPS acquisition may
   * lag behind the actual photo time, especially if the GPS fix is old or the
   * camera clock is slightly off.
   *
   * - **15 minutes**: Stricter matching, fewer false positives, but may reject
   *   photos with older GPS fixes
   * - **30 minutes**: More tolerant of GPS lag, recommended for photos that may
   *   have stale GPS data
   *
   * @default 30 minutes
   */
  maxValidOffsetMinutes: new Setting(30),

  /**
   * Logger instance used throughout exiftool-vendored.
   *
   * By default, this is set to ConsoleLogger if NODE_DEBUG=exiftool-vendored is
   * set, otherwise NoLogger.
   *
   * This can be changed at runtime to redirect logging output. When changed,
   * the batch-cluster global logger is also updated for consistency.
   *
   * @default ConsoleLogger or NoLogger based on NODE_DEBUG
   */
  logger: new Setting<() => bc.Logger>(defaultLogger),

  /** Reset all settings to their default values */
  reset() {
    for (const ea of Object.values(this)) {
      if (ea instanceof Setting) ea.reset();
    }
  },
};
