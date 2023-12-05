const getLongestWordInString = (str: string): number => {
  const words = str.split(' ')

  let maxLength = 0

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
