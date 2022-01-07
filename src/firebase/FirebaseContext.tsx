import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { createContext, FC, useContext } from 'react'
import { auth, db } from './initFirebase'

interface FirebaseContextValue {
  auth: Auth
  db: Firestore
}

const FirebaseContext = createContext<FirebaseContextValue>({ auth, db })

export const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider: FC = ({ children }) => {
  return <FirebaseContext.Provider value={{ auth, db }}>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
