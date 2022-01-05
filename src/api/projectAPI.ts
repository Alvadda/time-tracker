import { collection, Firestore, getDocs } from 'firebase/firestore'
import { Project } from '../types/types'

const ProjectsPath = (userId: string) => `users/${userId}/projects`

const getProjects = async (userId: string, db: Firestore) => {
  const projects: Project[] = []

  const querySnapshot = await getDocs(collection(db, ProjectsPath(userId)))
  querySnapshot.forEach((doc) => {
    const docData = doc.data()
    projects.push({
      id: doc.id,
      name: docData.name,
      color: docData.color,
      rate: docData.rate || undefined,
    })
  })

  return projects
}

export { getProjects }
