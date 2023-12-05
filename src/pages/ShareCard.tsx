import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecapData } from '../services/recap'
import { RewindData } from '../types'
import ShareableCard from '../components/ShareableCard'
import { Helmet } from 'react-helmet'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title>Share Your Recap</title>
        <meta
          name='description'
          content='View and share your yearly dasher recap.'
        />
      </Helmet>
      <div className='share-card-page'>
        {recapData === undefined ? (
          'loading...'
        ) : recapData === null ? (
          'no data'
        ) : (
          <ShareableCard recapData={recapData} createYourOwnBtn={true} />
        )}
      </div>
    </>
  )
}

export default ShareCard
