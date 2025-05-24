import { Maybe } from "./Maybe";
import { roundToDecimalPlaces, toFloat } from "./Number";
import { blank, toS } from "./String";

// Constants
const MAX_LATITUDE_DEGREES = 90;
const MAX_LONGITUDE_DEGREES = 180;

type Direction = "N" | "S" | "E" | "W";
type CoordinateFormat = "DMS" | "DM" | "D";

interface Coordinate {
  decimal: number;
  degrees: number;
  minutes: number | undefined;
  seconds: number | undefined;
  direction: Direction | undefined;
  format: CoordinateFormat;
  remainder: string | undefined;
}

class CoordinateParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CoordinateParseError";
  }
}

export interface CoordinateResult {
  latitude: number;
  longitude: number;
}

// Regex to match simple decimal coordinates, like "37.5, -122.5"
const DecimalCoordsRE = /^(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)$/;

/**
 * Parses a string containing both latitude and longitude coordinates.
 * @param input - String containing both coordinates
 * @returns Object containing latitude and longitude in decimal degrees, or undefined if parsing fails
 * @throws CoordinateParseError if the input format is invalid
 */
export function parseCoordinates(input: string): CoordinateResult {
  input = toS(input).trim();
  if (input.length === 0) {
    throw new CoordinateParseError("Input string cannot be empty");
  }

  if (DecimalCoordsRE.test(input)) {
    const split = input.split(/[\s,]+/);
    const [latitude, longitude] = split
      .map(toFloat)
      .map((ea) => (ea == null ? null : roundGpsDecimal(ea)));
    if (latitude == null || longitude == null) {
      throw new CoordinateParseError("Failed to parse decimal coordinates");
    }
    return { latitude, longitude };
  }

  let latitude: number | undefined;
  let longitude: number | undefined;

  for (const coord of parseStringCoordinates(input)) {
    if (!coord.direction) {
      throw new CoordinateParseError(
        "Direction is required for position parsing",
      );
    }

    if (coord.direction === "S" || coord.direction === "N") {
      if (latitude !== undefined) {
        throw new CoordinateParseError("Multiple latitude values found");
      }
      latitude = toDecimalDegrees(coord);
    } else {
      if (longitude != null) {
        throw new CoordinateParseError("Multiple longitude values found");
      }
      longitude = toDecimalDegrees(coord);
    }
  }
  const missing = [];
  if (latitude == null) missing.push("latitude");
  if (longitude == null) missing.push("longitude");

  if (latitude == null || longitude == null) {
    throw new CoordinateParseError(`Missing ${missing.join(" and ")}`);
  } else {
    return { latitude, longitude };
  }
}

/**
 * Parses a string containing one or more coordinates.
 * @param input - String containing coordinates
 * @returns Array of parsed coordinates
 */
function parseStringCoordinates(input: string): [Coordinate, Coordinate] {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty");
  }

  const lat = parseCoordinate(input, true);
  const remainders = lat.remainder;
  if (blank(remainders)) {
    throw new CoordinateParseError("Expected multiple coordinates");
  }
  return [lat, parseCoordinate(remainders)];
}

/**
 * Parses a coordinate string in decimal degrees format.
 * @param input - String containing a single coordinate
 * @returns Object containing degrees and direction, or undefined if parsing fails
 * @throws CoordinateParseError if the format is not decimal degrees or direction is missing
 */
export function parseDecimalCoordinate(
  input: string,
): { decimal: number; direction: Direction } | undefined {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty");
  }

  const coord = parseCoordinate(input);
  if (coord.format !== "D") {
    throw new CoordinateParseError("Expected decimal degrees format");
  }
  if (!coord.direction) {
    throw new CoordinateParseError("Missing direction");
  }
  return { decimal: toDecimalDegrees(coord), direction: coord.direction };
}

const DecimalCoordRE = /^(-?\d+(?:\.\d+)?)$/;

/**
 * Parses a single coordinate string into its components.
 * @param input - String containing a single coordinate
 * @param expectRemainders - If true, allow additional text after the coordinate
 * @returns Parsed coordinate object
 * @throws CoordinateParseError if the format is invalid
 */
