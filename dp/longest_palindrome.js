// dp, bottom to top (n - 1 to 0)
// T & S: O(n^2)
function longestPalindromeDp(s) {
  let resIdx = 0
  let resLen = 0
  const n = s.length
  const dp = Array.from({ length: n }, () => Array(n).fill(false))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        if (resLen < j - i + 1) {
          resIdx = i
          resLen = j - i + 1
        }
      }
    }
  }
  return s.slice(resIdx, resIdx + resLen)
}

// Two pointers, avoid extra space and redundant checks
// T O(n^2), S O(1) extra space + O(n) space for output
function longestPalindromeTwoPointers(s) {
  const n = s.length
  if (n <= 1) {
    return s
  }
  let resIdx = 0
  let resLen = 0
  const expand = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      if (r - l + 1 > resLen) {
        resIdx = l
        resLen = r - l + 1
      }
      l--
      r++
    }
  }
  for (let i = 0; i < s.length - 1; i++) {
    expand(i, i)
    expand(i, i + 1)
  }
  return s.substring(resIdx, resIdx + resLen)
}
