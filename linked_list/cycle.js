// hashset T O(n) S O(n)
function hasCycle(head) {
  const seen = new Set()
  let cur = head
  while (cur !== null) {
    if (seen.has(cur)) {
      return true
    }
    seen.add(cur)
    cur = cur.next
  }
  return false
}

// fast & slow pointers
// T O(n) S O(1)
function hasCycleWithTwoPointers(head) {
  if (!head) {
    return false
  }
  let slow = head
  let fast = head
  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}
