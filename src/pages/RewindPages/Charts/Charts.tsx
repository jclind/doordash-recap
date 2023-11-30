import React from 'react'
import './Charts.scss'
import { RewindData } from '../../../types'
import { createTrendString } from '../../../util/dataTrends'
import DayChart from '../../../components/DayChart'

type ChartsProps = {
  recapData: RewindData
  clicked: boolean
}

const Charts = ({ recapData, clicked }: ChartsProps) => {
  const { deliveriesEachMonth, deliveriesPerDay, timeSegments } = recapData

  console.log(deliveriesPerDay)

  const { dayOfWeek, timeSegmentName } = createTrendString(
    deliveriesPerDay,
    timeSegments
  )

  return (
    <div className='charts-page'>
      <div className='content-container'>
        <div className='title'>
          Your favorite time to dash is{' '}
          <span>
            {timeSegmentName} on {dayOfWeek}s.
          </span>
        </div>
        <div className='month-chart-container'>
          <DayChart deliveriesPerDay={deliveriesPerDay} />
        </div>
      </div>
    </div>
  )
}

export default Charts
