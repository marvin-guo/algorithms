class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null)
    this.endOfWord = false
  }
}

// constraints:
// 1 <= word.length, prefix.length <= 1000
// word and prefix are made up of lowercase English letters.

// T O(n) for each function call, S O(t)
// n is the length of string, t is the toal number of TrieNodes created in the Trie
class PrefixTree {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let cur = this.root
    for (let char of word) {
      const i = char.charCodeAt(0) - 97
      if (cur.children[i] === null) {
        cur.children[i] = new TrieNode()
      }
      cur = cur.children[i]
    }
    cur.endOfWord = true
  }

  search(word) {
    let cur = this.root
    for (let char of word) {
      const i = char.charCodeAt(0) - 97
      if (cur.children[i] === null) {
        return false
      }
      cur = cur.children[i]
    }
    return cur.endOfWord
  }

  startsWith(prefix) {
    let cur = this.root
    for (let char of prefix) {
      const i = char.charCodeAt(0) - 97
      if (cur.children[i] === null) {
        return false
      }
      cur = cur.children[i]
    }
    return true
  }
}
