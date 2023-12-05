import React from 'react'
import { RewindData } from '../../../types'
import './NumDeliveries.scss'

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
    </div>
  )
}

export default NumDeliveries
