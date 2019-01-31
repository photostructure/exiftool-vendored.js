import { keys } from "./Object"

export type Struct = {
  [k: string]: number | string | Struct
}

export function isStruct(o: any): o is Struct {
  return (
    o != null &&
    !Array.isArray(o) &&
    keys(o).every(k => {
      const t = typeof o[k]
      return t == "string" || t == "number" || isStruct(o[k])
    })
  )
}
