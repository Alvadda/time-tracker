import { Firestore } from 'firebase/firestore'
import customerAPI from './customerAPI'
import projectAPI from './projectAPI'
import sessionAPI from './sessionAPI'

const API = (db: Firestore) => {
  const project = projectAPI(db)
  const session = sessionAPI(db)
  const customer = customerAPI(db)

  return { project, session, customer }
}

export default API
