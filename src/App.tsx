import React, { useEffect, useState } from 'react'
import { DoorDashOrderType, RewindData } from './types'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import { processCSVData } from './util/processCSVData'
import Modal from 'react-modal'
import ShareCard from './pages/ShareCard'
import Privacy from './pages/Privacy'
import TermsOfService from './pages/TermsOfService'
import Nav from './components/Nav/Nav'
import Tutorial from './pages/Tutorial/Tutorial'
import Recap from './pages/Recap'
import { Toaster } from 'react-hot-toast'
import Leaderboard from './pages/Leaderboard/Leaderboard'

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

  const location = useLocation()
  const currentPathname = location.pathname
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
      const res: RewindData = processCSVData(dataDD)
      setProcessedData(res)
      localStorage.setItem(LS_DOORDASH_RECAP_DATA, JSON.stringify(res))
      navigate('/recap')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDD])

  return (
    <div className='App'>
      <Toaster />
      {currentPathname !== '/recap' && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='tutorial' element={<Tutorial setDataDD={setDataDD} />} />
        <Route path='recap' element={<Recap data={processedData} />} />
        <Route path='share/:recapID' element={<ShareCard />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path='terms' element={<TermsOfService />} />
        <Route path='leaderboard' element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

export default App
