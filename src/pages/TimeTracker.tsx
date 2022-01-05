import { Grid } from '@mui/material'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../features/auth/authSlice'
import { fetchProjects, selectProjects } from '../features/projects/projectsSlice'
import LiveTracker from '../features/sessions/LiveTracker'
import { selectSessions } from '../features/sessions/sessionsSlice'
import { useSessionsListener } from '../features/sessions/useSessionsListener'
import { useFirebaseContext } from '../firebase/FirebaseContext'
import { useEffectOnce } from '../hooks/useEffectOnce'

const TimeTracker = () => {
  useSessionsListener()
  const { db } = useFirebaseContext()
  const dispatch = useDispatch()
  const sessions = useSelector(selectSessions)
  const projects = useSelector(selectProjects)
  const userId = useSelector(selectUserId)

  console.log(sessions)

  useEffectOnce(() => {
    dispatch(fetchProjects(db))
  })

  const getProjectColor = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.color || 'none'
  }

  const getProjectRate = (projectId?: string) => {
    return projects.find((project) => project.id === projectId)?.rate || 0
  }
  return (
    <Grid item container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 25%', width: '100%' }}>
        <LiveTracker userId={userId!} projects={projects} />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%' }}>
        <ul>
          {sessions.map((session) => (
            <li key={session.id} style={{ backgroundColor: getProjectColor(session.projectId) }}>
              {session.duration
                ? `Duration: ${session.duration}Min, Earnd: ${getProjectRate(session.projectId) * (session.duration / 60)}€`
                : `Start: ${moment(session.start).format('DD.MM HH:mm:ss')} 
              | End: ${session.end ? moment(session.end).format('DD.MM HH:mm:ss') : ''}`}
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  )
}

export default TimeTracker
