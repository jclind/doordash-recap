import React from 'react'
import './Share.scss'
import ShareableCard from '../../components/ShareableCard'
import { RewindData } from '../../types'

type ShareProps = {
  rewindData: RewindData | null
}

const Share = ({ rewindData }: ShareProps) => {
  return (
    <div className='share-page'>
      <div className='content-container'>
        <ShareableCard rewindData={rewindData} />
      </div>
    </div>
  )
}

export default Share
