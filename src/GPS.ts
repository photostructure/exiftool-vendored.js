import { parseCoordinate, parseCoordinates } from "./CoordinateParser"
import { ExifToolOptions } from "./ExifToolOptions"
import { Maybe } from "./Maybe"
import { isNumber, toFloat } from "./Number"
import { pick } from "./Pick"
import { blank, notBlankString, toS } from "./String"

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

export type GpsLocationTags = {
  GPSLatitude?: number
  GPSLatitudeRef?: string
  GPSLongitude?: number
  GPSLongitudeRef?: string
  GPSPosition?: string
  GeolocationPosition?: string
}

export type CoordinateType = "Latitude" | "Longitude"

export interface CoordinateConfig {
  value: number
  ref: string | undefined
  geoValue: number | undefined
  expectedRefPositive: "N" | "E"
  expectedRefNegative: "S" | "W"
  max: 90 | 180
  coordinateType: CoordinateType
}

const MAX_LAT_LON_DIFF = 1

function parsePosition(position: Maybe<string>): Maybe<[number, number]> {
  if (blank(position)) return
  const [lat, lon] = toS(position).split(/[, ]+/).map(toFloat)
  return lat != null && lon != null ? [lat, lon] : undefined
}

function processCoordinate(
  config: CoordinateConfig,
  warnings: string[]
): { value: number; ref: string; isInvalid: boolean } {
  let { value, ref } = config
  const { geoValue, coordinateType } = config
  const { expectedRefPositive, expectedRefNegative, max } = config
  let isInvalid = false

  ref =
    ref?.trim().toUpperCase().slice(0, 1) ??
    (value < 0 ? expectedRefNegative : expectedRefPositive)

  // Check range
  if (Math.abs(value) > max) {
    isInvalid = true
    warnings.push(`Invalid GPS${coordinateType}: ${value} is out of range`)
    return { value, ref, isInvalid }
  }

  // Apply hemisphere reference
  if (ref === expectedRefNegative) {
    value = -Math.abs(value)
  }

  // Check for mismatched signs with GeolocationPosition
  if (
    geoValue != null &&
    Math.abs(Math.abs(geoValue) - Math.abs(value)) < MAX_LAT_LON_DIFF
  ) {
    if (Math.sign(geoValue) !== Math.sign(value)) {
      value = -value
      warnings.push(
        `Corrected GPS${coordinateType} sign based on GeolocationPosition`
      )
    }

    // Force ref to correct value
    const expectedRef = geoValue < 0 ? expectedRefNegative : expectedRefPositive
    if (ref !== expectedRef) {
      ref = expectedRef
      warnings.push(
        `Corrected GPS${coordinateType}Ref to ${expectedRef} based on GeolocationPosition`
      )
    }
  }

  // Ensure ref matches coordinate sign
  const expectedRef = value < 0 ? expectedRefNegative : expectedRefPositive
  if (ref != null && ref !== expectedRef) {
    warnings.push(
      `Corrected GPS${coordinateType}Ref to ${ref} to match coordinate sign`
    )
  }
  ref = expectedRef

  return { value, ref, isInvalid }
}

export function parseGPSLocation(
  tags: GpsLocationTags,
  opts: Pick<ExifToolOptions, "ignoreZeroZeroLatLon">
): Partial<{
  result: GpsLocationTags
  invalid: boolean
  warnings: string[]
}> {
  let parsed = false
  const warnings: string[] = []
  const result: GpsLocationTags = pick(
    tags,
    "GPSLatitude",
    "GPSLatitudeRef",
    "GPSLongitude",
    "GPSLongitudeRef"
  )

  if (notBlankString(tags.GPSPosition)) {
    try {
      const pos = parseCoordinates(tags.GPSPosition)
      if (
        opts.ignoreZeroZeroLatLon === true &&
        pos.latitude === 0 &&
        pos.longitude === 0
      ) {
        warnings.push("Ignoring zero coordinates from GPSPosition")
      } else {
        parsed = true
        result.GPSLatitude = pos.latitude
        result.GPSLongitude = pos.longitude
        result.GPSLatitudeRef = pos.latitude < 0 ? "S" : "N"
        result.GPSLongitudeRef = pos.longitude < 0 ? "W" : "E"
      }
    } catch (e) {
      warnings.push("Error parsing GPSPosition: " + e)
    }
  }

  // Are both GPSLatitude and GPSLongitude available?
  if (
    !parsed &&
    notBlankString(tags.GPSLatitude) &&
    notBlankString(tags.GPSLongitude)
  ) {
    try {
      const lat = parseCoordinate(tags.GPSLatitude)
      const lon = parseCoordinate(tags.GPSLongitude)
      if (
        opts.ignoreZeroZeroLatLon === true &&
        lat.degrees === 0 &&
        lon.degrees === 0
      ) {
        warnings.push("Ignoring zero coordinates from GPSLatitude/GPSLongitude")
        return { invalid: true, warnings }
      } else {
        result.GPSLatitude = lat.degrees
        result.GPSLongitude = lon.degrees
        result.GPSLatitudeRef = lat.direction!
        result.GPSLongitudeRef = lon.direction!
      }
    } catch (e) {
      warnings.push(`Error parsing GPSLatitude or GPSLongitude: ` + e)
    }
  }

  // Early return if no GPS data
  if (!isNumber(result.GPSLatitude) && !isNumber(result.GPSLongitude)) {
    return {}
  }

  // Check for zero coordinates when ignoreZeroZeroLatLon is true
  if (
    opts.ignoreZeroZeroLatLon === true &&
    result.GPSLatitude === 0 &&
    result.GPSLongitude === 0
  ) {
    warnings.push("Ignoring zero GPSLatitude and GPSLongitude")
    return { invalid: true, warnings }
  }

  // Parse GeolocationPosition
  const [geoLat, geoLon] = parsePosition(tags.GeolocationPosition) ?? [
    undefined,
    undefined,
  ]

  let isInvalid = false

  // Process latitude
  if (isNumber(result.GPSLatitude)) {
    const latitudeResult = processCoordinate(
      {
        value: result.GPSLatitude,
        ref: result.GPSLatitudeRef,
        geoValue: geoLat,
        expectedRefPositive: "N",
        expectedRefNegative: "S",
        max: 90,
        coordinateType: "Latitude",
      },
      warnings
    )

    result.GPSLatitude = latitudeResult.value
    result.GPSLatitudeRef = latitudeResult.ref
    isInvalid = isInvalid || latitudeResult.isInvalid
  }

  // Process longitude
  if (isNumber(result.GPSLongitude)) {
    const longitudeResult = processCoordinate(
      {
        value: result.GPSLongitude,
        ref: result.GPSLongitudeRef,
        geoValue: geoLon,
        expectedRefPositive: "E",
        expectedRefNegative: "W",
        max: 180,
        coordinateType: "Longitude",
      },
      warnings
    )

    result.GPSLongitude = longitudeResult.value
    result.GPSLongitudeRef = longitudeResult.ref
    isInvalid = isInvalid || longitudeResult.isInvalid
  }

  return isInvalid
    ? { invalid: true, warnings }
    : { result, invalid: false, warnings }
}
