import React from 'react'
import { RewindData } from '../../types'
import jaggedCircle from '../../assets/images/jagged-circle.png'
import './SingleTopStore.scss'
import { concatString } from '../../util/concatString'
import { calcFontSize } from '../../util/calcFontSize'

type SingleTopStoresProps = {
  recapData: RewindData
  clicked: boolean
}

const SingleTopStore = ({ recapData, clicked }: SingleTopStoresProps) => {
  const { topChainStores } = recapData

  const topStore = topChainStores[0]
  const topStoreName = concatString(topStore.store, 34)

  const currYear = new Date().getFullYear()

  return (
    <div className='top-stores-page'>
      <div className='initial-page'>
        <div className='initial-title'>
          IN <span className='year'>{currYear}</span>, YOUR TOP DELIVERY STORE
          WAS
          <span className='dot'>.</span>
          <span className='dot'>.</span>
          <span className='dot'>.</span>
        </div>
      </div>
      <div className='reveal'>
        <div className='b1'></div>
        <div className='b2'></div>
      </div>
      <div className={`second-page ${clicked ? 'clicked' : ''}`}>
        <div className='background-circle'>
          <img src={jaggedCircle} alt='jagged background' />
        </div>
        {/* <div className='store-name'>{topStore.store}</div> */}
        <div
          className='store-name'
          style={{ fontSize: calcFontSize(topStoreName) }}
        >
          {topStoreName}
        </div>
        <div className='times-delivered'>
          Where you delivered <span>{topStore.totalTimesDelivered} times</span>
        </div>
      </div>
      <div className='background-color'></div>
    </div>
  )
}

export default SingleTopStore
