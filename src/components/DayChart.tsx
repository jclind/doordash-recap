import React from 'react'
import { DayArr, DeliveriesPerDay } from '../types'
import { findDayWithMostDeliveries } from '../util/dataTrends'
import { Tooltip } from 'react-tooltip'
import './DayChart.scss'

const getDayAverage = (num: number) => {
  return Math.floor((num / 52) * 10) / 10
}

type DayChartProps = {
  deliveriesPerDay: DeliveriesPerDay
}

const daysOfWeekShortened: string[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]

const DayChart = ({ deliveriesPerDay }: DayChartProps) => {
  const maxDayName = findDayWithMostDeliveries(deliveriesPerDay) ?? 'fri'
  const numMaxDeliveries = deliveriesPerDay[maxDayName].numDeliveries
  const maxAverageDeliveries = getDayAverage(numMaxDeliveries)
  const chartMax = Math.ceil(maxAverageDeliveries)
  const chartMin = 0

  const yAxisPoints = () => {
    const points: JSX.Element[] = []
    for (let i = chartMax; i >= chartMin; i -= 0.5) {
      points.push(
        <div key={i} className='point'>
          {i}
        </div>
      )
    }
    return points
  }

  return (
    <div className='day-chart'>
      <div className='y-axis'>{yAxisPoints()}</div>
      <div className='chart-content'>
        {Object.keys(deliveriesPerDay).map(day => {
          const numDeliveries =
            deliveriesPerDay[day as keyof DeliveriesPerDay].numDeliveries
          const averageDeliveries = getDayAverage(numDeliveries)
          const heightPercentage = (averageDeliveries / chartMax) * 100
          console.log(heightPercentage)
          return (
            <div className='single-line' key={day}>
              <div className='week-day'>{day}</div>

              <div className='line-container'>
                <a
                  data-tooltip-id='line-tooltip'
                  data-tooltip-content={`Daily Average: ${averageDeliveries}`}
                  className='line'
                  style={{ height: `${heightPercentage}%` }}
                ></a>
                <Tooltip id='line-tooltip' />
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className='x-axis'>
        {daysOfWeekShortened.map(day => (
          <div className='day'>{day}</div>
        ))}
      </div> */}
    </div>
  )
}

export default DayChart
