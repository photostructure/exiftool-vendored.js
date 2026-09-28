import {
  CoordinateConfig,
  CoordinateResult,
  parseCoordinate,
  parseCoordinates,
  processCoordinate,
} from "./CoordinateParser";
import { ExifToolOptions } from "./ExifToolOptions";
import { lazy } from "./Lazy";
import { Maybe } from "./Maybe";
import { isNumber, toFloat } from "./Number";
import { StrEnum, strEnum, StrEnumKeys } from "./StrEnum";
import { blank } from "./String";

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

// Thankfully, ExifTool has workarounds for many bad metadata issues, and with
// geolocation enabled, we can see which hemisphere ExifTool picked:
// GeolocationDistance is the distance from ExifTool's reading of the GPS
// coordinates to GeolocationPosition (the nearest city). If our coordinates
// are not that distance from GeolocationPosition, but flipping the sign of the
// latitude, longitude, or both puts them there, we use the flipped signs.

// Comparing our signs with the signs of GeolocationPosition doesn't work: the
// nearest city may be on the other side of the prime meridian, the equator, or
// the antimeridian.

// ExifTool omits GeolocationDistance when it geolocates from city names rather
// than GPS coordinates, and then GeolocationPosition says nothing about the
// hemisphere, so we don't correct signs.

// See https://www.exiftool.org/TagNames/GPS.html,
// https://github.com/immich-app/immich/issues/13053, and
// https://github.com/immich-app/immich/issues/27392

export type GpsLocationTags = {
  GPSLatitude?: number;
  GPSLatitudeRef?: string;
  GPSLongitude?: number;
  GPSLongitudeRef?: string;
  GPSPosition?: string;
  GeolocationPosition?: string;
  GeolocationDistance?: string;
};

export const GpsLocationTagNames = strEnum(
  "GPSLatitude",
  "GPSLatitudeRef",
  "GPSLongitude",
  "GPSLongitudeRef",
  "GPSPosition",
  "GeolocationPosition",
  "GeolocationDistance",
) satisfies StrEnum<keyof GpsLocationTags>;
export type GpsLocationTagName = StrEnumKeys<typeof GpsLocationTagNames>;

export interface GpsParseResult {
  result: GpsLocationTags;
  details: string;
  invalid: boolean;
  warnings: string[];
}

// local function that handles more input types:
function _parseCoordinate(v: Maybe<string | number>) {
  return blank(v) ? undefined : isNumber(v) ? v : parseCoordinate(v).decimal;
}

function _parseCoordinates(v: Maybe<string>) {
  return blank(v) ? undefined : parseCoordinates(v);
}

type Axis = Omit<CoordinateConfig, "value" | "ref">;

const Latitude: Axis = {
  expectedRefPositive: "N",
  expectedRefNegative: "S",
  max: 90,
  coordinateType: "Latitude",
};

const Longitude: Axis = {
  expectedRefPositive: "E",
  expectedRefNegative: "W",
  max: 180,
  coordinateType: "Longitude",
};

// The same radius ExifTool's Geolocation module uses
const EarthRadiusKm = 6371;

// ExifTool rounds coordinates to 20 bits (up to 21.3 m off) before measuring,
// GeolocationPosition to 4 decimal places (up to 7.9 m off), and
// GeolocationDistance to 10 m (up to 5 m off), so our distance from the same
// coordinates lands within 34.2 m of it (21 m at most across 389 sample
// images). Signs whose residual exceeds that aren't the ones ExifTool read. A
// mis-signed coordinate whose residual is within it can't be told apart from a
// correct one, so we keep its signs.
const GeolocationDistanceToleranceKm = 0.035;

