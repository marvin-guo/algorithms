// Bit Mask I, shift left O(1)&O(1)
function hammingWeight1(n) {
  let res = 0
  for (let i = 0; i < 32; i++) {
    if ((1 << i) & n) {
      res++
    }
  }
  return res
}

// Bit Mask II, shift right O(1)&O(1)
function hammingWeight2(n) {
  let res = 0
  let cur = n
  while (cur > 0) {
    if (cur & 1) {
      res++
    }
    cur >>= 1
  }
  return res
}

// Bit Mask III, optimal, remove one '1' bit from n every time, not check '0' bit at all
function hammingWeight3(n) {
  let res = 0
  while (n !== 0) {
    // remove one rightmost '1' bit exactly
    n &= n - 1
    res++
  }
  return res
}
