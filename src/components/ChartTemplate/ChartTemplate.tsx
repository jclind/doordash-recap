import React from 'react'
import './ChartTemplate.scss'
import { Tooltip } from 'react-tooltip'
import { ChartTemplateDataType } from '../../types'
import { calcEvenlySpacedValues } from '../../util/calcEvenlySpacedValues'

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
  const spacedValues = calcEvenlySpacedValues(chartMin, chartMax)

  const updatedChartMax = spacedValues[0]
  console.log(updatedChartMax)

  return (
    <div className='chart'>
      <div className='chart-title'>{chartTitle}</div>
      <div className='y-axis'>
        {spacedValues.map(value => (
          <div key={value} className='point'>
            {value} -
          </div>
        ))}
      </div>
      <div className='chart-content'>
        {Object.keys(data).map(value => {
          const avgDeliveries = data[value as keyof ChartTemplateProps].value
          const heightPercentage = (avgDeliveries / updatedChartMax) * 100
          return (
            <div className='single-line' key={value}>
              <div className='label'>{value}</div>

              <div className='line-container'>
                <div
                  data-tooltip-id='line-tooltip'
                  data-tooltip-content={`${tooltipText}: ${avgDeliveries}`}
                  className='line'
                  style={{ height: `${heightPercentage || 0.5}%` }}
                  onClick={e => e.stopPropagation()}
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
