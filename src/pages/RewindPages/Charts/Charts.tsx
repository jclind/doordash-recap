import React from 'react'
import './Charts.scss'
import { RewindData } from '../../../types'
import { createTrendString } from '../../../util/dataTrends'
import DayChart from '../../../components/DayChart'
import TimeSegmentChart from '../../../components/TimeSegmentChart'

type ChartsProps = {
  recapData: RewindData
  clicked: boolean
}

const Charts = ({ recapData, clicked }: ChartsProps) => {
  const { deliveriesEachMonth, deliveriesPerDay, timeSegments } = recapData

  const { dayOfWeek, timeSegmentName } = createTrendString(
    deliveriesPerDay,
    timeSegments
  )

  return (
    <div className={`charts-page ${clicked ? 'clicked' : ''}`}>
      <div className='content-container'>
        <div className='title'>
          Your favorite time to dash is{' '}
          <span>
            {timeSegmentName} on {dayOfWeek}s.
          </span>
        </div>
        <div className='charts-container'>
          <div className='month-chart-container'>
            <DayChart deliveriesPerDay={deliveriesPerDay} />
          </div>
          <div className='time-segment-chart-container'>
            <TimeSegmentChart timeSegments={timeSegments} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
