import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Project, Session } from '../../types/types'
import { calcActiveSessionDuration, calcSessionDuration, nowMiliseconds } from '../../utils/timeUtil'
import { createSession, selectActivSession, updateSession } from './sessionsSlice'

const DEFAULT_DURATION = '0:00'
interface LiveTrackerProps {
  projects: Project[]
}

const clockTick = () => {
  return moment().format('HH:mm')
}

const createStartSession = (projectId: string): Partial<Session> => {
  return {
    activ: true,
    start: nowMiliseconds(),
    projectId,
  }
}

const LiveTracker: VFC<LiveTrackerProps> = ({ projects }) => {
  const dispatch = useDispatch()
  const [projectId, setProjectId] = useState<string>('')
  const [sessionDuration, setSessionDuration] = useState<string>(DEFAULT_DURATION)
  const [clock, setClock] = useState<string>(clockTick())
  const [trackDisabled, setTrackDisabled] = useState<boolean>(false)

  const activeSession = useSelector(selectActivSession)

  useEffect(() => {
    let intervalId: NodeJS.Timer

    if (activeSession) {
      setSessionDuration(calcActiveSessionDuration(activeSession.start))

      intervalId = setInterval(() => {
        setSessionDuration(calcActiveSessionDuration(activeSession.start))
      }, 1000)
    } else {
      setSessionDuration(DEFAULT_DURATION)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [setSessionDuration, activeSession])

  useEffect(() => {
    setClock(clockTick())
    const intervalId = setInterval(() => {
      setClock(clockTick())
    }, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (activeSession) {
      setProjectId(activeSession.projectId || '')
    }
  }, [activeSession])

  const endSession = (activeSession: Session) => {
    const endingSession = { ...activeSession }
    endingSession.end = nowMiliseconds()
    endingSession.activ = false
    endingSession.duration = calcSessionDuration(endingSession.start, endingSession.end)
    endingSession.projectId = projectId

    dispatch(updateSession(endingSession))
  }

  const track = () => {
    setTrackDisabled(true)
    setTimeout(() => setTrackDisabled(false), 1000)

    if (activeSession) {
      endSession(activeSession)
    } else {
      dispatch(createSession(createStartSession(projectId)))
    }
  }

  return (
    <Grid item container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 20%', width: '100%' }} justifyContent={'center'} alignItems={'center'} position={'relative'}>
        {activeSession && (
          <Chip label="Working" color="success" sx={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)' }} />
        )}
        <Typography variant="h3" component="h3" align="center">
          {clock}
        </Typography>
      </Grid>
      <Grid item container sx={{ flex: '1 0', width: '100%' }} justifyContent={'center'} alignItems={'center'}>
        <Grid item container justifyContent={'center'} alignItems={'center'}>
          <Grid item container display={'flex'} justifyContent={'center'} alignItems={'center'} xs={6}>
            <Typography variant="h4" component="h4" align="center">
              {sessionDuration}
            </Typography>
          </Grid>
          <Grid item container direction={'column'} gap={2} justifyContent={'center'} alignItems={'center'} xs={6} padding={2}>
            <FormControl sx={{ width: '141px' }}>
              <InputLabel>Project</InputLabel>
              <Select sx={{ width: '141px' }} label="Project" value={projectId} onChange={(event) => setProjectId(event.target.value)}>
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" disabled={trackDisabled} onClick={track}>
              Track Session
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LiveTracker
