import React from 'react'
import {
  AiOutlineCheck,
  AiOutlineDownload,
  AiOutlineLink,
} from 'react-icons/ai'
import Modal from 'react-modal'

import './ShareModal.scss'
import { CopyLinkStatus } from '../types'
import { TailSpin } from 'react-loader-spinner'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'rgba(0, 0, 0, 0)',
    transform: 'translate(-50%, -50%)',
    border: '0',
    maxWidth: '95%',
  },
  overlay: {
    zIndex: '1000',
    background: 'rgba(0, 0, 0, 0.6)',

    backdropFilter: 'blur(3px)',
  },
}

type ShareModalProps = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  imgURL: string | null
  handleCreateAndCopyLink: () => void
  copyLinkStatus: CopyLinkStatus
}

const ShareModal = ({
  isOpen,
  setIsOpen,
  imgURL,
  handleCreateAndCopyLink,
  copyLinkStatus,
}: ShareModalProps) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleDownload = () => {
    if (imgURL) {
      const downloadLink = document.createElement('a')
      downloadLink.href = imgURL
      const currYear = new Date().getFullYear()
      downloadLink.download = `doordash-recap-${currYear}.png` // Set a default filename

      document.body.appendChild(downloadLink)
      downloadLink.click()
      // Remove the link from the document
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // contentLabel='Example Modal'
    >
      <div className='blur-container'></div>

      <div className='content share-modal'>
        <h1>Share Your Recap With Friends</h1>
        <div className='card-img-container'>
          <div className={`card-img ${imgURL ? 'skeleton' : ''}`}>
            {imgURL && <img src={imgURL} alt='Shareable recap card' />}
          </div>
        </div>
        <div className='share-options'>
          <button className='btn-no-styles download' onClick={handleDownload}>
            <AiOutlineDownload className='icon' />
            Download
          </button>
          <button
            className={`btn-no-styles copy-link ${copyLinkStatus}`}
            onClick={handleCreateAndCopyLink}
            disabled={copyLinkStatus === 'loading'}
          >
            {copyLinkStatus === 'default' ? (
              <>
                <AiOutlineLink className='icon' />
                Copy Link*
              </>
            ) : copyLinkStatus === 'loading' ? (
              <TailSpin
                height='25'
                width='25'
                color='#303841'
                ariaLabel='loading'
              />
            ) : (
              <>
                <AiOutlineCheck />
                Copied
              </>
            )}
          </button>
        </div>
        <div className='foot-note'>
          *By copying your shared link, you agree to store your DoorDash
          delivery data privately in the doordash-recap database
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
