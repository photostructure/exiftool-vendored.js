import { Tags } from "./Tags";

export const CapturedAtTagNames = [
  "SubSecDateTimeOriginal",
  "SubSecCreateDate",
  "SubSecMediaCreateDate",
  "DateTimeOriginal",
  "CreateDate",
  "MediaCreateDate",
  "CreationDate", // < Found in some transcoded Apple movies
  "DateTimeCreated",
  "TimeCreated", // < may not have the date
] as const satisfies readonly (keyof Tags)[];
