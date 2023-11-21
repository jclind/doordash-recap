export const concatString = (inputString: string, n: number): string => {
  if (inputString.length > n) {
    return inputString.slice(0, n - 2).trim() + '...'
  } else {
    return inputString
  }
}
