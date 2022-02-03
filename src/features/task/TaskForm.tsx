import { TextField } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'
import FormBox from '../../components/FormBox'
import { Task } from '../../types/types'

interface TaskFormProps {
  task?: Task
  isUpdate: boolean
  onUpdate: (task: Task) => void
  onCreate: (task: Partial<Task>) => void
  onDelete: (task: Task) => void
  onCancle: () => void
}

const TaskForm: VFC<TaskFormProps> = ({ task, isUpdate, onCreate, onUpdate, onDelete, onCancle }) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [color, setColor] = useState<string>('#FFF')

  const taskFromForm: Partial<Task> = {
    name,
    description,
    color,
  }

  useEffect(() => {
    if (task) {
      setName(task.name)
      setDescription(task.description || '')
      setColor(task.color)
    }
  }, [task])

  const updateTask = () => {
    if (task) {
      onUpdate({
        ...task,
        ...taskFromForm,
      })
    }
  }

  const deleteTask = () => {
    if (task) {
      onDelete(task)
    }
  }

  const isTaskValid = () => {
    return Boolean(name)
  }

  return (
    <FormBox
      header="Task"
      isValid={isTaskValid()}
      update={isUpdate}
      onCreate={() => onCreate(taskFromForm)}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onClose={onCancle}
    >
      <TextField label="Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)} />
      <TextField
        label="Description"
        variant="standard"
        multiline
        rows={7}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <HexColorPicker color={color} onChange={setColor} />
    </FormBox>
  )
}
export default TaskForm
