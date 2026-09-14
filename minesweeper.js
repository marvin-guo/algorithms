// update board by one click
/**
 * Update board
 * original board is M / E, change it to X / B / 1 - 8 and may keep M / E
 * if click M then change it to X and game over
 * if click an Empty E, that has at least one mine next to it, change it to the count
 * if click an Empty E, that has zero mines next to it, change it to B, 
 *    then recursively click all 8 of its neighbors automatically to reveal the map
 */

function updateBoard(board, click) {
  const [row, col] = click

  if (board[row][col] === 'M') {
    board[row][col] = 'X'
    return board
  }

  const ROWS = board.length
  const COLS = board[0].length

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ]

  function dfs(r, c) {
    // boundary check & verify if the square is an unrevealed Empty square
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS || board[r][c] !== 'E') {
      return
    }

    let mineCount = 0

    for (let [dr, dc] of directions) {
      let nr = r + dr
      let nc = c + dc
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === 'M') {
        mineCount++
      }
    }

    if (mineCount > 0) {
      // it touches a mine, show the count and stop expanding
      board[r][c] = mineCount.toString()
    } else {
      // completely safe, label it 'B' and plunge into all 8 neighbors
      board[r][c] = 'B'
      for (let [dr, dc] of directions) {
        dfs(r + dr, c + dc)
      }
    }
  }

  // trigger dfs traversal starting at the user's click point
  dfs(row, col)
  return board
}

let gameBoard = [
  ['E', 'E', 'E', 'E'],
  ['E', 'M', 'E', 'M'], // There is a mine at [1, 1], [1, 3]
  ['E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E']  // Click happens at [3, 0]
]

console.log(updateBoard(gameBoard, [3, 0]))

// expected output
let output = [
  ['E', 'E', 'E', 'E'],
  ['E', 'M', 'E', 'M'],
  ['1', '1', '2', '1'],
  ['B', 'B', 'B', 'B']
]

class MinesweeperBoard {
  constructor(rows, cols, numMines) {
    // Validation check for impossible configurations
    if (numMines > rows * cols) {
      throw new RangeError("Requested number of mines exceeds total available grid squares.")
    }

    this.rows = rows
    this.cols = cols
    this.numMines = numMines

    // Initialize an empty 2D grid filled with 0s
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0))

    // Construct the field
    this.placeMines()
    this.calculateNeighborCounts()
  }

  /**
   * Places mines cleanly. If mine density is high (> 50%), 
   * it assumes the whole board is mined and removes empty cells instead.
   */
  placeMines() {
    const totalCells = this.rows * this.cols
    const highDensity = this.numMines > totalCells / 2

    // Target items to place (either Mines or Empty slots)
    let targetCount = highDensity ? (totalCells - this.numMines) : this.numMines

    // If high density, pre-fill everything with mines (9)
    if (highDensity) {
      for (let r = 0; r < this.rows; r++) {
        this.grid[r].fill(9)
      }
    }

    let placed = 0
    while (placed < targetCount) {
      let randomRow = Math.floor(Math.random() * this.rows)
      let randomCol = Math.floor(Math.random() * this.cols)

      if (!highDensity && this.grid[randomRow][randomCol] !== 9) {
        // Place a mine
        this.grid[randomRow][randomCol] = 9
        placed++
      } else if (highDensity && this.grid[randomRow][randomCol] === 9) {
        // Clear a mine to create an empty cell
        this.grid[randomRow][randomCol] = 0
        placed++
      }
    }
  }

  /**
   * Iterates through the board and pre-calculates the 0-8 counts 
   * using a clean, compact nested loop instead of messy if-statements.
   */
  calculateNeighborCounts() {
    // Offset directions to smoothly inspect all 8 neighbors
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ]

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // Skip if this cell is a mine
        if (this.grid[r][c] === 9) continue

        let mineCount = 0

        // Use a short loop to scan surrounding cells
        for (let [dr, dc] of directions) {
          let nr = r + dr
          let nc = c + dc

          // Out-of-bounds safety check
          if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
            if (this.grid[nr][nc] === 9) {
              mineCount++
            }
          }
        }
        this.grid[r][c] = mineCount
      }
    }
  }

  // Helper utility to inspect our generated board in the console
  printBoard() {
    console.log(this.grid.map(row => row.join(' ')).join('\n'))
  }
}

// --- Verification Run ---
const board = new MinesweeperBoard(4, 5, 3)
board.printBoard()
