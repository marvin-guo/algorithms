class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null)
    this.word = false
  }
}

class PrefixTree {
  constructor() {
    this.root = new TrieNode()
  }

  getCharIndex(c) {
    return c.charCodeAt(0) - 97
  }

  insert(word) {
    let cur = this.root
    for (let char of word) {
      const i = this.getCharIndex(char)
      if (cur.children[i] === null) {
        cur.children[i] = new TrieNode()
      }
      cur = cur.children[i]
    }
    cur.word = true
  }

  search(word) {
    return this.dfs(word, 0, this.root)
  }

  dfs(word, j, root) {
    let cur = root
    for (let i = j; i < word.length; i++) {
      const c = word[i]
      if (c === '.') {
        for (const child of cur.children) {
          if (child !== null && this.dfs(word, i + 1, child)) {
            return true
          }
        }
        return false
      } else {
        const idx = this.getCharIndex(c)
        if (cur.children[idx] === null) {
          return false
        }
        cur = cur.children[idx]
      }
    }
    return cur.word
  }
}
