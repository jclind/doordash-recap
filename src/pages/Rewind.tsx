import React, { useState } from 'react'
import { DoorDashOrderType, RewindData } from '../types'
import { LoadingScreen } from '../components/LoadingScreen'
import NumStoresAndItems from './RewindPages/NumStoresAndItems/NumStoresAndItems'
import Share from './RewindPages/Share/Share'
import SingleTopStore from './RewindPages/SingleTopStore/SingleTopStore'
import { Navigate } from 'react-router-dom'
import TopStoresList from './RewindPages/TopStoresList/TopStoresList'
import NumDeliveries from './RewindPages/NumDelieveries/NumDeliveries'

type RewindProps = {
  data: RewindData | null
}

const Rewind = ({ data }: RewindProps) => {
  const [clicked, setClicked] = useState(false)
  const [currPage, setCurrPage] = useState(3)

  const handleClick = () => {
    setClicked(true)

    const timeoutMS = currPage === 3 ? 1300 : 1000

    setTimeout(() => {
      setCurrPage(prev => prev + 1)
      setClicked(false)
    }, timeoutMS)
  }

  if (!data) return <Navigate to='/' />

  return (
    <div className='rewind-page' onClick={handleClick}>
      {currPage === 0 && <NumDeliveries recapData={data} clicked={clicked} />}
      {currPage === 1 && (
        <NumStoresAndItems recapData={data} clicked={clicked} />
      )}
      {currPage === 2 && <SingleTopStore recapData={data} clicked={clicked} />}
      {currPage === 3 && <TopStoresList recapData={data} clicked={clicked} />}
      {currPage >= 4 && <Share recapData={data} />}
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
