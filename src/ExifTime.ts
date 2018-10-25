import { millisToFractionalPart } from "./DateTime"
import { pad2 } from "./String"

/**
 * Encodes an ExifTime (which may not have a timezone offset)
 */
export class ExifTime {
  constructor(
    readonly hour: number,
    readonly minute: number,
    readonly second: number,
    readonly millisecond?: number
  ) {}

  get millis() {
    return this.millisecond
  }

  toISOString(): string {
    return (
      pad2(this.hour, this.minute, this.second).join(":") +
      millisToFractionalPart(this.millisecond)
    )
  }

  toString() {
    return this.toISOString()
  }
}
