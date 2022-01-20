/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
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
        customerId: docData.customerId || undefined,
      })
    })
    return projects
  }

  const create = async (userId: string, project: Partial<Project>) => {
    try {
      const docRef = await addDoc(collection(db, ProjectsPath(userId)), {
        name: project.name,
        rate: project.rate || null,
        color: project.color,
        customerId: project.customerId || null,
      })

      const newProject: Project = {
        id: docRef.id,
        name: project.name!,
        rate: project.rate,
        color: project.color!,
        customerId: project.customerId,
      }
      return newProject
    } catch (error: any) {
      throw new Error(`create Project faild: ${error.message}`)
    }
  }

  const update = async (userId: string, project: Project) => {
    try {
      const projectRef = doc(db, ProjectsPath(userId), project.id)
      await updateDoc(projectRef, {
        id: project.id,
        name: project.name,
        rate: project.rate,
        color: project.color,
        customerId: project.customerId,
      })

      return project
    } catch (error: any) {
      throw new Error(`Update session ${project.id} faild: ${error.message}`)
    }
  }

  const remove = async (userId: string, project: Project) => {
    try {
      const projectRef = doc(db, ProjectsPath(userId), project.id)
      await deleteDoc(projectRef)

      return project.id
    } catch (error: any) {
      throw new Error(`Delete project ${project.id} faild: ${error.message}`)
    }
  }

  return { getAll, create, remove, update }
}

export default projectAPI
