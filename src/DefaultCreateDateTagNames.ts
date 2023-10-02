import { Tags } from "./Tags"

// The following are a hail-mary to try to get the offset from a
// created-at tag, and only examined if `inferTimezoneFromDatestamps` is
// true.
export const DefaultCreateDateTagNames = [
  "SubSecCreateDate",
  "CreateDate",
  "SubSecDateTimeOriginal",
  "DateTimeOriginal",
  "DateTimeCreated",
  "SubSecMediaCreateDate",
  "MediaCreateDate",
  "CreationDate",
  "TimeCreated",
] as const satisfies readonly (keyof Tags)[]
