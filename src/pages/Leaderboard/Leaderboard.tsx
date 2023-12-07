import React, { useEffect, useState } from 'react'
import './Leaderboard.scss'
import { FirestoreDocType, LeaderboardDataType, RewindData } from '../../types'
import { getLeaderboardData } from '../../services/recap'
import { generateIdFromRecapData } from '../../util/generateIdFromRecapData'
import { msToMinutes } from '../../util/msToMinutes'
import { TailSpin } from 'react-loader-spinner'

type LeaderboardProps = {
  recapData: RewindData | null
}
const Leaderboard = ({ recapData }: LeaderboardProps) => {
  const [data, setData] = useState<LeaderboardDataType[]>([])

  const [lastDoc, setLastDoc] = useState<FirestoreDocType | null>(null)
  const [isMoreData, setIsMoreData] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const currUserID = recapData ? generateIdFromRecapData(recapData) : null

  const fetchLeaderboardData = async (
    lastDoc: FirestoreDocType | null,
    setLoading: (val: boolean) => void
  ) => {
    setLoading(true)
    getLeaderboardData(lastDoc).then(res => {
      if (res) {
        const updatedData = [...data, ...res.data]
        setData(updatedData)
        setLastDoc(res.lastDoc)
        if (res.totalResults <= updatedData.length) {
          setIsMoreData(false)
        }
      } else {
        setIsMoreData(false)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchLeaderboardData(null, setInitialLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='leaderboard-page'>
      <h1>Dasher Recap Leaderboard</h1>
      <div className='list-container'>
        <table className='leaderboard-table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Total Orders</th>
              <th>Delivery Time</th>
              <th>Num Items</th>
            </tr>
          </thead>
          <tbody>
            {initialLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index} className='loading'>
                    <td>
                      <div className='skeleton-loading'></div>
                    </td>
                    <td className='name'>
                      <div className='skeleton-loading'></div>
                    </td>
                    <td>
                      <div className='skeleton-loading'></div>
                    </td>
                    <td>
                      <div className='skeleton-loading'></div>
                    </td>
                    <td>
                      <div className='skeleton-loading'></div>
                    </td>
                  </tr>
                ))
              : data.length === 0 && !isMoreData
              ? 'No Data...'
              : data.map((currLBData, idx) => {
                  const { authorName, datePosted, ...currRecapData } =
                    currLBData
                  const {
                    numOrders,
                    totalDeliveryTimeMS,
                    totalItemsDelivered,
                  } = currRecapData
                  const name = authorName
                    ? authorName.substring(0, 18)
                    : 'Anonymous'
                  const id = generateIdFromRecapData(currRecapData)
                  return (
                    <tr
                      key={id}
                      className={id === currUserID ? 'curr-user' : ''}
                    >
                      <td className={`ranking rank-${idx}`}>{idx + 1}</td>
                      <td className='name'>{name}</td>
                      <td className={`num-orders rank-${idx}`}>{numOrders}</td>
                      <td>{msToMinutes(totalDeliveryTimeMS)}</td>
                      <td>{totalItemsDelivered}</td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
        {data.length > 0 && isMoreData && !initialLoading && (
          <button
            className='btn-no-styles load-more-btn'
            onClick={() => fetchLeaderboardData(lastDoc, setLoadingMore)}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <TailSpin
                height='25'
                width='25'
                color='rgb(231, 231, 231)'
                ariaLabel='loading'
              />
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
