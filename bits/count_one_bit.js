// Bit Mask I, shift left
function hammingWeight1(n) {
  let res = 0
  for (let i = 0; i < 32; i++) {
    if ((1 << i) & n) {
      res++
    }
  }
  return res
}

// Bit Mask II, shift right
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
