import { DateTimePicker } from '@mui/lab'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import moment, { Moment } from 'moment'
import { useEffect, useState, VFC } from 'react'
import { Project, Session } from '../../types/types'

interface SessionFormProps {
  variant?: 'create' | 'update'
  session?: Session
  projects: Project[]
  onUpdate?: (session: Session) => void
  onCreate?: (session: Partial<Session>) => void
  onCancle: () => void
}

const SessionForm: VFC<SessionFormProps> = ({ variant = 'create', session, projects, onCancle, onCreate, onUpdate }) => {
  const [startTime, setStartTime] = useState<Moment | null>(moment())
  const [endTime, setEndTime] = useState<Moment | null>(moment())
  const [projectId, setProjectId] = useState<string>('')

  useEffect(() => {
    if (session) {
      setStartTime(moment(session.start))
      setEndTime(moment(session.end || moment()))
      setProjectId(session.projectId || '')
    }
  }, [session])

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
          {variant === 'create' ? 'Create a new session' : 'Update the selected session'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignContent: 'center', marginBottom: 4 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Time"
            value={startTime}
            inputFormat="DD.MM.YY HH:mm"
            onChange={(newValue) => {
              setStartTime(newValue)
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
              setEndTime(newValue)
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
          <Button variant="contained">{variant === 'create' ? 'Create' : 'Update'}</Button>
          <Button variant="outlined" onClick={() => onCancle()}>
            cancle
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default SessionForm
