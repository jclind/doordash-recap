import { doc, getDoc, setDoc } from '@firebase/firestore'
import { db } from './firestore'
import { RewindData } from '../types'
import { generateIdFromRecapData } from '../util/generateIdFromRecapData'
import toast from 'react-hot-toast'

export const getRecapData = async (
  recapID: string
): Promise<RewindData | null> => {
  try {
    const docRef = doc(db, 'sharedCardData', recapID)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data() as RewindData
      return data
    } else {
      return null
    }
  } catch (error: any) {
    console.error('Error fetching recap data', error)
    throw error
  }
}

export const addLeaderboardData = async (
  recapData: RewindData,
  authorName: string | null = null
) => {
  try {
    const id = generateIdFromRecapData(recapData)
    const docRef = doc(db, 'leaderboardData', id)

    const datePosted = new Date().getTime()
    const data = { ...recapData, datePosted, authorName }

    await setDoc(docRef, data)
  } catch (error: any) {
    const message = error.message || error
    console.log(message)
    toast.error(message, { position: 'bottom-center' })
  }
}
