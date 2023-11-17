import React from 'react'
import { PiSpinnerThin } from 'react-icons/pi'

export const LoadingScreen = ({ message = 'loading...' }) => {
  return (
    <div className='loading-screen'>
      <PiSpinnerThin className='icon' />
      <span className='message'>{message}</span>
    </div>
  )
}
