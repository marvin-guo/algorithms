import { asyncMapTree } from './async_tree_map.js'

// need Jest or Vitest environment

describe('asyncMapTree', () => {
  // Helper mock function
  const mockAsyncDouble = (val, cb) => {
    setTimeout(() => cb(null, val * 2), 20)
  }

  test('should correctly transform a tree bottom-up', async () => {
    const tree = {
      val: 5,
      children: [
        { val: 10, children: [] },
        { val: 15, children: [] }
      ]
    }

    const result = await asyncMapTree(tree, mockAsyncDouble)

    expect(result).toEqual({
      val: 10,
      children: [
        { val: 20, children: [] },
        { val: 30, children: [] }
      ]
    })
  })

  test('should handle null/undefined root nodes', async () => {
    const result = await asyncMapTree(null, mockAsyncDouble)
    expect(result).toBeNull()
  })

  test('should reject if any child fails (fail-fast)', async () => {
    const tree = {
      val: 1,
      children: [{ val: 'bad_input', children: [] }]
    }

    const failingAsyncFn = (val, cb) => {
      setTimeout(() => {
        if (typeof val !== 'number') cb(new Error('Invalid type'))
        else cb(null, val)
      }, 20)
    }

    // Expect the promise to reject with an error
    await expect(asyncMapTree(tree, failingAsyncFn)).rejects.toThrow('Invalid type')
  })
})
