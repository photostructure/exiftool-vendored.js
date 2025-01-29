import {
  parseCoordinate,
  parseCoordinates,
  processCoordinate,
} from "./CoordinateParser"
import { ExifToolOptions } from "./ExifToolOptions"
import { lazy } from "./Lazy"
import { Maybe } from "./Maybe"
import { isNumber } from "./Number"
import { keysOf } from "./Object"
import { blank } from "./String"

// Like all metadata, this is a mess. Here's what we know:

// Videos may not have a GPSLatitudeRef or GPSLongitudeRef: if this is the case,
// we have to assume the given sign is correct. See
// https://github.com/photostructure/exiftool-vendored.js/issues/165 and
// https://www.exiftool.org/TagNames/GPS.html

// The sign of GPSLatitude and GPSLongitude **should** be determined by the
// GPSLatitudeRef and GPSLongitudeRef tags, respectively, but those are not
// always kept in sync with the actual values, so they can't be trusted. We can
// post a warning, though, if they are encoded incorrectly.

// If the GPSLatitudeRef or GPSLongitudeRef indicate West or South, we should
// force the GPSLatitude and GPSLongitude to be negative.

// Thankfully, ExifTool has workarounds for many bad metadata issues, but it
// seems to only be enabled with geolocation--so if we have a value for
// GeolocationPosition, and that location is "close enough" to the GPSLatitude
// and GPSLongitude values, we should match the signs of the GeolocationPosition
// values to make sure we're in the right hemisphere.

// See https://www.exiftool.org/TagNames/GPS.html
// and https://github.com/immich-app/immich/issues/13053

export type GpsLocationTags = {
  GPSLatitude?: number
  GPSLatitudeRef?: string
  GPSLongitude?: number
  GPSLongitudeRef?: string
  GPSPosition?: string
  GeolocationPosition?: string
}

export const GpsLocationTagNames = keysOf<GpsLocationTags>({
  GPSLatitude: true,
  GPSLatitudeRef: true,
  GPSLongitude: true,
  GPSLongitudeRef: true,
  GPSPosition: true,
  GeolocationPosition: true,
})

export interface GpsParseResult {
  result: GpsLocationTags
  details: string
  invalid: boolean
  warnings: string[]
}

// local function that handles more input types:
function _parseCoordinate(v: Maybe<string | number>) {
  return blank(v) ? undefined : isNumber(v) ? v : parseCoordinate(v).decimal
}

function _parseCoordinates(v: Maybe<string>) {
  return blank(v) ? undefined : parseCoordinates(v)
}

export function parseGPSLocation(
  tags: GpsLocationTags,
  opts: Pick<ExifToolOptions, "ignoreZeroZeroLatLon">
): Maybe<Partial<GpsParseResult>> {
  const warnings: string[] = []

  try {
    // Parse primary coordinates with error capturing
    let latitude = undefined
    let longitude = undefined

    try {
      latitude = _parseCoordinate(tags.GPSLatitude)
    } catch (e) {
      warnings.push(`Error parsing GPSLatitude: ${e}`)
    }

    try {
      longitude = _parseCoordinate(tags.GPSLongitude)
    } catch (e) {
      warnings.push(`Error parsing GPSLongitude: ${e}`)
    }

    // If either coordinate is missing, try GPSPosition
    if (latitude == null || longitude == null) {
      const gpsPos = lazy(() => {
        try {
          return _parseCoordinates(tags.GPSPosition)
        } catch (e) {
          warnings.push(`Error parsing GPSPosition: ${e}`)
          return undefined
        }
      })

      if (latitude == null) {
        latitude = gpsPos()?.latitude
      }
      if (longitude == null) {
        longitude = gpsPos()?.longitude
      }
    }

    // If we still don't have both coordinates, return early
    if (latitude == null || longitude == null) {
      return { invalid: false, warnings }
    }

    // Check for zero coordinates if configured
    if (opts.ignoreZeroZeroLatLon && latitude === 0 && longitude === 0) {
      warnings.push("Ignoring zero coordinates from GPSLatitude/GPSLongitude")
      return { invalid: true, warnings }
    }

    // Get geolocation reference values for sign validation
    let geoPos = undefined
    try {
      geoPos = _parseCoordinates(tags.GeolocationPosition)
    } catch (e) {
      warnings.push(`Error parsing GeolocationPosition: ${e}`)
    }

    // Process coordinates with validation and sign correction
    const latResult = processCoordinate(
      {
        value: latitude,
        ref: tags.GPSLatitudeRef,
        geoValue: geoPos?.latitude,
        expectedRefPositive: "N",
        expectedRefNegative: "S",
        max: 90,
        coordinateType: "Latitude",
      },
      warnings
    )

    const lonResult = processCoordinate(
      {
        value: longitude,
        ref: tags.GPSLongitudeRef,
        geoValue: geoPos?.longitude,
        expectedRefPositive: "E",
        expectedRefNegative: "W",
        max: 180,
        coordinateType: "Longitude",
      },
      warnings
    )

    if (latResult.isInvalid || lonResult.isInvalid) {
      return { invalid: true, warnings }
    }

    return {
      result: {
        GPSLatitude: latResult.value,
        GPSLongitude: lonResult.value,
        GPSLatitudeRef: latResult.ref,
        GPSLongitudeRef: lonResult.ref,
      },
      invalid: false,
      warnings,
    }
  } catch (e) {
    warnings.push(`Error parsing coordinates: ${e}`)
    return { invalid: true, warnings }
  }
}
