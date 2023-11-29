import React from 'react'
import { RewindData } from '../../types'
import './TopStores.scss'

type TopStoresProps = {
  recapData: RewindData
  clicked: boolean
}

const TopStores = ({ recapData, clicked }: TopStoresProps) => {
  const { topChainStores } = recapData

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
      <div className='main-page'>
        <div className='header'></div>
      </div>
    </div>
  )
}

export default TopStores
