import React from 'react'
import './NumDeliveries.scss'

import { FaStar } from 'react-icons/fa'

type NumDeliveriesProps = {
  numOrders: number
  numChains: number
}

const NumDeliveries = ({ numOrders, numChains }: NumDeliveriesProps) => {
  return (
    <div className='num-deliveries-page'>
      <div className='inner-container'>
        <h1>
          <span>This year,</span>you have delivered
        </h1>
        <div className='num-line'>
          <span className='num-deliveries'>{numOrders}</span>
          <span className='orders-label'>orders</span>
        </div>
        <div className='text'>
          From <span>{numChains}</span> different stores.
        </div>
      </div>
      <div className='circle-1 circle' />
      <div className='circle-2 circle' />
      <div className='semi-circle-1 semi-circle'></div>
      <FaStar className='star-icon' />
    </div>
  )
}

export default NumDeliveries
