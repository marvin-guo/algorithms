import TreeNode from './tree_node.js'

// hashmap + dfs
function buildTree(preorder, inorder) {
  let preIdx = 0
  const indices = new Map()
  inorder.forEach((val, i) => indices.set(val, i))

  const dfs = (l, r) => {
    if (l > r) {
      return null
    }
    const rootVal = preorder[preIdx++]
    const root = new TreeNode(rootVal)
    const mid = indices.get(rootVal)
    const left = dfs(l, mid - 1)
    const right = dfs(mid + 1, r)
    root.left = left
    root.right = right
    return root
  }

  return dfs(0, inorder.length - 1)
}

// dfs optimal, with limit (Infinity)
function buildTreeWithLimit(preorder, inorder) {
  let preIdx = 0
  let inIdx = 0
  
  const dfs = (limit) => {
    if (preIdx >= preorder.length) return null
    if (inorder[inIdx] === limit) {
      inIdx++
      return null
    }

    let root = new TreeNode(preorder[preIdx++])
    root.left = dfs(root.val)
    root.right = dfs(limit)
    return root
  }

  return dfs(Infinity)
}
