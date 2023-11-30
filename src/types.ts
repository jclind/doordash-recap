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

export type DayArr = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export type DeliveriesPerDay = {
  [key in DayArr]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}

export type HourSegments =
  | '0-3'
  | '3-6'
  | '6-9'
  | '9-12'
  | '12-15'
  | '15-18'
  | '18-21'
  | '21-0'

export type TimeSegments = {
  [key in HourSegments]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}
export type Months =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec'
export type DeliveriesEachMonth = {
  [key in Months]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}

export type Trends = {
  deliveriesPerDay: DeliveriesPerDay
  timeSegments: TimeSegments
  deliveriesEachMonth: DeliveriesEachMonth
}

export type RewindData =
  | {
      numOrders: number
    } & StoreData &
      DeliveryTimes &
      ItemData &
      Trends

export type CopyLinkStatus = 'default' | 'loading' | 'copied'
