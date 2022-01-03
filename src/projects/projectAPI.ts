import { collection, getDocs, Firestore } from 'firebase/firestore'
import { Project } from '../types/types'

const getProjects = async (userId: string, db: Firestore) => {
  const querySnapshot = await getDocs(collection(db, 'test'))
  const projects: Project[] = []
  querySnapshot.forEach((doc) => {
    const project = doc.data()
    projects.push({ name: project.name })
  })

  return projects
}

export { getProjects }
