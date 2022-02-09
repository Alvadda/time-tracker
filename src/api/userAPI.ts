/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore'
import { Settings } from '../types/types'

const userPath = 'users'

const userAPI = (db: Firestore) => {
  const get = async (userId: string) => {
    const userRef = doc(db, userPath, userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      return docSnap.data().settings as unknown as Settings
    }
  }

  const updateSettings = async (userId: string, settings: Settings) => {
    try {
      const userRef = doc(db, userPath, userId)
      await updateDoc(userRef, {
        settings,
      })

      return settings
    } catch (error: any) {
      throw new Error(`Update settings for user ${userId} faild: ${error.message}`)
    }
  }

  return { get, updateSettings }
}

export default userAPI
