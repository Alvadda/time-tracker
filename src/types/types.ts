import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface Form {
  id: string
  name: string
  color?: string
  isFavorite?: boolean
}

export interface Project extends Form {
  color: string
  rate?: number
  customerId?: string
}

export interface Session {
  id: string
  activ: boolean
  start: number
  end?: number
  projectId?: string
  duration?: number
  taskIds?: string[]
  docRef: DocumentReference<DocumentData>
}

export interface Customer extends Form {
  contact?: string
  email?: string
  address?: string
  phone?: string
  rate?: number
  defaultBreak?: number
  note?: string
}

export interface Task extends Form {
  description?: string
  color: string
}

export type Page = 'time-tracker' | 'overview' | 'settings'
export type SettingPage = 'settings' | 'projects' | 'customer' | 'tasks'
