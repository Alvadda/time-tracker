/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
import { Project } from '../types'
import { setValueFromFb, setValueToFb } from './apiUtils'

const ProjectsPath = (userId: string) => `users/${userId}/projects`

const projectAPI = (db: Firestore) => {
  const getAll = async (userId: string) => {
    const projects: Project[] = []

    const querySnapshot = await getDocs(collection(db, ProjectsPath(userId)))
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      projects.push({
        id: doc.id,
        name: setValueFromFb(docData.name),
        color: setValueFromFb(docData.color),
        rate: setValueFromFb(docData.rate),
        customerId: setValueFromFb(docData.customerId),
      })
    })
    return projects
  }

  const create = async (userId: string, project: Partial<Project>) => {
    try {
      const docRef = await addDoc(collection(db, ProjectsPath(userId)), {
        name: project.name,
        rate: setValueToFb(project.rate),
        color: setValueToFb(project.color),
        customerId: setValueToFb(project.customerId),
      })

      const newProject: Project = {
        id: docRef.id,
        name: project.name!,
        rate: setValueFromFb(project.rate),
        color: setValueFromFb(project.color),
        customerId: setValueFromFb(project.customerId),
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
        rate: setValueToFb(project.rate),
        color: setValueToFb(project.color),
        customerId: setValueToFb(project.customerId),
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
