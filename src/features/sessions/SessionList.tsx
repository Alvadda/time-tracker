import { List } from '@mui/material'
import moment from 'moment'
import React, { VFC } from 'react'
import { Project, Session } from '../../types/types'
import { minutesToHourMinutes } from '../../utils/timeUtils'
import SessionItem from './components/SessionItem'

interface SessionListProps {
  projects: Project[]
  sessions: Session[]
}

const SessionList: VFC<SessionListProps> = ({ projects, sessions }) => {
  const getProjectColor = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.color || 'none'
  }

  const getProjectRate = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.rate || 0
  }

  const getProjectName = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.name || ''
  }
  return (
    <List>
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          displayDate={moment(session.start).format('DD.MM.YYYY')}
          project={getProjectName(session.projectId)}
          projectColor={getProjectColor(session.projectId)}
          duration={minutesToHourMinutes(session.duration || 0)}
          erning={+(getProjectRate(session.projectId) * ((session.duration || 0) / 60)).toFixed(2)}
        />
      ))}
    </List>
  )
}

export default SessionList
