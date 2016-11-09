export interface Parser<T> {
  parse(input: string): T
  onError(message: string): void
}