export function parseCoordinate(
  input: string,
  expectRemainders = false,
): Coordinate {
  input = toS(input).trim();
  if (input.length === 0) {
    throw new CoordinateParseError("Input string cannot be empty");
  }

  if (DecimalCoordRE.test(input)) {
    const f = toFloat(input);
    if (f == null) {
      throw new CoordinateParseError("Failed to parse decimal coordinate");
    }
    const r = roundGpsDecimal(f);
    return {
      degrees: r,
      decimal: r,
      format: "D",
      direction: undefined,
      minutes: undefined,
      seconds: undefined,
      remainder: "",
    };
  }

  const dmsPattern =
    /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+)\s*['′]\s*(?<seconds>\d+(?:\.\d+)?)\s*["″]\s?(?<direction>[NSEW])?[\s,]{0,3}(?<remainder>.*)$/i;
  const dmPattern =
    /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+(?:\.\d+)?)\s?['′]\s?(?<direction>[NSEW])?(?<remainder>.*)$/i;
  const dPattern =
    /^(?<degrees>-?\d+(?:\.\d+)?)\s*(?:°|DEG)\s?(?<direction>[NSEW])?(?<remainder>.*)$/i;

  const trimmedInput = input.trimStart();

  let match: RegExpMatchArray | null;
  let format: CoordinateFormat | null = null;

  if ((match = trimmedInput.match(dmsPattern))) {
    format = "DMS";
  } else if ((match = trimmedInput.match(dmPattern))) {
    format = "DM";
  } else if ((match = trimmedInput.match(dPattern))) {
    format = "D";
  }

  if (
    match == null ||
    format == null ||
    (!expectRemainders && !blank(match?.groups?.remainder))
  ) {
    throw new CoordinateParseError(
      "Invalid coordinate format. Expected one of:\n" +
        "  DDD° MM' SS.S\" k (deg/min/sec)\n" +
        "  DDD° MM.MMM' k (deg/decimal minutes)\n" +
        "  DDD.DDDDD° (decimal degrees)\n" +
        "  (where k indicates direction: N, S, E, or W)",
    );
  }

  if (!match.groups) {
    throw new CoordinateParseError("Failed to parse coordinate components");
  }

  const {
    degrees: degreesStr,
    minutes: minutesStr,
    seconds: secondsStr,
    direction: directionStr,
    remainder,
  } = match.groups;

  const direction = directionStr?.toUpperCase() as Direction | undefined;

  if (degreesStr == null) {
    throw new CoordinateParseError("Missing degrees in coordinate");
  }
  const degrees = parseFloat(degreesStr);
  let minutes: number | undefined;
  let seconds: number | undefined;

  if (format === "DMS") {
    if (minutesStr == null || secondsStr == null) {
      throw new CoordinateParseError(
        "Missing minutes or seconds in DMS coordinate",
      );
    }
    minutes = parseInt(minutesStr, 10);
    seconds = parseFloat(secondsStr);

    if (minutes >= 60) {
      throw new CoordinateParseError("Minutes must be between 0 and 59");
    }
    if (seconds >= 60) {
      throw new CoordinateParseError("Seconds must be between 0 and 59.999...");
    }
  } else if (format === "DM") {
    if (minutesStr == null) {
      throw new CoordinateParseError("Missing minutes in DM coordinate");
    }
    minutes = parseFloat(minutesStr);

    if (minutes >= 60) {
      throw new CoordinateParseError("Minutes must be between 0 and 59.999...");
    }
  }

  const maxDegrees =
    direction === "N" || direction === "S"
      ? MAX_LATITUDE_DEGREES
      : MAX_LONGITUDE_DEGREES;

  if (Math.abs(degrees) > maxDegrees) {
    throw new CoordinateParseError(
      `Degrees must be between -${maxDegrees} and ${maxDegrees} for ${direction} direction`,
    );
  }

  const coords = {
    degrees,
    minutes,
    seconds,
    direction,
    format,
    remainder: remainder?.trim(),
  };
  const decimal = toDecimalDegrees(coords);
  return {
    ...coords,
    decimal,
  };
}

