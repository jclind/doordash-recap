import React from 'react'
import { ChartTemplateDataType, DeliveriesPerDay } from '../types'
import { findDayWithMostDeliveries } from '../util/dataTrends'
import ChartTemplate from './ChartTemplate/ChartTemplate'

const getDayAverage = (num: number) => {
  return Math.floor((num / 52) * 10) / 10
}

type DayChartProps = {
  deliveriesPerDay: DeliveriesPerDay
}

const DayChart = ({ deliveriesPerDay }: DayChartProps) => {
  const maxDayName = findDayWithMostDeliveries(deliveriesPerDay) ?? 'fri'
  const numMaxDeliveries = deliveriesPerDay[maxDayName].numDeliveries
  const maxAverageDeliveries = getDayAverage(numMaxDeliveries)
  const chartMax = Math.ceil(maxAverageDeliveries)

  const chartData: ChartTemplateDataType = {}

  Object.keys(deliveriesPerDay).forEach(key => {
    const numDeliveries =
      deliveriesPerDay[key as keyof DeliveriesPerDay].numDeliveries
    const avgDailyValue = getDayAverage(numDeliveries)
    chartData[key] = { value: avgDailyValue, label: key }
  })

  const chartTitle = 'Avg. Deliveries Per Day'

  return (
    <ChartTemplate
      chartMax={chartMax}
      chartTitle={chartTitle}
      yAxisIncrement={0.5}
      data={chartData}
      tooltipText='Daily Average'
    />
  )
}

export default DayChart
