import { TextField } from '@mui/material'
import { useState, VFC } from 'react'
import FormBox from '../../components/FormBox'

const TaskForm: VFC = ({}) => {
  const [name, setName] = useState<string>('')
  const [note, setNote] = useState<string>('')

  return (
    <FormBox header="Task" isValid={true} update={false} onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} onClose={() => {}}>
      <TextField label="Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)} />
      <TextField label="Notes" variant="standard" multiline rows={7} value={note} onChange={(event) => setNote(event.target.value)} />
    </FormBox>
  )
}

export default TaskForm
