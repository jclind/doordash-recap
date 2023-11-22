import React from 'react'
import Modal from 'react-modal'
import './ShareModal.scss'
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
  },
}

type ShareModalProps = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  imgURL: string | null
}

const ShareModal = ({ isOpen, setIsOpen, imgURL }: ShareModalProps) => {
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // contentLabel='Example Modal'
    >
      <div className='content share-modal'>
        <h1>Share Your Recap With Friends</h1>
        <div className='card-img-container'>
          <div className={`card-img ${imgURL ? 'skeleton' : ''}`}>
            {/* {imgURL && <img src={imgURL} alt='Shareable recap card' />} */}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
