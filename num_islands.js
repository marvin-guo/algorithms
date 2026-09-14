import Queue from "./queue.js"

// DFS Depth-first search
function numIslands(grid) {
  const directions = [
    [-1, 0], [0, -1], [0, 1], [1, 0]
  ]

  let islands = 0

  const ROWS = grid.length
  const COLS = grid[0].length

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] === '0') {
      return
    }
    grid[r][c] = '0'
    for (let [dr, dc] of directions) {
      const nr = r + dr
      const nc = c + dc
      dfs(nr, nc)
    }
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (grid[i][j] === '1') {
        islands++
        dfs(i, j)
      }
    }
  }

  return islands
}

function numIslandsBfs(grid) {
  const directions = [
    [-1, 0], [0, -1], [0, 1], [1, 0]
  ]

  let islands = 0

  const ROWS = grid.length
  const COLS = grid[0].length

  const bfs = (r, c) => {
    const q = new Queue()
    q.enqueue([r, c])
    grid[r][c] = '0'
    while (!q.isEmpty()) {
      const [row, col] = q.dequeue()
      for (const [dr, dc] of directions) {
        const nr = row + dr
        const nc = col + dc
        if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS && grid[nr][nc] === '1') {
          q.enqueue([nr, nc])
          grid[nr][nc] = '0'
        }
      }
    }
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (grid[i][j] === '1') {
        bfs(i, j)
        islands++
      }
    }
  }

  return islands
}

const grid1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "1"]
]

const grid2 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "1"]
]

console.log(numIslands(grid1))
console.log('//////////////')
console.log(numIslandsBfs(grid2))
console.log('//////////////')
