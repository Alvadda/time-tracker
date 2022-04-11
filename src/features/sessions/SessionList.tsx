import { List, ListItem, ListItemButton } from '@mui/material'
import React, { VFC } from 'react'
import { Project, Session } from '../../types'
import { formatDateShort, getRoundedHours } from '../../utils/timeUtil'
import SessionItem from './components/SessionItem'
import { getDurationWithBreak } from './sessionUtils'
import { useRate } from './useRate'

interface SessionListProps {
  projects: Project[]
  sessions: Session[]
  onSelect: (session: Session) => void
}

const SessionList: VFC<SessionListProps> = ({ projects, sessions, onSelect }) => {
  const { getRate } = useRate()
  const getProjectColor = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.color || 'none'
  }

  const getProjectName = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.name || ''
  }
  return (
    <List>
      {sessions.map((session) => {
        const duration = getDurationWithBreak(session)

        return (
          <ListItem disablePadding key={session.id}>
            <ListItemButton onClick={() => onSelect(session)}>
              <SessionItem
                displayDate={formatDateShort(session.start)}
                project={getProjectName(session.projectId)}
                projectColor={getProjectColor(session.projectId)}
                duration={getRoundedHours(duration)}
                erning={getRoundedHours(duration) * getRate(session)}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SessionList
