import { browserLocalPersistence, inMemoryPersistence, setPersistence } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearError, login, logout } from '../features/auth/authSlice'
import { useFirebaseContext } from '../firebase/FirebaseContext'

const isTest = process.env.NODE_ENV === 'test'
const persistance = isTest ? inMemoryPersistence : browserLocalPersistence

export const useFirebaseAuth = () => {
  const { auth, db } = useFirebaseContext()
  const dispatch = useDispatch()

  useEffect(() => {
    setPersistence(auth, persistance)
  }, [auth])

  const onAuthStateChangedPromise = new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          dispatch(clearError)
          const userDocRef = doc(db, 'users', user?.uid)
          const userDoc = await getDoc(userDocRef)
          if (!userDoc.exists()) {
            try {
              await setDoc(doc(db, 'users', user?.uid), {
                name: user.displayName,
                email: user.email,
                settings: { darkMode: true, defaultProjectId: '', defaultBreak: '0', defaultBreakRule: '0' },
              })
            } catch (error) {
              console.log('error', error)
            }
          }
          dispatch(
            login({
              uid: user.uid,
              name: user.displayName || undefined,
              email: user.email || '',
            })
          )
        } else {
          dispatch(logout())
        }
        resolve(user)
      },
      (err) => {
        reject(err)
      }
    )
  })

  return { onAuthStateInit: () => onAuthStateChangedPromise }
}
