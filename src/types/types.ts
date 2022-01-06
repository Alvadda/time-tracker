import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface Project {
  id: string
  name: string
  color: string
  rate?: number
}

export interface Session {
  id: string
  activ: boolean
  start: number
  end?: number
  projectId?: string
  duration?: number
  docRef: DocumentReference<DocumentData>
}

export type Page = 'time-tracker' | 'overview' | 'settings'
export type SettingPage = 'settings' | 'projects' | 'customer'
