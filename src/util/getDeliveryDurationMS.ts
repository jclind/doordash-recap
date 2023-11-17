export const getDeliveryDurationMS = (
  ACTUAL_PICKUP_TIME: string,
  ACTUAL_DELIVERY_TIME: string
): number => {
  const pickupTime = new Date(ACTUAL_PICKUP_TIME).getTime()
  const deliveryTime = new Date(ACTUAL_DELIVERY_TIME).getTime()
  const deliveryDuration = deliveryTime - pickupTime

  return deliveryDuration
}
