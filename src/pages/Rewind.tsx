import React, { useState } from 'react'
import { DoorDashOrderType, RewindData } from '../types'
import NumDeliveries from './RewindPages/NumDeliveries'
import { LoadingScreen } from '../components/LoadingScreen'

type RewindProps = {
  data: RewindData | null
}

const Rewind = ({ data }: RewindProps) => {
  const [currPage, setCurrPage] = useState(0)

  // if (!data) return <LoadingScreen />

  return (
    <div className='rewind-page'>
      {currPage === 0 && <NumDeliveries numOrders={1000} numChains={100} />}
    </div>
  )
}

export default Rewind

/**
 * IDEAS FOR PAGES
 *
 * 1.
 *  Number of deliveries from number of unique CHAINS
 *
 * 2.
 *  Your most delivered from store.
 *
 * 3.
 *  Your top 10 stores
 *
 * 4.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
