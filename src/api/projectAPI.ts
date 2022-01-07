import { addDoc, collection, Firestore, getDocs } from 'firebase/firestore'
import { Project } from '../types/types'

const ProjectsPath = (userId: string) => `users/${userId}/projects`

const projectAPI = (db: Firestore) => {
  const getAll = async (userId: string) => {
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

  const create = async (userId: string, name: string, rate: number, color: string) => {
    try {
      const docRef = await addDoc(collection(db, ProjectsPath(userId)), {
        name,
        rate,
        color,
      })

      const project: Project = {
        id: docRef.id,
        name,
        rate,
        color,
      }
      return project
    } catch (error: any) {
      throw new Error(`create Project faild: ${error.message}`)
    }
  }

  return { getAll, create }
}

export default projectAPI
