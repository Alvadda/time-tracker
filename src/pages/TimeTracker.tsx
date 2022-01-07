import { Divider, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectProjects } from '../features/projects/projectsSlice'
import LiveTracker from '../features/sessions/LiveTracker'
import SessionList from '../features/sessions/SessionList'
import { selectSessions } from '../features/sessions/sessionsSlice'
import { useSessionsListener } from '../features/sessions/useSessionsListener'

const TimeTracker = () => {
  useSessionsListener()
  const sessions = useSelector(selectSessions)
  const projects = useSelector(selectProjects)

  return (
    <Grid item container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 25%', width: '100%' }}>
        <LiveTracker projects={projects} />
        <Divider />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto' }}>
        <SessionList sessions={sessions} projects={projects} />
      </Grid>
    </Grid>
  )
}

export default TimeTracker
