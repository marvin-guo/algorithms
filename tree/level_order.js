import Queue from "../queue.js"
import TreeNode from './tree_node.js'

// with Queue, get size and pop size count items for each level
function levelOrder(root) {
  if (!root) {
    return []
  }

  const queue = new Queue()
  const result = []

  queue.enqueue(root)

  while (queue.size() > 0) {
    const size = queue.size()
    const curLevel = []

    for (let i = 0; i < size; i++) {
      const item = queue.dequeue()
      curLevel.push(item.val)
      if (item.left !== null) {
        queue.enqueue(item.left)
      }
      if (item.right !== null) {
        queue.enqueue(item.right)
      }
    }
    result.push(curLevel)
  }

  return result
}

// with DFS recursion, explore left and right with depth + 1
function levelOrderRecursion(root) {
  const res = []
  const dfs = (node, depth) => {
    if (!node) {
      return
    }
    if (res.length === depth) {
      res.push([])
    }
    res[depth].push(node.val)
    dfs(node.left, depth + 1)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  return res
}
