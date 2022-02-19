import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore, initializeFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebase.config'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore:next-line
if (window.Cypress) {
  initializeFirestore(app, { experimentalForceLongPolling: true })
}
const db = getFirestore(app)

if (process.env.NODE_ENV !== 'production') {
  connectFirestoreEmulator(db, 'localhost', 5051)
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}

export { auth, db }
