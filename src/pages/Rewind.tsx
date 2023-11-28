import React, { useState } from 'react'
import { DoorDashOrderType, RewindData } from '../types'
import NumDeliveries from './RewindPages/NumDeliveries'
import { LoadingScreen } from '../components/LoadingScreen'
import NumStoresAndItems from './RewindPages/NumStoresAndItems'
import Share from './RewindPages/Share'

type RewindProps = {
  data: RewindData | null
}

const Rewind = ({ data }: RewindProps) => {
  const [clicked, setClicked] = useState(false)
  const [currPage, setCurrPage] = useState(0)

  const handleClick = () => {
    setClicked(true)

    setTimeout(() => {
      setCurrPage(prev => prev + 1)
    }, 800)
  }

  return (
    <div className='rewind-page' onClick={handleClick}>
      {currPage === 0 && (
        <NumDeliveries numOrders={1000} numChains={100} clicked={clicked} />
      )}
      {currPage === 1 && (
        <NumStoresAndItems
          numOrders={1000}
          numChains={100}
          numItems={1400}
          avgNumItemsPerDelivery={1.43}
        />
      )}
      {currPage >= 2 && <Share recapData={data} />}
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
