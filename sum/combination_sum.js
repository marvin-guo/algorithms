// Array, Backtracking

function combinationSum(nums, target) {
  if (!nums?.length) {
    return []
  }
  const res = []

  const dfs = (base = [], idx = 0, sum = target) => {
    if (idx >= nums.length) {
      return
    }
    dfs([...base], idx + 1, sum)
    const val = nums[idx]
    while (sum >= val) {
      sum = sum - val
      base.push(val)
      if (sum > 0) {
        dfs([...base], idx + 1, sum)
      } else if (sum === 0) {
        res.push([...base])
      }
    }
    return
  }

  dfs()
  return res
}
