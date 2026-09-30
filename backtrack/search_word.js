// backtracking, 2D-array
// only check exist, so no extra space required, update value in space then revert
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