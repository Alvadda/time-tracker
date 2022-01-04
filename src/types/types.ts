import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface Project {
  name: string
  rate?: number
}

export interface Session {
  id: string
  activ: boolean
  start: number
  end?: number
  projectId?: string
  docRef: DocumentReference<DocumentData>
}

export type Page = 'time-tracker' | 'overview' | 'settings'
