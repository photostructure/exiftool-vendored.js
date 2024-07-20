import { Maybe } from "./Maybe"
import { toInt } from "./Number"

// "(Binary data 2506078 bytes, use -b option to extract)"
const BinaryFieldRE =
  // 1000000000 bytes is 1 GB. The largest binary field I've seen is ~5 MB (7
  // chars): 10 chars is absurdly large, and is just to avoid the
  // `js/polynomial-redos` eslint rule.
  /Binary(?: data)? (\d{1,10}) bytes/i

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
