
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
      if (hasFailed) {
        return
      }

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
