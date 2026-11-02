// O(2^n) & O(n)
function rob(nums) {
  const dfs = (i) => {
    if (i >= nums.length) {
      return 0
    }
    return Math.max(dfs(i + 1), nums[i] + dfs(i + 2))
  }
  return dfs(0)
}

function robOptimal(nums) {
  let rob1 = 0
  let rob2 = 0
  for (const num of nums) {
    const temp = Math.max(num + rob1, rob2)
    rob1 = rob2
    rob2 = temp
  }
  return rob2
}

// O(n) & O(n) (O(1) space)
// Top - Bottom: memoization, memo array
// Bottom - Top: dp array
// Space optimized - Use rob1, rob2 instead of dp array
// * we only care 2 things: 1. the best result up to the previous house, 2. the best result up to the house before that; with current item, then pick maxmium.

// house is circle, 0 and nums.length - 1 is adjecent
function rob2(nums) {
  // split to Math.max(0 : n - 2, 1 : n - 1)
  if (nums.length < 1) {
    return 0
  }
  if (nums.length === 1) {
    return nums[0]
  }
  let rob1 = 0
  let rob2 = 0
  let rob3 = 0
  let rob4 = 0
  for (let i = 0; i < nums.length - 1; i++) {
    const temp = rob2
    rob2 = Math.max(rob2, rob1 + nums[i])
    rob1 = temp
  }
  for (let i = 1; i < nums.length; i++) {
    const temp = rob4
    rob4 = Math.max(rob4, rob3 + nums[i])
    rob3 = temp
  }
  return Math.max(rob2, rob4)
}
