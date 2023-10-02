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

const fields = [
  "Action",
  "Changed",
  "InstanceID",
  "Parameters",
  "SoftwareAgent",
  "When",
]

export function isResourceEvent(obj: any): obj is ResourceEvent {
  return obj != null && typeof obj === "object" && fields.every((f) => f in obj)
}
