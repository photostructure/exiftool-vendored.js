import { Maybe } from "./Maybe"

// eslint-disable-next-line @typescript-eslint/ban-types
export function keys<T extends object, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}.propertyIsEnumerable.call(o, ea))
      ) as K[])
}

export function isFunction(obj: any): obj is () => any {
  return typeof obj === "function"
}

export function fromEntries(
  arr: Maybe<[Maybe<string>, any]>[],
  obj?: any
): any {
  if (arr == null || arr.length === 0) return obj
  // don't use Object.create(null), json stringify will break!
  for (const ea of arr.filter((ea) => ea != null)) {
    if (ea != null && Array.isArray(ea)) {
      const [k, v] = ea
      // allow NULL fields:
      if (k != null && v !== undefined) {
        if (typeof obj !== "object") obj = {}
        obj[k] = v
      }
    }
  }
  return obj
}
