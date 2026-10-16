import Queue from "../queue.js"

// n nodes with 0 to n - 1, edges are undirected [0, 1] is same with [1, 0]
// * adjacency lists for undirected graphs
// * DFS: traversing graphs recursively while tracking visited nodes
// * BFS: level-by-level graph traversal using a queue
// * union-find (disjoint set union)

// 1. recursively traverse nodes start from label 0
// 2. detect and check if has no cycle
// 3. able traverse all nodes (only one component, fully connected)
function validTree(n, edges) {
  // if > n-1, has cycle
  // if < n-1, graph cannot be connected
  // if = n-1, still need to check only one component (can be two separate graph and one with cycle)
  if (edges.length !== n - 1) {
    return false
  }

  const graph = Array.from({ length: n }, () => [])
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]
    graph[a].push(b)
    graph[b].push(a)
  }

  const visited = new Set()
  const dfs = (node, parent) => {
    if (visited.has(node)) {
      return false
    }
    visited.add(node)
    for (const nei of graph[node]) {
      if (nei === parent) {
        continue
      }
      if (!dfs(nei, node)) {
        return false
      }
    }
    return true
  }
  return dfs(0, -1) && visited.size === n
}

// BFS
function validTreeBfs(n, edges) {
  if (edges.length !== n - 1) {
    return false
  }

  const graph = Array.from({ length: n }, () => [])
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]
    graph[a].push(b)
    graph[b].push(a)
  }

  const visited = new Set()
  const q = new Queue()
  q.push([0, -1])
  visited.add(0)
  while (!q.isEmpty()) {
    const [node, parent] = q.pop()
    for (let nei of graph[node]) {
      if (nei === parent) {
        continue
      }
      if (visited.has(nei)) {
        return false
      }
      visited.add(nei)
      q.push([nei, node])
    }
  }
  return visited.size === n
}

function validTreeDsu(n, edges) {
  if (edges.length !== n - 1) {
    return false
  }

  const dsu = new DSU(n)
  for (const [u, v] of edges) {
    if (!dsu.union(u, v)) {
      return false
    }
  }
  return dsu.components === 1
}
