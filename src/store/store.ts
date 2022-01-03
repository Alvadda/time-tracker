import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../auth/authSlice'
import projectsReducer from '../projects/projectsSlice'
import settingsReducer from '../settings/settingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
