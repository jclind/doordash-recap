import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecapData } from '../services/recap'
import { RewindData } from '../types'
import ShareableCard from '../components/ShareableCard'

const ShareCard = () => {
  const [recapData, setRecapData] = useState<RewindData | null | undefined>(
    undefined
  )
  const { recapID } = useParams()

  useEffect(() => {
    if (recapID) {
      getRecapData(recapID).then(res => {
        setRecapData(res)
      })
    }
  }, [])

  return (
    <div className='share-card-page'>
      {recapData === undefined ? (
        'loading...'
      ) : recapData === null ? (
        'no data'
      ) : (
        <ShareableCard recapData={recapData} createYourOwnBtn={true} />
      )}
    </div>
  )
}

export default ShareCard
