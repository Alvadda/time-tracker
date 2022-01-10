import { Divider, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectProjects } from '../features/projects/projectsSlice'
import LiveTracker from '../features/sessions/LiveTracker'
import SessionForm from '../features/sessions/SessionForm'
import SessionList from '../features/sessions/SessionList'
import { createSession, selectSelectedSession, selectSessions, setSelectedSession, updateSession } from '../features/sessions/sessionsSlice'
import { useSessionsListener } from '../features/sessions/useSessionsListener'
import { Session } from '../types/types'

const TimeTracker = () => {
  useSessionsListener()
  const dispatch = useDispatch()
  const sessions = useSelector(selectSessions)
  const selectedSession = useSelector(selectSelectedSession)
  const projects = useSelector(selectProjects)

  const onSelect = (session: Session) => {
    dispatch(setSelectedSession(session))
  }

  const onUpdate = (session: Session) => {
    dispatch(updateSession(session))
  }

  const onCreate = (session: Partial<Session>) => {
    dispatch(createSession(session))
  }
  return (
    <Grid item container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 30%', width: '100%', paddingTop: '40px' }}>
        <LiveTracker projects={projects} />
        <Divider />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto' }}>
        {!selectedSession && <SessionList sessions={sessions} projects={projects} onSelect={onSelect} />}
        {selectedSession && (
          <SessionForm
            variant="update"
            session={sessions[0]}
            projects={projects}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onCancle={() => dispatch(setSelectedSession(undefined))}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default TimeTracker
