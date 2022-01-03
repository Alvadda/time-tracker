import { browserLocalPersistence, setPersistence } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useFirebaseContext } from '../firebase/FirebaseContext'
import { login, logout } from './authSlice'

export const useFirebaseAuth = () => {
  const { auth, db } = useFirebaseContext()
  const dispatch = useDispatch()

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
  }, [auth])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user)

        const userDocRef = doc(db, 'users', user?.uid)
        const userDoc = await getDoc(userDocRef)
        console.log(userDoc.data())
        if (!userDoc.exists()) {
          try {
            await setDoc(doc(db, 'users', user?.uid), {
              name: user.displayName,
              email: user.email,
            })
          } catch (error) {
            console.log('error', error)
          }
        }

        dispatch(
          login({
            uid: user.uid,
            name: user.displayName || undefined,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [auth, db, dispatch])
}
