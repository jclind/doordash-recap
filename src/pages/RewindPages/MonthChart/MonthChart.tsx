import React from 'react'
import './MonthChart.scss'
import { DeliveriesEachMonth, RewindData } from '../../../types'
import { getMaxDeliveriesMonth } from '../../../util/dataTrends'
import { shortToLongMonthName } from '../../../util/shortToLongMonthName'
import { calcEvenlySpacedValues } from '../../../util/calcEvenlySpacedValues'
import { Tooltip } from 'react-tooltip'
import { getDaysInMonth } from '../../../util/getDaysInMonth'

type MonthChartProps = {
  recapData: RewindData
  clicked: boolean
}
const MonthChart = ({ recapData, clicked }: MonthChartProps) => {
  const { deliveriesEachMonth } = recapData

  const mostDeliveriesMonthName =
    getMaxDeliveriesMonth(deliveriesEachMonth) ?? 'oct'
  const totalDeliveriesInMonth =
    deliveriesEachMonth[mostDeliveriesMonthName].numDeliveries
  const xAxisPoints = calcEvenlySpacedValues(0, totalDeliveriesInMonth)

  const chartMax = xAxisPoints[0]

  const monthNameLong = shortToLongMonthName(mostDeliveriesMonthName)
  const avgDeliveriesPerDayInMonth =
    Math.floor((totalDeliveriesInMonth / getDaysInMonth(monthNameLong)) * 100) /
    100

  const tooltipText = 'Total Deliveries'

  return (
    <div className={`month-chart-page ${clicked ? 'clicked' : ''}`}>
      <div className='content-container'>
        <div className='title'>
          Your Top Dashing Month Was <br />
          <span>{monthNameLong}</span>
        </div>
        <div className='month-chart'>
          <div className='content'>
            <div className='chart-title'>Total Deliveries Per Month</div>
            {Object.keys(deliveriesEachMonth).map(value => {
              const totalDeliveries =
                deliveriesEachMonth[value as keyof DeliveriesEachMonth]
                  .numDeliveries
              const heightPercentage = (totalDeliveries / chartMax) * 100
              return (
                <div className='single-line' key={value}>
                  <div className='label'>{value}</div>

                  <div className='line-container'>
                    <div
                      data-tooltip-id='line-tooltip'
                      data-tooltip-content={`${tooltipText}: ${totalDeliveries}`}
                      className='line'
                      style={{ width: `${heightPercentage || 0.5}%` }}
                      onClick={e => e.stopPropagation()}
                    ></div>
                    <Tooltip id='line-tooltip' />
                  </div>
                </div>
              )
            })}
          </div>
          <div className='x-axis'>
            {xAxisPoints.map(value => {
              return (
                <div className='point-container'>
                  <div className='tick'></div>
                  <div className='point'>{value}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='stat'>
          You Delivered <span>{totalDeliveriesInMonth}</span> orders in{' '}
          {monthNameLong}.<br /> That's about{' '}
          <span>{avgDeliveriesPerDayInMonth}</span> per day.
        </div>
      </div>
    </div>
  )
}

export default MonthChart
