export class Deferred<T> {
  readonly promise: Promise<T>
  private _resolve: (value?: T) => void
  private _reject: (reason?: any) => void
  private _fulfilled: boolean = false

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  get fulfilled(): boolean {
    return this._fulfilled
  }

  resolve(value?: T): void {
    this._fulfilled = true
    this._resolve(value)
  }

  reject(reason?: any): void {
    this._fulfilled = true
    this._reject(reason)
  }
}
