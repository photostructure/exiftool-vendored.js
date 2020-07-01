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
