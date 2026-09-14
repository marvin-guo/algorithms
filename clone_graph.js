import Queue from "./queue.js"

class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val              // number
    this.neighbors = neighbors  // Node[]
  }
}

class Solution {
  /**
   * @param {Node} node
   * @return {Node}
   */
  cloneGraph(node) {
    const oldToNew = new Map() // key value pairs: [Node, Node]
    return this.dfs(node, oldToNew)
  }

  dfs(node, oldToNew) {
    if (node === null) {
      return null
    }

    if (oldToNew.has(node)) {
      return oldToNew.get(node)
    }

    const copy = new Node(node.val)
    oldToNew.set(node, copy)

    for (const nei of node.neighbors) {
      copy.neighbors.push(this.dfs(nei, oldToNew))
    }

    return copy
  }
}

function cloneGraph(node) {
  const oldToNew = new Map()
  return dfs(node, oldToNew)
}

function dfs(node, oldToNew) {
  if (node === null) {
    return null
  }

  if (oldToNew.has(node)) {
    return oldToNew.get(node)
  }

  const copy = new Node(node.val)
  oldToNew.set(node, copy)

  for (const nei of node.neighbors) {
    copy.neighbors.push(dfs(nei, oldToNew))
  }

  return copy
}

const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(5)

node1.neighbors.push(node2, node4)
node2.neighbors.push(node1, node3)
node3.neighbors.push(node2)
node4.neighbors.push(node1, node5)
node5.neighbors.push(node4)

const copy = cloneGraph(node1)
copy.val = 100
copy.neighbors[0].val = 200
console.log(node1, node1.neighbors.map(({ val }) => val), node1.neighbors.map(({ neighbors }) => neighbors))
console.log('//////////////')
console.log(copy, copy.neighbors.map(({ val }) => val), copy.neighbors.map(({ neighbors }) => neighbors))
console.log('//////////////')

function cloneGraphBfs(node) {
  if (!node) {
    return null
  }
  const oldToNew = new Map()
  const q = new Queue()
  oldToNew.set(node, new Node(node.val))
  q.enqueue(node)

  while (!q.isEmpty()) {
    const cur = q.dequeue()
    for (const nei of cur.neighbors) {
      if (!oldToNew.has(nei)) {
        oldToNew.set(nei, new Node(nei.val))
        q.enqueue(nei)
      }
      oldToNew.get(cur).neighbors.push(oldToNew.get(nei))
    }
  }
  return oldToNew.get(node)
}

const copyBfs = cloneGraphBfs(node1)
console.log(copyBfs, copyBfs.neighbors.map(({ val }) => val), copyBfs.neighbors.map(({ neighbors }) => neighbors))
console.log('//////////////')
