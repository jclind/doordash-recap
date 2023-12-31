import React, { useState } from 'react'
import { RewindData } from '../types'
import NumStoresAndItems from './RewindPages/NumStoresAndItems/NumStoresAndItems'
import Share from './RewindPages/Share/Share'
import SingleTopStore from './RewindPages/SingleTopStore/SingleTopStore'
import { Navigate, useLocation } from 'react-router-dom'
import TopStoresList from './RewindPages/TopStoresList/TopStoresList'
import NumDeliveries from './RewindPages/NumDeliveries/NumDeliveries'
import Charts from './RewindPages/Charts/Charts'
import MonthChart from './RewindPages/MonthChart/MonthChart'
import { exampleData } from '../assets/data/exampleData'
import RecapProgress from '../components/RecapProgress/RecapProgress'
import { Helmet } from 'react-helmet'

type RecapProps = {
  data: RewindData | null
}

const Recap = ({ data }: RecapProps) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const useExampleDataParam = queryParams.get('useExampleData')
  const useExampleData: boolean = !!useExampleDataParam

  const recapData = useExampleData ? exampleData : data

  const [clicked, setClicked] = useState(false)
  const [currPage, setCurrPage] = useState(0)

  const handleClick = () => {
    if (!clicked && currPage < 6) {
      setClicked(true)

      const timeoutMS = currPage === 1 ? 2000 : currPage === 3 ? 1300 : 1000

      setTimeout(() => {
        setCurrPage(prev => prev + 1)
        setClicked(false)
      }, timeoutMS)
    }
  }

  if (!recapData) return <Navigate to='/' />

  return (
    <>
      <Helmet>
        <title>Your Dasher Recap</title>
        <meta
          name='description'
          content='View your recap data with cool animations and graphics.'
        />
      </Helmet>
      <div className='rewind-page' onClick={handleClick}>
        {/* <button className='btn-no-styles close-btn' onClick={handleClick}>
        <AiOutlineClose className='icon' />
      </button> */}
        <RecapProgress
          numPages={7}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
        {currPage === 0 && (
          <NumDeliveries recapData={recapData} clicked={clicked} />
        )}
        {currPage === 1 && (
          <NumStoresAndItems recapData={recapData} clicked={clicked} />
        )}
        {currPage === 2 && (
          <SingleTopStore recapData={recapData} clicked={clicked} />
        )}
        {currPage === 3 && (
          <TopStoresList recapData={recapData} clicked={clicked} />
        )}
        {currPage === 4 && <Charts recapData={recapData} clicked={clicked} />}
        {currPage === 5 && (
          <MonthChart recapData={recapData} clicked={clicked} />
        )}
        {currPage >= 6 && <Share recapData={recapData} />}
      </div>
    </>
  )
}

export default Recap
