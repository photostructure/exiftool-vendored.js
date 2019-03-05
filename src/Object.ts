export function keys<T, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter(
        ea => typeof ea === "string" && o.propertyIsEnumerable(ea)
      ) as K[])
}

export function isFunction(obj: any): obj is Function {
  return typeof obj === "function"
}
