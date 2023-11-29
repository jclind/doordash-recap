import React from 'react'
import { RewindData } from '../../../types'
import { concatString } from '../../../util/concatString'
import './TopStoresList.scss'

type TopStoresListProps = {
  recapData: RewindData
  clicked: boolean
}

const TopStoresList = ({ recapData, clicked }: TopStoresListProps) => {
  const { topChainStores } = recapData
  return (
    <div className='top-stores-list-page'>
      <div className='title'>Your Top Stores:</div>
      <div className='store-list'>
        {topChainStores.slice(0, 7).map(currStore => {
          const { store: name, totalTimesDelivered } = currStore
          return (
            <div className='store'>
              <div className='name'>
                {concatString(`${name}`, 22).toLowerCase()}
              </div>
              -
              <div
                className='times-delivered'
                style={{
                  width: `${
                    topChainStores[0].totalTimesDelivered.toString().length + 1
                  }ch`,
                }}
              >
                {totalTimesDelivered}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TopStoresList
