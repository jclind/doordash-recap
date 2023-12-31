import { Months } from '../types'

const monthNames = {
  jan: 'january',
  feb: 'february',
  mar: 'march',
  apr: 'april',
  may: 'may',
  jun: 'june',
  jul: 'july',
  aug: 'august',
  sep: 'september',
  oct: 'october',
  nov: 'november',
  dec: 'december',
}

export const shortToLongMonthName = (short: Months) => {
  return monthNames[short]
}
