import { asyncMapTree } from './async_tree_map.js'

// Test Runner Function
async function runTests() {
  console.log("Starting tests...")

  // --- Test Case 1: Standard Tree Mapping ---
  try {
    const inputTree = {
      val: 1,
      children: [
        { val: 2, children: [] },
        { val: 3, children: [] }
      ]
    }

    // Mock async function: doubles numbers after a delay
    const mockAsyncDouble = (val, cb) => setTimeout(() => cb(null, val * 2), 50)

    const result = await asyncMapTree(inputTree, mockAsyncDouble)

    // Assertions
    console.assert(result.val === 2, "Root value should be 2")
    console.assert(result.children[0].val === 4, "First child should be 4")
    console.assert(result.children[1].val === 6, "Second child should be 6")
    console.log("✅ Test 1 Passed: Tree mapped correctly")
  } catch (err) {
    console.error("❌ Test 1 Failed:", err)
  }

  // --- Test Case 2: Error Handling (Fail-Fast) ---
  try {
    const inputTree = { val: 1, children: [{ val: "invalid", children: [] }] }
    const mockFailingFn = (val, cb) => {
      setTimeout(() => {
        if (typeof val !== "number") cb(new Error("Value is not a number"))
        else cb(null, val * 2)
      }, 50)
    }

    await asyncMapTree(inputTree, mockFailingFn)
    console.error("❌ Test 2 Failed: Should have thrown an error for invalid input")
  } catch (err) {
    console.assert(err.message === "Value is not a number", "Error message should match")
    console.log("✅ Test 2 Passed: Rejected on child error")
  }

  // --- Test Case 3: Null/Empty Inputs ---
  try {
    const resultNull = await asyncMapTree(null, () => {})
    console.assert(resultNull === null, "Null input should return null")
    console.log("✅ Test 3 Passed: Handles null root")
  } catch (err) {
    console.error("❌ Test 3 Failed:", err)
  }
}

runTests()
