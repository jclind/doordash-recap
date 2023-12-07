import { doc, getDoc, setDoc } from '@firebase/firestore'
import { db } from './firestore'
import { FirestoreDocType, LeaderboardDataType, RewindData } from '../types'
import { generateIdFromRecapData } from '../util/generateIdFromRecapData'
import toast from 'react-hot-toast'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'

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
    toast.error(message, { position: 'bottom-center' })
  }
}

export const getLeaderboardData = async (
  lastDoc: FirestoreDocType | null = null
) => {
  const resultsPerPage = 100

  try {
    const leaderboardDataRef = collection(db, 'leaderboardData')

    let q
    if (lastDoc) {
      q = query(
        leaderboardDataRef,
        orderBy('numOrders', 'desc'),
        startAfter(lastDoc),
        limit(resultsPerPage)
      )
    } else {
      q = query(
        leaderboardDataRef,
        orderBy('numOrders', 'desc'),
        limit(resultsPerPage)
      )
    }

    const countQuery = query(leaderboardDataRef)
    const totalResultsSnapshot = await getCountFromServer(countQuery)
    const totalResults = totalResultsSnapshot.data().count

    const results: LeaderboardDataType[] = []
    const querySnapshot = await getDocs(q)
    const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    querySnapshot.forEach(doc => {
      results.push(doc.data() as LeaderboardDataType)
    })

    return { data: results, lastDoc: newLastDoc, totalResults }
  } catch (error: any) {
    const message = error.message || error
    toast.error(message, { position: 'bottom-center' })
    return null
  }
}
