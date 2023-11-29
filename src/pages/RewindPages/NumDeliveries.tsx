import React from 'react'
import './NumDeliveries.scss'

import { RewindData } from '../../types'

type NumDeliveriesProps = {
  recapData: RewindData
  clicked: boolean
}

const NumDeliveries = ({ recapData, clicked }: NumDeliveriesProps) => {
  const { numOrders, numChainStores } = recapData

  return (
    <div className='num-deliveries-page'>
      {clicked && <div className='cover'></div>}
      <div className='inner-container'>
        <h1>
          In<span>{new Date().getFullYear()},</span>you have delivered
        </h1>
        <div className='num-line'>
          <span className='num-deliveries'>{numOrders}</span>
          <span className='orders-label'>orders</span>
        </div>
        <div className='text'>
          From <span>{numChainStores}</span> different stores.
        </div>
      </div>
      <div className='circle-1 circle' />
      <div className='circle-2 circle' />
      {/* <div className='semi-circle-1 semi-circle'></div> */}
      {/* <FaStar className='star-icon' /> */}
    </div>
  )
}

export default NumDeliveries
