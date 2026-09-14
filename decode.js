// input: 3[abc]4[ab]c
// output: abcabcabcababababc
// input: 2[3[a]b]
// output: aaabaaab

// solution: stack
// 1. count prepend number and prev string in same level/scope, push to stack
// 2. when pop, connect strings in same level
// 3. for siblings, stack will insert and pop, repeat
// 4. for nested, stack will insert multiple, then pop multiple

/**
 * iterative: inside-out (stack)
 **/
function decodeString(s) {
  // SECURITY LIMITS (Adjust based on system constraints)
  const MAX_NESTING_DEPTH = 50; 
  const MAX_MULTIPLIER = 10000;
  const MAX_OUTPUT_LENGTH = 5 * 1024 * 1024; // 5 MB / 5 Million characters

  let stack = []
  // let currentString = ''
  let currentBuffer = []
  let currentNum = 0
  let estimatedTotalLength = 0

  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + Number(char)

      // SECURITY CHECK 1: Prevent integer overflow / absurdly high multipliers
      if (currentNum > MAX_MULTIPLIER) {
        throw new RangeError(`Security Exception: Multiplier exceeds maximum limit of ${MAX_MULTIPLIER}`)
      }
    } else if (char === '[') {
      // if no number then count as 1, include below line; otherwise, comment it out;
      const num = currentNum === 0 && s[i - 1] !== '0' ? 1 : currentNum
      stack.push({ prevBuffer: currentBuffer, num })

      // SECURITY CHECK 2: Prevent malicious deeply nested "Zip Bomb" style strings
      if (stack.length > MAX_NESTING_DEPTH) {
        throw new RangeError(`Security Exception: Nesting depth exceeds maximum limit of ${MAX_NESTING_DEPTH}`)
      }

      currentBuffer = []
      currentNum = 0
    } else if (char === ']') {
      if (stack.length === 0) {
        throw new SyntaxError("Malformed Input: Unmatched closing bracket")
      }

      let { prevBuffer, num } = stack.pop()
      // SECURITY CHECK 3: Proactively check output size before executing allocation loop
      let addedLength = currentBuffer.length * num
      estimatedTotalLength += addedLength
      if (estimatedTotalLength > MAX_OUTPUT_LENGTH) {
          throw new RangeError("Security Exception: Output string exceeds maximum safe memory budget")
      }

      let repeated = [];
      for (let r = 0; r < num; r++) {
        repeated.push(...currentBuffer)
      }

      // currentString = prevString + currentString.repeat(num)
      prevBuffer.push(...repeated)
      currentBuffer = prevBuffer
    } else {
      // currentString += char
      currentBuffer.push(char)
      estimatedTotalLength++
    }
  }

  if (stack.length > 0) {
    throw new SyntaxError("Malformed Input: Missing closing bracket")
  }

  // return currentString
  return currentBuffer.join('')
}

const input1 = '3[abc]4[ab]c'
const input2 = '2[3[a]b]'

console.log(decodeString(input1))
console.log(decodeString(input2))
console.log(decodeString('a[]b'))
console.log(decodeString('0[abc]'))
console.log(decodeString('dd[abc]'))
// console.log(decodeString('99999[99999[99999[a]]]'))
// console.log(decodeString('0[abc'))
// console.log(decodeString('ddabc]'))

// recursion
/**
 * Outside-in, using depth-first search
 * ']' never return in parent function, but always in child function
 * if only one level, then no ']' check in main function
 */
function decodeWithIndex(s, index = 0) {
  let result = ''
  let num = ''

  while (index < s.length) {
    let char = s[index]

    if (char >= '0' && char <= '9') {
      num = num * 10 + Number(char)
      index++
    } else if (char === '[') {
      let [subResult, nextIndex] = decodeWithIndex(s, index + 1)
      result += subResult.repeat(num)
      num = 0
      index = nextIndex
    } else if (char === ']') {
      return [result, index + 1]
    } else {
      result += char
      index++
    }
  }
  return result
}

console.log(decodeWithIndex(input1))
console.log(decodeWithIndex(input2))

// idiomatic, but less performant (O(N2)) in worst-case due to string re-allocations on each .replace
function decodeWithRegex(s) {
  const pattern = /(\d+)\[([a-zA-Z]*)\]/
  while (pattern.test(s)) {
    s = s.replace(pattern, (_, num, matchStr) => matchStr.repeat(Number(num)))
  }
  return s
}

console.log(decodeWithRegex(input1))
console.log(decodeWithRegex(input2))
