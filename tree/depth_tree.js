import Queue from "../queue.js"

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

// recursive DFS, O(n) & O(h) Best case O(log(n)) for balanced tree
// and worst case O(n) for degenerate tree
function maxDepthRecursiveDfs(root) {
  if (!root) {
    return 0
  }
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

// iterative DFS (stack), O(n) & O(n)
function maxDepthIterativeDfs(root) {
  if (!root) {
    return 0
  }
  const stack = [[root, 1]]
  let res = 0
  while (stack.length > 0) {
    const [node, depth] = stack.pop()
    if (node !== null) {
      res = Math.max(res, depth)
      stack.push([node.left, depth + 1])
      stack.push([node.right, depth + 1])
    }
  }
  return res
}

// BFS, O(n) & O(n)
function maxDepthBfs(root) {
  const q = new Queue()
  if (root !== null) {
    q.enqueue(root)
  }

  let level = 0

  while(q.size() > 0) {
    const size = q.size()
    for (let i = 0; i < size; i++) {
      const node = q.dequeue()
      if (node.left !== null) {
        q.enqueue(node.left)
      }
      if (node.right !== null) {
        q.enqueue(node.right)
      }
    }
    level++
  }
  return level
}
