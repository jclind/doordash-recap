import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firestore'

export const signupWithGoogle = async () => {
  try {
    // Create a GoogleAuthProvider instance
    const provider = new GoogleAuthProvider()

    // Trigger Google sign-in popup
    const result = await signInWithPopup(auth, provider)

    // The signed-in user info
    const user = result.user

    console.log('Successfully signed up with Google:', user)

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
