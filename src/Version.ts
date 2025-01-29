import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ResourceEvent } from "./ResourceEvent"

/**
 * @see https://exiftool.org/TagNames/XMP.html#Version
 */
export interface Version {
  Comments?: string
  Event?: ResourceEvent
  Modifier?: string
  ModifyDate?: ExifDateTime | ExifDate | string
  Version?: string
}

const fields = ["Comments", "Event", "Modifier", "ModifyDate", "Version"]

export function isVersion(obj: unknown): obj is Version {
  return obj != null && typeof obj === "object" && fields.every((f) => f in obj)
}
