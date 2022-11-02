export function retryOnReject<T>(
  f: () => T | Promise<T>,
  maxRetries: number
): Promise<T> {
  let retries = 0
  const g: () => Promise<T> = async () => {
    try {
      return await f()
    } catch (err) {
      // console.log("retryOnReject caught error", { err, retries, maxRetries })
      if (retries < maxRetries) {
        retries++
        return g()
      } else {
        throw err
      }
    }
  }
  return g()
}
