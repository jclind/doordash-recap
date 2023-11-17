import { DoorDashOrderType } from '../types'

export const getDeliveryDurationMS = (order: DoorDashOrderType): number => {
  const pickupTime = new Date(order.ACTUAL_PICKUP_TIME).getTime()
  const deliveryTime = new Date(order.ACTUAL_DELIVERY_TIME).getTime()
  const deliveryDuration = deliveryTime - pickupTime

  return deliveryDuration
}
