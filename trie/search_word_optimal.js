function getIndex(c) {
  return c.charCodeAt(0) - 'a'.charCodeAt(0)
}

// Use TrieNode own as basic TrieNode and has addWord method as well (instead of TrieNode + PrefixTree class)
class TrieNode {
  constructor() {
    this.children = Array(26).fill(null)
    this.idx = -1
    this.refs = 0
  }

  addWord(word, i) {
    // start with self node as root when insert a word
    let cur = this
    cur.refs++
    for (const c of word) {
      const index = getIndex(c)
      if (cur.children[index] === null) {
        cur.children[index] = new TrieNode()
      }
      cur = cur.children[index]
      cur.refs++
    }
    cur.idx = i
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
  for (let i = 0; i < words.length; i++) {
    root.addWord(words[i], i)
  }

  const rows = board.length
  const cols = board[0].length
  const result = []

  const dfs = (r, c, node) => {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      board[r][c] === '*' ||
      node.children[getIndex(board[r][c])] === null
    ) {
      return 0
    }
    const temp = board[r][c]
    board[r][c] = '*'
    let prev = node
    node = node.children[getIndex(temp)]
    let found = 0
    if (node.idx !== -1) {
      result.push(words[node.idx])
      node.idx = -1
      found++
    }

    found += dfs(r + 1, c, node)
    found += dfs(r - 1, c, node)
    found += dfs(r, c + 1, node)
    found += dfs(r, c - 1, node)

    board[r][c] = temp
    node.refs -= found
    if (node.refs === 0) {
      prev.children[getIndex(temp)] = null
    }
    return found
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      root.refs -= dfs(i, j, root)
    }
  }

  return Array.from(result)
}
