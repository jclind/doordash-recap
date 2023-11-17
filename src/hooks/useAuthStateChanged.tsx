import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../services/firestore'

interface AuthStateChanged {
  user: User | null
  loading: boolean
}

export const useAuthStateChanged = (): AuthStateChanged => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userInstance => {
      if (userInstance) {
        setUser(userInstance)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading }
}
