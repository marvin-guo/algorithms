// Node: { val, children }
// asyncFn(val, callback), resolve and return new val

/**
 * Recursively maps a tree asynchronously bottom-up.
 * 
 * @param {Object} root - Tree node with { val, children }
 * @param {Function} asyncFn - Callback-style function: asyncFn(val, (err, newVal) => {})
 * @returns {Promise<Object|null>} - Resolves to the transformed tree structure
 */
async function asyncMapTree(root, asyncFn) {
  if (!root) {
    return null
  }

  if (typeof root !== 'object') {
    throw new TypeError(`Expected root to be an object, received ${typeof root}`)
  }

  const rawChildren = Array.isArray(root.children) ? root.children : []

  // 1. concurrently map all children first
  const mappedChildren = await Promise.all(
    rawChildren.map(child => asyncMapTree(child, asyncFn))
  )

  // 2. transform current node value using asyncFn
  const newVal = await new Promise((resolve, reject) => {
    try {
      asyncFn(root.val, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    } catch (syncErr) {
      reject(syncErr)
    }
  })

  // 3. return newly built node
  return {
    val: newVal,
    children: mappedChildren,
  }
}

// Other implementations without async/await
// Option 1: Pure promises, using raw .then() and Promise.all() chains
function asyncMapTreePromises(root, asyncFn) {
  if (root === null || root === undefined) {
    return Promise.resolve(null)
  }

  if (typeof root !== 'object') {
    return Promise.reject(new TypeError(`Expected root to be an object, received ${typeof root}`))
  }

  const rawChildren = Array.isArray(root.children) ? root.children : []

  // 1. Process all children first
  return Promise.all(rawChildren.map(child => asyncMapTreePromises(child, asyncFn)))
    .then(mappedChildren => {
      // 2. Wrap asyncFn in a Promise for the parent node
      return new Promise((resolve, reject) => {
        try {
          asyncFn(root.val, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
        } catch (syncErr) {
          reject(syncErr)
        }
      }).then(mappedVal => {
        // 3. Assemble and return the transformed node
        return {
          val: mappedVal,
          children: mappedChildren
        }
      })
    })
}

// Option 2: Pure callbacks, no promises, no async/await
function asyncMapTreeCallback(root, asyncFn, callback) {
  // Edge Case: Null or undefined root
  if (root === null || root === undefined) {
    if (callback) callback(null, null)
    return
  }

  const rawChildren = Array.isArray(root.children) ? root.children : []
  const totalChildren = rawChildren.length

  // Base Case: Leaf node or node with no children
  if (totalChildren === 0) {
    asyncFn(root.val, (err, mappedVal) => {
      if (err) return callback(err)
      callback(null, { val: mappedVal, children: [] })
    })
    return
  }

  // State management for mapping child nodes in parallel
  const mappedChildren = new Array(totalChildren)
  let completedCount = 0
  let hasFailed = false

  // Process children concurrently
  rawChildren.forEach((child, index) => {
    asyncMapTreeCallback(child, asyncFn, (err, mappedChild) => {
      if (hasFailed) return

      if (err) {
        hasFailed = true
        return callback(err) // Fail fast
      }

      // Preserve array position to match tree structure
      mappedChildren[index] = mappedChild
      completedCount++

      // When all children finish, process the parent node
      if (completedCount === totalChildren) {
        asyncFn(root.val, (parentErr, mappedVal) => {
          if (hasFailed) return

          if (parentErr) {
            hasFailed = true
            return callback(parentErr)
          }

          callback(null, {
            val: mappedVal,
            children: mappedChildren
          })
        })
      }
    })
  })
}

// Mock async function: doubles the value after 100ms
function mockAsyncFn(val, cb) {
  setTimeout(() => {
    if (typeof val !== 'number') {
      cb(new Error(`Invalid value: ${val}`))
    } else {
      cb(null, val * 2)
    }
  }, 100)
}

// Tree Structure:
//        1
//      /   \
//     2     3
//    /
//   4

const tree = {
  val: 1,
  children: [
    {
      val: 2,
      children: [
        { val: 4, children: [] }
      ]
    },
    { val: 3, children: [] }
  ]
}

// Running pure callback version
// asyncMapTreeCallback(tree, mockAsyncFn, (err, newTree) => {
//   if (err) {
//     console.error('Failed:', err)
//   } else {
//     console.log('Transformed Tree:', JSON.stringify(newTree, null, 2))
//   }
// })

export {
  asyncMapTree,
  asyncMapTreePromises,
  asyncMapTreeCallback,
}
