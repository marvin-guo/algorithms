async function fetchWithRetries(fn, retries = 3, delayMs = 1000) {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    return fetchWithRetries(fn, retries - 1, delayMs)
  }
}
