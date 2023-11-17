import { DoorDashOrderType } from '../types'
import { getDeliveryDurationMS } from './getDeliveryDurationMS'

type DayArr = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type DeliveriesPerDay = {
  [key in DayArr]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}

const deliveriesPerDay = []

const initialDeliveries: DeliveriesPerDay = {
  mon: { numDeliveries: 0, totalDeliveryDuration: 0 },
  tue: { numDeliveries: 0, totalDeliveryDuration: 0 },
  wed: { numDeliveries: 0, totalDeliveryDuration: 0 },
  thu: { numDeliveries: 0, totalDeliveryDuration: 0 },
  fri: { numDeliveries: 0, totalDeliveryDuration: 0 },
  sat: { numDeliveries: 0, totalDeliveryDuration: 0 },
  sun: { numDeliveries: 0, totalDeliveryDuration: 0 },
}

export const calcAvgDeliveriesPerDayOfWeek = (
  orderHistory: DoorDashOrderType[]
) => {
  const deliveriesPerDay: DeliveriesPerDay = { ...initialDeliveries }

  orderHistory.forEach(order => {
    const deliveryDate = new Date(order.ACTUAL_DELIVERY_TIME)
    const dayOfWeek = deliveryDate
      .toLocaleString('en-us', { weekday: 'short' })
      .toLowerCase() as DayArr
    const deliveryDurationMS = getDeliveryDurationMS(order)

    deliveriesPerDay[dayOfWeek].numDeliveries += 1
    deliveriesPerDay[dayOfWeek].totalDeliveryDuration += deliveryDurationMS
  })

  return deliveriesPerDay
}

type HourSegments =
  | '0-3'
  | '3-6'
  | '6-9'
  | '9-12'
  | '12-15'
  | '15-18'
  | '18-21'
  | '21-0'

type TimeSegments = {
  [key in HourSegments]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}

const initialTimeSegments = {
  '0-3': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '3-6': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '6-9': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '9-12': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '12-15': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '15-18': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '18-21': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '21-0': { numDeliveries: 0, totalDeliveryDuration: 0 },
}

export const calcAvgDeliveriesPer3Hours = (
  orderHistory: DoorDashOrderType[]
) => {
  const timeSegments: TimeSegments = { ...initialTimeSegments }

  orderHistory.forEach(order => {
    const hourSegment = getDeliveryHourSegment(order.ACTUAL_DELIVERY_TIME)
    const deliveryDurationMS = getDeliveryDurationMS(order)
    timeSegments[hourSegment].numDeliveries += 1
    timeSegments[hourSegment].totalDeliveryDuration += deliveryDurationMS
  })

  return timeSegments
}

const getDeliveryHourSegment = (ACTUAL_DELIVERY_TIME: string) => {
  const hour = new Date(ACTUAL_DELIVERY_TIME).getHours()

  if (hour >= 0 && hour < 3) {
    return '0-3'
  } else if (hour >= 3 && hour < 6) {
    return '3-6'
  } else if (hour >= 6 && hour < 9) {
    return '6-9'
  } else if (hour >= 9 && hour < 12) {
    return '9-12'
  } else if (hour >= 12 && hour < 15) {
    return '12-15'
  } else if (hour >= 15 && hour < 18) {
    return '15-18'
  } else if (hour >= 18 && hour < 21) {
    return '18-21'
  } else {
    return '21-0'
  }
}

type Months =
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
type DeliveriesEachMonth = {
  [key in Months]: {
    numDeliveries: number
    totalDeliveryDuration: number
  }
}

const initialDeliveriesEachMonth: DeliveriesEachMonth = {
  jan: { numDeliveries: 0, totalDeliveryDuration: 0 },
  feb: { numDeliveries: 0, totalDeliveryDuration: 0 },
  mar: { numDeliveries: 0, totalDeliveryDuration: 0 },
  apr: { numDeliveries: 0, totalDeliveryDuration: 0 },
  may: { numDeliveries: 0, totalDeliveryDuration: 0 },
  jun: { numDeliveries: 0, totalDeliveryDuration: 0 },
  jul: { numDeliveries: 0, totalDeliveryDuration: 0 },
  aug: { numDeliveries: 0, totalDeliveryDuration: 0 },
  sep: { numDeliveries: 0, totalDeliveryDuration: 0 },
  oct: { numDeliveries: 0, totalDeliveryDuration: 0 },
  nov: { numDeliveries: 0, totalDeliveryDuration: 0 },
  dec: { numDeliveries: 0, totalDeliveryDuration: 0 },
}

export const getDeliveriesEachMonth = (orderHistory: DoorDashOrderType[]) => {
  const deliveriesEachMonth: DeliveriesEachMonth = {
    ...initialDeliveriesEachMonth,
  }

  orderHistory.forEach(order => {
    const monthName = new Date(order.ACTUAL_DELIVERY_TIME)
      .toLocaleString('en-US', { month: 'short' })
      .toLowerCase() as Months
    const deliveryDurationMS = getDeliveryDurationMS(order)

    deliveriesEachMonth[monthName].numDeliveries += 1
    deliveriesEachMonth[monthName].totalDeliveryDuration += deliveryDurationMS
  })

  return deliveriesEachMonth
}
