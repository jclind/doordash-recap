import React from 'react'
import './Share.scss'
import ShareableCard from '../../../components/ShareableCard'
import { RewindData } from '../../../types'
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'

type ShareProps = {
  recapData: RewindData
}

const Share = ({ recapData }: ShareProps) => {
  return (
    <div className='share-page'>
      <div className='share-card-container'>
        <ShareableCard recapData={recapData} shareToLeaderboardBtn />
      </div>
      <div className='share-info'>
        <h1 className='title'>Share Your Recap</h1>
        <p>
          Share the highlights of your DoorDash journey with friends on your
          favorite social platforms!
        </p>
        <p>
          If you enjoyed revisiting your past year of deliveries, consider
          staying tuned for more exciting projects or treating me to a coffee.
          Your support is greatly appreciated. Thank you for using Doordash
          Recap!
        </p>
        <div className='links'>
          <div className='main-links'>
            <a
              href='https://www.jesselind.com/'
              target='_blank'
              rel='noreferrer'
              className='link personal-website action-btn-boiler-plate action-btn'
            >
              My Personal Website
            </a>
            <a
              href='https://www.buymeacoffee.com/jesseclind'
              target='_blank'
              rel='noreferrer'
              className='link buy-me-a-coffee action-btn-boiler-plate'
            >
              Buy Me a Coffee
            </a>
          </div>
          <div className='sub-links'>
            <a
              href='https://github.com/jclind'
              rel='noreferrer'
              target='_blank'
            >
              <AiFillGithub className='icon' />
            </a>
            <a
              href='https://www.instagram.com/jclind02/'
              rel='noreferrer'
              target='_blank'
            >
              <AiOutlineInstagram className='icon' />
            </a>
            <a
              href='https://twitter.com/jclind02'
              rel='noreferrer'
              target='_blank'
            >
              <AiOutlineTwitter className='icon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
