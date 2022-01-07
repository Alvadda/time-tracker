import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore'
import { createContext, FC, useContext } from 'react'
import { firebaseConfig } from './firebase.config'

interface FirebaseContextValue {
  app: FirebaseApp
  auth: Auth
  db: Firestore
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const FirebaseContext = createContext<FirebaseContextValue>({ app, auth, db })

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 5051)
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}

export const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider: FC = ({ children }) => {
  return <FirebaseContext.Provider value={{ app, auth, db }}>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
