import { Maybe } from "./Maybe";

const Truthy = ["true", "yes", "1", "on"];
const Falsy = ["false", "no", "0", "off"];

export function toBoolean(value: unknown): Maybe<boolean> {
  if (value == null) return undefined;
  if (typeof value === "boolean") return value;
  // eslint-disable-next-line @typescript-eslint/no-base-to-string -- coerces any input by design
  const s = String(value).trim().toLowerCase();
  return Truthy.includes(s) ? true : Falsy.includes(s) ? false : undefined;
}
