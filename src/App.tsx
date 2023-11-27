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

Modal.setAppElement('#root')

const App = () => {
  const [dataDD, setDataDD] = useState<DoorDashOrderType[] | null>(null)
  const [processedData, setProcessedData] = useState<RewindData | null>(null)
  // const { user, loading } = useAuthStateChanged()
  const navigate = useNavigate()

  useEffect(() => {
    if (dataDD) {
      const res = processCSVData(dataDD)
      setProcessedData(res)
      console.log(res.topChainStores, res.topIndividualStores)
      navigate('/rewind')
    }
  }, [dataDD])

  // if (loading) return <LoadingScreen />

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home setDataDD={setDataDD} />} />
        <Route path='rewind' element={<Rewind data={processedData} />} />
        <Route path='share/:recapID' element={<ShareCard />} />
      </Routes>

      {/* <div>{user ? 'You are Logged In' : 'You are Logged Out'}</div> */}
    </div>
  )
}

export default App
