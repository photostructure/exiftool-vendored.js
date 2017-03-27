export function delay(millis: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), millis))
}
