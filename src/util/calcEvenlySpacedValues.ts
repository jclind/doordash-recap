export const calcEvenlySpacedValues = (min: number, max: number): number[] => {
  const net = max - min

  let tickValue: number = 1

  if (net <= 0.5) {
    tickValue = 0.1
  } else if (net <= 1) {
    tickValue = 0.2
  } else if (net <= 5) {
    tickValue = 1
  } else if (net <= 10) {
    tickValue = 2
  } else if (net <= 30) {
    tickValue = 5
  } else if (net <= 50) {
    tickValue = 10
  } else if (net <= 70) {
    tickValue = 20
  } else if (net <= 130) {
    tickValue = 30
  } else if (net <= 200) {
    tickValue = 50
  } else if (net <= 300) {
    tickValue = 60
  } else if (net <= 500) {
    tickValue = 100
  } else if (net <= 800) {
    tickValue = 150
  } else if (net <= 1000) {
    tickValue = 200
  } else if (net <= 1500) {
    tickValue = 400
  } else {
    tickValue = 500
  }

  let result: number[] = [min]
  let currVal = min

  while (currVal < max) {
    currVal = Math.floor((currVal + tickValue) * 100) / 100

    result.push(currVal)
  }

  return result.reverse()
}
