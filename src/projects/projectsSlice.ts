import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { collection, getDocs, Firestore } from 'firebase/firestore'

import { RootState } from '../store/store'
import { Project } from '../types/types'

export interface ProjectsState {
  projects: Project[]
}

const initialState: ProjectsState = { projects: [] }

const fetchProjects = createAsyncThunk('projects/fetchByUser', async (db: Firestore) => {
  const querySnapshot = await getDocs(collection(db, `test`))
  const projects: Project[] = []
  querySnapshot.forEach((doc) => {
    const project = doc.data()
    projects.push({ name: project.name })
  })

  return projects
})

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = [...action.payload]
    })
  },
})

// SELECTOR
export const selectProjects = (state: RootState) => state.projects.projects

//ACTIONS
export const { addProject } = projectsSlice.actions
export { fetchProjects }

export default projectsSlice.reducer
