export function retryOnReject<T>(
  f: () => T | Promise<T>,
  maxRetries: number,
  baseDelayMs = 50,
): Promise<T> {
  let retries = 0;
  const g: () => Promise<T> = async () => {
    try {
      return await f();
    } catch (err) {
      if (retries < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, retries);
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
        return g();
      } else {
        throw err;
      }
    }
  };
  return g();
}
