// Rate-limited Async batch queue

// async class design / queue management

// Question: Implement a class TaskRunner that manages a queue of asynchronous tasks:

class TaskRunner {
  /**
   * @param {Object} options
   * @param {number} [options.concurrency=1] - Maximum tasks running simultaneously.
   * @param {number} [options.maxTasksPerInterval=Infinity] - Max tasks allowed to start per time window.
   * @param {number} [options.intervalMs=0] - Duration of the rate-limit window in milliseconds.
   */
  constructor(options = {}) {
    const { concurrency = 1, maxTasksPerInterval = Infinity, intervalMs = 0 } = options

    if (concurrency < 1) {
      throw new RangeError('Concurrency limit must be at least 1')
    }
    if (maxTasksPerInterval < 1) {
      throw new RangeError('maxTasksPerInterval must be at least 1')
    }

    this.concurrency = concurrency
    this.maxTasksPerInterval = maxTasksPerInterval
    this.intervalMs = intervalMs

    this.queue = []                   // FIFO queue of task entries
    this.runningCount = 0             // Currently active running tasks
    this.executionTimestamps = []     // Timestamps of tasks started in the current window
    this.isPaused = false
    this.scheduledTimer = null        // Active rate-limit timer
  }

  /**
   * Pushes an async task function onto the queue.
   *
   * @param {Function} taskFn - An async function returning a Promise or value.
   * @returns {Promise<any>} Resolves or rejects with the result of taskFn.
   */
  push(taskFn) {
    if (typeof taskFn !== 'function') {
      return Promise.reject(new TypeError('Task must be a function'))
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject })
      this._processQueue()
    })
  }

  /**
   * Internal queue processor using a Sliding Window Rate Limiter algorithm.
   * @private
   */
  _processQueue() {
    if (this.isPaused || this.queue.length === 0) {
      return
    }

    // 1. Check Concurrency Limit
    if (this.runningCount >= this.concurrency) {
      return
    }

    // 2. Check Rate Limit (Sliding Window)
    if (this.intervalMs > 0 && this.maxTasksPerInterval < Infinity) {
      const now = Date.now()

      // Prune timestamps older than (now - intervalMs)
      this.executionTimestamps = this.executionTimestamps.filter(
        (timestamp) => now - timestamp < this.intervalMs
      )

      // If at rate capacity, schedule next check when the oldest timestamp expires
      if (this.executionTimestamps.length >= this.maxTasksPerInterval) {
        const oldestTimestamp = this.executionTimestamps[0]
        const delayUntilNextSlot = this.intervalMs - (now - oldestTimestamp)

        // Schedule timer if not already pending
        if (!this.scheduledTimer) {
          this.scheduledTimer = setTimeout(() => {
            this.scheduledTimer = null
            this._processQueue()
          }, Math.max(0, delayUntilNextSlot))
        }
        return
      }
    }

    // 3. Dequeue and Execute Task
    const { taskFn, resolve, reject } = this.queue.shift()

    this.runningCount++
    if (this.intervalMs > 0) {
      this.executionTimestamps.push(Date.now())
    }

    // Execute task isolated inside a Promise boundary
    Promise.resolve()
      .then(() => taskFn())
      .then((result) => resolve(result))
      .catch((error) => reject(error))
      .finally(() => {
        this.runningCount--
        // Trigger queue again to process next pending task
        this._processQueue()
      })

    // 4. Recursively check if more concurrency slots are available immediately
    this._processQueue()
  }

  /**
   * Pauses queue execution. Tasks currently running will complete normally.
   */
  pause() {
    this.isPaused = true
    if (this.scheduledTimer) {
      clearTimeout(this.scheduledTimer)
      this.scheduledTimer = null
    }
  }

  /**
   * Resumes queue execution.
   */
  resume() {
    if (!this.isPaused) return
    this.isPaused = false
    this._processQueue()
  }

  /**
   * Clears all pending tasks in the queue, rejecting their promises.
   *
   * @param {Error} [reason] - Rejection reason for pending tasks.
   */
  clear(reason = new Error('TaskRunner queue cleared')) {
    if (this.scheduledTimer) {
      clearTimeout(this.scheduledTimer)
      this.scheduledTimer = null
    }

    const pending = this.queue
    this.queue = []
    this.executionTimestamps = []

    for (const { reject } of pending) {
      reject(reason)
    }
  }

  /**
   * Returns current metrics of the runner.
   */
  get stats() {
    return {
      pending: this.queue.length,
      running: this.runningCount,
      isPaused: this.isPaused
    }
  }
}

// Helper for delayed logs
const log = (msg) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`)

async function runDemo() {
  log("Starting TaskRunner Test...")

  // Setup: Max 2 tasks at a time, and max 3 tasks per 2000ms window
  const runner = new TaskRunner({
    concurrency: 2,
    maxTasksPerInterval: 3,
    intervalMs: 2000
  })

  const createTask = (id, durationMs) => async () => {
    log(`[START] Task ${id}`)
    await new Promise((res) => setTimeout(res, durationMs))
    log(`[DONE]  Task ${id}`)
    return `Result ${id}`
  }

  // Push 6 tasks into the runner
  const promises = [
    runner.push(createTask('A', 500)),
    runner.push(createTask('B', 500)),
    runner.push(createTask('C', 500)),
    runner.push(createTask('D', 500)),
    runner.push(createTask('E', 500)),
    runner.push(createTask('F', 500))
  ]

  // Await all task results
  const results = await Promise.all(promises)
  log(`All results received: ${JSON.stringify(results)}`)
}

runDemo()

// Constraints:
// No more than concurrency tasks can run simultaneously.
// If tasks are added beyond the limit, they must wait in a FIFO queue.
// As soon as one running task finishes, the next task in the queue must immediately start.


// If you want to practice similar core concepts on LeetCode:
// LeetCode 2721 - Execute Asynchronous Functions in Parallel
// https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/description/?utm_source=gemini
//     Teaches: Recreating Promise.all manually using counters and callbacks/promises.
// LeetCode 2636 - Promise Pool
//     Teaches: Concurrency limits (running at most $N$ async tasks at a time).
// LeetCode 2622 - Cache With Time Limit
// https://leetcode.com/problems/cache-with-time-limit/description/?utm_source=gemini
//     Teaches: Managing async state, timers, and callbacks together.
// LeetCode 210 - Course Schedule II
// https://leetcode.com/problems/course-schedule-ii/description/?utm_source=gemini
//     Teaches: Topological Sort / Dependency resolution (the non-async, graph-theory version of your question).