// Great-circle (haversine) distance, as ExifTool computes GeolocationDistance
function distanceKm(a: CoordinateResult, b: CoordinateResult): number {
  const rad = Math.PI / 180;
  const sinDLat = Math.sin(((b.latitude - a.latitude) * rad) / 2);
  const sinDLon = Math.sin(((b.longitude - a.longitude) * rad) / 2);
  const h =
    sinDLat ** 2 +
    Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * sinDLon ** 2;
  return 2 * EarthRadiusKm * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

/**
 * @return the [latitude, longitude] signs that put `coords`
 * `geolocationDistanceKm` from `geolocationPosition`, flipping as few as
 * possible, or undefined if none do, or if signs that put `coords` in
 * different places do, as GeolocationDistance can't tell those apart.
 */
function signsAtGeolocationDistance(
  coords: CoordinateResult,
  geolocationPosition: CoordinateResult,
  geolocationDistanceKm: number,
): Maybe<readonly [number, number]> {
  const matches = (
    [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ] as const
  )
    .map((signs) => ({
      signs,
      position: {
        latitude: signs[0] * coords.latitude,
        longitude: signs[1] * coords.longitude,
      },
    }))
    .filter(
      ({ position }) =>
        Math.abs(
          distanceKm(position, geolocationPosition) - geolocationDistanceKm,
        ) <= GeolocationDistanceToleranceKm,
    );
  const [first] = matches;
  // Different signs can be the same place: 0 and -0, 180 E and 180 W, and any
  // longitude at a pole
  const samePlace =
    first != null &&
    matches.every(
      (ea) =>
        distanceKm(ea.position, first.position) <=
        GeolocationDistanceToleranceKm,
    );
  return samePlace ? first.signs : undefined;
}

function flipHemisphere(
  coordinate: { value: number; ref: string },
  axis: Axis,
  rawRef: Maybe<string>,
  warnings: string[],
): { value: number; ref: string } {
  const value = -coordinate.value;
  const ref = value < 0 ? axis.expectedRefNegative : axis.expectedRefPositive;
  warnings.push(
    `Corrected GPS${axis.coordinateType} sign based on GeolocationPosition`,
  );
  if (!blank(rawRef)) {
    warnings.push(
      `Corrected GPS${axis.coordinateType}Ref to ${ref} based on GeolocationPosition`,
    );
  }
  return { value, ref };
}

export function parseGPSLocation(
  tags: GpsLocationTags,
  opts: Pick<ExifToolOptions, "ignoreZeroZeroLatLon">,
): Maybe<Partial<GpsParseResult>> {
  const warnings: string[] = [];

  try {
    // Parse primary coordinates with error capturing
    let latitude = undefined;
    let longitude = undefined;

    try {
      latitude = _parseCoordinate(tags.GPSLatitude);
    } catch (e) {
      warnings.push(`Error parsing GPSLatitude: ${e}`);
    }

    try {
      longitude = _parseCoordinate(tags.GPSLongitude);
    } catch (e) {
      warnings.push(`Error parsing GPSLongitude: ${e}`);
    }

    // If either coordinate is missing, try GPSPosition
    if (latitude == null || longitude == null) {
      const gpsPos = lazy(() => {
        try {
          return _parseCoordinates(tags.GPSPosition);
        } catch (e) {
          warnings.push(`Error parsing GPSPosition: ${e}`);
          return undefined;
        }
      });

      latitude ??= gpsPos()?.latitude;
      longitude ??= gpsPos()?.longitude;
    }

    // If we still don't have both coordinates, return early
    if (latitude == null || longitude == null) {
      return { invalid: false, warnings };
    }

    // Check for zero coordinates if configured
    if (opts.ignoreZeroZeroLatLon && latitude === 0 && longitude === 0) {
      warnings.push("Ignoring zero coordinates from GPSLatitude/GPSLongitude");
      return { invalid: true, warnings };
    }

    // Get geolocation reference values for sign validation
    let geoPos = undefined;
    try {
      geoPos = _parseCoordinates(tags.GeolocationPosition);
    } catch (e) {
      warnings.push(`Error parsing GeolocationPosition: ${e}`);
    }

    // Process coordinates with validation and ref-based sign correction
    const latResult = processCoordinate(
      { ...Latitude, value: latitude, ref: tags.GPSLatitudeRef },
      warnings,
    );

    const lonResult = processCoordinate(
      { ...Longitude, value: longitude, ref: tags.GPSLongitudeRef },
      warnings,
    );

    if (latResult.isInvalid || lonResult.isInvalid) {
      return { invalid: true, warnings };
    }

    const geolocationDistanceKm = toFloat(tags.GeolocationDistance);
    const signs =
      geoPos == null || geolocationDistanceKm == null
        ? undefined
        : signsAtGeolocationDistance(
            { latitude: latResult.value, longitude: lonResult.value },
            geoPos,
            geolocationDistanceKm,
          );
    const lat =
      signs?.[0] === -1
        ? flipHemisphere(latResult, Latitude, tags.GPSLatitudeRef, warnings)
        : latResult;
    const lon =
      signs?.[1] === -1
        ? flipHemisphere(lonResult, Longitude, tags.GPSLongitudeRef, warnings)
        : lonResult;

    return {
      result: {
        GPSLatitude: lat.value,
        GPSLongitude: lon.value,
        GPSLatitudeRef: lat.ref,
        GPSLongitudeRef: lon.ref,
      },
      invalid: false,
      warnings,
    };
  } catch (e) {
    warnings.push(`Error parsing coordinates: ${e}`);
    return { invalid: true, warnings };
  }
}
