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
    const deliveryDurationMS = getDeliveryDurationMS(
      order.ACTUAL_PICKUP_TIME,
      order.ACTUAL_DELIVERY_TIME
    )

    deliveriesPerDay[dayOfWeek].numDeliveries += 1
    deliveriesPerDay[dayOfWeek].totalDeliveryDuration += deliveryDurationMS
  })

  return deliveriesPerDay
}
