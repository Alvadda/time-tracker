import { Box } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../../components/AddButton'
import FormList from '../../components/FormList'
import { Task } from '../../types'
import TaskForm from './TaskForm'
import { createTask, deleteTask, selectSelectedTask, selectTasks, setSelectedTask, updateTask } from './taskSlice'

const TaskManager: VFC = () => {
  const dispatch = useDispatch()
  const [createNewTask, setCreateNewTask] = useState<boolean>(false)

  const tasks = useSelector(selectTasks)
  const selectedTask = useSelector(selectSelectedTask)

  const showForm = createNewTask || selectedTask

  useEffect(() => {
    return () => {
      dispatch(setSelectedTask(undefined))
      setCreateNewTask(false)
    }
  }, [setCreateNewTask, dispatch])

  const closeForm = () => {
    dispatch(setSelectedTask(undefined))
    setCreateNewTask(false)
  }

  const onSelect = (task: Task) => {
    dispatch(setSelectedTask(task))
  }

  const onUpdate = (task: Task) => {
    dispatch(updateTask(task))
    closeForm()
  }

  const onCreate = (task: Partial<Task>) => {
    dispatch(createTask(task))
    closeForm()
  }

  const onDelete = (task: Task) => {
    dispatch(deleteTask(task))
    closeForm()
  }
  return (
    <Box height={'100%'}>
      <FormList form={tasks} onSelect={onSelect} />
      {showForm && (
        <TaskForm
          isUpdate={Boolean(selectedTask)}
          task={selectedTask}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancle={closeForm}
        />
      )}
      {!showForm && <AddButton onClick={() => setCreateNewTask(true)} />}
    </Box>
  )
}

export default TaskManager
