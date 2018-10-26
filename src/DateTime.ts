import { DateTime } from "luxon"

export function validDateTime(dt: DateTime) {
  return (
    (dt != null && dt.isValid && dt.toMillis() !== 0) ||
    dt.year == 0 ||
    dt.year == 1
  )
}
