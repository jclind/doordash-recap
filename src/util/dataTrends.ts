import {
  DayArr,
  DeliveriesEachMonth,
  DeliveriesPerDay,
  DoorDashOrderType,
  HourSegments,
  Months,
  TimeSegments,
  Trends,
} from '../types'
import { getDeliveryDurationMS } from './getDeliveryDurationMS'

const initialTimeSegments = {
  '0-4': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '4-8': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '8-12': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '12-16': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '16-20': { numDeliveries: 0, totalDeliveryDuration: 0 },
  '20-0': { numDeliveries: 0, totalDeliveryDuration: 0 },
}

const initialDeliveries: DeliveriesPerDay = {
  mon: { numDeliveries: 0, totalDeliveryDuration: 0 },
  tue: { numDeliveries: 0, totalDeliveryDuration: 0 },
  wed: { numDeliveries: 0, totalDeliveryDuration: 0 },
  thu: { numDeliveries: 0, totalDeliveryDuration: 0 },
  fri: { numDeliveries: 0, totalDeliveryDuration: 0 },
  sat: { numDeliveries: 0, totalDeliveryDuration: 0 },
  sun: { numDeliveries: 0, totalDeliveryDuration: 0 },
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

export const getDataTrends = (orderHistory: DoorDashOrderType[]): Trends => {
  const deliveriesPerDay: DeliveriesPerDay = { ...initialDeliveries }
  const timeSegments: TimeSegments = { ...initialTimeSegments }
  const deliveriesEachMonth: DeliveriesEachMonth = {
    ...initialDeliveriesEachMonth,
  }

  orderHistory.forEach(order => {
    const deliveryDate = new Date(order.ACTUAL_DELIVERY_TIME)
    const deliveryDurationMS = getDeliveryDurationMS(order)

    const dayOfWeek = deliveryDate
      .toLocaleString('en-us', { weekday: 'short' })
      .toLowerCase() as DayArr
    deliveriesPerDay[dayOfWeek].numDeliveries += 1
    deliveriesPerDay[dayOfWeek].totalDeliveryDuration += deliveryDurationMS

    const hourSegment = getDeliveryHourSegment(order.ACTUAL_DELIVERY_TIME)
    timeSegments[hourSegment].numDeliveries += 1
    timeSegments[hourSegment].totalDeliveryDuration += deliveryDurationMS

    const monthName = new Date(order.ACTUAL_DELIVERY_TIME)
      .toLocaleString('en-US', { month: 'short' })
      .toLowerCase() as Months

    deliveriesEachMonth[monthName].numDeliveries += 1
    deliveriesEachMonth[monthName].totalDeliveryDuration += deliveryDurationMS
  })

  return { deliveriesPerDay, timeSegments, deliveriesEachMonth }
}

const getDeliveryHourSegment = (ACTUAL_DELIVERY_TIME: string) => {
  const hour = new Date(ACTUAL_DELIVERY_TIME).getHours()

  if (hour >= 0 && hour < 4) {
    return '0-4'
  } else if (hour >= 4 && hour < 8) {
    return '4-8'
  } else if (hour >= 8 && hour < 12) {
    return '8-12'
  } else if (hour >= 12 && hour < 16) {
    return '12-16'
  } else if (hour >= 16 && hour < 20) {
    return '16-20'
  }
  return '20-0'
}

export const getMaxDeliveriesMonth = (
  deliveries: DeliveriesEachMonth
): Months | null => {
  let maxMonth: Months | null = null
  let maxDeliveries = -1

  Object.entries(deliveries).forEach(([month, data]) => {
    const numDeliveries = data.numDeliveries as number

    if (numDeliveries > maxDeliveries) {
      maxMonth = month as Months
      maxDeliveries = numDeliveries
    }
  })

  return maxMonth
}

export const findDayWithMostDeliveries = (
  deliveries: DeliveriesPerDay
): DayArr | null => {
  let maxDeliveries = 0
  let dayWithMostDeliveries: DayArr | null = null

  for (const day in deliveries) {
    if (deliveries.hasOwnProperty(day)) {
      const numDeliveries = deliveries[day as DayArr].numDeliveries

      if (numDeliveries > maxDeliveries) {
        maxDeliveries = numDeliveries
        dayWithMostDeliveries = day as DayArr
      }
    }
  }

  return dayWithMostDeliveries
}
const findHourSegmentWithMostDeliveries = (
  timeSegments: TimeSegments
): HourSegments | null => {
  let maxDeliveries = 0
  let hourSegmentWithMostDeliveries: HourSegments | null = null

  for (const hourSegment in timeSegments) {
    if (timeSegments.hasOwnProperty(hourSegment)) {
      const numDeliveries =
        timeSegments[hourSegment as HourSegments].numDeliveries

      if (numDeliveries > maxDeliveries) {
        maxDeliveries = numDeliveries
        hourSegmentWithMostDeliveries = hourSegment as HourSegments
      }
    }
  }

  return hourSegmentWithMostDeliveries
}

const timeSegmentToRegularTime = (hourSegment: HourSegments): string => {
  const [start, end] = hourSegment.split('-')
  const startTime = start === '0' ? '12AM' : `${start}AM`
  const endTime = end === '0' ? '12AM' : `${end}AM`
  return `${startTime}-${endTime}`
}

const dayMapping = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}
const hourSegmentNames = {
  '0-4': 'Late At Night',
  '4-8': 'Early In The Morning',
  '8-12': 'In The Morning',
  '12-16': 'In The Afternoon',
  '16-20': 'In The Evening',
  '20-0': 'At Night',
}

export const createTrendString = (
  deliveriesPerDay: DeliveriesPerDay,
  timeSegments: TimeSegments
): { shareStr: string; dayOfWeek: string; timeSegmentName: string } => {
  const dayOfWeekShort: DayArr =
    findDayWithMostDeliveries(deliveriesPerDay) ?? 'fri'
  const dayOfWeek = dayMapping[dayOfWeekShort]

  const timeSegmentNumber =
    findHourSegmentWithMostDeliveries(timeSegments) ?? '16-20'
  const timeSegmentName = hourSegmentNames[timeSegmentNumber]
  const timeSegmentHours = timeSegmentToRegularTime(timeSegmentNumber)

  const shareStr = `${dayOfWeek} / ${timeSegmentHours}`

  return { shareStr, dayOfWeek, timeSegmentName }
}
