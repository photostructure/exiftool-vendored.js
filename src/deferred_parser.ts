import { Parser } from './parser'

export class DeferredParser<T> {
  readonly promise: Promise<T>
  private _resolve: (value?: T) => void
  private _reject: (reason?: any) => void

  constructor(readonly reader: Parser<T>) {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  reject(reason?: any) { this._reject(reason) }

  onError(message: string) { this.reader.onError(message) }

  parse(input: string) {
    try {
      this._resolve(this.reader.parse(input))
    } catch (e) {
      this._reject(e)
    }
  }
}
