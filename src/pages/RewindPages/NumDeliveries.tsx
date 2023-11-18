import React, { useEffect, useState } from 'react'
import './NumDeliveries.scss'

import { FaStar } from 'react-icons/fa'

type NumDeliveriesProps = {
  numOrders: number
  numChains: number
  setCurrPage: (val: number) => void
}

const NumDeliveries = ({
  numOrders,
  numChains,
  setCurrPage,
}: NumDeliveriesProps) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)

    setTimeout(() => {
      setCurrPage(1)
    }, 800)
  }

  return (
    <div className='num-deliveries-page' onClick={handleClick}>
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
          From <span>{numChains}</span> different stores.
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
