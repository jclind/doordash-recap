import { doc, getDoc } from '@firebase/firestore'
import { db } from './firestore'
import { RewindData } from '../types'

export const getRecapData = async (
  recapID: string
): Promise<RewindData | null> => {
  try {
    const docRef = doc(db, 'sharedCardData', recapID)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      // Document found, you can access its data using docSnap.data()
      const data = docSnap.data() as RewindData
      return data
    } else {
      return null
    }
  } catch (error: any) {
    console.error('Error logging out', error)
    throw error
  }
}
