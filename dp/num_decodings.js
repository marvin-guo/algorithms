
function numDecodings(s) {
  if (s.length === 0 || s[0] === '0') {
    return 0
  }
  const n = s.length
  const dp = Array(n).fill(0)

  dp[0] = 1
  dp[1] = 1

  let prevDigit = s[0]
  let prevPlus = false

  for (let i = 1; i < s.length; i++) {
    const cur = s[i]
    // 00 or 30, return 0
    if ((cur === '0' && prevDigit === '0') || (cur === '0' && parseInt(`${prevDigit}${cur}`) > 26)) {
      return 0
    } else if (cur === '0' && prevPlus) { // **1210, dp[i] = dp[i - 1]
      dp[i + 1] = dp[i - 1]
      prevPlus = false
    } else if (cur !== '0' && prevDigit !== '0' && parseInt(`${prevDigit}${cur}`) <= 26) { // *312
      dp[i + 1] = dp[i] + dp[i - 1]
      prevPlus = true
    } else { // **131 or **101
      dp[i + 1] = dp[i]
      prevPlus = false
    }
    prevDigit = cur
  }
  return dp[n]
}

function numDecodingsSpaceOptimal(s) {
  if (s.length === 0 || s[0] === '0') {
    return 0
  }
  const n = s.length

  let first = 1
  let second = 1

  let prevDigit = s[0]
  let prevPlus = false

  for (let i = 1; i < n; i++) {
    const cur = s[i]
    // 00 or 30, return 0
    if ((cur === '0' && prevDigit === '0') || (cur === '0' && parseInt(`${prevDigit}${cur}`) > 26)) {
      return 0
    } else if (cur === '0' && prevPlus) { // **1210, dp[i] = dp[i - 1]
      const temp = first
      first = second
      second = temp
      prevPlus = false
    } else if (cur !== '0' && prevDigit !== '0' && parseInt(`${prevDigit}${cur}`) <= 26) { // *312
      const temp = second
      second = first + second
      first = temp
      prevPlus = true
    } else { // **131 or **101
      first = second
      prevPlus = false
    }
    prevDigit = cur
  }
  return second
}
