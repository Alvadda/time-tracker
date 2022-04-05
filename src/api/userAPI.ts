/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore'
import { AppSettings, TimesheetInfos } from '../types'

const mapSettings = (settings: any): AppSettings => {
  if (!settings)
    return {
      darkMode: true,
      defaultProjectId: '',
      defaultBreak: 0,
      defaultBreakRule: 0,
      defaultRate: 0,
      language: 'en',
    }

  return {
    darkMode: settings.darkMode ?? true,
    defaultProjectId: settings.defaultProjectId || '',
    defaultBreak: settings.defaultBreak || 0,
    defaultBreakRule: settings.defaultBreakRule || 0,
    defaultRate: settings.defaultRate || 0,
    language: settings.language || 'en',
  }
}

const userPath = 'users'

const userAPI = (db: Firestore) => {
  const get = async (userId: string) => {
    const userRef = doc(db, userPath, userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        appSettings: mapSettings(data.settings),
        timesheetInfos: data.timesheetInfos as TimesheetInfos,
      }
    }
  }

  const updateAppSettings = async (userId: string, settings: AppSettings) => {
    try {
      const userRef = doc(db, userPath, userId)
      await updateDoc(userRef, {
        settings,
      })

      return settings
    } catch (error: any) {
      throw new Error(`Update app settings for user ${userId} faild: ${error.message}`)
    }
  }

  const updateTimesheetInfoSettings = async (userId: string, timesheetInfos?: TimesheetInfos) => {
    try {
      const userRef = doc(db, userPath, userId)
      await updateDoc(userRef, {
        timesheetInfos,
      })

      return timesheetInfos
    } catch (error: any) {
      throw new Error(`Update timesheetInfos settings for user ${userId} faild: ${error.message}`)
    }
  }

  return { get, updateAppSettings, updateTimesheetInfoSettings }
}

export default userAPI
