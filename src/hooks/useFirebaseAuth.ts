import { browserLocalPersistence, inMemoryPersistence, setPersistence } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { clearError, login, logout } from '../features/auth/authSlice'
import { useFirebaseContext } from '../firebase/FirebaseContext'

const isTest = process.env.NODE_ENV === 'test'
const persistance = isTest ? inMemoryPersistence : browserLocalPersistence

export const useFirebaseAuth = () => {
  const { auth, db } = useFirebaseContext()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    setPersistence(auth, persistance)
  }, [auth])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
        navigate(from, { replace: true })
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [auth, db, dispatch, from, navigate])
}
