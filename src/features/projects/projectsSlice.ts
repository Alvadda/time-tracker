import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Firestore } from 'firebase/firestore'
import { createProject, getProjects } from '../../api/projectAPI'
import { RootState } from '../../store/store'
import { Project } from '../../types/types'

export interface ProjectsState {
  projects: Project[]
}

interface CreateProjectParams {
  name: string
  rate: number
  color: string
  db: Firestore
}

const initialState: ProjectsState = { projects: [] }

const fetchProjects = createAsyncThunk('projects/getProjects', async (db: Firestore, { getState }) => {
  const { auth } = getState() as any
  if (!auth?.uid) return []

  return await getProjects(auth.uid, db)
})

const fetchCreateProject = createAsyncThunk('projects/createProject', async (params: CreateProjectParams, { getState, dispatch }) => {
  const { auth } = getState() as any
  console.log('test')
  if (!auth?.uid) return []

  const project = await createProject(auth.uid, params.name, params.rate, params.color, params.db)
  dispatch(addProject(project))
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
export { fetchProjects, fetchCreateProject }

export default projectsSlice.reducer
