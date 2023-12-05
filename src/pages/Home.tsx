import React from 'react'
import { Link } from 'react-router-dom'
import { tutorialData } from '../assets/data/tutorialData'
import { Helmet } from 'react-helmet'
import './Home.scss'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dasher Recap</title>
      </Helmet>
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
              <Link to='/tutorial' className='primary tutorial'>
                How To Get Your Data
              </Link>
              <Link
                to={`/tutorial?page=${tutorialData.length}`}
                className='primary upload-data'
              >
                Upload Data
              </Link>
            </div>
            <Link
              to='/recap?useExampleData=true'
              className='btn-no-styles example'
            >
              Show Me An Example
            </Link>
          </div>
        </div>

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
    </>
  )
}

export default Home
