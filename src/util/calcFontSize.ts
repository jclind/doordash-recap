const getLongestWordInString = (str: string): number => {
  // Split the string into an array of words
  const words = str.split(' ')

  // Initialize a variable to store the length of the longest word
  let maxLength = 0

  // Iterate through each word and update maxLength if a longer word is found
  for (const word of words) {
    const length = word.length
    maxLength = Math.max(maxLength, length)
  }

  return maxLength
}

export const calcFontSize = (str: string) => {
  const longestWordLength = getLongestWordInString(str)
  if (longestWordLength <= 8) return '4rem'
  if (longestWordLength <= 9) return '3rem'
  if (longestWordLength <= 12) return '2.5rem'

  return '4rem'
}
