import React from 'react'
import CollectCSV from '../components/CollectCSV'
import { DoorDashOrderType } from '../types'
import './Home.scss'

type HomeProps = {
  setDataDD: (data: DoorDashOrderType[] | null) => void
}

const Home = ({ setDataDD }: HomeProps) => {
  return (
    <div className='home-page page'>
      <div className='header'>
        <h1>
          Your DoorDash Deliveries
          <br />
          Yearly Recap
        </h1>
        <p>Like Spotify Wrapped, but for DoorDash drivers.</p>
      </div>

      <div className='options'>
        <div className='top-btns'>
          <button className='primary tutorial'>How To Get Your Data</button>
          <button className='primary upload-data'>Upload Data</button>
        </div>
        <button className='btn-no-styles example'>Show Me An Example</button>
      </div>
      {/* <CollectCSV setData={setDataDD} /> */}
    </div>
  )
}

export default Home
