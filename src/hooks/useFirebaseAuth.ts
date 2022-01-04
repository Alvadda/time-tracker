import { browserLocalPersistence, setPersistence } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/auth/authSlice'
import { useFirebaseContext } from '../firebase/FirebaseContext'

export const useFirebaseAuth = () => {
  const { auth, db } = useFirebaseContext()
  const dispatch = useDispatch()

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
  }, [auth])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user?.uid)
        const userDoc = await getDoc(userDocRef)
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
        console.log(
          login({
            uid: user.uid,
            name: user.displayName || undefined,
          })
        )

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
