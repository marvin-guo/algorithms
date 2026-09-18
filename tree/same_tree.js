import TreeNode from './tree_node.js'

// DFS, O(n) & O(h)
function isSameTree(p, q) {
  if (p === null && q === null) {
    return true
  } else if (p === null || q === null || p.val !== q.val) {
    return false
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// if iterative DFS, O(n) & O(n)
// if BFS, O(n) & O(n)

// DFS O(m*n) & O(m+n)
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

// O(m+n) & O(m+n)
function isSubtreeBySerialization(root, subRoot) {
  if (!subRoot) {
    return true
  }
  if (!root) {
    return false
  }
  const s1 = serializeTreeDfs(root)
  const s2 = serializeTreeDfs(subRoot)
  return s1.includes(s2)
}

function serializeTreeDfs(root) {
  const result = []
  
  const dfs = (node) => {
    if (node === null) {
      result.push('#@')
      return
    }
    result.push('#')
    result.push(node.val.toString())
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result.join('')
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
