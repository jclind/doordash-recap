import React from 'react'
import CollectCSV from '../components/CollectCSV'
import { DoorDashOrderType } from '../types'

type HomeProps = {
  setDataDD: (data: DoorDashOrderType[] | null) => void
}

const Home = ({ setDataDD }: HomeProps) => {
  return (
    <div className='home-page page'>
      <div className='div'>Welcome to the app component</div>
      <CollectCSV setData={setDataDD} />
    </div>
  )
}

export default Home
