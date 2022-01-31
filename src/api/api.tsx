import { Firestore } from 'firebase/firestore'
import customerAPI from './customerAPI'
import projectAPI from './projectAPI'
import sessionAPI from './sessionAPI'
import taskAPI from './taskAPI'

const API = (db: Firestore) => {
  const project = projectAPI(db)
  const session = sessionAPI(db)
  const customer = customerAPI(db)
  const task = taskAPI(db)

  return { project, session, customer, task }
}

export default API
