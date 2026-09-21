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

// O(n) & O(n) (O(1) space)
// Top - Bottom: memoization, memo array
// Bottom - Top: dp array
// Space optimized - Use rob1, rob2 instead of dp array

// house is circle, 0 and nums.length - 1 is adjecent
function rob2(nums) {
  // split to Math.max(0 : n - 2, 1 : n - 1)
}
