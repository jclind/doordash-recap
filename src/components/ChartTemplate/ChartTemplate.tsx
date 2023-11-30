import React from 'react'
import './ChartTemplate.scss'
import { Tooltip } from 'react-tooltip'
import { ChartTemplateDataType } from '../../types'

const calculateEvenlySpacedValues = (min: number, max: number): number[] => {
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

  // const range = max - min
  // const stepSize = range / 6 // You can adjust the division factor for more or fewer values
  // const numberOfValues = Math.floor(range / stepSize) + 1

  // const result = []

  // for (let i = 0; i < numberOfValues; i++) {
  //   const value = min + i * stepSize
  //   result.push(value)
  // }

  // return result
}

type ChartTemplateProps = {
  chartMax: number
  chartMin?: number
  data: ChartTemplateDataType
  tooltipText: string
  chartTitle: string
}

const ChartTemplate = ({
  chartMax,
  chartMin = 0,
  data,
  tooltipText,
  chartTitle,
}: ChartTemplateProps) => {
  const yAxisPoints = () => {
    const spacedValues = calculateEvenlySpacedValues(chartMin, chartMax)
    console.log(spacedValues)
    const points: JSX.Element[] = []

    spacedValues.forEach(val => {
      points.push(
        <div key={val} className='point'>
          {val} -
        </div>
      )
    })
    return points
  }

  return (
    <div className='chart'>
      <div className='chart-title'>{chartTitle}</div>
      <div className='y-axis'>{yAxisPoints()}</div>
      <div className='chart-content'>
        {Object.keys(data).map(value => {
          const avgDeliveries = data[value as keyof ChartTemplateProps].value
          const heightPercentage = (avgDeliveries / chartMax) * 100
          return (
            <div className='single-line' key={value}>
              <div className='label'>{value}</div>

              <div className='line-container'>
                <div
                  data-tooltip-id='line-tooltip'
                  data-tooltip-content={`${tooltipText}: ${avgDeliveries}`}
                  className='line'
                  style={{ height: `${heightPercentage}%` }}
                ></div>
                <Tooltip id='line-tooltip' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChartTemplate
