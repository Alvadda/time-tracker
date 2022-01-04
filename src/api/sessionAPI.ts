/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, deleteDoc, Firestore, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { Session } from '../types/types'

const sessionPath = (userId: string) => `users/${userId}/session`

const getActivSessions = async (userId: string, db: Firestore) => {
  const sessions: Session[] = []
  const q = query(collection(db, sessionPath(userId)), where('activ', '==', true))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    const session = doc.data()
    sessions.push({
      id: doc.id,
      activ: session.activ,
      start: session.start,
      end: session.end ? session.end : undefined,
      docRef: doc.ref,
    })
  })

  return sessions
}

const updateSession = async (session: Session) => {
  try {
    await updateDoc(session.docRef, {
      id: session.id,
      activ: session.activ,
      start: session.start,
      end: session.end || null,
    })
  } catch (error: any) {
    throw new Error(`Update session ${session.id} faild: ${error.message}`)
  }
}

const createSession = async (session: Partial<Session>, userId: string, db: Firestore) => {
  console.log(sessionPath(userId))

  await addDoc(collection(db, sessionPath(userId)), {
    activ: session.activ,
    start: session.start,
    end: session.end || null,
  })
}

const deleteSession = async (session: Session) => {
  try {
    await deleteDoc(session.docRef)
  } catch (error: any) {
    throw new Error(`Delete session ${session.id} faild: ${error.message}`)
  }
}
export { getActivSessions, updateSession, createSession, deleteSession, sessionPath }
