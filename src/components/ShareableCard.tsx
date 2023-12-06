import React, { useRef, useState } from 'react'
import { CopyLinkStatus, RewindData } from '../types'
import doordashLogo from '../assets/images/doordash-logo.png'
import { concatString } from '../util/concatString'
import { msToMinutes } from '../util/msToMinutes'
import ShareModal from './ShareModal'
import { collection, doc, setDoc } from '@firebase/firestore'
import { db } from '../services/firestore'
import { customAlphabet } from 'nanoid'
import './ShareableCard.scss'
import { Link } from 'react-router-dom'
import { PiShareFatFill } from 'react-icons/pi'
import { MdLeaderboard } from 'react-icons/md'
import html2canvas from 'html2canvas'
import AddToLeaderboardModal from './AddToLeaderboardModal'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type ShareableCardProps = {
  recapData: RewindData
  createYourOwnBtn?: boolean
  shareToLeaderboardBtn?: boolean
}
const ShareableCard = ({
  recapData,
  createYourOwnBtn = false,
  shareToLeaderboardBtn = false,
}: ShareableCardProps) => {
  const [addToLeaderboardModalOpen, setAddToLeaderboardModalOpen] =
    useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  const [imgURL, setImgURL] = useState<string | null>(null)

  const [copyLinkStatus, setCopyLinkStatus] =
    useState<CopyLinkStatus>('default')

  const { topChainStores, numOrders, totalDeliveryTimeMS, numChainStores } =
    recapData

  const currYear = new Date().getFullYear()

  const cardRef = useRef<HTMLDivElement>(null)

  const handleShare = () => {
    if (cardRef.current) {
      setShareModalOpen(true)

      html2canvas(cardRef.current, {
        scale: 3,
        logging: true,
        useCORS: true,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        setImgURL(imgData)
      })
    }
  }
  const copyLink = (id: string) => {
    const baseURL = window.location.origin
    const link = `${baseURL}/share/${id}`

    navigator.clipboard.writeText(link)
  }
  const handleDataUpload = async (id: string) => {
    setCopyLinkStatus('loading')
    try {
      const sharedCardDataCollection = collection(db, 'sharedCardData')
      await setDoc(doc(sharedCardDataCollection, id), recapData)
    } catch (error) {
      console.error(error)
      setCopyLinkStatus('default')
    }

    setCopyLinkStatus('copied')
    setTimeout(() => {
      setCopyLinkStatus('default')
    }, 3000)
  }
  const handleCreateAndCopyLink = () => {
    if (!recapData) {
      console.error(
        'Something went wrong fetching recapData, please refresh and try again.'
      )
      throw new Error(
        'Something went wrong fetching recapData, please refresh and try again.'
      )
    }

    const nanoid = customAlphabet(alphabet, 12)
    const cardID = nanoid()
    copyLink(cardID)
    handleDataUpload(cardID)
  }

  return (
    <div className='shareable-card-container'>
      <div className='shareable-card' ref={cardRef}>
        <div className='header'>
          <div className='header-text'>
            <div className='doordash-logo'>
              <img src={doordashLogo} alt='doordash logo' />
              <div className='text'>DOORDASH</div>
            </div>
            <div className='wrapped-text'>{currYear} RECAP</div>
          </div>
          <div className='line'></div>
        </div>

        <div className='body'>
          <div className='top-stores-container'>
            <div className='title'>Top Stores</div>
            <div className='store-list'>
              {topChainStores.slice(0, 6).map(storeData => {
                const { store, totalTimesDelivered } = storeData
                return (
                  <div className='store-info-item' key={storeData.store}>
                    <div className='store-name'>
                      {concatString(`${store}`, 18).toLowerCase()}
                    </div>
                    <div className='times-delivered'>
                      - <span>{totalTimesDelivered}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='stats-container'>
            <div className='stat orders-delivered'>
              <div className='title'>Orders Delivered</div>
              <div className='number'>{numOrders.toLocaleString()}</div>
            </div>
            <div className='stat minutes-delivering'>
              <div className='title'>Minutes Delivered</div>
              <div className='number'>
                {msToMinutes(totalDeliveryTimeMS).toLocaleString()}
              </div>
            </div>
            <div className='stat unique-stores'>
              <div className='title'>Unique Stores</div>
              <div className='number'>{numChainStores.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className='bottom-info'>
          <div className='title'>Top Dashing Times</div>
          <div className='text'>- Sunday Night / 9PM - 12PM</div>
        </div>
        <div className='footer'>
          <div className='link'>doordash-recap.netlify.app</div>
        </div>
      </div>
      <div className='action-btns'>
        <button className='share-btn btn-no-styles' onClick={handleShare}>
          <PiShareFatFill className='icon' />
          Share Recap
        </button>
        {shareToLeaderboardBtn && (
          <button
            className='btn-no-styles share-btn'
            onClick={() => setAddToLeaderboardModalOpen(true)}
          >
            <MdLeaderboard className='icon' />
            Add To Leaderboard
          </button>
        )}
        {createYourOwnBtn && (
          <Link to='/' className='create-btn link btn-no-styles'>
            Create Your Recap
          </Link>
        )}
      </div>
      <ShareModal
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        imgURL={imgURL}
        handleCreateAndCopyLink={handleCreateAndCopyLink}
        copyLinkStatus={copyLinkStatus}
      />
      <AddToLeaderboardModal
        isOpen={addToLeaderboardModalOpen}
        setIsOpen={setAddToLeaderboardModalOpen}
        recapData={recapData}
      />
    </div>
  )
}

export default ShareableCard
