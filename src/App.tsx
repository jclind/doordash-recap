import React, { useEffect, useState } from 'react'
import { useAuthStateChanged } from './hooks/useAuthStateChanged'
import { LoadingScreen } from './components/LoadingScreen'
import { DoorDashOrderType, RewindData } from './types'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Rewind from './pages/Rewind'
import { processCSVData } from './util/processCSVData'
import Modal from 'react-modal'
import ShareCard from './pages/ShareCard'
import Privacy from './pages/Privacy'
import TermsOfService from './pages/TermsOfService'
import Nav from './components/Nav/Nav'

Modal.setAppElement('#root')

const LS_DOORDASH_RECAP_DATA = 'LS_DOORDASH_RECAP_DATA'

const App = () => {
  const [dataDD, setDataDD] = useState<DoorDashOrderType[] | null>(null)
  const [processedData, setProcessedData] = useState<RewindData | null>(() => {
    const recapDataLS: string | null = localStorage.getItem(
      LS_DOORDASH_RECAP_DATA
    )

    const parsedRecapData = recapDataLS ? JSON.parse(recapDataLS) : null
    return parsedRecapData
  })
  // const { user, loading } = useAuthStateChanged()
  const navigate = useNavigate()

  useEffect(() => {
    const recapDataLS: string | null = localStorage.getItem(
      LS_DOORDASH_RECAP_DATA
    )

    const parsedRecapData = recapDataLS ? JSON.parse(recapDataLS) : null
    if (parsedRecapData) {
      setProcessedData(parsedRecapData)
    }
  }, [])

  useEffect(() => {
    if (dataDD) {
      const res = processCSVData(dataDD)
      setProcessedData(res)
      console.log(res.topChainStores, res.topIndividualStores)
      localStorage.setItem(LS_DOORDASH_RECAP_DATA, JSON.stringify(res))
      navigate('/rewind')
    }
  }, [dataDD])

  // if (loading) return <LoadingScreen />

  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home setDataDD={setDataDD} />} />
        <Route path='rewind' element={<Rewind data={processedData} />} />
        <Route path='share/:recapID' element={<ShareCard />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path='terms' element={<TermsOfService />} />
      </Routes>

      {/* <div>{user ? 'You are Logged In' : 'You are Logged Out'}</div> */}
    </div>
  )
}

export default App
