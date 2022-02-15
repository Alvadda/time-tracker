/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { Session } from '../types'
import { setValueFromFb, setValueToFb } from './apiUtils'

export const sessionPath = (userId: string) => `users/${userId}/session`

const sessionAPI = (db: Firestore) => {
  const getAllActiv = async (userId: string) => {
    const sessions: Session[] = []
    const q = query(collection(db, sessionPath(userId)), where('activ', '==', true))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      sessions.push({
        id: doc.id,
        activ: docData.activ,
        start: docData.start,
        end: setValueFromFb(docData.end),
        duration: setValueFromFb(docData.duration),
        break: setValueFromFb(docData.break),
        note: setValueFromFb(docData.note),
        projectId: setValueFromFb(docData.projectId),
        taskIds: setValueFromFb(docData.taskIds),
      })
    })

    return sessions
  }

  const update = async (userId: string, session: Session) => {
    try {
      const sessionRef = doc(db, sessionPath(userId), session.id)
      await updateDoc(sessionRef, {
        id: session.id,
        activ: session.activ,
        start: session.start,
        end: setValueToFb(session.end),
        duration: setValueToFb(session.duration),
        break: setValueToFb(session.break),
        note: setValueToFb(session.note),
        projectId: setValueToFb(session.projectId),
        taskIds: session.taskIds || [],
      })
    } catch (error: any) {
      throw new Error(`Update session ${session.id} faild: ${error.message}`)
    }
  }

  const create = async (session: Partial<Session>, userId: string) => {
    try {
      await addDoc(collection(db, sessionPath(userId)), {
        activ: session.activ,
        start: session.start,
        end: setValueToFb(session.end),
        duration: setValueToFb(session.duration),
        break: setValueToFb(session.break),
        note: setValueToFb(session.note),
        projectId: setValueToFb(session.projectId),
        taskIds: session.taskIds || [],
      })
    } catch (error: any) {
      throw new Error(`Create session ${session.id} faild: ${error.message}`)
    }
  }

  const remove = async (userId: string, session: Session) => {
    try {
      const sessionRef = doc(db, sessionPath(userId), session.id)
      await deleteDoc(sessionRef)
    } catch (error: any) {
      throw new Error(`Delete session ${session.id} faild: ${error.message}`)
    }
  }

  return { getAllActiv, update, create, remove }
}
export default sessionAPI
