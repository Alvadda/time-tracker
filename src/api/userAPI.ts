/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore'
import { AppSettings } from '../types'

const mapSettings = (settings: any): AppSettings => {
  if (!settings)
    return {
      darkMode: true,
      defaultProjectId: '',
      defaultBreak: '0',
      defaultBreakRule: '0',
      defaultRate: '',
    }

  return {
    darkMode: settings.darkMode ?? true,
    defaultProjectId: settings.defaultProjectId || '',
    defaultBreak: settings.defaultBreak || '0',
    defaultBreakRule: settings.defaultBreakRule || '0',
    defaultRate: settings.defaultRate || '',
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
