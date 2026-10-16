import DSU from "./disjoint_set_union.js"
import Queue from "../queue.js"

function countComponentsDsu(n, edges) {
  const dsu = new DSU(n)
  for (const [u, v] of edges) {
    dsu.union(u, v)
  }
  return dsu.components
}

function countComponentsDfs(n, edges) {
  const adj = Array.from({ length: n }, () => [])
  const visited = Array(n).fill(false)

  for (const [a, b] of edges) {
    adj[a].push(b)
    adj[b].push(a)
  }

  const dfs = (node) => {
    for (const nei of adj[node]) {
      if (!visited[nei]) {
        visited[nei] = true
        dfs(nei)
      }
    }
  }

  let res = 0
  for (let node = 0; node < n; node++) {
    if (!visited[node]) {
      visited[node] = true
      dfs(node)
      res++
    }
  }
  return res
}
