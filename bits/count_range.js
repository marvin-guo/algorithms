// n = 1 [0, 1]
// n = 2 [0, 1, 1]
// n = 4 [0, 1, 1, 2, 1]
// n = 8 [0, 1, 1, 2, 1, 2, 2, 3, 1]
// n = 16 [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1]

// O(N) & (O(1) + O(n))
function countBitsDp(n) {
  const dp = new Array(n + 1).fill(0)
  let offset = 1
  for (let i = 1; i <= n; i++) {
    if (offset * 2 == i) {
      offset = i
    }
    // if (offset === i // i is 2^m), dp[i] = 1
    dp[i] = 1 + dp[i - offset]
  }
  return dp
}

// O(NlogN) & (O(1) + O(n))
function countBits(n) {
  let res = new Array(n + 1).fill(0)
  for (let num = 0; num <= n; num++) {
    let cnt = 0
    let n = num
    while (n !== 0) {
      n &= n - 1
      cnt++
    }
    res[num] = cnt
  }
  return res
}
