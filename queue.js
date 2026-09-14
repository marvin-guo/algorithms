class Queue {
  constructor() {
    this.items = {}
    this.head = 0
    this.tail = 0
  }

  enqueue(item) {
    this.items[this.tail] = item
    this.tail++
  }

  dequeue() {
    if (!this.isEmpty()) {
      const item = this.items[this.head]
      delete this.items[this.head]
      this.head++
      return item
    }
    return null
  }

  isEmpty() {
    return this.tail === this.head
  }

  size() {
    return this.tail - this.head
  }
}

export default Queue
