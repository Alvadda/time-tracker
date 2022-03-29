import { DateTimePicker } from '@mui/lab'
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import moment from 'moment'
import { useEffect, VFC } from 'react'
import { useForm } from 'react-hook-form'
import FormBox from '../../components/FormBox'
import { NumberOrEmpty, Project, Session, Task } from '../../types'
import { calcSessionDuration, getLocalDateFormatShort, getLocalTimeFormatShort } from '../../utils/timeUtil'

interface SessionFormProps {
  variant?: 'create' | 'update'
  session?: Session
  projects: Project[]
  tasks: Task[]
  onUpdate: (session: Session) => void
  onCreate: (session: Partial<Session>) => void
  onDelete: (Session: Session) => void
  onCancle: () => void
}

interface SessionFormData {
  startTime: number
  endTime: number
  sessionBreak: NumberOrEmpty
  projectId: string
  taskIds: string[]
  note?: string
}

const getDuration = (start: number, end?: number) => {
  if (end) {
    return calcSessionDuration(start, end)
  }
}

const SessionForm: VFC<SessionFormProps> = ({ variant = 'update', session, projects, tasks, onCancle, onCreate, onUpdate, onDelete }) => {
  const { register, watch, setValue, getValues } = useForm<SessionFormData>({
    defaultValues: {
      startTime: moment().valueOf(),
      endTime: moment().valueOf(),
      projectId: '',
      sessionBreak: 0,
      taskIds: [],
    },
  })
  const startTime = moment(watch('startTime'))
  const endTime = moment(watch('endTime'))
  const isUpdate = variant === 'update'
  const getDateFormat = `${getLocalDateFormatShort()} ${getLocalTimeFormatShort()}`

  useEffect(() => {
    if (session) {
      setValue('startTime', session.start || moment().valueOf())
      setValue('endTime', session.end || moment().valueOf())
      setValue('sessionBreak', session.break || 0)
      setValue('projectId', session.projectId || '')
      setValue('taskIds', session.taskIds || [])
      setValue('note', session.note)
    }
  }, [session, setValue])

  const getFormData = () => {
    const data = getValues()
    const duration = getDuration(data.startTime, data.endTime) || 0
    return {
      start: data.startTime,
      end: data.endTime,
      duration,
      break: data.sessionBreak || 0,
      note: data.note,
      projectId: data.projectId,
      taskIds: data.taskIds,
    }
  }

  const getTaskNameToId = (id: string) => {
    return tasks.find((task) => task.id === id)?.name
  }

  const getTaskColorToId = (id: string) => {
    return tasks.find((task) => task.id === id)?.color
  }
  const update = () => {
    if (session) {
      onUpdate({
        ...session,
        ...getFormData(),
      })
    }
  }

  const create = () => {
    onCreate({
      ...getFormData(),
      activ: false,
    })
  }

  const remove = () => {
    if (session) {
      onDelete(session)
    }
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    // On autofill we get a stringified value.
    setValue('taskIds', typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <FormBox header="Session" isValid={true} update={isUpdate} onCreate={create} onUpdate={update} onDelete={remove} onClose={onCancle}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} data-testid="session_start" />}
        label="Start Time"
        value={startTime}
        inputFormat={getDateFormat}
        onChange={(newValue) => {
          if (newValue) {
            setValue('startTime', newValue?.valueOf())
          }
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} data-testid="session_end" />}
        label="End Time"
        value={endTime}
        inputFormat={getDateFormat}
        minDate={startTime}
        minTime={startTime}
        onChange={(newValue) => {
          if (newValue) {
            setValue('endTime', newValue?.valueOf())
          }
        }}
      />
      <TextField
        label="Break"
        variant="outlined"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">m</InputAdornment>,
        }}
        inputProps={{ 'data-testid': 'session_break' }}
        {...register('sessionBreak')}
      />
      <FormControl fullWidth>
        <InputLabel>Project</InputLabel>
        <Select
          inputProps={{ 'data-testid': 'session_project' }}
          label="Project"
          value={watch('projectId')}
          onChange={(event) => setValue('projectId', event.target.value)}
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="session-tasks">Tasks</InputLabel>
        <Select
          labelId="session-tasks"
          multiple
          value={watch('taskIds')}
          onChange={handleChange}
          input={<OutlinedInput inputProps={{ 'data-testid': 'session_task' }} label="Tasks" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => (
                <Chip key={id} label={getTaskNameToId(id)} sx={{ backgroundColor: getTaskColorToId(id) }} />
              ))}
            </Box>
          )}
        >
          {tasks.map((task) => (
            <MenuItem key={task.id} value={task.id} sx={{ color: task.color }}>
              {task.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField inputProps={{ 'data-testid': 'session_note' }} label="Note" variant="standard" multiline rows={5} {...register('note')} />
    </FormBox>
  )
}

export default SessionForm
