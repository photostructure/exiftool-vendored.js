import tz_lookup from "@photostructure/tz-lookup";
import { Maybe } from "./Maybe";

/**
 * @throws if the given latitude and longitude are invalid.
 */
export function geoTz(lat: number, lon: number): Maybe<string> {
  return tz_lookup(lat, lon);
}
