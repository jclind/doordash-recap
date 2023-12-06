import React, { useState } from 'react'
import './AddToLeaderboardModal.scss'
import Modal from 'react-modal'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { RewindData } from '../types'
import { addLeaderboardData } from '../services/recap'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const customStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'rgba(0, 0, 0, 0)',
    transform: 'translate(-50%, -50%)',
    border: '0',
    maxWidth: '100%',
  },
  overlay: {
    zIndex: '1000',
    background: 'rgba(0, 0, 0, 0.7)',

    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },
}

type AddToLeaderboardModalProps = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  recapData: RewindData
}

const AddToLeaderboardModal = ({
  isOpen,
  setIsOpen,
  recapData,
}: AddToLeaderboardModalProps) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleAddData = () => {
    setLoading(true)
    addLeaderboardData(recapData, name ?? null)
      .then(() => {
        setAddSuccess(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <button className='close-modal btn-no-styles' onClick={closeModal}>
        <AiOutlineClose className='icon' />
      </button>
      <div className='content share-data-modal'>
        <h1>Add Recap Data</h1>
        <p>
          Add your recap data to the leaderboard and see how you rank up against
          your fellow dashers!
        </p>
        {addSuccess ? (
          <div className='success-container'>
            <div className='icon-container'>
              <AiOutlineCheck className='icon' />
            </div>
            <h2>Data Successfully Added!</h2>
            <Link to='/leaderboard' className='btn-no-styles'>
              View The Leaderboard
            </Link>
          </div>
        ) : (
          <>
            <div className='add-name-container'>
              <label>
                Add Name: <span>(optional)</span>
              </label>
              <input
                type='text'
                placeholder='John Smith'
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={24}
              />
            </div>

            <div className='btns'>
              <button
                className='action-btn-boiler-plate action-btn cancel'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className='action-btn-boiler-plate action-btn submit'
                onClick={handleAddData}
              >
                {loading ? (
                  <TailSpin
                    height='25'
                    width='25'
                    color='rgb(231, 231, 231)'
                    ariaLabel='loading'
                  />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default AddToLeaderboardModal
