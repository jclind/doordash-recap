import React from 'react'
import './Share.scss'
import ShareableCard from '../../components/ShareableCard'
import { RewindData } from '../../types'
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'

type ShareProps = {
  recapData: RewindData | null
}

const Share = ({ recapData }: ShareProps) => {
  return (
    <div className='share-page'>
      <div className='content-container'>
        <ShareableCard recapData={recapData} />
      </div>
      <div className='share-info'>
        <h1 className='title'>Share Your Recap</h1>
        <p>
          Share the highlights of your DoorDash journey with friends and on your
          favorite social platforms!
        </p>
        <p>
          If you enjoyed revisiting your past year or deliveries, consider
          staying tuned for more exciting projects or treating me to a coffee.
          Your support is greatly appreciated. Thank you for using Doordash
          Recap!
        </p>
        <div className='links'>
          <div className='main-links'>
            <a
              href='https://www.jesselind.com/'
              className='link personal-website action-btn-boiler-plate action-btn'
            >
              My Personal Website
            </a>
            <a
              href='https://www.buymeacoffee.com/jesseclind'
              className='link buy-me-a-coffee action-btn-boiler-plate'
            >
              Buy Me a Coffee
            </a>
          </div>
          <div className='sub-links'>
            <a href='https://github.com/jclind'>
              <AiFillGithub className='icon' />
            </a>
            <a href='https://www.instagram.com/jclind02/'>
              <AiOutlineInstagram className='icon' />
            </a>
            <a href='https://twitter.com/jclind02'>
              <AiOutlineTwitter className='icon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
