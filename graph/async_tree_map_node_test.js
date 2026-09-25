import test from 'node:test'
import assert from 'node:assert/strict'
import { asyncMapTree } from './async_tree_map.js'

test('asyncMapTree maps nodes correctly', async () => {
  const tree = { val: 2, children: [{ val: 4, children: [] }] }
  const mockFn = (val, cb) => setTimeout(() => cb(null, val + 1), 10)

  const result = await asyncMapTree(tree, mockFn)

  assert.deepEqual(result, {
    val: 3,
    children: [{ val: 5, children: [] }]
  })
})

test('asyncMapTree rejects on error', async () => {
  const tree = { val: 2, children: [] }
  const failingFn = (val, cb) => setTimeout(() => cb(new Error('Failed')), 10)

  await assert.rejects(
    async () => {
      await asyncMapTree(tree, failingFn)
    },
    { message: 'Failed' }
  )
})

// run: node --test graph/async_tree_map_node_test.js
