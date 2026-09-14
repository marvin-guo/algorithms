/**
 * Runs a function at regular fixed intervals 
 * (ensure a function runs at most once every set number of milliseconds)
 * (limit execution to once every limit milliseconds)
 * 
 * 1. for first call, set inThrottle true and start a timer
 * 2. in timer, no more calls
 * 3. after timer, reset inThrottle to false
 * 4. closure to retain inThrottle across function calls
 */
function throttle(fn, limit) {
  let inThrottle = false

  return function (...args) {
    const context = this

    if (!inThrottle) {
      fn.apply(context, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

function throttle2(fn, delay) {
  let lastCall = 0

  return function (...args) {
    const now = Date.now()

    // only invoke if enough time has passed since the last execution
    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}

function throttleWithTrailing(fn, delay) {
  let timerId = null
  let lastArgs = null
  let lastContext = null

  return function (...args) {
    // Store latest arguments and context for trailing execution
    lastArgs = args
    lastContext = this

    if (!timerId) {
      // Execute immediately on leading edge
      fn.apply(lastContext, lastArgs)
      lastArgs = null
      lastContext = null

      // Set cooldown period
      timerId = setTimeout(() => {
        timerId = null
        // If calls were made during cooldown, run trailing execution
        if (lastArgs) {
          fn.apply(lastContext, lastArgs)
          lastArgs = null
          lastContext = null
        }
      }, delay)
    }
  }
}
