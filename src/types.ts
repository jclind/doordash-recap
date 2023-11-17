export interface DoorDashOrderType {
  ACTUAL_DELIVERY_TIME: string
  ACTUAL_PICKUP_TIME: string
  ORDER_CREATED_TIME: string
  ORDER_STATUS: string
  STORE_NAME: string
  SUBTOTAL_IN_CENTS: number
  TOTAL_ITEM_COUNT: number
}

export type StoreData = {
  numIndividualStores: number
  numChainStores: number
  topIndividualStores: StoreNames[]
  topChainStores: StoreNames[]
}
export type StoreNames = { store: string; totalTimesDelivered: number }

export type DeliveryTimes = {
  totalDeliveryTimeMS: number
  avgDeliveryTimeMS: number
  avgDeliveryTimePerDayMS: number
  avgDeliveryTimePerWeekMS: number
  avgDeliveryTimePerMonthMS: number
  shortestDelivery: DoorDashOrderType | null
  longestDelivery: DoorDashOrderType | null
}

export type ItemData = {
  totalItemsDelivered: number
  avgNumItemsPerDelivery: number
  deliveryWithMostItems: DoorDashOrderType
}

export type RewindData =
  | {
      numOrders: number
    } & StoreData &
      DeliveryTimes &
      ItemData
