/**
 * Wait for a pause in activity before running it once
 * 
 * 1. For first time call, start a timer
 * 2. If another call before timeout, clearTimeout and restart the timer
 * 3. If no more call before timeout, apply the fn call and end the timer
 * 4. closure to retain timeoutId states across function calls, 
 *    return a function accept ...args
 * 5. use .apply context to main correct this binding and forward all arguments
 */
function debounce(fn, wait) {
  let timeoutId = null

  return function (...args) {
    const context = this

    // clear previous timer if called again within wait window
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(context, args)
      timeoutId = null
    }, wait)
  }
}

/**
 * Debounce with immediate execution (leading edge)
 * 1. set callNow, to prepare call immediate at last
 * 2. if call before timeout, clear previous timeout
 * 3. set timeId with setTimeout, after timeout should reset timeId and call fn if not immediate or leading edge
 * 4. at last, if should call now (immediate && timerId is null in the beginning), then call the fn. 
 */
function debounceLeading(fn, wait, immediate = false) {
  let timerId = null

  return function (...args) {
    const context = this
    const callNow = immediate && !timerId

    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      timerId = null
      if (!immediate) {
        fn.apply(context, args)
      }
    }, wait)

    if (callNow) {
      fn.apply(context, args)
    }
  }
}

function createCancellableDebounce(fn, delay) {
  let timeoutId = null

  function debounced(...args) {
    const context = this

    // clear previous timer if called again within wait window
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(context, args)
      timeoutId = null
    }, delay)
  }

  // Attach a cancel function directly to the returned wrapper
  debounced.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
