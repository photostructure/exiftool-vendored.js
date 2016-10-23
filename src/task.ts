/**
 * Emodies both a command (`args`), and a handler for the resulting output 
 */
export abstract class Task<T> {
  readonly promise: Promise<T>
  private _resolve: (value?: T) => void
  private _reject: (reason?: any) => void

  constructor(readonly args: string[]) {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  reject(reason?: any) { this._reject(reason) }

  onData(data: string) {
    try {
      this._resolve(this.parse(data))
    } catch (e) {
      this._reject(e)
    }
  }

  protected abstract parse(data: string): T
}
