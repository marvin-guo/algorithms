// two pointers
function countPalindromeTwoPointers(s) {
  const n = s.length
  if (n <= 1) {
    return n
  }
  let resCnt = 0
  const expand = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      resCnt++
      l--
      r++
    }
  }
  for (let i = 0; i < n; i++) {
    expand(i, i)
    expand(i, i + 1)
  }
  return resCnt
}

// T O(n^2) S O(n^2)
function countPalindromeDp(s) {
  let resCnt = 0
  const n = s.length
  const dp = Array.from({ length: n }, () => Array(n).fill(false))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        resCnt++
      }
    }
  }
  return resCnt
}
