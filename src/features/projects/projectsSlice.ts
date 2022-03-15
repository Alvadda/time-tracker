import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project, ProjectStats } from '../../types'
import { calcEarningFromMin } from '../../utils/timeUtil'
import { selectInactiveSessionsFromTo } from '../sessions/sessionsSlice'
import { getDurationWithBreak } from '../sessions/sessionUtils'
import { getRateFrom } from '../sessions/useRate'
import { Extra, RootState } from './../../store/store'
import { selectCustomers } from './../customer/customersSlice'
import { selectDefaultRate } from './../settings/settingsSlice'

export interface ProjectsState {
  projects: Project[]
  selectedProject?: Project
}

const initialState: ProjectsState = { projects: [] }

const getProjects = createAsyncThunk<Project[], undefined, { state: RootState; extra: Extra }>(
  'projects/getAll',
  async (_, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) return []
    return await extra.project.getAll(auth.uid)
  }
)

const createProject = createAsyncThunk<Project, Partial<Project>, { state: RootState; extra: Extra }>(
  'projects/create',
  async (project, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.project.create(auth.uid, project)
  }
)

const updateProject = createAsyncThunk<Project, Project, { state: RootState; extra: Extra }>(
  'projects/update',
  async (project, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.project.update(auth.uid, project)
  }
)

const deleteProject = createAsyncThunk<string, Project, { state: RootState; extra: Extra }>(
  'projects/delete',
  async (project, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.project.remove(auth.uid, project)
  }
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
    setSelectedProject: (state, action: PayloadAction<Project | undefined>) => {
      state.selectedProject = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = [...action.payload]
    })
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload)
    })
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const indexOfProjectToUpdate = state.projects.findIndex((project) => project.id === action.payload.id)
      state.projects[indexOfProjectToUpdate] = action.payload
    })
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const indexOfProjectToRemove = state.projects.findIndex((project) => project.id === action.payload)
      state.projects.splice(indexOfProjectToRemove, 1)
    })
  },
})

// SELECTOR
export const selectProjects = (state: RootState) => state.projects.projects
export const selectSelectedProject = (state: RootState) => state.projects.selectedProject
export const selectProjectsInRage = (from: number, to: number) => {
  return createSelector(
    selectInactiveSessionsFromTo(from, to),
    selectProjects,
    selectCustomers,
    selectDefaultRate,
    (sessions, projects, customers, defaultRate) =>
      projects.map((project): ProjectStats => {
        const sessionsToProject = sessions.filter((session) => session.projectId === project.id)
        const customer = customers.find((customer) => project.customerId === customer.id)

        const { earning, minutes } = sessionsToProject.reduce(
          (sum, session) => {
            const duration = getDurationWithBreak(session)
            return {
              earning: sum.earning + calcEarningFromMin(duration, getRateFrom(project, customers, defaultRate)),
              minutes: sum.minutes + duration,
            }
          },
          { earning: 0, minutes: 0 }
        )
        return { project, totalEarning: earning, totalMinutesWorked: minutes, sessions: sessionsToProject, customer }
      })
  )
}

//ACTIONS
export const { addProject, setSelectedProject } = projectsSlice.actions
export { getProjects, createProject, updateProject, deleteProject }

export default projectsSlice.reducer
