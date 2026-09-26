class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head)
  let left = dummy
  let right = head
  let move = n
  while (move > 0) {
    right = right.next
    move--
  }
  while (right !== null) {
    left = left.next
    right = right.next
  }
  left.next = left.next.next
  return dummy.next
}
