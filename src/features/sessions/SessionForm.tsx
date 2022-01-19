import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { DateTimePicker } from '@mui/lab'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
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
  onDelete?: (Session: Session) => void
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

const SessionForm: VFC<SessionFormProps> = ({ variant = 'update', session, projects, onCancle, onCreate, onUpdate, onDelete }) => {
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

  const deleteSession = () => {
    if (onDelete && session) {
      onDelete(session)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button
          variant="text"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onCancle()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        Session
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <Stack gap={2} width={'100%'}>
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
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button
            variant="contained"
            onClick={() => {
              isUpdate ? updateSession() : createSession()
            }}
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
          {isUpdate && (
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteSession()}>
              Delete
            </Button>
          )}
          <Button variant="outlined" onClick={() => onCancle()}>
            cancle
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SessionForm
