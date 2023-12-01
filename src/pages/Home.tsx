import React from 'react'
import CollectCSV from '../components/CollectCSV'
import { DoorDashOrderType } from '../types'
import './Home.scss'
import { Link } from 'react-router-dom'

type HomeProps = {
  setDataDD: (data: DoorDashOrderType[] | null) => void
}

const Home = ({ setDataDD }: HomeProps) => {
  return (
    <div className='home-page page'>
      <div className='content'>
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
      </div>

      {/* <CollectCSV setData={setDataDD} /> */}
      <footer>
        <section className='top'>
          <div className='text'>
            Created by{' '}
            <a
              href='https://www.jesselind.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Jesse Lind
            </a>{' '}
            with React & Typescript
          </div>
        </section>
        <section className='middle'>
          <Link to='/terms' className='legal-link'>
            Terms & Conditions
          </Link>
          <Link to='/privacy' className='legal-link'>
            Privacy Policy
          </Link>
        </section>
      </footer>
    </div>
  )
}

export default Home
