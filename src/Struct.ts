import { isDateOrTime } from "./DateTime"

export type Struct = {
  [k: string]: number | string | Struct
}

export function isStruct(o: any): o is Struct {
  return (
    o != null &&
    o.constructor?.name === "Object" &&
    Object.values(o).every((v) => {
      const t = typeof v
      return t === "string" || t === "number" || isDateOrTime(v) || isStruct(v)
    })
  )
}
