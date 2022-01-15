import { Alert, Divider, Grid, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../components/AddButton'
import { selectProjects } from '../features/projects/projectsSlice'
import LiveTracker from '../features/sessions/LiveTracker'
import SessionForm from '../features/sessions/SessionForm'
import SessionList from '../features/sessions/SessionList'
import {
  createSession,
  deleteSession,
  selectInactivSessions,
  selectSelectedSession,
  setSelectedSession,
  updateSession,
} from '../features/sessions/sessionsSlice'
import { useSessionsListener } from '../features/sessions/useSessionsListener'
import { Session } from '../types/types'

const TimeTracker = () => {
  useSessionsListener()
  const dispatch = useDispatch()
  const [createNewSession, setCreateNewSession] = useState<boolean>(false)
  const [showFeedback, setShowFeedback] = useState({ open: false, message: '' })

  const sessions = useSelector(selectInactivSessions)
  const selectedSession = useSelector(selectSelectedSession)
  const projects = useSelector(selectProjects)

  const showForm = createNewSession || selectedSession

  useEffect(() => {
    return () => {
      dispatch(setSelectedSession(undefined))
      setCreateNewSession(false)
    }
  }, [setCreateNewSession, dispatch])

  const closeForm = () => {
    dispatch(setSelectedSession(undefined))
    setCreateNewSession(false)
  }

  const onSelect = (session: Session) => {
    dispatch(setSelectedSession(session))
  }

  const onUpdate = (session: Session) => {
    dispatch(updateSession(session))
    closeForm()
    setShowFeedback({ open: true, message: 'Session successfully updated' })
  }

  const onCreate = (session: Partial<Session>) => {
    dispatch(createSession(session))
    closeForm()
    setShowFeedback({ open: true, message: 'Session successfully created' })
  }

  const onDelete = (session: Session) => {
    dispatch(deleteSession(session))
    closeForm()
    setShowFeedback({ open: true, message: 'Session successfully deleted' })
  }

  return (
    <Grid item container direction={'column'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 30%', width: '100%', paddingTop: '40px' }}>
        <LiveTracker projects={projects} />
        <Divider />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto', position: 'relative' }}>
        {!showForm && <SessionList sessions={sessions} projects={projects} onSelect={onSelect} />}
        {showForm && (
          <SessionForm
            variant={selectedSession ? 'update' : 'create'}
            session={selectedSession}
            projects={projects}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCancle={closeForm}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={showFeedback.open}
          autoHideDuration={3000}
          onClose={() => setShowFeedback((prev) => ({ ...prev, open: false }))}
        >
          <Alert onClose={() => setShowFeedback((prev) => ({ ...prev, open: false }))} severity="success" sx={{ width: '100%' }}>
            {showFeedback.message}
          </Alert>
        </Snackbar>
        {!showForm && <AddButton onClick={() => setCreateNewSession(true)} />}
      </Grid>
    </Grid>
  )
}

export default TimeTracker
