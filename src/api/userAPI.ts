/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore'
import { AppSettings } from '../types/types'

const mapSettings = (doc: any): AppSettings => {
  return {
    darkMode: doc.darkMode,
    defaultProjectId: doc.defaultProjectId || '',
    defaultBreak: doc.defaultBreak || '0',
    defaultBreakRule: doc.defaultBreakRule || '0',
  }
}

const userPath = 'users'

const userAPI = (db: Firestore) => {
  const get = async (userId: string) => {
    const userRef = doc(db, userPath, userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      return mapSettings(docSnap.data().settings)
    }
  }

  const updateSettings = async (userId: string, settings: AppSettings) => {
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
