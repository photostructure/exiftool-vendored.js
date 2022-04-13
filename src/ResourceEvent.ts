import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"

/**
 * @see https://exiftool.org/TagNames/XMP.html#ResourceEvent
 */
export interface ResourceEvent {
  Action?: string
  Changed?: string
  InstanceID?: string
  Parameters?: string | number
  SoftwareAgent?: string
  When?: ExifDateTime | ExifDate | string
}
