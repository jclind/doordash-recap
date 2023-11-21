import React, { useState } from 'react'
import { DoorDashOrderType, RewindData } from '../types'
import NumDeliveries from './RewindPages/NumDeliveries'
import { LoadingScreen } from '../components/LoadingScreen'
import NumStoresAndItems from './RewindPages/NumStoresAndItems'
import ShareableCard from '../components/ShareableCard'

type RewindProps = {
  data: RewindData | null
}

const Rewind = ({ data }: RewindProps) => {
  const [currPage, setCurrPage] = useState(2)
  console.log(data)

  // if (!data) return <LoadingScreen />

  return (
    <div className='rewind-page'>
      {currPage === 0 && (
        <NumDeliveries
          numOrders={1000}
          numChains={100}
          setCurrPage={setCurrPage}
        />
      )}
      {currPage === 1 && (
        <NumStoresAndItems
          numOrders={1000}
          numChains={100}
          numItems={1400}
          avgNumItemsPerDelivery={1.43}
        />
      )}
      {currPage === 2 && <ShareableCard rewindData={data} />}
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
