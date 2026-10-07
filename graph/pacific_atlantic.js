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
