import React from 'react'
import './Share.scss'
import ShareableCard from '../../components/ShareableCard'
import { RewindData } from '../../types'

type ShareProps = {
  recapData: RewindData | null
}

const Share = ({ recapData }: ShareProps) => {
  return (
    <div className='share-page'>
      <div className='content-container'>
        <ShareableCard recapData={recapData} />
      </div>
    </div>
  )
}

export default Share
