import { DateTimePicker } from '@mui/lab'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import moment, { Moment } from 'moment'
import { useEffect, useState, VFC } from 'react'
import { Project, Session } from '../../types/types'
import { calcSessionDuration, timeInMiliseconds } from '../../utils/timeUtil'

interface SessionFormProps {
  variant?: 'create' | 'update'
  session?: Session
  projects: Project[]
  onUpdate?: (session: Session) => void
  onCreate?: (session: Partial<Session>) => void
  onCancle: () => void
}

const getStartTime = (time?: Moment) => {
  return time || moment()
}

const getDuration = (start: number, end?: number) => {
  if (end) {
    return calcSessionDuration(start, end)
  }
}

const SessionForm: VFC<SessionFormProps> = ({ variant = 'update', session, projects, onCancle, onCreate, onUpdate }) => {
  const [startTime, setStartTime] = useState<Moment | undefined>(moment())
  const [endTime, setEndTime] = useState<Moment | undefined>(moment())
  const [projectId, setProjectId] = useState<string>('')
  const isUpdate = variant === 'update'

  const start = timeInMiliseconds(getStartTime(startTime))
  const end = endTime ? timeInMiliseconds(endTime) : undefined

  useEffect(() => {
    if (session) {
      setStartTime(moment(session.start))
      setEndTime(moment(session.end || moment()))
      setProjectId(session.projectId || '')
    }
  }, [session])

  const updateSession = () => {
    if (session && onUpdate) {
      onUpdate({
        ...session,
        start,
        end,
        duration: getDuration(start, end),
        projectId: projectId,
      })
    }
  }

  const createSession = () => {
    if (onCreate) {
      onCreate({
        activ: false,
        start,
        end,
        duration: getDuration(start, end),
        projectId: projectId,
      })
    }
  }

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <Paper sx={{ padding: 2 }}>
        <Typography align="center" marginBottom={4} variant="h5" component={'h3'}>
          {isUpdate ? 'Update the selected session' : 'Create a new session'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignContent: 'center', marginBottom: 4 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Time"
            value={startTime}
            inputFormat="DD.MM.YY HH:mm"
            onChange={(newValue) => {
              setStartTime(newValue || undefined)
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End Time"
            value={endTime}
            inputFormat="DD.MM.YY HH:mm"
            minDate={startTime}
            minTime={startTime}
            onChange={(newValue) => {
              setEndTime(newValue || undefined)
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select label="Project" value={projectId} onChange={(event) => setProjectId(event.target.value)}>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button
            variant="contained"
            onClick={() => {
              isUpdate ? updateSession() : createSession()
            }}
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
          <Button variant="outlined" onClick={() => onCancle()}>
            cancle
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default SessionForm
