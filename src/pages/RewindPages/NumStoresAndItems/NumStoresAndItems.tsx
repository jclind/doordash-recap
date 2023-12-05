import React from 'react'
import './NumStoresAndItems.scss'
import { RewindData } from '../../../types'

type NumStoresAndItemsProps = {
  recapData: RewindData
  clicked: boolean
}

const NumStoresAndItems = ({ recapData, clicked }: NumStoresAndItemsProps) => {
  const {
    numOrders,
    totalItemsDelivered: numItems,
    avgNumItemsPerDelivery,
  } = recapData

  return (
    <div className={`num-stores-and-items-page ${clicked ? 'clicked' : ''}`}>
      {clicked && (
        <>
          <div className='clicked-page-transition'></div>
          <div className='cover-background'></div>
        </>
      )}
      <div className='cover'></div>
      <div className='background'></div>
      <div className='inner-container'>
        <div className='card-container card-container-1'>
          <div className='card card-top'>
            <div className='card-content'>
              <div className='top'>
                <div className='text'>During {numOrders} orders,</div>
                <div className='text'>you delivered</div>
              </div>
              <div className='text items-text'>
                <span>{numItems}</span>items
              </div>
            </div>
          </div>
        </div>
        <div className='card-container card-container-2'>
          <div className='card card-bottom'>
            <div className='card-content'>
              <div className='text text-1'>That's</div>
              <span className='secondary text-2'>{avgNumItemsPerDelivery}</span>
              <div className='text text-3'>items per order</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumStoresAndItems
