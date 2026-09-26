// LCA - lowest common ancestor in Binary Search Tree (BST)
// node values are unique
// return a lowest node T that both p, and q are descendents. (the ancestor is allowed to be a descendent of itself)

// Constraints:
// 2 <= The number of nodes in the tree <= 100.
// -100 <= Node.val <= 100
// p != q
// p and q will both exist in the BST.

// my initial answer - low efficiency
function lowestCommonAncestor(root, p, q) {
  let cur = root
  let min = Math.min(p.val, q.val)
  let max = Math.max(p.val, q.val)
  while (cur !== null) {
    if (cur.val > p.val && cur.val > q.val) {
      cur = cur.left
    } else if (cur.val < p.val && cur.val < q.val) {
      cur = cur.right
    } else if (cur.val >= min && cur.val <= max) {
      return cur
    }
  }
  return cur
}

// recursion
function lowestCommonAncestorRecursion(root, p, q) {
  if (!root || !p || !q) {
    return null
  }
  if (Math.max(p.val, q.val) < root.val) {
    return lowestCommonAncestorRecursion(root.left, p, q)
  } else if (Math.min(p.val, q.val) > root.val) {
    return lowestCommonAncestorRecursion(root.right, p, q)
  } else {
    return root
  }
}
