/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
import { Task } from '../types/types'
import { setValueFromFb, setValueToFb } from './apiUtils'

const taskPath = (userId: string) => `users/${userId}/tasks`

const taskAPI = (db: Firestore) => {
  const get = async (userId: string) => {
    const tasks: Task[] = []

    const querySnapshot = await getDocs(collection(db, taskPath(userId)))
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      tasks.push({
        id: doc.id,
        name: docData.name,
        description: setValueFromFb(docData.description),
      })
    })
    return tasks
  }

  const create = async (userId: string, task: Partial<Task>) => {
    try {
      const docRef = await addDoc(collection(db, taskPath(userId)), {
        name: task.name,
        description: setValueToFb(task.description),
      })

      const newTask: Task = {
        id: docRef.id,
        name: task.name!,
        description: setValueFromFb(task.description),
      }

      return newTask
    } catch (error: any) {
      throw new Error(`create Task faild: ${error.message}`)
    }
  }

  const update = async (userId: string, task: Task) => {
    try {
      const taskRef = doc(db, taskPath(userId), task.id)
      await updateDoc(taskRef, {
        id: task.id,
        name: task.name,
        description: setValueToFb(task.description),
      })

      return task
    } catch (error: any) {
      throw new Error(`Update session ${task.id} faild: ${error.message}`)
    }
  }

  const remove = async (userId: string, task: Task) => {
    try {
      const taskRef = doc(db, taskPath(userId), task.id)
      await deleteDoc(taskRef)

      return task.id
    } catch (error: any) {
      throw new Error(`Delete project ${task.id} faild: ${error.message}`)
    }
  }

  return { get, create, remove, update }
}

export default taskAPI
