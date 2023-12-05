import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firestore'

export const signupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)

    const user = result.user

    return user
  } catch (error: any) {
    console.error('Error signing up with Google:', error.message)
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.error('Error logging out', error)
    throw error
  }
}
