const months: { [key: string]: number } = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}
export const getDaysInMonth = (givenMonth: string) => {
  const month = months[givenMonth.toLowerCase()]

  const year = new Date().getFullYear()
  return new Date(year, month, 0).getDate()
}
