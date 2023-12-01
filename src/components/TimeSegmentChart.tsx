import React from 'react'
import { ChartTemplateDataType, TimeSegments } from '../types'
import ChartTemplate from './ChartTemplate/ChartTemplate'
import { findHourSegmentWithMostDeliveries } from '../util/dataTrends'

type TimeSegmentChartProps = {
  timeSegments: TimeSegments
}

const TimeSegmentChart = ({ timeSegments }: TimeSegmentChartProps) => {
  const chartTitle = 'Total Deliveries Per Time Of Day'

  const chartMaxName =
    findHourSegmentWithMostDeliveries(timeSegments) ?? '16-20'
  const chartMax = timeSegments[chartMaxName].numDeliveries

  const chartData: ChartTemplateDataType = {}

  Object.keys(timeSegments).forEach(key => {
    const numDeliveries = timeSegments[key as keyof TimeSegments].numDeliveries
    chartData[key] = { value: numDeliveries, label: key }
  })

  return (
    <ChartTemplate
      chartMax={chartMax}
      chartTitle={chartTitle}
      data={chartData}
      tooltipText='Total Deliveries'
    />
  )
}

export default TimeSegmentChart
