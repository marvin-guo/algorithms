// Use TrieNode own as basic TrieNode and has addWord method as well (instead of TrieNode + PrefixTree class)
class TrieNode {
  constructor() {
    // use object here to use char as key instead of charCode index
    this.children = {}
    this.word = false
  }

  addWord(word) {
    // start with self node as root when insert a word
    let cur = this
    for (const c of word) {
      if (!(c in cur.children)) {
        cur.children[c] = new TrieNode()
      }
      cur = cur.children[c]
    }
    cur.word = true
  }
}

// T O(m * n * 4 * 3 ^ <t-1> + s)
// S O(s)
// comparing with backtracking exist check for each word T: O(w * m * n * 4 * 3 ^ <t - 1>) S: O(t)
/**
 * w: number of words (* can ignore in trie data structure)
 * m: number of rows, n: number of columns
 * t: maximum length of any word
 * s: sum of the lengths of all the words
 */
function SearchWordTrie(board, words) {
  const root = new TrieNode()
  for (const word of words) {
    root.addWord(word)
  }

  const rows = board.length
  const cols = board[0].length
  const result = new Set()
  const visited = new Set()

  const dfs = (r, c, node, wordSoFar) => {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      visited.has(`${r},${c}`) ||
      !(board[r][c] in node.children)
    ) {
      return
    }
    wordSoFar += board[r][c]
    node = node.children[board[r][c]]
    visited.add(`${r},${c}`)
    if (node.word) {
      result.add(wordSoFar)
    }
    dfs(r + 1, c, node, wordSoFar)
    dfs(r - 1, c, node, wordSoFar)
    dfs(r, c + 1, node, wordSoFar)
    dfs(r, c - 1, node, wordSoFar)
    visited.delete(`${r},${c}`)
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, root, '')
    }
  }

  return Array.from(result)
}
