import React, { useState } from 'react'
import { DoorDashOrderType, RewindData } from '../types'
import NumDeliveries from './RewindPages/NumDeliveries'
import { LoadingScreen } from '../components/LoadingScreen'
import NumStoresAndItems from './RewindPages/NumStoresAndItems'
import Share from './RewindPages/Share'
import TopStores from './RewindPages/TopStores'
import { Navigate } from 'react-router-dom'

type RewindProps = {
  data: RewindData | null
}

const Rewind = ({ data }: RewindProps) => {
  const [clicked, setClicked] = useState(false)
  const [currPage, setCurrPage] = useState(2)

  const handleClick = () => {
    setClicked(true)

    setTimeout(() => {
      // setCurrPage(prev => prev + 1)
    }, 800)
  }

  if (!data) return <Navigate to='/' />

  return (
    <div className='rewind-page' onClick={handleClick}>
      {currPage === 0 && <NumDeliveries recapData={data} clicked={clicked} />}
      {currPage === 1 && (
        <NumStoresAndItems recapData={data} clicked={clicked} />
      )}
      {currPage === 2 && <TopStores recapData={data} clicked={clicked} />}
      {currPage >= 3 && <Share recapData={data} />}
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
