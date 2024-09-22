import { isDateOrTime } from "./DateTime"

export type Struct = {
  [k: string]: number | string | Struct | Array<Struct | number | string>
}

export function isStruct(o: any): o is Struct {
  return (
    o != null &&
    o.constructor?.name === "Object" &&
    Object.values(o).every((v) => {
      const t = typeof v
      return (
        t === "string" ||
        t === "number" ||
        isDateOrTime(v) ||
        isStruct(v) ||
        Array.isArray(v)
      )
    })
  )
}