function toDecimalDegrees(coord: Omit<Coordinate, "decimal">): number {
  const degrees = toFloat(coord.degrees) ?? 0;
  const sign = Math.sign(degrees);
  let decimal = Math.abs(degrees);

  decimal += Math.abs(toFloat(coord.minutes) ?? 0) / 60.0;
  decimal += Math.abs(toFloat(coord.seconds) ?? 0) / 3600.0;

  if (coord.direction === "S" || coord.direction === "W" || sign < 0) {
    decimal = -decimal;
  }

  const maxDegrees =
    coord.direction === "N" || coord.direction === "S"
      ? MAX_LATITUDE_DEGREES
      : MAX_LONGITUDE_DEGREES;
  const axis =
    coord.direction === "N" || coord.direction === "S"
      ? "latitude"
      : "longitude";

  if (Math.abs(decimal) > maxDegrees) {
    throw new CoordinateParseError(
      `Degrees must be between -${maxDegrees} and ${maxDegrees} for ${axis}`,
    );
  }

  // Round to 6 decimal places
  // Most consumer devices can only resolve 4-5 decimal places (1m resolution)
  return roundGpsDecimal(decimal);
}

export type CoordinateType = "Latitude" | "Longitude";

export interface CoordinateConfig {
  value: number;
  ref: string | undefined;
  geoValue: number | undefined;
  expectedRefPositive: "N" | "E";
  expectedRefNegative: "S" | "W";
  max: 90 | 180;
  coordinateType: CoordinateType;
}
const MAX_LAT_LON_DIFF = 1;

export function roundGpsDecimal(decimal: number): number {
  return roundToDecimalPlaces(decimal, 6);
}

export function parsePosition(
  position: Maybe<string>,
): Maybe<[number, number]> {
  if (blank(position)) return;
  const [lat, lon] = toS(position).split(/[, ]+/).map(toFloat);
  return lat != null && lon != null ? [lat, lon] : undefined;
}
export function processCoordinate(
  config: CoordinateConfig,
  warnings: string[],
): { value: number; ref: string; isInvalid: boolean } {
  let { value, ref } = config;
  const { geoValue, coordinateType } = config;
  const { expectedRefPositive, expectedRefNegative, max } = config;
  let isInvalid = false;

  // Validate ref is reasonable -- it should either start with
  // expectedRefPositive or expectedRefNegative:

  ref = toS(ref).trim().toUpperCase().slice(0, 1);
  if (
    !blank(config.ref) &&
    ref !== expectedRefPositive &&
    ref !== expectedRefNegative
  ) {
    warnings.push(
      `Invalid GPS${coordinateType}Ref: ${JSON.stringify(config.ref)}.`,
    );
    ref = value < 0 ? expectedRefNegative : expectedRefPositive;
  }

  // Check range
  if (Math.abs(value) > max) {
    isInvalid = true;
    warnings.push(`Invalid GPS${coordinateType}: ${value} is out of range`);
    return { value, ref, isInvalid };
  }

  // Apply hemisphere reference
  if (ref === expectedRefNegative) {
    value = -Math.abs(value);
  }

  // Check for mismatched signs with GeolocationPosition
  if (
    geoValue != null &&
    Math.abs(Math.abs(geoValue) - Math.abs(value)) < MAX_LAT_LON_DIFF
  ) {
    if (Math.sign(geoValue) !== Math.sign(value)) {
      value = -value;
      warnings.push(
        `Corrected GPS${coordinateType} sign based on GeolocationPosition`,
      );
    }

    // Force ref to correct value
    const expectedRef =
      geoValue < 0 ? expectedRefNegative : expectedRefPositive;
    if (ref !== expectedRef) {
      ref = expectedRef;
      if (!blank(config.ref)) {
        warnings.push(
          `Corrected GPS${coordinateType}Ref to ${expectedRef} based on GeolocationPosition`,
        );
      }
    }
  }

  // Ensure ref matches coordinate sign
  const expectedRef = value < 0 ? expectedRefNegative : expectedRefPositive;
  if (ref != null && ref !== expectedRef && !blank(config.ref)) {
    warnings.push(
      `Corrected GPS${coordinateType}Ref to ${ref} to match coordinate sign`,
    );
  }
  ref = expectedRef;

  return { value: roundGpsDecimal(value), ref, isInvalid };
}
