// Disjoint Set Union (DSU Union-Find)
class DSU {
  constructor(n) {
    this.comps = n
    this.Parent = Array.from({ length: n + 1 }, (_, i) => i)
    this.Size = Array(n + 1).fill(1)
  }

  // locating the leader
  find(node) {
    if (this.Parent[node] !== node) {
      // optimize future lookups to O(1)
      this.Parent[node] = this.find(this.Parent[node]) // path compression
    }
    return this.Parent[node]
  }

  union(u, v) {
    let pu = this.find(u)
    let pv = this.find(v)
    if (pu === pv) return false // handle cycle check safely, no merge
    if (this.Size[pu] < this.Size[pv]) {
      [pu, pv] = [pv, pu] // swap to ensure pu is the larger group
    }
    this.comps--
    this.Size[pu] += this.Size[pv]
    this.Parent[pv] = pu // keep the tree balanced
    return true
  }

  components() {
    return this.comps
  }
}

export default DSU
