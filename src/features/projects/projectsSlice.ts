import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../../types/types'
import { Extra, RootState } from './../../store/store'

export interface ProjectsState {
  projects: Project[]
}

interface CreateProjectParams {
  name: string
  rate: number
  color: string
}

const initialState: ProjectsState = { projects: [] }

const getProjects = createAsyncThunk<Project[], undefined, { state: RootState; extra: Extra }>(
  'projects/getProjects',
  async (_, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) return []

    return await extra.project.getAll(auth.uid)
  }
)

const createProject = createAsyncThunk<Project, CreateProjectParams, { state: RootState; extra: Extra }>(
  'projects/createProject',
  async (params, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.project.create(auth.uid, params.name, params.rate, params.color)
  }
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = [...action.payload]
    })
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload)
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
export { getProjects, createProject }

export default projectsSlice.reducer
