import tz_lookup from "@photostructure/tz-lookup"
import { Maybe } from "./Maybe"

export function geoTz(lat: number, lon: number): Maybe<string> {
  try {
    return tz_lookup(lat, lon)
  } catch {
    return
  }
}
