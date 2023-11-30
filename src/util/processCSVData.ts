import {
  DeliveryTimes,
  DoorDashOrderType,
  ItemData,
  RewindData,
  StoreData,
  StoreNames,
} from '../types'
import { getDataTrends } from './dataTrends'
import { parseStoreName } from './parseStoreName'

export const processCSVData = (
  orderHistory: DoorDashOrderType[]
): RewindData => {
  const currYearOrderHistory = getOrdersThisYear(orderHistory)

  const numOrders = currYearOrderHistory.length
  const storeData = getNumUniqueAndTotalStores(currYearOrderHistory)
  const deliveryTimes = getTimesPerDelivery(currYearOrderHistory)
  const itemsData = getItemsData(currYearOrderHistory, numOrders)

  const trends = getDataTrends(currYearOrderHistory)

  return { numOrders, ...storeData, ...deliveryTimes, ...itemsData, ...trends }
}

const getOrdersThisYear = (orderHistory: DoorDashOrderType[]) => {
  const currentDate = new Date()

  // Filter orders for the current year using an arrow function
  const ordersThisYear = orderHistory.filter(
    order =>
      new Date(order.ORDER_CREATED_TIME).getFullYear() ===
      currentDate.getFullYear()
  )

  return ordersThisYear
}

// \s*\(.*?\)\s*: Removes content within parentheses.
// \s*\d+\s*-\s*: Removes a number followed by a dash.
// \s*-\s*\d+\s*: Removes a dash followed by a number.
// const chainStoreREGEX = /\s*\(.*?\)\s*|\s*\d+\s*-\s*|\s*-\s*\d+\s*/g

const getNumUniqueAndTotalStores = (
  currYearOrderHistory: DoorDashOrderType[]
): StoreData => {
  const individualStores: StoreNames[] = []
  const chainStores: StoreNames[] = []

  currYearOrderHistory.forEach(order => {
    const index = individualStores.findIndex(
      item => item.store === order.STORE_NAME
    )

    if (index !== -1) {
      individualStores[index].totalTimesDelivered++
    } else {
      individualStores.push({
        store: order.STORE_NAME,
        totalTimesDelivered: 1,
      })
    }

    // // !NEED TO WORK ON STRING FILTERING
    // let modifiedName = 'string'
    // if (order.STORE_NAME.includes('7-Eleven')) {
    //   modifiedName = '7-Eleven'
    // } else {
    //   modifiedName = order.STORE_NAME.replace(chainStoreREGEX, '')
    // }
    const modifiedName = parseStoreName(order.STORE_NAME)
    const modifiedIndex = chainStores.findIndex(
      item => item.store === modifiedName
    )

    if (modifiedIndex !== -1) {
      chainStores[modifiedIndex].totalTimesDelivered++
    } else {
      chainStores.push({ store: modifiedName, totalTimesDelivered: 1 })
    }
  })

  const individualStoresSorted = individualStores.sort(
    (a, b) => b.totalTimesDelivered - a.totalTimesDelivered
  )
  const chainStoresSorted = chainStores.sort(
    (a, b) => b.totalTimesDelivered - a.totalTimesDelivered
  )

  return {
    topIndividualStores: individualStoresSorted,
    topChainStores: chainStoresSorted,
    numIndividualStores: individualStores.length,
    numChainStores: chainStores.length,
  }
}

const getTimesPerDelivery = (
  orderHistory: DoorDashOrderType[]
): DeliveryTimes => {
  let totalDeliveryTimeMS = 0
  let shortestDelivery: DoorDashOrderType | null = null
  let longestDelivery: DoorDashOrderType | null = null

  orderHistory.forEach(order => {
    const pickupTime = new Date(order.ACTUAL_PICKUP_TIME).getTime()
    const deliveryTime = new Date(order.ACTUAL_DELIVERY_TIME).getTime()
    const deliveryDuration = deliveryTime - pickupTime

    totalDeliveryTimeMS += deliveryDuration

    if (
      shortestDelivery === null ||
      deliveryDuration <
        (shortestDelivery
          ? new Date(shortestDelivery.ACTUAL_DELIVERY_TIME).getTime() -
            new Date(shortestDelivery.ACTUAL_PICKUP_TIME).getTime()
          : Infinity)
    ) {
      shortestDelivery = order
    }

    if (
      longestDelivery === null ||
      deliveryDuration >
        (longestDelivery
          ? new Date(longestDelivery.ACTUAL_DELIVERY_TIME).getTime() -
            new Date(longestDelivery.ACTUAL_PICKUP_TIME).getTime()
          : -Infinity)
    ) {
      longestDelivery = order
    }
  })

  const avgDeliveryTimeMS = Math.round(
    totalDeliveryTimeMS / orderHistory.length
  )
  const avgDeliveryTimePerDayMS = Math.round(
    avgDeliveryTimeMS / (orderHistory.length / 7)
  )
  const avgDeliveryTimePerWeekMS = Math.round(avgDeliveryTimeMS / 4)
  const avgDeliveryTimePerMonthMS = Math.round(avgDeliveryTimeMS / 12)

  return {
    totalDeliveryTimeMS,
    avgDeliveryTimeMS,
    avgDeliveryTimePerDayMS,
    avgDeliveryTimePerMonthMS,
    avgDeliveryTimePerWeekMS,
    shortestDelivery,
    longestDelivery,
  }
}

const getItemsData = (
  orderHistory: DoorDashOrderType[],
  numOrders: number
): ItemData => {
  const totalItemsDelivered = orderHistory.reduce(
    (sum, order) => sum + order.TOTAL_ITEM_COUNT,
    0
  )

  const avgNumItemsPerDelivery = Number(
    (totalItemsDelivered / numOrders).toFixed(2)
  )

  const deliveryWithMostItems = orderHistory.reduce((maxItemsOrder, order) => {
    return order.TOTAL_ITEM_COUNT > maxItemsOrder.TOTAL_ITEM_COUNT
      ? order
      : maxItemsOrder
  }, orderHistory[0])

  return { totalItemsDelivered, avgNumItemsPerDelivery, deliveryWithMostItems }
}
