
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
