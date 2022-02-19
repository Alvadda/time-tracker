export interface Form {
  id: string
  name: string
  color?: string
  isFavorite?: boolean
}

export type NumberOrEmpty = number | ''

export interface Project extends Form {
  color: string
  rate: NumberOrEmpty
  customerId?: string
}

export interface Session {
  id: string
  activ: boolean
  start: number
  end?: number
  duration?: number
  break?: number
  note?: string
  projectId?: string
  taskIds?: string[]
}

export interface ProjectStats {
  project: Project
  sessions: Session[]
  totalEarning: number
  totalMinutesWorked: number
}
export interface Customer extends Form {
  contact?: string
  email?: string
  address?: string
  phone?: string
  rate: NumberOrEmpty
  note?: string
}

export interface Task extends Form {
  description?: string
  color: string
}

export interface AppSettings {
  darkMode: boolean
  defaultProjectId: string
  defaultBreak: NumberOrEmpty
  defaultBreakRule: NumberOrEmpty
  defaultRate: NumberOrEmpty
}

export type Page = 'time-tracker' | 'overview' | 'settings'
export type SettingPage = 'settings' | 'projects' | 'customer' | 'tasks'
