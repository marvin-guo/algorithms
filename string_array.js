function customSplit(str, delimiter = '') {
  const result = []
  let curIndex = 0
  let delimLength = delimiter.length
  if (delimLength === 0) {
    return [...str]
  }

  while (true) {
    const nextMatchIndex = str.indexOf(delimiter, curIndex)
    if (nextMatchIndex < 0) {
      result.push(str.slice(curIndex))
      break
    }
    result.push(str.slice(curIndex, nextMatchIndex))
    curIndex = nextMatchIndex + delimLength
  }
  return result
}

console.log(customSplit('abcabc2323abc', 'a'))

// () [] {}
function validParentheses(str) {
  const obj = { '}': '{', ']': '[', ')': '(' }
  const leftKeys = ['{', '[', '(']
  const stack = []
  for (const char of str) {
    if (leftKeys.includes(char)) {
      stack.push(char)
    } else if (stack.length === 0 || obj[char] !== stack.pop()) {
      return false
    }
  }
  return stack.length === 0
}

console.log(validParentheses('[{}()]'))
console.log(validParentheses('[]'))
console.log(validParentheses('[{(())]'))
console.log(validParentheses('[{}(]]'))
console.log(validParentheses('{}()]'))
console.log('validParentheses............')

// 3. String Anagram Checker
// The Challenge: 
// Write a function to check if two strings are anagrams of 
// each other (contain the exact same characters in a different order). 
// Optimize it for time complexity.
// Why it matters: 
// Tests your grasp of HashMaps / Dictionaries or sorting efficiency (O(N) vs. \(O(N \log N)\)).
function anagramChecker(str1, str2) {
  if (str1?.length !== str2?.length) {
    return false
  }
  const count = {}
  for (const c1 of str1) {
    count[c1] = (count[c1] || 0) + 1
  }
  for (const c2 of str2) {
    if (!count[c2] || count[c2] < 0) {
      return false
    }
    count[c2]--
  }
  return true
  // return Object.values(count).every(c => c === 0)
  // no need to check each value, compare strs length already did the trick
}

console.log(anagramChecker('abcdkk', 'kabdck'))
console.log(anagramChecker('abcdkk', 'kkabdck'))
console.log(anagramChecker('kabcdkkkkkk', 'kabdckaaaaa'))
console.log(anagramChecker('', 'kabcdkk'))
console.log(anagramChecker('kabcdkk', ''))
console.log('anagramChecker............')

// 4. Remove Duplicates from an Array
// The Challenge: Given an array of integers, 
// remove all duplicate elements so that each element appears only once. 
// Try doing it both by using extra space (like a Set) and in-place.
// Why it matters: Tests your manipulation of memory and knowledge of standard collection types.
function removeDuplicatesWithSet(arr) {
  if (!arr?.length) {
    return []
  }
  const newArr = new Set(arr)
  return [...newArr]
}

// sorted array
function removeDuplicatesInPlace(nums = []) {
  if (nums.length === 0) {
    return []
  }
  let writeIndex = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i]
      writeIndex++
    }
  }
  nums.length = writeIndex
  return nums
}

console.log(removeDuplicatesWithSet([1, 2, 29, 29, 2, 39, 1]))
console.log('removeDuplicatesWithSet............')
console.log(removeDuplicatesInPlace([1, 2, 29, 29, 39, 39, 49]))
console.log('removeDuplicatesInPlace............')

// 5. String Compression
// The Challenge: Implement a method to perform basic 
// string compression using the counts of repeated characters. 
// For example, the string "aabcccccaaa" would become "a2b1c5a3". 
// If the compressed string is not smaller than the original, return the original.
// Why it matters: Tests your ability to manage loops, edge cases, 
// and building strings efficiently.

function stringCompression(str) {
  if (!str?.length) {
    return ''
  }
  const result = [str[0]]
  let count = 1
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      result.push(count)
      result.push(str[i])
      count = 1
    } else {
      count++
    }
  }
  result.push(count)
  if (result.length >= str.length) {
    return str
  }
  return result.join('')
}

console.log(stringCompression('aabcccccaaa'))
console.log(stringCompression('abcdefghijklmn'))
console.log(stringCompression('aabsfsffffcccccaaa'))
console.log(stringCompression('aabccfasdfasdafdadfcccaaa'))
console.log('stringCompression.............')

// Would you like the solution 
// and code breakdown for one of these specific problems, 
// or should we practice behavioral questions next?

function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complementary = target - nums[i]
    if (map.has(complementary)) {
      return [map.get(complementary), i]
    }
    map.set(nums[i], i)
  }
  return []
}

function moveZeros(nums) {
  let lastNonZeroFoundAt = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonZeroFoundAt] = nums[i]
      lastNonZeroFoundAt++
    }
  }
  for (let i = lastNonZeroFoundAt; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
}

function firstUniqueChar(s) {
  const count = {}
  for (const char of s) {
    count[char] = (count[char] || 0) + 1
  }
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) {
      return i
    }
  }
  return -1
}

function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  let left = 0
  let right = cleaned.length - 1
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false
    }
    left++
    right--
  }
  return true
}

function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ')
}

console.log(reverseWords('abc nihao  haha lelele '))

function flattenTasks(tasks) {
  let result = []
  for (const item of tasks) {
    if (Array.isArray(item)) {
      result = result.concat(flattenTasks(item))
    } else {
      result.push(item)
    }
  }
  return result
}

console.log(flattenTasks([1, 2, [4, 6, [8, 9]], [23, 223, [2, 33]]]))
