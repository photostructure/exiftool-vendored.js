import { Maybe } from "./Maybe"
import { toInt } from "./Number"

// "(Binary data 2506078 bytes, use -b option to extract)"
const BinaryFieldRE =
  // /^\(?Binary data (\d+).*use -b option to extract\)?$/i
  /Binary(?: data)? (\d+) bytes/i

export class BinaryField {
  constructor(
    readonly bytes: number,
    readonly rawValue: string
  ) {}

  toJSON() {
    return {
      _ctor: "BinaryField",
      bytes: this.bytes,
      rawValue: this.rawValue,
    }
  }

  static fromJSON(json: ReturnType<BinaryField["toJSON"]>): BinaryField {
    return new BinaryField(json.bytes, json.rawValue)
  }

  static fromRawValue(rawValue: string): Maybe<BinaryField> {
    const m = rawValue.match(BinaryFieldRE)
    if (m != null) {
      const bytes = toInt(m[1])
      if (bytes != null) {
        return new BinaryField(bytes, rawValue)
      }
    }
    return
  }
}
