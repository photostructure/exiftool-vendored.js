import { pad2 } from "./String"

/**
 * Encodes an ExifDate
 */
export class ExifDate {
  constructor(
    readonly year: number, // four-digit year
    readonly month: number, // 1-12, (no crazy 0-11 nonsense from Date!)
    readonly day: number // 1-31
  ) {}

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day)
  }

  toISOString(): string {
    return `${this.year}-${pad2(this.month)}-${pad2(this.day)}`
  }

  toString() {
    return this.toISOString()
  }
}
