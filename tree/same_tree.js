import TreeNode from './tree_node.js'

function isSameTree(p, q) {
  if (p === null && q === null) {
    return true
  } else if (p === null || q === null || p.val !== q.val) {
    return false
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

function isSubtree(root, subRoot) {
  if (!subRoot) {
    return true
  }
  if (!root) {
    return false
  }
  const stack = [root]
  while (stack.length > 0) {
    const node = stack.pop()
    if (node.val === subRoot.val) {
      const isSame = isSameTree(node, subRoot)
      if (isSame) {
        return true
      }
    }
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  return false
}

function isSubtreeBySerialization(root, subRoot) {
  if (!subRoot) {
    return true
  }
  if (!root) {
    return false
  }
  const s1 = serializeTree(root)
  const s2 = serializeTree(subRoot)
  return s1.contains(s2)
}

function serializeTree(root) {
  const stack = [root]
  const result = []
  while (stack.length > 0) {
    const node = stack.pop()
    result.push(node.val)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
  }
  return result.join(',')
}
