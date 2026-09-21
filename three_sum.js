function threeSum(nums) {
  const map = new Map()
  const res = []
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  const uniqueNums = Array.from(map.keys())
  uniqueNums.sort((a, b) => a - b)
  const uniqueLen = uniqueNums.length
  for (let i = 0; i < uniqueLen; i++) {
    for (let j = i; j < uniqueLen; j++) {
      const target = -(uniqueNums[i] + uniqueNums[j])
      if (target < uniqueNums[j]) {
        continue
      }
      if (target === 0) {
        if (map.get(target) >= 3) {
          res.push([0, 0, 0])
        }
      } else if (j === i) {
        if (map.get(uniqueNums[i]) >= 2 && map.get(target) >= 1) {
          res.push([uniqueNums[i], uniqueNums[i], target])
        }
      } else if (target === uniqueNums[j]) {
        if (map.get(target) >= 2) {
          res.push([uniqueNums[i], target, target])
        }
      } else if (map.get(target) >= 1) {
        res.push([uniqueNums[i], uniqueNums[j], target])
      }
    }
  }
  return res
}

function threeSumWithTwoPointers(nums) {
  nums.sort((a, b) => a - b)
  const res = []

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let l = i + 1
    let r = nums.length - 1

    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]

      if (sum < 0) {
        l++
      } else if (sum > 0) {
        r--
      } else {
        res.push([nums[i], nums[l], [nums[r]]])
        l++
        r--
        while (l < r && nums[l] === nums[l - 1]) {
          l++
        }
      }
    }
    return res
  }
}
