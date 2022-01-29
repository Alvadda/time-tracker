import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Task } from '../../types/types'

export interface TasksState {
  tasks: Task[]
  selectedTask?: Task
}

const initialState: TasksState = { tasks: [] }

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
})

// SELECTOR
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectSelectedTask = (state: RootState) => state.tasks.selectedTask

//ACTIONS
export const { addTask, setSelectedTask } = tasksSlice.actions

export default tasksSlice.reducer
