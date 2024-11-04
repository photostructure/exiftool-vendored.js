import { roundToDecimalPlaces } from "./Number"
import { omit } from "./Object"

// Constants
const MAX_LATITUDE_DEGREES = 90
const MAX_LONGITUDE_DEGREES = 180

type Direction = "N" | "S" | "E" | "W"
type CoordinateFormat = "DMS" | "DM" | "D"

interface Coordinate {
  degrees: number
  minutes: number | undefined
  seconds: number | undefined
  direction: Direction | undefined
  format: CoordinateFormat
  remainder: string | undefined
}

class CoordinateParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CoordinateParseError"
  }
}

/**
 * Parses a string containing both latitude and longitude coordinates.
 * @param input - String containing both coordinates
 * @returns Object containing latitude and longitude in decimal degrees, or undefined if parsing fails
 * @throws CoordinateParseError if the input format is invalid
 */
export function parseCoordinates(input: string): {
  latitude: number
  longitude: number
} {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty")
  }

  let latitude: number | undefined
  let longitude: number | undefined

  for (const coord of _parseCoordinates(input)) {
    if (!coord.direction) {
      throw new CoordinateParseError(
        "Direction is required for position parsing"
      )
    }

    if (coord.direction === "S" || coord.direction === "N") {
      if (latitude !== undefined) {
        throw new CoordinateParseError("Multiple latitude values found")
      }
      latitude = toDecimalDegrees(coord)
    } else {
      if (longitude !== undefined) {
        throw new CoordinateParseError("Multiple longitude values found")
      }
      longitude = toDecimalDegrees(coord)
    }
  }
  const missing = []
  if (latitude === undefined) missing.push("latitude")
  if (longitude === undefined) missing.push("longitude")

  if (latitude === undefined || longitude === undefined) {
    throw new CoordinateParseError(`Missing ${missing.join(" and ")}`)
  } else {
    return { latitude, longitude }
  }
}

/**
 * Parses a string containing one or more coordinates.
 * @param input - String containing coordinates
 * @returns Array of parsed coordinates
 */
function _parseCoordinates(input: string): Coordinate[] {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty")
  }

  const result = []
  let remainder = input
  do {
    const coord = parseCoordinate(remainder)
    remainder = coord.remainder ?? ""
    result.push(omit(coord, "remainder"))
  } while (remainder.length > 0)
  return result
}

/**
 * Parses a coordinate string in decimal degrees format.
 * @param input - String containing a single coordinate
 * @returns Object containing degrees and direction, or undefined if parsing fails
 * @throws CoordinateParseError if the format is not decimal degrees or direction is missing
 */
export function parseDecimalCoordinate(
  input: string
): { degrees: number; direction: Direction } | undefined {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty")
  }

  const coord = parseCoordinate(input)
  if (coord.format !== "D") {
    throw new CoordinateParseError("Expected decimal degrees format")
  }
  if (!coord.direction) {
    throw new CoordinateParseError("Missing direction")
  }
  return { degrees: toDecimalDegrees(coord), direction: coord.direction }
}

/**
 * Parses a single coordinate string into its components.
 * @param input - String containing a single coordinate
 * @returns Parsed coordinate object
 * @throws CoordinateParseError if the format is invalid
 */
export function parseCoordinate(input: string): Coordinate {
  if (!input?.trim()) {
    throw new CoordinateParseError("Input string cannot be empty")
  }

  const dmsPattern =
    /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+)\s*['′]\s*(?<seconds>\d+(?:\.\d+)?)\s*["″]\s?(?<direction>[NSEW])?[\s,]{0,3}(?<remainder>.*)$/i
  const dmPattern =
    /^(?<degrees>-?\d+)\s*(?:°|DEG)\s*(?<minutes>\d+(?:\.\d+)?)\s?['′]\s?(?<direction>[NSEW])?(?<remainder>.*)$/i
  const dPattern =
    /^(?<degrees>-?\d+(?:\.\d+)?)\s*(?:°|DEG)\s?(?<direction>[NSEW])?(?<remainder>.*)$/i

  const trimmedInput = input.trimStart()

  let match: RegExpMatchArray | null
  let format: CoordinateFormat

  if ((match = trimmedInput.match(dmsPattern))) {
    format = "DMS"
  } else if ((match = trimmedInput.match(dmPattern))) {
    format = "DM"
  } else if ((match = trimmedInput.match(dPattern))) {
    format = "D"
  } else {
    throw new CoordinateParseError(
      "Invalid coordinate format. Expected one of:\n" +
        "  DDD° MM' SS.S\" k (deg/min/sec)\n" +
        "  DDD° MM.MMM' k (deg/decimal minutes)\n" +
        "  DDD.DDDDD° (decimal degrees)\n" +
        "  (where k indicates direction: N, S, E, or W)"
    )
  }

  if (!match.groups) {
    throw new CoordinateParseError("Failed to parse coordinate components")
  }

  const {
    degrees: degreesStr,
    minutes: minutesStr,
    seconds: secondsStr,
    direction: directionStr,
    remainder,
  } = match.groups

  const direction = directionStr?.toUpperCase() as Direction | undefined

  const degrees = parseFloat(degreesStr!)
  let minutes: number | undefined
  let seconds: number | undefined

  if (format === "DMS") {
    minutes = parseInt(minutesStr!, 10)
    seconds = parseFloat(secondsStr!)

    if (minutes >= 60) {
      throw new CoordinateParseError("Minutes must be between 0 and 59")
    }
    if (seconds >= 60) {
      throw new CoordinateParseError("Seconds must be between 0 and 59.999...")
    }
  } else if (format === "DM") {
    minutes = parseFloat(minutesStr!)

    if (minutes >= 60) {
      throw new CoordinateParseError("Minutes must be between 0 and 59.999...")
    }
  }

  const maxDegrees =
    direction === "N" || direction === "S"
      ? MAX_LATITUDE_DEGREES
      : MAX_LONGITUDE_DEGREES

  if (Math.abs(degrees) > maxDegrees) {
    throw new CoordinateParseError(
      `Degrees must be between -${maxDegrees} and ${maxDegrees} for ${direction} direction`
    )
  }

  return {
    degrees,
    minutes,
    seconds,
    direction,
    format,
    remainder: remainder?.trim(),
  }
}

function toDecimalDegrees(coord: Coordinate): number {
  let decimal = coord.degrees

  decimal += (coord.minutes ?? 0) / 60.0
  decimal += (coord.seconds ?? 0) / 3600.0

  if (coord.direction === "S" || coord.direction === "W") {
    decimal = -Math.abs(decimal)
  }

  const maxDegrees =
    coord.direction === "N" || coord.direction === "S"
      ? MAX_LATITUDE_DEGREES
      : MAX_LONGITUDE_DEGREES
  const axis =
    coord.direction === "N" || coord.direction === "S"
      ? "latitude"
      : "longitude"

  if (Math.abs(decimal) > maxDegrees) {
    throw new CoordinateParseError(
      `Degrees must be between -${maxDegrees} and ${maxDegrees} for ${axis}`
    )
  }
  // Most consumer devices can only resolve 4-5 decimal places (1m resolution)
  return roundToDecimalPlaces(decimal, 6)
}
