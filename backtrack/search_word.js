// Backtracking 
//    - Exploring all possible paths by making choices, recursing, and undoing choices to try alternatives
// Depth-First Search (DFS) 
//    - Traversing a graph or grid by exploring as far as possible along each branch before backtracking
// 2D Grid Traversal 
//    - Moving through a matrix in four directions while tracking visited cells to avoid revisiting
// Recursion 
//    - Understanding recursive function calls and base cases for termination

// backtracking, 2D-array
// only check exist, so no extra space required, update value in space then revert

// T O(m * 4^n) & S O(n) 
// Task 1: write solution, Task 2: Estimate Time and Space complexity 
// m is number of cells of board, n is the length or word 
function exist(board, word) {
  const rows = board.length
  const cols = board[0].length

  const backtrack = (r, c, index) => {
    if (index === word.length) {
      return true
    }
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) {
      return false
    }
    const temp = board[r][c]
    board[r][c] = '#'
    const found = backtrack(r, c + 1, index + 1)
      || backtrack(r, c - 1, index + 1)
      || backtrack(r + 1, c, index + 1)
      || backtrack(r - 1, c, index + 1)
    board[r][c] = temp
    return found
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const found = backtrack(i, j, 0)
      if (found) {
        return true
      }
    }
  }
  return false
}
