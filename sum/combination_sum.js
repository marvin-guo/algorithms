// Array, Backtracking (is much better than second solution without backtrack)
/**
 * We want to build all combinations of numbers that add up to the target.
 * Each number can be used multiple times, so at every index we have two choices:
 * 
 * 1. include the current number - stay at the same index
 * 2. skip the current number - move to next index
 * 
 * We explore all possible choices using "backtracking" push & pop. 
 * Whenever the running total equals the target, we store that combination.
 * If the total becomes greater than the target or we run out of numbers, we stop exploring that path.
 */
function combinationSumBacktrack(nums, target) {
  if (!nums?.length) {
    return []
  }
  const res = []

  const backtrack = (base = [], idx = 0, sum = target) => {
    if (sum === 0) {
      res.push([...base])
    } else if (sum < 0 || idx >= nums.length) {
      return
    } else {
      // push -> recurse -> pop pattern, only allocates one single array in memory for entire duration
      // the changes to the array are perfectly neutralized, leaving the array in its exact original state
      // it's a highly efficiency pattern
      base.push(nums[idx])
      backtrack(base, idx, sum - nums[idx])
      base.pop()
      backtrack(base, idx + 1, sum)
    }
  }

  backtrack()
  return res
}

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
