import Queue from "../queue.js"

// Kahn's Algorithm (Topological Sort)

class Task {
  constructor(id = null, deps = []) {
    this.id = id
    this.deps = deps
  }

  build(callback) {
    callback()
  }
}

// run all tasks in the shortest time
// dependencies must finish before the dependent task starts
// no more than maxConcurrency tasks can run at the exact same time

/**
 * Executes a graph of tasks with dependencies up to a maximum concurrency limit.
 * 
 * @param {Array<Object>} tasks - List of task objects with { id, dependencies, build }
 * @param {number} maxConcurrency - Max number of tasks running simultaneously
 * @returns {Promise<void>} Resolves when all tasks finish, or rejects if a task fails or a cycle exists.
 */
async function buildAllTasks(tasks, maxConcurrency) {
  const taskMap = new Map()
  const inDegree = new Map()
  const depsMap = new Map()

  for (const task of tasks) {
    taskMap.set(task.id, task)
    inDegree.set(task.id, task.deps.length)
    depsMap.set(task.id, [])
  }
  
  // build reverse lookup map (depId -> list of parent tasks)
  for (const task of tasks) {
    task.deps.forEach(depId => {
      if (!depsMap.has(depId)) {
        throw new Error(`Dependency '${depId}' missing from tasks array.`)
      }
      depsMap.get(depId).push(task.id)
    })
  }

  // queue init with tasks that have 0 deps (ready to run)
  const readyQueue = new Queue()
  for (const [id, count] of inDegree.entries()) {
    if (count === 0) {
      readyQueue.enqueue(id)
    }
  }

  // tracking state
  let activeWorkers = 0
  let completedCount = 0
  const totalTasks = tasks.length

  return new Promise((resolve, reject) => {
    // worker executor loop
    function runNext() {
      if (completedCount === totalTasks) {
        return resolve()
      }
      while (activeWorkers < maxConcurrency && readyQueue.size() > 0) {
        const taskId = readyQueue.dequeue()
        const task = taskMap.get(taskId)

        activeWorkers++

        Promise.resolve()
          .then(() => task.build())
          .then(() => {
            activeWorkers--
            completedCount++

            const parentIds = depsMap.get(taskId)

            for (const pid of parentIds) {
              const inDegreeCnt = inDegree.get(pid)
              inDegree.set(pid, inDegreeCnt - 1)
              if (inDegreeCnt === 1) {
                readyQueue.enqueue(pid)
              }
            }

            // trigger worker to process newly unlocked tasks
            runNext()
          })
          .catch(err => {
            reject(err)
          })
      }

      // detect deadlocks / circular dependencies
      if (activeWorkers === 0 && readyQueue.size() === 0 && completedCount < totalTasks) {
        reject(new Error(`Cycle dependencies detected! build cannot complete.`))
      }
    }

    // kick off execution
    runNext()
  })
}

// Helper to create mock async tasks
function createMockTask(id, dependencies = [], duration = 1000) {
  return {
    id,
    deps: dependencies,
    build: async () => {
      console.log(`[START] Building ${id}...`);
      await new Promise(res => setTimeout(res, duration));
      console.log(`[DONE]  Built ${id}`)
    }
  }
}

// Dependency Graph Visual:

//      [Core-UI]       [Auth-API]
//       /      \           |
//  [Button]  [Navbar]  [Login-Page]
//      \        /          /
//       [Dashboard-App] --/

// Define the DAG
const mockTasks = [
  createMockTask('Dashboard-App', ['Button', 'Navbar', 'Login-Page'], 800),
  createMockTask('Button', ['Core-UI'], 1000),
  createMockTask('Navbar', ['Core-UI'], 1200),
  createMockTask('Login-Page', ['Auth-API'], 1500),
  createMockTask('Core-UI', [], 1000),
  createMockTask('Auth-API', [], 800),
]

// Execute with maxConcurrency = 2
async function runTest() {
  console.time('Total Build Time');
  console.log('--- Starting Build System ---');

  try {
    // Only 2 tasks can run at a time!
    await buildAllTasks(mockTasks, 2);
    console.log('--- All Tasks Built Successfully! ---');
  } catch (err) {
    console.error('Build Failed:', err.message);
  }

  console.timeEnd('Total Build Time');
}

runTest();

// real-world equivalents
// Every time a system processes dependencies, it is running a Topological Sort under the hood:
// 1. Build Systems (Webpack, Vite, Bazel): 
//    Compiling source code files in the right order based on import statements.
// 2. Package Managers (npm, pip): 
//    Installing package dependencies before installing the library that needs them.
// 3. Database Migrations: 
//    Running schema migration scripts in the order required by foreign key constraints.
// 4. Spreadsheet Formulas: 
//    Calculating cell values in Excel based on which cells reference which ($A1 = B1 + C1$).
