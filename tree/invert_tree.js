import Queue from "../queue.js"

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

function invertTree(root) {
  if (!root) {
    return null
  }
  [root.left, root.right] = [root.right, root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root
}

function invertTreeBfs(root) {
  if (!root) {
    return null
  }
  const q = new Queue()
  q.enqueue(root)
  while (!q.isEmpty()) {
    const item = q.dequeue()
    const temp = item.left
    item.left = item.right
    item.right = temp

    if (item.left) {
      q.enqueue(item.left)
    }
    if (item.right) {
      q.enqueue(item.right)
    }
  }
  return root
}

const root = new TreeNode(1)
const node1 = new TreeNode(2)
const node2 = new TreeNode(3)
const node3 = new TreeNode(4)
const node4 = new TreeNode(5)
const node5 = new TreeNode(6)
const node6 = new TreeNode(7)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node2.left = node5
node2.right = node6

console.log(root, node1, node2)
console.log('//////////////')
invertTreeBfs(root)
console.log(root, node1, node2)
