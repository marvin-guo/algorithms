import Queue from "../queue.js"

/**
 * 1 <= numCourses <= 1000
 * 0 <= prerequisites.length <= 1000
 * prerequisites[i].length == 2
 * 0 <= a[i], b[i] < numCourses
 * All prerequisite pairs are unique.
 */

// BFS, indegree
function canFinish(numCourses, prerequisites) {
  // get dep course and its parent course (which depends on dep course) array
  // reverse the relation, so when the course has no deps, its all parents indegree count - 1
  const depsMap = new Map()
  // get course and deps' length in prerequisites
  const indegreeMap = new Map()

  for (let [course, dep] of prerequisites) {
    const deps = depsMap.get(dep)
    const count = indegreeMap.get(course)
    if (deps) {
      deps.push(course)
    } else {
      depsMap.set(dep, [course])
    }
    indegreeMap.set(course, (count || 0) + 1)
  }

  const readyQueue = new Queue()

  for (let i = 0; i < numCourses; i++) {
    if (!indegreeMap.get(i)) {
      readyQueue.enqueue(i)
    }
  }

  while (readyQueue.size() > 0) {
    const courseId = readyQueue.dequeue()
    const parentIds = depsMap.get(courseId)
    if (parentIds) {
      for (let pid of parentIds) {
        const count = indegreeMap.get(pid)
        indegreeMap.set(pid, count - 1)
        if (count === 1) {
          readyQueue.enqueue(pid)
        }
      }
    }
  }

  for (let [_, count] of indegreeMap.entries()) {
    if (count > 0) {
      return false
    }
  }

  return true
}

// BFS & indegree (same idea with above method, but cleaner)
function canFinishBfs(numCourses, prerequisites) {
  const indegree = Array(numCourses).fill(0)
  const adj = Array.from({ length: numCourses }, () => [])
  for (let [crs, dep] of prerequisites) {
    indegree[src]++
    adj[dep].push(crs)
  }

  const q = new Queue()
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      q.enqueue(i)
    }
  }

  let finish = 0
  while (!q.isEmpty()) {
    const node = q.dequeue()
    finish++
    for (let pid of adj[node]) {
      indegree[pid]--
      if (indegree[pid] === 0) {
        q.enqueue(pid)
      }
    }
  }

  return finish === numCourses
}


// DFS Cycle detection
function canFinishDfs(numCourses, prerequisites) {
  const preMap = new Map()
  for (let i = 0; i < numCourses; i++) {
    preMap.set(i, [])
  }
  for (let [crs, pre] of prerequisites) {
    preMap.get(crs).push(pre)
  }

  // store all courses along the current DFS path
  const visiting = new Set()

  const dfs = (crs) => {
    if (visiting.has(crs)) {
      return false
    }
    if (preMap.get(crs).length === 0) {
      return true
    }
    visiting.add(crs)
    for (let pre of preMap.get(crs)) {
      if (!dfs(pre)) {
        return false
      }
    }
    visiting.delete(crs)
    preMap.set(crs, [])
    return true
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) {
      return false
    }
  }

  return true
}
