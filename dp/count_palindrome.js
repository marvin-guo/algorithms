// two pointers
function countPalindrome(s) {
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
