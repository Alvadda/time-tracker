import { Button, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Project } from '../../types/types'
import { createSession, selectActivSession, updateSession } from './sessionsSlice'

const DEFAULT_DURATION = '0:00'
interface LiveTrackerProps {
  projects: Project[]
}

const calcActiveSessionDuration = (startTime: number) => {
  const start = moment(startTime)
  const now = moment()
  const hours = now.diff(start, 'hour')
  const mins = moment.utc(moment(now, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'))).format('mm')
  return `${hours}:${mins}`
}

const clockTick = () => {
  return moment().format('HH:mm')
}

const calcSessionDuration = (startTime: number, endTime: number) => {
  const start = moment(startTime)
  const end = moment(endTime)
  const minute = end.diff(start, 'minute')
  return minute
}

const LiveTracker: VFC<LiveTrackerProps> = ({ projects }) => {
  const dispatch = useDispatch()
  const [projectId, setProjectId] = useState<string>('')
  const [sessionDuration, setSessionDuration] = useState<string>(DEFAULT_DURATION)
  const [clock, setClock] = useState<string>(clockTick())
  const [trackDisabled, setTrackDisabled] = useState<boolean>(false)

  const activeSessions = useSelector(selectActivSession)

  useEffect(() => {
    let intervalId: NodeJS.Timer

    if (activeSessions.length > 0) {
      setSessionDuration(calcActiveSessionDuration(activeSessions[0].start))

      intervalId = setInterval(() => {
        setSessionDuration(calcActiveSessionDuration(activeSessions[0].start))
      }, 1000)
    } else {
      setSessionDuration(DEFAULT_DURATION)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [setSessionDuration, activeSessions])

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
    if (activeSessions.length > 0) {
      setProjectId(activeSessions[0].projectId || '')
    }
  }, [activeSessions])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setProjectId(event.target.value)
  }

  const endSession = () => {
    const endingSession = { ...activeSessions[0] }
    endingSession.end = new Date().getTime()
    endingSession.activ = false
    endingSession.duration = calcSessionDuration(endingSession.start, endingSession.end)
    endingSession.projectId = projectId

    dispatch(updateSession(endingSession))
  }

  const track = () => {
    setTrackDisabled(true)
    setTimeout(() => setTrackDisabled(false), 1000)

    if (activeSessions.length === 1) {
      endSession()
    }
    if (activeSessions.length === 0) {
      dispatch(createSession(projectId))
    }
  }

  return (
    <Grid item container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'} alignItems={'center'}>
      <Grid item sx={{ flex: '0 0 35%', width: '100%' }} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h3" component="h3" align="center">
          {clock}
        </Typography>
      </Grid>
      <Grid item container sx={{ flex: '1 0', width: '100%' }} justifyContent={'center'} alignItems={'center'}>
        <Grid item container justifyContent={'center'} alignItems={'center'}>
          <Grid item container justifyContent={'center'} alignItems={'center'} xs={6}>
            <Typography variant="h4" component="h4" align="center">
              {sessionDuration}
            </Typography>
          </Grid>
          <Grid item container direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'} xs={6}>
            <Grid item>
              <Select
                sx={{ width: '141px', height: '36px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={projectId}
                onChange={handleChange}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Button variant="contained" disabled={trackDisabled} onClick={track}>
                Track Session
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LiveTracker
