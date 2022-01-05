import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Firestore } from 'firebase/firestore'
import { getProjects } from '../../api/projectAPI'
import { RootState } from '../../store/store'
import { Project } from '../../types/types'

export interface ProjectsState {
  projects: Project[]
}

const initialState: ProjectsState = { projects: [] }

const fetchProjects = createAsyncThunk('projects/getProjects', async (db: Firestore, { getState }) => {
  const { auth } = getState() as any
  if (!auth?.uid) return []

  return await getProjects(auth.uid, db)
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
export const selectProjectColor = createSelector(
  selectProjects,
  (projects) => (projectid: string) => projects.filter((project) => project.id === projectid)
)

//ACTIONS
export const { addProject } = projectsSlice.actions
export { fetchProjects }

export default projectsSlice.reducer
