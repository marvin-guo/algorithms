// recursion T O(2^n) S O(n) 
// inefficient for big number
function climbStairs(n) {
  const dfs = (i) => {
    if (i >= n) {
      return i == n
    }
    return dfs(i + 1) + dfs(i + 2)
  }
  return dfs(0)
}

// optimized recursion O(n) & O(n)
// Dynamic Programing (Top - Down, Memoizaition)
// avoid same subproblems repeating
function climbStairsWithCache(n) {
  const cache = new Int32Array(n).fill(-1)
  const dfs = (i) => {
    if (i >= n) {
      return i == n
    } else if (cache[i] !== -1) {
      return cache[i]
    } else {
      return (cache[i] = dfs(i + 1) + dfs(i + 2)) 
    }
  }
  return dfs(0)
}

// Dynamic programming (Bottom - Up)
// O(n) & O(n)
// Fibonacci-like pattern
function climbStairsWithFibonacci(n) {
  if (n <= 2) {
    return n
  }
  // have to use n + 1 length array, otherwise no dp[n]!!!
  const dp = new Int32Array(n + 1).fill(0)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

const MOD = 1e9 + 7

// T O(logN) S O(1)
// climb stairs is F(n+1), not F(n)
// matrix exponentiation
function nthFibonacci(n) {
  // base case
  if (n < 2) {
    return 1
  }
  const M = [
    [1, 1],
    [1, 0]
  ]

  // F(0) = 0, F(1) = 1
  const F = [
    [1, 0],
    [0, 0]
  ]

  // multiply matrix M (n - 1) times
  const res = power(M, n - 1)

  // multiply Resultant with Matrix F
  multiply(res, F) // not necessary
  return res[0][0] % MOD
}

function power(M, expo) {
  // ans * M = M, like 1*x = x, won't change M values
  const ans = [
    [1, 0],
    [0, 1]
  ]
  while (expo) {
    if (expo & 1) {
      multiply(ans, M)
    }
    multiply(M, M)
    expo >>= 1
  }
  return ans
}

function multiply(A, B) {
  const C = [
    [0, 0],
    [0, 0]
  ]
  C[0][0] = (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD
  C[0][1] = (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD
  C[1][0] = (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD
  C[1][1] = (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD

  // copy result back to first matrix
  A[0][0] = C[0][0]
  A[0][1] = C[0][1]
  A[1][0] = C[1][0]
  A[1][1] = C[1][1]
}
