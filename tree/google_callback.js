
class Task {
  constructor(directDeps = []) {
    this.directDeps = directDeps
  }

  execute(callback) {
    callback()
  }
}

// each task execution is asynchronous, trigger callback after execution done. 
// it may take minutes to execute

// execute task depend on all children tasks finished
// edge cases?
function executeTask(task, callback) {
  if (!task) {
    if (callback) {
      callback()
    }
    return
  }
  const directDeps = task.directDeps
  const totalChildren = directDeps.length

  if (totalChildren === 0) {
    task.execute(callback)
    return
  }

  let finishedCount = 0
  let hasFailed = false

  for (const child of directDeps) {
    executeTask(child, (err) => {
      // for same level deps, prevent multiple root Error Alerts
      // prevents eventual execution after a partial failure, setting hasFailed be true locks down
      // stack frame, so no future successes or failures can trigger taskA execute
      if (hasFailed) {
        return
      }

      // if err from one of children execute, mark hasFailed for this level deps, and bubble error up to parent level
      if (err) {
        hasFailed = true
        if (callback) {
          callback(err)
        }
        return
      }

      finishedCount++
      if (finishedCount === totalChildren) {
        task.execute(callback)
      }
    })
  }
}

// this is post-order traversal
// write a test mock function to verify the behavior
function createMockTask(name, deps, duration = 1000) {
  return {
    name,
    directDeps: deps,
    execute: function (cb) {
      // use normal `function` (not arrow function), so this.name point to correct value
      console.log(`[START] Task ${this.name}`)
      setTimeout(() => {
        console.log(`[DONE] Task ${this.name}`)
        cb(null)
      }, duration)
    }
  }
}

// Tree Structure:
//        A (Root)
//       /   \
//      B     C
//     / \
//    D   E

const taskD = createMockTask('D', [], 1000);
const taskE = createMockTask('E', [], 1500);
const taskB = createMockTask('B', [taskD, taskE], 800);
const taskC = createMockTask('C', [], 2000);
const taskA = createMockTask('A', [taskB, taskC], 500);

// Run the root task
executeTask(taskA, (err) => {
  if (err) {
    console.error('Execution failed:', err)
  } else {
    console.log('ALERT: Root Task A is fully done!')
  }
})

// Convert callback-based logic to modern async/wait and Promise.all 
// write in Promise async/await, then no need callback and manual completion counters 
async function executeTaskPromise(task) {
  if (!task) {
    return
  }

  const deps = task.directDeps

  // 1. recursively execute all child dependencies concurrently
  // pause execution of parent task until all child Promises have fulfilled,
  // if any child Promise rejects, Promise all rejects immediately, providing build-in fail-fast behavior
  // it will be catch by run function try/catch block, and not move to next line new Promise call
  if (deps.length > 0) {
    await Promise.all(deps.map((child) => executeTaskPromise(child)))
  }

  // 2. execute the current task once all dependencies have resolved
  // wrap legacy task.execute in new Promise, to integrate seamlessly into async/await chain
  return new Promise((resolve, reject) => {
    task.execute((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// Running the execution with async/await
async function run() {
  try {
    await executeTaskPromise(taskA)
    console.log('ALERT: Root Task A is fully done!')
  } catch (err) {
    console.error('Execution failed:', err)
  }
}

run()
