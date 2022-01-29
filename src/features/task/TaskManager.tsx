import { Box } from '@mui/material'
import { VFC } from 'react'
import FormList from '../../components/FormList'
import { Task } from '../../types/types'
import TaskForm from './TaskForm'

const tasks: Task[] = [
  {
    id: '1',
    name: 'Aufgabe 1',
  },
  {
    id: '2',
    name: 'Aufgabe 2',
  },
  {
    id: '3',
    name: 'Aufgabe 3',
  },
]

const TaskManager: VFC = () => {
  const onSelect = (task: Task) => {
    // dispatch(setSelectedCustomer(customer))
    console.log(task)
  }
  return (
    <Box height={'100%'}>
      <FormList form={tasks} onSelect={onSelect} />
      <TaskForm />
    </Box>
  )
}

export default TaskManager
