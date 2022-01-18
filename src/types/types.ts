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

export interface Customer {
  id: string
  name: string
  contact?: string
  email?: string
  address?: string
  phone?: string
  rate?: number
  defaultBreak?: number
  note?: string
}

export type Page = 'time-tracker' | 'overview' | 'settings'
export type SettingPage = 'settings' | 'projects' | 'customer'
