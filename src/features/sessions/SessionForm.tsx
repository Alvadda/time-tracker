import { DateTimePicker } from '@mui/lab'
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material'
import moment, { Moment } from 'moment'
import { useEffect, useState, VFC } from 'react'
import FormBox from '../../components/FormBox'
import { Project, Session, Task } from '../../types'
import { calcSessionDuration, timeInMiliseconds } from '../../utils/timeUtil'

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

const getStartTime = (time?: Moment) => {
  return time || moment()
}

const getDuration = (start: number, end?: number) => {
  if (end) {
    return calcSessionDuration(start, end)
  }
}

const SessionForm: VFC<SessionFormProps> = ({ variant = 'update', session, projects, tasks, onCancle, onCreate, onUpdate, onDelete }) => {
  const [startTime, setStartTime] = useState<Moment | undefined>(moment())
  const [endTime, setEndTime] = useState<Moment | undefined>(moment())
  const [projectId, setProjectId] = useState<string>('')
  const [taskIds, setTaskIds] = useState<string[]>([])
  const [note, setNote] = useState<string>('')
  const isUpdate = variant === 'update'

  const start = timeInMiliseconds(getStartTime(startTime))
  const end = endTime ? timeInMiliseconds(endTime) : undefined

  const sessionFromForm: Partial<Session> = {
    start,
    end,
    duration: getDuration(start, end),
    note,
    projectId,
    taskIds,
  }

  useEffect(() => {
    if (session) {
      console.log(session)

      setStartTime(moment(session.start))
      setEndTime(moment(session.end || moment()))
      setProjectId(session.projectId || '')
      setNote(session.note || '')
      setTaskIds(session.taskIds || [])
    }
  }, [session])

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
        ...sessionFromForm,
      })
    }
  }

  const create = () => {
    onCreate({
      ...sessionFromForm,
      activ: false,
    })
  }

  const remove = () => {
    if (session) {
      onDelete(session)
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof taskIds>) => {
    const {
      target: { value },
    } = event
    setTaskIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <FormBox header="Session" isValid={true} update={isUpdate} onCreate={create} onUpdate={update} onDelete={remove} onClose={onCancle}>
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
      <FormControl fullWidth>
        <InputLabel id="session-tasks">Tasks</InputLabel>
        <Select
          labelId="session-tasks"
          multiple
          value={taskIds}
          onChange={handleChange}
          input={<OutlinedInput label="Tasks" />}
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
      <TextField label="Note" variant="standard" multiline rows={5} value={note} onChange={(event) => setNote(event.target.value)} />
    </FormBox>
  )
}

export default SessionForm
