import React from 'react'
import { ChartTemplateDataType, TimeSegments } from '../types'
import ChartTemplate from './ChartTemplate/ChartTemplate'

type TimeSegmentChartProps = {
  timeSegments: TimeSegments
}

const TimeSegmentChart = ({ timeSegments }: TimeSegmentChartProps) => {
  const chartMax = 100
  const chartTitle = 'Total Deliveries Per Time Segment'

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
      yAxisIncrement={5}
      tooltipText='Total Deliveries'
    />
  )
}

export default TimeSegmentChart
