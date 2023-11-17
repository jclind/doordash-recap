import React, { useEffect, useState } from 'react'
import { useAuthStateChanged } from './hooks/useAuthStateChanged'
import { LoadingScreen } from './components/LoadingScreen'
import { DoorDashOrderType } from './types'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Rewind from './pages/Rewind'
import { processCSVData } from './util/processCSVData'

const App = () => {
  const [dataDD, setDataDD] = useState<DoorDashOrderType[] | null>(null)
  const { user, loading } = useAuthStateChanged()
  const navigate = useNavigate()

  useEffect(() => {
    if (dataDD) {
      const res = processCSVData(dataDD)
      console.log(res)
      // navigate('/rewind')
    }
  }, [dataDD])

  if (loading) return <LoadingScreen />

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home setDataDD={setDataDD} />} />
        <Route path='rewind' element={<Rewind />} />
      </Routes>

      {/* <div>{user ? 'You are Logged In' : 'You are Logged Out'}</div> */}
    </div>
  )
}

export default App
