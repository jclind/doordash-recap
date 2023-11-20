import parsedStoreNames from '../assets/data/parsedStoreNames'

export const parseStoreName = (str: string) => {
  const chainStoreREGEX = /\s*\(.*?\)\s*|\s*\d+\s*-\s*|\s*-\s*\d+\s*/g

  const matchedStoreName = findStoreMatch(str)
  if (matchedStoreName) return matchedStoreName

  return str.replace(chainStoreREGEX, '').trim()
}

const findStoreMatch = (str: string) => {
  const strToLower = str.toLowerCase()
  return parsedStoreNames.find(name => strToLower.includes(name.toLowerCase()))
}
