import { RewindData } from '../types'

const simpleHash = (input: string): string => {
  let hash = 0

  if (input.length === 0) return hash.toString()

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash &= hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}

export const generateIdFromRecapData = (data: RewindData) => {
  const {
    numOrders,
    totalItemsDelivered,
    totalDeliveryTimeMS,
    topIndividualStores,
  } = data
  const numStores = topIndividualStores.length

  const hashedID =
    simpleHash(numOrders.toString()) +
    simpleHash(totalItemsDelivered.toString()) +
    simpleHash(totalDeliveryTimeMS.toString()) +
    simpleHash(numStores.toString())
  return hashedID
}
