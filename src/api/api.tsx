import { Firestore } from 'firebase/firestore'
import projectAPI from './projectAPI'
import sessionAPI from './sessionAPI'

const API = (db: Firestore) => {
  const project = projectAPI(db)
  const session = sessionAPI(db)

  return { project, session }
}

export default API
