// in order traversal, traversal all tree then return k-th value
// O(n) & O(n)
function kthSmallest(root, k) {
  const arr = []
  const dfs = (node) => {
    if (!node) return
    dfs(node.left)
    arr.push(node.val)
    dfs(node.right)
  }
  dfs(root)
  return arr[k - 1]
}

// in order traversal, count and stop when k-th node visit
// memory/space optimal
// T: O(h+k) worst O(n), S: O(h) worst O(n)
function kthSmallestOptimal(root, k) {
  let tmp = new Int32Array(2)
  tmp[0] = k
  const dfs = (node) => {
    if (!node) {
      return
    }
    dfs(node.left)
    if (tmp[0] === 0) {
      return
    }
    tmp[0]--
    if (tmp[0] === 0) {
      tmp[1] = node.val
      return
    }
    dfs(node.right)
  }
  dfs(root)
  return tmp[1]
}

// iterative DFS (optimal) - stack
// O(n) & O(n)
/**
 * stack:
 * 1. push all left nodes (go as deep as possible)
 * 2. pop the top node - next smallest value
 * 3. move to its right subtree and repeat
 * 4. pop the k-th node, return the answer
 */
function kthSmallestIterative(root, k) {
  const stack = []
  let cur = root
  while (stack.length > 0 || cur !== null) {
    while (cur !== null) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    k--
    if (k === 0) {
      return cur.val
    }
    cur = cur.right
  }
}

// T O(n) && Space O(1), save extra space in iterative DFS stack, and recursive stack
// Threads, take inorder predecessor (the rightmost node of the left subtree) 
// and points its empty right pointer back up to the current root node
function kthSmallestMorris(root, k) {
  let curr = root;

  // Continue looping as long as there are unvisited nodes or active threads
  while (curr) {
    // SECTION 1: No left child exists
    // Since there's nothing smaller on the left, we process 'curr' immediately.
    if (!curr.left) {
      k--;
      if (k === 0) return curr.val;
      curr = curr.right;
    } else {
      // SECTION 2: A left child exists
      // We must find the inorder predecessor to decide whether to go down or clean up.
      let pred = curr.left;
      // Move as far right as possible in the left subtree, but stop if a loop/thread is detected
      while (pred.right && pred.right !== curr) {
        pred = pred.right;
      }

      // SECTION 2A: Thread does not exist yet (First time visiting 'curr')
      if (!pred.right) {
        pred.right = curr;
        curr = curr.left;
      } else {
        // SECTION 2B: Thread already exists (Second time visiting 'curr')
        // This means we just climbed back up the tree after finishing the entire left subtree.

        // Clean up and dissolve the bridge to restore tree structure
        pred.right = null;
        // 'Visit' the root node since its left side is completely done
        k--;
        if (k === 0) return curr.val; // Target found! Return its value immediately
        curr = curr.right; // Move to the right child to process larger values
      }
    }
  }
  return -1;
}
