import { CapturedAtTagNames } from "./CapturedAtTagNames";
import { ExifDateTime } from "./ExifDateTime";
import { Maybe } from "./Maybe";
import { MaybeReadonly } from "./MaybeReadonly";
import { isString } from "./String";
import { Tags } from "./Tags";

/**
 * Returns the first date/time tag in `dateTimeTags` that strictly parses from
 * EXIF.
 */
export function firstDateTime(
  tags: Maybe<Tags>,
  dateTimeTags: MaybeReadonly<(keyof Tags)[]> = CapturedAtTagNames,
): Maybe<ExifDateTime> {
  for (const tag of dateTimeTags) {
    const dt = tags?.[tag];
    if (dt instanceof ExifDateTime) {
      return dt;
    } else if (isString(dt)) {
      const edt = ExifDateTime.fromEXIF(dt);
      if (edt != null) {
        return edt;
      }
    }
  }
  return;
}
