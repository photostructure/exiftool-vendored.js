import { Deferred } from './deferred'

/**
 * Emodies both a command (`args`), and a handler for the resulting output 
 */
export abstract class Task<T> extends Deferred<T> {
  constructor(readonly args: string[]) {
    super()
  }

  onData(data: string) {
    try {
      this.resolve(this.parse(data))
    } catch (e) {
      this.reject(e)
    }
  }

  protected abstract parse(data: string): T;
}
