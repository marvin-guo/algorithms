// 'for await ... of' loop is designed to iterate over asynchronous iterables
// streams od data that arrive over time, like readable streams of data yielded by an 'async function*' generator

// Example: Iterating over an async generator
async function* streamNumbers() {
  yield new Promise(resolve => setTimeout(() => resolve(1), 1000))
  yield new Promise(resolve => setTimeout(() => resolve(2), 1000))
  yield new Promise(resolve => setTimeout(() => resolve(3), 1000))
}

async function run() {
  // It pauses and waits for each chunk of data to arrive sequentially
  for await (const num of streamNumbers()) {
    console.log(num) // Logs 1, then 2, then 3 (with a 1-second delay between each)
  }
}

run()
