import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { Task } from '../../types/types'

export interface TasksState {
  tasks: Task[]
  selectedTask?: Task
}

const initialState: TasksState = { tasks: [] }

const getTasks = createAsyncThunk<Task[], undefined, { state: RootState; extra: Extra }>('tasks/getAll', async (_, { getState, extra }) => {
  const { auth } = getState()
  if (!auth?.uid) return []

  return await extra.task.get(auth.uid)
})

const createTask = createAsyncThunk<Task, Partial<Task>, { state: RootState; extra: Extra }>(
  'tasks/create',
  async (task, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.task.create(auth.uid, task)
  }
)

const updateTask = createAsyncThunk<Task, Task, { state: RootState; extra: Extra }>('tasks/update', async (task, { getState, extra }) => {
  const { auth } = getState()
  if (!auth?.uid) throw new Error('User needs to be logged in')

  return await extra.task.update(auth.uid, task)
})

const deleteTask = createAsyncThunk<string, Task, { state: RootState; extra: Extra }>('tasks/delete', async (task, { getState, extra }) => {
  const { auth } = getState()
  if (!auth?.uid) throw new Error('User needs to be logged in')

  return await extra.task.remove(auth.uid, task)
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    setSelectedTask: (state, action: PayloadAction<Task | undefined>) => {
      state.selectedTask = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = [...action.payload]
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const indexOfTaskToUpdate = state.tasks.findIndex((task) => task.id === action.payload.id)
      state.tasks[indexOfTaskToUpdate] = action.payload
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const indexOfTaskToRemove = state.tasks.findIndex((task) => task.id === action.payload)
      state.tasks.splice(indexOfTaskToRemove, 1)
    })
  },
})

// SELECTOR
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectSelectedTask = (state: RootState) => state.tasks.selectedTask

//ACTIONS
export const { addTask, setSelectedTask } = tasksSlice.actions
export { getTasks, createTask, updateTask, deleteTask }

export default tasksSlice.reducer
