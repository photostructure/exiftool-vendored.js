export function keys<T extends any, K extends string & keyof T>(o: T): K[] {
  return o == null
    ? []
    : (Object.keys(o).filter((ea) =>
        ({}.propertyIsEnumerable.call(o, ea))
      ) as K[])
}

export function isFunction(obj: any): obj is Function {
  return typeof obj === "function"
}
