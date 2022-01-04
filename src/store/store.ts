import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import projectsReducer from '../features/projects/projectsSlice'
import settingsReducer from '../features/settings/settingsSlice'
import wizardReducer from '../pages/wizard/wizardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    wizard: wizardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
