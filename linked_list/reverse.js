class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

// better space complexity
// iteration T O(n), S O(1)
function reverseList(head) {
  let cur = head
  let pre = null
  while (cur !== null) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

// recursion T O(n), S O(n)
function reverseListRecursion(head) {
  if (!head) {
    return null
  }
  let newHead = head
  if (head.next) {
    newHead = reverseListRecursion(head.next)
    head.next.next = head
  }
  head.next = null
  return newHead
}
