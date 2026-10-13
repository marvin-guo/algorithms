// brute force, backtracking 
// T: O(m * n * 4 ^ <m * n>), S: O(m * n) 
function pacificAtlantic(heights) {
  const rows = heights.length
  const cols = heights[0].length

  const directions = [
    [-1, 0], [0, -1], [0, 1], [1, 0]
  ]

  let pacific = false
  let atlantic = false

  const dfs = (r, c, prevVal) => {
    if (r < 0 || c < 0) {
      pacific = true
      return
    }
    if (r >= rows || c >= cols) {
      atlantic = true
      return
    }
    if (heights[r][c] > prevVal) {
      return
    }

    let tmp = heights[r][c]
    heights[r][c] = Infinity
    for (let [dx, dy] of directions) {
      dfs(r + dx, c + dy, tmp)
      if (pacific && atlantic) {
        break
      }
    }
    heights[r][c] = tmp
  }

  const res = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pacific = false
      atlantic = false
      dfs(r, c, Infinity)
      if (pacific && atlantic) {
        res.push([r, c])
      }
    }
  }

  return res
}

// dfs, reverse: start from pacific borders and atlantic borders climb hills to find all reachable cells
// find duplicates in 2 sets
// T O(m * n), S O(m * n)
function pacificAtlanticDfs(heights) {
  const rows = heights.length
  const cols = heights[0].length

  const directions = [
    [-1, 0], [0, -1], [0, 1], [1, 0]
  ]

  // or make pac and atl same 2D array fill with false initially
  // const pac = Array.from({ length: rows }, () => Array(cols).fill(false))
  const pac = new Set()
  const atl = new Set()

  const dfs = (r, c, set) => {
    set.add(`${r},${c}`)
    for (let [dr, dc] of directions) {
      const nr = r + dr
      const nc = r + dc
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        !set.has(`${nr},${nc}`) &&
        heights[nr][nc] >= heights[r][c]
      ) {
        dfs(nr, nc, set)
      }
    }
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j, pac)
    dfs(rows - 1, j, atl)
  }

  for (let i = 0; i < rows; i++) {
    dfs(i, 0, pac)
    dfs(i, cols - 1, atl)
  }

  return [...pac]
    .filter(x => atl.has(x))
    .map(x => x.split(','))
}
